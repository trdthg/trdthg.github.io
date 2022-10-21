"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[8347],{3905:(e,r,t)=>{t.d(r,{Zo:()=>l,kt:()=>d});var n=t(7294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=n.createContext({}),p=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},l=function(e){var r=p(e.components);return n.createElement(c.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),m=p(t),d=o,g=m["".concat(c,".").concat(d)]||m[d]||u[d]||i;return t?n.createElement(g,a(a({ref:r},l),{},{components:t})):n.createElement(g,a({ref:r},l))}));function d(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=m;var s={};for(var c in r)hasOwnProperty.call(r,c)&&(s[c]=r[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var p=2;p<i;p++)a[p]=t[p];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},4736:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var n=t(7462),o=(t(7294),t(3905));const i={},a="\u5173\u4e8e\u672c\u7f51\u7ad9",s={unversionedId:"other/this_page",id:"other/this_page",title:"\u5173\u4e8e\u672c\u7f51\u7ad9",description:"deploy \u811a\u672c",source:"@site/docs/other/this_page.md",sourceDirName:"other",slug:"/other/this_page",permalink:"/docs/other/this_page",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u811a\u672c",permalink:"/docs/other/script"},next:{title:"vim",permalink:"/docs/other/vim"}},c={},p=[{value:"deploy \u811a\u672c",id:"deploy-\u811a\u672c",level:2}],l={toc:p};function u(e){let{components:r,...t}=e;return(0,o.kt)("wrapper",(0,n.Z)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u5173\u4e8e\u672c\u7f51\u7ad9"},"\u5173\u4e8e\u672c\u7f51\u7ad9"),(0,o.kt)("h2",{id:"deploy-\u811a\u672c"},"deploy \u811a\u672c"),(0,o.kt)("p",null,"\u57fa\u4e8e typora \u5904\u7406\u56fe\u7247"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},'# rm -rf docs/.vuepress/dist\ncd vuePressBlog\n# \u751f\u6210\u9759\u6001\u6587\u4ef6\npnpm run build\n\n# \u56fe\u7247\u6e90\u4fee\u6539\nrm docs/.vuepress/public/assets/img/*\ncp /home/trthg/.config/Typora/typora-user-images/* docs/.vuepress/public/assets/img/\n\n# md \u5f15\u7528\u56fe\u7247\u8def\u5f84\u4fee\u6539\nsed -i "s/\\/home\\/trthg\\/.config\\/Typora\\/typora-user-images/\\/assets\\/img/g" `grep -rl "/assets/img" ./`\n\n# # /* \u4f1a\u5ffd\u7565\u3002\u5f00\u5934\u7684\u6587\u4ef6   /. \u4e0d\u4f1a\nrm -r ../assets\nrm -r ../java\nrm -r ../other\nrm -r ../js\nrm -r ../python\nrm -r ../rust\nrm -r ../ioclub\nrm -r ../magic\nrm ../*.html\n# rm ../*.png\n# rm ../*.jpg\n\nmv docs/.vuepress/dist/* ../\n\ncurDate=$(date "+%Y-%m-%d")\ncurTime=$(date "+%H:%M:%S")\n# # git init\ncd ..\ngit add .\ngit commit -s -m "commit: $curDate $curTime"\ngit push -u origin main\n')))}u.isMDXComponent=!0}}]);