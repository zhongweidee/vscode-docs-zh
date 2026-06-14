---
ContentId: 3b6da7e6-c449-4c62-a019-9202412aac04
DateApproved: 8/7/2023
MetaDescription: 在 Visual Studio Code 中使用 Jupyter Notebook 时，内核选择选项的说明以及管理不同类型内核的教程。
MetaSocialImage: images/tutorial/python-social.png
---
# 在 VS Code 中管理 Jupyter 内核

Visual Studio Code 笔记本的内核选择器可帮助你为笔记本选择特定的内核。你可以通过单击笔记本右上角的"选择内核"按钮，或通过命令面板使用"**笔记本: 选择笔记本内核**"命令来打开内核选择器。

打开内核选择器后，VS Code 会显示最近使用（MRU）的内核：

![MRU Kernel](images/jupyter-kernel-management/mru-kernel.png)

> **注意**：在旧版本的 VS Code 中（1.76 版之前），VS Code 默认会显示所有可用的内核。

要查看其他内核，可以单击"**选择另一个内核...**"。所有现有的内核按其来源分为以下几类，这些来源由 Jupyter 扩展开箱即用地支持：

- [Jupyter 内核](#jupyter-kernels)
- [Python 环境](#python-environments)
- [现有 Jupyter 服务器](#existing-jupyter-server)

![Notebook Kernel Picker](images/jupyter-kernel-management/noterbook-kernel-picker.gif)

默认情况下，VS Code 会推荐你之前在笔记本中使用过的内核，但你也可以选择连接到如下所示的任何其他 Jupyter 内核。VS Code 还会记住你上次为笔记本选择的内核，并在下次打开笔记本时自动选择它。

## Jupyter 内核

**Jupyter 内核**类别列出了 VS Code 在其运行的计算系统（你的桌面、[GitHub Codespaces](https://github.com/features/codespaces)、远程服务器等）的上下文中检测到的所有 Jupyter 内核。每个 Jupyter 内核都有一个 Jupyter [内核规范](https://jupyter-client.readthedocs.io/en/stable/kernels.html#kernel-specs)（Jupyter kernelspec），其中包含一个 JSON 文件（`kernel.json`），记录内核的详细信息——名称、描述以及将进程作为内核启动所需的 CLI 信息。

## Python 环境

**Python 环境**类别列出了 VS Code 从其运行的计算系统（你的桌面、Codespaces、远程服务器等）中检测到的 Python 环境。它显示所有按类型分组的 Python 环境（例如 conda、venv）——无论是否安装了 [IPyKernel](https://ipython.readthedocs.io/en/stable/install/kernel_install.html)。

   > **注意**：你**无需**将 [jupyter](https://pypi.org/project/jupyter/) 安装到要使用的 Python 环境中。只需安装 IPyKernel 包即可将 Python 进程作为内核启动，并在你的笔记本中执行代码（`pip install ipykernel`）。访问 [Jupyter 扩展 wiki](https://github.com/microsoft/vscode-jupyter/wiki/Kernels-(Architecture)) 了解更多。

## 现有 Jupyter 服务器

**现有 Jupyter 服务器**类别列出了之前连接过的远程 Jupyter 服务器。你还可以使用此选项连接到远程或本地运行的现有 Jupyter 服务器。找到你的 Jupyter 服务器的 URL，例如 `http://<ip-address>:<port>/?token=<token>`，然后将其粘贴到"**输入正在运行的 Jupyter 服务器的 URL**"选项中，以连接到远程服务器，并使用该服务器对你的笔记本执行代码。

![Enter server URL](images/jupyter-kernel-management/select-enter-server-url.png)

启动远程服务器时，请确保：

1. 允许所有来源（例如 `--NotebookApp.allow_origin='*'`），以允许从外部访问你的服务器。
2. 将 notebook 设置为监听所有 IP（`--NotebookApp.ip='0.0.0.0'`）。

连接后，所有活动的 Jupyter 会话都将显示在此列表中。

你可以通过以下步骤从服务器的内核规范创建新会话：

1. 运行"**笔记本: 选择笔记本内核**"命令。
2. 选择"**选择另一个内核**"。
3. 选择"**现有 Jupyter 服务器**"。
4. 选择你的服务器。

## Codespaces Jupyter 服务器

**连接到 Codespace** 类别包含一种特殊类型的 Jupyter 服务器，你可以使用由 [GitHub Codespaces](https://docs.github.com/codespaces/overview) 提供支持的远程 Jupyter 服务器，这是一项云资源，每月可[免费使用长达 60 小时](https://github.com/features/codespaces)。要使用 Codespaces Jupyter 服务器：

1. 安装 [GitHub Codespaces 扩展](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces)。

    > **注意**：如果你使用的是 VS Code for the Web（[vscode.dev](https://vscode.dev) 或 [github.dev](https://github.dev)），该扩展已为你安装好。此外，请确保 [Jupyter 扩展](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)也已安装。

2. 转到命令面板（`kb(workbench.action.showCommands)`），选择"**Codespaces: 登录**"，然后按照步骤登录 Codespaces。

3. 通过单击笔记本右上角的"**选择内核**"来打开内核选择器，然后选择"**连接到 Codespace**"。

    > **提示**：如果你没有看到"**连接到 Codespace**"选项，请转到命令面板（`kb(workbench.action.showCommands)`），选择"**开发人员: 重新加载窗口**"以重新加载窗口，然后重试。

虽然不是必需的，但你也可以在 [GitHub Codespaces 页面](https://github.com/codespaces)上管理你的所有 Codespaces 和 Codespaces Jupyter 服务器。要了解更多信息，可以阅读 [GitHub Codespaces 文档](https://docs.github.com/codespaces/getting-started/understanding-the-codespace-lifecycle)。

## 添加内核选项

如果你的计算机上没有任何 Jupyter 内核或 Python 环境，VS Code 可以帮助你设置：转到命令面板（`kb(workbench.action.showCommands)`），选择"**Python: 创建环境**"，然后按照提示操作。你还可以通过安装其他扩展（如 [Azure Machine Learning](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.vscode-ai)）来添加其他选择内核的方式。

![More Kernel Sources](images/jupyter-kernel-management/more-kernel-sources.png)

## 问题或反馈

你可以在我们的仓库中创建 Issue 来添加[功能请求](https://github.com/microsoft/vscode-jupyter/issues/new?assignees=&labels=feature-request&template=3_feature_request.md)或[报告问题](https://github.com/microsoft/vscode-jupyter/issues/new?assignees=&labels=bug&template=1_bug_report.md)，我们的工程团队会积极监控和管理这些 Issue。
