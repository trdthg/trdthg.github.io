// TOY：图片转字符画。字符画渲染核心在根目录 ascii-art.js（createBlockArtComponent）。
// 文件尾把本页注册进 TOYS 列表（见 pages/toy.js）。

// 字符画配置（和 about 页保持一致，调参时两边同步）
const ASCII_ART_OPTIONS = {
    width: 160,
    mode: 'dither',
    fontSize: '0.2rem',
    scale: 0.5,
    outline: '#111'
};

const TOY_EXAMPLES = [
    // options 里写每张图自己的微调（覆盖 ASCII_ART_OPTIONS），不同气质的图不能用同一套参数
    {
        src: 'assets/images/portrait-1027.jpg',
        label: '人像特写',
        options: { autoContrast: true, gamma: 1.3, whitePoint: 0.75 }
    },
    {
        src: 'assets/images/portrait-64.jpg',
        label: '高对比',
        options: {}
    },
    {
        src: 'assets/images/portrait-338.jpg',
        label: '低对比',
        options: { autoContrast: true, gamma: 0.7 }
    }
];

async function renderToyAsciiArt() {
    const container = document.createElement('div');
    container.className = 'toy-page';
    container.innerHTML = `
        <style>
            /* TOY 页局部样式：所有选择器都限定在 .toy-page 下 */
            .toy-page .toy-upload {
                display: flex;
                align-items: center;
                gap: 12px;
                margin: 1em 0;
            }
            .toy-page .toy-gallery {
                display: flex;
                flex-wrap: wrap;
                gap: 24px;
                align-items: flex-end;
            }
        </style>
        <h1>图片转字符画</h1>
        <p>照片会被转成点阵字符画：采样灰度 → 对比度拉伸 → gamma 校正 → Bayer 抖动量化。全部在你的浏览器本地完成，图片不会被上传。</p>
    `;

    // —— 页面状态 ——
    let invert = false;     // 反色开关：默认关 = 正确颜色，勾选 = 负片（头发白）
    let currentFile = null; // 用户上传的图（切开关时用它重新渲染）

    // —— 上传区 ——
    const uploadArea = document.createElement('div');
    uploadArea.className = 'toy-upload';
    uploadArea.innerHTML = `
        <button class="toy-upload-btn">选一张图片 🖼️</button>
        <span class="toy-file-name"></span>
        <label class="toy-invert">
            <input type="checkbox"> 反色
        </label>
        <input type="file" accept="image/*" hidden>
    `;

    const output = document.createElement('div');
    output.className = 'toy-ascii-output';

    const input = uploadArea.querySelector('input[type=file]');
    const button = uploadArea.querySelector('button');
    const invertCheck = uploadArea.querySelector('.toy-invert input');

    // 原生 file input 样式不可定制，用按钮点击代为触发文件选择器
    button.addEventListener('click', () => input.click());

    const renderAscii = async (src, host, extra = {}) => {
        const el = await createBlockArtComponent(src, document, { ...ASCII_ART_OPTIONS, ...extra, invert });
        host.innerHTML = '';
        host.append(el);
    };

    input.addEventListener('change', async () => {
        const file = input.files[0];
        if (!file) return;
        uploadArea.querySelector('.toy-file-name').textContent = file.name;
        currentFile = file;
        output.innerHTML = '<p>渲染中…</p>';
        const url = URL.createObjectURL(file);
        try {
            await renderAscii(url, output);
        } catch (err) {
            output.innerHTML = `<p style="color:red;">渲染失败：${err.message}</p>`;
        } finally {
            URL.revokeObjectURL(url);
        }
    });

    // 反色开关：重渲示例 + 用户上传的图
    invertCheck.addEventListener('change', async () => {
        invert = invertCheck.checked;
        const jobs = [...gallery.querySelectorAll('.toy-gallery-item .toy-ascii-slot')].map(
            (slot) => renderAscii(slot.dataset.src, slot)
        );
        if (currentFile) {
            output.innerHTML = '<p>渲染中…</p>';
            const url = URL.createObjectURL(currentFile);
            jobs.push(renderAscii(url, output).finally(() => URL.revokeObjectURL(url)));
        }
        await Promise.all(jobs).catch(() => { /* 单张失败不影响其他 */ });
    });

    container.append(uploadArea, output);

    // —— 示例画廊 ——
    const galleryTitle = document.createElement('h2');
    galleryTitle.textContent = '示例';
    const gallery = document.createElement('div');
    gallery.className = 'toy-gallery';

    for (const item of TOY_EXAMPLES) {
        const el = document.createElement('div');
        el.className = 'toy-gallery-item';
        const cap = document.createElement('p');
        cap.textContent = item.label;
        const slot = document.createElement('div');
        slot.className = 'toy-ascii-slot';
        slot.dataset.src = item.src; // 反色切换时按这个重新渲染
        el.append(cap, slot);
        renderAscii(item.src, slot, item.options).catch(() => { /* 示例加载失败就跳过 */ });
        gallery.append(el);
    }

    container.append(galleryTitle, gallery);
    return container;
}
