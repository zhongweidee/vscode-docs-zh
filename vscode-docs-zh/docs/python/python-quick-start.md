---
ContentId: c7134463-4fdd-4674-8685-77c94472902c
DateApproved: 02/04/2026
MetaDescription: 本快速入门指南可帮助你快速上手使用 Visual Studio Code 中的 Python 扩展进行编程。
MetaSocialImage: images/tutorial/python-social.png
---
# VS Code 中的 Python 快速入门指南

Python 扩展使 Visual Studio Code 成为一个出色的 Python 编辑器，适用于任何操作系统，并可搭配多种 Python 解释器使用。

通过安装以下内容开始使用：

- [VS Code](https://code.visualstudio.com/)
- [一个 Python 解释器](/docs/python/python-tutorial.md#install-a-python-interpreter)（任何[活跃支持的 Python 版本](https://devguide.python.org/versions/)）
- 来自 VS Code 市场的 [Python 扩展](https://marketplace.visualstudio.com/items?itemName=ms-python.python)

![Gif installing the Python extension in a fresh install of VS Code](images/quick-start/qs-python-ext-install.gif)

要进一步定制用于 Python 开发的 VS Code，你可以使用 [Python 配置文件模板](/docs/configure/profiles.md#python-profile-template)，它会自动安装推荐的扩展和设置。对于数据科学项目，可考虑使用[数据科学配置文件模板](/docs/configure/profiles.md#data-science-profile-template)。

![Gif showing the Python profile template being installing into VS Code.](images/quick-start/python-profile-create.gif)

## 如何创建和打开 Python 项目或文件

如果你想在 VS Code 中处理已有的 Python 项目，可以从 VS Code 欢迎页面或文件资源管理器视图中打开文件夹或文件，或者选择 **文件 > 打开文件夹**（`kb(workbench.action.files.openFolder)`）或 **文件 > 打开文件**（`kb(workbench.action.files.openFile)`）。

你可以通过在 VS Code 欢迎页面上选择 **新建文件**，然后选择 **Python 文件** 来创建新的 Python 文件，或者通过导航到 **文件 > 新建文件**（`kb(workbench.action.files.newFile)`）来实现。

> **提示：** 如果你已经在 VS Code 中打开了一个工作区文件夹，则可以直接将新文件或新文件夹添加到现有项目中。你可以使用文件资源管理器视图中顶层文件夹上对应的 **新建文件夹** 或 **新建文件** 图标来创建新的文件夹和文件。

## 用户界面导览

当你首次启动 VS Code 时，需要安装 Python 扩展才能获得 Python 专属的功能和界面。让我们来看看安装 Python 扩展后的界面：

![Image of the Python UI highlights in VS Code.](images/quick-start/ui-tour.png)

## 代码操作

代码操作（也称为快速修复）用于帮助你修复代码中出现警告的问题。这些有用的提示会以灯泡图标（💡）的形式显示在编辑器的左侧边距中。选择灯泡即可显示代码操作选项。这些代码操作可以来自诸如 Python、Pylance 或 VS Code 本身的扩展。有关代码操作的更多信息，请参阅 [Python 快速修复](/docs/python/editing.md#quick-fixes)。

![Screenshot showing Code Actions in a Python project.](images/editing/quickFix.png)

## Python 命令

Python 命令可以通过[命令面板](/docs/editing/userinterface.md#command-palette)（`kb(workbench.action.showCommands)`）访问。从命令面板中，你可以访问 VS Code 及已安装扩展的各种功能。在命令面板中输入 **"Python: "** 即可查找 Python 扩展提供的命令。

![Gif demonstrating how to access Python commands in the Command Palette.](images/quick-start/cmd-plt-v2.gif)

## 运行、调试与测试

现在你已更加熟悉 VS Code 中的 Python 环境，接下来让我们学习如何运行、调试和测试你的代码。

### 运行

在 VS Code 中有几种运行 Python 代码的方法。

要运行编辑器中打开的 Python 脚本，请选择编辑器右上角的 **在终端中运行 Python 文件** 播放按钮。

![Image showing the Run Python File in Terminal play button.](images/tutorial/run-python-file-in-terminal-button.png)

此外，你还可以通过以下方式在 VS Code 中迭代地运行 Python 代码片段：

- 选择一行或多行，然后按 `kbstyle(Shift+Enter)` 或右键单击并选择 **在 Python 终端中运行选中的行/代码**。此命令适合仅测试文件的一部分。
- 从命令面板（`kb(workbench.action.showCommands)`）中选择 **Python: 启动 REPL** 命令，为当前选择的 Python 解释器打开一个 REPL 终端。在 REPL 中，你可以逐行输入并运行代码。

### 调试

调试器是一个有用的工具，它允许你检查代码执行的流程，更轻松地发现错误，并能了解你的变量和数据在程序运行时如何变化。你可以通过在你想要检查的代码行旁的装订线中单击，为 Python 项目设置断点来开始调试。

![Screenshot showing a debugger breakpoint in a Python program.](images/quick-start/breakpoint.png)

要开始调试，请按 `kbstyle(F5)` 初始化调试器。由于这是你第一次调试此文件，系统会打开一个配置菜单，允许你选择要调试的应用程序类型。如果是 Python 脚本，你可以选择 **Python 文件**。

当程序运行到断点后，它将暂停，让你可以在 Python 调试控制台中跟踪数据，并使用调试工具栏逐步推进你的程序。

![Gif showing how to configure the Python debugger for the first time.](images/quick-start/qs-debug-v2.gif)

要深入了解 Python 调试功能，请参阅 [VS Code 中的 Python 调试](/docs/python/debugging.md)。

### 测试

Python 扩展为 [Unittest](https://docs.python.org/3.3/library/unittest.html) 和 [pytest](https://pytest.org/en/7.4.x/) 提供了强大的测试支持。

你可以通过活动栏上的测试视图来配置 Python 测试，选择 **配置 Python 测试** 并选择你想要的测试框架。

你也可以为你的 Python 项目创建测试，Python 扩展会在配置好所选框架后尝试自动发现这些测试。Python 扩展还允许你在测试视图中运行和调试测试，并在测试结果面板中查看测试运行输出。

![Gif demonstrating test configuration, discovery, and run in the Python extension.](images/quick-start/qs-testing.gif)

要全面了解测试功能，请参阅 [VS Code 中的 Python 测试](/docs/python/testing.md)。

## 后续步骤

要学习如何使用流行的 Python Web 框架构建 Web 应用，请参阅以下教程：

- [在 Visual Studio Code 中使用 Django](/docs/python/tutorial-django.md)
- [在 Visual Studio Code 中使用 Flask](/docs/python/tutorial-flask.md)
- [在 Visual Studio Code 中使用 FastAPI](/docs/python/tutorial-fastapi.md)

在 Visual Studio Code 中 Python 还有更多值得探索的内容：

- [Python 配置文件模板](/docs/configure/profiles.md#python-profile-template) - 创建一个包含精选扩展、设置和代码片段的新[配置文件](/docs/configure/profiles)
- [编辑代码](/docs/python/editing.md) - 学习 Python 的自动补全、IntelliSense、格式化和重构功能。
- [Linting](/docs/python/linting.md) - 启用、配置和应用各种 Python linter。
- [调试](/docs/python/debugging.md) - 学习如何在本地和远程调试 Python。
- [测试](/docs/python/testing.md) - 配置测试环境，以及发现、运行和调试测试。
- [设置参考](/docs/python/settings-reference.md) - 了解 VS Code 中与 Python 相关的全部设置。
