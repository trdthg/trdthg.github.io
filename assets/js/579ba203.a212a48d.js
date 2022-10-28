"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[1269],{3905:(e,n,t)=>{t.d(n,{Zo:()=>o,kt:()=>d});var a=t(7294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,l=function(e,n){if(null==e)return{};var t,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var p=a.createContext({}),m=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},o=function(e){var n=m(e.components);return a.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,r=e.originalType,p=e.parentName,o=i(e,["components","mdxType","originalType","parentName"]),c=m(t),d=l,k=c["".concat(p,".").concat(d)]||c[d]||u[d]||r;return t?a.createElement(k,s(s({ref:n},o),{},{components:t})):a.createElement(k,s({ref:n},o))}));function d(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var r=t.length,s=new Array(r);s[0]=c;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i.mdxType="string"==typeof e?e:l,s[1]=i;for(var m=2;m<r;m++)s[m]=t[m];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},2556:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>m});var a=t(7462),l=(t(7294),t(3905));const r={},s="Wasm \u5b9e\u73b0\u751f\u547d\u6e38\u620f",i={unversionedId:"rust/wasm",id:"rust/wasm",title:"Wasm \u5b9e\u73b0\u751f\u547d\u6e38\u620f",description:"hello-wasm",source:"@site/docs/rust/wasm.md",sourceDirName:"rust",slug:"/rust/wasm",permalink:"/docs/rust/wasm",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Rust Quiz",permalink:"/docs/rust/rust_quiz"},next:{title:"\ud83d\udcda \u5b66\u4e60\u7b14\u8bb0",permalink:"/docs/category/-\u5b66\u4e60\u7b14\u8bb0"}},p={},m=[{value:"hello-wasm",id:"hello-wasm",level:2},{value:"\u5b89\u88c5\u51c6\u5907",id:"\u5b89\u88c5\u51c6\u5907",level:3},{value:"\u6784\u5efa WebAssembly npm \u5305",id:"\u6784\u5efa-webassembly-npm-\u5305",level:3},{value:"\u65b0\u5efa\u9879\u76ee",id:"\u65b0\u5efa\u9879\u76ee",level:4},{value:"lib.rs",id:"librs",level:4},{value:"Cargo.toml",id:"cargotoml",level:4},{value:"\u6784\u5efa\u53d1\u5e03",id:"\u6784\u5efa\u53d1\u5e03",level:4},{value:"\u5728 webpack \u9879\u76ee\u4f7f\u7528",id:"\u5728-webpack-\u9879\u76ee\u4f7f\u7528",level:3},{value:"\u76ee\u5f55",id:"\u76ee\u5f55",level:4},{value:"package.json",id:"packagejson",level:4},{value:"webpack.config.js",id:"webpackconfigjs",level:4},{value:"index.html",id:"indexhtml",level:4},{value:"index.js",id:"indexjs",level:4},{value:"\u542f\u52a8",id:"\u542f\u52a8",level:4},{value:"\u5eb7\u5a01\u751f\u547d\u6e38\u620f",id:"\u5eb7\u5a01\u751f\u547d\u6e38\u620f",level:2},{value:"\u5185\u5b58\u6392\u5e03",id:"\u5185\u5b58\u6392\u5e03",level:3},{value:"js \u4e0e rust \u901a\u8baf",id:"js-\u4e0e-rust-\u901a\u8baf",level:3},{value:"wasm-bindgen",id:"wasm-bindgen",level:3},{value:"\u6ce8\u610f\u4e8b\u9879",id:"\u6ce8\u610f\u4e8b\u9879",level:3},{value:"\u4f18\u5316\u65b9\u5411",id:"\u4f18\u5316\u65b9\u5411",level:3},{value:"\ud83c\udf89 \u5c55\u793a",id:"-\u5c55\u793a",level:3},{value:"\u2b50 idea",id:"-idea",level:2}],o={toc:m};function u(e){let{components:n,...t}=e;return(0,l.kt)("wrapper",(0,a.Z)({},o,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"wasm-\u5b9e\u73b0\u751f\u547d\u6e38\u620f"},"Wasm \u5b9e\u73b0\u751f\u547d\u6e38\u620f"),(0,l.kt)("h2",{id:"hello-wasm"},"hello-wasm"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/zh-CN/docs/WebAssembly/Rust_to_wasm"},"MDN \u6559\u7a0b")),(0,l.kt)("h3",{id:"\u5b89\u88c5\u51c6\u5907"},"\u5b89\u88c5\u51c6\u5907"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5b89\u88c5 Rust"),(0,l.kt)("li",{parentName:"ul"},"\u5b89\u88c5 wasm-pack")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"cargo install wasm-pack\n")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5b89\u88c5 node.js \u5e76\u6ce8\u518c\u8d26\u6237")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-powershell"},"> npm adduser\nUsername: $username\nPassword:\nEmail: (this IS public) $you@example.com\n")),(0,l.kt)("h3",{id:"\u6784\u5efa-webassembly-npm-\u5305"},"\u6784\u5efa WebAssembly npm \u5305"),(0,l.kt)("h4",{id:"\u65b0\u5efa\u9879\u76ee"},"\u65b0\u5efa\u9879\u76ee"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"cargo new --lib hello-wasm\n\n+-- Cargo.toml\n+-- src\n    +-- lib.rs\n")),(0,l.kt)("h4",{id:"librs"},"lib.rs"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-rust"},'extern crate wasm_bindgen;\n\nuse wasm_bindgen::prelude::*;\n\n#[wasm_bindgen]\nextern {\n    pub fn alert(s: &str);\n}\n\n#[wasm_bindgen]\npub fn greet(name: &str) {\n    alert(&format!("Hello, {}!", name));\n}\n')),(0,l.kt)("h4",{id:"cargotoml"},"Cargo.toml"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-toml"},'[package]\nname = "hello-wasm"\nversion = "0.1.0"\nauthors = ["Your Name <you@example.com>"]\ndescription = "A sample project with wasm-pack"\nlicense = "MIT/Apache-2.0"\nrepository = "https://github.com/yourgithubusername/hello-wasm"\n\n[lib]\ncrate-type = ["cdylib"]\n\n[dependencies]\nwasm-bindgen = "0.2"\n')),(0,l.kt)("h4",{id:"\u6784\u5efa\u53d1\u5e03"},"\u6784\u5efa\u53d1\u5e03"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"# \u6784\u5efa\nwasm-pack build --scope $mynpmusername\n# \u53d1\u5e03\ncd pkg\nnpm publish --access=public\n")),(0,l.kt)("h3",{id:"\u5728-webpack-\u9879\u76ee\u4f7f\u7528"},"\u5728 webpack \u9879\u76ee\u4f7f\u7528"),(0,l.kt)("h4",{id:"\u76ee\u5f55"},"\u76ee\u5f55"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"+-- site\n    +-- package.json\n    +-- webpack.config.js\n    +-- index.html\n")),(0,l.kt)("h4",{id:"packagejson"},"package.json"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "scripts": {\n    "serve": "webpack-dev-server"\n  },\n  "dependencies": {\n    "@mynpmusername/hello-wasm": "^0.1.0"\n  },\n  "devDependencies": {\n    "webpack": "^4.25.1",\n    "webpack-cli": "^3.1.2",\n    "webpack-dev-server": "^3.1.10"\n  }\n}\n')),(0,l.kt)("h4",{id:"webpackconfigjs"},"webpack.config.js"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'const path = require("path");\nmodule.exports = {\n  entry: "./index.js",\n  output: {\n    path: path.resolve(__dirname, "dist"),\n    filename: "index.js",\n  },\n  mode: "development",\n};\n')),(0,l.kt)("h4",{id:"indexhtml"},"index.html"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <title>hello-wasm example</title>\n  </head>\n  <body>\n    <script src="./index.js"><\/script>\n  </body>\n</html>\n')),(0,l.kt)("h4",{id:"indexjs"},"index.js"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'const js = import("./node_modules/@yournpmusername/hello-wasm/hello_wasm.js");\njs.then((js) => {\n  js.greet("WebAssembly");\n});\n')),(0,l.kt)("h4",{id:"\u542f\u52a8"},"\u542f\u52a8"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"$ npm install\n$ npm run serve\n")),(0,l.kt)("h2",{id:"\u5eb7\u5a01\u751f\u547d\u6e38\u620f"},"\u5eb7\u5a01\u751f\u547d\u6e38\u620f"),(0,l.kt)("h3",{id:"\u5185\u5b58\u6392\u5e03"},"\u5185\u5b58\u6392\u5e03"),(0,l.kt)("p",null,"js \u7684",(0,l.kt)("inlineCode",{parentName:"p"},"Object"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"Array"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"DOM Nodes"),"\u7b49\u5bf9\u8c61\u90fd\u5b58\u50a8\u5728 GC Heap \u4e0a\nwasm \u7684\u5185\u5b58\u662f\u548c js \u5206\u79bb\u7684\uff0c\u7ebf\u578b\u6392\u5e03\uff0crust \u7684\u6570\u636e\u5c31\u5b58\u5728\u5176\u4e2d"),(0,l.kt)("h3",{id:"js-\u4e0e-rust-\u901a\u8baf"},"js \u4e0e rust \u901a\u8baf"),(0,l.kt)("p",null,"wasm \u76ee\u524d\u65e0\u6cd5\u76f4\u63a5\u8bbf\u95ee js \u7684 GC Heap(\u8fd9\u70b9\u53ef\u80fd\u4f1a\u6539\u53d8\uff0cwasm \u63d0\u6848\u6b63\u5c1d\u8bd5\u4e3a wasm \u52a0\u5165\u9ad8\u7ea7\u6570\u636e\u7c7b\u578b),\n\u800c js \u53ef\u4ee5\u76f4\u63a5\u8bbf\u95ee wasm \u7684\u5185\u5b58\u6570\u636e\uff0c\u867d\u7136\u9700\u8981\u628a\u6570\u636e\u8f6c\u6362\u4e3a\u56fa\u5b9a\u5927\u5c0f\u7684 buf array(u8, i32, f64 ...). wasm \u51fd\u6570\u4e5f\u53ea\u80fd\u63a5\u53d7\u8fd4\u56de\u6807\u91cf\u503c\u3002\n\u4e0a\u9762\u7684\u5185\u5bb9\u6784\u6210\u4e86 js \u548c wasm \u901a\u8baf\u7684\u57fa\u672c\u6a21\u5757"),(0,l.kt)("h3",{id:"wasm-bindgen"},"wasm-bindgen"),(0,l.kt)("p",null,"\u8be5\u5de5\u5177\u5305\u88c5\u4e86 rust \u6570\u636e\u7ed3\u6784\uff0c\u5e76\u80fd\u591f\u5c06\u6307\u9488\u8fd4\u56de\u7ed9 js\uff0c\u5c01\u88c5\u4e86 js \u5bf9\u8c61\uff0c\u76f4\u63a5\u8c03\u7528 js-api"),(0,l.kt)("p",null,"\u4f46\u662f\u4f9d\u7136\u9700\u8981\u8003\u8651\u5982\u4f55\u8bbe\u8ba1\u6570\u636e\u7ed3\u6784\u4ee5\u9002\u914d wasm \u7684\u9700\u8981"),(0,l.kt)("h3",{id:"\u6ce8\u610f\u4e8b\u9879"},"\u6ce8\u610f\u4e8b\u9879"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u6700\u5c0f\u5316 copy \u6570\u636e\uff0c\u5728 js \u548c wasm \u4e4b\u95f4\u62f7\u8d1d\u6570\u636e\u4f1a\u5e26\u6765\u4e0d\u5fc5\u8981\u7684\u5f00\u9500 \u5982\u679c js \u80fd\u591f\u4f7f\u7528\u6307\u9488\u76f4\u63a5\u64cd\u4f5c wasm \u6570\u636e\uff0c\u5c31\u80fd\u5927\u5e45\u51cf\u5c11\u5f00\u9500")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u6700\u5c0f\u5316\u5e8f\u5217\u5316"))),(0,l.kt)("p",null,"\u4e00\u4e9b\u5927\u578b\u7684\uff0c\u957f\u671f\u5b58\u5728\u7684\u6570\u636e\u7ed3\u6784\u5e94\u8be5\u5c06\u6307\u9488\u66b4\u9732\u7ed9 js"),(0,l.kt)("h3",{id:"\u4f18\u5316\u65b9\u5411"},"\u4f18\u5316\u65b9\u5411"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"consle.EndTime \u8ba1\u7b97\u51fd\u6570\u6267\u884c\u65f6\u95f4")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u7ed3\u5408\u6d4f\u89c8\u5668\u6027\u80fd\u5206\u6790\u5de5\u5177\uff0c\u89c2\u5bdf\u51fd\u6570\u8c03\u7528\u6808\u7684\u65f6\u95f4\u5360\u6bd4")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"bench \u51c6\u5907\u9879\u76ee"))),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5207\u6362\u5230",(0,l.kt)("inlineCode",{parentName:"li"},"nightly"),"\u7248\u672c\uff0c\u9879\u76ee\u6839\u76ee\u5f55\u4e0b\u589e\u52a0",(0,l.kt)("inlineCode",{parentName:"li"},"toolchain"),"\u6587\u4ef6\uff0c\u5199\u5165",(0,l.kt)("inlineCode",{parentName:"li"},"nightly"),"\u5373\u53ef"),(0,l.kt)("li",{parentName:"ul"},"\u6ce8\u91ca\u6389\u6240\u6709\u7684",(0,l.kt)("inlineCode",{parentName:"li"},"#[wasm-bindgen]")),(0,l.kt)("li",{parentName:"ul"},"\u6ce8\u91ca\u6389\u6240\u6709\u7684",(0,l.kt)("inlineCode",{parentName:"li"},"web-sys"),"\u8c03\u7528")),(0,l.kt)("p",null,"\u5f00\u59cb\u6d4b\u8bd5\uff0c\u5e76\u5c06\u7ed3\u679c\u5bfc\u51fa\u5230 before.txt"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"cargo bench | tee before.txt\n")),(0,l.kt)("p",null,"\u4ece before.txt \u4e2d\u83b7\u53d6\u8fd0\u884c\u7ed3\u679c\uff0c\u627e\u5230\u5bf9\u5e94\u7684\u4e8c\u8fdb\u5236\u6587\u4ef6\uff0c\u4f7f\u7528 perf \u518d\u6b21\u8fd0\u884c\u8fd9\u4e2a\u4e8c\u8fdb\u5236\u6587\u4ef6"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"perf record -g target/release/deps/bench-2e4b55af5ebabae8 --bench\n")),(0,l.kt)("p",null,"\u67e5\u770b\u7ed3\u679c"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"perf report\n")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241137609.png",alt:null}),"\n\u6309\u4e0b",(0,l.kt)("inlineCode",{parentName:"p"},"a"),"\u67e5\u770b\u6c47\u7f16\u4ee3\u7801\u7684\u65f6\u95f4\u7edf\u8ba1\u7ed3\u679c\n",(0,l.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241138801.png",alt:null}),"\n\u7adf\u7136\u76f8\u5dee\u4e86\u5341\u51e0\u500d"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"before: test universe_ticks ... bench:     215,952 ns/iter (+/- 7,814)\nafter : test universe_ticks ... bench:      18,912 ns/iter (+/- 5,025)\n")),(0,l.kt)("p",null,"\u4ece 10ms \u964d\u4f4e\u5230 3ms\n",(0,l.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241453849.png",alt:null})),(0,l.kt)("h3",{id:"-\u5c55\u793a"},"\ud83c\udf89 \u5c55\u793a"),(0,l.kt)("p",null,"\u5eb7\u4e3a\u751f\u547d\u6e38\u620f\n",(0,l.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203231913525.png",alt:"\u56fe\u7247"})),(0,l.kt)("h2",{id:"-idea"},"\u2b50 idea"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5b57\u7b26\u753b\u7f51\u9875")))}u.isMDXComponent=!0}}]);