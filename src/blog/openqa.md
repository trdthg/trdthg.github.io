# open

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

- 需要一个 json 文件，定义需要匹配的区域，例如长宽等
