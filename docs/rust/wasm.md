# WebAssembly初体验

## hello-wasm

[MDN教程](https://developer.mozilla.org/zh-CN/docs/WebAssembly/Rust_to_wasm)

### 安装准备

- 安装Rust
- 安装wasm-pack

```
cargo install wasm-pack
```

- 安装node.js并注册账户

```powershell
> npm adduser
Username: $username
Password:
Email: (this IS public) $you@example.com
```

### 构建 WebAssembly npm 包

#### 新建项目

```
cargo new --lib hello-wasm

+-- Cargo.toml
+-- src
    +-- lib.rs
```

#### lib.rs

```rust
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
```

#### Cargo.toml

```toml
[package]
name = "hello-wasm"
version = "0.1.0"
authors = ["Your Name <you@example.com>"]
description = "A sample project with wasm-pack"
license = "MIT/Apache-2.0"
repository = "https://github.com/yourgithubusername/hello-wasm"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```

#### 构建发布

```shell
# 构建
wasm-pack build --scope $mynpmusername
# 发布
cd pkg
npm publish --access=public
```

### 在webpack项目使用

#### 目录

```
+-- site
    +-- package.json
    +-- webpack.config.js
    +-- index.html
```

#### package.json

```json
{
  "scripts": {
    "serve": "webpack-dev-server"
  },
  "dependencies": {
    "@mynpmusername/hello-wasm": "^0.1.0"
  },
  "devDependencies": {
    "webpack": "^4.25.1",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.10"
  }
}
```

#### webpack.config.js

```js
const path = require("path");
module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  mode: "development",
};
```

#### index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>hello-wasm example</title>
  </head>
  <body>
    <script src="./index.js"></script>
  </body>
</html>
```

#### index.js

```js
const js = import("./node_modules/@yournpmusername/hello-wasm/hello_wasm.js");
js.then((js) => {
  js.greet("WebAssembly");
});
```

#### 启动

```shell
$ npm install
$ npm run serve
```

## 康威生命游戏

### 内存排布

js的`Object`, `Array`, `DOM Nodes`等对象都存储在GC Heap上
wasm的内存是和js分离的，线型排布，rust的数据就存在其中

### js与rust通讯

wasm目前无法直接访问js的GC Heap(这点可能会改变, wasm提案正尝试为wasm加入高级数据类型),
而js可以直接访问wasm的内存数据，虽然需要把数据转换为固定大小的buf array(u8, i32, f64 ...). wasm函数也只能接受返回标量值.
上面的内容构成了js和wasm通讯的基本模块

### wasm-bindgen

该工具包装了rust数据结构，并能够将指针返回给js, 封装了js对象，直接调用js-api

但是依然需要考虑如何设计数据结构以适配wasm的需要

### 注意事项

- 最小化copy数据, 在js和wasm之间拷贝数据会带来不必要的开销 如果js能够使用指针直接操作wasm数据，就能大幅减少开销

- 最小化序列化

一些大型的，长期存在的数据结构应该将指针暴露给js

### 优化方向

1. consle.EndTime计算函数执行时间

2. 结合浏览器性能分析工具，观察函数调用栈的时间占比

3. bench 准备项目

- 切换到`nightly`版本, 项目根目录下增加`toolchain`文件，写入`nightly`即可
- 注释掉所有的`#[wasm-bindgen]`
- 注释掉所有的`web-sys`调用

开始测试，并将结果导出到before.txt

```shell
cargo bench | tee before.txt
```

从before.txt中获取运行结果，找到对应的二进制文件， 使用perf再次运行这个二进制文件

```
perf record -g target/release/deps/bench-2e4b55af5ebabae8 --bench
```

查看结果

```
perf report
```

![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241137609.png)
按下`a`查看汇编代码的时间统计结果
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241138801.png)
竟然相差了十几倍

```
before: test universe_ticks ... bench:     215,952 ns/iter (+/- 7,814)
after : test universe_ticks ... bench:      18,912 ns/iter (+/- 5,025)
```

从10ms降低到3ms
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241453849.png)

### 🎉 展示

康为生命游戏
![图片](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203231913525.png)

## ⭐ idea

- 字符画网页
