# 一些简单的异步运行时💙

## project1
实现了一个最小的runtime

### 框架
- executor(MiniTokio): 保存任务队列，不断尝试poll每个task，如果任务完成就移除队列，如果没有完成就加到队尾
    ```rs
    struct MiniTokio {
        tasks: VecDeque<Task>,
    }
    impl MiniTokio {
        pub fn new() -> Self {
            Self {
                tasks: VecDeque::new(),
            }
        }
        fn run(&mut self) {
            let waker = futures::task::noop_waker();
            let mut cx = Context::from_waker(&waker);
            while let Some(mut task) = self.tasks.pop_front() {
                if task.as_mut().poll(&mut cx).is_pending() {
                    println!("a");
                    self.tasks.push_back(task);
                }
            }
        }
    }
    ```
- task: 封装了future
    ```rs
    type Task = Pin<Box<dyn Future<Output = ()>>>;
    ```
- spawner: 作为runtime的函数，将task添加到队尾
    ```rs
    fn spawn<F>(&mut self, f: F)
    where
        F: Future<Output = ()> + 'static,
    {
        self.tasks.push_back(Box::pin(f));
    }
    ```
### project2
execotor本身的push_back操作就是wake的实现

只要没有ready就重新加入队列，这种做法执行失败就立即重会占用大量cpu资源, 应该等到ready是在重新唤醒(加入队列)
```rs
fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
    if (Instant::now() >= self.when) {
        Poll::Ready("aaa")
    } else {
        Poll::Pending
    }
}
```

## project2

### 框架
- execotor: 只需要一个receiver, 不断尝试接受任务去poll, 结果是什么无所谓
    ```rs
    struct MiniTokio {
        sender: Sender<Arc<Task>>,  // 等会在说这个
        receiver: Receiver<Arc<Task>>,
    }

    impl MiniTokio {
        pub fn new() -> Self {
            let (cx, rx) = crossbeam::channel::unbounded();
            Self {
                sender: cx,
                receiver: rx,
            }
        }

        fn run(&self) {
            while let Ok(task) = self.receiver.recv() {
                let waker = futures::task::waker(task.clone());
                let mut cx = Context::from_waker(&waker);
                let mut future = task.future.lock().expect("加锁失败");
                let _ = future.as_mut().poll(&mut cx);
            }
        }
    }
    ```
- task: 除了future还有一个sender, task实现了Waker, 当task pending时会按照策略调用wake方法, 把自己send到execotor
    ```rs
    struct Task {
        future: Mutex<Pin<Box<dyn Future<Output = ()> + Send>>>,
        sender: Sender<Arc<Task>>,
    }

    impl ArcWake for Task {
        fn wake_by_ref(arc_self: &Arc<Self>) {
            arc_self
                .sender
                .send(arc_self.clone())
                .expect("send会queue失败了");
        }
    }
    ```
- spawner: 因为execotor现在同时保留着sender和receiver, 两者都不会被drop, 程序不能正常退出, 下一步需要将这两个分离
    ```rs
    fn spawn<F>(&self, future: F)
        where
            F: Future<Output = ()> + Send + 'static,
        {
            let task = Task {
                future: Mutex::new(Box::pin(future)),
                sender: self.sender.clone(),
            };
            self.sender
                .send(Arc::new(task))
                .expect("spawner send new task failed");
        }
    ```
### wake实现
```rs
fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
    if Instant::now() >= self.when {
        Poll::Ready("aaa")
    } else {
        // 这里调用wake依赖的是task实现的wake方法

        // 1. 立即send
        cx.waker().wake_by_ref();

        // 2. 这个是稍微优化过的wake策略
        let waker = cx.waker().clone();
        let when = self.when;
        thread::spawn(move || {
            let now = Instant::now();
            if now < when {
                thread::sleep(when - now);
            }
            waker.wake();
        });
        Poll::Pending
    }
}
```
### 不优雅的关闭
```rs
fn main() {
    let mut runtime = MiniTokio::new();
    runtime.spawn(async {
        let when = Instant::now() + Duration::from_secs(2);
        let future = Delay::new(when);

        let out = future.await;
        assert_eq!(out, "aaa");

        println!("{out}");
        std::process::exit(0);  // 需要手动退出
    });
    runtime.run();
}

```

### project3
1. 分离executor(receiver) 和 spawner(sender), 当receiver运行结束后receiver就销毁
```rs
struct Executor {
    ready_queue: Receiver<Arc<Task>>,
}

struct Task {
    future: Mutex<Option<BoxFuture<'static, ()>>>,
    task_sender: SyncSender<Arc<Task>>,
}

struct Spawner {
    task_sender: SyncSender<Arc<Task>>,
}
```