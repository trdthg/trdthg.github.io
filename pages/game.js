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
    {
        id: 'upside-down-bar',
        title: '[TODO] Upside Uʍop Bar',
        desc: 'gamejam 构思',
        more: `
        颠倒酒吧，灵感来自颠倒的帕特玛，截取地上人底下人互相接纳并开始交流的生活场景
        你的舅舅最近要去采购新型酒杯了，你将替你舅舅临时当几天酒吧老板，第一次接待地下人的你，究竟能预见多少离奇古怪的事情
        - 场景
            - 酒吧层高设计为 1 : 1 : 1, 人的身高为基准
        - 玩什么
            - 向顾客递杯子
                - 一种可以封口的特殊杯子：按键蓄力向空中投去，中间蹦床用于投递较远的顾客
                - 超长吸管：直接插上去，靠近就被按一次增加一根吸管
                - 水泵管 (有人吸不上去): TODO
                - 使用气球送：TODO
        - 特殊事件
            - 两高个碰头
            - super fat guy 把屋顶压塌，人飞走，模板砸下
        `,
    }
];

function renderGameList() {
    return html`
        <h1>IT's GAMING TIME NOW!</h1>
        <p>一些小游戏，都是 Odin 编译成 WebAssembly 跑在浏览器里的。</p>

        <div id="game-list">
            ${GAMES.map(game => {
                // 有 page 才能打开；没有的（还没做）渲染成不带 href 的 <a>：
                // 不可点、不进 tab 顺序，router 也只拦截 a[href]，样式见 style.css
                const title = game.page
                    ? html`<a href=${'?page=game&game=' + encodeURIComponent(game.id)}>${game.title}</a>`
                    : html`<a title="还没做">${game.title}</a>`;
                // 「更多」只在有 more 时出现，默认收起；on* 的值必须是函数（见 lib/html.js）
                const more = game.more && html`<div class="game-more" hidden>${renderMD(game.more)}</div>`;
                return html`<div>
                    <p>
                        <strong>${title}</strong> — ${game.desc} ${game.more && html`<button onclick=${e => {
                            const button = e.currentTarget;
                            const box = button.closest('div').querySelector('.game-more');
                            box.hidden = !box.hidden;
                            button.textContent = box.hidden ? 'More' : 'Less';
                        }}>More</button>`}
                    </p>
                    ${more}
                </div>`;
            })}
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
    const width = game.width || 800
    const height = game.height || 450
    dialog.style.setProperty('--game-w', width + 'px');
    dialog.style.setProperty('--game-ratio', `${width / height}`);

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
    if (game && game.page) openGame(game);   // 没 page 的还没做：直接访问 /game/<id> 也只停在列表页
}
