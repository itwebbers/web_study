<meta charset="utf-8">

<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes"> -->

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
    color:#737373;
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


# 一. css3详解

> 讲解之前，先吹牛;css3，写之简单，用之谨慎,考虑兼容性问题；对于后端来说css可能是比较蛋疼的问题，但是css恰巧又是前端的一块砖；一个主要的作用就是减少js的操作


## 二. css hack

> 写css样式的时候，恐怕最头疼的就是各个浏览器下的兼容性问题，即css hack，不同的浏览器对css的解析结果是不同的，因此会导致相同的css输出的页面效果不同，这就需要css hack来解决浏览器局部的兼容性问题。使用css、 hack将会使用你的css代码部分失去作用，然后借助条件样式，使用其原css代码在一些浏览器解析，而css hack代码在符合条件要求的浏览器中替代原css那部分代码。

1. css hack 基本概念
   > css hack指各版本及各品牌浏览器之间对CSS解释后出现网页内容的误差(比如我们常说错位)的处理。由于各浏览器的内核不同，所以会造成一些误差就像JS一样，一个JS网页特效，在微软IE6、IE7、IE8浏览器有效果，但可能在火狐（Mozilla Firefox）谷歌浏览器无效，这样就叫做JS hack ，所以我们对于CSS来说他们来解决各浏览器对CSS解释不同所采取的区别不同浏览器制作不同的CSS样式的设置来解决这些问题就叫作CSS Hack。
2. css hack常见形式
   - 属性级Hack：
    > 比如IE6能识别下划线”_”和星号” * “，IE7能识别星号” * “，但不能识别下划线”_”，而firefox两个都不能认识。
   - 选择符级Hack：
    > 比如IE6能识别*html .class{}，IE7能识别*+html .class{}或者*:first-child+html .class{}
   - IE条件注释Hack：
    > IE条件注释是微软从IE5开始就提供的一种非标准逻辑语句。比如针对所有IE：
    ```html
        <!–[if IE]><!–您的代码–><![endif]–>
    ```
    
    > 针对IE6及以下版本：
    ```html
        <!–[if lt IE 7]><!–您的代码–><![endif]–>
    ```
3. 各浏览器hack写法
   - Firefox
```css
@-moz-document url-prefix() { 
    .selector { 
        property: value;
    } 
}
```
   - chrome and safari
```css
@media screen an (-webkit-min-device-pixel-ratio:0){     
    Selector { 
        property: value;
    } 
}
```
   - IE9浏览器
```css
:root Selector {
    property: value9;
}
```
4. css hack 的奇淫技巧
   - Firefox下给 div 设置 padding 后会导致 width 和 height 增加, 但IE不会.(可用!important解决)
   - Firefox 和 IE 对 BOX 理解的差异导致相差 2px 的还有设为 float的div在ie下 margin加倍等问题
   - 关于手形光标. cursor: pointer. 而hand 只适用于 IE
   - 内容居中问题
   - 作为外部 wrapper 的 div 不要定死高度, 最好还加上 overflow: hidden.以达到高度自适应
    > 解决IE支持居中,mozilla中不能居中
```css
.container {
    text-align: center;
}
#center { 
    margin-right: auto; 
    margin-left: auto; 
}
```
   - 清除浮动
```css
#box:after{ 
    content: ''; 
    display: block; 
    height: 0; 
    clear: both; 
    visibility: hidden;
}
```
   - 

### 三. 浏览器引擎前缀

> 浏览器引擎前缀: 是一些放在css属性前的字符串,主要是对特定的浏览器渲染引擎进行识别
1. 常见的浏览器引擎前缀
    - `-moz-     /* 火狐等使用Mozilla浏览器引擎的浏览器 */`
    - `-webkit-  /* Safari, 谷歌浏览器等使用Webkit引擎的浏览器 */`
    - `-o-       /* Opera浏览器(早期) */ `
    - `-ms-      /* Internet Explorer (不一定) */`
2. 两种方式,自动添加css前缀
   - vs code安装 `AuotPrefixer` 具体使用很简单,自行看文档 
   - 如果你使用的是gulp/rollup/webpack/parsoul,请查看对应的loader `AuotPrefixer`,具体文档的话配置很简单

### 四. 主要讲解以下常用模块

1. css3选择器
2. css3媒体查询
3. css3文本特效
4. css3 过渡-transition
5. css3 动画-animation

#### 五. 推荐css3的学习网站

1. [Animate.css 动画](https://daneden.github.io/animate.css/)
2. [css-HACKS](http://browserhacks.com/)
3. [css 兼容性查询](https://caniuse.com/)
4. [菜鸟教程-css3篇](https://www.runoob.com/css3/css3-tutorial.html)
5. [CSS3样式生成器-Css3演示](https://www.html.cn/tool/css3Preview/Transform.html)
6. [Example animations](http://waitanimate.wstone.io/#!/)
7. [CSS 禅意花园](http://www.mezzoblue.com/zengarden/alldesigns/)
