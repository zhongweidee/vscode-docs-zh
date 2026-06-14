---
ContentId: 42e65445-fb3b-4561-8730-bbd19769a160
MetaDescription: 使用 Visual Studio Code Remote Development 和 SSH 在远程计算机或虚拟机上开发
DateApproved: 6/10/2026
---
# 使用 SSH 进行远程开发

**Visual Studio Code Remote - SSH** 扩展允许你在任何运行 SSH 服务器的远程计算机、虚拟机或容器上打开远程文件夹，并充分利用 VS Code 的功能集。连接到服务器后，你可以与远程文件系统上任何位置的文件和文件夹进行交互。

无需在本地计算机上放置源代码即可获得这些优势，因为该扩展直接在远程计算机上运行命令和其他扩展。该扩展将在远程操作系统上安装 VS Code Server；该服务器独立于远程操作系统上任何现有的 VS Code 安装。

![SSH Architecture](images/ssh/architecture-ssh.png)

这让 VS Code 能够提供**本地质量的开发体验**——包括完整的 IntelliSense（自动补全）、代码导航和调试——**无论你的代码托管在哪里**。

## 入门指南

**注意**：查看本主题后，你可以通过 [SSH 教程](/docs/remote/ssh-tutorial.md)入门。

### 系统要求

**本地端：** 还必须安装受支持的 [OpenSSH 兼容 SSH 客户端](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client)。

**远程 SSH 主机：** 运行中的 [SSH 服务器](/docs/remote/troubleshooting.md#installing-a-supported-ssh-server)，适用于：

- x86_64 Debian 8+、Ubuntu 16.04+、CentOS / RHEL 7+。
- ARMv7l (AArch32) Raspberry Pi OS（以前称为 Raspbian）Stretch/9+（32 位）。
- ARMv8l (AArch64) Ubuntu 18.04+（64 位）。
- 使用[官方 OpenSSH Server](https://learn.microsoft.com/windows-server/administration/openssh/openssh_install_firstuse) 的 Windows 10 / Server 2016/2019 (1803+)。
- 已[启用远程登录](https://support.apple.com/guide/mac-help/allow-a-remote-computer-to-access-your-mac-mchlp1066/mac)的 macOS 10.14+ (Mojave) SSH 主机。
- 远程主机需要 1 GB RAM，但建议至少 2 GB RAM 和双核 CPU。

其他基于 `glibc` 的 x86_64、ARMv7l (AArch32) 和 ARMv8l (AArch64) Linux 发行版如果具备所需的先决条件，也应该可以正常工作。有关先决条件信息以及让社区支持的发行版正常运行的提示，请参阅[使用 Linux 进行远程开发](/docs/remote/linux.md)文章。

虽然支持 ARMv7l (AArch32) 和 ARMv8l (AArch64)，但由于扩展中使用了 x86 原生代码，安装在这些设备上的一些扩展可能无法工作。

### 安装

要开始使用，你需要：

1. 如果尚未安装 [OpenSSH 兼容 SSH 客户端](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client)，请安装一个。

2. 安装 [Visual Studio Code](https://code.visualstudio.com/) 或 [Visual Studio Code Insiders](https://code.visualstudio.com/insiders/)。

3. 安装 [Remote-SSH 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)。如果你计划在 VS Code 中使用其他远程扩展，可以选择安装[远程开发扩展包](https://aka.ms/vscode-remote/download/extension)。

### SSH 主机设置

1. 如果你没有设置 SSH 主机，请按照 [Linux](/docs/remote/troubleshooting.md#installing-a-supported-ssh-server)、[Windows 10 / Server (1803+)](https://learn.microsoft.com/windows-server/administration/openssh/openssh_install_firstuse) 或 [macOS](https://support.apple.com/guide/mac-help/allow-a-remote-computer-to-access-your-mac-mchlp1066/mac) SSH 主机的说明进行操作，或[在 Azure 上创建虚拟机](https://learn.microsoft.com/azure/virtual-machines/linux/quick-create-portal)。

2. **可选：** 如果多个用户将同时访问你的 Linux 或 macOS SSH 主机，请考虑在 VS Code [用户设置](/docs/configure/settings.md)中启用 **Remote.SSH: Remote Server Listen On Socket** 以提高安全性。

    在设置编辑器中：

    ![Listen on socket VS Code setting](images/ssh/ssh-listen-on-socket.png)

    有关详细信息，请参阅[提示和技巧](/docs/remote/troubleshooting.md#improving-security-on-multi-user-servers)文章。

3. **可选：** 虽然支持基于密码的身份验证，但我们建议为你的主机设置**基于密钥的身份验证**。有关详细信息，请参阅[提示和技巧](/docs/remote/troubleshooting.md#configuring-key-based-authentication)文章。

### 连接到远程主机

要首次连接到远程主机，请按照以下步骤操作：

1. 通过在终端 / PowerShell 窗口中运行以下命令（根据需要替换 `user@hostname`），验证你可以连接到 SSH 主机。

    ```bash
    ssh user@hostname
    # 或者在 Windows 上使用域 / AAD 账户时
    ssh user@domain@hostname
    ```

2. 在 VS Code 中，从命令面板（`kbstyle(F1)`、`kb(workbench.action.showCommands)`）中选择 **Remote-SSH: Connect to Host...**，并使用与步骤 1 相同的 `user@hostname`。

    ![Illustration of user@host input box](images/ssh/ssh-user@box.png)

3. 如果 VS Code 无法自动检测你连接到的服务器类型，系统将要求你手动选择类型。

    ![Illustration of platform selection](images/ssh/ssh-select-platform.png)

    选择平台后，它将存储在 [VS Code 设置](/docs/configure/settings.md)中的 `remote.SSH.remotePlatform` 属性下，以便你可以随时更改。

4. 片刻之后，VS Code 将连接到 SSH 服务器并进行自我设置。VS Code 将通过进度通知让你了解最新状态，你可以在 `Remote - SSH` 输出通道中查看详细日志。

    > **提示：** 连接挂起或失败？有关解决常见问题的信息，请参阅[故障排除提示](/docs/remote/troubleshooting.md#troubleshooting-hanging-or-failing-connections)。
    >
    > 如果你看到有关 SSH 文件权限的错误，请参阅[修复 SSH 文件权限错误](/docs/remote/troubleshooting.md#fixing-ssh-file-permission-errors)部分。

5. 连接后，你将进入一个空窗口。你可以随时参考状态栏来查看你连接到了哪个主机。

    ![SSH Status bar item](images/ssh/ssh-statusbar.png)

    在连接状态下，点击状态栏项将提供远程命令列表。

6. 然后，你可以像在本地一样，使用 **文件 > 打开...** 或 **文件 > 打开工作区...** 在远程计算机上打开任何文件夹或工作区！

    ![File Open on a remote SSH host](images/ssh/ssh-open-folder.png)

    从这里开始，[安装任何扩展](#管理扩展)以便在连接到主机时使用，然后开始编辑！

> **注意：** 在 ARMv7l / ARMv8l `glibc` SSH 主机上，由于扩展内部包含 x86 编译的原生代码，某些扩展可能无法工作。

### 在容器中打开远程 SSH 主机上的文件夹

如果你使用 Linux 或 macOS SSH 主机，可以结合使用 Remote - SSH 和 [Dev Containers](/docs/devcontainers/containers.md) 扩展，在容器中打开远程主机上的文件夹。你甚至不需要在本地安装 Docker 客户端。

为此：

1. 按照[安装](/docs/devcontainers/containers.md#installation)步骤在远程主机上安装 Docker，并在本地安装 VS Code 和 Dev Containers 扩展。
1. **可选：** 设置 SSH [基于密钥的身份验证](/docs/remote/troubleshooting.md#configuring-key-based-authentication)到服务器，这样你就不需要多次输入密码。
1. 按照 Remote - SSH 扩展的[快速入门](#连接到远程主机)连接到主机并在其中打开一个文件夹。
1. 从命令面板（`kbstyle(F1)`、`kb(workbench.action.showCommands)`）中使用 **Dev Containers: Reopen in Container** 命令。

[Dev Containers 快速入门](/docs/devcontainers/containers.md#quick-start-open-an-existing-folder-in-a-container)的其余部分同样适用。你可以在其文档中了解更多关于 [Dev Containers 扩展](/docs/devcontainers/containers.md)的信息。如果此模式不满足你的需求，你还可以查看[在远程 Docker 主机上开发](/remote/advancedcontainers/develop-remote-host.md)文章以了解其他选项。

### 断开与远程主机的连接

要在完成远程主机上文件的编辑后关闭连接，请选择 **文件 > 关闭远程连接** 以断开与主机的连接。默认配置不包含此命令的键盘快捷键。你也可以直接退出 VS Code 来关闭远程连接。

### 记住主机和高级设置

如果你有一组经常使用的主机，或者需要使用一些额外选项连接到主机，你可以将它们添加到一个遵循 [SSH 配置文件格式](https://man7.org/linux/man-pages/man5/ssh_config.5.html)的本地文件中。

为了简化设置，该扩展可以引导你添加主机，而无需手动编辑此文件。

首先从命令面板（`kbstyle(F1)`、`kb(workbench.action.showCommands)`）中选择 **Remote-SSH: Add New SSH Host...**，或点击活动栏中 SSH **远程资源管理器**中的**添加新项**图标。

![Remote Explorer Add New item](images/ssh/ssh-explorer-add-new.png)

然后系统将要求你输入 SSH 连接信息。你可以输入主机名：

![Remote Explorer SSH host input](images/ssh/ssh-host-input.png)

或者输入你从命令行连接到主机时使用的完整 `ssh` 命令：

![Remote Explorer SSH command input](images/ssh/ssh-command-input.png)

最后，系统将要求你选择一个要使用的配置文件。如果你想要使用与列出文件不同的配置文件，还可以在用户 `settings.json` 文件中设置 `"remote.SSH.configFile"` 属性。扩展会处理其余的工作！

例如，在输入框中输入 `ssh -i ~/.ssh/id_rsa-remote-ssh yourname@remotehost.yourcompany.com` 将生成以下条目：

```ssh-config
Host remotehost.yourcompany.com
    User yourname
    HostName another-host-fqdn-or-ip-goes-here
    IdentityFile ~/.ssh/id_rsa-remote-ssh
```

有关生成此处所示密钥的详细信息，请参阅[提示和技巧](/docs/remote/troubleshooting.md#improving-your-security-with-a-dedicated-key)。你可以使用 [SSH 配置文件格式](https://man7.org/linux/man-pages/man5/ssh_config.5.html)支持的任何内容手动编辑此文件，因此这只是一个示例。

从此以后，当你从命令面板（`kbstyle(F1)`、`kb(workbench.action.showCommands)`）中选择 **Remote-SSH: Connect to Host...** 时，或者在**远程资源管理器**的 **SSH 目标**部分中，该主机将出现在主机列表中。

![SSH targets in the Remote Explorer](images/ssh/ssh-explorer-connect.png)

**远程资源管理器**允许你在远程主机上打开一个新的空窗口，或直接打开你之前打开过的文件夹。展开主机，点击要打开文件夹旁边的**打开文件夹**图标。

![Remote Explorer open folder](images/ssh/ssh-explorer-open-folder.png)

## 管理扩展

VS Code 在两个位置之一运行扩展：在 UI / 客户端侧的本地，或在 SSH 主机上的远程端。虽然影响 VS Code UI 的扩展（如主题和代码片段）在本地安装，但大多数扩展将驻留在 SSH 主机上。这确保了你拥有流畅的体验，并允许你从本地计算机为 SSH 主机上的给定工作区安装任何需要的扩展。这样，你可以从不同的计算机上完全接着之前的工作继续，包括你的扩展。

如果你从扩展视图安装扩展，它将自动安装在正确的位置。安装后，你可以根据类别分组来判断扩展的安装位置。

将有一个用于远程 SSH 主机的类别：

![Workspace Extension Category](images/ssh/ssh-installed-remote-indicator.png)

还有一个**本地 - 已安装**类别：

![Local Extension Category](images/common/local-installed-extensions.png)

> **注意：** 如果你是扩展作者，发现你的扩展无法正常工作或安装在错误的位置，请参阅[支持远程开发](/api/advanced-topics/remote-extensions.md)了解详细信息。

实际需要在远程运行的本地扩展将在**本地 - 已安装**类别中显示为灰色和禁用状态。选择**安装**以在远程主机上安装扩展。

![Disabled Extensions w/Install Button](images/ssh/ssh-disabled-extensions.png)

你还可以通过转到扩展视图，使用 **本地 - 已安装** 标题栏右侧的云按钮，选择 **Install Local Extensions in SSH: {Hostname}**，将所有本地安装的扩展安装到 SSH 主机上。这将显示一个下拉菜单，你可以从中选择要在 SSH 主机上安装哪些本地扩展。

### "始终安装"的扩展

如果你有希望始终在任何 SSH 主机上安装的扩展，可以使用 `settings.json` 中的 `remote.SSH.defaultExtensions` 属性来指定。例如，如果你想安装 [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) 和 [Resource Monitor](https://marketplace.visualstudio.com/items?itemName=mutantdino.resourcemonitor) 扩展，请按如下方式指定其扩展 ID：

```json
"remote.SSH.defaultExtensions": [
    "eamodio.gitlens",
    "mutantdino.resourcemonitor"
]
```

### 高级：强制扩展在本地 / 远程运行

扩展通常被设计和测试为在本地或远程运行，而不是两者兼有。但是，如果扩展支持，你可以在 `settings.json` 文件中强制它在特定位置运行。

例如，以下设置将强制 [Container Tools](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-containers) 扩展在本地运行，并强制 [Remote - SSH: Editing Configuration Files](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh-edit) 扩展在远程运行，而不是按其默认设置：

```json
"remote.extensionKind": {
    "ms-azuretools.vscode-containers": [ "ui" ],
    "ms-vscode-remote.remote-ssh-edit": [ "workspace" ]
}
```

值 `"ui"` 而非 `"workspace"` 将强制扩展在本地 UI/客户端侧运行。通常，这仅应用于测试，除非扩展文档中另有说明，因为**它可能会破坏扩展**。有关详细信息，请参阅[支持远程开发](/api/advanced-topics/remote-extensions.md)文章。

## 转发端口 / 创建 SSH 隧道

有时在开发过程中，你可能需要访问远程计算机上未公开暴露的端口。有两种方法可以使用 [SSH 隧道](https://www.ssh.com/ssh/tunneling/example)来实现，该隧道将所需的远程端口"转发"到你的本地计算机。

### 临时转发端口

连接到主机后，如果你想在会话期间**临时转发**一个新端口，请从命令面板（`kbstyle(F1)`、`kb(workbench.action.showCommands)`）中选择**转发端口**，或在**端口视图**中选择**添加端口**按钮。你可以在底部面板中看到端口视图，或通过运行命令 **端口：聚焦端口视图** 来查看。

![Forward port button](images/ssh/forward-port-ssh.png)

系统将要求你输入要转发的端口，你可以为其指定一个名称。

![Adding a new port](images/ssh/add-new-port.png)

通知将告诉你应该使用哪个本地主机端口来访问远程端口。例如，如果你转发了一个监听在端口 3000 上的 HTTP 服务器，通知可能会告诉你它被映射到本地主机的端口 4123，因为 3000 已被使用。然后你可以使用 `http://localhost:4123` 连接到此远程 HTTP 服务器。

如果你以后需要访问此信息，同样可以在远程资源管理器的**已转发端口**部分中找到。

如果你希望 VS Code 记住你已转发的任何端口，请在设置编辑器（`kb(workbench.action.openSettings)`）中勾选 **Remote: Restore Forwarded Ports**，或在 `settings.json` 中设置 `"remote.restoreForwardedPorts": true`。

![Restore forwarded ports setting](images/common/restore-forwarded-ports.png)

#### 更改隧道的本地端口

如果你希望隧道的本地端口与远程服务器的端口不同，可以通过**已转发端口**面板进行更改。

右键点击要修改的隧道，然后在上下文菜单中选择**更改本地地址端口**。

![Change Local Address Port](images/ssh/change-local-port.png)

### 始终转发端口

如果你有**始终想转发**的端口，可以在用于[记住主机和高级设置](#记住主机和高级设置)的同一个 SSH 配置文件中使用 `LocalForward` 指令。

例如，如果你想转发端口 3000 和 27017，可以按如下方式更新文件：

```ssh-config
Host remote-linux-machine
    User myuser
    HostName remote-linux-machine.mydomain
    LocalForward 127.0.0.1:3000 127.0.0.1:3000
    LocalForward 127.0.0.1:27017 127.0.0.1:27017
```

## 在远程主机上打开终端

从 VS Code 在远程主机上打开终端非常简单。连接后，你在 VS Code 中打开的**任何终端窗口**（**终端 > 新建终端**）都将自动在远程主机上运行，而不是在本地。

你也可以从同一个终端窗口使用 `code` 命令行来执行许多操作，例如在远程主机上打开新文件或文件夹。输入 `code --help` 查看命令行中可用的所有选项。

![Using the code CLI](images/ssh/code-command-in-terminal.png)

## 在 SSH 主机上调试

连接到远程主机后，你可以像在本地运行应用程序一样使用 VS Code 的调试器。例如，如果你在 `launch.json` 中选择一个启动配置并开始调试（`kb(workbench.action.debug.start)`），应用程序将在远程主机上启动并将调试器附加到它上面。

有关在 `.vscode/launch.json` 中配置 VS Code 调试功能的详细信息，请参阅[调试](/docs/debugtest/debugging.md)文档。

## SSH 主机特定设置

VS Code 的本地用户设置在连接到 SSH 主机时也会被重用。虽然这保持了你用户体验的一致性，但你可能希望在你的本地计算机和每个主机之间对这些设置进行一些变化。幸运的是，连接到主机后，你还可以通过从命令面板（`kbstyle(F1)`、`kb(workbench.action.showCommands)`）运行**首选项：打开远程设置**命令，或在设置编辑器中选择**远程**选项卡来设置主机特定的设置。每当你连接到主机时，这些设置将覆盖你现有的任何用户设置。工作区设置将覆盖远程和用户设置。

![Host-specific settings tab](images/ssh/ssh-settings.png)

## 使用本地工具

Remote - SSH 扩展不提供直接支持来同步源代码或使用本地工具处理远程主机上的内容。但是，有两种方法可以使用适用于大多数 Linux 主机的常用工具来实现这一点。具体来说，你可以：

1. [使用 SSHFS 挂载远程文件系统](/docs/remote/troubleshooting.md#using-sshfs-to-access-files-on-your-remote-host)。
2. [使用 `rsync` 将文件同步到远程主机或从远程主机同步到本地计算机](/docs/remote/troubleshooting.md#using-rsync-to-maintain-a-local-copy-of-your-source-code)。

SSHFS 是最方便的选择，不需要任何文件同步。但是，性能将比通过 VS Code 工作显著降低，因此它最适合用于单文件编辑和上传/下载内容。如果你需要使用一次性批量读/写许多文件的应用程序（如本地源代码管理工具），rsync 是更好的选择。

## 已知限制

### Remote - SSH 限制

- 建议使用基于密钥的身份验证。对于[替代身份验证方法](/docs/remote/troubleshooting.md#enabling-alternate-ssh-authentication-methods)输入的密码和其他令牌不会被保存。
- 不支持 Alpine Linux 和非基于 glibc 的 Linux SSH 主机。
- 较旧的（社区支持的）Linux 发行版需要解决方法才能安装[所需的先决条件](/docs/remote/linux.md)。
- 在 Windows 上不支持 PuTTY。
- 如果你使用 SSH 克隆 Git 仓库且你的 SSH 密钥有密码短语，VS Code 的拉取和同步功能在远程运行时可能会挂起。解决方法：使用没有密码短语的 SSH 密钥、使用 HTTPS 克隆，或从命令行运行 `git push`。
- 本地代理设置不会在远程主机上重用，这可能会阻止扩展工作，除非在远程主机上配置了适当的代理信息（例如，带有适当代理信息的全局 `HTTP_PROXY` 或 `HTTPS_PROXY` 环境变量）。
- 请参阅[此处了解与 SSH 相关的活动问题列表](https://aka.ms/vscode-remote/ssh/issues)。

### Container Tools 扩展限制

如果你从 WSL、Remote - Tunnels 或 Remote - SSH 窗口中使用 Container Tools 或 Kubernetes 扩展，在容器资源管理器或 Kubernetes 视图中使用**附加 Visual Studio Code** 上下文菜单操作将要求你第二次从可用容器中进行选择。

### 扩展限制

许多扩展无需修改即可在远程 SSH 主机上工作。但是，在某些情况下，某些功能可能需要更改。如果你遇到扩展问题，有一个[常见问题和解决方案的摘要](/docs/remote/troubleshooting.md#extension-tips)，你可以在报告问题时向扩展作者提及。

此外，由于扩展中的原生模块或运行时仅支持 x86_64，安装在 ARMv7l (AArch32) / ARMv8l (AArch64) 设备上的一些扩展可能无法工作。在这些情况下，扩展需要通过编译/包含 ARMv7l / ARMv8l 的二进制文件来选择支持这些平台。

## 常见问题

### 如何在...上设置 SSH 客户端？

有关详细信息，请参阅[安装受支持的 SSH 客户端](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client)。

### 如何在...上设置 SSH 服务器？

有关为你的主机设置 SSH 服务器的详细信息，请参阅[安装受支持的 SSH 服务器](/docs/remote/troubleshooting.md#installing-a-supported-ssh-server)。

### 我可以使用其他/额外的身份验证机制（如密码）登录到我的 SSH 服务器吗？

可以，系统应该会自动提示你输入令牌或密码。但是，密码不会被保存，因此使用[基于密钥的身份验证](/docs/remote/troubleshooting.md#configuring-key-based-authentication)通常更方便。

### 如何修复关于"错误权限"的 SSH 错误？

有关解决这些类型错误的详细信息，请参阅[修复 SSH 文件权限错误](/docs/remote/troubleshooting.md#fixing-ssh-file-permission-errors)。

### 远程 SSH 主机上需要安装哪些 Linux 软件包 / 库？

大多数 Linux 发行版不需要额外的依赖安装步骤。对于 SSH，Linux 主机需要安装 Bash (`/bin/bash`)、`tar`，以及 `curl` 或 `wget`，这些工具可能在某些精简版发行版中缺失。远程开发还需要内核 >= 3.10，glibc >= 2.17，libstdc++ >= 3.4.18。目前仅支持基于 glibc 的发行版，因此 [Alpine Linux](https://alpinelinux.org) 不支持。

有关详细信息，请参阅 [Linux 先决条件](/docs/remote/linux.md)。

### 当 VS Code Server 在远程计算机 / VM 上运行时，其连接要求是什么？

安装 VS Code Server 要求你的本地计算机具有对以下地址的出站 HTTPS（端口 443）连接：

- `update.code.visualstudio.com`
- `vscode.download.prss.microsoft.com`

默认情况下，Remote - SSH 将尝试在远程主机上下载，如果失败，则在建立连接后在本地下载 VS Code Server 并远程传输。你可以使用 `setting(remote.SSH.localServerDownload)` 设置更改此行为，以始终在本地下载然后传输，或从不本地下载。

你可以在没有互联网连接的情况下使用 **Extensions: Install from VSIX...** 命令手动安装扩展，但如果你使用扩展面板安装扩展，你的本地计算机和 VS Code Server 服务器需要对以下地址的出站 HTTPS（端口 443）访问：

- `marketplace.visualstudio.com`
- `*.gallerycdn.vsassets.io`（Azure CDN）

最后，一些扩展（如 C#）会从 `download.microsoft.com` 或 `download.visualstudio.microsoft.com` 下载辅助依赖项。其他扩展（如 [Visual Studio Live Share](https://learn.microsoft.com/visualstudio/liveshare/reference/connectivity#requirements-for-connection-modes)）可能有额外的连接要求。如果遇到问题，请查阅扩展的文档了解详细信息。

服务器和 VS Code 客户端之间的所有其他通信都通过经过身份验证的安全 SSH 隧道完成。

### 我可以对位于远程 SSH 主机上的源代码使用本地工具吗？

可以。通常可以通过[使用 SSHFS](/docs/remote/troubleshooting.md#using-sshfs-to-access-files-on-your-remote-host) 或[使用 `rsync`](/docs/remote/troubleshooting.md#using-rsync-to-maintain-a-local-copy-of-your-source-code) 在本地计算机上获取文件副本。SSHFS 挂载远程文件系统非常适合需要编辑单个文件或浏览源代码树的场景，并且无需同步步骤即可使用。但是，它不太适合使用像源代码管理工具这样批量管理文件的工具。在这种情况下，`rsync` 方法更好，因为你可以在本地计算机上获得远程源代码的完整副本。有关详细信息，请参阅[提示和技巧](/docs/remote/troubleshooting.md#using-sshfs-to-access-files-on-your-remote-host)。

### 当我只有远程主机的 SFTP/FTP 文件系统访问权限时（没有 shell 访问权限），我可以使用 VS Code 吗？

某些云平台仅为开发人员提供远程文件系统访问权限，而不是直接的 shell 访问权限。VS Code Remote Development 并非为此用例设计，因为它会否定性能和用户体验的优势。

但是，此用例通常可以通过结合使用 [SFTP](https://marketplace.visualstudio.com/items?itemName=liximomo.sftp) 等扩展与 [Node.js](/docs/nodejs/nodejs-debugging.md#remote-debugging)、[Python](/docs/python/debugging.md#remote-script-debugging-with-ssh)、[C#](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) 或其他语言的远程调试功能来处理。

### 作为扩展作者，我需要做什么？

VS Code 扩展 API 抽象了本地/远程的细节，因此大多数扩展无需修改即可工作。但是，由于扩展可以使用任何 node 模块或运行时，在某些情况下可能需要进行调整。我们建议你测试你的扩展以确保不需要更新。有关详细信息，请参阅[支持远程开发](/api/advanced-topics/remote-extensions.md)。

### 问题或反馈

- 请参阅[提示和技巧](/docs/remote/troubleshooting.md#ssh-tips)或[常见问题解答](/docs/remote/faq.md)。
- 在 [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-remote) 上搜索。
- 添加[功能请求](https://aka.ms/vscode-remote/feature-requests)或[报告问题](https://aka.ms/vscode-remote/issues/new)。
- 为[我们的文档](https://github.com/microsoft/vscode-docs)或 [VS Code 本身](https://github.com/microsoft/vscode)做出贡献。
- 有关详细信息，请参阅我们的 [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) 指南。
