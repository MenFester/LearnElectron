# 学习笔记

## 引入Vue

* 安装Vue CLI：` $ yarn global add @vue/cli `
* 修改Windows的环境变量，使得vue命令生效
* ` $ vue create chapter4_3 `
* 进入 chapter4_3 目录
* ` $ vue add electron-builder `
* ` $ yarn electron:serve `，这一步可能需要翻墙
* 构建的项目的目录结构：
  * dist_electron：目录存放应用打包后的安装程序
  * public：目录存放项目的静态资源，此目录下的程序不会被webpack处理
  * src/background.js：是主进程入口程序
  * src/main.js是渲染进程入口程序