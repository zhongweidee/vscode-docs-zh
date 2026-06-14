---
ContentId: 215832f9-d5bd-4cea-8cea-bfc4dc7ff7d1
DateApproved: 6/10/2026
MetaDescription:  通过调试方案了解如何在 Visual Studio Code 中设置调试
MetaSocialImage: ../editor/images/debugging/debugging-social.png
---
# JavaScript 调试方案

Visual Studio Code 通过内置的或由扩展提供的调试器，支持多种语言和平台的调试。

为了让你更轻松地开始调试，我们整理了一系列调试“方案”，其中包含为你喜爱的平台设置调试所需的步骤和配置。这些方案位于 GitHub 上的 [https://github.com/microsoft/vscode-recipes](https://github.com/microsoft/vscode-recipes)。

## 在 Node.js 中调试服务端 JavaScript

Visual Studio Code 编辑器通过内置的 [Node.js](https://nodejs.org/) 调试器支持调试 Node.js 应用程序。

![Node.js logo](images/recipes/nodejs.png)

**方案：**

* [使用 Nodemon 调试 Node.js](https://github.com/microsoft/vscode-recipes/tree/main/nodemon)
* [调试 Node.js AWS Lambda 函数](https://github.com/microsoft/vscode-recipes/tree/main/debugging-lambda-functions)

## 在浏览器中调试客户端 JavaScript

Visual Studio Code 编辑器支持调试运行在 [Microsoft Edge](https://www.microsoft.com/edge) 和 [Google Chrome](https://www.google.com/chrome/) 中的 JavaScript。

![JavaScript, Edge, and Chrome logo](images/recipes/browsers.png)

你可以在[浏览器调试文档](/docs/nodejs/browser-debugging.md)中了解更多关于浏览器调试的工作原理。

**方案：**

* [使用 Angular CLI 调试 Angular 应用](https://github.com/microsoft/vscode-recipes/tree/main/Angular-CLI)
* [调试 Next.js 应用](https://github.com/microsoft/vscode-recipes/tree/main/Next-js)
* [调试 Meteor 应用](https://github.com/microsoft/vscode-recipes/tree/main/meteor)
* [调试 Vue.js 应用](https://github.com/microsoft/vscode-recipes/tree/main/vuejs-cli)
* [调试 Mocha 测试](https://github.com/microsoft/vscode-recipes/tree/main/debugging-mocha-tests)
* [调试 Jest 测试](https://github.com/microsoft/vscode-recipes/tree/main/debugging-jest-tests)

**博客文章**：

* [直接从 VS Code 实时编辑和调试你的 React 应用](https://medium.com/@auchenberg/live-edit-and-debug-your-react-apps-directly-from-vs-code-without-leaving-the-editor-3da489ed905f)
* [使用 VS Code 为 Angular 提供超强实时编辑和 JavaScript 调试](https://medium.com/@auchenberg/super-charged-live-editing-and-javascript-debugging-for-angular-using-visual-studio-code-c29da251ec71)

## Electron - 调试 Electron 应用程序

Visual Studio Code 编辑器通过内置的 JavaScript 调试器支持调试 [Electron](https://www.electronjs.org) 应用程序。

![electron logo](images/recipes/electron.png)

**方案：**

* [调试 Electron 主进程和渲染进程](https://github.com/microsoft/vscode-recipes/tree/main/Electron)

## 后续步骤

* [调试](/docs/debugtest/debugging.md) - 了解 VS Code 的常规调试功能。
* [Node.js 调试](/docs/nodejs/nodejs-debugging.md) - 了解内置的 Node.js 调试器。
* [视频：VS Code 调试入门](https://www.youtube.com/watch?v=3HiLLByBWkg) - 了解 VS Code 中的调试。
