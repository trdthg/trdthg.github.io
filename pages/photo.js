// PHOTO 页面组件。
// 数据：每个相册 { name, images: [{ url, note }] }
//   - name 为空则不显示相册标题
//   - url 为空则跳过该条（方便保留占位数据）
//   - note 走 renderMD，可以用 Markdown
//
// 图片流程：原图（含 EXIF/GPS）放 assets/images/photos/raw/（已 gitignore），
//           跑 python scripts/convert_webp.py 生成 720p、已脱敏的 .webp 放到 assets/images/photos/，
//           然后把文件名填到下面。拍摄时间/地点见 git 历史或原图 EXIF。

const imageCollections = [
    {
        name: "出去转悠",
        images: [
            { url: "assets/images/photos/IMG_0928.webp", note: "2026-07-31 山梨・富士河口湖町 有人在爬山" },
            { url: "assets/images/photos/IMG_0935.webp", note: "2026-07-31 長野・諏訪市 爬错路了，还是要看导航" },
            { url: "assets/images/photos/IMG_0965.webp", note: "2026-08-01 長野・車山山頂（1908m）巴士下山好早啊，想多呆一会" },
            { url: "assets/images/photos/IMG_1017.webp", note: "2026-08-03 鳥取・鳥取砂丘 但是似乎忘了拍沙丘" },
            { url: "assets/images/photos/IMG_1089.webp", note: "2026-08-08 韓国・仁川 海上的傍晚" },
        ]
    }, {
        name: "家门口转悠",
        images: [
            { url: "assets/images/photos/IMG_0110.webp", note: "这是什么球球？" },
            { url: "assets/images/photos/IMG_0189.webp", note: "大水潭" },
            { url: "assets/images/photos/IMG_0290.webp", note: "毛茸茸大蜘蛛" },
            { url: "assets/images/photos/IMG_0371.webp", note: "除雪机" },
            { url: "assets/images/photos/IMG_0372.webp", note: "除完的雪地" },
            { url: "assets/images/photos/a7e2cc26e3b2e04ba119e43d29c951b5.webp", note: "按照音阶排列的铁轨，但是工人并没有排列好" },
            { url: "assets/images/photos/IMG_0479.webp", note: "猪猪" },
            { url: "assets/images/photos/IMG_0481.webp", note: "桥下的藤蔓，长得好茂盛" },
            { url: "assets/images/photos/IMG_0802.webp", note: "现代建筑，看起来还不错" },

       ]
    }
]

async function renderPhoto() {
    // 只保留有内容的相册（有名字，或有至少一张有效图片），全空则显示占位文案
    const collections = imageCollections
        .map(({ name, images }) => ({ name, images: images.filter(img => img.url) }))
        .filter(({ name, images }) => name || images.length);

    const cards = collections.map(({ name, images }) => html`
        ${name && html`<h3>${name}</h3>`}
        ${images.map(({ url, note }) => html`
            <figure>
                ${note && html`<figcaption>${renderMD(note)}</figcaption>`}
                <img src=${url} alt=${note || ''} loading="lazy" />
            </figure>
        `)}
    `);

    return html`
        <h1>PHOTO</h1>
        <p>我不太爱拍照或者是看照片，不过它们还是挺珍贵的，所以勉强记录一下</p>
        <p>所有的图片都不是原图，都是原图使用 imageMagick 缩小到 720p 并使用 75 的质量压缩成 webp 保存，最后每张照片基本都 ${"<100k"}, 我不喜欢大大的仓库</p>
        <p>> 另外，这里只会发布我拍摄的照片，在 https://x.com/trdthg 有一些我绘制的画 或者 视频</p>
        <div id="gallery">
            ${cards.length ? cards : html`<p>还没想好做什么，先占个位。</p>`}
        </div>
    `;
}
