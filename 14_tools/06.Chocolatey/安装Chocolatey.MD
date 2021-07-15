# 安装Chocolatey

1. 安装环境支持 

> - Windows 7+ / Windows Server 2003+
> - PowerShell v2 +
> - .NET Framework 4+（如果未安装.NET 4.0，安装将尝试安装。）

2. 安装流程

+ 首先，请确保您使用的是admin-powershell -您也可以以非管理员身份安装，请参阅no-admin-powershell。

    - 使用高级用户（Windows + X）菜单 
        > 在“高级用户”菜单上，选择“命令提示符（管理员）”。
    - 使用开始菜单 
        > 点击“开始”，输入“ command”，您将看到“ Command Prompt”被列为主要结果。右键单击该结果，然后选择“以管理员身份运行”。
    - 使用运行框
        > 按Windows + R打开“运行”框。在框中输入“ cmd”，然后按Ctrl + Shift + Enter以管理员身份运行命令。
+ 使用powershell.exe安装
    > 注意：在运行任何脚本之前，请检查https://chocolatey.org/install.ps1以确保安全。

    - 打开powershell
        > 运行Get-ExecutionPolicy。如果返回Restricted，则运行Set-ExecutionPolicy AllSigned或Set-ExecutionPolicy Bypass -Scope Process。
        > 接下来运行以下命令 `Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))`
+ 如果没有看到任何错误，则可以使用Chocolatey！键入choco或choco -?现在，或参见[使用入门](https://chocolatey.org/docs/getting-started)以获取使用说明。