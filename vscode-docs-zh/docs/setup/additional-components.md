---
ContentId: 243B79C2-819F-4257-B80D-2CD9CCB04C84
DateApproved: 6/10/2026
MetaDescription: 设置与 Visual Studio Code 一起使用的附加组件。
---
# 附加组件和工具

Visual Studio Code 在设计上是一个小体积下载，仅包含大多数开发工作流所共享的最少组件。编辑器、文件管理、窗口管理和偏好设置等基本功能均已包含。JavaScript/TypeScript 语言服务以及 Node.js 调试器同样是基础安装的一部分。

如果你习惯于使用功能庞大的单体开发工具（IDE），可能会惊讶于你的场景并未完全开箱即用。例如，VS Code 没有带预装项目模板的**文件** > **新建项目**对话框。大多数 VS Code 用户需要根据自己的特定需求安装附加组件。

## 常用组件

以下是一些常用的安装组件：

* [Git](https://git-scm.com/download) - VS Code 内置了对使用 Git 进行源代码控制的支持，但需要单独安装 Git。
* [Node.js（包含 npm）](https://nodejs.org/) - 一个用于构建和运行 JavaScript 应用程序的跨平台运行时。
* [TypeScript](https://www.typescriptlang.org) - TypeScript 编译器 `tsc`，用于将 TypeScript 转译为 JavaScript。

你会在我们的文档和教程中经常看到上述组件的身影。

## VS Code 扩展

你可以通过[扩展](/docs/configure/extensions/extension-marketplace.md)来扩展 VS Code 编辑器本身。VS Code 社区在 VS Code [Marketplace](https://marketplace.visualstudio.com/VSCode) 上构建了数千个有用的扩展。

以下列表展示了 VS Code Marketplace 中一些热门的扩展。选择一个扩展卡片以查看扩展详情。

<div class="marketplace-extensions-top"></div>

## 其他工具

Visual Studio Code 与现有的工具链集成。我们认为以下工具将提升你的开发体验。

* [Yeoman](https://yeoman.io/) - 一个应用程序脚手架工具，相当于命令行版的**文件** > **新建项目**。
* [generator-hottowel](https://github.com/johnpapa/generator-hottowel) - 一个用于快速创建 AngularJS 应用程序的 Yeoman 生成器。
* [Express](https://expressjs.com/) - 一个使用 Pug 模板引擎的 Node.js 应用程序框架。
* [Gulp](https://gulpjs.com/) - 一个流式任务运行器，可轻松集成 VS Code 任务。
* [Mocha](https://mochajs.org/) - 一个在 Node.js 上运行的 JavaScript 测试框架。
* [Yarn](https://yarnpkg.com/) - 一个依赖管理器，可作为 npm 的替代方案。

>**注意：** 大多数这些工具需要 Node.js 和 npm 包管理器才能安装和使用。

## 后续步骤

* [用户界面](/docs/editing/userinterface.md) - 快速了解 VS Code 的界面概览。
* [用户/工作区设置](/docs/configure/settings.md) - 了解如何通过设置按你的偏好配置 VS Code。
* [语言](/docs/languages/overview.md) - VS Code 开箱即用支持多种编程语言，还可通过社区创建的扩展支持更多语言。
