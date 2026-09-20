// 旧博客内容（翻译 + openqa 笔记），index.html 会和 posts.js 一起加载、按日期排序。
// 条目格式和 posts.js 一样。
const OLD_POSTS = [
    // —— openqa 笔记（内联；日期是占位，需要改成真实日期）——
    {
        date: "2024-06-01",
        post: `# OpenQA 的思路

## 总览

- 所有代码用 perl 实现
- 工具用 python 写的

## 功能

主要用途：

- 操作系统测试
- 应用测试

特点：

- 从用户角度测试
- 不接触软件，open 启动 qemu，通过 vnc 提供鼠标键盘操作
- 图像使用 opencv，串口输出主要做 test 检查，例如命令行输出
- 有屏幕截屏，log 信息，通过 video 记录测试步骤

> fedaro 团队似乎也会使用这个工具

## 架构

- 应用层
  - 提供 ui，restapi，命令行接口
- worker
- autoinst（真正做测试的部分）
- tests（手动编写的测试集）

### job

以一个系统升级的 case 为例：

- 准备 qcow2,iso 文件
- 安装
- 下一步，下一步，启动，bootloader
- 进入操作系统欢迎界面

对于 openqa 来说，这些操作（例如点击下一步）需要通过 perl 编写，但是接口是通过 autoinst 提供的

### worker

主要起信息收集的作用

- 用户在 ui 创建 job，等待有空闲的 worker 做 job
- 跑 case 时需要的 iso，qcow2,tests 文件都会下载到 worker，worker 在调用 autoinst 跑测试
- autoinst 跑完测试后，worker 会把结果上传到 ui

### autoinst

- 创建虚拟机，跑测试代码
- 生成 video，屏幕截图，每一步的详细记录，放到 json 文件里
- 提供 api，编写测试代码（perl），已经在把 api 转换为 python 接口
- opencv 做结果比对，比较截图

> 也可以通过命令行单独调用 autoinst

### needle

预先提供的截图叫做 needle

autoinst 与 openqa 一起使用，他和 worker 需要安装在同一台机器上，但是不需要和 webui 装在同一台机器上

- 需要一个 json 文件，定义需要匹配的区域，例如长宽等`
    },

    // —— 翻译（内容在 trans/ 下的 .md 文件里）——
    {
        date: "2023-01-03",
        title: "Rust 冒险：滥用 Serde",
        file: "trans/2023-01-03-译-Rust冒险-滥用-Serde.md"
    },
    {
        date: "2023-01-02",
        title: "未初始化内存：unsafe Rust 太难了",
        file: "trans/2023-01-02-译-未初始化内存-unsafe-Rust太难了.md"
    },
    {
        date: "2023-01-01",
        title: "拓展 Rust 中的 Map",
        file: "trans/2023-01-01-译-拓展-Rust-中的-Map.md"
    },
    {
        date: "2022-05-04",
        title: "可视化 Rust 各数据类型的内存布局",
        file: "trans/2022-05-04-译-可视化-Rust-各数据类型的内存布局.md"
    },
    {
        date: "2022-04-30",
        title: "什么时候不应该使用 Rust？",
        file: "trans/2022-04-30-译-什么时候不应该使用-Rust.md"
    },
    {
        date: "2022-04-20",
        title: "使用 Tokio 处理 CPU 密集型任务",
        file: "trans/2022-04-20-译-使用-Tokio-处理-CPU-密集型任务.md"
    },
    {
        date: "2022-04-13",
        title: "对重请求 - 应对尾部延迟",
        file: "trans/2022-04-13-译-tail_latency.md"
    },
    {
        date: "2022-04-03",
        title: "Rust 六边形架构（简介）",
        file: "trans/2022-04-03-译-Rust-六边形架构/README.md"
    },
    {
        date: "2022-04-03",
        title: "Rust 六边形架构 #1 域",
        file: "trans/2022-04-03-译-Rust-六边形架构/Rust-六边形架构-1-域.md"
    },
    {
        date: "2022-04-03",
        title: "Rust 六边形架构 #2 内存中的存储库",
        file: "trans/2022-04-03-译-Rust-六边形架构/Rust-六边形架构-2-内存存储库.md"
    },
    {
        date: "2022-04-03",
        title: "Rust 六边形架构 #3 HTTP API",
        file: "trans/2022-04-03-译-Rust-六边形架构/Rust-六边形架构-3-HTTP-API.md"
    },
    {
        date: "2022-04-03",
        title: "Rust 六边形架构 #4 重构",
        file: "trans/2022-04-03-译-Rust-六边形架构/Rust-六边形架构-4-重构.md"
    },
    {
        date: "2022-04-03",
        title: "Rust 六边形架构 #5 其他用例",
        file: "trans/2022-04-03-译-Rust-六边形架构/Rust-六边形架构-5-其他用例.md"
    },
    {
        date: "2022-04-03",
        title: "Rust 六边形架构 #6 CLI",
        file: "trans/2022-04-03-译-Rust-六边形架构/Rust-六边形架构-6-CLI.md"
    },
    {
        date: "2022-04-03",
        title: "Rust 六边形架构 #7 长期存储库",
        file: "trans/2022-04-03-译-Rust-六边形架构/Rust-六边形架构-7-长期存储库.md"
    },
    {
        date: "2022-04-01",
        title: "查询引擎：推送与拉取",
        file: "trans/2022-04-01-译-search_engine.md"
    }
];
