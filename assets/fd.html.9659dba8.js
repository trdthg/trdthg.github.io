import{r as e,o as p,c as t,a as n,b as o,F as c,e as s,d as l}from"./app.94814359.js";import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";const r={},u=s(`<h1 id="\u6587\u4EF6\u7CFB\u7EDF" tabindex="-1"><a class="header-anchor" href="#\u6587\u4EF6\u7CFB\u7EDF" aria-hidden="true">#</a> \u6587\u4EF6\u7CFB\u7EDF</h1><h2 id="_1-inode" tabindex="-1"><a class="header-anchor" href="#_1-inode" aria-hidden="true">#</a> 1. inode</h2><h3 id="_1-1-\u4EC0\u4E48\u662F-inode" tabindex="-1"><a class="header-anchor" href="#_1-1-\u4EC0\u4E48\u662F-inode" aria-hidden="true">#</a> 1.1 \u4EC0\u4E48\u662F inode</h3><p><img src="https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021258963.png" alt=""> \u6587\u4EF6\u5B58\u50A8\u5728\u786C\u76D8\u4E0A\uFF0C \u786C\u76D8\u7684\u6700\u5C0F\u5B58\u50A8\u5355\u5143\u662F\u6247\u533A\uFF0C \u786C\u76D8\u4F1A\u6309\u7167\u591A\u4E2A\u6247\u533A\u6309\u5757\u8BFB\u53D6\u6247\u533A\uFF0C \u4E00\u4E2A\u6587\u4EF6\u7684\u6570\u636E\u5C31\u88AB\u5B58\u50A8\u5728\u591A\u4E2A\u5757\u4E2D\uFF0C \u540C\u65F6\u6211\u4EEC\u8FD8\u9700\u8981\u6709\u4E00\u4E2A\u5730\u65B9\u5B58\u50A8\u6587\u4EF6\u7684\u5143\u4FE1\u606F\u3002\u8FD9\u79CD\u5B58\u50A8\u6587\u4EF6\u5143\u4FE1\u606F\u7684\u533A\u57DF\u5C31\u53EB\u505A inode\uFF08\u7D22\u5F15\u8282\u70B9\uFF09\u3002</p><h3 id="_1-2-inode-\u7684\u5185\u5BB9" tabindex="-1"><a class="header-anchor" href="#_1-2-inode-\u7684\u5185\u5BB9" aria-hidden="true">#</a> 1.2 inode \u7684\u5185\u5BB9</h3><p>\u6BCF\u4E00\u4E2A\u6587\u4EF6\u90FD\u6709\u5BF9\u5E94\u7684 inode \u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7 <code>stat xxx</code> \u53BB\u67E5\u770B\uFF0C\u4E3B\u8981\u5305\u62EC\uFF1A</p><ul><li>\u6587\u4EF6\u5927\u5C0F</li><li>\u6587\u4EF6\u7684\u62E5\u6709\u8005</li><li>\u6587\u4EF6\u7684 Group ID</li><li>\u6587\u4EF6\u7684\u8BFB\u5199\u6267\u884C\u6743\u9650</li><li>\u6587\u4EF6\u7684\u65F6\u95F4\u6233\uFF0C ctime\uFF1A\u521B\u5EFA\u65F6\u95F4\uFF0C mtime\uFF1A\u4FEE\u6539\u65F6\u95F4\uFF0C atime\uFF1A\u6253\u5F00\u65F6\u95F4</li><li>\u94FE\u63A5\u6570\uFF1A\u6BD4\u5982\u521B\u5EFA\u8F6F\u94FE\u63A5\uFF0C\u518D\u6B21\u67E5\u770B\u5C31\u4F1A\u591A 1</li><li>\u6570\u636E\u5757\u7684\u4F4D\u7F6E</li></ul><p>\u4E0D\u8FC7\u5355\u5355\u6CA1\u6709\u6587\u4EF6\u540D\u5C31\u79BB\u8C31</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>trthg@trthg--manjaro ioclub<span class="token punctuation">]</span>$ <span class="token function">stat</span> package.json
  File: package.json
  Size: <span class="token number">1006</span>            Blocks: <span class="token number">8</span>          IO Block: <span class="token number">4096</span>   regular <span class="token function">file</span>
Device: <span class="token number">0,39</span>    Inode: <span class="token number">4528790</span>     Links: <span class="token number">1</span>
Access: <span class="token punctuation">(</span>0644/-rw-r--r--<span class="token punctuation">)</span>  Uid: <span class="token punctuation">(</span> <span class="token number">1000</span>/   trthg<span class="token punctuation">)</span>   Gid: <span class="token punctuation">(</span> <span class="token number">1001</span>/   trthg<span class="token punctuation">)</span>
Access: <span class="token number">2021</span>-11-01 <span class="token number">22</span>:00:54.464935992 +0800
Modify: <span class="token number">2021</span>-11-01 <span class="token number">22</span>:00:54.464935992 +0800
Change: <span class="token number">2021</span>-11-01 <span class="token number">22</span>:00:54.464935992 +0800
 Birth: <span class="token number">2021</span>-11-01 <span class="token number">22</span>:00:54.464935992 +0800
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="_1-3-inode-\u7684\u5927\u5C0F" tabindex="-1"><a class="header-anchor" href="#_1-3-inode-\u7684\u5927\u5C0F" aria-hidden="true">#</a> 1.3 inode \u7684\u5927\u5C0F</h3><ol><li>inode \u4E0E \u6570\u636E\u5757\u672C\u8EAB\u4F1A\u50A8\u5B58\u5728\u4E0D\u540C\u7684\u533A\u57DF\uFF0C \u786C\u76D8\u683C\u5F0F\u5316\u65F6\uFF0C \u64CD\u4F5C\u7CFB\u7EDF\u5C31\u4F1A\u628A\u786C\u76D8\u5206\u4E3A\u4E24\u4E2A\u533A\uFF0C \u6570\u636E\u533A\u548C inode \u533A</li><li>inode \u8282\u70B9\u7684\u5927\u5C0F\u4E00\u822C\u5728\u683C\u5F0F\u5316\u65F6\u5C31\u7ED9\u5B9A\uFF0C\u4E00\u822C\u662F 128 \u6216 256 \u5B57\u8282</li><li>\u4E00\u822C\u6BCF 1-2kb \u5C31\u4F1A\u8BBE\u7F6E\u4E00\u4E2A inode\uFF0C \u5047\u5B9A\u5728\u4E00\u5757 1GB \u7684\u786C\u76D8\u4E2D\uFF0C\u6BCF\u4E2A inode \u8282\u70B9\u7684\u5927\u5C0F\u4E3A 128 \u5B57\u8282\uFF0C\u6BCF 1KB \u5C31\u8BBE\u7F6E\u4E00\u4E2A inode\uFF0C\u90A3\u4E48 inode table \u7684\u5927\u5C0F\u5C31\u4F1A\u8FBE\u5230 128MB\uFF0C\u5360\u6574\u5757\u786C\u76D8\u7684 12.8%\u3002</li></ol><p>\u67E5\u770B\u6BCF\u4E2A\u786C\u76D8\u5206\u533A\u7684 inode \u603B\u6570\uFF0C \u548C\u5DF2\u7ECF\u4F7F\u7528\u7684\u6570\u91CF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>trthg@trthg--manjaro ioclub<span class="token punctuation">]</span>$ <span class="token function">df</span> -i
Filesystem     Inodes IUsed IFree IUse% Mounted on
dev              <span class="token number">1</span>.9M   <span class="token number">585</span>  <span class="token number">1</span>.9M    <span class="token number">1</span>% /dev
run              <span class="token number">1</span>.9M  <span class="token number">1</span>.1K  <span class="token number">1</span>.9M    <span class="token number">1</span>% /run
/dev/nvme0n1p2      <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">0</span>     - /
tmpfs            <span class="token number">1</span>.9M   <span class="token number">175</span>  <span class="token number">1</span>.9M    <span class="token number">1</span>% /dev/shm
/dev/nvme0n1p2      <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">0</span>     - /home
/dev/nvme0n1p2      <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">0</span>     - /var/cache
/dev/nvme0n1p2      <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">0</span>     - /var/log
tmpfs            400K  <span class="token number">3</span>.8K  397K    <span class="token number">1</span>% /tmp
/dev/nvme0n1p1      <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">0</span>     - /boot/efi
tmpfs            386K   <span class="token number">303</span>  386K    <span class="token number">1</span>% /run/user/1000
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>\u67E5\u770B inode \u5927\u5C0F</p><p>\u6CA1\u627E\u5230</p><h3 id="_1-4-inode-\u53F7\u7801" tabindex="-1"><a class="header-anchor" href="#_1-4-inode-\u53F7\u7801" aria-hidden="true">#</a> 1.4 inode \u53F7\u7801</h3><p>\u6BCF\u4E2A inode \u90FD\u6709\u4E00\u4E2A id \u76F8\u5F53\u4E0E\uFF0C \u64CD\u4F5C\u7CFB\u7EDF\u7528\u8FD9\u4E2A id \u6765\u8BC6\u522B\u6587\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>trthg@trthg--manjaro ioclub<span class="token punctuation">]</span>$ <span class="token function">ls</span> -i package.json
<span class="token number">4528790</span> package.json
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_1-5-\u76EE\u5F55\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_1-5-\u76EE\u5F55\u6587\u4EF6" aria-hidden="true">#</a> 1.5 \u76EE\u5F55\u6587\u4EF6</h3><p>\u76EE\u5F55\u6587\u4EF6\u4E5F\u662F\u4E00\u79CD\u6587\u4EF6\uFF0C\u76EE\u5F55\u6587\u4EF6\u672C\u8EAB\u7ED3\u6784\u7B80\u5355\uFF0C\u5B83\u5B58\u50A8\u7684\u662F\u4E00\u4E2A\u5217\u8868\uFF0C \u5217\u8868\u4E2D\u5B58\u50A8\u76EE\u5F55\u9879</p><p>\u76EE\u5F55\u9879\u5B58\u50A8\u7684\uFF1A</p><ul><li>\u6587\u4EF6\u540D</li><li>\u6587\u4EF6\u7684 inode \u53F7</li></ul><p>\u53EF\u4EE5\u7528 <code>ls -i dir</code> \u67E5\u770B\u8BE5\u76EE\u5F55\u4E0B\u6240\u6709\u6587\u4EF6\u7684\u6587\u4EF6\u540D\u548C inode</p><p>\u76EE\u5F55\u6587\u4EF6\u7684\u8BFB\u6743\u9650\uFF08r\uFF09\u548C\u5199\u6743\u9650\uFF08w\uFF09\uFF0C\u90FD\u662F\u9488\u5BF9\u76EE\u5F55\u6587\u4EF6\u672C\u8EAB\u3002\u7531\u4E8E\u76EE\u5F55\u6587\u4EF6\u5185\u53EA\u6709\u6587\u4EF6\u540D\u548C inode \u53F7\u7801\uFF0C\u8BFB\u53D6 inode \u8282\u70B9\u5185\u7684\u4FE1\u606F\u9700\u8981\u76EE\u5F55\u6587\u4EF6\u7684\u6267\u884C\u6743\u9650\uFF08x\uFF09\uFF0C \u6240\u4EE5\u5982\u679C\u53EA\u6709\u8BFB\u6743\u9650\uFF0C\u53EA\u80FD\u83B7\u53D6\u6587\u4EF6\u540D\uFF0C\u65E0\u6CD5\u83B7\u53D6\u5176\u4ED6\u4FE1\u606F\uFF0C\u56E0\u4E3A\u5176\u4ED6\u4FE1\u606F\u90FD\u50A8\u5B58\u5728 inode \u8282\u70B9\u4E2D\uFF0C\u800C</p><h3 id="_1-6-\u786C\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#_1-6-\u786C\u94FE\u63A5" aria-hidden="true">#</a> 1.6 \u786C\u94FE\u63A5</h3><p>\u6709\u4E86\u4E0A\u9762\u7684\u77E5\u8BC6\u5C31\u80FD\u7406\u89E3\u4E86\uFF0C\u786C\u94FE\u63A5\u5C31\u662F\u6307\u591A\u4E2A\u6587\u4EF6\u540D\u53EF\u4EE5\u6307\u5411\u540C\u4E00\u4E2A inode \u53F7\uFF0C <code>.</code> \u548C <code>..</code> \u5C31\u662F\u786C\u94FE\u63A5\uFF0C\u52A0\u4E86\u4E00\u4E2A\u786C\u94FE\u63A5\uFF0C \u539F\u6587\u4EF6\u7684 LINK \u6570\u5C31\u4F1A +1</p><h3 id="_1-7-\u8F6F\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#_1-7-\u8F6F\u94FE\u63A5" aria-hidden="true">#</a> 1.7 \u8F6F\u94FE\u63A5</h3><p>\u8F6F\u94FE\u63A5\u6307\u7684\u662F\u4E00\u4E2A\u6587\u4EF6\u7684\u5185\u5BB9\u5B58\u50A8\u7684\u662F\u53E6\u4E00\u4E2A\u6587\u4EF6\u7684\u8DEF\u5F84\uFF0C \u8BBF\u95EE A \u5C31\u4F1A\u81EA\u52A8\u5BFC\u5411 B</p><p><code>ln -s</code></p><h3 id="_1-8-\u5176\u4ED6" tabindex="-1"><a class="header-anchor" href="#_1-8-\u5176\u4ED6" aria-hidden="true">#</a> 1.8 \u5176\u4ED6</h3><p><strong>\u516B\u3001inode \u7684\u7279\u6B8A\u4F5C\u7528</strong></p><p>\u7531\u4E8E inode \u53F7\u7801\u4E0E\u6587\u4EF6\u540D\u5206\u79BB\uFF0C\u8FD9\u79CD\u673A\u5236\u5BFC\u81F4\u4E86\u4E00\u4E9B Unix/Linux \u7CFB\u7EDF\u7279\u6709\u7684\u73B0\u8C61\u3002</p><ol><li><p>\u6709\u65F6\uFF0C\u6587\u4EF6\u540D\u5305\u542B\u7279\u6B8A\u5B57\u7B26\uFF0C\u65E0\u6CD5\u6B63\u5E38\u5220\u9664\u3002\u8FD9\u65F6\uFF0C\u76F4\u63A5\u5220\u9664 inode \u8282\u70B9\uFF0C\u5C31\u80FD\u8D77\u5230\u5220\u9664\u6587\u4EF6\u7684\u4F5C\u7528\u3002</p></li><li><p>\u79FB\u52A8\u6587\u4EF6\u6216\u91CD\u547D\u540D\u6587\u4EF6\uFF0C\u53EA\u662F\u6539\u53D8\u6587\u4EF6\u540D\uFF0C\u4E0D\u5F71\u54CD inode \u53F7\u7801\u3002</p></li><li><p>\u6253\u5F00\u4E00\u4E2A\u6587\u4EF6\u4EE5\u540E\uFF0C\u7CFB\u7EDF\u5C31\u4EE5 inode \u53F7\u7801\u6765\u8BC6\u522B\u8FD9\u4E2A\u6587\u4EF6\uFF0C\u4E0D\u518D\u8003\u8651\u6587\u4EF6\u540D\u3002\u56E0\u6B64\uFF0C\u901A\u5E38\u6765\u8BF4\uFF0C\u7CFB\u7EDF\u65E0\u6CD5\u4ECE inode \u53F7\u7801\u5F97\u77E5\u6587\u4EF6\u540D\u3002</p></li></ol><p>\u7B2C 3 \u70B9\u4F7F\u5F97\u8F6F\u4EF6\u66F4\u65B0\u53D8\u5F97\u7B80\u5355\uFF0C\u53EF\u4EE5\u5728\u4E0D\u5173\u95ED\u8F6F\u4EF6\u7684\u60C5\u51B5\u4E0B\u8FDB\u884C\u66F4\u65B0\uFF0C\u4E0D\u9700\u8981\u91CD\u542F\u3002\u56E0\u4E3A\u7CFB\u7EDF\u901A\u8FC7 inode \u53F7\u7801\uFF0C\u8BC6\u522B\u8FD0\u884C\u4E2D\u7684\u6587\u4EF6\uFF0C\u4E0D\u901A\u8FC7\u6587\u4EF6\u540D\u3002\u66F4\u65B0\u7684\u65F6\u5019\uFF0C\u65B0\u7248\u6587\u4EF6\u4EE5\u540C\u6837\u7684\u6587\u4EF6\u540D\uFF0C\u751F\u6210\u4E00\u4E2A\u65B0\u7684 inode\uFF0C\u4E0D\u4F1A\u5F71\u54CD\u5230\u8FD0\u884C\u4E2D\u7684\u6587\u4EF6\u3002\u7B49\u5230\u4E0B\u4E00\u6B21\u8FD0\u884C\u8FD9\u4E2A\u8F6F\u4EF6\u7684\u65F6\u5019\uFF0C\u6587\u4EF6\u540D\u5C31\u81EA\u52A8\u6307\u5411\u65B0\u7248\u6587\u4EF6\uFF0C\u65E7\u7248\u6587\u4EF6\u7684 inode \u5219\u88AB\u56DE\u6536\u3002</p><h2 id="_2-\u6587\u4EF6\u63CF\u8FF0\u7B26" tabindex="-1"><a class="header-anchor" href="#_2-\u6587\u4EF6\u63CF\u8FF0\u7B26" aria-hidden="true">#</a> 2. \u6587\u4EF6\u63CF\u8FF0\u7B26</h2>`,35),d=n("p",null,"Advanced Programming in the UNIX\xAE Environment: Second Edition By W. Richard Stevens, Stephen A. Rago",-1),b={href:"https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.458.2318&rep=rep1&type=pdf",target:"_blank",rel:"noopener noreferrer"},k=l("\u4E66\u91CC\u6709\u66F4\u8BE6\u7EC6\u7684\u89E3\u91CA"),m=s(`<h3 id="_2-1-\u4E0E-inode-\u7684\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#_2-1-\u4E0E-inode-\u7684\u533A\u522B" aria-hidden="true">#</a> 2.1 \u4E0E inode \u7684\u533A\u522B</h3><p>inode \u672C\u8EAB\u53EA\u662F\u5BF9\u5E94\u6CA1\u4E00\u4E2A\u6587\u4EF6\uFF0C \u4F46\u662F\u4E00\u4E2A\u6587\u4EF6\u80FD\u88AB\u591A\u4E2A\u4EBA\u6253\u5F00\uFF0C \u56E0\u6B64\u9700\u8981\u6709 fd \u53BB\u8BB0\u5F55\u6587\u4EF6\u7684\u6253\u5F00\u72B6\u6001</p><p>\u5185\u6838\u7EF4\u62A4\u4E00\u4E2A\u5185\u6838\u7EA7\u6587\u4EF6\u63CF\u8FF0\u7B26\u8868\uFF0C \u5B58\u50A8\u4E86\u4E3B\u8981\u5305\u62EC\uFF1A</p><ul><li>\u6587\u4EF6\u504F\u79FB\u91CF</li><li>\u6587\u4EF6\u7684\u6253\u5F00\u72B6\u6001</li><li>inode \u6307\u9488</li></ul><p>\u8FD9\u4E9B\u662F\u5168\u90E8</p><pre><code>1. \u5F53\u524D\u6587\u4EF6\u504F\u79FB\u91CF\uFF08\u8C03\u7528 read() \u548C write() \u65F6\u66F4\u65B0\uFF0C\u6216\u4F7F\u7528 lseek() \u76F4\u63A5\u4FEE\u6539\uFF09
2. \u6253\u5F00\u6587\u4EF6\u65F6\u6240\u4F7F\u7528\u7684\u72B6\u6001\u6807\u8BC6\uFF08\u5373\uFF0Copen() \u7684 flags \u53C2\u6570\uFF09
3. \u6587\u4EF6\u8BBF\u95EE\u6A21\u5F0F\uFF08\u5982\u8C03\u7528 open() \u65F6\u6240\u8BBE\u7F6E\u7684\u53EA\u8BFB\u6A21\u5F0F\u3001\u53EA\u5199\u6A21\u5F0F\u6216\u8BFB\u5199\u6A21\u5F0F\uFF09
4. \u4E0E\u4FE1\u53F7\u9A71\u52A8\u76F8\u5173\u7684\u8BBE\u7F6E
5. \u5BF9\u8BE5\u6587\u4EF6 i-node \u5BF9\u8C61\u7684\u5F15\u7528
6. \u6587\u4EF6\u7C7B\u578B\uFF08\u4F8B\u5982\uFF1A\u5E38\u89C4\u6587\u4EF6\u3001\u5957\u63A5\u5B57\u6216 FIFO\uFF09\u548C\u8BBF\u95EE\u6743\u9650
7. \u4E00\u4E2A\u6307\u9488\uFF0C\u6307\u5411\u8BE5\u6587\u4EF6\u6240\u6301\u6709\u7684\u9501\u5217\u8868
8. \u6587\u4EF6\u7684\u5404\u79CD\u5C5E\u6027\uFF0C\u5305\u62EC\u6587\u4EF6\u5927\u5C0F\u4EE5\u53CA\u4E0E\u4E0D\u540C\u7C7B\u578B\u64CD\u4F5C\u76F8\u5173\u7684\u65F6\u95F4\u6233
</code></pre><p>\u53EA\u8981\u6709\u8FDB\u7A0B\u6253\u5F00\u4E00\u4E2A\u6587\u4EF6\uFF0C \u5185\u6838\u5C31\u4F1A\u4EA7\u751F\u8FD9\u4E2A\u53BB\u8BB0\u5F55\u6587\u4EF6\u6253\u5F00\u72B6\u6001\uFF0C \u63A5\u7740\u5411\u8FDB\u7A0B\u8FD4\u56DE\u8FD9\u4E2A\u8BB0\u5F55\u7684\u7D22\u5F15\u4F4D\u7F6E\uFF0C\u5C31\u662F fd</p><p>\u8FDB\u7A0B\u672C\u8EAB\u7EF4\u62A4\u4E00\u4E2A\u8FDB\u7A0B\u7EA7\u7684\u6587\u4EF6\u63CF\u8FF0\u7B26\u8868\uFF0C \u5B58\u50A8\u4E86\uFF1A</p><ul><li>\u6587\u4EF6\u63CF\u8FF0\u7B26</li><li>\u6587\u4EF6\u6307\u9488</li></ul><p>\u67E5\u770B\u8FDB\u7A0B\u5360\u7528\u7684 fd \u6570\u76EE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>// <span class="token number">226889</span> \u662F\u8FDB\u7A0B\u7684 PID\uFF0C \u53EF\u4EE5\u901A\u8FC7 <span class="token function">lsof</span> -i\uFF1A6379 \u67E5\u770B
<span class="token function">ls</span> /proc/226889/fd <span class="token operator">|</span> <span class="token function">wc</span> -w                                                      \uE0B2 \u2714
<span class="token number">9</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_2-2-\u4E0D\u540C\u7EA7\u522B\u7684\u8868\u7684\u5BF9\u5E94\u5173\u7CFB" tabindex="-1"><a class="header-anchor" href="#_2-2-\u4E0D\u540C\u7EA7\u522B\u7684\u8868\u7684\u5BF9\u5E94\u5173\u7CFB" aria-hidden="true">#</a> 2.2 \u4E0D\u540C\u7EA7\u522B\u7684\u8868\u7684\u5BF9\u5E94\u5173\u7CFB</h3><p><img src="https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021301758.png" alt=""></p><ol><li>\u5728\u8FDB\u7A0B A \u4E2D\uFF0C\u6587\u4EF6\u63CF\u8FF0\u7B26 1 \u548C 30 \u90FD\u6307\u5411\u4E86\u540C\u4E00\u4E2A\u6253\u5F00\u7684\u6587\u4EF6\u53E5\u67C4\uFF08\u6807\u53F7 23\uFF09\u3002\u8FD9\u53EF\u80FD\u662F\u901A\u8FC7\u8C03\u7528 dup()\u3001dup2()\u3001fcntl() \u6216\u8005\u5BF9\u540C\u4E00\u4E2A\u6587\u4EF6\u591A\u6B21\u8C03\u7528\u4E86 open() \u51FD\u6570\u800C\u5F62\u6210\u7684\u3002</li><li>\u8FDB\u7A0B A \u7684\u6587\u4EF6\u63CF\u8FF0\u7B26 2 \u548C\u8FDB\u7A0B B \u7684\u6587\u4EF6\u63CF\u8FF0\u7B26 2 \u90FD\u6307\u5411\u4E86\u540C\u4E00\u4E2A\u6253\u5F00\u7684\u6587\u4EF6\u53E5\u67C4\uFF08\u6807\u53F7 73\uFF09\u3002\u8FD9\u79CD\u60C5\u5F62\u53EF\u80FD\u662F\u5728\u8C03\u7528 fork() \u540E\u51FA\u73B0\u7684\uFF08\u5373\uFF0C\u8FDB\u7A0B A\u3001B \u662F\u7236\u5B50\u8FDB\u7A0B\u5173\u7CFB\uFF09\uFF0C\u6216\u8005\u5F53\u67D0\u8FDB\u7A0B\u901A\u8FC7 UNIX \u57DF\u5957\u63A5\u5B57\u5C06\u4E00\u4E2A\u6253\u5F00\u7684\u6587\u4EF6\u63CF\u8FF0\u7B26\u4F20\u9012\u7ED9\u53E6\u4E00\u4E2A\u8FDB\u7A0B\u65F6\uFF0C\u4E5F\u4F1A\u53D1\u751F\u3002\u518D\u8005\u662F\u4E0D\u540C\u7684\u8FDB\u7A0B\u72EC\u81EA\u53BB\u8C03\u7528 open \u51FD\u6570\u6253\u5F00\u4E86\u540C\u4E00\u4E2A\u6587\u4EF6\uFF0C\u6B64\u65F6\u8FDB\u7A0B\u5185\u90E8\u7684\u63CF\u8FF0\u7B26\u6B63\u597D\u5206\u914D\u5230\u4E0E\u5176\u4ED6\u8FDB\u7A0B\u6253\u5F00\u8BE5\u6587\u4EF6\u7684\u63CF\u8FF0\u7B26\u4E00\u6837\u3002</li><li>\u6B64\u5916\uFF0C\u8FDB\u7A0B A \u7684\u63CF\u8FF0\u7B26 0 \u548C\u8FDB\u7A0B B \u7684\u63CF\u8FF0\u7B26 3 \u5206\u522B\u6307\u5411\u4E0D\u540C\u7684\u6253\u5F00\u6587\u4EF6\u53E5\u67C4\uFF0C\u4F46\u8FD9\u4E9B\u53E5\u67C4\u5747\u6307\u5411 i-node \u8868\u7684\u76F8\u540C\u6761\u76EE\uFF081976\uFF09\uFF0C\u6362\u8A00\u4E4B\uFF0C\u6307\u5411\u540C\u4E00\u4E2A\u6587\u4EF6\u3002\u53D1\u751F\u8FD9\u79CD\u60C5\u51B5\u662F\u56E0\u4E3A\u6BCF\u4E2A\u8FDB\u7A0B\u5404\u81EA\u5BF9\u540C\u4E00\u4E2A\u6587\u4EF6\u53D1\u8D77\u4E86 open() \u8C03\u7528\u3002\u540C\u4E00\u4E2A\u8FDB\u7A0B\u4E24\u6B21\u6253\u5F00\u540C\u4E00\u4E2A\u6587\u4EF6\uFF0C\u4E5F\u4F1A\u53D1\u751F\u7C7B\u4F3C\u60C5\u51B5\u3002</li></ol><p>\u4E0D\u540C\u6587\u4EF6\u63CF\u8FF0\u7B26\u5B58\u50A8\u7684\u5185\u5BB9</p><p><img src="https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021301124.png" alt=""></p><h3 id="_2-3-fd-\u7684\u9650\u5236" tabindex="-1"><a class="header-anchor" href="#_2-3-fd-\u7684\u9650\u5236" aria-hidden="true">#</a> 2.3 fd \u7684\u9650\u5236</h3><ol><li><p>\u7CFB\u7EDF\u7EA7\u9650\u5236</p><p>\u6587\u4EF6\u63CF\u8FF0\u7B26\u662F\u7CFB\u7EDF\u7684\u4E00\u4E2A\u91CD\u8981\u8D44\u6E90\uFF0C<strong>\u867D\u7136\u8BF4\u7CFB\u7EDF\u5185\u5B58\u6709\u591A\u5C11\u5C31\u53EF\u4EE5\u6253\u5F00\u591A\u5C11\u7684\u6587\u4EF6\u63CF\u8FF0\u7B26</strong>\uFF0C\u4F46\u662F\u5728\u5B9E\u9645\u5B9E\u73B0\u8FC7\u7A0B\u4E2D\u5185\u6838\u662F\u4F1A\u505A\u76F8\u5E94\u7684\u5904\u7406\u7684\uFF0C\u4E00\u822C\u6700\u5927\u6253\u5F00\u6587\u4EF6\u6570\u4F1A\u662F\u7CFB\u7EDF\u5185\u5B58\u7684 10%\uFF08\u4EE5 KB \u6765\u8BA1\u7B97\uFF09</p><p>\u67E5\u770B\u65B9\u5F0F\uFF1A<code>sysctl -a | grep fs.file-max</code></p></li><li><p>\u7528\u6237\u7EA7\u9650\u5236</p><p>\u4E0E\u6B64\u540C\u65F6\uFF0C\u5185\u6838\u4E3A\u4E86\u4E0D\u8BA9\u67D0\u4E00\u4E2A\u8FDB\u7A0B\u6D88\u8017\u6389\u6240\u6709\u7684\u6587\u4EF6\u8D44\u6E90\uFF0C\u5176\u4E5F\u4F1A\u5BF9\u5355\u4E2A\u8FDB\u7A0B\u6700\u5927\u6253\u5F00\u6587\u4EF6\u6570\u505A\u9ED8\u8BA4\u503C\u5904\u7406\uFF0C\u9ED8\u8BA4\u503C\u4E00\u822C\u662F 1024\uFF0C\u4F7F\u7528 <code>ulimit -n</code> \u547D\u4EE4\u53EF\u4EE5\u67E5\u770B\u3002</p></li></ol><p>\u4E00\u822C\u53EF\u4EE5\u901A\u8FC7\u4FEE\u6539\u9650\u5236\u4F18\u5316\u7CFB\u7EDF</p><h2 id="_3-\u4F7F\u7528-fd" tabindex="-1"><a class="header-anchor" href="#_3-\u4F7F\u7528-fd" aria-hidden="true">#</a> 3. \u4F7F\u7528 fd</h2><h3 id="_3-1-open-read" tabindex="-1"><a class="header-anchor" href="#_3-1-open-read" aria-hidden="true">#</a> 3.1 open / read</h3><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/types.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/stat.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;fcntl.h&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span> <span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">int</span> fd<span class="token punctuation">;</span>
    <span class="token keyword">int</span> numbytes<span class="token punctuation">;</span>
    <span class="token keyword">char</span> path<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;file&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">/*
     * O_CREAT:\u5982\u679C\u6587\u4EF6\u4E0D\u5B58\u5728\u5219\u521B\u5EFA
     * O_RDONLY:\u4EE5\u53EA\u8BFB\u6A21\u5F0F\u6253\u5F00\u6587\u4EF6
     */</span>
    fd <span class="token operator">=</span> <span class="token function">open</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> O_CREAT <span class="token operator">|</span> O_RDONLY<span class="token punctuation">,</span> <span class="token number">0644</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>fd <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">&quot;open()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">exit</span><span class="token punctuation">(</span>EXIT_FAILURE<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">memset</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token number">0x00</span><span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>numbytes <span class="token operator">=</span> <span class="token function">read</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> buf<span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d bytes read: %s&quot;</span><span class="token punctuation">,</span> numbytes<span class="token punctuation">,</span> buf<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">memset</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token number">0x00</span><span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">close</span> <span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">exit</span><span class="token punctuation">(</span>EXIT_SUCCESS<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div>`,22);function h(f,g){const a=e("ExternalLinkIcon");return p(),t(c,null,[u,n("blockquote",null,[d,n("p",null,[n("a",b,[k,o(a)])])]),m],64)}var x=i(r,[["render",h]]);export{x as default};