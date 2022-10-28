"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[555],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>d});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},o={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,m=p(e,["components","mdxType","originalType","parentName"]),k=u(n),d=r,c=k["".concat(s,".").concat(d)]||k[d]||o[d]||l;return n?a.createElement(c,i(i({ref:t},m),{},{components:n})):a.createElement(c,i({ref:t},m))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=k;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var u=2;u<l;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}k.displayName="MDXCreateElement"},1723:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>o,frontMatter:()=>l,metadata:()=>p,toc:()=>u});var a=n(7462),r=(n(7294),n(3905));const l={},i="\u7b2c\u56db\u6b21\u8bfe SQL",p={unversionedId:"ioclub/\u540e\u7aef/backend_4",id:"ioclub/\u540e\u7aef/backend_4",title:"\u7b2c\u56db\u6b21\u8bfe SQL",description:"1. \u4e86\u89e3\u6570\u636e\u5e93",source:"@site/docs/ioclub/2021-\u540e\u7aef/backend_4.md",sourceDirName:"ioclub/2021-\u540e\u7aef",slug:"/ioclub/\u540e\u7aef/backend_4",permalink:"/docs/ioclub/\u540e\u7aef/backend_4",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u7b2c\u4e09\u6b21\u8bfe Cookie \u767b\u5f55",permalink:"/docs/ioclub/\u540e\u7aef/backend_3"},next:{title:"B+ \u6811\u4ee5\u53ca\u5728\u6570\u636e\u5e93\u4e2d\u7684\u5e94\u7528",permalink:"/docs/ioclub/share_1"}},s={},u=[{value:"1. \u4e86\u89e3\u6570\u636e\u5e93",id:"1-\u4e86\u89e3\u6570\u636e\u5e93",level:2},{value:"1.1 \u4ec0\u4e48\u662f\u6570\u636e\u5e93",id:"11-\u4ec0\u4e48\u662f\u6570\u636e\u5e93",level:4},{value:"1.2 \u6280\u672f\u521d\u8877",id:"12-\u6280\u672f\u521d\u8877",level:4},{value:"1.3 \u6570\u636e\u5e93\u7ba1\u7406\u7cfb\u7edf",id:"13-\u6570\u636e\u5e93\u7ba1\u7406\u7cfb\u7edf",level:4},{value:"1.5 \u6570\u636e\u5e93\u7684\u5206\u7c7b",id:"15-\u6570\u636e\u5e93\u7684\u5206\u7c7b",level:4},{value:"1.6 \u64cd\u4f5c\u6570\u636e\u5e93",id:"16-\u64cd\u4f5c\u6570\u636e\u5e93",level:4},{value:"1.6.1 \u5efa\u7acb\u8fde\u63a5",id:"161-\u5efa\u7acb\u8fde\u63a5",level:5},{value:"1.6.2 \u901a\u8fc7 cmd \u64cd\u4f5c\u6570\u636e\u5e93",id:"162-\u901a\u8fc7-cmd-\u64cd\u4f5c\u6570\u636e\u5e93",level:5},{value:"2. SQL \u8bed\u53e5",id:"2-sql-\u8bed\u53e5",level:2},{value:"2.1 \u6570\u636e\u7c7b\u578b",id:"21-\u6570\u636e\u7c7b\u578b",level:4},{value:"2.2 \u7ea6\u675f",id:"22-\u7ea6\u675f",level:4},{value:"2.3 \u4e00\u4e9b\u57fa\u672c\u64cd\u4f5c",id:"23-\u4e00\u4e9b\u57fa\u672c\u64cd\u4f5c",level:4},{value:"2.3.1 \u521b\u5efa\u6570\u636e\u5e93",id:"231-\u521b\u5efa\u6570\u636e\u5e93",level:5},{value:"2.3.2 \u65b0\u5efa\u6570\u636e\u8868",id:"232-\u65b0\u5efa\u6570\u636e\u8868",level:5},{value:"2.3.3 \u67e5\u8be2\u6570\u636e",id:"233-\u67e5\u8be2\u6570\u636e",level:5},{value:"2.3.4 \u63d2\u5165\u6570\u636e",id:"234-\u63d2\u5165\u6570\u636e",level:5},{value:"2.3.5 \u4fee\u6539\u6570\u636e",id:"235-\u4fee\u6539\u6570\u636e",level:5},{value:"2.3.6 \u5220\u9664\u5b57\u6bb5",id:"236-\u5220\u9664\u5b57\u6bb5",level:5},{value:"3. Python \u64cd\u4f5c Sqlite",id:"3-python-\u64cd\u4f5c-sqlite",level:2},{value:"3.0 \u5b89\u88c5 Sqlite",id:"30-\u5b89\u88c5-sqlite",level:3},{value:"3.1 \u57fa\u672c\u64cd\u4f5c",id:"31-\u57fa\u672c\u64cd\u4f5c",level:3},{value:"3. \u4fee\u6539\u767b\u5f55",id:"3-\u4fee\u6539\u767b\u5f55",level:2},{value:"3.1 \u51c6\u5907\u4e00\u4e2a\u6570\u636e\u5e93",id:"31-\u51c6\u5907\u4e00\u4e2a\u6570\u636e\u5e93",level:3},{value:"3.2 \u5b8c\u5584\u4e4b\u524d\u7684\u767b\u5f55",id:"32-\u5b8c\u5584\u4e4b\u524d\u7684\u767b\u5f55",level:3},{value:"4. \u9644\u5f55",id:"4-\u9644\u5f55",level:2},{value:"4.1 python \u67e5\u770b\u53d8\u91cf\u7684\u7c7b\u578b",id:"41-python-\u67e5\u770b\u53d8\u91cf\u7684\u7c7b\u578b",level:3},{value:"dfssfesf",id:"dfssfesf",level:6}],m={toc:u};function o(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\u7b2c\u56db\u6b21\u8bfe-sql"},"\u7b2c\u56db\u6b21\u8bfe SQL"),(0,r.kt)("h2",{id:"1-\u4e86\u89e3\u6570\u636e\u5e93"},"1. \u4e86\u89e3\u6570\u636e\u5e93"),(0,r.kt)("h4",{id:"11-\u4ec0\u4e48\u662f\u6570\u636e\u5e93"},"1.1 \u4ec0\u4e48\u662f\u6570\u636e\u5e93"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u6570\u636e\u5e93"),"\uff0c\u53c8\u79f0\u4e3a\u6570\u636e\u7ba1\u7406\u7cfb\u7edf\uff0c\u7b80\u800c\u8a00\u4e4b\u53ef\u89c6\u4e3a",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/w/index.php?title=%E9%9B%BB%E5%AD%90%E5%8C%96&action=edit&redlink=1"},"\u7535\u5b50\u5316"),"\u7684",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/%E6%A1%A3%E6%A1%88%E6%9F%9C"},"\u6587\u4ef6\u67dc"),"\u2014\u2014\u5b58\u50a8\u7535\u5b50",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/%E6%AA%94%E6%A1%88"},"\u6587\u4ef6"),"\u7684\u5904\u6240\uff0c\u7528\u6237\u53ef\u4ee5\u5bf9",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/%E6%AA%94%E6%A1%88"},"\u6587\u4ef6"),"\u4e2d\u7684\u8d44\u6599\u8fd0\u884c\u65b0\u589e\u3001\u622a\u53d6\u3001\u66f4\u65b0\u3001\u5220\u9664\u7b49\u64cd\u4f5c [",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE%E5%BA%93#cite_note-1"},"1","]"),"\u3002"),(0,r.kt)("h4",{id:"12-\u6280\u672f\u521d\u8877"},"1.2 \u6280\u672f\u521d\u8877"),(0,r.kt)("p",null,"\u5728",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F"},"\u64cd\u4f5c\u7cfb\u7edf"),"\u51fa\u73b0\u4e4b\u540e\uff0c\u968f\u7740",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/%E8%AE%A1%E7%AE%97%E6%9C%BA"},"\u8ba1\u7b97\u673a"),"\u5e94\u7528\u8303\u56f4\u7684\u6269\u5927\u3001\u9700\u8981\u5904\u7406\u7684",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE"},"\u6570\u636e"),"\u8fc5\u901f\u81a8\u80c0\u3002\u6700\u521d\uff0c\u6570\u636e\u4e0e",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/%E7%A8%8B%E5%BA%8F"},"\u7a0b\u5e8f"),"\u4e00\u6837\uff0c\u4ee5\u7b80\u5355\u7684\u6587\u4ef6\u4f5c\u4e3a\u4e3b\u8981\u5b58\u50a8\u5f62\u5f0f\u3002\u4ee5\u8fd9\u79cd\u65b9\u5f0f\u7ec4\u7ec7\u7684\u6570\u636e\u5728\u903b\u8f91\u4e0a\u66f4\u7b80\u5355\uff0c\u4f46",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/%E5%8F%AF%E6%89%A9%E5%B1%95%E6%80%A7"},"\u53ef\u6269\u5c55\u6027"),"\u5dee\uff0c\u8bbf\u95ee\u8fd9\u79cd\u6570\u636e\u7684\u7a0b\u5e8f\u9700\u8981\u4e86\u89e3\u6570\u636e\u7684\u5177\u4f53\u7ec4\u7ec7\u683c\u5f0f\u3002\u5f53\u7cfb\u7edf\u6570\u636e\u91cf\u5927\u6216\u8005\u7528\u6237\u8bbf\u95ee\u91cf\u5927\u65f6\uff0c\u5e94\u7528\u7a0b\u5e8f\u8fd8\u9700\u8981\u89e3\u51b3\u6570\u636e\u7684\u5b8c\u6574\u6027\u3001\u4e00\u81f4\u6027\u4ee5\u53ca\u5b89\u5168\u6027\u7b49\u4e00\u7cfb\u5217\u7684\u95ee\u9898\u3002\u56e0\u6b64\uff0c\u5fc5\u987b\u5f00\u53d1\u51fa\u4e00\u79cd",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/%E7%B3%BB%E7%BB%9F%E8%BD%AF%E4%BB%B6"},"\u7cfb\u7edf\u8f6f\u4ef6"),"\uff0c\u5b83\u5e94\u8be5\u80fd\u591f\u50cf\u64cd\u4f5c\u7cfb\u7edf\u5c4f\u853d\u4e86\u786c\u4ef6\u8bbf\u95ee\u590d\u6742\u6027\u90a3\u6837\uff0c\u5c4f\u853d\u6570\u636e\u8bbf\u95ee\u7684\u590d\u6742\u6027\u3002\u7531\u6b64\u4ea7\u751f\u4e86\u6570\u636e\u7ba1\u7406\u7cfb\u7edf\uff0c\u5373\u6570\u636e\u5e93\u3002"),(0,r.kt)("h4",{id:"13-\u6570\u636e\u5e93\u7ba1\u7406\u7cfb\u7edf"},"1.3 \u6570\u636e\u5e93\u7ba1\u7406\u7cfb\u7edf"),(0,r.kt)("p",null,"\u4e3b\u6761\u76ee\uff1a",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE%E5%BA%93%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F"},"\u6570\u636e\u5e93\u7ba1\u7406\u7cfb\u7edf")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE%E5%BA%93%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F"},"\u6570\u636e\u5e93\u7ba1\u7406\u7cfb\u7edf"),"\uff08\u82f1\u8bed\uff1aDatabase Management\nSystem\uff0c\u7b80\u79f0",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/DBMS"},"DBMS"),"\uff09\u662f\u4e3a\u7ba1\u7406",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/%E8%B3%87%E6%96%99%E5%BA%AB"},"\u6570\u636e\u5e93"),"\u800c\u8bbe\u8ba1\u7684\u7535\u8111",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/%E8%BB%9F%E9%AB%94"},"\u8f6f\u4ef6"),"\u7cfb\u7edf\uff0c\u4e00\u822c\u5177\u6709\u5b58\u50a8\u3001\u622a\u53d6\u3001\u5b89\u5168\u4fdd\u969c\u3001\u5907\u4efd\u7b49\u57fa\u7840\u529f\u80fd\u3002\u6570\u636e\u5e93\u7ba1\u7406\u7cfb\u7edf\u53ef\u4ee5\u4f9d\u636e\u5b83\u6240\u652f\u6301\u7684",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/w/index.php?title=%E8%B3%87%E6%96%99%E5%BA%AB%E6%A8%A1%E5%9E%8B&action=edit&redlink=1"},"\u6570\u636e\u5e93\u6a21\u578b"),"\u6765\u4f5c\u5206\u7c7b\uff0c\u4f8b\u5982",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/%E9%97%9C%E8%81%AF%E6%A8%A1%E5%9E%8B"},"\u5173\u7cfb\u5f0f"),"\u3001",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/XML"},"XML"),"\uff1b\u6216\u4f9d\u636e\u6240\u652f\u6301\u7684\u7535\u8111\u7c7b\u578b\u6765\u4f5c\u5206\u7c7b\uff0c\u4f8b\u5982\u670d\u52a1\u5668\u805a\u7c7b\u3001\u79fb\u52a8\u7535\u8bdd\uff1b\u6216\u4f9d\u636e\u6240\u7528\u67e5\u8be2\u8bed\u8a00\u6765\u4f5c\u5206\u7c7b\uff0c\u4f8b\u5982",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/SQL"},"SQL"),"\u3001",(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/w/index.php?title=XQuery&action=edit&redlink=1"},"XQuery"),"\uff1b\u6216\u4f9d\u636e\u6027\u80fd\u51b2\u91cf\u91cd\u70b9\u6765\u4f5c\u5206\u7c7b\uff0c\u4f8b\u5982\u6700\u5927\u89c4\u6a21\u3001\u6700\u9ad8\u8fd0\u884c\u901f\u5ea6\uff1b\u4ea6\u6216\u5176\u4ed6\u7684\u5206\u7c7b\u65b9\u5f0f\u3002\u4e0d\u8bba\u4f7f\u7528\u54ea\u79cd\u5206\u7c7b\u65b9\u5f0f\uff0c\u4e00\u4e9b DBMS \u80fd\u591f\u8de8\u7c7b\u522b\uff0c\u4f8b\u5982\uff0c\u540c\u65f6\u652f\u6301\u591a\u79cd\u67e5\u8be2\u8bed\u8a00\u3002"),(0,r.kt)("h4",{id:"15-\u6570\u636e\u5e93\u7684\u5206\u7c7b"},"1.5 \u6570\u636e\u5e93\u7684\u5206\u7c7b"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u5173\u7cfb\u6570\u636e\u5e93")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"https://www.mysql.com/cn/"},"MySQL")," \u6700\u5e7f\u6cdb\u4f7f\u7528\u7684")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Sqlite \u8f7b\u91cf\u7ea7\u6570\u636e\u5e93")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/Microsoft_SQL_Server"},"Microsoft SQL Server"),"\n\u5fae\u8f6f\u7684\uff0c\u4e0a\u8bfe\u7528")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"https://zh.wikipedia.org/wiki/Oracle%E6%95%B0%E6%8D%AE%E5%BA%93"},"Oracle \u6570\u636e\u5e93")," \u4f01\u4e1a\u7ea7\u6570\u636e\u5e93")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u5173\u7cfb\u884c\u6570\u636e\u5e93\u7684\u5b58\u50a8\u683c\u5f0f\u7c7b\u4f3c\u4e8e excel \u8868\u683c\uff0c\u6240\u6709\u6570\u636e\u4ee5\u8868\u7684\u5f62\u5f0f\u6309\u884c\u6216\u6309\u5217\u5b58\u50a8\uff0c\u4e0b\u56fe\u662f\u4e00\u4e2a mysql \u6570\u636e\u5e93\u4e2d user \u8868\u7684\u53ef\u89c6\u5316\u7ed3\u679c"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"TDSQL-C-tmp \u662f\u6570\u636e\u5e93\u670d\u52a1\u5668\u7684\u540d\u5b57")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"demo \u662f\u5176\u4e2d\u4e00\u4e2a\u6570\u636e\u5e93")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"user \u662f demo \u6570\u636e\u5e93\u4e2d\u7684\u4e00\u5f20\u8868"))))),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"\u975e\u5173\u7cfb\u578b\u6570\u636e\u5e93\uff08",(0,r.kt)("a",{parentName:"li",href:"https://zh.wikipedia.org/wiki/NoSQL"},"NoSQL"),"\uff09")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://zh.wikipedia.org/wiki/MongoDB"},"MongoDB")),(0,r.kt)("li",{parentName:"ul"},"Redis")),(0,r.kt)("p",null,"\u975e\u5173\u7cfb\u578b\u6570\u636e\u5e93\u6570\u636e\u7ed3\u6784\u7b80\u5355\uff0c\u5185\u90e8\u662f\u4ee5\u952e\u503c\u5bf9\u5b58\u50a8\u6570\u636e\uff0c\u7ed3\u6784\u76f8\u6bd4\u5173\u7cfb\u578b\u66f4\u7b80\u5355"),(0,r.kt)("p",null,"\u9664\u6b64\u4e4b\u5916\u8fd8\u6709\u4e00\u7cfb\u5217\u7528\u4e8e\u4e13\u4e1a\u7528\u9014\u7684\u6570\u636e\u5e93\uff0c\u5728\u6b64\u4e0d\u505a\u8bf4\u660e"),(0,r.kt)("h4",{id:"16-\u64cd\u4f5c\u6570\u636e\u5e93"},"1.6 \u64cd\u4f5c\u6570\u636e\u5e93"),(0,r.kt)("h5",{id:"161-\u5efa\u7acb\u8fde\u63a5"},"1.6.1 \u5efa\u7acb\u8fde\u63a5"),(0,r.kt)("p",null,"\u4e00\u822c\u6570\u636e\u5e93\u7cfb\u7edf\u90fd\u5206\u4e3a\u4e24\u90e8\u5206\uff0c\u670d\u52a1\u7aef\u548c\u5ba2\u6237\u7aef\uff0c\u5728\u7528\u6237\u5b89\u88c5\u5b8c\u6570\u636e\u5e93\u8f6f\u4ef6\u540e\uff0c\u9700\u8981\u5148\u542f\u52a8\u6570\u636e\u5e93\u7684\u670d\u52a1\u7aef\uff0c\u63a5\u7740\u901a\u8fc7\u5ba2\u6237\u7aef\u8fde\u63a5\u5230\u670d\u52a1\u7aef"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"redis \u9700\u8981\u5148\u4e0e\u670d\u52a1\u7aef\u8fde\u63a5\uff0c\u6709\u670d\u52a1\u7aef\u6267\u884c\u5177\u4f53\u64cd\u4f5c"),(0,r.kt)("p",{parentName:"li"},"\u6211\u4eec\u7528\u4e00\u884c\u547d\u4ee4\u901a\u8fc7 redis \u7684\u5ba2\u6237\u7aef\u8fde\u63a5\u5230\u4e86\u670d\u52a1\u7aef\uff0c\u53ef\u4ee5\u770b\u5230\u76ee\u524d\u5728\u64cd\u4f5c\u7684\u662f\u8fd0\u884c\u5728\u672c\u673a\n(127.0.0.1)6379 \u7aef\u53e3\u4e0a\u7684 redis \u6570\u636e\u5e93\u7684\u670d\u52a1\u7aef\uff0c\u4f7f\u7528 set \u547d\u4ee4\u8bbe\u7f6e\u4e86 a \u5bf9\u5e94\u7684\u503c\u4e3a 111\uff0c\u53c8\u7528 get \u547d\u4ee4\u83b7\u53d6\u4e86 a \u7684\u503c"),(0,r.kt)("p",{parentName:"li"},"\u8fd9\u4e9b\u547d\u4ee4\u5b9e\u9645\u4e0a\u4f1a\u88ab\u53d1\u9001\u5230\u670d\u52a1\u7aef\uff0c\u5728\u7531\u670d\u52a1\u7aef\u6267\u884c\n",(0,r.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021313036.png",alt:null}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Sqlite \u6570\u636e\u5e93\u6ca1\u6709\u670d\u52a1\u7aef\uff0c\u64cd\u4f5c\u7684\u5c31\u662f\u4e00\u4e2a\u6570\u636e\u6587\u4ef6"),(0,r.kt)("p",{parentName:"li"},"\u4e0b\u9762\u6211\u4eec\u8fdb\u5165 sqlite \u7684\u547d\u4ee4\u884c\uff0c\u76f4\u63a5\u521b\u5efa\u4e86\u4e00\u4e2a\u540d\u4e3a test.db \u6570\u636e\u5e93\uff0c\u518d\u6b21\u67e5\u770b\u8be5\u6587\u4ef6\u5939\uff0c\u591a\u4e86\u4e00\u4e2a\u6587\u4ef6\n",(0,r.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021314920.png",alt:null})))),(0,r.kt)("h5",{id:"162-\u901a\u8fc7-cmd-\u64cd\u4f5c\u6570\u636e\u5e93"},"1.6.2 \u901a\u8fc7 cmd \u64cd\u4f5c\u6570\u636e\u5e93"),(0,r.kt)("p",null,"\u4e0b\u9762\u662f\u4e00\u4e9b\u5e38\u89c4\u64cd\u4f5c\uff0c\u901a\u8fc7\u5728\u8fd0\u884c sqlite3 \u65f6\u52a0\u4e0a\u6570\u636e\u5e93\u6587\u4ef6\u540d\uff0c\u5c31\u80fd\u8fde\u63a5\u5230\u6570\u636e\u5e93"),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021315179.png",alt:null}),"\n\u5206\u522b\u6267\u884c\u4e86"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u521b\u5efa\u6570\u636e\u8868"),(0,r.kt)("li",{parentName:"ul"},"\u63d2\u5165\u4e00\u884c\u6570\u636e"),(0,r.kt)("li",{parentName:"ul"},"\u67e5\u770b\u6570\u636e\u8868\u4e2d\u7684\u6240\u6709\u6570\u636e")),(0,r.kt)("h2",{id:"2-sql-\u8bed\u53e5"},"2. SQL \u8bed\u53e5"),(0,r.kt)("p",null,"SQL \u8bed\u53e5\u53ea\u662f\u4e00\u4e2a\u6807\u51c6\uff0c\u4e0d\u540c\u7684\u6570\u636e\u5e93\u8f6f\u4ef6\u7684\u5177\u4f53\u5b9e\u73b0\u90fd\u5927\u81f4\u76f8\u540c\uff0c\u53ea\u6709\u4e00\u4e9b\u7ec6\u8282\u4e0d\u540c"),(0,r.kt)("p",null,"SQL \u8bed\u53e5\u5bf9\u5173\u952e\u5b57\u4e0d\u533a\u5206\u5927\u5c0f\u5199\uff0c\u4e0d\u8fc7\u4e00\u822c\u7528\u5927\u5199"),(0,r.kt)("h4",{id:"21-\u6570\u636e\u7c7b\u578b"},"2.1 \u6570\u636e\u7c7b\u578b"),(0,r.kt)("p",null,"\u6570\u636e\u5e93\u652f\u6301\u7684\u6570\u636e\u7c7b\u578b\u975e\u5e38\u591a\uff0c\u4e3b\u8981\u5206\u4e3a 3 \u7c7b\uff0c\u6570\u5b57\uff0c\u65e5\u671f\uff0c\u5b57\u7b26\u4e32\uff08\u5b57\u7b26\uff09\uff0c\u8fd9\u91cc\u4ee5 mysql \u7684\u4e3a\u4f8b"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u6570\u5b57")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5927\u5c0f"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"TINYINT"),(0,r.kt)("td",{parentName:"tr",align:null},"1 Bytes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SMALLINT"),(0,r.kt)("td",{parentName:"tr",align:null},"2 Bytes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"MEDIUMINT"),(0,r.kt)("td",{parentName:"tr",align:null},"3 Bytes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"INT \u6216 INTEGER"),(0,r.kt)("td",{parentName:"tr",align:null},"4 Bytes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"BIGINT"),(0,r.kt)("td",{parentName:"tr",align:null},"8 Bytes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"FLOAT"),(0,r.kt)("td",{parentName:"tr",align:null},"4 Bytes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"DOUBLE"),(0,r.kt)("td",{parentName:"tr",align:null},"8 Bytes")))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u65e5\u671f")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5927\u5c0f"),(0,r.kt)("th",{parentName:"tr",align:null},"\u8303\u56f4"),(0,r.kt)("th",{parentName:"tr",align:null},"\u683c\u5f0f"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7528\u9014"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"DATE"),(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"1000-01-01/9999-12-31"),(0,r.kt)("td",{parentName:"tr",align:null},"YYYY-MM-DD"),(0,r.kt)("td",{parentName:"tr",align:null},"\u65e5\u671f\u503c")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"TIME"),(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"'-838:59:59'/'838:59:59'"),(0,r.kt)("td",{parentName:"tr",align:null},"HH:MM:SS"),(0,r.kt)("td",{parentName:"tr",align:null},"\u65f6\u95f4\u503c\u6216\u6301\u7eed\u65f6\u95f4")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"YEAR"),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"1901/2155"),(0,r.kt)("td",{parentName:"tr",align:null},"YYYY"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5e74\u4efd\u503c")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"DATETIME"),(0,r.kt)("td",{parentName:"tr",align:null},"8"),(0,r.kt)("td",{parentName:"tr",align:null},"1000-01-01 00:00:00/9999-12-31 23:59:59"),(0,r.kt)("td",{parentName:"tr",align:null},"YYYY-MM-DD HH:MM:SS"),(0,r.kt)("td",{parentName:"tr",align:null},"\u6df7\u5408\u65e5\u671f\u548c\u65f6\u95f4\u503c")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"TIMESTAMP"),(0,r.kt)("td",{parentName:"tr",align:null},"4"),(0,r.kt)("td",{parentName:"tr",align:null},"unix",(0,r.kt)("em",{parentName:"td"},"\u65f6\u95f4\u6233\u662f"),"\u4ece 1970 \u5e74 1 \u6708 1 \u65e5\u5f00\u59cb\u6240\u7ecf\u8fc7\u7684\u79d2\u6570"),(0,r.kt)("td",{parentName:"tr",align:null},"YYYYMMDD HHMMSS"),(0,r.kt)("td",{parentName:"tr",align:null},"\u6df7\u5408\u65e5\u671f\u548c\u65f6\u95f4\u503c\uff0c\u65f6\u95f4\u6233")))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u5b57\u7b26\u4e32")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5927\u5c0f"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7528\u9014"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"CHAR"),(0,r.kt)("td",{parentName:"tr",align:null},"0-255 bytes"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5b9a\u957f\u5b57\u7b26\u4e32")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"VARCHAR"),(0,r.kt)("td",{parentName:"tr",align:null},"0-65535 bytes"),(0,r.kt)("td",{parentName:"tr",align:null},"\u53d8\u957f\u5b57\u7b26\u4e32")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"TINYBLOB"),(0,r.kt)("td",{parentName:"tr",align:null},"0-255 bytes"),(0,r.kt)("td",{parentName:"tr",align:null},"\u4e0d\u8d85\u8fc7 255 \u4e2a\u5b57\u7b26\u7684\u4e8c\u8fdb\u5236\u5b57\u7b26\u4e32")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"TINYTEXT"),(0,r.kt)("td",{parentName:"tr",align:null},"0-255 bytes"),(0,r.kt)("td",{parentName:"tr",align:null},"\u77ed\u6587\u672c\u5b57\u7b26\u4e32")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"BLOB"),(0,r.kt)("td",{parentName:"tr",align:null},"0-65 535 bytes"),(0,r.kt)("td",{parentName:"tr",align:null},"\u4e8c\u8fdb\u5236\u5f62\u5f0f\u7684\u957f\u6587\u672c\u6570\u636e")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"TEXT"),(0,r.kt)("td",{parentName:"tr",align:null},"0-65 535 bytes"),(0,r.kt)("td",{parentName:"tr",align:null},"\u957f\u6587\u672c\u6570\u636e")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"MEDIUMBLOB"),(0,r.kt)("td",{parentName:"tr",align:null},"0-16 777 215 bytes"),(0,r.kt)("td",{parentName:"tr",align:null},"\u4e8c\u8fdb\u5236\u5f62\u5f0f\u7684\u4e2d\u7b49\u957f\u5ea6\u6587\u672c\u6570\u636e")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"MEDIUMTEXT"),(0,r.kt)("td",{parentName:"tr",align:null},"0-16 777 215 bytes"),(0,r.kt)("td",{parentName:"tr",align:null},"\u4e2d\u7b49\u957f\u5ea6\u6587\u672c\u6570\u636e")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"LONGBLOB"),(0,r.kt)("td",{parentName:"tr",align:null},"0-4 294 967 295 bytes"),(0,r.kt)("td",{parentName:"tr",align:null},"\u4e8c\u8fdb\u5236\u5f62\u5f0f\u7684\u6781\u5927\u6587\u672c\u6570\u636e")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"LONGTEXT"),(0,r.kt)("td",{parentName:"tr",align:null},"0-4 294 967 295 bytes"),(0,r.kt)("td",{parentName:"tr",align:null},"\u6781\u5927\u6587\u672c\u6570\u636e")))),(0,r.kt)("p",null,"\u6700\u5e38\u7528\u7684\u8fd8\u662f int\uff0cchar\uff0cvarchar\uff0ctext\uff0cdatetime"),(0,r.kt)("h4",{id:"22-\u7ea6\u675f"},"2.2 \u7ea6\u675f"),(0,r.kt)("p",null,"\u6570\u636e\u5e93\u4e3a\u4e86\u4fdd\u6301\u5185\u90e8\u6570\u636e\u7684\u5b8c\u6574\u6027\u548c\u5b89\u5168\u6027\uff0c\u53ef\u4ee5\u5bf9\u5b57\u6bb5\u4f5c\u51fa\u4e00\u4e9b\u9650\u5236\uff0c\u6bd4\u5982\u5e74\u9f84\u662f\u6570\u5b57\u7c7b\u578b\uff0c\u53ef\u4ee5\u89c4\u5b9a age > 0 and age < 100,\n\u6216\u8005\u6027\u522b\u53ea\u80fd\u4e3a\u7537\u6216\u5973\uff0c\u7528\u6237\u7684 id \u4e0d\u80fd\u91cd\u590d\u7b49\u7b49\u3002"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"NOT NULL")," - \u6307\u793a\u67d0\u5217\u4e0d\u80fd\u4e3a\u7a7a\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"UNIQUE")," - \u4fdd\u8bc1\u67d0\u5217\u7684\u6bcf\u884c\u5fc5\u987b\u6709\u552f\u4e00\u7684\u503c\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"PRIMARY KEY")," - NOT NULL \u548c UNIQUE\n\u7684\u7ed3\u5408\u3002\u786e\u4fdd\u67d0\u5217\uff08\u6216\u4e24\u4e2a\u5217\u591a\u4e2a\u5217\u7684\u7ed3\u5408\uff09\u6709\u552f\u4e00\u6807\u8bc6\uff0c\u6709\u52a9\u4e8e\u66f4\u5bb9\u6613\u66f4\u5feb\u901f\u5730\u627e\u5230\u8868\u4e2d\u7684\u4e00\u4e2a\u7279\u5b9a\u7684\u8bb0\u5f55\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"FOREIGN KEY")," - \u4fdd\u8bc1\u53e6\u5916\u4e00\u4e2a\u8868\u4e2d\u4e00\u5b9a\u67d0\u4e00\u884c\u4e0e\u8fd9\u4e2a\u8868\u4e2d\u5bf9\u5e94"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"CHECK")," - \u4fdd\u8bc1\u5217\u4e2d\u7684\u503c\u7b26\u5408\u6307\u5b9a\u7684\u6761\u4ef6\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"DEFAULT")," - \u89c4\u5b9a\u6ca1\u6709\u7ed9\u5217\u8d4b\u503c\u65f6\u7684\u9ed8\u8ba4\u503c\u3002")),(0,r.kt)("p",null,"\u7ea6\u675f\u4e00\u822c\u5728\u521b\u5efa\u6570\u636e\u8868\u65f6\u52a0\u5165\uff0c\u4e0d\u540c\u6570\u636e\u5e93\u6709\u4e0d\u540c\u7684\u5199\u6cd5\uff0c\u8fd9\u4e00\u5757\u53ef\u4ee5\u4ee5\u540e\u6df1\u5165\u7814\u7a76"),(0,r.kt)("h4",{id:"23-\u4e00\u4e9b\u57fa\u672c\u64cd\u4f5c"},"2.3 \u4e00\u4e9b\u57fa\u672c\u64cd\u4f5c"),(0,r.kt)("p",null,"\u6ce8\u610f\uff1a"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u6570\u636e\u5e93\u8bed\u53e5\u90fd\u4ee5 ",(0,r.kt)("inlineCode",{parentName:"li"},"\uff1b")," \u7ed3\u5c3e\uff0c\u6240\u4ee5\u666e\u901a\u7684\u6362\u884c\u4e0d\u5f71\u54cd sql \u7684\u6267\u884c"),(0,r.kt)("li",{parentName:"ol"},"\u4ee5 ",(0,r.kt)("inlineCode",{parentName:"li"},".sql")," \u4e00\u822c\u7528 ",(0,r.kt)("inlineCode",{parentName:"li"},"--")," \u5f00\u5934\u505a\u4e3a\u6ce8\u91ca"),(0,r.kt)("li",{parentName:"ol"},"SQL \u8bed\u53e5\u662f\u5927\u5c0f\u5199\u90fd\u53ef\u4ee5\u7684\uff0c\u4e0d\u8fc7\u4e00\u822c\u4e3a\u4e86\u53ef\u8bfb\u6027\u66f4\u597d\uff0c\u8fd8\u662f\u7528\u5927\u5199")),(0,r.kt)("h5",{id:"231-\u521b\u5efa\u6570\u636e\u5e93"},"2.3.1 \u521b\u5efa\u6570\u636e\u5e93"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"-- sqlite \u4e0d\u7528\u641e\uff0c\u94fe\u63a5\u6570\u636e\u5e93\u65f6\u5c31\u4f1a\u81ea\u52a8\u521b\u5efa\uff0c\u4f8b\u5982\n-- import sqlite3\n-- conn = sqlite3.connect('test.db')\n\n-- \u6b63\u5e38\u6570\u636e\u5e93\u9700\u8981\u7528\u8bed\u53e5\u521b\u5efa\uff0c\u4f8b\u5982\nCREATE DATABASE test\uff1b\n")),(0,r.kt)("h5",{id:"232-\u65b0\u5efa\u6570\u636e\u8868"},"2.3.2 \u65b0\u5efa\u6570\u636e\u8868"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"-- \u6ce8\u610f\uff01\uff01\uff01\u6700\u540e\u4e00\u4e2a\u5b57\u6bb5\u7ed3\u5c3e\u4e0d\u80fd\u6709\u9017\u53f7\n-- \u52a0\u5165\u7ea6\u675f\u5efa\u8bae\u6309\u7167\u6559\u7a0b\u81ea\u5df1\u67e5\u8be2\nCREATE TABLE table_name\n(\n    column_name1 data_type(size) constraint_name,\n    column_name2 data_type(size) constraint_name,\n    column_name3 data_type(size) constraint_name\n);\n")),(0,r.kt)("h5",{id:"233-\u67e5\u8be2\u6570\u636e"},"2.3.3 \u67e5\u8be2\u6570\u636e"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT DISTINCT column_1,column_2\nFROM table_name;\n")),(0,r.kt)("p",null,"\u67e5\u8be2\u65f6\u53ef\u4ee5\u52a0\u5165\u4e00\u4e9b\u8fd0\u7b97\u7b26\uff0c\u8fd9\u91cc\u5217\u51fa\u4e86 3 \u4e2a\u7b80\u5355\u7684\u8fd0\u7b97\u7b26"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"WHERE"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"-- WHERE name = 'zhangsan'\uff0c\u53ea\u67e5\u8be2\u540d\u5b57\u4e3a\u5f20\u4e09\u7684\u884c\nSELECT column_1,column_2\nFROM table_name\nWHERE name = '\u5f20\u4e09';\n")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"AND & OR"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"-- WHERE name = 'zhangsan'\uff0c\u53ea\u67e5\u8be2\u540d\u5b57\u4e3a\u5f20\u4e09\u7684\u884c\nSELECT column_1,column_2\nFROM table_name\nWHERE name = '\u5f20\u4e09' OR name = '\u674e\u56db';\n")),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"ORDER BY"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"-- \u6309\u7167 column_1 \u7684\u503c\u5347\u5e8f\u6392\u5217\nSELECT column_1,column_2\nFROM table_name\nORDER BY column_1\n")),(0,r.kt)("h5",{id:"234-\u63d2\u5165\u6570\u636e"},"2.3.4 \u63d2\u5165\u6570\u636e"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u63d2\u5165\u6240\u6709\u5b57\u6bb5")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"INSERT INTO table_name\nVALUES (value1,value2,value3,...);\n")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"\u63d2\u5165\u4e00\u4e9b\u5b57\u6bb5")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"-- \u5728\u6307\u5b9a\u4e86\u5217\u63d2\u5165\u4e00\u4e9b\u5b57\u6bb5\nINSERT INTO table_name (column1,column2,column3)\nVALUES (value1,value2,value3);\n")),(0,r.kt)("h5",{id:"235-\u4fee\u6539\u6570\u636e"},"2.3.5 \u4fee\u6539\u6570\u636e"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"-- \u4fee\u6539\u59d3\u540d\u4e3a\u5f20\u4e09\u7684\u884c\uff0ccolumn1,column2 \u5bf9\u5e94\u7684\u503c\nUPDATE table_name\nSET column1=value1,column2=value2,...\nWHERE name = '\u5f20\u4e09';\n")),(0,r.kt)("h5",{id:"236-\u5220\u9664\u5b57\u6bb5"},"2.3.6 \u5220\u9664\u5b57\u6bb5"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"-- \u5220\u9664\u59d3\u540d\u4e3a\u5f20\u4e09\u7684\u884c\nDELETE FROM table_name\nWHERE name = '\u5f20\u4e09';\n")),(0,r.kt)("h2",{id:"3-python-\u64cd\u4f5c-sqlite"},"3. Python \u64cd\u4f5c Sqlite"),(0,r.kt)("p",null,"\u64cd\u4f5c\u4e0d\u540c\u7684\u6570\u636e\u5e93\uff0c\u9700\u8981\u5f15\u5165\u4e0d\u540c\u7684\u5e93\uff0c\u6bd4\u5982\u64cd\u4f5c mysql \u5c31\u9700\u8981\u5f15\u5165 pymysql\uff0c\u64cd\u4f5c sqlite \u5c31\u9700\u8981 sqlite3\uff0c\u8fd9\u4e9b\u5e93\u90fd\u53ef\u4ee5\u901a\u8fc7 pip \u5b89\u88c5"),(0,r.kt)("h3",{id:"30-\u5b89\u88c5-sqlite"},"3.0 \u5b89\u88c5 Sqlite"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"pip install sqlite3")),(0,r.kt)("h3",{id:"31-\u57fa\u672c\u64cd\u4f5c"},"3.1 \u57fa\u672c\u64cd\u4f5c"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"# \u5bf9\u5e94 demo1.py \u6587\u4ef6\n\n# 1.\u5f15\u5165\u64cd\u4f5c sqlite \u6570\u636e\u5e93\u9700\u8981\u7684\u5e93\nimport sqlite3\n\n# 2. \u4e0e\u6570\u636e\u5e93\u5efa\u7acb\u8fde\u63a5\uff0c \u5982\u679c\u76ee\u5f55\u4e0b\u6ca1\u6709\u8be5\u6587\u4ef6\uff0c \u5c31\u4f1a\u81ea\u52a8\u521b\u5efa\nconn = sqlite3.connect('test.db')\n\n# 3.1 \u5efa\u7acb\u4e00\u4e2a\u53ef\u4ee5\u64cd\u4f5c\u6570\u636e\u5e93\u7684\u5bf9\u8c61\uff0c \u6211\u4eec\u901a\u8fc7\u5b83\u6267\u884c sql \u8bed\u53e5\ncursor = conn.cursor()\n\n# 3.1 \u521b\u5efa\u6570\u636e\u8868\uff0c \u8fd9\u91cc\u662f\u4e00\u4e2a\u5b57\u7b26\u4e32\uff0c python \u53ef\u4ee5\u7528``` ```\u8ba9\u5b57\u7b26\u4e32\u80fd\u591f\u6362\u884c\n# \uff01\uff01\uff01\u6ce8\u610f\uff1a\u5982\u679c\u540d\u4e3a user \u7684\u6570\u636e\u8868\u5df2\u7ecf\u5b58\u5728\uff0c\u5c31\u4f1a\u62a5\u9519\uff0c\u53ef\u4ee5\u5148\u628a\u6587\u4ef6\u5220\u9664\ncursor.execute('''\ncreate table user (\n    id varchar(20) primary key,\n    name varchar(20)\n)\n''')\n\n# 3.2.1 \u5411 user \u8868\u91cc\u63d2\u5165\u4e00\u884c\u65b0\u7684\u6570\u636e\uff0c\u5b57\u7b26\u4e32\u4e24\u8fb9\u9700\u8981\u52a0'', \u52a0\u4e0a\\\u662f\u4e3a\u4e86\u8f6c\u4e49\uff0c\u9632\u6b62\u548c\u5916\u9762\u7684''\u51b2\u7a81\ncursor.execute('insert into user (id, name) values (\\'1\\', \\'Michael\\')')\n# 3.2.2 \u56e0\u4e3a\u6570\u636e\u5e93\u672c\u8eab\u5177\u6709\u4e8b\u52a1\u8fd9\u4e2a\u6982\u5ff5\uff0c\u5bf9\u6570\u636e\u5e93\u7684\u4fee\u6539\u64cd\u4f5c\u4e4b\u540e\uff0c\u90fd\u8981\u5728\u8fdb\u884c\u4e00\u6b21\u63d0\u4ea4\uff0c\u8fd9\u4e2a\u4fee\u6539\u624d\u771f\u6b63\u751f\u6548\nconn.commit()\n\n# 3.3.1 \u67e5\u8be2\u6240\u6709 user \u8868\u91cc\u7684\u6570\u636e\uff0c\u4e0d\u4f1a\u76f4\u63a5\u8fd4\u56de\u67e5\u8be2\u7ed3\u679c\ncursor.execute('select * from user')\n# 3.3.2 \u83b7\u53d6\u67e5\u8be2\u7ed3\u679c\uff0c\u67e5\u8be2\u9700\u8981\u4e3b\u52a8\u7528 fetchall() \u83b7\u53d6\u67e5\u8be2\u7ed3\u679c\nvalues = cursor.fetchall()\nprint(values)\n")),(0,r.kt)("h2",{id:"3-\u4fee\u6539\u767b\u5f55"},"3. \u4fee\u6539\u767b\u5f55"),(0,r.kt)("h3",{id:"31-\u51c6\u5907\u4e00\u4e2a\u6570\u636e\u5e93"},"3.1 \u51c6\u5907\u4e00\u4e2a\u6570\u636e\u5e93"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"import sqlite3\nimport time\nconn = sqlite3.connect('test.db')\ncursor = conn.cursor()\ndef get_time():\n    return time.strftime(\"%Y-%m-%d %H:%M:%S\", time.localtime())\n\ncursor.execute('''\ncreate table user (\n    id int primary key,\n    username varchar(20),\n    password varchar(20),\n    createtime datetime\n)\n''')\n\ncursor.execute('insert into user (id, username, password, createtime) values (?, ?, ?, ?)', [1, 'zhangsan', 'aaaa', get_time()])\ncursor.execute('insert into user (id, username, password, createtime) values (?, ?, ?, ?)', [2, 'lisi', 'bbbb', get_time()])\ncursor.execute('insert into user (id, username, password, createtime) values (?, ?, ?, ?)', [3, 'wangwu', 'cccc', get_time()])\ncursor.execute('insert into user (id, username, password, createtime) values (?, ?, ?, ?)', [4, 'zhaoliu', 'dddd', get_time()])\nconn.commit()\n\ncursor.execute('select * from user')\nvalues = cursor.fetchall()\nprint(values)\n")),(0,r.kt)("h3",{id:"32-\u5b8c\u5584\u4e4b\u524d\u7684\u767b\u5f55"},"3.2 \u5b8c\u5584\u4e4b\u524d\u7684\u767b\u5f55"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"from flask import Flask, request, make_response\nimport time\nimport json\nimport sqlite3\n\napp = Flask(__name__)\n\ndef get_time():\n    return time.strftime(\"%Y-%m-%d %H:%M:%S\", time.localtime())\n\n# \u8bbf\u95ee /user \u76f4\u63a5\u8fd4\u56de\u7528\u6237\u7684\u6240\u6709\u4fe1\u606f\n@app.route('/users')\ndef index():\n    conn = sqlite3.connect('test.db')\n    cursor = conn.cursor()\n    cursor.execute('select * from user')\n    values = cursor.fetchall()\n    return json.dumps(values)\n\n# /self \u6839\u636e cookie \u8fd4\u56de\u7528\u6237\u81ea\u5df1\u7684\u4fe1\u606f\n@app.route('/self')\ndef self():\n    username = request.cookies.get(\"username\", None)\n    password = request.cookies.get(\"password\", None)\n    if username and password:\n        conn = sqlite3.connect('test.db')\n        cursor = conn.cursor()\n        cursor.execute('select * from user where username = ?', [username])\n        user = cursor.fetchone()\n        if user:\n            return json.dumps(user)\n        else:\n            return \"\u6ca1\u6709\u8be5\u7528\u6237\"\n    else:\n        return '\u60a8\u5c1a\u672a\u767b\u5f55'\n\n# /register \u5728\u6570\u636e\u5e93\u4e2d\u63d2\u5165\u4e00\u6761\u65b0\u7684\u7528\u6237\n@app.route('/register')\ndef register():\n    conn = sqlite3.connect('test.db')\n    cursor = conn.cursor()\n\n    args = request.args\n    username = args.get('username')\n    password = args.get('password')\n    if username and password:\n        cursor.execute('select username, password from user where username = ?', (username,))\n        value = cursor.fetchone()\n        if value:\n            return \"\u8be5\u7528\u6237\u540d\u5df2\u7ecf\u88ab\u6ce8\u518c\"\n        else:\n            cursor.execute('insert into user values(?, ?, ?, ?)', (6, username, password, get_time()))\n        return \"\u6ce8\u518c\u6210\u529f\"\n    else:\n        return '\u6ca1\u6709\u8f93\u5165\u6ce8\u518c\u4fe1\u606f'\n\n# /login \u767b\u5f55\uff0c\u5728\u6570\u636e\u5e93\u4e2d\u67e5\u8be2\u7528\u6237\uff0c\u5982\u679c\u7528\u6237\u540d\u5bc6\u7801\u5339\u914d\uff0c\u5c31\u8bbe\u7f6e cookie\n@app.route('/login')\ndef login():\n    # \u5efa\u7acb\u6570\u636e\u5e93\u8fde\u63a5\n    conn = sqlite3.connect('test.db')\n    cursor = conn.cursor()\n\n    args = request.args\n    username = args.get('username')\n    password = args.get('password')\n    if username and password:\n        # \u67e5\u8be2\u72b6\u6001\n        cursor.execute('select username, password from user where username = ?', [username])\n        value = cursor.fetchone()\n        if value:\n            if password == value[1]:\n                response = make_response(\"\u767b\u5f55\u6210\u529f\")\n                response.set_cookie(\"identifier\", username + password)\n                response.set_cookie(\"username\", username)\n                response.set_cookie(\"password\", password)\n                return response\n            else:\n                return '\u5bc6\u7801\u9519\u8bef'\n        else:\n            return \"\u6ca1\u6709\u8be5\u7528\u6237\"\n    else:\n        return '\u6ca1\u6709\u8f93\u5165\u7528\u6237\u7684\u7528\u6237\u540d\u548c\u5bc6\u7801'\n\napp.run(host='127.0.0.1', port=5000)\n")),(0,r.kt)("h2",{id:"4-\u9644\u5f55"},"4. \u9644\u5f55"),(0,r.kt)("h3",{id:"41-python-\u67e5\u770b\u53d8\u91cf\u7684\u7c7b\u578b"},"4.1 python \u67e5\u770b\u53d8\u91cf\u7684\u7c7b\u578b"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"a = [1, 2, 3]\n# type() \u80fd\u591f\u8f93\u51fa\u53d8\u91cf\u7684\u7c7b\u578b\nprint(type(a))\n\na = {\n    'a': 1,\n    'b': [1, 2, 3]\n}\n\nprint(type(a))\nprint(type(a.get('a')))\nprint(type(a.get('b')))\nprint(type(a.get('c')))\n# <class 'dict'> \u5b57\u5178\u7c7b\u578b\n# <class 'int'> \u6570\u5b57\u7c7b\u578b\n# <class 'list'> \u5217\u8868\u7c7b\u578b\n# <class 'NoneType'> \u7a7a\n# \u6240\u4ee5\u4f7f\u7528 get \u65f6\u8981\u5224\u65ad\u8fd4\u56de\u503c\u662f\u5426\u4e3a\u7a7a\n")),(0,r.kt)("h1",{id:"sss"},"sss"),(0,r.kt)("h6",{id:"dfssfesf"},"dfssfesf"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-c"},"int main() {\n    return 0;\n}\n")))}o.isMDXComponent=!0}}]);