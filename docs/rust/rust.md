# Rust

## 1. 生命周期

### 自动处理生命周期

```rust
// Only one reference in input, so the output must be derived from that input
fn foo(&A) -> &B; // sugar for:
fn foo<'a>(&'a A) -> &'a B;

// Many inputs, assume they're all independent
fn foo(&A, &B, &C); // sugar for:
fn foo<'a, 'b, 'c>(&'a A, &'b B, &'c C);

// Methods, assume all output lifetimes are derived from `self`
fn foo(&self, &B, &C) -> &D; // sugar for:
fn foo<'a, 'b, 'c>(&'a self, &'b B, &'c C) -> &'a D;
```

## 2. 智能指针

### 基本概念

实现了 Deref Trait 和 Drop Trait 的就是智能指针

1. Deref Trait: 具有指针语义
2. Drop Trait：拥有内存自动管理的机制

看一眼 Box 的实现

```rust
#[stable(feature = "rust1", since = "1.0.0")]
impl<T: ?Sized, A: Allocator> Deref for Box<T, A> {
    type Target = T;

    fn deref(&self) -> &T {
        &**self
    }
}
```

### 简单实现

我们实现一个智能指针（只实现了 Deref Trait）

```rust
use std::ops::Deref;

pub struct MySmartPointer<T> (T);

impl<T> MySmartPointer<T> {
    pub fn new(t: T) -> Self {
        MySmartPointer(t)
    }
}

impl<T> Deref for MySmartPointer<T> {
    type Target = T;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
// 调用*x 其实就是调用 *x.deref()
let x = 5;
let a = MySmartPointer::new(x);
let b = Box::new(x);
assert_eq!(x, *a.deref());
assert_eq!(x, *a);
assert_eq!(x, *b.deref());
assert_eq!(x, *b);
print!("{}", a.to_string())
```

### 自动解引用的时机

- 遇到*运算符自动接引用
  ```rust
  assert_eq!(x, *a.deref());
  assert_eq!(x, *a);
  ```

- 遇到 . 运算符接引用调用方法
  ```rust
  print!("{}", a.to_string())
  ```

- 参数传递自动解引用
  ```rust
  let s = String::from("aaaa");
  fn take_str(s: &str) {
      print!("{}", s);
  }
  take_str(&s);

  #[stable(feature = "rust1", since = "1.0.0")]
  impl ops::Deref for String {
      type Target = str;

      #[inline]
      fn deref(&self) -> &str {
          unsafe { str::from_utf8_unchecked(&self.vec) }
      }
  }
  ```

### 自动管理内存

自动化管理内存 (drop，作用域外自动释放内存)

## 2. Atomic 在 rust 中的实践

[Crust of Rust: Atomics and Memory Ordering](https://www.youtube.com/watch?v=rMGWeSjctlY)

### 使用 Atomic 实现简单的 Mutex

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
    /// 当线程 A 和线程 B 同时执行时，A，B 可能同时拿到🔓，并同时上锁，这两个线程并没有`看到`对方页拿到了锁
    /// 所以就出先了，线程 A 和 B 同时从寄存器拿到值 1，改为了 2，然后复制到寄存器内，后修改的会覆盖前一次修改
    /// 为了解决上述问题，下面是一些解决方法
    ///
    /// 方案 1，使用`compare_exchange`合并加锁上锁过程
    /// while self.locked.compare_exchange(UNLOCKED, LOCKED, Ordering::Relaxed, Ordering::Relaxed).is_err() {}
    ///
    /// #1 compare_exchange 是低效的，如果是多核都在同时争夺锁，8 个核中有一个和先拿到了锁
    /// 那么剩下的 7 个核依然会互相竞争，这个变量的内存就会在多个核中不断拷贝
    /// #2 相比于 mutex，mutex 拿不到锁就会阻塞线程，而 compare_exchange 拿不到就会返回一个 Err
    /// #3 rust 中还提供了 compare_and_exchange_weak，最大的区别是
    ///     compare_and_exchange 只允许在判断 Current v alue 和传入的值不一样时返回 Err
    ///     compare_and_exchange_weak 即使在一样的时候也可能会返回 Err，这种细小的差别能够用于某些场景，让性能更好
    ///     原因是由于在不同平台上的实现不同
    ///         x86: compare_and_swap
    ///         ARM: LDREX STREX
    ///     在 x86 上 weak 与普通的相同，
    ///     在 ARM 上：
    ///         compare_and_exchange: impl using a loop of LDREX and STREX
    ///         compare_and_exchange_weak: LDREX and STREX with no loop, it may be fake
    pub fn with_lock<R>(&self, f: impl FnOnce(&mut T) -> R) -> R {
        // 拿🔓 上🔓
        // while self.locked.load(Ordering::Relaxed) != UNLOCKED {}
        // self.locked.store(LOCKED, Ordering::Relaxed);

        // 方案 1
        // while self.locked.compare_exchange(UNLOCKED, LOCKED, Ordering::Relaxed, Ordering::Relaxed).is_err() {}

        // 方案 2 在 arm 下有更好的性能
        while self.locked.compare_exchange_weak(UNLOCKED, LOCKED, Ordering::Relaxed, Ordering::Relaxed).is_err() {
            // 假如现在 current value 就是 UNLOCKED 状态，已经修改为 LOCKED 状态，那么就已经拿到了所有权
            // 加入现在还没有修改完成，current value 依然是 UNLOCKED 状态，当前线程就会卡住，直到有别的线程成功拿到了所有权
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

### Acquire 与 Release

```rust
/// 但是即使用了上面的东西也有可能会出问题，虽然在 X86 64 位系统上没有出现问题，这是因为他不支持！，他只支持 Seq 的，不过还是要说明问题
/// 因为下面对变量 v 的修改和上锁释放锁的过程毫不相关，
/// 所以下一行可能被重新排列在加锁之前，或者解锁之后，这两种都是不允许的，但是 cpu 和编译器就可能这样做
///
/// 对此需要使用 Acquire 和 Release
pub fn with_lock2<R>(&self, f: impl FnOnce(&mut T) -> R) -> R {
    // 任何之后的读写操作不会被重排到 Acquire 之前
    // 别的线程中的写操作，对于这里的 Acquire 都是可见的
    while self.locked.compare_exchange_weak(UNLOCKED, LOCKED, Ordering::Acquire, Ordering::Relaxed).is_err() {
        while self.locked.load(Ordering::Relaxed) == LOCKED {
            thread::yield_now();
        }
        thread::yield_now();
    }
    let ret = f(unsafe { &mut *self.v.get() });

    // 任何之前的读写操作不会被重排到 Release 之后
    // 这个线程里的所有写操作对别的线程中的 Acquire 都是可见的
    self.locked.store(UNLOCKED, Ordering::Release);
    ret
}
```

### 必需用 Seq 的场景

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
        while !y.load(Ordering::Acquire) {}                    // 这行和下面一行可能重排 (或者说不是重排，单纯时可见性的问题，下面的 x 就是看到了 x 是 false)
        if x.load(Ordering::Acquire) {                         // ！！！x 为 false，当 x 被修改为 true 后，也不会发生改变
            z.fetch_add(1, Ordering::Release);
        }
    });
    println!("{}", z.load(Ordering::SeqCst));

    // What are the possibles for z?
    // - is 0 possibly ?
    //   经过判断，至少有下面的条件
    //     t1 must run after tx
    //     t2 must run after ty
    //   几种排列组合应该是 1 或 2，没有 0
    //   但是 0 还是可能的，
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

## 3. 常用 Trait

### 3.1 Read

Read Trait 的功能是：从数据源拉取 (Pull) 一定数据到指定的缓冲区，返回读取的字节数。

**关于阻塞：** read 函数不保证 Read 是否会处于阻塞状态，如果一个 read 过程阻塞了而且等待失败，那他就会返回一个 [`Err`] 标记。

**关于返回值：** 如果`read()`返回的是 [`OK(n)`] , 它的实现就必须保证`0 <- n < buf.len()`。
如果`n == 0`，那可能有两种情况：

1. reader 已经到达了`the end of file`，而且这个`file`可能不会在产生新数据。注意，这里只是 likely，比如：在 linux
   系统中，read 可能对一个 [`TcpStream`] 调用了`recv`系统调用，0 代表这个连接已经被成功关闭，如果是对 [`File`] ,
   那就可能意味着确实读取到了文件的末尾，但是如果有更多的数据被追加 (append) 到文件末尾，那么未来的 read 操作依然能够正常返回被追加的数据
2. 缓冲区 (buffer) 大小确实就是 0

`n` 只要小于缓冲区的长度一般就不是个错误，即使文件还没有被读取完，这种情况可能会发生在，当前只有一部分数据是可用的，或者是 read 操作被一个信号打断了

**关于安全性：**

- 因为实现这个 Trait 是安全的，调用者不能用 `n < buf.len()` 去确保安全，使用 unsafe 是更要小心确保诸如越界问题是否会发生。
- read 不保证 buf 里的数据是对的，所以不推荐读取缓冲区里的数据，只推荐向缓冲区里写入数据

- 相应的，调用者不能有任何假设，这个 buf 会被 read 怎么使用，read 函数也可能会从中读取内容。所以我们需要保证在调用 read 前，这个 buf
  已经被初始化过了，调用没有被初始化的 buf 是不安全的，可能会导致未定义的行为

***关于错误：** 如果遇到了 Error，那就必须保证没有读取过任何字节，如果遇到了`ErrorKind::Interrupted`，而且不能作别的事时，
读取过程就必须被回滚

下面是一个来自 doc 的例子

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;
fn main() -> io::Result<()> {
    let mut f = File::open("foo.txt")?;
    let mut buffer = [0; 10];
    // read up to 10 bytes
    let n = f.read(&mut buffer[..])?;
    println!("The bytes: {:?}", &buffer[..n]);
    Ok(())
}
```

### 3.2 Write

Write 的基本功能就是向 writer 中写入一段 buf，返回写入的字节数 **关于阻塞：** write 会尝试向 writer 中写入整个 buf
里的内容，但是写入可能不成功，或者写入时产生了一个错误，调用一次 write 意味着最多一次尝试写入 write 函数同样不保证 Write
是否处于阻塞状态以等待数据被写入，如果一次写入阻塞了，他可能会返回一个 [`Err`]。

**关于返回值：** 如果`write()`返回的是 [`OK(n)`] , 它的实现就必须保证`0 <- n < buf.len()`。
如果`n == 0`，那可能有两种情况：

1. 被写入的东西已经不会接受新数据了，之后也不一定会
2. 缓冲区 (buffer) 大小确实就是 0

`n` 只要小于缓冲区的长度一般就不是个错误，即使文件还没有被读取完，这种情况可能会发生在，当前只有一部分数据是可用的，或者是 read 操作被一个信号打断了

***关于错误：** 如果遇到了 Error，那就必须保证没有任何字节被成功写入 返回值小于 buf 的长度不被当成是错误
如果遇到了`ErrorKind::Interrupted`，而且不能作别的事时，写入过程就必须被回滚

同样是官方的 demo

```rust
use std::io::prelude::*;
use std::fs::File;
fn main() -> std::io::Result<()> {
    let mut buffer = File::create("foo.txt")?;
    // Writes some prefix of the byte string, not necessarily all of it.
    buffer.write(b"some bytes")?;
    Ok(())
}
```

### 3.3 Seek & BufReader & BufWriter

[`Read`] 和 [`Write`] 是最重要的两个 Trait，除此之外还有两个重要的 Trait[`Seek`] 和 [`BufRead`],
这两个都建立在 reader 只上，用来控制 read 的过程。

[`Seek`] 让你控制下一个字节将要读取的来自哪里

```rust
use std::io;
use std::io::prelude::*;
use std::io::SeekFrom;
use std::fs::File;
fn main() -> io::Result<()> {
    let mut f = File::open("foo.txt")?;
    let mut buffer = [0; 10];
    // skip to the last 10 bytes of the file
    f.seek(SeekFrom::End(-10))?;
    // read up to 10 bytes
    let n = f.read(&mut buffer)?;
    println!("The bytes: {:?}", &buffer[..n]);
    Ok(())
}
```

基于 byte 的接口性能不佳，所以提供了很多基于 buffer 的接口 [`BufRead`] 就提供了更多 Read 相关的 API

```rust
let f = File::open("foo.txt")?;
let mut reader = BufReader::new(f);
let mut buffer = String::new();
// read a line into buffer
reader.read_line(&mut buffer)?;
```

[`BufWriter`] 没有提供更多写入的方法，他只是缓冲了每次调用

```rust
let f = File::create("foo.txt")?;
{
    let mut writer = BufWriter::new(f);

    // write a byte to the buffer
    writer.write(&[42])?;

} // the buffer is flushed once writer goes out of scope
```

## 4. 其他

### 2. Rc & Arc

#### 介绍

> The key to our design is the RefCell type. The heart of RefCell is a pair of
> methods:

```rust
fn borrow(&self) -> Ref<'_, T>;
fn borrow_mut(&self) -> RefMut<'_, T>;
```

> Introducing inherited mutability roots to shared types Shared smart pointer
> types, including Rc and Arc, provide containers that can be cloned and shared
> between multiple parties. Because the contained values may be
> multiply-aliased, they can only be borrowed as shared references, not mutable
> references. Without cells it would be impossible to mutate data inside of
> shared boxes at all!

> It's very common then to put a RefCell inside shared pointer types to
> reintroduce mutability:

```rust
use std::collections::HashMap;
use std::cell::RefCell;
use std::rc::Rc;
fn main() {
    let shared_map: Rc<RefCell<_>> = Rc::new(RefCell::new(HashMap::new()));
    shared_map.borrow_mut().insert("africa", 92388);
    shared_map.borrow_mut().insert("kyoto", 11837);
    shared_map.borrow_mut().insert("piccadilly", 11826);
    shared_map.borrow_mut().insert("marbles", 38);
}
```

> Note that this example uses Rc and not Arc. RefCells are for single-threaded
> scenarios. Consider using Mutex if you need shared mutability in a
> multi-threaded situation

#### try_unwrap()

> Get T from Rc&lt;T&gt; try to use `try_unwrap()`, which moves out the contents
> of an Rc if its refcount is 1 ::: warning unwrap on Result requires that you
> can debug-print the error case. RefCell only implements Debug if T does. Node
> doesn't implement Debug. try:
> Rc::try_unwrap(old_head).ok().unwrap().into_inner().elem :::

### 4. Cell & RefCell

> Shareable mutable containers.
>
> Values of the Cell and RefCell types may be mutated through shared references
> (i.e. the common &T type), whereas most Rust types can only be mutated through
> unique (&mut T) references. We say that Cell and RefCell provide 'interior
> mutability', in contrast with typical Rust types that exhibit 'inherited
> mutability'.
>
> Cell types come in two flavors: Cell and RefCell. Cell provides get and set
> methods that change the interior value with a single method call. Cell though
> is only compatible with types that implement Copy. For other types, one must
> use the RefCell type, acquiring a write lock before mutating.
>
> RefCell uses Rust's lifetimes to implement 'dynamic borrowing', a process
> whereby one can claim temporary, exclusive, mutable access to the inner value.
> Borrows for RefCells are tracked 'at runtime', unlike Rust's native reference
> types which are entirely tracked statically, at compile time. Because RefCell
> borrows are dynamic it is possible to attempt to borrow a value that is
> already mutably borrowed; when this happens it results in thread panic.

### 5. Ref & RefMut

#### Ref::map()

1. example1

```rust
map(Ref< T>, f: F) -> Ref<U>
// Get Ref<T> from Ref<Node<T>>
// my example
pub fn peek_front(&self) -> Option<Ref<T>> {
    self.head.as_ref().map(|node| {
        Ref::map(node.borrow(), |node| &node.elem)
    })
}
```

2. example2

```rust
// Makes a new Ref for a component of the borrowed data.

// The RefCell is already immutably borrowed, so this cannot fail.

// This is an associated function that needs to be used as Ref::map(...). A method would interfere with methods of the same name on the contents of a RefCell used through Deref.

use std::cell::{RefCell, Ref};

let c = RefCell::new((5, 'b'));
let b1: Ref<(u32, char)> = c.borrow();
let b2: Ref<u32> = Ref::map(b1, |t| &t.0);
assert_eq!(*b2, 5)
```
