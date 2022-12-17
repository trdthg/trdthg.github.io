"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[3844],{3905:(e,t,n)=>{n.d(t,{Zo:()=>k,kt:()=>s});var l=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,l,a=function(e,t){if(null==e)return{};var n,l,a={},r=Object.keys(e);for(l=0;l<r.length;l++)n=r[l],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(l=0;l<r.length;l++)n=r[l],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=l.createContext({}),d=function(e){var t=l.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},k=function(e){var t=d(e.components);return l.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},m=l.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,k=o(e,["components","mdxType","originalType","parentName"]),m=d(n),s=a,c=m["".concat(p,".").concat(s)]||m[s]||u[s]||r;return n?l.createElement(c,i(i({ref:t},k),{},{components:n})):l.createElement(c,i({ref:t},k))}));function s(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var d=2;d<r;d++)i[d]=n[d];return l.createElement.apply(null,i)}return l.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6901:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var l=n(7462),a=(n(7294),n(3905));const r={},i="Docker",o={unversionedId:"common/docker",id:"common/docker",title:"Docker",description:"1 \u955c\u50cf",source:"@site/docs/common/docker.md",sourceDirName:"common",slug:"/common/docker",permalink:"/docs/common/docker",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u6570\u636e\u7ed3\u6784",permalink:"/docs/common/datastructure"},next:{title:"Git",permalink:"/docs/common/git"}},p={},d=[{value:"1 \u955c\u50cf",id:"1-\u955c\u50cf",level:2},{value:"1.1 \u83b7\u53d6\u955c\u50cf",id:"11-\u83b7\u53d6\u955c\u50cf",level:3},{value:"1.2 \u5217\u51fa\u955c\u50cf",id:"12-\u5217\u51fa\u955c\u50cf",level:3},{value:"1.3 \u5220\u9664\u955c\u50cf",id:"13-\u5220\u9664\u955c\u50cf",level:3},{value:"2 \u5bb9\u5668",id:"2-\u5bb9\u5668",level:2},{value:"2.0 \u5217\u51fa\u5bb9\u5668",id:"20-\u5217\u51fa\u5bb9\u5668",level:3},{value:"2.1 \u542f\u52a8\u5bb9\u5668",id:"21-\u542f\u52a8\u5bb9\u5668",level:3},{value:"2.2 \u91cd\u542f\u5bb9\u5668",id:"22-\u91cd\u542f\u5bb9\u5668",level:3},{value:"2.3 \u7ec8\u6b62\u5bb9\u5668",id:"23-\u7ec8\u6b62\u5bb9\u5668",level:3},{value:"2.4 \u8fdb\u5165\u5bb9\u5668",id:"24-\u8fdb\u5165\u5bb9\u5668",level:3},{value:"2.5 \u5bfc\u5165\u5bfc\u51fa",id:"25-\u5bfc\u5165\u5bfc\u51fa",level:3},{value:"2.6 \u5220\u9664\u5bb9\u5668",id:"26-\u5220\u9664\u5bb9\u5668",level:3},{value:"3 Dockerfile",id:"3-dockerfile",level:2},{value:"ENV &amp; ARG",id:"env--arg",level:3},{value:"ADD &amp; COPY",id:"add--copy",level:3},{value:"EXPOSE",id:"expose",level:3},{value:"RUN",id:"run",level:3},{value:"ENTRYPOINT",id:"entrypoint",level:3},{value:"VOLUME",id:"volume",level:3},{value:"\u683c\u5f0f",id:"\u683c\u5f0f",level:3},{value:"build",id:"build",level:3},{value:"\u4f8b\u5b50",id:"\u4f8b\u5b50",level:3},{value:"curl \u81ea\u52a8\u67e5\u8be2 ip",id:"curl-\u81ea\u52a8\u67e5\u8be2-ip",level:4},{value:"redis + redis-json + redis-search",id:"redis--redis-json--redis-search",level:4},{value:"4 \u81ea\u52a8\u5316",id:"4-\u81ea\u52a8\u5316",level:2},{value:"pass \u51ed\u8bc1\u7ba1\u7406",id:"pass-\u51ed\u8bc1\u7ba1\u7406",level:3},{value:"\u5751",id:"\u5751",level:3},{value:"jib",id:"jib",level:3},{value:"5 docker-compose",id:"5-docker-compose",level:2},{value:"\u9650\u5236\u8d44\u6e90",id:"\u9650\u5236\u8d44\u6e90",level:3},{value:"\u5b8c\u6574\u914d\u7f6e\u53c2\u8003",id:"\u5b8c\u6574\u914d\u7f6e\u53c2\u8003",level:3},{value:"spring-boot + mysql",id:"spring-boot--mysql",level:3},{value:"doocker-compose.yml",id:"doocker-composeyml",level:4},{value:"5 \u5176\u4ed6",id:"5-\u5176\u4ed6",level:2},{value:"\u7aef\u53e3\u6620\u5c04",id:"\u7aef\u53e3\u6620\u5c04",level:3},{value:"\u6b63\u5219\u5339\u914d\u7528\u6cd5",id:"\u6b63\u5219\u5339\u914d\u7528\u6cd5",level:3},{value:"\u91cd\u547d\u540d",id:"\u91cd\u547d\u540d",level:3},{value:"\u6dfb\u52a0<code>sudo</code>\u6743\u9650",id:"\u6dfb\u52a0sudo\u6743\u9650",level:3},{value:"\u63a8\u9001\u5230 dockerhub",id:"\u63a8\u9001\u5230-dockerhub",level:3}],k={toc:d};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,l.Z)({},k,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"docker"},"Docker"),(0,a.kt)("h2",{id:"1-\u955c\u50cf"},"1 \u955c\u50cf"),(0,a.kt)("h3",{id:"11-\u83b7\u53d6\u955c\u50cf"},"1.1 \u83b7\u53d6\u955c\u50cf"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"docker pull")),(0,a.kt)("p",null,"\u6ca1\u5fc5\u8981\uff0c\u76f4\u63a5 docker run \u5c31\u884c\u4e86"),(0,a.kt)("h3",{id:"12-\u5217\u51fa\u955c\u50cf"},"1.2 \u5217\u51fa\u955c\u50cf"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u5217\u51fa\u6240\u6709\uff1a ",(0,a.kt)("inlineCode",{parentName:"p"},"docker image list"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u5217\u51fa\u6240\u6709\u865a\u60ac\u955c\u50cf\uff1a ",(0,a.kt)("inlineCode",{parentName:"p"},"docker image list -f dangling=true")),(0,a.kt)("p",{parentName:"li"},"\u8fd9\u4e2a\u955c\u50cf\u65e2\u6ca1\u6709\u4ed3\u5e93\u540d\uff0c\u4e5f\u6ca1\u6709\u6807\u7b7e\uff0c\u5747\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"<none>")))),(0,a.kt)("h3",{id:"13-\u5220\u9664\u955c\u50cf"},"1.3 \u5220\u9664\u955c\u50cf"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u5220\u9664\uff1a ",(0,a.kt)("inlineCode",{parentName:"p"},"docker image rm xxx")),(0,a.kt)("p",{parentName:"li"},"xxx \u53ef\u4ee5\u662f \u955c\u50cf\u77ed ID\u3001\u955c\u50cf\u957f ID\u3001\u955c\u50cf\u540d\u3001\u6216\u8005\u955c\u50cf\u6458\u8981")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u5220\u9664\u6240\u6709\u865a\u60ac\u955c\u50cf\uff1a ",(0,a.kt)("inlineCode",{parentName:"p"},"docker image prune"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u5220\u9664\u6240\u6709\u4ed3\u5e93\u540d\u4e3a redis \u7684\u955c\u50cf\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"docker image rm $(docker image ls -q redis)")))),(0,a.kt)("h2",{id:"2-\u5bb9\u5668"},"2 \u5bb9\u5668"),(0,a.kt)("h3",{id:"20-\u5217\u51fa\u5bb9\u5668"},"2.0 \u5217\u51fa\u5bb9\u5668"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"docker container ls -a")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"docker ps -a")),(0,a.kt)("h3",{id:"21-\u542f\u52a8\u5bb9\u5668"},"2.1 \u542f\u52a8\u5bb9\u5668"),(0,a.kt)("p",null,"\u65b0\u5efa\u5bb9\u5668\uff1a ",(0,a.kt)("inlineCode",{parentName:"p"},"docker run -d -it ubuntu:18.04 /bin/bash")),(0,a.kt)("h3",{id:"22-\u91cd\u542f\u5bb9\u5668"},"2.2 \u91cd\u542f\u5bb9\u5668"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"docker container start")),(0,a.kt)("h3",{id:"23-\u7ec8\u6b62\u5bb9\u5668"},"2.3 \u7ec8\u6b62\u5bb9\u5668"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"docker container stop")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"docker container restart")),(0,a.kt)("h3",{id:"24-\u8fdb\u5165\u5bb9\u5668"},"2.4 \u8fdb\u5165\u5bb9\u5668"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"docker exec -it ubuntu:18.04 /bin/bash")),(0,a.kt)("h3",{id:"25-\u5bfc\u5165\u5bfc\u51fa"},"2.5 \u5bfc\u5165\u5bfc\u51fa"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u5bfc\u51fa\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"docker export 7691a814370e > ubuntu.tar"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u5bfc\u5165\uff1a"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u4ece\u6587\u4ef6\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"cat ubuntu.tar | docker import - test/ubuntu:v1.0")),(0,a.kt)("li",{parentName:"ul"},"\u4ece\u8def\u5f84\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"docker import http://example.com/exampleimage.tgz example/imagerepo"))))),(0,a.kt)("h3",{id:"26-\u5220\u9664\u5bb9\u5668"},"2.6 \u5220\u9664\u5bb9\u5668"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u5220\u9664\u5df2\u7ecf\u5173\u95ed\u7684\u4e00\u4e2a\u5bb9\u5668\uff1a ",(0,a.kt)("inlineCode",{parentName:"p"},"docker container rm"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u5220\u9664\u6240\u6709\u5df2\u7ecf\u5173\u95ed\u7684\u5bb9\u5668\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"docker container prune")))),(0,a.kt)("h2",{id:"3-dockerfile"},"3 Dockerfile"),(0,a.kt)("p",null,"\u8fd9\u91cc\u4f1a\u5c06\u4e00\u4e2a Dockerfile \u7684\u6784\u5efa\u8fc7\u7a0b"),(0,a.kt)("h3",{id:"env--arg"},"ENV & ARG"),(0,a.kt)("p",null,"ARG \u7528\u4e8e\u8bbe\u7f6e\u73af\u5883\u53d8\u91cf"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"\u53ea\u5728 build \u671f\u95f4\u751f\u6548\uff0crun \u671f\u65e0\u6548")),(0,a.kt)("li",{parentName:"ul"},"\u5728\u6784\u5efa\u955c\u50cf\u7684\u65f6\u5019\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"li"},"--build-arg")," \u8fdb\u884c\u4f20\u9012\uff0c\u4f1a ",(0,a.kt)("strong",{parentName:"li"},"\u8986\u76d6")," Dockerfile \u4e2d\u6307\u5b9a\u7684\u540c\u540d\u53c2\u6570")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u7075\u6d3b\u4f7f\u7528 ARG \u6307\u4ee4\uff0c\u53ef\u4ee5\u5728\u4e0d\u4fee\u6539 Dockerfile \u7684\u60c5\u51b5\u4e0b\uff0c\u6784\u5efa\u4e0d\u540c\u955c\u50cf\u3002\u6211\u4eec\u53ef\u4ee5\u5728\u6784\u5efa\u955c\u50cf\u7684\u65f6\u5019\uff0c\u7ed9\u53c2\u6570\u4f20\u9012\u4e0d\u540c\u7684\u503c\uff0c\u6784\u5efa\u51fa\u4e0d\u540c\u7684\u955c\u50cf")),(0,a.kt)("p",null,"ENV \u6307\u4ee4\u548c ARG \u6307\u4ee4\u7279\u522b\u76f8\u4f3c"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"ARG \u5728 build \u7684\u65f6\u5019\u751f\u6548\uff0cENV \u5728 run \u7684\u65f6\u5019\u751f\u6548\uff0c\u90fd\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528\u8fd9\u91cc\u5b9a\u4e49\u7684\u73af\u5883\u53d8\u91cf\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"docker run --env")," \u53ef\u4ee5\u4fee\u6539\u8fd9\u4e9b\u503c")),(0,a.kt)("h3",{id:"add--copy"},"ADD & COPY"),(0,a.kt)("p",null,"COPY"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u652f\u6301\u901a\u914d\u7b26"),(0,a.kt)("li",{parentName:"ul"},"\u53ef\u4ee5\u6539\u53d8\u7528\u6237\u548c\u7ec4")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-dockerfile"},"COPY package.json /usr/src/app/\nCOPY hom* /mydir/\nCOPY hom?.txt /mydir/\nCOPY --chown=55:mygroup files* /mydir/\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5982\u679c src \u662f URL\uff0c\u5e76\u4e14 dest \u4e0d\u4ee5\u659c\u6760\u7ed3\u5c3e\uff0c\u5219\u4ece URL \u4e0b\u8f7d\u6587\u4ef6\u5e76\u5c06\u5176\u590d\u5236\u5230 dest\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u5982\u679c dest \u4ee5\u659c\u6760\u7ed3\u5c3e\uff0c\u5c06\u81ea\u52a8\u63a8\u65ad\u51fa url \u7684\u540d\u5b57\uff08\u4fdd\u7559\u6700\u540e\u4e00\u90e8\u5206\uff09\uff0c\u4fdd\u5b58\u5230 dest"),(0,a.kt)("li",{parentName:"ul"},"\u5982\u679c src \u662f\u76ee\u5f55\uff0c\u5219\u5c06\u590d\u5236\u76ee\u5f55\u7684\u6574\u4e2a\u5185\u5bb9\uff0c\u5305\u62ec\u6587\u4ef6\u7cfb\u7edf\u5143\u6570\u636e\u3002")),(0,a.kt)("p",null,"ADD"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u6e90\u8def\u7ecf\u662f URL \u4f1a\u5c1d\u8bd5\u4e0b\u8f7d"),(0,a.kt)("li",{parentName:"ul"},"\u6e90\u8def\u5f84\u662f\u538b\u7f29\u6587\u4ef6 (gzip, bzip2 \u4ee5\u53ca xz), \u4f1a\u81ea\u52a8\u89e3\u538b")),(0,a.kt)("h3",{id:"expose"},"EXPOSE"),(0,a.kt)("p",null,"\u6307\u5b9a\u5bb9\u5668\u5411\u5916\u90e8\u66b4\u9732\u7684\u7aef\u53e3\uff0c\u4f46\u5e76\u4e0d\u4f1a\u81ea\u52a8\u6620\u5c04\u5230\u5bbf\u4e3b\u673a\uff0c\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"-P"),"\u540e\u4f1a\u5c06\u8fd9\u4e9b\u7aef\u53e3\u968f\u673a\u6620\u5c04\u5230\u5bbf\u4e3b\u673a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-dockerfile"},"EXPOSE 8080\nEXPOSE 7000-8000\n")),(0,a.kt)("h3",{id:"run"},"RUN"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-dockerfile"},'RUN cd /app\nRUN echo "hello" > world.txt\n')),(0,a.kt)("p",null,"\u4e0a\u9762\u7684\u4e24\u4e2a",(0,a.kt)("inlineCode",{parentName:"p"},"RUN"),"\u5e76\u4e0d\u662f\u5728\u540c\u4e00\u4e2a\u73af\u5883\u4e0b\u8fd0\u884c\u7684\uff0c\u4ed6\u4eec\u4e0d\u662f\u4e00\u4e2a\u5bb9\u5668\uff0c\u4ed6\u4eec\u7684\u5de5\u4f5c\u76ee\u5f55\u5f53\u7136\u4e5f\u4e0d\u4e00\u6837"),(0,a.kt)("p",null,"\u53ef\u4ee5\u901a\u8fc7",(0,a.kt)("inlineCode",{parentName:"p"},"WORKDIR"),"\u53bb\u540c\u6b65\u4e0d\u540c\u547d\u4ee4\u7684\u5de5\u4f5c\u76ee\u5f55"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-dockerfile"},'WORKDIR /app\nRUN echo "hello" > world.txt\n')),(0,a.kt)("p",null,"\u591a\u4e2a",(0,a.kt)("inlineCode",{parentName:"p"},"WORKDIR"),"\u4e4b\u95f4\u662f\u6709\u8054\u7cfb\u7684"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-dockerfile"},"WORKDIR /a\nWORKDIR b\nWORKDIR c\n\nRUN pwd\n# /a/b/c\n")),(0,a.kt)("h3",{id:"entrypoint"},"ENTRYPOINT"),(0,a.kt)("p",null,"ENTRYPOINT \u914d\u7f6e\u5bb9\u5668\u542f\u52a8\u65f6\u7684\u6267\u884c\u547d\u4ee4"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u4e0d\u4f1a\u88ab\u5ffd\u7565\uff0c",(0,a.kt)("strong",{parentName:"li"},"\u4e00\u5b9a\u4f1a\u88ab\u6267\u884c"),"\uff0c\u5373\u4f7f\u8fd0\u884c docker run \u65f6\u6307\u5b9a\u4e86\u5176\u4ed6\u547d\u4ee4")),(0,a.kt)("h3",{id:"volume"},"VOLUME"),(0,a.kt)("p",null,"\u6302\u8f7d\u4e3b\u673a\u76ee\u5f55 / \u6302\u8f7d\u6570\u636e\u5377"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-dockerfile"},"VOLUME: HostPath:ContainerPath\n")),(0,a.kt)("p",null,"\u6302\u8f7d\u533f\u540d\u5377\uff0c\u533f\u540d\u5377\u4e2d\u7684\u6570\u636e\u4e0d\u4f1a\u6301\u4e45\u5316"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-dockerfile"},"VOLUME /data\n")),(0,a.kt)("p",null,"\u547d\u4ee4\u884c\u6302\u8f7d"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"--mount type=bind,source=/src/webapp,target=/usr/share/nginx/html,readonly \\\n")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"key"),(0,a.kt)("th",{parentName:"tr",align:null},"value"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"type"),(0,a.kt)("td",{parentName:"tr",align:null},"bind, volume, or tmpfs")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"source/src"),(0,a.kt)("td",{parentName:"tr",align:null},"Docker Host \u4e0a\u7684\u4e00\u4e2a\u76ee\u5f55\u6216\u8005\u6587\u4ef6")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"destination/dst/target"),(0,a.kt)("td",{parentName:"tr",align:null},"\u88ab\u6302\u8f7d\u5bb9\u5668\u4e0a\u7684\u4e00\u4e2a\u76ee\u5f55\u6216\u8005\u6587\u4ef6")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"readonly"),(0,a.kt)("td",{parentName:"tr",align:null},"\u6302\u8f7d\u4e3a\u53ea\u8bfb")))),(0,a.kt)("h3",{id:"\u683c\u5f0f"},"\u683c\u5f0f"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u6307\u5b9a\u57fa\u7840\u955c\u50cf"),(0,a.kt)("p",{parentName:"li"},"\u5b9a\u5236\u4e00\u4e2a\u955c\u50cf\uff0c\u9700\u8981\u4ee5\u4e00\u4e2a\u955c\u50cf\u4e3a\u57fa\u7840"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-dockerfile"},"FROM alpine:latest\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"RUN \u6267\u884c\u547d\u4ee4 \u683c\u5f0f\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"RUN <\u547d\u4ee4>"),"\uff0c\u5c31\u50cf\u76f4\u63a5\u5728\u547d\u4ee4\u884c\u4e2d\u8f93\u5165\u7684\u547d\u4ee4\u4e00\u6837\u3002\u521a\u624d\u5199\u7684 Dockerfile \u4e2d\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"RUN")," \u6307\u4ee4\u5c31\u662f\u8fd9\u79cd\u683c\u5f0f\u3002")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"ENTRYPOINT \u6dfb\u52a0 prefix"),(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},'ENTRYPOINT [ "curl", "-s", "http://myip.ipip.net" ]')),(0,a.kt)("p",{parentName:"li"},"\u4ece\u5916\u90e8\u8fd0\u884c",(0,a.kt)("inlineCode",{parentName:"p"},"docker run myip -i"),"\uff0c\u5c31\u76f8\u5f53\u4e8e",(0,a.kt)("inlineCode",{parentName:"p"},"docker run myip curl -s http://myip.ipip.net -i")))),(0,a.kt)("h3",{id:"build"},"build"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"docker build -t xxx .\n")),(0,a.kt)("h3",{id:"\u4f8b\u5b50"},"\u4f8b\u5b50"),(0,a.kt)("h4",{id:"curl-\u81ea\u52a8\u67e5\u8be2-ip"},"curl \u81ea\u52a8\u67e5\u8be2 ip"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},'FROM ubuntu:18.04\n\nRUN apt-get update \\\n    && apt-get install -y curl \\\n    && rm -rf /var/lib/apt/lists/*\n\nCMD ["curl", "-s", "http://"]\n')),(0,a.kt)("h4",{id:"redis--redis-json--redis-search"},"redis + redis-json + redis-search"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},'FROM alpine:latest\n\nCOPY ./cargo-config /cargo-config\n\nRUN mkdir -p ~/.cargo && mv /cargo-config ~/.cargo/config \\\n\\\n        && sed -i \'s/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g\' /etc/apk/repositories \\\n        && apk add --no-cache \\\n        redis \\\n        openssh \\\n        sudo \\\n        libgcc \\\n\\\n        clang-libs \\\n        git \\\n        bash \\\n        python3 \\\n        py3-setuptools \\\n        py3-pip \\\n        unzip \\\n        wget \\\n        alpine-sdk \\\n        cmake \\\n        cargo \\\n\\\n        && mkdir -p /opt/build /opt/redis-modules \\\n\\\n        && cd /opt/build \\\n        && git clone https://github.com/RedisJSON/RedisJSON \\\n        && cd RedisJSON \\\n        && git submodule update --init --recursive \\\n        && cd .. \\\n        && git clone https://github.com/RediSearch/RediSearch \\\n\\\n        && cd /opt/build/RedisJSON \\\n        && make build shell=/bin/bash \\\n        && cp target/release/librejson.so /opt/redis-modules \\\n\\\n        && cd /opt/build/RediSearch \\\n        && cmake . -DCMAKE_INSTALL_PREFIX="/opt/redis-modules" -Bbuild \\\n        && cmake --build build \\\n        && cp build/redisearch.so /opt/redis-modules \\\n\\\n        && rm -rf /opt/build \\\n        && rm -rf ~/.cargo \\\n        && strip /opt/redis-modules/*.so \\\n        && apk del --purge alpine-sdk cmake cargo python3 py3-setuptools py3-pip unzip wget bash git clang-libs \\\n        && adduser -D -s /bin/ash admin\n\nUSER admin\nVOLUME ["/home/admin"]\nWORKDIR /home/admin\nEXPOSE 6379\nCMD ["redis-server", "--loadmodule", "/opt/redis-modules/librejson.so", "--loadmodule", "/opt/redis-modules/redisearch.so"]\n')),(0,a.kt)("h2",{id:"4-\u81ea\u52a8\u5316"},"4 \u81ea\u52a8\u5316"),(0,a.kt)("h3",{id:"pass-\u51ed\u8bc1\u7ba1\u7406"},"pass \u51ed\u8bc1\u7ba1\u7406"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"pass"),(0,a.kt)("li",{parentName:"ul"},"docker-credential-pass")),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://blog.csdn.net/Rambo_Yang/article/details/108294632",alt:"Docker Login \u767b\u5f55\u51ed\u8bc1\u5b89\u5168\u5b58\u50a8"})),(0,a.kt)("h3",{id:"\u5751"},"\u5751"),(0,a.kt)("p",null,"gpg2 \u4e00\u5b9a\u4e0d\u8981\u4f7f\u7528 sudo \u6267\u884c\uff0cdocker \u4e5f\u8981\u52a0\u5230 group \u91cc"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u6ce8\u610f",(0,a.kt)("inlineCode",{parentName:"p"},"docker login"),"\u767b\u9646\u7684 url \u662f\u4ec0\u4e48\uff0c\u8fd9\u4e2a url \u9700\u8981\u65f6 jib \u767d\u540d\u5355\u91cc\u6709\u7684"),(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"docker login"),"\u9ed8\u8ba4\u767b\u9646\u7684 url \u662f",(0,a.kt)("inlineCode",{parentName:"p"},"index.docker.io/v1")),(0,a.kt)("p",{parentName:"li"},"\u5982\u679c jib \u65e0\u6cd5\u8bc6\u522b\uff0c\u53ef\u4ee5\u5c1d\u8bd5\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"docker login registry.hub.docker.com")),(0,a.kt)("p",{parentName:"li"},"\u73b0\u5728\u6709\u7684\u51ed\u8bc1\u53ef\u4ee5\u901a\u8fc7",(0,a.kt)("inlineCode",{parentName:"p"},"docker-credential-pass list"),"\u67e5\u770b"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},'\xbb\xbb\xbb\xbb docker-credential-pass list\n{"https://index.docker.io/v1/":"trdthg","registry.hub.docker.com":"trdthg"}\n'))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"jib \u81ea\u52a8 push \u9700\u8981\u4ece\u767d\u540d\u5355 url \u4e2d\u4e00\u4e2a\u4e2a\u5c1d\u8bd5\uff0c",(0,a.kt)("inlineCode",{parentName:"p"},"docker login")))),(0,a.kt)("h3",{id:"jib"},"jib"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://github.com/GoogleContainerTools/jib",alt:"Jib"})),(0,a.kt)("p",null,"\u767b\u9646\u6210\u529f\u4f1a\u6709\u4e0b\u9762\u7684\u63d0\u793a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"[INFO] Using credentials from Docker config (/home/trdthg/.docker/config.json) for adoptopenjdk/openjdk8\n")),(0,a.kt)("h2",{id:"5-docker-compose"},"5 docker-compose"),(0,a.kt)("h3",{id:"\u9650\u5236\u8d44\u6e90"},"\u9650\u5236\u8d44\u6e90"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml"},"redis:\n  image: redis:alpine\n  container_name: redis\n  deploy:\n    resources:\n      limits:\n        cpus: '0.50'\n        memory: 50M\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"--compatibility"),": \u4ee5\u517c\u5bb9\u6a21\u5f0f\u8fd0\u884c\uff0c\u5c06 v3 \u7684\u8bed\u6cd5\u8f6c\u5316\u4e3a v2 \u7684\u8bed\u6cd5\uff0c\u800c\u4e0d\u9700\u8981\u5c06 compose \u6587\u4ef6\u6539\u4e3a v2 \u7684\u7248\u672c"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"docker-compose --compatibility up -d\n")),(0,a.kt)("h3",{id:"\u5b8c\u6574\u914d\u7f6e\u53c2\u8003"},"\u5b8c\u6574\u914d\u7f6e\u53c2\u8003"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml"},"version: \"3\"  # \u6307\u5b9a docker-compose \u8bed\u6cd5\u7248\u672c\nservices:    # \u4ece\u4ee5\u4e0b\u5b9a\u4e49\u670d\u52a1\u914d\u7f6e\u5217\u8868\n  server_name:   # \u53ef\u5c06 server_name \u66ff\u6362\u4e3a\u81ea\u5b9a\u4e49\u7684\u540d\u5b57\uff0c\u5982 mysql/php \u90fd\u53ef\u4ee5\n    container_name: container_name  # \u6307\u5b9a\u5b9e\u4f8b\u5316\u540e\u7684\u5bb9\u5668\u540d\uff0c\u53ef\u5c06 container_name \u66ff\u6362\u4e3a\u81ea\u5b9a\u4e49\u540d\n    image: xxx:latest # \u6307\u5b9a\u4f7f\u7528\u7684\u955c\u50cf\u540d\u53ca\u6807\u7b7e\n    build:  # \u5982\u679c\u6ca1\u6709\u73b0\u6210\u7684\u955c\u50cf\uff0c\u9700\u8981\u81ea\u5df1\u6784\u5efa\u4f7f\u7528\u8fd9\u4e2a\u9009\u9879\n      context: /xxx/xxx/Dockerfile  # \u6307\u5b9a\u6784\u5efa\u955c\u50cf\u6587\u4ef6\u7684\u8def\u5f84\n      dockerfile: ....     # \u6307\u5b9a Dockerfile \u6587\u4ef6\u540d\uff0c\u4e0a\u4e00\u6761\u6307\u5b9a\uff0c\u8fd9\u4e00\u6761\u5c31\u4e0d\u8981\u4e86\n    ports:\n      - \"00:00\"  # \u5bb9\u5668\u5185\u7684\u6620\u5c04\u7aef\u53e3\uff0c\u672c\u5730\u7aef\u53e3\uff1a\u5bb9\u5668\u5185\u7aef\u53e3\n      - \"00:00\"  # \u53ef\u6307\u5b9a\u591a\u4e2a\n    volumes:\n      - test1:/xx/xx  # \u8fd9\u91cc\u4f7f\u7528 managed volume \u7684\u65b9\u6cd5\uff0c\u5c06\u5bb9\u5668\u5185\u7684\u76ee\u5f55\u6620\u5c04\u5230\u7269\u7406\u673a\uff0c\u65b9\u4fbf\u7ba1\u7406\n      - test2:/xx/xx  # \u524d\u8005\u662f volumes \u76ee\u5f55\u4e0b\u7684\u540d\u5b57\uff0c\u540e\u8005\u662f\u5bb9\u5668\u5185\u76ee\u5f55\n      - test3:/xx/xx  # \u5728\u6587\u4ef6\u7684\u6700\u540e\u8fd8\u8981\u4f7f\u7528 volumes \u6307\u5b9a\u8fd9\u51e0\u4e2a tests\n    volumes_from:  # \u6307\u5b9a\u5377\u5bb9\u5668\n       - volume_container_name  # \u5377\u5bb9\u5668\u540d\n    restarts: always  # \u8bbe\u7f6e\u65e0\u8bba\u9047\u5230\u4ec0\u4e48\u9519\uff0c\u91cd\u542f\u5bb9\u5668\n    depends_on:       # \u7528\u6765\u89e3\u51b3\u4f9d\u8d56\u5173\u7cfb\uff0c\u5982\u8fd9\u4e2a\u670d\u52a1\u7684\u542f\u52a8\uff0c\u5fc5\u987b\u5728\u54ea\u4e2a\u670d\u52a1\u542f\u52a8\u4e4b\u540e\n      - server_name   # \u8fd9\u4e2a\u662f\u540d\u5b57\u5176\u4ed6\u670d\u52a1\u5728\u8fd9\u4e2a\u6587\u4ef6\u4e2d\u7684 server_name\n      - server_name1  # \u6309\u7167\u5148\u540e\u987a\u5e8f\u542f\u52a8\n    links:  # \u4e0e depend_on \u76f8\u5bf9\u5e94\uff0c\u4e0a\u9762\u63a7\u5236\u5bb9\u5668\u542f\u52a8\uff0c\u8fd9\u4e2a\u63a7\u5236\u5bb9\u5668\u8fde\u63a5\n      - mysql  # \u503c\u53ef\u4ee5\u662f - \u670d\u52a1\u540d\uff0c\u6bd4\u8f83\u590d\u6742\uff0c\u53ef\u4ee5\u5728\u8be5\u670d\u52a1\u4e2d\u4f7f\u7528 links \u4e2d mysql \u4ee3\u66ff\u8fd9\u4e2a mysql \u7684 ip\n    networks: # \u52a0\u5165\u6307\u5b9a\u7684\u7f51\u7edc\uff0c\u4e0e\u4e4b\u524d\u7684\u6dfb\u52a0\u7f51\u5361\u540d\u7c7b\u4f3c\n      - my_net  # bridge \u7c7b\u578b\u7684\u7f51\u5361\u540d\n      - myapp_net # \u5982\u679c\u6ca1\u6709\u7f51\u5361\u4f1a\u88ab\u521b\u5efa\uff0c\u5efa\u8bae\u4f7f\u7528\u65f6\u5148\u521b\u5efa\u53f7\uff0c\u5728\u6307\u5b9a\n    environment: # \u5b9a\u4e49\u53d8\u91cf\uff0c\u7c7b\u4f3c dockerfile \u4e2d\u7684 ENV\n      - TZ=Asia/Shanghai  # \u8fd9\u91cc\u8bbe\u7f6e\u5bb9\u5668\u7684\u65f6\u533a\u4e3a\u4e9a\u6d32\u4e0a\u6d77\uff0c\u4e5f\u5c31\u89e3\u51b3\u4e86\u5bb9\u5668\u901a\u8fc7 compose \u7f16\u6392\u542f\u52a8\u7684 \u65f6\u533a\u95ee\u9898\uff01\uff01\uff01\uff01\u89e3\u51b3\u4e86\u5bb9\u5668\u7684\u65f6\u533a\u95ee\u9898\uff01\uff01\uff01\n      \u53d8\u91cf\u503c\uff1a\u53d8\u91cf\u540d   # \u8fd9\u4e9b\u53d8\u91cf\u5c06\u4f1a\u88ab\u76f4\u63a5\u5199\u5230\u955c\u50cf\u4e2d\u7684/etc/profile\n    command: [                        #\u4f7f\u7528 command \u53ef\u4ee5\u8986\u76d6\u5bb9\u5668\u542f\u52a8\u540e\u9ed8\u8ba4\u6267\u884c\u7684\u547d\u4ee4\n            '--character-set-server=utf8mb4',            #\u8bbe\u7f6e\u6570\u636e\u5e93\u8868\u7684\u6570\u636e\u96c6\n            '--collation-server=utf8mb4_unicode_ci',    #\u8bbe\u7f6e\u6570\u636e\u5e93\u8868\u7684\u6570\u636e\u96c6\n            '--default-time-zone=+8:00'                    #\u8bbe\u7f6e mysql \u6570\u636e\u5e93\u7684 \u65f6\u533a\u95ee\u9898\uff01\uff01\uff01\uff01\u800c\u4e0d\u662f\u8bbe\u7f6e\u5bb9\u5668\u7684\u65f6\u533a\u95ee\u9898\uff01\uff01\uff01\uff01\n    ]\n  server_name2:  # \u5f00\u59cb\u7b2c\u4e8c\u4e2a\u5bb9\u5668\n    server_name:\n      stdin_open: true # \u7c7b\u4f3c\u4e8e docker run -d\n      tty: true  # \u7c7b\u4f3c\u4e8e docker run -t\nvolumes:   # \u4ee5\u4e0a\u6bcf\u4e2a\u670d\u52a1\u4e2d\u6302\u8f7d\u6620\u5c04\u7684\u76ee\u5f55\u90fd\u5728\u8fd9\u91cc\u5199\u5165\u4e00\u6b21\uff0c\u4e5f\u53eb\u4f5c\u58f0\u660e volume\n  test1:\n  test2:\n  test3:\nnetworks:  # \u5982\u679c\u8981\u6307\u5b9a ip \u7f51\u6bb5\uff0c\u8fd8\u662f\u521b\u5efa\u597d\u5728\u4f7f\u7528\u5373\u53ef\uff0c\u58f0\u660e networks\n  my_net:\n    driver: bridge  # \u6307\u5b9a\u7f51\u5361\u7c7b\u578b\n  myapp_net:\n    driver: bridge\n")),(0,a.kt)("h3",{id:"spring-boot--mysql"},"spring-boot + mysql"),(0,a.kt)("h4",{id:"doocker-composeyml"},"doocker-compose.yml"),(0,a.kt)("p",null,"\u7f51\u7edc\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u5982\u679c\u4e0d\u7279\u6b8a\u6307\u660e\uff0c\u6240\u6709\u7684 service \u90fd\u4f1a\u81ea\u52a8\u52a0\u5165 default \u7f51\u7edc\u91cc")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"host \u4f1a\u88ab service \u7684\u540d\u79f0\u4ee3\u66ff ",(0,a.kt)("inlineCode",{parentName:"p"},"tguio.club => mysql"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u7aef\u53e3\u53f7\u4f1a\u88ab\u5bb9\u5668\u66b4\u9732\u7684\u7aef\u53e3\u4ee3\u66ff ",(0,a.kt)("inlineCode",{parentName:"p"},"4205 => 3306"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u5bb9\u5668\u4e4b\u95f4\u53ef\u4ee5\u901a\u8fc7\u81ea\u5df1\u66b4\u9732\u7684\u7aef\u53e3\u4e92\u76f8\u8bbf\u95ee")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u5bbf\u4e3b\u673a\u8fd8\u662f\u9700\u8981\u901a\u8fc7\u7ed1\u5b9a\u5230\u5bbf\u4e3b\u673a\u4e0a\u7684\u7aef\u53e3\u8bbf\u95ee"))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml"},'services:\n  web:\n    build: .\n    ports:\n      - "8848:8848"\n    depends_on:\n      - mysql\n      - redis\n  mysql:\n    image: mysql:latest\n    environment:\n      MYSQL_DATABASE: dev\n      MYSQL_USER: admin\n      MYSQL_PASSWORD: admin\n      MYSQL_ROOT_PASSWORD: 2022A22db\n    ports:\n      - "4205:3306"\n    restart: always\n\n  redis:\n    image: "redis:alpine"\n    ports:\n      - "5470:6379"\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml"},"server:\n  port: 8848\nspring:\n  datasource:\n#    url: jdbc:mysql://tguio.club:4205/dev?serverTimezone=UTC&useSSL=false&autoReconnect=true&tinyInt1isBit=false&useUnicode=true&characterEncoding=utf8&allowPublicKeyRetrieval=true\n    url: jdbc:mysql://mysql:3306/dev?serverTimezone=UTC&useSSL=false&autoReconnect=true&tinyInt1isBit=false&useUnicode=true&characterEncoding=utf8&allowPublicKeyRetrieval=true\n    username: admin\n    password: admin\n  jpa:\n    properties:\n      hibernate:\n        format_sql: true\n#        show_sql: true\n        hbm2ddl:\n          auto: update\n  redis:\n#    host: tguio.club\n    host: redis\n    port: 5470\n    pool:\n      max-active: 8\n      max-wait: -1\n      max-idle: 4\n      min-idle: 1\n#    timeout: 5\n")),(0,a.kt)("h2",{id:"5-\u5176\u4ed6"},"5 \u5176\u4ed6"),(0,a.kt)("h3",{id:"\u7aef\u53e3\u6620\u5c04"},"\u7aef\u53e3\u6620\u5c04"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u4e00\u5bf9\u4e00\u6307\u5b9a\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"-p <\u5bbf\u4e3b\u7aef\u53e3>:<\u5bb9\u5668\u7aef\u53e3>")),(0,a.kt)("li",{parentName:"ul"},"\u4e00\u5bf9\u4e00\u968f\u673a\uff1a",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-P 80")," \u628a\u5bb9\u5668\u7684 80 \u7aef\u53e3\u968f\u673a\u6620\u5c04\u5bbf\u4e3b\u673a\u4e0a"))),(0,a.kt)("li",{parentName:"ul"},"\u591a\u5bf9\u591a\u6307\u5b9a\uff1a",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-p 1000-2000:1000-2000")," \u5bb9\u5668\u7684 1000-2000 \u7684\u6240\u6709\u7aef\u53e3\uff0c\u6620\u5c04\u5230\u5bbf\u4e3b\u673a\u7aef\u53e3 1000-2000"))),(0,a.kt)("li",{parentName:"ul"},"\u591a\u5bf9\u591a\u968f\u673a\uff1a",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"docker run --expose=1000-2000")," \u5bb9\u5668\u7684 1000-2000 \u7684\u6240\u6709\u7aef\u53e3\uff0c\u968f\u673a\u6620\u5c04\u5230\u5bbf\u4e3b\u673a"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"docker run -P")," \u628a\u5bb9\u5668\u66b4\u9732\u7684\u6240\u6709\u7aef\u53e3\u90fd\u968f\u673a\u6620\u5c04\u5bbf\u4e3b\u673a\u4e0a")))),(0,a.kt)("h3",{id:"\u6b63\u5219\u5339\u914d\u7528\u6cd5"},"\u6b63\u5219\u5339\u914d\u7528\u6cd5"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u5220\u9664\u5bb9\u5668"),(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"sudo docker ps -a | awk '{print $1, $2}' | grep \"jdk\" | xargs -t sudo docker rm"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u5220\u9664\u955c\u50cf\n",(0,a.kt)("inlineCode",{parentName:"p"},"sudo docker images | awk '{print $1, $2}' | grep \"jdk\" | awk '{print $1}' | xargs -t sudo docker rmi")),(0,a.kt)("p",{parentName:"li"},"awk \u80fd\u591f\u4e14\u5206\u4e3a\u4e00\u884c\uff0cprint \u80fd\u9009\u62e9\u5b57\u6bb5"))),(0,a.kt)("h3",{id:"\u91cd\u547d\u540d"},"\u91cd\u547d\u540d"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"           \u955c\u50cf id   \u540d\u79f0  tag(\u53ef\u7701\u7565)\ndocker tag e49db activemp:1.5.5\n")),(0,a.kt)("h3",{id:"\u6dfb\u52a0sudo\u6743\u9650"},"\u6dfb\u52a0",(0,a.kt)("inlineCode",{parentName:"h3"},"sudo"),"\u6743\u9650"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"# \u5982\u679c docker \u7ec4\u4e0d\u5b58\u5728\uff0c\u5219\u6dfb\u52a0\u4e4b\uff1a\nsudo groupadd docker\n\n# \u5c06\u5f53\u524d\u7528\u6237\u6dfb\u52a0\u5230 docker \u7ec4\nsudo gpasswd -a trdthg docker\n\n# \u6dfb\u52a0\u8bbf\u95ee\u548c\u6267\u884c\u6743\u9650\nsudo chmod a+rw /var/run/docker.sock\n")),(0,a.kt)("h3",{id:"\u63a8\u9001\u5230-dockerhub"},"\u63a8\u9001\u5230 dockerhub"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u767b\u9646")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"docker login -u xxx\nPassword: \u8f93\u5165 token\n")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"\u63a8\u9001 \u6ce8\u610f\uff1a\u9700\u8981\u4fee\u6539 image \u540d\u79f0\u4e3a ",(0,a.kt)("inlineCode",{parentName:"li"},"{username}/{image-name}:{tag}"))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"docker push `{username}/{image-name}:{tag}`\n")))}u.isMDXComponent=!0}}]);