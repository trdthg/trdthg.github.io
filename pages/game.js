// GAME 页：所有游戏在这里显式列出，点标题弹模态（不导航，URL 会同步）。
//
// 新增游戏：
//   1) pages/games/<id>/ 建 Odin 工程（照抄 jump/ 那套：game.odin + main_web/ + main_desktop/ + Makefile）
//   2) 下面 GAMES 里加一条
//   3) make -C pages/games/<id> web
//
// 游戏本体的源码在 pages/games/<id>/，这个文件只管「站点侧怎么列出来、怎么打开」。
// 模态用原生 <dialog>：ESC 关闭、焦点陷阱、::backdrop 都是白送的；
// 只有「点背景关闭」要自己判断（见 afterGame）。

const GAMES = [
    {
        id: 'jump',
        title: '[WIP] 跳跳乐',
        desc: '目前只是 Odin + raylib 编译成 WebAssembly 的测试',
        // 由 make -C pages/games/jump web 生成。以 / 开头：URL 可能是 /game/jump 这种深层路径
        page: '/pages/games/jump/build/web/index.html',
        width: 800,
        height: 450,
    },
];

function renderGameList() {
    return html`
        <h1>IT's GAMING TIME NOW!</h1>
        <p>一些小游戏，都是 Odin 编译成 WebAssembly 跑在浏览器里的。</p>

        <div id="game-list">
            ${GAMES.map(game => html`
                <p>
                    <a href=${'/game/' + game.id}>${game.title}</a>
                    — ${game.desc}
                </p>
            `)}
        </div>

        <dialog class="game-dialog" id="game-dialog"></dialog>
    `;
}

// 打开游戏。iframe 每次重新创建：关闭时整个移除，游戏就停了，不占 CPU/GPU。
function openGame(game) {
    const dialog = document.getElementById('game-dialog');
    if (!dialog || dialog.open) return;

    // iframe 要被控制栏上几个按钮引用，所以先建出来
    // 尺寸由 GAMES 里的 width/height 通过 CSS 变量传给 .game-dialog / .game-frame（见 style.css）
    const frame = html`
        <iframe class="game-frame" src=${game.page} allow="fullscreen"></iframe>
    `;

    // 键盘事件不会从父页面穿透进 iframe：不聚焦的话，用户得先在画面里点一下才能操作。
    // 加载完自动聚焦一次，把那一次点击省掉（鼠标本来就不用点）。
    frame.addEventListener('load', () => {
        try {
            frame.contentWindow.focus();
        } catch {
            // 跨域的话就退化成手动点一下
        }
    });

    const bar = html`
        <div class="game-bar">
            <span class="game-bar-title">${game.title}</span>
            <button class="game-close" title="关闭" onclick=${() => dialog.close()}>✕</button>
        </div>
    `;

    dialog.replaceChildren(bar, frame);

    // 尺寸给到 dialog（而不是 iframe）：dialog 宽度 = 游戏宽度，iframe 就是 100%，
    // 不存在百分比互相依赖的循环问题
    dialog.style.setProperty('--game-w', game.width + 'px');
    dialog.style.setProperty('--game-ratio', `${game.width} / ${game.height}`);

    dialog.showModal();
    document.title = game.title;
    // URL 由 router.js 的链接拦截推到 /game/<id>，这里不用再动 history
}

// router 的 after 钩子（见 router.js）：
// 挂载完成后绑定模态事件，并支持直接访问 /game/<id> 自动打开
function afterGame(content, route) {
    const dialog = document.getElementById('game-dialog');
    if (!dialog) return;

    // 点背景关闭。<dialog> 只免费送 ESC，点外面要自己判断坐标
    dialog.addEventListener('click', event => {
        const r = dialog.getBoundingClientRect();
        const outside = event.clientX < r.left || event.clientX > r.right ||
                        event.clientY < r.top || event.clientY > r.bottom;
        if (outside) dialog.close();
    });

    // 关闭时销毁 iframe（游戏停止运行），并把 URL 还原成列表页
    dialog.addEventListener('close', () => {
        dialog.replaceChildren();
        document.title = 'GAME';
        if (route.game) history.replaceState(null, '', '/game');
    });

    const game = GAMES.find(g => g.id === route.game);
    if (game) openGame(game);
}
