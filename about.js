// ABOUT 页面组件。
// 惯例：某个页面的 render 写太长时，就独立成 <页面名>.js，
// 在 index.html 里引一下（router.js 之前），router.js 的 switch 不用改。
function renderAbout() {
    return `<h1>ABOUT</h1>
    <p>你好... </p>

    <p>我不知道要在这里分享多少我自己的事情，总之在想好之前就让它空着吧</p>

    <p>假如再也见不到你，祝你下午好，晚上好，晚安！<p>

    `;
}
