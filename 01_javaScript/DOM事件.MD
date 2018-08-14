# DOM事件

## 基本概念

> DOM使JavaScript有能力怼HTML上的事件做出反应。
> `DOM事件的级别：`
* DOM0  element.onclick = function(){}
* DOM2  element.addEventListener("click", function(){})
* DOM3  element.addEventListener("keyup", function(){})

## DOM事件模型

> DOM事件模型分为两种，一类是IE的冒泡事件模型，另一类是DOM标准定义的冒泡型与捕获型的事件。

## DOM事件流

事件流： window -> 捕获 -> 目标阶段 -> 冒泡 -> window

## 描述DOM事件捕获的具体流程

![DOM事件流](../assets/images/eventflow.svg)

## Event对象的常见应用

```javaScript
    event.preventDefault() // 阻止默认事件
    event.stopPropagation() // 阻止事件冒泡
    event.stopImmediatePropagation() // 事件响应优先级
    event.currentTarget // 当前绑定的事件对象
    event.target
```

## 自定义事件

[js的观察者模式创建自定义事件](https://www.cnblogs.com/LuckyWinty/p/5796190.html)

* Event()构造函数，创建一个新的事件对象event

* CustomEvent()创建一个自定义事件
* document.CreateEvent()创建一个新的事件对象event，随之必须调用自身的init方法进行初始化

```javaScript
    // 创建事件
    var create = document.create("Event")
    // 定义事件名为'build'
    create.initEvent("build", true, true)
    // 监听事件
    element.addEventListener("buiild", function(e){
        console.log(e.target)
    }, false)
    // 出发对象可以是任何元素或者其他事件目标
    element.dispatchEvent(event)
```

## `自定义事件封装`

```javaScript
    (function(){
        try{
            // a : While a window.CustomEvent object exists, it cannot be called as a constructor.
            // b : There is no window.CustomEvent object
            new window.CustomEvent('T');
        }catch(e){
            var CustomEvent = function(event, params){
                params = params || { bubbles: false, cancelable: false, detail: undefined };

                var evt = document.createEvent('CustomEvent');

                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

                return evt;
            };

            CustomEvent.prototype = window.Event.prototype;

            window.CustomEvent = CustomEvent;
        }
    })();
```