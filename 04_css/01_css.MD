# css ---------------------------------  test

+ 介绍一下标准的css盒子模型？低版本IE的盒子模型有什么不同？
> 标准盒模型：content，padding，margin，border
> 低版本的IE盒模型的content包含了border，padding

+ css常用hack

+ 如何让div水平垂直居中？
> 已知div的宽高

```css
    div {
        position: absolute; // 相对定位和绝对定位均可
        width: 200px;
        height:200px;
        top: 50%;
        left: 50%;
        margin: -100px 0 0 -100px;
    }
```

> 未知div的宽高, 利用绝对定位

```css
    div {
        position: absolute; // 绝对定位均可
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
```

> 未知div的宽高，利用translate

```css
    div {
        position: absolute; // 绝对定位均可或相对定位
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
```

> 未知div的宽高，利用flex布局

```css
    .father {
        display: flex;
        algin-items: center;
        justify-content: center;
    }
```

+ css3有哪些新特性？
>

+ display:inline-block 什么时候会显示间隙？(携程)
> 移除空格，使用margin负值，使用font-size:0,letter-space，word-spacing

+ CSS有哪些属性可以继承？
  + 所有元素可以继承的属性
  1. 元素可见性： visibility
  2. 光标属性： cursor
  + 内联元素可以继承的属性
  1. 字体系列
  2. 除text-indent，text-align之外的文本系列属性
  + 块级元素可以继承的属性
  1. text-indext, text-align
  + 无继承的属性
  1. display
  2. text-decoration
  3. 文本属性： vertical-align
  4. 盒模型
  5. 定位属性
  + 继承中特殊的点
  1. a标签的字体颜色不能继承
  2. `<h1><h6>`的字体大小也不不能被继承
  + `常见问题`：
  1. 多样式混合优先级的问题
  2. font-size继承问题

+ box-sizing常用的属性有哪些？
    > 有两种常用属性，content-box(标准盒模型)   border-box(怪异盒模型)
    > ~ content-box : border + padding + content 盒子的大小
    > ~ border-box : content（包含border + padding + content）盒子的大小

+ 清除浮动
  + .clearfix
  + clear:both
  + overflow: hidden

+ css transition和animate的区别