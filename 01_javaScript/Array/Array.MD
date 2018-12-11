# 数组相关

## 数组去重

- filter

```javaScript
    Array.filter(function(val, index, arr){
        return Array.indexOf(val) === index;
    })
```

- ES6

```javaScript
    // 标准实现方法
    Array.from(new Set(arr));


    //  扩展运算符
    [...new Set(arr)]
```

- reduce

```javaScript
    let result = arr.sort().reduce((init, current) => {
        if(init.length === 0 || init[init.length - 1] != current){
            init.push(current);
        }

        return init;
    }, [])
```

- push

```JavaScript
    let tempArray = []
    for(var i = 0; i < arr.length; i++){
        (function(i){
            if(tempArrray[i].indexOf(arr[i] === -1)){
                tempArray.push(aarr[i])
            }
        }(i))
    }
```

- 排序去除相邻的重复元素

```JAvaScript
    let sortArray = arr.sort()
    let tempArray = []
    for(var i = 0; i < arr.length; i++){
        if(sortArray[i] != sortArray[i+1]){
            tempArray.push(sortArray[i])
        }
    }
```

- splice

```JAvaScript
    var len = arr.length;
    for(let i = 0; i < len; i++) {
        for(let j = i + 1; j < len; j++) {
            if(arr[i] === arr[j]) {
                arr.splice(i,1);
                len--;
                j--;
            }
        }
    }
```

## 判断是否是数组

```javaScript
    // JavaScript新增API isArray
    Array.isArray(arr);

    // 使用原型链
    Object.prototype.toString.call(arr).split(" ")[1].slice(0, -1)
```

## 可枚举的对象转化成数组

```javaScript
    [].slice.call(obj)
    [].slice.apply(obj, [0])

    Array.prototype.slice.call(obj)
    Array.prototype.slice.apply(obj, [0])
    // Array.prototype.push.apply(obj.arguments)
    [第五个方法参考资料](https://www.quora.com/How-does-Array-prototype-push-apply-work-in-JavaScript)
```

## 数组对象排序

```javaScript
    var sortBy = function(attr, rev){
        // attr 排序的属性，rev排序的方式
        // 如果第二个参数如果没有传，默认是升序排列
        if(rev == undefind){
            rev = 1;
        }else {
            rev = (rev) ? 1 : -1;
        }

        return function (a, b){
            a = a[attr];
            b = b[attr];
            if(a < b){
                return rev * -1;
            }
            if(a > b) {
                return rev * 1;
            }

            return 0;
        }
    }

    Array.sort(sortBy("number", false))
```
