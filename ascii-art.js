// 图片转 Unicode 字符画组件（about 页 / toy 页共用）。
//
// 渲染管线拆成一组可独立开关的「阶段」函数（STAGES），按顺序原地变换灰度矩阵：
//   反相 → 去噪模糊 → 饱和度 → 白场 → 伽马 → Bayer 抖动量化
// 每个阶段 = { key(选项名), label(中文名), def(开启时的默认强度), slider(轴范围), fn(grays, opt, sats) }。
// STAGES 同时是 toy 页控件列表的数据源——核心与 UI 共用一份清单。
//
// 渲染：微字号 + transform scale 绕过浏览器最小字号限制；
//       text-shadow 叠印印章（颜色 outline）负责点阵融合。
// 旧版实现备份在 bak/ascii-art.backup.js。

const mapInPlace = (g, f) => { for (const row of g) for (let i = 0; i < row.length; i++) row[i] = f(row[i]); };
const clamp01 = (v) => v < 0 ? 0 : v > 1 ? 1 : v;

const STAGES = [
  { key: 'invert', label: '反相',
    fn: (g) => mapInPlace(g, v => 1 - v) },

  // 去噪模糊：抹平源图 JPEG 块状量化噪声（8px 块在采样后仍成组跳动），
  // 避免白场压缩把皮肤渐变里的小块噪声放大成可见的矩形密度斑块
  { key: 'blur', label: '去噪模糊', def: { blur: 1 }, slider: { min: 1, max: 3, step: 1 },
    fn: (g, o) => {
      const h = g.length, w = g[0].length, r = o.blur;
      const out = g.map((row, y) => row.map((_, x) => {
        let sum = 0, n = 0;
        for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
          const yy = y + dy, xx = x + dx;
          if (yy < 0 || yy >= h || xx < 0 || xx >= w) continue;
          sum += g[yy][xx]; n++;
        }
        return sum / n;
      }));
      for (let y = 0; y < h; y++) g[y] = out[y];
    } },

  // 饱和度（黑白转换语义：饱和度越高墨越重）：给「亮且饱和」的像素加墨
  //（如逆光暖肤被白场推成空格的额头边缘红晕）。
  // 必须排在白场之前：加墨把亮部中较暗、饱和的额头压到白场阈值之下留住墨点，
  // 而更亮的天空加墨后仍被钳成纯白——靠白场把两者分开
  { key: 'highlightInk', label: '饱和度', def: { highlightInk: 0.5 }, slider: { min: 0, max: 1, step: 0.05 },
    fn: (g, o, sats) => {
      for (let y = 0; y < g.length; y++) for (let x = 0; x < g[y].length; x++)
        g[y][x] *= 1 - clamp01((g[y][x] - 0.6) / 0.3) * sats[y][x] * o.highlightInk;
    } },

  // 白场：灰度砍断轴。≥ w 的像素直接归为纯白（抖动极值短路后零墨，真正的留白）；
  // [w-0.08, w) 用 smoothstep 平滑渐白——硬砍在平滑渐变上会切出「点阵↔纯白」的假轮廓
  //（雾面出「假太阳」、海面出「一坨空白」），软坡让砍断线两侧密度接近到不可分辨。
  // 大面积白通常不是真白（JPEG 噪点、雾的起伏都在 0.7~0.8 挡），w 就是「什么亮度算白」的轴
  { key: 'whitePoint', label: '白场', def: { whitePoint: 0.75 }, slider: { min: 0.55, max: 0.95, step: 0.01 },
    fn: (g, o) => {
      const w = o.whitePoint, a = w - 0.08;
      mapInPlace(g, v => {
        if (v >= w) return 1;
        if (v <= a) return v;
        const t = (v - a) / 0.08;
        return v + (1 - v) * t * t * (3 - 2 * t);
      });
    } },

  // 伽马校正：<1 提亮中间调，>1 压暗；纯黑纯白不动，只弯中间
  { key: 'gamma', label: '伽马', def: { gamma: 0.6 }, slider: { min: 0.4, max: 2, step: 0.05 },
    fn: (g, o) => mapInPlace(g, v => Math.pow(v, o.gamma)) },
];

/**
 * @param {HTMLImageElement|string} img - 图片对象或 URL
 * @param {Document} doc - document 对象
 * @param {Object} [options]
 * @param {number} [options.width=100] - 字符列数
 * @param {'both'|'direct'|'dither'} [options.mode='dither'] - 量化模式
 * @param {string[]} [options.charMap] - 字符集，索引 0 = 最暗（墨最重）
 * @param {string} [options.fontSize='10px'] - 渲染字号
 * @param {number} [options.scale=0.5] - 整体缩放（越小越融成点阵）
 * @param {number} [options.letterSpacing=0.65] - 字间距（em）
 * @param {number} [options.lineHeight=1.25] - 行高（em）
 * @param {string} [options.outline='#000'] - 叠印印章颜色
 * @param {boolean|number} [options.<stage>] - 各管线阶段开关；传 true 用 def 默认强度，传数字自定义
 * @returns {Promise<HTMLElement>}
 */
async function createBlockArtComponent(img, doc, options = {}) {
  const {
    width = 100,
    mode = 'dither',
    charMap = ['@', '%', '#', '*', '+', '=', '-', ':', '.', ' '],
    fontSize = '10px',
    scale = 0.5,
    letterSpacing = 0.65,
    lineHeight = 1.25,
    outline = '#000'
  } = options;

  const levels = charMap.length - 1;
  const BAYER_4X4 = [
    [ 0,  8,  2, 10],
    [12,  4, 14,  6],
    [ 3, 11,  1,  9],
    [15,  7, 13,  5]
  ].map(row => row.map(v => (v + 0.5) / 16.0));

  // 0. 生效参数：勾选的阶段补上各自的默认强度（显式传参优先；true = 用默认强度）
  const opt = { ...options };
  for (const s of STAGES) if (opt[s.key]) for (const k in s.def) if (opt[k] === undefined || opt[k] === true) opt[k] = s.def[k];

  // 1. 加载图片
  const imageObj = await new Promise((resolve, reject) => {
    if (!(typeof img === 'string' || img instanceof HTMLImageElement)) return reject(new Error('Invalid image'));
    if (img instanceof HTMLImageElement) {
      if (img.complete && img.naturalWidth) resolve(img);
      else { img.onload = () => resolve(img); img.onerror = reject; }
    } else {
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = img;
    }
  });

  // 2. 采样：格子宽 = 字宽 0.6em + 字间距，格子高 = 行高；按间距比换算行数保持画面比例
  const pitchX = 0.6 + letterSpacing;
  const pitchY = lineHeight;
  const aspect = imageObj.height / imageObj.width;
  const height = Math.floor(width * aspect * (pitchX / pitchY));

  const canvas = doc.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imageObj, 0, 0, width, height);

  const data = ctx.getImageData(0, 0, width, height).data;
  const grays = [], sats = [];
  for (let y = 0; y < height; y++) {
    const row = [], srow = [];
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      row.push((0.299 * r + 0.587 * g + 0.114 * b) / 255);
      srow.push((Math.max(r, g, b) - Math.min(r, g, b)) / 255);
    }
    grays.push(row);
    sats.push(srow);
  }

  // 3. 跑管线：按 STAGES 顺序执行所有开启的阶段
  for (const s of STAGES) if (opt[s.key]) s.fn(grays, opt, sats);

  // 4. 量化
  const escapeHTML = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const quantizeDirect = () => grays.map(row =>
    row.map(v => charMap[Math.min(Math.floor(v * levels), levels)]).join('')
  ).join('\n');
  const quantizeDither = () => grays.map((row, y) =>
    row.map((val, x) => {
      // 极值短路：抖动会把纯白/纯黑也拆成两档，产生满屏脏点
      if (val <= 0) return charMap[0];
      if (val >= 1) return charMap[levels];
      const jittered = val + (BAYER_4X4[y % 4][x % 4] - 0.5) / levels;
      return charMap[Math.floor(Math.max(0, Math.min(1, jittered)) * levels)];
    }).join('')
  ).join('\n');

  const text = mode === 'direct' ? quantizeDirect()
             : mode === 'dither' ? quantizeDither()
             : quantizeDirect() + quantizeDither();

  // 5. 渲染：scale 缩放后的视觉尺寸用来约束布局盒（transform 不改变布局）
  const rootFontPx = parseFloat(doc.defaultView.getComputedStyle(doc.documentElement).fontSize) || 16;
  const fontPx = /rem|em$/.test(fontSize) ? parseFloat(fontSize) * rootFontPx : (parseFloat(fontSize) || 10);
  const boxW = +(width * pitchX * fontPx * scale).toFixed(1);
  const boxH = +(height * pitchY * fontPx * scale).toFixed(1);

  const html = `
    <div class="block-art">
      <style>
        .block-art pre {
          font-family: 'JetBrains Mono', Consolas, Menlo, 'DejaVu Sans Mono', monospace;
          font-size: ${fontSize};
          line-height: ${lineHeight}em;
          letter-spacing: ${letterSpacing}em;
          font-weight: bold;
          color: #111;
          white-space: pre;
          width: max-content;
          overflow: hidden;
          margin: 0;
          /* 重置站点全局 pre 样式（米黄底/边框/横向滚动） */
          background: transparent;
          border: none;
          padding: 0;
          border-radius: 0;
          display: inline-block;
          /* 微字号 + scale：绕过浏览器最小字号限制 */
          transform: scale(${scale});
          transform-origin: top left;
          /* 叠印印章：2px 八方向 + 投影，让相邻字符的墨点互相融合 */
          text-shadow: -2px -2px 0 ${outline}, 2px -2px 0 ${outline}, -2px 2px 0 ${outline}, 2px 2px 0 ${outline},
                       -2px 0 0 ${outline}, 2px 0 0 ${outline}, 0 -2px 0 ${outline}, 0 2px 0 ${outline};
          filter: drop-shadow(1px 1px ${outline});
        }
      </style>
      <div style="width:${boxW}px;height:${boxH}px;overflow:hidden;">
        <pre>${escapeHTML(text)}</pre>
      </div>
    </div>
  `;

  return doc.createRange().createContextualFragment(html).firstElementChild;
}
