---
ContentId: c5039182-eee4-47ff-a2a8-dc28f4bc2cbc
DateApproved: 02/04/2026
MetaDescription: 在 Visual Studio Code 中格式化 Python 代码
MetaSocialImage: images/tutorial/python-social.png
---
# 在 VS Code 中格式化 Python 代码

格式化使源代码更易于人类阅读。通过强制执行特定的规则和约定（例如行间距、缩进和运算符周围的空格），代码在视觉上变得更有条理、更易于理解。你可以在 [autopep8](https://pypi.org/project/autopep8/) 页面查看示例。请记住，格式化本身不会影响代码的功能。

[Linting](/docs/python/linting.md) 通过分析代码中的常见语法、风格和功能错误以及非常规编程实践来帮助防止错误。尽管格式化和 linting 之间有一些重叠，但这两项功能是互补的。

## 选择格式化工具

在 [VS Code Marketplace](https://marketplace.visualstudio.com/vscode) 中搜索你选择的格式化工具扩展。

Microsoft 发布了以下格式化扩展：

| 格式化工具 | 扩展                                                                       |
| ------ | ------------------------------------------------------------------------------- |
| autopep8 | [https://marketplace.visualstudio.com/items?itemName=ms-python.autopep8](https://marketplace.visualstudio.com/items?itemName=ms-python.autopep8)            |
| Black 格式化工具 | [https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter)            |

社区提供的格式化工具扩展：

| 格式化工具 | 扩展                                                              |
| ------ | ---------------------------------------------------------------------- |
| Ruff   | [https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff](https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff)   |
| yapf   | [https://marketplace.visualstudio.com/items?itemName=eeyore.yapf](https://marketplace.visualstudio.com/items?itemName=eeyore.yapf) |

此外，以下格式化工具扩展支持导入排序：

| 格式化工具 | 扩展                                                              |
| ------ | ---------------------------------------------------------------------- |
| Ruff   | [https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff](https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff)   |
| isort   | [https://marketplace.visualstudio.com/items?itemName=ms-python.isort](https://marketplace.visualstudio.com/items?itemName=ms-python.isort) |

> **注意**：如果你在上面的表格或 Marketplace 中找不到你偏好的格式化工具，你可以通过扩展来添加对其的支持。你可以使用 [Python 扩展模板](/api/advanced-topics/python-extension-template.md) 将新的 Python 工具集成到 VS Code 中。

## 设置默认格式化工具

安装格式化工具扩展后，你可以按照以下步骤在 VS Code 中将其选为 Python 文件的默认格式化工具：

1. 在 VS Code 中打开一个 Python 文件。
1. 右键单击编辑器以显示上下文菜单。
1. 选择 **格式化文档的方式...**。
1. 从下拉菜单中选择 **配置默认格式化程序...**。
1. 从列表中选择你偏好的格式化工具扩展。

或者，你也可以通过在用户的 `settings.json` 文件的 `[python]` 作用域下设置 `"editor.defaultFormatter"` 来将其设为所有 Python 文件的默认格式化工具。你可以使用 **首选项: 打开用户设置 (JSON)** 命令打开 `settings.json`。

例如，要将 Black 格式化工具设为默认格式化工具，请将以下设置添加到你的用户 `settings.json` 文件中：

```json
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter"
  }
```

要将格式化工具扩展设为导入排序器，你可以在用户的 `settings.json` 文件或工作区的 `settings.json` 文件中的 `[python]` 作用域下，设置 `"editor.codeActionsOnSave"` 的偏好。你可以分别使用 **首选项: 打开用户设置 (JSON)** 和 **首选项: 打开工作区设置 (JSON)** 命令打开这些 `settings.json` 文件。这将为所有 Python 文件启用保存时导入排序。

例如，要将 Ruff 设为你偏好的导入排序器，可以将以下设置添加到你的用户 `settings.json` 或工作区 `settings.json` 文件中：

```json
{
  "[python]": {
    "editor.codeActionsOnSave": {
      "source.organizeImports.ruff": "explicit"
    }
  }
}
```

## 格式化你的代码

你可以通过右键单击编辑器并选择 **格式化文档**，或使用 `kb(editor.action.formatDocument)` 键盘快捷键来格式化代码。

你还可以将以下设置添加到你的用户 `settings.json` 文件中，以启用在保存时格式化代码：

```json
  "[python]": {
    "editor.formatOnSave": true
  }
```

## 通用格式化设置

你可以参考每个格式化工具扩展的 README 以了解有关支持设置的更多详细信息。以下设置大多数格式化工具扩展都支持：

| 设置后缀<br/> | 默认值 | 描述 |
| --- | --- | --- |
| args | `[]` | 要传递给格式化工具的参数。每个参数应作为数组中的单独字符串传递。<br> 例如：<br> `black-formatter.args: ["--line-length", "100"]` |
| importStrategy | `useBundled` | 当设置为 `useBundled` 时，扩展使用其自带的工具版本。当设置为 `fromEnvironment` 时，它首先尝试从你选择的 Python 环境中加载，否则回退到自带版本。 |
| path | `""` | 用于格式化的格式化工具二进制文件的路径。**注意：** 使用此选项可能会降低格式化速度。 |
| interpreter | `[]` | 当设置为 Python 可执行文件的路径时，扩展将使用该路径来启动格式化工具服务器及其子进程。 |
| showNotifications | `off`| 控制扩展何时显示通知。支持的值为 `off`、`always`、`onError` 和 `onWarning`。 |

## 格式化故障排除

如果格式化失败，请检查以下可能的原因：

| 问题 | 解决方案 |
| --- | --- |
| Python 文件有多个可用的格式化工具。 | 按照[上一节](#设置默认格式化工具)中的说明设置默认格式化工具。 |
| 没有“格式化文档的方式...”选项可用。       | 如果你在上下文菜单中没有看到此选项，很可能你没有在 VS Code 中安装或启用格式化工具扩展。请参考[选择格式化工具](#选择格式化工具)部分，了解如何安装 Python 格式化工具扩展。 |
| 格式化工具的自定义参数不正确。 | 检查相应的 `<formatter>.path` 设置是否不包含参数，以及 `<formatter>.args` 是否包含独立顶级参数元素的列表。 |
| 显示“你已弃用的 linting 或格式化设置”通知。  | 如果你看到此通知，意味着你在 VS Code 中有诸如 `python.linting` 或 `python.formatting` 之类的设置。这些设置不再受 Python 扩展支持，因为 [linting 和格式化支持已迁移到工具扩展](https://github.com/microsoft/vscode-python/wiki/Migration-to-Python-Tools-Extensions)。 | 通过打开命令面板 (`kb(workbench.action.showCommands)`) 并运行 **首选项: 打开用户设置 (JSON)** 命令，找到这些设置在 VS Code 中的定义位置。如果它们不在你的用户设置中，则运行 **首选项: 打开工作区设置 (JSON)** 命令。然后删除已弃用的设置。<br> **注意**：如果你正在使用 [远程开发扩展包](/docs/remote/remote-overview.md#remote-development-extension-pack) 中的任何扩展，你还可以通过运行 **首选项: 打开远程设置 (JSON)** 命令来检查远程设置。 |
| 使用 Black 格式化工具时，**格式化选定内容** 命令失败。 | `black` 不支持格式化代码的选定部分。要解决此限制，你可以禁用粘贴时格式化，并设置 `formatOnSave` 以使用以下设置格式化整个文件：`"[python]": {"editor.formatOnPaste": false, "editor.formatOnSaveMode": "file"}`。|
| 即使安装了格式化工具扩展，格式化也不起作用。  | 格式化可能因各种原因失败，例如代码中存在语法问题、使用了不受支持的 Python 版本，或者格式化工具配置不正确。请检查格式化工具扩展的输出通道，以了解格式化工具失败的原因（在命令面板中运行 **输出: 聚焦于输出** 命令，然后选择格式化工具扩展通道）。|

> **注意**：如果你在上面的列表中没有找到你偏好的格式化工具，你可以通过扩展来添加支持。[Python 扩展模板](/api/advanced-topics/python-extension-template.md) 可以轻松地将新的 Python 工具集成到 VS Code 中。

## 后续步骤

- [调试](/docs/python/debugging.md) - 学习在本地和远程调试 Python。
- [测试](/docs/python/testing.md) - 配置测试环境，发现、运行和调试测试。
- [基本编辑](/docs/editing/codebasics.md) - 了解强大的 VS Code 编辑器。
- [代码导航](/docs/editing/editingevolved.md) - 快速浏览源代码。
- [Python 扩展模板](/api/advanced-topics/python-extension-template.md) - 创建一个扩展，将你喜欢的 linter 集成到 VS Code 中。
