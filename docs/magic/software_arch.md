# 软件架构

## The Clean Architecture
- [Uncle Bob 原文](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
文章不太长，
- 很好的翻译 + 总结
[干净架构最佳实践](https://blog.jaggerwang.net/clean-architecture-in-practice/)

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