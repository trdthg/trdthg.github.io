// TOY 列表页：所有 toy 在这里集中注册（实现在 pages/toys/ 里，一个文件一个 toy）。
// 单个 toy 的 URL：/toy/<id>，跟文章的 /post/<标题> 一个思路。
// 新增 toy：pages/toys/ 新建文件写 render 函数 → 在下面的 TOYS 里加一行 → index.html 加 script 标签。
// 只想挂个站外的仓库/链接就写 { link, desc, title? }：title 不写就拿链接最后一段当名字。

const TOYS = [
    {
        id: 'ascii-art',
        title: '图片转字符画',
        desc: '照片转点阵字符画，可上传自己的图试试',
        render: renderToyAsciiArt
    },
    {
        link: "https://github.com/trdthg/khinsiderTV",
        desc: "khinsider 网站的全平台客户端",
    },
    {
        link: "https://github.com/trdthg/lilypondx",
        desc: "TUI 直接播放 lilypond 格式的乐谱"
    },
    {
        link: "https://github.com/trdthg/ssherd",
        desc: "轻量的运维工具，如果你有一堆机器需要运维的话",
    },
    {
        link: "https://github.com/trdthg/catsnail",
        desc: "基于 QEMU + VNC 的 AI 驱动的自动化生成和测试工具"
    },
    {
        link: "https://github.com/trdthg/asciinema",
        title: "asciinema-expect",
        desc: "自动运行脚本，录制 shell，关键点截图"
    },
    {
        link: "https://github.com/trdthg/cmakex",
        desc: "给 cmake 做一层包管理的包装",
    }
];

// 列表项名字：写了 title 就用，否则拿链接最后一段（.../khinsiderTV -> khinsiderTV）
function toyLabel(t) {
    return t.title || (t.link || t.id || '').replace(/\/+$/, '').split('/').pop();
}

// 当前路由指向的 toy：没带 toy 参数、或没这个 id（站外条目也没 id）都返回 undefined，
// 不能写成 TOYS.find(t => t.id === route.toy)——那样 route.toy 为 undefined 时会错拿站外条目
const findToy = route => route.toy ? TOYS.find(t => t.id === route.toy) : undefined;
// TOY 页入口：URL 指向哪个 toy 就渲染哪个，没实现（或没这个 id）就渲染列表。
// 「挑哪个 toy」是 toy 自己的事，router 里不用知道 TOYS 长什么样
function renderToyList(route = {}) {
    const toy = findToy(route);
    if (toy?.render) return toy.render();

    return html`
        <h1>TOY</h1>
        <p>一些小玩意儿。</p>

        <div id="toy-list">
            ${TOYS.map(t => html`
                <p>${t.link
                    ? html`<a href=${t.link}>${toyLabel(t)}</a>`
                    : t.render
                        ? html`<a href=${'?page=toy&toy=' + encodeURIComponent(t.id)}>${toyLabel(t)}</a>`
                        : toyLabel(t)}${t.desc && html` — ${t.desc}`}</p>
            `)}
        </div>
    `;
}
