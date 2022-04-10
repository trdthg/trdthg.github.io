import{r as p,o as e,c as t,a as n,b as o,F as c,d as s,e as l}from"./app.10f248f3.js";import{_ as u}from"./plugin-vue_export-helper.21dcd24c.js";const r={},i=n("h1",{id:"\u534F\u7A0B\u4E0E\u5F02\u6B65",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u534F\u7A0B\u4E0E\u5F02\u6B65","aria-hidden":"true"},"#"),s(" \u534F\u7A0B\u4E0E\u5F02\u6B65")],-1),k=n("h2",{id:"\u534F\u7A0B",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u534F\u7A0B","aria-hidden":"true"},"#"),s(" \u534F\u7A0B")],-1),d={href:"https://github.com/xiaobing94/coroutine",target:"_blank",rel:"noopener noreferrer"},m=s("C \u8BED\u8A00\u534F\u7A0B\u7684\u7B80\u5355\u5B9E\u73B0"),b=l(`<p>linux \u4E0B\u5728\u5934\u6587\u4EF6<code>ucontext.h</code>\u63D0\u4F9B\u4E86<code>getcontext(),setcontext(),makecontext(),swapcontext()</code>\u56DB\u4E2A\u51FD\u6570\u548C<code>mcontext_t \u548C ucontext_t</code>\u7ED3\u6784\u4F53\u3002</p><p>\u8FD9 4 \u4E2A\u51FD\u6570\u80FD\u591F\u5B9E\u73B0\u4FDD\u5B58\uFF0C\u83B7\u53D6\uFF0C\u8BBE\u7F6E\uFF0C\u5207\u6362\u4E0A\u4E0B\u6587\uFF0C\u662F\u534F\u7A0B\u5B9E\u73B0\u7684\u6838\u5FC3\uFF0C\u4E5F\u662F yield \u7684\u6838\u5FC3</p><p>\u7ED3\u6784\u4F53\u5219\u4FDD\u7559\u4E86\u534F\u7A0B\u7684 id\uFF0C\u8FD0\u884C\u5806\u6808\u7B49\u4FE1\u606F</p><ul><li><p>\u4E0D\u540C\u534F\u7A0B\u4FDD\u5B58\u5728\u961F\u5217\u4E2D\uFF0C\u7531\u4E00\u4E2A\u8C03\u5EA6\u5668\u8FDB\u884C\u63A8\u8FDB\u5404\u4E2A\u534F\u7A0B</p></li><li><p>\u8C03\u5EA6\u5668\u4F1A\u4F9D\u6B21\u6267\u884C\u6BCF\u4E2A\u534F\u7A0B\uFF0C\u6BCF\u5F53\u67D0\u4E00\u4E2A\u534F\u7A0B\u8FDB\u884C\u4E86 yield \u64CD\u4F5C (<code>swapcontext()</code>), \u8C03\u5EA6\u5668\u5C31\u4F1A\u5207\u6362\u5230\u53E6\u4E00\u4E2A\u534F\u7A0B\u7684\u4E0A\u4E0B\u6587\uFF0C\u7EE7\u7EED\u63A8\u8FDB</p></li><li><p>\u5F53\u6240\u6709\u534F\u7A0B\u90FD\u6267\u884C\u5B8C\u6210\uFF0C\u5C31\u7ED3\u675F</p></li></ul><p>\u4E0B\u9762\u7684\u56FE\u7247\u662F\u9605\u8BFB\u4E86\u4E0A\u9762\u4EE3\u7801\u540E\u7684\u6574\u7406 <img src="https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203262211252.png" alt=""></p><h2 id="rust-\u5F02\u6B65\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#rust-\u5F02\u6B65\u539F\u7406" aria-hidden="true">#</a> Rust \u5F02\u6B65\u539F\u7406</h2><h3 id="future-\u7279\u5F81" tabindex="-1"><a class="header-anchor" href="#future-\u7279\u5F81" aria-hidden="true">#</a> Future \u7279\u5F81</h3><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">trait</span> <span class="token type-definition class-name">Future</span> <span class="token punctuation">{</span>
    <span class="token keyword">type</span> <span class="token type-definition class-name">Output</span><span class="token punctuation">;</span>
    <span class="token keyword">fn</span> <span class="token function-definition function">poll</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">:</span> <span class="token class-name">Pin</span><span class="token operator">&lt;</span><span class="token operator">&amp;</span><span class="token keyword">mut</span> <span class="token keyword">Self</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> cx<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> <span class="token class-name">Context</span><span class="token punctuation">)</span>
        <span class="token punctuation">-&gt;</span> <span class="token class-name">Poll</span><span class="token operator">&lt;</span><span class="token keyword">Self</span><span class="token punctuation">::</span><span class="token class-name">Output</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> <span class="token type-definition class-name">Poll</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name">Pending</span><span class="token punctuation">,</span>
    <span class="token class-name">Ready</span><span class="token punctuation">(</span><span class="token class-name">T</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="\u7F16\u8BD1\u5F02\u6B65\u4EE3\u7801\u65F6\u53D1\u751F\u4E86\u4EC0\u4E48" tabindex="-1"><a class="header-anchor" href="#\u7F16\u8BD1\u5F02\u6B65\u4EE3\u7801\u65F6\u53D1\u751F\u4E86\u4EC0\u4E48" aria-hidden="true">#</a> \u7F16\u8BD1\u5F02\u6B65\u4EE3\u7801\u65F6\u53D1\u751F\u4E86\u4EC0\u4E48</h3><p>\u4E0B\u9762\u662F\u4E00\u6BB5\u5F02\u6B65\u4EE3\u7801\uFF0C\u5B83\u5411 server \u5F02\u6B65\u8BF7\u6C42\u4E86\u4E00\u6BB5\u6570\u636E\uFF0C\u63A5\u7740\u628A\u7ED3\u679C\u8FDB\u884C\u683C\u5F0F\u8F6C\u6362\uFF0C\u6700\u540E\u5C06\u6570\u636E\u901A\u8FC7 stream \u5F02\u6B65\u53D1\u9001\u51FA\u53BB\uFF1A</p><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">async</span> <span class="token keyword">fn</span> <span class="token function-definition function">handle_request</span><span class="token punctuation">(</span>
    server<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token class-name">RpcServer</span><span class="token punctuation">,</span>
    <span class="token keyword">mut</span> stream<span class="token punctuation">:</span> <span class="token class-name">TcpStream</span><span class="token punctuation">,</span>
    id<span class="token punctuation">:</span> <span class="token keyword">i32</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token keyword">impl</span> <span class="token class-name">Future</span><span class="token operator">&lt;</span><span class="token class-name">Output</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> row <span class="token operator">=</span> <span class="token function">get_row</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>server<span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">await</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> encoded <span class="token operator">=</span> <span class="token namespace">json<span class="token punctuation">::</span></span><span class="token function">encode</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>row<span class="token punctuation">)</span><span class="token punctuation">;</span>

    stream<span class="token punctuation">.</span><span class="token function">write_all</span><span class="token punctuation">(</span>encoded<span class="token punctuation">.</span><span class="token function">as_bytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">await</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>\u7F16\u8BD1\u5668\u4F1A\u4E3A\u4E3A\u8FD9\u4E2A\u5F02\u6B65\u51FD\u6570\u521B\u5EFA\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u80FD\u591F\u8868\u73B0\u5F53\u524D\u5F02\u6B65\u64CD\u4F5C\u7684\u72B6\u6001\uFF1A</p><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">struct</span> <span class="token type-definition class-name">RequestHandler</span> <span class="token punctuation">{</span>
    server<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token class-name">RpcServer</span><span class="token punctuation">,</span>
    stream<span class="token punctuation">:</span> <span class="token class-name">TcpStream</span><span class="token punctuation">,</span>
    id<span class="token punctuation">:</span> <span class="token keyword">i32</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>\u63A5\u7740\u9700\u8981\u4E3A\u5B83\u5B9E\u73B0 Future \u7279\u5F81</p><p>\u5728 poll \u65B9\u6CD5\u5185\u90E8\u5C31\u662F\u4E00\u4E2A\u72B6\u6001\u673A\uFF0C\u6BCF\u6B21\u8C03\u7528 poll \u5C31\u4F1A\u5C1D\u8BD5\u63A8\u8FDB\u5F02\u6B65\u4EFB\u52A1\uFF0C\u5E76\u6839\u636E\u72B6\u6001\u4F5C\u51FA\u5BF9\u5E94\u7684\u6D3B\u52A8</p><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">impl</span> <span class="token class-name">Future</span> <span class="token keyword">for</span> <span class="token class-name">RequestHandler</span> <span class="token punctuation">{</span>
    <span class="token keyword">type</span> <span class="token type-definition class-name">Output</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">fn</span> <span class="token function-definition function">poll</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">mut</span> <span class="token keyword">self</span><span class="token punctuation">,</span> cx<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> <span class="token class-name">Context</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token class-name">Pool</span><span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">loop</span> <span class="token punctuation">{</span>
            <span class="token keyword">match</span> <span class="token keyword">self</span><span class="token punctuation">.</span>state <span class="token punctuation">{</span>
                <span class="token punctuation">...</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="\u72B6\u6001\u673A" tabindex="-1"><a class="header-anchor" href="#\u72B6\u6001\u673A" aria-hidden="true">#</a> \u72B6\u6001\u673A</h3><p>\u73B0\u5728\u6211\u4EEC\u8981\u4E3A\u5B83\u624B\u52A8\u7F16\u5199\u4E00\u4E2A\u72B6\u6001\u673A</p><p>\u9996\u5148\u4E3A\u4E86\u80FD\u591F\u8DDF\u8E2A\u8BF7\u6C42\u7684\u72B6\u6001\uFF0C\u6211\u4EEC\u8981\u4E3A\u7ED3\u6784\u4F53\u6DFB\u52A0\u4E00\u4E2A state \u5B57\u6BB5\uFF1A</p><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">struct</span> <span class="token type-definition class-name">RequestHandler</span> <span class="token punctuation">{</span>
    <span class="token punctuation">...</span>
    state<span class="token punctuation">:</span> <span class="token class-name">RHState</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u63A5\u7740 match \u72B6\u6001\uFF0C\u5E76\u6267\u884C\u5BF9\u5E94\u7684\u884C\u4E3A\u3002</p><ul><li>\u7B2C\u4E00\u4E2A\u72B6\u6001\u662F <code>Unpolled</code>\uFF0C\u6B64\u65F6\u8FD9\u4E2A\u5F02\u6B65\u51FD\u6570\u8FD8\u6CA1\u6709\u88AB poll \u8FC7\uFF0C\u5B83\u8981\u8FDB\u884C\u4E00\u4E9B\u521D\u59CB\u5316\u64CD\u4F5C</li><li>\u7B2C\u4E8C\u4E2A\u72B6\u6001\u662F <code>GettingRow</code>\uFF0C\u6211\u4EEC\u7B49\u5F85\u4ECE\u6570\u636E\u5E93\u83B7\u53D6\u6570\u636E</li><li>\u7B2C\u4E09\u4E2A\u72B6\u6001\u662F <code>Writing</code>\uFF0C\u7B49\u5F85\u5199\u5165 tcpstream</li><li>\u7B2C\u56DB\u4E2A\u72B6\u6001\u662F <code>Ready</code>\uFF0C\u5B8C\u6210\u5E76\u51C6\u5907\u8FD4\u56DE\u7ED3\u679C</li></ul><h4 id="unpolled" tabindex="-1"><a class="header-anchor" href="#unpolled" aria-hidden="true">#</a> Unpolled</h4><p>\u6211\u4EEC\u9996\u5148\u8C03\u7528 get_row \u51FD\u6570\uFF0C\u56E0\u4E3A\u5B83\u662F\u5F02\u6B65\u7684\uFF0C\u6240\u4EE5\u5E76\u4E0D\u4F1A\u7ACB\u5373\u6267\u884C\uFF0C\u800C\u662F\u8FD4\u56DE\u4E00\u4E2A future \u5BF9\u8C61\u3002</p><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">match</span> <span class="token keyword">self</span><span class="token punctuation">.</span>state <span class="token punctuation">{</span>
    <span class="token class-name">Unpolled</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>row_fut <span class="token operator">=</span> <span class="token class-name">Some</span><span class="token punctuation">(</span><span class="token function">get_row</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">self</span><span class="token punctuation">.</span>server<span class="token punctuation">,</span> <span class="token keyword">self</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token class-name">GettingRow</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u540C\u65F6\u6211\u4EEC\u5728\u7ED3\u6784\u4F53\u4E2D\u6DFB\u52A0\u4E00\u4E2A\u5B57\u6BB5\u4FDD\u5B58\u8FD9\u4E2A future</p><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">struct</span> <span class="token type-definition class-name">RequestHandler</span> <span class="token punctuation">{</span>
    <span class="token punctuation">...</span>
    row_fut<span class="token punctuation">:</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token class-name">RowGet</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="gettingrow" tabindex="-1"><a class="header-anchor" href="#gettingrow" aria-hidden="true">#</a> GettingRow</h4><p>\u7B2C\u4E8C\u9636\u6BB5\u6211\u4EEC\u5C31\u8981\u5F00\u59CB\u5C1D\u8BD5\u63A8\u8FDB\u5F02\u6B65\u4EFB\u52A1\uFF0C\u5982\u679C\u4EFB\u52A1\u5B8C\u6210\u7684\u8BDD\u5C31\u628A\u9700\u8981\u7684\u53D8\u91CF\u8D4B\u503C\u5230\u7ED3\u6784\u4F53\uFF0C\u5E76\u521D\u59CB\u5316\u4E0B\u4E00\u4E2A future \u4EFB\u52A1\uFF0C\u63A8\u8FDB\u72B6\u6001\u3002</p><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">match</span> <span class="token keyword">self</span><span class="token punctuation">.</span>state <span class="token punctuation">{</span>
    <span class="token punctuation">...</span>
    <span class="token class-name">GettingRow</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">match</span> <span class="token keyword">self</span><span class="token punctuation">.</span>row_fut<span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span>cx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Poll</span><span class="token punctuation">::</span><span class="token class-name">Pending</span> <span class="token operator">=&gt;</span> <span class="token keyword">return</span> <span class="token class-name">Poll</span><span class="token punctuation">::</span><span class="token class-name">Pending</span><span class="token punctuation">,</span>
            <span class="token class-name">Poll</span><span class="token punctuation">::</span><span class="token class-name">Ready</span><span class="token punctuation">(</span>row<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">self</span><span class="token punctuation">.</span>row_fut <span class="token operator">=</span> <span class="token class-name">None</span><span class="token punctuation">;</span>
                <span class="token keyword">self</span><span class="token punctuation">.</span>encoded <span class="token operator">=</span> <span class="token namespace">json<span class="token punctuation">::</span></span><span class="token function">encode</span><span class="token punctuation">(</span>row<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">self</span><span class="token punctuation">.</span>write_fut <span class="token operator">=</span> <span class="token class-name">Some</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">.</span>stream<span class="token punctuation">.</span><span class="token function">write_all</span><span class="token punctuation">(</span>
                    <span class="token keyword">self</span><span class="token punctuation">.</span>encoded<span class="token punctuation">.</span><span class="token function">as_bytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">self</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token class-name">Writing</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>\u7ED3\u6784\u4F53\u9700\u8981\u6DFB\u52A0 encoded \u5B57\u6BB5\uFF0C\u548C\u4E0B\u4E00\u4E2A future \u4EFB\u52A1\uFF1A</p><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">struct</span> <span class="token type-definition class-name">RequestHandler</span> <span class="token punctuation">{</span>
    <span class="token punctuation">...</span>
    encoded<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">,</span>
    write_fut<span class="token punctuation">:</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token class-name">WriteAll</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="writing" tabindex="-1"><a class="header-anchor" href="#writing" aria-hidden="true">#</a> Writing</h4><p>\u7B2C\u4E09\u9636\u6BB5\u4EFB\u52A1\u5F88\u7B80\u5355\uFF0C\u5982\u679C\u5199\u5165\u5B8C\u6210\u5C31\u63A8\u8FDB\u72B6\u6001\uFF1A</p><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">match</span> <span class="token keyword">self</span><span class="token punctuation">.</span>state <span class="token punctuation">{</span>
    <span class="token punctuation">...</span>
    <span class="token class-name">Writing</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">match</span> <span class="token keyword">self</span><span class="token punctuation">.</span>row_fut<span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span>cx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Poll</span><span class="token punctuation">::</span><span class="token class-name">Pending</span> <span class="token operator">=&gt;</span> <span class="token keyword">return</span> <span class="token class-name">Poll</span><span class="token punctuation">::</span><span class="token class-name">Pending</span><span class="token punctuation">,</span>
            <span class="token class-name">Poll</span><span class="token punctuation">::</span><span class="token class-name">Ready</span><span class="token punctuation">(</span>_<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">self</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token class-name">Ready</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="ready" tabindex="-1"><a class="header-anchor" href="#ready" aria-hidden="true">#</a> Ready</h4><p>\u6700\u540E\u5C31\u8FD4\u56DE\u5F02\u6B65\u51FD\u6570\u771F\u6B63\u7684\u7684\u8FD0\u884C\u7ED3\u679C</p><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">match</span> <span class="token keyword">self</span><span class="token punctuation">.</span>state <span class="token punctuation">{</span>
    <span class="token punctuation">...</span>
    <span class="token class-name">Ready</span> <span class="token operator">=&gt;</span> <span class="token keyword">return</span> <span class="token class-name">Poll</span><span class="token punctuation">::</span><span class="token class-name">Ready</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><img src="https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202204110021532.png" alt=""></p><h3 id="\u4F7F\u7528-enum-\u8282\u7701\u5185\u5B58" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-enum-\u8282\u7701\u5185\u5B58" aria-hidden="true">#</a> \u4F7F\u7528 enum \u8282\u7701\u5185\u5B58</h3><p>\u4F7F\u7528 struct \u4FDD\u5B58\u5F02\u6B65\u4EFB\u52A1\u65F6\uFF0C\u6211\u4EEC\u4E0D\u5F97\u4E0D\u4E3A\u6240\u6709\u53D8\u91CF\u548C\u5F02\u6B65\u4EFB\u52A1\u90FD\u63D0\u524D\u5206\u914D\u597D\u5185\u5B58\u3002</p><p>\u4E0B\u56FE\u662F\u8FD9\u4E2A\u7ED3\u6784\u4F53\u7684\u5185\u5B58\u5E03\u5C40 <img src="https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202204110022570.png" alt=""> \u5982\u679C\u4E24\u4E2A\u5F02\u6B65\u4EFB\u52A1\u4E0D\u4F1A\u540C\u65F6\u8FD0\u884C\uFF0C\u90A3\u4E48\u8FD9\u4E24\u4E2A\u9636\u6BB5\u7684\u5F02\u6B65\u4EFB\u52A1\u5E94\u8BE5\u80FD\u591F\u590D\u7528\u540C\u4E00\u5757\u5185\u5B58\uFF0C\u5C31\u50CF\u4E0B\u56FE\u91CC\u90A3\u6837\uFF1A <img src="https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202204110025475.png" alt=""> \u5047\u8BBE\u5F02\u6B65\u4EFB\u52A1\u91CC\u9762\u8FD8\u5D4C\u5957\u7740\u5176\u4ED6\u7684\u5F02\u6B65\u4EFB\u52A1\uFF0C\u90A3\u4E48\u8FD9\u4E2A\u7ED3\u6784\u4F53\u5C31\u4F1A\u53D8\u5F97\u66F4\u5927\uFF0C\u5D4C\u5957\u5C42\u7EA7\u8D8A\u6DF1\uFF0C\u5185\u5B58\u5360\u7528\u5C31\u8D8A\u5927</p><h3 id="\u6027\u80FD" tabindex="-1"><a class="header-anchor" href="#\u6027\u80FD" aria-hidden="true">#</a> \u6027\u80FD</h3><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">async</span> <span class="token keyword">fn</span> <span class="token function-definition function">do_stuff</span><span class="token punctuation">(</span>context<span class="token punctuation">:</span> <span class="token class-name">Arc</span><span class="token operator">&lt;</span><span class="token class-name">Context</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token macro property">info!</span><span class="token punctuation">(</span><span class="token string">&quot;running foo with context {}&quot;</span><span class="token punctuation">,</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">await</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u5BF9\u4E8E\u4E0A\u9762\u7684\u5F02\u6B65\u51FD\u6570\u6709\u4E00\u4E2A\u5C0F\u5C0F\u7684\u6027\u80FD\u95EE\u9898\uFF0C\u6BCF\u5F53\u4E00\u4E2A\u53D8\u91CF\u8D85\u51FA\u4F5C\u7528\u57DF\u65F6\uFF0CRust \u90FD\u4F1A\u9690\u5F0F\u7684\u5728\u51FD\u6570\u672B\u5C3E\u63D2\u5165 drop\uFF0C\u6240\u4EE5\u76F4\u5230\u51FD\u6570\u8FD0\u884C\u7ED3\u675F context \u53D8\u91CF\u624D\u4F1A\u88AB\u91CA\u653E\u3002\u4F46\u662F\u6211\u4EEC\u5728\u6253\u5B8C\u65E5\u5FD7\u4E4B\u540E\u5C31\u4E0D\u9700\u8981 context \u4E86\uFF0C\u6CA1\u5FC5\u8981\u7B49\u5230 foo \u6267\u884C\u5B8C\u5728\u91CA\u653E\u6389 context</p><p>\u5176\u4E2D\u4E00\u4E2A\u89E3\u51B3\u65B9\u6CD5\u65F6\u5C06 context</p>`,46);function g(f,h){const a=p("ExternalLinkIcon");return e(),t(c,null,[i,k,n("p",null,[n("a",d,[m,o(a)])]),b],64)}var v=u(r,[["render",g]]);export{v as default};
