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

### Introduce

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

###  try_unwrap()

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

## 
