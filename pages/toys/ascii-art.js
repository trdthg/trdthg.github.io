// TOY：图片转字符画。字符画渲染核心在根目录 ascii-art.js（createBlockArtComponent + STAGES）。
// 文件尾把本页注册进 TOYS 列表（见 pages/toy.js）。

const ASCII_ART_OPTIONS = {
    width: 160,
    mode: 'dither',
    fontSize: '0.2rem',
    scale: 0.5,
    outline: '#111'
};

// 默认开启的管线阶段（轴的值统一由控件滑杆给出）
const DEFAULT_STAGES = new Set(['whitePoint', 'highlightInk']);

const TOY_EXAMPLES = [
    { src: 'assets/images/youmu2.png', label: 'https://en.touhouwiki.net/wiki/Youmu_Konpaku' },
    { src: 'assets/images/madoka_small.jpg', label: '红色帽子' },
    { src: 'assets/images/portrait-64.jpg',   label: '高对比测试示例' },
    { src: 'assets/images/portrait-338.jpg',  label: '低对比度测试示例 (无中生有出太阳，但是颜色确实微微不一样)' },
];

async function renderToyAsciiArt() {
    const container = document.createElement('div');
    container.className = 'toy-page';
    container.innerHTML = `
        <style>
            /* TOY 页局部样式：所有选择器都限定在 .toy-page 下 */
            .toy-page .toy-main { display: flex; gap: 28px; align-items: flex-start; margin: 1em 0; }
            .toy-page .toy-left, .toy-page .toy-right { flex: 1 1 0; min-width: 0; }
            .toy-page .toy-controls { display: flex; flex-direction: column; gap: 7px; margin-bottom: 1.2em; }
            .toy-page .toy-buttons { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 10px; }
            .toy-page .toy-reset-btn { cursor: pointer; }
            .toy-page .toy-stage-row { display: flex; align-items: center; gap: 7px; white-space: nowrap; }
            .toy-page .toy-stage-name { min-width: 4.5em; }
            .toy-page .toy-stage-row input[type=range] { width: 110px; }
            .toy-page .toy-stage-val { font-size: 0.85em; opacity: 0.65; min-width: 2.8em; }
            .toy-page .toy-upload { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 1.2em; }
            .toy-page .toy-compare { display: flex; gap: 12px; align-items: flex-start; }
            .toy-page .toy-example-label { font-weight: bold; margin-bottom: 8px; }
            .toy-page .toy-example-row { display: flex; gap: 12px; align-items: flex-start; }
            .toy-page .toy-compare { margin-bottom: 1.2em; }
            .toy-page .toy-example { margin-bottom: 24px; }
            .toy-page figure { margin: 0; flex: 1; min-width: 0; }
            .toy-page figcaption { font-size: 0.9em; opacity: 0.7; margin-bottom: 4px; }
            /* max-height 必须顶掉全局 #content img 的 480px 限制，否则瘦高图会被压扁变形 */
            .toy-page .toy-photo { display: block; background: #fff; max-width: 100%; max-height: none !important; }
            /* 上传框：3:2 横向比例的拖拽/点击上传区 */
            .toy-page .toy-dropzone {
                width: 100%; aspect-ratio: 3 / 2; box-sizing: border-box;
                display: flex; align-items: center; justify-content: center;
                text-align: center; opacity: 0.55; cursor: pointer;
                border: 2px dashed #999; border-radius: 4px;
            }
            .toy-page .toy-dropzone.dragover { opacity: 1; border-color: #4a90d9; color: #4a90d9; }

            /* 移动端：改纵向，示例排到上传对照下面；fitAll 会在 resize 时按新格宽重新适配 */
            @media (max-width: 768px) {
                .toy-page .toy-main { flex-direction: column; }
                .toy-page .toy-left, .toy-page .toy-right { width: 100%; }
            }
        </style>
        <h1>图片转字符画</h1>
        <div class="toy-main">
            <div class="toy-left">
                <div class="toy-upload">
                    <button class="toy-upload-btn">选一张图片 🖼️</button>
                    <button type="button" class="toy-reset-btn">重置 ↺</button>
                    <span class="toy-file-name"></span>
                    <input type="file" accept="image/*" hidden>
                </div>
                <div class="toy-controls"></div>
                <div class="toy-compare">
                    <figure>
                        <figcaption>原图（拖拽 / 点击上传）</figcaption>
                        <div class="toy-dropzone">拖拽图片到这里<br>或点击上传</div>
                        <img class="toy-photo toy-orig-img" style="display:none" alt="上传的原图">
                    </figure>
                    <figure>
                        <figcaption>渲染</figcaption>
                        <div class="toy-ascii-slot toy-ascii-output"></div>
                    </figure>
                </div>
            </div>
            <div class="toy-right">
                <h2>示例</h2>
                <div class="toy-gallery"></div>
            </div>
        </div>
    `;

    // —— 页面状态：开关 + 各阶段轴的值（初始取核心的 def 默认强度）——
    const stageOn = Object.fromEntries(STAGES.map(s => [s.key, DEFAULT_STAGES.has(s.key)]));
    const stageVal = Object.fromEntries(STAGES.map(s =>
        [s.key, s.def ? Object.values(s.def)[0] : null]));
    let currentURL = null; // 用户上传图的对象 URL（缓存复用，换图时才 revoke）

    // —— 控件列表行 ——
    const controls = container.querySelector('.toy-controls');
    controls.insertAdjacentHTML('beforeend', STAGES.map(s => {
        if (!s.slider) return `
            <label class="toy-stage-row">
                <input type="checkbox" data-stage="${s.key}" ${stageOn[s.key] ? 'checked' : ''}>
                <span class="toy-stage-name">${s.label}</span>
            </label>`;
        const dec = s.slider.step < 1 ? 2 : 0;
        return `
            <label class="toy-stage-row">
                <input type="checkbox" data-stage="${s.key}" ${stageOn[s.key] ? 'checked' : ''}>
                <span class="toy-stage-name">${s.label}</span>
                <input type="range" data-stage="${s.key}" min="${s.slider.min}" max="${s.slider.max}"
                       step="${s.slider.step}" value="${stageVal[s.key]}">
                <span class="toy-stage-val" data-stage="${s.key}">${(+stageVal[s.key]).toFixed(dec)}</span>
            </label>`;
    }).join(''));

    // —— 图片缓存：同一张图只解码一次。调轴重渲时不再重新建 Image/解码，消除闪烁的关键 ——
    const imgCache = new Map();
    const getImage = (src) => {
        if (!imgCache.has(src)) {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = src;
            imgCache.set(src, img.decode().then(() => img).catch(err => { imgCache.delete(src); throw err; }));
        }
        return imgCache.get(src);
    };

    const output = container.querySelector('.toy-ascii-output');
    const origImg = container.querySelector('.toy-orig-img');
    let gen = 0;      // 渲染代次：控件变了就 +1，过期的渲染结果直接丢弃
    let timer = null; // 防抖：轴拖动时合并渲染

    const renderAscii = async (src, host, extra = {}) => {
        const g = gen;
        const img = await getImage(src);
        const opt = { ...extra };
        for (const s of STAGES) {
            if (!stageOn[s.key]) delete opt[s.key];
            else opt[s.key] = stageVal[s.key] ?? true;
        }
        const el = await createBlockArtComponent(img, document, { ...ASCII_ART_OPTIONS, ...opt });
        if (g !== gen) return;        // 渲染期间控件又变了，结果过期，丢弃
        host.replaceChildren(el);     // 原地替换：旧图一直显示到新图就绪，不闪
        fitPair(host.closest('.toy-compare') || host.closest('.toy-example'));
    };

    const rerenderOutput = async () => {
        if (!currentURL) return;
        try {
            await renderAscii(currentURL, output);
        } catch (err) {
            output.replaceChildren(Object.assign(document.createElement('p'),
                { textContent: `渲染失败：${err.message}`, style: 'color:red' }));
        }
    };

    const rerenderAll = () => {
        gen++;
        for (const slot of container.querySelectorAll('.toy-gallery .toy-ascii-slot'))
            renderAscii(slot.dataset.src, slot).catch(() => {});
        rerenderOutput();
    };

    // 轴拖动/开关切换：60ms 防抖合并，拖动过程不至于每个刻度都全量重渲
    const scheduleRerender = () => {
        clearTimeout(timer);
        timer = setTimeout(rerenderAll, 60);
    };

    container.querySelector('.toy-controls').addEventListener('input', (e) => {
        const key = e.target.dataset?.stage;
        if (!key) return;
        if (e.target.type === 'checkbox') stageOn[key] = e.target.checked;
        else {
            stageVal[key] = +e.target.value;
            const dec = +e.target.step < 1 ? 2 : 0;
            container.querySelector(`.toy-stage-val[data-stage="${key}"]`).textContent = (+e.target.value).toFixed(dec);
        }
        scheduleRerender();
    });

    // 重置：开关回默认集、轴回核心 def 默认强度，同步 UI 后全图重渲
    container.querySelector('.toy-reset-btn').addEventListener('click', () => {
        for (const s of STAGES) {
            stageOn[s.key] = DEFAULT_STAGES.has(s.key);
            if (s.def) stageVal[s.key] = Object.values(s.def)[0];
        }
        for (const row of controls.querySelectorAll('.toy-stage-row')) {
            const key = row.querySelector('input').dataset.stage;
            row.querySelector('input[type=checkbox]').checked = stageOn[key];
            const range = row.querySelector('input[type=range]');
            if (!range) continue;
            const s = STAGES.find(x => x.key === key);
            const dec = s.slider.step < 1 ? 2 : 0;
            range.value = stageVal[key];
            row.querySelector('.toy-stage-val').textContent = (+stageVal[key]).toFixed(dec);
        }
        gen++;
        rerenderAll();
    });

    const fileInput = container.querySelector('input[type=file]');
    const dropzone = container.querySelector('.toy-dropzone');
    const handleFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        container.querySelector('.toy-file-name').textContent = file.name;
        const oldURL = currentURL;
        currentURL = URL.createObjectURL(file);   // 缓存复用，换图时才 revoke
        if (oldURL) { imgCache.delete(oldURL); URL.revokeObjectURL(oldURL); }
        origImg.src = currentURL;
        origImg.style.display = 'block';
        dropzone.style.display = 'none';
        gen++;
        rerenderOutput();
    };
    container.querySelector('.toy-upload-btn').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => handleFile(fileInput.files[0]));
    // 原图格：点击选图，拖拽上传
    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        handleFile(e.dataTransfer.files[0]);
    });
    origImg.addEventListener('load', () => fitPair(origImg.closest('.toy-compare')));

    // —— 显示尺寸：内容 = min(原图自然宽，格子宽)，原图与渲染图永远一样大。
    // 字符画本体宽度由字号/字体环境决定，不硬编码：先按上次 zoom 粗设，再用实测宽度校正一次（线性，一步收敛）
    const fitPair = (pair) => {
        const slot = pair?.querySelector('.toy-ascii-slot');
        const inner = slot?.querySelector('.block-art > div');
        if (!slot || !slot.parentElement.clientWidth) return;
        const cell = slot.parentElement.clientWidth;
        const img = pair.querySelector('.toy-photo');
        let target = cell;
        if (img && img.style.display !== 'none' && img.naturalWidth)
            target = Math.min(img.naturalWidth, cell);
        if (img) img.style.width = target + 'px';
        if (!inner) return;
        const zoom0 = parseFloat(slot.style.zoom) || 1;
        const natural = inner.getBoundingClientRect().width / zoom0;   // 还原到未缩放宽度
        slot.style.zoom = target / natural;
    };
    const fitAll = () => container.querySelectorAll('.toy-compare, .toy-example').forEach(fitPair);
    fitAll();
    window.addEventListener('resize', fitAll);

    // —— 示例画廊：从上到下三张，每张 = 原图 | 渲染图 ——
    const gallery = container.querySelector('.toy-gallery');
    for (const item of TOY_EXAMPLES) {
        const example = document.createElement('div');
        example.className = 'toy-example';
        example.append(Object.assign(document.createElement('div'),
            { className: 'toy-example-label', textContent: item.label }));
        const row = document.createElement('div');
        row.className = 'toy-example-row';
        const photoFig = document.createElement('figure');
        const img = new Image();
        img.className = 'toy-photo';
        img.src = item.src;
        img.alt = item.label;
        img.addEventListener('load', () => fitPair(example));
        photoFig.append(img);
        const asciiFig = document.createElement('figure');
        const slot = document.createElement('div');
        slot.className = 'toy-ascii-slot';
        slot.dataset.src = item.src;
        asciiFig.append(slot);
        row.append(photoFig, asciiFig);
        example.append(row);
        gallery.append(example);
        renderAscii(item.src, slot).then(() => fitPair(example)).catch(() => { /* 示例加载失败就跳过 */ });
    }

    return container;
}
