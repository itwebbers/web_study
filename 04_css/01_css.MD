#   css ---------------------------------  test

+   介绍一下标准的css盒子模型？低版本IE的盒子模型有什么不同？
>   - 标准盒模型：content，padding，margin，border
>   - 低版本的IE盒模型的content包含了border，padding

+   css常用hack
--------------------------------------------------------------

+   如何让div水平垂直居中？
>   - 已知div的宽高

```(css)
    div {
        position: absolute; // 相对定位和绝对定位均可
        width: 200px;
        height:200px;
        top: 50%;
        left: 50%;
        margin: -100px 0 0 -100px;
    }
```
>   - 未知div的宽高, 利用绝对定位

```(css)
    div {
        position: absolute; // 绝对定位均可
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
```
>   - 未知div的宽高，利用translate

```(css)
    div {
        position: absolute; // 绝对定位均可或相对定位
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
```
>   - 未知div的宽高，利用flex布局

```(css)
    .father {
        display: flex;
        algin-items: center;
        justify-content: center;     
    }
```

+   css3有哪些新特性？
>   - 

+   display:inline-block 什么时候会显示间隙？(携程)
>   - 移除空格，使用margin负值，使用font-size:0,letter-space，word-spacing