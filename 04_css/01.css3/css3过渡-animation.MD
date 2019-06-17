<meta charset="utf-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">

<style>
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote {
    margin: 0;
    padding: 0;
}
body {
    font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB", Arial, sans-serif;
    font-size: 13px;
    line-height: 18px;
    color: #737373;
    background-color: white;
    margin: 10px 13px 10px 13px;
}
table {
    margin: 10px 0 15px 0;
    border-collapse: collapse;
}
td,th {
    border: 1px solid #ddd;
    padding: 3px 10px;
}
th {
    padding: 5px 10px;  
}

a {
    color: #0069d6;
}
a:hover {
    color: #0050a3;
    text-decoration: none;
}
a img {
    border: none;
}
p {
    margin-bottom: 9px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
    color: #404040;
    line-height: 36px;
}
h1 {
    margin-bottom: 18px;
    font-size: 30px;
}
h2 {
    font-size: 24px;
}
h3 {
    font-size: 18px;
}
h4 {
    font-size: 16px;
}
h5 {
    font-size: 14px;
}
h6 {
    font-size: 13px;
}
hr {
    margin: 0 0 19px;
    border: 0;
    border-bottom: 1px solid #ccc;
}
/* blockquote {
    padding: 13px 13px 21px 15px;
    margin-bottom: 18px;
    font-family:georgia,serif;
    font-style: italic;
} */
/* blockquote:before {
    content:"\201C";
    font-size:40px;
    margin-left:-10px;
    font-family:georgia,serif;
    color:#eee;
} */
blockquote p {
    font-size: 14px;
    font-weight: 300;
    line-height: 18px;
    margin-bottom: 0;
    font-style: italic;
}
code, pre {
    font-family: Monaco, Andale Mono, Courier New, monospace;
}
code {
    background-color: #fee9cc;
    color: rgba(0, 0, 0, 0.75);
    padding: 1px 3px;
    font-size: 12px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}
pre {
    display: block;
    padding: 14px;
    margin: 0 0 18px;
    line-height: 16px;
    font-size: 11px;
    border: 1px solid #d9d9d9;
    white-space: pre-wrap;
    word-wrap: break-word;
}
pre code {
    background-color: #fff;
    color: #737373;
    font-size: 11px;
    padding: 0;
}
sup {
    font-size: 0.83em;
    vertical-align: super;
    line-height: 0;
}
* {
    -webkit-print-color-adjust: exact;
}
@media screen and (min-width: 914px) {
    body {
        width: 854px;
        margin:10px auto;
    }
}
@media print {
    body,code,pre code,h1,h2,h3,h4,h5,h6 {
        color: black;
    }
    table, pre {
        page-break-inside: avoid;
    }
}
</style>


# 一. 过渡-animation

>  css animation 定义了怎么用关键帧规定时间内从一个css属性过渡到另一个css属性,形成动画效果.

1. @keyframes
   > 规则通过在动画序列中定义关键帧（或waypoints）的样式来控制CSS动画序列中的中间步骤
   > 使用方式有一下两种
```css
/* 关键词 `from` 相当于 0% ; */
/* 关键词 `to` 相当于 100% ; */

@keyframes identifier {
  from {
    width: 300%;
  }

  to {
    width: 100%;
  }
}

@keyframes identifier {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}
```
2. 配置动画
   - animation-delay : 设置延迟执行动画的时间
   - animation-direction : 设置动画是否反向运行或者回到开始位置
   - animation-duration : 设置动画执行的周期
   - animation-iteration-count : 设置动画是否重复执行 
   - animation-name : 指定@keyframes命名的动画关键帧
   - animation-play-state : 允许暂停和恢复动画
   - animation-timing-function : 设置动画过渡的曲线方式
   - animation-fill-mode : 指定动画执行前后如何为目标元素应用样式。
3. 实现几个常见示例
  > 详情见: animation.html 