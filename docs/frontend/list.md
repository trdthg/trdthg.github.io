# 未整理

## 未整理

- 图片
  - 雪碧图
  - svg(svgo)
  - dataURL
    - 种类
    - img：base64，以及为什么用 base64(减少请求)
    - svg 为什么不使用 64，他是文本格式，img 是二进制
  - 图标字体 (icon-font)
- prefetch 加载优先级低的资源，比如其他路由资源，link 的别的页面等等
- preload 加在当前路由的必要资源
- 图片懒加载 data-src -> src (当视口到达后赋值，加载实现懒加载图片)
- 防抖，节流
- 路由懒加载
- HTTP2, HTTP3/QUIC，HTTP 长连接
- Vue 虚拟 DOM 优化
  - 静态节点
- 禁止选中 | 禁止复制：
  - css: user-select：none
  - js:
    -
      1. document.body.selectstart = (e) => {e.preventDefault()}
    -
      2. document.body.oncopy = (e) => {e.preventDefault()}
- 取消请求 需要一个 controller 和 siginal，把 siginal 传递给请求对象，使用 controller 改变 signal 的状态，fetch:
  AbortController, axios: CancelToken
  [面试官：如何中断已发出去的请求？](https://z.itpub.net/article/detail/38D9DDF9A9CB14B29239BFEFDA2AD193)

# 网站

- [前端知识](http://yulilong.cn/)
- [山月前端面试题](https://q.shanyue.tech/engineering/)
- [Tech Talk](https://www.ttalk.im/index.html)
- [资源](https://github.com/qq449245884/xiaozhi)
- [前端工程化学习笔记](https://www.kancloud.cn/cyyspring/webpack/1986854)
