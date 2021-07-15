# nvm 安装
> node的版本管理器, 在不同版本的Node.js之间切换

1. 官网进行下载
   > [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
   > 建议下载安装版 `nvm-setup.zip` 
2. 如果您已经安装了`node`,请您先进行卸载的操作;而且同时删除npm的安装文件
   > node使用Windows自带的控制面板进行安装
   > npm的常见未知如: `(e.g. "C:\Users<user>\AppData\Roaming\npm") `

3. 安装的时候记得使用`管理员身份运行`;选择安装路径,一路下一步即可
4. 使用 `nvm --version` 检查 `nvm` 命令是否安装成功

```Linux
PS C:\Users\ybzyh\source\Workspaces\工作区\集抄预付费新平台\WebNewPlatformVueJS\ForeEnd\src.bak> nvm --version

Running version 1.1.7.

Usage:

  nvm arch                     : Show if node is running in 32 or 64 bit mode.
  nvm install <version> [arch] : The version can be a node.js version or "latest" for the latest stable version.
                                 Optionally specify whether to install the 32 or 64 bit version (defaults to system arch).
                                 Set [arch] to "all" to install 32 AND 64 bit versions.
                                 Add --insecure to the end of this command to bypass SSL validation of the remote download server.
  nvm list [available]         : List the node.js installations. Type "available" at the end to see what can be installed. Aliased as ls.
  nvm on                       : Enable node.js version management.
  nvm off                      : Disable node.js version management.
  nvm proxy [url]              : Set a proxy to use for downloads. Leave [url] blank to see the current proxy.
                                 Set [url] to "none" to remove the proxy.
  nvm node_mirror [url]        : Set the node mirror. Defaults to https://nodejs.org/dist/. Leave [url] blank to use default url.
  nvm npm_mirror [url]         : Set the npm mirror. Defaults to https://github.com/npm/cli/archive/. Leave [url] blank to default url.
  nvm uninstall <version>      : The version must be a specific version.
  nvm use [version] [arch]     : Switch to use the specified version. Optionally specify 32/64bit architecture.
                                 nvm use <arch> will continue using the selected version, but switch to 32/64 bit mode.
  nvm root [path]              : Set the directory where nvm should store different versions of node.js.
                                 If <path> is not set, the current root will be displayed.
  nvm version                  : Displays the current running version of nvm for Windows. Aliased as v.

```
5. `nvm`常用命令

```shell 
nvm install latest # 下载最新的 node 版本 v
nvm install 8.9.0  # 安装不同版本
nvm install 8.9.0 32 # 默认是64位，32位需指定
nvm uninstall 8.9.0 # 卸载对应的版本

nvm ls # 查看当前下载的node,如下打印
-
    12.2.0
    10.16.0
  * 8.11.0 (Currently using 64-bit executable)
-

nvm use 8.9.0 # 使用8.9.0版本的node
```
1. 