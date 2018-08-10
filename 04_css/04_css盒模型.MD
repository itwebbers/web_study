# css盒模型

...

1. 基本概念
    > css盒模型(Box Model)规定了元素框处理元素的内容，边框，内边距，外边距的方式。
2. W3C标准模型和IE盒模型
    > W3C标准盒模型：属性width和height只包含content，不包含border和padding
    > IE盒模型：属性width和height包含content+padding+border
3. css如何设置这两种模型
    > ie8+浏览器中的盒模型可以由box-sizing进行自由切换
    > centent-box 标准盒模型，border-box IE盒模型
4. js如何设置获取盒模型对应的宽和高

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>js如何获取css盒模型的宽和高</title>
    </head>
    <body>
        <style>
            * {
            margin: 0;
            padding: 0;
            }
            #box {
            width: 100px;
            height: 100px;
            padding: 50px;
            border: 5px solid red;
            margin: 50px;
            }
        </style>
            <div id="box" style=""></div>
            <script>
                let box = document.getElementById('box')
                // 只能取到内联样式的宽高
                console.log('style:' + box.style.width) // 100px
                // 内联样式和外联样式的宽高都能取到，但只有 IE 支持
                console.log('currentStyle:' + box.currentStyle.width) // 100px
                // 内联样式和外联样式的宽高都能取到，几乎所有主流浏览器都支持
                console.log('getComputedStyle:' + getComputedStyle(box).width) // 100px
                // 内联样式和外联样式的宽高都能取到，几乎所有主流浏览器都支持，取到的是盒子总宽度
                console.log('getBoundingClientRect:' + box.getBoundingClientRect().width) // 210
            </script>
    </body>
    </html>
    ```
5. 根据盒模型解释边距重叠
6. BFC(边距重叠解决方案)
    `BFC概念` ： 块级格式化上下文
    `如何创建BFC`：
        * float的值不为none
        * overflow的值不为visiable
        * display的值为inline-block，table-caption，table-cell
        * position的值为absolute，fixed
    `BFC作用`：
        * 自适应两栏布局
        * 可以阻止元素被浮动元素覆盖
        * 可以包含浮动元素，清除内部浮动
        * 分属于不同的BFC可以阻止margin重叠
    `BFC的原理`：
        * 属于同一个BFC的两个相邻Box的margin会发生重叠
        * BFC的区域不会与float box重叠
        * BFC在页面上是一个独立的容器.
        * ji算BFC的高度时间，浮动元素也要跟着计算

...