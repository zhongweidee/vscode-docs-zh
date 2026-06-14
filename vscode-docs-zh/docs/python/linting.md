---
ContentId: 0ccb0e35-c4b2-4001-91bf-79ff1618f601
DateApproved: 02/04/2026
MetaDescription: 在 Visual Studio Code 中对 Python 进行 Linting
MetaSocialImage: images/tutorial/python-social.png
---
# 在 Visual Studio Code 中对 Python 进行 Linting

Linting 会高亮显示 Python 源代码中的语义和风格问题，这通常有助于你识别并纠正细微的编程错误或可能导致错误的编码习惯。例如，linting 可以检测到未定义变量的使用、对未定义函数的调用、缺少括号，甚至更细微的问题，比如试图重新定义内置类型或函数。Linting 与[格式化](/docs/python/formatting.md)不同，因为 linting 会分析代码的运行方式并检测错误，而格式化只是重新调整代码的外观。

> **注意**：语法错误检测在 Python 扩展的语言服务器中默认启用。要了解如何配置语言服务器，请参阅[语言服务器设置](/docs/python/settings-reference.md#python-language-server-settings)。本文介绍如何启用 linting 以进行额外的代码检测，包括风格检查。

## 选择 Linter

在 [VS Code Marketplace](https://marketplace.visualstudio.com/vscode) 中搜索你选择的 linter 扩展。如果需要，你可以同时使用多个 linter。

Microsoft 发布了以下用于 Python 的 linting 扩展：
| Linter | 扩展                                                                       |
| ------ | ------------------------------------------------------------------------------- |
| Pylint | [https://marketplace.visualstudio.com/items?itemName=ms-python.pylint](https://marketplace.visualstudio.com/items?itemName=ms-python.pylint)            |
| flake8 | [https://marketplace.visualstudio.com/items?itemName=ms-python.flake8](https://marketplace.visualstudio.com/items?itemName=ms-python.flake8)            |
| mypy   | [https://marketplace.visualstudio.com/items?itemName=ms-python.mypy-type-checker](https://marketplace.visualstudio.com/items?itemName=ms-python.mypy-type-checker) |

社区提供的 linting 扩展：

| Linter | 扩展                                                              |
| ------ | ---------------------------------------------------------------------- |
| Ruff   | [https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff](https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff) |
| mypy   | [https://marketplace.visualstudio.com/items?itemName=matangover.mypy](https://marketplace.visualstudio.com/items?itemName=matangover.mypy)    |

> **注意**：如果你在上面的表格或 Marketplace 中找不到你喜欢的 linter，你可以通过扩展添加对其的支持。你可以使用 [Python 扩展模板](/api/advanced-topics/python-extension-template.md) 将新的 Python 工具集成到 VS Code 中。

## 常规设置

你可以参考每个 linter 扩展的 README 以获取有关受支持设置的更多详细信息。以下设置受大多数 linter 扩展支持：

| 设置        | 默认值      | 描述                                                                                                                                                                                            |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| args           | `[]`         | 传递给 linter 的参数。**注意**：官方支持的 linter 在单个打开的文件上运行。请确保你的配置适用于该场景。 |
| importStrategy | `useBundled` | 当设置为 `useBundled` 时，扩展使用其自带的工具版本。当设置为 `fromEnvironment` 时，它首先尝试从你选择的 Python 环境加载，否则回退到自带版本。 |
| path | `""` | 用于 linting 的 linter 二进制文件路径。**注意：** 使用此选项可能会减慢格式化速度。 |
| interpreter | `[]` | 当设置为 Python 可执行文件的路径时，扩展将使用该路径来启动 linting 服务器及其子进程。 |
| showNotifications | `off`| 控制扩展何时显示通知。支持的值有 `off`、`always`、`onError` 和 `onWarning`。 |

## 禁用 Linting

Linter 如果已安装，默认情况下是启用的。你可以按工作区[禁用扩展](/docs/configure/extensions/extension-marketplace.md#disable-an-extension)来禁用它们。

## 运行 Linting

当 Python 文件被打开或保存时，Linting 将自动运行。

错误和警告会显示在打开文件的**问题**面板（`kb(workbench.actions.view.problems)`）中，并在代码编辑器中高亮显示。将鼠标悬停在下划线标记的问题上会显示详细信息：

![Linting messages in the editor and the Problems panel](images/linting/lint-messages.png)

## 代码操作

某些 linter 可能提供[代码操作](/docs/editing/refactoring.md#code-actions-quick-fixes-and-refactorings)，以帮助解决报告的问题。你可以参考你喜欢的 linter 扩展下的[功能贡献](/docs/configure/extensions/extension-marketplace.md#extension-details)部分，了解它提供了哪些代码操作。

## 日志记录

Linter 的日志可在**输出**面板（`kb(workbench.action.output.toggleOutput)`）中找到，当你从下拉菜单中选择 `<linter name>` 时即可查看。

你可以通过从命令面板（`kb(workbench.action.showCommands)`）运行**开发者：设置日志级别**命令来更改 linter 扩展的日志级别。从**扩展日志**组中选择该扩展，然后选择所需的日志级别。

## 严重级别

Linter 使用一些预定义的严重级别来报告问题。这可以通过 linter 的 `severity` 设置来更改。有关受支持的值和严重级别的更多详细信息，请参阅每个 linter 扩展的 README。

## Linting 故障排除

| 问题 | 原因 | 解决方法 |
| --- | --- | --- |
| Linter 扩展未报告任何问题。 | 尚未为你的工作区选择 Python。 | 查看你正在使用的 linter 的日志，并检查它正在使用的 Python 环境的路径。如果未选择 Python，请从命令面板运行 **Python: 选择解释器** 命令，并为你的工作区选择现有的解释器。你也可以在状态栏中选择 Python 版本来选择解释器。 |
| 显示 "You have deprecated linting or formatting settings" 通知 | 如果你看到此通知，这意味着你在 VS Code 中有诸如 `python.linting` 或 `python.formatting` 之类的设置。Python 扩展不再支持这些设置，因为 [linting 和格式化支持已迁移到工具扩展](https://github.com/microsoft/vscode-python/wiki/Migration-to-Python-Tools-Extensions)。 | 通过在 VS Code 中打开命令面板（`kb(workbench.action.showCommands)`）并运行**首选项：打开用户设置 (JSON)** 命令，查找这些设置的定义位置。如果它们不在你的用户设置中，则运行**首选项：打开工作区设置 (JSON)** 命令。然后删除已弃用的设置。<br> **注意**：如果你正在使用[远程开发扩展包](/docs/remote/remote-overview.md#remote-development-extension-pack)中的任何扩展，你还可以通过运行**首选项：打开远程设置 (JSON)** 命令来检查远程设置。 |
| 即使安装了 linter 扩展，Linting 也无法正常工作。 | Linting 可能由于各种原因失败，例如使用了不受支持的 Python 版本，或者 linter 未正确配置。检查 linter 扩展的输出通道以了解 linter 失败的原因（在命令面板中运行**输出：聚焦于输出**命令，然后选择 linter 扩展通道）。|

## 后续步骤

- [格式化](/docs/python/formatting.md) - 了解如何格式化你的 Python 代码。
- [调试](/docs/python/debugging.md) - 学习在本地和远程调试 Python。
- [测试](/docs/python/testing.md) - 配置测试环境并发现、运行和调试测试。
- [基本编辑](/docs/editing/codebasics.md) - 了解强大的 VS Code 编辑器。
- [Python 扩展模板](/api/advanced-topics/python-extension-template.md) - 创建扩展以将你喜欢的 linter 集成到 VS Code 中。
