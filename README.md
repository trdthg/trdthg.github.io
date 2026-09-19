# Website

个人站点。没有构建步骤，纯静态：`index.html` 是唯一的壳，其余都是直接加载的普通脚本。

## 结构

```
index.html          唯一的 HTML 壳（也是 404.html 的来源）
router.js           路由：pathname → 页面组件，并负责站内导航
style.css
lib/                通用工具（htm 的 h 函数、Markdown 渲染、代码块复制…）
pages/              页面组件，一个页面一个文件，导出 renderXxx() / afterXxx()
pages/toys/         小玩具，一个文件一个 toy
pages/games/        Odin 游戏工程（构建产物 build/ 不入库，见下）
trans/              旧博客的 Markdown 原文（长文按需 fetch）
scripts/            零散脚本（相册图片转 webp 等）
```

## 路由

| URL | 页面 |
| --- | --- |
| `/` | 文章列表 |
| `/post/<标题>` | 某篇文章（标题就是 `entryTitle()` 的结果，URL 里 encodeURIComponent） |
| `/toy`、`/toy/<id>` | 玩具列表 / 单个玩具 |
| `/game`、`/game/<id>` | 游戏列表 / 打开某个游戏的模态 |
| `/music`、`/photo`、`/about` | 对应页面 |

两条约束：

1. **导航是客户端路由**：站内 `<a>` 的点击被 `router.js` 拦下来走 `pushState`，只重渲染 `#content`，
   不重新加载文档（脚本 / GA / giscus 一个会话只初始化一次）。所以新增链接直接写 `href="/xxx"` 就行，
   不需要 onclick，后退/前进由 `popstate` 处理。
2. **`index.html` 里有 `<base href="/">`**：所有相对 URL（脚本、图片、fetch 的 `.md`）都以站点根为基准，
   否则在 `/post/xxx` 这种深层路径下会解析错。新增资源路径时不用管层级。
3. **深链接靠 `404.html` 兜底**：GitHub Pages 对不存在的路径返回 `404.html`，所以它必须是 `index.html`
   的副本 —— 由 `.github/workflows/gh-page.yml` 在发布前 `cp index.html 404.html` 生成（仓库里也放了一份）。
   本地预览深链接需要一个带 fallback 的静态服务器（`python3 -m http.server` 不行）。

新增一篇文章：在 `pages/posts.js`（或 `pages/old-posts.js`）的数组里加一条记录即可，
`{ date, note }` 便签、`{ date, post }` 内联短文、`{ date, title, file }` 长文（按需加载 .md）。

新增一个页面：`pages/<名字>.js` 里写 `render<名字>()`（返回 `html\`\`` 节点）+ 可选的 `after<名字>(content, route)`，
在 `index.html` 加 `<script>`，在 `router.js` 的 `parse()` / `NAV` / `buildPage()` 各加一行。

## 游戏（Odin + raylib → WebAssembly）

源码在 `pages/games/<id>/`，构建产物 `pages/games/<id>/build/` 不入库：

- 桌面版 `make -C pages/games/jump desktop`（`build/desktop/jump`）
- Web 版 `make -C pages/games/jump web`（`build/web/`，本地预览 `make -C pages/games/jump serve`）

CI 每次部署时现编 web 版。注意 `publish_dir` 是仓库根目录、发布走 `git add --all`，所以：

- `.gitignore` 里的 `/**/build/` 会被 workflow 在发布前 `sed` 删掉，否则刚编出来的 wasm 发不出去；
- 反过来，任何**在 CI 工作区里产生的垃圾都要写进 `.gitignore`**（例如 `emsdk-cache/`），
  否则会被一起推到 gh-pages（超 100MB 的文件会被 GitHub 直接拒收）。

## 相册

原图（含 EXIF/GPS）放 `assets/images/photos/raw/`（已 gitignore），跑 `python scripts/convert_webp.py`
生成 720p、已脱敏的 `.webp`，再把文件名填进 `pages/photo.js`。
