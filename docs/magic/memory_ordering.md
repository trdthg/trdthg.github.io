# 原子操作与内存顺序

原子操作能够用来实现无🔓并发

## 程序运行问题

下面列举了影响代码执行顺序的诸多原因

### 1. 编译器重排

编译器会尽可能优化代码，在单线程下一般不会出现问题

```js
x = 1;
y = 3;
x = 2;
```

上面的代码可能被优化为下面的样子

```py
x = 2;
y = 3;
```

但是在多线程下可能会有问题

### 2.指令重排

类似于上面的，下面的代码中 y = 200 可能会先于 x = 100 执行，打印出的 x 可能是 0 或 100 例 1:

```cpp
    int x = 0;     // global variable
    int y = 0;     // global variable

    Thread-1:           Thread-2:
    x = 100;            while (y != 200) {};
    y = 200;            std::cout << x;
```

例 2:

```rust
初始状态: x = 0, y = 1
线程 1        线程 2
y = 3;      if x == 1 {
x = 1;          y *= 2;
            }
```

这段程序实际上有两种可能的结果：

- y = 3：线程 2 在线程 1 完成之前检查了 x 的值
- y = 6：线程 2 在线程 1 完成之后检查了 x 的值
- y = 2：线程 2 看到了 x = 1，但是没看到 y = 3，接下来用计算结果覆盖了 y = 3

### 3. CPU Cache

由于一次复制操作涉及到 move(内存 -> 寄存器) add mov(寄存器 -> 内存) 三条汇编指令，在 add
操作完成后，数据还没有被拷贝到内存时，另一个线程可能读取到此时还没有被修改的数据，或者是两个线程同时修改，结果某一个线程修改的结果被另一个线程覆盖

## 术语

下列术语定义了多线程和单线程中各个变量操作之间的关系 这些关系只是我们期望的，想要确保下面的关系在活动中是正常的，就需要内存顺序了

### **1. happens-before**

先于，或者说 B 能看到 A 操作的结果，AB 分别在两个线程里

### 2. sequenced-before

同上 A,B 在一个线程内

### **3. synchronized-with**

x 是支持原子操作的变量 A 写入 (store)x，B 读取 (load)x，分别在两个线程内，则 A((store) 就是
synchornized-with B(load) 的

### 4. inter-thread

跨线程 第三点说到 A：store synchornized-with B: load 那么 A happens-before B 多线程中写入先于读取

## 内存顺序

### 1. Relaxed

只保证在同一个线程中满足 Happens-before，这是最宽松的规则，他对编译器和 CPU 不做任何限制，可以乱需，因此下面的例子不保证会成功

```rust
#[test]
fn to_relaxed() {
    let x: &'static _ = Box::leak(Box::new(AtomicUsize::new(0)));
    let y: &'static _ = Box::leak(Box::new(AtomicUsize::new(0)));
    let t1 = thread::spawn(move || {
        // 读取 x 存到 y 里
        let r1 = y.load(Ordering::Relaxed);
        x.store(r1, Ordering::Relaxed);
        r1
    });
    let t2 = thread::spawn(move || {
        // 读取 y 存到 x 里
        let r2 = x.load(Ordering::Relaxed); // 下面两行可能会被重排
        y.store(42, Ordering::Relaxed);
        r2
    });

    let r1 = t1.join().unwrap();
    let r2 = t2.join().unwrap();
    // 可能出现 r1 == r2 == 42
}
```

### 2. Acquire-Release

**Release 释放** ，设定内存屏障 (Memory barrier)，保证它之前的操作永远在它之前，但是它后面的操作可能被重排到它前面
**Acquire 获取** , 设定内存屏障，保证在它之后的访问永远在它之后，但是它之前的操作却有可能被重排到它后面，往往和
`Release`在不同线程中联合使用 **AcqRel**: Acquire 和 Release 的结合，同时拥有它们俩提供的保证。比如你要对一个
atomic 自增 1，同时希望该操作之前和之后的读取或写入操作不会被重新排序

这两个操作通常成对使用，对 store 使用 Release，对 load 使用 Acquire 先后顺序具体看下面的代码

```rust
fn write_x_then_y() {
    X.store(true, Ordering::Relaxed);
    Y.store(true, Ordering::Release);
}

fn read_y_then_x() {
    while !Y.load(Ordering::Acquire) {}
    if X.load(Ordering::Relaxed) {
        Z.fetch_add(1, Ordering::SeqCst);
    }
}

fn main() {
    let t1 = thread::spawn(move || {
        write_x_then_y();
    });

    let t2 = thread::spawn(move || {
        read_y_then_x();
    });

    t1.join().unwrap();
    t2.join().unwrap();

    assert_ne!(Z.load(Ordering::SeqCst), 0);
}
```

### 3. Sequence

顺序一致性，强制所有线程看到一致的原子操作，完全的分界点，SeqCst 就像是 AcqRel
的加强版，它不管原子操作是属于读取还是写入的操作，只要某个线程有用到 SeqCst 的原子操作，线程中该 SeqCst 操作前的数据操作绝对不会被重新排在该
SeqCst 操作之后，且该 SeqCst 操作后的数据操作也绝对不会被重新排在 SeqCst 操作前。下面的例子，只有使用 SeqCst
ordering，才能保证 Z 最后的值不为 0

```rust
fn write_x() {
    X.store(true, Ordering::SeqCst);    // 1
}

fn write_y() {
    Y.store(true, Ordering::SeqCst);    // 2
}

fn read_x_then_y() {
    while !X.load(Ordering::SeqCst) {}
    if Y.load(Ordering::SeqCst) {       // 3
        Z.fetch_add(1, Ordering::SeqCst);
    }
}

fn read_y_then_x() {
    while !Y.load(Ordering::SeqCst) {}
    if X.load(Ordering::SeqCst) {       // 4
        Z.fetch_add(1, Ordering::SeqCst);
    }
}

fn main() {
        let t1 = thread::spawn(move || {
        write_x();
    });

    let t2 = thread::spawn(move || {
        write_y();
    });

    let t3 = thread::spawn(move || {
        read_x_then_y();
    });

    let t4 = thread::spawn(move || {
        read_y_then_x();
    });

    t1.join().unwrap();
    t2.join().unwrap();
    t3.join().unwrap();
    t4.join().unwrap();

    assert_ne!(Z.load(Ordering::SeqCst), 0);
}
```

### 4. Fence

fence 是支持 synchornized-with 的另一种方式，可以和 Acquire-Release 对比一下

例 1：

```rust
fn producer() -> JoinHandle<()> {
    thread::spawn(move || {
        unsafe {
            DATA = 100;                                 // A
        }
        READY.store(true, Ordering::Release);           // B: 内存屏障 ↑
    })
}

fn consumer() -> JoinHandle<()> {
    thread::spawn(move || {
        while !READY.load(Ordering::Acquire) {}         // C: 内存屏障 ↓

        assert_eq!(100, unsafe { DATA });               // D
    })
}
```

例 2：

```rust
fn write_x_then_y() {
    X.store(true, Ordering::Relaxed); // 1
    fence(Ordering::Release);         // 2
    Y.store(true, Ordering::Relaxed); // 3
}

fn read_y_then_x() {
    while !Y.load(Ordering::Relaxed) {}  // 4
    fence(Ordering::Acquire);            // 5
    if X.load(Ordering::Relaxed) {       // 6
        Z.fetch_add(1, Ordering::SeqCst);
    }
}

fn main() {
    let t1 = thread::spawn(move || {
        write_x_then_y();
    });

    let t2 = thread::spawn(move || {
        read_y_then_x();
    });

    t1.join().unwrap();
    t2.join().unwrap();

    assert_ne!(Z.load(Ordering::SeqCst), 0);
}
```

[fence 的官方文档](https://doc.rust-lang.org/std/sync/atomic/fn.fence.html) An atomic
fence. Depending on the specified order, a fence prevents the compiler and CPU
from reordering certain types of memory operations around it. That creates
synchronizes-with relationships between it and atomic operations or fences in
other threads.

A fence ‘A’ which has (at least) Release ordering semantics, synchronizes with a
fence ‘B’ with (at least) Acquire semantics, if and only if there exist
operations X and Y, both operating on some atomic object ‘M’ such that A is
sequenced before X, Y is synchronized before B and Y observes the change to M.
This provides a happens-before dependence between A and B.

```
    Thread 1                                          Thread 2

fence(Release);      A --------------
x.store(3, Relaxed); X ---------    |
                               |    |
                               |    |
                               -------------> Y  if x.load(Relaxed) == 3 {
                                    |-------> B      fence(Acquire);
                                                     ...
                                                 }
```

## 其他

### 1. Tips

- 不知道怎么选择时，优先使用 SeqCst，虽然会稍微减慢速度，但是慢一点也比出现错误好
- 多线程只计数 fetch_add 而不使用该值触发其他逻辑分支的简单使用场景，可以使用 Relaxed 参考
  [Which std::sync::atomic::Ordering to use?](https://stackoverflow.com/questions/30407121/which-stdsyncatomicordering-to-use)
- 在多线程环境中要使用 Atomic 需要配合 Arc

### 2. Atomic 能替代锁吗？

那么原子类型既然这么全能，它可以替代锁吗？答案是不行：

- 对于复杂的场景下，锁的使用简单粗暴，不容易有坑
- std::sync::atomic 包中仅提供了数值类型的原子操作：AtomicBool, AtomicIsize, AtomicUsize,
  AtomicI8, AtomicU16 等，而锁可以应用于各种类型
- 在有些情况下，必须使用锁来配合，例如上一章节中使用 Mutex 配合 Condvar

### 3. Atomic 的应用场景

事实上，Atomic 虽然对于用户不太常用，但是对于高性能库的开发者、标准库开发者都非常常用，它是并发原语的基石，除此之外，还有一些场景适用：

- 无锁 (lock free) 数据结构
- 全局变量，例如全局自增 ID，在后续章节会介绍
- 跨线程计数器，例如可以用于统计指标

## 引用

- [Rust 并发编程 - Memory Ordering (siddontang
  )](https://www.jianshu.com/p/511cde6b62a6)
- [知乎](https://www.zhihu.com/question/24301047)
- [理解 C++ 的 Memory Order (Senlin&#39;s Blog)](http://senlinzhan.github.io/2017/12/04/cpp-memory-order/)
- [Rust 学习笔记](https://skyao.io/learning-rust/std/sync/atomic-type.html)
- [rust 语言圣经](https://course.rs/advance/concurrency-with-threads/sync2.html)
- [Rust 高级编程](https://learnku.com/docs/nomicon/2018/83-atomic-operation/4742)

## 资料

- [C 语言丨深入理解 volatile 关键字](https://zhuanlan.zhihu.com/p/343688629)
- [Java volatile 三大特性详解](https://www.jianshu.com/p/765e3abbe89a)
- [Java CAS 实现原理](https://juejin.cn/post/6844904177856937991)
