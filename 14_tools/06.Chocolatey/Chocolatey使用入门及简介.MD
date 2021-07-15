# Chocolatey使用入门及简介

## 简介

> Chocolatey是一种软件管理解决方案，与您在Windows上遇到的任何解决方案不同。可以这样想-您可以使用一个小的PowerShell创建一个软件部署包，然后可以将其部署到具有Windows的所有地方（如Puppet，SCCM，Altiris，Connectwise Automate等）。

> <font color="red">为任何软件编写一次部署，然后在任何装有Windows的地方使用任何解决方案进行部署。</font>

## 特点

1. 部署到具有Windows / 云就绪的任何位置（Nano除外！）
2. 任何可以管理端点或进行远程部署的东西都可以通过命令，批处理或脚本来直接指导Chocolatey。
3. 它们仅管理/报告“添加/删除程序”（程序和功能）中安装的内容
4. 软件包是独立且可移植的
5. 测试您的部署
6. Chocolatey的回拨电话为零，不需要使用网络访问权限（尽管我们建议为了简化管理，您至少具有内部网络访问权限！）
7. PowerShell自动化
8. 轻松管理依赖项。

> Chocolatey是一个软件管理工具，也是一个程序包管理器。当运行时软件都包含在软件包中并且不使用本机安装程序时，它的运行效果非常好。但是，要接近Windows生态系统，程序包管理器还需要知道如何管理实际的软件安装，因此，Chocolatey也要这样做。对于可公开获得的软件包，版权避免将二进制文件嵌入其中，因此Chocolatey可以从分发点下载并校验和这些二进制文件。

## Chocolatey如何工作？

1. Chocolatey使用NuGet（NuGet.Core.dll）从源中检索包。这通常是一个nupkg，存储在文件夹，共享或OData位置（HTTP / HTTPS）中。有关源的更多信息，请参见“ 源和[源存储库](https://chocolatey.org/docs/how-to-host-feed)”。
2. 该软件包已安装到中$env:ChocolateyInstall\lib\<pkgId>。软件包安装位置不可配置-软件包必须在此处安装，以进行跟踪，升级和卸载。以后可能在此过程中安装的软件是可配置的。请参阅术语，以了解“包装”和“软件”之间的区别，因为这些术语与Chocolatey有关。
3. Choco稍后会确定它是否是自包含的或具有自动化脚本-PowerShell脚本（* .ps1文件）以及可能的其他格式。
Choco拍摄了注册表快照，以供以后比较。
4. 如果有自动化脚本，choco将运行这些脚本。它们可以包含您需要执行的任何操作，如果它们是PowerShell，则具有Posh（PowerShell）的全部功能，但是您应尝试确保它们与Posh v2 +（PowerShell v2及更高版本）兼容。
5. Choco比较快照并确定卸载程序信息，并将其保存到.registry文件中。
6. Choco根据软件包目录中当前存在的所有文件对文件夹进行快照。
7. Choco在package文件夹中查找可执行文件，并在该文件夹中生成垫片，$env:ChocolateyInstall\bin以便这些项目在路径中可用。这些可能已经嵌入到程序包中，或者从某个地方（互联网，ftp，文件夹共享等）放下并放在那里。如果有填充程序忽略文件<exeName>.exe.ignore，则Chocolatey将不会在bin文件夹中生成填充程序。

## Chocolatey软件包安装在哪里？

Chocolatey软件包已安装到`ChocolateyInstall\lib`，但是该软件可以转到各个位置，具体取决于软件包维护者如何创建该软件包。

有些软件包安装在下`ChocolateyInstall\lib`，其他软件包-特别是基于Windows安装程序（.msi文件）的软件包-安装到原始安装程序的默认路径（很可能位于Program Files）中。

还有一些软件包，您可以为其设置自定义安装路径。这些软件包（如ruby）使用`$env:ChocolateyBinRoot`环境变量。如果此变量不存在，则将其创建为`c:\tools`例如`C:\tools\ruby193`。要更改此行为，可以设置`$env:ChocolateyBinRoot`为现有文件夹，例如`C:\somestuff`。然后，将使用环境变量的软件包安装在给定的子文件夹f中。例如 `C:\somestuff\ruby193`。

## 命令

list - 列出远程或本地软件包
search - 搜索远程或本地包（别名列表）
info - 检索软件包信息。choco搜索的简写pkgname --exact --verbose
install - 从各种来源的安装包
pin - 禁止升级包装
outdated - 检索过时的软件包。类似于全部升级--noop
upgrade - 从各种来源升级软件包
uninstall - 卸载软件包
pack - 包了nuspec为编译nupkg
push - 提交编译nupkg
new - 从模板生成巧克力包装所需的文件
sources - 查看和配置默认来源（来源的别名）
source - 查看和配置默认源
config - 检索和配置配置文件设置
feature - 查看和配置choco功能
features - 查看和配置choco功能（功能别名）
setapikey - 检索或保存特定源的apikey（apikey的别名）
apikey - 检索或保存特定来源的apikey
unpackself - have chocolatey set itself up
version - [DEPRECATED] will be removed in v1 - use choco outdated or cup <pkg|all> -whatif instead
update - [DEPRECATED] RESERVED for future use (you are looking for upgrade, these are not the droids you are looking for)
support - 提供支持信息
download - 下载软件包-可选地内部化所有远程资源
synchronize - 与系统安装的软件同步-生成丢失的软件包
sync - 与系统安装的软件同步-生成丢失的软件包
optimize - 优化安装，减少空间使用


#### 参考连接

[chocolatey 使用入门](https://chocolatey.org/docs/commands-reference)