---
ContentId: c7e2f4a1-8d3b-4a6e-9c5d-2f1b3e8a7d4c
DateApproved: 6/10/2026
MetaDescription: 通过 SSH 或开发隧道连接到远程计算机以运行代理会话，或使用基于浏览器的代理窗口从任何设备管理会话。
MetaSocialImage: images/shared/github-copilot-social.png
---
# 远程代理会话

[代理窗口](/docs/agents/agents-window.md)允许你连接到远程计算机以启动代理会话或查看现有会话。你可以通过 SSH、开发隧道进行连接，也可以在任何设备上通过浏览器直接使用代理窗口。

当你希望利用远程计算机的资源、从移动设备工作，或者当你离开主力开发计算机时检查代理的进度时，这一功能非常有用。

代理窗口通过 SSH 或开发隧道使用[代理主机协议 (AHP)](https://microsoft.github.io/agent-host-protocol/) 连接到远程计算机。连接时，代理窗口会自动在远程计算机上安装并启动 VS Code CLI。远程计算机必须处于开机状态并可通过网络访问。

## 通过 SSH 连接

**前提条件**：远程计算机必须可通过 SSH 访问。远程计算机上无需额外安装代理。

要通过 SSH 在远程计算机上启动会话：

1. 选择 **新建** 或按 `kb(workbench.action.chat.newChat)` 启动一个新的代理会话。

1. 在工作区下拉菜单中，选择 **远程** 选项卡，然后选择 **SSH**。如果你已经设置了 SSH 连接，它们会在下拉菜单中显示为选项。

    ![Screenshot showing how to select SSH in the workspace dropdown when starting a new agent session in the Agents window.](images/agents-window/agents-window-remote.png)

1. 输入远程计算机的 SSH 连接字符串（例如，`user@hostname`）。

1. 选择远程计算机上用于会话的文件夹。

1. 输入提示词并按 `kbstyle(Enter)` 启动会话。

## 通过开发隧道连接

**前提条件**：远程计算机上必须已运行开发隧道。有关设置说明，请参阅[使用远程隧道进行开发](/docs/remote/tunnels.md)。

要通过开发隧道在远程计算机上启动会话：

1. 选择 **新建** 或按 `kb(workbench.action.chat.newChat)` 启动一个新的代理会话。

1. 在工作区下拉菜单中，选择 **远程** 选项卡，然后选择 **隧道** 并选择你的账户类型。

    ![Screenshot showing how to select Tunnels in the workspace dropdown when starting a new agent session in the Agents window.](images/agents-window/agents-window-remote.png)

1. 从列表中选择活动的开发隧道。

1. 选择远程计算机上用于会话的文件夹。

1. 输入提示词并按 `kbstyle(Enter)` 启动会话。

> [!IMPORTANT]
> 确保你的开发隧道需要身份验证（GitHub 或 Microsoft 账户）。如果隧道允许匿名访问，任何发现该 URL 的人都可以访问你的计算机并启动代理会话。当自动批准模式处于活动状态时，这尤其危险，因为未经授权的用户可以使用你的凭据触发 AI 辅助的命令执行。有关更多信息，请参阅[安全性](/docs/agents/security.md)。

## 在浏览器中使用代理窗口

代理窗口也可以作为 Web 客户端在 <https://insiders.vscode.dev/agents> 上使用，因此你可以从任何带有浏览器的设备管理代理会话。当你离开主力开发计算机、从移动设备工作，或者想要在不本地安装 Visual Studio Code 的情况下查看远程主机上正在运行的会话时，这一功能非常有用。

基于浏览器的代理窗口通过[开发隧道](/docs/remote/tunnels.md)连接到你的开发计算机。代理会话在远程主机上运行，浏览器则作为轻量级客户端，用于聊天、查看更改和管理会话。

### 设置开发隧道

在浏览器中使用代理窗口之前，请在你想要连接的计算机上启动开发隧道：

1. 在你的远程主机上，运行以下命令启动开发隧道：

    ```bash
    code-insiders tunnel
    ```

    如果你使用的是稳定版，请改为运行 `code tunnel`。

    首次运行此命令时，系统会提示你使用 GitHub 或 Microsoft 账户进行身份验证。出于安全考虑，隧道默认需要身份验证。

1. 隧道运行后，在任何设备的浏览器中打开 <https://insiders.vscode.dev/agents>。

1. 出现提示时，使用 **使用 GitHub 继续** 登录。如果你已经通过身份验证，代理窗口会直接加载。

1. 你的隧道主机会显示在窗口顶部的主机栏中。选择它以进行连接。

1. 选择远程计算机上的文件夹，选择一个代理，然后启动会话。

### 主机管理

基于浏览器的代理窗口中的主机栏显示你可用的隧道主机。每个主机都会显示其连接状态：

* **在线**：主机可访问，你可以在此主机上启动或继续会话。
* **离线**：主机上的隧道未运行。在主机上启动隧道以使其恢复在线状态。

你可以通过主机栏直接连接和断开与主机的连接。如果你有一个活动会话时主机离线，该会话会显示断开连接状态。当主机恢复在线状态时，会话会自动重新连接。

## 相关资源

* [使用代理窗口](/docs/agents/agents-window.md) - 跨多个项目的代理优先工作流程。
* [使用代理](/docs/agents/overview.md) - 代理类型、工作位置和权限级别。
* [使用远程隧道进行开发](/docs/remote/tunnels.md) - 设置和管理开发隧道。
* [安全性](/docs/agents/security.md) - 信任边界和安全注意事项。
