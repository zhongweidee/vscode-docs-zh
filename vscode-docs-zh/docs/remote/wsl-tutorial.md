---
ContentId: 44988826-46b8-498a-b1c9-f821378c2870
MetaDescription: 使用 Visual Studio Code 在 Windows Subsystem for Linux 中进行开发
DateApproved: 6/10/2026
---
# WSL 中的远程开发

本教程将引导你启用 [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/install)（WSL），并使用 [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) 扩展在 WSL 中运行 Visual Studio Code。

## 前提条件

你需要安装 [Visual Studio Code](https://code.visualstudio.com/)。

### 安装扩展

WSL 扩展使你能在 Windows Subsystem for Linux（WSL）中运行 Visual Studio Code。

> <a class="install-extension-btn" href="vscode:extension/ms-vscode-remote.remote-wsl">安装 WSL 扩展</a>

![WSL extension](images/wsl-tutorial/remote-wsl-extension.png)

### 前提条件检查

安装 WSL 扩展后，你将在状态栏最左侧看到一个新的状态栏项。

![Remote Status bar item](images/wsl-tutorial/remote-status-bar.png)

远程状态栏项可以快速显示 VS Code 当前运行在哪个上下文中（本地或远程），点击该项将弹出 WSL 扩展命令。

![WSL extension commands](images/wsl-tutorial/wsl-commands.png)

## 启用 WSL

Windows Subsystem for Linux（WSL）是 Windows 10 上的可选功能。你可以通过 Windows 功能对话框或 PowerShell 来启用它。

### Windows 功能对话框

在 Windows 搜索栏中输入 'features' 以打开 **启用或关闭 Windows 功能** 对话框。向下滚动并勾选 **Windows Subsystem for Linux**。

![Turn Windows features on and off dialog](images/wsl-tutorial/windows-features.png)

选择 **确定**，系统将提示你重新启动 Windows。

### PowerShell

如果你愿意，也可以以管理员身份打开 PowerShell 并输入：

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

命令运行后，系统将提示你重新启动 Windows。

![PowerShell prompt to restart](images/wsl-tutorial/powershell-output.png)

### 检查 WSL

重新启动 Windows 后，你可以通过打开命令提示符并输入 'wsl' 来检查是否已启用 WSL。

![WSL check](images/wsl-tutorial/wsl-check.png)

WSL 已启用，但你尚未安装 Linux 发行版。

## 安装 Linux 发行版

你从 Microsoft Store 为 WSL 安装 Linux 发行版。你可以使用商店应用，或在 Windows 搜索栏中搜索 Linux 发行版。选择要安装的 Linux 发行版（例如 Ubuntu）并按照提示操作。

![select Ubuntu distro](images/wsl-tutorial/select-distro.png)

选择 **安装**。

![install Ubuntu](images/wsl-tutorial/install-ubuntu.png)

完成后，选择 **启动** 开始使用。这将打开一个 Linux 终端并完成安装。你需要创建用户 ID 和密码，因为你正在设置一个完整的 Linux 实例。现在你正在 Windows 上运行 Linux。

![Linux terminal](images/wsl-tutorial/linux-terminal.png)

## Python 开发

如果你尚未安装 Python，请运行以下命令在 Linux 安装中安装 Python3 和 pip（Python 的包管理器）。

```bash
sudo apt update
sudo apt install python3 python3-pip
```

要验证安装，请运行：

```bash
python3 --version
```

从经典的 "Hello World" 应用开始。创建一个名为 "helloWorld" 的新文件夹，然后添加一个 Python 文件，该文件在运行时会打印一条消息：

```bash
mkdir helloWorld && cd helloWorld
echo 'print("hello from python on ubuntu on windows!")' >> hello.py
python3 hello.py
```

在远程 Linux 环境中（此 WSL 发行版在技术上是另一台没有 UI 的机器，只是恰好在你计算机本地运行），你的开发工具和体验非常有限。你可以在终端中运行 [Vim](https://stackoverflow.blog/2017/05/23/stack-overflow-helping-one-million-developers-exit-vim/) 来编辑文件，或者可以通过 `\\wsl$` 装载点从 Windows 端编辑源文件：

![\\wsl$ mount](images/wsl-tutorial/wsl$-mount.png)

这种模式的问题是 Python 运行时、pip 或任何 conda 包都没有安装在 Windows 上。

![no Python on Windows](images/wsl-tutorial/no-python-on-windows.png)

请记住，Python 是安装在 Linux 发行版中的，这意味着如果你在 Windows 端编辑 Python 文件，除非你在 Windows 上安装相同的 Python 开发堆栈，否则无法运行或调试它们。而这完全违背了拥有一个安装了所有 Python 工具和运行时的独立 Linux 实例的初衷！

## 在 WSL 中运行

在 WSL 终端中，确保你位于 helloWorld 文件夹中，然后输入 `'code .'` 启动 Visual Studio Code。`'.'` 参数告诉 VS Code 打开当前文件夹。如果你使用的是 [Insiders](/insiders) 版本的 VS Code，则需要改为运行 `'code-insiders .'`。

> **注意：** 如果此命令不起作用，你可能需要重启终端，或者你可能在安装时未将 VS Code 添加到你的路径中。

![launch VS Code](images/wsl-tutorial/launch-code.png)

你首先会看到一条关于"正在安装 VS Code Server"的消息（c7d83e57… 这个数字是与刚刚安装的客户端工具匹配的 VS Code Server 版本号）。VS Code 正在 Linux 端安装一个小型服务器，桌面端 VS Code 将与之通信。该服务器随后将在 WSL 中安装并托管扩展，以便它们在 WSL 中安装的工具和框架的上下文中运行。换句话说，你的语言扩展将针对 WSL 中安装的工具和框架运行，而不是针对 Windows 端安装的内容运行，这样才能获得正确的开发体验。

接下来发生的事情是 VS Code 将启动并打开 `helloWorld` 文件夹。你可能会看到一条快速通知，告诉你 VS Code 正在连接到 WSL，并且可能会提示你允许访问基于 Node.js 的服务器。

![installing vscode server](images/wsl-tutorial/installing-vscode-server.png)

现在，当你悬停在 `hello.py` 上时，你会看到正确的 Linux 路径。

![show hello.py Linux path](images/wsl-tutorial/show-linux-path.png)

### 集成终端

运行 **终端** > **新建终端**（`kb(workbench.action.terminal.toggleTerminal)`）以打开一个新的终端实例。

![new terminal in WSL](images/wsl-tutorial/new-terminal-in-wsl.png)

你将再次从运行在 Windows 上的 VS Code 中启动一个新的 bash shell 实例。

**提示**：在状态栏的左下角，你可以看到你已连接到 **WSL: Ubuntu** 实例。

![WSL extension Status bar](images/wsl-tutorial/wsl-status-bar.png)

## 编辑与调试

### 安装 Python 扩展（及其他工具）

点击 `hello.py` 打开它进行编辑。系统会向你推荐扩展，此处是推荐安装 [Microsoft Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) 扩展，它将为你提供丰富的编辑和调试体验。继续选择 **安装**，如果出现提示则重新加载。

![Python extension recommendation](images/wsl-tutorial/python-extension-recommendation.png)

要证明该扩展已安装在 WSL 中，请再次打开扩展视图（`kb(workbench.view.extensions)`）。你将看到一个标题为 **WSL: Ubuntu – 已安装** 的部分，可以看到所有在 WSL 端安装的扩展。

![WSL installed extensions](images/wsl-tutorial/wsl-installed-extensions.png)

重新加载后，你还会收到提示，告诉你 pylint 代码检查工具未安装。代码检查工具用于在源代码中显示错误和警告。继续选择 **安装**。

![pylint not installed notification](images/wsl-tutorial/pylint-not-installed.png)

现在，当你编辑代码时，你会获得丰富的着色和代码补全功能。

![Python IntelliSense](images/wsl-tutorial/python-intellisense.png)

当你保存文件（`kb(workbench.action.files.save)`）时，你会在文件上看到代码检查的错误和警告。

![pylint error](images/wsl-tutorial/pylint-error.png)

### 调试

工具设置好后，让我们更进一步。在 hello.py 的第 1 行设置断点，方法是点击行号左侧的装订线，或将光标放在该行上并按 `kb(editor.debug.action.toggleBreakpoint)`。

![set breakpoint](images/wsl-tutorial/set-breakpoint.png)

现在，按 `kb(workbench.action.debug.start)` 运行你的应用程序。系统会询问你如何运行该应用程序，由于这是一个简单的文件，只需选择 **Python 文件**。

![select debug configuration](images/wsl-tutorial/select-debug-config.png)

应用程序将启动，你将在断点处暂停。你可以检查变量、创建监视以及导航调用堆栈。

按 `kb(workbench.action.debug.stepOver)` 单步执行，你将在调试控制台中看到打印语句的输出。

![VS Code debug view](images/wsl-tutorial/debug-view.png)

你将获得 Visual Studio Code 的完整开发体验，同时使用安装在 WSL 中的 Linux 实例。

如果你想在 WSL 中打开另一个文件夹，请打开 **文件** 菜单并选择 **打开文件夹**。你将看到一个 Linux 文件系统（而非 Windows 文件系统）的简化的文件和文件夹导航器。

![open folder navigator](images/wsl-tutorial/open-folder.png)

如果你想切换回 Windows，请选择 **显示本地** 选项，你将看到标准的 Windows 文件打开对话框。

### 结束 WSL 连接

你可以通过 **文件** > **关闭远程连接** 结束 WSL 中的会话并返回到本地运行 VS Code。

### 恭喜

恭喜，你已成功完成本教程！

接下来，请查看其他远程开发扩展。

* [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)
* [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

或者通过安装
[远程开发](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) 扩展包来一次性获取它们。
