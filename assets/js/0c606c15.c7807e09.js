"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[8927],{3905:(e,n,t)=>{t.d(n,{Zo:()=>m,kt:()=>c});var a=t(7294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,l=function(e,n){if(null==e)return{};var t,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var p=a.createContext({}),s=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},m=function(e){var n=s(e.components);return a.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,r=e.originalType,p=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),d=s(t),c=l,k=d["".concat(p,".").concat(c)]||d[c]||u[c]||r;return t?a.createElement(k,o(o({ref:n},m),{},{components:t})):a.createElement(k,o({ref:n},m))}));function c(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var r=t.length,o=new Array(r);o[0]=d;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i.mdxType="string"==typeof e?e:l,o[1]=i;for(var s=2;s<r;s++)o[s]=t[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},3326:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>s});var a=t(7462),l=(t(7294),t(3905));const r={},o="\u6027\u80fd\u76d1\u6d4b\u5de5\u5177",i={unversionedId:"other/analyze",id:"other/analyze",title:"\u6027\u80fd\u76d1\u6d4b\u5de5\u5177",description:"\u5168\u8fde\u8def\u8ffd\u8e2a",source:"@site/docs/other/analyze.md",sourceDirName:"other",slug:"/other/analyze",permalink:"/docs/other/analyze",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u8f6f\u4ef6\u67b6\u6784",permalink:"/docs/magic/software_arch"},next:{title:"\u6811",permalink:"/docs/other/datastructure"}},p={},s=[{value:"\u5168\u8fde\u8def\u8ffd\u8e2a",id:"\u5168\u8fde\u8def\u8ffd\u8e2a",level:2},{value:"skywalking",id:"skywalking",level:3},{value:"springboot \u914d\u7f6e",id:"springboot-\u914d\u7f6e",level:4},{value:"Dockerfile \u914d\u7f6e",id:"dockerfile-\u914d\u7f6e",level:4},{value:"docker-compose.yml",id:"docker-composeyml",level:4},{value:"\u53c2\u8003",id:"\u53c2\u8003",level:4},{value:"\u706b\u7130\u56fe",id:"\u706b\u7130\u56fe",level:2},{value:"\u706b\u7130\u56fe\u7b80\u660e\u6559\u7a0b",id:"\u706b\u7130\u56fe\u7b80\u660e\u6559\u7a0b",level:3},{value:"arthas",id:"arthas",level:4},{value:"\u57fa\u672c\u4f7f\u7528",id:"\u57fa\u672c\u4f7f\u7528",level:4},{value:"1. \u5b89\u88c5\u542f\u52a8",id:"1-\u5b89\u88c5\u542f\u52a8",level:5},{value:"2. \u5f00\u59cb\u91c7\u96c6",id:"2-\u5f00\u59cb\u91c7\u96c6",level:5},{value:"2.1 \u57fa\u4e8e CPU \u4f7f\u7528\u7387\u91c7\u6837 (\u9002\u7528\u4e8e CPU \u5bc6\u96c6\u578b)",id:"21-\u57fa\u4e8e-cpu-\u4f7f\u7528\u7387\u91c7\u6837-\u9002\u7528\u4e8e-cpu-\u5bc6\u96c6\u578b",level:6},{value:"2.2 \u57fa\u4e8e\u6837\u672c\u91c7\u6837\uff0c\u53ef\u4f30\u7b97\u8017\u65f6 (\u9002\u7528\u4e8e IO \u5bc6\u96c6\u578b)",id:"22-\u57fa\u4e8e\u6837\u672c\u91c7\u6837\u53ef\u4f30\u7b97\u8017\u65f6-\u9002\u7528\u4e8e-io-\u5bc6\u96c6\u578b",level:6},{value:"3. \u67e5\u770b\u72b6\u6001",id:"3-\u67e5\u770b\u72b6\u6001",level:5},{value:"4. \u751f\u6210\u7ed3\u679c",id:"4-\u751f\u6210\u7ed3\u679c",level:5},{value:"5. demo",id:"5-demo",level:5},{value:"prometheus",id:"prometheus",level:2},{value:"PromQL",id:"promql",level:3},{value:"\u914d\u7f6e\u6587\u4ef6",id:"\u914d\u7f6e\u6587\u4ef6",level:3},{value:"\u76d1\u6d4b springboot",id:"\u76d1\u6d4b-springboot",level:3},{value:"jmeter",id:"jmeter",level:2},{value:"\u8fd0\u884c\u6d4b\u8bd5",id:"\u8fd0\u884c\u6d4b\u8bd5",level:3},{value:"\u53c2\u6570",id:"\u53c2\u6570",level:3},{value:"\u63d2\u4ef6",id:"\u63d2\u4ef6",level:3},{value:"\u5bfc\u5165 influxdb2.0",id:"\u5bfc\u5165-influxdb20",level:3},{value:"gafana",id:"gafana",level:2},{value:"\u8fde\u63a5 prometheus",id:"\u8fde\u63a5-prometheus",level:3},{value:"\u8fde\u63a5 influxdb",id:"\u8fde\u63a5-influxdb",level:3},{value:"\u53c2\u8003",id:"\u53c2\u8003-1",level:3}],m={toc:s};function u(e){let{components:n,...t}=e;return(0,l.kt)("wrapper",(0,a.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"\u6027\u80fd\u76d1\u6d4b\u5de5\u5177"},"\u6027\u80fd\u76d1\u6d4b\u5de5\u5177"),(0,l.kt)("h2",{id:"\u5168\u8fde\u8def\u8ffd\u8e2a"},"\u5168\u8fde\u8def\u8ffd\u8e2a"),(0,l.kt)("h3",{id:"skywalking"},"skywalking"),(0,l.kt)("p",null,"\u8fd9\u91cc\u4f7f\u7528\u63a2\u9488\u5b9e\u73b0\u4fe1\u606f\u6536\u96c6\uff0c\u4f7f\u7528\u9ed8\u8ba4\u7684 H2 \u5b58\u50a8"),(0,l.kt)("h4",{id:"springboot-\u914d\u7f6e"},"springboot \u914d\u7f6e"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml"},"server:\n  port: 8848\nspring:\n  datasource:\n    url: jdbc:mysql://mysql:3306/dev?serverTimezone=UTC&useSSL=false&autoReconnect=true&tinyInt1isBit=false&useUnicode=true&characterEncoding=utf8&allowPublicKeyRetrieval=true\n    username: admin\n    password: admin\n  jpa:\n    properties:\n      hibernate:\n        format_sql: true\n        hbm2ddl:\n          auto: update\n  redis:\n    host: redis\n    port: 6379\n    pool:\n      max-active: 8\n      max-wait: -1\n      max-idle: 4\n      min-idle: 1\n")),(0,l.kt)("h4",{id:"dockerfile-\u914d\u7f6e"},"Dockerfile \u914d\u7f6e"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"ADD /target/decsion-engine-0.1.5.jar app.jar")),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"\u62f7\u8d1d\u9879\u76ee\u6253\u5305\u597d\u7684 jar \u5305"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"ADD ./agent agent")),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"\u6ce8\u610f\uff1aagent \u9700\u8981\u548c jar \u5305\u653e\u4e00\u8d77\uff0c\u4e0d\u4ec5\u4ec5\u662f skywalking-agent.jar\uff0c"),(0,l.kt)("li",{parentName:"ul"},"config \u4e0b\u662f skywalking \u7684\u9ed8\u8ba4\u914d\u7f6e\u6587\u4ef6\uff0c\u5176\u4e2d\u7684\u53c2\u6570\u53ef\u4ee5\u88ab java \u4f20\u9012\u7684\u53c2\u6570\u8986\u76d6"),(0,l.kt)("li",{parentName:"ul"},"log \u4e0b\u5b58\u50a8\u4e86\u65e5\u5fd7\uff0c\u4e00\u822c\u76d1\u6d4b\u4fe1\u606f\u6ca1\u6709\u53ef\u4ee5\u5c1d\u8bd5\u67e5\u770b\u8be5\u6587\u4ef6\u5939"),(0,l.kt)("li",{parentName:"ul"},"plugin \u4e0b\u5b58\u50a8\u4e86\u5bf9\u4e0d\u540c\u8fdb\u7a0b\u7684\u4fe1\u606f\u91c7\u96c6\u5de5\u5177\uff0c\u5fc5\u987b\u4f9d\u8d56\u4ed6\u4eec\u624d\u80fd\u6b63\u5e38\u76d1\u6d4b"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"java xxx")),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"xxx \u6307\u670d\u52a1\u7684\u540d\u5b57\uff0c\u968f\u610f"),(0,l.kt)("li",{parentName:"ul"},"backend_service \u6307\u7684\u662f skywalking \u7684\u94fe\u63a5",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"\u53ef\u4ee5\u662f docker-compose \u5b9a\u4e49\u7684 (oap:port1)"),(0,l.kt)("li",{parentName:"ul"},"\u4e5f\u53ef\u4ee5\u662f\u5bbf\u4e3b\u673a\u7684 ip \u7aef\u53e3 (192.168.xxx:port2)"))))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u5b8c\u6574"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml"},'FROM adoptopenjdk/openjdk8\nVOLUME ["/tmp", "/logs"]\nEXPOSE 8848\nADD /target/decsion-engine-0.1.5.jar app.jar\nADD ./agent agent\n# ADD ./skywalking-agent.jar skywalking-agent.jar # \u8fd9\u4e2a\u4e0d\u5bf9\n\nCMD java -javaagent:agent/skywalking-agent.jar -Dskywalking.agent.service_name=xxx -Dskywalking.collector.backend_service=192.168.31.226:11800 -jar app.jar\n\n# \u4e0b\u9762\u7684\u4e00\u6837\uff0c\u4e0d\u5f71\u54cd\uff0c\u5982\u679c\u6ca1\u6210\u529f\uff0c\u4e00\u5b9a\u662f\u522b\u7684\u5730\u65b9\u5199\u9519\u4e86\ud83d\ude05\n# ENTRYPOINT ["java", "-javaagent:agent/skywalking-agent.jar", "-Dskywalking.agent.service_name=xxx", "-Dskywalking.collector.backend_service=192.168.31.226:11800", "-jar", "app.jar"]\n')),(0,l.kt)("h4",{id:"docker-composeyml"},"docker-compose.yml"),(0,l.kt)("p",null,"\u9700\u8981\u6ce8\u610f\u7684\u70b9"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u670d\u52a1\u7684\u5148\u540e\u987a\u5e8f",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"\u901a\u8fc7\u8bbe\u7f6e restart \u4e0d\u65ad\u91cd\u8bd5\uff0c\u76f4\u5230\u4f9d\u8d56\u7684\u670d\u52a1\u542f\u52a8\u5b8c\u6210"))),(0,l.kt)("li",{parentName:"ul"},"ip(host), \u7aef\u53e3\u53f7 (port)",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"\u5bb9\u5668\u4e4b\u95f4\u901a\u8fc7\u53ef\u4ee5\u76f4\u63a5\u7528",(0,l.kt)("inlineCode",{parentName:"li"},"${container_name}:${container_port}"),"\u4e92\u76f8\u8bbf\u95ee\uff1a",(0,l.kt)("inlineCode",{parentName:"li"},"mysql:3306")),(0,l.kt)("li",{parentName:"ul"},"\u4e5f\u53ef\u4ee5\u76f4\u63a5\u7528",(0,l.kt)("inlineCode",{parentName:"li"},"${host_ip}:${host_port}"),"\u4e92\u76f8\u8bbf\u95ee\uff1a",(0,l.kt)("inlineCode",{parentName:"li"},"192.168.31.226:4205"))))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml"},'services:\n  web:\n#    image: "trdthg/decision-engine:latest"\n    build: .\n    ports:\n      - "8848:8848"\n    depends_on:\n      - mysql\n      - redis\n      - oap\n      - skywaling-ui\n    restart: always\n  mysql:\n    image: mysql:latest\n    environment:\n      MYSQL_DATABASE: dev\n      MYSQL_USER: admin\n      MYSQL_PASSWORD: admin\n      MYSQL_ROOT_PASSWORD: 2022A22db\n    ports:\n      - "4205:3306"\n    logging:\n      driver: "none"\n    restart: always\n\n  redis:\n    image: "redis:alpine"\n    ports:\n      - "5470:6379"\n    logging:\n      driver: "none"\n  oap:\n    image: apache/skywalking-oap-server:8.4.0-es6\n    container_name: oap\n    restart: always\n    ports:\n      - 11800:11800 # agent \u4e0a\u62a5\u6570\u636e\u7684\u7aef\u53e3\uff0c\u8fd9\u662f gRPC \u7aef\u53e3\n      - 12800:12800 # ui \u8bfb\u53d6\u6570\u636e\u7684\u7aef\u53e3\uff0c\u8fd9\u662f http \u7aef\u53e3\n    # logging:\n    #   driver: "none"\n  skywaling-ui:\n    image: apache/skywalking-ui:8.4.0\n    container_name: ui\n    depends_on:\n      - oap\n    links:\n      - oap\n    ports:\n      - 8088:8080\n    environment:\n      - SW_OAP_ADDRESS=http://oap:12800\n    logging:\n      driver: "none"\n')),(0,l.kt)("h4",{id:"\u53c2\u8003"},"\u53c2\u8003"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://segmentfault.com/a/1190000039836624"},"\u4f7f\u7528 docker \u90e8\u7f72 spring boot \u5e76\u63a5\u5165 skywalking"))),(0,l.kt)("h2",{id:"\u706b\u7130\u56fe"},"\u706b\u7130\u56fe"),(0,l.kt)("h3",{id:"\u706b\u7130\u56fe\u7b80\u660e\u6559\u7a0b"},"\u706b\u7130\u56fe\u7b80\u660e\u6559\u7a0b"),(0,l.kt)("h4",{id:"arthas"},"arthas"),(0,l.kt)("p",null,"arthas \u662f Alibaba \u5f00\u6e90\u7684 Java\n\u8bca\u65ad\u5de5\u5177\uff0c\u5176\u4e2d\u6574\u5408\u4e86\u5f88\u591a\u5b9e\u7528\u7684\u5de5\u5177\uff0c\u4f8b\u5982\u67e5\u770b\u5f53\u524d JVM \u7684\u7ebf\u7a0b\u5806\u6808\u4fe1\u606f\u3001\u67e5\u770b\u548c\u4fee\u6539 JVM \u7684\u7cfb\u7edf\u5c5e\u6027\u3001\u65b9\u6cd5\u6267\u884c\u6570\u636e\u89c2\u6d4b\u3001\u751f\u6210\u706b\u7130\u56fe\u7b49\u3002\u6700\u5927\u7684\u4f18\u70b9\u662f\u5bf9\u76d1\u63a7\u5e94\u7528\u65e0\u4ee3\u7801\u4fb5\u5165\uff0c\u4e5f\u4e0d\u9700\u8981\u91cd\u542f\u76d1\u63a7\u5e94\u7528\u6216\u8005\u6dfb\u52a0\u542f\u52a8\u53c2\u6570\u5c31\u53ef\u4ee5\u968f\u610f attach \u5230\u76ee\u6807 JVM \u8fdb\u7a0b\u7136\u540e\u8fdb\u884c\u5404\u79cd\u64cd\u4f5c\u3002\n\u6b64\u5904\u91cd\u70b9\u63d0\u5230\u7684\u662f arthas \u4e2d\u7684 profiler \u529f\u80fd\uff0c\u5b9e\u9645\u4e0a\u662f\u5bf9 async-profiler \u7684\u5c01\u88c5\uff0c\u53ef\u4ee5\u5bf9 JVM \u5e94\u7528\u8fdb\u884c\u91c7\u6837\u540e\u8f93\u51fa\u5404\u79cd\u7c7b\u578b\u7684\u706b\u7130\u56fe\u3002"),(0,l.kt)("h4",{id:"\u57fa\u672c\u4f7f\u7528"},"\u57fa\u672c\u4f7f\u7528"),(0,l.kt)("h5",{id:"1-\u5b89\u88c5\u542f\u52a8"},"1. \u5b89\u88c5\u542f\u52a8"),(0,l.kt)("p",null,"\u542f\u52a8 profiler \u91c7\u6837\u540e\uff0c\u9700\u8981\u9009\u62e9\u5bf9\u5e94\u7684\u8fdb\u7a0b"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"wget https://alibaba.github.io/arthas/arthas-boot.jar\njava -jar arthas-boot.jar\n")),(0,l.kt)("h5",{id:"2-\u5f00\u59cb\u91c7\u96c6"},"2. \u5f00\u59cb\u91c7\u96c6"),(0,l.kt)("h6",{id:"21-\u57fa\u4e8e-cpu-\u4f7f\u7528\u7387\u91c7\u6837-\u9002\u7528\u4e8e-cpu-\u5bc6\u96c6\u578b"},"2.1 \u57fa\u4e8e CPU \u4f7f\u7528\u7387\u91c7\u6837 (\u9002\u7528\u4e8e CPU \u5bc6\u96c6\u578b)"),(0,l.kt)("p",null,"async-profiler \u652f\u6301\u5bf9\u591a\u79cd\u4e8b\u4ef6\u505a\u91c7\u6837\u5206\u6790\uff0c\u4f8b\u5982 cpu\u3001alloc\u3001lock\u3001cache-misses \u7b49\uff0c\u5e38\u7528\u7684\u91c7\u6837\u4e8b\u4ef6\u4e3a cpu \u548c wall\u3002\u5176\u4e2d\u706b\u7130\u56fe\u91c7\u6837\u672a\u6307\u5b9a\u4e8b\u4ef6\u65f6\u9ed8\u8ba4\u5bf9 cpu \u4e8b\u4ef6\u8fdb\u884c\u91c7\u6837\uff0c\u5373 On-CPU \u706b\u7130\u56fe\uff0c\u4ec5\u5305\u542b JVM \u5728 CPU \u6267\u884c\u65f6\u7684\u91c7\u6837\uff0c\u800c\u4e0d\u5305\u542b CPU \u7b49\u5f85\u65f6\u7684\u91c7\u6837\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-hell"},"$ profiler start\nStarted [cpu] profiling\n")),(0,l.kt)("h6",{id:"22-\u57fa\u4e8e\u6837\u672c\u91c7\u6837\u53ef\u4f30\u7b97\u8017\u65f6-\u9002\u7528\u4e8e-io-\u5bc6\u96c6\u578b"},"2.2 \u57fa\u4e8e\u6837\u672c\u91c7\u6837\uff0c\u53ef\u4f30\u7b97\u8017\u65f6 (\u9002\u7528\u4e8e IO \u5bc6\u96c6\u578b)"),(0,l.kt)("p",null,"\u5982\u679c\u9700\u8981\u5206\u6790 IO \u5bc6\u96c6\u578b\u5e94\u7528\uff0c\u6bd4\u8f83\u9002\u5408\u5bf9 wall \u4e8b\u4ef6\u8fdb\u884c\u91c7\u6837\uff0c\u5982\u4e0b\u5b98\u65b9\u63cf\u8ff0\uff0cwall \u4e8b\u4ef6\u4f1a\u5bf9\u6240\u6709\u4efb\u610f\u72b6\u6001\u7684\u7ebf\u7a0b\u8fdb\u884c\u91c7\u6837\uff0c\u65e2\u5305\u542b CPU \u6267\u884c\u65f6\u7684\u91c7\u6837\uff0c\u4e5f\u5305\u542b\u4e86 CPU \u7b49\u5f85\u65f6\u7684\u91c7\u6837\uff0c\u53ef\u4ee5\u7528\u6765\u66f4\u663e\u8457\u5730\u5206\u6790\u7ebf\u7a0b\u5728\u5404\u4e2a\u65b9\u6cd5\u4e0a\u7684\u8017\u65f6\u5206\u5e03\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"$ profiler start -e wall\nStarted [wall] profiling\n")),(0,l.kt)("h5",{id:"3-\u67e5\u770b\u72b6\u6001"},"3. \u67e5\u770b\u72b6\u6001"),(0,l.kt)("p",null,"\u83b7\u53d6\u5df2\u91c7\u96c6\u7684 sample \u7684\u6570\u91cf"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"$ profiler getSamples\n")),(0,l.kt)("p",null,"\u67e5\u770b profiler \u72b6\u6001"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"$ profiler status\n[cpu] profiling is running for 4 seconds\n")),(0,l.kt)("h5",{id:"4-\u751f\u6210\u7ed3\u679c"},"4. \u751f\u6210\u7ed3\u679c"),(0,l.kt)("p",null,"\u751f\u6210 svg \u683c\u5f0f\u7ed3\u679c"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"$ profiler stop --file xxx.svg --format svg\nprofiler output file: /tmp/demo/arthas-output/20191125-135546.svg\nOK\n")),(0,l.kt)("h5",{id:"5-demo"},"5. demo"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-java"},'@RestController\n@RequestMapping\npublic class IndexController {@GetMapping("/")\n    public String index() throws InterruptedException {\n        long start = System.currentTimeMillis();\n        cpuHandler();\n        long time1 = System.currentTimeMillis();\n        timeHandler();\n        long time2 = System.currentTimeMillis();\n        normalHandler();\n        long time3 = System.currentTimeMillis();\n\n        return String.format("%d %d %d", time1 - start, time2 - time1, time3 - time2);\n    }\n\n    private int cpuHandler() {\n        int value = 0;\n        int max = (int)(Math.random() * 100_000_000);\n        for (int i = 0; i < max; i++) {\n            value += i;\n        }\n        return value;\n    }\n\n    private void timeHandler() throws InterruptedException {\n        Thread.sleep(10);\n    }\n\n    private void normalHandler() {\n        Random random = new Random();\n        random.nextInt(100);\n    }\n\n}\n')),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"cpu \u4e8b\u4ef6\u91c7\u6837"),(0,l.kt)("p",{parentName:"li"},"\u7531\u56fe\u53ef\u4ee5\u660e\u7ec6\u7684\u770b\u51fa\u6765\uff0cindex \u65b9\u6cd5\u4e2d cpuHandler \u4e8b\u4ef6\u91c7\u6837\u5360\u6bd4\u6700\u9ad8\uff0c\u5373 On-CPU \u4e2d cpuHandler \u65b9\u6cd5\u5360\u7528\u7684 CPU \u6700\u9ad8\u3002\u5982\u679c\u56e0\u4e3a\u5e94\u7528\u5360\u7528 CPU \u6d88\u8017\u9ad8\uff0c\u9700\u8981\u8fdb\u884c\u4f18\u5316\uff0c\u90a3\u4e48\u901a\u8fc7\u8be5\u706b\u7130\u56fe\u5f88\u5bb9\u6613\u5206\u6790\u51fa\u6765\u9700\u8981\u5bf9 cpuHandler \u65b9\u6cd5\u4f18\u5316\u6765\u964d\u4f4e CPU \u6d88\u8017\u3002")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"wall \u4e8b\u4ef6\u91c7\u6837"),(0,l.kt)("p",{parentName:"li"},"\u7531\u56fe\u53ef\u4ee5\u660e\u7ec6\u7684\u770b\u51fa\u6765\uff0cindex \u65b9\u6cd5\u4e2d timeHandler \u4e8b\u4ef6\u91c7\u6837\u5360\u6bd4\u6700\u9ad8\uff0c\u5373 timeHandler \u65b9\u6cd5\u5360\u7528\u7ebf\u7a0b\u8017\u65f6\u65f6\u95f4\u6700\u9ad8\u3002\u5982\u679c\u56e0\u4e3a index \u65b9\u6cd5\u8017\u65f6\u8f83\u957f\uff0c\u9700\u8981\u8fdb\u884c\u4f18\u5316\uff0c\u90a3\u4e48\u901a\u8fc7\u8be5\u706b\u7130\u56fe\u5f88\u5bb9\u6613\u5206\u6790\u51fa\u6765\u9700\u8981\u5bf9 timeHandler \u65b9\u6cd5\u4f18\u5316\u6765\u964d\u4f4e\u7ebf\u7a0b\u8017\u65f6\u65f6\u95f4"))),(0,l.kt)("p",null,'\u76f4\u63a5\u89c2\u5bdf"\u5e73\u9876"\uff08plateaus\uff09\u5f80\u5f80\u4e0d\u80fd\u5feb\u901f\u5b9a\u4f4d\u6027\u80fd\u95ee\u9898\uff0c\u56e0\u4e3a\u9876\u90e8\u8bb0\u5f55\u7684\u591a\u534a\u662f\u5bf9\u5e95\u5c42\u5e93\u51fd\u6570\u7684\u8c03\u7528\u60c5\u51b5\u3002\u6211\u8ba4\u4e3a\uff0c\u8981\u5feb\u901f\u5b9a\u4f4d\u6027\u80fd\u95ee\u9898\uff0c\u9996\u5148\u5e94\u8be5\u89c2\u5bdf\u7684\u662f\u4e1a\u52a1\u51fd\u6570\u5728\u706b\u7130\u56fe\u4e2d\u7684\u5bbd\u5ea6\uff0c\u7136\u540e\u5728\u5f80\u9876\u90e8\u627e\u5230\u7b2c\u4e00\u4e2a\u5e93\u51fd\u6570\u6765\u7f29\u5c0f\u8303\u56f4\uff0c\u800c\u4e0d\u662f\u76f4\u63a5\u5c31\u770b\u5e73\u9876\u3002'),(0,l.kt)("h2",{id:"prometheus"},"prometheus"),(0,l.kt)("p",null,"\u88ab\u76d1\u63a7\u7684\u8fdb\u7a0b\u9700\u8981\u5411",(0,l.kt)("inlineCode",{parentName:"p"},"prometheus"),"\u53d1\u9001\u56fa\u5b9a\u683c\u5f0f\u7684\u4fe1\u606f\uff0c\u56e0\u4e3a\u683c\u5f0f\u56fa\u5b9a\uff0c\u53ef\u4ee5\u6839\u636e",(0,l.kt)("inlineCode",{parentName:"p"},"prometheus"),"\u7684\u67e5\u8be2\u8bed\u53e5\u53bb\u7b5b\u9009\u6570\u636e\uff0c\u5e76\u5bfc\u51fa\u56fe\u6807"),(0,l.kt)("h3",{id:"promql"},"PromQL"),(0,l.kt)("p",null,"\u4e00\u6761\u5b8c\u6574\u7684\u67e5\u8be2\u8bed\u53e5\u4e3b\u8981\u6709"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5339\u914d\u6570\u636e\u6e90"),(0,l.kt)("li",{parentName:"ul"},"\u8fd0\u7b97"),(0,l.kt)("li",{parentName:"ul"},"\u51fd\u6570 \u8fd9\u4e09\u90e8\u5206\u7ec4\u6210")),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u67e5\u8be2\u5185\u5b58\u5360\u7528")),(0,l.kt)("p",null,"\u6570\u636e\u6e90\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"# HELP node_memory_MemFree_bytes Memory information field MemFree_bytes.\n# TYPE node_memory_MemFree_bytes gauge\nnode_memory_MemFree_bytes 4.85957632e+08\n# HELP node_memory_MemTotal_bytes Memory information field MemTotal_bytes.\n# TYPE node_memory_MemTotal_bytes gauge\nnode_memory_MemTotal_bytes 1.6170528768e+10\n")),(0,l.kt)("p",null,"\u8ba1\u7b97\uff1a(\u603b\u5185\u5b58 - \u7a7a\u95f2\u5185\u5b58) / \u603b\u5185\u5b58 * 100"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},'(\n  (\n    node_memory_MemTotal_bytes{instance="$node",job="$job"}\n    - node_memory_MemFree_bytes{instance="$node",job="$job"}\n  ) / (node_memory_MemTotal_bytes{instance="$node",job="$job"} )) * 100\n')),(0,l.kt)("ol",{start:2},(0,l.kt)("li",{parentName:"ol"},"\u67e5\u8be2 cpu \u603b\u5360\u7528")),(0,l.kt)("p",null,"\u5404\u4e2a\u5185\u6838\u7684\u6570\u636e"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},'# HELP node_cpu_seconds_total Seconds the CPUs spent in each mode.\n# TYPE node_cpu_seconds_total counter\nnode_cpu_seconds_total{cpu="0",mode="idle"} 134248.98\nnode_cpu_seconds_total{cpu="0",mode="iowait"} 94.73\nnode_cpu_seconds_total{cpu="0",mode="irq"} 0\nnode_cpu_seconds_total{cpu="0",mode="nice"} 2.6\nnode_cpu_seconds_total{cpu="0",mode="softirq"} 4554.64\nnode_cpu_seconds_total{cpu="0",mode="steal"} 0\nnode_cpu_seconds_total{cpu="0",mode="system"} 3190.14\nnode_cpu_seconds_total{cpu="0",mode="user"} 6843.42\n\nnode_cpu_seconds_total{cpu="1",mode="idle"} 12962.19\nnode_cpu_seconds_total{cpu="1",mode="iowait"} 12.3\nnode_cpu_seconds_total{cpu="1",mode="irq"} 0\nnode_cpu_seconds_total{cpu="1",mode="nice"} 2.05\nnode_cpu_seconds_total{cpu="1",mode="softirq"} 464.51\nnode_cpu_seconds_total{cpu="1",mode="steal"} 0\nnode_cpu_seconds_total{cpu="1",mode="system"} 2174.27\nnode_cpu_seconds_total{cpu="1",mode="user"} 5931.27\n\nnode_cpu_seconds_total{cpu="10",mode="idle"} 12798.81\nnode_cpu_seconds_total{cpu="10",mode="iowait"} 16.9\nnode_cpu_seconds_total{cpu="10",mode="irq"} 0\nnode_cpu_seconds_total{cpu="10",mode="nice"} 2.27\nnode_cpu_seconds_total{cpu="10",mode="softirq"} 39.99\nnode_cpu_seconds_total{cpu="10",mode="steal"} 0\nnode_cpu_seconds_total{cpu="10",mode="system"} 2554.07\n\n100 - (\n  # \u53d6\u5e73\u5747\u503c\n  avg(\n    # rate \u51fd\u6570\u80fd\u591f\u6c42 counter \u7c7b\u578b\u6570\u636e\u7684\u589e\u957f\u7387\uff0c\u7c7b\u4f3c\u4e8e\u52a0\u901f\u5ea6\uff0c\u80fd\u591f\u53cd\u6620\u53d8\u5316\u7684\u5267\u70c8\u7a0b\u5ea6\n    rate(\n      # \u53ea\u5339\u914d mode \u4e3a idle \u7684\u884c\uff0c\n      node_cpu_seconds_total{instance=~"$node",mode="idle"}[$interval])\n  ) * 100\n)\n')),(0,l.kt)("h3",{id:"\u914d\u7f6e\u6587\u4ef6"},"\u914d\u7f6e\u6587\u4ef6"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml"},"global:\n  scrape_interval: 15s # \u5168\u5c40\u9ed8\u8ba4\u5237\u65b0\u65f6\u95f4\n  external_labels:\n    monitor: 'codelab-monitor'\n\nscrape_configs:\n  - job_name: 'service1' # \u4e00\u4e2a job \u53ef\u4ee5\u76d1\u63a7\u591a\u4e2a\u5b9e\u4f8b\uff0c\u5b9e\u4f8b\u53ef\u4ee5\u5206\u7ec4\n    scrape_interval: 5s\n    static_configs:\n      # - targets: ['localhost:8080', 'localhost:8081']\n      #   labels:\n      #     group: 'production'\n\n      - targets: [\"service1:9100\"]\n        labels:\n          group: 'node'\n\n  - job_name: 'jmeter' # jmeter \u8fd0\u884c\u8fc7\u7a0b\u4e2d\u4f1a\u5728 9270 \u7aef\u53e3\uff0c\u53ef\u4ee5\u76d1\u63a7\n    scrape_interval: 5s\n    static_configs:\n      - targets: [\"jmeter:9270\"]\n        labels:\n          group: 'jmeter'\n")),(0,l.kt)("h3",{id:"\u76d1\u6d4b-springboot"},"\u76d1\u6d4b springboot"),(0,l.kt)("h2",{id:"jmeter"},"jmeter"),(0,l.kt)("h3",{id:"\u8fd0\u884c\u6d4b\u8bd5"},"\u8fd0\u884c\u6d4b\u8bd5"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},'JVM_ARGS="-Xms1g -Xmx1g" jmeter.sh -n -t benchmark.jmx\n')),(0,l.kt)("h3",{id:"\u53c2\u6570"},"\u53c2\u6570"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"-n \u547d\u4ee4\u884c\u6a21\u5f0f\n\n-t \u6307\u5b9a jmx \u811a\u672c\u5730\u5740\uff08\u5730\u5740\u53ef\u4ee5\u662f\u76f8\u5bf9\u8def\u5f84\uff0c\u53ef\u4ee5\u662f\u7edd\u5bf9\u8def\u5f84\uff09\n\n-h \u67e5\u770b\u5e2e\u52a9\n-v \u67e5\u770b\u7248\u672c\n-p \u6307\u5b9a\u8bfb\u53d6 jmeter \u5c5e\u6027\u6587\u4ef6\uff0c\u6bd4\u5982 jmeter.properties \u6587\u4ef6\u4e2d\u8bbe\u7f6e\u7684\n-l \u8bb0\u5f55\u6d4b\u8bd5\u7ed3\u679c\u7684\u6587\u4ef6\uff0c\u901a\u5e38\u7ed3\u679c\u6587\u4ef6\u4e3a jtl \u683c\u5f0f\uff08\u6587\u4ef6\u53ef\u4ee5\u662f\u76f8\u5bf9\u8def\u5f84\uff0c\u53ef\u4ee5\u662f\u7edd\u5bf9\u8def\u5f84\uff09\n-s \u4ee5\u670d\u52a1\u5668\u65b9\u5f0f\u8fd0\u884c\uff08\u4e5f\u662f\u8fdc\u7a0b\u65b9\u5f0f\uff0c\u542f\u52a8 Agent\uff09\n-H \u8bbe\u7f6e\u4ee3\u7406\uff0c\u4e00\u822c\u586b\u5199\u4ee3\u7406 IP\n-P \u8bbe\u7f6e\u4ee3\u7406\u7aef\u53e3\n-u \u4ee3\u7406\u8d26\u53f7\n-a \u4ee3\u7406\u53e3\u4ee4\n-J \u5b9a\u4e49 jmeter \u5c5e\u6027\uff0c\u7b49\u540c\u4e8e\u5728 jmeter.properties \u4e2d\u8fdb\u884c\u8bbe\u7f6e\n-G \u5b9a\u4e49 jmeter \u5168\u5c40\u5c5e\u6027\uff0c\u7b49\u540c\u4e8e\u5728 Global.properties \u4e2d\u8fdb\u884c\u8bbe\u7f6e\uff0c\u7ebf\u7a0b\u95f4\u53ef\u4ee5\u5171\u4eab\uff09\n-D \u5b9a\u4e49\u7cfb\u7edf\u5c5e\u6027\uff0c\u7b49\u540c\u4e8e\u5728 system.properties \u4e2d\u8fdb\u884c\u8bbe\u7f6e\n-S \u52a0\u8f7d\u7cfb\u7edf\u5c5e\u6027\u6587\u4ef6\uff0c\u53ef\u4ee5\u901a\u8fc7\u6b64\u53c2\u6570\u6307\u5b9a\u52a0\u8f7d\u4e00\u4e2a\u7cfb\u7edf\u5c5e\u6027\u6587\u4ef6\uff0c\u6b64\u6587\u4ef6\u53ef\u4ee5\u7528\u6237\u81ea\u5df1\u5b9a\u4e49\n-L \u5b9a\u4e49 jmeter \u65e5\u5fd7\u7ea7\u522b\uff0c\u5982 debug\u3001info\u3001error \u7b49\n-j \u5236\u5b9a\u6267\u884c\u65e5\u5fd7\u8def\u5f84\u3002\uff08\u53c2\u6570\u4e3a\u65e5\u5fd7\u8def\u5f84\uff0c\u4e0d\u5b58\u5728\u4e0d\u4f1a\u81ea\u52a8\u521b\u5efa\uff0c\u5c06\u65e5\u5fd7\u8f93\u51fa\u5230\u547d\u884c\u63a7\u5236\u53f0\uff09\n-r \u5f00\u542f\u8fdc\u7a0b\u8d1f\u8f7d\u673a\uff0c\u8fdc\u7a0b\u673a\u5668\u5217\u8868\u5728 jmeter.properties \u4e2d\u6307\u5b9a\n-R \u5f00\u542f\u8fdc\u7a0b\u8d1f\u8f7d\u673a\uff0c\u53ef\u4ee5\u6307\u5b9a\u8d1f\u8f7d\u673a IP\uff0c\u4f1a\u8986\u76d6 jmeter.properties \u4e2d remote_hosts \u7684\u8bbe\u7f6e\n-d \u6307\u5b9a Jmeter Home \u76ee\u5f55\n-X \u505c\u6b62\u8fdc\u7a0b\u6267\u884c\n-g \u6307\u5b9a\u6d4b\u8bd5\u7ed3\u679c\u6587\u4ef6\u8def\u5f84\uff0c\u4ec5\u7528\u4e8e\u751f\u6210\u6d4b\u8bd5\u62a5\u8868\uff0c\u53c2\u6570\u662f csv \u7ed3\u679c\u6587\u4ef6\n-e \u8bbe\u7f6e\u6d4b\u8bd5\u5b8c\u6210\u540e\u751f\u6210\u6d4b\u8bd5\u62a5\u8868\n-o \u6307\u5b9a\u6d4b\u8bd5\u62a5\u544a\u751f\u6210\u6587\u4ef6\u5939\uff08\u6587\u4ef6\u5939\u5fc5\u987b\u5b58\u5728\u4e14\u4e3a\u7a7a\u6587\u4ef6\u5939\uff09\n")),(0,l.kt)("h3",{id:"\u63d2\u4ef6"},"\u63d2\u4ef6"),(0,l.kt)("p",null,"\u4e0b\u8f7d\u540e\u653e\u5230",(0,l.kt)("inlineCode",{parentName:"p"},"lib/ext"),"\u76ee\u5f55\u4e0b\u5373\u53ef"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://github.com/johrstrom/jmeter-prometheus-plugin/releases"},"prometheus"))),(0,l.kt)("h3",{id:"\u5bfc\u5165-influxdb20"},"\u5bfc\u5165 influxdb2.0"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u914d\u7f6e influxdb")),(0,l.kt)("p",null,"\u65b0\u5efa\u8d26\u53f7\uff0c\u914d\u7f6e token"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203172000131.png",alt:null})),(0,l.kt)("ol",{start:2},(0,l.kt)("li",{parentName:"ol"},"\u914d\u7f6e jmeter")),(0,l.kt)("p",null,"\u5728\u7ebf\u7a0b\u7ec4\u5185\u6dfb\u52a0\u4e00\u4e2a\u540e\u7aef\u63a7\u5236\u5668"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203171959109.png",alt:null})),(0,l.kt)("ol",{start:3},(0,l.kt)("li",{parentName:"ol"},"\u5728 influxdb UI \u67e5\u770b\u7ed3\u679c")),(0,l.kt)("p",null,"\u53ef\u4ee5\u901a\u8fc7\u9014\u4e2d\u7684\u53ef\u89c6\u5316\u754c\u9762\u9009\u62e9\uff0c\u4e5f\u53ef\u4ee5\u8f6c\u6362\u4e3a Flux \u67e5\u8be2\u8bed\u53e5"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203171957424.png",alt:null})),(0,l.kt)("h2",{id:"gafana"},"gafana"),(0,l.kt)("h3",{id:"\u8fde\u63a5-prometheus"},"\u8fde\u63a5 prometheus"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u914d\u7f6e\u6570\u636e\u6e90"),(0,l.kt)("li",{parentName:"ol"},"\u6dfb\u52a0\u67e5\u8be2\u8bed\u53e5 (promQL)"),(0,l.kt)("li",{parentName:"ol"},"\u9009\u62e9\u5408\u9002\u7684\u56fe\u6807\u7c7b\u578b\uff0c\u5b9a\u5236\u4e00\u4e9b\u56fe\u6807\u7684\u6837\u5f0f\n",(0,l.kt)("img",{parentName:"li",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203172108901.png",alt:null}))),(0,l.kt)("h3",{id:"\u8fde\u63a5-influxdb"},"\u8fde\u63a5 influxdb"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u914d\u7f6e\u6570\u636e\u6e90 \u6ce8\u610f url\uff0c\u8fd9\u4e2a url \u9700\u8981\u662f docker \u7684\uff0c\u4e0d\u662f\u672c\u673a\u7684",(0,l.kt)("inlineCode",{parentName:"li"},"http://172.20.0.5:8086"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"docker container inspect f65 | grep -i ipaddress\n")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203172005301.png",alt:null})),(0,l.kt)("ol",{start:2},(0,l.kt)("li",{parentName:"ol"},"\u5bfc\u5165\u67e5\u8be2\u8bed\u53e5 (Flux)")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203172003871.png",alt:null})),(0,l.kt)("h3",{id:"\u53c2\u8003-1"},"\u53c2\u8003"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://docs.influxdata.com/influxdb/v2.1/tools/grafana/"},"Use Grafana with InfluxDB OSS")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://qainsights.com/jmeter-integration-with-influxdb-2-0/#Grafana_Integration"},"jmeter + influxdb + grafuna"))))}u.isMDXComponent=!0}}]);