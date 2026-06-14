---
ContentId: 5d33c1af-b4e6-4894-aae1-acf95ee3ffa8
MetaDescription: 使用 Visual Studio Code Remote Tunnels 扩展
DateApproved: 6/10/2026
---
# 使用 Remote Tunnels 进行开发

Visual Studio Code [Remote - Tunnels](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-server) 扩展允许你通过安全隧道连接到远程计算机，例如桌面电脑或虚拟机 (VM)。你可以从任何地方的 VS Code 客户端连接到该计算机，而无需使用 SSH。

隧道技术通过 [Microsoft 开发隧道](https://learn.microsoft.com/azure/developer/dev-tunnels/overview)安全地将数据从一个网络传输到另一个网络。

这样一来，源代码就不需要存放在你的 VS Code 客户端计算机上了，因为该扩展会直接在远程计算机上运行命令和其他扩展。该扩展会在远程操作系统上安装 VS Code Server；该服务器独立于远程操作系统上任何现有的 VS Code 安装。

![Remote Tunnels architecture overview](images/vscode-server/server-arch-latest.png)

VS Code 可以提供**本地质量的开发体验**——包括完整的 IntelliSense（代码补全）、代码导航和调试——**无论你的代码托管在何处**。

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/SyLHXdXhE1U?si=J8ndBzVB0RPEsB7R" title="Access your computer anywhere with VS Code" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 入门指南

你有两种使用隧道的方式：

* 运行 `code` [命令行界面 (CLI)](/docs/configure/command-line.md#create-remote-tunnel) 的 `tunnel` 命令。
* 通过 VS Code 桌面版用户界面启用隧道。

这两种方式都能实现相同的隧道功能——你可以使用最适合你的工具。如果你无法在远程计算机上安装完整的 VS Code 桌面版，CLI 是一个很好的选择。如果你已经在 VS Code 中进行一些工作，并且希望为当前计算机启用隧道，那么使用 VS Code 桌面版用户界面会很方便。

我们将在下面的章节中介绍这两种方式。

## 使用 'code' CLI

你可以通过 `code` [CLI](/docs/configure/command-line.md) 创建和使用隧道。

1. 在你想通过 VS Code 客户端进行开发的远程计算机上安装 `code` CLI。CLI 会在 VS Code 客户端和你的远程计算机之间建立隧道。CLI 会自动内置于 VS Code 桌面版中——无需额外设置。

    ### 其他下载方式

    或者，你也可以通过我们下载页面上的[独立安装包](https://code.visualstudio.com/#alt-downloads)获取 CLI，该安装包独立于 VS Code 桌面版安装：

    ![VS Code download options with CLI highlighted](images/tunnels/tunneling-download.png)

    你还可以通过远程计算机的终端安装和解压 CLI。如果你的远程计算机没有用户界面，这可能会特别有帮助：

    ```bash
    curl -Lk 'https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64' --output vscode_cli.tar.gz

    tar -xf vscode_cli.tar.gz
    ```

    > **注意：** 如果你使用的是独立安装或终端安装，以下章节中的命令将以 `./code` 而不是 `code` 开头。

2. 使用 `tunnel` 命令创建安全隧道：

    ```bash
    code tunnel
    ```

    此命令会下载并在此计算机上启动 VS Code Server，然后创建到它的隧道。

    >**注意：** 当你在计算机上首次启动隧道时，系统会提示你接受服务器许可条款。你也可以在命令行中传递 `--accept-server-license-terms` 来避免该提示。

3. 此 CLI 将输出一个与该远程计算机关联的 vscode.dev URL，例如 `https://vscode.dev/tunnel/<machine_name>/<folder_name>`。你可以在自选的客户端上打开此 URL。

4. 在此客户端上首次打开 vscode.dev URL 时，系统会提示你通过 `https://github.com/login/oauth/authorize...` URL 登录你的 GitHub 账户。这会将你身份验证到隧道服务，以确保你有权访问正确的远程计算机集合。

## 使用 VS Code 用户界面

1. 在你想要启用隧道访问的远程计算机上打开 VS Code。

2. 在 VS Code 账户菜单中，选择**启用远程隧道访问**选项，如下图所示。你也可以在 VS Code 中打开命令面板 (`kbstyle(F1)`) 并运行命令 **Remote Tunnels: Turn on Remote Tunnel Access...**。

    ![Turn on Remote Tunnel Access via the VS Code Account menu](images/tunnels/tunnel-access.png)

3. 系统会提示你登录 GitHub。登录后，隧道将在当前计算机上启动，你将能够远程连接到此计算机。

    ![Prompt that remote tunnel access is enabled](images/tunnels/tunneling-enabled.png)

4. 在你自选的客户端中，你可以打开上述通知中的 vscode.dev 链接并开始编码！

>**注意：** 只有当 VS Code 在远程计算机上保持运行时，才能通过隧道访问该计算机。一旦你退出 VS Code，就无法再通过隧道连接到它，除非你再次在那里启动 VS Code 或运行 `code tunnel` CLI 命令。

## Remote Tunnels 扩展

你通过 `code` CLI 或 VS Code 用户界面打开的 vscode.dev 实例，已预装了 Remote - Tunnels 扩展。

如果你已经在 VS Code（桌面版或网页版）中工作，并希望连接到远程隧道，你可以直接安装并使用 [Remote - Tunnels](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-server) 扩展。安装该扩展后，打开命令面板 (`kbstyle(F1)`) 并运行命令 **Remote Tunnels: Connect to Tunnel**。你将能够连接到任何具有活动隧道的远程计算机。

你还可以在远程资源管理器中查看你的远程计算机，你可以通过命令 **Remote Explorer: Focus on Remote View** 来聚焦到该视图：

![Remote Explorer view with Tunnels](images/tunnels/tunneling-remote-explorer.png)

与其他远程开发扩展一样，你的远程计算机名称将列在左下角的绿色远程指示器中。点击此指示器是探索 Remote Tunnels 命令的另一种方式，同时还提供了关闭远程连接或安装 VS Code 桌面版的选项。

![VS Code remote indicator connected to a remote tunnel](images/vscode-server/remote-indicator-server.png)

### 在 Remote Tunnels 主机上的容器中打开文件夹

你可以同时使用 Remote - Tunnels 和 [Dev Containers](/docs/devcontainers/containers.md) 扩展，在远程主机上的容器内打开文件夹。你甚至不需要在本地安装 Docker 客户端。

操作步骤如下：

1. 按照远程主机上安装 Docker 的[安装](/docs/devcontainers/containers.md#installation)步骤，并在本地安装 VS Code 和 Dev Containers 扩展。
1. 按照 Remote - Tunnels 扩展的[入门指南](#getting-started)说明设置隧道、连接隧道并在那里打开文件夹。
1. 从命令面板 (`kbstyle(F1)`, `kb(workbench.action.showCommands)`) 中使用 **Dev Containers: Reopen in Container** 命令。

[Dev Containers 快速入门](/docs/devcontainers/containers.md#quick-start-open-an-existing-folder-in-a-container)的其余部分同样适用。你可以在其文档中了解有关 [Dev Containers 扩展](/docs/devcontainers/containers.md)的更多信息。如果此模式不满足你的需求，你还可以查看[在远程 Docker 主机上开发](/remote/advancedcontainers/develop-remote-host.md)一文以了解其他选项。

## 常见问题

### Remote Tunnels、VS Code Server 和远程开发之间的关系是什么？

Visual Studio Code [远程开发](/docs/remote/remote-overview.md)允许你将容器、远程计算机或 Windows Subsystem for Linux (WSL) 用作全功能开发环境。

远程开发通过将某些命令的执行转移到"远程服务器"（即 VS Code Server）上，使你本地的 VS Code 安装能够透明地与源代码以及其他计算机（无论是虚拟的还是物理的）上的运行时环境进行交互。VS Code Server 会在你连接到远程端点时由 VS Code 快速安装，并且可以托管直接与远程工作区、计算机和文件系统交互的扩展。

我们已将这个 VS Code Server 后端组件作为一个你可以自行运行的服务发布（你可以在其[文档](/docs/remote/vscode-server.md)中阅读更多相关信息），而不仅仅是由远程开发扩展单独安装和管理。

访问 VS Code Server 涉及几个组件：

* VS Code Server：使 VS Code 远程体验成为可能的后端服务器。
* Remote - Tunnels 扩展：促进与运行服务器实例的远程计算机连接的扩展。

### 作为扩展作者，我需要做什么？

VS Code 扩展 API 抽象了本地/远程的细节，因此大多数扩展无需修改即可工作。然而，由于扩展可以使用任何 node 模块或运行时，某些情况下可能需要进行调整。我们建议你测试你的扩展以确认不需要任何更新。有关详细信息，请参阅[支持远程开发](/api/advanced-topics/remote-extensions.md)。

### 多个用户或客户端可以同时访问同一个远程实例吗？

不可以，一个服务器实例设计为一次只能由一个用户或客户端访问。

### 如何删除隧道或计算机？

如果你想停止通过 CLI 运行的隧道，可以使用 `kbstyle(Ctrl + C)` 结束活动隧道。如果你通过 VS Code 用户界面启用了隧道，可以在 VS Code 中运行命令 **Remote Tunnels: Turn off Remote Tunnel Access...**。

你可以通过在计算机上运行 `code tunnel unregister` 来取消计算机与隧道的关联。你也可以打开任何 VS Code 客户端，选择远程资源管理器视图，右键单击要删除的计算机，然后选择 **取消注册**。

### 隧道是如何保障安全的？

托管和连接隧道都需要在两端使用相同的 GitHub 或 Microsoft 账户进行身份验证。在这两种情况下，VS Code 都会建立到 Azure 中托管服务的出站连接；通常不需要更改防火墙，并且 VS Code 不会设置任何网络侦听器。

一旦你从远程 VS Code 实例连接，就会通过隧道创建 SSH 连接，以提供端到端加密。此加密当前首选密码是 CTR 模式下的 AES 256，实现此加密的代码是[开源的](https://github.com/microsoft/dev-tunnels)。

你可以在其[文档](https://learn.microsoft.com/azure/developer/dev-tunnels/security)中了解有关底层开发隧道服务安全性的更多信息。

### 隧道服务是否有使用限制？

为了防止底层隧道服务被滥用，我们对隧道数量和带宽等资源设置了使用限制。我们预计大多数用户不会达到这些限制。

例如，目前你的账户可以注册 10 个隧道。如果你想创建新隧道但已有 10 个其他注册的隧道，CLI 将随机选择一个未使用的隧道并将其删除。请注意，此限制可能会发生变化。

### 我可以跨组织配置策略吗？

如果你所在的组织想要控制端口转发的访问权限，可以通过允许或拒绝访问域名 `global.rel.tunnels.api.visualstudio.com` 来实现。

对于运行 Windows 设备的用户，你还可以配置并部署开发隧道的组策略设置。你可以在[开发隧道文档](https://learn.microsoft.com/azure/developer/dev-tunnels/policies)中了解更多信息。

### 如何确保我的隧道保持运行？

你有以下几种选择：

* 使用 `service` 命令以服务方式运行。你可以运行 `code tunnel service install` 和 `code tunnel service uninstall` 来安装和移除它们。
* 使用 `no-sleep` 选项 `code tunnel --no-sleep` 来防止你的远程计算机进入睡眠状态。

正如 [`code` CLI 文档](/docs/configure/command-line.md#create-remote-tunnel)中提到的，你可以通过 `code tunnel --help` 探索所有可能的 CLI 命令和选项。

### 在使用隧道时，我可以使用其他远程开发扩展或开发容器吗？

可以！目前，你可以通过 Remote - Tunnels 连接到 [WSL](/docs/remote/wsl.md) 和[开发容器](/docs/devcontainers/containers.md#open-a-folder-on-a-remote-tunnel-host-in-a-container)。
