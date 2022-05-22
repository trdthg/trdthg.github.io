# `print!` 宏详解

```rs
print!("{}", &a)
```

## 1. `print!` 宏

`print!` 宏会调用 `format_args!` 将`"{}", &a`转换为一个 `Arguments` 结构体，接着作为参数传入 `_print`
函数

```rs
macro_rules! print {
    ($($arg:tt)*) => {
        $crate::io::_print($crate::format_args!($($arg)*))
    };
}
```

## 2. `format_args!`

`format_args!` 的实现需要编译器介入 (这里有懂的大佬可以帮忙解答)

```rs
macro_rules! format_args {
    ($fmt:expr) => {{ /* compiler built-in */ }};
    ($fmt:expr, $($args:tt)*) => {{ /* compiler built-in */ }};
}

use std::fmt;
let s = fmt::format(format_args!("hello {}", "world")); assert_eq!(s,
format!("hello {}", "world"));
```

Arguements 结构体签名如下：

```rs
pub struct Arguments<'a> {
    // 字符串
    pieces: &'a [&'static str],

    // 参数列表
    // `ArgumentV1` 结构体包含参数的值，以及它对应的格式化方式（通过 {} {:p} 指定）
    args: &'a [ArgumentV1<'a>],

    // 具体的格式化信息。
    // Arguement 结构体中保存了 对应的参数在 args 中的索引
    // 还有额外的格式化信息，比如参数位置，宽度，填充字符等
    fmt: Option<&'a [rt::v1::Argument]>,
}
```

以下面的代码为例：

```rs
fn main() {
    let a = 1;
    print!("hello{}aa{0}too{:p}ohmygod{:p}", a, &a, &a);
}
```

- 字符串片段有 4 个，所以 pieces 的值为 ["hello", "aa", "too", "ohmygod"]
- 如果有两个连续的 `{}`, 它们中间相当于被插入了一个空字符串。
- 参数只有三个，所以 `arg` 只有三个元素。
- 由于后两个都是使用 `{:p}` 打印地址，所以 `args[1]` 和 `args[2]` 的 `formatter` 的值相同
- 有四个位置需要填充参数，所以 fmt 有 4 个元素。

生成的 Arguements 结构体如图所示：

![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202205221334215.jpg)

下面是 cargo expand 展开后的结果：

```rs
#![feature(prelude_import)]
#[prelude_import]
use std::prelude::rust_2021::*;
#[macro_use]
extern crate std;
use std::fmt::Display;
fn main() {
    let a = 1;
    ::std::io::_print(::core::fmt::Arguments::new_v1_formatted(
        &["hello", "aa", "too", "ohmygod"],
        &[
            ::core::fmt::ArgumentV1::new_display(&a),
            ::core::fmt::ArgumentV1::new_pointer(&&a),
            ::core::fmt::ArgumentV1::new_pointer(&&a),
        ],
        &[
            ::core::fmt::rt::v1::Argument {
                position: 0usize,
                format: ::core::fmt::rt::v1::FormatSpec {
                    fill: ' ',
                    align: ::core::fmt::rt::v1::Alignment::Unknown,
                    flags: 0u32,
                    precision: ::core::fmt::rt::v1::Count::Implied,
                    width: ::core::fmt::rt::v1::Count::Implied,
                },
            },
            ::core::fmt::rt::v1::Argument {
                position: 0usize,
                format: ::core::fmt::rt::v1::FormatSpec {
                    fill: ' ',
                    align: ::core::fmt::rt::v1::Alignment::Unknown,
                    flags: 0u32,
                    precision: ::core::fmt::rt::v1::Count::Implied,
                    width: ::core::fmt::rt::v1::Count::Implied,
                },
            },
            ::core::fmt::rt::v1::Argument {
                position: 1usize,
                format: ::core::fmt::rt::v1::FormatSpec {
                    fill: ' ',
                    align: ::core::fmt::rt::v1::Alignment::Unknown,
                    flags: 0u32,
                    precision: ::core::fmt::rt::v1::Count::Implied,
                    width: ::core::fmt::rt::v1::Count::Implied,
                },
            },
            ::core::fmt::rt::v1::Argument {
                position: 2usize,
                format: ::core::fmt::rt::v1::FormatSpec {
                    fill: ' ',
                    align: ::core::fmt::rt::v1::Alignment::Unknown,
                    flags: 0u32,
                    precision: ::core::fmt::rt::v1::Count::Implied,
                    width: ::core::fmt::rt::v1::Count::Implied,
                },
            },
        ],
        unsafe { ::core::fmt::UnsafeArg::new() },
    ));
    ::std::io::_print(::core::fmt::Arguments::new_v1(
        &[""],
        &[::core::fmt::ArgumentV1::new_display(&&a)],
    ));
}
```

## 3. _print()

只是简单的调用了 `print_to`, 指定了输出到 `stdout`

```rs
pub fn _print(args: fmt::Arguments<'_>) {
    print_to(args, stdout, "stdout");
}
```

print_to 函数具体内容如下，主要就是调用了缓冲区的 `write_fmt` 方法

```rs
fn print_to<T>(args: fmt::Arguments<'_>, global_s: fn() -> T, label: &str)
where
    T: Write,
{
    // 尝试拿到输出的缓冲区 w
    if OUTPUT_CAPTURE_USED.load(Ordering::Relaxed) && OUTPUT_CAPTURE.try_with(|s| {
            s.take().map(|w| { // w: Arc<Mutex<Vec<u8>>>
                // 调用 write_fmt 方法
                let _ = w.lock().unwrap_or_else(|e| e.into_inner()).write_fmt(args);
                s.set(Some(w));
            })
        }) == Ok(Some(()))
    {
        // Successfully wrote to capture buffer.
        return;
    }
    //
    if let Err(e) = global_s().write_fmt(args) {
        panic!("failed printing to {label}: {e}");
    }
}
```

## 4. `w.write_fmt(args)`

```rs
fn write_fmt(&mut self, fmt: fmt::Arguments<'_>) -> Result<()> {
    // 创建一个 Adapter 将 fmt 转化为一个 impl Write，顺便储存错误信息
    struct Adapter<'a, T: ?Sized + 'a> {
        inner: &'a mut T,
        error: Result<()>,
    }

    // 这个 write_str 实际上就是调用了 Vec<u8> 的 write_all() 方法
    impl<T: Write + ?Sized> fmt::Write for Adapter<'_, T> {
        fn write_str(&mut self, s: &str) -> fmt::Result {
            match self.inner.write_all(s.as_bytes()) {
                ...
            }
        }
    }

    let mut output = Adapter { inner: self, error: Ok(()) };
    match fmt::write(&mut output, fmt) {
        Ok(()) => Ok(()),
        ...
    }
}
```

## 5.最后是 fmt::write(&mut output, fmt)

```rs
pub fn write(output: &mut dyn Write, args: Arguments<'_>) -> Result {
    let mut formatter = Formatter::new(output);
    let mut idx = 0;
    match args.fmt {
        None => {
            // 如果没有格式化方法，我们就使用默认的格式化方法。
            // 遍历所有`参数`，每次先输出一个字符串，再使用格式化方法输出一个参数
            for (i, arg) in args.args.iter().enumerate() {
                // 安全性: args.args 和 args.pieces 来自同一个结构体，这里的 get_unchecked 是安全的
                let piece = unsafe { args.pieces.get_unchecked(i) };
                if !piece.is_empty() {
                    // 这里的 formatter 就是之前的 Adapter,
                    // write_str 就是调用 Vec<u8> 对应的实现
                    formatter.buf.write_str(*piece)?;
                }
                (arg.formatter)(arg.value, &mut formatter)?;
                idx += 1;
            }
        }
        Some(fmt) => {
            // 每个格式化方法都有一个对应的参数。每次输出参数前，都输出一个字符串片段
            // 注意：这里是对 fmt 进行遍历，因为参数数量和需要填充数量不是一一对应
            for (i, arg) in fmt.iter().enumerate() {
                ...同上
                // 这里的 run 还是会调用
                // (arg.formatter)(arg.value, &mut formatter)?;
                // 只不过会为 formatter 添加一些额外信息
                unsafe { run(&mut formatter, arg, args.args) }?;
                idx += 1;
            }
        }
    }

    // 打印末尾多余的字符串
    if let Some(piece) = args.pieces.get(idx) {
        formatter.buf.write_str(*piece)?;
    }

    Ok(())
}
```

至此，一个 `print!` 的大体流程就结束了

## 6. 为什么 `print!("{}", &a)` 无法打印出地址

通过上面的讲解，打印的关键就在于下面这行代码：

```rs
// arg：ArgumentV1
(arg.formatter)(arg.value, &mut formatter)?
```

`formatter` 实际上是一个函数指针：

```rs
// This struct represents the generic "argument" which is taken by the Xprintf family of functions. It contains a function to format the given value.
// At compile time it is ensured that the function and the value have the correct types, and then this struct is used to canonicalize arguments to one type.

// 该结构表示 Xprintf 系列函数采用的通用“参数”。 它包含一个格式化给定值的函数。
// 在编译时，确保函数和值具有正确的类型，然后使用此结构将参数规范化为一种类型。

pub struct ArgumentV1<'a> {
    value: &'a Opaque,
    formatter: fn(&Opaque, &mut Formatter<'_>) -> Result,
}
// NB. Argument is essentially an optimized partially applied formatting function,
// equivalent to `exists T.(&T, fn(&T, &mut Formatter<'_>) -> Result`.
extern "C" {
    type Opaque;
}

pub struct Formatter<'a> {
    flags: u32,
    fill: char,
    align: rt::v1::Alignment,
    width: Option<usize>,
    precision: Option<usize>,

    buf: &'a mut (dyn Write + 'a),
}
```

下面是 stackoverflow 上的解答

`print!`, `println!`, `eprint!`, `eprintln!`, `write!`, `writeln!` and `format!`
这些宏会隐式的拿走参数的引用

```rs
fn main() {
    let x = 5;
    println!("{}", x);
}
```

在 nightly 的编译器上使用 `rustc -Z unstable-options --pretty` 展开上面的代码：

> 或者是 `cargo expand`

```rs
#![feature(prelude_import)]
#[prelude_import]
use std::prelude::v1::*;
#[macro_use]
extern crate std;
fn main() {
    let x = 5;
    {
        ::std::io::_print(::core::fmt::Arguments::new_v1(
            &["", "\n"],
            &match (&x,) {
                (arg0,) => [::core::fmt::ArgumentV1::new(
                    arg0,
                    ::core::fmt::Display::fmt,
                )],
            },
        ));
    };
}
```

整理之后就是：

```rs
use std::{fmt, io};

fn main() {
    let x = 5;
    io::_print(fmt::Arguments::new_v1(
        &["", "\n"],
        &[fmt::ArgumentV1::new(&x, fmt::Display::fmt)],
        //                     ^^
    ));
}
```

注意 `&x`.

如果你写的是 `println!("{}", &x)`，Rust 编译器依然能够帮你处理这两层引用;

因为 Rust 为 &T(T: Display) 也实现了 Display

```rs
// 有点像智能指针的 Deref
impl<'a, T> Display for &'a T where T: Display + ?Sized
```
