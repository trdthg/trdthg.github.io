# 基本信息

- 阎明铸 / 男 / 2002
- 本科 / 大二
- 天津工业大学 / 软件工程专业
- Github：[http://github.com/trdthg](http://github.com/trdthg)
- 技术博客：[http://trdthg.github.io](http://trdthg.github.io)
- 手机：17703771269
- 邮箱：trdthg@outlook.com
- QQ：2820047809
- 微信：trdthg

- 求职意向：后端开发 / 研发实习生

# 技能清单

以下为我能够熟练使用的技能

- Web开发：Java、Python。深入了解过异步的实现原理。
- Web框架：熟练使用 Springboot MVC、Flask。
- 前端框架：熟练使用 Vue2 、ElementUI。了解 Webpack 的打包原理，Vue3 响应式原理，Diff 算法等。
- 数据库：MySQL / Oracle。熟练编写多表查询语句。
- 版本管理、CICD：熟练使用 Git，可以使用 Github Action 自动化测试部署。
- 容器技术：熟练编写 Dockerfile，使用 docker-compose 进行项目部署。翻译过 OCI 规范，了解底层 runc 的工作原理。
- Rust 语言：熟练使用 channel，网络编程等。
- 了解过 rpc，serverless，链路追踪等技术。

现在我的主要精力集中在 Rust 语言以及相关应用。除了上述技能之外，我也学习过 Go，Haskell 等语言，分别使用过
Gin（Go），FastAPI，Django（Python），Express（Node.js）等框架进行过小项目开发，能够快速迁移至其他语言。

# 开源项目

- [InnoDB 存储引擎的简单实现](https://github.com/trdthg/rs-sql-db)：参考 InnoDB
  引擎的实现原理，构建了一个简单的 SQL Parser，并实现了一个基于 B+ 树的数据库存储模块
- [Talent Plan 路径5](https://github.com/trdthg/rs-kvstore)：TIDB 开源学习项目。实现了一个日志型
  KV 数据库，具有无锁并发，日志压缩等特性。
- [端口转发工具](https://github.com/trdthg/net-piercer)：基于 channel 和 socket
  网络编程实现了一个迷你 frpc。

以上项目均由 Rust 语言编写实现

# 技术文章

我是 Rust 社区翻译组成员，会定期翻译优秀的技术文章分享到社区。目前主要集中在 Web 和 异步方向。

- [异步 Rust：协作与抢占式调度](https://github.com/studyrs/Rustt/blob/main/Articles/%5B2022-04-12%5D%20异步%20Rust：协作与抢占式调度.md)

下面是所有翻译的地址：

- [文章翻译集合](https://github.com/search?q=repo%3Arustlang-cn%2FRustt+assignee%3Atrdthg+state%3Aclosed&type=Issues&ref=advsearch)
- [视频翻译集合](https://space.bilibili.com/110777624)

# 项目经历

## 奥瑞 CMS 系统

> 参与奥瑞（天津）工业技术有限公司后端管理系统开发 2021-10 ~ 2022-01

在项目中负责主要前端页面开发。实现了基于 Token 的认证授权，角色权限管理，产品管理，产品展示，实时监控等功能。

- 主要技术栈 Vue 全家桶
- 封装高级表单组件，树型组件等。最快半小时即可对接一个页面。
- 使用 TS 封装了原有 Axios 请求相关代码，得到了代码补全，类型补全，提升开发体验。
- 配合后端联调，帮助修复数据库 bug，规范 RESTful API 风格
- 使用 Eslint 规范代码风格，使用 Githook 自动运行测试

## 银行产品秒杀系统

基于微服务架构的产品秒杀系统，由三个模块组成，分别为决策系统、秒杀前台和秒杀后台。

- 技术栈为 Springboot + Redis + RocketMq
- 决策系统负责提供常规的 JWT 登录，角色鉴权、查看商品和获取秒杀链接等 API。对获取秒杀链接实现了 IP、账户、令牌桶多级限流，避免恶意请求。
- 秒杀前台负责处理用户秒杀请求，反馈秒杀结果。通过 MQ 将请求发送至秒杀后台处理
- 秒杀后台利用 Redis 和 高效内存 cache 进行减库存操作，能到达 400 QPS。通过定时任务刷入数据库实现数据持久化。
- 项目通过 docker-compose 进行快速部署。使用 jib 分层构建镜像，压缩镜像大小。

> 非公司项目，用于全国大学生外包创新创业大赛
