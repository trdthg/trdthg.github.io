"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[2264],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>m});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),p=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},u=function(e){var n=p(e.components);return r.createElement(s.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=p(t),m=a,h=c["".concat(s,".").concat(m)]||c[m]||d[m]||o;return t?r.createElement(h,l(l({ref:n},u),{},{components:t})):r.createElement(h,l({ref:n},u))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=c;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var p=2;p<o;p++)l[p]=t[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"},5778:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var r=t(7462),a=(t(7294),t(3905));const o={},l="\u811a\u672c",i={unversionedId:"other/script",id:"other/script",title:"\u811a\u672c",description:"shell \u811a\u672c",source:"@site/docs/other/script.md",sourceDirName:"other",slug:"/other/script",permalink:"/docs/other/script",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Python",permalink:"/docs/other/python"},next:{title:"\u5173\u4e8e\u672c\u7f51\u7ad9",permalink:"/docs/other/this_page"}},s={},p=[{value:"shell \u811a\u672c",id:"shell-\u811a\u672c",level:2},{value:"\u6587\u4ef6\u64cd\u4f5c",id:"\u6587\u4ef6\u64cd\u4f5c",level:3},{value:"CodeRunner For C",id:"coderunner-for-c",level:3},{value:"\u53bb\u5e7f\u544a",id:"\u53bb\u5e7f\u544a",level:2},{value:"markdown \u6d41\u7a0b\u56fe",id:"markdown-\u6d41\u7a0b\u56fe",level:2},{value:"manjaro",id:"manjaro",level:2},{value:"cpu \u8c03\u9891",id:"cpu-\u8c03\u9891",level:3},{value:"\u81ea\u52a8\u6302\u8f7d",id:"\u81ea\u52a8\u6302\u8f7d",level:3},{value:"openssh-server(sshd) \u542f\u52a8",id:"openssh-serversshd-\u542f\u52a8",level:3},{value:"OpenSSH",id:"openssh",level:3},{value:"Git",id:"git",level:2},{value:"\u57fa\u7840\u547d\u4ee4",id:"\u57fa\u7840\u547d\u4ee4",level:3},{value:"\u4e0b\u8f7d\u67d0\u4e2a\u6587\u4ef6\u5939",id:"\u4e0b\u8f7d\u67d0\u4e2a\u6587\u4ef6\u5939",level:3},{value:"\u5f85\u7eed...",id:"\u5f85\u7eed",level:2}],u={toc:p};function d(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u811a\u672c"},"\u811a\u672c"),(0,a.kt)("h2",{id:"shell-\u811a\u672c"},"shell \u811a\u672c"),(0,a.kt)("h3",{id:"\u6587\u4ef6\u64cd\u4f5c"},"\u6587\u4ef6\u64cd\u4f5c"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"rm -r folder_name/* # /*\u5ffd\u7565\u4ee5\u3002\u5f00\u5934\u7684\u9690\u85cf\u6587\u4ef6\uff0c/.\u4e0d\u4f1a\ncp -a foldername/* desc # \u62f7\u8d1d\nmv oldname newname # \u91cd\u547d\u540d\ncd - # \u8fd4\u56de\u4e0a\u6b21\u5de5\u4f5c\u76ee\u5f55\n")),(0,a.kt)("h3",{id:"coderunner-for-c"},"CodeRunner For C"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'"code-runner.runInTerminal": true,\n    "code-runner.executorMap": {\n        "c":\n            "cd $dir &&\n            if (!\'exes\') { mkdir \'exes\' } ; &&\n            gcc $fileName -o exes\\\\$fileNameWithoutExt &&\n            cd ./exes &&\n            ./$fileNameWithoutExt"\n    },\n')),(0,a.kt)("h2",{id:"\u53bb\u5e7f\u544a"},"\u53bb\u5e7f\u544a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'// ==UserScript==\n// @name         anti-ad\n// @namespace    http://tampermonkey.net/\n// @version      0.1\n// @description  try to take over the world!\n// @author       Me\n// @match        *://www.nvzox.com/*\n// @match        *://zh.numberempire.com/*\n// @match        *://wenku.baidu.com/*\n// @match        *://www.bilibili.com/*\n// @grant        none\n// ==/UserScript==\n\n"use strict";\nfunction rmad() {\n  var ads = new Array();\n  ads.push(document.getElementById("activity_vote"));\n  for (var index = 0; index < ads.length; index++) {\n    if (ads[index]) {\n      ads[index].style.display = "none";\n    }\n  }\n  var ads_arr = new Array();\n  ads_arr.push(document.getElementsByClassName("ad-report"));\n  ads_arr.push(document.getElementsByClassName("operate-wrapper"));\n  for (index = 0; index < ads_arr.length; index++) {\n    if (ads_arr[index]) {\n      for (var i = 0; i < ads_arr[index].length; i++) {\n        if (ads_arr[index][i] != null) {\n          ads_arr[index][i].style.display = "none";\n        }\n      }\n    }\n  }\n  ads = [];\n  ads_arr = [];\n}\n(function () {\n  var times = 50;\n  setTimeout(() => {\n    while (times--) {\n      setTimeout(function () {\n        rmad();\n      }, 500);\n    }\n  }, 3000);\n})();\n')),(0,a.kt)("hr",null),(0,a.kt)("h2",{id:"markdown-\u6d41\u7a0b\u56fe"},"markdown \u6d41\u7a0b\u56fe"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u516d\u4e2a\u5143\u7d20"),(0,a.kt)("li",{parentName:"ul"},"4 \u4e2a\u65b9\u5411"),(0,a.kt)("li",{parentName:"ul"},"\u4e24\u4e2a\u5224\u65ad")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-flow"},"startID=>start: \u5f00\u59cb\u6846\ninputoutputID=>inputoutput: \u8f93\u5165\u8f93\u51fa\u6846\noperationID=>operation: \u64cd\u4f5c\u6846\nconditionID=>condition: \u6761\u4ef6\u6846\nsubroutineID=>subroutine: \u5b50\u6d41\u7a0b\nendID=>end: \u7ed3\u675f\u6846\n\nstartID(left)->inputoutputID()->operationID->conditionID(yes, right)->endID\nconditionID(no, left)->operationID\nconditionID->\n")),(0,a.kt)("h2",{id:"manjaro"},"manjaro"),(0,a.kt)("h3",{id:"cpu-\u8c03\u9891"},"cpu \u8c03\u9891"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u67e5\u770b\u5f53\u524d\u6240\u6709 CPU \u7684\u4fe1\u606f\uff1a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"cpupower -c all frequency-info\n")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"\u8bbe\u7f6e\u6240\u6709 CPU \u4e3a\u6027\u80fd\u6a21\u5f0f\uff1a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"cpupower -c all frequency-set -g performance\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"performance: \u56fa\u5b9a\u6700\u9ad8\u8fd0\u884c\u9891\u7387\u4e0a\uff0c\u4e0d\u52a8\u6001\u8c03\u8282\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"powersave: \u56fa\u5b9a\u5de5\u4f5c\u5728\u5176\u652f\u6301\u7684\u6700\u4f4e\u8fd0\u884c\u9891\u7387\u4e0a")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"ondemand: \u6309\u9700\u5feb\u901f\u52a8\u6001\u8c03\u6574 CPU \u9891\u7387\uff0c\u4e00\u6709 cpu \u8ba1\u7b97\u91cf\u7684\u4efb\u52a1\uff0c\u5c31\u4f1a\u7acb\u5373\u8fbe\u5230\u6700\u5927\u9891\u7387\u8fd0\u884c\uff0c\u7b49\u6267\u884c\u5b8c\u6bd5\u5c31\u7acb\u5373\u56de\u5230\u6700\u4f4e\u9891\u7387\uff1b")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"conservative:\n\u4e0e ondemand \u4e0d\u540c\uff0c\u5e73\u6ed1\u5730\u8c03\u6574 CPU \u9891\u7387\uff0c\u9891\u7387\u7684\u5347\u964d\u662f\u6e10\u53d8\u5f0f\u7684\uff0c\u4f1a\u81ea\u52a8\u5728\u9891\u7387\u4e0a\u4e0b\u9650\u8c03\u6574\uff0c\u548c ondemand \u7684\u533a\u522b\u5728\u4e8e\u5b83\u4f1a\u6309\u9700\u5206\u914d\u9891\u7387\uff0c\u800c\u4e0d\u662f\u4e00\u5473\u8ffd\u6c42\u6700\u9ad8\u9891\u7387\uff1b"))),(0,a.kt)("h3",{id:"\u81ea\u52a8\u6302\u8f7d"},"\u81ea\u52a8\u6302\u8f7d"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"# 100mb \u865a\u62df\u786c\u76d8\nmount tmpfs in /home/trdthg/tmp/\ntmpfs /home/trdthg/tmp tmpfs size=96m 0 0\n\n# 1.\u67e5\u770b\u7535\u8111\u4e2d\u6240\u6709\u786c\u76d8\u7684\u5206\u533a\u60c5\u51b5\u3002\n# \u547d\u4ee4\u5982\u4e0b\uff1a\n# sudo fdisk -l\n# 2.\u7ed3\u679c\u5982\u4e0b\n# /dev/nvme0n1p3    567296  210282495 209715200   100G Microsoft \u57fa\u672c\u6570\u636e\n# /dev/nvme0n1p4 210282496  872337407 662054912 315.7G Microsoft \u57fa\u672c\u6570\u636e\n\n#auto mount windows fs\n/dev/nvme0n1p3 /mnt/C ntfs nls=utf8,umask=000   0   0\n/dev/nvme0n1p4 /mnt/D ntfs nls=utf8,umask=000   0   0\n\n# \u6ce8\uff1a \u672b\u5c3e\u7684 2 \u884c\u662f\u6dfb\u52a0\u7684\u5185\u5bb9\u3002\u5176\u4e2d/dev/nvme0n1p3 \u4e00\u884c\u4ee3\u8868 C \u76d8\u5206\u533a\u5c06\u81ea\u52a8\u6302\u8f7d\u5230/mnt/C \u76ee\u5f55\u4e0b\uff0c\u6587\u4ef6\u7cfb\u7edf\u4e3a NTFS\uff08\u5982\u679c\u6b65\u9aa4 1 \u4e2d\u67e5\u770b\u5206 \u533a\u7684\u6587\u4ef6\u7cfb\u7edf\u4e3a FAT32 \u65f6\uff0c\u6b64\u5904\u8bf7\u5199 vfat\uff09\uff0c\u5b57\u7b26\u7f16\u7801\u4e3a utf8\u3002umask \u8868\u793a\u6587\u4ef6\u76ee\u5f55\u7684\u6743\u9650\uff0c\u6b64\u53c2\u6570\u4ee5\u53ca\u4e4b\u540e\u7684 2 \u4e2a\u53c2\u6570\u90fd\u4e3a 0 \u5373\u53ef\u3002\u4ee5\u4e0b\u51e0\u884c\u4ee5 \u6b64\u7c7b\u63a8\u3002\u6b64\u5904\u53ef\u4ee5\u9009\u62e9\u6027\u7684\u6dfb\u52a0\u9700\u8981\u81ea\u52a8\u6302\u8f7d\u7684\u5206\u533a\uff0c\u4e0d\u60f3\u6302\u8f7d\u7684\u5206\u533a\u4e0d\u7528\u4e66\u5199\u3002\n")),(0,a.kt)("h3",{id:"openssh-serversshd-\u542f\u52a8"},"openssh-server(sshd) \u542f\u52a8"),(0,a.kt)("h3",{id:"openssh"},"OpenSSH"),(0,a.kt)("p",null,"OpenSSH \u53ef\u4ee5\u652f\u6491 Manjaro \u6210\u4e3a SSH Server\uff0c\u4ee5\u4fbf\u5176\u4ed6\u4e3b\u673a\u53ef\u4ee5\u901a\u8fc7 SSH \u8fde\u63a5\u5230 Manjaro\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"# \u5b89\u88c5 OpenSSH\nsudo pacman -S openssh\n# \u5f00\u673a\u81ea\u542f sshd \u670d\u52a1\nsudo systemctl enable sshd\n# \u542f\u52a8 sshd \u670d\u52a1\nsudo systemctl start sshd\n# \u91cd\u542f sshd \u670d\u52a1\nsudo systemctl restart sshd\n")),(0,a.kt)("h2",{id:"git"},"Git"),(0,a.kt)("h3",{id:"\u57fa\u7840\u547d\u4ee4"},"\u57fa\u7840\u547d\u4ee4"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'git init\ngit add -A\ngit commit -m "commit"\ngit push -u origin main\n')),(0,a.kt)("h3",{id:"\u4e0b\u8f7d\u67d0\u4e2a\u6587\u4ef6\u5939"},"\u4e0b\u8f7d\u67d0\u4e2a\u6587\u4ef6\u5939"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"git init\ngit remote add -f origin $url\ngit config core.sparsecheckout true\necho $file_name >> .git/info/sparse-checkout\ngit pull origin master\n")),(0,a.kt)("h2",{id:"\u5f85\u7eed"},"\u5f85\u7eed..."))}d.isMDXComponent=!0}}]);