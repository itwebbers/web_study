# dart web 安装及项目初始化.MD

> windows 10 安装; <font color="red">需要先安装chocolatey,如果没有安装的,请参考 安装Chocolatey</font>
### 安装 `dart`

> 使用管理员打开 `shell` 窗口 输入命令 

1.  检测choco是否安装且可以正常使用
```shell

PS C:\Windows\system32> choco
Chocolatey v0.10.15
Please run 'choco -?' or 'choco <command> -?' for help menu.

```

2. 使用choco安装 `dart-sdk`
```shell

PS C:\Windows\system32> choco install dart-sdk

```

3. 使用choco更新 `dart-sdk`
```shell

PS C:\Windows\system32> choco upgrade dart-sdk

```

4. 安装完成之后会有如下提示: 
```shell
C:\tools
Environment Vars (like PATH) have changed. Close/reopen your shell to
 see the changes (or in powershell/cmd.exe just type `refreshenv`).
 The install of dart-sdk was successful.
  Software installed to 'C:\tools'

Chocolatey installed 1/1 packages.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
```

5. 进入到 `C:\tools\dart-sdk\bin` 目录下,将dart的bin目录添加到环境变量中

6. 添加成功后在shell 进行测试
```shell
PS C:\Windows\system32> dart  --version
Dart VM version: 2.7.0 (Fri Dec 6 16:26:51 2019 +0100) on "windows_x64"
```
> 到这里你的dart web环境已经安装完成了

### 安装 获取CLI工具或IDE

```shell
 pub global activate webdev
 pub global activate stagehand
```

### 创建一个网络应用

```shell

 mkdir quickstart
 cd quickstart
 stagehand web-simple
 pub get

```

### 运行项目 

```shell
 webdev serve
```
