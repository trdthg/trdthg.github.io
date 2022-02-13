module.exports = {
    title: 'Trdthg\'s blog',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'icon', href: 'https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202022217241.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    description: '我的个人网站',
    base: '/', // 这是部署到github相关的配置
    markdown: {
      lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
      logo: 'https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202022217241.jpg',
      navbar:[ // 导航栏配置
        {text: '学习笔记 📚', children: [
          {text: '前端相关', children: [
            {text: '虚拟DOM', link: '/js/vdom'},
            {text: 'js进阶', link: '/js/js_advanced'},
            {text: '资料', link: '/js/list'},
            {text: 'vue', link: '/js/vue'},
            {text: 'HTTP相关', link: '/js/http'},
          ]},
          {text: 'python相关', children: [
            {text: '总览', link: '/other/python'}
          ]},
          {text: 'java相关', children: [
            {text: '基础知识', link: '/java/java'},
            {text: '部分源码', link: '/java/sourceread'},
            {text: 'Spring框架', link: '/java/spring'},
            {text: '常用工具', link: '/java/springboot'},
          ]},
        ]},
        {text: '小项目 💪', children: [
          {text: 'mini-vue', link: '/projects/mini_vue'},
          {text: '语言特性', link: '/projects/mini_bundle'},
        ] },
        {text: 'Rust 🦀', children: [
          {text: '语言特性', link: '/rust/rust'},
          {text: 'dioxus前端', link: '/rust/dioxus'},
          {text: 'Wasm 体验', link: '/rust/wasm'},
          {text: '实现链表', link: '/rust/lists'},
        ] },
        {text: '魔法 🔮', children: [
          {text: 'haskell学习笔记', link: '/magic/haskell'},
          {text: '文件描述符', link: '/magic/fd'},
          {text: 'IO 多路复用', link: '/magic/linuxIO'},
          {text: '原子操作/内存顺序', link: '/magic/memory_ordering'},
          {text: '软件架构', link: '/magic/software_arch'},
          {text: 'CI/CD', link: '/magic/cicd'},
        ]},
        {text: 'IO Club ⚽', children: [
          {text: '分享', children: [
            {text: '关于数据库与B+树', link: '/ioclub/share_1'},
          ]},
          {text: '授课', children: [
            { text: '后端1', link: '/ioclub/backend_1'},
            { text: '后端2', link: '/ioclub/backend_2'},
            { text: '后端3', link: '/ioclub/backend_3'},
            { text: '后端4', link: '/ioclub/backend_4'},
          ]},
        ]},
        {text: '其他 📦', children: [
          {text: 'hadoop', link: '/other/hadoop'},
          {text: '脚本', link: '/other/script'},
          {text: '数据结构', link: '/other/datastructure'},
          {text: 'vim', link: '/other/vim'},
          {text: 'git', link: '/other/git'},
          {text: 'docker', link: '/other/docker'},
          {text: 'oauth2学习', link: '/other/oauth2'},
        ]},
      ],
      darkMode: true,
      logoDark: 'https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202201292325599.png',
      toggleDarkMode: '切换夜间',
      repo: 'https://github.com/trdthg',
      lastUpdated: true,
      sidebarDepth: 3, // 侧边栏显示2级
    }
  };
