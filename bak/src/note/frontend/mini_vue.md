# Vue Mastery

Deep Dive With Even You

## 1. V-DOM

实现 dom 重点在于

1. 获取新增节点的各种属性，使用 createElement 拼接出一个新的节点，并将其挂载到 dom 树中
2. 能够用比较算法比较新的 dom 和旧的 dom 的不同，并高效的更新节点

### 1.1 h

该函数只是定义了一个标签的属性并返回

```js
function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  };
}
```

### 1.2 mount

生成 + 挂载节点的封装 使用 node.el 作为指针保存了节点的信息

```js
function mount(vnode, container) {
  // 创建新节点
  // 这里用 node.el 保存了旧的 dom 树
  const el = vnode.el = document.createElement(vnode.tag);
  // 添加 props 属性
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];
      el.setAttribute(key, value);
    }
  }
  // 挂载子节点
  // string 类型就直接修改 textContent
  // Array 类型就以此对 child 调用 mount 挂载到新节点上
  if (vnode.children) {
    if (typeof vnode.children === "string") {
      el.textContent = vnode.children;
    } else if (vnode.children instanceof Array) {
      console.log(vnode.children);
      vnode.children.forEach((child) => {
        mount(child, el);
      });
    } else {
      el.textContent = `[ERROR]: ${vnode.children}`;
    }
  }
  container.appendChild(el);
}
```

### 1.3 patch

比较新节点和旧节点的差异，最小化修改节点内容 重点在于新旧节点的 children 都是 Array 类型时，如何最高效的实现两组 Array 的同步
比如多的添加，少的删除，变的修改，换为位置的怎么把位置换回来

```js
function patch(n1, n2) {
  // 1. 比较是不是同一个标签
  if (n1.tag === n2.tag) {
    const el = n2.el = n1.el;
    // check props 检查 props 属性，变了的就修改，没有的就添加
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    for (const key in newProps) {
      const oldValue = oldProps[key];
      const newValue = newProps[key];
      if (oldValue !== newValue) {
        el.setAttribute(key, newValue);
      }
    }
    // 把旧节点多余的 props 删除
    for (const key in oldProps) {
      if (!(key in newProps)) {
        el.removeAttribute(key);
      }
    }

    // children 检查子节点
    const oldChildren = n1.children;
    const newChildren = n2.children;
    // 如果新节点是 string 类型且和旧节点不一样，就覆盖掉旧节点
    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        if ((oldChildren !== newChildren)) {
          el.textContent = newChildren;
        }
      } else {
        el.textContent = newChildren;
      }
      // 如果新节点是 Array 类型
    } else if (newChildren instanceof Array) {
      // 旧的是 string 类型，依次添加 newChild
      if (typeof oldChildren === "string") {
        el.innerHTML = "";
        newChildren.forEach((child) => {
          mount(child, el);
        });
        // 旧的也是个 Array
      } else if (oldChildren instanceof Array) {
        const commonLength = Math.min(oldChildren.length, newChildren.length);
        // 一次比较每一对 child，修改旧 child 的内容
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i]);
        }
        // 如果 newChildren 数量更多，就把多出的新节点添加到新节点上
        if (newChildren.length > oldChildren.length) {
          newChildren.slice(oldChildren.length).forEach((child) => {
            mount(child, el);
          });
          // 否则，删除多余的新节点
        } else if (newChildren.length < oldChildren.length) {
          oldChildren.slice(newChildren.length).forEach((child) => {
            el.removeChild(child.el);
          });
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
            // 这里用 node.el 保存了旧的 dom 树
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

实现 ref，和 watchEffect 的监听

### 2.1 基本过程

为 Dep 类实现了 set，get，可以像 ref 一样通过 dep.value 获取和修改变量 而且能在 get，set 前后做一些其他工作，比如这里用到的
set 后调用 notify 激活 watchEffect get 时 (首次调用 watchEffect 时)，把用到的变量添加到各自的 subscriber 里

1. 被监听变量加载 subscriber
   首次调用 watchffect 时，先初始化 activeEffect 为传入 watchEffect 的函数，被 get 过的变量会执行 depend，向 subscriber 中加入 activeEffect(即为 warchEffect 函数内传递的箭头函数)
   接着在变量被 set 后就能调用 notify，唤醒 subscriber 中的箭头函数
2. 误区 如果，像下面的例子中，假如 ok.value 的值开始为 true，那么 ok 和 msg 都能正确加载 subscriber
   加入 ok.value 开始为 false，msg 就不能正确加载 subscriber，在之后修改中也不会正确激活 notify，即使在之后 get 也不行，因为 depend 只有在 effect 不为空才能添加 subscriber，effect 的初始化是在 watchEffect() 中进行的，watchffect 结束后 acticeEffect 就被 null 了

### 2.2 watchEffect 的初始化

watchEffect 函数完成的工作是初始化 activeEffect
在 watchEffect() 首次被调用时，执行每个监听变量的 depend()，加入 subscriber，之后在变量被修改时就能使用 notify 激活 activeEffect

```js
function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}
watchEffect(() => {
  // console.log(dep.value)

  if (ok.value) {
    console.log(ok.value, msg.value);
  } else {
    console.log("Error");
  }
});
```

### 2.3 Dep 类的实现

```js
class Dep {
  constructor(value) {
    this.subscriber = new Set();
    this._value = value;
  }

  get value() {
    this.depend();
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.notify();
  }

  depend() {
    if (activeEffect) {
      this.subscriber.add(activeEffect);
    }
  }

  notify() {
    this.subscriber.forEach((effect) => {
      effect();
    });
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
        // dep 不在 watchffect 中
        console.log(dep.value)
        dep.value = {aa: 2}
        console.log(dep.value)
        console.log('----------- 2 -----------');
        // 这里虽然修改了 msg 的值，但是由于 msg 之前没有被 get 过，他的 subscriber 为空，notify 不会激活 watchEffect 运行
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

大体思路和 dep 相似，这里提供两套实现

1. 基于 Object.defineProperty (vue2)

```js
function reactive(raw) {
  // 仿照 dep 类，为每个键值设定 setter 和 getter 方法
  // raw 中的每个对象都是一个 Dep 实例
  Object.keys(raw).forEach((key) => {
    let dep = new Dep(key);
    let value = raw[key];
    Object.defineProperty(raw, key, {
      fuck() {
        console.log("cnm");
      },
      get() {
        dep.depend();
        return value;
      },
      set(newValue) {
        value = newValue;
        dep.notify();
      },
    });
  });
  return raw;
}
```

2. 基于 Proxy 的实现 (vue3)

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
  return dep;
}

// 使用 Proxy 实现的另一个好处是，我们能够检测到添加新元素，比如下面的 state.msg
const reactiveHandler = {
  get(target, key, receiver) {
    const dep = getDep(target, key);
    dep.depend();
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    const dep = getDep(target, key);
    const result = Reflect.set(target, key, value, receiver);
    // 先修改值在 notify
    dep.notify();
    return result;
  },
  // 还可以实现更多的 traps
  has() {
  },
  onKeys() {
  },
};

function reactive(raw) {
  return new Proxy(raw, reactiveHandler);
}
const state = reactive({
  count: 0,
  fuck: "Fuck!",
});
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
        //     // 仿照 dep 类，为每个键值设定 setter 和 getter 方法
        //     // raw 中的每个对象都是一个 Dep 实例
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

        // 使用 Proxy 实现的另一个好处是，我们能够检测到添加新元素，比如下面的 state.msg
        const reactiveHandler = {
            get(target, key, receiver) {
                const dep = getDep(target, key);
                dep.depend()
                return Reflect.get(target, key, receiver)
            },
            set(target, key, value, receiver) {
                const dep = getDep(target, key);
                const result = Reflect.set(target, key, value, receiver);
                // 先修改值在 notify
                dep.notify()
                return result
            },
            // 还可以实现更多的 traps
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
    return h("div", {
      onclick: () => {
        this.data.count++;
      },
    }, this.data.count);
  },
};

function mountApp(component, container) {
  let isMounted = false;
  let prevVdom;
  watchEffect(() => {
    if (!isMounted) {
      prevVdom = component.render();
      mount(prevVdom, container);
      isMounted = true;
    } else {
      const newVdom = component.render();
      patch(prevVdom, newVdom);
      prevVdom = newVdom;
    }
  });
}

mountApp(App, document.querySelector("#app"));
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
