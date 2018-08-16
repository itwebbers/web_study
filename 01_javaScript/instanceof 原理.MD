# instanceof 原理解析

[参考链接](https://juejin.im/post/5b0b9b9051882515773ae714)

> instanceof 主要的实现原理就是只要右边的prototype在左边的原型链上即可，因此，instanceof在查找的过程中会遍历左边的变量的原型链，直到找到右边的prototype，如果查找失败，则返false，告诉完美左边变量并非是右边变量的实例。