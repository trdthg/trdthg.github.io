// MUSIC 页面组件。
async function renderMusic() {
    res = renderMD(`
        <h1>MUSIC</h1>
        <p>会放一些我制作的音乐片段，还没想好怎么演示，不过大概会有下面的东西</p>

        - 一个自定义的音乐编程语言，也可能使用现有的语法
        - 一个合成器，使用 fx7.js 或者 tone.js 即时播放

    `)
    return res;
}
