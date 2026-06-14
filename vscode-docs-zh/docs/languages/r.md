---
ContentId: 1eb31e23-be14-4613-be84-621a51cb59d7
DateApproved: 6/10/2026
MetaDescription: 了解如何在 Visual Studio Code 中使用 R 编程语言。
---
# Visual Studio Code 中的 R 语言

[R 编程语言](https://www.r-project.org/) 是一种为统计计算和图形而构建的动态语言。R 常用于统计分析、科学计算、机器学习和数据可视化。

适用于 Visual Studio Code 的 [R 扩展](https://marketplace.visualstudio.com/items?itemName=REditorSupport.r) 支持扩展语法高亮、代码补全、代码检查、格式化、与 R 终端交互、查看数据、绘图、工作区变量、帮助页面、管理包以及使用 [R Markdown](https://github.com/REditorSupport/vscode-R/wiki/R-Markdown) 文档。

[![概述](images/r/overview.png)](/assets/docs/languages/r/overview.png)

## 入门指南

1. 为你的平台[安装 R](https://cloud.r-project.org/)（>= 3.4.0）。对于 Windows 用户，建议在安装过程中勾选 **将版本号保存到注册表**，以便 R 扩展能够自动找到 R 可执行文件。

2. 在 R 中安装 [`languageserver`](https://github.com/REditorSupport/languageserver)。

    ```r
    install.packages("languageserver")
    ```

3. 安装 [适用于 Visual Studio Code 的 R 扩展](https://marketplace.visualstudio.com/items?itemName=REditorSupport.r)。

4. 创建一个 R 文件并开始编码。

为了提升在 VS Code 中使用 R 的体验，建议安装以下软件和包：

* [radian](https://github.com/randy3k/radian)：一个现代化的 R 控制台，修正了官方 R 终端的许多限制，并支持语法高亮和自动补全等多种功能。

* [httpgd](https://github.com/nx10/httpgd)：一个 R 包，提供一个通过 HTTP 和 WebSocket 异步提供 SVG 图形的图形设备。VS Code 的 R 扩展的交互式图形查看器需要此包。

如果你在安装 R 包或 VS Code 的 R 扩展时遇到任何问题，请访问安装 Wiki 页面（[Windows](https://github.com/REditorSupport/vscode-R/wiki/Installation:-Windows) | [macOS](https://github.com/REditorSupport/vscode-R/wiki/Installation:-macOS) | [Linux](https://github.com/REditorSupport/vscode-R/wiki/Installation:-Linux)）获取更多详细信息。

## 运行 R 代码

运行 R 代码实际上就是将代码发送到 R 终端。在运行 R 代码之前，你可以通过命令面板中的 **R: 创建 R 终端** 命令来创建一个 R 终端。

一旦 R 终端准备就绪，你可以选择代码或将光标放在要运行代码的开头或结尾，按下 `(Ctrl+Enter)`，代码将被发送到活动的 R 终端。

如果你想运行整个 R 文件，请在编辑器中打开该文件，然后按下 `Ctrl+Shift+S`，该文件将在活动的 R 终端中被 source 执行。

对于更高级的用法，例如运行多个 R 终端或自行管理的 R 终端，你可以阅读 [与 R 终端交互](https://github.com/REditorSupport/vscode-R/wiki/Interacting-with-R-terminals)。

## 代码补全（IntelliSense）

借助 R 语言服务器，R 扩展支持代码补全和许多其他代码编辑功能。补全功能会显示当前作用域和当前 R 工作区中的可用函数和变量，以及来自包的文档或作为注释提供的文档。

![代码补全](images/r/completion.gif)

## 代码检查

代码检查是一项检查代码中警告和潜在错误的功能。R 代码检查由 [lintr](https://github.com/r-lib/lintr) 包提供。你可以通过[配置文件](https://lintr.r-lib.org/articles/lintr.html#configuring-linters)从[可用检查器列表](https://lintr.r-lib.org/reference/index.html#individual-linters)中进行选择来自定义它。

![代码检查](images/r/linting.gif)

除了代码补全和代码检查之外，R 扩展还支持其他功能，例如代码格式化、跳转到定义、重命名符号、查找引用。阅读 [R 语言服务](https://github.com/REditorSupport/vscode-R/wiki/R-Language-Service) 获取更多详细信息。

## 工作区查看器

工作区查看器位于 VS Code 的侧边栏中，包含当前 R 会话中正在使用的包和全局变量。选择活动栏中的 R 图标，工作区查看器和帮助页面查看器将会显示出来。这是查看 R 工作区、预览现有 R 对象、查找帮助主题以及交互式阅读帮助页面的便捷方式。

![工作区查看器](images/r/workspace-viewer.gif)

除了工作区查看器之外，还有数据查看器、图形查看器和小组件查看器。阅读 [交互式查看器](https://github.com/REditorSupport/vscode-R/wiki/Interactive-viewers) 获取更多详细信息。

## 调试

R 调试功能由 [R Debugger](https://marketplace.visualstudio.com/items?itemName=RDebugger.r-debugger) 扩展提供。它支持通过启动新的 R 进程或附加到正在运行的进程来调试 R 代码或 R 项目。

当命中断点时，你可以查看或修改当前所选堆栈帧中的变量，或在堆栈帧中的调试控制台中计算表达式。

阅读项目 [README](https://github.com/ManuelHentschel/VSCode-R-Debugger) 获取更多详细信息。

## 后续步骤

本概述是对 VS Code 的 R 扩展的一个快速介绍。阅读扩展 [README](https://github.com/REditorSupport/vscode-R#features) 获取详细的功能列表。

如果你有任何问题、建议或功能请求，请随时在 [GitHub 仓库](https://github.com/REditorSupport/vscode-R/issues) 中提交 issue。

如果你想了解更多关于 VS Code 的信息，请尝试以下主题：

* [基础编辑](/docs/editing/codebasics.md) - 快速介绍 VS Code 编辑器的基础知识。
* [安装扩展](/docs/configure/extensions/extension-marketplace.md) - 了解 [Marketplace](https://marketplace.visualstudio.com/vscode) 中可用的其他扩展。
* [代码导航](/docs/editing/editingevolved.md) - 快速浏览你的源代码。
