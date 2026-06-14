---
ContentId:
DateApproved: 02/04/2026
MetaDescription: 在 Visual Studio Code 中运行 Python 代码
MetaSocialImage: images/tutorial/python-social.png
---
# 在 Visual Studio Code 中运行 Python 代码

无论你是在 REPL 中试验几行较短的 Python 代码，还是准备运行一个 Python 脚本，Python 扩展都提供了多种方式来运行你的代码。

## 交互式运行 Python 代码

安装在计算机上的 Python 解释器为你提供了所谓的交互式 REPL（Read-Evaluate-Print Loop，读取-求值-输出循环），它会读取一段代码、对其求值，然后将结果输出到控制台。

在计算机上安装 Python 解释器后，你可以通过打开系统上的终端或命令提示符并输入 `python`（Windows）或 `python3`（macOS/Linux）来激活 Python REPL（以 `>>>` 表示），从而与 Python REPL 进行交互。

在 VS Code 中，还有另外两种与 Python REPL 交互的方式。

### 原生 REPL

VS Code 的 Python 原生 REPL 在经典 Python REPL 的基础上构建，并提供了额外的功能，例如 IntelliSense 和语法高亮，使你的 Python 开发体验更加高效。不过，该 REPL 仍然遵循 Python 内置 REPL 的基本原则，即历史执行顺序及其内容是不可变的。

你可以通过命令面板（`kb(workbench.action.showCommands)`）搜索 **Python: Start Native REPL** 来打开原生 REPL。此外，你可以通过智能发送（`kbstyle(Shift+Enter)`）和设置 `settings.json` 文件中的 `"python.REPL.sendToNativeREPL": true`，将代码发送到原生 REPL，并使用 **Run Selection/Line in Python REPL** 命令。你也可以选择继续使用终端中 Python 内置的 REPL（`>>>`），只需在 `settings.json` 中将 `"python.REPL.sendToNativeREPL"` 设置为 `false` 即可。

![Gif showing the Native REPL for Python.](images/shared/nativeREPL-demo.gif)

### 终端 REPL

与在 VS Code 之外与 Python REPL 交互的方式类似，你可以在 VS Code 中打开终端并激活 Python REPL。为此，你可以在命令面板（`kb(workbench.action.showCommands)`）中搜索 **Python: Start Terminal REPL**，这会为当前选定的 Python 解释器打开一个终端。或者，你也可以导航到**终端 > 新建终端**并输入 `python`（Windows）或 `python3`（macOS/Linux）命令。

终端中通过[终端 Shell 集成](https://code.visualstudio.com/docs/terminal/shell-integration)支持许多功能，例如运行最近的命令、命令装饰器和改进的无障碍访问。要在终端中启用或禁用 Shell 集成，你可以在设置中切换 `setting(python.terminal.shellIntegration.enabled)`。

## 运行 Python 代码

Python 扩展提供了多种无需额外配置即可运行 Python 代码的方式。

1. 选择编辑器右上角的**在终端中运行 Python 文件**播放按钮。

    ![Using the Run Python File in Terminal button](images/tutorial/run-python-file-in-terminal-button.png)

    该按钮会打开一个终端面板，在其中会自动激活你的 Python 解释器，然后运行指定的脚本（例如 `python3 hello.py`（macOS/Linux）或 `python hello.py`（Windows））：

    ![Program output in a Python terminal](images/tutorial/output-in-terminal.png)

2. 在编辑器窗口中的任意位置右键单击，然后选择**运行 > 在终端中运行 Python 文件**（会自动保存文件）：

   ![Run Python File in Terminal command in the Python editor](images/tutorial/run-python-file-in-terminal.png)

3. 选择一行或多行，然后按 `kbstyle(Shift+Enter)`，或右键单击并选择**在 Python 终端中运行选定内容/行**。

    此选项非常适合仅测试文件的一部分。

4. 将光标放在一行代码上，然后按 `kbstyle(Shift+Enter)` 来激活智能发送。

### 智能发送

Python 扩展默认启用智能发送（`kbstyle(Shift+Enter)`）。智能发送会查看光标所在位置的代码，将最小的可运行代码块发送到 Python REPL，然后将光标放置到下一行代码。这使你能够轻松高效地运行程序中的 Python 代码。

智能发送在不支持的 Python 版本（例如 Python 2）或无效的 Python 代码上将不会生效。要禁用智能发送，改为仅发送光标所在行的代码，请将 `python.REPL.enableREPLSmartSend` 设置为 `false`。

## 另请参阅

- [调试](/docs/python/debugging.md) - 学习在本地和远程调试 Python。
- [测试](/docs/python/testing.md) - 配置测试环境，以及发现、运行和调试测试。
