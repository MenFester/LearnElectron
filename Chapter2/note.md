# 学习笔记

## 安装环境

* npm
  * 查询当前镜像：` npm get registry `
  * 设置为淘宝镜像：` npm config set registry https://registry.npm.taobao.org/ `
  * 设置为官方镜像：` npm config set registry https://registry.npmjs.org/ `
* cnpm
  * ` npm install -g cnpm --registry=https://registry.npm.taobao.org `
* yarn
  * 安装：` cnpm install -g yarn `
  * 查询当前镜像：` yarn config get registry `
  * 设置为淘宝镜像：` yarn config set registry https://registry.npm.taobao.org/ `
  * 设置为官方镜像：` yarn config set registry https://registry.yarnpkg.com `
  * Electron淘宝镜像：` yarn config set ELECTRON_MIRROR https://cdn.npm.taobao.org/dist/electron/ `
* 安装electron
  * ` yarn add electron --dev --platform=win64 `
  * --dev 声明安装的模块仅用于开发
  * --platform=win64 标记只安装64位版本的electron
* 