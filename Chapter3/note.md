# 学习笔记

## 主进程和渲染进程

* 主进程
  * ` electron ./index.js ` 让Electron的可执行程序执行index.js中的代码，代码逻辑运行在Electron的主进程中
  * 主进程负责完成监听应用程序的生命周期事件、启动第一个窗口、加载index.html、应用程序关闭后回收资源、退出程序等
  * 主进程负责管理所有的窗口及其对应的渲染进程
  * 主进程模块：
    * app
    * autoUpdater
    * BrowserView
    * BrowserWindow
    * contentTracing
    * dialog
    * globalShortcut
    * ipcMainMenu
    * MenuItem
    * net
    * netLog
    * Notification
    * powerMonitor
    * powerSaveBlocker
    * protocol
    * screen
    * session
    * systemPreference
    * TouchBar
    * Tray
    * webContents
* 渲染进程
  * index.html中编写的代码运行在Electron的渲染进程中
  * 渲染进程负责完成渲染界面、接收用户输入、响应用户的交互等工作
  * 一个BrowserWindow实例就代表一个渲染进程
  * 每个渲染进程都是独立的，它只关心所运行的Web页面，在nodeIntegration配置后，渲染进程也有能力访问Node.js的API
  * 渲染进程模块：
    * desktopCapturer
    * ipcRenderer
    * remote
    * webFrame
* 一个Electron应用只有一个主进程，但可以有多个渲染进程
* 公用模块：
  * clipboard
  * crashReporter
  * nativeImage
  * shell
* JavaScript是事件驱动型的编程语言，是单线程执行的。
* Node.js内部有一个不间断的循环结构来检测当前正在发生什么事情，以及与执行事件相关联的处理程序，且在任一给定的时刻，最多运行一个事件处理程序
* JavaScript是单线程的，但Node.js不是单线程的

## 进程调试

* 打开渲染进程的调试窗口
  * Windows系统：Ctrl+Shift+I
  * Mac系统：Alt+Command+I
* 渲染进程调试窗口实际上就是Chrome浏览器的开发者工具
* remote
  * remote对象的属性和方法都是主进程的属性和方法的映射。在通过remote访问它们时，Electron内部会帮你构造一个消息，这个消息从渲染进程传递给主进程，主进程完成相应操作并得到结果后，再把操作结果以远程对象的形式返回给渲染进程。在渲染进程持有的远程对象被回收后，主进程中相应的对象也将被回收
  * remote模块有风险，后续Electron可能会抛弃这个模块
  * 通过remote可以访问Electron提供的内部对象和类型，也可以访问用户自己定义的对象或类型
  * 虽然渲染进程中可以通过require加载模块，但是如果加载的模块中是主进程才能访问的类型、对象，则后续代码操作将失败。

## 进程间消息传递