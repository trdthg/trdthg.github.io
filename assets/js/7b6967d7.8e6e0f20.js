"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[1796],{3905:(e,t,l)=>{l.d(t,{Zo:()=>m,kt:()=>s});var a=l(7294);function r(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}function n(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,a)}return l}function i(e){for(var t=1;t<arguments.length;t++){var l=null!=arguments[t]?arguments[t]:{};t%2?n(Object(l),!0).forEach((function(t){r(e,t,l[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):n(Object(l)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(l,t))}))}return e}function o(e,t){if(null==e)return{};var l,a,r=function(e,t){if(null==e)return{};var l,a,r={},n=Object.keys(e);for(a=0;a<n.length;a++)l=n[a],t.indexOf(l)>=0||(r[l]=e[l]);return r}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)l=n[a],t.indexOf(l)>=0||Object.prototype.propertyIsEnumerable.call(e,l)&&(r[l]=e[l])}return r}var u=a.createContext({}),p=function(e){var t=a.useContext(u),l=t;return e&&(l="function"==typeof e?e(t):i(i({},t),e)),l},m=function(e){var t=p(e.components);return a.createElement(u.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var l=e.components,r=e.mdxType,n=e.originalType,u=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),c=p(l),s=r,b=c["".concat(u,".").concat(s)]||c[s]||k[s]||n;return l?a.createElement(b,i(i({ref:t},m),{},{components:l})):a.createElement(b,i({ref:t},m))}));function s(e,t){var l=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var n=l.length,i=new Array(n);i[0]=c;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var p=2;p<n;p++)i[p]=l[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,l)}c.displayName="MDXCreateElement"},1689:(e,t,l)=>{l.r(t),l.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>k,frontMatter:()=>n,metadata:()=>o,toc:()=>p});var a=l(7462),r=(l(7294),l(3905));const n={},i="\u6570\u636e\u5e93\u5b58\u50a8\u5f15\u64ce",o={permalink:"/blog/lsm",source:"@site/blog/lsm.md",title:"\u6570\u636e\u5e93\u5b58\u50a8\u5f15\u64ce",description:"Bitcast",date:"2023-04-12T10:18:59.000Z",formattedDate:"2023\u5e744\u670812\u65e5",tags:[],readingTime:8.88,hasTruncateMarker:!1,authors:[],frontMatter:{},prevItem:{title:"Linux \u53d1\u884c\u7248\u914d\u7f6e",permalink:"/blog/i3wm"},nextItem:{title:"\u8d44\u6e90\u6574\u7406",permalink:"/blog/resources"}},u={authorsImageUrls:[]},p=[{value:"Bitcast",id:"bitcast",level:2},{value:"LSM",id:"lsm",level:2},{value:"\u6838\u5fc3\u601d\u60f3",id:"\u6838\u5fc3\u601d\u60f3",level:3},{value:"\u5199\u5165\u8fc7\u7a0b",id:"\u5199\u5165\u8fc7\u7a0b",level:3},{value:"Level DB",id:"level-db",level:3}],m={toc:p};function k(e){let{components:t,...l}=e;return(0,r.kt)("wrapper",(0,a.Z)({},m,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"bitcast"},"Bitcast"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u65e5\u5fd7\u578b"),(0,r.kt)("li",{parentName:"ul"},"\u57fa\u4e8e hash \u8868")),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u53ea\u652f\u6301\u8ffd\u52a0\nBitcast \u4ec5\u652f\u6301\u8ffd\u52a0\u64cd\u4f5c\uff08Append-only\uff09\uff0c\u5373\u6240\u6709\u7684\u5199\u64cd\u4f5c\u53ea\u8ffd\u52a0\u800c\u4e0d\u4fee\u6539\u8001\u7684\u6570\u636e\u3002"),(0,r.kt)("li",{parentName:"ol"},"\u591a\u7248\u672c\u6587\u4ef6",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\u6bcf\u4e2a\u6587\u4ef6\u6709\u4e00\u5b9a\u7684\u5927\u5c0f\u9650\u5236\uff0c\u5f53\u6587\u4ef6\u589e\u52a0\u5230\u76f8\u5e94\u7684\u5927\u5c0f\u65f6\uff0c\u5c31\u4f1a\u4ea7\u751f\u4e00\u4e2a\u65b0\u7684\u6587\u4ef6\uff0c\u8001\u7684\u6587\u4ef6\u53ea\u8bfb\u4e0d\u5199\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u5728\u4efb\u610f\u65f6\u523b\uff0c\u53ea\u6709\u4e00\u4e2a\u6587\u4ef6\u662f\u53ef\u5199\u7684\uff0c\u7528\u4e8e\u6570\u636e\u8ffd\u52a0\uff0c\u79f0\u4e3a\u6d3b\u8dc3\u6570\u636e\u6587\u4ef6\uff08active data file\uff09\u3002\u800c\u5176\u4ed6\u5df2\u7ecf\u8fbe\u5230\u5927\u5c0f\u9650\u5236\u7684\u6587\u4ef6\uff0c\u79f0\u4e3a\u8001\u6570\u636e\u6587\u4ef6\uff08older data file\uff09\u3002"))),(0,r.kt)("li",{parentName:"ol"},"\u65e5\u5fd7\u6587\u4ef6",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},'Bitcast \u6570\u636e\u6587\u4ef6\u4e2d\u7684\u6570\u636e\u662f\u4e00\u6761\u4e00\u6761\u7684 "\u64cd\u4f5c", \u6240\u6709\u7684\u64cd\u4f5c\u90fd\u4f1a\u5e8f\u5217\u5316\u5230\u65e5\u5fd7\u6587\u4ef6\u91cc (\u5305\u62ec\u5220\u9664).'),(0,r.kt)("li",{parentName:"ul"},"\u5199\u5165\u65f6\u9996\u5148\u5c06 Key-Value \u8bb0\u5f55\u8ffd\u52a0\u5230\u6d3b\u8dc3\u6570\u636e\u6587\u4ef6\u7684\u672b\u5c3e\uff0c\u63a5\u7740\u66f4\u65b0\u5185\u5b58\u54c8\u5e0c\u8868\uff0c\u56e0\u6b64\uff0c\u6bcf\u4e2a\u5199\u64cd\u4f5c\u603b\u5171\u9700\u8981\u8fdb\u884c\u4e00\u6b21\u987a\u5e8f\u7684\u78c1\u76d8\u5199\u5165\u548c\u4e00\u6b21\u5185\u5b58\u64cd\u4f5c\u3002"))),(0,r.kt)("li",{parentName:"ol"},"\u65e5\u5fd7\u538b\u7f29",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Bitcask \u9700\u8981\u5b9a\u671f\u6267\u884c\u5408\u5e76\uff08Compaction\uff09\u64cd\u4f5c\u4ee5\u5b9e\u73b0\u5783\u573e\u56de\u6536\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u5408\u5e76\u64cd\u4f5c\uff0c\u5373\u5c06\u6240\u6709\u8001\u6570\u636e\u6587\u4ef6\u4e2d\u7684\u6570\u636e\u626b\u63cf\u4e00\u904d\u5e76\u751f\u6210\u65b0\u7684\u6570\u636e\u6587\u4ef6\uff0c\u540c\u4e00\u4e2a key \u7684\u591a\u4e2a\u64cd\u4f5c\u4ee5\u53ea\u4fdd\u7559\u6700\u65b0\u4e00\u4e2a\u7684\u539f\u5219\u8fdb\u884c\u5220\u9664\uff0c\u6bcf\u6b21\u5408\u5e76\u540e\uff0c\u65b0\u751f\u6210\u7684\u6570\u636e\u6587\u4ef6\u5c31\u4e0d\u518d\u6709\u5197\u4f59\u6570\u636e\u4e86\u3002"))),(0,r.kt)("li",{parentName:"ol"},"hash \u7d22\u5f15",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\u54c8\u5e0c\u7d22\u5f15\u5b58\u50a8\u5728\u5185\u5b58\u4e2d\uff0c\u5982\u679c\u4e0d\u505a\u989d\u5916\u7684\u5de5\u4f5c\uff0c\u670d\u52a1\u5668\u65ad\u7535\u91cd\u542f\u91cd\u5efa\u54c8\u5e0c\u8868\u9700\u8981\u626b\u63cf\u4e00\u904d\u6570\u636e\u6587\u4ef6"),(0,r.kt)("li",{parentName:"ul"},"\u5982\u679c\u6570\u636e\u6587\u4ef6\u5f88\u5927\uff0c\u8fd9\u662f\u4e00\u4e2a\u975e\u5e38\u8017\u65f6\u7684\u8fc7\u7a0b\u3002\u53ef\u4ee5\u901a\u8fc7\u7d22\u5f15\u6587\u4ef6\uff08hint file\uff09\u6765\u63d0\u9ad8\u91cd\u5efa\u54c8\u5e0c\u8868\u7684\u901f\u5ea6\u3002")))),(0,r.kt)("h2",{id:"lsm"},"LSM"),(0,r.kt)("h3",{id:"\u6838\u5fc3\u601d\u60f3"},"\u6838\u5fc3\u601d\u60f3"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u653e\u5f03\u90e8\u5206\u8bfb\u80fd\u529b\uff0c\u6362\u53d6\u5199\u5165\u7684\u6700\u5927\u5316\u80fd\u529b")),(0,r.kt)("p",null,"\u5148\u53ef\u4ee5\u5c06\u66f4\u65b0\u7684\u6570\u636e\u9a7b\u7559\u5728\u5185\u5b58\u4e2d\uff0c\u7b49\u5230\u79ef\u7d2f\u8db3\u591f\u591a\u4e4b\u540e\uff0c\u518d\u4f7f\u7528\u5f52\u5e76\u6392\u5e8f\u7684\u65b9\u5f0f\u5c06\u5185\u5b58\u5185\u7684\u6570\u636e\u5408\u5e76\u8ffd\u52a0\u5230\u78c1\u76d8\u4e2d\u3002"),(0,r.kt)("p",null,"LSM-tree \u7684\u4e3b\u8981\u601d\u60f3\u662f\u5212\u5206\u4e0d\u540c\u7b49\u7ea7\u7684\u6811\u3002"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u4ee5\u4e24\u7ea7\u6811\u4e3a\u4f8b\uff0c\u53ef\u4ee5\u60f3\u8c61\u4e00\u4efd\u7d22\u5f15\u6570\u636e\u7531\u4e24\u68f5\u6811\u7ec4\u6210\uff0c\u4e00\u68f5\u6811\u5b58\u5728\u4e8e\u5185\u5b58\uff0c\u4e00\u68f5\u6811\u5b58\u5728\u4e8e\u78c1\u76d8\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u5185\u5b58\u4e2d\u7684\u6811\u53ef\u4ee5\u4e0d\u4e00\u5b9a\u662f B \u6811\uff0c\u53ef\u4ee5\u662f\u5176\u4ed6\u7684\u6811\uff0c\u4f8b\u5982 AVL \u6811\u3002\u56e0\u4e3a\u6570\u636e\u5927\u5c0f\u662f\u4e0d\u540c\u7684\uff0c\u6ca1\u5fc5\u8981\u727a\u7272 CPU \u6765\u8fbe\u5230\u6700\u5c0f\u7684\u6811\u9ad8\u5ea6\uff0c\u800c\u5b58\u5728\u4e8e\u78c1\u76d8\u7684\u6811\u5219\u662f\u4e00\u68f5 B \u6811\u3002")),(0,r.kt)("h3",{id:"\u5199\u5165\u8fc7\u7a0b"},"\u5199\u5165\u8fc7\u7a0b"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u5728 LSM \u6811\u4e2d\uff0c\u5199\u5165\u6570\u636e\u65f6\u9996\u5148\u4f1a\u63d2\u5165\u5230\u5185\u5b58\u7684\u6811\u4e2d\u3002")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u5f53\u5185\u5b58\u4e2d\u7684\u6811\u7684\u6570\u636e\u8d85\u8fc7\u4e00\u5b9a\u9608\u503c\u65f6\uff0c\u4f1a\u8fdb\u884c\u5408\u5e76\u64cd\u4f5c\u3002\u5408\u5e76\u64cd\u4f5c\u4f1a\u987a\u5e8f\u904d\u5386\u5185\u5b58\u4e2d\u7684\u6811\u7684\u53f6\u5b50\u8282\u70b9\uff0c\u5e76\u4e0e\u78c1\u76d8\u4e2d\u7684\u6811\u7684\u53f6\u5b50\u8282\u70b9\u8fdb\u884c\u5408\u5e76"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\u5f53\u88ab\u5408\u5e76\u7684\u6570\u636e\u91cf\u8fbe\u5230\u78c1\u76d8\u7684\u5b58\u50a8\u9875\u7684\u5927\u5c0f\u65f6\uff0c\u4f1a\u5c06\u6570\u636e\u6301\u4e45\u5316\u5230\u78c1\u76d8\uff0c\u540c\u65f6\u66f4\u65b0\u7236\u4eb2\u8282\u70b9\u5bf9\u53f6\u5b50\u8282\u70b9\u7684\u6307\u9488\u3002"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"LSM \u6811\u53ef\u4ee5\u5212\u5206\u6210\u5f88\u591a\u5c42\u7ea7\u7684\u6811"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\u7b2c 0 \u5c42\u5b58\u50a8\u5728\u5185\u5b58\uff0c\u7b2c 1 \u5230 k \u5c42\u5b58\u50a8\u5728\u78c1\u76d8\uff0c\u6bcf\u5c42\u7684\u6570\u636e\u90fd\u662f\u6709\u5e8f\u7684\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u6570\u636e\u9996\u5148\u4f1a\u63d2\u5165\u5230\u7b2c 0 \u5c42\uff0c\u7136\u540e\u540e\u53f0\u9010\u5c42\u5408\u5e76\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u6bcf\u4e00\u5c42\u7684\u6570\u636e\u8d85\u8fc7\u4e00\u5b9a\u9608\u503c\u65f6\uff0c\u5f80\u4e0b\u4e00\u5c42\u5408\u5e76\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u8bfb\u53d6\u53f6\u7531\u4e8e\u4e0d\u77e5\u9053\u6570\u636e\u5728\u54ea\u4e00\u5c42\u4e0a\uff0c\u53ef\u80fd\u9700\u8981\u904d\u5386\u6240\u6709\u7684\u5c42\u3002")))),(0,r.kt)("h3",{id:"level-db"},"Level DB"),(0,r.kt)("p",null,"LevelDB \u5b58\u50a8\u5f15\u64ce\u4e3b\u8981\u5305\u62ec\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u5185\u5b58\u4e2d\u7684 MemTable \u548c\u4e0d\u53ef\u53d8 MemTable\uff08\u4e5f\u79f0\u4e3a Frozen MemTable\uff09"),(0,r.kt)("li",{parentName:"ul"},"\u78c1\u76d8\u4e0a\u7684\u51e0\u79cd\u4e3b\u8981\u6587\u4ef6\uff1a",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\u5f53\u524d\uff08Current\uff09\u6587\u4ef6"),(0,r.kt)("li",{parentName:"ul"},"\u6e05\u5355\uff08Manifest\uff09\u6587\u4ef6"),(0,r.kt)("li",{parentName:"ul"},"\u64cd\u4f5c\u65e5\u5fd7\uff08Commit Log\uff0c\u4e5f\u79f0\u4e3a\u63d0\u4ea4\u65e5\u5fd7\uff09\u6587\u4ef6"),(0,r.kt)("li",{parentName:"ul"},"SSTable \u6587\u4ef6")))),(0,r.kt)("p",null,"\u5199\u5165\u8fc7\u7a0b\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u5f53\u5e94\u7528\u5199\u5165\u4e00\u6761\u8bb0\u5f55\u65f6\uff0cLevelDB \u4f1a\u9996\u5148\u5c06\u4fee\u6539\u64cd\u4f5c\u5199\u5165\u5230\u64cd\u4f5c\u65e5\u5fd7\u6587\u4ef6\uff0c\u6210\u529f\u540e\u518d\u5c06\u4fee\u6539\u64cd\u4f5c\u5e94\u7528\u5230 MemTable\uff0c\u8fd9\u6837\u5c31\u5b8c\u6210\u4e86\u5199\u5165\u64cd\u4f5c\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u5f53 MemTable \u5360\u7528\u7684\u5185\u5b58\u8fbe\u5230\u4e00\u4e2a\u4e0a\u9650\u503c\u540e\uff0c\u9700\u8981\u5c06\u5185\u5b58\u7684\u6570\u636e\u8f6c\u50a8\u5230\u5916\u5b58\u6587\u4ef6\u4e2d\u3002"),(0,r.kt)("li",{parentName:"ul"},"LevelDB \u4f1a\u5c06\u539f\u5148\u7684 MemTable \u51bb\u7ed3\u6210\u4e3a\u4e0d\u53ef\u53d8 MemTable\uff0c\u5e76\u751f\u6210\u4e00\u4e2a\u65b0 MemTable\u3002\u65b0\u5230\u6765\u7684\u6570\u636e\u88ab\u8bb0\u5165\u65b0\u7684\u64cd\u4f5c\u65e5\u5fd7\u6587\u4ef6\u548c\u65b0\u751f\u6210\u7684 MemTable \u4e2d\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u4e0d\u53ef\u53d8 MemTable \u7684\u5185\u5bb9\u662f\u4e0d\u53ef\u66f4\u6539\u7684\uff0c\u53ea\u80fd\u8bfb\u53d6\u4e0d\u80fd\u5199\u5165\u6216\u8005\u5220\u9664\u3002LevelDB \u540e\u53f0\u7ebf\u7a0b\u4f1a\u5c06\u4e0d\u53ef\u53d8 MemTable \u7684\u6570\u636e\u6392\u5e8f\u540e\u8f6c\u50a8\u5230\u78c1\u76d8\uff0c\u5f62\u6210\u4e00\u4e2a\u65b0\u7684 SSTable \u6587\u4ef6\uff0c\u8fd9\u4e2a\u64cd\u4f5c\u79f0\u4e3a Compaction\u3002"),(0,r.kt)("li",{parentName:"ul"},"SSTable \u6587\u4ef6\u662f\u5185\u5b58\u4e2d\u7684\u6570\u636e\u4e0d\u65ad\u8fdb\u884c Compaction \u64cd\u4f5c\u540e\u5f62\u6210\u7684\uff0c\u4e14 SSTable \u7684\u6240\u6709\u6587\u4ef6\u662f\u4e00\u79cd\u5c42\u7ea7\u7ed3\u6784\uff0c\u7b2c 0 \u5c42\u4e3a Level 0\uff0c\u7b2c 1 \u5c42\u4e3a Level 1\uff0c\u4ee5\u6b64\u7c7b\u63a8\u3002")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"SSTable: SSTable\u662f\u4e00\u4e2a\u952e\u662f\u6709\u5e8f\u7684\uff0c\u5b58\u50a8\u5b57\u7b26\u4e32\u5f62\u5f0f\u952e\u503c\u5bf9\u7684\u6587\u4ef6\u3002\u5b83\u662f\u4e00\u4e2a\u5185\u90e8\u5305\u542b\u4e86\u4efb\u610f\u957f\u5ea6\u3001\u6392\u597d\u5e8f\u7684\u952e\u503c\u5bf9\u96c6\u5408\u7684\u6587\u4ef6\u3002SSTable\u6587\u4ef6\u7531\u4e24\u90e8\u5206\u6570\u636e\u7ec4\u6210\uff1a\u7d22\u5f15\u548c\u952e\u503c\u5bf9\u6570\u636e\u3002\u6240\u6709\u7684key\u548cvalue\u90fd\u662f\u7d27\u51d1\u5730\u5b58\u653e\u5728\u4e00\u8d77\u7684\uff0c\u5982\u679c\u8981\u8bfb\u53d6\u67d0\u4e2a\u952e\u5bf9\u5e94\u7684\u503c\uff0c\u9700\u8981\u901a\u8fc7\u7d22\u5f15\u4e2d\u7684key:offset\u6765\u5b9a\u4f4d\u3002SSTable\u5728\u5e8f\u5217\u5316\u6210\u6587\u4ef6\u4e4b\u540e\uff0c\u662f\u4e0d\u53ef\u53d8\u7684\uff0c\u56e0\u4e3a\u6b64\u65f6\u7684SSTable,\u5c31\u7c7b\u4f3c\u4e8e\u4e00\u4e2a\u6570\u7ec4\u4e00\u6837\uff0c\u5982\u679c\u63d2\u5165\u6216\u8005\u5220\u9664\uff0c\u9700\u8981\u79fb\u52a8\u4e00\u5927\u7247\u6570\u636e\uff0c\u5f00\u9500\u6bd4\u8f83\u5927\u3002")),(0,r.kt)("p",null,"\u52a0\u5feb\u8bbf\u95ee\u6548\u7387\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"LSM \u6811\u5199\u5165\u6548\u7387\u5f88\u9ad8\uff0c\u4f46\u8bfb\u53d6\u53ef\u80fd\u9700\u8981\u8bbf\u95ee\u8f83\u591a\u7684\u78c1\u76d8\u6587\u4ef6\uff0c\u6548\u7387\u8f83\u4f4e\u3002\u4e3a\u4e86\u52a0\u5feb\u8bfb\u53d6\u6548\u7387\uff0c\u5de5\u7a0b\u5b9e\u73b0\u4e0a\u4e00\u822c\u4f7f\u7528 Bloom Filter \u6765\u52a0\u5feb\u8bfb\u53d6\u6548\u7387\u3002\u5b83\u4f7f\u7528\u5f88\u5c0f\u7684\u5b58\u50a8\u7a7a\u95f4\u6362\u6765\u8f83\u5927\u7684\u8bfb\u53d6\u6548\u7387\u63d0\u5347\u3002")),(0,r.kt)("p",null,"Bloom Filter \u662f\u4e00\u79cd\u7a7a\u95f4\u6548\u7387\u5f88\u9ad8\u7684\u968f\u673a\u6570\u636e\u7ed3\u6784\uff0c\u5b83\u5229\u7528\u4f4d\u6570\u7ec4\u5f88\u7b80\u6d01\u5730\u8868\u793a\u4e00\u4e2a\u96c6\u5408\uff0c\u5e76\u80fd\u5224\u65ad\u4e00\u4e2a\u5143\u7d20\u662f\u5426\u5c5e\u4e8e\u8fd9\u4e2a\u96c6\u5408\u3002"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Bloom Filter \u7684\u8fd9\u79cd\u9ad8\u6548\u662f\u6709\u4e00\u5b9a\u4ee3\u4ef7\u7684\uff1a\u5728\u5224\u65ad\u4e00\u4e2a\u5143\u7d20\u662f\u5426\u5c5e\u4e8e\u67d0\u4e2a\u96c6\u5408\u65f6\uff0c\u6709\u53ef\u80fd\u4f1a\u628a\u4e0d\u5c5e\u4e8e\u8fd9\u4e2a\u96c6\u5408\u7684\u5143\u7d20\u8bef\u8ba4\u4e3a\u5c5e\u4e8e\u8fd9\u4e2a\u96c6\u5408\uff08false positive\uff09\u3002\u56e0\u6b64\uff0cBloom Filter \u4e0d\u9002\u5408\u90a3\u4e9b\u201c\u96f6\u9519\u8bef\u201d\u7684\u5e94\u7528\u573a\u5408\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u800c\u5728\u80fd\u5bb9\u5fcd\u4f4e\u9519\u8bef\u7387\u7684\u5e94\u7528\u573a\u5408\u4e0b\uff0cBloom Filter \u901a\u8fc7\u6781\u5c11\u7684\u9519\u8bef\u6362\u53d6\u4e86\u5b58\u50a8\u7a7a\u95f4\u7684\u6781\u5927\u8282\u7701\u3002")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u521d\u59cb\u72b6\u6001\u65f6\uff0cBloom Filter \u662f\u4e00\u4e2a\u5305\u542b m \u4f4d\u7684\u4f4d\u6570\u7ec4\uff0c\u6bcf\u4e00\u4f4d\u90fd\u7f6e\u4e3a 0\u3002\u4e3a\u4e86\u8868\u8fbe S={x1, x2,\u2026,xn}\u8fd9\u6837\u4e00\u4e2a n \u4e2a\u5143\u7d20\u7684\u96c6\u5408\uff0cBloom Filter \u4f7f\u7528 k \u4e2a\u76f8\u4e92\u72ec\u7acb\u7684\u54c8\u5e0c\u51fd\u6570\uff08Hash Function\uff09\uff0c\u5b83\u4eec\u5206\u522b\u5c06\u96c6\u5408\u4e2d\u7684\u6bcf\u4e2a\u5143\u7d20\u6620\u5c04\u5230{1,\u2026,m}\u7684\u8303\u56f4\u4e2d\u3002\u5bf9\u4efb\u610f\u4e00\u4e2a\u5143\u7d20 x\uff0c\u7b2c i \u4e2a\u54c8\u5e0c\u51fd\u6570\u6620\u5c04\u7684\u4f4d\u7f6e hi(x) \u5c31\u4f1a\u88ab\u7f6e\u4e3a 1\uff081\u2264i\u2264k\uff09\u3002\u6ce8\u610f\uff0c\u5982\u679c\u4e00\u4e2a\u4f4d\u7f6e\u591a\u6b21\u88ab\u7f6e\u4e3a 1\uff0c\u90a3\u4e48\u53ea\u6709\u7b2c\u4e00\u6b21\u4f1a\u8d77\u4f5c\u7528\uff0c\u540e\u9762\u51e0\u6b21\u5c06\u6ca1\u6709\u4efb\u4f55\u6548\u679c\u3002\u5728\u5224\u65ad y \u662f\u5426\u5c5e\u4e8e\u8fd9\u4e2a\u96c6\u5408\u65f6\uff0c\u6211\u4eec\u5bf9 y \u5e94\u7528 k \u6b21\u54c8\u5e0c\u51fd\u6570\uff0c\u5982\u679c\u6240\u6709 hi(y) \u7684\u4f4d\u7f6e\u90fd\u662f 1\uff081\u2264i\u2264k\uff09\uff0c\u90a3\u4e48\u6211\u4eec\u5c31\u8ba4\u4e3a y \u662f\u96c6\u5408\u4e2d\u7684\u5143\u7d20\uff0c\u5426\u5219\u5c31\u8ba4\u4e3a y \u4e0d\u662f\u96c6\u5408\u4e2d\u7684\u5143\u7d20\u3002")))}k.isMDXComponent=!0}}]);