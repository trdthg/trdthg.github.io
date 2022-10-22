# Rust Quiz

## #1

### 题目

下面的 1 输出是什么？

```rs
macro_rules! m {
    ($( $s:stmt )*) => {
        $(
            { stringify!($s); 1 }
        )<<*
    };
}

fn main() {
    print!(
        "{}{}{}",
        m! { return || true },
        m! { (return) || true },
        m! { {return} || true },
    );
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

宏的输出中的表达式与 `1 << (n - 1)` 效果相同，其中 n 是宏输入中包含的 Rust 语句的数量。

### 解答

答案: 122

这个问题围绕着 Rust 的语法边界设计。

> This question revolves around where the Rust grammar places statement
> boundaries.

宏的输入规则是 `$( $s:stmt )*`, 它能够匹配到 0 或多个 Rust 语句。

该规则内部的 `$s: stmt` 是一个片段分类符，它能够匹配到一个符合 Rust 语法规范的表达式。被匹配到的语句可以在展开后的代码中作为 `$s` 。

而外部的 `$(...)*` 部分表示一个重复，它可以重复匹配 0 或多次内容。

> The input rule of the macro m! is $($s:stmt)* which matches zero or more Rust
> statements. The $(...)* part of the rule is a repetition which matches the
> contents of the repetition zero or more times, and the $s:stmt is a fragment
> specifier that matches a Rust statement (stmt) conforming to the rules of the
> Rust grammar. The matched statements are available within the expanded code as
> the fragment variable $s.

语句是函数体中允许的最高级别的语法单位。下面所有的内容都是语句的例子。

> A statement is the top-level unit of syntax permitted within a function body.
> All of the following are examples of statements.

```rs
// Items are statements.
struct S { x: u64 }

// Let-bindings are statements.
let mut s = S { x: 1 }

// Expressions are statements.
s.x + 1
```

函数体的语法要求某些类型的语句后面有一个分号，但对于宏的语法而言，分号并不是语句的一部分。

> The grammar of function bodies requires that some types of statements are
> followed by a semicolon, but the semicolon is not part of the statement for
> the purpose of macro syntax.

`m!` 将会展开成 0 或多个由 `<<` 分割的 `{ stringify!($s); 1 }`。`$(...)<<*` 部分表示重复语句之间使用 `<<` 作为分隔符。

> The macro m! expands to zero or more copies of `{ stringify!($s); 1 }`
> separated by the `<<` token. The `$(...)<<*` part of the rule is a repetition
> using `<<` as the separator.

在宏中使用 `<<` 作为分隔符非常不常见。最常用的分隔符是逗号，`$(...),*`，其他的单一符号也是允许的。重要的是，`macro_rules!` 把所有的 Rust 内置操作符都当成单 token

> Using `<<` as a separator in a repetition in a macro is highly unusual. The
> most commmonly used separator is the comma, written as `$(...),*`, but any
> other single token is allowed here. Crucially, macro_rules! treats all
> built-in Rust operators as single tokens, even those that consist of multiple
> characters like <<.

`{ stringify!($s); 1 }` 是一个表达式，它的返回值永远是 1。`stringify!($s)` 被丢弃了，所以它和 `{ 1 }` 的效果是相同的。这里使用 `stringify!($s)` 是为了控制重复的次数，规则中定义的标志符

> The `{ stringify!($s); 1 }` is an expression whose value is always 1. The 
> value of `stringify!($s)` is discarded, so this is equivalent to the expression
> `{ 1 }`. The reason for having `stringify!($s)` in there is to control the
> number of times the repetition is repeated, which is determined by which
> fragment variables are used within the repetition. Writing a repetition without
> using any fragment variables inside of it would not be legal.

假设我们调用宏时传入三条语句：

> Suppose we call this macro with three of the statements shown above as input.

```rs
m! {
    struct S { x: u64 }
    let mut s = S { x: 1 }
    s.x + 1
}
```

这个宏会被展开为：

> The macro expands to:

```rs
{ stringify!(struct S { x: u64 }); 1 }
    << { stringify!(let mut s = S { x: 1 }); 1 }
    << { stringify!(s.x + 1); 1 }
```

每个 stringifys 都会被转为字符串字面量：

> Each of the stringifys expands to a string literal:

```rs
{ "struct S { x: u64 }"; 1 }
    << { "let mut s = S { x: 1 }"; 1 }
    << { "s.x + 1"; 1 }
```

字符串字面量的值没有被使用。所以这个结果等价于 `{ 1 } << { 1 } << { 1 }`，也等价于 `1 << 1 << 1`。`<<` 操作符就是左移；结果是 4。

> The values of the string literals are not used. In this case the expression is
> equivalent to `{ 1 } << { 1 } << { 1 }`, which is equivalent to `1 << 1 << 1`.
> The `<<` operator is left-associative; the numeric value of this expression
> is 4.

总的来说，Rust 语句有多少，1 就重复多少次。所以这个宏就相当于 `1 << (n - 1)`。当 n 为 0 时，语句无法展开，会编译失败。

> Altogether, the relevant behavior of this macro is that it evaluates to
> `1 << 1 << 1 << ...` where the number of ones is equal to the number of Rust
> statements in the input of the macro. In closed form, the numeric value is
> `1 << (n - 1)` where n is the number of statements, except in the case that n is
> zero where the macro expands to nothing and we get a syntax error at the call
> site.

剩下的就是判断一下这 3 次调用分别传入了多少个 Rust 语句。

> It remains to determine how many statements are in the three invocations of m! in the quiz code.

1. `return || true`

这是一条 return 语句，他返回的y是一个闭包 `|| true`。等价于 `(|| true)`。所以他会被解析为一条语句，调用 `m!` 的结果是 1。

> This is a return-expression that would return the closure `|| true`. It is
> equivalent to return `(|| true)`. It is parsed as a single statement so the m! invocation evaluates to 1

2. `(return) || true`

这是一条逻辑或语句。`||` 是一个二元运算符，左侧是一个 `(return)` 语句 (或者说 `!` 类型)，右侧是一个表达式 `true`。所以 `(return) || true` 是一个语句，`m!` 的值仍然为 1。

> This is a logical-OR expression. The `||` is a binary operator, where the
> left-hand side is the expression `(return)` (of diverging type `!`) and the
> right-hand side is the expression `true`. This expression is a single statement
> so m! again evaluates to 1.

3. `{return} || true`

这条是两个语句！一个块表达式 `return`，后面又跟一个闭包 `|| true`。

> This one is two statements! A block-statement `{return}` followed by a closure
> expression `|| true`.

Rust 的语法区分了需要分号的表达式 (作为单个表达式) 和无需分号的一组表达式。看看下面的两个例子：

> The Rust grammar distinguishes between expressions that require a semicolon in order to stand alone as a statement, and expressions that can be statements even without a semicolon. Consider two examples:

```rs
// 结尾不需要分号。
for t in vec {
    /* ... */
}

// 结尾需要分号。
self.skip_whitespace()?;
```

不需要分号的表达式都定义在 libsyntex 里。The distinction informs a few different early bail-out cases where the parser decides to finish parsing the current expression.(能力有限，不会翻译)


> The list of expression types that stand alone without a semicolon is defined
> here in libsyntax. The distinction informs a few different early bail-out cases
> where the parser decides to finish parsing the current expression.

块表达式 `{ /* ... */ }` 终止一个表达式，和本题的情况相同。如果这样做在语法上是合理的，那就意味着解析器在块表达式之后不会立即消耗二元运算符。因此，我们可以这样写。

> Relevant to our case is that block expressions `{ /* ... */ }` terminate an
> expression if doing so would be syntactically sensible. The parser does not
> eagerly consume binary operators after a block expression. Thus one might write:

```rs
fn f() -> &'static &'static bool {
    // 块表达式。
    {
        println!("What a silly function.");
    }

    // true 的引用的引用。
    &&true
}
```

为了正确解析这种情况（块表达式后面紧跟一个二元运算符），解析器需要在表达式的末尾及时终止。

> In order to parse a block followed by a binary operator, we would need to make
> it syntactically insensible for the parser to terminate an expression at the
> close curly brace. This would usually be done by wrapping in parentheses.

```rs
fn f() -> bool {
    ({ true } && true)
}
```
总之，该程序的输出是 112。

> Anyhow, the output of the program is 112.

## #2

### 题目

```rs
struct S(i32);

impl std::ops::BitAnd<S> for () {
    type Output = ();

    fn bitand(self, rhs: S) {
        print!("{}", rhs.0);
    }
}

fn main() {
    let f = || ( () & S(1) );
    let g = || { () & S(2) };
    let h = || ( {} & S(3) );
    let i = || { {} & S(4) };
    f();
    g();
    h();
    i();
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

其中一个闭包和另外三个不同。

### 题解

答案: 123

f，g 和 h 都是 `impl Fn()`。闭包的 body 都会被解析为对上面由 BitAnd Trait 定义的 bitwise-AND 操作符的调用。当闭包被调用时，bitwise-AND 会打印出右侧 S 的内容，闭包则返回 `()`。

> The closures f, g, and h are all of type impl Fn(). The closure bodies are parsed as an invocation of the user-defined bitwise-AND operator defined above by the BitAnd trait impl. When the closures are invoked, the bitwise-AND implementation prints the content of the S from the right-hand side and evaluates to ().

闭包 i 则不痛。使用 rustfmt 格式化代码会让他更清晰：

> The closure i is different. Formatting the code with rustfmt makes it clearer how i is parsed.

```rs
let i = || {
    {}
    &S(4)
};
```

闭包体由一个空的块状语句 {} 和后面的对 S(4) 的引用组成，而不是一个 bitwise-AND 操作。i 的类型是 `impl Fn() -> &'static S`。

> The closure body consists of an empty block-statement {} followed by a reference to S(4), not a bitwise-AND. The type of i is impl Fn() -> &'static S.

f对这种情况的解析是由 libsyntax 中的代码管理的。

> The parsing of this case is governed by this code in libsyntax.

## #3

### 题目

```rs
struct S {
    x: i32,
}

const S: S = S { x: 2 };

fn main() {
    let v = &mut S;
    v.x += 1;
    S.x += 1;
    print!("{}{}", v.x, S.x);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

`const` 和 不可变的 `static` 有什么区别？

### 题解

答案: 32

const的语义是，任何在表达式位置上以名称提及的 `const` 都会被 const initializer 的值所替代。上面的代码其实等同于：

> The semantics of const is that any mention of the const by name in expression position is substituted with the value of the const initializer. In this quiz code the behavior is equivalent to:

```rs
struct S {
    x: i32,
}

fn main() {
    let v = &mut S { x: 2 };
    v.x += 1;
    S { x: 2 }.x += 1;
    print!("{}{}", v.x, S { x: 2 }.x);
}
```

这里我只是简单地把每一个提到 S 的地方都用 `const S` 的值来代替，即 `S { x: 2 }`。

> I have simply substituted every mention of S in expresson position with the value of const S which is S { x: 2 }.

main 的第一行等同于：

> The first line of main is equivalent to:

```rs
let mut _tmp0 = S { x: 2 };
let v = &mut _tmp0;
```

main 的第二行改变了 v 指向的 x，在 v 剩余的生命期内，x 仍然可以通过 v 访问，因此打印的第一个字符是 3。

> The second line of main mutates the value pointed to by v. The same value remains accessible through v for the rest of the lifetime of v, which is why the first character printed is 3.

main的第三行改变了一个临时变量，该变量在分号结尾就立即超出了作用域。打印的第二个字符来自一个全新的`S { x: 2 }`，所以第二个打印的是 2。

> The third line of main mutates a temporary that immediately goes out of scope at the semicolon. The second character printed is coming from a brand new S { x: 2 }, so 2 is printed.

这段代码中还有一个问题，是 Rust 中关于命名空间和名字解析的概念。任何指代类型的名字都在类型命名空间，任何指代值的名字都在值命名空间。

这是两组不同的名字，而语言的结构使我们总是可以知道在哪个命名空间中查找一个名字。

> One additional wrinkle in this code is the concept of namespaces and name resolution in Rust. Any name that refers to a type lives in the type namespace, and any name that refers to a value lives in the value namespace. These are two separate sets of names, and the language is structured such that we can always tell which namespace to look up a name in.

在代码的上下文中，结构体 S 的名称是类型名称空间的一部分，而常量 S 的名称是值名称空间的一部分。这就是为什么我们可以，在同一时间看到两个相同名称的不同事物。

> In the context of the quiz code, the name of the struct S is part of the type namespace and the name of the const S is part of the value namespace. That is how we can have seemingly two different things with the same name in scope at the same time.


## #4

### 题目

```rs
fn main() {
    let (.., x, y) = (0, 1, ..);
    print!("{}", b"066"[y][x]);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

`..` 在表达中和模式匹配中含义不同。

> .. means one thing in an expression and something else in a pattern.

### 题解

答案: 54

这个问题展示了 `..`不同含义

> This question demonstrates two different meanings of ...

在表达式的一侧 (右侧), `..` 是构造闰 `Range` 类型的语法, 表达式 `(0, 1, ..)` 是一个拥有三个元素的元组,其中的第三个拥有 RangeFull 类型。

> In expression position, .. is the syntax for constructing various types of ranges. Here the expression (0, 1, ..) is a tuple with three elements, the third one having type RangeFull.

在模式的一侧, `..` 被用来表示任何数量的元素。所以模式 `(.., x, y)` 会匹配到一个拥有两个或者更多元素的元组, 并把倒数第 2 个元素绑定到 x 上，最后一个数绑定到 y 上。

> On the other hand in a pattern, .. is used to mean "any number of elements". So the pattern (.., x, y) matches a tuple with 2 or more elements, binding the second-last one to x and the last one to y.

所以在面的第 1 行, x 的值为 1，y 的值为 `(..)`。因此打印出来的是 `b"066[..][1]"`。

> Coming out of the first line of main, we have x = 1 and y = (..). Thus the value printed is going to be b"066"[..][1].

`b"066"` 是一个表达式,他是一个 Byte 形式的字符串字面量,它的类型是 `&'static [u8; 3]`, 拥有三个 ASCII 字符 `b'0'`, `b'6'`, `b'6'`。 

> The expression b"066" is a byte-string literal of type &'static [u8; 3] containing the three ASCII bytes b'0', b'6', b'6'.

当我们用 RangeFull 对字节串进切片时，我们得到一个长度为 3 的动态大小的切片[u8]，接下来我们访问切片在 1 处的元素，即类型为 u8 的字节 `b'6'`。当打印时，我们看到的是 ASCII 数字 6 的十进制表示，也就是数字54。

> When we slice the byte-string with RangeFull we get a dynamically sized slice [u8] of length 3. Next we access element 1 of the slice, which is the byte b'6' of type u8. When printed, we see the decimal representation of the byte value of the ASCII digit 6, which is the number 54.

## #5

### 题目

```rs
trait Trait {
    fn p(self);
}

impl<T> Trait for fn(T) {
    fn p(self) {
        print!("1");
    }
}

impl<T> Trait for fn(&T) {
    fn p(self) {
        print!("2");
    }
}

fn f(_: u8) {}
fn g(_: &u8) {}

fn main() {
    let a: fn(_) = f;
    let b: fn(_) = g;
    let c: fn(&_) = g;
    a.p();
    b.p();
    c.p();
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

如果你熟悉高级生命周期绑定的语法，可以尝试将 impl 签名中的所有类型和 main 中的类型解构为完全显式的形式。

> If you are familiar with higher-rank trait bound syntax, try desugaring all the types in the impl signatures and types in main into their fully explicit form.

### 题解

答案: 112

第一个 impl 适用于 `fn(T)` 类型的函数指针，其中 T 是任何单一的具体类型。第二个 impl 适用于更高等级的 `for<'a> fn(&'a T)` 类型的函数指针，其中 T 类型的生命周期超过 `'a`。

> The first impl applies to function pointers of type fn(T) where T is any single concrete type. The second impl applies to function pointers of higher-ranked type for<'a> fn(&'a T) for some concrete type T that outlives 'a.

在 main 中，编译器会自动使用类型推导，用某种具体的类型来替代所有出现的 `_`。

> Inside of main, the compiler is going to use type inference to substitute all occurrences of _ in a type by some concrete type.

对于闭包 a，我们推断 `_ = u8`，闭包类型为 `fn(u8)`，接受一个 `u8` 类型的参数并返回 `()`。

> For the closure a we infer _ = u8, yielding the closure type fn(u8) taking an argument of type u8 and returning ().

对于 b，我们推断 `_ = &'x u8`, 为一些具体的生命周期 `'x`，最终将被送入借用检查器。b 的类型是 `fn(&'x u8)`。

> For b we infer _ = &'x u8 for some concrete lifetime 'x that will ultimately feed into the borrow checker. The type of b is fn(&'x u8).

最后，对于 c，我们推断 `_ = u8`，产生更高等级的闭包类型 `<'a> fn(&'a u8)`。

> And finally for c we infer _ = u8, yielding the higher-ranked closure type for<'a> fn(&'a u8).

以此为框架，可以看出，在 main 结尾出会打印 112。

> Framed in this way, it follows that the trait method calls at the end of main print 112.

## #6

### 题目

```rs
use std::mem;

fn main() {
    let a;
    let a = a = true;
    print!("{}", mem::size_of_val(&a));
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

有两个名为 a 的变量，它们各自的类型是什么？

> There are two variables named a. What is the type of each one?

### 题解

答案: 0

这里有两个名为 a e的变量，第二个会 "遮蔽" 第一个，这段程序等价于：

> There are two variables named a, one shadowing the other. The program is equivalent to:

```rs
let a;
let b = a = true;
print!("{}", mem::size_of_val(&b));
```

更进一步，为 b 赋的值是一个表达式 `a = true`;

> Further, the value being assigned to b is the expression a = true.

在 Rust 里，赋值表达式的返回值始终是 `()`。在简化一下代码：

> In Rust, assignment expressions always have the value (). Simplified some more, the quiz code is equivalent to:

```rs
let a = true;
let b = ();
print!("{}", mem::size_of_val(&b));
```

关于它的行为规范，请参考 size_of_val 的文档，但在这种情况下，它被实例化为 `T = ()`，我们最终会打印出 `size_of::<()>()` 的值。

> Refer to the documentation of size_of_val for a specification of its behavior, but in this case it is being instantiated with T = () and we end up printing the value of size_of::<()>().

`()` 是零大小类型或 ZST 的一个例子，在运行时由零字节的数据表示，所以程序会打印出 0。

> () is one example of a zero-sized type or ZST and is represented by zero bytes of data at runtime, so the program prints 0.

## #7

### 题目

```rs
#[repr(u8)]
enum Enum {
    First,
    Second,
}

impl Enum {
    fn p(self) {
        match self {
            First => print!("1"),
            Second => print!("2"),
        }
    }
}

fn main() {
    Enum::p(unsafe {
        std::mem::transmute(1u8)
    });
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #8

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #9

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #10

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #11

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #12

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #13

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #14

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #15

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #16

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #17

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #18

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #19

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #20

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #21

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #22

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #23

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #24

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #25

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #26

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #27

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #28

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #29

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #30

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #5

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## ＃6

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

## #

### 题目

```rs
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出: [ ]

### 提示

### 题解

答案: 

