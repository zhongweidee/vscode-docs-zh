---
ContentId: 7B4DC928-2414-4FC7-9C76-E4A13D6675FE
DateApproved: 6/10/2026
MetaDescription: 了解如何在 Visual Studio Code 中开始使用集成终端运行 shell 命令。
---
# 终端入门

Visual Studio Code 包含一个功能齐全的集成终端。你可以像使用独立终端一样，在其中运行如 `echo`、`ls` 和 `git` 等命令。VS Code 中的终端还提供与编辑器的集成，支持工作区文件链接和错误检测等功能。

终端可以使用计算机上安装的各种 shell。shell 是一个通过与操作系统交互来解释和执行命令的程序。常见的 shell 包括 Bash、Zsh 和 PowerShell。

本教程将引导你了解在 Visual Studio Code 中使用终端的基础知识。

## 在终端中运行你的第一条命令

在编写代码时，你可能需要运行 shell 命令来构建、测试或部署应用程序。VS Code 中的终端使你无需离开编辑器即可运行这些命令。

开始使用终端：

1. 启动 VS Code 并打开一个文件夹或工作区。

1. 通过从菜单栏中选择"**视图**" > "**终端**"或按下 `kb(workbench.action.terminal.toggleTerminal)` 键盘快捷键来打开终端。

    根据你的操作系统配置，终端会以默认 shell（如 Bash、PowerShell 或 Zsh）打开。shell 的工作目录从工作区文件夹的根目录开始。

    ![打开终端](./images/getting-started/open-terminal.png)

1. 输入基本命令（如 `ls`）来列出当前目录中的文件。

    终端会显示命令的输出，类似于独立终端，区别在于你始终停留在编辑器内。

    ![在终端中运行命令](./images/getting-started/terminal-output.png)

    > **提示**：你可以通过拖动终端面板的边框或选择 `^` 图标来最大化面板，从而放大终端。

## 与命令输出交互

VS Code 中的终端还提供与命令输出交互的功能。命令通常会输出你可能想打开或导航到的文件路径或 URL。例如，编译器或 linter 可能会返回带有文件路径和行号的错误消息。你可以直接在终端输出中选择链接来在编辑器中打开该文件，而无需手动搜索。

让我们看看如何在终端中与命令输出交互：

1. 打开之前运行 `ls` 命令的终端。

1. 在终端中，按住 `kbstyle(Ctrl)`/`kbstyle(Cmd)` 键，将鼠标悬停在文件名上，然后选择该链接。

    注意，当你将鼠标悬停在输出中的文本上时，它会变成一个链接。当你选择一个文件名时，VS Code 会在编辑器中打开选定的文件。

    ![使用终端输出中的链接导航到文件/URL](./images/getting-started/terminal-links.png)

    终端输出中的所有文本都是可点击的。如果你在终端中选择一个超链接，它会在默认浏览器中打开该链接。对于其他文本，VS Code 会尝试在工作区中搜索包含该文本的文件。

1. 运行以下命令创建一个 `Command.txt` 文件，其中包含可用 shell 命令的列表。

    * PowerShell

        ```powershell
        Get-Command | Out-File -FilePath .\Command.txt
        ```

    * Bash / Zsh

        ```bash
        ls -l /usr/bin > Command.txt
        ```

1. 输入以下命令在 `Command.txt` 文件中搜索命令。

    * PowerShell

        ```powershell
        Get-ChildItem *.txt | Select-String "dir"
        ```

    * Bash / Zsh

        ```bash
        grep -n "dir" *.txt
        ```

    注意，命令输出包含找到搜索结果的 文件名 和 行号。终端会将此文本识别为链接。

1. 选择其中一个链接，即可在编辑器中打开该文件并定位到该特定行。

    ![导航到文件中的特定行](./images/getting-started/terminal-line-column.png)

了解更多关于[终端中链接](/docs/terminal/basics.md#links)的不同类型。

## 导航到之前的命令

在终端中工作时，你可能需要查看之前的命令及其输出，或者想重新运行某个命令。你可以使用键盘快捷键快速导航到之前的命令。

导航到之前的命令：

1. 打开你之前使用的终端。

1. 按下 `kb(workbench.action.terminal.scrollToPreviousCommand)` 键盘快捷键，滚动到终端历史记录中的上一条命令。

    注意，终端会滚动到上一条命令并将其高亮显示。

    ![导航到上一条命令](./images/getting-started/previous-command.png)

    如果你多次按下 `kb(workbench.action.terminal.scrollToPreviousCommand)`，终端会继续在命令历史记录中向前滚动。你可以使用 `kb(workbench.action.terminal.scrollToNextCommand)` 键盘快捷键向相反方向导航。

1. 你可能会在之前运行的命令旁边的装订线中看到一个圆形图标。选择该圆形图标，然后选择"**重新运行命令**"以再次运行该命令。

    ![重新运行命令](./images/getting-started/rerun-command.png)

了解更多关于[在命令历史记录中导航](/docs/terminal/shell-integration.md#command-navigation)。

## 在另一个 shell 中运行命令

终端支持同时打开多个终端。例如，你可以将一个终端专门用于运行 Git 命令，另一个终端用于运行构建脚本。你还可以根据偏好在不同的 shell 中运行命令。

在不同的 shell 中添加新终端：

1. 选择终端面板中的 `˅` 图标打开终端下拉菜单，然后从可用的 shell 中选择一个。

    > **注意**：可用的 shell 取决于你计算机上安装的 shell。

    ![选择不同的 shell](./images/getting-started/select-shell.png)

    一个新的终端会以所选 shell 打开，你可以在其中像之前一样输入命令。

    > **提示**：你也可以选择 `+` 图标为默认 shell 创建新终端，使用 `kb(workbench.action.terminal.new)` 键盘快捷键，或从菜单栏中选择"**终端**" > "**新建终端**"。

1. 你可以从终端面板的列表中查看已打开的终端。

    ![查看终端列表](./images/getting-started/terminal-list.png)

    要切换到另一个终端，从终端列表中选择它即可。

    > **提示**：你可以通过右键单击终端列表中的终端并选择"**重命名**"来重命名终端。

1. 将终端从终端列表拖到编辑器区域。

    该终端会移动到编辑器选项卡中，你可以像排列其他编辑器选项卡一样排列它。例如，你可以将终端选项卡拖出 VS Code 窗口使其成为浮动窗口。了解更多关于[自定义布局](/docs/configure/custom-layout.md#editor)的信息。

    ![将终端移动到编辑器区域](./images/getting-started/move-terminal.png)

1. 将鼠标悬停在终端列表上时，选择垃圾桶图标来关闭已打开的终端。

    ![关闭终端](./images/getting-started/close-terminal.png)

了解更多关于[管理终端](/docs/terminal/basics.md#managing-terminals)的信息。

## 后续步骤

在本教程中，你学习了如何在 VS Code 中开始使用终端。以下是一些可供进一步探索的主题：

* 了解[终端的基本概念和功能](/docs/terminal/basics.md)
* 探索如何[创建和管理终端配置文件](/docs/terminal/profiles.md)
* 发现[自定义终端外观和行为](/docs/terminal/appearance.md)的各种方法
