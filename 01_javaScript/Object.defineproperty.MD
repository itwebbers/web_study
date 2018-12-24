# 理解 Object.defineproperty

> 给对象的属性添加特性描述，目前提供两种形式：`数据描述`和`存储器描述`

## 数据描述

```JavaScript
  var obj = {
      test:"hello world"
  }
  //对象已有的属性添加特性描述
  Object.defineProperty(obj,"demo",{
      configurable:true | false,
      enumerable:true | false,
      value:任意类型的值,
      writable:true | false
  });
  //对象新添加的属性的特性描述
  Object.defineProperty(obj,"newKey",{
      configurable:true | false,
      enumerable:true | false,
      value:任意类型的值,
      writable:true | false
  });

  // 解析
  // value: 设置属性的值
  // writable: 值是否可以重写。true|false
  // enumerable：目标属性是否可以被枚举。true|false
  // configurable: 目标属性是否可以被删除或是可以再次修改特性。true|false
```

## 存储器描述

```JavaScript
  var obj = {};
  var initValue = 'hello world';
  Object.defineProperty(obj,"newKey",{
      get:function (){
          //当获取值的时候触发的函数
          return initValue;
      },
      set:function (value){
          //当设置值的时候触发的函数,设置的新值通过参数value拿到
          initValue = value;
      }
  });
  //获取值
  console.log( obj.newKey );  //hello

  //设置值
  obj.newKey = 'change value';

  console.log( obj.newKey ); //change value
```
