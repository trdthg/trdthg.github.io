# Atomic in rust

## 使用Atomic实现简单的Mutex

```rust
use std::{sync::atomic::{AtomicBool, Ordering, AtomicUsize}, thread::{self, spawn}, cell::UnsafeCell};

const UNLOCKED: bool = true;
const LOCKED: bool = false;

struct Mutex<T> {
    locked: AtomicBool,
    v: UnsafeCell<T>
}

unsafe impl<T> Sync for Mutex<T> where T: Send {}

impl<T> Mutex<T> {

    pub fn new(v: T) -> Self {
        Self {
            locked: AtomicBool::new(UNLOCKED),
            v: UnsafeCell::new(v)
        }
    }

    /// 暴露一个可变引用出去
    ///
    /// 当线程A和线程B同时执行时，A，B可能同时拿到🔓，并同时上锁，这两个线程并没有`看到`对方页拿到了锁
    /// 所以就出先了， 线程A和B同时从寄存器拿到值1，改为了2, 然后复制到寄存器内，后修改的会覆盖前一次修改
    /// 为了解决上述问题，下面是一些解决方法
    ///
    /// 方案1, 使用`compare_exchange`合并加锁上锁过程
    /// while self.locked.compare_exchange(UNLOCKED, LOCKED, Ordering::Relaxed, Ordering::Relaxed).is_err() {}
    ///
    /// #1 compare_exchange是低效的，如果是多核都在同时争夺锁，8个核中有一个和先拿到了锁
    /// 那么剩下的7个核依然会互相竞争，这个变量的内存就会在多个核中不断拷贝
    /// #2 相比于mutex，mutex拿不到锁就会阻塞线程，而compare_exchange拿不到就会返回一个Err
    /// #3 rust中还提供了compare_and_exchange_weak, 最大的区别是
    ///     compare_and_exchange只允许在判断Current v alue和传入的值不一样时返回Err
    ///     compare_and_exchange_weak即使在一样的时候也可能会返回Err，这种细小的差别能够用于某些场景，让性能更好
    ///     原因是由于在不同平台上的实现不同
    ///         x86: compare_and_swap
    ///         ARM: LDREX STREX
    ///     在x86上weak与普通的相同，
    ///     在ARM上：
    ///         compare_and_exchange: impl using a loop of LDREX and STREX
    ///         compare_and_exchange_weak: LDREX and STREX with no loop, it may be fake
    pub fn with_lock<R>(&self, f: impl FnOnce(&mut T) -> R) -> R {
        // 拿🔓 上🔓
        // while self.locked.load(Ordering::Relaxed) != UNLOCKED {}
        // self.locked.store(LOCKED, Ordering::Relaxed);

        // 方案1
        // while self.locked.compare_exchange(UNLOCKED, LOCKED, Ordering::Relaxed, Ordering::Relaxed).is_err() {}

        // 方案2 在arm下有更好的性能
        while self.locked.compare_exchange_weak(UNLOCKED, LOCKED, Ordering::Relaxed, Ordering::Relaxed).is_err() {
            // 假如现在current value就是UNLOCKED状态，已经修改为LOCKED状态，那么就已经拿到了所有权
            // 加入现在还没有修改完成，current value依然是UNLOCKED状态，当前线程就会卡住，直到有别的线程成功拿到了所有权
            while self.locked.load(Ordering::Relaxed) == LOCKED {
                thread::yield_now();
            }
            thread::yield_now();
        }

        // 暴露数据
        let ret = f(unsafe { &mut *self.v.get() });
        // 解🔓
        self.locked.store(UNLOCKED, Ordering::Relaxed);
        ret
    }
}

fn main() {
    let l: &'static _ = Box::leak(Box::new(Mutex::new(0)));

    let handles: Vec<_> = (0..1000).map(|_| {
        thread::spawn(move || {
            for _ in 0..1000 {
                l.with_lock(|v| {
                    *v += 1;
                })
            }
        })
    }).collect();

    for handle in handles {
        handle.join().unwrap();
    }

    // 这里依然会报错
    assert_eq!(l.with_lock(|v| *v), 1000 * 1000);

}
```
## Acquire与Release
```rust
/// 但是即使用了上面的东西也有可能会出问题，虽然在X86 64位系统上没有出现问题，这是因为他不支持！，他只支持Seq的，不过还是要说明问题
/// 因为下面对变量v的修改和上锁释放锁的过程毫不相关，
/// 所以下一行可能被重新排列在加锁之前，或者解锁之后，这两种都是不允许的，但是cpu和编译器就可能这样做
///
/// 对此需要使用Acquire 和 Release
pub fn with_lock2<R>(&self, f: impl FnOnce(&mut T) -> R) -> R {
    // 任何之后的读写操作不会被重排到Acquire之前
    // 别的线程中的写操作，对于这里的Acquire都是可见的
    while self.locked.compare_exchange_weak(UNLOCKED, LOCKED, Ordering::Acquire, Ordering::Relaxed).is_err() {
        while self.locked.load(Ordering::Relaxed) == LOCKED {
            thread::yield_now();
        }
        thread::yield_now();
    }
    let ret = f(unsafe { &mut *self.v.get() });

    // 任何之前的读写操作不会被重排到Release之后
    // 这个线程里的所有写操作对别的线程中的Acquire都是可见的
    self.locked.store(UNLOCKED, Ordering::Release);
    ret
}
```
## 必需用Seq的场景
```rust
#[test]
fn seq_test() {
    // fetch_add always succeed

    let x: &'static _ = Box::leak(Box::new(AtomicBool::new(false)));
    let y: &'static _ = Box::leak(Box::new(AtomicBool::new(false)));
    let z: &'static _ = Box::leak(Box::new(AtomicUsize::new(0)));
    let tx = thread::spawn(move || {
        x.store(true, Ordering::Release);                  // ！！！
    });
    let ty = thread::spawn(move || {
        y.store(true, Ordering::Release);
    });
    let t1 = spawn(move || {
        while !x.load(Ordering::Acquire) {}
        if y.load(Ordering::Acquire) {
            z.fetch_add(1, Ordering::Release);
        }
    });
    let t2 = spawn(move || {
        while !y.load(Ordering::Acquire) {}                    // 这行和下面一行可能重排(或者说不是重排，单纯时可见性的问题，下面的x就是看到了x是false)
        if x.load(Ordering::Acquire) {                         // ！！！ x为false，当x被修改为true后，也不会发生改变
            z.fetch_add(1, Ordering::Release);
        }
    });
    println!("{}", z.load(Ordering::SeqCst));

    // What are the possibles for z?
    // - is 0 possibly ?
    //   经过判断，至少有下面的条件
    //     t1 must run after tx
    //     t2 must run after ty
    //   几种排列组合应该是1或2,没有0
    //   但是0还是可能的，
    //           t2    t1,t2
    //   MO(x)  false  true
    //           t1    t1,t2
    //   MO(y)  false  true
    // - is 1 possibly ?
    //   Yes: tx -> t1 -> ty -> t2
    // - is 2 possibly ?
    //   Yes: tx -> ty -> t1 -> t2

}

```
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

类似于上面的，下面的代码中y = 200可能会先于x = 100执行，打印出的x可能是0或100
例1:

```cpp
    int x = 0;     // global variable
    int y = 0;     // global variable

    Thread-1:           Thread-2:
    x = 100;            while (y != 200) {};
    y = 200;            std::cout << x;
```

例2:

```rust
初始状态: x = 0, y = 1
线程1        线程2
y = 3;      if x == 1 {
x = 1;          y *= 2;
            }
```

这段程序实际上有两种可能的结果：

- y = 3：线程 2 在线程 1 完成之前检查了 x 的值
- y = 6：线程 2 在线程 1 完成之后检查了 x 的值
- y = 2：线程 2 看到了 x = 1，但是没看到 y = 3，接下来用计算结果覆盖了 y = 3

### 3. CPU Cache

由于一次复制操作涉及到 move(内存 -> 寄存器) add mov(寄存器 -> 内存)三条汇编指令，在add操作完成后，数据还没有被拷贝到内存时，另一个线程可能读取到此时还没有被修改的数据，或者是两个线程同时修改，结果某一个线程修改的结果被另一个线程覆盖

## 术语

下列术语定义了多线程和单线程中各个变量操作之间的关系
这些关系只是我们期望的，想要确保下面的关系在活动中是正常的，就需要内存顺序了

### **1. happens-before**

先于，或者说B能看到A操作的结果，AB分别在两个线程里

### 2. sequenced-before

同上A,B在一个线程内

### **3. synchronized-with**

x是支持原子操作的变量
A写入(store)x，B读取(load)x，分别在两个线程内，则A((store)就是synchornized-with B(load)的

### 4. inter-thread

跨线程
第三点说到 A：store synchornized-with B: load
那么A happens-before B
多线程中写入先于读取

## 内存顺序

### 1. Relaxed

只保证在同一个线程中满足Happens-before，这是最宽松的规则，他对编译器和CPU不做任何限制，可以乱需，因此下面的例子不保证会成功

```rust
#[test]
fn to_relaxed() {
    let x: &'static _ = Box::leak(Box::new(AtomicUsize::new(0)));
    let y: &'static _ = Box::leak(Box::new(AtomicUsize::new(0)));
    let t1 = thread::spawn(move || {
        // 读取x存到y里
        let r1 = y.load(Ordering::Relaxed);
        x.store(r1, Ordering::Relaxed);
        r1
    });
    let t2 = thread::spawn(move || {
        // 读取y存到x里
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

**Release 释放** ，设定内存屏障(Memory barrier)，保证它之前的操作永远在它之前，但是它后面的操作可能被重排到它前面
**Acquire 获取** , 设定内存屏障，保证在它之后的访问永远在它之后，但是它之前的操作却有可能被重排到它后面，往往和 `Release`在不同线程中联合使用
**AcqRel**: Acquire和Release的结合，同时拥有它们俩提供的保证。比如你要对一个 atomic 自增 1，同时希望该操作之前和之后的读取或写入操作不会被重新排序

这两个操作通常成对使用，对store使用Release，对load使用Acquire
先后顺序具体看下面的代码

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

顺序一致性，强制所有线程看到一致的原子操作，完全的分界点，SeqCst就像是AcqRel的加强版，它不管原子操作是属于读取还是写入的操作，只要某个线程有用到SeqCst的原子操作，线程中该SeqCst操作前的数据操作绝对不会被重新排在该SeqCst操作之后，且该SeqCst操作后的数据操作也绝对不会被重新排在SeqCst操作前。
下面的例子，只有使用 SeqCst ordering，才能保证 Z 最后的值不为 0

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

fence是支持synchornized-with的另一种方式, 可以和Acquire-Release对比一下

例1：

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

例2：

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

[fence的官方文档](https://doc.rust-lang.org/std/sync/atomic/fn.fence.html)
An atomic fence.
Depending on the specified order, a fence prevents the compiler and CPU from reordering certain types of memory operations around it. That creates synchronizes-with relationships between it and atomic operations or fences in other threads.

A fence ‘A’ which has (at least) Release ordering semantics, synchronizes with a fence ‘B’ with (at least) Acquire semantics, if and only if there exist operations X and Y, both operating on some atomic object ‘M’ such that A is sequenced before X, Y is synchronized before B and Y observes the change to M. This provides a happens-before dependence between A and B.

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

- 不知道怎么选择时，优先使用SeqCst，虽然会稍微减慢速度，但是慢一点也比出现错误好
- 多线程只计数fetch_add而不使用该值触发其他逻辑分支的简单使用场景，可以使用Relaxed
  参考 [Which std::sync::atomic::Ordering to use?](https://stackoverflow.com/questions/30407121/which-stdsyncatomicordering-to-use)
- 在多线程环境中要使用Atomic需要配合Arc

### 2. Atomic能替代锁吗?

那么原子类型既然这么全能，它可以替代锁吗？答案是不行：

- 对于复杂的场景下，锁的使用简单粗暴，不容易有坑
- std::sync::atomic包中仅提供了数值类型的原子操作：AtomicBool, AtomicIsize, AtomicUsize, AtomicI8, AtomicU16等，而锁可以应用于各种类型
- 在有些情况下，必须使用锁来配合，例如上一章节中使用Mutex配合Condvar

### 3. Atomic的应用场景

事实上，Atomic虽然对于用户不太常用，但是对于高性能库的开发者、标准库开发者都非常常用，它是并发原语的基石，除此之外，还有一些场景适用：

- 无锁(lock free)数据结构
- 全局变量，例如全局自增ID, 在后续章节会介绍
- 跨线程计数器，例如可以用于统计指标

## 引用

- [Rust 并发编程 - Memory Ordering (siddontang
)](https://www.jianshu.com/p/511cde6b62a6)
- [知乎](https://www.zhihu.com/question/24301047)
- [理解 C++ 的 Memory Order (Senlin&#39;s Blog)](http://senlinzhan.github.io/2017/12/04/cpp-memory-order/)
- [Rust学习笔记](https://skyao.io/learning-rust/std/sync/atomic-type.html)
- [rust语言圣经](https://course.rs/advance/concurrency-with-threads/sync2.html)
- [Rust 高级编程](https://learnku.com/docs/nomicon/2018/83-atomic-operation/4742)
