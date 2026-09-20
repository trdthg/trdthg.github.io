// ABOUT 页面组件。

async function renderAbout() {
    // 正文：内联 Markdown，想混 HTML 就再拆一段出来自己拼
    const md = `
# ABOUT
你好...

总之下面是一些我想做的项目

- khinsider 客户端，支持安卓 tv 和 steamdeck 游戏模式，手柄支持
    - 做完了 [https://github.com/trdthg/khinsiderTV](https://github.com/trdthg/khinsiderTV)
    - 感觉要加一下互联网档案馆作为数据源，里面好东西真多
- 开源的舞力全开，可能类似 osu! 的运作方式，所有人都需要一颗舞动的灵魂
- 更多游戏... 还没想好

我以前使用网易云音乐和 foobar2000 自行下载专辑听音乐，但现在直接使用 bilibili/youtube 收藏夹

[https://space.bilibili.com/110777624/favlist](https://space.bilibili.com/110777624/favlist)

你可以在这里了解我喜欢的音乐类型

感谢您的随意浏览，祝您上午好，中午好，下午好，晚安
`;

    return html`<div>${renderMD(md)}</div>`;
}
