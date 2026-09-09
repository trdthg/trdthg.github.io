// GAME 页面组件。
async function renderGame() {
    const container = document.createElement('div');
    container.innerHTML = `
        <style>
            /* GAME 页局部样式：像素字体（导航高亮时切换正文字体） */

            :has(#game.active) #content {
                font-family: "zpix", sans-serif;
            }
        </style>
        <h1>IT's GAMING TIME NOW!</h1><p>还没想好做什么，先占个位。</p>
    `;
    return container;
}
