---
Order: 3
Area: other
TOCTitle: Unity
ContentId: 75CD2FA6-2F91-428A-A88D-880611AE75A0
PageTitle: Visual Studio Code 与 Unity
DateApproved: 8/4/2023
MetaDescription: 将 Visual Studio Code 用作 Unity 的编辑器
---
# 使用 VS Code 进行 Unity 开发

Visual Studio Code 让你轻松编写和调试用于 Unity 的 C# 脚本。

[![Unity 概览](images/unity/unity-overview.png)](/assets/docs/other/unity/unity-overview.png)

本指南将帮助你让 Unity 与 Visual Studio Code 协同工作。如果你正在寻找学习 C# 的资源，请参阅我们的 C# 课程。

<a class="install-extension-btn" href="https://aka.ms/selfguidedcsharp">学习 C# 课程</a>

如果你正在寻找学习 Unity 的资源，请查看 Unity 网站的学习专区。

<a class="install-extension-btn" href="https://unity.com/learn">学习 Unity</a>

请继续阅读，了解如何配置 Unity 和你的项目以获得最佳体验。

## 安装

1. 你需要至少安装 [Unity](https://www.unity.com) 2021。

1. 如果你尚未安装，请先[安装 Visual Studio Code](https://code.visualstudio.com)。

1. 接下来，从 Visual Studio Marketplace 安装 [Unity for Visual Studio Code](https://aka.ms/vscode-unity) 扩展。有关安装扩展的更多详细信息，请参阅[扩展市场](/docs/configure/extensions/extension-marketplace.md)。Unity 扩展由 Microsoft 发布。

安装 Unity 扩展时，会同时安装使用 Visual Studio Code 编写 [C#](/docs/languages/csharp.md) 所需的所有依赖项，包括 [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)。

## 设置 Unity

### 更新 Visual Studio 程序包

适用于 Visual Studio Code 的 Unity 扩展依赖于 `Visual Studio Editor` Unity 程序包。在 Unity 中，打开 **Windows**、**Packages**。确保 `Visual Studio Editor` 程序包已升级到 `2.0.20` 或更高版本。

![Unity 包管理器](images/unity/unity-packagemanager.png)

> **注意**：Unity 发布的 `Visual Studio Code Editor` 程序包是来自 Unity 的旧版程序包，现已不再维护。

## 将 VS Code 设置为 Unity 的外部编辑器

打开 **Unity Preferences**，**External Tools**，然后选择 Visual Studio Code 作为 **External Script Editor**。

![Unity 首选项](images/unity/unity-externaltools.png)

## 编辑进化

你现在已准备好开始使用 Visual Studio Code 进行编辑。在 Unity 中双击 C# 脚本将会打开 Visual Studio Code。以下是一些你可以期待的功能：

* 语法高亮
* 括号匹配
* IntelliSense
* 代码片段
* CodeLens
* 速览
* 转到定义
* 代码操作/灯泡
* 转到符号
* 悬停提示

两个对你有帮助的主题是[基础编辑](/docs/editing/codebasics.md)和 [C#](/docs/languages/csharp.md)。在下图中，你可以看到 VS Code 显示悬停上下文、速览引用等功能。

![编辑进化示例](images/unity/peekreferences.png)

## 调试

默认情况下，你的 Unity 项目已配置调试器，可以将 Unity 调试器附加到该项目打开的 Unity 编辑器实例上。按 `kb(workbench.action.debug.start)` 即可启动调试会话。

如果你想调试 Unity 独立播放器，最简单的方法是使用 **Attach Unity Debugger** 命令。

或者，你可以修改项目中的 `.vscode/launch.json` 文件，为你控制的 IP 终结点添加新的调试器配置：

```json
    {
        "name": "附加到 Xbox",
        "type": "vstuc",
        "request": "attach",
        "endPoint": "127.0.0.1:56321"
    }
```

## 后续步骤

继续阅读以了解更多：

* [基础编辑](/docs/editing/codebasics.md) - 了解功能强大的 Visual Studio Code 编辑器。
* [代码导航](/docs/editing/editingevolved.md) - 在源代码中快速移动。
* [C#](/docs/languages/csharp.md) - 了解 Visual Studio Code 中的 C# 支持。
