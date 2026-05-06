> 原文链接：https://lucumr.pocoo.org/2021/11/14/abusing-serde/
>
> **翻译：[trdthg](https://github.com/trdthg)**
>
> 选题：[trdthg](https://github.com/trdthg)
>
> 本文由 [Rustt](https://Rustt.org) 翻译，[StudyRust](https://studyrust.org) 荣誉推出

# Rust 冒险：滥用 Serde

当你让一个 Rust 程序员指出自己最喜欢的东西时，他们会很快的指出 serde 是一个让工作愉快好帮手。serde 是一个 Rust
的序列化和反序列化框架。它的格式相对独立，可以让你处理 JSON，YAML 以及一系列不同的格式。

除了上面的之外，还有很多东西可以用 serve 完成。我认为有一些用例相当有趣，值得分享。

## 滥用序列化

_Abusing Serialization_

其中一个有趣的用例是用 serde 作为某种形式的反射框架，将结构体暴露给其他的不能原生支持 Rust
结构体的环境。在这些情况下，作为一个开发者，你序列化了一个可以被序列化的对象，接着立即以某种稍微不同的格式再次反序列化它。相比于反序列化，我们也可以自定义一个序列化器用来
'捕获' 序列化的调用。这是在 IPC，模板引擎上下文、格式转换中常用的模式。

这在实践中大概是什么样呢？让我们从用户的角度看一下我写的 [MiniJinja](https://github.com/mitsuhiko/minijinja)
模板引擎。MiniJinja 使用 serde 作为核心数据模型，将结构化的数据传递给模板，以便它们可以在运行时进行评估。下面是一些给开发者的示例代码：

```rs
#[derive(Serialize, Debug)]
pub struct User {
    name: String,
}

fn main() {
    let mut env = Environment::new();
    env.add_template("hello.txt", "Hello {{ user.name }}!")
        .unwrap();
    let template = env.get_template("hello.txt").unwrap();
    let user = User {
        name: "John".into(),
    };
    println!("{}", template.render(context!(user)).unwrap());
}
```

如你所见，我们定义了一个叫 User 的结构体，可以使用默认的 Serialize 实现将它序列化。这个对象接着被传递到
`context!()`。`context!()` 所做的就是创建了一个 map，然后将一个键设为
user，接着设置为该变量的值。这样做的目的是允许模板引擎访问到 user 的 '属性'，例如 name。Rust
不是动态语言，这意味着通常在运行时做这样的事情是不可能的。但是由于 serde 为 User 实现了
Seralize，我们可以这样做。具体的实现大致如下（伪代码）：

```rs
impl Serialize for User {
    fn serialize(&self, serializer: S) -> Result<S::Ok, S::Error>
        where S: Serializer
    {
        let s = serializer.serialize_struct("User", 1);
        s.serialize_field("name", &self.name)?;
        s.end()
    }
}
```

正常情况下，serializer 是一个类似于 JSON 序列化器的东西，它可以将结构体写入到一个字符串或者是文件，在这个过程中把它编码为 JSON。但是
serde 提供的接口并不要求用户必须这样。实际上，MiniJinja 直接将结构体编码为一个内存中的结构，模板引擎可以解析它。

这种模式并不新颖，serde 本身其实也有使用。当你使用 serde 的 flatter 功能时，serde 会启用一个内部缓冲模式，数据会被存储在一个内部的
Context 类型中，Context 类型可以表示 serde 数据模型的全部内容。然后这个 context 可以被传递给另一个序列化器中。

我不仅在 MiniJinja，同时也在 [insta](https://insta.rs/)
（一个快照测试工具）使用到这种模式。为了避免由于非确定性数据导致的测试快照的不稳定性，我首先将其序列化为一种内部的格式，接着在该格式上进行一个再加工，最后再将其序列化为最终的格式（例如
YAML）。

## TLS 恶作剧

_TLS Shenanigans_

> TLS：Thread Local Storage，Shenanigans：恶作剧

然而，MiniJinja 在此处使用 serde 的有趣之处在于，它允许在序列化和序列化器之间传递不兼容的数据。如前所述，serde
有一个特定的数据模型，不符合该数据模型的东西都会遇到这个问题。例如，serde 可以编码的最大整型是
i128。如果你需要一个任意精度的整型，那就不走运了。但是还是有办法的，你可以使用
[带内信令（in-band signalling）](https://en.wikipedia.org/wiki/In-band_signaling)传递额外数据。例如，serde
JSON 序列化器能够表示任意精度整型，因为它在单值对象中保留了一个特殊的键，并用它去指示 JSON 序列化 /
反序列化器组合，决定这个任意精度的整型是否要被序列化。它看起来像这样：

```json
{ "$serde_json::private::Number": "value" }
```

但是你应该能发现，如果一个人给出了这样的 JSON 文档，serde JSON 会把它当作任意精度的整形去解析，这意味着 'value' 部分本身也需要于
serde 兼容。对于任意精度的整型，这没有问题，因为它可以用字符串表示。但是假如你想在序列化和反序列化中传递的东西根本不能序列化呢？

这时，巧妙地利用 **thread local** 就是一种变通方法。

在 MiniJinja 中，运行时值的内部表示是一个叫做 `Value`
的结构体。正如你所期望的，它可以容纳整型，浮点数，字符串，列表，对象等等。然而，他也可以容纳一些 serde
完全无法解析的类型。特别是它可以保存一种特殊类型的字符串，称为 `'safe' string`, 它是一个存储了安全的 HTML
代码的字符串，不需要转义，也不需要所谓的 '动态值'。后者特别有趣，因为它不能被序列化。

什么是动态值？它实际上是具有状态的对象的句柄，应该直接传递给模板。这里的一个例子是 MiniJinja 中的 loop 变量：

```rs
<ul>
{% for item in seq %}
    <li>{{ loop.index }}: {{ item }}</li>
{% endfor %}
</ul>
```

MiniJinja（类似于 Jinja2）提供了一个特殊的 loop 变量可以访问循环的状态。例如，你可以通过 `loop.index`
来获取当前循环的迭代次数。在 MiniJinja 的工作原理中，'循环控制器' 本身会被直接传递给模板，并且把值本身当作引用计数存进去。

```rs
pub struct LoopState {
    len: AtomicUsize,
    idx: AtomicUsize,
}

let controller = Rc::new(LoopState {
    idx: AtomicUsize::new(!0usize),
    len: AtomicUsize::new(len),
});
```

当循环迭代时，控制器上的索引会 +1。

```rs
controller.idx.fetch_add(1, Ordering::Relaxed);
```

控制器本身会被直接添加到上下文中：

```rs
let template_side_controller = Value::from_object(controller);
```

为了达到这个目的，控制器需要实现 MiniJinja 内部的 `Object` 特征，下面是一个最小实现：

```rs
impl Object for LoopState {
    fn attributes(&self) -> &[&str] {
        &["index", "length"][..]
    }

    fn get_attr(&self, name: &str) -> Option<Value> {
        let idx = self.idx.load(Ordering::Relaxed) as u64;
        let len = self.len.load(Ordering::Relaxed) as u64;
        match name {
            "index" => Some(Value::from(idx + 1)),
            "length" => Some(Value::from(len)),
            _ => None,
        }
    }
}
```

在模板引擎那一边，系统知道当 `index` 属性被使用时，需要调用 `get_attr()` 方法。

到目前为止我们所说的都是理论，serde 究竟是如何做的呢？当 `Value::from_object` 调用时，传入的值会被 `move` 到 value
对象里。这样做不需要特殊处理，特别是由于已经使用了引用计数。但是现在的问题是，对于像 `LoopState` 这样本身没有实现 `Serialize`
的东西，它的值是如何被序列化的？答案是线程本地存储（thread local storage）和一个合作的（co-operating）序列化和反序列化器。

## 越过边界的 State

_Out of Bound State_

隐藏在 MiniJinja 的 Value 实现有这样一段代码：

```rs
const VALUE_HANDLE_MARKER: &str = "\x01__minijinja_ValueHandle";
thread_local! {
     static INTERNAL_SERIALIZATION: AtomicBool = AtomicBool::new(false);
     static LAST_VALUE_HANDLE: AtomicUsize = AtomicUsize::new(0);
     static VALUE_HANDLES: RefCell<BTreeMap<usize, Value>> = RefCell::new(BTreeMap::new());
 }

fn in_internal_serialization() -> bool {
    INTERNAL_SERIALIZATION.with(|flag| flag.load(atomic::Ordering::Relaxed))
}
```

它们的用处是，Value
自身能够感知到什么时候使用内部序列化的特殊形式。这种内部序列化是一种特殊形式的序列化，我们明确知道我们的序列化数据的接收者是一个可以理解该数据的反序列化器。我们没有直接对数据进行序列化，而是将其存入到
TLS 中，然后把数据的句柄序列化到 serde 序列化器中。反序列化器会先反序列化句柄，接着再从 TLS 中提取值。

因此，我们的循环控制器序列化的实现大致如下：

```rs
impl Serialize for Value {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        // enable round tripping of values
        if in_internal_serialization() {
            use serde::ser::SerializeStruct;
            let handle = LAST_VALUE_HANDLE.with(|x| x.fetch_add(1, atomic::Ordering::Relaxed));
            VALUE_HANDLES.with(|handles| handles.borrow_mut().insert(handle, self.clone()));
            let mut s = serializer.serialize_struct(VALUE_HANDLE_MARKER, 1)?;
            s.serialize_field("handle", &handle)?;
            return s.end();
        }

        // ... here follows implementation for serializing to JSON etc.
    }
}
```

如果它被序列化为 JSON，我们大致能看到这样的东西：

```json
{ "\u0001__minijinja_ValueHandle": 1 }
```

而真正的循环控制器将被存储在 `VALUE_HANDLES` 中句柄为 1 处。现在我们如何从里面的到数值呢？在 MiniJinja
中，反序列化其实从未发生，只有序列化。而且序列化也只是将内存中的对象组装起来。因此，我们只需要让序列化器理解带内信令如何处理，并以此找到带外的值。

```rs
impl ser::SerializeStruct for SerializeStruct {
    type Ok = Value;
    type Error = Error;

    fn serialize_field<T: ?Sized>(&mut self, key: &'static str, value: &T) -> Result<(), Error>
    where
        T: Serialize,
    {
        let value = value.serialize(ValueSerializer)?;
        self.fields.insert(key, value);
        Ok(())
    }

    fn end(self) -> Result<Value, Error> {
        match self.name {
            VALUE_HANDLE_MARKER => {
                let handle_id = self.fields["handle"].as_usize();
                Ok(VALUE_HANDLES.with(|handles| {
                    let mut handles = handles.borrow_mut();
                    handles
                        .remove(&handle_id)
                        .expect("value handle not in registry")
                }))
            }
            _ => /* regular struct code */
        }
    }
}
```

## Ser-to-De

上面的例子是你可以滥用的一种方式，但是同样的模式在真实的序列化和反序列化中也可以用到。在 MiniJinja
中，我可以不使用序列化，因为我有效地利用了序列化代码，从一种内存格式转换到另一种内存格式。如果你想在进程间传递数据，情况就会变得棘手一些，实际的序列化就是必要的。例如，你想建立一个
IPC
系统，在进程之间交换数据，这里的挑战是，出于性能的考虑，对于比较大的内存段，你必须使用共享内存，或者是以文件描述符的形式传递打开的文件（因为这些文件有可能是
socket）。在我的实验性 [unix-ipc](https://github.com/mitsuhiko/unix-ipc) crate
中，我就是这样做的。

我在这里建立了一个二级缓冲区，它可以放置文件描述符。同样，这里必须使用 TLS。

API 大致如下：

```rs
pub fn serialize<S: Serialize>(s: S) -> io::Result<(Vec<u8>, Vec<RawFd>)> {
    let mut fds = Vec::new();
    let mut out = Vec::new();
    enter_ipc_mode(|| bincode::serialize_into(&mut out, &s), &mut fds)
        .map_err(bincode_to_io_error)?;
    Ok((out, fds))
}
```

从用户的角度来看，这些都是透明的。当一个 Serailize 实现遇到了一个文件对象时，它可以检查是否应该使用 IPC 的序列化，如果是，它可以把 FD
存起来，`enter_ipc_mode` 基本上将 fds 绑定到了一个线程局部变量里，接着调用 `register_fd`
注册它。例如，下面展示了内部句柄的序列化方式：

```rs
impl<F: IntoRawFd> Serialize for Handle<F> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: ser::Serializer,
    {
        if is_ipc_mode() {
            // effectively a weird version of `into_raw_fd` that does
            // consume
            let fd = self.extract_raw_fd();
            let idx = register_fd(fd);
            idx.serialize(serializer)
        } else {
            Err(ser::Error::custom("can only serialize in ipc mode"))
        }
    }
}
```

然后是反序列化：

```rs
impl<'de, F: FromRawFd + IntoRawFd> Deserialize<'de> for Handle<F> {
    fn deserialize<D>(deserializer: D) -> Result<Handle<F>, D::Error>
    where
        D: de::Deserializer<'de>,
    {
        if is_ipc_mode() {
            let idx = u32::deserialize(deserializer)?;
            let fd = lookup_fd(idx).ok_or_else(|| de::Error::custom("fd not found in mapping"))?;
            unsafe { Ok(Handle(Mutex::new(Some(FromRawFd::from_raw_fd(fd))))) }
        } else {
            Err(de::Error::custom("can only deserialize in ipc mode"))
        }
    }
}
```

从用户的角度来看，他只需要通过 IPC channel 传递一个 `Handle::new(my_file)` 就能实现。

## Serde 的现状

_State of Serde_

不幸的是，上面所有的东西都依赖线程本地变量和对内信令。整体上都不是很好，如果有一天出了 serde 2.0，我希望有更好的方法实现上面的内容。

实际上，现在的 serde 仍然有不少问题和上述的 Hack 行为相关。

- [serde requires in-band signalling](https://github.com/serde-rs/serde/issues/1463)
- [Internal buffering disrupts format-specific deserialization features](https://github.com/serde-rs/serde/issues/1183)
- [serde_json's arbitrary precision feature incompatible with flatten](https://github.com/serde-rs/json/issues/721)

说到这里，在我们需要重写 serde 之前，肯定还有进一步可以被滥用的地方。但是现在是时候应该慢慢考虑 serve
未来版本的设想了它应该对数据模型的支持更友好，可以用更少的 Hack 来脱离规定框架。
