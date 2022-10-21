# JS 进阶

## 1. Object.defineProperty

```js
Object.defineProperty(obj, prop, description)

obj
  要定义属性的对象。
prop
  要定义或修改的属性的名称或 Symbol 。
descriptor
  要定义或修改的属性描述符。
```

该函数能够精确的定义一个对象上某个属性的描述符 属性描述符分为数据描述符和存取描述符，判断是什么描述符需要看这个描述符中拥有的键值 如果一个描述符不具有
value、writable、get 和 set 中的任意一个键，那么它将被认为是一个数据描述符。如果一个描述符同时拥有 value 或 writable 和
get 或 set 键，则会产生一个异常。

下面是描述符可选的键值

1. **通用键值**

- configurable 当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
  默认为 false。
- enumerable 当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。默认为 false。

2. **数据描述符**还具有以下可选键值：

- value 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
- writable 当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符 (en-US) 改变。
  默认为 false。

3. **存取描述符**还具有以下可选键值：

- get 属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入
  this 对象（由于继承关系，这里的 this 并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。默认为 undefined。
- set 属性的 setter 函数，如果没有 setter，则为
  undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。默认为 undefined。

## 2. new Proxy(target, handler)

[MDN-Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

### 2.1 基本概念

创建代理对象实现对对象操作时的拦截和自定义

- handler (en-US) 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。
- traps handler 对象拥有的 traps（捕获器）
- target 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

### 2.2 标准的 traps

下面列出了一些常用的捕获器

- handler.getPrototypeOf() Object.getPrototypeOf 方法的捕捉器。
- handler.setPrototypeOf() Object.setPrototypeOf 方法的捕捉器。
- handler.isExtensible() Object.isExtensible 方法的捕捉器。
- handler.preventExtensions() Object.preventExtensions 方法的捕捉器。
- handler.getOwnPropertyDescriptor() Object.getOwnPropertyDescriptor 方法的捕捉器。
- handler.defineProperty() Object.defineProperty 方法的捕捉器。
- handler.has() in 操作符的捕捉器。
- handler.get() 属性读取操作的捕捉器。
- handler.set() 属性设置操作的捕捉器。
- handler.deleteProperty() delete 操作符的捕捉器。
- handler.ownKeys() Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols
  方法的捕捉器。
- handler.apply() 函数调用操作的捕捉器。
- handler.construct() new 操作符的捕捉器。

### 2.3 get set

下面是一个使用 get 捕获器进行变量打印的例子

```js
let target = {
  id: 1,
  name: "小明",
};

const handler = {
  get: function (target, property, reveiver) {
    console.log("target: ", target);
    console.log("property: ", property);
    console.log("reveiver: ", reveiver);
    return target[property];
  },
};

let proxyTarget = new Proxy(target, handler);

console.log(proxyTarget.id);

Object.defineProperty(proxyTarget, "id", {
  get: undefined,
});

console.log("id", proxyTarget.id);
console.log("name:", proxyTarget.name);

console.log("target", target);
console.log("proxyTarget", proxyTarget);
```

### 2.4 代理转发

下面对 proxy 的修改被正确转发到 target 上

```js
let target = {};
let p = new Proxy(target, {});

p.a = 37; // 操作转发到目标

console.log(target.a); // 37. 操作已经被正确地转发
```

set trap 可以进行值修正及附加属性 比如

```js
let products = new Proxy({
  browsers: ["Internet Explorer", "Netscape"],
}, {
  get: function (obj, prop) {
    // 附加一个属性
    if (prop === "latestBrowser") {
      return obj.browsers[obj.browsers.length - 1];
    }

    // 默认行为是返回属性值
    return obj[prop];
  },
  set: function (obj, prop, value) {
    // 附加属性
    if (prop === "latestBrowser") {
      obj.browsers.push(value);
      return;
    }

    // 如果不是数组，则进行转换
    if (typeof value === "string") {
      value = [value];
    }

    // 默认行为是保存属性值
    obj[prop] = value;

    // 表示成功
    return true;
  },
});

console.log(products.browsers); // ['Internet Explorer', 'Netscape']
products.browsers = "Firefox"; // 如果不小心传入了一个字符串
console.log(products.browsers); // ['Firefox'] <- 也没问题，得到的依旧是一个数组

products.latestBrowser = "Chrome";
console.log(products.browsers); // ['Firefox', 'Chrome']
console.log(products.latestBrowser); // 'Chrome'
```

### 2.5 对方法调用的代理

```js
function sum(a, b) {
  return a + b;
}

const handler2 = {
  apply: function (target, thisArg, argumentsList) {
    console.log(`argumentsList ${argumentsList}`);
    // expected output: "Calculate sum: 1,2"
    console.log("thisArg", thisArg);
    return target(argumentsList[0], argumentsList[1]) * 10;
  },
};

const proxy1 = new Proxy(sum, handler2);

console.log(sum(1, 2));
// expected output: 3
console.log(proxy1(1, 2));
// expected output: 30
```

### 2.6 对构造函数的代理

使用构造函数声明类

```js
var Person = function (name) {
  this.name = name;
};

let person = new Person("aa");
console.log(person);
```

使用 extend 方法代理 Boy 类的构造方法

```js
function extend(sup, base) {
  var descriptor = Object.getOwnPropertyDescriptor(
    base.prototype,
    "constructor",
  );
  base.prototype = Object.create(sup.prototype);
  var handler = {
    construct: function (target, args) {
      var obj = Object.create(base.prototype);
      this.apply(target, obj, args);
      return obj;
    },
    apply: function (target, that, args) {
      sup.apply(that, args);
      base.apply(that, args);
    },
  };
  var proxy = new Proxy(base, handler);
  descriptor.value = proxy;
  Object.defineProperty(base.prototype, "constructor", descriptor);
  return proxy;
}

var Person = function (name) {
  this.name = name;
};

var Boy = extend(Person, function (name, age) {
  this.age = age;
});

Boy.prototype.sex = "M";

var Peter = new Boy("Peter", 13);
console.log(Peter.sex); // "M"
console.log(Peter.name); // "Peter"
console.log(Peter.age); // 13
```

### 2.7 实例：交换两个单选框的选择状态

```js
let view = new Proxy({
  selected: null,
}, {
  set: function (obj, prop, newval) {
    let oldval = obj[prop];

    if (prop === "selected") {
      if (oldval) {
        oldval.setAttribute("aria-selected", "false");
      }
      if (newval) {
        newval.setAttribute("aria-selected", "true");
      }
    }

    // 默认行为是存储被传入 setter 函数的属性值
    obj[prop] = newval;

    // 表示操作成功
    return true;
  },
});

let i1 = view.selected = document.getElementById("item-1");
console.log(i1.getAttribute("aria-selected")); // 'true'

let i2 = view.selected = document.getElementById("item-2");
console.log(i1.getAttribute("aria-selected")); // 'false'
console.log(i2.getAttribute("aria-selected")); // 'true'
```

### 2.8 实例：对数组方法的拓展

1. products.number 为 array.length 起别名 array.number
2. products.name | products.type 通过 array 中 object 的某个键获取元素

```js
let products = new Proxy([
  { name: "Firefox", type: "browser" },
  { name: "SeaMonkey", type: "browser" },
  { name: "Thunderbird", type: "mailer" },
], {
  get: function (obj, prop) {
    // 默认行为是返回属性值，prop ?通常是一个整数
    if (prop in obj) {
      return obj[prop];
    }

    // 获取 products 的 number; 它是 products.length 的别名
    if (prop === "number") {
      return obj.length;
    }

    let result, types = {};

    for (let product of obj) {
      if (product.name === prop) {
        result = product;
      }
      if (types[product.type]) {
        types[product.type].push(product);
      } else {
        types[product.type] = [product];
      }
    }

    // 通过 name 获取 product
    if (result) {
      return result;
    }

    // 通过 type 获取 products
    if (prop in types) {
      return types[prop];
    }

    // 获取 product type
    if (prop === "types") {
      return Object.keys(types);
    }

    return undefined;
  },
});

console.log(products[0]); // { name: 'Firefox', type: 'browser' }
console.log(products["Firefox"]); // { name: 'Firefox', type: 'browser' }
console.log(products["Chrome"]); // undefined
console.log(products.browser); // [{ name: 'Firefox', type: 'browser' }, { name: 'SeaMonkey', type: 'browser' }]
console.log(products.types); // ['browser', 'mailer']
console.log(products.number); // 3
```

## 其他

### Map vs WeakMap

```
WeakMap 只能用 Object 做键，而且是一个弱引用，

能够触发垃圾回收机制
不能被 enumerate
Map 使用任意类型作为键

在 gc 时不能自动删除关联内存
可以被迭代
```
