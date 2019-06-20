# css 常见问题

## 2019-06.20

1. 重设input,button的样式
   > 不同的浏览器,默认的样式不一样
   ```css
    button, input {
      appearance: none;
      background: transparent;
    }
   ```
2. overflow属性的scroll,auto
   > 不同的系统下,浏览器的会出现不一样的滚动条
   ```css
    .element {
      /* 让盒子在自动去适应 */
      overflow-y: auto;
    }
   ```
3. 尽量少些transparent
   > 有些属性,比如linear-gradient属性会不识别
   ```css
    .element {
      background: liinear-gradient(rgba(0,0,0,0), #fff, #000);
    }
   ```
4. dispaly : inline-block,会出现间隔诡异的间隙问题
   > 常用的方式是:把其父级元素的font-size设置成0
5. 