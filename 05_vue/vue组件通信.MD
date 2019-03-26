# vue 组件通信

1. 父子组件通信

`props $emit`

2. 兄弟组件通信

`eventBus`

3. 页面跳转传值

```JavaScript
 <router-link tag="div" :to"{path:'/home', query:{id:1}}"></router-link>

 <!-- 获取 -->
 this.$route.query.id
```

4. 使用 session Stroge 缓存进行存值

5. vuex

## link to

[Vue 通信、传值的多种方式](https://blog.csdn.net/qq_35430000/article/details/79291287)
