"""
遍历 assets/images/photos/raw 中的所有图片，调用 ImageMagick 转换为 webp（quality 75）。

输出目录：assets/images/photos/（与 raw 同级，文件名保持不变）
用法：在仓库任意位置执行 python scripts/convert_webp.py [--force]
  --force  即使目标文件已存在也重新转换
"""

import subprocess
import sys
from pathlib import Path

# scripts/ 的上一级 = 仓库根目录，路径不受执行时所在目录影响
ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "assets" / "images" / "photos" / "raw"
OUT_DIR = ROOT / "assets" / "images" / "photos"

# 支持的图片扩展名
EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".gif", ".tif", ".tiff", ".heic", ".avif"}

QUALITY = 75


def main():
    force = "--force" in sys.argv

    if not RAW_DIR.is_dir():
        print(f"目录不存在：{RAW_DIR}")
        sys.exit(1)

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    files = sorted(p for p in RAW_DIR.iterdir() if p.suffix.lower() in EXTENSIONS)
    if not files:
        print(f"没有找到可转换的图片：{RAW_DIR}")
        return

    print(f"共 {len(files)} 个文件待转换 (quality={QUALITY})\n")

    ok, skip, fail = 0, 0, 0
    for src in files:
        dst = OUT_DIR / (src.stem + ".webp")

        if dst.exists() and not force:
            print(f"[跳过] {src.name} -> {dst.name} 已存在")
            skip += 1
            continue

        # -quality 75: 质量 75
        # -define webp:method=6: 最高压缩优化级别
        cmd = [
            "magick", str(src),
            "-quality", str(QUALITY),
            "-define", "webp:method=6",
            str(dst),
        ]
        try:
            result = subprocess.run(cmd, capture_output=True, text=True)
            if result.returncode == 0 and dst.exists():
                src_size = src.stat().st_size
                dst_size = dst.stat().st_size
                ratio = dst_size / src_size * 100 if src_size else 0
                print(f"[完成] {src.name} -> {dst.name}  "
                      f"{src_size / 1024:.0f}KB -> {dst_size / 1024:.0f}KB ({ratio:.1f}%)")
                ok += 1
            else:
                print(f"[失败] {src.name}: {result.stderr.strip()}")
                fail += 1
        except FileNotFoundError:
            print("错误：未找到 magick 命令，请确认已安装 ImageMagick 并加入 PATH")
            sys.exit(1)

    print(f"\n完成：{ok} 成功，{skip} 跳过，{fail} 失败")
    if fail:
        sys.exit(1)


if __name__ == "__main__":
    main()
