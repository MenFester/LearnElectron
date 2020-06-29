# 学习笔记

## 窗口的常用属性及应用场景

* 控制窗口位置的属性：x、y、center、movable
* 控制窗口大小的属性：width、height、minWidth、minHeight、maxWidth、maxHeight、resizable、minimizable、maximizable
* 控制窗口边框、标题栏与菜单栏的属性：title、icon、frame、autoHideMenueBar、titleBarStyle
* webPreferences包含多个子属性
  * 控制渲染进程访问Node.js环境能力的属性：nodeIntegration、nodeIntegrationInWorker、nodeIntegrationInSubFrames
  * 增强渲染进程能力的属性：preload、webSecurity、contextIsolation
  * 