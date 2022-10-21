"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[8479],{3905:(e,t,n)=>{n.d(t,{Zo:()=>i,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),u=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},i=function(e){var t=u(e.components);return r.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,i=s(e,["components","mdxType","originalType","parentName"]),c=u(n),d=a,f=c["".concat(p,".").concat(d)]||c[d]||m[d]||l;return n?r.createElement(f,o(o({ref:t},i),{},{components:n})):r.createElement(f,o({ref:t},i))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=c;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var u=2;u<l;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},3524:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>m,frontMatter:()=>l,metadata:()=>s,toc:()=>u});var r=n(7462),a=(n(7294),n(3905));const l={},o="Linux \u53d1\u884c\u7248\u914d\u7f6e",s={permalink:"/blog/i3wm",source:"@site/blog/i3wm.md",title:"Linux \u53d1\u884c\u7248\u914d\u7f6e",description:"i3wm",date:"2022-10-21T07:31:24.000Z",formattedDate:"2022\u5e7410\u670821\u65e5",tags:[],readingTime:2.435,hasTruncateMarker:!1,authors:[],frontMatter:{},prevItem:{title:"[\u8bd1] \u62d3\u5c55 Rust \u4e2d\u7684 Map",permalink:"/blog/2023/01/01/[\u8bd1] \u62d3\u5c55 Rust \u4e2d\u7684 Map"},nextItem:{title:"\u8d44\u6e90\u6574\u7406",permalink:"/blog/resources"}},p={authorsImageUrls:[]},u=[{value:"i3wm",id:"i3wm",level:2},{value:"\u591a\u5c4f\u5e55",id:"\u591a\u5c4f\u5e55",level:3},{value:"manjaro",id:"manjaro",level:2},{value:"cpu \u8c03\u9891",id:"cpu-\u8c03\u9891",level:3},{value:"\u81ea\u52a8\u6302\u8f7d",id:"\u81ea\u52a8\u6302\u8f7d",level:3},{value:"openssh-server(sshd) \u542f\u52a8",id:"openssh-serversshd-\u542f\u52a8",level:3},{value:"OpenSSH",id:"openssh",level:3}],i={toc:u};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},i,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"i3wm"},"i3wm"),(0,a.kt)("h3",{id:"\u591a\u5c4f\u5e55"},"\u591a\u5c4f\u5e55"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"xrandr\nxrandr --output DP-1 --auto --right-of eDP-1\n")),(0,a.kt)("h2",{id:"manjaro"},"manjaro"),(0,a.kt)("h3",{id:"cpu-\u8c03\u9891"},"cpu \u8c03\u9891"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u67e5\u770b\u5f53\u524d\u6240\u6709 CPU \u7684\u4fe1\u606f\uff1a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"cpupower -c all frequency-info\n")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"\u8bbe\u7f6e\u6240\u6709 CPU \u4e3a\u6027\u80fd\u6a21\u5f0f\uff1a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"cpupower -c all frequency-set -g performance\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"performance: \u56fa\u5b9a\u6700\u9ad8\u8fd0\u884c\u9891\u7387\u4e0a\uff0c\u4e0d\u52a8\u6001\u8c03\u8282\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"powersave: \u56fa\u5b9a\u5de5\u4f5c\u5728\u5176\u652f\u6301\u7684\u6700\u4f4e\u8fd0\u884c\u9891\u7387\u4e0a")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"ondemand: \u6309\u9700\u5feb\u901f\u52a8\u6001\u8c03\u6574 CPU \u9891\u7387\uff0c\u4e00\u6709 cpu \u8ba1\u7b97\u91cf\u7684\u4efb\u52a1\uff0c\u5c31\u4f1a\u7acb\u5373\u8fbe\u5230\u6700\u5927\u9891\u7387\u8fd0\u884c\uff0c\u7b49\u6267\u884c\u5b8c\u6bd5\u5c31\u7acb\u5373\u56de\u5230\u6700\u4f4e\u9891\u7387\uff1b")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"conservative:\n\u4e0e ondemand \u4e0d\u540c\uff0c\u5e73\u6ed1\u5730\u8c03\u6574 CPU \u9891\u7387\uff0c\u9891\u7387\u7684\u5347\u964d\u662f\u6e10\u53d8\u5f0f\u7684\uff0c\u4f1a\u81ea\u52a8\u5728\u9891\u7387\u4e0a\u4e0b\u9650\u8c03\u6574\uff0c\u548c ondemand \u7684\u533a\u522b\u5728\u4e8e\u5b83\u4f1a\u6309\u9700\u5206\u914d\u9891\u7387\uff0c\u800c\u4e0d\u662f\u4e00\u5473\u8ffd\u6c42\u6700\u9ad8\u9891\u7387\uff1b"))),(0,a.kt)("h3",{id:"\u81ea\u52a8\u6302\u8f7d"},"\u81ea\u52a8\u6302\u8f7d"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"# 100mb \u865a\u62df\u786c\u76d8\nmount tmpfs in /home/trdthg/tmp/\ntmpfs /home/trdthg/tmp tmpfs size=96m 0 0\n\n# 1.\u67e5\u770b\u7535\u8111\u4e2d\u6240\u6709\u786c\u76d8\u7684\u5206\u533a\u60c5\u51b5\u3002\n# \u547d\u4ee4\u5982\u4e0b\uff1a\n# sudo fdisk -l\n# 2.\u7ed3\u679c\u5982\u4e0b\n# /dev/nvme0n1p3    567296  210282495 209715200   100G Microsoft \u57fa\u672c\u6570\u636e\n# /dev/nvme0n1p4 210282496  872337407 662054912 315.7G Microsoft \u57fa\u672c\u6570\u636e\n\n#auto mount windows fs\n/dev/nvme0n1p3 /mnt/C ntfs nls=utf8,umask=000   0   0\n/dev/nvme0n1p4 /mnt/D ntfs nls=utf8,umask=000   0   0\n\n# \u6ce8\uff1a \u672b\u5c3e\u7684 2 \u884c\u662f\u6dfb\u52a0\u7684\u5185\u5bb9\u3002\u5176\u4e2d/dev/nvme0n1p3 \u4e00\u884c\u4ee3\u8868 C \u76d8\u5206\u533a\u5c06\u81ea\u52a8\u6302\u8f7d\u5230/mnt/C \u76ee\u5f55\u4e0b\uff0c\u6587\u4ef6\u7cfb\u7edf\u4e3a NTFS\uff08\u5982\u679c\u6b65\u9aa4 1 \u4e2d\u67e5\u770b\u5206 \u533a\u7684\u6587\u4ef6\u7cfb\u7edf\u4e3a FAT32 \u65f6\uff0c\u6b64\u5904\u8bf7\u5199 vfat\uff09\uff0c\u5b57\u7b26\u7f16\u7801\u4e3a utf8\u3002umask \u8868\u793a\u6587\u4ef6\u76ee\u5f55\u7684\u6743\u9650\uff0c\u6b64\u53c2\u6570\u4ee5\u53ca\u4e4b\u540e\u7684 2 \u4e2a\u53c2\u6570\u90fd\u4e3a 0 \u5373\u53ef\u3002\u4ee5\u4e0b\u51e0\u884c\u4ee5 \u6b64\u7c7b\u63a8\u3002\u6b64\u5904\u53ef\u4ee5\u9009\u62e9\u6027\u7684\u6dfb\u52a0\u9700\u8981\u81ea\u52a8\u6302\u8f7d\u7684\u5206\u533a\uff0c\u4e0d\u60f3\u6302\u8f7d\u7684\u5206\u533a\u4e0d\u7528\u4e66\u5199\u3002\n")),(0,a.kt)("h3",{id:"openssh-serversshd-\u542f\u52a8"},"openssh-server(sshd) \u542f\u52a8"),(0,a.kt)("h3",{id:"openssh"},"OpenSSH"),(0,a.kt)("p",null,"OpenSSH \u53ef\u4ee5\u652f\u6491 Manjaro \u6210\u4e3a SSH Server\uff0c\u4ee5\u4fbf\u5176\u4ed6\u4e3b\u673a\u53ef\u4ee5\u901a\u8fc7 SSH \u8fde\u63a5\u5230 Manjaro\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"# \u5b89\u88c5 OpenSSH\nsudo pacman -S openssh\n# \u5f00\u673a\u81ea\u542f sshd \u670d\u52a1\nsudo systemctl enable sshd\n# \u542f\u52a8 sshd \u670d\u52a1\nsudo systemctl start sshd\n# \u91cd\u542f sshd \u670d\u52a1\nsudo systemctl restart sshd\n")))}m.isMDXComponent=!0}}]);