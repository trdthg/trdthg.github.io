// 极简 Markdown 渲染器（标题、粗体/斜体、链接、代码块、行内代码、段落）
// 供 index.html 使用：escapeHTML / renderMD 都挂到全局。

function escapeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderMD(md) {
    // 1. 先把代码块 / 行内代码抽成占位符，避免被后面的替换和分段破坏
    const codeBlocks = [];
    let html = md.replace(/```(\w*)\n([\s\S]*?)```/g, (m, lang, code) => {
        const langClass = lang ? ' class="language-' + lang + '"' : '';
        codeBlocks.push('<pre><code' + langClass + '>' + escapeHTML(code) + '</code></pre>');
        return '\u0000B' + (codeBlocks.length - 1) + '\u0000';
    });
    html = html.replace(/`([^`]+)`/g, (m, code) => {
        codeBlocks.push('<code>' + escapeHTML(code) + '</code>');
        return '\u0000I' + (codeBlocks.length - 1) + '\u0000';
    });

    // 2. 链接 [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // 3. 粗体 **text** / 斜体 _text_
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/(?<![\w])_([^_\n]+)_(?![\w])/g, '<i>$1</i>');

    // 4. 标题（行首 #、##、###）
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // 5. 段落处理（代码块占位符单独成行，不会被拆开）
    html = html.split(/\n+/).map(line => {
        line = line.trim();
        if (!line) return '';
        if (/^<(h[1-6]|pre|ul|ol|li|blockquote)/.test(line)) return line;
        if (/^\u0000B\d+\u0000$/.test(line)) return line;
        return `<p>${line}</p>`;
    }).join('\n');

    // 6. 还原代码
    html = html.replace(/\u0000[BI](\d+)\u0000/g, (m, i) => codeBlocks[i]);

    return html;
}
