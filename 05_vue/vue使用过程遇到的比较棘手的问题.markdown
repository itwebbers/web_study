# vue 使用过程中遇到的一些比较棘手的问题

1. 组件的自定义事件的名称必须是 kebab-case；绝对不是可以是 camelCase 或 PascalCase。

   > 原因是： v-on 事件监听器在 DOM 模板中会被自动转换为全小写（因为 HTML 是大小写不敏感的）

2. 如果 vue 不是的那页面应用的移动端项目，会出现 sessionStorage 失效的情况
   > 原因是： sessionStorage 是在当前窗口下进行的数据存储，有些浏览器在跳转页面的时候它系统是打开了一个新的 webview

3. [Vue warn]: Error in beforeDestroy hook: "TypeError: 对象不支持“remove”属性或方法"

```js
    (function (arr) {
      arr.forEach(function (item) {
        if (item.hasOwnProperty('remove')) {
          return;
        }
        Object.defineProperty(item, 'remove', {
          configurable: true,
          enumerable: true,
          writable: true,
          value: function remove() {
            this.parentNode.removeChild(this);
          }
        });
      });
    })([Element.prototype, CharacterData.prototype, DocumentType.prototype])
```

4. Uncaught SyntaxError: The requested module '../../assets/vue.min.js' does not provide an export named 'default'

> 如果你使用原生 ES Modules，这里也有一个兼容 ES Module 的构建文件：

```js
<script type="module">
  import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'
</script>
```