---
ContentId: AF3D8F58-8F73-44CD-962C-B7F029E50478
DateApproved: 1/18/2023
MetaDescription: 关于使用 Visual Studio Code 开发和调试容器化应用时选择远程环境还是本地环境的指南。
PageTitle: 选择开发环境
---
# 你的开发环境

你可以选择在**本地环境**还是在**远程环境**中开发基于容器的服务。本地环境即你开发者工作站的操作系统；使用本地环境意味着你使用安装在工作站上的 Docker 来构建和运行服务容器。Windows、macOS 以及各种 Linux 发行版均支持 Docker；有关系统和硬件要求，请参阅 [Docker 安装页面](https://docs.docker.com/get-docker/)。

[远程开发环境](/docs/remote/remote-overview.md)不同于你的开发者工作站。它可以是通过 SSH 访问的远程机器、运行在开发者工作站上的虚拟机，或者一个开发容器。远程环境相比本地环境具有诸多优势，其中最主要的是能够在开发阶段使用与服务生产运行时相同的操作系统。要使用远程环境，你需要确保 `docker` 命令（Docker CLI）[在该环境中可用且能正常工作](#在远程开发环境内启用-docker-cli)。

第二个重要的选择是：将服务作为普通进程进行调试，还是将服务放在容器内进行调试。

## 选择开发环境的指南

1. 当你无需关心以下事项时，可使用本地环境：

   - 在开发环境中使用与服务容器内部相同的操作系统。
   - 在本地环境之上安装必要的工具和依赖项。

1. 如果需要远程环境，请优先考虑使用[开发容器](/docs/devcontainers/containers.md)。

    - 在 Windows 上，使用 [Windows Subsystem for Linux (WSL)](#windows-subsystem-for-linux) 是一个不错的选择。

1. 将服务放在容器内进行调试是可行的，但会增加额外的复杂性。默认情况下使用常规调试方式，仅在必要时使用容器内调试。

> 容器工具扩展原生支持对基于 .NET、Node.js 和 Python 的服务进行容器调试。

## 在远程开发环境内启用 Docker CLI

在远程开发环境内启用 Docker CLI 的方式因你选择的远程环境类型而异。

### 开发容器

对于开发容器，你应该将容器内的 Docker CLI 重定向到本地机器上运行的 Docker 守护进程。

首先，确保 Docker CLI 已安装到你的开发容器中。具体步骤[取决于容器所使用的 Linux 发行版](https://docs.docker.com/install/)。

以下是一个基于 Ubuntu 发行版的示例（来自 `.devcontainer/Dockerfile`）：

```sh
    ...
    && apt-get -y install software-properties-common \
    && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - 2>/dev/null \
    && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable" \
    && apt-get update -y \
    && apt-get install -y docker-ce-cli \
    && apt-get install -y python python-pip \
    && pip install docker-compose \
    ...
```

接下来，确保 Docker 套接字已映射到开发容器中（在 `.devcontainer/devcontainer.json` 中）：

```json
    ...
    "runArgs": [ "-v", "/var/run/docker.sock:/var/run/docker.sock"]
    ...
```

### Windows Subsystem for Linux

Windows Subsystem for Linux 对于在 Windows 上进行基于容器的服务开发是一个极佳的选择。强烈推荐使用 [Windows Subsystem for Linux version 2 (WSL 2)](https://learn.microsoft.com/windows/wsl/compare-versions#whats-new-in-wsl-2)。适用于 Windows 的 Docker Desktop 已更新以支持 WSL 2，并提供了图形化设置来在 WSL 2 发行版中启用 Docker CLI：

![Enable Docker inside WSL 2 distribution](images/devenv/devenv-enable-docker-wsl2.png)

> 要使用 WSL 2 进行 Docker 开发，你需要 Windows 10 版本 2004 或更新版本，以及适用于 Windows 的 Docker Desktop 版本 2.2.0.5 或更新版本。
>
> 旧版本的 WSL（WSL 1）不提供连接主机上 Docker 守护进程的简便方法。

### 远程机器

在远程机器上启用容器开发的推荐方法是[完整安装 Docker](https://docs.docker.com/install/)，包括 Docker 守护进程。

>**注意**：Docker Desktop 产品仅支持在物理 Windows 和 macOS 机器上运行，不支持虚拟机。如果你想使用虚拟机作为远程开发环境，我们建议使用安装了 [Docker Engine](https://docs.docker.com/engine/) 的 Linux 虚拟机。

在远程机器上安装 Docker 并能正常工作后，你可以使用 [远程开发](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) 扩展包中的 VS Code [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) 扩展连接到你的远程机器并在那里工作。

1. 打开 VS Code 命令面板（`kb(workbench.action.showCommands)`）并运行命令 **Remote-SSH: Add new SSH host...**。按照提示设置与目标主机的连接。

1. 运行命令 **Remote-SSH: Connect to host...** 并连接到该主机。

1. 一个新的 VS Code 窗口将会打开，并在目标机器的上下文中运行。如果你使用密码认证，此时会提示输入密码。为方便使用，我们强烈建议你设置 [SSH 密钥认证](https://www.ssh.com/ssh/public-key-authentication)。

1. 在扩展视图中，安装容器工具扩展（在远程主机上）（此步骤之后可能需要重新加载）：

   ![Screenshot - Installing the Container Tools extension](images/devenv/install-in-ssh.png)

>**注意**：如果你使用容器工具扩展来构建容器镜像并且有源代码，上述方法可能意味着你的源代码登记在远程主机上，而不是在你的开发者工作站上。如果你仅将容器工具扩展用于容器资源管理器功能，则可以忽略这一点。

### 本地 Linux 虚拟机

要使用运行在开发者工作站上的 Linux 虚拟机，你应该按照与在远程机器上安装相同的方式在虚拟机上[安装 Docker](https://docs.docker.com/install/)，然后使用 [VS Code Remote-SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) 扩展连接到该虚拟机。

或者，你可以仅在开发环境内安装 Docker CLI，并使用 [Docker 上下文机制](https://docs.docker.com/engine/context/working-with-contexts/) 将该 CLI 指向在开发者工作站上运行的 Docker 主机（引擎）。这种方法的主要问题是确保从虚拟机到主机上 Docker 引擎的网络连通性，并以安全的方式来实现。一种选择是使用 [SSH 隧道](/docs/containers/ssh.md) 或 [Remote - Tunnels](/docs/remote/tunnels.md) 连接到开发者工作站。另一种选择是[让 Docker 引擎监听 HTTPS 端口](https://docs.docker.com/engine/security/https/)。你需要精通 SSH 和公钥基础设施（PKI），才能在虚拟机内运行的 Docker CLI 中使用主机的 Docker 引擎。对于大多数用户，我们建议在虚拟机内完整安装 Docker。

## 在容器内调试

容器工具扩展支持调试在容器内运行的基于 .NET 和 Node.js 的服务。目前不支持其他编程语言。

在容器内调试可能比常规调试更难设置，因为容器是比进程更强的隔离机制。特别是：

- VS Code 进程内运行的调试引擎需要与被调试的服务进程通信。对于运行在容器内的服务，这意味着通过公共网络（通常是 Docker 主机网络）进行网络通信。容器需要通过 Docker 主机网络暴露适当的端口，以便调试引擎连接到服务进程（Node.js）或运行在容器内的调试器代理（.NET）。
- 构建时生成的源文件信息在构建环境（VS Code 运行的环境）的上下文中有效。容器的文件系统与构建环境的文件系统不同，因此源文件的路径需要重新映射，以便调试器在断点命中时能显示正确的源文件。

鉴于上述顾虑，通常建议使用常规调试，仅在必要时使用容器内调试。

有关如何设置在容器内进行调试的更多信息，请参阅 [ASP.NET Core 快速入门](/docs/containers/quickstart-aspnet-core.md)、[Node.js 快速入门](/docs/containers/quickstart-node.md) 以及[容器工具扩展任务属性](/docs/containers/reference.md)（`docker-build` 和 `docker-run` 任务）。

## 后续步骤

继续阅读以了解更多关于：

- [在容器中构建和运行 Node.js 应用](/docs/containers/quickstart-node.md)
- [在容器中构建和运行 ASP.NET Core 应用](/docs/containers/quickstart-aspnet-core.md)
