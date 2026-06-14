---
ContentId: eceea3f0-feee-47c2-8b65-1f1b0825355b
MetaDescription: Visual Studio Code 远程开发
DateApproved: 6/10/2026
---
# VS Code 远程开发

**Visual Studio Code 远程开发**允许你将容器、远程计算机或 [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl)（WSL）用作功能齐全的开发环境。你可以：

- 在你**部署的同一操作系统**上进行开发，或使用**更强大或更专业**的硬件。
- **隔离**你的开发环境，以避免影响本地**计算机配置**。
- 让新贡献者轻松**上手**，并使每个人都处于**一致的环境**中。
- 使用本地操作系统上**不可用**的工具或运行时，或管理其**多个版本**。
- 使用 **Windows Subsystem for Linux** 开发你的 Linux 部署应用程序。
- 从**多台计算机或多个位置**访问**现有的**开发环境。
- 调试**在其他地方运行的应用程序**，例如客户站点或云端。

**无需在本地计算机上存放任何源代码**即可获得这些好处。[远程开发扩展包](https://aka.ms/vscode-remote/download/extension)中的每个扩展都可以直接在容器内、WSL 中或远程计算机上运行命令和其他扩展，因此一切都像在本地运行时一样。这些扩展会在远程操作系统上安装 VS Code Server；该服务器独立于远程操作系统上任何现有的 VS Code 安装。

![Architecture](images/remote-overview/architecture.png)

## 入门

### 远程开发扩展包

[远程开发扩展包](https://aka.ms/vscode-remote/download/extension)包含四个扩展。请参阅以下文章以开始使用它们：

- [Remote - SSH](/docs/remote/ssh.md) - 通过 SSH 在远程计算机/虚拟机上打开文件夹，连接到任意位置。
- [Dev Containers](/docs/devcontainers/containers.md) - 在容器内部（或挂载到容器中）使用单独的工具链或基于容器的应用程序。
- [WSL](/docs/remote/wsl.md) - 在 Windows Subsystem for Linux 中获得 Linux 驱动的开发体验。
- [Remote - Tunnels](/docs/remote/tunnels.md) - 通过安全隧道连接到远程计算机，无需配置 SSH。

虽然大多数 VS Code 扩展在远程环境中应该可以不加修改地工作，但扩展作者可以在[支持远程开发](/api/advanced-topics/remote-extensions.md)中了解更多信息。

## 远程教程

以下教程将指导你使用远程开发扩展运行 Visual Studio Code。

教程 | 描述
--- | ---
[通过 SSH 远程连接](/docs/remote/ssh-tutorial.md) | 通过 SSH 使用 Visual Studio Code 连接到远程和虚拟机。
[在 WSL 中工作](/docs/remote/wsl-tutorial.md) | 在 Windows Subsystem for Linux 中运行 Visual Studio Code。
[在容器中开发](/docs/devcontainers/tutorial.md) | 在 Docker 容器中运行 Visual Studio Code。
[GitHub Codespaces](https://docs.github.com/github/developing-online-with-codespaces/using-codespaces-in-visual-studio-code) | 使用 Visual Studio Code 连接到 codespace。

## GitHub Codespaces

[GitHub Codespaces](/docs/remote/codespaces.md) 提供为你管理的远程开发环境。你可以配置并创建托管在云端的开发环境，该环境会在你需要时启动并可用。

## 问题或反馈

- 参阅[提示和技巧](/docs/remote/troubleshooting.md)或[常见问题解答](/docs/remote/faq.md)。
- 在 [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-remote) 上搜索。
- 提交[功能请求](https://aka.ms/vscode-remote/feature-requests)或[报告问题](https://aka.ms/vscode-remote/issues/new)。
