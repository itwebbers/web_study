# 将原生js封装成模块化

> 话不多说,直接上代码

```js
/** -------------------------------------------------------------------------
 * Author: zander5211314@gmail.com
 * Date: 2019.07.24
 * Description: sessionStorage和localStorage的二次封装
 *
 * History: 第一次
 * 注意事项: 本文件在ie浏览器下如果使用file://访问文件,会禁止存储数据
 -------------------------------------------------------------------------*/
;(function($that, factory) {
  if (typeof define === 'function' && define.amd) {
    // require方式引入
    define(factory)
  } else if (typeof exports === 'object') {
    // 模块化方式引入
    module.exports = factory()
  } else {
    // 直接引用
    $that.utilsInterface = factory().utilsInterface
    $that.test = factory().test
  }
})(this, function() {
  // 使用严格模式
  'use strict'
  var utilsInterface = {
    alt: function() {
      alert('success')
    },
    con: function() {
      console.log('success')
    }
  }
  var test = {
    alt: function() {
      alert('test')
    },
    con: function() {
      console.log('test')
    }
  }
  var FactoryImplaments = function(test, utilsInterface) {
    this.test = test
    this.utilsInterface = utilsInterface
  }
  return new FactoryImplaments(test, utilsInterface)
})

```