---
ContentId: 8688bb6d-793e-4a37-aed2-5af4cfe89940
DateApproved: 6/10/2026
MetaDescription: 了解如何在 Visual Studio Code 中使用 PowerShell
---
# Visual Studio Code 中的 PowerShell

[PowerShell][24] 是一种基于任务的命令行 shell 和脚本语言，构建于 [.NET][23] 之上，
为各个平台上的管理员提供了强大的工具体系。

适用于 Visual Studio Code (VS Code) 的 Microsoft [PowerShell][31] 扩展提供了丰富的语言
支持和功能，例如 PowerShell 的语法补全、定义跟踪和代码检查
。该扩展应在所有受支持的 VS Code 环境中正常工作，使用
[PowerShell 7+ 当前支持的版本][17]。

对 Windows PowerShell 5.1 的支持是基于尽力而为的原则提供的。需要 [.NET Framework 4.8][18] 或
更高版本。

支持 [VS Code 远程开发][13] 环境，包括 [GitHub Codespaces][19] 和
[VS Code Server][14]。

> [!IMPORTANT]
> [Visual Studio Code for the Web][12] 仅支持有限的功能，例如基本的
> 语法高亮，因为 PowerShell 引擎无法在此环境中运行。

我们积极测试以下配置：

- **Windows Server 2022** 上的 Windows PowerShell 5.1 和 PowerShell 7+
- **macOS 14.7** 上的 PowerShell 7+
- **Ubuntu 24.04** 上的 PowerShell 7+

在 Windows 上，我们还测试启用和未启用约束语言模式的情况。

## 安装 PowerShell 扩展

可以通过点击[安装按钮][44]从 Visual Studio Code 市场安装 PowerShell 扩展。
你也可以在 VS Code 中安装 PowerShell 扩展，方法是使用键盘快捷键 `kb(workbench.view.extensions)` 打开
**扩展**视图，输入 _PowerShell_，
然后选择 PowerShell 扩展：

![PowerShell 扩展][40]

## 主要功能

- [语法高亮][20]
- 高级内置[代码片段][08]
- 适用于 cmdlet 等的 [IntelliSense][05]
- [PowerShell Script Analyzer][11] 报告的[问题][09]
- cmdlet、变量、类等的[转到定义][02]
- cmdlet、变量、类等的[查找引用][04]
- 文档和工作区[符号导航][03]
- 基于符号的[大纲视图][10]
- 使用 `kbstyle(F8)` 在当前终端中运行选定的 PowerShell 代码
- 使用 `kbstyle(Ctrl + F1)` 启动光标下符号的在线帮助
- PowerShell [调试器][29] 集成
- 一个可与调试器交互的扩展终端（试试 `Set-PSBreakpoint`！）
- 在[主题选择器][07]中提供 PowerShell ISE 主题
- 也可尝试 ISE 模式，使用 `kb(workbench.action.showCommands)` 然后搜索"启用 ISE 模式"

### 调试

PowerShell 扩展使用 VS Code 内置的[调试接口][01]，允许
对 PowerShell 脚本和模块进行调试。有关调试 PowerShell 的更多信息，请参阅
[使用 VS Code][29]。

### 多版本支持

你可以按照[这些说明][28]配置 PowerShell 扩展以使用计算机上安装的任何受支持的
PowerShell 版本。

或者从命令面板 (`kb(workbench.action.showCommands)`) 运行 **PowerShell: 显示会话菜单** 命令。

### CodeLens 支持

CodeLens 是 VS Code 的一项功能，用于提供可操作的、上下文相关的信息，这些信息直接
显示在源代码中。

CodeLens 功能包括：

- Pester **运行测试**和**调试测试**。

  ![Pester CodeLens 集成][39]

- Pester 符号支持

  ![CodeLens Pester 符号支持][38]

- 函数、变量、类和其他符号引用

  CodeLens 引用支持显示代码中某个符号被引用的次数，
  并允许你跳转到特定的引用位置。

  ![CodeLens 函数引用支持][37]

### PSScriptAnalyzer 集成

[PSScriptAnalyzer][30] 是一个 PowerShell 模块，为模块和脚本提供静态源代码检查器。
**PSScriptAnalyzer** 拥有验证 PowerShell 代码质量的规则。这些规则
基于 PowerShell 团队和社区识别的 PowerShell 最佳实践。
**PSScriptAnalyzer** 生成诊断记录（错误和警告），以告知用户
潜在的代码缺陷，并建议可能的改进方案。

PowerShell 扩展默认包含 **PSScriptAnalyzer**，并自动对你在 VS Code 中编辑的
PowerShell 脚本文件执行分析。

**PSScriptAnalyzer** 包含一组内置规则，用于检查 PowerShell 源代码的各个方面，
例如是否存在未初始化的变量、**PSCredential** 类型的使用、
`Invoke-Expression` 的使用等。该模块还允许你包含或排除特定的
规则。

要禁用 **PSScriptAnalyzer**，请打开你的设置 (`kb(workbench.action.openSettings)`)，浏览
**扩展**，选择 **PowerShell** 扩展，然后取消选中 **脚本
分析: 启用** (`powershell.scriptAnalysis.enable`) 复选框。

![PSScriptAnalyzer 设置][42]

**PSScriptAnalyzer** 还提供代码格式化功能。你可以使用 **格式化文档** 命令
或 (`kb(editor.action.formatDocument)`) 键盘快捷键来调用自动文档格式化。

### Pester 集成

[Pester][33] 是一个用于运行单元测试的框架，Windows PowerShell 5.1 预装了
**Pester** 3.40。要更新 **Pester** 或在其他平台上安装最新版本，
请按照 [Pester 安装说明][34]操作。

## PowerShell 扩展设置

你可以从 **文件** > **首选项** > **设置** 菜单项自定义 VS Code [设置][06]。

你也可以选择位于活动栏左下角的齿轮图标。

![codeGear][36]

你还可以使用键盘快捷键 `kb(workbench.action.openSettings)` 打开设置。
你仍然可以使用命令面板 (`kb(workbench.action.showCommands)`) 中的 **首选项: 打开用户设置 (JSON)** 命令
打开 `settings.json` 文件，或者通过更改 `"workbench.settings.editor"` 设置
来更改默认的设置编辑器。

有关配置 VS Code 设置的更多信息，请参阅[用户和工作区设置][06]。

### Types.ps1xml 和 Format.ps1xml 文件

PowerShell `.ps1xml` 文件用于扩展类型系统和定义输出格式。有关
这些文件的更多信息，请参阅官方 PowerShell 文档中关于 [Types.ps1xml][26] 和
[Format.ps1xml][25] 的内容。你可以通过安装
[Red Hat 的 XML 扩展][32]在编写 `.ps1xml` 文件时获得 IntelliSense 功能。安装后，将此配置添加到你的用户设置中：

```json
"xml.fileAssociations": [
  {
    "systemId": "https://raw.githubusercontent.com/PowerShell/PowerShell/master/src/Schemas/Format.xsd",
    "pattern": "**/*.Format.ps1xml"
  },
  {
    "systemId": "https://raw.githubusercontent.com/PowerShell/PowerShell/master/src/Schemas/Types.xsd",
    "pattern": "**/*.Types.ps1xml"
  }
]
```

此配置告诉 XML 扩展为所有 `.ps1xml` 文件使用 PowerShell 仓库中的官方 XML 架构。
配置这些架构可在 `ps1xml` 文件中启用以下功能：

- 语法错误报告
- 架构验证
- 标签和属性补全
- 自动闭合标签
- 符号高亮
- 文档折叠
- 文档符号和大纲
- 重命名支持
- 文档格式化

## 示例脚本

示例脚本随扩展一起提供，可以在以下路径找到。

`~/.vscode/extensions/ms-vscode.PowerShell-<version>/examples`

要在 VS Code 中打开或查看示例，请从 PowerShell 命令提示符运行以下命令：

```powershell
code (Get-ChildItem ~\.vscode\extensions\ms-vscode.PowerShell-*\examples)[-1]
```

你也可以使用 **PowerShell: 打开示例文件夹** 命令从命令面板 (`kb(workbench.action.showCommands)`)
打开示例。

![打开 PowerShell 示例][43]

## 其他资源

PowerShell 文档中有更详细的文章。请从[使用 VS Code][27]开始。

查看[故障排除指南][21]以获取常见问题的解答。

有关调试的更多信息，请查看由 [@keithHill][35] 撰写的 _Hey, Scripting Guy!_ 两部分系列博客文章，
内容涉及使用 PowerShell 扩展进行调试：

- [在 Visual Studio Code 中调试 PowerShell 脚本 - 第 1 部分][15]
- [在 Visual Studio Code 中调试 PowerShell 脚本 - 第 2 部分][16]

## 测试新功能和提供反馈

我们鼓励你尽可能尝试_预发布_版本。当有
_预发布_版本可用时，可以使用 **切换到
预发布版本** 按钮从市场安装。你可以使用将出现的
**切换到发布版本** 按钮切回稳定版本的扩展。你也可以
使用 **卸载** 按钮旁边的箭头并
选择 **安装其他版本...** 来降级到其他版本的扩展。

![显示切换到预发布版本按钮的截图。][41]

如果你发现了 bug，请[提交 issue][22]，并在我们修复期间切回稳定版本。

<!-- link references -->
[01]: /docs/debugtest/debugging
[02]: /docs/editing/editingevolved.md#go-to-definition
[03]: /docs/editing/editingevolved.md#open-symbol-by-name
[04]: /docs/editing/editingevolved.md#reference-information
[05]: /docs/editing/intellisense.md
[06]: /docs/configure/settings
[07]: /docs/configure/themes
[08]: /docs/editing/userdefinedsnippets.md
[09]: /docs/editing/tips-and-tricks.md#errors-and-warnings
[10]: /docs/editing/userinterface.md#outline-view
[11]: http://github.com/PowerShell/PSScriptAnalyzer
[12]: https://code.visualstudio.com/docs/remote/vscode-web
[13]: https://code.visualstudio.com/docs/remote/remote-overview
[14]: https://code.visualstudio.com/docs/remote/vscode-server
[15]: https://devblogs.microsoft.com/scripting/debugging-powershell-script-in-visual-studio-code-part-1/
[16]: https://devblogs.microsoft.com/scripting/debugging-powershell-script-in-visual-studio-code-part-2/
[17]: https://docs.microsoft.com/en-us/powershell/scripting/powershell-support-lifecycle
[18]: https://dotnet.microsoft.com/download/dotnet-framework
[19]: https://github.com/features/codespaces
[20]: https://github.com/PowerShell/EditorSyntax
[21]: https://github.com/PowerShell/vscode-powershell/blob/main/docs/troubleshooting.md#troubleshooting-powershell-extension-issues
[22]: https://github.com/PowerShell/vscode-powershell/issues/new/choose
[23]: https://learn.microsoft.com/dotnet
[24]: https://learn.microsoft.com/powershell/
[25]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_format.ps1xml
[26]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_types.ps1xml
[27]: https://learn.microsoft.com/powershell/scripting/dev-cross-plat/vscode/using-vscode
[28]: https://learn.microsoft.com/powershell/scripting/dev-cross-plat/vscode/using-vscode#choosing-a-version-of-powershell-to-use-with-the-extension
[29]: https://learn.microsoft.com/powershell/scripting/dev-cross-plat/vscode/using-vscode#debugging-with-visual-studio-code
[30]: https://learn.microsoft.com/powershell/utility-modules/psscriptanalyzer/overview
[31]: https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell
[32]: https://marketplace.visualstudio.com/items?itemName=redhat.vscode-xml
[33]: https://pester.dev/
[34]: https://pester.dev/docs/introduction/installation
[35]: https://twitter.com/r_keith_hill
[36]: images/powershell/codeGear.png
[37]: images/powershell/codeLensFuncRef.gif
[38]: images/powershell/codeLensPesterSymbol.gif
[39]: images/powershell/pesterCodeLens.png
[40]: images/powershell/PowerShellExtension.png
[41]: images/powershell/prerelease-switch.png
[42]: images/powershell/pssaExtensionSetting.png
[43]: images/powershell/pwshExamples.png
[44]: vscode:extension/ms-vscode.PowerShell
