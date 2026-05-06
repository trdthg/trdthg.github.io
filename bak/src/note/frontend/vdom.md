# 虚拟 DOM

## 基本介绍

> React 的 render() 方法，会创建一棵由 React 元素组成的树。在下一次 state 或 props 更新时，相同的 render()
> 方法会返回一棵不同的树。React 需要基于这两棵树之间的差别来判断如何高效的更新 UI，以保证当前 UI 与最新的树保持同步。
> 该算法不会尝试匹配不同组件类型的子树。如果你发现你在两种不同类型的组件中切换，但输出非常相似的内容，建议把它们改成同一类型。

## Diff 算法

![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202111251286.png)

### 根节点是不同元素

React 会拆卸原有的树并且建立起新的树 (触发一个完整的重建流程)。在根节点以下的组件也会被卸载，它们的状态会被销毁。比如，当比对以下更变时：

```jsx
<div>
    <Counter />
</div>

<span>
    <Counter />
</span>
```

React 会销毁 Counter 组件并且重新装载一个新的组件。

> 销毁的过程：当卸载一棵树时，对应的 DOM 节点也会被销毁。组件实例将执行 componentWillUnmount() 方法。当建立一棵新的树时，对应的
> DOM 节点会被创建以及插入到 DOM 中。组件实例将执行 UNSAFE_componentWillMount() 方法，紧接着
> componentDidMount() 方法。所有与之前的树相关联的 state 也会被销毁。

### 对比同一类型元素

保留原来的 DOM 节点，只需要比较属性

```jsx
<div className="before" title="stuff" />

<div className="after" title="stuff" />
// 通过对比这两个元素，React 知道只需要修改 DOM 元素上的 className 属性。
```

在对子节点进行递归

### 对子节点进行递归

默认情况下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation。

- 在子元素列表末尾新增元素时，更新开销比较小。比如：
  ```jsx
  <ul>
      <li>first</li>
      <li>second</li>
  </ul>

  <ul>
      <li>first</li>
      <li>second</li>
      <li>third</li>
  </ul>
  ```
  React 会先匹配两个 `<li>first</li>` 对应的树，然后匹配第二个元素 `<li>second</li>` 对应的树，最后插入第三个元素的
  `<li>third</li>` 树。
- 将新增元素插入到表头，那么更新开销会比较大
  ```jsx
  <ul>
      <li>Duke</li>
      <li>Villanova</li>
  </ul>

  <ul>
      <li>Connecticut</li>
      <li>Duke</li>
      <li>Villanova</li>
  </ul>
  ```
  React 并不会意识到应该保留 `<li>Duke</li>` 和
  `<li>Villanova</li>`，而是会重建每一个子元素。这种情况会带来性能问题。

### Key

1. 使用 Key 进行优化 为了解决上述问题，React 引入了 key 属性。当子元素拥有 key 时，React 使用 key
   来匹配原有树上的子元素以及最新树上的子元素。以下示例在新增 key 之后，使得树的转换效率得以提高：

```jsx
// 现在 React 知道只有带着 '2014' key 的元素是新元素，带着 '2015' 以及 '2016' key 的元素仅仅移动了。
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

另一个例子

```jsx
// 记的带上 ID
<div>
  {events.map((event) => <Event event={event} key={event.id} />)}
</div>;
```

2. 如何使用 Key

```jsx
<li key={item.id}>{item.name}</li>;
```

- key 不需要全局唯一，但在列表中需要保持唯一
- 新增一个 ID 字段到你的模型中
- 利用一部分内容作为哈希值来生成一个 key
- 元素在数组中的下标作为 key :::warn 利用下标的注意事项
- Key 应该具有稳定，可预测，以及列表内唯一的特质。不稳定的 key（比如通过 Math.random() 生成的）会导致许多组件实例和 DOM
  节点被不必要地重新创建，这可能导致性能下降和子组件中的状态丢失。
- 这个策略在元素不进行重新排序时比较合适，如果有顺序修改，diff 就会变慢。
- 如果 key 是一个下标，修改顺序时会修改当前的 key，会导致非受控组件的 state（比如输入框）可能相互篡改，会出现无法预期的变动。 :::

## 组件更新时机

### 一个例子

App 为父组件，Tile 为子组件

```jsx
const App = () => {
  const [message, setMessage] = React.useState("");
  return (
    <>
      <Tile message={message} />
      <Tile />
    </>
  );
};
```

所以，渲染函数一共被调用 3 次，真实 dom 只被更新 1 次 当 message 更新后，两个子组件会被重新渲染，即使第二个 Tail 没有 prop
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202111209533.png)
其中红色点代表渲染节点。在 React 中，这代表调用渲染函数。在真实 DOM 中，这代表重新绘制 UI。

- 重绘 UI 的性能瓶颈已经被 React 进行了优化。
- 但是所有左侧的红色点代表这些组件的渲染函数都被执行了。react 需要在组件上使用 diff 算法检查组件的差异

### 一些函数

1. shouldComponentUpdate 这个函数是 React 的生命周期函数之一，它允许我们通过告诉 React 何时更新类组件来优化渲染性能。

```jsx
// 它的参数是组件要进行渲染时，下一个 props 和下一个 state：
shouldComponentUpdate(nextProps, nextState) {
  // return true or false
}
```

这个函数非常简单：返回 true 会让 React 调用渲染函数，返回 false 就会阻止 React 调用渲染函数。

### 什么时候不更新

- props 并没有使用 setState 进行更新。
  ```jsx
  // 比如
  this.props.user.name = "Felix";
  ```
- prop 的引用并没有发生变化。

### 如何强制重新渲染

使用 React Hooks 进行强制渲染

```jsx
const [state, updateState] = React.useState();
const forceUpdate = React.useCallback(() => updateState({}), []);
```

## 改变结构进行优化

把 setState 放到子组件内部

```jsx
const InputSelfHandling = () => {
  const [text, setText] = React.useState("");
  return (
    <input
      value={text}
      placeholder="Write something"
      onChange={(e) => setText(e.target.value)}
    />
  );
};
```

## 使用 Memo 优化

### 使用 React.memo()

使用方法非常简单

```jsx
const Tile = React.memo(() => {
  let eventUpdates = React.useRef(0);
  return (
    <div className="black-tile">
      <Updates updates={eventUpdates.current++} />
    </div>
  );
});
```

### 坑

下面的例子中 React.memo 无效

```jsx
const App = () => {
  const updates = React.useRef(0);
  const [text, setText] = React.useState("");
  //   const data = React.useState("");                            // !!! 这个没事
  const data = { test: "data" }; // !!! 这个不行
  React.useEffect(() => {
    updates.current++;
  });

  return (
    <div className="app">
      <div className="blue-wrapper">
        <input
          value={text}
          placeholder="Write something"
          onChange={(e) => setText(e.target.value)}
        />
        <Updates updates={updates.current} />
        <br />
        <Tile />
        <TileMemo data={data} /> // !!! 这里会重新渲染
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
```

原因：data 这个变量在 render 函数执行后就被重新声明了，所以他们的引用不同，但是值是相同的

### 解决方法

1. 使用 React.memo 的第二个参数

```jsx
const TileMemo = React.memo(() => {
  let updates = React.useRef(0);
  return (
    <div className="black-tile">
      <Updates updates={updates.current++} />
    </div>
  );
}, (prevProps, nextProps) => {
  if (prevProps.data.test === nextProps.data.test) {
    return true; // props are equal
  }
  return false; // props are not equal -> update the component
});
```

2. 使用 React.useMemo 把这种变量用 React.useMemo 包裹起来，这个变量在 re-render 时就不会重新 new

```jsx
const data = React.useMemo(() => ({
  test: "data",
}), []);
```

array 里的变量发生改变后会重新计算 data 变量

### 关于函数

在 js 里，function 就像对象一样，在 re-render 后引用也会改变，所以这时需要用`useCallback`

```js
const App = () => {
  const updates = React.useRef(0);
  const [text, setText] = React.useState("");

  // const onClick = () => {
  //   console.log('click');
  // };
  const onClick = React.useCallback(() => {
    console.log("click");
  }, []);

  return (
    <div className="app">
      <div className="blue-wrapper">
        <input
          value={text}
          placeholder="Write something"
          onChange={(e) => setText(e.target.value)}
        />
        <Updates updates={updates.current++} />
        <Tile />
        <TileMemo onClick={onClick} />
      </div>
    </div>
  );
};
```

### 什么时候不使用

- 组件太大，消耗内存
- props 变更非常频繁

## 参考

- [When does React re-render components?](https://felixgerschau.com/react-rerender-components/)
- [React 何时才会进行组件重渲染](https://www.ttalk.im/2021/12/when-does-react-re-render-components.html)
- [How to use React.memo() to improve performance](https://felixgerschau.com/react-performance-react-memo/?utm_source=ttalk.im&utm_medium=website&utm_campaign=Tech%2520Talk)
- [React-高级 - 协调](https://zh-hans.reactjs.org/docs/reconciliation.html)
  给工程师带来额外的心智负担😅
- [Why We Memo All the Things](https://attardi.org/why-we-memo-all-the-things/)
- [为什么我们在所有的东西上使用 Memo](https://www.ttalk.im/2021/12/why-we-memo-all-the-things.html)
