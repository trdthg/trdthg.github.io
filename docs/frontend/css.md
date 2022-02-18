# 常用css

- 使用伪类扩大可点击区域
```css
#btn::before {
  content: "";
  position: absolute;
  top: -20px;
  right: -20px;
  bottom: -20px;
  left: -20px;
}
```

- sroll-behavior: smooth | 实现平滑滚动
- user-select: all | 选择所有文本
- Text Overflow | ...代替多的文本
- object-fit: cover | 保持长宽比
```css
img {
  width: 128px;
  height: 128px;
  object-fit: cover;
}
```
- onerror | 无图片404
```css
img.error {
    display: inline-block;
    transform: scale(1);
    content: '';
    color: transparent;
}
img.error::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #f5f5f5 url('https://cdn-images-1.medium.com/max/1600/1*we8wfyztsdo12e2Cww6oVA.jpeg') no-repeat center / 100% 100%;
}
// 一些优化
img.error::after {
    content: attr(alt);
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    line-height: 2;
    background-color: rgba(0, 0, 0, .5);
    color: white;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```
Image
无图片