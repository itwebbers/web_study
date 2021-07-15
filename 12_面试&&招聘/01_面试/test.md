# test

## 常见面试题目

* $.fn是什么意思？
    > $.fn = jQuery.prototype; 开发jQuery的插件两种方式；
  * jQuery.extend(object); // 为扩展jQuery类本身，为类添加新的方法
  * jQuery.fn.extend(object); // 给jQuery对象添加方法

* 如何判断一个变量是对象还是数组？

```javaScript
    function printInstan(args){
        return Object.prototype.toString.call(args).split(" ")[1].slice(0, -1);
    }
```

* call, apply和bind方法的区别和使用场景？
    > call, apply和bind都是Function原型中的方法，而所有的函数都是Function的实例；
    > 改变this的指向， 第一个参数都是this要指向的对象
    > bind是返回对应函数，便于稍后调用，apply，call是立即调用；

* GET和POST的区别，何时使用POST？
    > get :一般用于信息获取，使用url传递参数，对发送信息的数量也有限制，一般在2000个字符内，有的浏览器是8000个字符
    > post : 一般用于修改服务器上的资源，对所发送的信息没有限制
    >>  以下情况下请使用post
    >>  1. 无法使用缓存文件（更新服务器上的资源或者数据库）
    >>  2. 向服务器发送大量数据（POST没有数据量限制）
    >>  3. 发送包含未知字符的用户输入时，post比get更稳定更可靠

* HTML5有哪些新增加的方法？
 > 选择器   query.selector
 > classlist属性  
 > FullScreen

```html
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        html:-moz-full-screen {
        background: red;
        }
        html:-webkit-full-screen {
        background: red;
        }
        html:fullscreen {
        background: red;
        }
    </style>
    </head>
    <body>
    <ul class="class1 class2 class3 ">
    <li onclick="launchFullScreen()">全屏</li>
    <input type="text">
    </ul>
    <button onclick="exitFullscreen()">click me</button>
    <script>
    // 找到支持的方法, 使用需要全屏的 element 调用
    function launchFullScreen(element) {
        var element=element||document.documentElement;
        alert(element.nodeName);
        if (element.requestFullscreen) {
        element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
        }
    }
    //请注意: exitFullscreen 只能通过 document 对象调用 —— 而不是使用普通的 DOM element.
    function exitFullscreen() {
        if (document.exitFullscreen) {
        document.exitFullscreen();
        } else if (document.mozExitFullScreen) {
        document.mozExitFullScreen();
        } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        }
    }
    element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);//全屏状态允许键盘输入
    /*有的时候为了用户友好体验，在进入全屏或者退出全屏的时候，需要给用户提示，
    这个时候我们可以使用FullScreen的screenchange事件进行监控。事件监听没作用？？？？？*/
    document.addEventListener("fullscreenchange", function () {
    fullscreenState.innerHTML = (document.fullscreen)? "" : "not ";
    }, false);
    document.addEventListener("mozfullscreenchange", function () {
        fullscreenState.innerHTML = (document.mozFullScreen)? "" : "not ";
    }, false);
    document.addEventListener("webkitfullscreenchange", function () {
        fullscreenState.innerHTML = (document.webkitIsFullScreen)? "" : "not ";
    }, false);
    </script>
    </body>
    </html>

```

> html5之预加载
> link的prefetch属性  && link的dns-prefetch