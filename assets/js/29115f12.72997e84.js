"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[3817],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>f});var l=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,l,r=function(e,n){if(null==e)return{};var t,l,r={},o=Object.keys(e);for(l=0;l<o.length;l++)t=o[l],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(l=0;l<o.length;l++)t=o[l],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var c=l.createContext({}),s=function(e){var n=l.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},d=function(e){var n=s(e.components);return l.createElement(c.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return l.createElement(l.Fragment,{},n)}},u=l.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=s(t),f=r,h=u["".concat(c,".").concat(f)]||u[f]||p[f]||o;return t?l.createElement(h,a(a({ref:n},d),{},{components:t})):l.createElement(h,a({ref:n},d))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,a=new Array(o);a[0]=u;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,a[1]=i;for(var s=2;s<o;s++)a[s]=t[s];return l.createElement.apply(null,a)}return l.createElement.apply(null,t)}u.displayName="MDXCreateElement"},1433:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>s});var l=t(7462),r=(t(7294),t(3905));const o={},a="Vue Mastery",i={unversionedId:"notes/frontend/mini_vue",id:"notes/frontend/mini_vue",title:"Vue Mastery",description:"Deep Dive With Even You",source:"@site/docs/notes/frontend/mini_vue.md",sourceDirName:"notes/frontend",slug:"/notes/frontend/mini_vue",permalink:"/docs/notes/frontend/mini_vue",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u5b9e\u73b0\u4e00\u4e2a mini-bundle",permalink:"/docs/notes/frontend/mini_bundle"},next:{title:"\u865a\u62df DOM",permalink:"/docs/notes/frontend/vdom"}},c={},s=[{value:"1. V-DOM",id:"1-v-dom",level:2},{value:"1.1 h",id:"11-h",level:3},{value:"1.2 mount",id:"12-mount",level:3},{value:"1.3 patch",id:"13-patch",level:3},{value:"1.4 \u5b8c\u6574\u4ee3\u7801",id:"14-\u5b8c\u6574\u4ee3\u7801",level:3},{value:"2. Ref",id:"2-ref",level:2},{value:"2.1 \u57fa\u672c\u8fc7\u7a0b",id:"21-\u57fa\u672c\u8fc7\u7a0b",level:3},{value:"2.2 watchEffect \u7684\u521d\u59cb\u5316",id:"22-watcheffect-\u7684\u521d\u59cb\u5316",level:3},{value:"2.3 Dep \u7c7b\u7684\u5b9e\u73b0",id:"23-dep-\u7c7b\u7684\u5b9e\u73b0",level:3},{value:"2.4 \u5b8c\u6574\u4ee3\u7801",id:"24-\u5b8c\u6574\u4ee3\u7801",level:3},{value:"2.5 \u65b9\u4fbf\u8c03\u8bd5\u7684\u7248\u672c",id:"25-\u65b9\u4fbf\u8c03\u8bd5\u7684\u7248\u672c",level:3},{value:"3. Reactive",id:"3-reactive",level:2},{value:"4. Mini-Vue",id:"4-mini-vue",level:2},{value:"5. Composition API",id:"5-composition-api",level:2}],d={toc:s};function p(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,l.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"vue-mastery"},"Vue Mastery"),(0,r.kt)("p",null,"Deep Dive With Even You"),(0,r.kt)("h2",{id:"1-v-dom"},"1. V-DOM"),(0,r.kt)("p",null,"\u5b9e\u73b0 dom \u91cd\u70b9\u5728\u4e8e"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u83b7\u53d6\u65b0\u589e\u8282\u70b9\u7684\u5404\u79cd\u5c5e\u6027\uff0c\u4f7f\u7528 createElement \u62fc\u63a5\u51fa\u4e00\u4e2a\u65b0\u7684\u8282\u70b9\uff0c\u5e76\u5c06\u5176\u6302\u8f7d\u5230 dom \u6811\u4e2d"),(0,r.kt)("li",{parentName:"ol"},"\u80fd\u591f\u7528\u6bd4\u8f83\u7b97\u6cd5\u6bd4\u8f83\u65b0\u7684 dom \u548c\u65e7\u7684 dom \u7684\u4e0d\u540c\uff0c\u5e76\u9ad8\u6548\u7684\u66f4\u65b0\u8282\u70b9")),(0,r.kt)("h3",{id:"11-h"},"1.1 h"),(0,r.kt)("p",null,"\u8be5\u51fd\u6570\u53ea\u662f\u5b9a\u4e49\u4e86\u4e00\u4e2a\u6807\u7b7e\u7684\u5c5e\u6027\u5e76\u8fd4\u56de"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"function h(tag, props, children) {\n  return {\n    tag,\n    props,\n    children,\n  };\n}\n")),(0,r.kt)("h3",{id:"12-mount"},"1.2 mount"),(0,r.kt)("p",null,"\u751f\u6210 + \u6302\u8f7d\u8282\u70b9\u7684\u5c01\u88c5 \u4f7f\u7528 node.el \u4f5c\u4e3a\u6307\u9488\u4fdd\u5b58\u4e86\u8282\u70b9\u7684\u4fe1\u606f"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'function mount(vnode, container) {\n  // \u521b\u5efa\u65b0\u8282\u70b9\n  // \u8fd9\u91cc\u7528 node.el \u4fdd\u5b58\u4e86\u65e7\u7684 dom \u6811\n  const el = vnode.el = document.createElement(vnode.tag);\n  // \u6dfb\u52a0 props \u5c5e\u6027\n  if (vnode.props) {\n    for (const key in vnode.props) {\n      const value = vnode.props[key];\n      el.setAttribute(key, value);\n    }\n  }\n  // \u6302\u8f7d\u5b50\u8282\u70b9\n  // string \u7c7b\u578b\u5c31\u76f4\u63a5\u4fee\u6539 textContent\n  // Array \u7c7b\u578b\u5c31\u4ee5\u6b64\u5bf9 child \u8c03\u7528 mount \u6302\u8f7d\u5230\u65b0\u8282\u70b9\u4e0a\n  if (vnode.children) {\n    if (typeof vnode.children === "string") {\n      el.textContent = vnode.children;\n    } else if (vnode.children instanceof Array) {\n      console.log(vnode.children);\n      vnode.children.forEach((child) => {\n        mount(child, el);\n      });\n    } else {\n      el.textContent = `[ERROR]: ${vnode.children}`;\n    }\n  }\n  container.appendChild(el);\n}\n')),(0,r.kt)("h3",{id:"13-patch"},"1.3 patch"),(0,r.kt)("p",null,"\u6bd4\u8f83\u65b0\u8282\u70b9\u548c\u65e7\u8282\u70b9\u7684\u5dee\u5f02\uff0c\u6700\u5c0f\u5316\u4fee\u6539\u8282\u70b9\u5185\u5bb9 \u91cd\u70b9\u5728\u4e8e\u65b0\u65e7\u8282\u70b9\u7684 children \u90fd\u662f Array \u7c7b\u578b\u65f6\uff0c\u5982\u4f55\u6700\u9ad8\u6548\u7684\u5b9e\u73b0\u4e24\u7ec4 Array \u7684\u540c\u6b65\n\u6bd4\u5982\u591a\u7684\u6dfb\u52a0\uff0c\u5c11\u7684\u5220\u9664\uff0c\u53d8\u7684\u4fee\u6539\uff0c\u6362\u4e3a\u4f4d\u7f6e\u7684\u600e\u4e48\u628a\u4f4d\u7f6e\u6362\u56de\u6765"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'function patch(n1, n2) {\n  // 1. \u6bd4\u8f83\u662f\u4e0d\u662f\u540c\u4e00\u4e2a\u6807\u7b7e\n  if (n1.tag === n2.tag) {\n    const el = n2.el = n1.el;\n    // check props \u68c0\u67e5 props \u5c5e\u6027\uff0c\u53d8\u4e86\u7684\u5c31\u4fee\u6539\uff0c\u6ca1\u6709\u7684\u5c31\u6dfb\u52a0\n    const oldProps = n1.props || {};\n    const newProps = n2.props || {};\n    for (const key in newProps) {\n      const oldValue = oldProps[key];\n      const newValue = newProps[key];\n      if (oldValue !== newValue) {\n        el.setAttribute(key, newValue);\n      }\n    }\n    // \u628a\u65e7\u8282\u70b9\u591a\u4f59\u7684 props \u5220\u9664\n    for (const key in oldProps) {\n      if (!(key in newProps)) {\n        el.removeAttribute(key);\n      }\n    }\n\n    // children \u68c0\u67e5\u5b50\u8282\u70b9\n    const oldChildren = n1.children;\n    const newChildren = n2.children;\n    // \u5982\u679c\u65b0\u8282\u70b9\u662f string \u7c7b\u578b\u4e14\u548c\u65e7\u8282\u70b9\u4e0d\u4e00\u6837\uff0c\u5c31\u8986\u76d6\u6389\u65e7\u8282\u70b9\n    if (typeof newChildren === "string") {\n      if (typeof oldChildren === "string") {\n        if ((oldChildren !== newChildren)) {\n          el.textContent = newChildren;\n        }\n      } else {\n        el.textContent = newChildren;\n      }\n      // \u5982\u679c\u65b0\u8282\u70b9\u662f Array \u7c7b\u578b\n    } else if (newChildren instanceof Array) {\n      // \u65e7\u7684\u662f string \u7c7b\u578b\uff0c\u4f9d\u6b21\u6dfb\u52a0 newChild\n      if (typeof oldChildren === "string") {\n        el.innerHTML = "";\n        newChildren.forEach((child) => {\n          mount(child, el);\n        });\n        // \u65e7\u7684\u4e5f\u662f\u4e2a Array\n      } else if (oldChildren instanceof Array) {\n        const commonLength = Math.min(oldChildren.length, newChildren.length);\n        // \u4e00\u6b21\u6bd4\u8f83\u6bcf\u4e00\u5bf9 child\uff0c\u4fee\u6539\u65e7 child \u7684\u5185\u5bb9\n        for (let i = 0; i < commonLength; i++) {\n          patch(oldChildren[i], newChildren[i]);\n        }\n        // \u5982\u679c newChildren \u6570\u91cf\u66f4\u591a\uff0c\u5c31\u628a\u591a\u51fa\u7684\u65b0\u8282\u70b9\u6dfb\u52a0\u5230\u65b0\u8282\u70b9\u4e0a\n        if (newChildren.length > oldChildren.length) {\n          newChildren.slice(oldChildren.length).forEach((child) => {\n            mount(child, el);\n          });\n          // \u5426\u5219\uff0c\u5220\u9664\u591a\u4f59\u7684\u65b0\u8282\u70b9\n        } else if (newChildren.length < oldChildren.length) {\n          oldChildren.slice(newChildren.length).forEach((child) => {\n            el.removeChild(child.el);\n          });\n        }\n      }\n    } else {\n    }\n  } else {\n    // replace\n  }\n}\n')),(0,r.kt)("h3",{id:"14-\u5b8c\u6574\u4ee3\u7801"},"1.4 \u5b8c\u6574\u4ee3\u7801"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},"<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Document</title>\n    <style>\n        .red {\n            color: red;\n        }\n        .green {\n            color: green;\n        }\n        .m-4 {\n            margin: 10px;\n        }\n    </style>\n</head>\n<body>\n    <div id=\"app\">title</div>\n    <script>\n        // @ts-check\n        function h(tag, props, children) {\n            return {\n                tag,\n                props,\n                children\n            }\n        }\n\n        function mount(vnode, container) {\n            // \u8fd9\u91cc\u7528 node.el \u4fdd\u5b58\u4e86\u65e7\u7684 dom \u6811\n            const el = vnode.el = document.createElement(vnode.tag)\n            // props\n            if (vnode.props) {\n                for (const key in vnode.props) {\n                    const value = vnode.props[key]\n                    el.setAttribute(key, value)\n                }\n            }\n            if (vnode.children) {\n                if (typeof vnode.children === 'string') {\n                    el.textContent = vnode.children\n                } else if (vnode.children instanceof Array) {\n                    console.log(vnode.children)\n                    vnode.children.forEach(child => {\n                        mount(child, el)\n                    })\n                } else {\n                    el.textContent = `[ERROR]: ${vnode.children}`\n                }\n            }\n            container.appendChild(el)\n        }\n\n        const vdom = h('div', { class: 'red' }, [\n            h('span', {class: 'm-4'}, 'hello')\n        ])\n\n        function patch(n1, n2) {\n            if (n1.tag === n2.tag) {\n                const el = n2.el = n1.el\n                // check props\n                const oldProps = n1.props || {};\n                const newProps = n2.props || {};\n                for (const key in newProps) {\n                    const oldValue = oldProps[key]\n                    const newValue = newProps[key]\n                    if (oldValue !== newValue) {\n                        el.setAttribute(key, newValue)\n                    }\n                }\n                for (const key in oldProps) {\n                    if (!(key in newProps)) {\n                        el.removeAttribute(key)\n                    }\n                }\n\n                // childrem\n                const oldChildren = n1.children\n                const newChildren = n2.children\n                if (typeof newChildren === \"string\") {\n                    if (typeof oldChildren === 'string') {\n                        if ((oldChildren !== newChildren)) {\n                            el.textContent = newChildren\n                        }\n                    } else {\n                        el.textContent = newChildren\n                    }\n                } else if (newChildren instanceof Array) {\n                    if (typeof oldChildren === 'string') {\n                        el.innerHTML = ''\n                        newChildren .forEach(child => {\n                            mount(child, el)\n                        })\n                    } else if (oldChildren instanceof Array) {\n                        const commonLength = Math.min(oldChildren.length, newChildren.length)\n                        for (let i = 0; i < commonLength; i++) {\n                            patch(oldChildren[i], newChildren[i])\n                        }\n                        if (newChildren.length > oldChildren.length) {\n                            newChildren.slice(oldChildren.length).forEach(child => {\n                                mount(child, el)\n                            })\n                        } else if (newChildren.length < oldChildren.length) {\n                            oldChildren.slice(newChildren.length).forEach(child => {\n                                el.removeChild(child.el)\n                            })\n                        }\n                    }\n                } else {\n\n                }\n            } else {\n                // replace\n\n\n            }\n        }\n\n        mount(vdom, document.querySelector(\"#app\"))\n\n        const vdom2 = h('div', { class: 'green' }, [\n            h('span', {class: 'm-4'}, 'msg')\n        ])\n\n        patch(vdom, vdom2)\n\n    <\/script>\n</body>\n</html>\n")),(0,r.kt)("h2",{id:"2-ref"},"2. Ref"),(0,r.kt)("p",null,"\u5b9e\u73b0 ref\uff0c\u548c watchEffect \u7684\u76d1\u542c"),(0,r.kt)("h3",{id:"21-\u57fa\u672c\u8fc7\u7a0b"},"2.1 \u57fa\u672c\u8fc7\u7a0b"),(0,r.kt)("p",null,"\u4e3a Dep \u7c7b\u5b9e\u73b0\u4e86 set\uff0cget\uff0c\u53ef\u4ee5\u50cf ref \u4e00\u6837\u901a\u8fc7 dep.value \u83b7\u53d6\u548c\u4fee\u6539\u53d8\u91cf \u800c\u4e14\u80fd\u5728 get\uff0cset \u524d\u540e\u505a\u4e00\u4e9b\u5176\u4ed6\u5de5\u4f5c\uff0c\u6bd4\u5982\u8fd9\u91cc\u7528\u5230\u7684\nset \u540e\u8c03\u7528 notify \u6fc0\u6d3b watchEffect get \u65f6 (\u9996\u6b21\u8c03\u7528 watchEffect \u65f6)\uff0c\u628a\u7528\u5230\u7684\u53d8\u91cf\u6dfb\u52a0\u5230\u5404\u81ea\u7684 subscriber \u91cc"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u88ab\u76d1\u542c\u53d8\u91cf\u52a0\u8f7d subscriber\n\u9996\u6b21\u8c03\u7528 watchffect \u65f6\uff0c\u5148\u521d\u59cb\u5316 activeEffect \u4e3a\u4f20\u5165 watchEffect \u7684\u51fd\u6570\uff0c\u88ab get \u8fc7\u7684\u53d8\u91cf\u4f1a\u6267\u884c depend\uff0c\u5411 subscriber \u4e2d\u52a0\u5165 activeEffect(\u5373\u4e3a warchEffect \u51fd\u6570\u5185\u4f20\u9012\u7684\u7bad\u5934\u51fd\u6570)\n\u63a5\u7740\u5728\u53d8\u91cf\u88ab set \u540e\u5c31\u80fd\u8c03\u7528 notify\uff0c\u5524\u9192 subscriber \u4e2d\u7684\u7bad\u5934\u51fd\u6570"),(0,r.kt)("li",{parentName:"ol"},"\u8bef\u533a \u5982\u679c\uff0c\u50cf\u4e0b\u9762\u7684\u4f8b\u5b50\u4e2d\uff0c\u5047\u5982 ok.value \u7684\u503c\u5f00\u59cb\u4e3a true\uff0c\u90a3\u4e48 ok \u548c msg \u90fd\u80fd\u6b63\u786e\u52a0\u8f7d subscriber\n\u52a0\u5165 ok.value \u5f00\u59cb\u4e3a false\uff0cmsg \u5c31\u4e0d\u80fd\u6b63\u786e\u52a0\u8f7d subscriber\uff0c\u5728\u4e4b\u540e\u4fee\u6539\u4e2d\u4e5f\u4e0d\u4f1a\u6b63\u786e\u6fc0\u6d3b notify\uff0c\u5373\u4f7f\u5728\u4e4b\u540e get \u4e5f\u4e0d\u884c\uff0c\u56e0\u4e3a depend \u53ea\u6709\u5728 effect \u4e0d\u4e3a\u7a7a\u624d\u80fd\u6dfb\u52a0 subscriber\uff0ceffect \u7684\u521d\u59cb\u5316\u662f\u5728 watchEffect() \u4e2d\u8fdb\u884c\u7684\uff0cwatchffect \u7ed3\u675f\u540e acticeEffect \u5c31\u88ab null \u4e86")),(0,r.kt)("h3",{id:"22-watcheffect-\u7684\u521d\u59cb\u5316"},"2.2 watchEffect \u7684\u521d\u59cb\u5316"),(0,r.kt)("p",null,"watchEffect \u51fd\u6570\u5b8c\u6210\u7684\u5de5\u4f5c\u662f\u521d\u59cb\u5316 activeEffect\n\u5728 watchEffect() \u9996\u6b21\u88ab\u8c03\u7528\u65f6\uff0c\u6267\u884c\u6bcf\u4e2a\u76d1\u542c\u53d8\u91cf\u7684 depend()\uff0c\u52a0\u5165 subscriber\uff0c\u4e4b\u540e\u5728\u53d8\u91cf\u88ab\u4fee\u6539\u65f6\u5c31\u80fd\u4f7f\u7528 notify \u6fc0\u6d3b activeEffect"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'function watchEffect(effect) {\n  activeEffect = effect;\n  effect();\n  activeEffect = null;\n}\nwatchEffect(() => {\n  // console.log(dep.value)\n\n  if (ok.value) {\n    console.log(ok.value, msg.value);\n  } else {\n    console.log("Error");\n  }\n});\n')),(0,r.kt)("h3",{id:"23-dep-\u7c7b\u7684\u5b9e\u73b0"},"2.3 Dep \u7c7b\u7684\u5b9e\u73b0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"class Dep {\n  constructor(value) {\n    this.subscriber = new Set();\n    this._value = value;\n  }\n\n  get value() {\n    this.depend();\n    return this._value;\n  }\n\n  set value(value) {\n    this._value = value;\n    this.notify();\n  }\n\n  depend() {\n    if (activeEffect) {\n      this.subscriber.add(activeEffect);\n    }\n  }\n\n  notify() {\n    this.subscriber.forEach((effect) => {\n      effect();\n    });\n  }\n}\n")),(0,r.kt)("h3",{id:"24-\u5b8c\u6574\u4ee3\u7801"},"2.4 \u5b8c\u6574\u4ee3\u7801"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Document</title>\n</head>\n<body>\n    <script>\n\n        let activeEffect\n        class Dep {\n\n            constructor(value) {\n                this.subscriber = new Set()\n                this._value = value\n            }\n\n            get value() {\n                this.depend()\n                return this._value\n            }\n\n            set value(value) {\n                this._value = value\n                this.notify()\n            }\n\n            depend() {\n                if (activeEffect) {\n                    this.subscriber.add(activeEffect)\n                }\n            }\n\n            notify() {\n                this.subscriber.forEach(effect => {\n                    effect()\n                })\n            }\n        }\n\n        function watchEffect(effect) {\n            activeEffect = effect\n            effect()\n            activeEffect = null\n        }\n\n        const dep = new Dep({aa: 1});\n        const ok = new Dep(true);\n        const msg = new Dep(\'hello\');\n\n        watchEffect(() => {\n            // console.log(dep.value)\n\n            if (ok.value) {\n                console.log(ok.value, msg.value);\n            } else {\n                console.log(\'Error\');\n            }\n        })\n\n\n        dep.o = {aa: 2}\n        msg.value = "Ss"\n        ok.value = false\n        msg.value = "Ssr"\n\n\n        <\/script>\n</body>\n</html>\n')),(0,r.kt)("h3",{id:"25-\u65b9\u4fbf\u8c03\u8bd5\u7684\u7248\u672c"},"2.5 \u65b9\u4fbf\u8c03\u8bd5\u7684\u7248\u672c"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Document</title>\n</head>\n<body>\n\n\n    <script>\n\n        let activeEffect\n        class Dep {\n\n            constructor(value) {\n                this.subscriber = new Set()\n                this._value = value\n            }\n\n            get value() {\n                console.log('in get value');\n                this.depend()\n                return this._value\n            }\n\n            set value(value) {\n                console.log('in set value');\n                this._value = value\n                this.notify()\n            }\n\n            depend() {\n                console.log('activateEffect: ', activeEffect);\n                if (activeEffect) {\n                    this.subscriber.add(activeEffect)\n                }\n            }\n\n            notify() {\n                console.log('subscriber: ', this.subscriber);\n                this.subscriber.forEach(effect => {\n                    effect()\n                })\n            }\n        }\n\n        function watchEffect(effect) {\n            activeEffect = effect\n            effect()\n            activeEffect = null\n        }\n\n        const dep = new Dep({aa: 1});\n        const ok = new Dep(false);\n        const msg = new Dep('hello');\n\n        console.log('ok', ok, 'msg', msg);\n        console.log('----------- 0 -----------');\n        watchEffect(() => {\n            // console.log(dep.value)\n\n            if (ok.value) {\n                console.log(ok.value, msg.value);\n            } else {\n                console.log('Error');\n            }\n        })\n        console.log('ok', ok, 'msg', msg);\n        console.log('----------- 1 -----------');\n        // dep \u4e0d\u5728 watchffect \u4e2d\n        console.log(dep.value)\n        dep.value = {aa: 2}\n        console.log(dep.value)\n        console.log('----------- 2 -----------');\n        // \u8fd9\u91cc\u867d\u7136\u4fee\u6539\u4e86 msg \u7684\u503c\uff0c\u4f46\u662f\u7531\u4e8e msg \u4e4b\u524d\u6ca1\u6709\u88ab get \u8fc7\uff0c\u4ed6\u7684 subscriber \u4e3a\u7a7a\uff0cnotify \u4e0d\u4f1a\u6fc0\u6d3b watchEffect \u8fd0\u884c\n        console.log(msg.value);\n        msg.value = \"Ss\"\n        console.log('ok', ok, 'msg', msg);\n        console.log('----------- 3 -----------');\n        ok.value = true\n        console.log('----------- 4 -----------');\n        msg.value = \"Ssr\"\n        console.log('ok', ok, 'msg', msg);\n\n\n        <\/script>\n</body>\n</html>\n")),(0,r.kt)("h2",{id:"3-reactive"},"3. Reactive"),(0,r.kt)("p",null,"\u5927\u4f53\u601d\u8def\u548c dep \u76f8\u4f3c\uff0c\u8fd9\u91cc\u63d0\u4f9b\u4e24\u5957\u5b9e\u73b0"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u57fa\u4e8e Object.defineProperty (vue2)")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'function reactive(raw) {\n  // \u4eff\u7167 dep \u7c7b\uff0c\u4e3a\u6bcf\u4e2a\u952e\u503c\u8bbe\u5b9a setter \u548c getter \u65b9\u6cd5\n  // raw \u4e2d\u7684\u6bcf\u4e2a\u5bf9\u8c61\u90fd\u662f\u4e00\u4e2a Dep \u5b9e\u4f8b\n  Object.keys(raw).forEach((key) => {\n    let dep = new Dep(key);\n    let value = raw[key];\n    Object.defineProperty(raw, key, {\n      fuck() {\n        console.log("cnm");\n      },\n      get() {\n        dep.depend();\n        return value;\n      },\n      set(newValue) {\n        value = newValue;\n        dep.notify();\n      },\n    });\n  });\n  return raw;\n}\n')),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"\u57fa\u4e8e Proxy \u7684\u5b9e\u73b0 (vue3)")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'const targetMap = new WeakMap();\n\nfunction getDep(target, key) {\n  let depsMap = targetMap.get(target);\n  if (!depsMap) {\n    depsMap = new Map();\n    targetMap.set(target, depsMap);\n  }\n  let dep = depsMap.get(key);\n  if (!dep) {\n    dep = new Dep();\n    depsMap.set(key, dep);\n  }\n  return dep;\n}\n\n// \u4f7f\u7528 Proxy \u5b9e\u73b0\u7684\u53e6\u4e00\u4e2a\u597d\u5904\u662f\uff0c\u6211\u4eec\u80fd\u591f\u68c0\u6d4b\u5230\u6dfb\u52a0\u65b0\u5143\u7d20\uff0c\u6bd4\u5982\u4e0b\u9762\u7684 state.msg\nconst reactiveHandler = {\n  get(target, key, receiver) {\n    const dep = getDep(target, key);\n    dep.depend();\n    return Reflect.get(target, key, receiver);\n  },\n  set(target, key, value, receiver) {\n    const dep = getDep(target, key);\n    const result = Reflect.set(target, key, value, receiver);\n    // \u5148\u4fee\u6539\u503c\u5728 notify\n    dep.notify();\n    return result;\n  },\n  // \u8fd8\u53ef\u4ee5\u5b9e\u73b0\u66f4\u591a\u7684 traps\n  has() {\n  },\n  onKeys() {\n  },\n};\n\nfunction reactive(raw) {\n  return new Proxy(raw, reactiveHandler);\n}\nconst state = reactive({\n  count: 0,\n  fuck: "Fuck!",\n});\n')),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"\u5b8c\u6574\u4ee3\u7801")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Document</title>\n</head>\n<body>\n    <div id="app"></div>\n\n    <script>\n        let activeEffect\n        class Dep {\n\n            subscriber = new Set()\n\n            depend() {\n                if (activeEffect) {\n                    this.subscriber.add(activeEffect)\n                }\n            }\n\n            notify() {\n                this.subscriber.forEach(effect => {\n                    effect()\n                })\n            }\n        }\n\n        function watchEffect(effect) {\n            activeEffect = effect\n            effect()\n            activeEffect = null\n        }\n        // function reactive(raw) {\n        //     // \u4eff\u7167 dep \u7c7b\uff0c\u4e3a\u6bcf\u4e2a\u952e\u503c\u8bbe\u5b9a setter \u548c getter \u65b9\u6cd5\n        //     // raw \u4e2d\u7684\u6bcf\u4e2a\u5bf9\u8c61\u90fd\u662f\u4e00\u4e2a Dep \u5b9e\u4f8b\n        //     Object.keys(raw).forEach(key => {\n        //         let dep = new Dep(key)\n        //         let value = raw[key]\n        //         Object.defineProperty(raw, key, {\n        //             fuck() {\n        //                 console.log(\'cnm\');\n        //             },\n        //             get() {\n        //                 dep.depend()\n        //                 return value\n        //             },\n        //             set(newValue) {\n        //                 value = newValue\n        //                 dep.notify()\n        //             }\n        //         })\n        //     })\n        //     return raw\n        // }\n\n        // targetMap depMap\n        // obj1    key1 dep\n        //         key2 dep\n        // obj2    key1 dep\n        //         key2 dep\n        const targetMap = new WeakMap();\n\n        function getDep(target, key) {\n            let depsMap = targetMap.get(target);\n            if (!depsMap) {\n                depsMap = new Map();\n                targetMap.set(target, depsMap);\n            }\n            let dep = depsMap.get(key);\n            if (!dep) {\n                dep = new Dep();\n                depsMap.set(key, dep);\n            }\n            return dep\n        }\n\n        // \u4f7f\u7528 Proxy \u5b9e\u73b0\u7684\u53e6\u4e00\u4e2a\u597d\u5904\u662f\uff0c\u6211\u4eec\u80fd\u591f\u68c0\u6d4b\u5230\u6dfb\u52a0\u65b0\u5143\u7d20\uff0c\u6bd4\u5982\u4e0b\u9762\u7684 state.msg\n        const reactiveHandler = {\n            get(target, key, receiver) {\n                const dep = getDep(target, key);\n                dep.depend()\n                return Reflect.get(target, key, receiver)\n            },\n            set(target, key, value, receiver) {\n                const dep = getDep(target, key);\n                const result = Reflect.set(target, key, value, receiver);\n                // \u5148\u4fee\u6539\u503c\u5728 notify\n                dep.notify()\n                return result\n            },\n            // \u8fd8\u53ef\u4ee5\u5b9e\u73b0\u66f4\u591a\u7684 traps\n            has() {\n\n            },\n            onKeys() {\n\n            }\n        }\n\n        function reactive(raw) {\n            return new Proxy(raw, reactiveHandler)\n        }\n        const state = reactive({\n            count: 0,\n            fuck: \'Fuck!\'\n        })\n        console.log(\'state:\', state);\n\n        watchEffect(() => {\n            console.log(state.count, state.msg)\n        })\n\n        state.count++\n\n        state.msg = \'i am not exist before \'\n\n    <\/script>\n</body>\n</html>\n')),(0,r.kt)("h2",{id:"4-mini-vue"},"4. Mini-Vue"),(0,r.kt)("p",null,"\u6709\u4e86\u4e0a\u9762\u7684\u4e1c\u897f\u57fa\u672c\u5c31\u591f\u4e86"),(0,r.kt)("p",null,"\u4e0b\u9762\u662f\u4e00\u4e2a\u8ba1\u6570\u5e94\u7528"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'const App = {\n  data: reactive({\n    count: 0,\n  }),\n  render() {\n    return h("div", {\n      onclick: () => {\n        this.data.count++;\n      },\n    }, this.data.count);\n  },\n};\n\nfunction mountApp(component, container) {\n  let isMounted = false;\n  let prevVdom;\n  watchEffect(() => {\n    if (!isMounted) {\n      prevVdom = component.render();\n      mount(prevVdom, container);\n      isMounted = true;\n    } else {\n      const newVdom = component.render();\n      patch(prevVdom, newVdom);\n      prevVdom = newVdom;\n    }\n  });\n}\n\nmountApp(App, document.querySelector("#app"));\n')),(0,r.kt)("h2",{id:"5-composition-api"},"5. Composition API"),(0,r.kt)("p",null,"\u4e00\u4e2a\u5c0f\u5c0f\u7684\u5c01\u88c5\u5e94\u7528"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<!DOCTYPE html>\n<html lang="en">\n\n<head>\n  <meta charset="UTF-8">\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n  <script src="https://unpkg.com/vue@next"><\/script>\n</head>\n\n<body>\n\n  <div id="app"></div>\n\n  <script>\n    const { createApp, ref, watchEffect } = Vue\n\n    function usePost(getId) {\n      return useFetch(() => `https://jsonplaceholder.typicode.com/todos/${getId()}`)\n    }\n\n    function useFetch(getUrl) {\n      const data = ref(null)\n      const error = ref(null)\n      const isPending = ref(true)\n\n      watchEffect(() => {\n        isPending.value = true\n        data.value = null\n        error.value = null\n        fetch(getUrl())\n          .then(res => res.json())\n          .then(_data => {\n            setTimeout(() => {\n              data.value = _data\n              isPending.value = false\n            }, 1000)\n          })\n          .catch(e => {\n            error.value = e\n            isPending.value = false\n          })\n      })\n      return { data, error, isPending }\n    }\n\n    const Post = {\n      template: `\n        Posts\n        <div v-if=\'isPending\'>Loading...</div>\n        <div v-else-if="data">{{ data }}</div>\n        <div v-else-if="error">Something is wrong: {{ error.message }}</div>\n      `,\n      props: {\n        id: 0\n      },\n      setup(props) {\n        console.log(\'props\', props);\n        const { data, error, isPending } = usePost(() => props.id)\n        return {\n          data,\n          error,\n          isPending\n        }\n      }\n    }\n\n    const App = {\n      components: { Post },\n      data() {\n        return {\n          id: 1\n        }\n      },\n      template: `\n        <button @click="id++">Change ID</button>\n        <Post :id="2"/>\n      `\n    }\n\n    createApp(App).mount("#app")\n\n  <\/script>\n</body>\n\n</html>\n')))}p.isMDXComponent=!0}}]);