# Vue

## Vue2.x

### Vue 基础

#### src 引入

```javascript
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>;
```

#### question.html 例子

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<script src="vue.js" type="text/javascript" charset="utf-8"></script>
		<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
	</head>
	<body>
		<div id="watch-example">
		  <p>输入框：
			<input v-model="question" placeholder="sss">
		  </p>
		  <p> 答案： {{ answer }}</p>
           <!--// {{}}语法不能作用在 HTML attribute 上，的但是可以用 [attributeName]
             可以嵌入 JavaScript 表达式-->
		</div>
		<script>
			var vm = new Vue({
				el: "#watch-example",  // 1. 绑定的根节点
				data: {   // 2. 一个组件的 data 选项必须是一个函数  data: function () {return {count: 0}}
					question: '',
					answer: "你还没有输入任何问题",
				},
				watch: {  // 如果 `question` 发生改变，这个函数就会运行
					question: function(newQuestion, oldQuestion) {
						console.log(1);
						this.answer = "等待您输入完成";   // 只有当实例被创建时就已经存在于 data 中的 property 才是响应式的
						setTimeout(function(){}, 1000);
						this.getAnswer();
					}
				},
				methods: {
					getAnswer: function() {
						console.log("正在查询结果")
						if (this.question.indexOf("?") === -1) {
							this.answer = '问题要以？结尾';
						}
						this.answer = "Thinking..."
						var this_ = this;  // axios 为新的 this
						axios.get("https://yesno.wtf/api").then(function (response) {
							this_.answer = "找到结果"
						}).catch(function(error) {
							this_.answer = "没找到结果";
						})
					},
				}
			})
		</script>
	</body>
</html>
```

#### 计算属性

```javascript
computed: {
   fullName:  // 默认为 set，可增加 get
     (set: )function () {
     return this.firstName + ' ' + this.lastName
   }
 }
```

#### v-bind for class

- 对象语法
  ```javascript
  // 1.
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
  data: {
  isActive: true,
  hasError: false
  }
  // 2.
  <div v-bind:class="classObject"></div>
  data: {
  classObject: {
      active: true,
      'text-danger': false
  }
  }
  computed: {
  classObject: function () {
      return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
      }
  }
  }
  ```
- 数组语法

```javascript
// 1.
<div v-bind:class="[activeClass, errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
// 2.
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
// 3.
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

```javascript
```

## VuePress

### 注意

1. 部分字符需转义，例如`<>`

### Home 配置

```yaml
---
home: true
heroImage: logo.png
heroText: Trdthg 的个人主页
# tagline: Hero 副标题
# actionText: 快速上手 →
# actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue 驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2020-present Evan You
---
```

### 自定义主题

1. 新建 .vuepress -> styles -> palette.styl

2. 示例

```styl
// $accentColor =blue//默认主题颜色
// $textColor = #006400//默认字体颜色
$textColor = #000//默认字体颜色
$borderColor = #eaecef//默认边框颜色
$codeBgColor = #282c34//默认背景颜色

//示例修改相关样式 f12 找到需要修改的地方找到对应 class 类拿过来直接用就行了

.sidebar-group.is-sub-group > .sidebar-heading:not(.clickable){
  opacity :1
}

.theme-container {
  background-image: url(https://www.10wallpaper.com/wallpaper/1920x1200/1909/2019_Red_Blue_Abstract_Design_Desktop_1920x1200.jpg);
  background-repeat:no-repeat;
  background-attachment:fixed;
}
.page {
  padding-top: 5rem;
  padding-left: 15rem;
}
.sidebar {
  width: 15rem;
  opacity:0.5;
}
.theme-default-content {
  top: 200px;
  background-color: #FFFAFA;
}
.content__default {
    // background-color: #000;
    top: 200px;
    border-radius: 10px;
}
```

### nav && sidebar

```js
sidebar: {
  '/java/': ['java', 'sourceread', 'spring', 'springboot', 'stuffs'],
  '/js/': ['js', 'vue'],
  '/python/': ['python'],
  '/rust/': ['rust', 'lists'],
  '/other/': ['other', 'script', 'datastructure'],
  '/': [''] //不能放在数组第一个，否则会导致右侧栏无法使用
}, // 侧边栏配置
nav:[ // 导航栏配置
  {text: 'Java',  link: '/java/java'},
  {text: '前端', link: '/js/js' },
  {text: 'Python', link: '/python/python'},
  {text: 'Rust', link: '/rust/rust' },
  {text: '其他', link: '/other/other'},
  {text: 'Github', link: 'https://github.com/trdthg'}
],
```

### 更新时间

```js
plugins: ['@vuepress/last-updated'],
themeConfig: {
  lastUpdated: 'Last Updated', // string | boolean
}
```

### 待续...
