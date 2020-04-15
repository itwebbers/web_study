# 新天NB物联网表 

### 安装说明-方式一

1. 安装node

> node.exe安装包,使用管理员方式进行安装
> 安装完成后,win键+R键 然后输入 cmd 打开控制台,输入 node -v 确认是否安装成功
```shell
PS D:\softWare\~~~\XT-NB.api.nodejs\cms.chint.com> node -v
v8.11.0
PS D:\softWare\~~~\XT-NB.api.nodejs\cms.chint.com>
```

2. 项目 `ip` 和 `port` 配置

> 找到 ~~\XT-NB.api.nodejs\cms.chint.com\utils\request.js 文件, 修改第6行的 `ip` 为当前ip地址
```js
const instance = axios.create({
  // baseURL: 'http://ems.chint.com/Trailingend/Core.ashx/',
  baseURL: 'http://10.5.125.33:7070/Trailingend/Core.ashx/',
  timeout: 60000
})
```

> 找到 ~~\XT-NB.api.nodejs\cms.chint.com\bin\www 文件, 修改 15行的端口号
```js
var port = normalizePort(process.env.PORT || '3000')
```

3. 启动项目

> 进入到项目所在目录 ~~\XT-NB.api.nodejs\cms.chint.com
> 按住`shift键` 然后点击鼠标右键, 打开powershell 
> 在powershell 中输入命令  `node .\bin\www`,然后回车
```shell
PS D:\softWare\~~~\XT-NB.api.nodejs\cms.chint.com> node .\bin\www
```

4. 测试是否启用成功  

> 打开浏览器,访问当前的 `ip` + `port` 查看是否访问得到页面,如果可以访问,则证明启用成功
> 例如: `120.0.0.1:3000`


### 安装说明-方式二

1. 安装node

> node.exe安装包,使用管理员方式进行安装
> 安装完成后,win键+R键 然后输入 cmd 打开控制台,输入 node -v 确认是否安装成功
```shell
PS D:\softWare\~~~\XT-NB.api.nodejs\cms.chint.com> node -v
v8.11.0
PS D:\softWare\~~~\XT-NB.api.nodejs\cms.chint.com>
```

2. 安装pm2  

> 依然使用刚刚打开的控制台,输入命令  `npm install -g PM2`   安装完成后,输入命令 pm2 -v 确认是否安装成功

3. 项目 `ip` 配置

> 找到 ~~\XT-NB.api.nodejs\cms.chint.com\utils\request.js 文件, 修改第6行的 `ip` 为当前ip地址

4. 启动项目

> 进入到项目所在目录 ~~\XT-NB.api.nodejs\cms.chint.com
> 按住`shift键` 然后点击鼠标右键, 打开powershell 
> 在powershell 中输入命令  `PM2 start ecosystem.config.js`,然后回车

5. 测试是否启用成功  

> 打开浏览器,访问当前的 `ip` + `port` 查看是否访问得到页面,如果可以访问,则证明启用成功
> 例如: `120.0.0.1:3000`

