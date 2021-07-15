# vue配置常见问题分析

* VueLoaderPlugin

```javaScript
    C:\z_work_area\01_work_test\01_vue\09_cloudApplication\cloudAppWeb\build\webpack.base.conf.js:95
  plugins: [new VueLoaderPlugin()],
            ^

TypeError: VueLoaderPlugin is not a constructor
    at Object.<anonymous> (C:\z_work_area\01_work_test\01_vue\09_cloudApplication\cloudAppWeb\build\webpack.base.conf.js:95:13)
    at Module._compile (module.js:643:30)
    at Object.Module._extensions..js (module.js:654:10)
    at Module.load (module.js:556:32)
    at tryModuleLoad (module.js:499:12)
    at Function.Module._load (module.js:491:3)
    at Module.require (module.js:587:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous> (C:\z_work_area\01_work_test\01_vue\09_cloudApplication\cloudAppWeb\build\webpack.dev.conf.js:7:27)
    at Module._compile (module.js:643:30)

```

>> [vue-loader v15 requires VueLoaderPlugin in webpack](https://github.com/rails/webpacker/issues/1453)

* Error: Cannot find module 'eslint-config-standard'

>> [eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard)
>> npm install --save-dev eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node

```javaScript
    {
        "extends": "standard"
    }
```

* 忽略某个文件

[ESLint 基本用法](https://github.com/wy-ei/notebook/issues/36)

* Should router-link to a number work like router.go

```javaScript
    <router-link :to="-1" ><router-link />
```
