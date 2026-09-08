// ABOUT 页面组件。


async function renderAbout() {
    // 字符画组件返回的是 HTMLElement，所以整个页面改用容器节点拼接
    const container = document.createElement('div');
    container.innerHTML = `<h1>ABOUT</h1>
    <p>你好... </p>

    <p>我不知道要在这里分享多少我自己的事情，总之在想好之前就让它空着吧</p>

    <p>假如再也见不到你，祝你下午好，晚上好，晚安！<p>

    `;

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
