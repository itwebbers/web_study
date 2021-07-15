# 快速使用远程仓库(github)

### 第一步 创建SSH key: 
> 打开cmd, 在命令行内输入: 
```shell
$ ssh-keygen -t rsa -C "youremail@example.com"  
```
只需要把邮箱更换成自己的, 然后一路回车就okey' .
### 第二步 登录github
> 还没有的, 赶紧自行去注册一个哦 , 这里小编就不话痨了.
1. 登录以后, 点击右上角的 "settings", 如下图: 
![设置仓库](D:/softWare/03_study/web_study/14_tools/01_git/imgs/settingGIthub.jpg)

2. 找到 "SSH and GPG keys" 
![设置仓库](D:/softWare/03_study/web_study/14_tools/01_git/imgs/addGithubKeys.jpg)

3. 输入title和key
> - title可以随意写, 
> - key就是我们第一步生成的.shh文件(打开电脑的administrator文件夹,在下面搜索.ssh)
![设置仓库](D:/softWare/03_study/web_study/14_tools/01_git/imgs/search.SSH.jpg)

> - 将文件名为id_rsa且文件类型pUb的文件打开, 并将其内的内容复制到github上面的key输入框内,点击添加即可.
![设置仓库](D:/softWare/03_study/web_study/14_tools/01_git/imgs/id_RSA.jpg)

### 第三步 添加远程仓库
> 点击页面右上角的 ''New reposiitory'' 
![设置仓库](D:/softWare/03_study/web_study/14_tools/01_git/imgs/新建仓库.jpg)

New reposiitory
输入仓库名称和描述
![设置仓库](D:/softWare/03_study/web_study/14_tools/01_git/imgs/新建仓库详情.jpg)

2.  添加仓库 
将本地仓库关联到远程仓库
```shell
$ git remote add origin git@github.com:zander5211314/eg.git 
```

master 把本地仓库的所有资源推送到远程仓库中, master为主分支

```shell
$ git push -u origin
```

> 注: 一般如果你已经在远程仓库上传了代码,而且是公司多人开发的情况下, 一定要先''git pull''
3.  从远程仓库克隆
克隆远程仓库中的资
```shell
$ git clone git@github.com:zander5211314/eg.git 
```
4.  删除远程仓库的文件或者文件夹
```shell
$ git rm -r --cached target  删除target文件夹
$ git commit -m '删除了target'  提交,添加操作说明
$ git push -u origin master 将本次更改更新到github项目上去
```

5. git pull/push每次都需要输入密码问题
    进入到项目内输入以下命令
```shell
$ git config --global credential.helper store
```
