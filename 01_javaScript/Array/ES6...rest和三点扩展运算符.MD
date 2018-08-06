
# ES6的rest参数和扩展运算符

## 扩展运算符

* 含义
> 扩展运算符是三个点(...)，它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列

```javaScript
    console.log(1, ...[2, 3, 4], 5);    // 1,2,3,4,5

    [...document.querySelectorAll('all')]   // [<div>, <div>, <div>]
```

* 扩展运算符主要是结合普通函数使用

```JavaScript
    // 普通函数一起使用
    function fun(a, b, c, d, e){}
    const args = [0, 2]
    fun(-1, ...args, 2, ...[3])
    // 扩展运算符后面还可以放置表达式
    cosnt arr = [
        ...(x > 0 ? ['x'] : []), 'y'
    ]
```

* 替代函数的apply方法

```javaScript
    // ES5 是写法
    function fun(x, y, z){
        // ...
    }
    var args = [0, 1, 2]
    fun.apply(null, args)

    // ES6 的写法
    let args = [2, 3, 4]
    fun(...args)
```

* 合并或者连接数组

```javaScript
    let arr1 = [1, 2, 3]
    let arr2 = [4, 5, 6]

    // 代替push方法
    arr1.push(...arr2)

    // 代替concat方法
    [...arr1, ...arr2]
```

* 复制数组

```JavaScript
    const arr1 = [1, 2, 3];
    // 将arr1复制给arr2
    const arr2 = [...arr1];
```

* 解构赋值

```JavaScript
    // ES5
    let x = arr[0];
    let restArr = arr.slice(1)

    // ES6
    let [x, ...restArr] = arr;
```

* 字符串转化成数组

```javaScript
    let str = 'Hello World'
    const arr = [...str]
```

* 类数组转数组

```JavaScript
    let nodeList = document.querySelect('div')
    let nodeArr = [...nodeList]

    // 只可以将可以枚举的类数组对象转换成数组
```

* map和Set结构

```javaScript
    // 数组去重
    [...new Set(arr)]

    // map
```