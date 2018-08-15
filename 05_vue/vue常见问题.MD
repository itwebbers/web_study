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

+ vue生命周期
    [参考链接](https://segmentfault.com/a/1190000008010666)
  + beforeCreate
  + Created