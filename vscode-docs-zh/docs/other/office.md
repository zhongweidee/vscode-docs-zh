---
Order: 4
Area: other
TOCTitle: Office
ContentId: 8661D491-297F-4778-B10B-588005CCD443
PageTitle: 使用 Visual Studio Code 开发 Office 加载项
DateApproved: 6/22/2022
MetaDescription: 了解如何使用 Visual Studio Code 的功能来开发 Office 加载项。
---
# 使用 Visual Studio Code 开发 Office 加载项

[Office 加载项](https://learn.microsoft.com/office/dev/add-ins/overview/office-add-ins)在 Office 应用程序中运行，并可使用丰富的 [JavaScript API](https://learn.microsoft.com/office/dev/add-ins/develop/understanding-the-javascript-api-for-office) 与 Office 文档内容进行交互。

![An Office add-in is composed of a manifest.xml file and your web app.](images/office/officeaddinoverview.png)

本质上，Office 加载项就是一个可托管在任意位置的 Web 应用。通过 `manifest.xml` 文件，你可以告知 Office 应用程序你的 Web 应用所在位置以及你希望它如何显示。Office 应用程序负责将其托管在 Office 内部。

## 创建新的 Office 加载项项目

在创建 Office 加载项之前，你必须设置好开发环境。有关工具安装的帮助，请参阅[设置开发环境](https://learn.microsoft.com/office/dev/add-ins/overview/set-up-your-dev-environment)。

安装好工具后，你可以通过完成[5 分钟快速入门](https://learn.microsoft.com/office/dev/add-ins/)来创建适用于 Excel、OneNote、Outlook、PowerPoint、Project 或 Word 的基本加载项。这些快速入门使用 [Yeoman Generator for Office Add-ins（也称为“Yo Office”）](https://learn.microsoft.com/office/dev/add-ins/develop/yeoman-generator-overview)来创建可使用 Visual Studio Code（VS Code）管理的 Node.js Office 加载项项目。

## 使用 Visual Studio Code 开发 Office 加载项

Visual Studio Code 是帮助你开发自定义 Office 加载项的绝佳工具，无论这些加载项是在 Web 客户端、Windows、移动平台还是 macOS 上运行！

### 开始使用

要在 VS Code 中打开你的加载项项目，请导航到加载项项目的根目录并在命令行中输入以下命令。

```bash
code .
```

![The manifest.xml file of an Office Add-ins project in Visual Studio Code](images/office/office-add-in-manifest.png)

在项目中，你可以查看和配置[清单文件](https://learn.microsoft.com/office/dev/add-ins/develop/add-in-manifests)、HTML、JavaScript 或 TypeScript 以及 CSS 文件来定义你的加载项。要了解有关在 VS Code 中开发 Office 加载项的更多信息，请参阅[使用 Visual Studio Code 开发 Office 加载项](https://learn.microsoft.com/office/dev/add-ins/develop/develop-add-ins-vscode)。

### 调试加载项

调试加载项的客户端 JavaScript 代码的方式因你的开发环境而异。有关在特定平台上进行调试的帮助，请参阅 [Office 加载项调试概述](https://learn.microsoft.com/office/dev/add-ins/testing/debug-add-ins-overview)。

如果你使用 [Node.js](https://nodejs.org/) 或 [ASP.NET Core](https://asp.net) 为 Office 加载项提供服务器端逻辑支持，请参阅[调试](/docs/debugtest/debugging.md)页面来配置 VS Code 以调试这些运行时中的任何一种。

### 旁加载加载项进行测试

旁加载允许你测试加载项，查看其外观和运行效果。Yo Office 负责构建你的加载项项目并将其旁加载到 Office 中。要旁加载加载项，请导航到项目的根目录，并从命令行运行以下命令。

```bash
npm start
```

你也可以使用以下选项之一手动旁加载加载项：

- 对于 Excel、OneNote、PowerPoint 和 Word，请按照[在 Office 网页版中手动旁加载 Office 加载项](https://learn.microsoft.com/office/dev/add-ins/testing/sideload-office-add-ins-for-testing#sideload-an-office-add-in-in-office-on-the-web-manually)中的说明操作。
- 对于 Outlook，请按照[旁加载 Outlook 加载项进行测试](https://learn.microsoft.com/office/dev/add-ins/outlook/sideload-outlook-add-ins-for-testing?tabs=windows#sideload-manually)中的说明操作。

### 发布加载项

部署和发布加载项可让你将其公开分发或在组织内部分发给用户。当你准备将加载项发布给其他人使用时，可以使用 [Azure 存储扩展](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestorage)直接通过 VS Code 进行发布。有关此过程的指导，请参阅[发布使用 Visual Studio Code 开发的加载项](https://learn.microsoft.com/office/dev/add-ins/publish/publish-add-in-vs-code)。

要了解有关各种 Office 加载项部署方法的更多信息，请参阅[部署和发布 Office 加载项](https://learn.microsoft.com/office/dev/add-ins/publish/publish)。

## 后续步骤

查看 VS Code 网站上的其他页面，了解在创建自定义 Office 加载项时如何利用编辑器的更多功能：

- [语言概述](/docs/languages/overview.md) - 你可以使用多种语言编写 Office 加载项。了解 VS Code 提供了哪些功能。
- [用户界面](/docs/editing/userinterface.md) - 刚刚开始使用 VS Code？本页面值得一看。
- [基础编辑](/docs/editing/codebasics.md) - 了解功能强大的 VS Code 编辑器。

## 常见问题

### 我可以使用生成器创建 Office 加载项，并无论使用何种语言或客户端框架都能使用 VS Code 吗？

是的，可以。你可以使用纯 HTML、Angular、Ember、React、Aurelia……任何你喜欢的框架！

### 我可以使用 TypeScript 创建 Office 加载项吗？

当然可以，VS Code 对 [TypeScript](/docs/languages/typescript.md) 有出色的支持！
