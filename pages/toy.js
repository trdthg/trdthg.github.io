// TOY 列表页：所有 toy 在这里集中注册（实现在 pages/toys/ 里，一个文件一个 toy）。
// 单个 toy 的 URL：?page=toy&toy=<id>，跟 posts 的 ?post=标题 一个思路。
// 新增 toy：pages/toys/ 新建文件写 render 函数 → 在下面的 TOYS 里加一行 → index.html 加 script 标签。

const TOYS = [
    {
        id: 'ascii-art',
        title: '图片转字符画',
        desc: '照片转点阵字符画，可上传自己的图试试',
        render: renderToyAsciiArt
    }
];

function renderToyList() {
    return `
        <h1>TOY</h1>
        <p>一些小玩意儿。</p>

        <div id="toy-list">
            ${TOYS.map(t => `<p><a href="?page=toy&toy=${t.id}">${t.title}</a> — ${t.desc}</p>`).join('')}
        </div>
    `;
}
