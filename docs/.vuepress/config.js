module.exports = {
  title: 'Trdthg\'s blog',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: 'https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202022217241.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  description: '我的个人网站',
  base: '/', // 这是部署到 github 相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    logo: 'https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202022217241.jpg',
    navbar: [ // 导航栏配置
      {
        text: 'Rust 🦀', children: [
          { text: '语言特性', link: '/rust/rust' },
          { text: 'print 宏详解', link: '/rust/print_into_detail' },
          { text: 'channel 源码剖析 doing', link: '/rust/rs_channel' },
          { text: 'Wasm', link: '/rust/wasm' },
          { text: 'Rust 链表', link: '/rust/lists' },
          { text: 'Go 学习笔记', link: '/rust/go' },
        ]
      },
      {
        text: '魔法 🔮', children: [
          { text: 'Haskell 学习笔记', link: '/magic/haskell' },
          { text: '文件描述符', link: '/magic/fd' },
          { text: 'IO 多路复用', link: '/magic/linuxIO' },
          { text: '原子操作/内存顺序', link: '/magic/memory_ordering' },
          { text: '协程异步思考', link: '/magic/async' },
          { text: '软件架构', link: '/magic/software_arch' },
          { text: 'CI/CD', link: '/magic/cicd' },
        ]
      },
      {
        text: '杂文 🥗', children: [
          { text: '折腾 i3wm', link: '/articles/i3wm' },
          { text: '(译) 尾部延迟', link: '/articles/tail_latency' },
          { text: '(译) 查询引擎', link: '/articles/search_engine' },
        ]
      },
      {
        text: '学习笔记 📚', children: [
          {
            text: '前端相关', children: [
              { text: '虚拟 DOM', link: '/frontend/vdom' },
              { text: 'Js 进阶', link: '/frontend/js_advanced' },
              { text: '资料', link: '/frontend/list' },
              { text: 'Vue', link: '/frontend/vue' },
              { text: 'HTTP 相关', link: '/frontend/http' },
              { text: 'Flutter', link: '/frontend/flutter' },
            ]
          },
          {
            text: 'Python 相关', children: [
              { text: '总览', link: '/other/python' }
            ]
          },
          {
            text: 'Java 相关', children: [
              { text: '基础知识', link: '/java/java' },
              { text: '部分源码', link: '/java/sourceread' },
              { text: 'Spring 框架', link: '/java/spring' },
              { text: '常用工具', link: '/java/springboot' },
            ]
          },
        ]
      },
      {
        text: '小玩具 🎮', children: [
          { text: 'Mini-Vue', link: '/projects/mini_vue' },
          { text: '打包器', link: '/projects/mini_bundle' },
          { text: '异步运行时', link: '/projects/mini_tokio' },
        ]
      },
      {
        text: 'IO Club ⚽', children: [
          {
            text: '分享', children: [
              { text: '关于数据库与 B+ 树', link: '/ioclub/share_1' },
            ]
          },
          {
            text: '授课', children: [
              { text: '后端 1', link: '/ioclub/backend_1' },
              { text: '后端 2', link: '/ioclub/backend_2' },
              { text: '后端 3', link: '/ioclub/backend_3' },
              { text: '后端 4', link: '/ioclub/backend_4' },
            ]
          },
        ]
      },
      {
        text: '资料库 📦', children: [
          { text: '大数据', link: '/other/hadoop' },
          { text: '脚本', link: '/other/script' },
          { text: '数据结构', link: '/other/datastructure' },
          { text: 'Vim', link: '/other/vim' },
          { text: 'Git', link: '/other/git' },
          { text: 'Docker', link: '/other/docker' },
          { text: '性能监测工具', link: '/other/analyze' },
          { text: 'OCI 规范', link: '/other/oci' },
          { text: 'OAuth2.0', link: '/other/oauth2' },
        ]
      },
    ],
    darkMode: true,
    logoDark: 'https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202201292325599.png',
    toggleDarkMode: '切换夜间',
    repo: 'https://github.com/trdthg',
    lastUpdated: true,
    // sidebarDepth: 4, // 侧边栏显示 2 级
  }
};
