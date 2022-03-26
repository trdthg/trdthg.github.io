# 协程与异步

## 协程

[C语言协程的简单实现](https://github.com/xiaobing94/coroutine)


linux下在头文件`ucontext.h`提供了`getcontext(),setcontext(),makecontext(),swapcontext()`四个函数和`mcontext_t和ucontext_t`结构体。

这4个函数能够实现保存，获取，设置，切换上下文，是协程实现的核心，也是yield的核心

结构体则保留了协程的id，运行堆栈等信息

- 不同协程保存在队列中，由一个调度器进行推进各个协程

- 调度器会依次执行每个协程，每当某一个协程进行了yield操作(`swapcontext()`), 调度器就会切换到另一个协程的上下文，继续推进

- 当所有协程都执行完成，就结束

下面的图片是阅读了上面代码后的整理
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203262211252.png)