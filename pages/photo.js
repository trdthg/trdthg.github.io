// PHOTO 页面组件。
// 数据：每个相册 { name, images: [{ url, note }] }
//   - url 里每一项单独判类型：后缀是视频（.webm/.mp4/...）就出 <video>，其余出 <img>
//   - url 写数组 = 一张卡片里多个，左右滑（见 style.css 的 .strip）；图片视频可以混着放
//   - name 为空则不显示相册标题
//   - url 为空则跳过该条（方便保留占位数据）
//   - note 走 renderMD，可以用 Markdown；也当图片的 alt
//
// 原图/原视频（含 EXIF/GPS）放 assets/images/photos/raw/（已 gitignore），
// 跑 python scripts/convert_webp.py 生成 720p 照片 / 360p AV1 视频（都已脱敏）
// 放到 assets/images/photos/，然后把文件名填到下面。拍摄时间/地点见 git 历史或原图 EXIF。
// 视频封面是脚本一起出的 <名字>-poster.webp，按约定推出来，不用自己写。

const imageCollections = [
    {
        name: "和好朋友们出去转悠",
        images: [
            { url: "assets/images/photos/IMG_0928.webp", note: "2026-07-31 山梨・富士河口湖町 有人在爬山" },
            { url: "assets/images/photos/IMG_0935.webp", note: "2026-07-31 長野・諏訪市 爬错路了，还是要看导航" },
            { url: "assets/images/photos/IMG_0965.webp", note: "2026-08-01 長野・車山山頂（1908m）巴士下山好早啊，想多呆一会" },
            { url: "assets/images/photos/IMG_1017.webp", note: "2026-08-03 鳥取・鳥取砂丘 但是似乎忘了拍沙丘" },
            { url: "assets/images/photos/IMG_1089.webp", note: "2026-08-08 韓国・仁川 海上的傍晚" },
        ]
    }, {
        name: "附近溜达",
        images: [
            { url: ["assets/images/photos/IMG_1488.webm", "assets/images/photos/IMG_1432.webp", "assets/images/photos/IMG_1467.webp", "assets/images/photos/IMG_1486.webp"], note: "2026-09-28 北灵山 寂しい，看看马儿吧" },
            { url: "assets/images/photos/IMG_0110.webp", note: "这是什么球球？" },
            { url: "assets/images/photos/IMG_0189.webp", note: "大水潭" },
            { url: "assets/images/photos/IMG_0290.webp", note: "毛茸茸大蜘蛛" },
            { url: ["assets/images/photos/IMG_0371.webp", "assets/images/photos/IMG_0372.webp"], note: "除雪机，除完的雪地" },
            { url: "assets/images/photos/a7e2cc26e3b2e04ba119e43d29c951b5.webp", note: "按照音阶排列的铁轨，但是工人并没有排列好" },
            { url: "assets/images/photos/photo_2026-09-25_21-51-58.webp", note: "猪猪" },
            { url: "assets/images/photos/IMG_0481.webp", note: "桥下的藤蔓，长得好茂盛" },
            { url: "assets/images/photos/IMG_0802.webp", note: "现代建筑，看起来还不错" },
            { url: "assets/images/photos/IMG_1401.webp", note: "月亮，难忘的中秋节，前一天晚上忘了看，只能补一下了" },
       ]
    }
]

// 视频后缀（每个 url 单独判，一张卡片里图片视频可以混着写）
const VIDEO_EXT = /\.(webm|mp4|m4v|mov|ogv)$/i;

// 一个视频节点；封面按脚本的输出约定推：xxx.webm -> xxx-poster.webp
function videoNode(src) {
    const node = html`<video
        controls muted loop playsinline preload="metadata"
        poster=${src.replace(/\.[^.]+$/, '-poster.webp')}
    ><source src=${src} /></video>`;

    // 滑到跟前才播，滚开就暂停（不然相册里几个视频会在后台一起解码烧电）。
    // 静音是浏览器允许自动播放的前提，想听声就点控制条上的喇叭。
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) node.play().catch(() => {});
            else node.pause();
        }, { threshold: 0.3 }).observe(node);
    }
    return node;
}

// 图集里的一个条目 -> 一个 DOM 节点；url 是字符串就一个，是数组就一排放（左右滑）
function renderMedia({ url, note }) {
    const nodes = (Array.isArray(url) ? url : [url]).filter(Boolean).map(src =>
        VIDEO_EXT.test(src)
            ? videoNode(src)
            : html`<img src=${src} alt=${note || ''} loading="lazy" />`);

    if (!nodes.length) return null;
    if (nodes.length === 1) return nodes[0];

    // 多个：横向滑（样式见 style.css 的 .strip），手机上直接左右扒
    return html`<div class="strip">${nodes}</div>`;
}

async function renderPhoto() {
    // 只保留有内容的相册（有名字，或有至少一条有效内容），全空则显示占位文案
    const collections = imageCollections
        .map(({ name, images }) => ({ name, images: images.filter(item => item.url) }))
        .filter(({ name, images }) => name || images.length);

    const cards = collections.map(({ name, images }) => html`
        ${name && html`<h3>${name}</h3>`}
        ${images.map(({ note, ...media }) => {
            const node = renderMedia({ note, ...media });
            return node && html`
                <figure>
                    ${note && html`<figcaption>${renderMD(note)}</figcaption>`}
                    ${node}
                </figure>
            `;
        })}
    `);

    return html`
        <h1>PHOTO</h1>
        <p>既然拍了就还是挺珍贵的，也让你看一下 🤗</p>
        <p>所有的照片都不是原图，都使用 imageMagick 缩小到 720p 并使用 75 的质量压缩成 webp 保存，每张基本都 ${"<100k"}；视频用 ffmpeg 转成 360p 的 AV1/WebM，同样抽掉 EXIF/GPS，我不喜欢大大的仓库</p>
        <p>> 另外，这里只会发布我拍摄的照片，在 <a href="https://x.com/trdthg">x.com/trdthg</a> 有一些我绘制的画或者上传的视频</p>
        <div id="gallery">
            ${cards.length ? cards : html`<p>还没想好做什么，先占个位。</p>`}
        </div>
    `;
}
