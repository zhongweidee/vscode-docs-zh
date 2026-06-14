---
ContentId: 8e1fb9e0-1a67-4e0c-a21b-c5ab9a6d979c
MetaDescription: Visual Studio Code 开发容器入门指南
DateApproved: 6/10/2026
---
# 开发容器教程

本教程将引导你使用[开发容器](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)扩展在 [Docker](https://www.docker.com/) 容器中运行 Visual Studio Code。你无需具备任何 Docker 相关知识即可完成本教程。

在 Docker 容器**内部**运行 VS Code 有很多好处，但在本教程中，我们将重点介绍如何使用 Docker 容器建立一个与本地环境分离的开发环境。

## 先决条件

你需要安装 [Visual Studio Code](https://code.visualstudio.com/)。

## 安装 Docker

需要 Docker 来创建和管理你的容器。

### Docker Desktop

下载并安装 [Docker Desktop](https://www.docker.com/products/docker-desktop)，或[其他 Docker 选项](/remote/advancedcontainers/docker-options.md)，例如远程主机上的 Docker 或兼容 Docker 的 CLI。

### 启动 Docker

运行 Docker Desktop 应用程序以启动 Docker。如果你在活动托盘中看到 Docker 鲸鱼图标，就说明它正在运行。

Docker 可能需要几分钟才能启动。如果鲸鱼图标在动，很可能仍在启动过程中。你可以点击图标查看状态。

![Docker status](images/tutorial/docker-status.png)

### 检查 Docker

Docker 启动后，你可以打开一个**新的**终端窗口，输入以下命令来确认一切正常：

```bash
docker --version
# Docker version 18.09.2, build 6247962
```

## 安装扩展

开发容器扩展让你可以在 Docker 容器中运行 Visual Studio Code。

> <a class="install-extension-btn" href="vscode:extension/ms-vscode-remote.remote-containers">安装开发容器扩展</a>

![Dev Containers extension](images/tutorial/dev-containers-extension.png)

### 检查安装情况

安装开发容器扩展后，你会在最左侧的状态栏中看到一个新的状态栏项。

![Remote Status bar item](images/tutorial/remote-status-bar.png)

远程状态栏项可以快速显示 VS Code 当前运行的环境（本地或远程），点击该项将打开开发容器命令。

![Dev Containers commands](images/tutorial/dev-containers-commands-simple.png)

## 获取示例

要创建 Docker 容器，我们将打开一个包含 Node.js 项目的 GitHub 仓库。

打开命令面板（`F1`）以运行命令 **开发容器：试用开发容器示例...**，然后从列表中选择 Node 示例。

![Select a sample from the list](images/containers/select-a-sample.png)

**注意**：还有其他开发容器示例，如 `vscode-remote-try-python` 或 `vscode-remote-try-java`，但本教程将使用 `vscode-remote-try-node`。

### 等待容器构建

窗口将重新加载，但由于容器尚不存在，VS Code 将创建一个容器，并将示例仓库克隆到一个隔离的[容器卷](https://docs.docker.com/storage/volumes/)中。这可能需要一些时间，进度通知会提供状态更新。幸运的是，下次打开该文件夹时就不需要此步骤了，因为容器已经存在。

![Dev Container Progress Notification](images/containers/dev-container-progress.png)

容器构建完成后，VS Code 会自动连接到容器，并将项目文件夹从本地文件系统映射到容器中。

### 检查容器

容器运行并成功连接后，你应该会在状态栏的左下角看到远程环境变化：

![Building image](images/tutorial/connected.png)

## 检查你的环境

在容器中进行开发的一个好处是，你可以使用应用程序所需的特定版本的依赖项，而不会影响本地开发环境。

本教程使用的特定容器安装了 Node.js v18，你可以通过打开新终端**终端** > **新建终端**（`kb(workbench.action.terminal.new)`）并输入以下命令来验证：

```bash
node --version; npm --version
```

应该会显示以下版本：

![Node.js version check](images/tutorial/version-check-updated.png)

### 运行应用程序

现在我们可以按 `kb(workbench.action.debug.start)`，这将在容器内运行应用程序。进程启动后，导航到 [http://localhost:3000](http://localhost:3000)，你应该会看到运行中的简单 Node.js 服务器！

![Running the application](images/tutorial/hello-remote-world.png)

### 结束容器连接

你可以通过**文件** > **关闭远程连接**来结束在容器中的会话，并返回到本地运行 VS Code。

## 工作原理

下一节将更详细地介绍开发容器扩展如何设置和配置你的容器。

开发容器扩展使用 `.devcontainer` 文件夹中的文件，即 `devcontainer.json` 以及可选的 `Dockerfile` 或 `docker-compose.yml`，来创建你的开发容器。

在我们刚才探索的示例中，该项目有一个 `.devcontainer` 文件夹，其中包含一个 `devcontainer.json`。`devcontainer.json` 使用了镜像 `mcr.microsoft.com/devcontainers/javascript-node:0-18`。你可以在 [devcontainers/images](https://github.com/devcontainers/images/tree/main/src/javascript-node) 仓库中了解更多关于此镜像的详细信息。

首先，你的镜像是根据提供的 Dockerfile 或镜像名称构建的，在本示例中就是 `mcr.microsoft.com/devcontainers/javascript-node:0-18`。然后，使用 `devcontainer.json` 中的一些设置创建并启动容器。最后，根据 `devcontainer.json` 中的设置再次安装和配置你的 Visual Studio Code 环境。例如，本示例中的开发容器安装了 `streetsidesoftware.code-spell-checker` 扩展。

> **注意：** 基本镜像中的内容已经添加到容器的附加配置中。例如，我们上面看到了 `streetsidesoftware.code-spell-checker` 扩展，而容器还将包含 `"dbaeumer.vscode-eslint"`，因为[它是 `mcr.microsoft.com/devcontainers/typescript-node` 的一部分](https://github.com/devcontainers/images/blob/main/src/javascript-node/.devcontainer/devcontainer.json#L27)。这在使用 devcontainer.json 进行预构建时会自动完成，你可以在[预构建部分](/docs/devcontainers/containers.md#prebuilding-dev-container-images)中了解更多信息。

完成后，你的本地 Visual Studio Code 副本将连接到运行在新开发容器内的 Visual Studio Code Server。

![Architecture](../remote/images/remote-overview/architecture.png)

### devcontainer.json

`devcontainer.json` 本质上是一个配置文件，决定了你的开发容器如何被构建和启动。

```json
//devcontainer.json
{
    "name": "Node.js",

    // 或使用 Dockerfile 或 Docker Compose 文件。更多信息：https://containers.dev/guide/dockerfile
    "image": "mcr.microsoft.com/devcontainers/javascript-node:0-18",

    // 要添加到开发容器的功能。更多信息：https://containers.dev/features。
    // "features": {},

    "customizations": {
        "vscode": {
            "settings": {},
            "extensions": [
                "streetsidesoftware.code-spell-checker"
            ]
        }
    },

    // "forwardPorts": [3000],

    "portsAttributes": {
        "3000": {
            "label": "Hello Remote World",
            "onAutoForward": "notify"
        }
    },

    "postCreateCommand": "yarn install",

    // "remoteUser": "root"
}
```

以上示例提取自本教程中使用的 `vscode-remote-try-node` 仓库。

| 选项 | 描述 |
|---|---|
| `image` | VS Code 应用于创建开发容器的容器注册表（[Docker Hub](https://hub.docker.com/)、[GitHub Container Registry](https://docs.github.com/packages/guides/about-github-container-registry)、[Azure Container Registry](https://azure.microsoft.com/services/container-registry/)）中的镜像名称。<br> |
| `dockerfile` | 除了引用 `image` 外，你还可以使用 `dockerfile` 属性，它是你要用作镜像的 `Dockerfile` 的相对路径。 |
| `features` | 包含要添加的[开发容器功能](/docs/devcontainers/containers.md#dev-container-features) ID 及相关选项的对象。 |
| `customizations` | 配置工具特定的属性，例如 VS Code 的 `settings` 和 `extensions` 属性。 |
| `settings`  | 将默认的 `settings.json` 值添加到容器/机器特定的设置文件中，例如 `"terminal.integrated.defaultProfile.linux": "bash"`。 |
| `extensions`  | 指定容器创建时应在其中安装的扩展的扩展 ID 数组。 |
| `forwardPorts`  | 使容器内的端口列表在本地可用。 |
| `portsAttributes` | 为特定转发端口设置默认属性。 |
| `postCreateCommand`  | 创建容器后要运行的命令字符串或命令参数列表。 |
| `remoteUser`  | 覆盖 VS Code 在容器中运行的用户（包括子进程）。默认为 `containerUser`。 |

你可以查看 `devcontainer.json` 选项的[完整列表](https://containers.dev/implementors/json_reference)。

### 恭喜

恭喜，你已成功完成本教程！

以上是关于使用开发容器所能实现的功能的简要概述。下一步，我们建议你了解如何[从你的计算机在容器中打开现有文件夹](/docs/devcontainers/containers.md#quick-start-open-an-existing-folder-in-a-container)或[在容器中打开 GitHub 仓库或 PR](/docs/devcontainers/containers.md#quick-start-open-a-git-repository-or-github-pr-in-an-isolated-container-volume)。

查看其他远程开发扩展。

* [远程 - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)
* [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)

或者通过安装
[远程开发](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)扩展包来获取所有这些扩展。

## 故障排查

### 验证 Docker 上下文

如果你没有使用全新的 Docker 安装，并且 **开发容器：试用开发容器示例...** 示例在当前上下文中遇到问题，你应该检查你的 Docker 上下文。全新安装将有一个 'default' 上下文，你可以将其重新设置为当前上下文。

```bash
# 显示上下文列表，'*' 表示当前上下文
docker context list

# 将上下文切换到 'default'
docker context use default
```
