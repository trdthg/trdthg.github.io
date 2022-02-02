(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{415:function(r,t,e){"use strict";e.r(t);var a=e(56),s=Object(a.a)({},(function(){var r=this,t=r.$createElement,e=r._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":r.$parent.slotKey}},[e("h1",{attrs:{id:"b-树以及在数据库中的应用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#b-树以及在数据库中的应用"}},[r._v("#")]),r._v(" B+树以及在数据库中的应用")]),r._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"#b%E6%A0%91%E4%BB%A5%E5%8F%8A%E5%9C%A8%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%AD%E7%9A%84%E5%BA%94%E7%94%A8"}},[r._v("B+树以及在数据库中的应用")]),r._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"#%E4%BB%80%E4%B9%88%E6%98%AF%E6%95%B0%E6%8D%AE%E5%BA%93"}},[r._v("什么是数据库")]),r._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"#%E6%8A%80%E6%9C%AF%E5%88%9D%E8%A1%B7"}},[r._v("技术初衷")])]),r._v(" "),e("li",[e("a",{attrs:{href:"#%E6%95%B0%E6%8D%AE%E5%BA%93%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F"}},[r._v("数据库管理系统")])]),r._v(" "),e("li",[e("a",{attrs:{href:"#%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84%E5%88%86%E7%B1%BB"}},[r._v("数据库的分类")]),r._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"#%E5%85%B3%E7%B3%BB%E6%95%B0%E6%8D%AE%E5%BA%93"}},[r._v("关系数据库")])]),r._v(" "),e("li",[e("a",{attrs:{href:"#%E9%9D%9E%E5%85%B3%E7%B3%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93nosql"}},[r._v("非关系型数据库（NoSQL）")])])])])])]),r._v(" "),e("li",[e("a",{attrs:{href:"#%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%BA%93"}},[r._v("如何实现一个数据库？")]),r._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"#%E4%BD%BF%E7%94%A8%E5%8D%95%E6%96%87%E4%BB%B6%E5%AD%98%E5%82%A8%E7%9A%84%E7%BC%BA%E7%82%B9"}},[r._v("使用单文件存储的缺点")])]),r._v(" "),e("li",[e("a",{attrs:{href:"#%E7%9B%AE%E6%A0%87"}},[r._v("目标")])])])]),r._v(" "),e("li",[e("a",{attrs:{href:"#%E5%AE%9E%E7%8E%B0%E6%80%9D%E8%B7%AF"}},[r._v("实现思路")]),r._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"#%E4%BD%BF%E7%94%A8%E6%95%B0%E7%BB%84%E5%AD%98%E5%82%A8"}},[r._v("使用数组存储")])]),r._v(" "),e("li",[e("a",{attrs:{href:"#%E4%BD%BF%E7%94%A8%E6%A0%91%E5%AD%98%E5%82%A8"}},[r._v("使用树存储")]),r._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"#%E4%BA%8C%E5%8F%89%E6%A0%91"}},[r._v("二叉树")])]),r._v(" "),e("li",[e("a",{attrs:{href:"#%E6%9F%A5%E8%AF%A2%E7%9A%84%E8%80%97%E6%97%B6%E5%9C%A8%E5%93%AA%E9%87%8C"}},[r._v("查询的耗时在哪里")])]),r._v(" "),e("li",[e("a",{attrs:{href:"#%E5%A4%9A%E5%8F%89%E6%A0%91"}},[r._v("多叉树")]),r._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"#b%E6%A0%91"}},[r._v("B树")])]),r._v(" "),e("li",[e("a",{attrs:{href:"#b%E6%A0%91-1"}},[r._v("B+树")])])])])])])])])])])]),r._v(" "),e("h2",{attrs:{id:"什么是数据库"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#什么是数据库"}},[r._v("#")]),r._v(" 什么是数据库")]),r._v(" "),e("p",[e("strong",[r._v("数据库")]),r._v("，又称为数据管理系统，简而言之可视为"),e("a",{attrs:{href:"https://zh.wikipedia.org/w/index.php?title=%E9%9B%BB%E5%AD%90%E5%8C%96&action=edit&redlink=1",target:"_blank",rel:"noopener noreferrer"}},[r._v("电子化"),e("OutboundLink")],1),r._v("的"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E6%A1%A3%E6%A1%88%E6%9F%9C",target:"_blank",rel:"noopener noreferrer"}},[r._v("文件柜"),e("OutboundLink")],1),r._v("——存储电子"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E6%AA%94%E6%A1%88",target:"_blank",rel:"noopener noreferrer"}},[r._v("文件"),e("OutboundLink")],1),r._v("的处所，用户可以对"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E6%AA%94%E6%A1%88",target:"_blank",rel:"noopener noreferrer"}},[r._v("文件"),e("OutboundLink")],1),r._v("中的资料运行新增、截取、更新、删除等操作["),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE%E5%BA%93#cite_note-1",target:"_blank",rel:"noopener noreferrer"}},[r._v("1]"),e("OutboundLink")],1),r._v("。")]),r._v(" "),e("h3",{attrs:{id:"技术初衷"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#技术初衷"}},[r._v("#")]),r._v(" 技术初衷")]),r._v(" "),e("p",[r._v("在"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F",target:"_blank",rel:"noopener noreferrer"}},[r._v("操作系统"),e("OutboundLink")],1),r._v("出现之后，随着"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E8%AE%A1%E7%AE%97%E6%9C%BA",target:"_blank",rel:"noopener noreferrer"}},[r._v("计算机"),e("OutboundLink")],1),r._v("应用范围的扩大、需要处理的"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE",target:"_blank",rel:"noopener noreferrer"}},[r._v("数据"),e("OutboundLink")],1),r._v("迅速膨胀。最初，数据与"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E7%A8%8B%E5%BA%8F",target:"_blank",rel:"noopener noreferrer"}},[r._v("程序"),e("OutboundLink")],1),r._v("一样，以简单的文件作为主要存储形式。以这种方式组织的数据在逻辑上更简单，但"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E5%8F%AF%E6%89%A9%E5%B1%95%E6%80%A7",target:"_blank",rel:"noopener noreferrer"}},[r._v("可扩展性"),e("OutboundLink")],1),r._v("差，访问这种数据的程序需要了解数据的具体组织格式。当系统数据量大或者用户访问量大时，应用程序还需要解决数据的完整性、一致性以及安全性等一系列的问题。因此，必须开发出一种"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E7%B3%BB%E7%BB%9F%E8%BD%AF%E4%BB%B6",target:"_blank",rel:"noopener noreferrer"}},[r._v("系统软件"),e("OutboundLink")],1),r._v("，它应该能够像操作系统屏蔽了硬件访问复杂性那样，屏蔽数据访问的复杂性。由此产生了数据管理系统，即数据库。")]),r._v(" "),e("h3",{attrs:{id:"数据库管理系统"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#数据库管理系统"}},[r._v("#")]),r._v(" 数据库管理系统")]),r._v(" "),e("p",[r._v("主条目："),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE%E5%BA%93%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F",target:"_blank",rel:"noopener noreferrer"}},[r._v("数据库管理系统"),e("OutboundLink")],1)]),r._v(" "),e("p",[e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE%E5%BA%93%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F",target:"_blank",rel:"noopener noreferrer"}},[r._v("数据库管理系统"),e("OutboundLink")],1),r._v("（英语：Database Management System，简称"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/DBMS",target:"_blank",rel:"noopener noreferrer"}},[r._v("DBMS"),e("OutboundLink")],1),r._v("）是为管理"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E8%B3%87%E6%96%99%E5%BA%AB",target:"_blank",rel:"noopener noreferrer"}},[r._v("数据库"),e("OutboundLink")],1),r._v("而设计的电脑"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E8%BB%9F%E9%AB%94",target:"_blank",rel:"noopener noreferrer"}},[r._v("软件"),e("OutboundLink")],1),r._v("系统，一般具有存储、截取、安全保障、备份等基础功能。数据库管理系统可以依据它所支持的"),e("a",{attrs:{href:"https://zh.wikipedia.org/w/index.php?title=%E8%B3%87%E6%96%99%E5%BA%AB%E6%A8%A1%E5%9E%8B&action=edit&redlink=1",target:"_blank",rel:"noopener noreferrer"}},[r._v("数据库模型"),e("OutboundLink")],1),r._v("来作分类，例如"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E9%97%9C%E8%81%AF%E6%A8%A1%E5%9E%8B",target:"_blank",rel:"noopener noreferrer"}},[r._v("关系式"),e("OutboundLink")],1),r._v("、"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/XML",target:"_blank",rel:"noopener noreferrer"}},[r._v("XML"),e("OutboundLink")],1),r._v("；或依据所支持的电脑类型来作分类，例如服务器聚类、移动电话；或依据所用查询语言来作分类，例如"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/SQL",target:"_blank",rel:"noopener noreferrer"}},[r._v("SQL"),e("OutboundLink")],1),r._v("、"),e("a",{attrs:{href:"https://zh.wikipedia.org/w/index.php?title=XQuery&action=edit&redlink=1",target:"_blank",rel:"noopener noreferrer"}},[r._v("XQuery"),e("OutboundLink")],1),r._v("；或依据性能冲量重点来作分类，例如最大规模、最高运行速度；亦或其他的分类方式。不论使用哪种分类方式，一些DBMS能够跨类别，例如，同时支持多种查询语言。")]),r._v(" "),e("h3",{attrs:{id:"数据库的分类"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#数据库的分类"}},[r._v("#")]),r._v(" 数据库的分类")]),r._v(" "),e("h4",{attrs:{id:"关系数据库"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#关系数据库"}},[r._v("#")]),r._v(" 关系数据库")]),r._v(" "),e("ul",[e("li",[e("p",[e("a",{attrs:{href:"https://www.mysql.com/cn/",target:"_blank",rel:"noopener noreferrer"}},[r._v("MySQL"),e("OutboundLink")],1)])]),r._v(" "),e("li",[e("p",[e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/PostgreSQL",target:"_blank",rel:"noopener noreferrer"}},[r._v("PostgreSQL"),e("OutboundLink")],1)])]),r._v(" "),e("li",[e("p",[e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/Microsoft_Access",target:"_blank",rel:"noopener noreferrer"}},[r._v("Microsoft Access"),e("OutboundLink")],1)])]),r._v(" "),e("li",[e("p",[e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/Microsoft_SQL_Server",target:"_blank",rel:"noopener noreferrer"}},[r._v("Microsoft SQL Server"),e("OutboundLink")],1)])]),r._v(" "),e("li",[e("p",[e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/Oracle%E6%95%B0%E6%8D%AE%E5%BA%93",target:"_blank",rel:"noopener noreferrer"}},[r._v("Oracle数据库"),e("OutboundLink")],1)]),r._v(" "),e("p",[r._v("类似于excel表格, 所有数据以表格的形式按行或按列存储")])])]),r._v(" "),e("p",[e("img",{attrs:{src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021248061.png",alt:""}})]),r._v(" "),e("h4",{attrs:{id:"非关系型数据库-nosql"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#非关系型数据库-nosql"}},[r._v("#")]),r._v(" 非关系型数据库（"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/NoSQL",target:"_blank",rel:"noopener noreferrer"}},[r._v("NoSQL"),e("OutboundLink")],1),r._v("）")]),r._v(" "),e("ul",[e("li",[e("p",[e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/MongoDB",target:"_blank",rel:"noopener noreferrer"}},[r._v("MongoDB"),e("OutboundLink")],1)])]),r._v(" "),e("li",[e("p",[e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/Redis",target:"_blank",rel:"noopener noreferrer"}},[r._v("Redis"),e("OutboundLink")],1)])])]),r._v(" "),e("p",[e("img",{attrs:{src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021249305.png",alt:""}})]),r._v(" "),e("h2",{attrs:{id:"如何实现一个数据库"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#如何实现一个数据库"}},[r._v("#")]),r._v(" 如何实现一个数据库？")]),r._v(" "),e("h3",{attrs:{id:"使用单文件存储的缺点"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用单文件存储的缺点"}},[r._v("#")]),r._v(" 使用单文件存储的缺点")]),r._v(" "),e("ol",[e("li",[r._v("单个文件存储数据效率低, 读取速度慢")]),r._v(" "),e("li",[r._v("如果文件过大(几个G), 就不能直接把整个文件读入内存再进行操作 , 即使能够读入内存, 那也是完全没有必要的, 我们需要的数据可能只有一行, 想要找到这一行就把所有数据全部读取是很浪费的")]),r._v(" "),e("li",[r._v("如果对文件的修改速度过快, 可能会导致文件'损坏'")])]),r._v(" "),e("h3",{attrs:{id:"目标"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#目标"}},[r._v("#")]),r._v(" 目标")]),r._v(" "),e("ol",[e("li",[r._v("加速文件读取速度")]),r._v(" "),e("li",[r._v("能够实现分快读取")]),r._v(" "),e("li",[r._v("能够在修改文件时, 保证数据的完整性(先不提)")])]),r._v(" "),e("h2",{attrs:{id:"实现思路"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实现思路"}},[r._v("#")]),r._v(" 实现思路")]),r._v(" "),e("h3",{attrs:{id:"使用数组存储"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用数组存储"}},[r._v("#")]),r._v(" 使用数组存储")]),r._v(" "),e("p",[e("img",{attrs:{src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021249677.png",alt:""}}),r._v(" "),e("strong",[r._v("优点")])]),r._v(" "),e("ol",[e("li",[r._v("存储在内存中, 数据量少的时候尚且可以,")]),r._v(" "),e("li",[r._v("可以通过索引(下标)访问数据元素, 速度最快")])]),r._v(" "),e("p",[e("strong",[r._v("缺点")])]),r._v(" "),e("ol",[e("li",[e("p",[r._v("当每个元素变大时, 这种方式就会占用较大的内存")]),r._v(" "),e("p",[r._v("(依次为 学号, 姓名, 成绩, 按照学号排序)")])])]),r._v(" "),e("p",[e("strong",[r._v("优化")])]),r._v(" "),e("p",[r._v("结合之前二分的方法, 我们尝试将数组中学号最小, 最大, 和位于中间的元素提取出来")]),r._v(" "),e("p",[e("img",{attrs:{src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021250084.png",alt:""}}),r._v("\n当我们需要查询学号为3的学生时, 我们只需要先读取上一层的3个元素, 在 知道 1 < 3 < 5后就只需要在数组索引从1到5中查询学号为3的元素了")]),r._v(" "),e("p",[e("strong",[r._v("更大更多")])]),r._v(" "),e("p",[e("img",{attrs:{src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021252950.png",alt:""}}),r._v("\n这是一种实现思路, 不过不是我们讲的重点, 只是为了拓展一下大家的事业")]),r._v(" "),e("p",[r._v("(这个东西叫跳表, 可以实现对链表的二分, 感兴趣的自己可以去查, 我没亲手实现过)")]),r._v(" "),e("p",[e("strong",[r._v("结果")])]),r._v(" "),e("p",[r._v("实现了查询速度的优化, 但是如果每个节点都单独分一个文件, 硬盘对于存储大量小文件是低效的(这里不展开讲), 不适和在硬盘中存储")]),r._v(" "),e("h3",{attrs:{id:"使用树存储"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用树存储"}},[r._v("#")]),r._v(" 使用树存储")]),r._v(" "),e("h4",{attrs:{id:"二叉树"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#二叉树"}},[r._v("#")]),r._v(" 二叉树")]),r._v(" "),e("p",[e("img",{attrs:{src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021252234.png",alt:""}}),r._v("\n树的任意节点的左子树的节点对应的值都比右子树的值小, 二叉查找树相比于其他数据结构的优势在于查找、插入的"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6",target:"_blank",rel:"noopener noreferrer"}},[r._v("时间复杂度"),e("OutboundLink")],1),r._v("较低。二叉查找树是基础性数据结构，用于构建更为抽象的数据结构，如"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E9%9B%86%E5%90%88_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6)",target:"_blank",rel:"noopener noreferrer"}},[r._v("集合"),e("OutboundLink")],1),r._v("、"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E5%A4%9A%E9%87%8D%E9%9B%86",target:"_blank",rel:"noopener noreferrer"}},[r._v("多重集"),e("OutboundLink")],1),r._v("、"),e("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E5%85%B3%E8%81%94%E6%95%B0%E7%BB%84",target:"_blank",rel:"noopener noreferrer"}},[r._v("关联数组"),e("OutboundLink")],1),r._v("等。")]),r._v(" "),e("p",[r._v("我们分析一下对于使用二叉树进行查询需要的次数")]),r._v(" "),e("div",{staticClass:"language-python extra-class"},[e("pre",{pre:!0,attrs:{class:"language-python"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[r._v("# 1. '**'在python中表示次方, print(3**2)")]),r._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[r._v("# 2. 数字中间的下划线会被忽视, 作用只是为了看数字时更方便")]),r._v("\n\n"),e("span",{pre:!0,attrs:{class:"token number"}},[r._v("2")]),e("span",{pre:!0,attrs:{class:"token operator"}},[r._v("**")]),e("span",{pre:!0,attrs:{class:"token number"}},[r._v("27")]),r._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[r._v("=")]),r._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[r._v("134_000_000")]),r._v("\n"),e("span",{pre:!0,attrs:{class:"token number"}},[r._v("2")]),e("span",{pre:!0,attrs:{class:"token operator"}},[r._v("**")]),e("span",{pre:!0,attrs:{class:"token number"}},[r._v("26")]),r._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[r._v("=")]),r._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[r._v("67_000_000")]),r._v("\n"),e("span",{pre:!0,attrs:{class:"token number"}},[r._v("2")]),e("span",{pre:!0,attrs:{class:"token operator"}},[r._v("**")]),e("span",{pre:!0,attrs:{class:"token number"}},[r._v("25")]),r._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[r._v("=")]),r._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[r._v("34_000_000")]),r._v("\n"),e("span",{pre:!0,attrs:{class:"token number"}},[r._v("2")]),e("span",{pre:!0,attrs:{class:"token operator"}},[r._v("**")]),e("span",{pre:!0,attrs:{class:"token number"}},[r._v("24")]),r._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[r._v("=")]),r._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[r._v("17_000_000")]),r._v("\n")])])]),e("p",[r._v("从1亿数据中查询最大只需要27次, 效果非常好, 但是这还远远不够")]),r._v(" "),e("p",[r._v("让我们继续分析")]),r._v(" "),e("h4",{attrs:{id:"查询的耗时在哪里"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查询的耗时在哪里"}},[r._v("#")]),r._v(" 查询的耗时在哪里")]),r._v(" "),e("p",[r._v("对于二叉树")]),r._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[r._v(" 从磁盘中读取一个节点\n   |\n 得到节点内存储的学号\n   |\n 比较该节点的学号和我们需要查询的学号\n   |\n找到左子树或右子树在硬盘中的位置\n   |\n  进行下一次\n")])])]),e("p",[r._v("我们这里先讨论机械硬盘的条件下")]),r._v(" "),e("p",[r._v("下面就是一张机械硬盘的图片, 最重要的就是磁头和磁盘两个结构, 每次硬盘把文件读取到内存中, 都需要先把磁头旋转到对应的位置, 才能开始读取存储在文件中的数据")]),r._v(" "),e("p",[e("img",{attrs:{src:"https://bkimg.cdn.bcebos.com/pic/32fa828ba61ea8d3c3793017940a304e251f584d?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5/format,f_auto",alt:"???"}})]),r._v(" "),e("p",[r._v("因为从硬盘读取数据的速度远远低于比较节点的速度, 所以我们可以尽量降低二叉树的深度(即降低检索数据的次数),")]),r._v(" "),e("h4",{attrs:{id:"多叉树"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#多叉树"}},[r._v("#")]),r._v(" 多叉树")]),r._v(" "),e("h5",{attrs:{id:"b树"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#b树"}},[r._v("#")]),r._v(" B树")]),r._v(" "),e("p",[e("img",{attrs:{src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021253576.png",alt:""}})]),r._v(" "),e("p",[r._v("假如我们一个节点可以存储更多分支, 我们就能用更少的次数查到相应的数据节点, 这本身是一种很好的结构, 已经能够解决一些问题, PostgreSql就提供了B树作为存储结构")]),r._v(" "),e("p",[e("img",{attrs:{src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021254278.png",alt:""}}),r._v("\n现在每个节点存储了多个元素数据, 每个元素中都包含了一个学生的信息,")]),r._v(" "),e("p",[r._v("每次查询时, 如果学号匹配我们就直接返回结果, 如果不匹配, 就继续深入下一层")]),r._v(" "),e("p",[e("strong",[r._v("缺点")])]),r._v(" "),e("p",[r._v("但是在真实环境下, 一个节点不可能只有一个序号, 我们现在把图扩充下")]),r._v(" "),e("p",[r._v("存储的信息越多, 单个元素就越大, 我们能读取到内存中的元素个数就会变少, 树的分叉就不会太多为了让分叉足够多, 我们引入B+树")]),r._v(" "),e("h5",{attrs:{id:"b-树"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#b-树"}},[r._v("#")]),r._v(" B+树")]),r._v(" "),e("p",[r._v("为了能够让一个节点存储更多的元素, 我们决定抛弃节点中存储的无用的信息, 之保留学号这一项数据, 然后之在叶子节点(就是最后一层的节点)存储完整的节点\n"),e("img",{attrs:{src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021254900.png",alt:""}})]),r._v(" "),e("p",[r._v("现在我们得到最好的结构了, 我们可以一次加载一个节点, 每个节点可能有几百几千个学号, 假如有100个分支, 两层数据就能够存储 100 * 100 = 10_000个数据, 在10000个人中只用两次就能查到我们需要的数据, 想对于二叉树2**13 = 8192需要大概13次, 我们现在磁盘只需要旋转2 + 1次就能读到数据, 这是一个飞跃.")]),r._v(" "),e("p",[e("strong",[r._v("小问题")])]),r._v(" "),e("p",[r._v("学号为10, 20, 30的学生的数据去哪了?  没了?\n"),e("img",{attrs:{src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021254452.png",alt:""}})]),r._v(" "),e("p",[r._v("比如我们现在需要查询学号为10的学生的数据, 我们在在查询第一层时已经找到了10, 但是依然不能停, 需要继续想下查找, 知道找到最后一层节点为止")]),r._v(" "),e("p",[e("strong",[r._v("小拓展")])]),r._v(" "),e("p",[r._v("把最后一层的数据串起来, 我们就能实现区间查询, 比如查询学好为12到22的所有学生的数据")]),r._v(" "),e("p",[e("img",{attrs:{src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021255491.png",alt:""}})]),r._v(" "),e("p",[e("strong",[r._v("一个demo")]),r._v(" "),e("img",{attrs:{src:"https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021255706.png",alt:""}})]),r._v(" "),e("p",[e("strong",[r._v("快要忘记的固态硬盘")])]),r._v(" "),e("p",[r._v("如果你用的是固态硬盘, 那么B+树......卒")])])}),[],!1,null,null,null);t.default=s.exports}}]);