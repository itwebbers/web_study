---
title: JavaScript 构造器模式
categories:
  - JavaScript
tag: 'tags'
tags:
  - JavaScript
---

# 构造器模式

> 在面向对象编程中，构造器是一个当新建对象的内存被分配后，用来初始化该对象的一个特殊函数

## 创建对象

> 创建对象的三种方式

```JavaScript
  var newObject = {}

  var newObject = Object.create(null)

  var newObject = new Object()
```

> 四种方式可以将一个键值对赋值给一个对象

```JavaScript
  //  ECMAScript 3 兼容模式

  // 1. \. '点号'法

  // 设置属性
  newObject.somekey = 'hello world'
  // 获取属性
  var key = newObject.somekey

  // 2. '方括号'法

  // 设置属性
  newObject['somekey'] = 'hello world'
  // 获取属性
 var key = newObject['somekey']

 // 3. Object.defineProperty方式

 // 设置方式
 Obejct.defineProperty(obj, 'somekey', {
   value: 'for more control of the property\'s behavior',
   wirtable: true,
   enumerable: true,
   configurable: true
 })

 // 如果上面的方式让你难以理解，可以写成这种方式
 var defineProp = function(obj, key, value){
   config.value = value
   Object.defineProperty(obj, key, config)
 }
 // 为类使用它，我们要创建一个'person'对象
 var person = Object.create(null)
 // 用属性构造对象
 defineProp(person, 'car', 'false')


 // 4. Object.defineProperties方式

 // 设置属性
 Object.defineProperties(newObject, {
   'somekey': {
     value: 'hello world',
     writable: true
   },
   'anthoerkey': {
     value: 'Foo bar',
     wirtable: true
   }
 })
```
