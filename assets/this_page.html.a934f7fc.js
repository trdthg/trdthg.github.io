import{d as n}from"./app.729fb0a5.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},p=n(`<h1 id="\u5173\u4E8E\u672C\u7F51\u7AD9" tabindex="-1"><a class="header-anchor" href="#\u5173\u4E8E\u672C\u7F51\u7AD9" aria-hidden="true">#</a> \u5173\u4E8E\u672C\u7F51\u7AD9</h1><h2 id="deploy\u811A\u672C" tabindex="-1"><a class="header-anchor" href="#deploy\u811A\u672C" aria-hidden="true">#</a> deploy\u811A\u672C</h2><p>\u57FA\u4E8Etypora\u5904\u7406\u56FE\u7247</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># rm -rf docs/.vuepress/dist</span>
<span class="token builtin class-name">cd</span> vuePressBlog
<span class="token comment"># \u751F\u6210\u9759\u6001\u6587\u4EF6</span>
<span class="token function">pnpm</span> run build

<span class="token comment"># \u56FE\u7247\u6E90\u4FEE\u6539</span>
<span class="token function">rm</span> docs/.vuepress/public/assets/img/*
<span class="token function">cp</span> /home/trthg/.config/Typora/typora-user-images/* docs/.vuepress/public/assets/img/

<span class="token comment"># md\u5F15\u7528\u56FE\u7247\u8DEF\u5F84\u4FEE\u6539</span>
<span class="token function">sed</span> -i <span class="token string">&quot;s/\\/home\\/trthg\\/.config\\/Typora\\/typora-user-images/\\/assets\\/img/g&quot;</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">grep</span> -rl <span class="token string">&quot;/assets/img&quot;</span> ./<span class="token variable">\`</span></span>

<span class="token comment"># # /* \u4F1A\u5FFD\u7565.\u5F00\u5934\u7684\u6587\u4EF6   /. \u4E0D\u4F1A</span>
<span class="token function">rm</span> -r <span class="token punctuation">..</span>/assets
<span class="token function">rm</span> -r <span class="token punctuation">..</span>/java
<span class="token function">rm</span> -r <span class="token punctuation">..</span>/other
<span class="token function">rm</span> -r <span class="token punctuation">..</span>/js
<span class="token function">rm</span> -r <span class="token punctuation">..</span>/python
<span class="token function">rm</span> -r <span class="token punctuation">..</span>/rust
<span class="token function">rm</span> -r <span class="token punctuation">..</span>/ioclub
<span class="token function">rm</span> -r <span class="token punctuation">..</span>/magic
<span class="token function">rm</span> <span class="token punctuation">..</span>/*.html
<span class="token comment"># rm ../*.png</span>
<span class="token comment"># rm ../*.jpg</span>

<span class="token function">mv</span> docs/.vuepress/dist/* <span class="token punctuation">..</span>/

<span class="token assign-left variable">curDate</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token string">&quot;+%Y-%m-%d&quot;</span><span class="token variable">)</span></span>
<span class="token assign-left variable">curTime</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token string">&quot;+%H:%M:%S&quot;</span><span class="token variable">)</span></span>
<span class="token comment"># # git init</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit -s -m <span class="token string">&quot;commit: <span class="token variable">$curDate</span> <span class="token variable">$curTime</span>&quot;</span>
<span class="token function">git</span> push -u origin main
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div>`,4);function e(t,c){return p}var o=s(a,[["render",e]]);export{o as default};
