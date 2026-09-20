// MUSIC 页面：用 ABC notation 写片段，点播放先转成 MIDI，再交给 webaudio-tinysynth 合成。
//
// 两个第三方库各管一件事，互不依赖（见 index.html 里的 <script>）：
//   abcjs      把 ABC 画成五线谱，并转成标准 MIDI 文件字节（ABCJS.synth.getMidiFile）
//   TinySynth  读入 MIDI 字节播放（loadMIDI / playMIDI），自带音色、循环、播放进度
// 所以「播放」= ABC → MIDI → 合成器，不需要预先生成 mp3 存仓库。
//
// 数据：MUSICS 每项 { name, abc }。乐谱不在这里画 —— abcjs 的 responsive 要量容器宽度，
// 而 render() 返回的节点此刻还没挂进文档，统一放到 afterMusic 里渲染。

const MUSICS = [
    {
        name: '小小阴森片段',
        desc: '模仿星露谷 overture 的左手和弦随便摁出来的',
        abc: `X:1
M:3/4
L:1/8
Q:1/4=76
K:Ebm clef=bass
F, B, D F D =C | F, C E F E C | E, A, C E C A, | E, G, B, D B, G, |`
    },
    {
        name: '生日快乐',
        desc: '🎂 提前祝您生日快乐！',
        abc: `X:1
M:3/4
L:1/4
Q:1/4=120
K:C
G/2 G/2 A G C' B | G/2 G/2 A G D' C' |
G/2 G/2 g e c B A | f/2 f/2 e c d c |`
    },
];

const INTRO = `
# MUSIC

会放一些我临时起意的音乐片段。谱子用 [ABC notation](https://abcnotation.com/) 写，页面加载时用 [abcjs](https://www.abcjs.net/) 画成五线谱；点播放会先把 ABC 转成 MIDI，, 再交给 [webaudio-tinysynth](https://github.com/g200kg/webaudio-tinysynth) 合成，不会保存 mp3。
- 也许之后还会有其他的语法
- 还有其他的合成器音色
`;

const CUSTOM_DEFAULT_ABC = `X:1
M:4/4
L:1/4
Q:1/4=100
K:C
C D E F | G A B c |`;

// —— 乐谱渲染 ——
// ABC 源码挂在 data-abc 上，afterMusic 只要扫 .music-score 就行，不用回传控制器。
// 标题由外层 <h2> 负责，所以 ABC 里不写 T:，渲染时也用 ariaLabel:'' 让 abcjs 别插 <title>。

function renderScore(el) {
    if (!el || !el.isConnected || el.dataset.rendered) return;
    try {
        ABCJS.renderAbc(el, el.dataset.abc, { responsive: 'resize', ariaLabel: '' });
        el.dataset.rendered = '1';
    } catch (err) {
        el.textContent = `乐谱渲染失败：${err.message}`;
    }
}

function afterMusic(content) {
    content.querySelectorAll('.music-score').forEach(renderScore);
}

// —— 播放 ——
// TinySynth 一次只能播一首，所以整页共用一个实例 + 一个「当前卡片」指针。

let synth = null;        // 首次点播放时才创建：AudioContext 要用户手势之后才允许出声
let loaded = null;       // synth 里当前装的是哪个 player 的 MIDI（换歌时要重新 loadMIDI）
let current = null;      // 正在播放的 player（暂停 / 播完 / 离开页面时置空）
let pollTimer = null;    // 进度轮询

function ensureSynth() {
    if (!synth) synth = new WebAudioTinySynth({ quality: 1, voices: 32 });
    if (synth.actx.state === 'suspended') synth.actx.resume();
    return synth;
}

// TinySynth 的 stopMIDI() / loadMIDI() 内部都是直接 oscillator.stop() 硬切正在发声的振荡器，
// 波形从非零振幅被截断就是暂停时那声「啪」。统一先花 ~20ms 把总音量斜坡降到 0，
// 等彻底没声了再执行 action（stopMIDI / loadMIDI），完事把音量恢复。
// fadeToken 用来作废「已经排好队、但中间又被新操作覆盖」的淡出。
let fadeToken = 0;

function withFadeOut(s, action) {
    const gain = s?.out?.gain;
    if (!gain || !s.actx) { action(); return; }

    const t = s.actx.currentTime;
    const vol = s.masterVol;
    gain.cancelScheduledValues(t);
    gain.setValueAtTime(vol, t);
    gain.linearRampToValueAtTime(0, t + 0.02);

    const mine = ++fadeToken;
    setTimeout(() => {
        if (mine !== fadeToken) return;   // 这中间又开始播了，本次作废
        action();
        gain.cancelScheduledValues(s.actx.currentTime);
        gain.setValueAtTime(vol, s.actx.currentTime);
    }, 30);
}

// 立即把总音量恢复到正常值（取消可能还在进行的淡出）
function restoreVolume(s) {
    const gain = s?.out?.gain;
    if (!gain || !s.actx) return;
    gain.cancelScheduledValues(s.actx.currentTime);
    gain.setValueAtTime(s.masterVol, s.actx.currentTime);
}

// tick → 秒的换算系数：timebase（每四分音符 tick 数）+ 曲首 tempo。
// ABC 生成的曲子 tempo 基本恒定，用它估个时长给进度条显示就够了。
function midiSecondsPerTick(bytes) {
    const timebase = (bytes[12] << 8) | bytes[13];
    let tempo = 500000;   // 没写 tempo 就是 120 BPM
    for (let i = 0; i + 5 < bytes.length; i++) {
        if (bytes[i] === 0xff && bytes[i + 1] === 0x51 && bytes[i + 2] === 0x03) {
            tempo = (bytes[i + 3] << 16) | (bytes[i + 4] << 8) | bytes[i + 5];
            break;
        }
    }
    return tempo / 1e6 / (timebase || 480);
}

const fmtTime = sec => {
    sec = Math.max(0, Math.round(sec));
    return `${String((sec / 60) | 0).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
};

function startPolling() {
    if (pollTimer) return;
    pollTimer = setInterval(() => {
        if (!current) { clearInterval(pollTimer); pollTimer = null; return; }
        current.sync();
    }, 100);
}

// 片段之间的分割线：+---+---+... 一直重复，靠 CSS overflow:hidden 裁掉超出宽度的部分，
// 所以不管屏幕多宽都刚好铺满一行，也不会被 word-wrap 从中间折断。
function musicDivider() {
    return html`<div class="music-divider" aria-hidden="true">${'+---'.repeat(120)}+</div>`;
}

function createMusicPlayer({ name, desc, abc }) {
    const score = html`<div class="music-score" data-abc=${abc}></div>`;
    const playBtn = html`<button class="music-play" type="button">Play</button>`;
    const sheetBtn = html`<button class="music-sheet" type="button">Sheet</button>`;
    const bar = html`<input class="music-progress" type="range" min="0" max="1000" value="0" step="1" disabled />`;
    const timeEl = html`<span class="music-time">00:00 / 00:00</span>`;
    const status = html`<p class="music-status"></p>`;
    const source = html`<pre class="music-source" hidden>${abc}</pre>`;

    const node = html`
        <article class="music-card">
            <div class="music-head">
                <h2 class="music-title">${name}</h2>
                ${desc && html`<p class="music-desc">${desc}</p>`}
            </div>
            <div class="music-score-wrap" aria-hidden="true">${score}</div>
            <div class="music-row">
                ${playBtn}
                ${sheetBtn}
                ${bar}
                ${timeEl}
            </div>
            ${status}
            ${source}
        </article>`;

    // sheet 按钮：展开 / 收起 ABC 源码
    sheetBtn.addEventListener('click', () => { source.hidden = !source.hidden; });

    const player = {
        node,
        midi: null,      // ABC 转出来的 MIDI 字节（Uint8Array）
        spTick: 0,       // 每 tick 多少秒
        duration: 0,

        // 只复位 UI，不碰合成器
        stopUI() {
            if (current === player) current = null;
            bar.disabled = true;
            playBtn.textContent = 'Play';
        },

        // 从头播，或从暂停处继续
        play() {
            const s = ensureSynth();

            const start = () => {
                if (!node.isConnected) return;   // 淡出这 30ms 里页面被路由切走了
                try {
                    if (loaded !== player) {
                        if (!player.midi) {
                            player.midi = ABCJS.synth.getMidiFile(abc, { midiOutputType: 'binary' })[0];
                            player.spTick = midiSecondsPerTick(player.midi);
                        }
                        s.loadMIDI(player.midi);
                        loaded = player;
                        player.duration = s.getPlayStatus().maxTick * player.spTick;
                    }
                } catch (err) {
                    status.textContent = `Error: ${err.message}`;
                    return;
                }
                status.textContent = '';
                s.playMIDI();   // playTick 没到末尾就是续播，到了就从头
                current = player;
                bar.disabled = false;
                playBtn.textContent = 'Stop';
                startPolling();
                player.sync();
            };

            if (current && current !== player) {
                // 切歌：上一首先淡出，等没声音了再 load（loadMIDI 内部也会 stopMIDI 硬切）
                current.stopUI();
                withFadeOut(s, start);
            } else {
                // 续播 / 首次：作废还挂着的淡出，恢复音量后直接开始
                fadeToken++;
                restoreVolume(s);
                start();
            }
        },

        // 暂停：淡出后再停，避开 stopMIDI 的硬切爆音
        pause() {
            player.stopUI();
            withFadeOut(synth, () => synth.stopMIDI());
        },

        // 轮询回调：刷进度条，顺带处理「播完了」和「页面被路由切走了」
        sync() {
            if (current !== player) return;
            if (!node.isConnected) { player.pause(); loaded = null; return; }   // 离开 MUSIC 页，别再出声
            const st = synth.getPlayStatus();
            bar.value = st.maxTick ? (st.curTick / st.maxTick) * 1000 : 0;
            timeEl.textContent = `${fmtTime(st.curTick * player.spTick)} / ${fmtTime(player.duration)}`;
            if (!st.play) player.stopUI();   // 自然播完：noteOff 都发出去了，让尾音自己衰减，不硬停
        },
    };

    playBtn.addEventListener('click', () => {
        if (current === player) player.pause();
        else player.play();
    });

    // 拖动进度条 = 跳到对应 tick；TinySynth 会在播放中重新定位并继续
    bar.addEventListener('input', () => {
        if (current !== player) return;
        const st = synth.getPlayStatus();
        synth.locateMIDI((bar.value / 1000) * st.maxTick);
        player.sync();
    });

    return player;
}

function renderMusic() {
    const container = html`
        <div class="music-page">
            <style>
                /* MUSIC 页局部样式：选择器都限定在 .music-page 下 */
                .music-page .music-card { margin: 1em 0; }
                .music-page .music-divider {
                    overflow: hidden; white-space: nowrap; user-select: none;
                    color: var(--muted); opacity: 0.45; line-height: 1;
                }
                .music-page .music-head {
                    display: flex; align-items: baseline; flex-wrap: wrap; gap: 4px 10px;
                    margin-bottom: 0.6em;
                }
                .music-page .music-title { margin: 0; font-size: 1.05em; }
                .music-page .music-desc { margin: 0; font-size: 0.9em; opacity: 0.65; }
                .music-page .music-row {
                    display: flex; align-items: center; flex-wrap: wrap; gap: 8px 10px;
                }
                .music-page .music-progress { width: 200px; max-width: 100%; margin: 0; }
                .music-page .music-time {
                    font-variant-numeric: tabular-nums; font-size: 0.85em; opacity: 0.7;
                }
                .music-page .music-status { margin: 0.5em 0 0; color: #b55454; font-size: 0.9em; }
                .music-page .music-status:empty { display: none; }
                /* ABC 源码：点 sheet 按钮才显示 */
                .music-page .music-source { margin: 0.7em 0 0; }
                /* 五线谱：限宽放在 wrapper 上 —— abcjs 给 .music-score 加的 padding-bottom 是百分比，
                   百分比 padding 按「包含块宽度」算，直接给 .music-score 限宽的话它仍按外层宽度预留高度，
                   就会在谱子下面留一大块空白 */
                .music-page .music-score-wrap { max-width: min(624px, 100%); margin-bottom: 0.8em; }
                .music-page .music-custom { margin-top: 2.5em; }
                .music-page .music-input {
                    width: 100%; box-sizing: border-box; min-height: 7.5em; resize: vertical;
                    font-family: "SF Mono", "Fira Code", "Fira Mono", monospace;
                    font-size: 0.9em; line-height: 1.5;
                    background: var(--bg-code); color: inherit;
                    border: 1px solid var(--border); border-radius: 4px; padding: 0.6em 0.8em;
                }
            </style>
            <div class="music-intro"></div>
            <div class="music-list"></div>
            <section class="music-custom">
                <h2>自己写一段</h2>
                <p>用 ABC notation 写，点按钮会重新渲染乐谱并播放。</p>
                <textarea class="music-input" spellcheck="false" value=${CUSTOM_DEFAULT_ABC}></textarea>
                <div class="music-row">
                    <button class="music-build" type="button">渲染并播放</button>
                </div>
                <div class="music-custom-slot"></div>
            </section>
        </div>`;

    container.querySelector('.music-intro').append(renderMD(INTRO));

    const list = container.querySelector('.music-list');
    for (const item of MUSICS) {
        list.append(musicDivider());
        list.append(createMusicPlayer(item).node);
    }

    // 自定义：重新建一张卡片、就地渲染乐谱（此时节点已挂进文档，能直接量宽度）并播放
    container.querySelector('.music-build').addEventListener('click', () => {
        const input = container.querySelector('.music-input');
        const abc = input.value.trim();
        if (!abc) return;
        const player = createMusicPlayer({ name: '自定义', abc });
        container.querySelector('.music-custom-slot').replaceChildren(player.node);
        renderScore(player.node.querySelector('.music-score'));
        player.play();
    });

    return container;
}
