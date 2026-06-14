---
ContentId: ed14ef07-f44c-4675-b95b-cb5faffc7abb
MetaDescription: 使用 Visual Studio Code 远程开发附加到正在运行的容器
DateApproved: 6/10/2026
---
# 附加到正在运行的容器

Visual Studio Code 可以为你创建和启动容器，但这可能不符合你的工作流程，你可能更希望将 VS Code "附加"到一个已经在运行的 Docker 容器上——无论它是如何启动的。附加后，你可以像在[devcontainer.json](https://containers.dev/implementors/json_reference)中打开容器中的文件夹一样安装扩展、编辑和调试。

## 附加到 Docker 容器

要附加到 Docker 容器，请从命令面板(`kbstyle(F1)`)中选择**开发容器：附加到正在运行的容器...**，或使用活动栏中的**远程资源管理器**，在**容器**视图中选择要连接的容器上的**附加到容器**内联操作。

![Containers Explorer screenshot](images/attach-container/containers-attach.png)

> **注意：** 使用 Alpine Linux 容器时，某些扩展可能无法正常工作，因为扩展内部的原生代码依赖于 `glibc`。

## 附加容器配置文件

VS Code 支持镜像级别或容器名称级别的配置文件，以便在重复连接到给定的 Docker 容器时加快设置速度。附加后，每当你打开文件夹、[安装扩展](/docs/devcontainers/containers.md#managing-extensions)或[转发端口](/docs/devcontainers/containers.md#forwarding-or-publishing-a-port)，本地镜像特定的配置文件会自动更新以记住你的设置，这样当你再次附加时，一切都会恢复到正确的位置。

* 默认使用**镜像级别**配置。要在附加后查看或更新它，请从命令面板(`kbstyle(F1)`)中选择**开发容器：打开容器配置文件**。

* 如果你希望将配置绑定到**容器名称**，请在附加后从命令面板(`kbstyle(F1)`)中选择**开发容器：打开命名配置文件**。此后的任何更新将应用于此名称级别配置，而不是镜像级别配置。

这两种文件都支持 `devcontainer.json` 属性的子集：

```json
{
    // 附加到新容器时要打开的默认路径。
    "workspaceFolder": "/path/to/code/in/container/here",

    // 在创建容器时设置 *默认* 容器特定的 settings.json 值。
    "settings": {
        "terminal.integrated.defaultProfile.linux": "bash"
    },

    // 添加要在创建容器时安装的扩展 ID。
    "extensions": [
        "dbaeumer.vscode-eslint"
    ],

    // 需要转发的端口号数组
    "forwardPorts": [8000],

    // VS Code 连接时应使用的容器用户
    "remoteUser": "vscode",

    // 为 VS Code 和子进程设置环境变量
    "remoteEnv": { "MY_VARIABLE": "some-value" }
}
```

请参阅[附加容器配置参考](#attached-container-configuration-reference)以获取完整的属性列表及其用途。

保存后，每当你首次打开具有相同镜像/容器名称的容器时，这些属性将用于配置环境。

> **提示：** 如果配置出了问题，你也可以在未附加到容器时通过从命令面板(`kbstyle(F1)`)中选择**开发容器：打开附加容器配置文件...**，然后从显示的列表中选择镜像/容器名称来进行编辑。

最后，如果你有一些无论附加到哪个容器都想要安装的扩展，你可以更新 `settings.json` 来指定[应始终安装的扩展](/docs/devcontainers/containers.md#always-installed-extensions)列表。

## 附加容器配置参考

附加容器配置文件类似于[devcontainer.json](https://containers.dev/implementors/json_reference)，并支持其属性的子集。

| 属性 | 类型 | 描述 |
|----------|------|-------------|
| `workspaceFolder` | string | 设置 VS Code 连接到容器时应打开的默认路径（通常是源代码在容器中所在的卷挂载路径）。默认未设置（打开一个空窗口）。 |
| `extensions` | array | 指定在创建容器时应安装的扩展 ID 数组。默认为 `[]`。 |
| `settings` | object | 将默认的 `settings.json` 值添加到容器/计算机特定的设置文件中。 |
| `forwardPorts` | array | 应从容器内部转发到本地计算机的端口列表。 |
| `portsAttributes` | object | 将端口号、`"host:port"` 值、范围或正则表达式映射到一组默认选项的对象。可用选项请参阅[端口属性](https://containers.dev/implementors/json_reference/#port-attributes)。例如：<br />`"portsAttributes": {"3000": {"label": "Application port"}}` |
| `otherPortsAttributes` | object | 未使用 `portsAttributes` 配置的端口、端口范围和主机的默认选项。可用选项请参阅[端口属性](https://containers.dev/implementors/json_reference/#port-attributes)。例如：<br /> `"otherPortsAttributes": {"onAutoForward": "silent"}` |
| `remoteEnv` | object | 一组名称-值对，用于设置或覆盖 VS Code（或终端等子进程）的环境变量，但不是整个容器的环境变量。值中可以引用环境变量和[预定义变量](#variables-in-attached-container-configuration-files)。<br>例如：`"remoteEnv": { "PATH": "${containerEnv:PATH}:/some/other/path" }` |
| `remoteUser` | string | 覆盖 VS Code 在容器中运行的用户（以及终端、任务或调试等子进程）。默认为容器整体运行的用户（通常是 `root`）。 |
| `userEnvProbe` | enum | 指示用于"探查"用户环境变量的 shell 类型，以包含在 VS Code 或其他已连接工具的进程中：`none`、`interactiveShell`、`loginShell` 或 `loginInteractiveShell`（默认）。使用的具体 shell 取决于用户的默认 shell（通常是 bash）。例如，bash 交互式 shell 通常会包含 `/etc/bash.bashrc` 和 `~/.bashrc` 中设置的变量，而登录 shell 通常包含 `/etc/profile` 和 `~/.profile` 中的变量。将此属性设置为 `loginInteractiveShell` 将获取所有四个文件中的变量。 |
| `postAttachCommand` | string,<br>array | 在 VS Code 附加到容器后运行的命令字符串或命令参数列表。在字符串中使用 `&&` 来执行多个命令。例如，`"yarn install"` 或 `"apt-get update && apt-get install -y curl"`。数组语法 `["yarn", "install"]` 将直接调用命令（此处为 `yarn`），而不使用 shell。默认未设置。<br>请注意，数组语法将在不使用 shell 的情况下执行命令。你可以[了解更多](https://containers.dev/implementors/json_reference/#formatting-string-vs-array-properties)关于字符串与数组属性的格式设置。 |

### 附加容器配置文件中的变量

在附加配置文件的某些字符串值中，可以使用以下格式引用变量：**${variableName}**。下表列出了可用的变量。

| 变量 | 属性 | 描述 |
|----------|---------|----------------------|
| `${containerEnv:VAR_NAME}` | `remoteEnv` | 容器启动并运行后，容器内现有环境变量（此处为 `VAR_NAME`）的值。例如：`"remoteEnv": { "PATH": "${containerEnv:PATH}:/some/other/path" }` |

## 附加到 Kubernetes 集群中的容器

要附加到 Kubernetes 集群中的容器，请从命令面板(`kb(workbench.action.showCommands)`)中选择**开发容器：附加到正在运行的 Kubernetes 容器...**。或者，先安装 [Kubernetes 扩展](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools)和 `kubectl` 以及开发容器扩展。然后从活动栏中选择 Kubernetes 资源管理器，展开要附加的容器所在的集群和 Pod。最后，右键单击容器并从上下文菜单中选择**附加 Visual Studio Code**。

> **注意：** 附加容器配置文件尚不支持 Kubernetes 集群中的容器。

![Attach to Kubernetes Container](images/attach-container/k8s-attach.png)

## 后续步骤

* [创建开发容器](/docs/devcontainers/create-dev-container.md) - 为你的工作环境创建自定义容器。
* [高级容器](/remote/advancedcontainers/overview.md) - 查找高级容器场景的解决方案。
* [devcontainer.json 参考](https://containers.dev/implementors/json_reference) - 查看 `devcontainer.json` 架构。
