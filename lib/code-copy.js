// 给每个 <pre> 代码块右上角加一个复制按钮（按钮绝对定位在 pre 里，pre 在 style.css 里设了 position: relative）。
// 由 renderMD() 在返回节点前调用，所以调用方不用再自己关心插入了什么内容；重复调用是幂等的。

function decorateCodeBlocks(container) {
    for (const pre of container.querySelectorAll('pre')) {
        const code = pre.querySelector('code');
        if (!code || pre.querySelector(':scope > .code-copy')) continue;

        const button = html`<button type="button" class="code-copy" aria-label="copy code">copy</button>`;

        button.addEventListener('click', async () => {
            const ok = await copyText(code.textContent);
            button.textContent = ok ? 'copied' : 'failed';
            button.classList.toggle('is-ok', ok);
            clearTimeout(button.dataset.timer);
            button.dataset.timer = setTimeout(() => {
                button.textContent = 'copy';
                button.classList.remove('is-ok');
            }, 1200);
        });

        pre.append(button);
    }
}

// clipboard API 只在安全上下文可用（https / localhost）；file:// 或老浏览器回退到 execCommand
async function copyText(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch (e) {
        // 落到下面的回退方案
    }

    const scratch = document.createElement('textarea');
    scratch.value = text;
    scratch.setAttribute('readonly', '');
    scratch.style.cssText = 'position:fixed;top:-1000px;opacity:0';
    document.body.append(scratch);
    scratch.select();
    let ok = false;
    try {
        ok = document.execCommand('copy');
    } catch (e) {
        ok = false;
    }
    scratch.remove();
    return ok;
}
