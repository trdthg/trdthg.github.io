# 软件架构

## The Clean Architecture
- [Uncle Bob 原文](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
文章不太长，
- 很好的翻译 + 总结
[干净架构最佳实践](https://blog.jaggerwang.net/clean-architecture-in-practice/)

![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202061150405.png)
### 目录结构
下面是一个实例目录(较上面的结构有修改)
```
.
├── adapter # 适配层
│   ├── api # API 交互接口，将用例适配为 Rest API                    # controller
│   ├── dao # 数据库访问，实现 usecase/port/dao 下的接口             # dao_impl
│   └── usecase # 第三方服务，实现 usecase/port/service 下的接口     # usecase_impl
│   ├── cli # 命令行交互接口，将用例适配为命令
│   ├── gui # 图形交互接口，将用例适配为图形界面操作
├── entity # 实体层
│   ├── ...
│   └── user # 用户实体                                    # model
└── usecase # 用例层
    ├── ...
    ├── UserUsecases.java # 用户模块相关用例                       # usecase | dao
    ├── exception # 用例层异常
    └── port # 用例层依赖的外部服务接口定义
```

或者抽出一个domain代替entity和usecase
```
.
├── api
│   ├── user # 包含controller，实现了dao和usecase
│   │   ├── usecase
│   │   ├── dao # 可替换，例如提供mysql，postgra等不同实现
│   │   └── handler
│   └── article
│
└── domain
    └── user # 包含了 model | usecase | dao
    └── article
```

### 参考
- [干净架构最佳实践](https://blog.jaggerwang.net/clean-architecture-in-practice/)
- [go-clean-arch](https://github.com/bxcodec/go-clean-arch)
- [Go工程化(二) 项目目录结构](https://lailin.xyz/post/go-training-week4-project-layout.html)
- [Go工程化 - Project Layout 最佳实践](https://go-kratos.dev/blog/go-project-layout/)

## 关于 DO，DTO，BO等对象的关系图解

### 概念
POJO（Plain Ordinary Java Object）：在本规约中，POJO 专指只有 setter/getter/toString 的简单类，包括 DO/DTO/BO/VO 等。

>【参考】分层领域模型规约：—《阿里巴巴 Java 开发规约》
- DO（Data Object）：与数据库表结构一一对应，通过 DAO 层向上传输数据源对象。
- DTO（Data Transfer Object）：数据传输对象，Service 或 Manager 向外传输的对象。
- BO（Business Object）：业务对象。可以由 Service 层输出的封装业务逻辑的对象。
- Query：数据查询对象，各层接收上层的查询请求。额外规定：【强制】超过 2 个参数的查询封装，禁止使用 Map 类来传输。
- VO（View Object）：显示层对象，通常是 Web 向模板渲染引擎层传输的对象。

### 说人话就是

- DAO：封装对数据库的访问，常规的增删改查（CRUD 操作）都通过 DAO 来实现。

- PO/DO: 跟数据库表是一一对应的，一个 PO/DO 数据是表的一条记录。PO / DO 只是数据的对象，不包含任何的操作。举个例子，学生表是 StudentDO，对学生表的增删改查等操作就是 StudentDAO。

- DTO：
    - 在分布式系统中，系统之间可以通过 DTO 进行数据传输；
    - DTO 也可以在应用内部，核心层和应用层之间传递数据，DTO 只是简单的数据传输，没有业务逻辑的处理；
    - 有的场景，比如数据库表有 10 个字段，id(唯一 id)、version(版本号)，gmt_create(记录创建时间) 这些字段不需要对外提供，所以 DTO 可以只取有含义的业务字段，DO 是和数据库记录的一一映射，但是 DTO 只需要按照业务需要定义需要的字段。

- BO: 包含 PO/DO 和 DAO，有点类似于 domain(entity, usecase)的概念, BO 主要作用是把业务逻辑封装为一个对象。这个对象可以包括一个或多个其它的对象.

- VO: 对应页面显示（web 页面/移动端 H5/Native 视图）的数据对象。
举个例子，DTO 中时间 Date 格式，或者是 yyyyMMddHHmmss 的字符串，但是 VO 需要的是前端展示的格式，需要转成”yyyy 年 MM 月 dd 月"；

### 图解
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202061126981.png)
