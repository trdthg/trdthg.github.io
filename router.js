// 极简「条件渲染」路由 —— 就是一个 switch case：
//   1. 从 location.pathname 解析出页面（/、/post/<标题>、/toy[/<id>]、/game[/<id>]、/music、/photo、/about）
//   2. switch 到对应页面组件（各 <页面名>.js 里的 render 函数），拿到 DOM 节点（html`` / DocumentFragment）
//   3. 统一挂载到 #content（replaceChildren），统一设置 document.title
//   4. 页面有挂载后的副作用（高亮、异步加载等）就调对应的 after 函数
//
// 导航是客户端路由：拦截站内 <a> 的点击 → pushState + 只重渲染 #content，不重新加载文档。
// 所以脚本 / GA / giscus 一个会话里只初始化一次，切页面没有白屏；后退前进走 popstate。
// 直接访问深链接（如 /game）由 404.html 兜住 —— 它就是 index.html 的副本（见 gh-page.yml）。
//
// 用法：index.html 里放 <div class="home-link"></div> 和 <main id="content"></main>，
//       在 body 末尾按顺序引入数据脚本和本文件即可。
(async function () {
    const nav = document.querySelector('.home-link');
    const content = document.getElementById('content');
    if (!nav || !content) return;

    // 导航栏：[路由，显示文字]，当前页加 .active 高亮
    const NAV = [['posts', 'POST'], ['toy', 'TOY'], ['game', 'GAME'], ['music', 'MUSIC'], ['photo', 'PHOTO'], ['about', 'ABOUT']];

    // —— 路径 ↔ 路由 ——

    const decode = s => { try { return decodeURIComponent(s); } catch { return s; } };

    // pathname → route；认不出来的路径返回 null（交给浏览器当普通链接处理）
    //   /              → { page: 'posts' }                /post/雪       → { page: 'posts', post: '雪' }
    //   /game/jump     → { page: 'game', game: 'jump' }   /toy/ascii-art → { page: 'toy', toy: 'ascii-art' }
    function parse(pathname) {
        const seg = pathname.split('/').filter(Boolean).map(decode);
        if (!seg.length) return { page: 'posts' };

        const [head, ...rest] = seg;
        const arg = rest.join('/');

        if (head === 'post') return arg ? { page: 'posts', post: arg } : null;
        if (head === 'toy') return { page: 'toy', toy: arg };
        if (head === 'game') return { page: 'game', game: arg };
        if (arg) return null;
        if (head === 'music' || head === 'photo' || head === 'about') return { page: head };
        return null;
    }

    // 老链接（?page= / ?post= / &game= / &toy=）→ path 风格，启动时迁移一次
    function migrateQuery() {
        const p = new URLSearchParams(location.search);
        const page = p.get('page');
        const post = p.get('post');
        if (!page && !post) return;

        const sub = p.get('game') || p.get('toy');
        const target = post ? '/post/' + encodeURIComponent(post)
            : !page || page === 'posts' ? '/'
                : '/' + page + (sub ? '/' + encodeURIComponent(sub) : '');
        history.replaceState(null, '', target);
    }

    // —— 渲染 ——

    function renderNav(route) {
        nav.replaceChildren(html`
            ${NAV.map(([id, label], i) => [
                i ? ' | ' : '',
                html`<a id=${id} href=${id === 'posts' ? '/' : '/' + id} class=${id === route.page ? 'active' : null}>${label}</a>`,
            ])}
            ${' | ᗜ˰ᗜ'}
        `);
    }

    // 条件渲染：route → 页面组件
    // render 函数返回 Node/DocumentFragment（html`` 或 raw()）或它们的 Promise
    // 统一 await 解包，所以同步和 async 的 render 都能用
    async function buildPage(route) {
        let view, title, after = null;
        switch (route.page) {
            case 'game': view = renderGameList(); title = 'GAME'; after = afterGame; break;
            case 'toy': {
                const toy = TOYS.find(t => t.id === route.toy);
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
            default: view = await renderPosts(route); title = '不知道要写点什么？'; after = afterPosts; break;
        }
        return { view, title, after };
    }

    let token = 0;   // 每次导航自增：异步 render 回来时用它判断「这中间有没有又导航」

    async function renderCurrent({ scroll = false } = {}) {
        const mine = ++token;
        const route = parse(location.pathname) || { page: 'posts' };   // 认不出来的路径当文章列表

        const { view, title, after } = await buildPage(route);
        if (mine !== token) return;   // 期间又导航了，这次结果丢掉

        renderNav(route);
        content.replaceChildren(view);
        document.title = title;
        if (after) after(content, route);
        setupGiscus();   // 全站共用一个 giscus 讨论串，守卫保证只注入一次
        if (scroll) window.scrollTo(0, 0);

        // SPA 不会自己发 pageview（GA 只在首次加载 config 过一次），手动补一条
        if (window.gtag) gtag('event', 'page_view', { page_path: location.pathname + location.search });
    }

    // 站内跳转：换 URL + 重渲染
    function go(url) {
        history.pushState(null, '', url);
        renderCurrent({ scroll: true });
    }

    // —— 事件 ——

    // 所有站内链接统一拦截：外链、新窗口/新标签、下载、修饰键点击都放行
    document.addEventListener('click', event => {
        if (event.defaultPrevented || event.button !== 0 ||
            event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const link = event.target.closest('a[href]');
        if (!link || link.target || link.hasAttribute('download')) return;
        if (link.getAttribute('href').startsWith('#')) return;

        const url = new URL(link.href);          // link.href 已经被 <base href="/"> 解析过
        if (url.origin !== location.origin) return;
        if (!parse(url.pathname)) return;        // 不是路由（.md、图片…），按普通链接走
        event.preventDefault();

        const to = url.pathname + url.search;
        if (to !== location.pathname + location.search) go(to);
    });

    window.addEventListener('popstate', () => renderCurrent());

    migrateQuery();
    renderCurrent();
})();
