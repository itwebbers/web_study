# 数组相关

## 数组去重

+ filter

```(javaScript)
    Array.filter(function(val, index, arr){
        return Array.indexOf(val) === index;
    })
```

+ ES6

```(javaScript)
    // 标准实现方法
    Array.from(new Set(arr));


    //  扩展运算符
    [...new Set(arr)]
```

## 判断是否是数组

```(javaScript)
    // JavaScript新增API isArray
    Array.isArray(arr);

    // 使用原型链
    Object.prototype.toString.call(arr).split(" ")[1].slice(0, -1)
```