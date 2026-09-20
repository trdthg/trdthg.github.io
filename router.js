// 极简「条件渲染」路由 —— 就是一张页面表。
//   1. 从 location.search 解析出路由（query 风格 URL，见下面 parseRoute）
//   2. 查 PAGES 表，调对应页面组件的 render 函数，拿到 DOM 节点（html`` / DocumentFragment）
//   3. 统一挂载到 #content（replaceChildren），统一设置 document.title
//   4. 页面有挂载后的副作用（高亮、异步加载等）就调对应的 after 函数
//
// 导航是客户端路由：拦截站内 <a> 的点击 → pushState + 只重渲染 #content，不重新加载文档。
// 所以脚本 / GA / giscus 一个会话里只初始化一次，切页面没有白屏；后退前进走 popstate。
//
// URL 用 query 风格，格式统一：?page=<名字>[&<子参数>=<值>]
//   ?page=posts、?page=posts&post=雪、?page=game&game=jump、?page=toy&toy=ascii-art
// 站点根（无参数）也是首页，所以 / 和 ?page=posts 等价。
// 不用 /music 这种 path 风格：静态托管上没有对应文件，刷新/直接访问会 404
// （GitHub Pages 只能靠 404.html 把内容换成 SPA，状态码仍是 404，console 里会报一条
//  Failed to load resource）。query 风格永远只请求 `/` 这个真实文件，刷新天然 200。
// 页面里的链接按这个格式手写，不认识的 query 一律当首页。
//
// 新增一个页面：pages/<名字>.js 写 render/after → index.html 加 <script> → 下面 PAGES 加一行。
//
// 用法：index.html 里放 <div class="home-link"></div> 和 <main id="content"></main>，
//       在 body 末尾按顺序引入数据脚本和本文件即可。
(async function () {
    const nav = document.querySelector('.home-link');
    const content = document.getElementById('content');
    if (!nav || !content) return;

    // 页面表：一个页面一行 —— 导航文字、详情页的子参数名、render(route)、title(route)、after(content, route)
    // title 是函数是因为详情页的标题来自数据（比如某个 toy 的名字）
    const PAGES = {
        posts: {
            label: 'POST', param: 'post',
            render: renderPosts, title: () => '不知道要写点什么？', after: afterPosts,
        },
        toy: {
            label: 'TOY', param: 'toy',
            render: route => TOYS.find(t => t.id === route.toy)?.render() ?? renderToyList(),
            title: route => TOYS.find(t => t.id === route.toy)?.title ?? 'TOY',
        },
        game: { label: 'GAME', param: 'game', render: renderGameList, title: () => 'GAME', after: afterGame },
        music: { label: 'MUSIC', render: renderMusic, title: () => 'MUSIC' },
        photo: { label: 'PHOTO', render: renderPhoto, title: () => 'PHOTO' },
        about: { label: 'ABOUT', render: renderAbout, title: () => 'ABOUT' },
    };

    // —— URL ↔ 路由 ——

    // search → route；不是本站认的 URL 就返回 null（交给调用方/浏览器处理）
    //   （空）                  → { page: 'posts' }   站点根就是首页
    //   ?page=posts            → { page: 'posts' }
    //   ?page=posts&post=雪     → { page: 'posts', post: '雪' }
    //   ?page=game&game=jump   → { page: 'game', game: 'jump' }
    function parseRoute(search) {
        const p = new URLSearchParams(search);
        if (!p.toString()) return { page: 'posts' };

        const page = p.get('page');
        const def = PAGES[page];
        if (!def) return null;

        const route = { page };
        const sub = def.param ? p.get(def.param) : '';   // 子参数缺省 = 列表页
        if (sub) route[def.param] = sub;
        return route;
    }

    // route → 站内 URL，格式统一：?page=<名字>[&<子参数>=<值>]
    function routeHref(route) {
        const def = PAGES[route.page] || PAGES.posts;
        const p = new URLSearchParams({ page: route.page });
        if (def.param && route[def.param]) p.set(def.param, route[def.param]);
        return '/?' + p;
    }

    // 站内 URL（location 或 <a href>）→ route；不是站内路由返回 null，交给浏览器当普通链接处理
    function routeOf(url) {
        if (url.origin !== location.origin) return null;
        if (url.pathname !== '/' && url.pathname !== '/index.html') return null;
        return parseRoute(url.search);
    }

    // —— 渲染 ——

    function renderNav(route) {
        // 导航栏直接由 PAGES 生成（顺序就是表里的顺序），当前页加 .active
        nav.replaceChildren(html`
            ${Object.keys(PAGES).map((id, i) => [
                i ? ' | ' : '',
                html`<a id=${id} href=${routeHref({ page: id })} class=${id === route.page ? 'active' : null}>${PAGES[id].label}</a>`,
            ])}
            ${' | ᗜ˰ᗜ'}
        `);
    }

    let token = 0;   // 每次导航自增：异步 render 回来时用它判断「这中间有没有又导航」

    async function renderCurrent({ scroll = false } = {}) {
        const mine = ++token;
        // 不是本站认的 URL（比如手输的旧地址、?page=nope）就当首页
        const route = routeOf(new URL(location.href)) || { page: 'posts' };
        const page = PAGES[route.page] || PAGES.posts;

        const view = await page.render(route);
        if (mine !== token) return;   // 期间又导航了，这次结果丢掉

        renderNav(route);
        content.replaceChildren(view);
        document.title = page.title(route);
        if (page.after) page.after(content, route);
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
        if (!routeOf(url)) return;               // 不是站内路由（.md、图片、外链…），按普通链接走
        event.preventDefault();

        const to = url.pathname + url.search;
        if (to !== location.pathname + location.search) go(to);
    });

    window.addEventListener('popstate', () => renderCurrent());

    renderCurrent();
})();
