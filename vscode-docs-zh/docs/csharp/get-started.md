---
ContentId: cdf9809e-0569-4aaf-937e-e247507d9609
DateApproved: 5/3/2024
MetaDescription: 在 Visual Studio Code 中开始使用 C# 和 .NET 开发
PageTitle: C# 入门指南
---
# 在 VS Code 中开始使用 C#

本入门指南通过以下任务向你介绍如何在 Visual Studio Code 中使用 C# 和 .NET：

1. 为 C# 安装和设置你的 VS Code 环境。
1. 使用 C# 编写并运行一个简单的"Hello World"应用程序。
1. 介绍 VS Code 中 C# 的其他学习资源。

请注意，本指南不会教你 C#。它教你的是如何为 VS Code 中的 C# 开发做好准备。如果你正在寻找学习 C# 的资源，可以查看 freeCodeCamp 提供的免费 C# 认证。

<a class="install-extension-btn" href="https://aka.ms/csharp-certification">获取 C# 认证</a>

## 必要的工具

- [Visual Studio Code](https://code.visualstudio.com)
- [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) 扩展
- 进行 .NET 开发需要 [.NET SDK](https://dotnet.microsoft.com/download)

## 安装

### 安装 VS Code 和扩展

1. 如果你还没有安装，请先[安装 VS Code](https://code.visualstudio.com)。
1. 接下来，从 Visual Studio Marketplace 安装 [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)。有关安装扩展的更多详细信息，请阅读[扩展市场](/docs/configure/extensions/extension-marketplace.md)。该 C# 扩展名为 **C# Dev Kit**，由 Microsoft 发布。

>**注意**：C# Dev Kit 支持云原生开发。要进行跨平台移动和桌面开发，你可以将 C# Dev Kit 与 [.NET MAUI 扩展](https://aka.ms/mauidevkit-marketplace)一起使用。了解[如何设置](https://aka.ms/mauidevkit-docs) VS Code 中的 .NET MAUI。

安装完成后，C# Dev Kit 会启动一个扩展导览。你可以按照导览中的步骤了解更多关于 C# 扩展的功能。你也可以使用此导览安装最新的 .NET SDK。随时可以通过打开命令面板（`kb(workbench.action.showCommands)`）并选择 **欢迎：打开导览** 来重新打开导览。在这里，选择 **开始使用 C# Dev Kit**。

![C# Dev Kit introductory walkthrough](images/get-started/open-walkthrough.gif)

>**注意**：你需要登录 Visual Studio 订阅才能使用 C# Dev Kit。请查看[登录 C# Dev Kit](/docs/csharp/signing-in.md) 文档以了解更多信息。

在导览中，选择 **设置你的环境**，然后选择 **安装 .NET SDK**。这将在导览旁边打开一个窗口，其中包含一个用于安装最新版本 .NET SDK 的按钮。选择 **安装** 按钮，这将触发 .NET SDK 的下载和安装。按照屏幕上的指示完成此过程。

![Install .NET SDK](images/get-started/InstallSDK.png)

## 创建 Hello World 应用

要开始使用，请转到 **资源管理器** 视图并选择 **创建 .NET 项目**。或者，你可以使用 `kb(workbench.action.showCommands)` 打开命令面板，然后输入 ".NET" 并找到并选择 **.NET: 新建项目** 命令。

1. 选择命令后，你需要选择项目模板。选择 **控制台应用**。
1. 要运行你的应用，请在上方菜单中选择 **运行 > 以非调试模式运行**，或使用 `kb(workbench.action.debug.run)` 键盘快捷键。要了解更多关于调试你的 C# 项目的信息，请阅读[调试文档](/docs/csharp/debugging.md)。

![使用命令面板创建新的 .NET 项目](images/get-started/open-new-project.gif)

## 了解更多

通过在命令面板中查找 **.NET** 来探索 C# 扩展提供的所有功能。有关这些功能的更多信息，请参考其他文档页面。

有关 C# 和 .NET 的学习资料，请查看以下资源：

1. [学习使用 C# 编程](https://aka.ms/selfguidedcsharp)
1. [学习在 VS Code 中使用 .NET 构建](https://learn.microsoft.com/training/paths/build-dotnet-applications-csharp/)
1. [学习构建 Web 应用程序](https://learn.microsoft.com/training/paths/build-web-apps-with-blazor/)

## 加入社区

查找社区资源并联系用户组。

[.NET 开发者社区](https://dotnet.microsoft.com/platform/community) - 与志同道合的开发者交流
