// ABOUT 页面组件。

async function renderAbout() {
    const container = document.createElement('div');
    // 正文：内联 Markdown，想混 HTML 就再拆一段出来自己拼
    const md = `
# ABOUT
你好...

总之下面是一些我想做的项目

- khinsider 客户端，支持安卓 tv 和 steamdeck 游戏模式，手柄支持，以及注意尊重托管服务器
- 开源的舞力全开，可能类似 osu! 的运作方式，所有人都需要一颗舞动的灵魂
- 更多游戏... 还没想好

我以前使用网易云音乐和 foobar2000 自行下载专辑听音乐，但现在直接使用 bilibili/youtube 收藏夹

[https://space.bilibili.com/110777624/favlist](https://space.bilibili.com/110777624/favlist)

你可以在这里了解我喜欢的音乐类型

感谢您的随意浏览，祝您上午好，中午好，下午好，晚安
`;

    const body = document.createElement('div');
    body.innerHTML = renderMD(md);
    container.append(body);

    return container;
}
