---
ContentId: 4B462667-8915-4BE0-B8D0-EDE51CB2D273
DateApproved: 12/1/2023
MetaDescription: 使用 Visual Studio Code 进行容器开发与调试的工具。
---
# Visual Studio Code 中的容器

[容器工具](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-containers)扩展使得在 Visual Studio Code 中构建、管理和部署容器化应用程序变得轻松简单。

本页概述了容器工具扩展的功能；请使用侧边菜单了解感兴趣的主题。如果您是容器开发的新手，建议先阅读 [Docker 教程](https://learn.microsoft.com/visualstudio/docker/tutorials/docker-tutorial) 以理解关键的 Docker 概念。

## 安装

在您的机器上[安装 Docker](https://docs.docker.com/install/) 并将其添加到系统路径中。

在 Linux 上，您还应该为用于运行 VS Code 的[非 root 用户账户启用 Docker CLI](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user)。

要安装该扩展，请打开扩展视图（`kb(workbench.view.extensions)`），搜索 `container tools` 以筛选结果，然后选择由 Microsoft 发布的容器工具扩展。

![选择容器工具扩展](images/overview/installation-extension-search.png) <!-- TODO: 图片需要更新 -->

## 编辑 Docker 文件

在编辑 `Dockerfile` 和 `docker-compose.yml` 文件时，点击 `kb(editor.action.triggerSuggest)` 即可获得 [IntelliSense](/docs/editing/intellisense.md) 支持，包括常用命令的自动补全和语法帮助。

![Dockerfile 的 IntelliSense](images/overview/dockerfile-intellisense.png)

此外，您还可以使用问题面板（`kb(workbench.actions.view.problems)`）来查看 `Dockerfile` 和 `docker-compose.yml` 文件中的常见错误。

## 生成 Docker 文件

您可以通过打开命令面板（`kb(workbench.action.showCommands)`）并使用 **容器: 将 Docker 文件添加到工作区** 命令来向工作区添加 Docker 文件。该命令将生成 `Dockerfile` 和 `.dockerignore` 文件并将它们添加到您的工作区中。该命令还会询问您是否同时添加 Docker Compose 文件，但这是可选的。

该扩展可以为大多数主流开发语言（C#、Node.js、Python、Ruby、Go 和 Java）搭建 Docker 文件框架，并相应地自定义生成的 Docker 文件。当这些文件创建时，我们还会创建必要的工件，以为 Node.js、Python 和 .NET（C#）提供调试支持。

## 容器资源管理器

容器工具扩展为 VS Code 提供了一个容器资源管理器视图。容器资源管理器允许您检查和管理容器资产：容器、镜像、卷、网络和容器注册表。如果您已登录 Microsoft 账户且该账户有权访问 Azure 订阅，您还可以浏览您的 Azure 容器注册表。

右键菜单提供了对每种资产类型常用命令的访问。

![容器资源管理器上下文菜单](images/overview/docker-view-context-menu.gif)

您可以通过鼠标拖拽来重新排列容器资源管理器窗格的位置，并使用上下文菜单来隐藏或显示它们。

![自定义容器资源管理器](images/overview/docker-view-rearrange.gif)

## 容器命令

许多最常用的容器相关命令都直接内置在命令面板中：

![容器命令](images/overview/command-palette.png)

您可以运行命令来管理[镜像](https://docs.docker.com/engine/reference/commandline/image/)、[网络](https://docs.docker.com/engine/reference/commandline/network/)、[卷](https://docs.docker.com/engine/reference/commandline/volume/)、[镜像注册表](https://docs.docker.com/engine/reference/commandline/push/)和 [Docker Compose](https://docs.docker.com/compose/reference/overview/)。此外，**容器: 清理系统** 命令将移除已停止的容器、悬空镜像以及未使用的网络和卷。

## Docker Compose

[Docker Compose](https://docs.docker.com/compose/) 允许您使用 Docker 定义和运行多容器应用程序。容器工具扩展中的 [Compose 语言服务](https://github.com/microsoft/compose-language-service) 在编写 `docker-compose.yml` 文件时为您提供 IntelliSense 和 Tab 自动补全功能。按下 `kb(editor.action.triggerSuggest)` 即可查看有效的 Compose 指令列表。

![Docker Compose IntelliSense](images/overview/tab-completions.gif)

当您悬停在 Docker Compose YAML 属性上时，我们还会提供工具提示。

![Docker Compose 工具提示](images/overview/hover-support.png)

`Compose Up` 允许您一次性运行所有服务，而我们的新功能 `Compose Up - 选择服务` 则允许您选择任意组合的服务来运行。

![Docker Compose Up - 选择子集](images/overview/select-subset.gif)

`Compose Up` 命令完成后，导航到容器资源管理器即可以 Compose 组的形式查看您的服务。这使您可以作为一个组启动、停止和查看每个服务的日志。

![Docker Compose 组](images/overview/compose-group.png)

## 使用镜像注册表

您可以显示内容，并从 [Azure 容器注册表](https://learn.microsoft.com/azure/container-registry)、[Docker Hub](https://hub.docker.com/)、[GitHub](https://github.com/) 等推送、拉取或删除镜像：

![Azure 容器注册表内容](images/overview/container-registry.png)

Azure 容器注册表中的镜像可以直接从 VS Code 部署到 Azure App Service 或 Azure 容器应用。请参阅[部署到 Azure](/docs/containers/app-service.md) 以开始使用。有关如何对注册表进行身份验证和操作的更多信息，请参阅[使用容器注册表](/docs/containers/quickstart-container-registries.md)。

## 调试容器内运行的服务

您可以调试在容器内运行的、使用 .NET（C#）和 Node.js 构建的服务。该扩展提供了自定义任务，有助于在调试器下启动服务以及将调试器附加到正在运行的服务实例。有关更多信息，请参阅[调试容器化应用](/docs/containers/debug-common.md) 和[自定义容器工具扩展](/docs/containers/reference.md)。

## Azure CLI 集成

您可以使用 **容器镜像: 运行 Azure CLI** 命令在独立的、基于 Linux 的容器中启动 Azure CLI（命令行界面）。这使您可以在隔离的环境中访问完整的 Azure CLI 命令集。有关可用命令的更多信息，请参阅 [Azure CLI 入门](https://learn.microsoft.com/cli/azure/get-started-with-azure-cli)。

## 后续步骤

继续阅读以了解更多关于以下内容的信息：

- [选择您的开发环境](/docs/containers/choosing-dev-environment.md)
- [在容器中构建和运行 Node.js 应用](/docs/containers/quickstart-node.md)
- [在容器中构建和运行 .NET 应用](/docs/containers/quickstart-aspnet-core.md)
- [在 Docker 容器中调试应用](/docs/containers/debug-common.md)
- [故障排除](/docs/containers/troubleshooting.md)
