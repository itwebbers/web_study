# HTTP 协议

* http协议的主要特点
    > 简单快速， 灵活， 无状态， 无连接
* http报文的组成部分
  * 请求报文
  > 请求行，请求头，空行，请求体
  * 响应报文
  > 状态行，响应头，空行，响应体
* HTTP 方法
  1. POST   传输资源
  2. GET    获取资源
  3. DELETE     删除资源
  4. PUT    更新资源
  5. HEAD   获得报文首部
* POST与GET的区别
    1. GET在浏览器回退是无害的，而POSt会再次请求
    2. GET产生的url地址可以被收藏，而post不可以
    3. GET请求会被浏览器主动缓存，而POST不会，除非你主动收藏
    4. GET请求只能进行url编码，而POST支持多种编码方式
    5. GET请求参数会被完整保留在浏览器历史记录里，而post中的参数不会被保留
    6. GET请求在URL中传送参数是有长度限制的，而POST没有限制
    7. 对参数的数据类型，GET只接受ASCII字符，而POST没有限制
    8. GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息
    9. GET参数通过URL传递，POST 放在Reuerst body中  
* HTTP状态码
* 什么是持久化链接
* 什么是管线化

## get与post区别

[get与post区别](https://www.oschina.net/news/77354/http-get-post-different)

> https://www.oschina.net/news/77354/http-get-post-different

[post与get请求](https://www.zhihu.com/question/28586791)
> https://www.zhihu.com/question/28586791