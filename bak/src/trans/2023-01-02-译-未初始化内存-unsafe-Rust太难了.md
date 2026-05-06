> 原文链接：https://lucumr.pocoo.org/2022/1/30/unsafe-rust/
>
> **翻译：[trdthg](https://github.com/trdthg)**
>
> 选题：[trdthg](https://github.com/trdthg)
>
> 本文由 [Rustt](https://Rustt.org) 翻译，[StudyRust](https://studyrust.org) 荣誉推出

# 未初始化内存：unsafe Rust 太难了

Rust
在很多意义上不仅仅是一个现代的系统编程语言，也是一个实用的语言。它承诺了自己的安全性，并且提供了一个完整的框架，使得创建安全的抽象成为可能，同时运行时开销很小甚至为
0。你可以使用 unsafe 来明确的脱离安全的 Rust。

如果你之前看过这篇文章，你会惊讶的发现，它和之前的版本大不相同。这篇文章的作者是被 unsafe
的规则所困惑的受害者。我在文章中增加了一个例子，用来更好的展示其中的陷阱。我之前在 Twitter 上说过，编写 unsafe Rust 比 C / C++
更困难，所以我想为我的观点作出一些解释。

## 从 C 到 Rust

我们从下面的例子开始：我们有一个待初始化的结构体。比较有趣的字段是
`name`。它是一个指针，指向一个已经分配好的字符串。除此之外，分配到哪里对我们并不重要，因此我们可以将这个结构体自身分配在栈上。我们的想法是，当这个结构体被初始化之后，它就可以被安全的传递和打印。

```cpp
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

struct role {
    char *name;
    bool disabled;
    int flag;
};

int main() {
    struct role r;
    r.name = strdup("basic");
    r.flag = 1;
    r.disabled = false;
    printf("%s (%d, %s)\n", r.name, r.flag, r.disabled ? "true" : "false");
    free(r.name);
}
```

接下来我们用 Rust 去实现上面的代码。现在我们并不需要过多的关注 Rust
文档，只需要专注于一对一翻译即可。在你阅读下面的代码之前还有一点要注意：我们正在有意的创建一个对 Rust 程序员更熟悉的对象，并且可以被看作公共
API。所以我们在这里直接使用 String，而不是 C 语言的字符串。

```rs
use std::mem;

struct Role {
    name: String,
    disabled: bool,
    flag: u32,
}

fn main() {
    let role = unsafe {
        let mut role: Role = mem::zeroed();
        role.name = "basic".to_string();
        role.flag = 1;
        role.disabled = false;
        role
    };

    println!("{} ({}, {})", role.name, role.flag, role.disabled);
}
```

看到这里，立即就有人想问，这里为什么需要
unsafe？当然了，你的确不需要。但是这段代码使用了一个函数：`std::mem::zeroed`。如果你尝试在最近的 Rust
编译器运行，应该会的得到这个错误：

```rs
thread 'main' panicked at 'attempted to zero-initialize type `Role`,
  which is invalid', src/main.rs:11:30
```

老版本的编译器能够正常运行，但是那其实也是错误的。怎么解决呢？编译器又一次告诉我们解决之法：

```rs
warning: the type `Role` does not permit zero-initialization
  --> src/main.rs:11:30
   |
11 | let mut role: Role = mem::zeroed();
   |                      ^^^^^^^^^^^^^
   |                      |
   |                      this code causes undefined behavior when executed
   |                      help: use `MaybeUninit<T>` instead, and only call
   |                         `assume_init` after initialization is done
   |
```

为什么 `Role` 类型不支持使用 0 初始化呢？我们需要改动那些代码？我们能不能不初始化？

有人可能会想，使用 `#[repr(C)]` 强制结构体使用 C 语言的内存布局，但是这不能解决问题。正如编译器给出的建议，我们需要
`MaybeUninit`。

```rs
use std::mem::MaybeUninit;

struct Role {
    name: String,
    disabled: bool,
    flag: u32,
}

fn main() {
    let role = unsafe {
        let mut uninit = MaybeUninit::<Role>::zeroed();
        let role = uninit.as_mut_ptr();
        (*role).name = "basic".to_string();
        (*role).flag = 1;
        (*role).disabled = false;
        uninit.assume_init()
    };

    println!("{} ({}, {})", role.name, role.flag, role.disabled);
}
```

将 `zeroed` 换为 `MaybeUninit::zeroed` 之后，一切都变了。现在我们不能直接使用结构体，而是要操作一个裸指针。由于裸指针没有实现
`deref`，并且 Rust 中没有 `->` 操作符，我们需要手动解引用，并用这种笨拙的语法分配每一个字段。

首先：这样做可行吗？答案是肯定的。但是它正确吗？不正确。

答案在于，任何像可变引用（&mut）或者是栈上的值本身这样的构造，在 unsafe 代码之外仍然需要一直处于有效的状态。`zeroed` 返回一个值为 0
的结构，我们不能保证它可以有效的表示结构体或者任何其中的字段。在我们的例子中，我们的字符串在所有内容被清零的情况下是有效的，但是这并不能保证，而且是未定义行为。

需要注意的一点是，一个可变引用永远不能指向一个无效的对象，所以在对象的所有字段都被初始化之前，下面的操作是错误的：

```rs
let role = &mut *uninit.as_mut_ptr()
```

所以，让我们把 `zeroed` 改为 `uninit`。如果我们再次运行，程序就会崩溃。

```rs
// let mut uninit = MaybeUninit::<Role>::uninit();
free(): invalid pointer
```

为什么会崩溃呢？答案是，通过给 name 赋值一个新的字符串，我们也 drop 了之前的旧字符串。我们之前只是碰巧没有遇到这种情况，因为 Drop
碰巧能够处理一个被清零的字符串。但现在，我们深入了未定义行为。我们如何解决这个问题呢？我们需要以某种方式直接将字符串写到那里的指针。

我们首先要接受 MaybeUninit 是必要的，现在我们要处理这里的裸指针。这有些麻烦，但是看起来不是特别难。现在我们有两个新问题：我们知道 `&mut X`
是不允许的，但是 `*mut X` 是允许的。我们如何在不使用 `&mut X` 的情况下得到一个 `*mut X`? 讽刺的是，在 Rust 1.51
之前，再不打破任何规则之前，这是不可能的，但是现在，你可以使用 `addr_of_mut!` 宏。

```rs
let name_ptr = std::ptr::addr_of_mut!((*role).name);
```

太棒了，现在我们拿到了 name 的指针，如何写入呢？我们可以使用 `write` 方法。

```rs
addr_of_mut!((*role).name).write("basic".to_string());
```

现在完成了吗？还记得我们是如何使用普通结构体的吗？如果阅读一下文档，你就会发现，结构体的内存布局没有任何保证。事实表明，[尽管目前的文档是这样说的](https://github.com/rust-lang/reference/issues/1151)，但是我们可以依靠字段的对齐性。如果我们处理的是
`#[repr(packed)]`，我们就必须使用 `write_unaligned` 方法来代替。如果 Rust
选择的结构体的一个成员是不对齐的，这是合法的。

最终的代码：

```rs
use std::mem::MaybeUninit;
use std::ptr::addr_of_mut;

struct Role {
    name: String,
    disabled: bool,
    flag: u32,
}

fn main() {
    let role = unsafe {
        let mut uninit = MaybeUninit::<Role>::uninit();
        let role = uninit.as_mut_ptr();
        addr_of_mut!((*role).name).write("basic".to_string());
        (*role).flag = 1;
        (*role).disabled = false;
        uninit.assume_init()
    };

    println!("{} ({}, {})", role.name, role.flag, role.disabled);
}
```

## 什么时候用 `addr_of_mut!`

一般有两种情况：未初始化的内存，未对齐的引用。Rust
不允许用户创建一个未对齐的引用（即时只是暂时的），同时也不允许创建一个对未初始化内存的引用。那么，这些引用是什么时候被创建的呢？

对于下面的代码：`(*flag).flag = 1`，根据 Rust 的规则，如果一个类型没有实现 Drop，这是可以的。如果该类型实现了
Drop，这行代码会产生很多问题：当 `Drop::drop` 被调用时，并且调用在未初始化的内存上，这时我们就需要
`addr_of_mut!`。这就是为什么我们可以直接为 flag 字段赋值，但是我们却需要通过 `addr_of_mut!` 来获取 name
字段，因为它是一个字符串。

## MaybeUninit

对安全的理解随着时间的推移而不断改变。曾经，`mem::uninitialized` 被认为是一个健全的 API，但是在后来，`MaybeUninit`
被引入去解决发现的缺点。但是，由于部分初始化的类型的存在，MaybeUninit 在实践中并不理想。虽然由于 `#[repr(transparent)]`，
MaybeUninit 和 T 是内存兼容的，但是在嵌套使用时的效果并不佳。

有时你需要结构体的某个字段上有一个 MaybeUninit，但是只后你又希望这个抽象不存在，这种情况并不罕见。实际上，在实践中使用 MaybeUninit
是一个充满挑战的体验，但是这篇文章并没有体现出来。

## 我的 unsafe 代码正确吗？

在 2022 年，我承认，我不再对编写 Rust 代码感到自信。unsafe 的规则可能可能都是如此复杂，但是从我多年来阅读过的 unsafe 代码来说，大多数
unsafe 代码都不太关心这些规则，并且无视了它们。`addr_of_mut!`直到 1.53 才被添加到语言中是有原因的。即使到了今天，文档中都说它
Rust 结构体 repr 的对齐方式没有任何保证。

在过去的几年里，似乎发生了这样的事情：Rust 开发者在实践中编写 unsafe
越来越困难，现在的规则是如此复杂，以至于对一个随意的程序员来说非常难以理解，围绕他的文档也很容易被曲解。我在这篇文章的[上一个版本](https://github.com/mitsuhiko/lucumr/blob/48440d3cf151f0d774bc9ad62f903034ca2b30ff/2022/1/30/unsafe-rust.rst)中认为
`addr_of_mut!` 的一些使用是必要的，但实际上并非如此。在有人指出这个错误之前，文章已经得到了大量关注。

这些规则使得 Rust 最好的功能之一越来越难以接近，同时也越来越难以理解。要求存在 MaybeUninit，而不仅仅是过去的
mem::uninitialized API 是显而易见的，但是却展示了语言规则是多么的复杂。

我不认为这是好的。事实上，我认为这根本不是一个好的趋势，好像越来越少的人了解 unsafe Rust。与 C 的互操作性是让 Rust
伟大的一个原因，但是我们现在正在创建巨大的屏障，这是不可取的。更重要的是：编译器在指出我的错误时没有什么帮助。

让 unsafe 变得更符合人体工程学是一个困难的问题，但是它值得被解决。因为有一点很明确：人们不会很快停止编写 unsafe 代码。
