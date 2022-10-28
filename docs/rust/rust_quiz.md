# Rust Quiz

## #1 `statement boundry`

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
3. 程序确定会输出：[ ]

### 提示

宏的输出中的表达式与 `1 << (n - 1)` 效果相同，其中 n 是宏输入中包含的 Rust 语句的数量。

### 解答

答案：122

这个问题围绕着 Rust 的语法边界设计。

> This question revolves around where the Rust grammar places statement
> boundaries.

宏的输入规则是 `$( $s:stmt )*`, 它能够匹配到 0 或多个 Rust 语句。

该规则内部的 `$s: stmt` 是一个片段分类符，它能够匹配到一个符合 Rust 语法规范的表达式。被匹配到的语句可以在展开后的代码中作为 `$s` 。

而外部的 `$(...)*` 部分表示一个重复，它可以重复匹配 0 或多次内容。

> The input rule of the macro m! is $($s:stmt)*which matches zero or more Rust
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

这是一条 return 语句，他返回的 y 是一个闭包 `|| true`。等价于 `(|| true)`。所以他会被解析为一条语句，调用 `m!` 的结果是 1。

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

## #2 `impl BitAnd`

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
3. 程序确定会输出：[ ]

### 提示

其中一个闭包和另外三个不同。

### 题解

答案：123

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

f 对这种情况的解析是由 libsyntax 中的代码管理的。

> The parsing of this case is governed by this code in libsyntax.

## #3 `const initializer`

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
3. 程序确定会输出：[ ]

### 提示

`const` 和 不可变的 `static` 有什么区别？

### 题解

答案：32

const 的语义是，任何在表达式位置上以名称提及的 `const` 都会被 const initializer 的值所替代。上面的代码其实等同于：

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

main 的第三行改变了一个临时变量，该变量在分号结尾就立即超出了作用域。打印的第二个字符来自一个全新的`S { x: 2 }`，所以第二个打印的是 2。

> The third line of main mutates a temporary that immediately goes out of scope at the semicolon. The second character printed is coming from a brand new S { x: 2 }, so 2 is printed.

这段代码中还有一个问题，是 Rust 中关于命名空间和名字解析的概念。任何指代类型的名字都在类型命名空间，任何指代值的名字都在值命名空间。

这是两组不同的名字，而语言的结构使我们总是可以知道在哪个命名空间中查找一个名字。

> One additional wrinkle in this code is the concept of namespaces and name resolution in Rust. Any name that refers to a type lives in the type namespace, and any name that refers to a value lives in the value namespace. These are two separate sets of names, and the language is structured such that we can always tell which namespace to look up a name in.

在代码的上下文中，结构体 S 的名称是类型名称空间的一部分，而常量 S 的名称是值名称空间的一部分。这就是为什么我们可以，在同一时间看到两个相同名称的不同事物。

> In the context of the quiz code, the name of the struct S is part of the type namespace and the name of the const S is part of the value namespace. That is how we can have seemingly two different things with the same name in scope at the same time.

## #4 `..`

### 题目

```rs
fn main() {
    let (.., x, y) = (0, 1, ..);
    print!("{}", b"066"[y][x]);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

`..` 在表达中和模式匹配中含义不同。

> .. means one thing in an expression and something else in a pattern.

### 题解

答案：54

这个问题展示了 `..`不同含义

> This question demonstrates two different meanings of ...

在表达式的一侧 (右侧), `..` 是构造闰 `Range` 类型的语法，表达式 `(0, 1, ..)` 是一个拥有三个元素的元组，其中的第三个拥有 RangeFull 类型。

> In expression position, .. is the syntax for constructing various types of ranges. Here the expression (0, 1, ..) is a tuple with three elements, the third one having type RangeFull.

在模式的一侧，`..` 被用来表示任何数量的元素。所以模式 `(.., x, y)` 会匹配到一个拥有两个或者更多元素的元组，并把倒数第 2 个元素绑定到 x 上，最后一个数绑定到 y 上。

> On the other hand in a pattern, .. is used to mean "any number of elements". So the pattern (.., x, y) matches a tuple with 2 or more elements, binding the second-last one to x and the last one to y.

所以在面的第 1 行，x 的值为 1，y 的值为 `(..)`。因此打印出来的是 `b"066[..][1]"`。

> Coming out of the first line of main, we have x = 1 and y = (..). Thus the value printed is going to be b"066"[..][1].

`b"066"` 是一个表达式，他是一个 Byte 形式的字符串字面量，它的类型是 `&'static [u8; 3]`, 拥有三个 ASCII 字符 `b'0'`, `b'6'`, `b'6'`。

> The expression b"066" is a byte-string literal of type &'static [u8; 3] containing the three ASCII bytes b'0', b'6', b'6'.

当我们用 RangeFull 对字节串进切片时，我们得到一个长度为 3 的动态大小的切片 [u8]，接下来我们访问切片在 1 处的元素，即类型为 u8 的字节 `b'6'`。当打印时，我们看到的是 ASCII 数字 6 的十进制表示，也就是数字 54。

> When we slice the byte-string with RangeFull we get a dynamically sized slice [u8] of length 3. Next we access element 1 of the slice, which is the byte b'6' of type u8. When printed, we see the decimal representation of the byte value of the ASCII digit 6, which is the number 54.

## #5 `T or &T`

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
3. 程序确定会输出：[ ]

### 提示

如果你熟悉高级生命周期绑定的语法，可以尝试将 impl 签名中的所有类型和 main 中的类型解构为完全显式的形式。

> If you are familiar with higher-rank trait bound syntax, try desugaring all the types in the impl signatures and types in main into their fully explicit form.

### 题解

答案：112

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

## #6 `size of ()`

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
3. 程序确定会输出：[ ]

### 提示

有两个名为 a 的变量，它们各自的类型是什么？

> There are two variables named a. What is the type of each one?

### 题解

答案：0

这里有两个名为 a e 的变量，第二个会 "遮蔽" 第一个，这段程序等价于：

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

## #7 `match`

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
3. 程序确定会输出：[ ]

### 提示

调用 `Enum::p` 时传入的参数一定是 `Enum::Second`。

> The argument of the call to Enum::p is guaranteed to be Enum::Second.

### 题解

答案：1

展开隐藏的条件，这段 Enum 的定义其实等同于：

> Filling in the implicit discriminants, the definition of Enum is equivalent to:

```rs
#[repr(u8)]
enum Enum {
    First = 0u8,
    Second = 1u8,
}
```

`unsafe transmute` 只是转移你的注意。`#[repr(u8)]` 会确保我们的类型和 u8 有相同的内存布局，而 `Enum::Second` 的判别会确保 `Enum::Second` 和 1u8 的布局相同。因此这里的 `transmute` 的定义明确，等价于 `Enum::Second`。

> The unsafe transmute is a red herring. The attribute #[repr(u8)] guarantees that our type has the same representation as u8, and the discriminant on Enum::Second guarantees that Enum::Second has the same representation as 1u8. The transmute is well-defined and evaluates to Enum::Second.

如果方法 p 的定时是这样的：

> If the method p had been written as:

```rs
match self {
    Enum::First => print!("1"),
    Enum::Second => print!("2"),
}
```

这个程序会打印 2。

> then this program would print 2.

但是，模式匹配里的两个分支都是通配符，能够匹配到任何值，并把它绑定到 First 或者 Second 上。模式按顺序匹配，所以这里总是会匹配到 First 分支。

> However, as written, both arms of the match expression are wildcard matches that successfully match any value and bind a variable with the name First or Second. Match arms are applied in order so the wildcard match in the first arm is always the one matched.

编译器会给我们两条警告。第一个是它描述了匹配的过程。

> The compiler helps us out with not one but two relevant warnings. First it describes exactly how this match is parsed and why that is probably silly.

```rs
warning: unreachable pattern
  --> questions/007.rs:11:13
   |
10 |             First => print!("1"),
   |             ----- matches any value
11 |             Second => print!("2"),
   |             ^^^^^^ unreachable pattern
```

第二个是编译器意识到了程序员可能写错了代码，并给出了可能正确的提示。

> Second, it recognizes what the programmer has done wrong and what they probably meant to write instead.

```rs
warning[E0170]: pattern binding `First` is named the same as one of the variants of the type `Enum`
  --> questions/007.rs:10:13
   |
10 |             First => print!("1"),
   |             ^^^^^ help: to match on the variant, qualify the path: `Enum::First`
```

在模式中直接写限定路径的方法是把枚举的变体也引入作用域：

> An alternative to writing qualified paths in the pattern is to bring the variants into scope.

```rs
use Enum::*;

match self {
    First => print!("1"),
    Second => print!("2"),
}
```

通过[标准库的 prelude](https://doc.rust-lang.org/std/prelude/index.html)，我们可以在模式匹配中直接使用 `OK` 和 `Some` (而不是 `Result::OK` 和 `Option::Some`)。

> Having variants brought into scope by the standard library prelude is what allows us to write Ok and Some in match arms, rather than the qualified paths Result::Ok and Option::Some.

## #8 `= = >`

### 题目

```rs
macro_rules! m {
    (==>) => { print!("1"); };
    (= = >) => { print!("2"); };
    (== >) => { print!("3"); };
    (= =>) => { print!("4"); };
}

fn main() {
    m!(==>);
    m!(= = >);
    m!(== >);
    m!(= =>);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

根据 `macro_rules!` 的规则，`==` 是一个 token，`=>` 也是一个 token。

> According to macro_rules!, == is one token and => is one token.

### 题解

答案：1214

在 `macro_rules!` 的输入模式中，相邻的标点符号根据它们的用法不同，会被划分为几组。

> Adjacent punctuation characters in the input pattern of a macro_rules! macro are grouped according to how those characters are used by native Rust tokens.

[这里](https://docs.rs/syn/0.15.22/syn/token/index.html#structs)列出了 Rust 中的单字符和多字符 token 列表

> This page contains a list of the single-character and multi-character punctuation tokens involved in the Rust grammar.

列表中的有一个例子，`<<=` 是一个 token，Rust 语法把它作为左移赋值。因此包含 `<<=` 的一个 `macro_rules!` 输入，只有遇到 `<<=` 且中间没有空格时才会匹配。

> As one example from that list, <<= is a single token because the Rust grammar uses that sequence of characters to mean left shift assignment. Thus a macro_rules! input rule containing <<= would only match if all three characters <<= are written consecutively without spaces in the invocation.

但是 `=<<` 在 Rust 语法中不是一个 native token。macro_rules！的解析器会根据贪心将其分解为 Rust 标记。 `=<` 也不是一个 native token，所以首先我们需要匹配一个 `=` 本身。然后，`<<` 是一个 native token。在宏规则中写 `=<<` 的行为与写 `= <<` 的行为完全相同。

> But for example =<< is not a native token in the Rust grammar. The parser of macro_rules! will decompose this into Rust tokens according to a greedy process. =< is also not a native token, so first we would need to match a = by itself. Then << is a native token. Writing =<< in a macro rule behaves exactly the same as writing = <<.

现在让我们以同样的方式分解代码中的规则。

> Now let's decompose the rules in the quiz code the same way.

- `==>` 分解为 `== >`。
- `= = >` 已经被分解了。
- `== >` 已经被分解了。
- `= =>` 已经被分解了。

在我们的宏里，第一条规则加不加空格是一样的。第三条规则是不可达的。

> Our macro is the same as if we had written the first rule with a space. The third rule is unreachable.

```rs
macro_rules! m {
    (== >) => { print!("1"); };
    (= = >) => { print!("2"); };
    (== >) => { print!("3"); };
    (= =>) => { print!("4"); };
}
```

在 main 中，第一行和第三行都符合第一条宏规则。第二行匹配第二条规则，第四行匹配第四条规则。输出结果是 1214。

> Within main, the first and third lines both match the first macro rule. The second line matches the second rule and the fourth line matches the fourth rule. The output is 1214.

过程宏使用更灵活、更强大的宏 API，并且总是能够区分相同字符的不同间隔，例如 `== >` 与 `==>`。

> Procedural macros use a more flexible and powerful macro API and can always distinguish between different spacings of the same characters, such as == > vs ==>.

## #9 `$tt:tt`

### 题目

```rs
macro_rules! m {
    (1) => { print!("1") };
    ($tt:tt) => { print!("2") };
}

macro_rules! e {
    ($e:expr) => { m!($e) };
}

macro_rules! t {
    ($tt:tt) => { e!($tt); m!($tt); };
}

fn main() {
    t!(1);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

一旦被匹配为 `$:expr`，匹配到的表达式就变成了一个不透明的标记树。

> Upon being matched as a $:expr, the matched expression becomes a single opaque token tree.

### 题解

答案：21

这个问题涉及到宏匹配器在匹配宏的元变量时的行为。

> This question involves the behavior of macro matchers as regards matching macro metavariables.

从代码的最后一行看起，`t!(1)` 会匹配到 `t!` 的第一条规则，然后展开为 `e!(1); m!(1);`

> Starting from the bottom of the quiz code, the invocation t!(1) matches the first rule of t! and expands to e!(1); m!(1);.

调用 `e!(1)` 会匹配 `e!` 的第一条规则。作为这个匹配的一部分，表达式 `1` 会被打包成一个不透明的表达式 token，称为 `$e`。在接下来的任何时候，任何 `macro_rules！`宏都不可能查看 `$e` 的内部，唯一可以知道的是 `$e` 是某个表达式。

> The invocation e!(1) matches the first rule of e!. As part of this match, the expression 1 is packaged into an opaque expression token called $e. At no subsequent point will it be possible for any macro_rules! macro to look inside of $e. All that can be known is that $e is some expression.

在任何情况下，`e!(1)` 都会扩展为 `m!($e)`，其中 `$e` 是一个包含 `1` 的不透明表达式。`m!($e)` 并不符合 `m!` 的第一条规则，因为 `$e` 是不透明的。所以它匹配了 `m!` 的第二条规则，并打印出 2。

> In any case, e!(1) expands to m!($e) where $e is an opaque expression containing 1. That m!($e) does not match the first rule of m! because $e is opaque. Instead it matches the second rule of m! and prints 2.

在 `e!(1)` 之后有一个对 `m!(1)` 的调用，来自 `t!` 的展开。这个调用确实符合 `m!` 的第一条规则，并打印出 1。所以这个程序的输出是 21。

> After e!(1) there is an invocation m!(1) coming from the expansion of t!. That one does match the first rule of m! and prints 1. The output of this program is 21.

大多数片段分类符都有这种变为不透明 token 的行为，但有些没有。一旦匹配到就变为不透明 token 的片段分类符：

> Most fragment specifiers have this behavior of becoming opaque token boxes, but some do not. Specifiers that are opaque once matched:

```rs
$:block
$:expr
$:item
$:literal
$:meta
$:pat
$:path
$:stmt
$:ty
```

剩下的片段分类符匹配成功后不会变为不透明的，可以被后续的规则检查到：

> The rest of the specifiers do not become opaque and can be inspected by subsequent rules:

```rs
$:ident
$:lifetime
$:tt
```

比如：

> For example:

```rs
macro_rules! m {
    ('a) => {};
}

macro_rules! l {
    ($l:lifetime) => {
        // $l is not opaque.
        m!($l);
    }
}

l!('a);
```

## #10 `Trait::f`

### 题目

```rs
trait Trait {
    fn f(&self);
}

impl<'a> dyn Trait + 'a {
    fn f(&self) {
        print!("1");
    }
}

impl Trait for bool {
    fn f(&self) {
        print!("2");
    }
}

fn main() {
    Trait::f(&true);
    Trait::f(&true as &dyn Trait);
    <_ as Trait>::f(&true);
    <_ as Trait>::f(&true as &dyn Trait);
    <bool as Trait>::f(&true);
    <dyn Trait as Trait>::f(&true as &dyn Trait);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

这并不能帮助你解决问题，但可能会让你好受些：作者也被这个问题难住了。

> This won't help you answer the question but may help feel better: the quiz author was also stumped by this one.

### 题解

答案：222222

这道题里有一个 Trait 方法 `Trait::f`，同时还有特征对象 `dyn Trait` 的 f 方法。

> This question contains a trait method Trait::f as well as an inherent method f on the trait object type dyn Trait.

据我所知，鉴于这些名字会相互遮蔽，在 `dyn Trait` 实现的 `f` 方法实际上是无法调用的。目前，Rust 中没有任何语法可以在 `dyn Trait` 上调用它的 `f`。

> As far as I know, given that these names shadow each other, the inherent method is literally uncallable. There is currently no syntax in Rust for calling the inherent f on dyn Trait.

如果 trait 方法的名字可以以不同的方式命名，并且只有 `dyn Trait` 的方法被称为 `f`，那么 main 的前两行就会成功调用 `dyn Trait` 的方法。然而，由于写的是被遮蔽的名字，这会导致歧义，最后调用的是 Trait 的方法。

> If the trait method were named something different and only the inherent method were called f, then the first two lines of main would successfully call the inherent method. However, as written with shadowed names, they disambiguate to the trait method.

还有一种可以尝试的语法：

> One additional syntax to try would be:

```rs
<dyn Trait>::f(&true);
<dyn Trait>::f(&true as &dyn Trait);
```

如果特征方法的命名不同，这两个调用都会调用 `dyn Trait` 的 `f` 方法。如果 `dyn Trait` 的方法被命名为不同的东西，这两个方法都会调用 Trait 方法。但是如果 `Trait` 方法和 `dyn Trait` 方法都叫作 f，那么编译器会报告一个歧义。

> If the trait method were named something different, both of these would call the inherent method. If the inherent method were named something different, both of these would call the trait method. But if the trait method and the inherent method are both f then the compiler reports an ambiguity.

```rs
error[E0034]: multiple applicable items in scope
  --> questions/010.rs:18:5
   |
18 |     <dyn Trait>::f(&true);
   |     ^^^^^^^^^^^^^^ multiple `f` found
   |
note: candidate #1 is defined in an impl for the type `dyn Trait`
  --> questions/010.rs:6:5
   |
6  |     fn f(&self) {
   |     ^^^^^^^^^^^
note: candidate #2 is defined in the trait `Trait`
  --> questions/010.rs:2:5
   |
2  |     fn f(&self);
   |     ^^^^^^^^^^^^
   = help: to disambiguate the method call, write `Trait::f(...)` instead
```

也许有一天，在一个被特征方法所遮蔽的特征对象上调用它的方法可能消除歧义。但是现在，代码只能打印出 222222。

> Maybe some day it will be possible to disambiguate a call to an inherent method on a trait object shadowed by a trait method. For now, the quiz code prints 222222.

## #11 `early & late bound`

### 题目

```rs
fn f<'a>() {}
fn g<'a: 'a>() {}

fn main() {
    let pf = f::<'static> as fn();
    let pg = g::<'static> as fn();
    print!("{}", pf == pg);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

f 和 g 的写法是不能互换的。

> The way that f and g are written is not interchangeable.

### 题解

答案：编译失败

比较函数指针是一个坏主意。在优化后的构建中，很容易出现无意义的行为。关于这种行为的一个令人瞠目结舌的例子，请看 [rust-lang/rust#54685](https://github.com/rust-lang/rust/issues/54685)，其中 x == y 同时为真，又不为真。(译者注：该问题已修复)

> Function pointer comparison is generally a Bad Idea. It is easily possible to get nonsensical behavior in optimized builds. For a jaw-dropping example of such behavior, check out rust-lang/rust#54685 in which x == y is both true and not true at the same time.

那就是说，这段代码编译失败。下面是编译的输出：

> That said, the quiz code in this question fails to compile. Here is the compiler output:

```rs
error: cannot specify lifetime arguments explicitly if late bound lifetime parameters are present
 --> questions/011.rs:5:18
  |
5 |     let pf = f::<'static> as fn();
  |                  ^^^^^^^
  |
note: the late bound lifetime parameter is introduced here
 --> questions/011.rs:1:18
  |
1 | fn f<'a>() {}
  |      ^^
```

泛型参数可以是早绑定也可以是晚绑定。目前 (以及可以遇见的未来) 类型参数都是早绑定，但是生命周期参数两者都有可能。

> Generic parameters can be either early bound or late bound. Currently (and for the foreseeable future) type parameters are always early bound, but lifetime parameters can be either early or late bound.

早绑定是在编译器在单态化过程中决定的。因为类型参数总是早绑定，你不能拥有一个泛型未指定的值。

> Early bound parameters are determined by the compiler during monomorphization. Since type parameters are always early bound, you cannot have a value whose type has an unresolved type parameter. For example:

```rs
fn m<T>() {}

fn main() {
    let m1 = m::<u8>; // ok
    let m2 = m; // error: cannot infer type for `T`
}
```

但是，对于生命周期是合法的：

> However, this is often allowed for lifetime parameters:

```rs
fn m<'a>(_: &'a ()) {}

fn main() {
    let m1 = m; // 即使没有提供 'a 也可以
}
```

因为 'a 的具体取值取决与它如何被调用，用户可以省略生命周期参数，他会在调用是决定。生命周期甚至可以在每次调用时都不一样。

> Since the actual choice of lifetime 'a depends on how it is called, we are allowed to omit the lifetime parameter and it will be determined at the call site. The lifetime can even be different for each time it gets called.

鉴于此，我们不能在调用前指定函数上的生命周期。

> For this reason, we cannot specify the lifetime on this function until it is called:

```rs
// error: cannot specify lifetime arguments explicitly if late bound lifetime parameters are present
let m2 = m::<'static>;
```

我们甚至不能让借用检查器提前自动推断：

> We may not even ask the borrow checker to infer it too soon:

```rs
// error: cannot specify lifetime arguments explicitly if late bound lifetime parameters are present
let m3 = m::<'_>;
```

晚绑定参数的概念与 Rust 中的另一个特性 "高阶生命周期" 有些重复。这是一种用于表达特征参数的边界是晚绑定的机制。目前这只限于生命周期参数，但在其他语言（如 Haskell）中也存在同样的想法，用于类型参数，这就是 "高级" 一词的由来。

> The idea of late bound parameters overlaps considerably with a feature of Rust called "higher ranked trait bounds" (HRTB). This is a mechanism for expressing that bounds on a trait's parameters are late bound. Currently this is limited to lifetime parameters, but the same idea exists in other languages (such as Haskell) for type parameters, which is where the term "higher ranked" comes from.

表达 HRTB 的语法需要使用 for 关键字。为了表达上面 m1 的类型，你可以这么写：

> The syntax to express a HRTB for lifetimes uses the for keyword. To express the type of m1 above, we could have written:

```rs
let m1: impl for<'r> Fn(&'r ()) = m;
```

你可以把它看成："这里有一个生命周期参数，但是目前我们不需要知道它具体是什么".

> You can think of this as meaning: "There is a lifetime but we don't need to know what it is just yet".

晚绑定的生命周期是无限制的；没有明确的语法来表达一个晚绑定的生命周期必须超过其他的生命周期。

> Late bound lifetimes are always unbounded; there is no syntax for expressing a late bound lifetime that must outlive some other lifetime.

```rs
error: lifetime bounds cannot be used in this context
 --> src/main.rs:5:20
  |
5 |     let _: for<'b: 'a> fn(&'b ());
  |                    ^^
```

数据类型上的生命周期总是早绑定，除非开发者明确使用 HRBT 的语法。在函数上，生命周期默认是晚绑定，在下列情况下可以是早绑定：

> Lifetimes on data types are always early bound except when the developer has explicitly used the HRTB for syntax. On functions, lifetimes are late bound by default but can be early bound if:

- 生命周期在函数签名之外声明，例如，在一个结构体的方法中;或者

   > The lifetime is declared outside the function signature, e.g. in an associated method of a struct it could be from the struct itself; or

- 生命周期参数被其他一些更长的生命周期所约束。正如我们所看到的，这种约束在 HRTB 中是无法表达的，因为 HRTB 会涉及到生命周期的晚绑定。

   > The lifetime parameter is bounded below by some other lifetime that it must outlive. As we've seen, this constraint is not expressible in the HRTB that would be involved in late binding the lifetime.

根据这些规则，签名 `fn f<'a>()` 有一个晚期绑定的生命周期参数，而签名 `fn g<'a: 'a>()` 有一个早绑定的生命周期参数 -- 尽管这里的约束是无效的。

> By these rules, the signature fn f<'a>() has a late bound lifetime parameter while the signature fn g<'a: 'a>() has an early bound lifetime parameter — even though the constraint here is ineffectual.

通常情况下，这些区别是编译器内部的术语，Rust 程序员在日常编写代码时并不需要了解或思考这些术语。只有在少数边缘情况下，类型系统的这个方面在语言中是可以观察到的，比如在这道 Quiz 的代码中。

> Ordinarily these distinctions are compiler-internal terminology that Rust programmers are not intended to know about or think about in everyday code. There are only a few edge cases where this aspect of the type system becomes observable in the surface language, such as in the original quiz code.

## #12 `let S { x, .. } = S`

### 题目

```rs
struct D(u8);

impl Drop for D {
    fn drop(&mut self) {
        print!("{}", self.0);
    }
}

struct S {
    d: D,
    x: u8,
}

fn main() {
    let S { x, .. } = S {
        d: D(1),
        x: 2,
    };
    print!("{}", x);

    let S { ref x, .. } = S {
        d: D(3),
        x: 4,
    };
    print!("{}", x);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

模式 `S { ref x, .. }` 从 S 类型的值的所有者那里借用了一个 x 成员，并绑定到了变量 x 上。

> The pattern `S { ref x, .. }` borrows a binding x from the owner of a value of type S.

### 题解

答案：1243

模式 `S { ref x, .. }` 从 S 类型的值的所有者那里借用一个绑定的 x。这个问题涉及到 drop 触发的位置。D 在哪里被 drop？

> This question involves drop-placement. Where does D get dropped?

在第一个 let-binding 中，我们将一个 S 类型的值解构为它的 u8 类型的字段 x 以及代表 "S 的其余部分" 的 `..`。`..` 会立即被 drop，因为它不再有所有者。

> In the first let-binding, we destructure a value of type S into its field x of type u8 as well as .. which represents "the rest of S". The part that is the rest of S is dropped immediately at that point because it no longer has an owner.

在第二个 let-binding 中，我们从 S 类型的值的所有者那里借用一个字段 x。在字段 x 被借用期间，整个 S 类型的值将保持在作用域内，并在 main 的闭合大括号处退出作用域。

> In the second let-binding, we borrow a field x from the owner of a value of type S. The whole value of type S remains in scope during the time that its field x is borrowed, and goes out of scope at the close curly brace of main.

最后的输出是 1243。

> The output is 1243.

## #13 `eq`

### 题目

```rs
struct S;

fn main() {
    let [x, y] = &mut [S, S];
    let eq = x as *mut S == y as *mut S;
    print!("{}", eq as u8);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

两个可变引用指向同一个内存位置可以吗？会出什么问题呢？

> Is it okay for two mutable references to point to the same memory location? What could go wrong?

### 题解

答案：1

在这段代码中，S 是一个零大小类型。零大小类型是编译时的概念，在编译过程中会消失，在运行时会以零字节表示。

> In this code, S is a zero sized type or ZST. Zero sized types are compile-time concepts that disappear during compilation and have a runtime representation of zero bytes.

main 的第一行创建了一个类型为 [S; 2] 的本地值。让我们把这个临时值称为 tmp。let-binding 在 tmp 中绑定了两个引用，x 指的是 `&mut tmp[0]`，y 指的是 `&mut tmp[1]`。

> The first line of main creates a local value of type [S; 2]. Let's refer to that temporary as tmp. The let-binding binds two references into tmp, x referring to &mut tmp[0] and y referring to &mut tmp[1].

在 main 的第二行，我们想知道作为指针的 x 和 y 是否有相同的值。

> On the second line of main we want to know whether x and y as pointers have the same value.

数组类型 `[S; 2]` 本身就是一个零大小的类型。你可以通过打印 `std::mem::size_of::<[S; 2]>()` 的值来确认这点。事实上，数组的第一个和第二个元素有相同的内存地址。

> The array type [S; 2] is itself a zero sized type. You can confirm this by printing the value of std::mem::size_of::<[S; 2]>(). Indeed the first and second element of the array have the same memory address.

通常情况下，对同一内存位置有多个可变引用是不安全的，但是在对零大小类型的可变引用的情况下，解引用是不可行的，所以这种方式没有违反任何内存安全保证。

> Ordinarily having multiple mutable references to the same memory location would not be safe, but in the case of mutable references to zero sized types, dereferencing is a no-op so there is no way to violate any memory safety guarantees this way.

## #14 `trait scope`

### 题目

```rs
trait Trait: Sized {
    fn is_reference(self) -> bool;
}

impl<'a, T> Trait for &'a T {
    fn is_reference(self) -> bool {
        true
    }
}

fn main() {
    match 0.is_reference() {
        true => print!("1"),
        false => print!("0"),
    }

    match '?'.is_reference() {
        true => print!("1"),
        false => {
            impl Trait for char {
                fn is_reference(self) -> bool {
                    false
                }
            }
            print!("0")
        }
    }
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

在这个 [Stack Overflow](https://stackoverflow.com/a/28552082/6086311) 的答案中涉及到 trait 方法的自动引用。

> Trait method auto-ref is covered in this Stack Overflow answer.

### 题解

答案：10

程序中所有的 `Trait impls` 都是在作用域内的，所以在一个代码块内编写的对 char 的 Trait impl 没有任何意义。特别是，这个 impl 在整个程序中都是可见的，而不仅仅是在包含该 impl 的代码块中。

> Trait impls anywhere in a program are always in scope, so there is no significance to the impl Trait for char being written inside of a block of code. In particular, that impl is visible throughout the whole program, not just within the block containing the impl.

这个问题与 trait 方法自动引用的行为有关，这个问题在 [Stack Overflow](https://stackoverflow.com/a/28552082/6086311) 的答案中有所涉及。

> This question relates to the behavior of trait method auto-ref which is covered in this Stack Overflow answer.

对 `0.is_reference()` 的调用观察到没有一个我们可以直接调用的为整数类型的 Trait 的实现。所以方法解析自动插入了一个引用，即 `(&0).is_reference()`。这一次的调用与 `&'a, T> Trait` 的 `impl<'a, T>` 匹配，并打印出 1。

> The call to 0.is_reference() observes that there is no implementation of Trait for an integer type that we could call directly. Method resolution inserts an auto-ref, effectively evaluating (&0).is_reference(). This time the call matches impl<'a, T> Trait for &'a T and prints 1.

对 `'?'.is_reference()` 的调用反而找到了 `char` 的 `implated Trait`，打印出 0。

> The call to '?'.is_reference() instead finds impl Trait for char, printing 0.

## #15 `type inference`

### 题目

```rs
trait Trait {
    fn f(&self);
}

impl Trait for u32 {
    fn f(&self) {
        print!("1");
    }
}

impl<'a> Trait for &'a i32 {
    fn f(&self) {
        print!("2");
    }
}

fn main() {
    let x = &0;
    x.f();
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

类型推断会推断出 x 是什么类型？

> What type would type inference infer for x?

### 题解

答案：1

在类型推断过程中，变量 x 的类型是 `&{integer}`，是对某个尚未确定的整数类型的引用。

> During type inference the variable x has type &{integer}, a reference to some as yet undetermined integer type.

如果我们想解决 trait 方法的调用 `Trait::f(x)`，我们发现它的参数 x 必须是 `&Self` 类型，即实现了 Trait 的某个 Self 类型。我们发现推断 `0: u32` 既满足了 u32 是一个整数的约束，也满足了 u32 实现了 Trait，所以这个方法调用最终调用了 `<u32 as Trait>::f(x)` 并打印出 1。

> If we want to resolve the trait method call Trait::f(x), we find that its argument x must be of type &Self for some type Self that implements Trait. We find that inferring 0: u32 satisfies both the constraint that u32 is an integer as well as u32 implements Trait, so the method call ends up calling `<u32 as Trait>::f(x)` and prints 1.

在这个 [Stack Overflow](https://stackoverflow.com/a/28552082/6086311) 的答案中详细介绍了 Trait 方法的解析。

> Trait method resolution is covered in more detail in this [Stack Overflow](https://stackoverflow.com/a/28552082/6086311) answer.

## #16 `--i`

### 题目

```rs
fn main() {
    let mut x = 4;
    --x;
    print!("{}{}", --x, --x);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

Rust 所支持的运算符集在 `std::ops` 中有相关文档。

> The set of operators supported by Rust is documented in std::ops.

### 题解

答案：44

与 C 或 Java 不同，Rust 中没有自增自减运算符。Rust 语言设计的 FAQ（网上已经没有了）曾经涉及过原因。

> Unlike C or Java, there is no unary increment or decrement operator in Rust. The Rust language design FAQ (no longer available online) used to touch on the reason:

为什么 Rust 没有自增和自减运算符？

> Why doesn't Rust have increment and decrement operators?

Preincrement 和 Postincrement（以及与之对应的 Decrement），虽然方便，但也相当复杂。它们需要对计算顺序足够了解，并经常导致 C 和 C++ 中一些微妙的错误和未定义的行为。

> Preincrement and postincrement (and the decrement equivalents), while convenient, are also fairly complex. They require knowledge of evaluation order, and often lead to subtle bugs and undefined behavior in C and C++. x = x + 1 or x += 1 is only slightly longer, but unambiguous.

在没有自减运算符的情况下，`--x` 被解析为 `-(-x)`。在 `x = 4` 的情况下，这将是 `-(-4)`，也就是 4。该程序等同于：

> In the absense of a decrement operator, --x is parsed as -(-x). In the case of x = 4 this would be -(-4) which is 4. The program is equivalent to:

```rs
fn main() {
    let mut x = 4;
    4;
    print!("{}{}", 4, 4);
}
```

## #17 `-- - --`

### 题目

```rs
fn main() {
    let mut a = 5;
    let mut b = 3;
    print!("{}", a-- - --b);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

Rust 支持的操作符都在 `std：：ops`。

> The set of operators supported by Rust is documented in std::ops.

### 题解

答案：2

不像 C 或者 Java，Rust 没有自增和自减运算符。Rust 语言设计的 FAQ（网上已经没有了）曾经探讨过这个原因。

> Unlike C or Java, there is no unary increment or decrement operator in Rust. The Rust language design FAQ (no longer available online) used to touch on the reason:

为什么 Rust 没有自增和自减运算符？

Preincrement (`++i`) 和 Postincrement (`--i`)（以及与之对应的 Decrement），虽然方便，但也相当复杂。用户需要知道求值顺序，这经常导致一些 C 和 C++ 中微妙的错误和未定义的行为。

> Why doesn't Rust have increment and decrement operators?
> Preincrement and postincrement (and the decrement equivalents), while convenient, are also fairly complex. They require knowledge of evaluation order, and often lead to subtle bugs and undefined behavior in C and C++. x = x + 1 or x += 1 is only slightly longer, but unambiguous.

在没有自减运算符 (包括 `i--` 和 `--i`) 的情况下，`a-- --b` 会被解析为 `a-(-(-(-b))))`。在 `a=5` 和 `b=3` 的情况下，这个表达式的值是 `5-3`，也就是 `2`。

> In the absense of postfix and prefix decrement operators, a-- - --b is parsed as a - (-(-(-(-b)))). In the case of a = 5 and b = 3 the value of this expression is 5 - 3 which is 2.

## #18 `f() and f()`

### 题目

```rs
struct S {
    f: fn(),
}

impl S {
    fn f(&self) {
        print!("1");
    }
}

fn main() {
    let print2 = || print!("2");
    S { f: print2 }.f();
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

调用 `.f()` 可以解析为字段 f 或固有的方法 f，你如何写出对另一个的调用？

> The call .f() resolves to either the field f or the inherent method f. How would you write a call to the other one?

### 题解

答案：1

一个看起来像 `.f()`的调用总会解析到一个方法，在这里是固有的方法 `S::f`。如果作用域内没有方法 f，那么即使字段 f 存在并包含一个函数指针，这样的调用也不能编译。

> A call that looks like .f() always resolves to a method, in this case the inherent method S::f. If there were no method f in scope, a call like this would fail to compile even if a field f exists and contains a function pointer.

为了调用存储在字段 f 中的函数指针，我们需要在字段周围写上圆括号。

> To call the function pointer stored in field f, we would need to write parentheses around the field access:

```rs
fn main() {
    let print2 = || print!("2");
    (S { f: print2 }.f)();
}
```

## #19 `move or drop`

### 题目

```rs
struct S;

impl Drop for S {
    fn drop(&mut self) {
        print!("1");
    }
}

fn main() {
    let s = S;
    let _ = s;
    print!("2");
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

s 所有权移动了吗？

> Does s get moved?

### 题解

答案：21

相关的一行是 `let _ = s`。如果这一行没有移动 s，那么 s 将继续存在，直到大括号结尾，程序将打印 21。但是如果这一行移动了 s，而没有绑定它，那么被移动的 S 类型的值将被立即 drop，程序将打印 12。

> The relevant line is let _ = s. If this line does not move s then s will continue to live until the close curly brace and the program would print 21. But if this line does move s, without binding it, then the moved value of type S would be dropped immediately and the program would print 12.

事实上，s 并没有被移动，输出结果是 21。

> In fact s does not get moved and the output is 21.

## #20 `return and return`

### 题目

```rs
fn return1() {
    if (return { print!("1") }) {
    }
}

fn return2() {
    if return { print!("2") } {
    }
}

fn break1() {
    loop {
        if (break { print!("1") }) {
        }
    }
}

fn break2() {
    loop {
        if break { print!("2") } {
        }
    }
}

fn main() {
    return1();
    return2();
    break1();
    break2();
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

Rust 中涉及 break 的语法与涉及 return 的语法不同。

> The Rust grammar involving break is different from the grammar involving return.

### 题解

答案：121

让我们以此研究这些函数。

> Let's work through the functions one at a time.

- `fn return1`

    if 语句的，条件。被解析为一个表达式，这个表达式会返回 `{ print!("1") }` 即 ().这个值需要在返回前被计算，所以最终打印 1.

   > The condition of the if-statement is parsed as a return-expression that returns the value { print!("1") } of type (). The value needs to be evaluated prior to being returned so this function prints 1.

- `fn return2`

   这个函数和 `return1` 一样。`return` 关键字会立即消耗掉返回值，即使返回值被大括号包裹．甚至是在 if 语句的条件中，大括号 (例如结构体) 通常也不会被接受。

   > This function is parsed the same as return1. The return keyword eagerly consumes a trailing return value, even if the return value begins with a curly brace, and even in the condition of an if-statement where curly braces such as in a struct literal would ordinarly not be accepted. This function prints 2.

- `fn break1`

    if 语句的条件是是个 break-with-value 表达式，它会结束整个循环，并返回 `{ print!("1") }`, 即 ()，和 `return1` 类似，为了在打破循环时返回值，这个值需要被计算，所以最终打印 1；

    > The condition of the if-statement is a break-with-value expression that breaks out of the enclosing loop with the value { print!("1") } of type (). Similar to return1, in order to break with this value the value needs to be evaluated and this function prints 1.

- `fn break2`

    这里我们可以看到 break 和 return 语法的区别。不像 return，if 条件里的 break 关键字不会立即解析出后面大括号的值。这段代码会被解析为：

    > Here we observe a difference between the grammar of break and the grammar of return. Unlike return, the break keyword in the condition of this if-statement does not eagerly parse a value that begins with a curly brace. This code is parsed as:

    ```rs
    loop {
        if break {
            print!("2")
        }
        {}
    }
    ```

    我们在执行 print 前打破了循环，所以这个函数不会执行 print.

    > We break out of the loop before executing the print, so this function does not print anything.

    我相信 return 和 break 不同的原因是，return 在 Rust 1.0 以及之前显然都是支持的，但是 break-with-value 是在 Rust 1.19 才被引入之后。`break2` 中的代码一直都是合法的 Rust 代码，所以在实现 break-with-value 这个语言特性时也考虑到不能改变它的行为。

    > I believe the reason for the difference between return and break is that returning a value was obviously supported at Rust 1.0 and well before, but break-with-value was introduced fairly late, in Rust 1.19. The code in break2 was perfectly legal Rust code prior to Rust 1.19 so we cannot change its behavior when implementing the break-with-value language feature.

    未来的版本有可能对这两种语法进行调整，使之相互一致。

    > It is possible that a future Edition would adjust the two grammars to align with each other.

main 的输出为 121。

> The output from main is 121.

## #21 `return & break`

### 题目

```rs
trait Trait {
    fn f(&self);
}

impl<F: FnOnce() -> bool> Trait for F {
    fn f(&self) {
        print!("1");
    }
}

impl Trait for () {
    fn f(&self) {
        print!("2");
    }
}

fn main() {
    let x = || { (return) || true; };
    x().f();

    let x = loop { (break) || true; };
    x.f();

    let x = || { return (|| true); };
    x().f();

    let x = loop { break (|| true); };
    x.f();

    let x = || { return || true; };
    x().f();

    let x = loop { break || true; };
    x.f();
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

在本题中，break 和 return 关键字的语法是一样的。

> The break and return keywords have the same grammar in this question.

### 题解

答案：221111

我们想知道 `return || true;` 和 `break || true;` 的每一个可能的括号是否评估为闭包 `|| true` 或单位值 ()。

> We want to know whether each possible parenthesization of return || true; and break || true; evaluates to the closure || true or to the unit value ().

- `let x = || { (return) || true; };`

    在这一行，x 是一个返回 () 的闭包。等价于 `let x = || {}`.当我们调用 `x().f()` 时，方法 f 会被解析为 `impl Trait for ()`, 并打印 2.

    > On this line, x is a closure that returns (). It is equivalent to let x = || {}. When we call x().f(), the method f resolves to impl Trait for () which prints 2.

    表达式 `(treturn)` 的类型是原始的 never 类型，通常写成 `！`。计算 `! || true` 是合法的，因为 `!` 可以转为任何类型，在这里是 `bool`。表达式 `! || true` 是一个逻辑或，左侧和右侧都是 `bool`。

    > The type of the expression (return) is the primitive never type, usually written as !. It is legal to compute ! || true because ! can fill in for any type, in this case bool. The expression ! || true is a logical-OR with bool on both the left-hand side and right-hand side.

    `!` 可以转为任何类型的行为允许我们写出如下代码：

    > The behavior of ! of filling in for any type is what allows us to write:

    ```rs
    fn f() -> bool {
        unimplemented!()
    }
    ```

    其中 `unimplemented!()` 的类型，因为它在没有求值的情况下直接 panic，它的返回值类型也是 `！`。

    > in which the type of unimplemented!(), since it panics without evaluating to any value, is also !.

- `let x = loop { (break) || true; };`

    和 `(return)` 类似，`(break)` 的类型也是 `!`. 这行代码会打破循环，并返回 `()`, 所以 `x` 的类型是 `()`.调用 `x.f()` 会打印 2.

    > Similar to (return), the type of (break) is the never type !. This code breaks out of the loop with the implicit value (), so x is of type (). Calling x.f() will print 2.

- `let x = || { return (|| true); };`

    在这一行，`x` 是一个闭包，它返回一个返回 true 的闭包。你可以写 `x()()`，它的值会是 true。

    > On this line x is a closure that returns a closure that returns true. You could write x()() and that would be true.

    Quiz 代码调用了 `x().f()`, 这会解析为 `impl<F> Trait for F where F: FnOnce() -> bool`. 最终打印 1.

    > The quiz code calls x().f() which resolves to impl<F> Trait for F where F: FnOnce() -> bool. That trait impl prints 1.

- `let x = loop { break (|| true); };`

    这是一个包含 `break-with-value` 表达式的循环。`break` 的参数变成了循环的返回值。这段代码等同于 `let x = || true`。

    > This is a loop containing a break-with-value expression. The argument of the break becomes the value of the enclosing loop. This code is equivalent to let x = || true.

    当我们调用 `x.f()` 时，它使用了 FnOnce 的 Trait 实现，打印出 1。

    > When we call x.f() it uses the FnOnce impl of Trait which prints 1.

- `let x = || { return || true; };`

    现在我们来到了这个问答问题的核心。`return || true` 的解析与 `(return) || true` 相同，还是与 `return (|| true)` 相同？

    > Now we arrive at the meat of this quiz question. Is return || true parsed the same as (return) || true or as return (|| true)?

    结果是后者，所以 x 是一个返回 true 的闭包。`x().f()` 打印 1。

    > It turns out to be the latter, so x is a closure that returns a closure that returns true. x().f() prints 1.

- `let x = loop { break || true; };`

    这个也是类似的问题，这是 `(break) || true` 还是 `break (|| true)`？

    > Similar question here, is this (break) || true or break (|| true)?

    `break-with-value` 语言功能是在 1.0 之后的两年后 (Rust 1.19) 加入的。在 break-with-value 之前，`break || true` 是完全合法的 Rust 代码，解析为 `(break) || true`。

    > The break-with-value language feature was added to Rust more than two years after 1.0, in Rust 1.19. Prior to break-with-value, break || true was perfectly legal Rust code that parsed as (break) || true.

    在 Rust 1.19 中，这段代码的行为被语言无意中打破了，现在它被解析为 `break (|| true)`，打印出来的值是 1。

    > In Rust 1.19 the behavior of this code was unintentionally broken by the language such that now it parses as break (|| true) and the printed value is 1.

    如果我们在 Rust 1.19 的开发过程中注意到这种意义上的变化，我们可能会调整解析以保留现有代码的意义。不幸的是，这样做会导致语法在 return 和 break 之间有不同的表现，除了历史的意外，没有任何合理的理由。

    > If we had noticed this change in meaning during the development of Rust 1.19, we may have adjusted the parsing to preserve the meaning of existing code. Unfortunately doing so would result in a grammar that behaves differently between return and break for no justifiable reason other than an accident of history.

    或者，我们也有可能认为这是一个永远不会出现在真实代码中的语法边缘案例，用 Crater 来验证这一假设，并有意打破这一行为。

    > Or it is possible we would have ruled this an edge case of syntax that would never appear in real code, used Crater to validate that hypothesis, and broken the behavior intentionally.

main 的完整输出是 221111.

> The total output from main is 221111.

## #22 `- is a token`

### 题目

```rs
macro_rules! m {
    ($a:tt) => { print!("1") };
    ($a:tt $b:tt) => { print!("2") };
    ($a:tt $b:tt $c:tt) => { print!("3") };
    ($a:tt $b:tt $c:tt $d:tt) => { print!("4") };
    ($a:tt $b:tt $c:tt $d:tt $e:tt) => { print!("5") };
    ($a:tt $b:tt $c:tt $d:tt $e:tt $f:tt) => { print!("6") };
    ($a:tt $b:tt $c:tt $d:tt $e:tt $f:tt $g:tt) => { print!("7") };
}

fn main() {
    m!(-1);
    m!(-1.);
    m!(-1.0);
    m!(-1.0e1);
    m!(-1.0e-1);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

macro 会计算输入的 "token" 的数量。

> The macro is counting how many "tokens" are in its input.

### 题解

答案：22222

所有的 m！调用都传递了两个标记作为输入：一个减号，然后是一个整数或浮点字样的标记。

> All five invocations of m! pass two tokens as input: a minus sign followed by an integer or floating point literal token.

浮点字面符号 `1.`、`1.0`、`1.0e1`、`1.0e-1` 都是单一的原子符号。

> The floating point literals 1., 1.0, 1.0e1, 1.0e-1 are each a single atomic token.

Rust 编译器内置的解析器总是将负号作为一个单独的标记，与数字进行区分。然而，在过程宏中，用户定义的解析器可以通过向 `proc_macro::Literal` 的构造器之一传递一个负的整数或负的浮点数来构造一个负数作为单个标记。如果这样的负数最终出现在随后的过程宏调用的输入中，则由编译器决定是重写成一对标记还是将其作为一个标记。

> The parser built into the Rust compiler always parses a negative sign as a separate token from the numeric literal that is being negating. However, it is possible for a user-defined parser within a procedural macro to construct a negative number as a single token by passing a negative integer or negative floating point value to one of the constructors of proc_macro::Literal. If such a negative literal ends up in the input of a subsequent procedural macro invocation, it is up to the compiler whether to rewrite into a pair of tokens or keep them as one.

编译器的解析器的行为在语言表面也是可以观察到的，不仅仅是在宏中。例如，下面的代码打印出 -81，因为表达式被解析为 `-(3i32.pow(4))` 而不是 `(-3i32).pow(4)`。

> The behavior of the compiler's parser is observable in the surface language as well, not only in macros. For example the following code prints -81 because the expression is parsed as -(3i32.pow(4)) rather than (-3i32).pow(4).

```rs
fn main() {
    let n = -3i32.pow(4);
    println!("{}", n);
}
```

## #23 `method lookup order`

### 题目

```rs
trait Trait {
    fn f(&self);
    fn g(&self);
}

struct S;

impl S {
    fn f(&self) {
        print!("1");
    }

    fn g(&mut self) {
        print!("1");
    }
}

impl Trait for S {
    fn f(&self) {
        print!("2");
    }

    fn g(&self) {
        print!("2");
    }
}

fn main() {
    S.f();
    S.g();
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

我不能帮助你解决这个问题。这是由语言本身做出的一个相当随意的选择。试试所有的可能吧！

> I can't help you with this one. This is a pretty arbitrary choice made by the language. Try all the possibilities!

### 题解

答案：12

`S.f()` 会调用固有方法 f。如果一个固有方法和一个 Trait 方法同名，并且返回值相同，普通的方法调用总是会选择固有方法。调用这必须写 `Trait::f(&s)` 或者 `<S as Trait>::f(&s)` 去调用 Trait 方法。 

> S.f() calls the inherent method f. If an inherent method and a trait method have the same name and receiver type, plain method call syntax will always prefer the inherent method. The caller would need to write `Trait::f(&S)` or `<S as Trait>::f(&S)` in order to call the trait method.

对于宏的作者来说，意识到这一点很重要。宏生成的代码通常不应该使用普通的方法调用语法来调用用户定义的类型上的特征方法。这些调用可能会被与特质方法同名的固有方法无意中劫持。

> It is important for macro authors to be aware of this. Macro-generated code typically should not use method call syntax to invoke trait methods on types defined by the user. Those calls could get unintentially hijacked by inherent methods having the same name as the trait method.

另一方面，`S.g()` 调用特质方法 `g`。在方法解析过程中，如果 `&` 和 `＆mut` 都可以调用，自动引用总是倾向于将某样东西变成 `&`，而不是将其变成 `&mut`。

> On the other hand, S.g() calls the trait method g. Auto-ref during method resolution always prefers making something into & over making it into &mut where either one would work.

请参阅 [Stack Overflow](https://stackoverflow.com/a/28552082/6086311) 的答案，了解方法解析过程中自动引用的更详细解释。

> See this Stack Overflow answer for a more detailed explanation of auto-ref during method resolution.

## #24 `Hygiene`

### 题目

```rs
fn main() {
    let x: u8 = 1;
    const K: u8 = 2;

    macro_rules! m {
        () => {
            print!("{}{}", x, K);
        };
    }

    {
        let x: u8 = 3;
        const K: u8 = 4;

        m!();
    }
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

宏的卫生性只是用于局部变量。

> Hygiene in macro_rules! only applies to local variables.

### 题解

答案：14

这个程序打印出 14，因为宏的 "卫生性"(Hygiene) 只适用于局部变量。

> This program prints 14 because hygiene in macro_rules! only applies to local variables.

你可以把 Hygiene 想象成：给每次提到的局部变量的名字分配一种颜色，允许在范围内有多个可区分的局部变量同时具有相同的名字。

> You can imagine hygiene as a way of assigning a color to each mention of the name of a local variable, allowing for there to be multiple distinguishable local variables in scope simultaneously with the same name.

在 main 的顶端，假设我们认为局部变量 x 的名字是紫色的 x，常量 K 的名字只是普通的 K，因为常量被认为是项 (Item) 而不是局部变量（你可以把项放在函数体之外；但是不能把局部变量放在函数体之外）。

> At the top of main, suppose we consider the name of the local variable x to be a purple x. The name of the constant K is just plain K, as constants are considered items rather than local variables (you can place items outside of a function body; you cannot place local variables outside of a function body).

```
let   x: u8 = 1; // x 为紫色
const K: u8 = 2; // K 为无色
```

我们继续往下看，在 macro m! 的声明中，有两个被用到的标识符。因为作用域内有一个变量 x，所以在 m! 内使用的标识符 x 的颜色与局部变量 x 相同。在作用域内没有局部变量 K，所以在宏的声明中的 K 被分配了一些新的颜色，例如橙色。

> Continuing down the body of main, within the declaration of the macro m! there are identifiers x and K being used. Since there is a local variable x in scope, the use of the identifier x within the macro body picks up the same color as the local variable x. There is no local variable K in scope so the K within the declaration of the macro is assigned some new color, say orange.

```
macro_rules! m {
    () => {
        print!("{}{}", x, K); // x 为紫色，K 为橙色
    };
}
```

接下来我们进入一个新的作用域（用大括号划定），包含另一个 x 和 K。每一个新的局部变量总是会引入一个新的颜色，所以我们把这个 x 叫做蓝色。const 依然不是一个局部变量，所以没有给 K 分配颜色。

> Next we enter a new scope (delimited by curly braces) containing another x and K. Every new local variable always introduces a new color so let's call this x blue. The const again is not a local variable so no color is assigned to K.

```
{
    let   x: u8 = 3; // x 为蓝色
    const K: u8 = 4; // K 为无色

    m!();
}
```

当 `m!()` 展开时，展开的代码包含一个紫色的 x 和一个橙色的 K。紫色的 x 可以和蓝色的 x 区分开来，所以紫色的 x 的值被打印出来，是 1。至于 K，一个不卫生的（未着色的）K 被允许像任何颜色一样。第二个 K 会遮蔽第一个 K。当 m! 寻找一个橙色的 K 时，会识别到第二个 K，第二个 K 的值被打印出来，即 4。

> When m!() expands, the expanded code refers to a purple x and an orange K. The purple x is distinguishable from the blue x -- the value of the purple x is printed which is 1. As for the K, an unhygienic (uncolored) K is allowed to act like any color. The second K is shadowing the first one. It gets picked up when looking for an orange K and its value is printed, which is 4.

所以输出是 14。

> So the output of the quiz code is 14.

## #25 `drop`

### 题目

```rs
use std::fmt::{self, Display};

struct S;

impl Display for S {
    fn fmt(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str("1")
    }
}

impl Drop for S {
    fn drop(&mut self) {
        print!("2");
    }
}

fn f() -> S {
    S
}

fn main() {
    let S = f(); 
    print!("{}", S);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

弄清楚哪些值被哪些变量所拥有。当一个值不再有所有者时，它就被 drop 了。

> Figure out what values are owned by which variables where. A value is dropped when it no longer has an owner.

### 题解

答案：212

程序打印 212。

> This program prints 212.

在函数 f 内，没有 S 会被 drop。f 函数内产生一个 S，然后把它的所有权返回给 f 的调用者；调用者会决定什么时候 drop 掉他拿到的 S。

> No value of type S gets dropped within the body of function f. The function f conjures an S and returns ownership of it to the caller of f; the caller determines when to drop the S of which it received ownership.

在 main 的第一行，我们调用了 f(),但是并没有把它绑定到某一个变量上。所以 f() 返回的 S 会被立即 drop，打印了 2。`let S = f()` 中的 S 是一个单元结构体的模式匹配 (不是一个变量)，它能够通过解构匹配到 S 结构体里的字段，但是这里并没有将匹配到的字段绑定到某一变量。

> On the first line of main, we call f() and perform an infallible match that binds no new variables. As no variables are declared on this line, there is no variable that could be the owner of the S returned by f() so that S is dropped at that point, printing 2. The S in let S = f() is a unit struct pattern (not a variable name) that matches a value of type S via destructuring but does not bind the value to any variable.

main 的第二行产生一个新的 S，并打印，最后在分号处 drop 它。

> The second line of main conjures a new S, prints it, and drops it at the semicolon.

## #26 `lazy map`

### 题目

```rs
fn main() {
    let input = vec![1, 2, 3];

    let parity = input
        .iter()
        .map(|x| {
            print!("{}", x);
            x % 2
        });

    for p in parity {
        print!("{}", p);
    }
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

请查阅 [Iterator](https://doc.rust-lang.org/std/iter/trait.Iterator.html) Trait 的文档

> Refer to the documentation of the Iterator trait.

### 题解

答案：112031

正如 `Iterator::map` 方法的文档中所描述的，map 操作是惰性执行的。作为参数提供给 map 的闭包只有在值从结果迭代器中被消耗时才会被调用。闭包并不会立即应用于整个输入流。

> As described in the documentation of the Iterator::map method, the map operation is performed lazily. The closure provided as an argument to map is only invoked as values are consumed from the resulting iterator. The closure is not applied eagerly to the entire input stream up front.

在这段代码中，for 循环是驱动迭代的因素。对于从奇偶性迭代器中消耗的每个元素，我们的闭包都需要被执行一次。因此，输出将在由闭包打印的数字和由循环体打印的数字之间交替进行。

> In this code, the for loop is what drives the iteration. For each element consumed from the parity iterator, our closure needs to be evaluated one time. Thus the output will alternate between numbers printed by the closure and numbers printed by the loop body.

## #27 `dyn Trait`

### 题目

```rs
trait Base {
    fn method(&self) {
        print!("1");
    }
}

trait Derived: Base {
    fn method(&self) {
        print!("2");
    }
}

struct BothTraits;
impl Base for BothTraits {}
impl Derived for BothTraits {}

fn dynamic_dispatch(x: &dyn Base) {
    x.method();
}

fn static_dispatch<T: Base>(x: T) {
    x.method();
}

fn main() {
    dynamic_dispatch(&BothTraits);
    static_dispatch(BothTraits);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

`Base::method` 和 `Derived::method` 碰巧有相同的名字，但是是毫不相关的两个方法。不会互相覆盖。

> Base::method and Derived::method happen to have the same name but are otherwise unrelated methods. One does not override the other.

### 题解

答案：11

这两个 Trait，`Base` 和 `Derived` 各自定义了一个名为 method 的 Trait 方法。这两个方法只是碰巧拥有相同的名称，但在其他方面并不相关，如下文所解释。

> The two traits Base and Derived each define a trait method called method. These methods happen to have the same name but are otherwise unrelated methods as explained below.

两个 Trait 都为 method 提供了一个默认的实现。如果某个具体实现没有定义方法，那么默认的实现在概念上会被复制到具体的实现中。

默认实现在概念上被复制到每个没有明确定义相同方法的 trait impl 中。例如，在这种情况下，BothTraits 的 impl Base 没有提供自己的 Base::method 的实现，这意味着 BothTraits 的 Base 的实现将使用该 trait 定义的默认行为，即 print!

> Both traits provide a default implementation of their trait method. Default implementations are conceptually copied into each trait impl that does not explicitly define the same method. In this case for example impl Base for BothTraits does not provide its own implementation of Base::method, which means the implementation of Base for BothTraits will use the default behavior defined by the trait i.e. print!("1").

此外，Derived 将 Base 作为一个 supertrait，这意味着每个实现 Derived 的类型也都需要实现 Base。这两个 trait 方法尽管名字相同，但却没有关系 -- 因此任何实现 Derived 的类型都会有 Derived::method 和 Base::method 的实现，而且这两个方法可以自由地有不同的行为。Supertraits 不是继承！Supertraits 是一种特征约束，如果要实现 Derived，那么 Base 也必须被实现。

> Additionally, Derived has Base as a supertrait which means that every type that implements Derived is also required to implement Base. The two trait methods are unrelated despite having the same name -- thus any type that implements Derived will have an implementation of Derived::method as well as an implementation of Base::method and the two are free to have different behavior. Supertraits are not inheritance! Supertraits are a constraint that if some trait is implemented, some other trait must also be implemented.

让我们看一下从 main 调用的两个方法的具体过程。

> Let's consider what happens in each of the two methods called from main.

- `dynamic_dispatch(&BothTraits)`

    参数 x 是一个对特征对象 `dyn Base` 的引用。特征对象是由编译器生成的一个 "小垫片"，它具有和 Trait 相同的名称 (如下所示)，可以通过将所有特质方法的调用，转发到原始类型的特质方法。转发是通过读取特征对象里包含的函数指针表来完成的。

    > The argument x is a reference to the trait object type dyn Base. A trait object is a little shim generated by the compiler that implements the trait with the same name by forwarding all trait method calls to trait methods of whatever type the trait object was created from. The forwarding is done by reading from a table of function pointers contained within the trait object.

    ```rs
    // Generated by the compiler.
    //
    // This is an implementation of the trait `Base` for the
    // trait object type `dyn Base`, which you can think of as
    // a struct containing function pointers.
    impl Base for (dyn Base) {
        fn method(&self) {
            /*
            Some automatically generated implementation detail
            that ends up calling the right type's impl of the
            trait method Base::method.
            */
        }
    }
    ```

    在 quiz 代码里，`x.method()` 实际上是调用由编译器自动生成的方法，它的名字是 `<dyn Base as Base>::method`。由于 x 是通过将 `BothTraits` 转换为 `dyn Base` 得到的，自动生成的实现将转发到 `<BothTraits as Base>::method`，最后打印出 1。

    > In the quiz code, `x.method()` is a call to this automatically generated method whose fully qualified name is `<dyn Base as Base>::method`. Since x was obtained by converting a BothTraits to dyn Base, the automatically generated implementation detail will wind up forwarding to `<BothTraits as Base>::method` which prints 1.

    希望从这一切可以看出，这里没有任何东西与 `BothTraits` 定义的 `Derived::method` 有关。特别要注意的是，`x.method()` 不可能是对 `Derived::method` 的调用，因为 x 是 `dyn Base` 类型，而 `dyn Base` 并没有 `Derived` 的实现。

    > Hopefully it's clear from all of this that nothing here has anything to do with the unrelated trait method Derived::method defined by BothTraits. Especially notice that `x.method()` cannot be a call to Derived::method because x is of type dyn Base and there is no implementation of Derived for dyn Base.

- static_dispatch(BothTraits)
   
    在编译时我们知道 `x.method()` 是对 `<T as Base>::method` 的调用。Rust 中对泛型函数的类型推断是独立于泛型函数的任何具体实例而发生的，也就是说，在我们知道 T 可能是什么之前，只知道它实现了 Base 这一事实。因此，具体类型 T 上的任何固有方法或任何其他特征方法都不可能影响 `x.method()` 的调用。在决定 T 的时候，已经确定 `x.method()` 会调用 `<T as Base>::method`。

    > At compile time we know that `x.method()` is a call to `<T as Base>::method`. Type inference within generic functions in Rust happens independently of any concrete instantiation of the generic function i.e. before we know what T may be, other than the fact that it implements Base. Thus no inherent method on the concrete type T or any other trait method may affect what method `x.method()` is calling. By the time that T is decided, it has already been determined that `x.method()` is calling `<T as Base>::method`.

    泛型函数在实例化时，T 等于 BothTraits，所以这将会调用 `<BothTraits as Base>::method`，打印出 1。

    > The generic function is instantiated with T equal to BothTraits so this is going to call `<BothTraits as Base>::method` which prints 1.

> If you are familiar with C++, the behavior of this code in Rust is different from the behavior of superficially analogous C++ code. In C++ the output would be 22 as seen in the following implementation. This highlights the difference between Rust's traits and supertraits vs C++'s inheritance.

如果你熟悉 C++，这段代码在 Rust 中的行为与表面上类似的 C++代码的行为是不同的。在 `C++` 中，输出将是 22，正如在下面的实现中看到的那样。这突出了 Rust 的 traits 和 supertraits 与 C++ 的继承之间的区别。

```cpp
#include <iostream>

struct Base {
    virtual void method() const {
        std::cout << "1";
    }
};

struct Derived: Base {
    void method() const {
        std::cout << "2";
    }
};

void dynamic_dispatch(const Base &x) {
    x.method();
}

template <typename T>
void static_dispatch(const T x) {
    x.method();
}

int main() {
    dynamic_dispatch(Derived{});
    static_dispatch(Derived{});
}
```

## #28 `_guard & _`

### 题目

```rs
struct Guard;

impl Drop for Guard {
    fn drop(&mut self) {
        print!("1");
    }
}

fn main() {
    let _guard = Guard;
    print!("3");
    let _ = Guard;
    print!("2");
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

当一个值不再有所有者时，它就被 drop 了。

> A value is dropped when it no longer has an owner.

### 题解

答案：3121

该程序打印出 3121。也就是说，`let _guard = Guard` 的 `Drop` 在 main 的末尾运行，但是 `let _ = Guard` 的 `Drop` 却立即运行。

> The program prints 3121. That is, the Drop impl for let _guard = Guard runs at the end of main but the Drop impl for let _ = Guard runs right away.

一般来说，当一个值不再有所有者时，它就会被放弃。变量 `_guard` 拥有 Guard 类型的第一个值，并且在 main 结束前一直处于作用域中。`_` 不是一个变量，而是一个通配符模式，它没有绑定任何东西；因为这一行没有绑定任何变量，所以没有变量成为 Guard 类型的第二个值的所有者，该值在同一行被丢弃。

> In general, a value is dropped when it no longer has an owner. The variable _guard owns the first value of type Guard and remains in scope until the end of main. The _ is not a variable but a wildcard pattern that binds nothing; since no variables are bound on this line, there is no variable to be the owner of the second value of type Guard and that value is dropped on the same line.

下划线模式与带下划线的变量之间的区别在某些情况下很重要，特别是当在 unsafe 代码中使用锁时，

> This distinction between the underscore pattern vs variables with a leading underscore is incredibly important to remember when working with lock guards in unsafe code.

```rs
use std::sync::Mutex;

static MUTEX: Mutex<()> = Mutex::new(());

/// MUTEX must be held when accessing this value.
static mut VALUE: usize = 0;

fn main() {
    let _guard = MUTEX.lock().unwrap();
    unsafe {
        VALUE += 1;
    }
}
```

如果这段代码使用 `let _ = MUTEX.lock().unwrap()`，则会立即释放互斥锁，无法对 `VALUE` 的访问进行限制。

> If this code were to use `let _ = MUTEX.lock().unwrap()` then the mutex guard would be dropped immediately, releasing the mutex and failing to guard the access of VALUE.

## #29 `(T) & (T,)`

### 题目

```rs
trait Trait {
    fn p(&self);
}

impl Trait for (u32) {
    fn p(&self) { print!("1"); }
}

impl Trait for (i32,) {
    fn p(&self) { print!("2"); }
}

impl Trait for (u32, u32) {
    fn p(&self) { print!("3"); }
}

impl Trait for (i32, i32,) {
    fn p(&self) { print!("4"); }
}

fn main() {
    (0).p();
    (0,).p();
    (0, 0).p();
    (0, 0,).p();
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

括号内的值与只有一个元素的元组的类型不一样。

> A value in parentheses does not have the same type as a 1-tuple.

### 题解

答案：1244

在单元素元组的情况下，尾部的逗号是必须的，因为它可以将其与与 `(0)` 区分开来 (`(0)` 和 `0` 相同)。然而，对于更大的元组，它是完全可选的：`(i32)` 与 `(i32,)` 是不同的类型，但是 `(i32, i32)` 和 `(i32, i32, )` 是相同的。

> The trailing comma is required in the case of a 1-tuple, (0,), because it disambiguates it from (0) which is identical to 0. However, for larger tuples, it is entirely optional: (i32) is a distinct type from (i32,), but (i32, i32) and (i32, i32,) are the same.

一个整形 0 可以被推断为任何整数类型，但如果没有足够的类型信息，则默认推断为 i32。`(0)` 被推断为 `u32`，`(0,)` 被推断为 `(i32,)`，因为它们分别具有唯一的 Trait 实现。

> An integral literal 0 can be inferred to be any integer type, but defaults to i32 if insufficient type information is available. (0) is inferred to be a u32 and (0,) is inferred to be a (i32,) because those are respectively the only integral and 1-tuple types with an implementation for Trait.

由于 `(0, 0)` 和 `(0, 0,)` 具有相同的类型，它们的 `p` 方法的输出也是相同的，但是 Rust 需要在 Trait 的两种可能的实现中进行选择，即 `(u32, u32)` 和 `(i32, i32)`。由于 `i32` 是默认的整形类型，所以在这两种情况下都会选择 `(i32, i32)`。

> Since (0, 0) and (0, 0,) have the same type, the output of their p methods must be the same, but Rust needs to somehow choose between the two possible implementations of Trait, namely (u32, u32) and (i32, i32). Since i32 is the default integral type, (i32, i32) is chosen in both cases.

## #30 `clone`

### 题目

```rs
use std::rc::Rc;

struct A;

fn p<X>(x: X) {
    match std::mem::size_of::<X>() {
        0 => print!("0"),
        _ => print!("1"),
    }
}

fn main() {
    let a = &A;
    p(a);
    p(a.clone());
    
    let b = &();
    p(b);
    p(b.clone());
    
    let c = Rc::new(());
    p(Rc::clone(&c));
    p(c.clone());
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

不可变的指针 `&T` 和 `Rc<T>` 实现了 `Clone`，即使 `T` 并没有实现。

> Immutable pointers &T and Rc<T> implement Clone even if T doesn't.

### 题解

答案：111011

这里出现的两个非引用类型，`()` 和 `A` 都是零大小类型 (ZST)。如果你向函数 `p<X>` 传一个 `X = ()` 或者 `X = A`，那么会打印 0。如果传的是 `X = ＆()` 或者 `X = &A`，无论指针有多大，总会打印 1。

> Both of our non-reference types, `()` and `A`, are zero-sized types (ZST). The function `p<X>` will print 0 if it is passed a value of type `X = ()` or `X = A`, and it will print 1 if passed a reference `X = &()` or `X = &A` regardless of exactly how big pointers happen to be.

`p(a)` 用 `X = &A` 调用 p，因为参数 a 是 `&A` 类型的；打印出 1。

> p(a) invokes p with X = &A because the argument a is of type `&A`; this prints 1.

在下一行 `p(a.clone())`，如果 A 实现了 Clone，那么 `a.clone()` 会调用对应的实现。但是它没有，编译器发现 `&T` 实现了 Clone，所以这里会调用 `&A` 实现的 Clone，它会通过简单地重复引用，将一个 `&&A` 转为 `&A`。对 p 的调用中，`X = &A`，也会打印 1。在实践中，当包含引用的结构想要派生出 Clone 时，Clone 对引用的影响是非常有用的，但正如这里所看到的，它有时会意外地启动。

> On the next line, if A implemented Clone then a.clone() would be a call to that impl. But since it doesn't, the compiler finds another applicable impl which is the implementation of Clone for references &T -- so concretely the clone call is calling the impl of Clone for &A which turns a &&A into a &A by simply duplicating the reference. We get another call to p with X = &A printing 1. The impl of Clone for references is useful in practice when a struct containing a reference wants to derive Clone, but as seen here it can sometimes kick in unexpectedly.

类型 `()` 确实实现了 Clone，所以 `b.clone()` 调用了该实现，产生了 `()`。对 `&()`的 Clone 实现也适用于 A 的情况，但是编译器更喜欢调用 trait impl for ()，将 `&()` 转换为 `()` ，而不是 trait impl for &()，将 `&&()` 转换为 `&()`，因为前者对 trait solver 插入的隐式引用或取消引用的要求更少。在对 `b.clone()` 的调用中，`b` 的类型是 `&()`，与 `impl Clone for ()` 的参数完全匹配，而为了拿到 `&&()` 作为参数传递给 `impl Clone for &()`，特征求解器还需要插入额外的隐式引用层 -- 有效地计算 `(&b).clone()`。

> The type () does implement Clone so b.clone() invokes that impl and produces (). The implementation of Clone for &() would also be applicable as happened in the case of A, but the compiler prefers calling the trait impl for () which converts &() to () over the trait impl for &() which converts &&() to &() because the former is the one that requires fewer implicit references or dereferences inserted by the trait solver. In the call to b.clone(), b is of type &() which exactly matches the argument of the impl Clone for (), while in order to obtain a &&() to pass as argument to the impl Clone for &() the trait solver would need to insert an additional layer of referencing implicitly -- effectively computing (&b).clone().

我们在调用 `p(b)` 时实际传入的 `X = ＆()`，调用 `p(b.clone())` 时则是 `X = ()`。

> What we get is p(b) calling p with X = &() and p(b.clone()) calling p with X = (). Together these print 10.

最后是 Rc，两次对 b 的调用都是 `X = Rc<()>`，大小不为零。使用 `Rc::clone(&c)` 而不是 `c.clone()` 来克隆一个 Rc 被认为是习惯性的，因为 `Rc::clone()` 使人明显感觉到这是一个引用计数的增加，而不是克隆底层数据，但最终两者指的是同一个函数。要在 Rc 内部调用一个值的克隆，你需要先对它解引用：`(*c).clone()`。

> Finally in the Rc case, both calls to p are with X = Rc<()> which is non-zero sized. It is considered idiomatic to clone a Rc using Rc::clone(&c) instead of c.clone() because it makes it apparent that this is a reference count bump rather than cloning underlying data, but ultimately both refer to the same function. To call the clone method of a value inside a Rc, you would need to dereference it first: (*c).clone().

## #31 `method lookup order`

### 题目

```rs
trait Or {
    fn f(self);
}

struct T;

impl Or for &T {
    fn f(self) {
        print!("1");
    }
}

impl Or for &&&&T {
    fn f(self) {
        print!("2");
    }
}

fn main() {
    let t = T;
    let wt = &T;
    let wwt = &&T;
    let wwwt = &&&T;
    let wwwwt = &&&&T;
    let wwwwwt = &&&&&T;
    t.f();
    wt.f();
    wwt.f();
    wwwt.f();
    wwwwt.f();
    wwwwwt.f();
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

在方法查找过程中，Rust 会自动解引用，并以明确的顺序借用接收器，直到找到第一个有合适签名的函数。这个顺序是什么呢？

> During a method lookup, Rust automatically derefences and borrows the receiver in a well-defined order until it finds the first function with a suitable signature. What is that order?

### 题解

答案：111222

这篇 [引用](https://doc.rust-lang.org/reference/expressions/method-call-expr.html) 描述了 Rust 的方法查找顺序。相关的段落如下： 

获得 [候选接收方类型] 的方法是：反复解引用接受者表达式的类型，将遇到的每个类型添加到列表中，最后尝试在最后进行非大小胁迫，如果成功，则添加结果类型。然后，对于每个候选的T，将 `&T` 和 `&mut T` 添加到紧跟 `T` 的列表中。

> The [Reference](https://doc.rust-lang.org/reference/expressions/method-call-expr.html) describes Rust's method lookup order. The relevant paragraph is:

> Obtain [the candidate receiver type] by repeatedly dereferencing the receiver expression's type, adding each type encountered to the list, then finally attempting an unsized coercion at the end, and adding the result type if that is successful. Then, for each candidate T, add &T and &mut T to the list immediately after T.

把这些规则添加到所给的例子里：

> Applying these rules to the given examples, we have:

- `t.f()`: 我们试图找到一个定义在类型 `T` 上的函数 f，但是没有。接下来，我们搜索类型 `&T`，并找到 `Or` 特征的第一个实现，然后我们就完成了。在调用时，找到的调用会打印出 1。

    > t.f(): We try to find a function f defined on the type T, but there is none. Next, we search the type &T, and find the first implemenation of the Or trait, and we are done. Upon invocation, the resolved call prints 1.

- `wt.f()`: 我们搜索一个定义在 `&T` 上的函数 f，立刻就成功了。调用后，该函数打印出 1。

    > We search for a function f defined on &T, which immediately succeeds. Upon invocation, the function prints 1.

- `wwt.f()`: 搜索顺序是 `&&T -> &&&T -> &mut &&T -> &T`，结果打印 1。
    
    > The search order is `&&T -> &&&T -> &mut &&T -> &T`, and we're done. Upon invocation, the function prints 1.
- `wwwt.f()`: `&&&T -> &&&&T` 这个打印 2。
    > `&&&T -> &&&&T`. This prints 2.
- `wwwwt.f()`: `&&&&T` 这个打印 2。 
    > `&&&&T`. This prints 2.
- `wwwwwt.f()`: `&&&&&T -> &&&&&&T -> &mut &&&&&T -> &&&&T` 这个打印 2。
    > `&&&&&T -> &&&&&&T -> &mut &&&&&T -> &&&&T`. This prints 2.

## #32 `march arm & if guard`

### 题目

```rs
fn check(x: i32) -> bool {
    print!("{}", x);
    false
}

fn main() {
    match (1, 2) {
        (x, _) | (_, x) if check(x) => {
            print!("3")
        }
        _ => print!("4"),
    }
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

无论哪种方式，在不同的情况下都会令人困惑；没有一个明确的正确行为，提示可以帮助识别。猜测两者都是。

> Either way would be confusing in different situations; there isn't a clear right behavior that a hint could help identify. Guess both. :/

### 题解

答案：124

这个问题覆盖了 match 分支和 guards 的行为。

> This question covers two behaviors of match arms and guards.

首先，包含 `|` 的匹配臂上的 if guard 是适用于匹配臂中的所有备选方案，还是只适用于它相邻的方案。在测验代码中，`check(x)` 是同时对 `(x, _)` 和 `(_, x)` 执行，还是只覆盖了 `(_, x)`？我们希望只有在前者的情况下，1 才会被打印出来。事实上，1 确实被打印出来了。一个匹配臂最多只能有一个 if guard，而且这个 guard 适用于匹配臂中所有的由 `|` 分隔的备选方案。

> First, whether an if guard on a match-arm containing `|` applies to all alternatives in the match-arm or just to the one it is adjacent to. In the quiz code, does `check(x)` execute at all for `(x, _)` or does it only cover the `(_, x)` case? We would expect 1 would get printed if and only if the former is the case. In fact 1 does get printed. A match-arm gets to have at most one if guard and that guard applies to all the `|`-separated alternatives in the arm.

其次，这个问题还包括匹配臂的一种 "回溯" 行为。当 `check(x)` 在 `(x, _)` 上返回 false 时，整个匹配臂是在这里匹配失败，还是 Rust 继续前进到 `(_, x)` 并第二次执行 guard？我们期望当且仅当后一种情况出现时 2 会被打印出来。事实上，2 确实被打印出来了；if guard 被运行了多次，在匹配臂中的每一个 `|` 分隔的选项中都有一次。

> But second, this question also covers a kind of "backtracking" behavior of match-arms. After `check(x)` returns false on `(x, _)`, does the whole match-arm fail to match at that point or does Rust move on to `(_, x)` and execute the guard a second time? We would expect 2 to be printed if and only if the latter is the case. In fact 2 does get printed; the guard is being run multiple times, once per `|`-separated alternative in the match-arm.

## #33 `Range's method`

### 题目

```rs
use std::ops::RangeFull;

trait Trait {
    fn method(&self) -> fn();
}

impl Trait for RangeFull {
    fn method(&self) -> fn() {
        print!("1");
        || print!("3")
    }
}

impl<F: FnOnce() -> T, T> Trait for F {
    fn method(&self) -> fn() {
        print!("2");
        || print!("4")
    }
}

fn main() {
    (|| .. .method())();
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

`||` 是一个闭包。`..` 是 range 的语法，通常会在切片中看到，例如 `&s[1..4]` 或者 `&s[..s.len() - 1]`。

> `||` is a closure introducer. `..` is range syntax, normally seen in slicing operations like `&s[1..4]` or `&s[..s.len() - 1]`.

### 题解

答案：24

两个合理的可能是 1 或 24，取决于如何区分 `|| .. .method()` 的优先级。

> The two rational possibilities are 1 or 24, depending on how the precedence of `|| .. .method()` is disambiguated.

如 `|| ((..).method())`，这是一个闭包，其主体调用了我们对 `RangeFull` 的实现的 Trait 方法。在这种情况下，main 会打印 1。它不会打印 13，因为从 `(..).method()` 返回的 `fn()` 从未被 main 调用。

> As `|| ((..).method())`, which is a closure whose body invokes our impl of Trait on `RangeFull`. In this case main would print 1. It would not print 13 because the `fn()` returned from `(..).method()` is never invoked by main.

如 `(|| ..).method()`，它是我们对 `FnOnce()->T` 实现的 Trait 的调用，其中 `T` 被推断为 `RangeFull`。在这种情况下，main 会打印 24。

> As `(|| ..).method()`, which is an invocation of our impl of Trait on `FnOnce() -> T` where T is inferred to be `RangeFull`. In this case main would print 24.

后者才是正确的答案。

> The latter of those is the correct answer.

我们可以通过显式的括号来实现前者的行为，如上文中所示。

> We can achieve the former behavior by explicitly parenthesizing as shown in the bullet above.

只有部分括号如 `|| (.. .method())` 是不够的。这会导致一个解析错误。

> Partially parenthesizing as `|| (.. .method())` is not sufficient. This results in a parse error.

```rs
error: expected one of `)` or `,`, found `.`
  --> src/main.rs:22:13
   |
22 |     (|| (.. .method()))();
   |            -^ expected one of `)` or `,`
   |            |
   |            help: missing `,`
```

正确处理像 `|| .. .method()` 这样相当模糊的表达式对 Rust tooling 来说是一个挑战，从 Rustfmt ([rust-lang/rustfmt#4808](https://github.com/rust-lang/rustfmt/issues/4808)) 和 Syn ([dtolnay/syn#1019](https://github.com/dtolnay/syn/issues/1019)) 的相关错误中可以看出。

> Correctly handling a quite ambiguous expression like || .. .method() is a challenge for tooling, as seen by the associated bugs in Rustfmt ([rust-lang/rustfmt#4808](https://github.com/rust-lang/rustfmt/issues/4808)) and Syn ([dtolnay/syn#1019](https://github.com/dtolnay/syn/issues/1019)).

## #34 `size of fn`

### 题目

```rs
fn d<T>(_f: T) {
    match std::mem::size_of::<T>() {
        0 => print!("0"),
        1 => print!("1"),
        _ => print!("2"),
    }
}

fn a<T>(f: fn(T)) {
    d(f);
}

fn main() {
    a(a::<u8>);
    d(a::<u8>);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

用任何其他整数类型代替 u8，答案都是一样的。

> The answer would be the same with any other integer type in place of u8.

### 题解

答案：20

表达式 `a::<u8>` 的类型是一个零大小类型（ZST）。

> The expression a::<u8>'s type is a zero-sized type (ZST).

Rust 围绕函数类型的作出的选择和具体实现与几乎所有其他语言都不同，但它是 Rust 许多零开销抽象的重要促成因素。在 Rust 中，每个函数（或泛型函数的每个不同实例）都有自己的独特类型。特别是，即使是具有相同函数签名的两个函数也会有不同的类型。

> Rust's implementation choices around function types are different from nearly all other languages, but are an important enabler of many of Rust's zero-overhead abstractions. In Rust, every function (or every distinct instantiation of a generic function) has its own unique type. In particular, even two functions with the same function signature would have different types.

每个函数都有一个独特的类型，这种特性允许类型本身携带将被调用的函数的信息，不需要任何运行时状态，如指针。

> Having a unique type for each function allows the type itself to carry the information of what function will be called, not needing any runtime state such as a pointer.

为了理解这种优化方法的优势，考虑 `Iterator::map` 和两个调用 `iter.map(f)` 和 `iter.map(g)`，其中 `f` 和 `g` 是具有相同签名的不同函数。因为 `f` 和 `g` 有不同的类型，这两个 map 调用会产生两个不同的泛型函数的单态实例，其中一个静态地调用 `f`，另一个静态地调用 `g`，就像你直接为每个函数写了一个特殊的 map 实现，而没有 map 提供的抽象。因此，泛型 map 是一个零成本的抽象。传统上，在其他语言如 C++ 或 Go 中，f 和 g 会被作为一个函数指针传递给 map，并且只有一个 map 的实例，包含一个执行函数调用的动态分发，这通常会比静态调用函数更慢。这种性能缺陷使得这些语言中的 map 不是一个零成本的抽象。

> To understand the optimization advantages of this approach, consider Iterator::map and the two calls iter.map(f) and iter.map(g) where f and g are different functions with the same signature. Because f and g have distinct types, the two map calls would produce two different monomorphic instantiations of the generic map function, one of which statically calls f and the other statically calls g, as if you had directly written a special-purpose map implementation specific to each function without the abstraction provided by map. The generic map is thus a zero-overhead abstraction. Traditionally in other languages such as C++ or Go, in this situation f and g would be passed to map as a function pointer and there would be just one instantiation of map, containing a dynamic dispatch to execute the function call, which is usually going to be slower than statically calling the right function. This performance penalty makes map in those languages not a zero-overhead abstraction.

目前在 Rust 中，没有语法来表达特定的函数类型，所以它们总是作为一个通用的类型参数与 `FnOnce`、`Fn` 或 `FnMut` 绑定传递。在错误信息中，你可能会看到函数类型以 `fn(T) -> U {fn_name}` 的形式出现，但你不能在代码中使用这种语法。

> Currently in Rust there is no syntax to express the type of a specific function, so they are always passed as a generic type parameter with a FnOnce, Fn or FnMut bound. In error messages you might see function types appear in the form fn(T) -> U {fn_name}, but you can't use this syntax in code.

另一方面，一个函数指针，`fn(T) -> U`，在运行时是指针大小。函数类型可以被胁迫为函数指针，这一点在你需要将 "选择调用那个函数" 推迟到运行时很有用。

> On the other hand, a function pointer, fn(T) -> U, is pointer-sized at runtime. Function types can be coerced into function pointers, which can be useful in case you need to defer the choice of function to call until runtime.

在测验代码中，main 中的第一个调用在调用 d 之前将 a::<u8>从一个函数胁迫为一个函数指针`(fn(fn(u8)) {a::<u8>}` 到 `fn(fn(u8)))`，因此在一个具有 64 位函数指针的系统中，它的大小为 8。main 中的第二个调用不涉及函数指针；d 被直接调用，T 是 `a::<u8>` 的不可表达的类型，它的大小为零。

> In the quiz code, the first call in main coerces a::<u8> from a function to a function pointer (fn(fn(u8)) {a::<u8>} to fn(fn(u8))) prior to calling d, so its size would be 8 on a system with 64-bit function pointers. The second call in main does not involve function pointers; d is directly called with T being the inexpressible type of a::<u8>, which is zero-sized.

## #35 `Hygiene 2`

### 题目

```rs
macro_rules! x {
    ($n:expr) => {
        let a = X($n);
    };
}

struct X(u64);

impl Drop for X {
    fn drop(&mut self) {
        print!("{}", self.0);
    }
}

fn main() {
    let a = X(1);
    x!(2);
    print!("{}", a.0);
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

有一些程序，cargo expand 产生的展开后的代码可以编译，但其行为与原始代性码的原始宏卫生不同。

> There are some programs for which cargo expand produces expanded code that compiles, but behaves differently than the original code with the original macro hygiene.

### 题解

答案：121

根据你对 macro 展开的假设，本题有两条看似合理的错误答案：

> There are two reasonable paths to an incorrect answer on this question, based on your assumptions around how this macro gets expanded:

```rs
1. let a = X(2);
2. { let a = X(2); }
```

如果第一种展开方式是正确的，这个宏会引入一个新的绑定，a，它将遮蔽 main 中已经直接分配的 a。因此，main 中的 print 语句将首先执行，打印 2，然后变量将按引入的顺序倒序 drop，先打印 2，再打印 1，最后输出 221。

> If the first expansion were right, the macro would introduce a new binding, a, which shadows the a already directly assigned in main. So the print statement in main would execute first, printing 2, then the variables would drop in reverse order of introduction, printing 2 then 1, with a final output of 221.

如果第二种展开方式是正确的，这个宏会在一个嵌套的作用域中引入 a，只在这个作用域中遮蔽已经存在的 a，而不是在它之外。由于新的 a 的作用域在打印语句之前就结束了，所以当它超出作用域时，它的 Drop impl 将是第一个执行的打印，打印 2。接下来，main 中的打印将打印 1，也就是第一个 a 的值，最后，当这个值在 main 结束时，再打印 1，最终输出 211。

> If the second expansion were right, the macro would introduce a in a nested scope, shadowing the already existing a only inside of that scope and not beyond it. Since the new a's scope ends before the print statement, its Drop impl when going out of scope would be the first print to execute, printing 2. Next the print in main would print 1 which is the value of the first a, and finally 1 again when that value drops at the end of main, with final output 211.

如果你读过关于宏卫生性的文章，那么你可能已经猜到它的实现方式与第二个选项类似。重要的是，宏的内部结构不会与调用地点范围内的变量发生冲突，而且 Rust 宏在防止意外的名称冲突方面做得很好。然而，这并不是卫生性的实现方式；在宏扩展周围引入人为的作用域会使它们的作用更加有限，而且不会解决很多其他的卫生性问题。

> If you've read about macro hygiene then you might have guessed it would be implemented something like this second option. It's important that internals of a macro don't interfere coincidentally with variables in scope at the call site, and Rust macros mostly do a good job of preventing unintended name collisions. However, this is not how hygiene is implemented; introducing artificial scopes around macro expansions would make them more limited in their usefulness, and wouldn't solve a lot of other hygiene problems.

你可以把 lazily calcalute 想象成给每个提到的局部变量的名字分配一个颜色，允许在作用域内有多个可区分的局部变量同时拥有相同的文本名称。

> You can instead imagine hygiene as a way of assigning a color to each mention of the name of a local variable, allowing for there to be multiple distinguishable local variables in scope simultaneously with the same textual name.

```rs
fn main() {
    let a = X(1);
    let a = X(2);
    print!("{}", a.0);
}
```

所以打印出来的是 main 的标识符 a 的值，也就是 1，然后两个值按照引入的相反顺序丢掉，先打印 2 再打印 1，程序的输出是 121。

> So what's printed is the value of main's identifier a which is 1, then the two values are dropped in reverse order of introduction printing 2 then 1, and the output of the program is 121.

## ＃36 `move & Fn`

### 题目

```rs
fn call(mut f: impl FnMut() + Copy) {
    f();
}

fn g(mut f: impl FnMut() + Copy) {
    f();
    call(f);
    f();
    call(f);
}

fn main() {
    let mut i = 0i32;
    g(move || {
        i += 1;
        print!("{}", i);
    });
}
```

1. 未定义的行为
2. 编译失败
3. 程序确定会输出：[ ]

### 提示

变量 `i` 被编译器生成的闭包对象所捕获。

> The variable `i` is captured by value in the compiler-generated closure object.

### 题解

答案：1223

传入 g 的对象是一个 `FnMut` 闭包，它捕获了一个整数。实际上，它是一个不可命名的结构体，包含一个类型为 i32 的字段，并有一个函数调用操作符，该操作符接收 `&mut self`。

> The object passed into g is a FnMut closure which captures an integer by value. Effectively it's an unnameable struct containing a single field whose type is i32, with a function call operator that takes &mut self:

```rs
#[derive(Copy, Clone)]
pub struct UnnameableClosure {
    i: i32,
}

impl UnnameableClosure {
    pub fn unnameable_call_operator(&mut self) {
        self.i += 1;
        print!("{}", self.i);
    }
}

let mut i = 0i32;
g(UnnameableClosure { i });
```

g 里面的 4 个调用的行为如下。

> The behavior of the 4 calls inside g is as follows:

- `f()` 运行闭包，其通过值捕获的 `i` 的值变为 1。

    > f() runs the closure and its by-value captured value of i becomes 1.

- `call(f)` 制造一个 `f` 的副本，作为 call 的参数。这个副本被执行，它的 `i` 变成了 2，但是原始闭包仍然保持着它捕获的 `i` 的值为 1。`f` 的副本在调用主体的末尾超出了作用域被 drop。

    > call(f) makes a copy of f to become the argument of call. The copy gets executed and its i becomes 2, but the original closure still holds a value of 1 for its captured i. The copy of the closure gets dropped as it goes out of scope at the end of the body of call.

- `f()` 第二次运行原始闭包，其 i 变为 2。
    > f() runs the original closure a second time and its i becomes 2.

- `call(f)` 第二次复制 f 并执行副本，它的 i 变成了 3。

    > call(f) copies f a second time and executes the copy, its i becomes 3.

从 Rust 1.26 开始，如果闭包的所有捕获都实现了 Clone，则闭包自动实现了 Clone；如果所有捕获都实现了 Copy，则闭包自动实现了 Copy。

> Since Rust 1.26, closures automatically implement Clone if all their captures implement Clone, and Copy if all the captures implement Copy.

如果 quiz 代码中省略了 move 关键字，编译器生成的闭包将通过可变引用而不是通过值捕获 i。

> If the move keyword were omitted from the quiz code, the compiler-generated closure would capture i by mutable reference instead of by value:

```rs
pub struct UnnameableClosure<'a> {
    i: &'a mut i32,
}
```

并且不再有 Copy impl，因为将一个可变引用复制成多个副本是不正确的（aliasing xor mutation；这是借用检查器的重点）。

> and there would no longer be a Copy impl, because it's incorrect to duplicate a mutable reference into multiple copies (aliasing xor mutation; this is the point of the borrow checker).

对于 Rust 的初学者来说，一个经常出现的困惑是 move, non-move 闭包与 Fn、FnMut 和 FnOnce 闭包之间的关系。这是两个几乎完全不同的东西。正如上面的 `UnnameableClosure` 伪代码所示，move 与 non-move 是指编译器生成的闭包结构的字段是否与原始被捕获变量的类型相同，或者是对原始捕获变量类型的引用（例如，`i32` 与 `&mut i32`）。相比之下，`Fn` vs `FnMut` vs `FnOnce` 是关于编译器生成的闭包结构的调用方法是否有一个接收器，该接收器是 `&self` vs `&mut self` vs `self`。

> One recurring source of confusion for Rust beginners is the relationship between move and non-move closures vs Fn and FnMut and FnOnce closures. These are two nearly-orthogonal things. As illustrated in the UnnameableClosure pseudocode above, move vs non-move is about whether the fields of the compiler-generated closure struct have the same type as the original captured variable's type, vs are references to the original captured variable's type (i32 vs &mut i32, for example). In contrast, Fn vs FnMut vs FnOnce is about whether the call method of the compiler-generated closure struct has a receiver which is &self vs &mut self vs self.
