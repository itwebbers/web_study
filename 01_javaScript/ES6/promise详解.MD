# promise 详解

## promise 两大特点

> Promise 字面解释： 就是一个容器，里面保存着某个未来才会结束的时间（通常是一个异步操作）的结果

1. 对象的状态不受外界的影响。promise 对象代表一个异步操作，有三种状态： pending（进行中）， fulfilled（已成功）， rejected（已失败）。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。promise 的状态改变只有两种可能：从 pending 到 fulfilled 和从 pending 到 rejected。

## 基本用法

> ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例

```JavaScript
const Promise = new Promise(fucntion(resolve, reject){
  if(/* 异步成功 */){
    resolve(value)
  }else{
    reject(error)
  }
})
```

> 1. resolve 函数的作用： 将`Promise`对象的状态从‘未完成’变成‘成功’（即从 pending 到 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
> 2. reject 函数的作用： 将`Promise`对象的状态从‘未完成’变成‘失败’（即从 pending 到 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

- promise 实例生成以后，可以用 then 方法分别指定 resolved 状态和 rejected 状态的回调函数

```JavaScript
promise.then(function(value){
 // success
},function(error){
  // success
})
```

> `.then`方法可以接收两个回调函数作为参数，第一个回调函数时`Promise`对象的状态改变为 resolved 时调用，第二个回调函数时`Promise`对象的状态变为`rejected`时调用。

- promise 新建后就会立即执行

```javaScript
let Promise = new Promise(function(resolve, reject){
  console.log(1)
  resolve()
})

Promise.then(function(value){
  console.log(2)
})

console.log(3)


// 打印顺序
// 1
// 3
// 2
```

- 用`Promise`对象实现 Ajax 操作实例

```JavaScript
const getJSON = function(url){
  return new Promise((resolve, reject) => {
    const handler = function () {
      if (this.readState !== 4){
        return
      }
      if (this.status === 200){
        resolve(this.response)
      } else {
        reject(new Error(this.responseText))
      }
    }

    cosnt client = new XMLHttpRequest()
    client.open('GET', url)
    client.onreadystatechange = handler
    client.responseType = 'json'
    client.setRequestHeadler('Accept', 'application/json')
    client.send()
  })
}


// 使用
getJSON('posts.json').then(function(json){
  console.log('Content: ' + json)
}, function(error){
  console.log('您的服务器开小差了' + error)
})
```
