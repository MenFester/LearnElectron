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

* 渲染进程使用Electron内置的ipcRenderer模块向主进程发送消息：
  * icpRenderer.send方法的第一个参数是消息管道的名称，主进程会根据该名称接收消息；
  * 后面的任意多个数据对象是随消息传递的数据
* 主进程通过Electron内置的ipcMain接收消息：
  * icpMain.on方法的第一个参数为消息管道名称，与渲染进程发送消息的管道名称一致
  * 第二个参数为接收消息的方法，其第一个参数包含消息发送者的信息，后面的参数就是多个消息数据
  * 如果主进程中设置多处监听同一管道的代码，当该管道有消息发来时，则多处监听事件都会被触发
* 无论是渲染进程给主进程发送消息，还是主进程给渲染进程发送消息，其背后的原理都是进程间通信。以上消息传递方式是异步传送。
* ipcRenderer.sendSync发送消息会阻塞渲染进程，主进程可以设置event的returnValue属性响应消息给渲染进程。以这种方式返回数据给渲染进程，渲染进程是不需要监听的，当发送消息调用成功时，返回值即为主进程设置的event.returnValue的值
* 阻塞JavaScript的执行是非常危险的，会导致预期需要执行的setTimeout事件或setInterval事件落空
* 主进程中向渲染进程发送消息：
  * 方法一：通过控制渲染进程的webContents来向渲染进程发送消息
  * 方法二：主进程接收消息事件的event.sender就代表着发送消息的渲染进程的webContents，所以可以通过event.sender这个对象来给对应的窗口发送消息
  * 方法三：可以通过event.reply方法
* 渲染进程之间消息传递：
  * 方法一：通过主进程中转
  * 方法二：如果在A窗口的渲染进程中知道B窗口的webContents的id，就可以直接从窗口A发送消息给窗口B
* remote模块的局限性：
  * 性能损耗大：跨进程操作性能上的损耗可能是进程内操作的几百甚至上千倍
  * 制造混乱：渲染进程中通过remote模块使用了主进程的对象触发事件时，事件处理程序是在渲染进程中注册的，实际将是主进程的原始对象先接到事件再异步通知渲染进程执行事件处理程序，这时会错过很多事情
  * 制造假象：在渲染进程中通过remote对象使用了主进程的某个对象，得到的是这个对象的映射，实际上是一个代理对象
  * 存在安全问题：remote模块底层是通过IPC管道与主进程通信的，恶意代码可能通过原型污染攻击来模拟remote模块的远程消息以获取访问主进程模块的权力
  * 