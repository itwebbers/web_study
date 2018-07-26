#   vue 常见问题

+   列表将纳入详情页的传参问题
```(javaScript)
    <router-link :to="{path: 'detail', query: {id:1}}">前往detal页面</router-link>
```

+   本地开发环境请求服务器接口跨域的问题
```(javaScript)
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