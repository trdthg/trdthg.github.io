// MUSIC 页面组件。

MUSICS = [
    {
        name: "模仿星露谷物语 overture 的左手和弦，悲伤版本",
        sheet: `3f  3a+ 4c+ 4f  4c+ 3b+ |
3f  3b  4d+ 4f  4d+ 3b  |
3d+ 3g+ 3b  4d+ 3b  3g+ |
3d+ 3f+ 3a+ 4c+ 3a+ 3f+ |`
    }
]

async function renderMusic() {
    const md = renderMD(`
        <h1>MUSIC</h1>
        <p>会放一些我临时起意巧的的音乐片段，还没想好怎么演示，不过大概会有下面的东西</p>

        - [ ] 一些自定义的音乐 DSL，不过也可能使用现有的语法，比如 lilypond 之类的
        - [ ] 一个合成器，使用 fx7.js 或者 tone.js 在线播放，这样就不用保存一堆 mp3 了
    `)

    const cards = MUSICS.map(({ name, sheet }) => html`
        <p>${name || "[FIXME!] empty name"}</p>
        <pre>${sheet}</pre>
    `);

    return html`
        <div>${md}</div>
        <h3>片段们</h3>
        ${cards}
    `;
}
