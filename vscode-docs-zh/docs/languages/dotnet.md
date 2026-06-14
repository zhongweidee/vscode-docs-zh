---
ContentId: AFFD7BDB-925E-4D02-828D-4E14360C70DA
DateApproved: 6/10/2026
MetaDescription: 开始使用 Visual Studio Code 编写和调试 .NET 应用程序。
---
# 在 Visual Studio Code 中使用 .NET

[.NET](https://dotnet.microsoft.com) 提供了一个快速且模块化的平台，用于创建可在 Windows、Linux 和 macOS 上运行的多种不同类型的应用程序。结合使用 Visual Studio Code 与 C# 及 F# 扩展，即可获得强大的编辑体验，包括 [C# IntelliSense](https://learn.microsoft.com/visualstudio/ide/visual-csharp-intellisense)、F# IntelliSense（智能代码补全）以及调试功能。

## 为 .NET 开发设置 VS Code

如果你是现有的 VS Code 用户，可以通过安装 [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) 扩展来添加 .NET 支持。C# Dev Kit 为 VS Code 带来了高效且可靠的 C# 体验，方便你在 VS Code 中进行 C# 或多语言开发。此扩展包由一组 VS Code 扩展组成，它们协同工作，提供丰富的 C# 编辑体验、AI 驱动的开发、解决方案管理和集成测试体验。如下图所示，C# Dev Kit 包含以下组件：

* [C# 扩展](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)，提供基础语言服务支持，并独立于此项目继续开发和维护。
* [C# Dev Kit 扩展](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)，基于与 Visual Studio 相同的基础构建，提供解决方案管理、模板、测试发现/调试功能。
* IntelliCode for C# Dev Kit 扩展（可选），为编辑器提供 AI 驱动的开发体验。

![C# Dev Kit extension](images/csharp/csharp-devkit.png)

如果你的项目需要 F# 支持，还可以下载 [.NET 扩展包](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscode-dotnet-pack)，该包包含以下扩展：

* [C# Dev Kit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
* [Ionide for F#](https://marketplace.visualstudio.com/items?itemName=Ionide.Ionide-fsharp)
* [Jupyter Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)

你也可以单独安装各个扩展。

## 安装 .NET 软件开发工具包

如果你单独下载各个扩展，请确保本地环境中也安装了 .NET SDK。.NET SDK 是用于开发 .NET 应用程序的软件开发环境。

<a class="install-extension-btn" href="https://aka.ms/vscDocs/dotnet/download">安装 .NET SDK</a>

## 创建 C# "Hello World" 应用

1. 初始化一个 C# 项目：

   * 打开终端/命令提示符，导航到你想要创建应用的文件夹中。
   * 在命令 shell 中输入以下命令：

   ```bat
     dotnet new console
   ```

2. 在 VS Code 中首次打开项目文件夹后：

   * 窗口右下角会出现"构建和调试所需的资源缺失。是否添加？"通知。
   * 选择"是"。

3. 在命令 shell 中输入以下命令来运行应用：

   ```bat
   dotnet run
   ```

## 创建 F# "Hello World" 应用

1. 初始化一个 F# 项目：

   * 打开终端/命令提示符，导航到你想要创建应用的文件夹中。
   * 在命令 shell 中输入以下命令：

   ```bat
   dotnet new console -lang "F#"
   ```

2. 命令完成后，在 Visual Studio Code 中打开项目：

   ```bat
   code .
   ```

3. 在命令 shell 中输入以下命令来运行应用：

   ```bat
    dotnet run
   ```

## 后续步骤

* [C# Dev Kit 文档](/docs/csharp/get-started.md)
* 继续探索 C# 开发：[使用 VS Code 和 .NET 进行调试](https://learn.microsoft.com/dotnet/core/tutorials/debugging-with-visual-studio-code)
* [基本编辑](/docs/editing/codebasics.md) - 了解功能强大的 VS Code 编辑器。
* [代码导航](/docs/editing/editingevolved.md) - 在源代码中快速移动。
* [使用 C#](/docs/languages/csharp.md) - 了解在处理 .NET 应用程序时你将获得的出色的 C# 支持。
* [任务](/docs/debugtest/tasks.md) - 使用 Gulp、Grunt 和 Jake 运行任务，显示错误和警告。
* [.NET 文档](https://learn.microsoft.com/dotnet) - 访问 .NET 文档，获取关于这个强大的跨平台开发解决方案的更多信息。
* [将应用程序部署到 Azure](/docs/azure/deployment.md) - 将你的应用部署到 [Azure](https://azure.microsoft.com)。
* [Visual Studio Code 中的 F# 入门](https://learn.microsoft.com/dotnet/fsharp/get-started/get-started-vscode)
