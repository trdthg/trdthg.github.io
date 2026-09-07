// 极简「条件渲染」路由 —— 就是一个 switch case：
//   1. 从 URL 取 ?page=，缺省或写错时走 default（文章列表）
//   2. switch 到对应页面组件（各 <页面名>.js 里的 render 函数），拿到 HTML 模板
//   3. 统一设置 innerHTML 和 document.title
//   4. 页面有挂载后的副作用（高亮、异步加载等）就调对应的 after 函数
// 用法：index.html 里放 <div class="home-link"></div> 和 <main id="content"></main>，
//       在 body 末尾按顺序引入数据脚本和本文件即可。
(function () {
    const nav = document.querySelector('.home-link');
    const content = document.getElementById('content');
    if (!nav || !content) return;

    const page = new URLSearchParams(location.search).get('page') || 'posts';

    // 导航栏：[路由，显示文字]，当前页加 .active 高亮
    const NAV = [['posts', 'POST'], ['game', 'GAME'], ['music', 'MUSIC'], ['photo', 'PHOTO'], ['about', 'ABOUT']];
    nav.innerHTML = NAV.map(([id, label]) =>
        `<a href="?page=${id}"${id === page ? ' class="active"' : ''}>${label}</a>`
    ).join('') + '🦊';

    // 条件渲染：?page= → 页面组件
    let html, title, after = null;
    switch (page) {
        case 'game':  html = renderGame();  title = 'GAME';  break;
        case 'music': html = renderMusic(); title = 'MUSIC'; break;
        case 'photo': html = renderPhoto(); title = 'PHOTO'; break;
        case 'about': html = renderAbout(); title = 'ABOUT'; break;
        default:      html = renderPosts(); title = '不知道要写点什么？'; after = afterPosts; break;
    }

    content.innerHTML = html;
    document.title = title;
    if (after) after(content);
})();
