// 站点核心：文章数据 + 页面注册表。
//
// 数据（新文章加这里，旧的在 old-posts.js）：
//   { date: "YYYY-MM-DD", note: "文字" }                  —— 便签：列表显示「日期 全文」
//   { date: "YYYY-MM-DD", post: `Markdown` }              —— 短文章内联：标题自动取第一行 #（标题要唯一）
//   { date: "YYYY-MM-DD", title: "标题", file: "xxx.md" } —— 长文：内容在 .md 文件里，点开时才加载
//   { divider: "---" }                                    —— 分割线：原样显示，不用日期
//
// 页面：每个页面一个 <页面名>.js，里面放 render 函数（返回 html`` 节点）。
// 挂载后的副作用（语法高亮、giscus、异步加载）写在对应 after 函数里。
// 挂载与 document.title 由 router.js 统一处理。

// —— 数据 ——

const POSTS = [
    // —— 新文章（内联）——
    {
        date: "2026-09-20",
        post:
`# [WIP] C/Rust 实现热更新的若干方法

> 也不知道什么时候能写完，有机会也应该写一个类似的 mini-jit

就是说，大家都爱舒服的调试，完善的轻松的开发调试过程能让人心情舒畅，在 C 里面还有 Rust 里面很难让人心情舒畅

这里总结了我看到的两种方法

## dlopen

把你的程序完全搞成库，外面包一层大概这样的东西就行了

\`\`\`c
InitWindow()
var lib = ...
while {
    if changed(build/libyougame.so) // 自动检查库是否变了
     | keyPressed("R")              // 或者如果你想手动触发的话
    {
        lib = dlopen("./build/libyougame.so");
    }
    lib.update()
}
\`\`\`

    更多内容参考 Tosding 的这个视频 https://www.youtube.com/watch?v=Y57ruDOwH1g

    另外在这里你可以找到 Tsoding 的非常风格化的企鹅桌面壁纸 https://penger.city/

## Subsecond

来自 Rust 一个叫做 [Dioxus](https://github.com/dioxuslabs/dioxus) 的跨平台 UI 框架提供了热重载功能
我从这框架刚开源 2 个月就看到了，当时以为这个项目就跟大多数普通的开源项目一样，一段时间之后就会沉寂。
没想到 3 4 年过去后，甚至还活的越来越好了，里面提供了一个叫做 Subsecond 的热重载框架，目前已经被 Rust 生态中的多个项目采用

> 这里还有一些 开源项目理念 的争执 [iced 作者想要使用 subsecond 但是直接 fork 了整个仓库] https://github.com/bevyengine/bevy/issues/19296

很遗憾的是，研究了几个小时，我认为这个东西与 dlopen 并没有什么本质上的区别，只不过 subsecond 做了更多工程化用于生产

- 更自动化，更细粒度
- 跨平台，subsecond 要面对不同操作系统的安全限制，甚至为 wasm 实现了动态链接器，因为 wasm 根本没有 dlopen

## detour

另外一种思路，修改运行时内存，在原函数的开头放一个 jmp 指令跳到新函数的位置

(安卓的动态插装工具 frida 也采用了类似的技术)

1. 创建一个函数

2. 修改 jump

## live++

商业化工具解决的难点

`
    },
    {
        date: "2026-09-16",
        post: `# V8 引擎作者搞的项目怎么也黄了

        https://github.com/toitlang/toit

        非常优雅的演示视频，非常高的性能，非常独特的设计思路，使用了一个特定的语言

        我猜想它没火起来的主要原因还是因为它自创了一个新语言
        - 新语言学习门槛太高
        - 无法兼容现有硬件生态，开发板只是披萨饼皮，谁会到餐厅只吃饼皮呢？

        > “这里的比萨面皮尝起来不像我吃过的任何面皮，倒像是印度烤饼，柔软耐嚼，却特别薄……我一向认为谈到比萨饼皮，我们一生只有两种选择——薄而脆，或者厚而软。怎知这世上有一种薄而软的饼皮？神圣的上帝！薄、软、韧、黏、好吃、耐嚼、咸味的比萨天堂。”

        作者想要从语言，虚拟机层面优化嵌入式应用，没毛病，但看起来大家并不太关心这一点

        我有一些让它能复活的想法，但似乎也均不可行

        1. 在上面加一层 Python 子集的解释器
        - 但是这样可能会因为 python 的语言特性 (过于动态) 导致原本的设计思路无法起到很好的加速效果，最终沦落为跟 PyPy 对于 CPython 的情形

        2. 放弃这个项目，把里面的设计思路引入 MicroPython, 加速 MicroPython, 打不过就加入。
        - 但是 MicroPython 好像也在推进自己的加速方案，对添加了装饰器的函数，直接编译为原生代码
        - toit 的 VM, 沙箱等的内存占用过高？
        `
    },
    {
        date: "2026-09-08",
        post: `# 雪

        关于博客的若干想法

        1. 希望左下角有一团篝火
        2. 希望能随春夏秋冬昼夜交替展现青草，日光，落叶与雪

        ![雪](assets/images/2025-12-13-snow.webp)

        bgm: Madoka 的迷你钢琴辑 https://downloads.khinsider.com/game-soundtracks/album/kimagure-orange-road-madoka-piano-files

        - - - - - - - - -

        好看的 homepage 太多了，翻了几天也没看完
        - https://keningzhu.com/
        - https://www.minkyu.me/page/website/links

        刚刚给 GAME PAGE 添加了单独的像素字体，真不错
        `
    },
    {
        date: "2026-09-07",
        post: `# 烦，近期总结

网站还是要做，前几天看了好多 finger 博客，他们的都好有意思，我也得想写有意思的东西放这个网站上

这次干脆把居中对齐也删了

加上了 GAME / MUSIC / PHOTO 三个板块，希望未来能填充的满满的

---------

感觉还是要写一些技术博客 (可能是 game dev 相关)... 或者应该叫做稿子
不一定只是读的，也许是要做视频的，向外输出一些东西

但是用来读的和用来说的稿子风格一定也是不一样的
. . . . .

怎么做呢？

----------

看完了橙路，每天一集看了三个月，专辑听了不知道多少遍 https://www.bilibili.com/video/BV1e54y1R78o 电影里面没有出现萨克斯挺可惜的

好听就是好看

---------

最近在尝试读尼采的 <查拉图斯特拉如是说> 感觉还挺有意思的，虽然每一章读两遍才能大概读懂

对了，我特地先读了 "朋友" 一章后才从回到序章开始看

配着 https://www.bilibili.com/video/BV1is4y1z7Wy 单曲循环很舒服

---------

买了个电钢琴，... 写点啥呢？弹会个两三首再说吧

总之，现在就是，调式好麻烦

`
    },
    {
        date: "2026-05-19",
        note: "给博客加了 giscus 评论，顺便实验便签功能 ✏️"
    },
    {
        date: "2026-05-08",
        post: `# 学一下 MCP, 好像还挺有意思的

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

// giscus 评论：全站共用一个讨论串（mapping=specific），router 在每次渲染后调用；
// childElementCount 守卫保证 iframe 只注入一次，SPA 导航下跨页面持久存在。
// data-loading="lazy"：评论区在首屏之下，不滚到那里就不初始化这个跨域 iframe。
function setupGiscus() {
    const container = document.getElementById('giscus-container');
    if (!container || container.childElementCount) return;

    container.append(html`
        <script src="https://giscus.app/client.js"
            data-repo="trdthg/trdthg.github.io"
            data-repo-id="MDEwOlJlcG9zaXRvcnkzNjQ4MzQ1ODY="
            data-category="Announcements"
            data-category-id="DIC_kwDOFb7vGs4C9W1e"
            data-mapping="specific"
            data-term="All"
            data-strict="0"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="bottom"
            data-theme="preferred_color_scheme"
            data-lang="zh-CN"
            data-loading="lazy"
            crossorigin="anonymous"
            async
        ></script>
    `);
}

// —— 文章列表 / 文章正文 ——

let currentEntry = null; // render 时记住当前文章，after 里用

async function renderPosts(route) {
    const postId = route.post;

    if (postId) {
        // 显示指定文章（postId 就是文章标题）
        currentEntry = ALL_POSTS.find(e => (e.post || e.file) && entryTitle(e) === postId) || null;
        if (!currentEntry) return html`<p style="color:red;">文章未找到。</p>`;
        if (currentEntry.file) return html`<p>加载中…</p>`;   // 长文/旧文，after 里异步加载
        return renderMD(currentEntry.post);                   // 内联短文，直接出节点
    }

    // 文章列表
    currentEntry = null;
    return html`
        <h1>不知道要写点什么</h1>
        你知道吗？知道了请告诉我！🙇 trdthg47@gmail.com
        <p>把不适合放在我的 <a href="https://t.me/trdthg_group">telegram channel</a> 的单拎出来放这里</p>

        <div id="post-list">
            ${SORTED_POSTS.map(entry => {
                if (entry.divider) return html`<div class="divider">${entry.divider}</div>`;
                if (entry.note) return html`<p>${entry.date} ${entry.note}</p>`;
                const title = entryTitle(entry);
                return html`<p><a href=${'?post=' + encodeURIComponent(title)}>${entry.date} ${title}</a></p>`;
            })}
        </div>

        <p>
            [给 Hermes 或者我自己的 Note]
            <br />
            - 新内容只需在 <i>posts.js</i> 里加一条记录：{ date, note }、{ date, post }（内联）、{ date, title, file }（长文）或 { divider: "..." }（分割线，原样显示、不用日期），会自动按日期排序。
            <br />
            - 快速跳转到代码 <a href="https://github.com/trdthg/trdthg.github.io">https://github.com/trdthg/trdthg.github.io</a>
        </p>
    `;
}

// 渲染后的副作用：设置文章标题、语法高亮、异步加载长文、注入 giscus
function afterPosts(content) {
    if (currentEntry) {
        if (currentEntry.file) {
            // 长文/旧文：内容在单独 .md 文件里，点击时才加载。
            // entry 先存下来：SPA 导航很快，fetch 回来时可能已经换页了，那就别往 content 里塞了
            const entry = currentEntry;
            document.title = entry.title + ' - 我的阅读笔记';
            fetch(entry.file)
                .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
                .then(md => {
                    if (currentEntry !== entry) return;
                    content.replaceChildren(renderMD(md));
                    if (window.hljs) hljs.highlightAll();
                })
                .catch(err => {
                    if (currentEntry !== entry) return;
                    content.replaceChildren(html`<p style="color:red;">文章加载失败：${err.message}</p>`);
                });
            return;
        }
        // 内联短文
        document.title = postTitle(currentEntry.post) + ' - 我的阅读笔记';
        if (window.hljs) hljs.highlightAll();
    }
}

// —— 文章页组件 ——
// 其他页面在各自的 <页面名>.js 里（game.js / music.js / photo.js / about.js）
