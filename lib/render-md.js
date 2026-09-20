// 极简 Markdown 渲染器（标题、粗体/斜体、链接、图片、代码块、行内代码、列表、段落）
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
    //    块里有列表标记（- / * / + / 1.）就交给 renderList，按缩进嵌套
    out = out.split(/\n\s*\n/).map(block => {
        const head = block.trim();
        if (!head) return '';
        // 以标题 / 代码块占位符开头的块：原样输出（它自带块级标签）
        if (/^<(h[1-6]|pre|ul|ol|li|blockquote)/.test(head) || /^\u0000B\d+\u0000$/.test(head)) return head;
        // 列表要保留缩进，所以不能用 head（它把整块 trim 掉了）；顺手去掉 CRLF 留下的 \r
        const lines = block.split('\n').map(l => l.replace(/\r$/, ''));
        while (lines.length && !lines[0].trim()) lines.shift();            // 首尾空行丢掉
        while (lines.length && !lines[lines.length - 1].trim()) lines.pop(); // （旧实现靠 block.trim()）
        if (!lines.length) return '';
        if (lines.some(isListItem)) return renderList(lines);
        return `<p>${lines.map(l => l.trim()).join('<br>')}</p>`;
    }).join('\n');

    // 7. 还原代码
    return out.replace(/\u0000[BI](\d+)\u0000/g, (m, i) => codeBlocks[i]);
}

// 列表项：- / * / + 或 1. / 1)
const LIST_ITEM = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
// 分隔线（- - - / --- / ***）：长得像列表项，但不能当列表处理，否则文章里的分隔线会变成条目
const isDivider = line => /^\s*([-*_])(\s*\1){2,}\s*$/.test(line);
const isListItem = line => LIST_ITEM.test(line) && !isDivider(line);

// 列表：把带缩进的行渲染成嵌套的 <ul> / <ol>
//   - 项          → <ul><li>
//   1. 项         → <ol><li>
//   缩进更深的项   → 嵌到上一个列表项里（子列表）
//   不以标记开头的行：列表之前 → 当普通段落；列表项之后 → 接在该项文字后面（<br> 分隔）
function renderList(lines) {
    const root = { indent: -1, tag: null, items: [] };
    const stack = [root];
    const lead = [];   // 列表之前的普通行
    let last = null;   // 最近一个列表项（续行接到它后面）
    let lastIndent = -1;

    for (const line of lines) {
        const m = line.match(LIST_ITEM);
        if (!m) {
            if (last) last.text.push(line.trim());
            else lead.push(line.trim());
            continue;
        }

        const indent = m[1].replace(/\t/g, '    ').length;
        const tag = /^\d/.test(m[2]) ? 'ol' : 'ul';
        // 任务列表：- [ ] / - [x]
        const text = m[3].trim().replace(/^\[( |x|X)\]\s*/, (_, c) => (c === ' ' ? '☐ ' : '☑ '));
        const item = { text: [text], subs: [] };

        // 比上一项更深 → 在上一项下面开一层子列表；否则回到对应层级（同级/更浅）
        if (last && indent > lastIndent) {
            const sub = { indent, tag, items: [] };
            last.subs.push(sub);
            stack.push(sub);
        } else {
            while (stack.length > 1 && indent < stack[stack.length - 1].indent) stack.pop();
        }

        const top = stack[stack.length - 1];
        if (!top.tag) top.tag = tag;   // 这层的第一项决定是 ul 还是 ol
        top.items.push(item);
        last = item;
        lastIndent = indent;
    }

    const html = root.items.length ? render(root) : '';
    return (lead.length ? `<p>${lead.join('<br>')}</p>` : '') + html;

    function render(node) {
        const tag = node.tag || 'ul';
        const inner = node.items.map(item =>
            `<li>${item.text.join('<br>')}${item.subs.map(render).join('')}</li>`
        ).join('');
        return `<${tag}>${inner}</${tag}>`;
    }
}

// 页面用的入口：字符串 → 节点，并给代码块挂复制按钮
function renderMD(md) {
    const nodes = raw(renderMDString(md));
    decorateCodeBlocks(nodes);
    return nodes;
}
