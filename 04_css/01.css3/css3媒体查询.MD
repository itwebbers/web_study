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


# css3媒体查询

> 一套代码适配移动端和PC端

1. 语法
```html
<!-- link元素中的css媒体查询 -->
<link rel="stylesheet" media="(max-width: 1024px)" href="example.css"></link>
```
```css
<!-- 样式表中的媒体查询 -->
/* 逻辑运算符only --> only操作符仅在媒体查询匹配成功的情况下被用于应用一个样式，这对于防止让选中的样式在老式浏览器中被应用到。 */
/* 媒体类型screen --> 用于电脑屏幕，平板电脑，智能手机等。  */
/* 媒体功能max-width --> 定义输出设备中的页面最大可见区域宽度。 */
@media mediatype and|not|only (media feature) {
    CSS-Code;
}

@media only screen and (max-width="1024px") {
    .nav {
        display: none;
    }
}
```

2. 移动端页面必须添加meta标签

```html
<!-- viewport, 它提供有关视口初始大小的提示，仅供移动设备使用。 -->
<!-- width：一个正整数或者字符串 device-width， 以pixels（像素）为单位， 定义viewport（视口）的宽度。 -->
<!-- initial-scale： 定义设备宽度（纵向模式下的设备宽度或横向模式下的设备高度）与视口大小之间的缩放比率 -->
<!-- maximum-scale： 定义缩放的最大值；它必须大于或等于minimum-scale的值，不然会导致不确定的行为发生。 -->
<!-- minimum-scale： 定义缩放的最小值；它必须小于或等于maximum-scale的值，不然会导致不确定的行为发生。 -->
<!-- user-scalable： 如果设置为 no，用户将不能放大或缩小网页。默认值为 yes。 -->

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```

```css
/* 测试媒体查询 */
@media only screen and (max-width: 1024px) {
	body {
		background-color: skyblue;
	}
	.navbar-collapse {
		display: none;
	}

	.navbar-toggle {
		display: block;
	}
}
@media only screen and (min-width: 1024px) {
	body {
		background-color: #080808;
	}
	.navbar-brand {
		display: none;
	}
}
```
3. 媒体查询之二倍图和三倍图
    > iOS开发中，因为有普通屏和高清屏的原因，所以需要在应用中放置三套图，一套是for普通屏的，另外两套是for高清屏的（高清屏里又有分辨率不同的区别）。for高清屏的命名方式:@2x.png，@3x.png。使用的时候只要使用for普通屏的图片，系统在高清屏时会自动调用for高清屏的图片
    - 第一种方式：使用css的DevicePixelRatio媒体查询
```css
/* 这里介绍两种 */

/* css方式 */
/*默认大小*/
.test {background-image: url(test.png);}
/* 如果设备像素大于等于2，则用2倍图 */
@media screen and (-webkit-min-device-pixel-ratio: 2),
screen and (min--moz-device-pixel-ratio: 2) {
  .test {
    background-image: url(test@2x.png);
    background-size: cover;
  }
}
/* 如果设备像素大于等于3，则用3倍图 */
@media screen and (-webkit-min-device-pixel-ratio: 3),
screen and (min--moz-device-pixel-ratio: 3) {
  .test {
    background-image: url(test@3x.png);
    background-size: cover;
  }
}

/* sass方式 */
@mixin bgImg($url) {
    background-image: url($url + "@2x.png");
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        background-image: url($url + "@3x.png");
    }
}

.test {
    @include bgImg('test/test');
}
```
    - 第二种方式：直接使用img的secset属性
```html
<img width="100" height="100" src="test.png" srcset="test@2x.png 2x,test@3x.png 3x"/>
```

