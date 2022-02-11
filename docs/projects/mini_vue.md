# Vue Mastery
Deep Dive With Even You
## 1. V-DOM

实现dom重点在于
1. 获取新增节点的各种属性，使用createElement拼接出一个新的节点，并将其挂载到dom树中
2. 能够用比较算法比较新的dom和旧的dom的不同，并高效的更新节点

### 1.1 h

该函数只是定义了一个标签的属性并返回

```js
function h(tag, props, children) {
    return {
        tag,
        props,
        children
    }
}
```

### 1.2 mount

生成+挂载节点的封装
使用node.el作为指针保存了节点的信息
```js
function mount(vnode, container) {
    // 创建新节点
    // 这里用node.el保存了旧的dom树
    const el = vnode.el = document.createElement(vnode.tag)
    // 添加props属性
    if (vnode.props) {
        for (const key in vnode.props) {
            const value = vnode.props[key]
            el.setAttribute(key, value)
        }
    }
    // 挂载子节点
    // string类型就直接修改textContent
    // Array类型就以此对child调用mount挂载到新节点上
    if (vnode.children) {
        if (typeof vnode.children === 'string') {
            el.textContent = vnode.children
        } else if (vnode.children instanceof Array) {
            console.log(vnode.children)
            vnode.children.forEach(child => {
                mount(child, el)
            })
        } else {
            el.textContent = `[ERROR]: ${vnode.children}`
        }
    }
    container.appendChild(el)
}
```

### 1.3 patch
比较新节点和旧节点的差异，最小化修改节点内容
重点在于新旧节点的children都是Array类型时，如何最高效的实现两组Array的同步
比如多的添加，少的删除，变的修改，换为位置的怎么把位置换回来
```js
function patch(n1, n2) {
    // 1. 比较是不是同一个标签
    if (n1.tag === n2.tag) {
        const el = n2.el = n1.el
        // check props 检查props属性，变了的就修改，没有的就添加
        const oldProps = n1.props || {};
        const newProps = n2.props || {};
        for (const key in newProps) {
            const oldValue = oldProps[key]
            const newValue = newProps[key]
            if (oldValue !== newValue) {
                el.setAttribute(key, newValue)
            }
        }
        // 把旧节点多余的props删除
        for (const key in oldProps) {
            if (!(key in newProps)) {
                el.removeAttribute(key)
            }
        }

        // children 检查子节点
        const oldChildren = n1.children
        const newChildren = n2.children
        // 如果新节点是string类型且和旧节点不一样，就覆盖掉旧节点
        if (typeof newChildren === "string") {
            if (typeof oldChildren === 'string') {
                if ((oldChildren !== newChildren)) {
                    el.textContent = newChildren
                }
            } else {
                el.textContent = newChildren
            }
        // 如果新节点是Array类型
        } else if (newChildren instanceof Array) {
            // 旧的是string类型，依次添加newChild
            if (typeof oldChildren === 'string') {
                el.innerHTML = ''
                newChildren .forEach(child => {
                    mount(child, el)
                })
            // 旧的也是个Array
            } else if (oldChildren instanceof Array) {
                const commonLength = Math.min(oldChildren.length, newChildren.length)
                // 一次比较每一对child，修改旧child的内容
                for (let i = 0; i < commonLength; i++) {
                    patch(oldChildren[i], newChildren[i])
                }
                // 如果newChildren数量更多，就把多出的新节点添加到新节点上
                if (newChildren.length > oldChildren.length) {
                    newChildren.slice(oldChildren.length).forEach(child => {
                        mount(child, el)
                    })
                // 否则，删除多余的新节点
                } else if (newChildren.length < oldChildren.length) {
                    oldChildren.slice(newChildren.length).forEach(child => {
                        el.removeChild(child.el)
                    })
                }
            }
        } else {

        }
    } else {
        // replace


    }
}
```
### 1.4 完整代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .red {
            color: red;
        }
        .green {
            color: green;
        }
        .m-4 {
            margin: 10px;
        }
    </style>
</head>
<body>
    <div id="app">title</div>
    <script>
        // @ts-check
        function h(tag, props, children) {
            return {
                tag,
                props,
                children
            }
        }

        function mount(vnode, container) {
            // 这里用node.el保存了旧的dom树
            const el = vnode.el = document.createElement(vnode.tag)
            // props
            if (vnode.props) {
                for (const key in vnode.props) {
                    const value = vnode.props[key]
                    el.setAttribute(key, value)
                }
            }
            if (vnode.children) {
                if (typeof vnode.children === 'string') {
                    el.textContent = vnode.children
                } else if (vnode.children instanceof Array) {
                    console.log(vnode.children)
                    vnode.children.forEach(child => {
                        mount(child, el)
                    })
                } else {
                    el.textContent = `[ERROR]: ${vnode.children}`
                }
            }
            container.appendChild(el)
        }

        const vdom = h('div', { class: 'red' }, [
            h('span', {class: 'm-4'}, 'hello')
        ])

        function patch(n1, n2) {
            if (n1.tag === n2.tag) {
                const el = n2.el = n1.el
                // check props
                const oldProps = n1.props || {};
                const newProps = n2.props || {};
                for (const key in newProps) {
                    const oldValue = oldProps[key]
                    const newValue = newProps[key]
                    if (oldValue !== newValue) {
                        el.setAttribute(key, newValue)
                    }
                }
                for (const key in oldProps) {
                    if (!(key in newProps)) {
                        el.removeAttribute(key)
                    }
                }

                // childrem
                const oldChildren = n1.children
                const newChildren = n2.children
                if (typeof newChildren === "string") {
                    if (typeof oldChildren === 'string') {
                        if ((oldChildren !== newChildren)) {
                            el.textContent = newChildren
                        }
                    } else {
                        el.textContent = newChildren
                    }
                } else if (newChildren instanceof Array) {
                    if (typeof oldChildren === 'string') {
                        el.innerHTML = ''
                        newChildren .forEach(child => {
                            mount(child, el)
                        })
                    } else if (oldChildren instanceof Array) {
                        const commonLength = Math.min(oldChildren.length, newChildren.length)
                        for (let i = 0; i < commonLength; i++) {
                            patch(oldChildren[i], newChildren[i])
                        }
                        if (newChildren.length > oldChildren.length) {
                            newChildren.slice(oldChildren.length).forEach(child => {
                                mount(child, el)
                            })
                        } else if (newChildren.length < oldChildren.length) {
                            oldChildren.slice(newChildren.length).forEach(child => {
                                el.removeChild(child.el)
                            })
                        }
                    }
                } else {

                }
            } else {
                // replace


            }
        }

        mount(vdom, document.querySelector("#app"))

        const vdom2 = h('div', { class: 'green' }, [
            h('span', {class: 'm-4'}, 'msg')
        ])

        patch(vdom, vdom2)

    </script>
</body>
</html>

```

## 2. Ref
实现ref，和watchEffect的监听

### 2.1 基本过程
为Dep类实现了set，get，可以像ref一样通过dep.value获取和修改变量
而且能在get，set前后做一些其他工作，比如这里用到的
set后调用notify激活watchEffect
get时(首次调用watchEffect时)，把用到的变量添加到各自的subscriber里

1. 被监听变量加载subscriber
首次调用watchffect时，先初始化activeEffect为传入watchEffect的函数，被get过的变量会执行depend，向subscriber中加入activeEffect(即为warchEffect函数内传递的箭头函数)
接着在变量被set后就能调用notify，唤醒subscriber中的箭头函数
2. 误区
如果，像下面的例子中，假如ok.value的值开始为true，那么ok和msg都能正确加载subscriber
加入ok.value开始为false，msg就不能正确加载subscriber，在之后修改中也不会正确激活notify，即使在之后get也不行，因为depend只有在effect不为空才能添加subscriber，effect的初始化是在watchEffect()中进行的，watchffect结束后acticeEffect就被null了

### 2.2 watchEffect的初始化
watchEffect函数完成的工作是初始化activeEffect
在watchEffect()首次被调用时，执行每个监听变量的depend()，加入subscriber，之后在变量被修改时就能使用notify激活activeEffect

```js
function watchEffect(effect) {
    activeEffect = effect
    effect()
    activeEffect = null
}
watchEffect(() => {
    // console.log(dep.value)

    if (ok.value) {
        console.log(ok.value, msg.value);
    } else {
        console.log('Error');
    }
})
```


### 2.3 Dep类的实现

```js
class Dep {

    constructor(value) {
        this.subscriber = new Set()
        this._value = value
    }

    get value() {
        this.depend()
        return this._value
    }

    set value(value) {
        this._value = value
        this.notify()
    }

    depend() {
        if (activeEffect) {
            this.subscriber.add(activeEffect)
        }
    }

    notify() {
        this.subscriber.forEach(effect => {
            effect()
        })
    }
}
```

### 2.4 完整代码


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>

        let activeEffect
        class Dep {

            constructor(value) {
                this.subscriber = new Set()
                this._value = value
            }

            get value() {
                this.depend()
                return this._value
            }

            set value(value) {
                this._value = value
                this.notify()
            }

            depend() {
                if (activeEffect) {
                    this.subscriber.add(activeEffect)
                }
            }

            notify() {
                this.subscriber.forEach(effect => {
                    effect()
                })
            }
        }

        function watchEffect(effect) {
            activeEffect = effect
            effect()
            activeEffect = null
        }

        const dep = new Dep({aa: 1});
        const ok = new Dep(true);
        const msg = new Dep('hello');

        watchEffect(() => {
            // console.log(dep.value)

            if (ok.value) {
                console.log(ok.value, msg.value);
            } else {
                console.log('Error');
            }
        })


        dep.o = {aa: 2}
        msg.value = "Ss"
        ok.value = false
        msg.value = "Ssr"


        </script>
</body>
</html>
```

### 2.5 方便调试的版本
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>


    <script>

        let activeEffect
        class Dep {

            constructor(value) {
                this.subscriber = new Set()
                this._value = value
            }

            get value() {
                console.log('in get value');
                this.depend()
                return this._value
            }

            set value(value) {
                console.log('in set value');
                this._value = value
                this.notify()
            }

            depend() {
                console.log('activateEffect: ', activeEffect);
                if (activeEffect) {
                    this.subscriber.add(activeEffect)
                }
            }

            notify() {
                console.log('subscriber: ', this.subscriber);
                this.subscriber.forEach(effect => {
                    effect()
                })
            }
        }

        function watchEffect(effect) {
            activeEffect = effect
            effect()
            activeEffect = null
        }

        const dep = new Dep({aa: 1});
        const ok = new Dep(false);
        const msg = new Dep('hello');

        console.log('ok', ok, 'msg', msg);
        console.log('----------- 0 -----------');
        watchEffect(() => {
            // console.log(dep.value)

            if (ok.value) {
                console.log(ok.value, msg.value);
            } else {
                console.log('Error');
            }
        })
        console.log('ok', ok, 'msg', msg);
        console.log('----------- 1 -----------');
        // dep不在watchffect中
        console.log(dep.value)
        dep.value = {aa: 2}
        console.log(dep.value)
        console.log('----------- 2 -----------');
        // 这里虽然修改了msg的值，但是由于msg之前没有被get过，他的subscriber为空，notify不会激活watchEffect运行
        console.log(msg.value);
        msg.value = "Ss"
        console.log('ok', ok, 'msg', msg);
        console.log('----------- 3 -----------');
        ok.value = true
        console.log('----------- 4 -----------');
        msg.value = "Ssr"
        console.log('ok', ok, 'msg', msg);


        </script>
</body>
</html>
```

## 3. Reactive

大体思路和dep相似, 这里提供两套实现

1. 基于Object.defineProperty (vue2)
```js
function reactive(raw) {
    // 仿照dep类，为每个键值设定setter和getter方法
    // raw中的每个对象都是一个Dep实例
    Object.keys(raw).forEach(key => {
        let dep = new Dep(key)
        let value = raw[key]
        Object.defineProperty(raw, key, {
            fuck() {
                console.log('cnm');
            },
            get() {
                dep.depend()
                return value
            },
            set(newValue) {
                value = newValue
                dep.notify()
            }
        })
    })
    return raw
}
```

2. 基于Proxy的实现 (vue3)
```js
const targetMap = new WeakMap();

function getDep(target, key) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Dep();
        depsMap.set(key, dep);
    }
    return dep
}

// 使用Proxy实现的另一个好处是，我们能够检测到添加新元素，比如下面的state.msg
const reactiveHandler = {
    get(target, key, receiver) {
        const dep = getDep(target, key);
        dep.depend()
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
        const dep = getDep(target, key);
        const result = Reflect.set(target, key, value, receiver);
        // 先修改值在notify
        dep.notify()
        return result
    },
    // 还可以实现更多的traps
    has() {

    },
    onKeys() {

    }
}

function reactive(raw) {
    return new Proxy(raw, reactiveHandler)
}
const state = reactive({
    count: 0,
    fuck: 'Fuck!'
})
```

3. 完整代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>

    <script>
        let activeEffect
        class Dep {

            subscriber = new Set()

            depend() {
                if (activeEffect) {
                    this.subscriber.add(activeEffect)
                }
            }

            notify() {
                this.subscriber.forEach(effect => {
                    effect()
                })
            }
        }

        function watchEffect(effect) {
            activeEffect = effect
            effect()
            activeEffect = null
        }
        // function reactive(raw) {
        //     // 仿照dep类，为每个键值设定setter和getter方法
        //     // raw中的每个对象都是一个Dep实例
        //     Object.keys(raw).forEach(key => {
        //         let dep = new Dep(key)
        //         let value = raw[key]
        //         Object.defineProperty(raw, key, {
        //             fuck() {
        //                 console.log('cnm');
        //             },
        //             get() {
        //                 dep.depend()
        //                 return value
        //             },
        //             set(newValue) {
        //                 value = newValue
        //                 dep.notify()
        //             }
        //         })
        //     })
        //     return raw
        // }

        // targetMap depMap
        // obj1    key1 dep
        //         key2 dep
        // obj2    key1 dep
        //         key2 dep
        const targetMap = new WeakMap();

        function getDep(target, key) {
            let depsMap = targetMap.get(target);
            if (!depsMap) {
                depsMap = new Map();
                targetMap.set(target, depsMap);
            }
            let dep = depsMap.get(key);
            if (!dep) {
                dep = new Dep();
                depsMap.set(key, dep);
            }
            return dep
        }

        // 使用Proxy实现的另一个好处是，我们能够检测到添加新元素，比如下面的state.msg
        const reactiveHandler = {
            get(target, key, receiver) {
                const dep = getDep(target, key);
                dep.depend()
                return Reflect.get(target, key, receiver)
            },
            set(target, key, value, receiver) {
                const dep = getDep(target, key);
                const result = Reflect.set(target, key, value, receiver);
                // 先修改值在notify
                dep.notify()
                return result
            },
            // 还可以实现更多的traps
            has() {

            },
            onKeys() {

            }
        }

        function reactive(raw) {
            return new Proxy(raw, reactiveHandler)
        }
        const state = reactive({
            count: 0,
            fuck: 'Fuck!'
        })
        console.log('state:', state);

        watchEffect(() => {
            console.log(state.count, state.msg)
        })

        state.count++

        state.msg = 'i am not exist before '

    </script>
</body>
</html>
```

## 4. Mini-Vue
有了上面的东西基本就够了

下面是一个计数应用
```js

const App = {
    data: reactive({
        count: 0,
    }),
    render() {
        return h('div', {
            onclick: () => {
                this.data.count++
            }
        }, this.data.count)
    }
}

function mountApp(component, container) {
    let isMounted = false;
    let prevVdom
    watchEffect(() => {
        if (!isMounted) {
            prevVdom = component.render()
            mount(prevVdom, container);
            isMounted = true;
        } else {
            const newVdom = component.render()
            patch(prevVdom, newVdom)
            prevVdom = newVdom
        }
    })
}

mountApp(App, document.querySelector("#app"))


```

## 5. Composition API
一个小小的封装应用
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://unpkg.com/vue@next"></script>
</head>

<body>

  <div id="app"></div>

  <script>
    const { createApp, ref, watchEffect } = Vue

    function usePost(getId) {
      return useFetch(() => `https://jsonplaceholder.typicode.com/todos/${getId()}`)
    }

    function useFetch(getUrl) {
      const data = ref(null)
      const error = ref(null)
      const isPending = ref(true)

      watchEffect(() => {
        isPending.value = true
        data.value = null
        error.value = null
        fetch(getUrl())
          .then(res => res.json())
          .then(_data => {
            setTimeout(() => {
              data.value = _data
              isPending.value = false
            }, 1000)
          })
          .catch(e => {
            error.value = e
            isPending.value = false
          })
      })
      return { data, error, isPending }
    }

    const Post = {
      template: `
        Posts
        <div v-if='isPending'>Loading...</div>
        <div v-else-if="data">{{ data }}</div>
        <div v-else-if="error">Something is wrong: {{ error.message }}</div>
      `,
      props: {
        id: 0
      },
      setup(props) {
        console.log('props', props);
        const { data, error, isPending } = usePost(() => props.id)
        return {
          data,
          error,
          isPending
        }
      }
    }

    const App = {
      components: { Post },
      data() {
        return {
          id: 1
        }
      },
      template: `
        <button @click="id++">Change ID</button>
        <Post :id="2"/>
      `
    }

    createApp(App).mount("#app")

  </script>
</body>

</html>
```