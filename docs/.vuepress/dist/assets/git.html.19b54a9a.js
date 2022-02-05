import{r as t,o as i,c as l,a as e,b as r,F as d,d as a,e as n}from"./app.85768580.js";import{_ as c}from"./plugin-vue_export-helper.21dcd24c.js";const h={},u=a(`<h1 id="git\u5E38\u7528\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#git\u5E38\u7528\u64CD\u4F5C" aria-hidden="true">#</a> git\u5E38\u7528\u64CD\u4F5C</h1><h2 id="\u8FDC\u7A0B\u4ED3\u5E93" tabindex="-1"><a class="header-anchor" href="#\u8FDC\u7A0B\u4ED3\u5E93" aria-hidden="true">#</a> \u8FDC\u7A0B\u4ED3\u5E93</h2><h3 id="\u6DFB\u52A0\u8FDC\u7A0B\u4ED3\u5E93" tabindex="-1"><a class="header-anchor" href="#\u6DFB\u52A0\u8FDC\u7A0B\u4ED3\u5E93" aria-hidden="true">#</a> \u6DFB\u52A0\u8FDC\u7A0B\u4ED3\u5E93</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git remote add origin(\u8FDC\u7A0B\u4ED3\u5E93\u540D\uFF0C\u968F\u610F) git@github.com:trdthg/trdthg.github.io.git
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="\u8FFD\u8E2A\u8FDC\u7A0B\u5206\u652F" tabindex="-1"><a class="header-anchor" href="#\u8FFD\u8E2A\u8FDC\u7A0B\u5206\u652F" aria-hidden="true">#</a> \u8FFD\u8E2A\u8FDC\u7A0B\u5206\u652F</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u672C\u5730\u5206\u652F\u540D\u53EF\u7701\u7565\uFF0C\u9ED8\u8BA4\u4E3A\u5F53\u524D\u5206\u652F
git branch -u origin/remote_branch_name  &lt;local_branch_name&gt;

\u521B\u5EFA\u5206\u652F\u65F6\u8FFD\u8E2A
git checkout -b local_branch_name --track origin/remote_branch_name

-u\u9009\u9879\u662F--set-upstream-to\u7684\u7B80\u5199
git branch --set-upstream-to=origin/remote_branch_name  local_branch_name
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="\u5220\u9664\u5206\u652F" tabindex="-1"><a class="header-anchor" href="#\u5220\u9664\u5206\u652F" aria-hidden="true">#</a> \u5220\u9664\u5206\u652F</h2><h3 id="\u5220\u9664\u8FDC\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u5220\u9664\u8FDC\u7A0B" aria-hidden="true">#</a> \u5220\u9664\u8FDC\u7A0B</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git push origin --delete xxx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="\u5220\u9664\u672C\u5730" tabindex="-1"><a class="header-anchor" href="#\u5220\u9664\u672C\u5730" aria-hidden="true">#</a> \u5220\u9664\u672C\u5730</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git branch -d xxx
git branch -D xxx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="\u7F13\u5B58\u5F53\u524D\u4FEE\u6539" tabindex="-1"><a class="header-anchor" href="#\u7F13\u5B58\u5F53\u524D\u4FEE\u6539" aria-hidden="true">#</a> \u7F13\u5B58\u5F53\u524D\u4FEE\u6539</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git stash

git stash list

git stash pop
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="\u672C\u5730\u521B\u5EFA\u8FDC\u7A0B\u4ED3\u5E93" tabindex="-1"><a class="header-anchor" href="#\u672C\u5730\u521B\u5EFA\u8FDC\u7A0B\u4ED3\u5E93" aria-hidden="true">#</a> \u672C\u5730\u521B\u5EFA\u8FDC\u7A0B\u4ED3\u5E93</h2>`,14),p={href:"https://hub.github.com/",target:"_blank",rel:"noopener noreferrer"},o=n("hub-git\u547D\u4EE4\u884C\u63D2\u4EF6"),b=a(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>hub create
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="pull" tabindex="-1"><a class="header-anchor" href="#pull" aria-hidden="true">#</a> pull</h2>`,2),g={href:"https://www.runoob.com/git/git-pull.html",target:"_blank",rel:"noopener noreferrer"},m=n("\u83DC\u9E1F"),x=n(" git pull \u5176\u5B9E\u5C31\u662F git fetch \u548C git merge FETCH_HEAD \u7684\u7B80\u5199\u3002 \u547D\u4EE4\u683C\u5F0F\u5982\u4E0B\uFF1A"),v=a(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git pull &lt;\u8FDC\u7A0B\u4E3B\u673A\u540D&gt; &lt;\u8FDC\u7A0B\u5206\u652F\u540D&gt;:&lt;\u672C\u5730\u5206\u652F\u540D&gt;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="\u6253\u6807\u7B7E" tabindex="-1"><a class="header-anchor" href="#\u6253\u6807\u7B7E" aria-hidden="true">#</a> \u6253\u6807\u7B7E</h2><h3 id="\u5171\u4EAB\u6807\u7B7E" tabindex="-1"><a class="header-anchor" href="#\u5171\u4EAB\u6807\u7B7E" aria-hidden="true">#</a> \u5171\u4EAB\u6807\u7B7E</h3><p>\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0Cgit push \u547D\u4EE4\u5E76\u4E0D\u4F1A\u4F20\u9001\u6807\u7B7E\u5230\u8FDC\u7A0B\u4ED3\u5E93\u670D\u52A1\u5668\u4E0A\u3002 \u5728\u521B\u5EFA\u5B8C\u6807\u7B7E\u540E\u4F60\u5FC5\u987B\u663E\u5F0F\u5730\u63A8\u9001\u6807\u7B7E\u5230\u5171\u4EAB\u670D\u52A1\u5668\u4E0A\u3002 \u8FD9\u4E2A\u8FC7\u7A0B\u5C31\u50CF\u5171\u4EAB\u8FDC\u7A0B\u5206\u652F\u4E00\u6837\u2014\u2014\u4F60\u53EF\u4EE5\u8FD0\u884C git push origin tagname\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git push origin v1.5
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u5982\u679C\u60F3\u8981\u4E00\u6B21\u6027\u63A8\u9001\u5F88\u591A\u6807\u7B7E\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528\u5E26\u6709 --tags \u9009\u9879\u7684 git push \u547D\u4EE4\u3002 \u8FD9\u5C06\u4F1A\u628A\u6240\u6709\u4E0D\u5728\u8FDC\u7A0B\u4ED3\u5E93\u670D\u52A1\u5668\u4E0A\u7684\u6807\u7B7E\u5168\u90E8\u4F20\u9001\u5230\u90A3\u91CC\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git push origin --tags
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="\u521B\u5EFA\u6807\u7B7E" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u6807\u7B7E" aria-hidden="true">#</a> \u521B\u5EFA\u6807\u7B7E</h3><p>Git \u652F\u6301\u4E24\u79CD\u6807\u7B7E\uFF1A\u8F7B\u91CF\u6807\u7B7E\uFF08lightweight\uFF09\u4E0E\u9644\u6CE8\u6807\u7B7E\uFF08annotated\uFF09\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u9644\u6CE8\u6807\u7B7E
\u5728 Git \u4E2D\u521B\u5EFA\u9644\u6CE8\u6807\u7B7E\u5341\u5206\u7B80\u5355\u3002 \u6700\u7B80\u5355\u7684\u65B9\u5F0F\u662F\u5F53\u4F60\u5728\u8FD0\u884C tag \u547D\u4EE4\u65F6\u6307\u5B9A -a \u9009\u9879
-m \u9009\u9879\u6307\u5B9A\u4E86\u4E00\u6761\u5C06\u4F1A\u5B58\u50A8\u5728\u6807\u7B7E\u4E2D\u7684\u4FE1\u606F\u3002

git tag -a v1.4 -m &quot;my version 1.4&quot;

\u8F7B\u91CF\u6807\u7B7E
\u53E6\u4E00\u79CD\u7ED9\u63D0\u4EA4\u6253\u6807\u7B7E\u7684\u65B9\u5F0F\u662F\u4F7F\u7528\u8F7B\u91CF\u6807\u7B7E\u3002 \u8F7B\u91CF\u6807\u7B7E\u672C\u8D28\u4E0A\u662F\u5C06\u63D0\u4EA4\u6821\u9A8C\u548C\u5B58\u50A8\u5230\u4E00\u4E2A\u6587\u4EF6\u4E2D\u2014\u2014\u6CA1\u6709\u4FDD\u5B58\u4EFB\u4F55\u5176\u4ED6\u4FE1\u606F\u3002 \u521B\u5EFA\u8F7B\u91CF\u6807\u7B7E\uFF0C\u4E0D\u9700\u8981\u4F7F\u7528 -a\u3001-s \u6216 -m \u9009\u9879\uFF0C\u53EA\u9700\u8981\u63D0\u4F9B\u6807\u7B7E\u540D\u5B57\uFF1A

git tag v1.4-lw
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="\u5FD8\u8BB0\u6253\u6807\u7B7E" tabindex="-1"><a class="header-anchor" href="#\u5FD8\u8BB0\u6253\u6807\u7B7E" aria-hidden="true">#</a> \u5FD8\u8BB0\u6253\u6807\u7B7E\uFF1F</h3><p>\u52A0\u4E0A\u5206\u652F\u5373\u53EF</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git tag -a v1.2 9fceb02
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="\u5220\u9664\u6807\u7B7E" tabindex="-1"><a class="header-anchor" href="#\u5220\u9664\u6807\u7B7E" aria-hidden="true">#</a> \u5220\u9664\u6807\u7B7E</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git tag -d v1.4-lw
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="\u5176\u4ED6" tabindex="-1"><a class="header-anchor" href="#\u5176\u4ED6" aria-hidden="true">#</a> \u5176\u4ED6</h2><p>\u8986\u76D6\u6700\u8FD1\u4E00\u6B21commit\u4FE1\u606F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git commit --amend  -m &quot;:bug: Fix: xxx&quot; -s
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>`,18);function _(f,k){const s=t("ExternalLinkIcon");return i(),l(d,null,[u,e("p",null,[e("a",p,[o,r(s)])]),b,e("p",null,[e("a",g,[m,r(s)]),x]),v],64)}var q=c(h,[["render",_]]);export{q as default};
