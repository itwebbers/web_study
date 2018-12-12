# css 盒模型

...

1. 基本概念
   > css 盒模型(Box Model)规定了元素框处理元素的内容，边框，内边距，外边距的方式。
2. W3C 标准模型和 IE 盒模型
   > W3C 标准盒模型：属性 width 和 height 只包含 content，不包含 border 和 padding
   > IE 盒模型：属性 width 和 height 包含 content+padding+border
3. css 如何设置这两种模型
   > ie8+浏览器中的盒模型可以由 box-sizing 进行自由切换
   > centent-box 标准盒模型，border-box IE 盒模型
4. js 如何设置获取盒模型对应的宽和高

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <meta http-equiv="X-UA-Compatible" content="ie=edge" />
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
         console.log(
           'getBoundingClientRect:' + box.getBoundingClientRect().width
         ) // 210
       </script>
     </body>
   </html>
   ```

5. 根据盒模型解释边距重叠
6. BFC(边距重叠解决方案)
   `BFC概念` ： 块级格式化上下文
   `如何创建BFC`：
   _ float 的值不为 none
   _ overflow 的值不为 visiable
   _ display 的值为 inline-block，table-caption，table-cell
   _ position 的值为 absolute，fixed
   `BFC作用`：
   _ 自适应两栏布局
   _ 可以阻止元素被浮动元素覆盖
   _ 可以包含浮动元素，清除内部浮动
   _ 分属于不同的 BFC 可以阻止 margin 重叠
   `BFC的原理`：
   _ 属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
   _ BFC 的区域不会与 float box 重叠
   _ BFC 在页面上是一个独立的容器.
   _ 计算 BFC 的高度时间，浮动元素也要跟着计算

...
