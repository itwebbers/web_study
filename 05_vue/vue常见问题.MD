# vue 常见问题

+ 列表页面进入详情页的传参问题

```javaScript
    <router-link :to="{path: 'detail', query: {id:1}}">前往detal页面</router-link>
```

+ 本地开发环境请求服务器接口跨域的问题

```javaScript
    proxyTable: {
        '/api': {
            target: 'http://jsonplaceholder.typicode.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
```

+ vue设置按需加载

[参考链接](https://segmentfault.com/a/1190000011519350)

+ vue的优点？
  + 低耦合    view和model互相解耦
  + 高复用      组件化构建
  + 独立开发    数据和视图完全独立开发
  + 插件    生态中的第三方插件库完美结合

+ vue 路由跳转
  + 声明式跳转（标签跳转）

  ```JavaScript
    <router-link :to"index"><router-link>
  ```

  + 编程式跳转（js跳转）

  ```JavaScript
    this.$router.push("index")
  ```

  ```html
    <span @click="goRouter"></span>

    methods: {
        goRouter: function(){
            this.$router.go("/login")
        }
    }
  ```

  + vue 按需加载
    1. vue的异步组件

    ```javaScript
    {
        name: "componentDemo",
        path: "/componentDemo",
        component: resolve => require(["./componentDemo"], resolve)
    }
    ```

    2.使用ES6的import

    ```JavaScript
    const promiseComponents1 = () => import (/* webpackChunkName: 'importComponents' */ '../promiseComponents1')
    const promiseComponents2 = () => import (/* webpackChunkName: 'importComponents' */ '../promiseComponents2')
    ```

    3.使用webpack提供的require.ensure -----(webapck特有的，已经被import取代)

    ```JavaScript
    {
        name:"componentDemo",
        path: "/componentDemo",
        component: require.ensure([], () => resolve(require('../componentDemo')), chunkName)
    }
    ```
+ 常用的vue 指令

    |指令|作用|
    |:------:|:------:|
    |v-if|判断是否隐藏|
    |v-for|数据循环出来|
    |v-bind|绑定一个属性|
    |v-model|实现双向绑定|

+ vue 双向数据绑定原理

    [参考链接](https://segmentfault.com/a/1190000006599500)
    [参考链接](https://juejin.im/post/5adf0085518825673123da9a)