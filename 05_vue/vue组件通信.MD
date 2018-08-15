# vue 组件通信

1. 父子组件通信

`props $emit`
2. 兄弟组件通信

`eventBus`
3. 页面跳转传值

```Vue
 <router-link tag="div" :to"{path:'/home', query:{id:1}}"></router-link>

 <!-- 获取 -->
 this.$route.query.id
```