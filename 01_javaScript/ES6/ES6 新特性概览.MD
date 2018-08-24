# ES6 新特性概览

`1. 箭头操作符`
`2. 类的支持`

```javaScript
    // 类的定义
    class Person {
        // ES6的新型构造器
        constructor (name){
            this.name = name
        }
        // 实例方法
        sayName (){
            console.log(this.name)
        }
    }

    class Women extends Person {
        constructor (name){
            // 直接调用父类的构造器进行初始化
            super(name)
        }
        // 实例方法
        program (){
            console.log("i am coding...")
        }
    }
```

`3. 增强的对象字面量`
`4. 字符串模板`
`5. 解构`
`6. let与const关键字`
`7. for of`
`8. iterater gennerator`
`9. modules`

* 输出方式
  * export
  > export {}
  * export default
  > export default function (){}
  >> 最大的区别是，export输出必须带括号，export default输出只能是一个变量名
* 输入方式
  * import
  > import {demo} from 'demo'
`10. Map Set weakMap weakSet`
`11. proxies`
`12. Symbol`
`13. Math String Number Object的新API`
`14. Promise`
`15. 扩展运算符 ...`
[promise相关](./../promise相关.MD)