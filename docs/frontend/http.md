# HTTP 相关

## 压缩

### 后端 gzip

```
网址 trdthg.github.io 检测结果
是否压缩是
压缩类型 gzip
原始文件大小 23146 字节
压缩后文件大小 3454 字节
压缩率（估计值）85.08%
```

#### 配置压缩

2. 在 nginx 配置压缩效果
   [官方 doc](http://nginx.org/en/docs/http/ngx_http_gzip_module.html)
   [博客](https://www.cnblogs.com/Renyi-Fan/p/11047490.html)

```
gzip on;  #是否开启 gzip 模块 on 表示开启 off 表示关闭
gzip_buffers 4 16k;  #设置压缩所需要的缓冲区大小
gzip_comp_level 6;  #压缩级别 1-9，数字越大压缩的越好，也越占用 CPU 时间
gzip_min_length 100k;  #设置允许压缩的最小字节
gzip_http_version 1.1;  #设置压缩 http 协议的版本，默认是 1.1
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;  #设置压缩的文件类型
gzip_vary on;  #是否在 http header 中添加`Vary: Accept-Encoding`，辅助选择不同压缩算法产生的副本
```

注意一些不常用的资源，比如字体，有需要也应该加入 gzip_type

```
字体类型扩展名	Content-type
.eot	application/vnd.ms-fontobject
.ttf	font/ttf
.otf	font/opentype
.woff	font/x-woff
.svg	image/svg+xml
```

**怎么选择合适的压缩比**

```
gzip_comp_level 0: 0，94840, 63 [ms], 29%
gzip_comp_level 1: 2.43，39005, 248 [ms], 100%
gzip_comp_level 2: 2.51，37743, 273 [ms], 100%
gzip_comp_level 3; 2.57，36849, 327 [ms], 100%
gzip_comp_level 4; 2.73，34807, 370 [ms], 100%
gzip_comp_level 5; 2.80，33898, 491 [ms], 100%
gzip_comp_level 6; 2.82，33686, 604 [ms], 100%
gzip_comp_level 7; 2.82，33626, 659 [ms], 100%
gzip_comp_level 8; 2.82，33626, 698 [ms], 100%
gzip_comp_level 9; 2.82，33626, 698 [ms], 100%
- 随着压缩级别的升高，压缩比有所提高，但到了级别 6 后，很难再提高；
- 随着压缩级别的升高，处理时间明显变慢；
- gzip 很消耗 cpu 的性能，高并发情况下 cpu 达到 100%
```

注意事项

- 不是压缩级别越高越好，其实 gzip_comp_level 1 的压缩能力已经够用了，后面级别越高，压缩的比例其实增长不大，反而很吃处理性能。
- 压缩一定要和静态资源缓存相结合，缓存压缩后的版本，否则每次都压缩高负载下服务器肯定吃不住。
- 图片/mp3 这样的二进制文件，不必压缩，因为压缩率比较小，比如 100 只能压缩到 80 字节，而且压缩也是耗费 CPU 资源的。
- 比较小的文件不必压缩，意义不存在。

#### 配置压缩缓存

这里的缓存控制主要是针对图片，css,js 等变化周期较短的静态文件; 第一次访问 以图片为例，当我们第一次访问这张图片时，服务器返回的是
200，同时在响应头返回了两个键，

- Etag:即该文件的'指纹'(唯一标识)
- Last-Modified:'文件的修改时间'; 此时浏览器，以及其他的缓存服务器就会把这张图片给缓存起来;

第二次访问 再次请求这张图片时，请求头增加了两个键值，

- If-Modified-Since:上次发生改变的时间;
- If-None-Match:上次文件本身的 Etag 值，服务器根据这两个键值判断其 Etag 和
  Last-Modified，如果都没发生改变就不返回这张图片，只返回一个 304 的状态码，服务器接收到这个 304
  的状态码就会自己去从缓存里面找这个被缓存的图片;

可以减少服务器的带宽压力以及提升了网站访问速度;

```conf
location ~* ^.+\.(ico|gif|jpg|jpeg|png)$ {
  access_log   off;
  expires      30d;
}

location ~* ^.+\.(css|js|txt|xml|swf|wav)$ {
  access_log   off;
  expires      24h;
}

location ~* ^.+\.(html|htm)$ {
  expires      1h;
}
```

### terser 压缩

- 去除多余字符：空格，换行及注释
  - 多行代码压缩到一行时要注意行尾分号
- 压缩变量名：变量名，函数名及属性名
  - 缩短变量的命名也需要 AST 支持，不至于在作用域中造成命名冲突。
- 解析程序逻辑：合并声明以及布尔值简化
  ```js
  // 压缩前
  const a = 3;
  const b = 4;

  // 压缩后
  const a = 3, b = 4;

  // 压缩前
  !b && !c && !d && !e;

  // 压缩后
  !(b || c || d || e);
  ```
  - 解析程序逻辑：编译预计算
  ```js
  // 压缩前
  const ONE_YEAR = 365 * 24 * 60 * 60;
  // 压缩后
  const ONE_YAAR = 31536000;

  // 压缩前
  function hello() {
    console.log("hello, world");
  }
  hello();
  // 压缩后
  console.log("hello, world");
  ```

#### 库

uglify、terser 与 swc

### tree shaking

- 依赖于 webpack 静态分析，结合 AST 删除不必要的节点
- 对引入的 json 文件做静态分析
  - 需要使用 wabpack 插件`webpack-json-access-optimizer`
  - 把 json 转换为 array，并删除不必要的内容
    ```js
    // strings.json
    ["Hello world!", "Hello world again!"];

    // index.js
    const strings = require("./strings.json");
    console.log(strings[0], strings[1]);
    ```
- 对 css，下面用到了 style-loader，会把 css 加到 style 标签里
  ```js
  {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
  }
  // You just have to add the sideEffects: true property to it.

  {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      sideEffects: true
  }
  ```
- sideeffect 能直接跳过整个模块/文件
  ![Webpack - Tree Shaking](https://blog.logrocket.com/tree-shaking-json-files-webpack/)
  ![JSON-CSS](https://blog.logrocket.com/tree-shaking-json-files-webpack/)

## http 缓存

### 介绍

更少的请求，更少的流量，更少的峰值带宽，从而节省一大笔服务器或者 CDN 的费用。

- 减少请求次数
- 减少峰值带宽 控制 HTTP 缓存只需要使用 Cache-control 控制

> Expires：是 http1.0 的规范，它的值是一个绝对时间的 GMT 格式的时间字符串。比如网页的 Expires 值是：expires:Mar,
> 06 Apr 2020 10:47:02 GMT。问题：到期时间是由服务端生成的，如果客户端时间跟服务器时间不一致，这就会导致缓存命中的误差。
> **两者同时存在的话，Cache-Control 优先级高于 Expires**

### Cache-Control

```
1) max-age：用来设置资源（representations）可以被缓存多长时间，单位为秒；
2) s-maxage：和 max-age 是一样的，不过它只针对代理服务器缓存而言；**s-maxage 的优先级高于 max-age**

3) public：可以被所有的用户缓存，包括用户浏览器和 CDN 等中间代理服务器。
4) private：只能被用户浏览器缓存，而不能被代理服务器缓存；

5) no-cache：no-cache 是会被缓存的，但是依然强制客户端直接向服务器发送请求，只不过每次在向客户端（浏览器）提供响应数据时，缓存都要向服务器评估缓存响应的有效性。当服务器接收到请求，会判断资源是否变更，变更则返回新内容，否则返回 304。
6) no-store：禁止一切缓存（响应真的不被缓存）。

7) max-stale：能容忍的最大过期时间。max-stale 指令标示了客户端愿意接收一个已经过期了的响应。如果指定了 max-stale 的值，则最大容忍时间为对应的秒数。如果没有指定，那么说明浏览器愿意接收任何 age 的响应（age 表示响应由源站生成或确认的时间与当前时间的差值）。
8) min-fresh：能够容忍的最小新鲜度。min-fresh 标示了客户端不愿意接受新鲜度不多于当前的 age 加上 min-fresh 设定的时间之和的响应。
```

### 什么是指纹

![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202122340765.png)
如图所示，指纹就是文件的 hash 值

- main.js 带有 hash 值，属于带指纹的永久资源 (强缓存)
- index.js 不带 hash 值，虽然设置了 no-chche，但是依然是协商缓存

区别下面两种缓存就是依靠指纹 (是不是永久缓存)，而 cache-control 值是决定对缓存的处理策略 (存不存，用不用)

### 文件指纹生成策略

#### 生成策略

- hash：当有文件修改，整个项目构建的 hash 值就会更新。 `filename: '[name]-[hash].bundle.css'`
- chunkhash：和 webpack 打包的 chunk 相关，不同的 entry 会生成不同的 hash，一般用于 js 的打包。
  `filename: '[name]-[chunkhash].bundle.css'`
- contenthash：根据文件内容来定义 hash，文件内容不变，contenthash 不变。例如 css 的打包，由于 修改 js 或 html
  文件，但是没有修改引入的 css 样式时，文件不需要生成新的哈希值，所以可适用于 css 的打包。
  `filename: '[name]-[contenthash:8].bundle.css'`

> 可以在哈希末尾配置哈希值的长度
> [filename 配置格式](https://webpack.js.org/configuration/output/#template-strings)

#### js-chunkhash

```js
JS 文件指纹设置：
chunkhash;
module.export = {
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][chunkhash:8].js",
  },
};
```

### css-contenthash

CSS 文件指纹：contenthash --（min-css-extract-plugin 可以生产 css 文件）
1.直接使用'style-loader'方式通过 style 标签将 CSS 插入到 head 中并没有生成单独的 CSS 文件，因此也不存在
使用指纹时候可以更新文件，所以这里通过'min-css-extract-plugin'插件将 CSS 提取成单独的 CSS 文件，并添加文件指纹。2.安装依赖
mini-css-extract-plugin -- 'npm i mini-css-extract-plugin -D'

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.export = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name][contenthash:8].css",
    }),
  ],
};
```

#### img-hash

图片文件指纹设置：hash 1.其中，hash 对应的是文件内容的哈希值，默认为 md5 生成，不同于前面所说的 hash 值。

```js
module.export = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "img/[name][hash:8].[ext]",
          },
        }],
      },
    ],
  },
};
```

#### 注意事项

> 使用了 md5 指纹之后发现每次打包还是会发生变化？答：这是由于 webpack 的处理机制导致的，webpack
> 每次打包会把每个模块的配置信息，如文件名、文件顺序、文件 md5 等信息作为配置打入 js
> 中，以便于其进行模块管理，而这部内容，每次打包都有可能发生变化，导致整个 js 文件名每次都会发生变化。webpack 提供了一个 manifest
> 的机制来剥出这个配置文件。我们需要使用 CommonsChunkPlugin 来将其剥离，同时使用
> chunk-manifest-webpack-plugin 读取其 内容导出另外一个文件，防止其内容变化导致整个 js 文件指纹发生变化

#### Bundle Splitting：尽量减少资源变更

把大 js 文件，分成小的文件，尽量减少缓存失效的范围
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202130126302.png)
此时我们可以对资源进行分层次缓存的打包方案，这是一个建议方案：

- webpack-runtime: 应用中的 webpack 的版本比较稳定，分离出来，保证长久的永久缓存
- react/react-dom: react 的版本更新频次也较低
- vendor: 常用的第三方模块打包在一起，如 lodash，- classnames
  基本上每个页面都会引用到，但是它们的更新频率会更高一些。另外对低频次使用的第三方模块不要打进来
- pageA: A 路由页面，当 A 页面的组件发生变更后，它的缓存将会失效
- pageB: B 路由页面
- echarts: 不常用且过大的第三方模块单独打包
- mathjax: 不常用且过大的第三方模块单独打包
- jspdf: 不常用且过大的第三方模块单独打包

随着 **http2**
的发展，特别是多路复用，初始页面的静态资源不受资源数量的影响。因此为了更好的缓存效果以及按需加载，也有很多方案建议把**所有的第三方模块进行单模块打包**。

### 永久缓存 / 强制缓存 (带指纹)

```
Cache-Control: public,max-age=31536000,immutable
```

max-age 表示缓存时间为 1 年，直接从缓存数据库 (浏览器的本地缓存) 拿到数据，下图中的 (disk cache) 就是
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202122312621.png)
而为了解决更新的问题，就需要在文件名 (或者路径) 中添加 hash，版本号等动态字符，之后更改动态字符，从而达到更改引用 URL 的目的，让之前的强制缓存失效
(其实并未立即失效，只是不再使用了而已)。在线提供的类库 (如 jquery-3.3.1.min.js, lodash.min.js 等) 均采用这个模式。

**默认的强制缓存时间**

首先要明确两个响应头代表的含义：

- Date: 指源服务器响应报文生成的时间，差不多与发请求的时间等价
- Last-Modified: 指静态资源上次修改的时间，取决于 mtime

LM factor 算法认为当请求服务器时，如果没有设置 Cache-Control，如果距离上次的 Last-Modified
越远，则生成的强制缓存时间越长。

```js
// 用公式表示如下，其中 factor 介于 0 与 1 之间：
MaxAge = (Date - LastModified) * factor;
```

![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202130123289.png)

### 协商缓存 / 对比缓存 (不带指纹)

第一次请求会缓存`数据，Etag，Last-Modified`，之后请求都要发出请求携带`If-Modified-Since, If-None-Match`判断缓存的时效性，如果是
304，就表示缓存可用，浏览器就直接用缓存数据
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202122321204.png)

### Etag 和 Last-Modified 的区别

Etag 优先级更高，服务前先比较 Etag，同时存在时会以 ETag 为准。

#### Last-Modified / If-Modified-Since

1. 精确到秒：`Last-Modify: Thu,31 Dec 2037 23:59:59 GMT`
2. 使用`stat ./xxx.txt`获取文件 (夹) 信息

服务器响应请求时，会告诉浏览器一个告诉浏览器资源的最后修改时间：Last-Modified，浏览器之后再请求的时候，会带上一个头：If-Modified-Since，这个值就是服务器上一次给的
Last-Modified 的时间，服务器会比对资源当前最后的修改时间，如果大于
If-Modified-Since，则说明资源修改过了，浏览器不能再使用缓存，否则浏览器可以继续使用缓存，并返回 304 状态码。

#### Etag / If-None-Match

1. Etag/If-None-Match 是“实体标签”（Entity Tag）的缩写
2. 优先级高于 Last-Modified / If-Modified-Since）
3. 优势

- 解决内容并不改变，仅仅改改变修改时间的问题
- 解决只就精确到秒的问题：某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说 1s 内修改了 N 次)，If-Modified-Since
  能检查到的粒度是 s 级的，这种修改无法判断 (或者说 UNIX 记录 MTIME 只能精确到秒)；
- 某些服务器不能精确的得到文件的最后修改时间。

服务器响应请求时，通过 Etag 头部告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器决定），浏览器再次请求时，就会带上一个头
If-None-Match，这个值就是服务器上一次给的 Etag 的值，服务器比对一下资源当前的 Etag 是否跟 If-None-Match
一致，不一致则说明资源修改过了，浏览器不能再使用缓存，否则浏览器可以继续使用缓存，并返回 304 状态码。

[nginx 配置 etag](http://nginx.org/en/docs/http/ngx_http_core_module.html#etag)
由文件内容的 hash 或者 mtime/size 生成

### 最佳缓存策略

#### 缓存位置

请求一个资源时，会按照优先级（Service Worker - Memory Cache - Disk Cache - Push
Cache）依次查找缓存，如果命中则使用缓存，否则发起请求。

1. service walker

浏览器背后的独立线程，Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全

当 Service Worker 没有命中缓存的时候，我们需要去调用 fetch 函数获取数据。也就是说，如果我们没有在 Service Worker
命中缓存的话，会根据缓存查找优先级去查找数据。但是不管我们是从 Memory Cache 中还是从网络请求中获取的数据，浏览器都会显示我们是从 Service
Worker 中获取的内容。

2. 200 from memory cache

主要包含的是当前中页面中已经抓取到的资源，会随着进程的释放而释放，一旦我们关闭 Tab 页面，内存中的缓存也就被释放了。
一般来说，系统不会给内存分配较大的容量，因此内存缓存一般用于存储较小文件。同时内存缓存在有时效性要求的场景下也很有用（比如浏览器的隐私模式）。当前系统内存使用率高的话，文件优先存储进硬盘

> 还保存着 preload/prefetch 相关的资源，preloader 的相关指令已经是页面优化的常见手段之一，它可以一边解析 js/css
> 文件，一边网络请求下一个资源。200 from prefetch cache 在 preload 或 prefetch 的资源加载时，两者也是均存储在
> http cache，当资源加载完成后，如果资源是可以被缓存的，那么其被存储在 http cache
> 中等待后续使用；如果资源不可被缓存，那么其在被使用前均存储在 memory cache。

3. 200 from disk cache
   表示不访问服务器，直接从硬盘中读取缓存。与内存相比，硬盘的读取速度相对较慢，但硬盘缓存持续的时间更长，关闭进程之后，缓存的资源仍然存在。由于硬盘的容量较大，因此一般用于存储大文件。
   对于大文件来说，大概率是不存储在内存中的，反之优先

4. Push cache

Push Cache（推送缓存）是 HTTP/2
中的内容，当以上三种缓存都没有命中时，它才会被使用。它只在会话（Session）中存在，一旦会话结束就被释放，并且缓存时间也很短暂，在 Chrome
浏览器中只有 5 分钟左右，同时它也并非严格执行 HTTP 头中的缓存指令。

- 可以推送 no-cache 和 no-store 的资源
- 一旦连接被关闭，Push Cache 就被释放
- 多个页面可以使用同一个 HTTP/2 的连接，可以使用同一个 Push Cache，有的浏览器会对相同域名但不同的 tab 标签使用同一个 HTTP 连接。
- Push Cache 中的缓存只能被使用一次
- 浏览器可以拒绝接受已经存在的资源推送
- 你可以给其他域名推送资源

其他

1. CDN Cache

以腾讯 CDN 为例：X-Cache-Lookup:Hit From MemCache 表示命中 CDN 节点的内存；X-Cache-Lookup:Hit
From Disktank 表示命中 CDN 节点的磁盘；X-Cache-Lookup:Hit From Upstream 表示没有命中 CDN。

2. 其他的不展开了，具体参考下面的 所有缓存机制的解读

IndexDB(浏览器本地存储)，Service Worker，LocalStorage，SessionStorage

#### 用户行为如何触发缓存策略

1. 打开网页，地址栏输入地址：查找 disk cache 中是否有匹配。如有则使用；如没有则发送网络请求。

2. 普通刷新 (F5)：跳过强缓存，但是会检查协商缓存 (因为 TAB 并没有关闭，因此 memory cache 是可用的，会被优先使用
   (如果匹配的话)。其次才是 disk cache)。

- 当你点“刷新”按钮的时候，浏览器会在请求头里加一个“Cache-Control: maxage=0”。因为 max-age
  是“生存时间”，而本地缓存里的数据至少保存了几秒钟，所以浏览器就不会使用缓存，而是向服务器发请求。服务器看到
  max-age=0，也就会用一个最新生成的报文回应浏览器。

3. 强制刷新 (Ctrl + F5)：浏览器不使用缓存 (跳过强缓存和协商缓存)，直接从服务器加载，因此发送的请求头部均带有 Cache-control:
   no-cache(为了兼容，还带了 Pragma: no-cache),服务器直接返回 200 和最新内容。

- “Cache-Control: no-cache”，含义和“max-age=0”基本一样，就看后台的服务器怎么理解，通常两者的效果是相同的。

#### 最佳缓存策略

定义最优缓存策略

- 更新频繁的应该提取为单文件：有些资源的更新比其他资源频繁。如果资源的特定部分（例如 JS 函数或一组 CSS
  样式）会经常更新，应考虑将其代码作为单独的文件提供。这样，每次获取更新时，剩余内容（例如不会频繁更新的库代码）可以从缓存中获取，确保下载的内容量最少；
- 确保服务器配置或移除 ETag：因为 Etag 跟服务器配置有关，每台服务器的 Etag 都是不同的；其他

- 确定中继缓存可以缓存哪些资源：对所有用户的响应完全相同的资源很适合由 CDN 或其他中继缓存进行缓存；
- 使用一致的网址：如果您在不同的网址上提供相同的内容，将会多次获取和存储该内容。注意：URL 区分大小写！
- 确定每个资源的最优缓存周期：不同的资源可能有不同的更新要求。审查并确定每个资源适合的 max-age；
- 确定网站的最佳缓存层级：对 HTML 文档组合使用包含内容特征码的资源网址以及短时间或 no-cache 的生命周期，可以控制客户端获取更新的速度；
- 善用 HTML5 的缓存机制：合理设计启用 LocalStorage、SessionStorage、IndexDB、SW 等存储，会给页面性能带来明显提升；
- 用好本地缓存

![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202130038910.png)

### 参考资料

- [所有缓存机制的解读](https://www.jiqizhixin.com/articles/2020-07-24-12)
- [前端学习之浏览器缓存机制](https://developer.huawei.com/consumer/cn/forum/topic/0202357360658600848)
- [资料](https://cloud.tencent.com/developer/news/588770)
- [山月](https://shanyue.tech/frontend-engineering/http-cache.html)
- [MDN-caching](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)
- [缓存策略：强缓存&协商缓存](https://zhuanlan.zhihu.com/p/111190645)
- [文件指纹](https://www.kancloud.cn/cyyspring/webpack/1836682)

## cookie 和 session 的区别

1.使用方式

cookie 机制：如果不在浏览器中设置过期事件，cookie 被保存在内存中，生命周期随浏览器的关闭而结束，这种 cookie 简称为会话
cookie。如果在浏览器中设置了 cookie 的过期事件，cookie 会被保存在硬盘中，关闭浏览器后，cookie
数据仍然存在，直到过期事件结束才消失。cookie 是服务端发给客户端的特殊信息，cookie 是以文本的方式保存在客户端，每次请求时都带上它

session 机制：当服务器收到请求需要创建 session 对象时，首先会检查客户端请求中是否包含 sessionid。如果有
sessionid，服务器将根据该 id 返回对应 session 对象。如果客户端请求中没有 sessionid，服务器会创建新的 session 对象，并把
sessionid 在本次响应中返回给客户端。通常使用 cookie 方式存储 sessionid 到客户端，在交互中浏览器按照规则将 sessionid
发送给服务器。如果用户禁用 cookie，则要使用 URL 重写，可以通过 response.encodeURL(url) 进行实现；API 对
encodeURL 的结束为，当浏览器支持 cookie 时，url 不做任何处理；当浏览器不支持 cookie 的时候，将会重写 URL 将
sessionid 拼接到访问地址后。

2.保持状态

cookie 保存在浏览器端，session 保存在服务器端

3.存储的大小

单个 cookie 保存的数据不能超过 4kb；session 大小没有限制。

4.存储内容

cookie 只能保存字符串类型，以文本的方式。session 通过类似与 Hashtable 的数据结构来保存，能支持任何类型的对象（session
中可含有多个对象）

5.安全性

session 的安全性大于 cookie。原因如下：

① sessionid 存储在 cookie 中，若要攻破 session 首先要攻破 cookie； ② sessionid 是要有人登录，或者启动
session_start 才会有，所以攻破 cookie 也不一定能得到 sessionid； ③ 第二次启动 session_start 后，前一次的
sessionid 就是失效了，session 过期后，sessionid 也随之失效。 ④ sessionid 是加密的。

综上所述，攻击者必须在短时间内攻破加密的 sessionid，这很难。

6.应用场景

cookie：（1）判断用户是否登录过网站，以便下次登录时能够实现自动登录（或者记住密码）。（2）保存上次登录的事件等信息。（3）保存上次查看的页面
（4）浏览计数

session：

（1）网上商城中的购物车（2）保存用户登录信息（3）将某些数据放入 session 中，供同一用户的不同页面使用（4）防止用户非法登录

### localStorage 和 sessionStorage 的区别

1.生命周期

localStorage 的生命周期是永久的，关闭页面或浏览器之后 localStorage 中的数据也不会消失。localStorage
除非主动删除数据，否则数据永远不会消失。

sessionStorage 的生命周期是仅在当前会话下有效。sessionStorage 引入了一个“浏览器窗口”的概念，sessionStorage
是在同源的窗口中始终存在的数据。只要这个浏览器窗口没有关闭，即使刷新页面或者进入同源另一个页面，数据依然存在。但是 sessionStorage
在关闭了浏览器窗口后就会被销毁。同时独立的打开同一个窗口同一个页面，sessionStorage 也是不一样的。

2.存储大小

localStorage 和 sessionStorage 的存储数据大小一般都是：5MB

3.存储位置

localStorage 和 sessionStorage 都保存在客户端，不与服务器进行交互通信

4.存储内容类型

localStorage 和 sessionStorage 只能存储字符串类型，对于复杂的对象可以使用 ECMAScript 提供的 JSON 对象的
stringify 和 parse 来处理

5.应用场景

localStorage：常用于长期登录（+ 判断用户是否已登录），适合长期保存在本地的数据

sessionStorage：敏感账号一次性登录

### Cookie 中的 httponly 的属性和作用

1.什么是 HttpOnly?

如果 cookie 中设置了 HttpOnly 属性，那么，这样能有效的防止 XSS 攻击，窃取 cookie 内容，这样就增加了 cookie
的安全性，即便是这样，也不要将重要信息存入 cookie。XSS 全称 Cross SiteScript，跨站脚本攻击，是 Web 程序中常见的漏洞，XSS
属于被动式且用于客户端的攻击方式，所以容易被忽略其危害性。其原理是攻击者向有 XSS 漏洞的网站中输入 (传入) 恶意的 HTML
代码，当其它用户浏览该网站时，这段 HTML 代码会自动执行，从而达到攻击的目的。如，盗取用户 Cookie、破坏页面结构、重定向到其它网站等。

2.HttpOnly 的设置样例

response.setHeader("Set-Cookie",
"cookiename=httponlyTest;Path=/;Domain=domainvalue;Max-Age=seconds;HTTPOnly");
例如： //设置 cookie

response.addHeader("Set-Cookie", "uid=112; Path=/; HttpOnly")

//设置多个 cookie

response.addHeader("Set-Cookie", "uid=112; Path=/; HttpOnly");

response.addHeader("Set-Cookie", "timeout=30; Path=/test; HttpOnly");

//设置 https 的 cookie

response.addHeader("Set-Cookie", "uid=112; Path=/; Secure; HttpOnly");

具体参数的含义再次不做阐述，设置完毕后通过 js 脚本是读不到该 cookie 的，但使用如下方式可以读取。

Cookie cookies[]=request.getCookies();

### 参考/资料

- [浏览器存储方案（Cookie、LocalStorage、SessionStorage）](https://github.com/xuexueq/blog/issues/5)

## package.json

### dependencies 与 devDependencies 有何区别

- 对于业务代码，打包时依靠的是 bundle 的依赖分析，与 dev 无关
- 对于库而言，当库被引入时，dev 中的依赖不会被下载

### cjs、es、umd

1. cjs 是动态加载模块，可以直接 require 一个变量

```js
require(`./${a}`);
```

2. esm 是语言上的规范，因此在 Node 及 浏览器中均会支持

- esm 是静态导入，可以在编译期进行 Tree shaking，减少 js 体积
- 如果要动态导入，可以
  ```js
  const ms = await import("https://cdn.skypack.dev/ms@latest");
  ms.default(1000);
  ```
