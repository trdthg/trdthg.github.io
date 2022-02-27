import{r as e,o as l,c as o,a as s,b as p,F as c,d as n,e as t}from"./app.9ad42599.js";import{_ as r}from"./plugin-vue_export-helper.21dcd24c.js";const i={},d=n('<h1 id="\u6280\u672F" tabindex="-1"><a class="header-anchor" href="#\u6280\u672F" aria-hidden="true">#</a> \u6280\u672F</h1><h2 id="\u4F7F\u7528vm\u642D\u5EFAhadoop\u96C6\u7FA4" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528vm\u642D\u5EFAhadoop\u96C6\u7FA4" aria-hidden="true">#</a> \u4F7F\u7528VM\u642D\u5EFAhadoop\u96C6\u7FA4</h2><h3 id="_1-\u51C6\u5907" tabindex="-1"><a class="header-anchor" href="#_1-\u51C6\u5907" aria-hidden="true">#</a> 1. \u51C6\u5907</h3>',3),b=s("li",null,"centos7.5\u955C\u50CF",-1),m=s("li",null,"JDK8",-1),u=s("li",null,"Hadoop",-1),h={href:"https://www.cnblogs.com/aeolian/p/8882790.html",target:"_blank",rel:"noopener noreferrer"},k=t("\u53C2\u8003\u94FE\u63A5"),v=n(`<h3 id="_2-\u5B89\u88C5hadoop101\u865A\u62DF\u673A" tabindex="-1"><a class="header-anchor" href="#_2-\u5B89\u88C5hadoop101\u865A\u62DF\u673A" aria-hidden="true">#</a> 2. \u5B89\u88C5hadoop101\u865A\u62DF\u673A</h3><ul><li>\u8F6F\u4EF6\u9009\u62E9: \u6700\u5C0F\u5B89\u88C5\u662F\u7EAF\u547D\u4EE4\u884C</li><li>\u5B89\u88C5\u4F4D\u7F6E: \u9009\u62E9\u624B\u52A8\u548C\u4EE5\u81EA\u7531\u914D\u7F6E\u76D8\u7B26\u914D\u7F6E\u53CA\u5927\u5C0F, \u8BBE\u5907\u7C7B\u578B(LVM\u76F8\u6BD4\u4E8E\u6807\u51C6\u5206\u533A\u80FD\u81EA\u7531\u6269\u7F29\u5BB9)</li><li>KDUMP\u53EF\u4EE5\u6682\u65F6\u4E0D\u8981</li><li>\u8BBE\u7F6E\u7528\u6237\u540D\u5BC6\u7801: \u793A\u4F8B username: hadoop101 password: 000000</li></ul><h3 id="_3-\u914D\u7F6E\u672C\u673A\u7F51\u7EDC\u73AF\u5883" tabindex="-1"><a class="header-anchor" href="#_3-\u914D\u7F6E\u672C\u673A\u7F51\u7EDC\u73AF\u5883" aria-hidden="true">#</a> 3. \u914D\u7F6E\u672C\u673A\u7F51\u7EDC\u73AF\u5883</h3><ol><li>\u5173\u95ED\u9632\u706B\u5899</li><li>VM\u914D\u7F6EVMnet8 \u7F16\u8F91 -&gt; \u865A\u62DF\u7F51\u7EDC\u7F16\u8F91\u5668</li><li>Windows\u914D\u7F6EVMnet8</li></ol><h3 id="_4-\u914D\u7F6E\u865A\u62DF\u673A\u7F51\u7EDC\u73AF\u5883" tabindex="-1"><a class="header-anchor" href="#_4-\u914D\u7F6E\u865A\u62DF\u673A\u7F51\u7EDC\u73AF\u5883" aria-hidden="true">#</a> 4. \u914D\u7F6E\u865A\u62DF\u673A\u7F51\u7EDC\u73AF\u5883</h3><ol><li>\u5173\u95ED\u865A\u62DF\u673A\u9632\u706B\u5899: <code>systemctl disable firewalld.service</code></li><li>\u5173\u95EDNetworkManage:</li></ol><ul><li><code>systemctl stop NetworkManager</code></li><li><code>systemctl disable NetworkManager</code></li></ul><ol start="3"><li>!!!\u4FEE\u6539\u7F51\u5361\u914D\u7F6E:</li></ol><ul><li><code>vim /etc/sysconfig/network-scripts/ifcfg-ens33</code></li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>BOOTPROTO=static  #\u542F\u7528\u9759\u6001IP\u5730\u5740 ,\u9ED8\u8BA4\u4E3Adhcp
IPADDR=192.168.182.3  #\u8BBE\u7F6EIP\u5730\u5740(\u8FD9\u53F0\u865A\u62DF\u673A\u60F3\u8981\u7684ip)
NETMASK=255.255.225.0  #\u8BBE\u7F6E\u5B50\u7F51\u63A9\u7801
GATEWAY=192.168.182.2  #\u8BBE\u7F6E\u7F51\u5173(\u548C\u5916\u90E8\u7684\u7F51\u5173\u76F8\u540C)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="4"><li>\u91CD\u542F\u7F51\u5361: <code>service network restart</code> \u53EF\u4EE5\u901A\u8FC7 <code>ping 8.8.8.8</code>\u68C0\u6D4B\u662F\u5426\u901A</li></ol><h3 id="_5-\u514B\u9686\u524D" tabindex="-1"><a class="header-anchor" href="#_5-\u514B\u9686\u524D" aria-hidden="true">#</a> 5. \u514B\u9686\u524D</h3><ol><li>\u5B89\u88C5\u8F85\u52A9\u5305\u7BA1\u7406\u5668: <code>yum install -y epel-release</code></li><li>\u672A\u77E5: <code>kill -9 3030</code></li><li>\u5378\u8F7D\u7CFB\u7EDF\u81EA\u5E26JDK:</li></ol><ul><li>\u67E5\u770B: <code>rpm -qa | grep java</code></li><li>\u5378\u8F7D: <code>sudo yum remove packagename</code></li></ul><ol start="4"><li>\u4FEE\u6539\u865A\u62DF\u673Ahost</li></ol><ul><li>\u4FEE\u6539hostname\u5982\u4E0B: <code>nano /etc/hostname</code></li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>hadoop101
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul><li>\u4FEE\u6539hosts\u5982\u4E0B: <code>nano /etc/hosts</code></li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6

192.168.93.21 hadoop101
192.168.93.22 hadoop102
192.168.93.23 hadoop103
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_6-\u514B\u9686-\u5B8C\u6574\u514B\u9686-\u540E" tabindex="-1"><a class="header-anchor" href="#_6-\u514B\u9686-\u5B8C\u6574\u514B\u9686-\u540E" aria-hidden="true">#</a> 6. \u514B\u9686(\u5B8C\u6574\u514B\u9686)\u540E</h3><ol><li>\u901A\u8FC7vmware\u8FDB\u884Cclone\u51FAn\u53F0\u76F8\u540C\u7684\u865A\u62DF\u673A</li></ol><ul><li>\u4FEE\u6539\u6BCF\u53F0\u514B\u9686\u51FA\u7684\u7F51\u5361IPADDR: <code>vim /etc/sysconfig/network-scripts/ifcfg-ens33</code></li><li>\u4FEE\u6539hostname: <code>nano /etc/hostname</code></li></ul><h3 id="_7-\u5B89\u88C5\u53CA\u914D\u7F6E\u73AF\u5883\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#_7-\u5B89\u88C5\u53CA\u914D\u7F6E\u73AF\u5883\u53D8\u91CF" aria-hidden="true">#</a> 7. \u5B89\u88C5\u53CA\u914D\u7F6E\u73AF\u5883\u53D8\u91CF</h3><ol><li>\u5B89\u88C5\u8F6F\u4EF6 \u4E3A\u4E86\u65B9\u4FBF\u7EDF\u4E00\u7BA1\u7406</li></ol><ul><li>\u538B\u7F29\u5305\u76EE\u5F55: <code>/opt/software</code></li><li>\u89E3\u538B\u76EE\u5F55: <code>/opt/module</code> \u89E3\u538B:</li><li>\u7ED9\u6743\u9650: <code>chmod 777 /opt/software</code></li><li>\u89E3\u538B(-C\u6307\u5B9A\u89E3\u538B\u76EE\u5F55): <code>tar -zxvf jdk-8u212-linux-x64.tar.gz -C /opt/module/</code></li></ul><ol start="2"><li>\u4FEE\u6539\u73AF\u5883\u53D8\u91CF \u4E3A\u4E86\u6C38\u4E45\u4FEE\u6539\u73AF\u5883\u53D8\u91CF: \u4FEE\u6539\u6587\u4EF6 <code>sudo nano /etc/profile.d/users.sh</code>\u5982\u4E0B</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#JAVA</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>/opt/module/jdk1.8.0_212
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$JAVA_HOME</span>/bin
<span class="token comment">#HADOOP</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">HADOOP_HOME</span><span class="token operator">=</span>/opt/module/hadoop-3.1.3
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$HADOOP_HOME</span>/bin
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$HADOOP_HOME</span>/sbin
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ol start="3"><li>\u91CD\u7F6E <code>source /etc/profile</code><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>\u4F7F\u7528 <code>export PATH=$PATH:xxxxx</code>\u4F1A\u5728\u7EC8\u7AEF\u5173\u95ED\u540E\u5931\u6548</p></div></li></ol><h3 id="_8-\u914D\u7F6E\u96C6\u7FA4\u5206\u53D1\u811A\u672C\u548C\u514D\u5BC6\u767B\u5F55" tabindex="-1"><a class="header-anchor" href="#_8-\u914D\u7F6E\u96C6\u7FA4\u5206\u53D1\u811A\u672C\u548C\u514D\u5BC6\u767B\u5F55" aria-hidden="true">#</a> 8. \u914D\u7F6E\u96C6\u7FA4\u5206\u53D1\u811A\u672C\u548C\u514D\u5BC6\u767B\u5F55</h3><ol><li>scp\u670D\u52A1\u5668\u95F4\u62F7\u8D1D</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5C06\u5F53\u524D\u670D\u52A1\u5668\u7684/opt/module/jdk1.8.0_212\u76EE\u5F55\u62F7\u8D1D\u5230hadoop102\u670D\u52A1\u5668\u7684/opt/module\u76EE\u5F55\u4E0B</span>
<span class="token comment"># \u503C\u5F97\u6CE8\u610F\u7684\u662F\uFF0Chadoop102\u670D\u52A1\u5668\u4E0B\u7684/opt/module\u76EE\u5F55\u5FC5\u987B\u5B58\u5728</span>
<span class="token comment"># -r\u6307\u9012\u5F52\u590D\u5236\u6574\u4E2A\u76EE\u5F55</span>
<span class="token comment"># root\u662F\u6307hadoop102\u7684\u7528\u6237</span>
<span class="token function">scp</span> -r /opt/module/jdk1.8.0_212 root@hadoop102:/opt/module
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ol start="2"><li>rsync\u8FDC\u7A0B\u540C\u6B65\u5DE5\u5177</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u503C\u5F97\u6CE8\u610F\u7684\u662F\uFF0C\u6BCF\u4E2A\u670D\u52A1\u5668\u90FD\u9700\u8981\u5B89\u88C5</span>
yum -y <span class="token function">install</span> <span class="token function">rsync</span>

<span class="token comment"># -a\u8868\u793A\u5F52\u6863\u62F7\u8D1D</span>
<span class="token comment"># -v\u8868\u793A\u663E\u793A\u62F7\u8D1D\u8FC7\u7A0B</span>
<span class="token function">rsync</span> -av /opt/module/hadoop-3.1.3/ root@hadoop102:/opt/module/hadoop-3.1.3/
<span class="token comment"># \u8BA9\u4E24\u4E2A\u6587\u4EF6\u5939\u540C\u6B65</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ol start="3"><li>\u5206\u53D1\u811A\u672C(\u8D77\u540D:xsync)</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#1. \u5224\u65AD\u53C2\u6570\u4E2A\u6570</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$#</span> -lt <span class="token number">1</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
 <span class="token builtin class-name">echo</span> Not Enough Arguement<span class="token operator">!</span>
 <span class="token builtin class-name">exit</span><span class="token punctuation">;</span>
<span class="token keyword">fi</span>
<span class="token comment">#2. \u904D\u5386\u96C6\u7FA4\u6240\u6709\u673A\u5668</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">host</span> <span class="token keyword">in</span> hadoop101 hadoop102 hadoop103
    <span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span> <span class="token variable">$host</span> <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
    <span class="token comment">#3. \u904D\u5386\u6240\u6709\u76EE\u5F55\uFF0C\u6328\u4E2A\u53D1\u9001</span>

    <span class="token keyword">for</span> <span class="token for-or-select variable">file</span> <span class="token keyword">in</span> <span class="token variable">$@</span>
    <span class="token keyword">do</span>
        <span class="token comment">#4. \u5224\u65AD\u6587\u4EF6\u662F\u5426\u5B58\u5728</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> -e <span class="token variable">$file</span> <span class="token punctuation">]</span>
        <span class="token keyword">then</span>
            <span class="token comment">#5. \u83B7\u53D6\u7236\u76EE\u5F55</span>
            <span class="token assign-left variable">pdir</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">cd</span> -P <span class="token punctuation">$(</span>dirname $file<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>
            <span class="token comment">#6. \u83B7\u53D6\u5F53\u524D\u6587\u4EF6\u7684\u540D\u79F0</span>
            <span class="token assign-left variable">fname</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> $file<span class="token variable">)</span></span>
            <span class="token function">ssh</span> <span class="token variable">$host</span> <span class="token string">&quot;mkdir -p <span class="token variable">$pdir</span>&quot;</span>
            <span class="token function">rsync</span> -av <span class="token variable">$pdir</span>/<span class="token variable">$fname</span> <span class="token variable">$host</span><span class="token builtin class-name">:</span><span class="token variable">$pdir</span>
        <span class="token keyword">else</span>
            <span class="token builtin class-name">echo</span> <span class="token variable">$file</span> does not exists<span class="token operator">!</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">done</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">DANGER</p><blockquote><p>\u7A7A\u683C\u5FC5\u987B\u52A0: <code>if [ -e $file ]</code> \u7B49\u53F7\u4E24\u8FB9\u7684\u7A7A\u683C\u5FC5\u4E0D\u80FD\u52A0: <code>pdir=$(cd -P $(dirname $file); pwd)</code> $@\u8FD4\u56DE\u6240\u6709\u547D\u4EE4\u884C\u53C2\u6570, \u6240\u4EE5\u53EF\u4EE5\u4E00\u6B21\u540C\u6B65\u591A\u4E2A\u6587\u4EF6(\u5939) :::</p></blockquote><ol start="4"><li>\u540E\u7EED\u5904\u7406 \u6587\u4EF6\u521B\u5EFA\u5728/bin/\u4E0B: <code>/bin/xsync</code>\u65B9\u4FBF\u76F4\u63A5\u8C03\u7528</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u7ED9\u8FD0\u884C\u6743\u9650</span>
<span class="token function">chmod</span> +x xsync
<span class="token comment"># \u6D4B\u8BD5\u540C\u6B65\u73AF\u5883\u53D8\u91CF</span>
xsync /etc/profile.d/
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="5"><li>\u514D\u5BC6\u767B\u5F55</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /root/.ssh
<span class="token comment"># \u751F\u6210\u79C1\u94A5\u516C\u94A5</span>
ssh-keygen -t rsa
<span class="token comment"># \u5206\u53D1\u5BC6\u94A5</span>
ssh-copy-id hadoop101
ssh-copy-id hadoop102
ssh-copy-id hadoop103
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="_9" tabindex="-1"><a class="header-anchor" href="#_9" aria-hidden="true">#</a> 9</h3><h3 id="\u5F85\u7EED" tabindex="-1"><a class="header-anchor" href="#\u5F85\u7EED" aria-hidden="true">#</a> \u5F85\u7EED</h3><h2 id="\u5F85\u7EED-1" tabindex="-1"><a class="header-anchor" href="#\u5F85\u7EED-1" aria-hidden="true">#</a> \u5F85\u7EED</h2></div>`,36);function f(g,x){const a=e("ExternalLinkIcon");return l(),o(c,null,[d,s("ul",null,[b,m,u,s("li",null,[s("a",h,[k,p(a)])])]),v],64)}var w=r(i,[["render",f]]);export{w as default};