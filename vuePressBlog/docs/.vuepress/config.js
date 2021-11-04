module.exports = {
    title: 'Trdthg\'s blog',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'icon', href: 'logo.png' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    description: '我的个人网站',
    base: '/', // 这是部署到github相关的配置
    markdown: {
      lineNumbers: false // 代码块显示行号
    },
    plugins: ['@vuepress/last-updated'],
    themeConfig: {
      lastUpdated: 'Last Updated', // string | boolean
      sidebarDepth: 3, // 侧边栏显示2级
      sidebar: {
        '/java/': ['java', 'sourceread', 'spring', 'springboot', 'stuffs'],
        '/js/': ['js', 'vue'],
        '/python/': ['python'],
        '/rust/': ['wasm', 'rust', 'lists'],
		    '/magic/': ['haskell', 'fd'],
        '/ioclub/': ['oauth2', 'share_1', 'backend_1', 'backend_2', 'backend_3'],
        '/other/': ['script', 'other', 'datastructure'],
        '/': [''] //不能放在数组第一个，否则会导致右侧栏无法使用
      }, // 侧边栏配置
      nav:[ // 导航栏配置
        {text: 'Java',  link: '/java/java'},
        {text: '前端', link: '/js/vue' },
        {text: 'Python', link: '/python/python'},
        {text: 'Rust', link: '/rust/wasm' },
        {text: '魔法', link: '/magic/haskell' },
        {text: 'IO Club', link: '/ioclub/oauth2' },
        {text: '其他', link: '/other/other'},
        {text: 'Github', link: 'https://github.com/trdthg'}
      ],
    }
  };
