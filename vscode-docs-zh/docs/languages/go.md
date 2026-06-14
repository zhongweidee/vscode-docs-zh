---
ContentId: 6f06908a-6694-4fad-ac1e-fc6d9c5747ca
DateApproved: 6/10/2026
MetaDescription: 了解 Visual Studio Code 编辑器为 Go 提供的功能（代码补全、调试、代码片段、代码检查）。
---
# Visual Studio Code 中的 Go

使用 Visual Studio Code 的 Go 扩展，你可以获得 IntelliSense、代码导航、符号搜索、测试、调试等功能，这些功能将助力你的 [Go](https://go.dev/) 开发。

![Go extension banner](images/go/go-extension.png)

你可以从 VS Code [市场](https://marketplace.visualstudio.com/items?itemName=golang.go)安装 Go 扩展。

观看 ["Getting started with VS Code Go"](https://youtu.be/1MXIGYrMk80) 了解如何使用 VS Code Go 构建你的第一个 Go 应用程序。

本文仅介绍 Go 扩展提供的部分功能。有关支持功能的完整最新列表，请参阅扩展的[文档](https://github.com/golang/vscode-go/wiki/features)。

## IntelliSense

![IntelliSense](images/go/completion-signature-help.gif)

IntelliSense 功能由 Go 团队维护的 Go 语言服务器 [gopls](https://go.dev/s/gopls) 提供。你可以使用 [`gopls` 设置](https://github.com/golang/vscode-go/wiki/settings#settings-for-gopls)来配置 `gopls` 的行为。

### 语义语法高亮

为了获得比默认的基于 TextMate 的语法高亮更好的效果，我们建议通过启用 Gopls 的 `ui.semanticTokens` 设置来启用[语义高亮](/api/language-extensions/semantic-highlight-guide.md)。

```json
"gopls": { "ui.semanticTokens": true }
```

### 自动补全

在 Go 文件中键入代码时，你可以看到 IntelliSense 为你提供建议的补全项。这甚至适用于当前包、已导入的包以及尚未导入的包中的成员。只需键入任何包名后跟 `.`，你就会看到相应包成员的建议。

>**提示**: 使用 `kb(editor.action.triggerSuggest)` 手动触发建议。

### 悬停信息

将鼠标悬停在任何变量、函数或结构体上将为你提供该项的信息，例如文档、签名等。

### 签名帮助

调用函数时，当你输入 `(` 后，会弹出一个窗口提供函数的签名帮助。在继续键入参数时，提示（下划线）会移动到下一个参数。

>**提示**: 当光标位于函数调用中的 `()` 内时，使用 `kb(editor.action.triggerParameterHints)` 手动触发签名帮助。

## 代码导航

代码导航功能可在编辑器中的上下文菜单中使用。

* **转到定义** `kb(editor.action.revealDefinition)` - 转到类型定义的源代码。
* **转到类型定义** - 转到定义符号的类型。
* **速览定义** `kb(editor.action.peekDefinition)` - 弹出一个包含类型定义的速览窗口。
* **转到引用** `kb(editor.action.goToReferences)` - 显示该类型的所有引用。
* **显示调用层次结构** `kb(editor.showCallHierarchy)` - 显示来自或指向某个函数的所有调用。
* **转到实现** `kb(editor.action.goToImplementation)` - 弹出一个速览窗口，列出接口的所有实现（如果使用接口类型符号触发），或类型实现的接口（如果使用具体类型符号触发）。
* **查找所有实现** - 显示接口的所有实现（如果使用接口类型符号触发），或类型实现的接口（如果使用具体类型符号触发）。

你可以通过命令面板（`kb(workbench.action.showCommands)`）中的**转到符号**命令使用符号搜索进行导航。

* **转到文件中的符号** - `kb(workbench.action.gotoSymbol)`
* **转到工作区中的符号** - `kb(workbench.action.showAllSymbols)`

你还可以使用 **Go: Toggle Test File** 命令在 Go 文件与其测试实现之间来回导航。

## 构建与诊断

Go 语言服务器（`gopls`）会检测工作区中的构建和 vet 错误。运行上述任何/所有操作产生的错误和警告将在编辑器中以红色/绿色波浪线显示。这些诊断信息也会显示在**问题**面板中（**查看** > **问题**）。

你可以使用 `go.lintOnSave` 设置添加额外的代码检查，并使用 `go.lintTool` 设置配置你选择的检查工具（`staticcheck`、`golangci-lint` 或 `revive`）。

## 格式化

你可以使用 `kb(editor.action.formatDocument)` 或从命令面板或编辑器上下文菜单中运行**格式化文档**命令来格式化你的 Go 文件。

默认情况下，格式化会在保存 Go 文件时运行。你可以通过将 `[go]` 语言标识符的 `setting(editor.formatOnSave)` 设置为 `false` 来禁用此行为。你可以使用 JSON 设置文件对此进行更改。

```json
"[go]": {
        "editor.formatOnSave": false
}
```

当你有多个用于 Go 文件的格式化器被激活时，你可以选择 Go 扩展作为默认格式化器。

```json
"[go]": {
    "editor.defaultFormatter": "golang.go"
}
```

格式化由 `gopls` 提供。如果你想要 `gofumpt` 风格的格式化，可以配置 `gopls` 使用 `gofumpt`。

```json
"gopls": {
    "formatting.gofumpt": true
}
```

## 测试

VS Code 的[测试 UI](/api/extension-guides/testing.md) 和编辑器 [CodeLens](https://code.visualstudio.com/blogs/2017/02/12/code-lens-roundup) 元素允许用户轻松地为给定函数、文件、包或工作区运行测试、基准测试和分析。

此外，相同功能也可通过一组命令实现：

* [**Go: Test Function At Cursor**](https://github.com/golang/vscode-go/wiki/commands#go-test-function-at-cursor)
* [**Go: Test File**](https://github.com/golang/vscode-go/wiki/commands#go-test-file)
* [**Go: Test Package**](https://github.com/golang/vscode-go/wiki/commands#go-test-package)
* [**Go: Test All Packages in Workspace**](https://github.com/golang/vscode-go/wiki/commands#go-test-all-packages-in-workspace)

还有许多与测试相关的命令，你可以在命令面板中通过键入 "Go: test" 来探索。

![Test Commands](images/go/testcommands.png)

前三项可以用于使用 `gotests` 为当前包、文件或光标处的函数生成测试骨架。后几项可以用于使用 `go test` 运行当前包、文件或光标处的测试。还有一个用于获取测试覆盖率的命令。

你可以使用以下设置配置扩展以运行测试和计算测试覆盖率：

* `go.testOnSave`
* `go.coverOnSave`
* `go.testFlags`

## 导入包

该扩展会整理导入，并默认移除未使用的导入。如需不同的行为，你可以按照[这些说明](https://github.com/golang/vscode-go/wiki/advanced#formatting-code-and-organizing-imports)覆盖每种语言的默认设置。

运行命令 **Go: Add Import** 可获取可以导入到你 Go 文件中的包列表。选择一个后，它将添加到你的 Go 文件的导入块中。

## 重构

选择要重构的区域（例如变量、函数体等）。点击所选区域中出现的代码操作灯泡图标，或从 VS Code 上下文菜单中选择**重构...** 或**重命名符号**（`kb(editor.action.rename)`）。

## 调试

Go 扩展允许你使用 [Delve](https://github.com/go-delve/delve) 调试器调试 Go 代码。

请阅读 [Debug Go programs in VS Code](https://github.com/golang/vscode-go/wiki/debugging) 了解设置步骤、支持的功能、配置、远程调试信息和疑难解答指南。有关检查变量、设置断点以及其他与语言无关的调试活动，请参阅 [VS Code 调试](/docs/debugtest/debugging.md)。

Go 特有的一些功能包括：

* 本地和远程调试
* 使用 [Delve 的表达式语法](https://github.com/go-delve/delve/blob/master/Documentation/cli/expr.md)进行数据检查
* 通过调试控制台中的 [`dlv` 命令](https://github.com/golang/vscode-go/wiki/debugging#dlv-command-from-debug-console)动态更改配置和检查选项
* 能够隐藏/显示系统协程（使用 `hideSystemGoroutines` 配置）
* 反汇编视图支持（右键点击源代码并选择**打开反汇编视图**）
* 实验性函数调用、核心检查、Mozilla `rr` 支持

## 后续步骤

以上简要概述了 VS Code 中的 Go 扩展功能。有关更多信息，请参阅 Go 扩展 [README](https://github.com/golang/vscode-go/blob/master/README.md) 中提供的详细信息。

要了解 Go 扩展的最新功能/错误修复，请参阅 [CHANGELOG](https://github.com/golang/vscode-go/blob/master/CHANGELOG.md)。

如果你有任何问题或功能请求，欢迎在 Go 扩展的 [vscode-go 仓库](https://github.com/golang/vscode-go/issues)中提出。

如果你想了解更多关于 VS Code 的信息，请尝试以下主题：

* [基础编辑](/docs/editing/codebasics.md) - 快速了解 VS Code 编辑器的基础知识。
* [安装扩展](/docs/configure/extensions/extension-marketplace.md) - 了解[市场](https://marketplace.visualstudio.com/vscode)中可用的其他扩展。
* [代码导航](/docs/editing/editingevolved.md) - 在源代码中快速移动。
