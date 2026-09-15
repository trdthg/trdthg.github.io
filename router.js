// 极简「条件渲染」路由 —— 就是一个 switch case：
//   1. 从 URL 取 ?page=，缺省或写错时走 default（文章列表）
//   2. switch 到对应页面组件（各 <页面名>.js 里的 render 函数），拿到 DOM 节点（html`` / DocumentFragment）
//   3. 统一挂载到 #content（replaceChildren）
//   4. 统一设置 document.title
//   4. 页面有挂载后的副作用（高亮、异步加载等）就调对应的 after 函数
// 用法：index.html 里放 <div class="home-link"></div> 和 <main id="content"></main>，
//       在 body 末尾按顺序引入数据脚本和本文件即可。
(async function () {
    const nav = document.querySelector('.home-link');
    const content = document.getElementById('content');
    if (!nav || !content) return;

    const params = new URLSearchParams(location.search);
    const page = params.get('page') || 'posts';

    // 导航栏：[路由，显示文字]，当前页加 .active 高亮
    const NAV = [['posts', 'POST'], ['toy', 'TOY'], ['game', 'GAME'], ['music', 'MUSIC'], ['photo', 'PHOTO'], ['about', 'ABOUT']];
    nav.replaceChildren(html`
        ${NAV.map(([id, label], i) => [
            i ? ' | ' : '',
            html`<a id=${id} href=${'?page=' + id} class=${id === page ? 'active' : null}>${label}</a>`,
        ])}
        ${' | ᗜ˰ᗜ'}
    `);

    // 条件渲染：?page= → 页面组件
    // render 函数返回 Node/DocumentFragment（html`` 或 raw()）或它们的 Promise
    // 统一 await 解包，所以同步和 async 的 render 都能用
    let view, title, after = null;
    switch (page) {
        case 'game':  view = await renderGame();  title = 'GAME';  break;
        case 'toy': {
            const toy = TOYS.find(t => t.id === params.get('toy'));
            if (toy) {
                view = await toy.render();
                title = toy.title;
            } else {
                view = renderToyList();
                title = 'TOY';
            }
            break;
        }
        case 'music': view = await renderMusic(); title = 'MUSIC'; break;
        case 'photo': view = await renderPhoto(); title = 'PHOTO'; break;
        case 'about': view = await renderAbout(); title = 'ABOUT'; break;
        default:      view = await renderPosts(); title = '不知道要写点什么？'; after = afterPosts; break;
    }

    content.replaceChildren(view);
    document.title = title;
    if (after) after(content);
    setupGiscus();   // 全站共用一个 giscus 讨论串，守卫保证只注入一次
})();
