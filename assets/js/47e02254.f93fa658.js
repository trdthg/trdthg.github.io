"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[3758],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>k});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var p=r.createContext({}),o=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=o(e.components);return r.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,a=e.originalType,p=e.parentName,m=u(e,["components","mdxType","originalType","parentName"]),s=o(n),k=l,g=s["".concat(p,".").concat(k)]||s[k]||c[k]||a;return n?r.createElement(g,i(i({ref:t},m),{},{components:n})):r.createElement(g,i({ref:t},m))}));function k(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=n.length,i=new Array(a);i[0]=s;var u={};for(var p in t)hasOwnProperty.call(t,p)&&(u[p]=t[p]);u.originalType=e,u.mdxType="string"==typeof e?e:l,i[1]=u;for(var o=2;o<a;o++)i[o]=n[o];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},5754:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>c,frontMatter:()=>a,metadata:()=>u,toc:()=>o});var r=n(7462),l=(n(7294),n(3905));const a={},i="\u5bf9\u91cd\u8bf7\u6c42 - \u5e94\u5bf9\u5c3e\u90e8\u5ef6\u8fdf",u={permalink:"/blog/tail_latency",source:"@site/blog/tail_latency.md",title:"\u5bf9\u91cd\u8bf7\u6c42 - \u5e94\u5bf9\u5c3e\u90e8\u5ef6\u8fdf",description:"Hedged requests \u2014 Tackling tail latency",date:"2022-10-21T05:38:46.000Z",formattedDate:"2022\u5e7410\u670821\u65e5",tags:[],readingTime:4.83,hasTruncateMarker:!1,authors:[],frontMatter:{},prevItem:{title:"\u67e5\u8be2\u5f15\u64ce\uff1a\u63a8\u9001\u4e0e\u62c9\u53d6",permalink:"/blog/search_engine"},nextItem:{title:"computer_network/class_1",permalink:"/blog/computer_network/class_1"}},p={authorsImageUrls:[]},o=[{value:"\u5ef6\u8fdf",id:"\u5ef6\u8fdf",level:2},{value:"\u767e\u5206\u6bd4",id:"\u767e\u5206\u6bd4",level:2},{value:"\u5c3e\u90e8\u5ef6\u8fdf",id:"\u5c3e\u90e8\u5ef6\u8fdf",level:2},{value:"\u5bf9\u51b2\u8bf7\u6c42",id:"\u5bf9\u51b2\u8bf7\u6c42",level:2},{value:"\u6a21\u62df\u5c3e\u90e8\u5ef6\u8fdf",id:"\u6a21\u62df\u5c3e\u90e8\u5ef6\u8fdf",level:2},{value:"\u5bf9\u91cd\u6d4b\u8bd5",id:"\u5bf9\u91cd\u6d4b\u8bd5",level:2},{value:"\u7ed3\u8bba",id:"\u7ed3\u8bba",level:2}],m={toc:o};function c(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://medium.com/swlh/hedged-requests-tackling-tail-latency-9cea0a05f577"},"Hedged requests \u2014 Tackling tail latency")),(0,l.kt)("p",null,"\u901a\u5e38\u51fa\u73b0\u5728\u51fa\u73b0\u5728\u5206\u5e03\u5f0f\u7cfb\u7edf\u4e2d\uff0c\u5b9e\u73b0\u5206\u5e03\u5f0f\u7cfb\u7edf\u6709\u5f88\u591a\u4f18\u7f3a\u70b9"),(0,l.kt)("p",null,"\u4f7f\u7528\u5206\u5e03\u5f0f\u7cfb\u7edf\u7684\u5e38\u89c1\u539f\u56e0\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u53ef\u7528\u6027"),(0,l.kt)("li",{parentName:"ul"},"\u53ef\u6269\u5c55\u6027"),(0,l.kt)("li",{parentName:"ul"},"\u5206\u533a\u5bb9\u9519"),(0,l.kt)("li",{parentName:"ul"},"\u72ec\u7acb\u90e8\u7f72"),(0,l.kt)("li",{parentName:"ul"},"\u4e3a\u4e0d\u540c\u76ee\u7684\u4f7f\u7528\u4e0d\u540c\u7684\u6280\u672f")),(0,l.kt)("p",null,"\u8fd9\u4e9b\u53ef\u80fd\u662f\u5206\u5e03\u5f0f\u7cfb\u7edf\u7684\u95ee\u9898\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u6210\u672c"),(0,l.kt)("li",{parentName:"ul"},"\u590d\u6742"),(0,l.kt)("li",{parentName:"ul"},"\u4e00\u81f4\u6027"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"\u5ef6\u8fdf"))),(0,l.kt)("p",null,"\u6211\u4eec\u5c06\u91cd\u70b9\u5173\u6ce8\u5ef6\u8fdf\uff0c\u66f4\u5177\u4f53\u5730\u8bf4\u662f\u5c3e\u90e8\u5ef6\u8fdf\u3002"),(0,l.kt)("h2",{id:"\u5ef6\u8fdf"},"\u5ef6\u8fdf"),(0,l.kt)("p",null,"\u5f53\u6211\u4eec\u4f7f\u7528\u5206\u5e03\u5f0f\u7cfb\u7edf\u65f6\uff0c\u5ef6\u8fdf\u4f1a\u4e0d\u53ef\u907f\u514d\u7684\u589e\u52a0\u3002\u5206\u5e03\u5f0f\u7cfb\u7edf\u4e2d\u7684\u6bcf\u4e00\u8df3\u90fd\u4e0d\u662f\u514d\u8d39\u7684\uff0c\u9664\u4e86\u7f51\u7edc\u5ef6\u8fdf\u8fd8\u6709\u5176\u4ed6\u6210\u672c\uff0c\u5982\u679c\u4f7f\u7528 HTTP\n\u901a\u4fe1\uff0c\u6211\u4eec\u8fd8\u8981\u5904\u7406\u6d88\u606f\u3001\u89e3\u6790\u6d88\u606f\u3001\u9a8c\u8bc1\u8eab\u4efd\u4ee4\u724c\u3001\u4ee5\u53ca\u6211\u4eec\u60f3\u8981\u6dfb\u52a0\u5230\u7ba1\u9053\u4e2d\u7684\u4efb\u4f55\u6570\u636e\u3002\u8fd9\u4e9b\u662f\u5728\u8bbe\u8ba1\u5206\u5e03\u5f0f\u7cfb\u7edf\u65f6\u9700\u8981\u8003\u8651\u7684\u95ee\u9898\u3002\u6211\u4eec\u5fc5\u987b\u8003\u8651\u662f\u5426\u6709\u5fc5\u8981\u5206\u53d1\u65b0\u7684\u7cfb\u7edf\u3002"),(0,l.kt)("p",null,"\u8981\u56de\u7b54\u8fd9\u4e2a\u95ee\u9898\uff0c\u6211\u4eec\u9700\u8981\u4e86\u89e3\u5982\u4f55\u6d4b\u91cf\u5ef6\u8fdf\u3002\u6700\u7b80\u5355\u7684\u7b54\u6848\u4e4b\u4e00\u662f\u4f7f\u7528\u767e\u5206\u6bd4\u3002"),(0,l.kt)("h2",{id:"\u767e\u5206\u6bd4"},"\u767e\u5206\u6bd4"),(0,l.kt)("p",null,"\u9996\u5148\u662f\u5b9a\u4e49\u6211\u4eec\u7684\u89c2\u5bdf\u7ec4\u3002\u5bf9\u4e8e\u5ef6\u8fdf\uff0c\u6700\u5e38\u89c1\u7684\u89c2\u5bdf\u7ec4\u662f\u7ed9\u5b9a\u8bf7\u6c42\u7c7b\u522b\u7684\u54cd\u5e94\u65f6\u95f4\u3002\u8ba1\u7b97\u7684\u65b9\u5f0f\u5982\u4e0b\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u83b7\u53d6\u8bf7\u6c42\u7684\u6240\u6709\u54cd\u5e94\u65f6\u95f4\u5e76\u6392\u5e8f\u3002"),(0,l.kt)("li",{parentName:"ol"},"\u53d6\u524d x% \u7684\u5143\u7d20\u3002"),(0,l.kt)("li",{parentName:"ol"},"\u83b7\u53d6\u96c6\u5408\u7684\u6700\u5927\uff08\u6700\u957f\uff09\u503c\u3002")),(0,l.kt)("p",null,"\u4ee5\u8bf7\u6c42 ",(0,l.kt)("inlineCode",{parentName:"p"},"/hello-world")," \u63a5\u53e3\u4e3a\u4f8b"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u83b7\u53d6\u8bf7\u6c42\u7684\u6240\u6709\u54cd\u5e94\u65f6\u95f4\u5e76\u6392\u5e8f\u3002",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"\u83b7\u53d6\u54cd\u5e94\u65f6\u95f4\uff1a23, 20, 21, 20, 23, 20, 45, 21, 25, 25"),(0,l.kt)("li",{parentName:"ul"},"\u6392\u5e8f\uff1a20, 20, 20, 21, 21, 23, 23, 25, 25, 45"))),(0,l.kt)("li",{parentName:"ol"},"\u53d6\u524d 50% \u5143\u7d20\uff1a 20, 20, 20, 21, 21"),(0,l.kt)("li",{parentName:"ol"},"\u5f97\u5230\u6700\u5927\u503c\uff1a21")),(0,l.kt)("p",null,"\u6240\u4ee5 P50 \u5c31\u662f 21 ms\uff0c\u5982\u679c\u53d6\u524d 90 % \u5143\u7d20\uff0cP90 \u5c31\u662f 25 ms"),(0,l.kt)("h2",{id:"\u5c3e\u90e8\u5ef6\u8fdf"},"\u5c3e\u90e8\u5ef6\u8fdf"),(0,l.kt)("p",null,"\u5c3e\u90e8\u5ef6\u8fdf\u662f\u767e\u5206\u4f4d\u8c31\u6700\u672b\u7aef\u7684\u5ef6\u8fdf\u3002\u4e00\u822c\u7cfb\u7edf\u5bf9 99% \u7684\u8bf7\u6c42\u7684\u54cd\u5e94\u90fd\u5f88\u5feb\uff0c\u4f46\u662f\u5bf9\u4e8e\u5269\u4e0b\u7684 1% \u53ef\u80fd\u975e\u5e38\u5dee\u3002\n",(0,l.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202204202210071.png",alt:null}),"\n\u5bf9\u4e8e\u4e00\u4e2a\u6bcf\u5206\u949f\u63a5\u53d7\u6570\u767e\u4e07\u8bf7\u6c42\u7684\u7cfb\u7edf\u6765\u8bf4\uff0c\u8fd9 1% \u5c31\u4e0d\u662f\u5fae\u4e0d\u8db3\u9053\u4e86"),(0,l.kt)("p",null,"2013 \u5e74 Google \u53d1\u8868\u7684\u8bba\u6587\u4ecb\u7ecd\u4e86\u4e00\u4e9b\u89e3\u51b3\u65b9\u6cd5"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Hedged requests"),(0,l.kt)("li",{parentName:"ul"},"Tied requests"),(0,l.kt)("li",{parentName:"ul"},"Micro partitions"),(0,l.kt)("li",{parentName:"ul"},"Selective replication"),(0,l.kt)("li",{parentName:"ul"},"Latency-induced probation"),(0,l.kt)("li",{parentName:"ul"},"Good enough responses"),(0,l.kt)("li",{parentName:"ul"},"Canary requests")),(0,l.kt)("p",null,"P99 = 140ms P95 = 70ms"),(0,l.kt)("p",null,"\u5269\u4e0b\u7684 5% \u8bf7\u6c42\u5360\u4e86\u603b\u8bf7\u6c42\u4e00\u534a\u7684\u5ef6\u8fdf"),(0,l.kt)("h2",{id:"\u5bf9\u51b2\u8bf7\u6c42"},"\u5bf9\u51b2\u8bf7\u6c42"),(0,l.kt)("p",null,"\u5982\u679c\u8bf7\u6c42\u7684\u65f6\u957f\u8d85\u8fc7 P95 \u8fd8\u6ca1\u6709\u7ed3\u679c\uff0c\u90a3\u4e48\u5c31\u91cd\u53d1"),(0,l.kt)("h2",{id:"\u6a21\u62df\u5c3e\u90e8\u5ef6\u8fdf"},"\u6a21\u62df\u5c3e\u90e8\u5ef6\u8fdf"),(0,l.kt)("p",null,"\u4e0b\u9762\u7684\u4ee3\u7801\u6a21\u62df\u4e86\u6709 %4 \u7684\u8bf7\u6c42\u4f1a\u7b49\u5f85 100ms"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-go"},'package main\n\nimport (\n    "math/rand"\n    "net/http"\n    "time"\n\n    "github.com/gorilla/mux"\n)\n\nfunc main() {\n    router := mux.NewRouter()\n\n    router.HandleFunc("/ishealthy", func(w http.ResponseWriter, r *http.Request) {\n        rd := rand.New(rand.NewSource(time.Now().UnixNano()))\n        requestPercentile := rd.Intn(100)\n        waitTime := 0\n\n        if requestPercentile > 96 {\n            waitTime = 100\n        }\n\n        time.Sleep(time.Duration(waitTime+15) * time.Millisecond)\n        w.WriteHeader(http.StatusOK)\n        w.Write([]byte("Healthy"))\n    }).Methods(http.MethodGet)\n    http.ListenAndServe(":8080", router)\n}\n')),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202204202241384.png",alt:null}),"\n\u4ece\u56fe\u4e2d\u53ef\u4ee5\u770b\u5230"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"p50 \u5c0f\u4e8e 20ms"),(0,l.kt)("li",{parentName:"ul"},"p95 20ms \u5de6\u53f3"),(0,l.kt)("li",{parentName:"ul"},"p99 \u8d85\u8fc7 115ms")),(0,l.kt)("h2",{id:"\u5bf9\u91cd\u6d4b\u8bd5"},"\u5bf9\u91cd\u6d4b\u8bd5"),(0,l.kt)("p",null,"\u65b0\u589e\u4e24\u4e2a\u63a5\u53e3"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"/falout"),"\uff1a\u5bf9\u4e8e\u6bcf\u4e2a\u8bf7\u6c42\u90fd\u8f6c\u53d1\u51fa 3 \u4e2a\u526f\u672c\u3002\u5e94\u8be5\u80fd\u5230\u8fbe P99 \u6027\u80fd\u3002\u4f46\u4f1a\u53d1\u51fa 3 \u500d\u4ee5\u4e0a\u7684\u8bf7\u6c42\u3002"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"/hedged"),"\uff1a\u5728\u7b2c\u4e00\u4e2a\u672a\u8fbe\u5230\u9884\u671f P95 (21ms) \u4e4b\u540e\u89e6\u53d1\u5bf9\u51b2\u8bf7\u6c42\u3002\u5e94\u8be5\u5728 40 \u6beb\u79d2\u5de6\u53f3\u5c06\u5c3e\u90e8\u6027\u80fd\u63d0\u9ad8\u5230 P99\u3002\u6700\u591a\u53ea\u80fd\u591a\u53d1\u51fa 5%\n\u7684\u8bf7\u6c42\u3002")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"falout")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-go"},"func queryFanOut(urls []string) string {\n    ch := make(chan string, len(urls))\n    for _, url := range urls {\n        go func(u string) {\n            ch <- executeQuery(u)\n        }(url)\n    }\n    return <-ch\n}\n")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202204202248476.png",alt:null})),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"hedged")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-go"},"func queryWithHedgedRequests(urls []string) string {\n    ch := make(chan string, len(urls))\n    for _, url := range urls {\n        go func(u string, c chan string) {\n            c <- executeQuery(u)\n        }(url, ch)\n\n        select {\n        case r := <-ch:\n            return r\n        case <-time.After(21 * time.Millisecond):\n        }\n    }\n\n    return <-ch\n}\n")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202204202248260.png",alt:null})),(0,l.kt)("h2",{id:"\u7ed3\u8bba"},"\u7ed3\u8bba"),(0,l.kt)("p",null,"\u4ec5\u7528\u51e0\u884c\u4ee3\u7801\uff0c\u6211\u4eec\u5c31\u53ef\u4ee5\u5927\u5e45\u6539\u5584\u5c3e\u90e8\u5ef6\u8fdf\u3002\u5728\u5c06\u5176\u7528\u4f5c\u751f\u4ea7\u7cfb\u7edf\u4e4b\u524d\uff0c\u8be5\u793a\u4f8b\u8fd8\u6709\u5f88\u591a\u9700\u8981\u6539\u8fdb\u7684\u5730\u65b9\uff0c\u4f46\u6838\u5fc3\u5b9e\u73b0\u4e0e\u6b64\u6ca1\u6709\u592a\u5927\u533a\u522b\u3002\n\u8be5\u6280\u672f\u9488\u5bf9\u4e00\u4e2a\u975e\u5e38\u5177\u4f53\u7684\u95ee\u9898\uff0c\u5728\u7528\u4e8e\u5b9e\u9645\u751f\u4ea7\u5e94\u7528\u4e4b\u524d\u5e94\u8fdb\u884c\u5f7b\u5e95\u5206\u6790\u3002"))}c.isMDXComponent=!0}}]);