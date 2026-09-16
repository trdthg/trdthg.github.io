// 极简 Markdown 渲染器（标题、粗体/斜体、链接、图片、代码块、行内代码、段落）
//
//   renderMDString(md)  md → HTML 字符串，纯函数（不碰 DOM，可以直接在 Node 里跑）
//   renderMD(md)        md → DocumentFragment，并给里面的代码块挂上右上角的复制按钮
//
// 页面用 renderMD（调用方不用管内容什么时候插进页面，异步插入也自动带按钮）；
// 只有需要「一段 HTML 文本」的场景（摘要、搜索索引、导出）才用 renderMDString ——
// 它的输出里没有复制按钮，因为按钮的点击事件没法序列化成 HTML。

function escapeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderMDString(md) {
    // 1. 先把代码块 / 行内代码抽成占位符，避免被后面的替换和分段破坏
    const codeBlocks = [];
    let out = md.replace(/```(\w*)\n([\s\S]*?)```/g, (m, lang, code) => {
        const langClass = lang ? ' class="language-' + lang + '"' : '';
        codeBlocks.push('<pre><code' + langClass + '>' + escapeHTML(code) + '</code></pre>');
        return '\u0000B' + (codeBlocks.length - 1) + '\u0000';
    });
    out = out.replace(/`([^`]+)`/g, (m, code) => {
        codeBlocks.push('<code>' + escapeHTML(code) + '</code>');
        return '\u0000I' + (codeBlocks.length - 1) + '\u0000';
    });

    // 2. 图片 ![alt](url)（要放在链接之前，避免被链接规则吃掉）
    out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');

    // 3. 链接 [text](url)
    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // 4. 粗体 **text** / 斜体 _text_
    out = out.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/(?<![\w])_([^_\n]+)_(?![\w])/g, '<i>$1</i>');

    // 5. 标题（行首 #、##、###）
    out = out.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    out = out.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    out = out.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // 6. 段落处理：空行分块（块 = 段落），块内单换行 → <br>（标准 Markdown 软换行语义，
    //    这样空行和单换行就有了区别：前者分段，后者仅换行）
    out = out.split(/\n\s*\n/).map(block => {
        block = block.trim();
        if (!block) return '';
        if (/^<(h[1-6]|pre|ul|ol|li|blockquote)/.test(block) || /^\u0000B\d+\u0000$/.test(block)) return block;
        return `<p>${block.split('\n').map(l => l.trim()).join('<br>')}</p>`;
    }).join('\n');

    // 7. 还原代码
    return out.replace(/\u0000[BI](\d+)\u0000/g, (m, i) => codeBlocks[i]);
}

// 页面用的入口：字符串 → 节点，并给代码块挂复制按钮
function renderMD(md) {
    const nodes = raw(renderMDString(md));
    decorateCodeBlocks(nodes);
    return nodes;
}
