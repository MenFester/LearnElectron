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
  * 在项目文件夹下：` yarn init `
  * ` yarn add electron --dev --platform=win64 `
  * --dev 声明安装的模块仅用于开发
  * --platform=win64 标记只安装64位版本的electron
* git仓库
  * 在github上建立远程仓库
  * 本地：` git init `
  * 本地：` git remote add origin https://......（新建的repository地址） `
* Node.js模块的版本号：
  * 一般包含三个数字：第一个数字代表主版本，第二个数字代表次版本，第三个数字代表修订版本
  * 版本号前面有“^”，代表不允许主版本号提升
  * 版本号前面有“~”，代表只允许修订版本号提升
* pakage.json
  * dependencies：记录生产环境需要用到的第三方库
  * devDependencies：记录开发环境下依赖的第三方库，项目打包编译时一般不会打包到最终发布包内
* Node.js的三类模块
  * 核心模块：存在于Node.js环境内
  * 项目模块：存在于当前项目中，一般是项目开发者手动提供的，require此类模块，以' ./path/fileName ' 这种相对路径寻址
  * 第三方模块：开发者通过yarn或npm工具手动安装到项目内，require此类模块，一般传入模块名即可，Node.js环境会在node_modules目录下寻找模块
* ` yarn start `：启动脚本运行前会先新建一个命令环境，然后把当前目录下的node_modules/.bin加入到系统环境变量中，所以.bin目录下所有脚本都可以直接用脚本名调用。接着执行scripts配置节指定的脚本内容，执行完后再把node_modules/.bin从系统环境变量中删除
* Node.js使用的是CommonJs规范，它通过modules.exports导出模块，通过require导入模块
* 入口index.js文件
  * app：代表整个应用，通过它获取应用程序生命周期的各个事件
  * 窗口对象交个一个全局引用，为了不让垃圾回收时回收这个窗口对象
  * webPreferences：传入到窗口的配置对象。传入{ nodeIntegration: true }，使得index.html中的JavaScript有访问Node.js环境的能力
  *  
* Electron API演示工具：` https://github.com/electron/electron-api-demos/releases `
* 试验工具 Electron Fiddle：` https://github.com/electron/fiddle/releases `
