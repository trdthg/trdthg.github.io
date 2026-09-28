"""
把 assets/images/photos/raw 里的照片和视频转成能直接上网页的格式，输出到 assets/images/photos/。

照片（ImageMagick）→ `<名字>.webp`
  1. -auto-orient          按 EXIF 方向摆正（摆正后方向信息就没用了）
  2. -resize 1280x720>     限到 720p（横图 960x720、竖图 540x720；小图不放大）
  3. -strip                剥离全部元数据（EXIF/GPS/时间/机型）—— 脱敏，顺便减体积
  4. 把原图的 ICC 色彩描述装回去 —— 只删元数据，不动颜色
     （iPhone 拍的是 Display P3 宽色域，直接 strip 掉 ICC 会当成 sRGB 显示，颜色发艳）

视频（ffmpeg / SVT-AV1）→ `<名字>.webm` + `<名字>-poster.webp`
  1. 摆正（ffmpeg 自动应用 MOV 的旋转矩阵）、缩到 VIDEO_MAX_SIZE、抽帧到 VIDEO_FPS
  2. -map_metadata -1      剥离元数据（MOV 里带 GPS/拍摄时间/机型）
  3. AV1 视频 + Opus 音轨，装进 WebM
     （WebM 规范里音频只能是 Opus/Vorbis，塞 AAC 是不合规的，Safari 直接不认）
  4. 首帧再存一张 `<名字>-poster.webp`，给 <video poster> 当封面

  为什么不是动态 webp：动态 webp 用的是 VP8 关键帧、逐帧独立压，没有帧间预测，
  等于把视频当 100 张图片存。同一段 8.4s 的 1080p 素材（都压到 360p/24fps）：
      动态 webp q60  5.9MB   SSIM .866（还更糊）
      AV1 CRF44     1.09MB   SSIM .937
  为什么 preset 用 2：SVT-AV1 的 preset 越小越慢、同画质越省，preset2 比 preset6 省约 20%，
  代价是编码耗时约 2.4 倍视频时长（8 秒的片子编 20 秒）—— 一次性转换，无所谓。
  调 CRF 就是调画质/体积：实测这套素材 CRF 每 +1 ≈ 体积 -8%
      CRF42 = 1.26MB · CRF43 = 1.17MB · CRF44 = 1.09MB · CRF45 = 1.00MB
  兼容性：AV1 在 Chrome/Firefox/Edge 都没问题，Safari 要 iPhone 15 Pro / M3 之后的硬件；
        要照顾老 Safari 就把 VIDEO_FALLBACK_MP4 打开（会多一份 H.264 mp4，约 2 倍体积）。

其它：
  - raw/ 里的子目录会被一起扫（比如按日期分好的文件夹），输出统一拍平到 photos/ 下；
  - 同名照片和视频同时在（iPhone 的 Live Photo）时，视频存成 `<名字>-video.webm` /
    `<名字>-video-poster.webp`，不会覆盖照片；
  - 音频开关：VIDEO_AUDIO_BITRATE = None，或者命令行 --no-audio；mp4 兜底用 --with-mp4。

用法：python scripts/convert_webp.py [路径] [--force] [--no-audio] [--with-mp4]
  路径      只转这个文件/目录，不给就转 raw/ 整个目录（可以给多个）
  --force   即使目标文件已存在也重新转换
"""

import os
import subprocess
import sys
import tempfile
from pathlib import Path

# scripts/ 的上一级 = 仓库根目录，路径不受执行时所在目录影响
ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "assets" / "images" / "photos" / "raw"
OUT_DIR = ROOT / "assets" / "images" / "photos"

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".gif", ".tif", ".tiff", ".heic", ".avif"}
VIDEO_EXTENSIONS = {".mov", ".mp4", ".m4v", ".avi", ".mkv", ".webm", ".3gp"}

# 照片：1280x720 是上限，> 表示只缩小不放大
IMAGE_QUALITY = 75
IMAGE_MAX_SIZE = "1280x720>"

# 视频
VIDEO_MAX_SIZE = "640x360>"      # 360p；动态内容小一点更划算
VIDEO_FPS = 24
VIDEO_CRF = 44                   # 越小画质越好、文件越大（每 +1 ≈ -8% 体积）
VIDEO_PRESET = 2                 # SVT-AV1 档位，越小越慢越省（6 是快速档）
VIDEO_TUNE = "tune=0"            # VQ：偏主观画质，比默认的 PSNR 调优顺眼
VIDEO_AUDIO_BITRATE = "96k"      # None = 不要声音（有音轨才处理）
VIDEO_FALLBACK_MP4 = False       # True = 再出一份 H.264 mp4 给解不了 AV1 的老 Safari
POSTER_QUALITY = 75


def parse_size(size):
    """'1280x720>' -> (1280, 720)"""
    w, h = size.rstrip(">").split("x")
    return int(w), int(h)


def human(num_bytes):
    if num_bytes >= 1024 * 1024:
        return f"{num_bytes / 1024 / 1024:.1f}MB"
    return f"{num_bytes / 1024:.0f}KB"


def run_text(cmd):
    """跑个命令收文本输出（工具输出可能不是 utf-8，别让它把脚本搞崩）"""
    return subprocess.run(cmd, capture_output=True, text=True,
                          encoding="utf-8", errors="replace").stdout


def image_info(path):
    """返回 (尺寸, 帧数)：identify 对动态图会每帧打一行"""
    frames = run_text(["magick", "identify", "-format", "%wx%h\n", str(path)]).split()
    return (frames[0] if frames else "?"), len(frames)


def probe(path, entries, stream=None):
    """用 ffprobe 取一个值，拿不到返回空串"""
    cmd = ["ffprobe", "-v", "error"]
    if stream:
        cmd += ["-select_streams", stream]
    cmd += ["-show_entries", entries, "-of", "csv=p=0", str(path)]
    return run_text(cmd).strip()


def has_audio(path):
    return bool(probe(path, "stream=index", "a:0"))


def ffmpeg(args):
    """跑 ffmpeg，成功返回 None，失败返回错误信息"""
    result = subprocess.run(["ffmpeg", "-y", "-v", "error", *[str(a) for a in args]],
                            capture_output=True, text=True, encoding="utf-8", errors="replace")
    if result.returncode != 0:
        return result.stderr.strip() or f"ffmpeg 退出码 {result.returncode}"
    return None


def convert_image(src, dst):
    """转换照片，成功返回 None，失败返回错误信息"""
    # -auto-orient / -resize / -strip：摆正、限到 720p、脱敏
    cmd = ["magick", str(src), "-auto-orient", "-resize", IMAGE_MAX_SIZE, "-strip"]

    # 原图的 ICC 色彩描述先取出来，脱敏之后再装回去（不动像素，只保留色彩空间声明）
    icc = subprocess.run(["magick", str(src), "icc:-"], capture_output=True).stdout
    icc_path = None
    try:
        if icc:
            fd, icc_path = tempfile.mkstemp(suffix=".icc")
            with os.fdopen(fd, "wb") as f:
                f.write(icc)
            cmd += ["-profile", icc_path]

        # -quality 75: 质量 75
        # -define webp:method=6: 最高压缩优化级别
        cmd += ["-quality", str(IMAGE_QUALITY), "-define", "webp:method=6", str(dst)]
        result = subprocess.run(cmd, capture_output=True, text=True,
                                encoding="utf-8", errors="replace")
        if result.returncode != 0 or not dst.exists():
            return result.stderr.strip()
        return None
    finally:
        if icc_path and os.path.exists(icc_path):
            os.remove(icc_path)


def scale_filter(with_fps=True):
    w, h = parse_size(VIDEO_MAX_SIZE)
    # 限尺寸（只缩小不放大、宽高取偶数）；旋转矩阵 ffmpeg 默认就会应用
    out = (f"scale='min({w},iw)':'min({h},ih)':force_original_aspect_ratio=decrease:"
           f"force_divisible_by=2")
    return f"{out},fps={VIDEO_FPS}" if with_fps else out


def convert_video(src, dst, poster, mp4=None, audio=True):
    """视频转 AV1/WebM（可选 mp4 兜底、poster），返回错误列表"""
    errs = []
    sound = audio and VIDEO_AUDIO_BITRATE and has_audio(src)

    cmd = ["-i", src, "-map", "0:v:0", "-sn", "-dn", "-map_metadata", "-1"]
    if sound:
        cmd += ["-map", "0:a:0", "-c:a", "libopus", "-b:a", VIDEO_AUDIO_BITRATE]
    else:
        cmd += ["-an"]
    cmd += ["-vf", scale_filter(), "-pix_fmt", "yuv420p",
            "-c:v", "libsvtav1", "-crf", str(VIDEO_CRF), "-preset", str(VIDEO_PRESET),
            "-svtav1-params", VIDEO_TUNE, dst]
    if (err := ffmpeg(cmd)):
        errs.append(f"webm: {err}")

    # 首帧当封面
    if (err := ffmpeg(["-i", src, "-map", "0:v:0", "-frames:v", "1", "-an", "-sn",
                       "-map_metadata", "-1", "-vf", scale_filter(False),
                       "-c:v", "libwebp", "-quality", str(POSTER_QUALITY), poster])):
        errs.append(f"poster: {err}")

    # 老 Safari 解不了 AV1 时用的 H.264 兜底（默认不开，见 VIDEO_FALLBACK_MP4）
    if mp4:
        fallback = ["-i", src, "-map", "0:v:0", "-sn", "-dn", "-map_metadata", "-1"]
        if sound:
            fallback += ["-map", "0:a:0", "-c:a", "aac", "-b:a", VIDEO_AUDIO_BITRATE]
        else:
            fallback += ["-an"]
        fallback += ["-vf", scale_filter(), "-pix_fmt", "yuv420p",
                     "-c:v", "libx264", "-crf", "23", "-preset", "slow",
                     "-movflags", "+faststart", mp4]
        if (err := ffmpeg(fallback)):
            errs.append(f"mp4: {err}")

    return errs


def collect(roots):
    """收集待转换的照片和视频（多个路径有重叠时只算一次）"""
    images, videos = [], []
    seen = set()
    for root in roots:
        files = [root] if root.is_file() else sorted(root.rglob("*"))
        for p in files:
            if not p.is_file() or p in seen:
                continue
            seen.add(p)
            ext = p.suffix.lower()
            if ext in IMAGE_EXTENSIONS:
                images.append(p)
            elif ext in VIDEO_EXTENSIONS:
                videos.append(p)
    return images, videos


def plan(images, videos, with_mp4):
    """决定每个源文件写到哪些目标文件，返回 [(src, [目标...], is_video)]"""
    image_stems = {p.stem for p in images}
    jobs = [(p, [OUT_DIR / (p.stem + ".webp")], False) for p in images]
    for p in videos:
        # 同名照片也在的话（Live Photo），视频让开一位，别把照片盖了
        name = f"{p.stem}-video" if p.stem in image_stems else p.stem
        targets = [OUT_DIR / f"{name}.webm", OUT_DIR / f"{name}-poster.webp"]
        if with_mp4:
            targets.append(OUT_DIR / f"{name}.mp4")
        jobs.append((p, targets, True))
    return jobs


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    force = "--force" in sys.argv
    audio = "--no-audio" not in sys.argv
    with_mp4 = VIDEO_FALLBACK_MP4 or "--with-mp4" in sys.argv

    roots = [Path(a).resolve() for a in args] or [RAW_DIR]
    for root in roots:
        if not root.exists():
            print(f"路径不存在：{root}")
            sys.exit(1)

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    images, videos = collect(roots)
    if not images and not videos:
        print(f"没有找到可转换的照片/视频：{'、'.join(str(r) for r in roots)}")
        return

    jobs = plan(images, videos, with_mp4)

    # 不同子目录里的同名文件会互相覆盖，直接报错
    by_dst = {}
    for src, targets, _ in jobs:
        for dst in targets:
            by_dst.setdefault(dst, []).append(src)
    clash = {d: s for d, s in by_dst.items() if len(s) > 1}
    if clash:
        for dst, srcs in clash.items():
            print(f"输出名冲突 {dst.name}：{'、'.join(str(s) for s in srcs)}")
        print("请把 raw 里的重名文件改个名再跑")
        sys.exit(1)

    print(f"共 {len(images)} 张照片、{len(videos)} 个视频待转换")
    print(f"  照片 quality={IMAGE_QUALITY} 上限={IMAGE_MAX_SIZE.rstrip('>')}")
    print(f"  视频 AV1 CRF={VIDEO_CRF} preset={VIDEO_PRESET} 上限={VIDEO_MAX_SIZE.rstrip('>')}"
          f" {VIDEO_FPS}fps{'' if with_mp4 else '（不出 mp4）'}\n")

    ok, skip, fail = 0, 0, 0
    for src, targets, is_video in jobs:
        dst = targets[0]
        if all(t.exists() for t in targets) and not force:
            print(f"[跳过] {src.name} -> {'、'.join(t.name for t in targets)} 已存在")
            skip += 1
            continue

        if is_video:
            # AV1 preset2 大概要 2.4 倍视频时长，先吱一声，别让人以为卡死了
            secs = float(probe(src, "format=duration") or 0)
            print(f"[转码] {src.name}（{secs:.1f}s，约 {secs * 2.4:.0f} 秒）-> "
                  f"{'、'.join(t.name for t in targets)} …", flush=True)

        try:
            if is_video:
                errs = convert_video(src, dst, targets[1],
                                     targets[2] if with_mp4 else None, audio)
                err = "；".join(errs) if errs else None
                if not dst.exists():
                    err = err or "没有产出 webm"
            else:
                err = convert_image(src, dst)
        except FileNotFoundError as e:
            tool = "ffmpeg" if is_video else "magick"
            print(f"错误：未找到 {tool} 命令（{e.filename}），请确认已安装并加入 PATH")
            sys.exit(1)

        if err is not None:
            print(f"[失败] {src.name}: {err}")
            fail += 1
            continue

        src_size = src.stat().st_size
        size, frames = image_info(dst)
        if is_video:
            made = [t for t in targets if t.exists()]
            total = sum(t.stat().st_size for t in made)
            print(f"[完成] {src.name} -> {'、'.join(t.name for t in made)}  "
                  f"{human(src_size)} -> {human(total)}  {size} {frames}帧")
        else:
            dst_size = dst.stat().st_size
            ratio = dst_size / src_size * 100 if src_size else 0
            print(f"[完成] {src.name} -> {dst.name}  "
                  f"{human(src_size)} -> {human(dst_size)} ({ratio:.1f}%)  {size}")
        ok += 1

    print(f"\n完成：{ok} 成功，{skip} 跳过，{fail} 失败")
    if fail:
        sys.exit(1)


if __name__ == "__main__":
    main()
