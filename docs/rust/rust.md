# Rust

## 1. lifetime

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

### 1.什么是智能指针

实现了Deref Trait 和 Drop Trait的就是智能指针

1. Deref Trait: 具有指针语义
2. Drop Trait：拥有内存自动管理的机制

看一眼Box的实现

```rust
#[stable(feature = "rust1", since = "1.0.0")]
impl<T: ?Sized, A: Allocator> Deref for Box<T, A> {
    type Target = T;

    fn deref(&self) -> &T {
        &**self
    }
}
```

我们实现一个智能指针（只实现了Deref Trait）

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

### 2. 智能指针的优点

1. 自动解引用，提升开发体验(deref)

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



2. 自动化管理内存(drop, 作用域外自动释放内存)







###  2. Rc & Arc

#### Introduce

> The key to our design is the RefCell type. The heart of RefCell is a pair of methods:

```rust
fn borrow(&self) -> Ref<'_, T>;
fn borrow_mut(&self) -> RefMut<'_, T>;
```

>Introducing inherited mutability roots to shared types Shared smart pointer types, including Rc and Arc, provide containers that can be cloned and shared between multiple parties. Because the contained values may be multiply-aliased, they can only be borrowed as shared references, not mutable references. Without cells it would be impossible to mutate data inside of shared boxes at all!

> It's very common then to put a RefCell inside shared pointer types to reintroduce mutability:

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

> Note that this example uses Rc and not Arc. RefCells are for single-threaded scenarios. Consider using Mutex if you need shared mutability in a multi-threaded situation

####  try_unwrap()

> Get T from Rc&lt;T&gt; try to use `try_unwrap()`, which moves out the contents of an Rc if its refcount is 1
::: warning
unwrap on Result requires that you can debug-print the error case. RefCell only implements Debug if T does. Node doesn't implement Debug. try: Rc::try_unwrap(old_head).ok().unwrap().into_inner().elem
:::

### 4. Cell & RefCell

> Shareable mutable containers.
>
> Values of the Cell and RefCell types may be mutated through shared references (i.e. the common &T type), whereas most Rust types can only be mutated through unique (&mut T) references. We say that Cell and RefCell provide 'interior mutability', in contrast with typical Rust types that exhibit 'inherited mutability'.
>
> Cell types come in two flavors: Cell and RefCell. Cell provides get and set methods that change the interior value with a single method call. Cell though is only compatible with types that implement Copy. For other types, one must use the RefCell type, acquiring a write lock before mutating.
>
> RefCell uses Rust's lifetimes to implement 'dynamic borrowing', a process whereby one can claim temporary, exclusive, mutable access to the inner value. Borrows for RefCells are tracked 'at runtime', unlike Rust's native reference types which are entirely tracked statically, at compile time. Because RefCell borrows are dynamic it is possible to attempt to borrow a value that is already mutably borrowed; when this happens it results in thread panic.

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

## 3. 常用 Trait

### 3.1 Read

Read Trait的功能是：从数据源拉取(Pull)一定数据到指定的缓冲区，返回读取的字节数。

**关于阻塞：**
read函数不保证Read是否会处于阻塞状态，如果一个read过程阻塞了而且等待失败，那他就会返回一个 [`Err`] 标记。

**关于返回值：**
如果`read()`返回的是 [`OK(n)`] , 它的实现就必须保证`0 <- n < buf.len()`。
如果`n == 0`，那可能有两种情况：
1. reader已经到达了`the end of file`，而且这个`file`可能不会在产生新数据。
注意，这里只是likely，比如：在linux系统中，read可能对一个 [`TcpStream`] 调用了`recv`系统调用，0代表这个连接已经被成功关闭，如果是对 [`File`] , 那就可能意味着确实读取到了文件的末尾，但是如果有更多的数据被追加(append)到文件末尾，那么未来的read操作依然能够正常返回被追加的数据
2. 缓冲区(buffer)大小确实就是0

`n` 只要小于缓冲区的长度一般就不是个错误，即使文件还没有被读取完，这种情况可能会发生在，当前只有一部分数据是可用的，或者是read操作被一个信号打断了

**关于安全性：**
- 因为实现这个Trait是安全的，调用者不能用 `n < buf.len()` 去确保安全，使用unsafe是更要小心确保诸如越界问题是否会发生。
- read不保证buf里的数据是对的，所以不推荐读取缓冲区里的数据，只推荐向缓冲区里写入数据

- 相应的，调用者不能有任何假设，这个buf会被read怎么使用，read函数也可能会从中读取内容。所以我们需要保证在调用read前，这个buf已经被初始化过了，调用没有被初始化的buf是不安全的，可能会导致未定义的行为

***关于错误：**
如果遇到了Error，那就必须保证没有读取过任何字节，如果遇到了`ErrorKind::Interrupted`，而且不能作别的事时, 读取过程就必须被回滚

下面是一个来自doc的例子
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

Write的基本功能就是向writer中写入一段buf，返回写入的字节数
**关于阻塞：**
write会尝试向writer中写入整个buf里的内容，但是写入可能不成功，或者写入时产生了一个错误，调用一次write意味着最多一次尝试写入
write函数同样不保证Write是否处于阻塞状态以等待数据被写入，如果一次写入阻塞了，他可能会返回一个 [`Err`]。

**关于返回值：**
如果`write()`返回的是 [`OK(n)`] , 它的实现就必须保证`0 <- n < buf.len()`。
如果`n == 0`，那可能有两种情况：
1. 被写入的东西已经不会接受新数据了，之后也不一定会
2. 缓冲区(buffer)大小确实就是0

`n` 只要小于缓冲区的长度一般就不是个错误，即使文件还没有被读取完，这种情况可能会发生在，当前只有一部分数据是可用的，或者是read操作被一个信号打断了

***关于错误：**
如果遇到了Error，那就必须保证没有任何字节被成功写入
返回值小于buf的长度不被当成是错误
如果遇到了`ErrorKind::Interrupted`，而且不能作别的事时, 写入过程就必须被回滚

同样是官方的demo
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

[`Read`]和[`Write`]是最重要的两个Trait，除此之外还有两个重要的Trait[`Seek`]和[`BufRead`], 这两个都建立在reader只上，用来控制read的过程。

[`Seek`]让你控制下一个字节将要读取的来自哪里
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

基于byte的接口性能不佳，所以提供了很多基于buffer的接口
[`BufRead`]就提供了更多Read相关的API
```rust
let f = File::open("foo.txt")?;
let mut reader = BufReader::new(f);
let mut buffer = String::new();
// read a line into buffer
reader.read_line(&mut buffer)?;
```
[`BufWriter`]没有提供更多写入的方法，他只是缓冲了每次调用
```rust
let f = File::create("foo.txt")?;
{
    let mut writer = BufWriter::new(f);

    // write a byte to the buffer
    writer.write(&[42])?;

} // the buffer is flushed once writer goes out of scope
```
