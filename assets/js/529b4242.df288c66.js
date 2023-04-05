"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[6613],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>c});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var o=r.createContext({}),p=function(e){var n=r.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=p(e.components);return r.createElement(o.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,o=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=p(t),c=a,k=m["".concat(o,".").concat(c)]||m[c]||d[c]||l;return t?r.createElement(k,i(i({ref:n},u),{},{components:t})):r.createElement(k,i({ref:n},u))}));function c(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,i=new Array(l);i[0]=m;var s={};for(var o in n)hasOwnProperty.call(n,o)&&(s[o]=n[o]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<l;p++)i[p]=t[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},3613:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>d,frontMatter:()=>l,metadata:()=>s,toc:()=>p});var r=t(7462),a=(t(7294),t(3905));const l={},i=void 0,s={permalink:"/blog/2023/01/03/[\u8bd1] Rust\u5192\u9669: \u6ee5\u7528 Serde",source:"@site/blog/2023-01-03-[\u8bd1] Rust\u5192\u9669: \u6ee5\u7528 Serde.md",title:"[\u8bd1] Rust\u5192\u9669: \u6ee5\u7528 Serde",description:"\u539f\u6587\u94fe\u63a5\uff1ahttps://lucumr.pocoo.org/2021/11/14/abusing-serde/",date:"2023-01-03T00:00:00.000Z",formattedDate:"2023\u5e741\u67083\u65e5",tags:[],readingTime:15.225,hasTruncateMarker:!1,authors:[],frontMatter:{},prevItem:{title:"\u8ba1\u7b97\u673a\u7f51\u7edc",permalink:"/blog/draft/\u8ba1\u7b97\u673a\u7f51\u7edc"},nextItem:{title:"[\u8bd1] \u672a\u521d\u59cb\u5316\u5185\u5b58: unsafe Rust\u592a\u96be\u4e86",permalink:"/blog/2023/01/02/[\u8bd1] \u672a\u521d\u59cb\u5316\u5185\u5b58: unsafe Rust\u592a\u96be\u4e86"}},o={authorsImageUrls:[]},p=[{value:"\u6ee5\u7528\u5e8f\u5217\u5316",id:"\u6ee5\u7528\u5e8f\u5217\u5316",level:2},{value:"TLS \u6076\u4f5c\u5267",id:"tls-\u6076\u4f5c\u5267",level:2},{value:"\u8d8a\u8fc7\u8fb9\u754c\u7684 State",id:"\u8d8a\u8fc7\u8fb9\u754c\u7684-state",level:2},{value:"Ser-to-De",id:"ser-to-de",level:2},{value:"Serde \u7684\u73b0\u72b6",id:"serde-\u7684\u73b0\u72b6",level:2}],u={toc:p};function d(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u539f\u6587\u94fe\u63a5\uff1a",(0,a.kt)("a",{parentName:"p",href:"https://lucumr.pocoo.org/2021/11/14/abusing-serde/"},"https://lucumr.pocoo.org/2021/11/14/abusing-serde/")),(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("strong",{parentName:"p"},"\u7ffb\u8bd1\uff1a",(0,a.kt)("a",{parentName:"strong",href:"https://github.com/trdthg"},"trdthg"))),(0,a.kt)("p",{parentName:"blockquote"},"\u9009\u9898\uff1a",(0,a.kt)("a",{parentName:"p",href:"https://github.com/trdthg"},"trdthg")),(0,a.kt)("p",{parentName:"blockquote"},"\u672c\u6587\u7531 ",(0,a.kt)("a",{parentName:"p",href:"https://Rustt.org"},"Rustt")," \u7ffb\u8bd1\uff0c",(0,a.kt)("a",{parentName:"p",href:"https://studyrust.org"},"StudyRust")," \u8363\u8a89\u63a8\u51fa")),(0,a.kt)("h1",{id:"rust-\u5192\u9669\u6ee5\u7528-serde"},"Rust \u5192\u9669\uff1a\u6ee5\u7528 Serde"),(0,a.kt)("p",null,"\u5f53\u4f60\u8ba9\u4e00\u4e2a Rust \u7a0b\u5e8f\u5458\u6307\u51fa\u81ea\u5df1\u6700\u559c\u6b22\u7684\u4e1c\u897f\u65f6\uff0c\u4ed6\u4eec\u4f1a\u5f88\u5feb\u7684\u6307\u51fa serde \u662f\u4e00\u4e2a\u8ba9\u5de5\u4f5c\u6109\u5feb\u597d\u5e2e\u624b\u3002serde \u662f\u4e00\u4e2a Rust\n\u7684\u5e8f\u5217\u5316\u548c\u53cd\u5e8f\u5217\u5316\u6846\u67b6\u3002\u5b83\u7684\u683c\u5f0f\u76f8\u5bf9\u72ec\u7acb\uff0c\u53ef\u4ee5\u8ba9\u4f60\u5904\u7406 JSON\uff0cYAML \u4ee5\u53ca\u4e00\u7cfb\u5217\u4e0d\u540c\u7684\u683c\u5f0f\u3002"),(0,a.kt)("p",null,"\u9664\u4e86\u4e0a\u9762\u7684\u4e4b\u5916\uff0c\u8fd8\u6709\u5f88\u591a\u4e1c\u897f\u53ef\u4ee5\u7528 serve \u5b8c\u6210\u3002\u6211\u8ba4\u4e3a\u6709\u4e00\u4e9b\u7528\u4f8b\u76f8\u5f53\u6709\u8da3\uff0c\u503c\u5f97\u5206\u4eab\u3002"),(0,a.kt)("h2",{id:"\u6ee5\u7528\u5e8f\u5217\u5316"},"\u6ee5\u7528\u5e8f\u5217\u5316"),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"Abusing Serialization")),(0,a.kt)("p",null,"\u5176\u4e2d\u4e00\u4e2a\u6709\u8da3\u7684\u7528\u4f8b\u662f\u7528 serde \u4f5c\u4e3a\u67d0\u79cd\u5f62\u5f0f\u7684\u53cd\u5c04\u6846\u67b6\uff0c\u5c06\u7ed3\u6784\u4f53\u66b4\u9732\u7ed9\u5176\u4ed6\u7684\u4e0d\u80fd\u539f\u751f\u652f\u6301 Rust\n\u7ed3\u6784\u4f53\u7684\u73af\u5883\u3002\u5728\u8fd9\u4e9b\u60c5\u51b5\u4e0b\uff0c\u4f5c\u4e3a\u4e00\u4e2a\u5f00\u53d1\u8005\uff0c\u4f60\u5e8f\u5217\u5316\u4e86\u4e00\u4e2a\u53ef\u4ee5\u88ab\u5e8f\u5217\u5316\u7684\u5bf9\u8c61\uff0c\u63a5\u7740\u7acb\u5373\u4ee5\u67d0\u79cd\u7a0d\u5fae\u4e0d\u540c\u7684\u683c\u5f0f\u518d\u6b21\u53cd\u5e8f\u5217\u5316\u5b83\u3002\u76f8\u6bd4\u4e8e\u53cd\u5e8f\u5217\u5316\uff0c\u6211\u4eec\u4e5f\u53ef\u4ee5\u81ea\u5b9a\u4e49\u4e00\u4e2a\u5e8f\u5217\u5316\u5668\u7528\u6765\n'\u6355\u83b7' \u5e8f\u5217\u5316\u7684\u8c03\u7528\u3002\u8fd9\u662f\u5728 IPC\uff0c\u6a21\u677f\u5f15\u64ce\u4e0a\u4e0b\u6587\u3001\u683c\u5f0f\u8f6c\u6362\u4e2d\u5e38\u7528\u7684\u6a21\u5f0f\u3002"),(0,a.kt)("p",null,"\u8fd9\u5728\u5b9e\u8df5\u4e2d\u5927\u6982\u662f\u4ec0\u4e48\u6837\u5462\uff1f\u8ba9\u6211\u4eec\u4ece\u7528\u6237\u7684\u89d2\u5ea6\u770b\u4e00\u4e0b\u6211\u5199\u7684 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/mitsuhiko/minijinja"},"MiniJinja"),"\n\u6a21\u677f\u5f15\u64ce\u3002MiniJinja \u4f7f\u7528 serde \u4f5c\u4e3a\u6838\u5fc3\u6570\u636e\u6a21\u578b\uff0c\u5c06\u7ed3\u6784\u5316\u7684\u6570\u636e\u4f20\u9012\u7ed9\u6a21\u677f\uff0c\u4ee5\u4fbf\u5b83\u4eec\u53ef\u4ee5\u5728\u8fd0\u884c\u65f6\u8fdb\u884c\u8bc4\u4f30\u3002\u4e0b\u9762\u662f\u4e00\u4e9b\u7ed9\u5f00\u53d1\u8005\u7684\u793a\u4f8b\u4ee3\u7801\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rs"},'#[derive(Serialize, Debug)]\npub struct User {\n    name: String,\n}\n\nfn main() {\n    let mut env = Environment::new();\n    env.add_template("hello.txt", "Hello {{ user.name }}!")\n        .unwrap();\n    let template = env.get_template("hello.txt").unwrap();\n    let user = User {\n        name: "John".into(),\n    };\n    println!("{}", template.render(context!(user)).unwrap());\n}\n')),(0,a.kt)("p",null,"\u5982\u4f60\u6240\u89c1\uff0c\u6211\u4eec\u5b9a\u4e49\u4e86\u4e00\u4e2a\u53eb User \u7684\u7ed3\u6784\u4f53\uff0c\u53ef\u4ee5\u4f7f\u7528\u9ed8\u8ba4\u7684 Serialize \u5b9e\u73b0\u5c06\u5b83\u5e8f\u5217\u5316\u3002\u8fd9\u4e2a\u5bf9\u8c61\u63a5\u7740\u88ab\u4f20\u9012\u5230\n",(0,a.kt)("inlineCode",{parentName:"p"},"context!()"),"\u3002",(0,a.kt)("inlineCode",{parentName:"p"},"context!()")," \u6240\u505a\u7684\u5c31\u662f\u521b\u5efa\u4e86\u4e00\u4e2a map\uff0c\u7136\u540e\u5c06\u4e00\u4e2a\u952e\u8bbe\u4e3a\nuser\uff0c\u63a5\u7740\u8bbe\u7f6e\u4e3a\u8be5\u53d8\u91cf\u7684\u503c\u3002\u8fd9\u6837\u505a\u7684\u76ee\u7684\u662f\u5141\u8bb8\u6a21\u677f\u5f15\u64ce\u8bbf\u95ee\u5230 user \u7684 '\u5c5e\u6027'\uff0c\u4f8b\u5982 name\u3002Rust\n\u4e0d\u662f\u52a8\u6001\u8bed\u8a00\uff0c\u8fd9\u610f\u5473\u7740\u901a\u5e38\u5728\u8fd0\u884c\u65f6\u505a\u8fd9\u6837\u7684\u4e8b\u60c5\u662f\u4e0d\u53ef\u80fd\u7684\u3002\u4f46\u662f\u7531\u4e8e serde \u4e3a User \u5b9e\u73b0\u4e86\nSeralize\uff0c\u6211\u4eec\u53ef\u4ee5\u8fd9\u6837\u505a\u3002\u5177\u4f53\u7684\u5b9e\u73b0\u5927\u81f4\u5982\u4e0b\uff08\u4f2a\u4ee3\u7801\uff09\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rs"},'impl Serialize for User {\n    fn serialize(&self, serializer: S) -> Result<S::Ok, S::Error>\n        where S: Serializer\n    {\n        let s = serializer.serialize_struct("User", 1);\n        s.serialize_field("name", &self.name)?;\n        s.end()\n    }\n}\n')),(0,a.kt)("p",null,"\u6b63\u5e38\u60c5\u51b5\u4e0b\uff0cserializer \u662f\u4e00\u4e2a\u7c7b\u4f3c\u4e8e JSON \u5e8f\u5217\u5316\u5668\u7684\u4e1c\u897f\uff0c\u5b83\u53ef\u4ee5\u5c06\u7ed3\u6784\u4f53\u5199\u5165\u5230\u4e00\u4e2a\u5b57\u7b26\u4e32\u6216\u8005\u662f\u6587\u4ef6\uff0c\u5728\u8fd9\u4e2a\u8fc7\u7a0b\u4e2d\u628a\u5b83\u7f16\u7801\u4e3a JSON\u3002\u4f46\u662f\nserde \u63d0\u4f9b\u7684\u63a5\u53e3\u5e76\u4e0d\u8981\u6c42\u7528\u6237\u5fc5\u987b\u8fd9\u6837\u3002\u5b9e\u9645\u4e0a\uff0cMiniJinja \u76f4\u63a5\u5c06\u7ed3\u6784\u4f53\u7f16\u7801\u4e3a\u4e00\u4e2a\u5185\u5b58\u4e2d\u7684\u7ed3\u6784\uff0c\u6a21\u677f\u5f15\u64ce\u53ef\u4ee5\u89e3\u6790\u5b83\u3002"),(0,a.kt)("p",null,"\u8fd9\u79cd\u6a21\u5f0f\u5e76\u4e0d\u65b0\u9896\uff0cserde \u672c\u8eab\u5176\u5b9e\u4e5f\u6709\u4f7f\u7528\u3002\u5f53\u4f60\u4f7f\u7528 serde \u7684 flatter \u529f\u80fd\u65f6\uff0cserde \u4f1a\u542f\u7528\u4e00\u4e2a\u5185\u90e8\u7f13\u51b2\u6a21\u5f0f\uff0c\u6570\u636e\u4f1a\u88ab\u5b58\u50a8\u5728\u4e00\u4e2a\u5185\u90e8\u7684\nContext \u7c7b\u578b\u4e2d\uff0cContext \u7c7b\u578b\u53ef\u4ee5\u8868\u793a serde \u6570\u636e\u6a21\u578b\u7684\u5168\u90e8\u5185\u5bb9\u3002\u7136\u540e\u8fd9\u4e2a context \u53ef\u4ee5\u88ab\u4f20\u9012\u7ed9\u53e6\u4e00\u4e2a\u5e8f\u5217\u5316\u5668\u4e2d\u3002"),(0,a.kt)("p",null,"\u6211\u4e0d\u4ec5\u5728 MiniJinja\uff0c\u540c\u65f6\u4e5f\u5728 ",(0,a.kt)("a",{parentName:"p",href:"https://insta.rs/"},"insta"),"\n\uff08\u4e00\u4e2a\u5feb\u7167\u6d4b\u8bd5\u5de5\u5177\uff09\u4f7f\u7528\u5230\u8fd9\u79cd\u6a21\u5f0f\u3002\u4e3a\u4e86\u907f\u514d\u7531\u4e8e\u975e\u786e\u5b9a\u6027\u6570\u636e\u5bfc\u81f4\u7684\u6d4b\u8bd5\u5feb\u7167\u7684\u4e0d\u7a33\u5b9a\u6027\uff0c\u6211\u9996\u5148\u5c06\u5176\u5e8f\u5217\u5316\u4e3a\u4e00\u79cd\u5185\u90e8\u7684\u683c\u5f0f\uff0c\u63a5\u7740\u5728\u8be5\u683c\u5f0f\u4e0a\u8fdb\u884c\u4e00\u4e2a\u518d\u52a0\u5de5\uff0c\u6700\u540e\u518d\u5c06\u5176\u5e8f\u5217\u5316\u4e3a\u6700\u7ec8\u7684\u683c\u5f0f\uff08\u4f8b\u5982\nYAML\uff09\u3002"),(0,a.kt)("h2",{id:"tls-\u6076\u4f5c\u5267"},"TLS \u6076\u4f5c\u5267"),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"TLS Shenanigans")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"TLS\uff1aThread Local Storage\uff0cShenanigans\uff1a\u6076\u4f5c\u5267")),(0,a.kt)("p",null,"\u7136\u800c\uff0cMiniJinja \u5728\u6b64\u5904\u4f7f\u7528 serde \u7684\u6709\u8da3\u4e4b\u5904\u5728\u4e8e\uff0c\u5b83\u5141\u8bb8\u5728\u5e8f\u5217\u5316\u548c\u5e8f\u5217\u5316\u5668\u4e4b\u95f4\u4f20\u9012\u4e0d\u517c\u5bb9\u7684\u6570\u636e\u3002\u5982\u524d\u6240\u8ff0\uff0cserde\n\u6709\u4e00\u4e2a\u7279\u5b9a\u7684\u6570\u636e\u6a21\u578b\uff0c\u4e0d\u7b26\u5408\u8be5\u6570\u636e\u6a21\u578b\u7684\u4e1c\u897f\u90fd\u4f1a\u9047\u5230\u8fd9\u4e2a\u95ee\u9898\u3002\u4f8b\u5982\uff0cserde \u53ef\u4ee5\u7f16\u7801\u7684\u6700\u5927\u6574\u578b\u662f\ni128\u3002\u5982\u679c\u4f60\u9700\u8981\u4e00\u4e2a\u4efb\u610f\u7cbe\u5ea6\u7684\u6574\u578b\uff0c\u90a3\u5c31\u4e0d\u8d70\u8fd0\u4e86\u3002\u4f46\u662f\u8fd8\u662f\u6709\u529e\u6cd5\u7684\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528\n",(0,a.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/In-band_signaling"},"\u5e26\u5185\u4fe1\u4ee4\uff08in-band signalling\uff09"),"\u4f20\u9012\u989d\u5916\u6570\u636e\u3002\u4f8b\u5982\uff0cserde\nJSON \u5e8f\u5217\u5316\u5668\u80fd\u591f\u8868\u793a\u4efb\u610f\u7cbe\u5ea6\u6574\u578b\uff0c\u56e0\u4e3a\u5b83\u5728\u5355\u503c\u5bf9\u8c61\u4e2d\u4fdd\u7559\u4e86\u4e00\u4e2a\u7279\u6b8a\u7684\u952e\uff0c\u5e76\u7528\u5b83\u53bb\u6307\u793a JSON \u5e8f\u5217\u5316 /\n\u53cd\u5e8f\u5217\u5316\u5668\u7ec4\u5408\uff0c\u51b3\u5b9a\u8fd9\u4e2a\u4efb\u610f\u7cbe\u5ea6\u7684\u6574\u578b\u662f\u5426\u8981\u88ab\u5e8f\u5217\u5316\u3002\u5b83\u770b\u8d77\u6765\u50cf\u8fd9\u6837\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{ "$serde_json::private::Number": "value" }\n')),(0,a.kt)("p",null,"\u4f46\u662f\u4f60\u5e94\u8be5\u80fd\u53d1\u73b0\uff0c\u5982\u679c\u4e00\u4e2a\u4eba\u7ed9\u51fa\u4e86\u8fd9\u6837\u7684 JSON \u6587\u6863\uff0cserde JSON \u4f1a\u628a\u5b83\u5f53\u4f5c\u4efb\u610f\u7cbe\u5ea6\u7684\u6574\u5f62\u53bb\u89e3\u6790\uff0c\u8fd9\u610f\u5473\u7740 'value' \u90e8\u5206\u672c\u8eab\u4e5f\u9700\u8981\u4e8e\nserde \u517c\u5bb9\u3002\u5bf9\u4e8e\u4efb\u610f\u7cbe\u5ea6\u7684\u6574\u578b\uff0c\u8fd9\u6ca1\u6709\u95ee\u9898\uff0c\u56e0\u4e3a\u5b83\u53ef\u4ee5\u7528\u5b57\u7b26\u4e32\u8868\u793a\u3002\u4f46\u662f\u5047\u5982\u4f60\u60f3\u5728\u5e8f\u5217\u5316\u548c\u53cd\u5e8f\u5217\u5316\u4e2d\u4f20\u9012\u7684\u4e1c\u897f\u6839\u672c\u4e0d\u80fd\u5e8f\u5217\u5316\u5462\uff1f"),(0,a.kt)("p",null,"\u8fd9\u65f6\uff0c\u5de7\u5999\u5730\u5229\u7528 ",(0,a.kt)("strong",{parentName:"p"},"thread local")," \u5c31\u662f\u4e00\u79cd\u53d8\u901a\u65b9\u6cd5\u3002"),(0,a.kt)("p",null,"\u5728 MiniJinja \u4e2d\uff0c\u8fd0\u884c\u65f6\u503c\u7684\u5185\u90e8\u8868\u793a\u662f\u4e00\u4e2a\u53eb\u505a ",(0,a.kt)("inlineCode",{parentName:"p"},"Value"),"\n\u7684\u7ed3\u6784\u4f53\u3002\u6b63\u5982\u4f60\u6240\u671f\u671b\u7684\uff0c\u5b83\u53ef\u4ee5\u5bb9\u7eb3\u6574\u578b\uff0c\u6d6e\u70b9\u6570\uff0c\u5b57\u7b26\u4e32\uff0c\u5217\u8868\uff0c\u5bf9\u8c61\u7b49\u7b49\u3002\u7136\u800c\uff0c\u4ed6\u4e5f\u53ef\u4ee5\u5bb9\u7eb3\u4e00\u4e9b serde\n\u5b8c\u5168\u65e0\u6cd5\u89e3\u6790\u7684\u7c7b\u578b\u3002\u7279\u522b\u662f\u5b83\u53ef\u4ee5\u4fdd\u5b58\u4e00\u79cd\u7279\u6b8a\u7c7b\u578b\u7684\u5b57\u7b26\u4e32\uff0c\u79f0\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"'safe' string"),", \u5b83\u662f\u4e00\u4e2a\u5b58\u50a8\u4e86\u5b89\u5168\u7684 HTML\n\u4ee3\u7801\u7684\u5b57\u7b26\u4e32\uff0c\u4e0d\u9700\u8981\u8f6c\u4e49\uff0c\u4e5f\u4e0d\u9700\u8981\u6240\u8c13\u7684 '\u52a8\u6001\u503c'\u3002\u540e\u8005\u7279\u522b\u6709\u8da3\uff0c\u56e0\u4e3a\u5b83\u4e0d\u80fd\u88ab\u5e8f\u5217\u5316\u3002"),(0,a.kt)("p",null,"\u4ec0\u4e48\u662f\u52a8\u6001\u503c\uff1f\u5b83\u5b9e\u9645\u4e0a\u662f\u5177\u6709\u72b6\u6001\u7684\u5bf9\u8c61\u7684\u53e5\u67c4\uff0c\u5e94\u8be5\u76f4\u63a5\u4f20\u9012\u7ed9\u6a21\u677f\u3002\u8fd9\u91cc\u7684\u4e00\u4e2a\u4f8b\u5b50\u662f MiniJinja \u4e2d\u7684 loop \u53d8\u91cf\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rs"},"<ul>\n{% for item in seq %}\n    <li>{{ loop.index }}: {{ item }}</li>\n{% endfor %}\n</ul>\n")),(0,a.kt)("p",null,"MiniJinja\uff08\u7c7b\u4f3c\u4e8e Jinja2\uff09\u63d0\u4f9b\u4e86\u4e00\u4e2a\u7279\u6b8a\u7684 loop \u53d8\u91cf\u53ef\u4ee5\u8bbf\u95ee\u5faa\u73af\u7684\u72b6\u6001\u3002\u4f8b\u5982\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7 ",(0,a.kt)("inlineCode",{parentName:"p"},"loop.index"),"\n\u6765\u83b7\u53d6\u5f53\u524d\u5faa\u73af\u7684\u8fed\u4ee3\u6b21\u6570\u3002\u5728 MiniJinja \u7684\u5de5\u4f5c\u539f\u7406\u4e2d\uff0c'\u5faa\u73af\u63a7\u5236\u5668' \u672c\u8eab\u4f1a\u88ab\u76f4\u63a5\u4f20\u9012\u7ed9\u6a21\u677f\uff0c\u5e76\u4e14\u628a\u503c\u672c\u8eab\u5f53\u4f5c\u5f15\u7528\u8ba1\u6570\u5b58\u8fdb\u53bb\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rs"},"pub struct LoopState {\n    len: AtomicUsize,\n    idx: AtomicUsize,\n}\n\nlet controller = Rc::new(LoopState {\n    idx: AtomicUsize::new(!0usize),\n    len: AtomicUsize::new(len),\n});\n")),(0,a.kt)("p",null,"\u5f53\u5faa\u73af\u8fed\u4ee3\u65f6\uff0c\u63a7\u5236\u5668\u4e0a\u7684\u7d22\u5f15\u4f1a +1\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rs"},"controller.idx.fetch_add(1, Ordering::Relaxed);\n")),(0,a.kt)("p",null,"\u63a7\u5236\u5668\u672c\u8eab\u4f1a\u88ab\u76f4\u63a5\u6dfb\u52a0\u5230\u4e0a\u4e0b\u6587\u4e2d\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rs"},"let template_side_controller = Value::from_object(controller);\n")),(0,a.kt)("p",null,"\u4e3a\u4e86\u8fbe\u5230\u8fd9\u4e2a\u76ee\u7684\uff0c\u63a7\u5236\u5668\u9700\u8981\u5b9e\u73b0 MiniJinja \u5185\u90e8\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"Object")," \u7279\u5f81\uff0c\u4e0b\u9762\u662f\u4e00\u4e2a\u6700\u5c0f\u5b9e\u73b0\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rs"},'impl Object for LoopState {\n    fn attributes(&self) -> &[&str] {\n        &["index", "length"][..]\n    }\n\n    fn get_attr(&self, name: &str) -> Option<Value> {\n        let idx = self.idx.load(Ordering::Relaxed) as u64;\n        let len = self.len.load(Ordering::Relaxed) as u64;\n        match name {\n            "index" => Some(Value::from(idx + 1)),\n            "length" => Some(Value::from(len)),\n            _ => None,\n        }\n    }\n}\n')),(0,a.kt)("p",null,"\u5728\u6a21\u677f\u5f15\u64ce\u90a3\u4e00\u8fb9\uff0c\u7cfb\u7edf\u77e5\u9053\u5f53 ",(0,a.kt)("inlineCode",{parentName:"p"},"index")," \u5c5e\u6027\u88ab\u4f7f\u7528\u65f6\uff0c\u9700\u8981\u8c03\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"get_attr()")," \u65b9\u6cd5\u3002"),(0,a.kt)("p",null,"\u5230\u76ee\u524d\u4e3a\u6b62\u6211\u4eec\u6240\u8bf4\u7684\u90fd\u662f\u7406\u8bba\uff0cserde \u7a76\u7adf\u662f\u5982\u4f55\u505a\u7684\u5462\uff1f\u5f53 ",(0,a.kt)("inlineCode",{parentName:"p"},"Value::from_object")," \u8c03\u7528\u65f6\uff0c\u4f20\u5165\u7684\u503c\u4f1a\u88ab ",(0,a.kt)("inlineCode",{parentName:"p"},"move")," \u5230 value\n\u5bf9\u8c61\u91cc\u3002\u8fd9\u6837\u505a\u4e0d\u9700\u8981\u7279\u6b8a\u5904\u7406\uff0c\u7279\u522b\u662f\u7531\u4e8e\u5df2\u7ecf\u4f7f\u7528\u4e86\u5f15\u7528\u8ba1\u6570\u3002\u4f46\u662f\u73b0\u5728\u7684\u95ee\u9898\u662f\uff0c\u5bf9\u4e8e\u50cf ",(0,a.kt)("inlineCode",{parentName:"p"},"LoopState")," \u8fd9\u6837\u672c\u8eab\u6ca1\u6709\u5b9e\u73b0 ",(0,a.kt)("inlineCode",{parentName:"p"},"Serialize"),"\n\u7684\u4e1c\u897f\uff0c\u5b83\u7684\u503c\u662f\u5982\u4f55\u88ab\u5e8f\u5217\u5316\u7684\uff1f\u7b54\u6848\u662f\u7ebf\u7a0b\u672c\u5730\u5b58\u50a8\uff08thread local storage\uff09\u548c\u4e00\u4e2a\u5408\u4f5c\u7684\uff08co-operating\uff09\u5e8f\u5217\u5316\u548c\u53cd\u5e8f\u5217\u5316\u5668\u3002"),(0,a.kt)("h2",{id:"\u8d8a\u8fc7\u8fb9\u754c\u7684-state"},"\u8d8a\u8fc7\u8fb9\u754c\u7684 State"),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"Out of Bound State")),(0,a.kt)("p",null,"\u9690\u85cf\u5728 MiniJinja \u7684 Value \u5b9e\u73b0\u6709\u8fd9\u6837\u4e00\u6bb5\u4ee3\u7801\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rs"},'const VALUE_HANDLE_MARKER: &str = "\\x01__minijinja_ValueHandle";\nthread_local! {\n     static INTERNAL_SERIALIZATION: AtomicBool = AtomicBool::new(false);\n     static LAST_VALUE_HANDLE: AtomicUsize = AtomicUsize::new(0);\n     static VALUE_HANDLES: RefCell<BTreeMap<usize, Value>> = RefCell::new(BTreeMap::new());\n }\n\nfn in_internal_serialization() -> bool {\n    INTERNAL_SERIALIZATION.with(|flag| flag.load(atomic::Ordering::Relaxed))\n}\n')),(0,a.kt)("p",null,"\u5b83\u4eec\u7684\u7528\u5904\u662f\uff0cValue\n\u81ea\u8eab\u80fd\u591f\u611f\u77e5\u5230\u4ec0\u4e48\u65f6\u5019\u4f7f\u7528\u5185\u90e8\u5e8f\u5217\u5316\u7684\u7279\u6b8a\u5f62\u5f0f\u3002\u8fd9\u79cd\u5185\u90e8\u5e8f\u5217\u5316\u662f\u4e00\u79cd\u7279\u6b8a\u5f62\u5f0f\u7684\u5e8f\u5217\u5316\uff0c\u6211\u4eec\u660e\u786e\u77e5\u9053\u6211\u4eec\u7684\u5e8f\u5217\u5316\u6570\u636e\u7684\u63a5\u6536\u8005\u662f\u4e00\u4e2a\u53ef\u4ee5\u7406\u89e3\u8be5\u6570\u636e\u7684\u53cd\u5e8f\u5217\u5316\u5668\u3002\u6211\u4eec\u6ca1\u6709\u76f4\u63a5\u5bf9\u6570\u636e\u8fdb\u884c\u5e8f\u5217\u5316\uff0c\u800c\u662f\u5c06\u5176\u5b58\u5165\u5230\nTLS \u4e2d\uff0c\u7136\u540e\u628a\u6570\u636e\u7684\u53e5\u67c4\u5e8f\u5217\u5316\u5230 serde \u5e8f\u5217\u5316\u5668\u4e2d\u3002\u53cd\u5e8f\u5217\u5316\u5668\u4f1a\u5148\u53cd\u5e8f\u5217\u5316\u53e5\u67c4\uff0c\u63a5\u7740\u518d\u4ece TLS \u4e2d\u63d0\u53d6\u503c\u3002"),(0,a.kt)("p",null,"\u56e0\u6b64\uff0c\u6211\u4eec\u7684\u5faa\u73af\u63a7\u5236\u5668\u5e8f\u5217\u5316\u7684\u5b9e\u73b0\u5927\u81f4\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rs"},'impl Serialize for Value {\n    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>\n    where\n        S: Serializer,\n    {\n        // enable round tripping of values\n        if in_internal_serialization() {\n            use serde::ser::SerializeStruct;\n            let handle = LAST_VALUE_HANDLE.with(|x| x.fetch_add(1, atomic::Ordering::Relaxed));\n            VALUE_HANDLES.with(|handles| handles.borrow_mut().insert(handle, self.clone()));\n            let mut s = serializer.serialize_struct(VALUE_HANDLE_MARKER, 1)?;\n            s.serialize_field("handle", &handle)?;\n            return s.end();\n        }\n\n        // ... here follows implementation for serializing to JSON etc.\n    }\n}\n')),(0,a.kt)("p",null,"\u5982\u679c\u5b83\u88ab\u5e8f\u5217\u5316\u4e3a JSON\uff0c\u6211\u4eec\u5927\u81f4\u80fd\u770b\u5230\u8fd9\u6837\u7684\u4e1c\u897f\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{ "\\u0001__minijinja_ValueHandle": 1 }\n')),(0,a.kt)("p",null,"\u800c\u771f\u6b63\u7684\u5faa\u73af\u63a7\u5236\u5668\u5c06\u88ab\u5b58\u50a8\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"VALUE_HANDLES")," \u4e2d\u53e5\u67c4\u4e3a 1 \u5904\u3002\u73b0\u5728\u6211\u4eec\u5982\u4f55\u4ece\u91cc\u9762\u7684\u5230\u6570\u503c\u5462\uff1f\u5728 MiniJinja\n\u4e2d\uff0c\u53cd\u5e8f\u5217\u5316\u5176\u5b9e\u4ece\u672a\u53d1\u751f\uff0c\u53ea\u6709\u5e8f\u5217\u5316\u3002\u800c\u4e14\u5e8f\u5217\u5316\u4e5f\u53ea\u662f\u5c06\u5185\u5b58\u4e2d\u7684\u5bf9\u8c61\u7ec4\u88c5\u8d77\u6765\u3002\u56e0\u6b64\uff0c\u6211\u4eec\u53ea\u9700\u8981\u8ba9\u5e8f\u5217\u5316\u5668\u7406\u89e3\u5e26\u5185\u4fe1\u4ee4\u5982\u4f55\u5904\u7406\uff0c\u5e76\u4ee5\u6b64\u627e\u5230\u5e26\u5916\u7684\u503c\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rs"},'impl ser::SerializeStruct for SerializeStruct {\n    type Ok = Value;\n    type Error = Error;\n\n    fn serialize_field<T: ?Sized>(&mut self, key: &\'static str, value: &T) -> Result<(), Error>\n    where\n        T: Serialize,\n    {\n        let value = value.serialize(ValueSerializer)?;\n        self.fields.insert(key, value);\n        Ok(())\n    }\n\n    fn end(self) -> Result<Value, Error> {\n        match self.name {\n            VALUE_HANDLE_MARKER => {\n                let handle_id = self.fields["handle"].as_usize();\n                Ok(VALUE_HANDLES.with(|handles| {\n                    let mut handles = handles.borrow_mut();\n                    handles\n                        .remove(&handle_id)\n                        .expect("value handle not in registry")\n                }))\n            }\n            _ => /* regular struct code */\n        }\n    }\n}\n')),(0,a.kt)("h2",{id:"ser-to-de"},"Ser-to-De"),(0,a.kt)("p",null,"\u4e0a\u9762\u7684\u4f8b\u5b50\u662f\u4f60\u53ef\u4ee5\u6ee5\u7528\u7684\u4e00\u79cd\u65b9\u5f0f\uff0c\u4f46\u662f\u540c\u6837\u7684\u6a21\u5f0f\u5728\u771f\u5b9e\u7684\u5e8f\u5217\u5316\u548c\u53cd\u5e8f\u5217\u5316\u4e2d\u4e5f\u53ef\u4ee5\u7528\u5230\u3002\u5728 MiniJinja\n\u4e2d\uff0c\u6211\u53ef\u4ee5\u4e0d\u4f7f\u7528\u5e8f\u5217\u5316\uff0c\u56e0\u4e3a\u6211\u6709\u6548\u5730\u5229\u7528\u4e86\u5e8f\u5217\u5316\u4ee3\u7801\uff0c\u4ece\u4e00\u79cd\u5185\u5b58\u683c\u5f0f\u8f6c\u6362\u5230\u53e6\u4e00\u79cd\u5185\u5b58\u683c\u5f0f\u3002\u5982\u679c\u4f60\u60f3\u5728\u8fdb\u7a0b\u95f4\u4f20\u9012\u6570\u636e\uff0c\u60c5\u51b5\u5c31\u4f1a\u53d8\u5f97\u68d8\u624b\u4e00\u4e9b\uff0c\u5b9e\u9645\u7684\u5e8f\u5217\u5316\u5c31\u662f\u5fc5\u8981\u7684\u3002\u4f8b\u5982\uff0c\u4f60\u60f3\u5efa\u7acb\u4e00\u4e2a\nIPC\n\u7cfb\u7edf\uff0c\u5728\u8fdb\u7a0b\u4e4b\u95f4\u4ea4\u6362\u6570\u636e\uff0c\u8fd9\u91cc\u7684\u6311\u6218\u662f\uff0c\u51fa\u4e8e\u6027\u80fd\u7684\u8003\u8651\uff0c\u5bf9\u4e8e\u6bd4\u8f83\u5927\u7684\u5185\u5b58\u6bb5\uff0c\u4f60\u5fc5\u987b\u4f7f\u7528\u5171\u4eab\u5185\u5b58\uff0c\u6216\u8005\u662f\u4ee5\u6587\u4ef6\u63cf\u8ff0\u7b26\u7684\u5f62\u5f0f\u4f20\u9012\u6253\u5f00\u7684\u6587\u4ef6\uff08\u56e0\u4e3a\u8fd9\u4e9b\u6587\u4ef6\u6709\u53ef\u80fd\u662f\nsocket\uff09\u3002\u5728\u6211\u7684\u5b9e\u9a8c\u6027 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/mitsuhiko/unix-ipc"},"unix-ipc")," crate\n\u4e2d\uff0c\u6211\u5c31\u662f\u8fd9\u6837\u505a\u7684\u3002"),(0,a.kt)("p",null,"\u6211\u5728\u8fd9\u91cc\u5efa\u7acb\u4e86\u4e00\u4e2a\u4e8c\u7ea7\u7f13\u51b2\u533a\uff0c\u5b83\u53ef\u4ee5\u653e\u7f6e\u6587\u4ef6\u63cf\u8ff0\u7b26\u3002\u540c\u6837\uff0c\u8fd9\u91cc\u5fc5\u987b\u4f7f\u7528 TLS\u3002"),(0,a.kt)("p",null,"API \u5927\u81f4\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rs"},"pub fn serialize<S: Serialize>(s: S) -> io::Result<(Vec<u8>, Vec<RawFd>)> {\n    let mut fds = Vec::new();\n    let mut out = Vec::new();\n    enter_ipc_mode(|| bincode::serialize_into(&mut out, &s), &mut fds)\n        .map_err(bincode_to_io_error)?;\n    Ok((out, fds))\n}\n")),(0,a.kt)("p",null,"\u4ece\u7528\u6237\u7684\u89d2\u5ea6\u6765\u770b\uff0c\u8fd9\u4e9b\u90fd\u662f\u900f\u660e\u7684\u3002\u5f53\u4e00\u4e2a Serailize \u5b9e\u73b0\u9047\u5230\u4e86\u4e00\u4e2a\u6587\u4ef6\u5bf9\u8c61\u65f6\uff0c\u5b83\u53ef\u4ee5\u68c0\u67e5\u662f\u5426\u5e94\u8be5\u4f7f\u7528 IPC \u7684\u5e8f\u5217\u5316\uff0c\u5982\u679c\u662f\uff0c\u5b83\u53ef\u4ee5\u628a FD\n\u5b58\u8d77\u6765\uff0c",(0,a.kt)("inlineCode",{parentName:"p"},"enter_ipc_mode")," \u57fa\u672c\u4e0a\u5c06 fds \u7ed1\u5b9a\u5230\u4e86\u4e00\u4e2a\u7ebf\u7a0b\u5c40\u90e8\u53d8\u91cf\u91cc\uff0c\u63a5\u7740\u8c03\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"register_fd"),"\n\u6ce8\u518c\u5b83\u3002\u4f8b\u5982\uff0c\u4e0b\u9762\u5c55\u793a\u4e86\u5185\u90e8\u53e5\u67c4\u7684\u5e8f\u5217\u5316\u65b9\u5f0f\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rs"},'impl<F: IntoRawFd> Serialize for Handle<F> {\n    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>\n    where\n        S: ser::Serializer,\n    {\n        if is_ipc_mode() {\n            // effectively a weird version of `into_raw_fd` that does\n            // consume\n            let fd = self.extract_raw_fd();\n            let idx = register_fd(fd);\n            idx.serialize(serializer)\n        } else {\n            Err(ser::Error::custom("can only serialize in ipc mode"))\n        }\n    }\n}\n')),(0,a.kt)("p",null,"\u7136\u540e\u662f\u53cd\u5e8f\u5217\u5316\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rs"},'impl<\'de, F: FromRawFd + IntoRawFd> Deserialize<\'de> for Handle<F> {\n    fn deserialize<D>(deserializer: D) -> Result<Handle<F>, D::Error>\n    where\n        D: de::Deserializer<\'de>,\n    {\n        if is_ipc_mode() {\n            let idx = u32::deserialize(deserializer)?;\n            let fd = lookup_fd(idx).ok_or_else(|| de::Error::custom("fd not found in mapping"))?;\n            unsafe { Ok(Handle(Mutex::new(Some(FromRawFd::from_raw_fd(fd))))) }\n        } else {\n            Err(de::Error::custom("can only deserialize in ipc mode"))\n        }\n    }\n}\n')),(0,a.kt)("p",null,"\u4ece\u7528\u6237\u7684\u89d2\u5ea6\u6765\u770b\uff0c\u4ed6\u53ea\u9700\u8981\u901a\u8fc7 IPC channel \u4f20\u9012\u4e00\u4e2a ",(0,a.kt)("inlineCode",{parentName:"p"},"Handle::new(my_file)")," \u5c31\u80fd\u5b9e\u73b0\u3002"),(0,a.kt)("h2",{id:"serde-\u7684\u73b0\u72b6"},"Serde \u7684\u73b0\u72b6"),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"State of Serde")),(0,a.kt)("p",null,"\u4e0d\u5e78\u7684\u662f\uff0c\u4e0a\u9762\u6240\u6709\u7684\u4e1c\u897f\u90fd\u4f9d\u8d56\u7ebf\u7a0b\u672c\u5730\u53d8\u91cf\u548c\u5bf9\u5185\u4fe1\u4ee4\u3002\u6574\u4f53\u4e0a\u90fd\u4e0d\u662f\u5f88\u597d\uff0c\u5982\u679c\u6709\u4e00\u5929\u51fa\u4e86 serde 2.0\uff0c\u6211\u5e0c\u671b\u6709\u66f4\u597d\u7684\u65b9\u6cd5\u5b9e\u73b0\u4e0a\u9762\u7684\u5185\u5bb9\u3002"),(0,a.kt)("p",null,"\u5b9e\u9645\u4e0a\uff0c\u73b0\u5728\u7684 serde \u4ecd\u7136\u6709\u4e0d\u5c11\u95ee\u9898\u548c\u4e0a\u8ff0\u7684 Hack \u884c\u4e3a\u76f8\u5173\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/serde-rs/serde/issues/1463"},"serde requires in-band signalling")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/serde-rs/serde/issues/1183"},"Internal buffering disrupts format-specific deserialization features")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/serde-rs/json/issues/721"},"serde_json's arbitrary precision feature incompatible with flatten"))),(0,a.kt)("p",null,"\u8bf4\u5230\u8fd9\u91cc\uff0c\u5728\u6211\u4eec\u9700\u8981\u91cd\u5199 serde \u4e4b\u524d\uff0c\u80af\u5b9a\u8fd8\u6709\u8fdb\u4e00\u6b65\u53ef\u4ee5\u88ab\u6ee5\u7528\u7684\u5730\u65b9\u3002\u4f46\u662f\u73b0\u5728\u662f\u65f6\u5019\u5e94\u8be5\u6162\u6162\u8003\u8651 serve\n\u672a\u6765\u7248\u672c\u7684\u8bbe\u60f3\u4e86\u5b83\u5e94\u8be5\u5bf9\u6570\u636e\u6a21\u578b\u7684\u652f\u6301\u66f4\u53cb\u597d\uff0c\u53ef\u4ee5\u7528\u66f4\u5c11\u7684 Hack \u6765\u8131\u79bb\u89c4\u5b9a\u6846\u67b6\u3002"))}d.isMDXComponent=!0}}]);