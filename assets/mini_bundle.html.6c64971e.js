import{e as n}from"./app.2196ae99.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},p=n(`<h1 id="\u5B9E\u73B0\u4E00\u4E2A-mini-bundle" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0\u4E00\u4E2A-mini-bundle" aria-hidden="true">#</a> \u5B9E\u73B0\u4E00\u4E2A mini-bundle</h1><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;fs&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;path&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> babylon <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;babylon&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> traverse <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;babel-traverse&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>default<span class="token punctuation">;</span>
<span class="token keyword">const</span> babel <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;babel-core&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token constant">ID</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token comment">// \u6839\u636E\u6587\u4EF6\u540D\uFF0C\u62FF\u5230\u8BE5\u6587\u4EF6\u7684\u4FE1\u606F\uFF0C\u5305\u62EC id\uFF0Ccode(\u8F6C\u6362\u540E\u7684), requirements</span>
<span class="token keyword">function</span> <span class="token function">createAsset</span><span class="token punctuation">(</span><span class="token parameter">filename</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u901A\u8FC7 fs \u5F15\u5165\u5165\u53E3\u6587\u4EF6</span>
  <span class="token keyword">const</span> content <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> <span class="token string">&quot;utf8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// \u89E3\u6790\u51FA\u8BED\u6CD5\u6811</span>
  <span class="token keyword">const</span> ast <span class="token operator">=</span> babylon<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>content<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">&quot;module&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// \u62FF\u5230\u6240\u6709\u7684 import \u4F9D\u8D56</span>
  <span class="token keyword">const</span> dependencies <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token function">traverse</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">ImportDeclaration</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> node <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      dependencies<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>source<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> id <span class="token operator">=</span> <span class="token constant">ID</span><span class="token operator">++</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> code <span class="token operator">=</span> babel<span class="token punctuation">.</span><span class="token function">transformFromAst</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token comment">// presets \u544A\u8BC9 babel \u8F6C\u6362\u7684\u65B9\u6CD5</span>
    <span class="token comment">// env \u6307 babel-preset-env \u63D2\u4EF6\uFF0C\u786E\u4FDD\u8F6C\u6362\u7684\u4EE3\u7801\u80FD\u591F\u5728\u6240\u6709\u6D4F\u89C8\u5668\u4E0A\u8FD0\u884C</span>
    <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;env&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    id<span class="token punctuation">,</span>
    filename<span class="token punctuation">,</span>
    dependencies<span class="token punctuation">,</span>
    code<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u521B\u5EFA\u4E00\u4E2A Array\uFF0C\u91CC\u9762\u662F\u6240\u6709\u7684\u4F9D\u8D56\uFF0C\u6BCF\u4E00\u4E2A Node \u7528 mapping \u4FDD\u5B58\u4F9D\u8D56\u4E4B\u95F4\u7684\u5173\u7CFB</span>
<span class="token keyword">function</span> <span class="token function">createGraph</span><span class="token punctuation">(</span><span class="token parameter">entry</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u901A\u8FC7\u5165\u53E3\u6587\u4EF6\u5F00\u59CB\uFF0C\u62FF\u5230\u6240\u6709\u6587\u4EF6</span>
  <span class="token keyword">const</span> mainAsset <span class="token operator">=</span> <span class="token function">createAsset</span><span class="token punctuation">(</span>entry<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// \u4FDD\u5B58\u6240\u6709\u7684\u4F9D\u8D56</span>
  <span class="token keyword">const</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span>mainAsset<span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> asset <span class="token keyword">of</span> queue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> dirname <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">dirname</span><span class="token punctuation">(</span>asset<span class="token punctuation">.</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>

    asset<span class="token punctuation">.</span>mapping <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    asset<span class="token punctuation">.</span>dependencies<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">relativePath</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> absolutePath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>dirname<span class="token punctuation">,</span> relativePath<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">const</span> child <span class="token operator">=</span> <span class="token function">createAsset</span><span class="token punctuation">(</span>absolutePath<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token comment">// \u6BCF\u4E2A Node \u7528\u4E00\u4E2A map \u5B58\u50A8\u4ED6\u4F9D\u8D56\u7684\u5BF9\u8C61</span>
      asset<span class="token punctuation">.</span>mapping<span class="token punctuation">[</span>relativePath<span class="token punctuation">]</span> <span class="token operator">=</span> child<span class="token punctuation">.</span>id<span class="token punctuation">;</span>

      queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> queue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bundle</span><span class="token punctuation">(</span><span class="token parameter">graph</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u6784\u9020\u53C2\u6570\uFF08\u8D85\u5927\u7684\uFF09</span>
  <span class="token comment">// \u53C2\u6570\u6574\u4F53\u662F\u4E00\u4E2A Object\uFF0C\u4E0B\u9762\u62FC\u63A5\u4E86 Object \u91CC\u7684\u6240\u6709\u952E\u503C\u5BF9\uFF0C\u5982\u4E0B\uFF1A</span>
  <span class="token comment">// id: [code, mapping]</span>
  <span class="token comment">// code \u6700\u5916\u5C42\u8FD8\u5957\u4E0A\u4E86\u4E00\u4E2A function</span>
  <span class="token keyword">let</span> modules <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

  graph<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">mod</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    modules <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>mod<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">: [
            function(require, module, exports) {
                </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>mod<span class="token punctuation">.</span>code<span class="token punctuation">.</span>code<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
            },
            </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>mod<span class="token punctuation">.</span>mapping<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
        ],</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        // \u6700\u5916\u9762\u662F\u4E00\u5C42\u81EA\u8C03\u7528\u51FD\u6570\uFF0C\u4F20\u5165\u4E86\u4E0A\u9762\u6784\u9020\u7684\u53C2\u6570
        (function(modules) {
            // \u901A\u8FC7\u6587\u4EF6\u7684 id\uFF0C
            function require(id) {
                // \u901A\u8FC7\u6587\u4EF6\u83B7\u5F97\u6587\u4EF6\u7684\u51FD\u6570\u548C\u4F9D\u8D56 map
                const [fn, mapping] = modules[id];
                // \u901A\u8FC7\u4F9D\u8D56\u7684 id\uFF0C\u5728 mapping \u4E2D\u627E\u5230\u5BF9\u5E94\u7684\u6587\u4EF6\u540D\uFF0C\u63A5\u7740\u76F4\u63A5\u8C03\u7528 require
                function localRequire(relativePath) {
                    return require(mapping[relativePath]);
                }
                // \u4FDD\u5B58 export
                const module = { exports: {} };
                // \u8C03\u7528\u51FD\u6570
                fn(localRequire, module, module.exports);
                return module.exports;
            }
            // \u4ECE\u5165\u53E3\u6587\u4EF6\u5F00\u59CB
            require(0)
        })({</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>modules<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">});
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> graph <span class="token operator">=</span> <span class="token function">createGraph</span><span class="token punctuation">(</span><span class="token string">&quot;./example/entry.js&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>graph<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">bundle</span><span class="token punctuation">(</span>graph<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>

fs<span class="token punctuation">.</span><span class="token function">writeFileSync</span><span class="token punctuation">(</span><span class="token string">&quot;./app.js&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br></div></div>`,2);function t(e,o){return p}var u=s(a,[["render",t]]);export{u as default};
