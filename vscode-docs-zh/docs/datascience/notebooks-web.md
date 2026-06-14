---
ContentId: 0faf5b06-ddad-4594-8d5e-fa409c7da82c
DateApproved: 1/9/2023
MetaDescription: 在网页上使用 Visual Studio Code 处理 Jupyter 笔记本。
MetaSocialImage: images/tutorial/python-social.png
---
# 在网页上使用 Jupyter 笔记本

Visual Studio Code 支持在桌面上使用 [Jupyter 笔记本](https://jupyter-notebook.readthedocs.io/en/latest/)，并扩展到各种基于浏览器的平台，如 [GitHub Codespaces](https://github.com/features/codespaces) 和 [VS Code for the Web](/docs/remote/vscode-web.md)。

使用这些基于浏览器的平台，您可以在不安装任何软件的情况下处理笔记本（甚至更多！）。您可以在下面详细了解每种选项以及如何开始：

- [在 **GitHub Codespaces** 上使用 Jupyter 笔记本](#在-codespaces-上使用-jupyter-笔记本)
- [通过 VS Code for the Web 使用 **VS Code Server** 进行远程隧道连接](#通过-vs-code-server-进行远程隧道连接)
- [在 VS Code for the Web 上连接到远程 **Jupyter 服务器**](#连接到远程-jupyter-服务器)

## 在 Codespaces 上使用 Jupyter 笔记本

在 VS Code 中开发 Jupyter 笔记本可以完全通过基于 Web 的界面完成，使用 [GitHub Codespaces](https://github.com/features/codespaces)，这是一个安全的、可配置的云托管开发环境，提供免费的计算资源（更多信息请参阅 Codespaces [月度用量配额](https://docs.github.com/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces)）。这意味着您可以利用 VS Code 的所有功能，包括 Jupyter 笔记本支持，而无需在计算机上安装任何东西。快速开始：

1. 导航到 [https://github.com/codespaces](https://github.com/codespaces)。
2. 在**探索快速启动模板**下，选择 **Jupyter Notebook** 对应的**使用此模板**。如果没有看到 **Jupyter Notebook** 模板，请选择**查看全部**并搜索该模板。

    ![使用 Codespaces Jupyter Notebook 模板](images/notebooks-web/codespaces-jupyter-template.png)

3. 就这样！一个 codespace 将被创建，供您开始使用！

   > **提示**：您可以通过将[配置文件](https://docs.github.com/codespaces/setting-up-your-project-for-codespaces/introduction-to-dev-containers)提交到仓库（通常称为代码即配置）来自定义项目，这将为您项目的所有用户创建可重复的 codespace 配置。您还可以在 [devcontainers/images 仓库](https://github.com/devcontainers/images/tree/main/src)中查看预定义配置的示例，以根据项目需要使用和/或修改。

## 在 VS Code for the Web 上使用 Jupyter 笔记本

您还可以通过访问 [https://vscode.dev](https://vscode.dev) 或 [https://github.dev](https://github.dev)（在 GitHub 上查看仓库时输入 '.' 即可访问）来使用 [VS Code for the Web](/docs/remote/vscode-web.md)。使用 VS Code for the Web 时，您有两种选择来为笔记本连接以下类型的内核：

1. [通过 VS Code Server 进行远程隧道连接](#通过-vs-code-server-进行远程隧道连接)
2. [连接到远程 Jupyter 服务器](#连接到远程-jupyter-服务器)

## 通过 VS Code Server 进行远程隧道连接

您可以通过在远程计算机上安装 [VS Code Server](/docs/remote/vscode-server.md) 并通过 VS Code for the Web 访问它，从而安全地连接到远程计算机，而无需 SSH（您也可以在 VS Code 桌面上连接到该服务器）。操作步骤如下：

1. 在远程计算机上安装 `code` [CLI](/download)。

   > **注意**：如果远程计算机上已安装 VS Code Desktop，则可以跳过此步骤，因为 `code` CLI 已内置在 VS Code Desktop 中。

2. 使用隧道命令创建[安全隧道](/docs/remote/tunnels.md)：`code tunnel`（如果您希望使用 VS Code 的[每日发布版本](/insiders)，也可以运行 `code-insiders tunnel`），然后按照提示授予服务器访问权限。这将在远程计算机上下载并启动 VS Code Server，然后创建到它的隧道。
3. 使用 CLI 输出的与此远程计算机关联的 vscode.dev URL，例如<br>`https://vscode.dev/tunnel/<machine_name>/<folder_name>`<br>在任何客户端上访问此远程计算机。
4. 打开一个笔记本文件，选择任何 Jupyter 内核或 Python 环境来运行您的代码。

## 连接到远程 Jupyter 服务器

您还可以通过粘贴以下格式的 URL 连接到任何远程 Jupyter 服务器：<br>`http://<ip-address>:<port>/?token=<token>`。

为此，选择 **Jupyter: Specify Jupyter Server for Connections** 命令，然后粘贴远程 Jupyter 服务器的 URL。

![输入 Jupyter 服务器](images/notebooks-web/select-enter-server-url.png)

在旧版本的 VS Code 和 Jupyter 扩展中输入远程 Jupyter 服务器 URL 的方法：

1. 点击状态栏上的 **Jupyter Server:**。

   ![Jupyter Server 状态栏项](images/notebooks-web/jupyter-status-bar.png)

2. 选择 **Existing**。

   ![从 Jupyter Server 下拉菜单中选择 Existing 选项](images/notebooks-web/select-existing-server.png)

在启动远程服务器时，请务必：

1. 允许所有来源（例如 `--NotebookApp.allow_origin='*'`），以允许从外部访问您的服务器。
2. 设置笔记本监听所有 IP（`--NotebookApp.ip='0.0.0.0'`）。

### 限制

由于 VS Code for the Web 完全在 Web 浏览器中运行，因此与桌面和 Codespaces 体验相比存在一些限制。

- 无法访问 VS Code 终端（不过您可以从笔记本单元格中运行[魔术命令](https://ipython.readthedocs.io/en/stable/interactive/magics.html)）
- 调试功能有限
- Python IntelliSense 部分支持
- 不支持 [isort](https://marketplace.visualstudio.com/items?itemName=ms-python.isort) 扩展

## 在 Codespaces 上继续工作

与 VS Code Desktop 一样，您可以轻松地从 VS Code for the Web（[https://vscode.dev](https://vscode.dev) 或 [https://github.dev](https://github.dev)）在 Codespaces 上继续工作。当您选择在新 codespace 中**继续工作**时，您未提交的更改将随您一起转移。操作步骤如下：

1. 打开命令面板（`kb(workbench.action.showCommands)`）并选择 **Continue Working On...**。
2. 选择 **Create New Codespace**。

   ![继续工作](images/notebooks-web/continue-working-on-codespaces.png)

3. 按照提示将您的工作更改存储在云端并登录 Codespaces。
4. 选择 codespace 的实例类型（核心数、RAM 和存储）。

您也可以通过**远程资源管理器**手动提交更改并创建 codespace：

1. 通过打开命令面板（`kb(workbench.action.showCommands)`）并选择 **Codespaces: Sign in** 来登录 Codespaces。
2. 从活动栏导航到**远程资源管理器**视图。

    ![远程资源管理器选项卡](images/notebooks-web/remote-explorer-tab.png)

从**远程资源管理器**视图中，您可以连接到现有 codespace 或创建新的 codespace。这将打开一个新窗口，供您在 Codespaces 上继续处理项目。

## 问题或反馈

您可以通过在我们的仓库中创建问题来添加[功能请求](https://github.com/microsoft/vscode-jupyter/issues/new?assignees=&labels=feature-request&template=3_feature_request.md)或[报告问题](https://github.com/microsoft/vscode-jupyter/issues/new?assignees=&labels=bug&template=1_bug_report.md)，我们的工程团队正在积极监控和管理该仓库。
