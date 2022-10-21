"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[9688],{3905:(e,n,t)=>{t.d(n,{Zo:()=>k,kt:()=>N});var a=t(7294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,a,l=function(e,n){if(null==e)return{};var t,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var o=a.createContext({}),m=function(e){var n=a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},k=function(e){var n=m(e.components);return a.createElement(o.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,r=e.originalType,o=e.parentName,k=p(e,["components","mdxType","originalType","parentName"]),d=m(t),N=l,c=d["".concat(o,".").concat(N)]||d[N]||u[N]||r;return t?a.createElement(c,i(i({ref:n},k),{},{components:t})):a.createElement(c,i({ref:n},k))}));function N(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var r=t.length,i=new Array(r);i[0]=d;var p={};for(var o in n)hasOwnProperty.call(n,o)&&(p[o]=n[o]);p.originalType=e,p.mdxType="string"==typeof e?e:l,i[1]=p;for(var m=2;m<r;m++)i[m]=t[m];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},1884:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>p,toc:()=>m});var a=t(7462),l=(t(7294),t(3905));const r={},i="shell \u811a\u672c",p={unversionedId:"draft/bash",id:"draft/bash",title:"shell \u811a\u672c",description:"\u53d8\u91cf",source:"@site/docs/draft/bash.md",sourceDirName:"draft",slug:"/draft/bash",permalink:"/docs/draft/bash",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u5206\u5e03\u5f0f\u7cfb\u7edf",permalink:"/docs/draft/DistributedSystem"},next:{title:"\u5783\u573e\u8f6f\u4ef6",permalink:"/docs/draft/test"}},o={},m=[{value:"\u53d8\u91cf",id:"\u53d8\u91cf",level:2},{value:"\u5b9a\u4e49",id:"\u5b9a\u4e49",level:3},{value:"\u5b57\u7b26\u4e32",id:"\u5b57\u7b26\u4e32",level:3},{value:"\u6570\u7ec4",id:"\u6570\u7ec4",level:3},{value:"\u53c2\u6570",id:"\u53c2\u6570",level:2},{value:"<code>$</code> \u76f8\u5173",id:"-\u76f8\u5173",level:3},{value:"\u8fd0\u7b97\u7b26",id:"\u8fd0\u7b97\u7b26",level:2},{value:"\u7b97\u6570\u8fd0\u7b97\u7b26",id:"\u7b97\u6570\u8fd0\u7b97\u7b26",level:3},{value:"\u5173\u7cfb\u8fd0\u7b97\u7b26",id:"\u5173\u7cfb\u8fd0\u7b97\u7b26",level:3},{value:"\u5e03\u5c14\u8fd0\u7b97\u7b26",id:"\u5e03\u5c14\u8fd0\u7b97\u7b26",level:3},{value:"\u903b\u8f91\u8fd0\u7b97\u7b26",id:"\u903b\u8f91\u8fd0\u7b97\u7b26",level:3},{value:"\u5b57\u7b26\u4e32\u8fd0\u7b97\u7b26",id:"\u5b57\u7b26\u4e32\u8fd0\u7b97\u7b26",level:3},{value:"\u6587\u4ef6\u6d4b\u8bd5\u8fd0\u7b97\u7b26",id:"\u6587\u4ef6\u6d4b\u8bd5\u8fd0\u7b97\u7b26",level:3},{value:"\u6d41\u7a0b\u63a7\u5236",id:"\u6d41\u7a0b\u63a7\u5236",level:2},{value:"if",id:"if",level:3},{value:"for \u5faa\u73af",id:"for-\u5faa\u73af",level:3},{value:"while",id:"while",level:3},{value:"\u65e0\u9650\u5faa\u73af",id:"\u65e0\u9650\u5faa\u73af",level:3},{value:"until \u5faa\u73af",id:"until-\u5faa\u73af",level:3},{value:"case \u8bed\u53e5",id:"case-\u8bed\u53e5",level:3},{value:"\u51fd\u6570",id:"\u51fd\u6570",level:2},{value:"\u91cd\u5b9a\u5411",id:"\u91cd\u5b9a\u5411",level:2},{value:"import",id:"import",level:2},{value:"\u5176\u4ed6",id:"\u5176\u4ed6",level:2},{value:"echo",id:"echo",level:3},{value:"test",id:"test",level:3},{value:"\u6ce8\u91ca",id:"\u6ce8\u91ca",level:3}],k={toc:m};function u(e){let{components:n,...t}=e;return(0,l.kt)("wrapper",(0,a.Z)({},k,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"shell-\u811a\u672c"},"shell \u811a\u672c"),(0,l.kt)("h2",{id:"\u53d8\u91cf"},"\u53d8\u91cf"),(0,l.kt)("h3",{id:"\u5b9a\u4e49"},"\u5b9a\u4e49"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'# \u666e\u901a\u53d8\u91cf\nmyUrl="abcd"\n\n# \u53ea\u8bfb\u53d8\u91cf\nreadonly myUrl="abcd"\n')),(0,l.kt)("p",null,"\u6ce8\u610f\u4e8b\u9879"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u53d8\u91cf\u5b9a\u4e49\u7684\u7b49\u53f7\u4e24\u8fb9",(0,l.kt)("strong",{parentName:"li"},"\u4e0d\u80fd\u6709\u7a7a\u683c")),(0,l.kt)("li",{parentName:"ul"},"\u4f7f\u7528\u53d8\u91cf\u65f6 \u53d8\u91cf\u540d\u5916\u9762\u7684\u82b1\u62ec\u53f7\u662f\u53ef\u9009\u7684",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'for skill in Ada Coffee Action Java; do\n  echo "I am good at ${skill}Script"\ndone\n'))),(0,l.kt)("li",{parentName:"ul"},"\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"li"},"unset")," \u5220\u9664\u53d8\u91cf")),(0,l.kt)("h3",{id:"\u5b57\u7b26\u4e32"},"\u5b57\u7b26\u4e32"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u83b7\u53d6\u957f\u5ea6")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'echo "length: ${#myUrl}"\n')),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u83b7\u53d6\u5207\u7247")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'echo "length: ${myUrl:1:4}"\n')),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u7b2c\u4e00\u6b21\u51fa\u73b0\u7684\u7d22\u5f15")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'string="runoob is a great site"\necho `expr index "$string" r`  # \u8f93\u51fa 1\necho `expr index "$string" u`  # \u8f93\u51fa 2\necho `expr index "$string" un`  # \u8f93\u51fa 2\n')),(0,l.kt)("h3",{id:"\u6570\u7ec4"},"\u6570\u7ec4"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"array=(value0 garabe value2 value3)\narray[1]=value1\n\necho ${array[1]}\necho ${array[@]} # \u8bfb\u53d6\u6240\u6709\n\n# \u8bfb\u53d6\u957f\u5ea6\nlength=${#array_name[@]}\n# \u6216\u8005\nlength=${#array_name[*]}\n")),(0,l.kt)("p",null,"bash \u91cc\u7684\u6570\u7ec4\u548c\u5b57\u5178\u8f83\u4e3a\u7c7b\u4f3c\uff0c\u5982\u679c\u4e0d\u6307\u5b9a\uff0c\u90a3\u4e48\u6bcf\u4e2a\u5143\u7d20\u5bf9\u5e94\u7684\u952e\u5c31\u662f\u7d22\u5f15"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'dict=()\n# declare dict\n# declare -A dict\ndict["a"]=1\necho ${dict["a"]}\n# 1\n')),(0,l.kt)("h2",{id:"\u53c2\u6570"},"\u53c2\u6570"),(0,l.kt)("h3",{id:"-\u76f8\u5173"},(0,l.kt)("inlineCode",{parentName:"h3"},"$")," \u76f8\u5173"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u53c2\u6570\u76f8\u5173")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"strong"},"$#")),":\u4f20\u9012\u5230\u811a\u672c\u7684\u53c2\u6570\u4e2a\u6570")),(0,l.kt)("p",null,"\u4e0b\u9762\u4e24\u4e2a\u5e38\u7528\u6765\u904d\u5386\u6240\u6709\u53c2\u6570"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},(0,l.kt)("inlineCode",{parentName:"strong"},"$@")),":\t\u4e0e ",(0,l.kt)("strong",{parentName:"p"},(0,l.kt)("inlineCode",{parentName:"strong"},"$*"))," \u76f8\u540c\uff0c\u4f46\u662f\u4f7f\u7528\u65f6\u52a0\u5f15\u53f7\uff0c\u5e76\u5728\u5f15\u53f7\u4e2d\u8fd4\u56de\u6bcf\u4e2a\u53c2\u6570\u3002"),(0,l.kt)("p",{parentName:"li"},"\u5982 ",(0,l.kt)("inlineCode",{parentName:"p"},"$@")," \u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},'\u300c"\u300d')," \u62ec\u8d77\u6765\u7684\u60c5\u51b5\u3001\u4ee5 ",(0,l.kt)("inlineCode",{parentName:"p"},'"$1" "$2" \u2026 "$n"')," \u7684\u5f62\u5f0f\u8f93\u51fa\u6240\u6709\u53c2\u6570\u3002"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'for i in "$*"; do\n    echo $i\ndone\n# 1 2 3\n\nfor i in "$@"; do\n    echo $i\ndone\n\n# 1\n# 2\n# 3\n'))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"$_"),":\t\u62fc\u63a5\u6240\u6709\u53c2\u6570\u5e76\u8fd4\u56de\u3002"),(0,l.kt)("p",{parentName:"li"},"\u5982 ",(0,l.kt)("inlineCode",{parentName:"p"},"$_")," \u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},'\u300c"\u300d')," \u62ec\u8d77\u6765\u7684\u60c5\u51b5\u3001\u4ee5 ",(0,l.kt)("inlineCode",{parentName:"p"},'"$1 $2 \u2026 $n"')," \u7684\u5f62\u5f0f\u8f93\u51fa\u6240\u6709\u53c2\u6570\u3002"))),(0,l.kt)("ol",{start:2},(0,l.kt)("li",{parentName:"ol"},"\u8fdb\u7a0b ID \u76f8\u5173")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"$$"),":\t\u811a\u672c\u8fd0\u884c\u7684\u5f53\u524d\u8fdb\u7a0b ID \u53f7"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"$!"),":\t\u540e\u53f0\u8fd0\u884c\u7684\u6700\u540e\u4e00\u4e2a\u8fdb\u7a0b\u7684 ID \u53f7"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"$-"),":\t\u663e\u793a Shell \u4f7f\u7528\u7684\u5f53\u524d\u9009\u9879\uff0c\u4e0e set \u547d\u4ee4\u529f\u80fd\u76f8\u540c\u3002"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"$?"),":\t\u663e\u793a\u6700\u540e\u547d\u4ee4\u7684\u9000\u51fa\u72b6\u6001\u30020 \u8868\u793a\u6ca1\u6709\u9519\u8bef\uff0c\u5176\u4ed6\u4efb\u4f55\u503c\u8868\u660e\u6709\u9519\u8bef\u3002")),(0,l.kt)("h2",{id:"\u8fd0\u7b97\u7b26"},"\u8fd0\u7b97\u7b26"),(0,l.kt)("p",null,"\u539f\u751f bash \u4e0d\u652f\u6301\u6570\u5b66\u8fd0\u7b97\uff0c\u4f46\u662f\u53ef\u4ee5\u901a\u8fc7\u5176\u4ed6\u547d\u4ee4\u5b9e\u73b0\uff0c\u4f8b\u5982 awk \u548c expr"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'val=`expr 2 + 2`\necho "\u4e24\u6570\u4e4b\u548c\u4e3a : $val"\n')),(0,l.kt)("h3",{id:"\u7b97\u6570\u8fd0\u7b97\u7b26"},"\u7b97\u6570\u8fd0\u7b97\u7b26"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"+ - * / % = == !=")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u6ce8\u610f :")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u8868\u8fbe\u5f0f\u548c\u8fd0\u7b97\u7b26\u4e4b\u95f4\u5fc5\u987b\u6709\u7a7a\u683c"),(0,l.kt)("li",{parentName:"ul"},"\u8868\u8fbe\u5f0f\u5fc5\u987b\u8981\u88ab `` \u5305\u542b"),(0,l.kt)("li",{parentName:"ul"},"\u6ce8\u610f\u8981\u8f6c\u4e49 ",(0,l.kt)("inlineCode",{parentName:"li"},"*")," \u53f7",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'val=`expr $a \\* $b`\necho "a * b : $val"\n')),(0,l.kt)("blockquote",{parentName:"li"},(0,l.kt)("p",{parentName:"blockquote"},'\u5728 MAC \u4e2d shell \u7684 expr \u8bed\u6cd5\u662f\uff1a$((\u8868\u8fbe\u5f0f))\uff0c\u6b64\u5904\u8868\u8fbe\u5f0f\u4e2d\u7684 "*" \u4e0d\u9700\u8981\u8f6c\u4e49\u7b26\u53f7 "\\" \u3002'))),(0,l.kt)("li",{parentName:"ul"},"\u5224\u65ad\u7684\u4e2d\u62ec\u53f7\u4e24\u4fa7\u5fc5\u987b\u6709\u7a7a\u683c",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'if [ $a == $b ]\nthen\n  echo "a \u7b49\u4e8e b"\nfi\nif [ $a != $b ]\nthen\n  echo "a \u4e0d\u7b49\u4e8e b"\nfi\n')))),(0,l.kt)("h3",{id:"\u5173\u7cfb\u8fd0\u7b97\u7b26"},"\u5173\u7cfb\u8fd0\u7b97\u7b26"),(0,l.kt)("p",null,"\u5173\u7cfb\u8fd0\u7b97\u7b26\u53ea\u652f\u6301\u6570\u5b57\uff0c\u4e0d\u652f\u6301\u5b57\u7b26\u4e32\uff0c\u9664\u975e\u5b57\u7b26\u4e32\u7684\u503c\u662f\u6570\u5b57\u3002"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"-eq -ne -gt -lt -ge -le")),(0,l.kt)("h3",{id:"\u5e03\u5c14\u8fd0\u7b97\u7b26"},"\u5e03\u5c14\u8fd0\u7b97\u7b26"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"! (\u975e)  -o (\u6216)  -a (\u4e0e)")),(0,l.kt)("h3",{id:"\u903b\u8f91\u8fd0\u7b97\u7b26"},"\u903b\u8f91\u8fd0\u7b97\u7b26"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"&& ||")),(0,l.kt)("h3",{id:"\u5b57\u7b26\u4e32\u8fd0\u7b97\u7b26"},"\u5b57\u7b26\u4e32\u8fd0\u7b97\u7b26"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"=="),": \u76f8\u7b49")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"!="),": \u4e0d\u76f8\u7b49")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"$"),": \u5b57\u7b26\u4e32\u662f\u5426\u4e0d\u4e3a\u7a7a"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"if [ $a ]\n"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"-z"),": \u957f\u5ea6\u662f\u5426\u4e3a 0"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"if [ -z $a ]\n"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"-n"),": \u957f\u5ea6\u662f\u5426\u4e0d\u4e3a 0"))),(0,l.kt)("h3",{id:"\u6587\u4ef6\u6d4b\u8bd5\u8fd0\u7b97\u7b26"},"\u6587\u4ef6\u6d4b\u8bd5\u8fd0\u7b97\u7b26"),(0,l.kt)("p",null,"\u5e38\u7528"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"-e"),": \u68c0\u6d4b\u6587\u4ef6\uff08\u5305\u62ec\u76ee\u5f55\uff09\u662f\u5426\u5b58\u5728")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"-s"),":\t\u68c0\u6d4b\u6587\u4ef6\u662f\u5426\u4e3a\u7a7a\uff08\u6587\u4ef6\u5927\u5c0f\u662f\u5426\u5927\u4e8e 0\uff09")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"-f"),": \u68c0\u6d4b\u6587\u4ef6\u662f\u5426\u662f\u666e\u901a\u6587\u4ef6\uff08\u65e2\u4e0d\u662f\u76ee\u5f55\uff0c\u4e5f\u4e0d\u662f\u8bbe\u5907\u6587\u4ef6\uff09")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"-d"),": \u68c0\u6d4b\u6587\u4ef6\u662f\u5426\u662f\u76ee\u5f55")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"-r"),": \u68c0\u6d4b\u6587\u4ef6\u662f\u5426\u53ef\u8bfb")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"-w"),": \u68c0\u6d4b\u6587\u4ef6\u662f\u5426\u53ef\u5199")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"-x"),": \u68c0\u6d4b\u6587\u4ef6\u662f\u5426\u53ef\u6267\u884c"))),(0,l.kt)("p",null,"\u5176\u4ed6"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"-b"),": \u68c0\u6d4b\u6587\u4ef6\u662f\u5426\u662f\u5757\u8bbe\u5907\u6587\u4ef6"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"-c"),": \u68c0\u6d4b\u6587\u4ef6\u662f\u5426\u662f\u5b57\u7b26\u8bbe\u5907\u6587\u4ef6"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"-g"),": \u68c0\u6d4b\u6587\u4ef6\u662f\u5426\u8bbe\u7f6e\u4e86 SGID \u4f4d"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"-k"),": \u68c0\u6d4b\u6587\u4ef6\u662f\u5426\u8bbe\u7f6e\u4e86\u7c98\u7740\u4f4d (Sticky Bit)"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"-p"),": \u68c0\u6d4b\u6587\u4ef6\u662f\u5426\u662f\u6709\u540d\u7ba1\u9053"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"-u"),": \u68c0\u6d4b\u6587\u4ef6\u662f\u5426\u8bbe\u7f6e\u4e86 SUID \u4f4d"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"-S"),": \u5224\u65ad\u67d0\u6587\u4ef6\u662f\u5426 socket\u3002"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"-L"),": \u68c0\u6d4b\u6587\u4ef6\u662f\u5426\u5b58\u5728\u5e76\u4e14\u662f\u4e00\u4e2a\u7b26\u53f7\u94fe\u63a5\u3002")),(0,l.kt)("h2",{id:"\u6d41\u7a0b\u63a7\u5236"},"\u6d41\u7a0b\u63a7\u5236"),(0,l.kt)("h3",{id:"if"},"if"),(0,l.kt)("p",null,"if \u8bed\u53e5\u8bed\u6cd5\u683c\u5f0f\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'if [ "$a" -gt "$b" ]; then\n    command1\nelif (( a > b )); then\n    command2\nelse\n    commandN\nfi\n')),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"if else \u7684 ",(0,l.kt)("inlineCode",{parentName:"li"},"[...]")," \u5224\u65ad\u8bed\u53e5\u4e2d\u5927\u4e8e\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"li"},"-gt"),"\uff0c\u5c0f\u4e8e\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"li"},"-lt"),"\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u5982\u679c\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"li"},"((...))")," \u4f5c\u4e3a\u5224\u65ad\u8bed\u53e5\uff0c\u5927\u4e8e\u548c\u5c0f\u4e8e\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"li"},">")," \u548c ",(0,l.kt)("inlineCode",{parentName:"li"},"<"),"\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u4e5f\u53ef\u4ee5\u4f7f\u7528 test")),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff1a\u6240\u6709\u5206\u652f\u90fd\u4e0d\u80fd\u4e3a\u7a7a")),(0,l.kt)("p",null,"\u5199\u6210\u4e00\u884c\uff08\u9002\u7528\u4e8e\u7ec8\u7aef\u547d\u4ee4\u63d0\u793a\u7b26\uff09\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'if [ $(ps -ef | grep -c "ssh") -gt 1 ]; then echo "true"; fi\n')),(0,l.kt)("h3",{id:"for-\u5faa\u73af"},"for \u5faa\u73af"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"for var in item1 item2 ... itemN\ndo\n    command1\n    command2\n    ...\n    commandN\ndone\n")),(0,l.kt)("p",null,"\u5199\u6210\u4e00\u884c\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"for var in item1 item2 ... itemN; do command1; command2\u2026 done;\n")),(0,l.kt)("p",null,"\u652f\u6301 break \u548c continue \u8bed\u53e5"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'while : # \u65e0\u9650\u5faa\u73af\ndo\n    echo -n "\u8f93\u5165 1 \u5230 5 \u4e4b\u95f4\u7684\u6570\u5b57:"\n    read aNum # \u83b7\u53d6\u7528\u6237\u8f93\u5165\n    case $aNum in\n        # \u53ef\u4ee5\u5339\u914d\u591a\u4e2a\u6a21\u5f0f\n        1|2|3|4|5) echo "\u4f60\u8f93\u5165\u7684\u6570\u5b57\u4e3a $aNum!"\n        ;;\n        *) echo "\u4f60\u8f93\u5165\u7684\u6570\u5b57\u4e0d\u662f 1 \u5230 5 \u4e4b\u95f4\u7684! \u6e38\u620f\u7ed3\u675f"\n            break\n        ;;\n    esac\ndone\n')),(0,l.kt)("p",null,"\u793a\u4f8b"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'for loop in 1 2 3 4 5\ndo\n    echo "The value is: $loop"\ndone\n\nfor str in This is a string\ndo\n    echo $str\ndone\n')),(0,l.kt)("h3",{id:"while"},"while"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'int=1\nwhile(( $int<=5 ))\ndo\n    echo $int\n    let "int++"\ndone\n')),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"let \u547d\u4ee4\uff0c\u5b83\u7528\u4e8e\u6267\u884c\u4e00\u4e2a\u6216\u591a\u4e2a\u8868\u8fbe\u5f0f\uff0c\u53d8\u91cf\u8ba1\u7b97\u4e2d\u4e0d\u9700\u8981\u52a0\u4e0a $ \u6765\u8868\u793a\u53d8\u91cf")),(0,l.kt)("h3",{id:"\u65e0\u9650\u5faa\u73af"},"\u65e0\u9650\u5faa\u73af"),(0,l.kt)("p",null,"\u65e0\u9650\u5faa\u73af\u8bed\u6cd5\u683c\u5f0f\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"while :\ndo\n    command\ndone\n")),(0,l.kt)("p",null,"\u6216\u8005"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"while true\ndo\n    command\ndone\n")),(0,l.kt)("p",null,"\u6216\u8005"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"for (( ; ; ))\n")),(0,l.kt)("h3",{id:"until-\u5faa\u73af"},"until \u5faa\u73af"),(0,l.kt)("p",null,"until \u5faa\u73af\u6267\u884c\u4e00\u7cfb\u5217\u547d\u4ee4\u76f4\u81f3\u6761\u4ef6\u4e3a true \u65f6\u505c\u6b62\u3002"),(0,l.kt)("p",null,"\u4e0e while \u5faa\u73af\u5728\u5904\u7406\u65b9\u5f0f\u4e0a\u521a\u597d\u76f8\u53cd\u3002"),(0,l.kt)("p",null,"until \u8bed\u6cd5\u683c\u5f0f\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"until condition\ndo\n  command\ndone\n")),(0,l.kt)("p",null,"\u8f93\u51fa 0-9"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"a=0\n\nuntil [ ! $a -lt 10 ]\ndo\n   echo $a\n   a=`expr $a + 1`\ndone\n")),(0,l.kt)("h3",{id:"case-\u8bed\u53e5"},"case \u8bed\u53e5"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},";;"),": \u8868\u793a break"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"*"),": \u5982\u679c\u6ca1\u6709\u5339\u914d\u5c31\u4f1a\u8d70 ",(0,l.kt)("inlineCode",{parentName:"li"},"*"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"aNum=1\ncase $aNum in\n    1|2)  echo '\u4f60\u9009\u62e9\u4e86 1'\n    ;;\n    2)  echo '\u4f60\u9009\u62e9\u4e86 2'\n    ;;\n    3)  echo '\u4f60\u9009\u62e9\u4e86 3'\n    ;;\n    4)  echo '\u4f60\u9009\u62e9\u4e86 4'\n    ;;\n    *)  echo '\u4f60\u6ca1\u6709\u8f93\u5165 1 \u5230 4 \u4e4b\u95f4\u7684\u6570\u5b57'\n    ;;\nesac\n")),(0,l.kt)("h2",{id:"\u51fd\u6570"},"\u51fd\u6570"),(0,l.kt)("p",null,"bash \u7684\u51fd\u6570\u7c7b\u4f3c\u4e8e\u8fdb\u7a0b"),(0,l.kt)("p",null,"\u53c2\u6570\u4f20\u9012\u76f4\u63a5\u8ddf\u5728\u51fd\u6570\u540d\u4e4b\u540e\uff0c\u53c2\u6570\u83b7\u53d6\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"$")," \u83b7\u53d6"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'funWithParam(){\n    echo "\u7b2c\u4e00\u4e2a\u53c2\u6570\u4e3a $1 !"\n    echo "\u7b2c\u4e8c\u4e2a\u53c2\u6570\u4e3a $2 !"\n    echo "\u7b2c\u5341\u4e2a\u53c2\u6570\u4e3a $10 !"\n    echo "\u7b2c\u5341\u4e2a\u53c2\u6570\u4e3a ${10} !"\n    echo "\u7b2c\u5341\u4e00\u4e2a\u53c2\u6570\u4e3a ${11} !"\n    echo "\u53c2\u6570\u603b\u6570\u6709 $# \u4e2a!"\n    echo "\u4f5c\u4e3a\u4e00\u4e2a\u5b57\u7b26\u4e32\u8f93\u51fa\u6240\u6709\u53c2\u6570 $* !"\n}\nfunWithParam 1 2 3 4 5 6 7 8 9 34 73\n')),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u8fd4\u56de\u503c\u53ef\u9009 return\uff0c\u5982\u679c\u4e0d\u52a0 return\uff0c\u4f1a\u4ee5\u6700\u540e\u4e00\u6761\u547d\u4ee4\u7684\u8fd4\u56de\u503c\u4f5c\u4e3a\u8fd4\u56de\u503c\u3002")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u547d\u4ee4\u7684\u8fd4\u56de\u503c\u4ec5\u4ec5\u8868\u793a\u662f\u5426\u51fa\u9519\uff0c\u8fd4\u56de\u503c\u4e3a 0 \u5c31\u662f\u6210\u529f\uff0c\u5176\u4ed6\u503c\u4e3a\u51fa\u9519"),(0,l.kt)("blockquote",{parentName:"li"},(0,l.kt)("p",{parentName:"blockquote"},"\u8981\u6ce8\u610f\u7684\u662f\uff0c\u548c C \u8bed\u8a00\u4e0d\u540c\uff0cshell \u8bed\u8a00\u4e2d 0 \u4ee3\u8868 true\uff0c0 \u4ee5\u5916\u7684\u503c\u4ee3\u8868 false\u3002"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5fc5\u987b\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"$?")," \u62ff\u5230\u771f\u6b63\u7684\u8fd4\u56de\u503c"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'function demoFun2(){\n echo "\u8fd9\u662f\u6211\u7684\u7b2c\u4e8c\u4e2a shell \u51fd\u6570!"\n expr 1 + 1\n}\n\ndemoFun2\necho $?\n')),(0,l.kt)("h2",{id:"\u91cd\u5b9a\u5411"},"\u91cd\u5b9a\u5411"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5c06 stdout \u91cd\u5b9a\u5411\u5230 file\uff1a",(0,l.kt)("inlineCode",{parentName:"p"},"command > file"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5c06 stdin \u91cd\u5b9a\u5411\u5230 file\uff1a",(0,l.kt)("inlineCode",{parentName:"p"},"command < file"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"stderr \u91cd\u5b9a\u5411\u5230 file\uff1a ",(0,l.kt)("inlineCode",{parentName:"p"},"command 2>file")),(0,l.kt)("blockquote",{parentName:"li"},(0,l.kt)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff1a\u8fd9\u91cc\u7684 2 \u548c > \u4e4b\u95f4\u4e0d\u53ef\u4ee5\u6709\u7a7a\u683c\uff0c2> \u662f\u4e00\u4f53\u7684\u65f6\u5019\u624d\u8868\u793a\u9519\u8bef\u8f93\u51fa\u3002"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"stderr ",(0,l.kt)("strong",{parentName:"p"},"\u8ffd\u52a0"),"\u5230 file \u6587\u4ef6\u672b\u5c3e\uff1a",(0,l.kt)("inlineCode",{parentName:"p"},"command 2>>file"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5c06 stdout \u548c stderr \u5408\u5e76\u540e\u91cd\u5b9a\u5411\u5230 file: ",(0,l.kt)("inlineCode",{parentName:"p"},"command > file 2>&1")," \u6216 ",(0,l.kt)("inlineCode",{parentName:"p"},"command >> file 2>&1"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5bf9 stdin \u548c stdout \u90fd\u91cd\u5b9a\u5411\uff1a",(0,l.kt)("inlineCode",{parentName:"p"},"command < file1 >file2")),(0,l.kt)("p",{parentName:"li"},"command \u547d\u4ee4\u5c06 stdin \u91cd\u5b9a\u5411\u5230 file1\uff0c\u5c06 stdout \u91cd\u5b9a\u5411\u5230 file2\u3002"))),(0,l.kt)("p",null,"\u6267\u884c\u67d0\u4e2a\u547d\u4ee4\uff0c\u4f46\u4e0d\u5728\u5c4f\u5e55\u4e0a\u663e\u793a\u8f93\u51fa\u7ed3\u679c\uff0c\u90a3\u4e48\u53ef\u4ee5\u5c06\u8f93\u51fa\u91cd\u5b9a\u5411\u5230 ",(0,l.kt)("em",{parentName:"p"},"/dev/null"),"\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"command > /dev/null\n")),(0,l.kt)("p",null,"/dev/null \u662f\u4e00\u4e2a\u7279\u6b8a\u7684\u6587\u4ef6\uff0c\u5199\u5165\u5230\u5b83\u7684\u5185\u5bb9\u90fd\u4f1a\u88ab\u4e22\u5f03\u3002\u5982\u679c\u5c1d\u8bd5\u4ece\u8be5\u6587\u4ef6\u8bfb\u53d6\u5185\u5bb9\uff0c\u90a3\u4e48\u4ec0\u4e48\u4e5f\u8bfb\u4e0d\u5230\u3002"),(0,l.kt)("p",null,'\u5c06\u547d\u4ee4\u7684\u8f93\u51fa\u91cd\u5b9a\u5411\u5230\u5b83\uff0c\u4f1a\u8d77\u5230"\u7981\u6b62\u8f93\u51fa"\u7684\u6548\u679c\u3002\u5982\u679c\u5e0c\u671b\u5c4f\u853d stdout \u548c stderr\uff0c\u53ef\u4ee5\u8fd9\u6837\u5199\uff1a'),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"command > /dev/null 2>&1\n")),(0,l.kt)("h2",{id:"import"},"import"),(0,l.kt)("p",null,"Shell \u4e5f\u53ef\u4ee5\u5305\u542b\u5916\u90e8\u811a\u672c"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"#\u4f7f\u7528 . \u53f7\u6765\u5f15\u7528test1.sh \u6587\u4ef6\n. ./test1.sh\n\n# \u6216\u8005\u4f7f\u7528\u4ee5\u4e0b\u5305\u542b\u6587\u4ef6\u4ee3\u7801\n# source ./test1.sh\n")),(0,l.kt)("h2",{id:"\u5176\u4ed6"},"\u5176\u4ed6"),(0,l.kt)("h3",{id:"echo"},"echo"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u6267\u884c\u547d\u4ee4\uff08\u53cd\u5f15\u53f7\uff09"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"echo `date`\n"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u7ed3\u679c\u91cd\u5b9a\u5411"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'echo "It is a test" > myfile\n'))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u539f\u6837\u8f93\u51fa\u5b57\u7b26\u4e32\uff0c\u4e0d\u8fdb\u884c\u8f6c\u4e49\u6216\u53d6\u53d8\u91cf (\u7528\u5355\u5f15\u53f7)"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"echo '$name\\\"'\n"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"-e")," \u5f00\u542f\u8f6c\u4e49"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-sh"},'echo -e "OK! \\n" # -e \u5f00\u542f\u8f6c\u4e49 \\n \u6362\u884c\n\necho -e "OK! \\c" # -e \u5f00\u542f\u8f6c\u4e49 \\c \u4e0d\u6362\u884c\n')))),(0,l.kt)("h3",{id:"test"},"test"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"if [ $a == $b ]\n\nif test $a == $b\n")),(0,l.kt)("h3",{id:"\u6ce8\u91ca"},"\u6ce8\u91ca"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"SomeThing")," \u53ef\u4ee5\u662f\u4efb\u4f55\u4e1c\u897f"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},":<<SomeThing\n\u6ce8\u91ca\u5185\u5bb9...\n\u6ce8\u91ca\u5185\u5bb9...\n\u6ce8\u91ca\u5185\u5bb9...\nSomeThing\n")))}u.isMDXComponent=!0}}]);