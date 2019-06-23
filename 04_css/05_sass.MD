---
layout: post
title: 'JavaScript 本地对象和内置对象 && Browser 对象 && HTML DOM 对象'
date: 2019-01-08
categories:
  - JavaScript
taga:
  - JavaScript
  - DOM
---

# sass 文档笔记

> sass css 预编译器，是由按强化 css 的工具。

- 讲解之前先教大家如何使用vs code编译sass
> 安装两个插件

+ Sass
+ Easy Sass
+ Sass Lint （`感兴趣的同学可以试试`）

- 使用Ruby编译 

+ [安装教程](https://www.sass.hk/install/),`这里感兴趣的同学可以自行研究，由于过程繁琐，这里不做具体的演示`
> sass基于Ruby语言开发而成，因此安装sass前需要安装Ruby

## sass 特点

1. 完美兼容 css及css3
2. 在 css 基础上增加了`变量`，`嵌套（nesting）`,`混合（mixins）`,`导入（import）`;
3. 通过函数进行颜色值与属性值的计算
4. 提供控制指令等高级功能
5. 自定义输出格式

## css 功能扩展

1. 嵌套规则
   > Sass 允许将一套 css 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器

```css
header {
  color: red;
  nav {
    font-size: 14px;
  }
}
```

2. 选择器

  > 只介绍两款常用的选择器,其他的选择器,感兴趣的可以自行去 see
  - 父选择器 &
> 用`&`代表嵌套规则外层的父选择器

```css
a {
  color: blue;
  &:hover {
    color: red;
  }
}
```
  - 直接子元素(亲儿子元素) > 
```html
<section>
  <div>
    <p>下面css是选中的我这个p元素</p>
  </div>
  <p></p>
</section>
```
```css
section {
  div > p {
    color: red;
  }
}
```
  - 

3. 属性嵌套

> 为了方便管理复杂的属性，同时也为了避免重复的输入，Sass 允许将属性嵌套在命名空间中

```css
.wraper {
  .box {
    family: fantasy;
    size: 15px;
    weight: bold;
  }
}
```

4. 注释： `/* */` 与 `//`
   > Sass 支持标准的 css 多行注释`/* */`，以及单行注释 `//`, 前者会被完整输出到编译后的 css 文件中，而后者则不会

```css
/* 这个注释方式会出现在编译完成后的css中 */
body {
  color: black;
}


a {
  color: green; // 这种注释方式不会出现在编译完成后的css中
}
```

## SassScript

1. 变量 `$` (Variable: \$)
   > SassScript 最普遍的用法就是变量，变量以美元符号开头，赋值方法与 css 属性的写法一样

```css
// 变量声明
$width: 100px;

// 调用方式
.box {
  width: $width;
}
// 将局部变量转换为全局变量可以在其后添加 !global

.box {
  $width: 100px !global;
  width: $width;
}
```

2. 数据类型

   > SassScript 支持 6 中主要的数据类型

   - 数字
   - 字符串
   - 颜色
   - 布尔值 true/false
   - 空值，null
   - 数组
   - maps

     2.1 字符串

     > 有引号字符串和无引号字符串；使用字符串变量的方式： `#{}`

3. 运算
   > 所有数据类型均支持相等运算 == 或 !=，此外，每种数据类型也有其各自支持的运算方式。

- 数字运算
  > SassScript 支持数字的加减乘除、取整等运算 (+, -, \*, /, %)，如果必要会在不同单位间转换值

```css
p {
  font: 10px/8px; // Plain CSS, no division
  $width: 1000px;
  width: $width/2; // Uses a variable, does division
  width: round(1.5) / 2; // Uses a function, does division
  height: (500px/2); // Uses parentheses, does division
  margin-left: 5px + 8px/2px; // Uses +, does division
}
```

- 圆括号用来影响运算的顺序

4. 函数指令

> Sass 支持自定义函数，并能在任何属性值或 Sass script 中使用：

```css
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar {
  width: grid-width(5);
}
```
> `常用的使用方式: 在你不使用flex/grid布局或者calc计算的情况下,你希望在一个大盒子内横向放置n+1个盒子(n为偶数),并均匀分布,这个时候你没有办法知道每个小盒子应该是多大,这个时候你就可以使用该函数的方式`

## @-Rules 与指令 (@-Rules and Directives)

1. @import

   > Sass 拓展了@import 的功能，允许其导入 SCSS 或 SaSS 文件。被导入的文件将合并编译到同一个 css 文件中，另外，被导入的文件中所包含的变量或者混合指令（mixin）都可以在导入的文件中使用。

   - 嵌套@import

   ```css
   // 假设 example.scss 文件包含以下样式：

   .example {
     color: red;
   }
   // 然后导入到 #main 样式内

   #main {
     @import 'example';
   }
   ```

   > `一般常见的使用方式,你的某个scss文件需要在很多地方使用,比如base.scss,common.scss,mixin.scss等`

2. @media

3. @extend
   > 在设计网页的时候常常遇到这种情况：一个元素使用的样式与另一个元素完全相同，但又添加了额外的样式。通常会在 HTML 中给元素定义两个 class，一个通用样式，一个特殊样式

```css
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

## 混合指令（Mixin Directives）

> 混合指令（Mixin）用于定义可重复使用的样式，避免了使用无意的 class，比如.float-left。混合指令可以包含所有的 css 规则，绝大部分 Sass 规则，甚至通过参数功能引入变量，输出多样化的样式。

- 定义混合指令 @mixin (Defining a Mixin: @mixin)

```css
/* 无参数方式 */
@mixin clearfix {
  display: inline-block;
  &:after {
    content: '.';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}

/* 有参数方式 */
@mixin position ($position: absolute, $top: 0, $left: 0){
  position: $position;
  top: $top;
  left: $left;
}
```

- 使用 Mixin 样式： `@include`

  > 使用`@include`之快令引入混合样式，格式是在其后添加混合名称

  ```css
  .page-title {
    @include clearfix;
    padding: 4px;
    margin-top: 10px;

    @include position(fixed, 200px, 200px);
  }
  ```
- 贡献一些常用的mixin指令
  ```css
  // 水平垂直居中
  @mixin center($top, $left){
    position: absolute;
    top: $top;
    left: $left;
    transform: translate(-$top, -$left);
  }

  // border
  @mixin border($derection, $width, $style, $color){

    @if $derection == top {
      border-top-width: $width;
      border-top-style: $style;
      border-top-color: $color;
    }
    @if $derection == right {
      border-right-width: $width;
      border-right-style: $style;
      border-right-color: $color;
    }
    @if $derection == bottom {
      border-bottom-width: $width;
      border-bottom-style: $style;
      border-bottom-color: $color;
    }
    @if $derection == left {
      border-left-width: $width;
      border-left-style: $style;
      border-left-color: $color;
    }
    
    @if $derection == all {
      border-style: $style;
      border-width: $width;
      border-color: $color;
    }
  }

  // 文字样式
  @mixin textStyle($fontSize, $color, $lineHeight, $letterSpacing, $textAlign: left){
    font-size: $fontSize;
    color: $color;
    line-height: $lineHeight;
    letter-spacing: $letterSpacing;
    text-align: $textAlign;
  }

  // 宽高
  @mixin wh($width: 100%, $height: 100%) {
    width: $width;
    height: $height;
  }

  // 二倍图三倍图
  @mixin bgImg($url) {
    background-image: url($url + "@2x.png");
    background-size: cover;
    background-repeat: no-repeat;
    @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
      background-image: url($url + "@3x.png");
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  // 清浮动
  @mixin clearfix {
    &:after {
      content: "";
      display: table;
      clear: both;
    }
  }
  ```
- 
