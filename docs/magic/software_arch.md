# 软件架构

## 六边形架构

六边形架构，是一种软件设计模式。依照这种架构创建的程序，能够在没有 UI
或数据库的情况下正常工作。所以即使没有数据库你依然可以进行开发和运行自动化测试，而且无需其他用户参与。

### 端口与适配器

六边形架构也叫做端口与适配器架构。

![](https://alistair.cockburn.us/wp-content/uploads/2018/02/Hexagonal-architecture-complex-example.gif)

什么是端口？

端口指的是六边形的边，属于应用程序的内部，是我们应用程序的入口和出口。它定义了一个接口，表示设备如何使用我们的用例。在 Rust 里就是由一个
Trait，以及一些 DTO 组成

什么是适配器？

适配器围绕着端口编写，能够将输入转化为符合端口的类型，并把输入转化为用用程序内部的方法调用。换句话说就是 `controller` 或者是命令行一条命令处理器。

当任何外部设备 (比如：WEB，APP，终端，测试...)
想要访问输入端口时，首先这个输入会被该设备对应的输入适配器，转化为符合要求的可用的方法调用，或者是消息，然后再传递给我们的应用程序。

当我们的应用程序需要向外发送数据时，首先它会把数据通过输出端口传递给输出适配器，然后再传递给输出对象(比如: 数据库，mock，API，邮件，消息队列...)

因此我们的应用程序外部是完全隔离的。

### 应用程序核心

使用六边形架构之后，我们应用程序的核心部分通常被称作域，域中有三个核概念：

- 实体 (Entities)：只是简单的定义了对象。
- 交互器 (Interactors)：实现复杂的业务逻辑，在本文里我们会将其称为用例 Usecase。
- 存储库 (Repositories)：只定义了操作实体的方法。

### 优点

在传统的分层架构中，只能从上往下调用。

而现在我们把接口保留在域中，域不再依赖外部的外部实现。保证了外部设备是可替换的。当业务逻辑需要用到数据存储时，直接调用抽象接口即可。

### 参考

- [Hexagonal architecture in Rust](https://alexis-lozano.com/hexagonal-architecture-in-rust-1/)

## 干净架构

_The Clean Architecture_

- [Uncle Bob 原文](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
  文章不太长，
- 很好的翻译 + 总结

### 参考

[干净架构最佳实践](https://blog.jaggerwang.net/clean-architecture-in-practice/)
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202061150405.png)

### 分层架构

起始和上面的差不多，思路都一样，三层架构基本对应

![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202061222034.png)

- User Interface层 ：
  系统对外暴露的接口层(API)层。主要功能是接收外部的调用，调用底层的服务，然后将底层服务返回的数据返回给调用者。这一层只包含对外的DTO对象的声明，接口声明，DTO对象转换，日志打印等。不能包含因为逻辑。
- Application层：对应到系统用例层。它描述了整个系统的全部功能，它是对底层领域层对象的组织和编排，通过对领域层对象的编排，实现了用例。Application层不实现业务逻辑，它只对底层的领域对象进行编排以实现用例。一般在这一层里使用仓储对数据进行读取和保存。事务处理一般也在这一层。这一层主要包括Service，用来调用Domain层的对象完成一个业务。访问第三方的远程调用一般也是在这一层。
- Domain层：核心业务逻辑层。包含实体、值对象和领域服务等领域对象等。实现所有的业务逻辑。业务逻辑就是存在于问题域即业务领域中的实体、概念、规则和策略等，与具体的实现技术无关，主要包含：1）业务实体（领域对象）。2）业务规则：例如借记卡取款数额不得超过账户余额等等。3)业务策略:
  例如机票预订的超订策略等。4)完整性约束:
  例如账户的账号不得为空。5）业务流程：比如，”下单“是一个业务流程，它包括“用户登录-选择商品-结算-下订单-付款”这一系列的动作。
  Infrastructure层：负责所有的对外的交互。比如数据库访问层实现，RPC接口，MQ等。

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
│   └── user # 用户实体                                           # model/do
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

POJO（Plain Ordinary Java Object）：在本规约中，POJO 专指只有 setter/getter/toString 的简单类，包括
DO/DTO/BO/VO 等。

> 【参考】分层领域模型规约：—《阿里巴巴 Java 开发规约》

- DO（Data Object）：与数据库表结构一一对应，通过 DAO 层向上传输数据源对象。
- DTO（Data Transfer Object）：数据传输对象，Service 或 Manager 向外传输的对象。
- BO（Business Object）：业务对象。可以由 Service 层输出的封装业务逻辑的对象。
- Query：数据查询对象，各层接收上层的查询请求。额外规定：【强制】超过 2 个参数的查询封装，禁止使用 Map 类来传输。
- VO（View Object）：显示层对象，通常是 Web 向模板渲染引擎层传输的对象。

### 说人话就是

- DAO：封装对数据库的访问，常规的增删改查（CRUD 操作）都通过 DAO 来实现。

- PO/DO: 跟数据库表是一一对应的，一个 PO/DO 数据是表的一条记录。PO / DO 只是数据的对象，不包含任何的操作。举个例子，学生表是
  StudentDO，对学生表的增删改查等操作就是 StudentDAO。

- DTO：
  - 在分布式系统中，系统之间可以通过 DTO
    进行数据传输；https://www.google.com/search?q=&oq=DDD+%E5%92%8C+%E5%B9%B2%E5%87%80%E6%9E%B6%E6%9E%84%E7%9A%84%E5%8C%BA%E5%88%AB&aqs=chrome..69i57.9554j0j1&sourceid=chrome&ie=UTF-8
  - DTO 也可以在应用内部，核心层和应用层之间传递数据，DTO 只是简单的数据传输，没有业务逻辑的处理；
  - 有的场景，比如数据库表有 10 个字段，id(唯一 id)、version(版本号)，gmt_create(记录创建时间) 这些字段不需要对外提供，所以
    DTO 可以只取有含义的业务字段，DO 是和数据库记录的一一映射，但是 DTO 只需要按照业务需要定义需要的字段。

- BO: 包含 PO/DO 和 DAO，有点类似于 domain(entity, usecase)的概念, BO
  主要作用是把业务逻辑封装为一个对象。这个对象可以包括一个或多个其它的对象，还能够完成 DO - DTO 之间的转换

- VO: 对应页面显示（web 页面/移动端 H5/Native 视图）的数据对象。 举个例子，DTO 中时间 Date 格式，或者是
  yyyyMMddHHmmss 的字符串，但是 VO 需要的是前端展示的格式，需要转成”yyyy 年 MM 月 dd 月"；

### 图解

![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202061126981.png)
