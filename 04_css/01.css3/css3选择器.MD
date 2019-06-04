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


# css选择器

> 

## 1. css入门必知--权重问题
>  权值等级划分， 一般来说是划分4个等级：

	- 第一等级：代表 内联样式，如 style=""，权值为 1,0,0,0；
	- 第二等级：代表 ID选择器，如 #id="", 权值为 0,1,0,0；
	- 第三等级：代表 calss | 伪类 | 属性 选择器，如 .class | :hover,:link,:target | [type], 权值 0,0,1,0；
	- 第四等级：代表 标签 | 伪元素 选择器，如 p | ::after, ::before, ::fist-inline, ::selection, 权值 0,0,0,1；
	- 此外，通用选择器(\*)，子选择器（\>）， 相邻同胞选择器（\+）等选择器不在4等级之内，所以它们的权值都为 0,0,0,0；

>　权值计算 公式：

　　　　权值 = 第一等级选择器*个数，第二等级选择器*个数，第三等级选择器*个数，第四等级选择器*个数；
				`css属性后面加 !important 时，无条件绝对优先（比内联样式还要优先）`

##### 2. css常用选择器
1. 不做介绍部分:
        `.class, #id, *, Element`  `LVHA => :link, :visited, :hover, :active`
2. element::before { 样式 }  ||  element::after { 样式 }
    
  * 移动端的返回箭头
```html
    <span class="mobel-back">返回</span>
```
```css
    span::before {
        content: "«";
        color: blue;
    }
```
<style> 
    span.mobel-back { font-size: 16px;
        display: inline-block;
        padding: 4px;
        background-color: blue;
        border-radius: 4px;
        color: #FFFFFF;}
    span.mobel-back::before {
        content: "«";
        color: white;
        margin-right: 5px;}
</style>
<span class="mobel-back">返回</span>


  * 清浮动
```css
:after{
    display:block;
    clear:both;
    height:0;
    content: "";
    visibility: hidden;
    overflow:hidden;
}
```
  * 添加元素前后border
```html
<ul>
  <li>搏一搏，单车变摩托</li>
  <li>赌一赌，摩托变路虎</li>
</ul>
```
```css
ul.pseudo-border li {
  list-style-type: none;
  position: relative;
  padding: 0.5em 0.5em 0.5em 2em;
  background: lightgrey;
  font-family: sans-serif;
}
ul.pseudo-border li::before {
  content: '';
  position: absolute;
  border-color: #009933;
  border-style: solid;
  border-width: 1px;
  top: 0;
  left: 0;
  width: 100%;
}
```
<style> 
ul.pseudo-border li {
  list-style-type: none;
  position: relative;
  padding: 0.5em 0.5em 0.5em 2em;
  background: lightgrey;
  font-family: sans-serif;
}
ul.pseudo-border li::before {
  content: '';
  position: absolute;
  border-color: #009933;
  border-style: solid;
  border-width: 1px;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
<ul class="pseudo-border">
  <li>搏一搏，单车变摩托</li>
  <li>赌一赌，摩托变路虎</li>
</ul>


  * 字体图标
```html
<ul>
  <li>搏一搏，单车变摩托</li>
  <li>赌一赌，摩托变路虎</li>
</ul>
```
```css
ul.pseudo-icon li {
  list-style-type: none;
  position: relative;
  padding: 0.5em 0.5em 0.5em 2em;
  background: lightgrey;
  font-family: sans-serif;
}
ul.pseudo-icon li::before {
  content: '';
  position: absolute;
  border-color: #009933;
  border-style: solid;
  border-width: 1px;
  top: 0;
  left: 0;
  width: 100%;
}
```
<style> 
ul.pseudo-icon li {
  list-style-type: none;
  background: lightgrey;
  font-family: sans-serif;
        
}
ul.pseudo-icon li::before {
  content: '\E600';
}
</style>
<ul class="pseudo-icon">
  <li>搏一搏，单车变摩托</li>
</ul>



  * 下拉三角
```html
<!-- 向下的三角形 -->
<div class="triangle_border_down">
    <span></span>
</div>
```
```css
.triangle_border_down{
    width:0;
    height:0;
    border-width:30px 30px 0;
    border-style:solid;
    border-color:#333 transparent transparent;/*灰 透明 透明 */
    margin:40px auto;
    position:relative;
}
.triangle_border_down span{
    display:block;
    width:0;
    height:0;
    border-width:28px 28px 0;
    border-style:solid;
    border-color:#fc0 transparent transparent;/*黄 透明 透明 */
    position:absolute;
    top:0px;
    left:0px;
}
```
<style> 
.triangle_border_down{
    width:0;
    height:0;
    border-width:30px 30px 0;
    border-style:solid;
    border-color:#333 transparent transparent;/*灰 透明 透明 */
    margin:40px auto;
    position:relative;
}
.triangle_border_down span{
    display:block;
    width:0;
    height:0;
    border-width:28px 28px 0;
    border-style:solid;
    border-color:#fc0 transparent transparent;/*黄 透明 透明 */
    position:absolute;
    top:0px;
    left:0px;
}
</style>
<div class="triangle_border_down">
    <span></span>
</div>


  * 添加文字
```html
<span class="add-text">鸟儿还是云朵.</span>
```
```css
.add-text::before {
        content: "天上飞的是什么";
        background-color: #FFBA10;
        border-color: black;
        border-style: dotted;
}
```
<style> 
.add-text::before {
        content: "天上飞的是什么";
        background-color: #FFBA10;
}
</style>
<span class="add-text">:鸟儿还是云朵.</span>
  * 鼠标经过
  > 不做代码演示： 常见效果有：表格的鼠标路过整行变色，datapicker，头像边框 and so on！


3. 属性选择器
   > CSS 属性选择器通过已经存在的属性名或属性值匹配元素。
   - [attr]
    > 表示带有以 attr 命名的属性的元素。
```css
/* 包含src属性的a标签 */
a[src] 
```
   - [attr=value]
    > 表示带有以 attr 命名的属性，且属性值为"value"的元素。
```css
/* 包含type属性且值为text的input标签 */
input[type="text"] 
```
   - [attr$=value]
    > 表示带有以 attr 命名的属性，且属性值是以"value"结尾的元素。
```css
/* 包含src属性且值以.jpg结尾的img标签 */
img[src$=".jpg"] 
```
   - [attr*=value]
    > 表示带有以 attr 命名的属性，且属性值包含有"value"的元素。
```css
/* 包含src属性且值包含https结尾的a标签 */
a[src*="https"] 
```
4. 部分伪类选择器
    - :first-child
    > 表示在一组兄弟元素中的第一个元素。
    - :last-child
    > 代表父元素的最后一个子元素。
    - nth-child(an+b)
    > 首先找到所有当前元素的兄弟元素，然后按照位置先后顺序从1开始排序，选择的结果为第（an+b）个元素的集合（n=0，1，2，3...）
5. input选择器
   - :enabled 
    > 表示任何启用的（enabled）元素. 一个元素能够被激活（如选择、点击或接受文本输入）或获取焦点，则该元素是启用的
   - :disabled
    > 表示任何被禁用的元素。如果一个元素不能被激活（如选择、点击或接受文本输入）或获取焦点，则该元素处于被禁用状态。
   - :checked
    > 表示任何处于选中状态的radio(<input type="radio">), checkbox (<input type="checkbox">) 或("select") 元素中的option HTML元素("option")
