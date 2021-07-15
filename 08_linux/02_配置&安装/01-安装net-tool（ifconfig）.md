# centos7  iconfig command not found
- 首先判断一下是不是缺少了ifconfig，它是在/sbin目录下
+ [root@localhost ~] # cd /sbin
+ [root@localhost sbin] # ls
+ 查看一下是否有ifconfig
- 如果没有ifconfig，请执行下面的命令进行安装net-tools package
+ [root@localhost sbin] # sudo yum install net-tools
