"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[796],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var u=r.createContext({}),o=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=o(e.components);return r.createElement(u.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,a=e.originalType,u=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),s=o(n),k=l,d=s["".concat(u,".").concat(k)]||s[k]||m[k]||a;return n?r.createElement(d,i(i({ref:t},c),{},{components:n})):r.createElement(d,i({ref:t},c))}));function k(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=n.length,i=new Array(a);i[0]=s;var p={};for(var u in t)hasOwnProperty.call(t,u)&&(p[u]=t[u]);p.originalType=e,p.mdxType="string"==typeof e?e:l,i[1]=p;for(var o=2;o<a;o++)i[o]=n[o];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},9832:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>p,toc:()=>o});var r=n(7462),l=(n(7294),n(3905));const a={},i="vim",p={unversionedId:"other/vim",id:"other/vim",title:"vim",description:"1. \u6279\u91cf\u6ce8\u91ca\u4e0e\u53cd\u6ce8\u91ca",source:"@site/docs/other/vim.md",sourceDirName:"other",slug:"/other/vim",permalink:"/docs/other/vim",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u5173\u4e8e\u672c\u7f51\u7ad9",permalink:"/docs/other/this_page"},next:{title:"\u5b9e\u73b0\u4e00\u4e2a mini-bundle",permalink:"/docs/projects/mini_bundle"}},u={},o=[{value:"1. \u6279\u91cf\u6ce8\u91ca\u4e0e\u53cd\u6ce8\u91ca",id:"1-\u6279\u91cf\u6ce8\u91ca\u4e0e\u53cd\u6ce8\u91ca",level:2},{value:"1.1 \u5757\u9009\u62e9\u6a21\u5f0f",id:"11-\u5757\u9009\u62e9\u6a21\u5f0f",level:3},{value:"1.2 \u66ff\u6362\u547d\u4ee4",id:"12-\u66ff\u6362\u547d\u4ee4",level:3},{value:"2. \u590d\u5236\u7c98\u8d34",id:"2-\u590d\u5236\u7c98\u8d34",level:2},{value:"3. \u683c\u5f0f\u5316",id:"3-\u683c\u5f0f\u5316",level:2},{value:"4. \u6279\u91cf\u66ff\u6362",id:"4-\u6279\u91cf\u66ff\u6362",level:4},{value:"5. \u67e5\u8be2\u5173\u952e\u5b57",id:"5-\u67e5\u8be2\u5173\u952e\u5b57",level:3}],c={toc:o};function m(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"vim"},"vim"),(0,l.kt)("h2",{id:"1-\u6279\u91cf\u6ce8\u91ca\u4e0e\u53cd\u6ce8\u91ca"},"1. \u6279\u91cf\u6ce8\u91ca\u4e0e\u53cd\u6ce8\u91ca"),(0,l.kt)("p",null,"\u5728\u4f7f\u7528 vim \u7f16\u5199\u4ee3\u7801\u7684\u65f6\u5019\uff0c\u7ecf\u5e38\u9700\u8981\u7528\u5230\u6279\u91cf\u6ce8\u91ca\u4e0e\u53cd\u6ce8\u91ca\u4e00\u6bb5\u4ee3\u7801\u3002\u4e0b\u9762\u7b80\u8981\u4ecb\u7ecd\u5176\u64cd\u4f5c\u3002"),(0,l.kt)("h3",{id:"11-\u5757\u9009\u62e9\u6a21\u5f0f"},"1.1 \u5757\u9009\u62e9\u6a21\u5f0f"),(0,l.kt)("p",null,"\u63d2\u5165\u6ce8\u91ca\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u7528 v \u8fdb\u5165 virtual \u6a21\u5f0f")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u7528\u4e0a\u4e0b\u952e\u9009\u4e2d\u9700\u8981\u6ce8\u91ca\u7684\u884c\u6570")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u6309 Control+v\uff08win \u4e0b\u9762 ctrl+q\uff09\u8fdb\u5165\u5217\u6a21\u5f0f")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},'\u6309\u5927\u4e9b\u201cI\u201d\u8fdb\u5165\u63d2\u5165\u6a21\u5f0f\uff0c\u8f93\u5165\u6ce8\u91ca\u7b26\u201c#\u201d\u6216\u8005\u662f"//"\uff0c\u7136\u540e\u7acb\u523b\u6309\u4e0b ESC\uff08\u4e24\u4e0b\uff09'))),(0,l.kt)("p",null,"\u53d6\u6d88\u6ce8\u91ca\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Ctrl + v \u8fdb\u5165\u5757\u9009\u62e9\u6a21\u5f0f\uff0c\u9009\u4e2d\u4f60\u8981\u5220\u9664\u7684\u884c\u9996\u7684\u6ce8\u91ca\u7b26\u53f7\uff0c\u6ce8\u610f// \u8981\u9009\u4e2d\u4e24\u4e2a\uff0c\u9009\u597d\u4e4b\u540e\u6309 d \u5373\u53ef\u5220\u9664\u6ce8\u91ca")),(0,l.kt)("h3",{id:"12-\u66ff\u6362\u547d\u4ee4"},"1.2 \u66ff\u6362\u547d\u4ee4"),(0,l.kt)("p",null,"\u6279\u91cf\u6ce8\u91ca\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},":\u8d77\u59cb\u884c\u53f7\uff0c\u7ed3\u675f\u884c\u53f7 s/^/\u6ce8\u91ca\u7b26/g")),(0,l.kt)("p",null,"\u53d6\u6d88\u6ce8\u91ca\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},":\u8d77\u59cb\u884c\u53f7\uff0c\u7ed3\u675f\u884c\u53f7 s/^\u6ce8\u91ca\u7b26//g")),(0,l.kt)("p",null,"\u5b9e\u4f8b\u6f14\u793a\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"\u5728 27 - 30 \u884c\u6dfb\u52a0 // \u6ce8\u91ca\n:27,30s#^#//#g\n\n\u5728 27 - 30 \u884c\u5220\u9664 // \u6ce8\u91ca\n:27,30s#^//##g\n\n\u5728 10 - 20 \u884c\u6dfb\u52a0 # \u6ce8\u91ca\n:10,20s/^/#/g\n\n\u5728 10 - 20 \u884c\u5220\u9664 # \u6ce8\u91ca\n:10,20s/^/#/g\n")),(0,l.kt)("p",null,"\u6ce8\u610f\u4f8b\u5b50\u4e2d\u6b63\u5219\u7684\u5206\u5272\u7b26\u4f7f\u7528\u7684\u662f\u76f8\u53cd\u7684\u7b26\u53f7\uff0c\u5982\u679c\u5339\u914d// \u90a3\u4e48\u4f7f\u7528 #\u4f5c\u5206\u9694\u7b26\u8fd9\u6837\u4e0d\u9700\u8981\u5bf9/\u4f5c\u8f6c\u4e49\u5904\u7406\uff0c\u8282\u7701\u8f93\u5165\u6b21\u6570\u3002"),(0,l.kt)("h2",{id:"2-\u590d\u5236\u7c98\u8d34"},"2. \u590d\u5236\u7c98\u8d34"),(0,l.kt)("p",null,"Vim \u4e2d\u5982\u4f55\u5168\u9009\u5e76\u590d\u5236\uff1f\uff08\u533a\u5206\u5927\u5c0f\u5199\uff01\uff01\uff01\uff09"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5168\u90e8\u5220\u9664\uff1a\u6309 esc \u952e\u540e\uff0c\u5148\u6309 gg\uff08\u5230\u8fbe\u9876\u90e8\uff09\uff0c\u7136\u540e dG"),(0,l.kt)("li",{parentName:"ul"},"\u5168\u90e8\u590d\u5236\uff1a\u6309 esc \u952e\u540e\uff0c\u5148\u6309 gg\uff0c\u7136\u540e ggyG"),(0,l.kt)("li",{parentName:"ul"},"\u5168\u9009\u9ad8\u4eae\u663e\u793a\uff1a\u6309 esc \u952e\u540e\uff0c\u5148\u6309 gg\uff0c\u7136\u540e ggvG \u6216\u8005 ggVG"),(0,l.kt)("li",{parentName:"ul"},"\u5355\u884c\u590d\u5236\uff1a\u6309 esc \u952e\u540e\uff0c\u7136\u540e yy"),(0,l.kt)("li",{parentName:"ul"},"\u5355\u884c\u5220\u9664\uff1a\u6309 esc \u952e\u540e\uff0c\u7136\u540e dd"),(0,l.kt)("li",{parentName:"ul"},"\u7c98\u8d34\uff1a\u6309 esc \u952e\u540e\uff0c\u7136\u540e p")),(0,l.kt)("p",null,"vim \u53ea\u80fd\u7c98\u8d34 50 \u884c\u7684\u95ee\u9898\uff1a"),(0,l.kt)("p",null,"\u5728\u5f53\u524d\u7528\u6237\u4e3b\u76ee\u5f55\uff08~\uff09\u7f16\u8f91~/.vimrc\uff08\u5982\u679c\u4e0d\u5b58\u5728\uff0c\u65b0\u5efa\u8fd9\u4e2a\u6587\u4ef6\uff09\uff0c\u6dfb\u52a0\u4e00\u884c"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},":set viminfo='1000,<500\n")),(0,l.kt)("p",null,"\u81f3\u4e8e\u4e3a\u4ec0\u4e48\u8981\u8f93\u5165\u8f93\u5165\u20191000\uff0c\u8fd9\u4e2a\u5176\u5b9e\u4e0d\u91cd\u8981\uff0c\u6700\u4e3b\u8981\u7684\u662f\u8f93\u5165<500\uff0c\u5b83\u662f\u8bbe\u7f6e\u5bc4\u5b58\u5668\u4fdd\u5b58\u7684\u884c\u6570\u7684\uff0c\u5373\u6700\u5927\u503c\u4e3a 500\u3002"),(0,l.kt)("h2",{id:"3-\u683c\u5f0f\u5316"},"3. \u683c\u5f0f\u5316"),(0,l.kt)("p",null,"1\uff0cgg \u8df3\u8f6c\u5230\u7b2c\u4e00\u884c"),(0,l.kt)("p",null,"2\uff0cshift+v \u8f6c\u5230\u53ef\u89c6\u6a21\u5f0f"),(0,l.kt)("p",null,"3\uff0cshift+g \u5168\u9009"),(0,l.kt)("p",null,"4\uff0c\u6309\u4e0b\u795e\u5947\u7684 ="),(0,l.kt)("h4",{id:"4-\u6279\u91cf\u66ff\u6362"},"4. \u6279\u91cf\u66ff\u6362"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"%s/\u539f\u53d8\u91cf\u540d/\u8981\u4fee\u6539\u540e\u7684\u53d8\u91cf\u540d/g")),(0,l.kt)("p",null,"\u52a0\u4e2a c \u5c31\u6709 u \u4fee\u6539\u786e\u8ba4\u63d0\u793a"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"%s/\u539f\u53d8\u91cf\u540d/\u8981\u4fee\u6539\u540e\u7684\u53d8\u91cf\u540d/gc")),(0,l.kt)("p",null,"\u5982\u679c\u662f\u66ff\u6362\u4e00\u4e2a\u51fd\u6570\u4e2d\u7684\u53d8\u91cf\u540d\uff0c\u53ef\u4ee5\u7528 v \u547d\u4ee4\u9009\u4e2d\u51fd\u6570\uff0c\u7136\u540e\u66ff\u6362\uff1b\u5982\u679c\u662f\u66ff\u6362\u82e5\u5e72\u6587\u4ef6\u4e2d\u7684\u53d8\u91cf\uff08\u6216\u51fd\u6570\uff09\u540d\uff0c\u9700\u8981\u5148\u9009\u5b9a args \u5217\u8868\uff0c\u7136\u540e\u7528 argdo\n%s//new_name/g | w \u6765\u4fee\u6539\u52a0\u4fdd\u5b58\u3002"),(0,l.kt)("h3",{id:"5-\u67e5\u8be2\u5173\u952e\u5b57"},"5. \u67e5\u8be2\u5173\u952e\u5b57"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"/key")),(0,l.kt)("p",null,"\u4e0d\u9700\u8981",(0,l.kt)("inlineCode",{parentName:"p"},"\uff1a")),(0,l.kt)("p",null,"n \u4e0b\u4e00\u4e2a\uff0cN \u4e0a\u4e00\u4e2a"))}m.isMDXComponent=!0}}]);