---
ContentId: d7ec8e7c-de5e-42b3-86df-a48660f1f6e1
DateApproved: 6/10/2026
MetaDescription: 了解如何在 Visual Studio Code 中使用 Julia 编程语言。
---
# Visual Studio Code 中的 Julia

[Julia 编程语言](https://julialang.org)是一种高级动态语言，专为速度和简洁性而构建。Julia 通常用于数据科学、机器学习、科学计算等领域，但仍然是一种通用语言，可以处理大多数编程用例。

适用于 Visual Studio Code 的 [Julia 扩展](https://marketplace.visualstudio.com/items?itemName=julialang.language-julia)包含内置的动态自动补全、内联结果、绘图面板、集成 REPL、变量视图、代码导航以及许多其他高级语言功能。

![Julia VS Code overview](images/julia/overview.png)

这些功能大多数开箱即用，而某些功能可能需要进行基本配置才能获得最佳体验。本页面总结了 Julia VS Code 扩展中包含的 Julia 功能。有关这些功能如何工作以及如何配置的更深入指南，请参阅 [Julia in VS Code](https://www.julia-vscode.org/docs/stable/) 文档。

## 入门

1. 为您的平台安装 Julia：[https://julialang.org/install](https://julialang.org/install)。
2. 为您的平台安装 VS Code：[https://code.visualstudio.com/download](https://code.visualstudio.com/download)。
3. 在 [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=julialang.language-julia) 中打开 Julia 扩展，然后按**安装**；或通过执行以下步骤手动安装：
    1. 启动 VS Code。
    2. 在 VS Code 中，通过单击顶部菜单栏中的**视图**，然后选择**扩展**，转到扩展视图。
    3. 在扩展视图中，在 Marketplace 搜索框中搜索词条"julia"，然后选择 Julia 扩展（julialang.language-julia），并选择**安装**按钮。
    4. 重新启动 VS Code。

如果您在安装 Julia VS Code 扩展时遇到任何问题，请查看[安装扩展](/docs/configure/extensions/extension-marketplace.md#install-an-extension)，这应该有助于澄清任何问题。

![Julia in the VS Code Marketplace](images/julia/julia-extension-marketplace.png)

## 运行代码

在 VS Code 中运行 Julia 代码有几种方法。您可以运行 Julia 文件（通过 `kb(workbench.action.debug.run)`，它将运行您打开并激活的任何 Julia 文件），通过 REPL 执行 Julia 命令，甚至执行您打开的文件中的特定代码块。要了解有关这些选项的更多信息，请前往 [Julia in VS Code - Running Code](https://www.julia-vscode.org/docs/stable/userguide/runningcode/)。

## 调试

您可以通过打开要调试的 Julia 文件来开始调试。然后，在活动栏上选择**运行和调试**视图（如下所示）：

![Getting started debugging Julia code](images/julia/debug1.png)

接下来，您可以通过单击行号左侧来添加断点：

![Adding a breakpoint](images/julia/debug2.png)

红点只会在您选择了行号旁边的区域之后才会显示。

在添加了断点（或任何其他类型的调试配置）之后，选择左侧的**运行和调试**按钮。初始运行可能需要几秒钟才能开始。然后，您应该会看到使用调试配置运行代码的输出。在此示例中，由于我们添加了断点，您将看到以下内容：

![Run and Debug your Julia file](images/julia/debug3.png)

请注意，第二个 print 命令尚未执行，终端中只有第一个 print 命令的文本。您可以通过选择**继续**按钮来完成程序的执行：

![Finish the code execution in the debugger](images/julia/debug4.png)

要了解更多关于使用 VS Code 调试 Julia 代码的信息，您可以阅读 [Julia in VS Code - Debugging](https://www.julia-vscode.org/docs/stable/userguide/debugging/)。

## 代码补全（IntelliSense）

Julia VS Code 扩展通过 IntelliSense 提供代码补全功能。此功能开箱即用，对有经验和初学的 Julia 开发者都很有用。

![Code completion with IntelliSense](images/julia/code-completion.gif)

您可以在 [VS Code IntelliSense](/docs/editing/intellisense.md) 主题中了解更多信息。

## Julia 视图

默认情况下，在窗口左侧的活动栏中，您将看到 Julia 三点徽标，如下所示：

![Julia icon in the Activity bar](images/julia/julia-tab1.png)

如果选择 Julia 图标，将打开 Julia 视图，其中显示**工作区**、**文档**和**绘图导航器**部分。**工作区**部分显示已加载到活动 Julia 会话中的源代码集合。默认情况下，它将是空白的，因为您尚未运行任何代码，但在运行某些代码之后，您将能够看到工作区的状态。

![Julia Workspace](images/julia/julia-tab2.png)

**文档**部分允许您查看特定 Julia 函数的详细信息，而无需打开单独的浏览器窗口。您可以搜索已加载到活动会话中的任何 Julia 包的文档（通过执行 `using some_package`），但默认情况下，搜索栏将仅显示核心 Julia 文档的结果。

![Julia Documentation](images/julia/julia-tab3.png)

还有一个内置的**绘图导航器**，当您处理具有可视化组件的项目时，它非常有用。您可以设置图表默认在 VS Code 中渲染，然后方便地前后导航浏览它们。

## 后续步骤

以上是对 Julia 扩展在 VS Code 中功能的简要概述。有关更多信息，请参阅 Julia 扩展 [README](https://github.com/julia-vscode/julia-vscode#julia) 中提供的详细说明。

要了解 Julia 扩展的最新功能和错误修复，请查看 [CHANGELOG](https://github.com/julia-vscode/julia-vscode/blob/master/CHANGELOG.md)。

如果您有任何问题或功能请求，请随时在 Julia 扩展的 [GitHub 仓库](https://github.com/julia-vscode/julia-vscode/issues) 中提交。

如果您想了解更多关于 VS Code 的信息，请尝试以下主题：

* [基本编辑](/docs/editing/codebasics.md) - 快速介绍 VS Code 编辑器的基础知识。
* [安装扩展](/docs/configure/extensions/extension-marketplace.md) - 了解 [Marketplace](https://marketplace.visualstudio.com/vscode) 中可用的其他扩展。
* [代码导航](/docs/editing/editingevolved.md) - 快速浏览您的源代码。
