// ABOUT 页面组件。

async function renderAbout() {
    const container = document.createElement('div');
    // 正文：内联 Markdown，想混 HTML 就再拆一段出来自己拼
    const md = `
# ABOUT
你好...

我不知道要在这里分享多少我自己的事情

总之下面是一些我想做的项目
- 开源的舞力全开，可能类似 osu! 的运作方式，所有人都需要一颗舞动的灵魂
- khinsider 客户端，支持安卓 tv 和 steamdeck 游戏模式，手柄支持，以及注意尊重托管服务器
- 一款我的游戏... 还没想好

感谢您的随意浏览，祝您上午好，中午好，下午好，晚安
`;

    const body = document.createElement('div');
    body.innerHTML = renderMD(md);
    container.append(body);

    // 图片转 Unicode 字符画
    const blockArt = await createBlockArtComponent('assets/images/portrait-1027.jpg', document, {
        width: 160,
        mode: 'dither',
        fontSize: '0.2rem',
        scale: 0.5,
        outline: '#111'
    });
    container.append(blockArt);

    return container;
}
