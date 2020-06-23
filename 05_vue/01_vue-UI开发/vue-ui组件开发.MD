# ui组件开发

> 开发vue-ui组件,并上传npm

## vue-ui 组件开发

> 开发前请先熟悉vue官网  [开发插件](https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6)

1. Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
```JavaScript
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

2. 开发前我们参考 element-ui

> 实现和element-ui同样的引入方式:
- npm 安装
```shell
npm i element-ui -S

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
```

- script(CDN) 引入方式

```JavaScript
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
```

- 同样支持 commonJS的require引入方式

```JavaScript
const ELEMENT = require('element-ui');
```

### 构建项目

>  我们使用`vue init webpack-simple my-project`进行项目的初始化 
> 一个简单的Vue 2.0 Webpack和vue-loader设置，可快速进行原型制作

1. 初始化的项目结构如下:

![UI组件开发目录](D:/softWare/03_study/web_study/05_vue/img/UI组件开发目录.png)
> 主要结构介绍如下:
- projectName 
  - examples 项目测试
  - package 组件
    - tag 组件文件夹
      - index.vue 组件编写文件
    - index.js 组件引用
  - src 运行目录
    - main.js 组件注册(vue.install())
  - .babelrc babel
  - package.json 项目依赖
  - webpack.config.js webpack配置(打包) 

2. 编写组件

> 编写位置: `02.vue_create_components\packages\btn\src\index.vue`
> 比较简单,这里不再赘述,代码贴出来,大家自行看看

```Vue
<template>
  <div class="btn">
    <button>{{value}}</button>
  </div>
</template>

<script>
export default {
  name: 'Btn',
  data() {
    return {};
  },
  props: {
    value: {
      type: String,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  > button {
    font-family: Google Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: .25px;
    line-height: 16px;
    margin-left: 10px;
    margin-right: 8px;
    min-width: 96px;
    padding: 9px 23px;
    text-align: center;
    vertical-align: middle;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    background: #1a73e8;
    border: 1px solid transparent;
    color: #fff;
    cursor: pointer;
  }
}
</style>
```
- 效果如下: 
![组件效果](D:/softWare/03_study/web_study/05_vue/img/组件效果.png)

3. 注册为Vue插件

> 编写位置: `02.vue_create_components\packages\btn\index.js`

- 比较简单,看不懂的官网走起

```JavaScript
import Btn from './src/index';

/* istanbul ignore next */
Btn.install = function(Vue) {
  Vue.component(Btn.name, Btn);
};

export default Btn;
```

4. 处理多个组件,方便统一导出,这里设置webpack的入库文件
> 编写位置: `02.components\02.vue_create_components\src\main.js`

```JavaScript

import Btn from '../packages/btn/index.js';

const components = [
  ElTag,
  Btn
];

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.0.0',
  install,
  Btn
};
```

5. 修改webpack配置

> 让webpack处理我们的入库文件

```JavaScript
// 指定 开发环境
const NODE_ENV = process.env.NODE_ENV


  entry: NODE_ENV == 'development' ? './examples/main.js' : './src/main.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'btn.js',
    chunkFilename: '[id].js',
    library: 'default', // 指定的就是你使用require时的模块名
    libraryTarget: 'umd', // libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
  },
```

6. 修改 package.json

```json
// 发布开源因此需要将这个字段改为 false
"private": false,
// 配置main结点，如果不配置，我们在其他项目中就不用import XX from '包名'来引用了，只能以包名作为起点来指定相对的路径
"main": "dist/btn.js"
```

7. 在项目文件夹下执行 shell命令

```shell
npm run build
```
- 如果执行成功会在项目下生成dist文件夹
![build](D:/softWare/03_study/web_study/05_vue/img/build.png)


8. 打开根文件index.html

- 修改内容如下: 

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>02.vue_create_components</title>
</head>

<body>
  <div id="app">
    <btn :value="btn"><btn/>
  </div>
  <script src="./node_modules/vue/dist/vue.js"></script>
  <script src="./dist/btn.js"></script>
</body>

<script>
  new Vue({
    el: '#app',
    data() {
      return {
        btn: '按钮'
      }
    }
  })
</script>

</html>
```

9. 在浏览器中预览 index.html看效果

10. 进行npm发布(这里比较简单,不再赘述)
- 登录
> npm login

- 添加用户信息
> npm adduser

- 发布到远程仓库(npm)上
> npm publish

- 删除远程仓库的包
> npx force-unpublish package-name '原因描述'


11. vue-cli@3.0+ 开发依赖于element-ui的组件

> 参考连接 [vue-cli-plugin-element](https://github.com/ElementUI/vue-cli-plugin-element)
> 只需要在项目中添加一个 element, 其他与上述步骤一致

```npm
vue create my-app
cd my-app
vue add element
```

- package.json node启动方式修改

> "lib": "vue-cli-service build --target lib --name tag --dest lib ./packages/index.js"
