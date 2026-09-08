// 图片转 Unicode 字符画组件（about 页 / toy 页共用）。
//
// 管线（所有增强步骤默认关闭，基线 = 采样 → Bayer 抖动量化）：
//   采样 luma → 反色 invert → 盒式模糊 blur → 对比度拉伸 autoContrast
//   → 白场 whitePoint → gamma → 饱和度加墨 saturation → 量化（direct / dither）
//
// 渲染：微字号 + transform scale 绕过浏览器最小字号限制；
//       text-shadow 叠印印章（颜色 outline）负责点阵融合。
// 旧版实现备份在 bak/ascii-art.backup.js。

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
 * @param {boolean} [options.invert=false] - 反色
 * @param {number} [options.blur=0] - 采样后盒式模糊半径（格），去源图噪声
 * @param {boolean} [options.autoContrast=false] - 满幅对比度拉伸（低对比窄区间图用）
 * @param {number} [options.whitePoint=1] - 白场（0~1），≥该值视为纯白
 * @param {number} [options.gamma=1] - gamma 校正
 * @param {number} [options.saturation=0] - 饱和度加墨（0~1）
 * @param {string} [options.outline='#000'] - 叠印印章颜色
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
    invert = false,
    blur = 0,
    autoContrast = false,
    whitePoint = 1,
    gamma = 1,
    saturation = 0,
    outline = '#000'
  } = options;

  const levels = charMap.length - 1;
  const BAYER_4X4 = [
    [ 0,  8,  2, 10],
    [12,  4, 14,  6],
    [ 3, 11,  1,  9],
    [15,  7, 13,  5]
  ].map(row => row.map(v => (v + 0.5) / 16.0));

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

  // 3. 反色
  if (invert) {
    for (const row of grays) for (let i = 0; i < row.length; i++) row[i] = 1 - row[i];
  }

  // 4. 盒式模糊：抹掉源图噪声，避免抖动出现盐椒斑点
  if (blur > 0) {
    const out = grays.map((row, y) => row.map((_, x) => {
      let sum = 0, n = 0;
      for (let dy = -blur; dy <= blur; dy++) {
        for (let dx = -blur; dx <= blur; dx++) {
          const yy = y + dy, xx = x + dx;
          if (yy < 0 || yy >= height || xx < 0 || xx >= width) continue;
          sum += grays[yy][xx]; n++;
        }
      }
      return sum / n;
    }));
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) grays[y][x] = out[y][x];
  }

  // 5. 对比度拉伸：把实际灰度范围映射到 0~1（窄区间低对比图才需要）
  if (autoContrast) {
    let min = 1, max = 0;
    for (const row of grays) for (const v of row) { if (v < min) min = v; if (v > max) max = v; }
    const range = (max - min) || 1;
    for (const row of grays) for (let i = 0; i < row.length; i++) row[i] = (row[i] - min) / range;
  }

  // 6. 白场：≥ whitePoint 的都算纯白（亮背景照片的 JPEG 噪点会让人到不了 1.0，用它扳回来）
  if (whitePoint < 1) {
    for (const row of grays) for (let i = 0; i < row.length; i++) row[i] = Math.min(1, row[i] / whitePoint);
  }

  // 7. gamma 校正：<1 提亮中间调，>1 压暗
  if (gamma !== 1) {
    for (const row of grays) for (let i = 0; i < row.length; i++) row[i] = Math.pow(row[i], gamma);
  }

  // 8. 饱和度加墨：放在色调管线之后，彩色区域从最终档位上直接加墨
  if (saturation > 0) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const ink = Math.max(0, Math.min(1, (sats[y][x] - 0.2) * 2.5)) * saturation;
        grays[y][x] *= 1 - ink;
      }
    }
  }

  // 9. 量化
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

  // 10. 渲染：scale 缩放后的视觉尺寸用来约束布局盒（transform 不改变布局）
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
