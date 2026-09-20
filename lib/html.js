// 极简「无构建版 JSX」：htm（1.4KB，CDN 引入）+ 这里的 h 函数，直接产出真实 DOM。
//
//   const node = html`<figure>
//       <img src=${url} alt=${note} loading="lazy" />
//       <figcaption>${note}</figcaption>
//   </figure>`;
//
// 语法规则（htm 的要求 + 本文件的约定）：
//   1. 属性值可以不加引号：src=${url}、alt="a b"
//   2. 空元素必须自闭合：<img ... />、<br />（写成 <img> 会把后面的兄弟节点吃成子节点）
//   3. class 写 class=（不是 className）；事件写 onclick= / oninput=，h 里会转成 addEventListener，
//      值必须是函数（不能像 HTML 那样写内联字符串 onclick="..."）
//   4. ${} 里可以是字符串/数字、DOM 节点、数组、DocumentFragment、null/false/''（null/false/'' 会被跳过）
//   5. 字符串按纯文本插入（不会注入）；要塞 HTML 字符串用 innerHTML=${...} 或 raw()
//   6. ${cond && html`...`} 可以直接用，条件为假时输出 false 被忽略
//   7. 正文里的 < 必须写成 ${'<'}（htm 见到 < 就当标签开始），例如 "<100k" 要写成 ${'<100k'}

// 这几个字段必须走 property 而不是 attribute（attribute 是「初始值」，property 是「当前值」）
const PROPS = new Set(['value', 'checked', 'disabled', 'selected', 'multiple', 'textContent', 'innerHTML']);

function h(tag, props, ...children) {
    // htm 默认会把同一个模板字符串创建出的对象缓存复用（README 的 Caching 一节），
    // 而我们产出的是真实 DOM 节点 —— 复用意味着同一个节点被 append 到多处，后一次会把前一次的搬走。
    // 按官方建议把 this[0] 置为 3，告诉 htm 不要缓存创建出来的元素。
    if (Array.isArray(this)) this[0] = 3;

    const node = document.createElement(tag);

    for (const [key, value] of Object.entries(props || {})) {
        if (value == null || value === false) continue;

        if (key === 'class') node.className = value;
        else if (key === 'style' && typeof value === 'object') Object.assign(node.style, value);
        else if (key.startsWith('on')) {
            // 必须是函数：addEventListener 收到字符串会抛一个很难看懂的 TypeError，这里提前报清楚
            if (typeof value !== 'function') {
                throw new TypeError(`html\`\`: ${key} 的值必须是函数，收到 ${typeof value}（内联字符串要改成 ${key}=${'${'}e => …${'}'}）`);
            }
            node.addEventListener(key.slice(2).toLowerCase(), value);
        }
        else if (PROPS.has(key)) node[key] = value;
        // 其余一律 setAttribute：这样 href="/toy/ascii-art" 不会像 property 那样被解析成绝对 URL
        else node.setAttribute(key, value === true ? '' : value);
    }

    appendChildren(node, children);
    return node;
}

function appendChildren(parent, children) {
    for (const child of children.flat(Infinity)) {
        if (child == null || child === false || child === true || child === '') continue;
        parent.append(child instanceof Node ? child : String(child));
    }
}

const htmHtml = htm.bind(h);

// htm 在「多个顶层节点」时会返回数组（例如 html`<h1>a</h1><p>b</p>`），没法直接 append。
// 这里统一包一层：永远返回单个 Node —— 单根时是元素，多根时是 DocumentFragment。
function html(statics, ...values) {
    const result = htmHtml(statics, ...values);
    if (result instanceof Node) return result;

    const fragment = document.createDocumentFragment();
    appendChildren(fragment, [result]);
    return fragment;
}

// HTML 字符串 → DocumentFragment。renderMD() 内部用它把拼好的 HTML 变成节点
//   （调用方直接拿 renderMD() 返回的节点即可，一般不需要自己用 raw）
function raw(htmlString) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;
    return template.content;
}
