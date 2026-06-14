---
ContentId: 40C8AAC1-C00D-4E91-8877-737A598346B6
DateApproved: 6/10/2026
MetaDescription: 了解如何充分利用 Visual Studio Code 和 C#。
MetaSocialImage: images/csharp/languages-csharp-social.png
---
# 使用 C&#35;

Visual Studio Code 中的 C# 支持针对跨平台 .NET 开发进行了优化（请参阅[使用 .NET 和 VS Code](/docs/languages/dotnet.md) 获取另一篇相关文章）。我们对 VS Code 的关注点是成为一个出色的跨平台 C# 开发编辑器，提供丰富的 C# 编辑体验、AI 驱动的开发、解决方案管理以及集成的测试体验。

![VS Code 中的 C# 语言](images/csharp/csharp-hero.png)

VS Code 支持调试在 .NET 或 Mono 上运行的 C# 应用程序。

有关以下内容的详细说明：

* .NET 调试 - 请参阅 [C# Dev Kit 调试文档](/docs/csharp/debugging.md)。
* Mono 调试 - 请参阅 [Mono Debug 扩展的 README](https://marketplace.visualstudio.com/items?itemName=ms-vscode.mono-debug)。

## 安装 C&#35; 支持

C# 语言支持通过 [C# Dev Kit 扩展](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)提供。您可以在 VS Code 中通过在**扩展**视图（`kb(workbench.view.extensions)`）中搜索"C# Dev Kit"来安装它，或者如果您已经有一个包含 C# 文件的项目，当您打开 C# 文件时，VS Code 会提示您安装该扩展。

有关 C# Dev Kit 扩展的更多信息，请参阅 [C# 文档](/docs/csharp/get-started.md)。

## C&#35; Dev Kit

Visual Studio Code 利用 [Roslyn](https://github.com/dotnet/roslyn) 和 [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) 的强大功能来提供增强的 C# 体验。我们提供以下支持：

* .NET 项目
* MSBuild 项目
* C# 脚本（CSX）

支持的 .NET 项目类型包括：

* ASP.NET Core 应用
* ASP.NET Core Web API
* ASP.NET Core MVC Web 应用
* Blazor Web 应用
* Blazor Server 应用
* Blazor WebAssembly 应用
* 控制台应用

以及更多。

要在 VS Code 中查看支持的完整项目类型列表，请打开**命令面板**并搜索 **.NET：新建项目...**。这将显示支持的完整项目类型列表。

![支持的项目](images/csharp/newproject.png)

当您打开一个包含 .NET 解决方案文件或项目文件的工作区时，解决方案资源管理器将自动出现。如果您的工作区中只有一个解决方案文件（.sln 文件），解决方案资源管理器将检测到该文件并在工作区加载后自动加载它。有关在 VS Code 中管理 C# 项目的更多信息，请参阅[项目管理](/docs/csharp/project-management.md)文档。

## 编辑器功能升级

C# 和编辑器中有很多可以探索的功能，例如输入时格式化、IntelliSense、重命名重构等。

![右键单击菜单](images/csharp/editingevolved.png)

有关 C# Dev Kit 编辑功能的更多信息，请参阅[导航和编辑文档](/docs/csharp/navigate-edit.md)。有关 VS Code 编辑功能的完整描述，请参阅[基础编辑](/docs/editing/codebasics.md)和[代码导航](/docs/editing/editingevolved.md)文档。

以下是一些亮点功能……

## IntelliSense

IntelliSense 开箱即用：随时按 `kb(editor.action.triggerSuggest)` 即可获取上下文相关的建议。

![IntelliSense](images/csharp/intellisense.png)

## 使用 AI 增强代码补全

[GitHub Copilot](https://copilot.github.com/) 是一款 AI 驱动的代码补全工具，可帮助您更快、更智能地编写代码。您可以在 VS Code 中使用 [GitHub Copilot 扩展](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)来生成代码，或从其生成的代码中学习。

[![VS Code Marketplace 中的 GitHub Copilot 扩展](images/csharp/copilot-extension.png)](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

GitHub Copilot 为多种语言和各种框架提供建议，尤其适用于 Python、JavaScript、TypeScript、Ruby、Go、C# 和 C++。

您可以在 [Copilot 文档](/docs/editor/github-copilot.md)中了解更多关于如何开始使用 Copilot 的信息。

## C&#35; 代码片段

有关 C# Dev Kit 中代码片段的信息，请参阅[导航和编辑文档](/docs/csharp/navigate-edit.md)。VS Code 中还内置了多个代码片段，会在您输入时出现，或者您可以按 `kb(editor.action.triggerSuggest)`（触发建议），我们将为您提供上下文相关的建议列表。

![代码片段](images/csharp/snippet.png)

>**提示：** 您可以为 C# 添加自己的用户自定义代码片段。请参阅[用户自定义代码片段](/docs/editing/userdefinedsnippets.md)了解如何操作。

## 搜索符号

编辑器之外也有一些功能。其中之一是随时随地搜索符号的能力。按 `kb(workbench.action.showAllSymbols)`，开始输入，然后查看匹配的 C# 符号列表。选择一个，您将直接跳转到其代码位置。

![符号](images/csharp/symbols.png)

## CodeLens

另一个很酷的功能是能够在方法正上方查看该方法的引用次数。单击引用信息可在速览视图中查看引用。此引用信息会随着您的输入而实时更新。

>**注意：** 出于性能考虑，在 `object` 中定义的方法（如 `equals` 和 `hashCode`）不会获取引用信息。

![CodeLens](images/csharp/codelens.png)

>**提示：** 您可以通过 `setting(editor.codeLens)` [设置](/docs/configure/settings.md)来关闭 CodeLens 中显示的引用信息。

## 查找引用/速览定义

您可以单击某个对象的引用来查找其使用位置，而不会丢失上下文。同样的体验也可以反过来使用：您可以速览某个对象的定义并内联查看它，而无需离开当前位置。有关 C# Dev Kit 中速览定义的信息，请参阅[导航和编辑文档](/docs/csharp/navigate-edit.md)。

![速览](images/csharp/peek.png)

## 快速修复/建议

VS Code 支持一些基本的快速修复功能。您会看到一个灯泡图标，单击它或按 `kb(editor.action.quickFix)` 将为您提供一个简单的修复/建议列表。

![快速修复](images/csharp/lightbulb.png)

## 测试

该扩展支持以下测试框架：

* [XUnit](https://learn.microsoft.com/dotnet/core/testing/unit-testing-with-dotnet-test)
* [NUnit](https://learn.microsoft.com/dotnet/core/testing/unit-testing-with-nunit)
* [MSTest](https://learn.microsoft.com/dotnet/core/testing/unit-testing-with-mstest)

C# Dev Kit 扩展提供以下功能：

* 运行/调试测试用例
* 查看测试报告
* 在测试资源管理器中查看测试

有关更多信息，请参阅我们的 [C# Dev Kit 测试文档](/docs/csharp/testing.md)。

## 下一步

继续阅读以了解：

* [C# Dev Kit 文档](/docs/csharp/get-started.md)
* [.NET 开发](/docs/languages/dotnet.md) - 开始跨平台 .NET 开发
* [基础编辑](/docs/editing/codebasics.md) - 了解强大的 VS Code 编辑器。
* [任务](/docs/debugtest/tasks.md) - 使用任务构建您的项目等。
* [调试](/docs/debugtest/debugging.md) - 了解如何在项目中使��调试器。
* [Unity 开发](/docs/other/unity.md) - 了解如何在 Unity 项目中使用 VS Code。
