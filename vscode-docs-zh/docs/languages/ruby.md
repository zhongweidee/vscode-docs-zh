---
ContentId: 33c079a7-f8d5-48fc-9d92-16be760b42ab
DateApproved: 6/10/2026
MetaDescription: 了解 Visual Studio Code 编辑器为 Ruby 提供的功能（代码补全、调试、代码片段、代码检查）。
---
# Visual Studio Code 中的 Ruby

[Ruby](https://www.ruby-lang.org) 是一种动态、开源的编程语言，以其简洁和高效著称。Ruby 的理念之一是通过富有表现力且优雅的语法让开发者感到愉悦。它常与各种框架一起用于 Web 开发，也用于脚本编写，从而在构建原型时实现快速迭代。

本主题详细介绍如何在 Visual Studio Code 中使用 [Ruby LSP](https://marketplace.visualstudio.com/items?itemName=Shopify.ruby-lsp) 扩展来设置和使用 Ruby。

![Ruby extension banner](images/ruby/ruby_lsp_extension.png)

## 安装

### 通过版本管理器安装 Ruby

虽然某些操作系统（如 macOS 和部分 Linux 发行版）默认安装了 Ruby，但我们建议使用版本管理器来访问更新版本的 Ruby，例如在 macOS 和 Linux 上使用 [rbenv](https://github.com/rbenv/rbenv)，在 Windows 上使用 [rbenv for Windows](https://github.com/RubyMetric/rbenv-for-windows)。请按照适用于您平台的[安装指南](https://github.com/rbenv/rbenv#installation)进行操作。

>**注意**：与在计算机上安装任何新工具集一样，您需要确保重启终端/命令提示符和 VS Code 实例，以便在平台的 PATH 变量中使用更新后的工具集位置。

### 在 VS Code 中安装 Ruby LSP 扩展

您可以通过扩展视图（`kb(workbench.view.extensions)`）在 VS Code 中查找并安装 Ruby LSP 扩展，搜索"Ruby LSP"即可。

![Ruby LSP extension in the Extensions view](images/ruby/ruby_lsp_extensions_view.png)

我们将在本主题中讨论 Ruby LSP 的许多功能，但您也可以参考该扩展的[文档](https://shopify.github.io/ruby-lsp)和[仓库](https://github.com/Shopify/ruby-lsp)。

### 检查安装

安装后，请检查**状态栏**中的语言状态项，以查看 Ruby LSP 服务器的状态。如果版本管理器已配置好，它应显示您项目正确的 Ruby 版本。服务器状态应显示为"正在启动"或"正在运行"，而不是错误。

![Ruby LSP language status center](images/ruby/ruby_lsp_status_center.png)

该扩展会自动生成一个 `.ruby-lsp` 文件夹，其中包含一个自定义 bundle，内含语言服务器 gem `ruby-lsp`。无需进行任何配置。

默认情况下，该扩展会尝试自动检测您正在使用的 Ruby 版本管理器，并相应地使用正确的版本和路径。如果您想自定义该行为，请在您的用户[设置](/docs/configure/settings.md)中设置以下配置：

```json
{
  "rubyLsp.rubyVersionManager": {
    "identifier": "rbenv"
  }
}
```

该扩展会定期自动尝试更新 `ruby-lsp` 语言服务器 gem；如果您想强制执行此操作，请使用命令面板（`kb(workbench.action.showCommands)`）执行 **Ruby LSP: Update language server gem**。

如果您遇到任何问题，请参阅[故障排除](https://shopify.github.io/ruby-lsp/troubleshooting.html)了解后续步骤。

## 主要功能

### 导航和 IntelliSense

Ruby LSP 提供了多种导航和 IntelliSense 相关功能，例如转到定义、悬停提示、工作区符号、文档符号、补全和签名帮助。

<video src="images/ruby/navigation.mp4" placeholder="images/ruby/navigation-placeholder.png" autoplay loop controls
    muted title="Demo of navigation and intellisense features">
    Sorry, your browser doesn't support HTML 5 video.
</video>

要了解有关在 VS Code 中快速浏览源代码的更多信息，请查看[代码导航](/docs/editing/editingevolved.md)。

### 内联提示

Ruby LSP 能够在代码中显示有关推断值或隐式值的有用信息。在下面的示例中，您可以看到 `StandardError` 被显示为空 `rescue` 调用中正在捕获的隐式异常类。

![Ruby program with inlay hints displayed](images/ruby/ruby_lsp_inlay_hints.png)

虽然内联提示有助于理解代码，但您也可以通过**编辑器 > 内联提示：已启用**设置（`setting(editor.inlayHints.enabled)`）禁用此功能，或使用以下配置仅针对 Ruby LSP 禁用此功能：

```json
"rubyLsp.enabledFeatures": {
    "inlayHint": false,
}
```

### 语义语法高亮

由于对项目源代码的深入理解，Ruby LSP 能够使用[语义语法高亮](https://github.com/microsoft/vscode/wiki/Semantic-Highlighting-Overview)和样式。

例如，它可以高亮显示：

* 方法调用，始终一致，不会与局部变量混淆。
* 局部参数（如方法、块或 lambda 参数），在其存在的作用域内保持一致。

![Ruby LSP semantic highlighting](images/ruby/ruby_lsp_semantic_highlighting.png)

>**注意**：此截图使用的是 [Ruby 扩展包](https://marketplace.visualstudio.com/items?itemName=Shopify.ruby-extensions-pack)中包含的 Spinel 主题。主题必须使用 Ruby LSP 提供的信息，才能为 Ruby 文件提供丰富的高亮显示。

要使用此功能，编辑器必须启用语义高亮。

```json
"editor.semanticHighlighting.enabled": true,
```

### 代码检查和格式化

默认情况下，Ruby LSP 通过与 [RuboCop](https://github.com/rubocop/rubocop) 集成来提供代码检查和格式化功能。您可以使用 `kb(editor.action.formatDocument)` 格式化您的 Ruby 文件，或通过命令面板（`kb(workbench.action.showCommands)`）或编辑器中的上下文菜单运行**格式化文档**命令。

如果您的项目不使用 RuboCop，Ruby LSP 将使用 [SyntaxTree](https://ruby-syntax-tree.github.io/syntax_tree) 来格式化文件。

![Linting a Ruby file](images/ruby/ruby_lsp_linting.png)

您还可以在每次保存时运行格式化程序（**编辑器：保存时格式化**），以便在工作时自动保持 Ruby 代码格式正确。为此，您必须启用保存时格式化。

```json
"editor.formatOnSave": true
```

Ruby LSP 扩展还通过键入时格式化提供了一些便捷的补全功能。例如，它会自动续写注释行，并自动闭合 `end` 标记、管道符或字符串插值大括号。要使用键入时格式化，请确保在编辑器中启用它：

```json
"editor.formatOnType": true
```

### 快速修复

当代码检查工具在您的源代码中发现错误和警告时，Ruby LSP 通常可以提供建议的快速修复（也称为代码操作），通过编辑器中的灯泡悬停提示即可使用。您可以通过 `kb(editor.action.quickFix)` 快速打开可用的快速修复。

![Quick Fixes for linting violations](images/ruby/ruby_lsp_quickfix.png)

此外，**代码操作小组件：包含附近的快速修复**（`setting(editor.codeActionWidget.includeNearbyQuickFixes)`）是一项默认启用的设置，它会激活 `kb(editor.action.quickFix)`（命令 ID `editor.action.quickFix`）所在行中最近的快速修复，无论光标在该行中的什么位置。

该命令会高亮显示将通过快速修复进行重构或修复的源代码。常规代码操作和非修复性重构仍可在光标位置激活。

### 重构

除了快速修复之外，Ruby LSP 还通过代码操作提供重构选项。例如，它可以通过单击将 Ruby 表达式提取为局部变量。

![Refactor extract to variable](images/ruby/ruby_lsp_refactor.png)

## 调试

Ruby LSP 扩展支持使用 debug gem（Ruby 的官方调试器）进行调试。或者，开发者也可以安装 [VS Code RDBG](https://marketplace.visualstudio.com/items?itemName=KoichiSasada.vscode-rdbg) 扩展来获取调试功能。

以下文档适用于 Ruby LSP 的调试器客户端。请参考 [RDBG 的 README](https://github.com/ruby/vscode-rdbg) 了解如何配置它。

### 调试测试

Ruby LSP 在单元测试上方添加了 CodeLens 按钮，使您能够在测试资源管理器中运行示例、在新终端中运行它们或启动调试器。对于这些用途，无需进行任何配置。

![Test running code lenses](images/ruby/ruby_lsp_code_lens.png)

### 通过启动任务进行调试

要通过启动任务使用调试器，您需要在 `launch.json` 文件中创建[调试配置](/docs/debugtest/debugging-configuration.md#launch-configurations)。该配置允许您配置要执行的程序。

要为 Ruby 程序创建 `launch.json`：

1. 在调试视图（`kb(workbench.view.debug)`）中，选择**创建 launch.json 文件**链接。
2. 这将显示一个下拉菜单，其中包含几种默认的启动配置类型。您可以选择第一个选项，但我们稍后会添加更多配置。
3. 现在我们可以编辑创建的 `.vscode/launch.json` 文件，以添加更多用于调试的 Ruby 程序启动方式。

示例：

```json
{
    "version": "0.2.0",
    "configurations": [
        // Launch the debugger for any given program. In this case, it will run the current file using Ruby
        {
            "type": "ruby_lsp",
            "name": "Debug",
            "request": "launch",
            "program": "ruby ${file}",
        },
        // Launch the debugger for the current test file
        {
            "type": "ruby_lsp",
            "request": "launch",
            "name": "Debug test file",
            "program": "ruby -Itest ${relativeFile}"
        },
        // Attach the debugger client to an existing Ruby process that has already been launched with the debugger
        // server
        {
            "type": "ruby_lsp",
            "request": "attach",
            "name": "Attach to existing server",
        }
    ]
}
```

添加启动配置后，我们可以通过添加断点并执行启动任务来调试 Ruby 程序。

1. 打开一个 Ruby 文件，点击编辑器左侧的装订线来设置断点。它应显示为一个红点。

   ![Red breakpoint dot in the left gutter of the editor](images/ruby/ruby_lsp_breakpoint.png)

2. 通过在**运行和调试**下选择所需的任务，并单击开始调试按钮（默认键盘快捷键 `kb(workbench.action.debug.start)`）来开始调试。

   ![Debug session stopped at breakpoint](images/ruby/ruby_lsp_debugging_session.png)

## 后续步骤

以上是对 VS Code 中 Ruby LSP 扩展功能的简要概述。有关更多信息，请参阅 Ruby LSP [文档](https://shopify.github.io/ruby-lsp)中提供的详细信息，包括如何调整特定的 [VS Code 编辑器](https://github.com/Shopify/ruby-lsp/blob/main/vscode/README.md)配置。

要了解 Ruby LSP 扩展的最新功能和错误修复，请查看[单体仓库](https://github.com/Shopify/ruby-lsp/releases)的发布页面，其中包含服务器和 VS Code 扩展实现。

如果您有任何问题或功能请求，欢迎在 Ruby LSP 的 [GitHub 仓库](https://github.com/Shopify/ruby-lsp/issues)中提交。

如果您想了解更多关于 VS Code 的信息，请尝试以下主题：

* [基础编辑](/docs/editing/codebasics.md) - 快速了解 VS Code 编辑器的基础知识。
* [安装扩展](/docs/configure/extensions/extension-marketplace.md) - 了解[市场](https://marketplace.visualstudio.com/vscode)中提供的其他扩展。
* [代码导航](/docs/editing/editingevolved.md) - 快速浏览您的源代码。
