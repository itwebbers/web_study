# DOM 操作

> 主要是对 DOM 的创建，删除，添加，复制和查找等

1. 创建

- 创建 DOM 元素

```js
document.createElement('div')
```

- 创建属性节点

```js
document.createAttribute('style')
```

- 创建文本节点

```js
document.createTextNode('success')
```

- 创建注释节点

```js
document.createComment('<--这是一个注释-->')
```

- 创建文档碎片

```js
document.createDocumentFragment()
```

2. 删除

- 删除元素节点

```js
let app = document.querySelector('#app')
document.removeChild(app)
```

- 删除属性节点

```js
document.removeAttribute('attr')
```

3. 添加

- 在元素前面添加

```js
let app = document.querySelector('#app')
app.insertBeefore(node)
```

- 在元素内部添加

```js
let app = document.querySelector('#app')
app.appendChild(node)
```

- 替换元素

```js
let app = document.querySelector('#app')
let newApp = document.querySelector('#newApp')
document.body.replace(newApp, app)
```

4. 复制元素

```js
let app = document.querySelector('#app')
let newApp = app.cloneNode(app)
```

5. 查找
