import{d as n}from"./app.7b10aa5d.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},e=n(`<h1 id="ci-cd" tabindex="-1"><a class="header-anchor" href="#ci-cd" aria-hidden="true">#</a> CI/CD</h1><p>\u{1F924}\u8FD9\u4E1C\u897F\u7B80\u76F4\u592A\u68D2\u4E86\uFF01</p><h2 id="\u81EA\u52A8\u90E8\u7F72-github-page" tabindex="-1"><a class="header-anchor" href="#\u81EA\u52A8\u90E8\u7F72-github-page" aria-hidden="true">#</a> \u81EA\u52A8\u90E8\u7F72 Github Page</h2><ul><li>\u8FD9\u91CC\u4F7F\u7528source\u5206\u652F\u4F5C\u4E3A\u5199\u6587\u6863\u7684\u5206\u652F</li><li>push\u540E\u81EA\u52A8build (\u8FD9\u91CC\u4F7F\u7528<code>borales/actions-yarn@v2.3.0</code>\uFF0C\u5982\u679C\u4F7F\u7528npm\uFF0C\u9700\u8981<code>set-node</code>)</li><li>\u5C06\u6253\u5305\u597D\u7684\u6587\u4EF6\u53D1\u5E03\u5230master\u5206\u652F\u4E0A (\u4F7F\u7528<code>peaceiris/actions-github-pages@v3.1.12</code>)</li></ul><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Github Page

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
     <span class="token punctuation">-</span> source

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build-and-deploy</span><span class="token punctuation">:</span>
    <span class="token comment"># \u8FD0\u884C\u73AF\u5883</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token comment"># \u5F00\u59CBjob</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token comment"># from [actions/checkout](https://github.com/actions/checkout#checkout-v2)</span>
      <span class="token comment"># This action checks-out your repository under $GITHUB_WORKSPACE, so your workflow can access it.</span>
      <span class="token comment"># \u5C5E\u4E8E\u662F\u5FC5\u8981\u9009\u9879\u4E86, \u80FD\u591F\u62FF\u5230\u5F53\u524D\u5206\u652F\uFF0C \u5BF9\u5E94\u8FD9\u91CC\u5C31\u662Fsource\u5206\u652F</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2

      <span class="token comment"># \u4F7F\u7528yarn</span>

      <span class="token comment"># \u5B89\u88C5\u4F9D\u8D56</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> borales/actions<span class="token punctuation">-</span>yarn@v2.3.0
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">cmd</span><span class="token punctuation">:</span> install <span class="token comment"># will run \`yarn install\` command</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> borales/actions<span class="token punctuation">-</span>yarn@v2.3.0
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">cmd</span><span class="token punctuation">:</span> build <span class="token comment"># will run \`yarn build\` command</span>

      <span class="token comment"># \u628Adisk\u6587\u4EF6\u53D1\u5E03\u5230\u53E6\u4E00\u4E2Abranch</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy with &lt;GitHub Pages v3<span class="token punctuation">&gt;</span>
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> peaceiris/actions<span class="token punctuation">-</span>github<span class="token punctuation">-</span>pages@v3.1.12
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># \u53D1\u5E03\u5230\u5F53\u524D\u4ED3\u5E93</span>
          <span class="token key atrule">github_token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token comment"># \u7684main\u5206\u652F</span>
          <span class="token key atrule">publish_branch</span><span class="token punctuation">:</span> main
          <span class="token comment"># \u8981\u53D1\u5E03\u7684\u6587\u4EF6\u5939</span>
          <span class="token key atrule">publish_dir</span><span class="token punctuation">:</span> ./docs/.vuepress/dist
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><h2 id="\u81EA\u52A8-release" tabindex="-1"><a class="header-anchor" href="#\u81EA\u52A8-release" aria-hidden="true">#</a> \u81EA\u52A8 Release</h2><ul><li>\u5B9E\u4F8B\u4F7F\u7528dev\u4F5C\u4E3A\u5F00\u53D1\u5206\u652F</li><li>\u5F53push\u6709\u6807\u7B7E\u65F6\uFF0C\u628Arelease\u7684\u6587\u4EF6\u81EA\u52A8\u53D1\u5E03 (<code>softprops/action-gh-release@v1</code>)</li><li>\u540C\u65F6\u628A\u5206\u652F\u540C\u6B65\u5230 <code>master</code> \u4E0A (<code>tretuna/sync-branches@1.4.0</code>)</li></ul><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Release

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> dev <span class="token punctuation">]</span>
    <span class="token key atrule">tags</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;v*&quot;</span>

<span class="token key atrule">env</span><span class="token punctuation">:</span>
  <span class="token key atrule">CARGO_TERM_COLOR</span><span class="token punctuation">:</span> always

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">release</span><span class="token punctuation">:</span>

    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build
      <span class="token key atrule">run</span><span class="token punctuation">:</span> cargo build <span class="token punctuation">-</span><span class="token punctuation">-</span>verbose

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run tests
      <span class="token key atrule">run</span><span class="token punctuation">:</span> cargo test <span class="token punctuation">-</span><span class="token punctuation">-</span>verbose

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Release
      <span class="token key atrule">uses</span><span class="token punctuation">:</span> softprops/action<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>release@v1
      <span class="token key atrule">with</span><span class="token punctuation">:</span>
        <span class="token key atrule">files</span><span class="token punctuation">:</span> ./target/debug/yarm

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Opening pull request
      <span class="token key atrule">uses</span><span class="token punctuation">:</span> tretuna/sync<span class="token punctuation">-</span>branches@1.4.0
      <span class="token key atrule">with</span><span class="token punctuation">:</span>
        <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span>secrets.GITHUB_TOKEN<span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token key atrule">FROM_BRANCH</span><span class="token punctuation">:</span> <span class="token string">&quot;dev&quot;</span>
        <span class="token key atrule">TO_BRANCH</span><span class="token punctuation">:</span> <span class="token string">&quot;master&quot;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div>`,8);function p(t,l){return e}var o=s(a,[["render",p]]);export{o as default};
