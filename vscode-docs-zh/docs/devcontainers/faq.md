---
ContentId: c4784db6-ab00-4ac7-bca8-88edb638c593
MetaDescription: Visual Studio Code Dev Containers 常见问题解答与故障排除技巧
DateApproved: 6/10/2026
---
# Dev Containers 常见问题解答

本文涵盖了在不同环境中让 [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) 扩展正常运行的一些常见问题。

## "开发容器定义"是否定义了应用程序的部署方式？

不是。开发容器定义的是你在准备好部署之前开发应用程序的环境。虽然部署容器和开发容器可能彼此相似，但你未必希望在部署镜像中包含在开发过程中使用的工具。

[devcontainers/templates 仓库](https://github.com/devcontainers/templates)包含了一组适用于常见开发环境的开发容器定义。如果你更倾向于使用其他容器构建或部署工作流，也可以[附加到正在运行的容器](/docs/devcontainers/attach-container.md)，而无需设置开发容器定义。

## "开发容器定义"是否定义了应用程序的构建方式？例如 Buildpacks？

不是。[Buildpacks](https://buildpacks.io/) 的概念侧重于通过一系列定义的步骤获取源代码并生成可部署的容器镜像。而开发容器是你在准备好构建之前开发应用程序的环境。因此，它们是互补的概念。

## 尝试将本地文件系统挂载到容器中时看到错误

右键单击 Docker 任务栏项目。在 Windows 上，选择 **Settings** 菜单项，然后选择 **Resources > File Sharing**，并勾选源代码所在的驱动器。在 macOS 上，选择 **Preferences** 菜单项，然后选择 **Resources > File Sharing**，并确保包含源代码的文件夹位于列表中指定的文件路径下。

有关常见 Docker for Windows 问题的解决方法的更多信息，请参阅 [Docker Desktop for Windows 提示](/docs/devcontainers/tips-and-tricks.md#docker-desktop-for-windows-tips)。

## 看到关于缺少库或依赖项的错误

某些扩展依赖于在特定 Docker 镜像中找不到的库。例如，[Visual Studio Live Share](https://visualstudio.microsoft.com/services/live-share/) 需要安装系统级依赖项，这些依赖项[在其文档中列出](https://learn.microsoft.com/visualstudio/liveshare/reference/linux#install-prerequisites-manually)。对这些依赖项的需求可能取决于 Docker 镜像所使用的操作系统（例如，特定的 Linux 发行版）。你可能需要在 Docker 构建过程中通过向 Dockerfile 添加所需命令来安装这些依赖项。请搜索特定扩展的文档以检查依赖项，并参阅[安装额外软件](/docs/devcontainers/create-dev-container.md#install-additional-software)以获取解决问题的帮助。

## 能否同时连接到多个容器？

一个 VS Code 窗口当前只能连接到一个窗口，但你可以打开一个新窗口并[附加](/docs/devcontainers/attach-container.md)到已运行的容器，或者[使用包含多个 `devcontainer.json` 文件的通用 Docker Compose 文件](/remote/advancedcontainers/connect-multiple-containers.md)来进一步自动化该过程。

## 能否在远程主机上使用容器？

可以，请参阅[在远程 SSH 主机上打开文件夹](/docs/remote/ssh.md#open-a-folder-on-a-remote-ssh-host-in-a-container)或[在 Remote Tunnels 主机上的容器中打开文件夹](/docs/remote/tunnels.md#open-a-folder-on-a-remote-tunnels-host-in-a-container)的相关章节获取更多信息。

## 在容器内工作时，如何将容器镜像构建或部署到本地 Docker / Kubernetes 安装中？

你可以通过转发 Docker 套接字并在容器中安装 Docker CLI（以及 Kubernetes 的 kubectl）来构建镜像和部署容器。有关详细信息，请参阅 [Docker outside of Docker](https://github.com/devcontainers/templates/tree/main/src/docker-outside-of-docker)、[Docker outside of Docker Compose](https://github.com/devcontainers/templates/tree/main/src/docker-outside-of-docker-compose) 和 [Kubernetes-Helm](https://github.com/devcontainers/templates/tree/main/src/kubernetes-helm) 开发容器定义。

## VS Code Server 在容器中运行时的连接要求是什么？

安装 VS Code Server 要求你的本地计算机具有到以下地址的出站 HTTPS（端口 443）连接：

- `update.code.visualstudio.com`
- `vscode.download.prss.microsoft.com`

Dev Containers 扩展将在本地下载 VS Code Server，并在连接后将其复制到容器中。

你可以使用 **扩展: 从 VSIX 安装...** 命令在没有互联网连接的情况下手动安装扩展，但如果你使用扩展面板或 `devcontainer.json` 来安装扩展，则你的本地计算机和 VS Code Server 将需要到以下地址的出站 HTTPS（端口 443）访问权限：

- `marketplace.visualstudio.com`
- `*.gallerycdn.vsassets.io`（Azure CDN）

最后，某些扩展（如 C#）会从 `download.microsoft.com` 或 `download.visualstudio.microsoft.com` 下载辅助依赖项。其他扩展（如 [Visual Studio Live Share](https://learn.microsoft.com/visualstudio/liveshare/reference/connectivity#requirements-for-connection-modes)）可能有额外的连接要求。如果遇到问题，请查阅扩展的文档以了解详细信息。

VS Code Server 在容器内的随机端口上运行，VS Code 本身使用 `docker exec` 通过 Docker 配置的通信通道与其通信。

## 作为扩展作者，我需要做什么来确保我的扩展能正常工作？

VS Code 扩展 API 隐藏了远程运行的大部分实现细节，因此许多扩展无需任何修改即可在开发容器内正常工作。但是，我们建议你在开发容器中测试你的扩展，以确保其所有功能都按预期工作。有关详细信息，请参阅[支持远程开发](/api/advanced-topics/remote-extensions.md)一文。

## 还有哪些其他资源可能能够解答我的问题？

以下文章可能有助于解答你的问题：

* [高级容器配置](/remote/advancedcontainers/overview.md)或[提示与技巧](/docs/devcontainers/tips-and-tricks.md)
* [Dockerfile 参考](https://docs.docker.com/engine/reference/builder/)
* [Docker Compose 文件参考](https://docs.docker.com/compose/compose-file/)
* [Docker Desktop for Windows 故障排除指南](https://docs.docker.com/docker-for-windows/troubleshoot)和[常见问题解答](https://docs.docker.com/docker-for-windows/faqs/)
* [Docker Desktop for Mac 故障排除指南](https://docs.docker.com/docker-for-mac/troubleshoot)和[常见问题解答](https://docs.docker.com/docker-for-mac/faqs/)

## 能否在 VS Code 之外使用开发容器？

随着容器化生产工作负载变得普遍，开发容器已变得适用于 VS Code 之外的场景。我们正在创建[开发容器规范](https://containers.dev/implementors/spec)，以使任何人都能在任何工具中配置一致的开发环境。该规范旨在寻找方法，用通用的开发特定设置、工具和配置来丰富现有格式，同时仍然提供简化的、无需编排的单容器选项——以便它们可以用作编码环境，或用于持续集成和测试。

你可以在 [containers.dev](https://containers.dev) 了解更多信息并查阅规范，也可以在 GitHub 上的 [devcontainers/spec](https://github.com/devcontainers/spec) 仓库中查看活跃的提议并为规范做出贡献。
