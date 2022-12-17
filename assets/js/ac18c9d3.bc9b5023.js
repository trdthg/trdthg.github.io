"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[4084],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>k});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),m=s(n),k=a,d=m["".concat(p,".").concat(k)]||m[k]||c[k]||l;return n?r.createElement(d,o(o({ref:t},u),{},{components:n})):r.createElement(d,o({ref:t},u))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6496:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>i,toc:()=>s});var r=n(7462),a=(n(7294),n(3905));const l={},o="Python",i={unversionedId:"common/python",id:"common/python",title:"Python",description:"venv",source:"@site/docs/common/python.md",sourceDirName:"common",slug:"/common/python",permalink:"/docs/common/python",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"PgSQL",permalink:"/docs/common/pgsql"},next:{title:"Unsorted",permalink:"/docs/common/unsorted"}},p={},s=[{value:"venv",id:"venv",level:2},{value:"requirements.txt",id:"requirementstxt",level:2},{value:"setup.py",id:"setuppy",level:2},{value:"scrapy",id:"scrapy",level:2},{value:"IP \u6c60",id:"ip-\u6c60",level:3},{value:"\u968f\u673a\u4e0b\u8f7d\u5ef6\u8fdf",id:"\u968f\u673a\u4e0b\u8f7d\u5ef6\u8fdf",level:3},{value:"MicroPython",id:"micropython",level:2},{value:"MicroPython --- esp8266",id:"micropython-----esp8266",level:3},{value:"\u8fd0\u884c",id:"\u8fd0\u884c",level:4},{value:"\u8fde\u63a5 WiFi",id:"\u8fde\u63a5-wifi",level:4},{value:"WebREPL \u4e0a\u4f20\u6587\u4ef6",id:"webrepl-\u4e0a\u4f20\u6587\u4ef6",level:4},{value:"\u5f85\u7eed...",id:"\u5f85\u7eed",level:4},{value:"Conda",id:"conda",level:2},{value:"\u57fa\u672c\u64cd\u4f5c",id:"\u57fa\u672c\u64cd\u4f5c",level:3},{value:"\u5f85\u7eed...",id:"\u5f85\u7eed-1",level:3},{value:"\u6a21\u62df\u8f93\u5165",id:"\u6a21\u62df\u8f93\u5165",level:2},{value:"PyUserInput",id:"pyuserinput",level:3},{value:"\u6807\u51c6\u5e93",id:"\u6807\u51c6\u5e93",level:2},{value:"http.client",id:"httpclient",level:3}],u={toc:s};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"python"},"Python"),(0,a.kt)("h2",{id:"venv"},"venv"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5b89\u88c5",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"pip install virtualenv")))),(0,a.kt)("li",{parentName:"ul"},"\u521b\u5efa",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"python -m venv {myenv}")),(0,a.kt)("li",{parentName:"ul"},"myenv \u662f\u865a\u62df\u73af\u5883\u7684\u540d\u5b57 (\u5176\u5b9e\u662f\u8def\u5f84)"),(0,a.kt)("li",{parentName:"ul"},"\u4f1a\u5728\u8def\u5f84\u4e0b\u521b\u5efa\u4e00\u4e2a\u6587\u4ef6\u5939"))),(0,a.kt)("li",{parentName:"ul"},"\u8fdb\u5165",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"source /home/trdthg/myproject/bigdata20/venv/bin/activate")),(0,a.kt)("li",{parentName:"ul"},"\u5176\u5b9e\u5c31\u662f\u6267\u884c venv \u4e0b\u7684\u540d\u5b57\u4e3a activate \u7684 shell \u811a\u672c"))),(0,a.kt)("li",{parentName:"ul"},"\u9000\u51fa",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u8fd0\u884c ",(0,a.kt)("inlineCode",{parentName:"li"},"deactivate")))),(0,a.kt)("li",{parentName:"ul"},"\u5176\u4ed6\u865a\u62df\u5de5\u5177",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"pipenv")))),(0,a.kt)("h2",{id:"requirementstxt"},"requirements.txt"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u751f\u6210\u9879\u76ee\u4f9d\u8d56",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"venv",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"pip3 freeze > requirements.txt")),(0,a.kt)("li",{parentName:"ul"},"\u6ce8\u610f\uff1a\u5982\u679c\u4e0d\u662f\u5728\u865a\u62df\u73af\u5883\u4e0b\u6267\u884c\uff0c\u4f1a\u628a\u5168\u5c40\u7684\u4f9d\u8d56\u4e5f\u52a0\u8fdb\u53bb"))),(0,a.kt)("li",{parentName:"ul"},"pipenv",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u7565\u8fc7"))),(0,a.kt)("li",{parentName:"ul"},"\u975e\u865a\u62df\u73af\u5883 pipreqs",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"pipreqs /path/to/project")))))),(0,a.kt)("li",{parentName:"ul"},"\u4f7f\u7528 requirements.txt",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"pip install -r requirements.txt"))))),(0,a.kt)("h2",{id:"setuppy"},"setup.py"),(0,a.kt)("p",null,"\u611f\u89c9\u4e0d\u597d\u7528"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://towardsdatascience.com/requirements-vs-setuptools-python-ae3ee66e28af"},"requirements.txt vs setup.py in Python"))),(0,a.kt)("h2",{id:"scrapy"},"scrapy"),(0,a.kt)("h3",{id:"ip-\u6c60"},"IP \u6c60"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"docker run --network host --env DB_CONN=redis://:@localhost:6379/0 -p 5010:5010 jhao104/proxy_pool:2.4.0\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-py"},"class ProxyMiddleware(object):\n    def __init__(self, proxy_url):\n        self.proxy_url = proxy_url\n\n    def get_random_proxy(self):\n        try:\n            print(\"-\"*100)\n            print(\"\u8bf7\u6c42\u968f\u673a\u4ee3\u7406\")\n            response = requests.get(\"http://127.0.0.1:5010/get?type=https\")\n            if response.status_code == 200:\n                proxy = response.json()['proxy']\n                return proxy\n        except requests.ConnectionError:\n            return False\n\n    def process_request(self, request, spider):\n        if request.meta.get('retry_times'):\n            proxy = self.get_random_proxy()\n            if proxy:\n                uri = f'https://{proxy}'\n                print(' \u4f7f\u7528\u4ee3\u7406 ' + proxy)\n                request.meta['proxy'] = uri\n\n    @classmethod\n    def from_crawler(cls, crawler):\n        settings = crawler.settings\n        return cls(proxy_url=settings.get('PROXY_URL'))\n")),(0,a.kt)("h3",{id:"\u968f\u673a\u4e0b\u8f7d\u5ef6\u8fdf"},"\u968f\u673a\u4e0b\u8f7d\u5ef6\u8fdf"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-py"},'class RandomDelayMiddleware(object):\n    def __init__(self, delay):\n        self.delay = delay\n\n    @classmethod\n    def from_crawler(cls, crawler):\n        delay = crawler.spider.settings.get("RANDOM_DELAY", 10)\n        if not isinstance(delay, int):\n            raise ValueError("RANDOM_DELAY need a int")\n        return cls(delay)\n\n    def process_request(self, request, spider):\n        delay = random.randint(0, self.delay)\n        print(\'-\'*100)\n        print("\u4e0b\u8f7d\u5ef6\u8fdf\uff1a", delay, "\u79d2")\n        time.sleep(delay)\n')),(0,a.kt)("h2",{id:"micropython"},"MicroPython"),(0,a.kt)("h3",{id:"micropython-----esp8266"},"MicroPython --- esp8266"),(0,a.kt)("h4",{id:"\u8fd0\u884c"},"\u8fd0\u884c"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u51c6\u5907\u9879\u76ee")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u4e0b\u8f7d win10usb-series \u7684\u9a71\u52a8"),(0,a.kt)("li",{parentName:"ul"},"\u4e0b\u8f7d\u57fa\u4e8e ESP8266 \u7684 MicroPython\n\u56fa\u4ef6",(0,a.kt)("a",{parentName:"li",href:"https://micropython.org/download/#esp8266"},"MicroPython \u7684\u5b98\u7f51")),(0,a.kt)("li",{parentName:"ul"},"\u4e0b\u8f7d\u4e32\u53e3\u5de5\u5177",(0,a.kt)("a",{parentName:"li",href:"https://www.putty.org/"},"Putty")),(0,a.kt)("li",{parentName:"ul"},"\u4e0b\u8f7d",(0,a.kt)("a",{parentName:"li",href:"https://www.espressif.com/en/support/download/other-tools"},"\u70e7\u5f55\u5de5\u5177")),(0,a.kt)("li",{parentName:"ul"},"\u4e0b\u8f7d",(0,a.kt)("a",{parentName:"li",href:"https://github.com/micropython/webrepl"},"webrepl \u5ba2\u6237\u7aef"))),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"\u70e7\u5f55\u8fde\u63a5")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u70e7\u5199\u56fa\u4ef6\u628a\u8be5\u56fa\u4ef6\u70e7\u5199\u5230 0x0 \u4f4d\u7f6e\u5373\u53ef\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u4e0a\u7535\u6253\u5370\u51fa\u73b0\u4e0b\u4f8b\u8868\u793a\u6210\u529f")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},'MicroPython v1.8.6-7-gefd0927 on 2016-11-10; ESP module with ESP8266\nType "help()" for more information.\n>>>\n')),(0,a.kt)("p",null,"::: warning \u6ce8\u610f putty \u8fde\u63a5\u65f6\uff0c\u82e5\u952e\u76d8\u65e0\u6cd5\u8f93\u5165\uff0c\u5c1d\u8bd5\u8bbe\u7f6e (Connection -> Serial -> Flow control =\nNone) :::"),(0,a.kt)("h4",{id:"\u8fde\u63a5-wifi"},"\u8fde\u63a5 WiFi"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u8fde\u63a5")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'import network\nsta_if = network.WLAN(network.STA_IF)\nsta_if.active(True)\nsta_if.scan()                             # Scan for available access points\nsta_if.connect("<wifiname>", "<password>") # Connect to an AP\nsta_if.isconnected()                      # Check for successful connection\n')),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u8bbe\u7f6e\u4e0a\u7535\u81ea\u52a8\u8fde\u63a5 MicroPython \u521d\u59cb\u5316\u540e\u90fd\u4f1a\u81ea\u52a8\u6267\u884c main.py \u6587\u4ef6\uff0c\u6240\u4ee5\u6211\u4eec\u53ea\u9700\u8981\u8bbe\u7f6e\u8be5\u6587\u4ef6\u5373\u53ef\u4e0a\u7535\u81ea\u52a8\u8fde\u63a5\nWiFi\u3002\u6253\u5f00\u81ea\u5df1\u5e38\u7528\u7684\u7f16\u8f91\u5668\uff0c\u8f93\u5165\u4e0b\u9762\u4ee3\u7801\uff0c\u5e76\u4fdd\u5b58\u4e3a main.py \u6587\u4ef6\uff1a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'# main.py\nimport network\nimport webrepl\nimport time\n\nSSIDs = [("602", "4602yyds")]\n\ndef do_connect():\n    import network\n    wlan = network.WLAN(network.STA_IF)\n    wlan.active(True)\n    if not wlan.isconnected():\n        print(\'connecting to network...\')\n        wlan.connect(SSIDs[0][0], SSIDs[0][1])\n\n    start = time.time()\n    while not wlan.isconnected():\n        time.sleep(1)\n        if time.time()-start > 5:\n            print("connect timeout!")\n            break\n\n    if wlan.isconnected():\n        print("successfully connected!")\n        print(\'network config:\', wlan.ifconfig())\n\ndef main():\n    do_connect()\nmain()\n')),(0,a.kt)("h4",{id:"webrepl-\u4e0a\u4f20\u6587\u4ef6"},"WebREPL \u4e0a\u4f20\u6587\u4ef6"),(0,a.kt)("p",null,"webrepl \u662f MicroPython \u5b98\u65b9\u63d0\u4f9b\u7684\u6587\u4ef6\u7ba1\u7406\u5de5\u5177\u3002\u5e76\u4e14\u6709\u4e00\u4e2a webrepl \u5ba2\u6237\u7aef\u5de5\u5177\uff0c\u4f7f\u7528\u5b83\u53ef\u4ee5\u901a\u8fc7\u6d4f\u89c8\u5668\u6765\u8bbf ESP8266\u3002"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u521d\u59cb\u5316 (putty)")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"import webrepl_setup\n")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"\u542f\u52a8 (putty)")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"import webrepl\nwebrepl.start()\n")),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},"\u8fde\u63a5 (webrepl \u5ba2\u6237\u7aef)")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"ESP8266 \u8fde\u63a5\u597d WiFi \u540e\uff0c\u8f93\u5165 sta_if.ifconfig() \u67e5\u770b\u8fde\u63a5\u4fe1\u606f\uff0c\u8fd4\u56de\u7684\u5143\u7ec4\u7b2c\u4e00\u4e2a IP \u5c31\u662f\u65e0\u7ebf\u8def\u7531\u5668\u5206\u914d\u7ed9 ESP8266\n\u7684 IP\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u5982\u679c\u4f60\u7684\u7535\u8111\u548c ESP8266 \u5728\u540c\u4e00\u4e2a\u5c40\u57df\u7f51\uff0c\u4fee\u6539 WebREPL \u8981\u8fde\u63a5\u7684\u5730\u5740\u4e3a ESP8266 \u7684 IP\uff0c\u70b9\u51fb\u300cConnect\u300d\uff0c\u8fd4\u56de\u300cWelcome\nto MicroPython!\u300d\u8bf4\u660e\u8fde\u63a5\u6210\u529f\uff0c\u6839\u636e\u63d0\u793a\u8f93\u5165\u5bc6\u7801\uff08\u5bc6\u7801\u9ed8\u8ba4\u4e0d\u663e\u793a\uff09\u3002\u56de\u8f66\u540e\u663e\u793a\u300cWebREPL connected\u300d\u8868\u793a\u767b\u5f55\u6210\u529f\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u4e4b\u540e\u5c31\u53ef\u4ee5\u7528\u8fd9\u4e2a\u5ba2\u6237\u7aef\u4e0a\u4f20\u4e0b\u8f7d\u6587\u4ef6\u4e86\u3002")),(0,a.kt)("h4",{id:"\u5f85\u7eed"},"\u5f85\u7eed..."),(0,a.kt)("h2",{id:"conda"},"Conda"),(0,a.kt)("h3",{id:"\u57fa\u672c\u64cd\u4f5c"},"\u57fa\u672c\u64cd\u4f5c"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"# \u5b89\u88c5 PYTHON \u6307\u5b9a\u73af\u5883\nconda create -n $name python=$version\n# \u5217\u51fa\u6240\u6709\u73af\u5883\nconda env list\n# \u8fdb\u5165\u73af\u5883\nconda activate $name\n# \u9000\u51fa\u73af\u5883\nconda deactivate $name\n# \u5220\u9664\u73af\u5883\nconda env remove -n $name\n")),(0,a.kt)("p",null,"::: warning \u82e5\u4e0d\u8fdb\u5165\u73af\u5883\uff0c\u9ed8\u8ba4\u5728 base \u73af\u5883\u8fdb\u884c\u6240\u6709\u64cd\u4f5c :::"),(0,a.kt)("h3",{id:"\u5f85\u7eed-1"},"\u5f85\u7eed..."),(0,a.kt)("h2",{id:"\u6a21\u62df\u8f93\u5165"},"\u6a21\u62df\u8f93\u5165"),(0,a.kt)("h3",{id:"pyuserinput"},"PyUserInput"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u5b89\u88c5")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5b89\u88c5 PyHook: ",(0,a.kt)("a",{parentName:"li",href:"https://www.lfd.uci.edu/~gohlke/pythonlibs/"},"PyHook")," \u627e\u5230 PyHook \u76ee\u5f55\uff0c\n\u627e\u5230\u5bf9\u5e94\u7684 python \u7248\u672c\uff0c\u4e0b\u8f7d\u540e\u76f4\u63a5",(0,a.kt)("inlineCode",{parentName:"li"},"pip install pyHook\u20111.5.1\u2011cp35\u2011cp35m\u2011win_amd64.whl")),(0,a.kt)("li",{parentName:"ul"},"\u5b89\u88c5 PyUserInput: ",(0,a.kt)("inlineCode",{parentName:"li"},"pip install PyUserput"))),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"\u57fa\u672c\u64cd\u4f5c")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"from pymouse import *     # \u6a21\u62df\u9f20\u6807\u6240\u4f7f\u7528\u7684\u5305\nfrom pykeyboard import *   # \u6a21\u62df\u952e\u76d8\u6240\u4f7f\u7528\u7684\u5305\nimport time   # \u8fde\u7eed\u8fdb\u884c\u4e24\u4e2a\u52a8\u4f5c\u53ef\u80fd\u592a\u5feb\u800c\u6548\u679c\u4e0d\u660e\u663e\uff0c\u56e0\u6b64\u52a0\u5165\u6682\u505c\u65f6\u95f4\n\nm = PyMouse()   # \u9f20\u6807\u7684\u5b9e\u4f8b m\nk = PyKeyboard()   # \u952e\u76d8\u7684\u5b9e\u4f8b k\nx_dim, y_dim = m.screen_size()     # \u83b7\u53d6\u5c4f\u5e55\u5c3a\u5bf8\uff08\u4e00\u822c\u4e3a\u7535\u8111\u5c4f\u5e55\u7684\u5206\u8fa8\u7387\uff0c\u5982 1920*1080\uff09\n# \u4f30\u8ba1\u9700\u8981\u70b9\u51fb\u7684\u4f4d\u7f6e\u5750\u6807\uff08\u4e0d\u77e5\u9053\u6709\u6ca1\u6709\u5b9a\u4f4d\u4ee3\u7801\uff0c\u6211\u6ca1\u627e\u5230\uff0c\u6211\u662f\u81ea\u5df1\u4f30\u8ba1\u7684\u3002\u4f8b\u5982\uff0c\u6211\u7684\u7535\u8111\u5c4f\u5e55\u4e3a (1920\uff0c1080)\uff0c\u6211\u60f3\u8981\u5355\u51fb\u7684\u5730\u65b9\u4f30\u8ba1\u5750\u6807\u4e3a (10\uff0c500)\uff09\n\nm.move(10, 500)   # \u5c06\u9f20\u6807\u79fb\u52a8\u5230\u4f4d\uff08\u6b64\u6b65\u53ef\u5ffd\u7565\uff0c\u76f4\u63a5\u5355\u51fb\u4e5f\u53ef\uff09\ntime.sleep(0.5)   # \u6682\u505c 0.5s\uff0c\u65b9\u4fbf\u89c2\u5bdf\u79fb\u52a8\u7ed3\u679c\nm.click(10, 500, 1, 1)   # \u8868\u793a\u5728 (10, 500) \u7684\u5730\u65b9\uff0c\u5355\u51fb\u5de6\u952e\n")),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},"\u5e38\u7528\u51fd\u6570")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"k.type_string('Hello, World!')  # \u6a21\u62df\u952e\u76d8\u8f93\u5165\u5b57\u7b26\u4e32\nk.press_key('H')    # \u6a21\u62df\u952e\u76d8\u6309 H \u952e\nk.release_key('H')  # \u6a21\u62df\u952e\u76d8\u677e\u5f00 H \u952e\nk.tap_key(\"H\")  # \u6a21\u62df\u70b9\u51fb H \u952e\nk.tap_key('H',n=2,interval=5)   # \u6a21\u62df\u70b9\u51fb H \u952e\uff0c2 \u6b21\uff0c\u6bcf\u6b21\u95f4\u9694 5 \u79d2\nk.tap_key(k.function_keys[5])   # \u70b9\u51fb\u529f\u80fd\u952e F5\nk.tap_key(k.numpad_keys[5],3)   # \u70b9\u51fb\u5c0f\u952e\u76d8 5,3 \u6b21\n")),(0,a.kt)("ol",{start:4},(0,a.kt)("li",{parentName:"ol"},"\u7ec4\u5408\u952e")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"k.press_key(k.alt_key)  # \u6309\u4f4f alt \u952e\nk.tap_key(k.tab_key)    # \u70b9\u51fb tab \u952e\nk.release_key(k.alt_key)    # \u677e\u5f00 alt \u952e\n")),(0,a.kt)("ol",{start:5},(0,a.kt)("li",{parentName:"ol"},"\u5e38\u89c1\u7684\u952e\u548c\u952e\u503c\u7801")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"\u5b57\u6bcd\u548c\u6570\u5b57\u952e     \u6570\u5b57\u5c0f\u952e\u76d8\u7684\u952e       \u529f\u80fd\u952e         \u5176\u5b83\u952e\n\u952e   \u952e\u7801      \u952e   \u952e\u7801          \u952e   \u952e\u7801       \u952e         \u952e\u7801\nA   65          0   96            F1   112       Backspace  8\nB   66          1   97            F2   113       Tab        9\nC   67          2   98            F3   114       Clear      12\nD   68          3   99            F4   115       Enter      13\nE   69          4   100           F5   116       Shift      16\nF   70          5   101           F6   117       Control    17\nG   71          6   102           F7   118       Alt        18\nH   72          7   103           F8   119       Caps Lock  20\nI    73         8   104           F9   120       Esc        27\nJ    74         9   105           F10  121       Spacebar   32\nK   75          *   106           F11  122       Page Up    33\nL   76          +   107           F12  123       Page Down  34\nM   77        Enter 108                          End        35\nN   78          -   109                          Home       36\nO   79          .   110                          LeftArrow  37\nP   80          /   111                          UpArrow    38\nQ   81                                           RightArrow 39\nR   82                                           DownArrow  40\nS   83                                           Insert     45\nT   84                                           Delete     46\nU   85                                           Help       47\nV   86                                           Num Lock   144\nW  87\nX   88\nY   89\nZ   90\n0   48\n1   49\n2   50\n3   51\n4   52\n5   53\n6   54\n7   55\n8   56\n9   57\n")),(0,a.kt)("h2",{id:"\u6807\u51c6\u5e93"},"\u6807\u51c6\u5e93"),(0,a.kt)("h3",{id:"httpclient"},"http.client"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"demo \u5b9e\u4f8b")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'import json\n\nh1 = HTTPConnection(\'127.0.0.1:7878\')\nbody = json.dumps({"aaa": 1, "bbb": 2, "ccc": "sss"}).encode("utf-8")\nh1.request("POST", "/", body=body, headers={"Content-Type": "application/json"})\n')),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"\u57fa\u672c\u6d41\u7a0b")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},'          --- start ---\n                |\n                |===== self.__state = _CS_IDLE\n                v\nHTTPConnection => _create_connect()\n                |\n                | socket  // \u83b7\u53d6\u8fde\u63a5\n                | _output // \u50a8\u5b58\u8bf7\u6c42\u5b57\u7b26\u4e32\n                v\n    request() -> _send_request(method, url, body, headers)\n                |\n                |===== self.__state = _CS_REQ_STARTED\n                v\n    putrequests(method, url)\n                |\n                | self._output.append(method url http-vsn)\n                v\n[ putheaders(hdr, value) for hdr, vale in headers ]\n                |\n                | \u5f62\u6210\u4e86\u4e0d\u5e26 body \u7684\u90e8\u5206\n                v\n    endheaders(body) -> _send_output(body)\n                |\n                |===== self.__state = _CS_REQ_STARTED\n                | self.__state = _CS_REQ_SENT\n                | send(msg)\n                | send(body) if body exists\n                | send(b"0\\r\\n\\r\\n")\n                v\n            ---end---\n')))}c.isMDXComponent=!0}}]);