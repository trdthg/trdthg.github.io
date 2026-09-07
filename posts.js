// 站点核心：文章数据 + 页面注册表。
//
// 数据（新文章加这里，旧的在 old-posts.js）：
//   { date: "YYYY-MM-DD", note: "文字" }                  —— 便签：列表显示「日期 全文」
//   { date: "YYYY-MM-DD", post: `Markdown` }              —— 短文章内联：标题自动取第一行 #（标题要唯一）
//   { date: "YYYY-MM-DD", title: "标题", file: "xxx.md" } —— 长文：内容在 .md 文件里，点开时才加载
//   { divider: "---" }                                    —— 分割线：原样显示，不用日期
//
// 页面：每个页面一个 <页面名>.js，里面放 render 函数（返回 HTML 模板字符串）。
// 挂载后的副作用（语法高亮、giscus、异步加载）写在对应 after 函数里。
// innerHTML / document.title 由 router.js 统一设置。

// —— 数据 ——

const POSTS = [
    // —— 新文章（内联）——
    {
        date: "2026-09-07",
        post: `# 烦，近期总结

网站还是要做，前几天看了好多 finger 博客，他们的都好有意思，我也得想写有意思的东西放这个网站上

这次干脆把 css 样式表也删了，只留了个背景颜色

加上了 GAME / MUSIC / PHOTO 三个板块，希望未来能填充的满满的

---------

感觉还是要写一些技术博客 (也许是 game dev 相关)...倒不是为了分享，或者叫做稿子
不一定只是读的，也许是要做视频的，向外输出一些东西

但是读的和说的稿子风格一定也是不一样的
. . . . .

怎么做呢？

----------

看完了橙路，每天一集看了三个月，专辑听了不知道多少遍 https://www.bilibili.com/video/BV1e54y1R78o 电影里面没有出现萨克斯挺可惜的

好听就是好看

---------

最近在尝试读尼采的 <查拉图斯特拉如是说> 感觉还挺有意思的，虽然每一章读两遍才能大概读懂

对了，我特地先读了 "朋友" 一章后才从回到序章开始看

配着 https://www.bilibili.com/video/BV1is4y1z7Wy 单曲循环很舒服

(虽然这部剧我没看多，连歌剧魅影也没看太懂)

---------

买了个电钢琴，... 写点啥呢？弹会个两三首再说吧

总之，现在就是，调式好烦

`
    },
    {
        date: "2026-05-19",
        note: "给博客加了 giscus 评论，顺便实验便签功能 ✏️"
    },
    {
        date: "2026-05-08",
        post: `# 我因听信网络谣言而没有学习 MCP, 所以学一下

今天看了视频 [［引擎日志］Python 写的游戏引擎，能比 Unity 更快么？](https://www.bilibili.com/video/BV1dSRkBnEXU) 感觉里面的 AI 集成设计很好

游戏编辑器支持了 MCP. 游戏编辑器需要大量上下文，除了运行时信息，比如场景结构，运行时错误，还有某些状态在当前状态下是否运行

MCP 自描述能力。MCP 里面提供了系统说明，在遇到复杂任务时，Agent 会被 **强制要求先学习，后工作** (先调用教程工具学习内容，教程工具返回临时 token, 调用相关工具出示 token) 流程的约束性 **先考证，凭证上岗**

自进化，操作路径如果重复，则会自己在引擎内部定义一些工具，还会推荐下一个工具 (感觉类似 hermes 自动总结 skill)

超越了静态的接口列表

思考

MCP 相比 cli 或者 api 是一个有状态的环境？但是 MCP 现在也支持无状态

1. 默认提供接口列表，或者叫标准化的发现机制

2. 返回格式固定，包括：tool, 提示词模版，资源

3. 反向控制，这个应该就是上文中 强制要求先学习，后工作 的实现原理？`
    },
    {
        date: "2026-05-06",
        post: `# 重新启动博客

这里是重新启动的第一篇博客

抛弃了各种框架，css 考虑等等

仅仅是有一个记录的地方，希望在 tg 上写，用 hermes 推送更新

随即思考不记录下来的话就会忘了，希望找个地方记录一下`
    }
];

// 合并新文章和旧文章，按 date 倒序（稳定排序，同日期保持数组顺序）
const ALL_POSTS = [...POSTS, { divider: "下面的是部分旧的博客文章，主要是 Rust 技术博客翻译" }, ...OLD_POSTS];
const SORTED_POSTS = [...ALL_POSTS].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

// —— 小工具 ——

// 取内联文章标题：正文第一行的 # 标题
function postTitle(md) {
    const m = md.match(/^#\s+(.+)$/m);
    return m ? m[1].trim() : '(无标题)';
}

// 取条目标题（note 没有标题）
function entryTitle(entry) {
    if (entry.post) return postTitle(entry.post);
    if (entry.title) return entry.title;
    return '(无标题)';
}

// giscus 评论：只在文章页注入
function setupGiscus() {
    const container = document.getElementById('giscus-container');
    if (!container || container.childElementCount) return;

    const s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.setAttribute('data-repo', 'trdthg/trdthg.github.io');
    s.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkzNjQ4MzQ1ODY=');
    s.setAttribute('data-category', 'Announcements');
    s.setAttribute('data-category-id', 'DIC_kwDOFb7vGs4C9W1e');
    s.setAttribute('data-mapping', 'url');
    s.setAttribute('data-strict', '0');
    s.setAttribute('data-reactions-enabled', '1');
    s.setAttribute('data-emit-metadata', '0');
    s.setAttribute('data-input-position', 'bottom');
    s.setAttribute('data-theme', 'preferred_color_scheme');
    s.setAttribute('data-lang', 'zh-CN');
    s.crossOrigin = 'anonymous';
    s.async = true;
    container.appendChild(s);
}

// —— 文章列表 / 文章正文 ——

let currentEntry = null; // render 时记住当前文章，after 里用

function renderPosts() {
    const postId = new URLSearchParams(location.search).get('post');

    if (postId) {
        // 显示指定文章（postId 就是文章标题）
        currentEntry = ALL_POSTS.find(e => (e.post || e.file) && entryTitle(e) === postId) || null;
        if (!currentEntry) return '<p style="color:red;">文章未找到。</p>';
        if (currentEntry.file) return '<p>加载中…</p>'; // 长文/旧文，after 里异步加载
        return renderMD(currentEntry.post);              // 内联短文，直接出模板
    }

    // 文章列表
    currentEntry = null;
    return `
        <h1>不知道要写点什么？</h1>
        你知道吗？知道了请告诉我！🙇 trdthg47@gmail.com
        <p>把不适合放在我的 <a href="https://t.me/trdthg_group">telegram channel</a> 的单拎出来放这里</p>

        <div id="post-list">
            ${SORTED_POSTS.map(entry => {
                if (entry.divider) return `<div class="divider">${entry.divider}</div>`;
                if (entry.note) return `<p>${entry.date} ${entry.note}</p>`;
                const title = entryTitle(entry);
                return `<p><a href="?post=${encodeURIComponent(title)}">${entry.date} ${title}</a></p>`;
            }).join('')}
        </div>

        <p>
            [给 Hermes 或者我自己的 Note]
            <br/>
            - 新内容只需在 <i>posts.js</i> 里加一条记录：{ date, note }、{ date, post }（内联）、{ date, title, file }（长文）或 { divider: "..." }（分割线，原样显示、不用日期），会自动按日期排序。
            <br/>
            - 快速跳转到代码 <a href="https://github.com/trdthg/trdthg.github.io">https://github.com/trdthg/trdthg.github.io</a>
        </p>
    `;
}

// 渲染后的副作用：设置文章标题、语法高亮、异步加载长文、注入 giscus
function afterPosts(content) {
    if (currentEntry) {
        if (currentEntry.file) {
            // 长文/旧文：内容在单独 .md 文件里，点击时才加载
            document.title = currentEntry.title + ' - 我的阅读笔记';
            fetch(currentEntry.file)
                .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
                .then(md => {
                    content.innerHTML = renderMD(md);
                    if (window.hljs) hljs.highlightAll();
                })
                .catch(err => {
                    content.innerHTML = '<p style="color:red;">文章加载失败：' + err.message + '</p>';
                });
            setupGiscus();
            return;
        }
        // 内联短文
        document.title = postTitle(currentEntry.post) + ' - 我的阅读笔记';
        if (window.hljs) hljs.highlightAll();
    }
    setupGiscus();
}

// —— 文章页组件 ——
// 其他页面在各自的 <页面名>.js 里（game.js / music.js / photo.js / about.js）
