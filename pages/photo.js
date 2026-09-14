// PHOTO 页面组件。
// 数据：每个相册 { name, images: [{ url, note }] }
//   - name 为空则不显示相册标题
//   - url 为空则跳过该条（方便保留占位数据）
//   - note 走 renderMD，可以用 Markdown
// 用法：图片文件放 assets/images/photos/ 下，url 写相对路径，例如 assets/images/photos/xxx.webp

const imageCollections = [
    {
        name: "",
        images: [
            { url: "", note: "" },
        ]
    }
]

async function renderPhoto() {
    // 只保留有内容的相册（有名字，或有至少一张有效图片），全空则显示占位文案
    const collections = imageCollections
        .map(({ name, images }) => ({ name, images: images.filter(img => img.url) }))
        .filter(({ name, images }) => name || images.length);

    const cards = collections.map(({ name, images }) => html`
        ${name && html`<p>${name}</p>`}
        ${images.map(({ url, note }) => html`
            <figure>
                <img src=${url} alt=${note || ''} loading="lazy" />
                ${note && html`<figcaption innerHTML=${renderMD(note)}></figcaption>`}
            </figure>
        `)}
    `);

    return html`
        <h1>PHOTO</h1>
        <div id="gallery">
            ${cards.length ? cards : html`<p>还没想好做什么，先占个位。</p>`}
        </div>
    `;
}
