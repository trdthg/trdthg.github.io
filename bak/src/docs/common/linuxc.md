# IPC

## 简介

### pipe

- pipe 只能用于相关进程间通信，例如父子孙进程

### fifo

- fifo 和 pipe 的最大区别就是他在文件系统中拥有一个名称，打开方式和普通文件一样，
因此可以用于不相关进程间通信

- 有趣的双重管道线：

```sh
# 创建一个 fifo
mkfifo myfifo
# 从 fifo 读取数据
wc -l < myfifo &
# 向 fifo 写入数据
ls -l | tee myfifo | sort -k5n
```

> tee 将输入数据，一份输出到标准输出，另一份输出到指定文件
