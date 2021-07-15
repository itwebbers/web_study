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


# 一. 过渡-transition

>  css transition 提供了易中在更改css属性控制动画速度的方法.其可以让属性变化成一个持续一段事件的过程,不是立马更改生效.

1. 可以过渡的css属性大致可以分为一下几类
   > 切记不是所有的属性都支持css过渡
   - 表示尺寸的属性: `width,padding,margin,border `, and so on
   - 表示大小的属性: `font-size,line-height `, and so on
   - 表示布局的属性: `flex,display,grid `, and so on
   - 表示颜色和背景属性: `background,color,opacity `, and so on
   - 表示元素位置属性: `offset,top,scroll `, and so on
2. 共有四种属性
   - transition-property : 指定过渡变化的css属性name
   - transition-duration : 指定过渡的秒数
   - transition-timing-function : 指定过渡的效果曲线
   - transition-delay : 指定过渡延迟执行
3. 实现几个常见示例
<style> 
    .transition-btn
    {
        display: inline-block;
        padding: 6px;
        border-radius: 2px;
        background: #909399;
        color: #fff;
        text-align: center;
        transform: scale(1);
        transition: background 1s, transform 1s; 
    }
    .transition-btn:hover {
        transform: scale(1.1);
        background: #409EFF;
        transition: all 1s;
    }
</style>

<span class="transition-btn">请把鼠标放到我上面</span>
