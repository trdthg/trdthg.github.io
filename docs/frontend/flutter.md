# flutter

## 无线调试

> 老连根线是真的不爽，usb 接口不稳定老是端开连接🔗，这下就好了

1. 查看连接设备

```
»»»» adb devices
List of devices attached
LGV358fbccb96	device
```

2. 设置监听端口

```
»»»» adb tcpip 1583
restarting in TCP mode port: 1583
```

3. 局域网内连接到手机

> 手机 ip 一般在 wifi 设置里可以查到

```
»»»» adb connect 192.168.31.176:1583
connected to 192.168.31.176:1583
```

## 路由系统

### 两个关联的页面

HOME(FirstRoute) -> SecondRoute HOME(FirstRoute) <- SecondRoute

```dart
class FirstRoute extends StatelessWidget {
  const FirstRoute({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("First Route")),
        body: Center(
          child: ElevatedButton(
            child: const Text("Open route"),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const SecondRoute()),
              );
            },
          ),
        ));
  }
}

class SecondRoute extends StatelessWidget {
  const SecondRoute({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Second Route")),
      body: Center(
          child: ElevatedButton(
        child: const Text("Go Back!"),
        onPressed: () {
          Navigator.pop(context);
        },
      )),
    );
  }
}
```

### 定义路由

1. 常规的方法

```dart
// 定义路由
initialRoute: '/random-words',
routes: {
    '/': (context) => const FirstRoute(),
    '/second': (context) => const SecondRoute(),
    '/random-words': (context) => const RandomWords(),
},

Navigator.pushNamed(context, '/second');
```

::: warn 注意：home 与 initialRoute 冲突 ::: 2. 使用常量定义在组件内部定义路由

```dart
class RandomWords extends StatefulWidget {
  const RandomWords({Key? key}) : super(key: key);

    // 这里！
  static const routeName = '/random-words';

  @override
  _RandomWordsState createState() => _RandomWordsState();
}

// 使用 1
initialRoute: HomePage.routeName,
routes: {
    FirstRoute.routeName: (context) => const FirstRoute(),
},

// 使用 2
final result = await Navigator.pushNamed(context, SecondRoute.routeName);
```

### 返回数据到老页面

- pop 方法有第二个参数，可以返回一些东西
- push 方法有返回值，可以接收 pop 的值，不过是 Future 类型，需要用 async 和 await 处理

```dart
// First Route
ElevatedButton(
    child: const Text("Open new route and choose one"),
    onPressed: () {
        _navigateAndDisplaySelection(context);
    },
),

void _navigateAndDisplaySelection(BuildContext context) async {
    // Navigator.push returns a Future that completes after calling
    // Navigator.pop on the Selection Screen.
    final result = await Navigator.pushNamed(context, '/second');
    ScaffoldMessenger.of(context)
      ..removeCurrentSnackBar()
      ..showSnackBar(SnackBar(content: Text('you choose `$result`')));
}

// Second Route
ElevatedButton(
    child: const Text("Open route"),
    onPressed: () {
        Navigator.pop(context, "this arg is optional");
    },
),
```

### 传递数据到新页面

1. 通过构造函数指定参数

只能在定义路由时：`const XXXScreen(args)`传递参数 这种方法只适用于直接 navigate 到新页面时使用

```dart
class TodoDetailScreen extends StatelessWidget {
  const TodoDetailScreen({Key? key, required this.todo}) : super(key: key);

  final Todo todo;
```

2. 在 build 函数内指定参数

通过`ModalRoute.of`函数拿到参数

```dart
class ExtractArguementScreen extends StatelessWidget {
  const ExtractArguementScreen({Key? key}) : super(key: key);

  static const routeName = '/navigator-3-extractArguments';

  @override
  Widget build(BuildContext context) {
    /// `ModalRoute.of`能返回当前路由以及携带的参数
    final args = ModalRoute.of(context)!.settings.arguments as ScreenArguments;

    return Scaffold(
      appBar: AppBar(
        title: Text(args.title),
      ),
      body: Center(child: Text(args.message)),
    );
  }
}
```

3. 还是在构造函数里指定，不过定义为`生成路由`

```dart
// 声明组件
class PassArguementScreen extends StatelessWidget {
  const PassArguementScreen({Key? key, required this.args}) : super(key: key);

  static const routeName = "/navigator-3-passArguements";

  // 这里和 1 一样
  final ScreenArguments args;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(args.title),
      ),
      body: Center(child: Text(args.message)),
    );
  }
}

// 定义路由，可 route 并列

onGenerateRoute: (settings) {
    if (settings.name == PassArguementScreen.routeName) {
        final args = settings.arguments as ScreenArguments;
        return MaterialPageRoute(builder: (context) {
        return PassArguementScreen(
            args: ScreenArguments(args.title, args.message));
        });
    }
    assert(false, 'Need to implement ${settings.name}');
    return null;
},
```

### 页面之间的动效

1. Hreo 组件

只需要在两个页面都是用 Hero 组件包起来就行了

- `tag`：作为 `Hero` 组件的标识，在这两个页面中必须相同。
- `child`：在两个屏幕直接跨越的那个 widget。

```dart
child: Hero(
    tag: src,
    child: Image.network(src),
)),
```
