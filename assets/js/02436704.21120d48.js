"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[5392],{3905:(e,t,n)=>{n.d(t,{Zo:()=>i,kt:()=>g});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},i=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,i=p(e,["components","mdxType","originalType","parentName"]),d=u(n),g=o,m=d["".concat(s,".").concat(g)]||d[g]||c[g]||a;return n?r.createElement(m,l(l({ref:t},i),{},{components:n})):r.createElement(m,l({ref:t},i))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=d;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:o,l[1]=p;for(var u=2;u<a;u++)l[u]=n[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7962:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>a,metadata:()=>p,toc:()=>u});var r=n(7462),o=(n(7294),n(3905));const a={},l="JS \u8fdb\u9636",p={unversionedId:"notes/frontend/js_advanced",id:"notes/frontend/js_advanced",title:"JS \u8fdb\u9636",description:"1. Object.defineProperty",source:"@site/docs/notes/frontend/js_advanced.md",sourceDirName:"notes/frontend",slug:"/notes/frontend/js_advanced",permalink:"/docs/notes/frontend/js_advanced",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"HTTP \u76f8\u5173",permalink:"/docs/notes/frontend/http"},next:{title:"\u672a\u6574\u7406",permalink:"/docs/notes/frontend/list"}},s={},u=[{value:"1. Object.defineProperty",id:"1-objectdefineproperty",level:2},{value:"2. new Proxy(target, handler)",id:"2-new-proxytarget-handler",level:2},{value:"2.1 \u57fa\u672c\u6982\u5ff5",id:"21-\u57fa\u672c\u6982\u5ff5",level:3},{value:"2.2 \u6807\u51c6\u7684 traps",id:"22-\u6807\u51c6\u7684-traps",level:3},{value:"2.3 get set",id:"23-get-set",level:3},{value:"2.4 \u4ee3\u7406\u8f6c\u53d1",id:"24-\u4ee3\u7406\u8f6c\u53d1",level:3},{value:"2.5 \u5bf9\u65b9\u6cd5\u8c03\u7528\u7684\u4ee3\u7406",id:"25-\u5bf9\u65b9\u6cd5\u8c03\u7528\u7684\u4ee3\u7406",level:3},{value:"2.6 \u5bf9\u6784\u9020\u51fd\u6570\u7684\u4ee3\u7406",id:"26-\u5bf9\u6784\u9020\u51fd\u6570\u7684\u4ee3\u7406",level:3},{value:"2.7 \u5b9e\u4f8b\uff1a\u4ea4\u6362\u4e24\u4e2a\u5355\u9009\u6846\u7684\u9009\u62e9\u72b6\u6001",id:"27-\u5b9e\u4f8b\u4ea4\u6362\u4e24\u4e2a\u5355\u9009\u6846\u7684\u9009\u62e9\u72b6\u6001",level:3},{value:"2.8 \u5b9e\u4f8b\uff1a\u5bf9\u6570\u7ec4\u65b9\u6cd5\u7684\u62d3\u5c55",id:"28-\u5b9e\u4f8b\u5bf9\u6570\u7ec4\u65b9\u6cd5\u7684\u62d3\u5c55",level:3},{value:"\u5176\u4ed6",id:"\u5176\u4ed6",level:2},{value:"Map vs WeakMap",id:"map-vs-weakmap",level:3}],i={toc:u};function c(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},i,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"js-\u8fdb\u9636"},"JS \u8fdb\u9636"),(0,o.kt)("h2",{id:"1-objectdefineproperty"},"1. Object.defineProperty"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"Object.defineProperty(obj, prop, description)\n\nobj\n  \u8981\u5b9a\u4e49\u5c5e\u6027\u7684\u5bf9\u8c61\u3002\nprop\n  \u8981\u5b9a\u4e49\u6216\u4fee\u6539\u7684\u5c5e\u6027\u7684\u540d\u79f0\u6216 Symbol \u3002\ndescriptor\n  \u8981\u5b9a\u4e49\u6216\u4fee\u6539\u7684\u5c5e\u6027\u63cf\u8ff0\u7b26\u3002\n")),(0,o.kt)("p",null,"\u8be5\u51fd\u6570\u80fd\u591f\u7cbe\u786e\u7684\u5b9a\u4e49\u4e00\u4e2a\u5bf9\u8c61\u4e0a\u67d0\u4e2a\u5c5e\u6027\u7684\u63cf\u8ff0\u7b26 \u5c5e\u6027\u63cf\u8ff0\u7b26\u5206\u4e3a\u6570\u636e\u63cf\u8ff0\u7b26\u548c\u5b58\u53d6\u63cf\u8ff0\u7b26\uff0c\u5224\u65ad\u662f\u4ec0\u4e48\u63cf\u8ff0\u7b26\u9700\u8981\u770b\u8fd9\u4e2a\u63cf\u8ff0\u7b26\u4e2d\u62e5\u6709\u7684\u952e\u503c \u5982\u679c\u4e00\u4e2a\u63cf\u8ff0\u7b26\u4e0d\u5177\u6709\nvalue\u3001writable\u3001get \u548c set \u4e2d\u7684\u4efb\u610f\u4e00\u4e2a\u952e\uff0c\u90a3\u4e48\u5b83\u5c06\u88ab\u8ba4\u4e3a\u662f\u4e00\u4e2a\u6570\u636e\u63cf\u8ff0\u7b26\u3002\u5982\u679c\u4e00\u4e2a\u63cf\u8ff0\u7b26\u540c\u65f6\u62e5\u6709 value \u6216 writable \u548c\nget \u6216 set \u952e\uff0c\u5219\u4f1a\u4ea7\u751f\u4e00\u4e2a\u5f02\u5e38\u3002"),(0,o.kt)("p",null,"\u4e0b\u9762\u662f\u63cf\u8ff0\u7b26\u53ef\u9009\u7684\u952e\u503c"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"\u901a\u7528\u952e\u503c"))),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"configurable \u5f53\u4e14\u4ec5\u5f53\u8be5\u5c5e\u6027\u7684 configurable \u952e\u503c\u4e3a true \u65f6\uff0c\u8be5\u5c5e\u6027\u7684\u63cf\u8ff0\u7b26\u624d\u80fd\u591f\u88ab\u6539\u53d8\uff0c\u540c\u65f6\u8be5\u5c5e\u6027\u4e5f\u80fd\u4ece\u5bf9\u5e94\u7684\u5bf9\u8c61\u4e0a\u88ab\u5220\u9664\u3002\n\u9ed8\u8ba4\u4e3a false\u3002"),(0,o.kt)("li",{parentName:"ul"},"enumerable \u5f53\u4e14\u4ec5\u5f53\u8be5\u5c5e\u6027\u7684 enumerable \u952e\u503c\u4e3a true \u65f6\uff0c\u8be5\u5c5e\u6027\u624d\u4f1a\u51fa\u73b0\u5728\u5bf9\u8c61\u7684\u679a\u4e3e\u5c5e\u6027\u4e2d\u3002\u9ed8\u8ba4\u4e3a false\u3002")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"\u6570\u636e\u63cf\u8ff0\u7b26"),"\u8fd8\u5177\u6709\u4ee5\u4e0b\u53ef\u9009\u952e\u503c\uff1a")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"value \u8be5\u5c5e\u6027\u5bf9\u5e94\u7684\u503c\u3002\u53ef\u4ee5\u662f\u4efb\u4f55\u6709\u6548\u7684 JavaScript \u503c\uff08\u6570\u503c\uff0c\u5bf9\u8c61\uff0c\u51fd\u6570\u7b49\uff09\u3002\u9ed8\u8ba4\u4e3a undefined\u3002"),(0,o.kt)("li",{parentName:"ul"},"writable \u5f53\u4e14\u4ec5\u5f53\u8be5\u5c5e\u6027\u7684 writable \u952e\u503c\u4e3a true \u65f6\uff0c\u5c5e\u6027\u7684\u503c\uff0c\u4e5f\u5c31\u662f\u4e0a\u9762\u7684 value\uff0c\u624d\u80fd\u88ab\u8d4b\u503c\u8fd0\u7b97\u7b26 (en-US) \u6539\u53d8\u3002\n\u9ed8\u8ba4\u4e3a false\u3002")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"\u5b58\u53d6\u63cf\u8ff0\u7b26"),"\u8fd8\u5177\u6709\u4ee5\u4e0b\u53ef\u9009\u952e\u503c\uff1a")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"get \u5c5e\u6027\u7684 getter \u51fd\u6570\uff0c\u5982\u679c\u6ca1\u6709 getter\uff0c\u5219\u4e3a undefined\u3002\u5f53\u8bbf\u95ee\u8be5\u5c5e\u6027\u65f6\uff0c\u4f1a\u8c03\u7528\u6b64\u51fd\u6570\u3002\u6267\u884c\u65f6\u4e0d\u4f20\u5165\u4efb\u4f55\u53c2\u6570\uff0c\u4f46\u662f\u4f1a\u4f20\u5165\nthis \u5bf9\u8c61\uff08\u7531\u4e8e\u7ee7\u627f\u5173\u7cfb\uff0c\u8fd9\u91cc\u7684 this \u5e76\u4e0d\u4e00\u5b9a\u662f\u5b9a\u4e49\u8be5\u5c5e\u6027\u7684\u5bf9\u8c61\uff09\u3002\u8be5\u51fd\u6570\u7684\u8fd4\u56de\u503c\u4f1a\u88ab\u7528\u4f5c\u5c5e\u6027\u7684\u503c\u3002\u9ed8\u8ba4\u4e3a undefined\u3002"),(0,o.kt)("li",{parentName:"ul"},"set \u5c5e\u6027\u7684 setter \u51fd\u6570\uff0c\u5982\u679c\u6ca1\u6709 setter\uff0c\u5219\u4e3a\nundefined\u3002\u5f53\u5c5e\u6027\u503c\u88ab\u4fee\u6539\u65f6\uff0c\u4f1a\u8c03\u7528\u6b64\u51fd\u6570\u3002\u8be5\u65b9\u6cd5\u63a5\u53d7\u4e00\u4e2a\u53c2\u6570\uff08\u4e5f\u5c31\u662f\u88ab\u8d4b\u4e88\u7684\u65b0\u503c\uff09\uff0c\u4f1a\u4f20\u5165\u8d4b\u503c\u65f6\u7684 this \u5bf9\u8c61\u3002\u9ed8\u8ba4\u4e3a undefined\u3002")),(0,o.kt)("h2",{id:"2-new-proxytarget-handler"},"2. new Proxy(target, handler)"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy"},"MDN-Proxy")),(0,o.kt)("h3",{id:"21-\u57fa\u672c\u6982\u5ff5"},"2.1 \u57fa\u672c\u6982\u5ff5"),(0,o.kt)("p",null,"\u521b\u5efa\u4ee3\u7406\u5bf9\u8c61\u5b9e\u73b0\u5bf9\u5bf9\u8c61\u64cd\u4f5c\u65f6\u7684\u62e6\u622a\u548c\u81ea\u5b9a\u4e49"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"handler (en-US) \u4e00\u4e2a\u901a\u5e38\u4ee5\u51fd\u6570\u4f5c\u4e3a\u5c5e\u6027\u7684\u5bf9\u8c61\uff0c\u5404\u5c5e\u6027\u4e2d\u7684\u51fd\u6570\u5206\u522b\u5b9a\u4e49\u4e86\u5728\u6267\u884c\u5404\u79cd\u64cd\u4f5c\u65f6\u4ee3\u7406 p \u7684\u884c\u4e3a\u3002"),(0,o.kt)("li",{parentName:"ul"},"traps handler \u5bf9\u8c61\u62e5\u6709\u7684 traps\uff08\u6355\u83b7\u5668\uff09"),(0,o.kt)("li",{parentName:"ul"},"target \u8981\u4f7f\u7528 Proxy \u5305\u88c5\u7684\u76ee\u6807\u5bf9\u8c61\uff08\u53ef\u4ee5\u662f\u4efb\u4f55\u7c7b\u578b\u7684\u5bf9\u8c61\uff0c\u5305\u62ec\u539f\u751f\u6570\u7ec4\uff0c\u51fd\u6570\uff0c\u751a\u81f3\u53e6\u4e00\u4e2a\u4ee3\u7406\uff09\u3002")),(0,o.kt)("h3",{id:"22-\u6807\u51c6\u7684-traps"},"2.2 \u6807\u51c6\u7684 traps"),(0,o.kt)("p",null,"\u4e0b\u9762\u5217\u51fa\u4e86\u4e00\u4e9b\u5e38\u7528\u7684\u6355\u83b7\u5668"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"handler.getPrototypeOf() Object.getPrototypeOf \u65b9\u6cd5\u7684\u6355\u6349\u5668\u3002"),(0,o.kt)("li",{parentName:"ul"},"handler.setPrototypeOf() Object.setPrototypeOf \u65b9\u6cd5\u7684\u6355\u6349\u5668\u3002"),(0,o.kt)("li",{parentName:"ul"},"handler.isExtensible() Object.isExtensible \u65b9\u6cd5\u7684\u6355\u6349\u5668\u3002"),(0,o.kt)("li",{parentName:"ul"},"handler.preventExtensions() Object.preventExtensions \u65b9\u6cd5\u7684\u6355\u6349\u5668\u3002"),(0,o.kt)("li",{parentName:"ul"},"handler.getOwnPropertyDescriptor() Object.getOwnPropertyDescriptor \u65b9\u6cd5\u7684\u6355\u6349\u5668\u3002"),(0,o.kt)("li",{parentName:"ul"},"handler.defineProperty() Object.defineProperty \u65b9\u6cd5\u7684\u6355\u6349\u5668\u3002"),(0,o.kt)("li",{parentName:"ul"},"handler.has() in \u64cd\u4f5c\u7b26\u7684\u6355\u6349\u5668\u3002"),(0,o.kt)("li",{parentName:"ul"},"handler.get() \u5c5e\u6027\u8bfb\u53d6\u64cd\u4f5c\u7684\u6355\u6349\u5668\u3002"),(0,o.kt)("li",{parentName:"ul"},"handler.set() \u5c5e\u6027\u8bbe\u7f6e\u64cd\u4f5c\u7684\u6355\u6349\u5668\u3002"),(0,o.kt)("li",{parentName:"ul"},"handler.deleteProperty() delete \u64cd\u4f5c\u7b26\u7684\u6355\u6349\u5668\u3002"),(0,o.kt)("li",{parentName:"ul"},"handler.ownKeys() Object.getOwnPropertyNames \u65b9\u6cd5\u548c Object.getOwnPropertySymbols\n\u65b9\u6cd5\u7684\u6355\u6349\u5668\u3002"),(0,o.kt)("li",{parentName:"ul"},"handler.apply() \u51fd\u6570\u8c03\u7528\u64cd\u4f5c\u7684\u6355\u6349\u5668\u3002"),(0,o.kt)("li",{parentName:"ul"},"handler.construct() new \u64cd\u4f5c\u7b26\u7684\u6355\u6349\u5668\u3002")),(0,o.kt)("h3",{id:"23-get-set"},"2.3 get set"),(0,o.kt)("p",null,"\u4e0b\u9762\u662f\u4e00\u4e2a\u4f7f\u7528 get \u6355\u83b7\u5668\u8fdb\u884c\u53d8\u91cf\u6253\u5370\u7684\u4f8b\u5b50"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'let target = {\n  id: 1,\n  name: "\u5c0f\u660e",\n};\n\nconst handler = {\n  get: function (target, property, reveiver) {\n    console.log("target: ", target);\n    console.log("property: ", property);\n    console.log("reveiver: ", reveiver);\n    return target[property];\n  },\n};\n\nlet proxyTarget = new Proxy(target, handler);\n\nconsole.log(proxyTarget.id);\n\nObject.defineProperty(proxyTarget, "id", {\n  get: undefined,\n});\n\nconsole.log("id", proxyTarget.id);\nconsole.log("name:", proxyTarget.name);\n\nconsole.log("target", target);\nconsole.log("proxyTarget", proxyTarget);\n')),(0,o.kt)("h3",{id:"24-\u4ee3\u7406\u8f6c\u53d1"},"2.4 \u4ee3\u7406\u8f6c\u53d1"),(0,o.kt)("p",null,"\u4e0b\u9762\u5bf9 proxy \u7684\u4fee\u6539\u88ab\u6b63\u786e\u8f6c\u53d1\u5230 target \u4e0a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"let target = {};\nlet p = new Proxy(target, {});\n\np.a = 37; // \u64cd\u4f5c\u8f6c\u53d1\u5230\u76ee\u6807\n\nconsole.log(target.a); // 37. \u64cd\u4f5c\u5df2\u7ecf\u88ab\u6b63\u786e\u5730\u8f6c\u53d1\n")),(0,o.kt)("p",null,"set trap \u53ef\u4ee5\u8fdb\u884c\u503c\u4fee\u6b63\u53ca\u9644\u52a0\u5c5e\u6027 \u6bd4\u5982"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'let products = new Proxy({\n  browsers: ["Internet Explorer", "Netscape"],\n}, {\n  get: function (obj, prop) {\n    // \u9644\u52a0\u4e00\u4e2a\u5c5e\u6027\n    if (prop === "latestBrowser") {\n      return obj.browsers[obj.browsers.length - 1];\n    }\n\n    // \u9ed8\u8ba4\u884c\u4e3a\u662f\u8fd4\u56de\u5c5e\u6027\u503c\n    return obj[prop];\n  },\n  set: function (obj, prop, value) {\n    // \u9644\u52a0\u5c5e\u6027\n    if (prop === "latestBrowser") {\n      obj.browsers.push(value);\n      return;\n    }\n\n    // \u5982\u679c\u4e0d\u662f\u6570\u7ec4\uff0c\u5219\u8fdb\u884c\u8f6c\u6362\n    if (typeof value === "string") {\n      value = [value];\n    }\n\n    // \u9ed8\u8ba4\u884c\u4e3a\u662f\u4fdd\u5b58\u5c5e\u6027\u503c\n    obj[prop] = value;\n\n    // \u8868\u793a\u6210\u529f\n    return true;\n  },\n});\n\nconsole.log(products.browsers); // [\'Internet Explorer\', \'Netscape\']\nproducts.browsers = "Firefox"; // \u5982\u679c\u4e0d\u5c0f\u5fc3\u4f20\u5165\u4e86\u4e00\u4e2a\u5b57\u7b26\u4e32\nconsole.log(products.browsers); // [\'Firefox\'] <- \u4e5f\u6ca1\u95ee\u9898\uff0c\u5f97\u5230\u7684\u4f9d\u65e7\u662f\u4e00\u4e2a\u6570\u7ec4\n\nproducts.latestBrowser = "Chrome";\nconsole.log(products.browsers); // [\'Firefox\', \'Chrome\']\nconsole.log(products.latestBrowser); // \'Chrome\'\n')),(0,o.kt)("h3",{id:"25-\u5bf9\u65b9\u6cd5\u8c03\u7528\u7684\u4ee3\u7406"},"2.5 \u5bf9\u65b9\u6cd5\u8c03\u7528\u7684\u4ee3\u7406"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'function sum(a, b) {\n  return a + b;\n}\n\nconst handler2 = {\n  apply: function (target, thisArg, argumentsList) {\n    console.log(`argumentsList ${argumentsList}`);\n    // expected output: "Calculate sum: 1,2"\n    console.log("thisArg", thisArg);\n    return target(argumentsList[0], argumentsList[1]) * 10;\n  },\n};\n\nconst proxy1 = new Proxy(sum, handler2);\n\nconsole.log(sum(1, 2));\n// expected output: 3\nconsole.log(proxy1(1, 2));\n// expected output: 30\n')),(0,o.kt)("h3",{id:"26-\u5bf9\u6784\u9020\u51fd\u6570\u7684\u4ee3\u7406"},"2.6 \u5bf9\u6784\u9020\u51fd\u6570\u7684\u4ee3\u7406"),(0,o.kt)("p",null,"\u4f7f\u7528\u6784\u9020\u51fd\u6570\u58f0\u660e\u7c7b"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'var Person = function (name) {\n  this.name = name;\n};\n\nlet person = new Person("aa");\nconsole.log(person);\n')),(0,o.kt)("p",null,"\u4f7f\u7528 extend \u65b9\u6cd5\u4ee3\u7406 Boy \u7c7b\u7684\u6784\u9020\u65b9\u6cd5"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'function extend(sup, base) {\n  var descriptor = Object.getOwnPropertyDescriptor(\n    base.prototype,\n    "constructor",\n  );\n  base.prototype = Object.create(sup.prototype);\n  var handler = {\n    construct: function (target, args) {\n      var obj = Object.create(base.prototype);\n      this.apply(target, obj, args);\n      return obj;\n    },\n    apply: function (target, that, args) {\n      sup.apply(that, args);\n      base.apply(that, args);\n    },\n  };\n  var proxy = new Proxy(base, handler);\n  descriptor.value = proxy;\n  Object.defineProperty(base.prototype, "constructor", descriptor);\n  return proxy;\n}\n\nvar Person = function (name) {\n  this.name = name;\n};\n\nvar Boy = extend(Person, function (name, age) {\n  this.age = age;\n});\n\nBoy.prototype.sex = "M";\n\nvar Peter = new Boy("Peter", 13);\nconsole.log(Peter.sex); // "M"\nconsole.log(Peter.name); // "Peter"\nconsole.log(Peter.age); // 13\n')),(0,o.kt)("h3",{id:"27-\u5b9e\u4f8b\u4ea4\u6362\u4e24\u4e2a\u5355\u9009\u6846\u7684\u9009\u62e9\u72b6\u6001"},"2.7 \u5b9e\u4f8b\uff1a\u4ea4\u6362\u4e24\u4e2a\u5355\u9009\u6846\u7684\u9009\u62e9\u72b6\u6001"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'let view = new Proxy({\n  selected: null,\n}, {\n  set: function (obj, prop, newval) {\n    let oldval = obj[prop];\n\n    if (prop === "selected") {\n      if (oldval) {\n        oldval.setAttribute("aria-selected", "false");\n      }\n      if (newval) {\n        newval.setAttribute("aria-selected", "true");\n      }\n    }\n\n    // \u9ed8\u8ba4\u884c\u4e3a\u662f\u5b58\u50a8\u88ab\u4f20\u5165 setter \u51fd\u6570\u7684\u5c5e\u6027\u503c\n    obj[prop] = newval;\n\n    // \u8868\u793a\u64cd\u4f5c\u6210\u529f\n    return true;\n  },\n});\n\nlet i1 = view.selected = document.getElementById("item-1");\nconsole.log(i1.getAttribute("aria-selected")); // \'true\'\n\nlet i2 = view.selected = document.getElementById("item-2");\nconsole.log(i1.getAttribute("aria-selected")); // \'false\'\nconsole.log(i2.getAttribute("aria-selected")); // \'true\'\n')),(0,o.kt)("h3",{id:"28-\u5b9e\u4f8b\u5bf9\u6570\u7ec4\u65b9\u6cd5\u7684\u62d3\u5c55"},"2.8 \u5b9e\u4f8b\uff1a\u5bf9\u6570\u7ec4\u65b9\u6cd5\u7684\u62d3\u5c55"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"products.number \u4e3a array.length \u8d77\u522b\u540d array.number"),(0,o.kt)("li",{parentName:"ol"},"products.name | products.type \u901a\u8fc7 array \u4e2d object \u7684\u67d0\u4e2a\u952e\u83b7\u53d6\u5143\u7d20")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"let products = new Proxy([\n  { name: \"Firefox\", type: \"browser\" },\n  { name: \"SeaMonkey\", type: \"browser\" },\n  { name: \"Thunderbird\", type: \"mailer\" },\n], {\n  get: function (obj, prop) {\n    // \u9ed8\u8ba4\u884c\u4e3a\u662f\u8fd4\u56de\u5c5e\u6027\u503c\uff0cprop ?\u901a\u5e38\u662f\u4e00\u4e2a\u6574\u6570\n    if (prop in obj) {\n      return obj[prop];\n    }\n\n    // \u83b7\u53d6 products \u7684 number; \u5b83\u662f products.length \u7684\u522b\u540d\n    if (prop === \"number\") {\n      return obj.length;\n    }\n\n    let result, types = {};\n\n    for (let product of obj) {\n      if (product.name === prop) {\n        result = product;\n      }\n      if (types[product.type]) {\n        types[product.type].push(product);\n      } else {\n        types[product.type] = [product];\n      }\n    }\n\n    // \u901a\u8fc7 name \u83b7\u53d6 product\n    if (result) {\n      return result;\n    }\n\n    // \u901a\u8fc7 type \u83b7\u53d6 products\n    if (prop in types) {\n      return types[prop];\n    }\n\n    // \u83b7\u53d6 product type\n    if (prop === \"types\") {\n      return Object.keys(types);\n    }\n\n    return undefined;\n  },\n});\n\nconsole.log(products[0]); // { name: 'Firefox', type: 'browser' }\nconsole.log(products[\"Firefox\"]); // { name: 'Firefox', type: 'browser' }\nconsole.log(products[\"Chrome\"]); // undefined\nconsole.log(products.browser); // [{ name: 'Firefox', type: 'browser' }, { name: 'SeaMonkey', type: 'browser' }]\nconsole.log(products.types); // ['browser', 'mailer']\nconsole.log(products.number); // 3\n")),(0,o.kt)("h2",{id:"\u5176\u4ed6"},"\u5176\u4ed6"),(0,o.kt)("h3",{id:"map-vs-weakmap"},"Map vs WeakMap"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"WeakMap \u53ea\u80fd\u7528 Object \u505a\u952e\uff0c\u800c\u4e14\u662f\u4e00\u4e2a\u5f31\u5f15\u7528\uff0c\n\n\u80fd\u591f\u89e6\u53d1\u5783\u573e\u56de\u6536\u673a\u5236\n\u4e0d\u80fd\u88ab enumerate\nMap \u4f7f\u7528\u4efb\u610f\u7c7b\u578b\u4f5c\u4e3a\u952e\n\n\u5728 gc \u65f6\u4e0d\u80fd\u81ea\u52a8\u5220\u9664\u5173\u8054\u5185\u5b58\n\u53ef\u4ee5\u88ab\u8fed\u4ee3\n")))}c.isMDXComponent=!0}}]);