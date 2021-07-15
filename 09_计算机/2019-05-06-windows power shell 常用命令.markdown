---
layout: post
title: 'windows power shell 常用命令'
date: 2019-05-06
categories:
  - windows 
  - power shell
tags:
  - power shell
  - windows
---

# Windows power shell 常用命令

> 德心孤必有邻，心怀志定创业！

1. 创建文件

```shell
new-item filesname.cs
```

2. 创建文件夹

```shell
new-item directoryname -type directory
```

3. 删除文件

```shell
// 删除目录下指定的文件
remove-item c:/directoryname filesname.cs

// 删除目录下所有的文件
remove-item c:/directoryname/*

// 删除---排除某类型文件
remove-item c:/directoryname/* -exclude *.cs

// 仅仅删除某种类型文件
remove-item c:/directoryname/* -include *.cs
```

4. 打开文件

```shell
// .\文件名.扩展名

.\filesname.cs
```