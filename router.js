// 极简「条件渲染」路由 —— 就是一个 switch case：
//   1. 从 URL 取 ?page=，缺省或写错时走 default（文章列表）
//   2. switch 到对应页面组件（各 <页面名>.js 里的 render 函数），拿到 HTML 字符串或 DOM 节点
//   3. 统一挂载：字符串走 innerHTML，节点走 append
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
    nav.innerHTML = [...NAV.map(([id, label]) =>
        `<a id="${id}" href="?page=${id}"${id === page ? ' class="active"' : ''}>${label}</a>`
    ), '🦊'].join(' | ');

    // 条件渲染：?page= → 页面组件
    // render 函数可以返回：字符串、Node/DocumentFragment、或它们的 Promise
    // 统一 await 解包，所以同步和 async 的 render 都能用
    let html, title, after = null;
    switch (page) {
        case 'game':  html = await renderGame();  title = 'GAME';  break;
        case 'toy': {
            const toy = TOYS.find(t => t.id === params.get('toy'));
            if (toy) {
                html = await toy.render();
                title = toy.title;
            } else {
                html = renderToyList();
                title = 'TOY';
            }
            break;
        }
        case 'music': html = await renderMusic(); title = 'MUSIC'; break;
        case 'photo': html = await renderPhoto(); title = 'PHOTO'; break;
        case 'about': html = await renderAbout(); title = 'ABOUT'; break;
        default:      html = await renderPosts(); title = '不知道要写点什么？'; after = afterPosts; break;
    }

    mount(content, html);
    document.title = title;
    if (after) after(content);

    // 挂载：字符串走 innerHTML，Node/DocumentFragment 走 append
    function mount(container, result) {
        if (typeof result === 'string') {
            container.innerHTML = result;
        } else {
            container.innerHTML = '';
            container.append(result);
        }
    }
})();
