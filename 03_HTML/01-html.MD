#   HTML------------------------------test

+   页面导入样式时，使用link和@import有什么区别？
>   - link属于XHTML标签，处理加载css以为，还可以有RSS及rel属性等等，@import是css提供的，仅支持引入css；
>   - 页面被加载时，link会同时被加载，而@import必须等页面加载完毕再加载；
>   - @import是css2.1提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题；
>   - link支持使用js控制DOM去改变样式，而@import不支持；

+   浏览器的内核
>   浏览器的内核主要分为两个部分：渲染引擎，js引擎
>   - trident内核：IE，360，搜狗等
>   - gecko内核：Netscape6及以上版本，FF，MozillaSuite
>   - prosto内核：Opera7及以上，【opera内核原为presto，现在改为blink】
>   - webkit内核：safari，chrome等 【chrome：webkit分支----blink】

>   - edge浏览器：渲染引擎--edgeHTML，js引擎--chakra

+   请描述一下，cookie，sessionStorage和localStorage的区别？
>   cookie是为了表示用户身份而存储再用户本地终端上的数据（通常经过加密）
>   cookie数据始终在同源的http请求中携带（即使不需要），即会在浏览器和服务器间来回传递
>   seesionStroage和localStorage不会自动把数据发给服务器，仅在本地保存；
>   - 存储大小
>   cookie数据大小不能超过4k；sessionStorage和localStorage可以达到5M
>   - 有效时间
>   localStorage存储持久数据，主动删除
>   sessionStrorage数据在当前浏览器关闭后自动删除
>   cookie设置的cookie国企时间之前一直有效，即使窗口关闭或者浏览器关闭

+   HTML5的form如何关闭自动完成？
>   在form或者里面的input标签上添加: autoComplete=off

+   如何在页面上实现一个圆形的点击区域？
>   - map + area 或者svg
>   - border-radius
>   - 纯js实现

+   1px问题？
>   - https://www.jianshu.com/p/d62d22b44ce4