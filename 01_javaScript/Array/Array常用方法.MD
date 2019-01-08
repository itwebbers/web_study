# 数组常用方法

1. 遍历数组--- forEach

```js
  arr.forEach(item, i, array){
    console.log(item, i)
  }
```

2. 添加元素到数组的末尾 --- push

```js
arr.push('apple')
```

3. 删除元素在数组的末尾--- pop

```js
arr.pop()
```

4. 添加元素到数组的开始 --- unshift

```js
arr.unshift('dog')
```

5. 删除数组最前面的元素

```js
arr.shift()
```

6. 指出某个元素在数组中的索引

```js
let inx = arr.indexOf('zander')
```

7. 通过索引删除某个元素/多个元素

```js
let idx = 2
arr.splice(idx, 1)
```

8. 复制一个数组

```js
arr.slice()
```

9. 判断一个变量是否是数组对象

```js
Array.isArray(arr)
```

10. 从类数组对象或者可迭代对象中创建一个新的数组实例

```js
Array.from(obj)
```

11. 根据一组参数来创建新的数组实例，支持任意的参数数量和类型

```js
Array.of('1', '2', 3)
```

12. 颠倒数组中的排列顺序

```js
arr.reverse()
```

13. 数组合并

```js
arr1.concat(arr2)
```

14. 连接所有数组元素组成一个字符串

```js
arr.json(' ')
```

15. 返回一个由数组元素而组成的字符串

```js
arr.toString()
```

16. 返回数组中第一个与指定值相等的元素索引，如果找不到这样的元素，就返回 -1

```js
arr.indexOf(item)
```

17. 如果数组中的每一个元素都满足测试函数，则返回 true，否则返回 false

```js
arr.every(function(item, i, array) {
  // dosomething
})
```

18. 数组中至少有一个元素满足测试函数，则返回 true，否则返回 false

```js
arr.some(function(item, i, array) {
  // to do something
})
```

19. 将所有在过滤函数中返回 true 的数组元素放入到一个新的数组中并返回

```js
arr.filter(function(item, i, arr) {
  // to do something
})
```

20. 返回一个由回调函数组成的数组

```js
arr.map(function(element, index, array) {
  // to do something
})
```

- every
- some
- filter
- map
- reduce
- from
- of
- copyWidthin
- find && findIndex
- fill
- entries() && keys() && values()
- includes()
- flat() && flatMap()
