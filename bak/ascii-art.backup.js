// 图片转 Unicode 字符画组件（about 页 / toy 页共用）。
// 渲染管线：采样灰度 → 对比度拉伸 → gamma 校正 → Bayer 4x4 有序抖动量化 → 微字号 + 叠印渲染

/**
 * 传入图片与 document 对象，返回包含 Unicode 字符画渲染结果的 HTMLElement 组件节点
 * 
 * @param {HTMLImageElement|string} img - 图片对象 (HTMLImageElement) 或图片 URL
 * @param {Document} doc - 传入的 document 对象
 * @param {Object} [options] - 配置选项
 * @param {number} [options.width=100] - 渲染字符宽度（列数）
 * @param {'both'|'direct'|'dither'} [options.mode='both'] - 渲染模式
 * @param {string[]} [options.charMap] - 字符集映射表（暗 → 密）
 * @param {string} [options.fontSize='10px'] - 字体大小
 * @param {number} [options.scale=0.5] - 整体缩放，越小字符越融成点阵
 * @param {number} [options.letterSpacing=0.65] - 字间距（em）
 * @param {number} [options.lineHeight=1] - 行高（em），< 1 时相邻行互相叠加
 * @param {boolean} [options.autoContrast=false] - 是否做灰度拉伸
 * @param {number} [options.gamma=1] - gamma 校正，<1 提亮中间调，>1 压暗
 * @param {number} [options.whitePoint=1] - 白场（0~1），≥ 该值的像素视为纯白
 * @param {boolean} [options.invert=false] - 反色：浅底深字时开启，否则成负片
 * @param {string} [options.outline='#000'] - 叠印印章颜色（text-shadow/drop-shadow）
 * @returns {Promise<HTMLElement>} 返回包含样式和内容的 HTMLElement 组件
 */
async function createBlockArtComponent(img, doc, options = {}) {
  const {
    width = 100,
    mode = 'both',
    charMap = [" ", "░", "▒", "▓", "█"],
    fontSize = '10px',
    scale = 0.5,
    letterSpacing = 0.65,  // 字间距（em）
    lineHeight = 1,        // 行高（em），< 1 时相邻行互相叠加
    autoContrast = false,
    gamma = 1,
    whitePoint = 0.85,
    blur = 0,                // 采样后盒式模糊半径（格子数），抹掉源图噪声导致的抖动斑点
    saturation = 0,
    invert = false,
    outline = '#000'
  } = options;

  const BAYER_4X4 = [
    [ 0,  8,  2, 10],
    [12,  4, 14,  6],
    [ 3, 11,  1,  9],
    [15,  7, 13,  5]
  ].map(row => row.map(v => (v + 0.5) / 16.0));

  // 1. 确保 Image 加载完成
  const loadImage = (src) => new Promise((resolve, reject) => {
    if (typeof src === 'string') {
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    } else if (src instanceof HTMLImageElement) {
      if (src.complete && src.naturalWidth !== 0) resolve(src);
      else {
        src.onload = () => resolve(src);
        src.onerror = reject;
      }
    } else {
      reject(new Error('Invalid image object'));
    }
  });

  const imageObj = await loadImage(img);

  // 2. 图像采样与灰度提取
  // 格子宽 = 字宽 0.6em + 字间距；格子高 = 行高。按实际间距比换算行数，保持画面比例
  const pitchX = 0.6 + letterSpacing;
  const pitchY = lineHeight;
  const aspect = imageObj.height / imageObj.width;
  const height = Math.floor(width * aspect * (pitchX / pitchY));

  const canvas = doc.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imageObj, 0, 0, width, height);

  const imgData = ctx.getImageData(0, 0, width, height).data;
  const grays = [];

  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      // Luma 灰度计算；饱和度加墨**只作用于高亮区**（0.6~0.9 渐入）：
      //     收益场景只有「亮且饱和」（如逆光的暖色皮肤被白场推成空格），
      //     暗部/中间调的彩色像素（嘴唇、阴影）不额外加墨，避免污染整体细节
      const r = imgData[idx], g = imgData[idx + 1], b = imgData[idx + 2];
      const sat = (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
      const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;
      const brightGate = Math.max(0, Math.min(1, (luma - 0.6) / 0.3));
      const gray = luma * (1 - sat * saturation * brightGate);
      row.push(gray);
    }
    grays.push(row);
  }

  // 2.3 盒式模糊：每个格子取周围 (2r+1)² 格的平均值，抹掉源图噪声——
  //     噪声会让相邻格子跳档，抖动后变成满屏盐椒斑点；模糊让过渡连贯
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

  // 2.4 反色：交换明暗方向 —— 亮像素→密字符 的映射配黑底是对的，
  //     白纸黑墨（浅底深字）时必须反色，否则整体变负片
  if (invert) {
    for (const row of grays) {
      for (let i = 0; i < row.length; i++) row[i] = 1 - row[i];
    }
  }

  // 2.5 对比度拉伸：把实际灰度范围映射到 0~1，让字符集的所有档位都参与量化
  //     低对比图片（暗调人像、雪景、阴天）不开这个会挤在中间几个档位
  if (autoContrast) {
    let min = 1, max = 0;
    for (const row of grays) {
      for (const v of row) {
        if (v < min) min = v;
        if (v > max) max = v;
      }
    }
    const range = (max - min) || 1;
    for (const row of grays) {
      for (let i = 0; i < row.length; i++) row[i] = (row[i] - min) / range;
    }
  }

  // 2.6 白场：宣布“≥ whitePoint 的都算纯白”（Levels 白场滑杆），
  //     亮背景照片因 JPEG 噪点没有一个像素到 1.0，导致留白消失，用它扳回来
  if (whitePoint < 1) {
    for (const row of grays) {
      for (let i = 0; i < row.length; i++) row[i] = Math.min(1, row[i] / whitePoint);
    }
  }

  // 2.7 gamma 校正：黑底白字下小字符的墨量不足，中间调会被感知得偏暗
  //     gamma < 1 提亮中间调（如 0.6），gamma > 1 压暗
  if (gamma !== 1) {
    for (const row of grays) {
      for (let i = 0; i < row.length; i++) row[i] = Math.pow(row[i], gamma);
    }
  }

  // 3. 计算文本字符画
  const levels = charMap.length - 1;
  const escapeHTML = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  let directText = '';
  if (mode === 'both' || mode === 'direct') {
    directText = grays.map(row => 
      row.map(val => charMap[Math.min(Math.floor(val * levels), levels)]).join('')
    ).join('\n');
  }

  let ditherText = '';
  if (mode === 'both' || mode === 'dither') {
    ditherText = grays.map((row, y) => 
      row.map((val, x) => {
        // 极值不参与抖动：抖动会把纯白/纯黑也拆成两档，产生满屏脏点
        if (val <= 0) return charMap[0];
        if (val >= 1) return charMap[levels];
        const bayerVal = BAYER_4X4[y % 4][x % 4];
        let jittered = val + (bayerVal - 0.5) / levels;
        // 錦到 1.0（不能是 0.9999：那会让 floor 后永远到不了最疏的空格档）
        jittered = Math.max(0, Math.min(1, jittered));
        return charMap[Math.floor(jittered * levels)];
      }).join('')
    ).join('\n');
  }

  // 计算 scale(0.5) 缩放后的实际视觉尺寸，用来约束布局（transform 不改变布局盒）
  const rootFontPx = parseFloat(doc.defaultView.getComputedStyle(doc.documentElement).fontSize) || 16;
  const fontPx = /rem|em$/.test(fontSize) ? parseFloat(fontSize) * rootFontPx : (parseFloat(fontSize) || 10);
  const boxW = +(width * pitchX * fontPx * scale).toFixed(1);
  const boxH = +(height * pitchY * fontPx * scale).toFixed(1);

  // 4. 只输出字符画本身，不带卡片/标题/边框
  const text = mode === 'direct' ? directText : ditherText;

  const htmlTemplate = `
    <div class="block-art">
      <style>
        .block-art pre {
          font-family: 'JetBrains Mono', Consolas, Menlo, monospace;
          font-size: ${fontSize};
          line-height: ${lineHeight}em;
          letter-spacing: ${letterSpacing}em;
          font-weight: bold;
          color: #111;
          white-space: pre;
          margin: 0;
          width: max-content;
          overflow: hidden;
          /* 重置站点全局 pre 样式（米黄色背景/边框） */
          background: transparent;
          border: none;
          padding: 0;
          border-radius: 0;
          display: inline-block;
          /* 先按 0.2rem 渲染再缩小：绕过浏览器最小字号限制，
             scale 越小字符越融成点阵（0.5 是分界线） */
          transform: scale(${scale});
          transform-origin: top left;
          /* 原作者点阵叠加的秘诀：2px 印章对 3.2px 的字是巨型墨团，
             每个字符盖 9 个章，相邻字符的印章互相叠印融合 */
          text-shadow: -2px -2px 0 ${outline}, 2px -2px 0 ${outline}, -2px 2px 0 ${outline}, 2px 2px 0 ${outline}, -2px 0 0 ${outline}, 2px 0 0 ${outline}, 0 -2px 0 ${outline}, 0 2px 0 ${outline};
          filter: drop-shadow(1px 1px ${outline});
        }
      </style>
      <div style="width:${boxW}px;height:${boxH}px;overflow:hidden;">
        <pre>${escapeHTML(text)}</pre>
      </div>
    </div>
  `;

  // 返回解析出的 HTMLElement 节点
  return doc.createRange().createContextualFragment(htmlTemplate).firstElementChild;
}
