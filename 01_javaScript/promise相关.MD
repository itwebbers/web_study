#

##  promise 和 setTimeout

```(javaScript)
    (function test() {
        setTimeout(function() {console.log(4)}, 0);
        new Promise(function executor(resolve) {
            console.log(1);
            for( var i=0 ; i<10000 ; i++ ) {
                i == 9999 && resolve();
            }
            console.log(2);
        }).then(function() {
            console.log(5);
        });
        console.log(3);
    })()

```
具体的说是两个的执行队列不一样，promise的任务会在当前事件循环末尾中执行，而setTimeout中的任务实在下一次时间循环中执行
>   [参考链接](https://segmentfault.com/q/1010000009811652/a-1020000009811810)