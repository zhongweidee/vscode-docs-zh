---
ContentId: 42e65445-fb3b-4561-8730-bbd19769a160
MetaDescription: Visual Studio Code 远程开发故障排除技巧与提示，涵盖 SSH、容器和 Windows Subsystem for Linux (WSL)
DateApproved: 6/10/2026
---
# 远程开发技巧与提示

本文涵盖每个 Visual Studio Code [远程开发](https://aka.ms/vscode-remote/download/extension)扩展的故障排除技巧与提示。请参阅 [SSH](/docs/remote/ssh.md)、[容器](/docs/devcontainers/containers.md) 和 [WSL](/docs/remote/wsl.md) 文章，了解设置和使用每个具体扩展的详细信息。或者尝试入门[教程](/docs/remote/ssh-tutorial.md)，帮助你在远程环境中快速运行。

有关 [GitHub Codespaces](https://github.com/features/codespaces) 的提示和问题，请参阅 [GitHub Codespaces 文档](https://docs.github.com/github/developing-online-with-codespaces)。

## SSH 提示

SSH 功能强大且灵活，但这也增加了一些设置复杂性。本节包含一些技巧和提示，帮助你在不同环境中启动和运行 Remote - SSH 扩展。

## 自定义 AI 聊天响应

[自定义指令](/docs/agent-customization/overview.md)使你能够描述常见的指南或规则，以获得符合你特定编码实践和技术栈的响应。

你可以使用自定义指令向 Copilot 提供关于所连接远程环境类型的更多信息（例如安装了哪些语言或工具链）。你可以像在本地一样使用 `copilot-instructions.md` 文件。使用开发容器时，还可以采取[额外的指令配置步骤](/docs/devcontainers/tips-and-tricks.md#customize-ai-chat-responses)。

### 配置 $EDITOR 变量

对于 macOS / Linux 远程主机，将以下代码片段添加到你的 shell 配置文件中（如 `.bashrc` 或 `.zshrc`）：

```bash
if [ "$VSCODE_INJECTION" = "1" ]; then
    export EDITOR="code --wait" # or 'code-insiders' if you're using VS Code Insiders
fi
```

对于 Windows 主机，以下是等效的 PowerShell：

```powershell
if ($env:VSCODE_INJECTION -eq "1") {
    $env:EDITOR = "code --wait"  # or 'code-insiders' for VS Code Insiders
}
```

现在，运行使用 $EDITOR 变量的终端命令（如 `git commit`）时，将在 VS Code 中打开文件，而不是默认的基于终端的编辑器（如 `vim` 或 `nano`）。

### 配置基于密钥的身份验证

[SSH 公钥身份验证](https://www.ssh.com/ssh/public-key-authentication)是一种方便且高安全性的身份验证方法，它将本地"私钥"与关联到你在 SSH 主机上用户账户的"公钥"结合使用。本节将指导你如何生成这些密钥并将其添加到主机。

> **提示：** Windows 版 PuTTY 不是[受支持的客户端](#installing-a-supported-ssh-client)，但你可以[转换你的 PuTTYGen 密钥](#reusing-a-key-generated-in-puttygen)。

### 快速入门：使用 SSH 密钥

为你的远程主机设置基于 SSH 密钥的身份验证。首先，我们将创建一个密钥对，然后将公钥复制到主机。

**创建你的本地 SSH 密钥对**

 检查你的**本地**机器上是否已有 SSH 密钥。通常位于 macOS / Linux 的 `~/.ssh/id_ed25519.pub`，以及 Windows 用户配置文件文件夹中的 `.ssh` 目录（例如 `C:\Users\your-user\.ssh\id_ed25519.pub`）。

如果没有密钥，请在**本地**终端 / PowerShell 中运行以下命令生成 SSH 密钥对：

```bash
ssh-keygen -t ed25519 -b 4096
```

> **提示：** 没有 `ssh-keygen`？请安装[受支持的 SSH 客户端](#installing-a-supported-ssh-client)。

**限制私钥文件的权限**

* 对于 macOS / Linux，运行以下 shell 命令，必要时替换你的私钥路径：

    ```bash
    chmod 400 ~/.ssh/id_ed25519
    ```

* 对于 Windows，在 PowerShell 中运行以下命令，向你的用户名授予显式读取权限：

    ```powershell
    icacls "privateKeyPath" /grant <username>:R
    ```

    然后在 Windows 资源管理器中导航到私钥文件，右键单击并选择**属性**。选择**安全**选项卡 > **高级** > **禁用继承** > **从此对象中删除所有继承的权限**。

**授权你的 macOS 或 Linux 机器连接**

在**本地终端窗口**中运行以下命令之一，根据需要替换用户和主机名，将你的本地公钥复制到 SSH 主机。

* 连接到 **macOS 或 Linux** SSH 主机：

    ```bash
    export USER_AT_HOST="your-user-name-on-host@hostname"
    export PUBKEYPATH="$HOME/.ssh/id_ed25519.pub"

    ssh-copy-id -i "$PUBKEYPATH" "$USER_AT_HOST"
    ```

* 连接到 **Windows** SSH 主机：

  * 主机使用 OpenSSH Server 且用户[属于管理员组](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_server_configuration#authorizedkeysfile)：

    ```bash
    export USER_AT_HOST="your-user-name-on-host@hostname"
    export PUBKEYPATH="$HOME/.ssh/id_ed25519.pub"

    ssh $USER_AT_HOST "powershell Add-Content -Force -Path \"\$Env:PROGRAMDATA\\ssh\\administrators_authorized_keys\" -Value '$(tr -d '\n\r' < "$PUBKEYPATH")'"
    ```

  * 否则：

    ```bash
    export USER_AT_HOST="your-user-name-on-host@hostname"
    export PUBKEYPATH="$HOME/.ssh/id_ed25519.pub"

    ssh $USER_AT_HOST "powershell New-Item -Force -ItemType Directory -Path \"\$HOME\\.ssh\"; Add-Content -Force -Path \"\$HOME\\.ssh\\authorized_keys\" -Value '$(tr -d '\n\r' < "$PUBKEYPATH")'"
    ```

    你可能需要验证 SSH 主机上**远程用户**的 `.ssh` 文件夹中的 `authorized_keys` 文件是否归你所有，且没有其他用户拥有访问权限。详情请参阅 [OpenSSH wiki](https://github.com/PowerShell/Win32-OpenSSH/wiki/Security-protection-of-various-files-in-Win32-OpenSSH#authorized_keys)。

**授权你的 Windows 机器连接**

在**本地 PowerShell** 窗口中运行以下命令之一，根据需要替换用户和主机名，将你的本地公钥复制到 SSH 主机。

* 连接到 **macOS 或 Linux** SSH 主机：

    ```powershell
    $USER_AT_HOST="your-user-name-on-host@hostname"
    $PUBKEYPATH="$HOME\.ssh\id_ed25519.pub"

    $pubKey=(Get-Content "$PUBKEYPATH" | Out-String); ssh "$USER_AT_HOST" "mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo '${pubKey}' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
    ```

* 连接到 **Windows** SSH 主机：

  * 主机使用 OpenSSH Server 且用户[属于管理员组](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_server_configuration#authorizedkeysfile)：

    ```powershell
    $USER_AT_HOST="your-user-name-on-host@hostname"
    $PUBKEYPATH="$HOME\.ssh\id_ed25519.pub"

    Get-Content "$PUBKEYPATH" | Out-String | ssh $USER_AT_HOST "powershell `"Add-Content -Force -Path `"`$Env:PROGRAMDATA\ssh\administrators_authorized_keys`" `""
    ```

  * 否则：

    ```powershell
    $USER_AT_HOST="your-user-name-on-host@hostname"
    $PUBKEYPATH="$HOME\.ssh\id_ed25519.pub"

    Get-Content "$PUBKEYPATH" | Out-String | ssh $USER_AT_HOST "powershell `"New-Item -Force -ItemType Directory -Path `"`$HOME\.ssh`"; Add-Content -Force -Path `"`$HOME\.ssh\authorized_keys`" `""
    ```

    验证 SSH 主机上**远程用户**的 `.ssh` 文件夹中的 `authorized_keys` 文件是否归你所有，且没有其他用户拥有访问权限。详情请参阅 [OpenSSH wiki](https://github.com/PowerShell/Win32-OpenSSH/wiki/Security-protection-of-various-files-in-Win32-OpenSSH#authorized_keys)。

### 使用专用密钥提高安全性

虽然在所有 SSH 主机上使用单个 SSH 密钥可能很方便，但如果有人获得了你的私钥，他们也将获得对你所有主机的访问权限。你可以通过为开发主机创建单独的 SSH 密钥来防止这种情况。只需按照以下步骤操作：

1. 在不同的文件中生成单独的 SSH 密钥。

    **macOS / Linux**：在**本地终端**中运行以下命令：

    ```bash
    ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519-remote-ssh
    ```

    **Windows**：在**本地 PowerShell** 中运行以下命令：

    ```powershell
    ssh-keygen -t ed25519 -f "$HOME\.ssh\id_ed25519-remote-ssh"
    ```

2. 按照[快速入门](#quick-start-using-ssh-keys)中的相同步骤在 SSH 主机上授权密钥，但将 `PUBKEYPATH` 设置为 `id_ed25519-remote-ssh.pub` 文件。

3. 在 VS Code 中，从命令面板（`kbstyle(F1)`）中运行 **Remote-SSH: Open Configuration File...**，选择一个 SSH 配置文件，然后添加（或修改）如下主机条目：

    ```yaml
    Host name-of-ssh-host-here
        User your-user-name-on-host
        HostName host-fqdn-or-ip-goes-here
        IdentityFile ~/.ssh/id_ed25519-remote-ssh
    ```

    > **提示：** 你也可以对 Windows 路径使用 `/`。如果使用 `\`，则需要使用两个反斜杠。例如 `C:\\path\\to\\my\\id_ed25519`。

### 重用 PuTTYGen 中生成的密钥

如果你使用 PuTTYGen 为要连接的主机设置了 SSH 公钥身份验证，则需要转换你的私钥以便其他 SSH 客户端可以使用它。操作步骤如下：

1. 在**本地**打开 PuTTYGen，加载你要转换的私钥。
2. 从应用程序菜单中选择 **Conversions > Export OpenSSH key**。将转换后的密钥保存到用户配置文件文件夹中 `.ssh` 目录下的**本地**位置（例如 `C:\Users\youruser\.ssh`）。
3. 验证此新的**本地**文件是否归你所有，且没有其他用户拥有访问权限。
4. 在 VS Code 中，从命令面板（`kbstyle(F1)`）中运行 **Remote-SSH: Open Configuration File...**，选择你要更改的 SSH 配置文件，然后在配置文件中添加（或修改）主机条目，指向该文件：

    ```yaml
    Host name-of-ssh-host-here
        User your-user-name-on-host
        HostName host-fqdn-or-ip-goes-here
        IdentityFile ~/.ssh/exported-keyfile-from-putty
    ```

### 提高多用户服务器的安全性

Remote - SSH 扩展安装并维护"VS Code Server"。该服务器使用随机生成的密钥启动，任何到服务器的新连接都需要提供该密钥。密钥存储在远程磁盘上，仅当前用户可读。有一个 HTTP 路径（`/version`）无需身份验证即可访问。

默认情况下，服务器监听 `localhost` 上的随机 TCP 端口，然后将其转发到你的本地机器。如果你要连接到 **Linux 或 macOS** 主机，可以切换到使用锁定到特定用户的 Unix 套接字。然后转发此套接字而非端口。

> **注意：** 此设置**禁用连接多路复用**，因此建议配置[公钥身份验证](#configuring-key-based-authentication)。

配置方法：

1. 确保你在 Windows、macOS 或 Linux 上拥有**本地 OpenSSH 6.7+ SSH 客户端**，并拥有 **OpenSSH 6.7+ Linux 或 macOS 主机**（Windows 不支持此模式）。

2. 通过在**本地** VS Code [用户设置](/docs/configure/settings.md)中启用 **Remote.SSH: Remote Server Listen On Socket**，将 Remote - SSH 切换为套接字模式。

    ![Listen on socket VS Code setting](images/ssh/ssh-listen-on-socket.png)

3. 如果已经连接到 SSH 主机，请从命令面板（`kbstyle(F1)`）中选择 **Remote-SSH: Kill VS Code Server on Host...**，以便设置生效。

如果连接时遇到错误，可能需要在 SSH 主机的 [sshd config](https://www.ssh.com/ssh/sshd_config/) 中启用套接字转发。操作如下：

1. 在 **SSH 主机**上（而不是本地），用文本编辑器（如 vi、nano 或 pico）打开 `/etc/ssh/sshd_config`。
2. 添加设置 `AllowStreamLocalForwarding yes`。
3. 重启 SSH 服务器。（在 Ubuntu 上，运行 `sudo systemctl restart sshd`）。
4. 重试。

### 排查连接挂起或失败的问题

如果你遇到 VS Code 在尝试连接时挂起（并可能超时）的问题，可以采取以下措施来解决。

**常规故障排除：删除服务器**

有助于排查各种 Remote-SSH 问题的一个命令是 **Remote-SSH: Kill VS Code Server on Host**。这将删除服务器，可以解决你看到的多种问题和错误消息，例如 "Could not establish connection to `server_name`: The VS Code Server failed to start."

**查看 VS Code 是否正在等待提示**

在 VS Code 中启用 `remote.SSH.showLoginTerminal` [设置](/docs/configure/settings.md)并重试。如果系统提示你输入密码或令牌，请参阅[启用替代 SSH 身份验证方法](#enabling-alternate-ssh-authentication-methods)了解减少提示频率的详细信息。

如果仍然有问题，在 `settings.json` 中设置以下属性并重试：

```json
"remote.SSH.showLoginTerminal": true,
"remote.SSH.useLocalServer": false
```

**绕过某些版本 Windows OpenSSH server 的 bug**

由于某些版本的 Windows 版 OpenSSH server 存在 bug，用于判断主机是否运行 Windows 的默认检查可能无法正常工作。此问题不会出现在 Windows 1909 及更低版本自带的 OpenSSH server 中。

幸运的是，你可以通过在 `settings.json` 中添加以下内容，明确告诉 VS Code 你的 SSH 主机是否运行 Windows，从而绕过此问题：

```json
"remote.SSH.useLocalServer": false
```

你还可以使用以下属性强制 VS Code 将特定主机识别为 Windows：

```json
"remote.SSH.remotePlatform": {
    "host-in-ssh-config-or-fqdn": "windows"
}
```

已有修复被合并，因此此问题应在大于 8.1.0.0 的服务器版本中得到解决。

**在远程主机上启用 TCP 转发**

Remote - SSH 扩展利用 SSH 隧道来促进与主机的通信。在某些情况下，你的 SSH 服务器可能禁用了此功能。要检查是否为该问题，请打开输出窗口中的 **Remote - SSH** 类别，查找以下消息：

```
open failed: administratively prohibited: open failed
```

如果确实看到该消息，请按照以下步骤更新 SSH 服务器的 [sshd config](https://www.ssh.com/ssh/sshd_config/)：

1. 在 **SSH 主机**上（而不是本地），用文本编辑器（如 Vim、nano、Pico 或记事本）打开 `/etc/ssh/sshd_config` 或 `C:\ProgramData\ssh\sshd_config`。
2. 添加设置 `AllowTcpForwarding yes`。
3. 重启 SSH 服务器。（在 Ubuntu 上，运行 `sudo systemctl restart sshd`。在 Windows 上，在管理员 PowerShell 中运行 `Restart-Service sshd`）。
4. 重试。

**在 SSH 配置文件中设置 ProxyCommand 参数**

如果你在代理后面且无法连接到 SSH 主机，可能需要在**本地** [SSH 配置文件](https://linux.die.net/man/5/ssh_config)中为主机使用 `ProxyCommand` 参数。你可以阅读这篇 [SSH ProxyCommand 文章](https://www.cyberciti.biz/faq/linux-unix-ssh-proxycommand-passing-through-one-host-gateway-server/)了解其用法示例。

**确保远程机器可以访问互联网**

远程机器必须能够访问互联网，才能从 Marketplace 下载 VS Code Server 和扩展。有关连接要求的详细信息，请参阅[常见问题解答](/docs/remote/faq.md#what-are-the-connectivity-requirements-for-vs-code-server)。

**在远程主机上设置 HTTP_PROXY / HTTPS_PROXY**

如果你的远程主机在代理后面，可能需要在 **SSH 主机**上设置 HTTP_PROXY 或 HTTPS_PROXY 环境变量。打开你的 `~/.bashrc` 文件，添加以下内容（将 `proxy.fqdn.or.ip:3128` 替换为适当的主机名 / IP 和端口）：

```bash
export HTTP_PROXY=http://proxy.fqdn.or.ip:3128
export HTTPS_PROXY=$HTTP_PROXY

# 或者如果使用需要认证的代理
export HTTP_PROXY=http://username:password@proxy.fqdn.or.ip:3128
export HTTPS_PROXY=$HTTP_PROXY
```

**解决 `/tmp` 以 `noexec` 挂载的问题**

某些远程服务器设置为不允许从 `/tmp` 执行脚本。VS Code 将其安装脚本写入系统临时目录并尝试从那里执行它。你可以与系统管理员协商，确定是否有解决方法。

**检查安装期间是否启动了不同的 shell**

某些用户在 **SSH 主机**上从其 `.bash_profile` 或其他启动脚本启动了不同的 shell，因为他们想使用不同于默认的 shell。这可能会破坏 VS Code 的远程服务器安装脚本，不推荐这样做。请改用 `chsh` 更改远程机器上的默认 shell。

**连接到动态分配每连接机器的系统**

某些系统会在每次建立 SSH 连接时动态地将 SSH 连接路由到集群中的一个节点。这对 VS Code 来说是一个问题，因为它建立两个连接来打开远程窗口：第一个用于安装或启动 VS Code Server（或查找已在运行的实例），第二个用于创建 VS Code 用来与服务器通信的 SSH 端口隧道。如果 VS Code 在创建第二个连接时被路由到不同的机器，它将无法与 VS Code Server 通信。

一种解决方法是使用 OpenSSH 中的 `ControlMaster` 选项（仅限 macOS/Linux 客户端），如[启用替代 SSH 身份验证方法](#enabling-alternate-ssh-authentication-methods)中所述，这样 VS Code 的两个连接将通过单个 SSH 连接多路复用到同一节点。

**联系系统管理员获取配置帮助**

SSH 是一个非常灵活的协议，支持多种配置。如果你在登录终端或 **Remote-SSH** 输出窗口中看到其他错误，可能是由于缺少某个设置。

请联系你的系统管理员，了解你的 SSH 主机和客户端所需的设置。连接到 SSH 主机的特定命令行参数可以添加到 [SSH 配置文件](https://linux.die.net/man/5/ssh_config)中。

要访问你的配置文件，请在命令面板（`kbstyle(F1)`）中运行 **Remote-SSH: Open Configuration File...**。然后你可以与管理员合作添加必要的设置。

### 启用替代 SSH 身份验证方法

如果你正在连接到 SSH 远程主机，并且符合以下情况之一：

* 使用双因素身份验证连接
* 使用密码身份验证
* 在 [SSH Agent](#setting-up-the-ssh-agent) 未运行或不可访问时使用带密码的 SSH 密钥

那么 VS Code 应自动提示你输入所需信息。如果没有看到提示，请在 VS Code 中启用 `remote.SSH.showLoginTerminal` [设置](/docs/configure/settings.md)。此设置会在 VS Code 运行 SSH 命令时显示终端。然后你可以在终端出现时输入你的身份验证码、密码或密钥密码。

如果仍然有问题，可能需要在 `settings.json` 中添加以下属性并重试：

```json
"remote.SSH.showLoginTerminal": true,
"remote.SSH.useLocalServer": false
```

如果你使用 macOS 或 Linux，并且希望减少输入密码或令牌的频率，可以在**本地机器**上启用 `ControlMaster` 功能，以便 OpenSSH 在单个连接上运行多个 SSH 会话。

启用 `ControlMaster` 的方法：

1. 在你的 SSH 配置文件中添加类似以下内容的条目：

    ```yaml
    Host *
        ControlMaster auto
        ControlPath  ~/.ssh/sockets/%r@%h-%p
        ControlPersist  600
    ```

2. 然后运行 `mkdir -p ~/.ssh/sockets` 创建套接字文件夹。

### 设置 SSH Agent

如果你使用带密码的密钥连接到 SSH 主机，应确保 [SSH Agent](https://www.ssh.com/ssh/agent) 在**本地**运行。VS Code 将自动将你的密钥添加到 agent 中，这样你就不必每次打开远程 VS Code 窗口时都输入密码。

要验证 agent 是否正在运行并且可以从 VS Code 环境访问，请在本地 VS Code 窗口的终端中运行 `ssh-add -l`。你应该看到 agent 中密钥的列表（或者一条没有密钥的消息）。如果 agent 未运行，请按照以下说明启动它。启动 agent 后，请务必重启 VS Code。

**Windows：**

要在 Windows 上自动启用 SSH Agent，请启动**本地管理员 PowerShell** 并运行以下命令：

```powershell
# 确保你以管理员身份运行
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
Get-Service ssh-agent
```

现在 agent 将在登录时自动启动。

**Linux：**

要在后台启动 SSH Agent，运行：

```bash
eval "$(ssh-agent -s)"
```

要在登录时自动启动 SSH Agent，将这些行添加到你的 `~/.bash_profile`：

```bash
if [ -z "$SSH_AUTH_SOCK" ]; then
   # 检查当前是否有运行的 agent 实例
   RUNNING_AGENT="`ps -ax | grep 'ssh-agent -s' | grep -v grep | wc -l | tr -d '[:space:]'`"
   if [ "$RUNNING_AGENT" = "0" ]; then
        # 启动一个新的 agent 实例
        ssh-agent -s &> .ssh/ssh-agent
   fi
   eval `cat .ssh/ssh-agent`
fi
```

**macOS：**

在 macOS 上，agent 默认应处于运行状态。

### 使本地 SSH Agent 在远程可用

本地机器上的 SSH Agent 允许 Remote - SSH 扩展连接到所选远程系统，而无需反复提示输入密码，但在远程运行的 Git 等工具无法访问你本地已解锁的私钥。

你可以通过在远程打开集成终端并运行 `ssh-add -l` 来看到这一点。该命令应该列出已解锁的密钥，但反而报告无法连接到身份验证 agent 的错误。设置 `ForwardAgent yes` 使本地 SSH Agent 在远程环境中可用，从而解决此问题。

你可以通过编辑 `.ssh/config` 文件（或 `Remote.SSH.configFile` 指向的任何文件——使用 **Remote-SSH: Open SSH Configuration File...** 命令确认）并添加以下内容来实现：

```ssh-config
Host *
    ForwardAgent yes
```

请注意，你可能希望更严格一些，只对特定命名的主机设置该选项。

### 修复 SSH 文件权限错误

SSH 对文件权限要求严格，如果设置不正确，你可能会看到诸如 "WARNING: UNPROTECTED PRIVATE KEY FILE!" 之类的错误。有几种更新文件权限的方法可以解决此问题，如下文各节所述。

### 本地 SSH 文件和文件夹权限

**macOS / Linux：**

在你的本地机器上，确保设置了以下权限：

| 文件夹 / 文件 |  权限 |
|---------------|---------------------------|
| 用户文件夹中的 `.ssh` | `chmod 700 ~/.ssh` |
| 用户文件夹中的 `.ssh/config` | `chmod 600 ~/.ssh/config` |
| 用户文件夹中的 `.ssh/id_ed25519.pub` | `chmod 600 ~/.ssh/id_ed25519.pub` |
| 任何其他密钥文件 | `chmod 600 /path/to/key/file` |

**Windows：**

具体的预期权限可能因你使用的 SSH 实现而异。我们建议使用开箱即用的 [Windows 10 OpenSSH Client](https://learn.microsoft.com/windows-server/administration/openssh/openssh_overview)。

在这种情况下，确保 SSH 主机上远程用户的 `.ssh` 文件夹中的所有文件都归你所有，且没有其他用户拥有访问权限。详情请参阅 [Windows OpenSSH wiki](https://github.com/PowerShell/Win32-OpenSSH/wiki/Security-protection-of-various-files-in-Win32-OpenSSH)。

对于所有其他客户端，请查阅客户端的文档以了解实现所需的权限。

### 服务器 SSH 文件和文件夹权限

**macOS / Linux：**

在你连接到的远程机器上，确保设置了以下权限：

| 文件夹 / 文件 | Linux / macOS 权限 |
|---------------|---------------------------|
| 服务器上用户文件夹中的 `.ssh` | `chmod 700 ~/.ssh` |
| 服务器上用户文件夹中的 `.ssh/authorized_keys`  | `chmod 600 ~/.ssh/authorized_keys` |

请注意，目前仅支持 Linux 主机，因此省略了 macOS 和 Windows 10 的权限说明。

**Windows：**

有关设置 Windows OpenSSH server 适当文件权限的详细信息，请参阅 [Windows OpenSSH wiki](https://github.com/PowerShell/Win32-OpenSSH/wiki/Security-protection-of-various-files-in-Win32-OpenSSH)。

### 安装受支持的 SSH 客户端

| 操作系统 | 说明 |
|----|--------------|
| Windows 10 1803+ / Server 2016/2019 1803+ | 安装 [Windows OpenSSH Client](https://learn.microsoft.com/windows-server/administration/openssh/openssh_install_firstuse)。 |
| 更早版本的 Windows | 安装 [Git for Windows](https://git-scm.com/download/win)。 |
| macOS | 系统预装。 |
| Debian/Ubuntu | 运行 `sudo apt-get install openssh-client` |
| RHEL / Fedora / CentOS | 运行 `sudo yum install openssh-clients` |

VS Code 将在 PATH 中查找 `ssh` 命令。如果找不到，在 Windows 上它将尝试在默认的 Git for Windows 安装路径中查找 `ssh.exe`。你也可以通过在 `settings.json` 中添加 `remote.SSH.path` 属性来明确告诉 VS Code 在哪里查找 SSH 客户端。

### 安装受支持的 SSH 服务器

| 操作系统 | 说明 | 详情 |
|----|--------------|---|
| Debian 8+ / Ubuntu 16.04+ | 运行 `sudo apt-get install openssh-server` |  请参阅 [Ubuntu SSH](https://help.ubuntu.com/community/SSH?action=show) 文档了解详细信息。 |
| RHEL / CentOS 7+ | 运行 `sudo yum install openssh-server && sudo systemctl start sshd.service && sudo systemctl enable sshd.service` | 请参阅 [RedHat SSH](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/deployment_guide/ch-openssh) 文档了解详细信息。 |
| SuSE 12+ / openSUSE 42.3+ |  在 Yast 中，转到服务管理器，在列表中选择 "sshd"，然后点击**启用**。接下来转到防火墙，选择**永久**配置，在服务下勾选 **sshd**。 | 请参阅 [SuSE SSH](https://en.opensuse.org/OpenSSH) 文档了解详细信息。 |
| Windows 10 1803+ / Server 2016/2019 1803+ | 安装 [Windows OpenSSH Server](https://learn.microsoft.com/windows-server/administration/openssh/openssh_install_firstuse)。 |
| macOS 10.14+ (Mojave) | 启用[远程登录](https://support.apple.com/guide/mac-help/allow-a-remote-computer-to-access-your-mac-mchlp1066/mac)。 | |

### 解决在 SSH 主机上执行 Git push 或同步时的挂起问题

如果你使用 SSH 克隆 Git 仓库且你的 SSH 密钥有密码，那么在远程运行时 VS Code 的拉取和同步功能可能会挂起。

要么使用没有密码的 SSH 密钥，使用 HTTPS 克隆，要么从命令行运行 `git push` 来绕过此问题。

### 使用 SSHFS 访问远程主机上的文件

[SSHFS](https://en.wikipedia.org/wiki/SSHFS) 是一种基于 SFTP 构建的安全远程文件系统访问协议。与 CIFS / Samba 共享相比，它的优势在于只需要对机器的 SSH 访问即可。

> **注意：** 出于性能原因，SSHFS 最适合用于单文件编辑和上传/下载内容。如果你需要使用批量读/写大量文件的应用程序（如本地源代码管理工具），[rsync](#using-rsync-to-maintain-a-local-copy-of-your-source-code) 是更好的选择。

**macOS / Linux**：

在 Linux 上，你可以使用发行版的包管理器安装 SSHFS。对于 Debian/Ubuntu：`sudo apt-get install sshfs`

> **注意：** WSL 1 不支持 FUSE 或 SSHFS，因此目前在 Windows 上的说明有所不同。**WSL 2 确实包含 FUSE 和 SSHFS 支持**，因此这种情况将很快改变。

在 macOS 上，你可以使用 [Homebrew](https://brew.sh/) 安装 SSHFS：

```bash
brew install --cask macfuse
brew install gromgit/fuse/sshfs-mac
brew link --overwrite sshfs-mac
```

此外，如果你不想使用命令行来挂载远程文件系统，也可以安装 [SSHFS GUI](https://github.com/dstuecken/sshfs-gui)。

要使用命令行，请从本地终端运行以下命令（将 `user@hostname` 替换为远程用户和主机名 / IP）：

```bash
export USER_AT_HOST=user@hostname
# 创建将挂载远程文件系统的目录
mkdir -p "$HOME/sshfs/$USER_AT_HOST"
# 挂载远程文件系统
sshfs "$USER_AT_HOST:" "$HOME/sshfs/$USER_AT_HOST" -ovolname="$USER_AT_HOST" -p 22  \
    -o workaround=nonodelay -o transform_symlinks -o idmap=user  -C
```

这将使远程机器上的主文件夹在 `~/sshfs` 下可用。完成后，你可以使用操作系统的 Finder / 文件资源管理器或通过命令行卸载它：

```bash
umount "$HOME/sshfs/$USER_AT_HOST"
```

**Windows：**

按照以下步骤操作：

1. 在 Linux 上，将 `.gitattributes` 文件添加到你的项目中，以**强制在 Linux 和 Windows 之间使用一致的行尾**，避免因两个操作系统之间的 CRLF/LF 差异导致意外问题。详情请参阅[解决 Git 行尾问题](#resolving-git-line-ending-issues-in-wsl-resulting-in-many-modified-files)。

2. 接下来，使用 [Chocolatey](https://chocolatey.org/) 安装 [SSHFS-Win](https://github.com/billziss-gh/sshfs-win)：`choco install sshfs`

3. 安装 Windows 版 SSHFS 后，你可以使用文件资源管理器的**映射网络驱动器...**选项，路径为 `\\sshfs\user@hostname`，其中 `user@hostname` 是你的远程用户和主机名 / IP。你可以使用命令提示符编写脚本如下：`net use /PERSISTENT:NO X: \\sshfs\user@hostname`

4. 完成后，在文件资源管理器中右键单击驱动器并选择**断开连接**来断开连接。

### 从终端连接到远程主机

一旦配置了主机，你可以通过传递远程 URI 直接从终端连接到它。

例如，要连接到 `remote_server` 并打开 `/code/my_project` 文件夹，运行：

```bash
code --remote ssh-remote+remote_server /code/my_project
```

我们需要对输入路径是文件还是文件夹进行一些猜测。如果它有文件扩展名，则被视为文件。

要强制打开文件夹，在路径末尾添加斜杠或使用：

`code --folder-uri vscode-remote://ssh-remote+remote_server/code/folder.with.dot`

要强制打开文件，添加 `--goto` 或使用：

`code --file-uri vscode-remote://ssh-remote+remote_server/code/fileWithoutExtension`

### 使用 rsync 维护源代码的本地副本

[使用 SSHFS 访问远程文件](#using-sshfs-to-access-files-on-your-remote-host)的替代方案是[使用 `rsync`](https://rsync.samba.org/) 将远程主机上文件夹的全部内容复制到你的本地机器。`rsync` 命令将确定每次运行时需要更新哪些文件，这比使用 `scp` 或 `sftp` 等方式高效和方便得多。这主要是在你确实需要使用多文件或性能密集型本地工具时才需要考虑的。

`rsync` 命令在 macOS 上开箱即用，可以使用 Linux 包管理器安装（例如在 Debian/Ubuntu 上运行 `sudo apt-get install rsync`）。对于 Windows，你需要使用 [WSL](https://learn.microsoft.com/windows/wsl/install) 或 [Cygwin](https://www.cygwin.com/) 来访问该命令。

要使用该命令，导航到你要存储同步内容的文件夹，运行以下命令，将 `user@hostname` 替换为远程用户和主机名 / IP，将 `/remote/source/code/path` 替换为远程源代码位置。

在 **macOS、Linux 或 WSL 内**：

```bash
rsync -rlptzv --progress --delete --exclude=.git "user@hostname:/remote/source/code/path" .
```

或者从 Windows 上的 **PowerShell 使用 WSL**：

```powershell
wsl rsync -rlptzv --progress --delete --exclude=.git "user@hostname:/remote/source/code/path" "`$(wslpath -a '$PWD')"
```

你可以在每次要获取文件的最新副本时重新运行此命令，只有更新内容会被传输。`.git` 文件夹被有意排除，既是出于性能原因，也是为了你可以使用本地 Git 工具，而无需担心远程主机上的状态。

要推送内容，在命令中交换源参数和目标参数。但是，**在 Windows 上**，你应该在此之前向项目添加 `.gitattributes` 文件以**强制使用一致的行尾**。详情请参阅[解决 Git 行尾问题](#resolving-git-line-ending-issues-in-wsl-resulting-in-many-modified-files)。

```bash
rsync -rlptzv --progress --delete --exclude=.git . "user@hostname:/remote/source/code/path"
```

### 清理远程上的 VS Code Server

SSH 扩展提供了一个用于从远程机器清理 VS Code Server 的命令 **Remote-SSH: Uninstall VS Code Server from Host...**。该命令执行两项操作：终止所有正在运行的 VS Code Server 进程，并删除安装服务器的文件夹。

如果你想手动运行这些步骤，或者该命令对你无效，你可以运行如下脚本：

```bash
# 终止服务器进程
kill -9 $(ps aux | grep vscode-server | grep $USER | grep -v grep | awk '{print $2}')
# 删除相关文件和文件夹
rm -rf $HOME/.vscode-server # 或 ~/.vscode-server-insiders
```

VS Code Server 之前安装在 `~/.vscode-remote` 下，因此你也可以检查该位置。

### SSH 进入远程 WSL 2 主机

你可能希望使用 SSH 连接到在远程机器上运行的 WSL 发行版。请查看[本指南](https://www.hanselman.com/blog/the-easy-way-how-to-ssh-into-bash-and-wsl2-on-windows-10-from-an-external-machine)，了解如何从外部机器 SSH 进入 Windows 10 上的 Bash 和 WSL 2。

### 提交问题

如果你在使用 Remote-SSH 扩展时遇到问题并认为需要提交 issue，请先确保你已经阅读了本网站上的文档，然后参阅[故障排除 wiki 文档](https://github.com/microsoft/vscode-remote-release/wiki/Remote-SSH-troubleshooting)，了解获取日志文件的信息以及尝试更多可能有助于缩小问题来源的步骤。

## Dev Containers 提示

如果你想了解使用 Dev Containers 的提示，可以前往 Dev Containers [提示与技巧](/docs/devcontainers/tips-and-tricks.md)。

## WSL 提示

### 首次启动：VS Code Server 先决条件

某些 WSL Linux 发行版缺少 VS Code Server 启动所需的库。你可以使用其包管理器向 Linux 发行版添加额外的库。

#### Debian 和 Ubuntu

打开 Debian 或 Ubuntu WSL shell 添加 `wget` 和 `ca-certificates`：

```sh
sudo apt-get update && sudo apt-get install wget ca-certificates
```

#### Alpine

以 root 身份（`wsl -d Alpine -u root`）打开 Alpine WSL shell 添加 `libstdc++`：

```sh
apk update && apk add libstdc++
```

在 Windows 10 2018 年 4 月更新（构建版本 1803）及更早版本上，需要 `/bin/bash`：

```sh
apk update && apk add bash
```

### 选择 WSL 扩展使用的发行版

**WSL: New Window** 将打开注册为默认的 WSL 发行版。

要打开非默认发行版，请从该发行版的 WSL shell 运行 `code .`，或使用 **WSL: New Window using Distro**。

对于早于 Windows 10 2019 年 5 月更新（版本 1903）的 WSL 版本，WSL 命令只能使用**默认发行版**。因此，WSL 扩展可能会提示你是否同意更改默认发行版。

你始终可以使用 [wslconfig.exe](https://learn.microsoft.com/windows/wsl/wsl-config) 更改你的默认发行版。

例如：

```bat
wslconfig /setdefault Ubuntu
```

你可以通过运行以下命令查看已安装的发行版：

```bat
wslconfig /l
```

### 配置服务器启动的环境

当 WSL 扩展在 WSL 中启动 VS Code Server 时，它不会运行任何 shell 配置脚本。这是为了避免自定义配置脚本阻止启动。

如果你需要配置启动环境，可以使用[这里](/docs/remote/wsl.md#advanced-environment-setup-script)描述的环境设置脚本。

### 配置远程扩展主机的环境

远程扩展主机和终端的环境基于默认 shell 的配置脚本。为了评估远程扩展主机进程的环境变量，服务器创建一个默认 shell 的实例作为**交互式登录 shell**。它从中探测环境变量，并将其用作远程扩展主机进程的初始环境。因此，环境变量的值取决于配置为默认的 shell 以及该 shell 的配置脚本内容。

请参阅 [Unix shell 初始化](https://github.com/rbenv/rbenv/wiki/unix-shell-initialization)了解每个 shell 配置脚本的概述。大多数 WSL 发行版将 `/bin/bash` 配置为默认 shell。`/bin/bash` 将首先查找 `/etc/profile` 下的启动文件，然后查找 `~/.bash_profile`、`~/.bash_login`、`~/.profile` 下的启动文件。

要更改 WSL 发行版的默认 shell，请按照[这篇博客文章](https://medium.com/@vinhp/set-and-use-zsh-as-default-shell-in-wsl-on-windows-10-the-right-way-4f30ed9592dc)的说明操作。

### 修复 code 命令无法工作的问题

如果从 Window 上的 WSL 终端输入 `code` 不起作用，因为找不到 `code`，你可能在 WSL 的 PATH 中缺少一些关键位置。

通过打开 WSL 终端并输入 `echo $PATH` 进行检查。你应该看到 VS Code 安装路径列在其中。默认情况下，这将是：

```bash
/mnt/c/Users/Your Username/AppData/Local/Programs/Microsoft VS Code/bin
```

但是，如果你使用了**系统安装程序**，安装路径为：

```bash
/mnt/c/Program Files/Microsoft VS Code/bin
```

...或者...

```bash
/mnt/c/Program Files (x86)/Microsoft VS Code/bin
```

WSL 的一个特性是路径从 Windows 的 PATH 变量继承。要更改 Windows PATH 变量，请从 Windows 开始菜单中使用**编辑账户的环境变量**命令。

如果你已禁用路径共享功能，请编辑你的 `.bashrc`，添加以下内容，然后启动一个新终端：

```bash
WINDOWS_USERNAME="Your Windows Alias"

export PATH="$PATH:/mnt/c/Windows/System32:/mnt/c/Users/${WINDOWS_USERNAME}/AppData/Local/Programs/Microsoft VS Code/bin"
# 或者...
# export PATH="$PATH:/mnt/c/Program Files/Microsoft VS Code/bin"
# 或者...
# export PATH="$PATH:/mnt/c/Program Files (x86)/Microsoft VS Code/bin"

```

> **注意：** 请务必对目录名中的空格字符加引号或转义。

### 查找 'code' 命令的问题

如果从 Windows 命令提示符输入 `code` 无法启动 VS Code，你可以通过运行 `VSCODE_WSL_DEBUG_INFO=true code .` 来帮助我们诊断问题。

请提交 issue 并附上完整输出。

### 查找启动或连接服务器的问题

当 WSL 窗口无法连接到远程服务器时，你可以在 WSL 日志中获取更多信息。提交 issue 时，始终发送 WSL 日志的完整内容非常重要。

通过运行 **WSL: Open Log** 命令打开 WSL 日志。日志将显示在终端视图中 WSL 选项卡下。

![WSL Log](images/troubleshooting/wsl-log.png)

要获取更详细的日志，请在用户设置中启用 `remote.WSL.debug` 设置。

### 服务器因段错误启动失败

你可以通过向我们发送核心转储文件来帮助我们调查此问题。要获取核心转储文件，请按照以下步骤操作：

在 Windows 命令提示符中：

* 运行 `code --locate-extension ms-vscode-remote.remote-wsl` 确定 WSL 扩展文件夹。
* `cd` 到返回的路径。
* 用 VS Code 打开 `wslServer.sh` 脚本，`code .\scripts\wslServer.sh`。
* 在最后一行之前（在 `"$VSCODE_REMOTE_BIN/$COMMIT/bin/$SERVER_APPNAME" "$@"` 之前），添加
`ulimit -C unlimited`。
* 启动运行远程服务器的 WSL 窗口，等待段错误发生。

核心文件将位于上述 WSL 扩展文件夹中。

### 我看到 EACCES: permission denied 错误，尝试重命名打开工作区中的文件夹

这是 WSL 文件系统实现的一个已知问题（[Microsoft/WSL#3395](https://github.com/microsoft/WSL/issues/3395), [Microsoft/WSL#1956](https://github.com/microsoft/WSL/issues/1956)），由 VS Code 活动的文件监视器引起。该问题仅在 WSL 2 中修复。

要避免此问题，请将 `remote.WSL.fileWatcher.polling` 设置为 true。但是，基于轮询的方式对大型工作区有性能影响。

对于大型工作区，你可能希望增加轮询间隔 `remote.WSL.fileWatcher.pollingInterval`，并使用 `setting(files.watcherExclude)` 控制监视的文件夹。

[WSL 2](https://learn.microsoft.com/windows/wsl/compare-versions#whats-new-in-wsl-2) 没有该文件监视器问题，不受此新设置影响。

### 解决 WSL 中的 Git 行尾问题（导致大量修改的文件）

由于 Windows 和 Linux 使用不同的默认行尾，Git 可能会报告大量除了行尾之外没有差异的修改文件。为防止这种情况发生，你可以使用 `.gitattributes` 文件或在 Windows 端全局禁用行尾转换。

通常，在仓库中添加或修改 `.gitattributes` 文件是解决此问题的最可靠方法。将此文件提交到源代码管理将帮助其他人，并允许你根据情况按仓库改变行为。例如，将以下内容添加到仓库根目录的 `.gitattributes` 文件将强制所有内容使用 LF，除了需要 CRLF 的 Windows 批处理文件：

```yaml
* text=auto eol=lf
*.{cmd,[cC][mM][dD]} text eol=crlf
*.{bat,[bB][aA][tT]} text eol=crlf
```

请注意，这适用于 **Git v2.10+**，因此如果你遇到问题，请确保你安装了最新的 Git 客户端。你可以在此文件中添加仓库中需要 CRLF 的其他文件类型。

如果你仍希望始终上传 Unix 风格的行尾（LF），可以使用 `input` 选项。

```bash
git config --global core.autocrlf input
```

如果你希望完全禁用行尾转换，请改为运行以下命令：

```bash
git config --global core.autocrlf false
```

最后，你可能需要重新克隆仓库以使这些设置生效。

### 在 Windows 和 WSL 之间共享 Git 凭据

如果你使用 HTTPS 克隆仓库并**在 Windows 中[配置了凭据助手](https://docs.github.com/get-started/getting-started-with-git/caching-your-github-credentials-in-git)**，你可以与 WSL 共享此设置，这样你输入的密码将在两边都保存下来。（请注意，这不适用于使用 SSH 密钥。）

只需按照以下步骤操作：

1. 通过在 **Windows 命令提示符**或 **PowerShell** 中运行以下命令，在 Windows 上配置凭据管理器：

    ```bat
     git config --global credential.helper wincred
    ```

2. 通过在 **WSL 终端**中运行以下命令，将 WSL 配置为使用相同的凭据助手：

    ```bash
     git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"
    ```

现在，在 Windows 端使用 Git 时输入的任何密码都将对 WSL 可用，反之亦然。

### 解决从 WSL 执行 Git push 或同步时的挂起问题

如果你使用 SSH 克隆 Git 仓库且你的 SSH 密钥有密码，那么在远程运行时 VS Code 的拉取和同步功能可能会挂起。

要么使用没有密码的 SSH 密钥，使用 HTTPS 克隆，要么从命令行运行 `git push` 来绕过此问题。

## GitHub Codespaces 提示

有关 [GitHub Codespaces](https://github.com/features/codespaces) 的提示和问题，请参阅 [GitHub Codespaces 文档](https://docs.github.com/github/developing-online-with-codespaces)。你还可以查看可能影响你 Codespaces 的[已知 Web 限制和适应措施](/docs/remote/codespaces.md#known-limitations-and-adaptations)。

## 扩展提示

虽然许多扩展无需修改即可工作，但有一些问题可能会阻止某些功能按预期工作。在某些情况下，你可以使用其他命令来绕过该问题，而在其他情况下，扩展可能需要进行修改。本节提供了常见问题的快速参考和解决提示。你还可以参阅[支持远程开发](/api/advanced-topics/remote-extensions)的主要扩展文章，了解修改扩展以支持远程扩展主机的深入指南。

### 解决有关缺失依赖项的错误

某些扩展依赖于某些 WSL Linux 发行版基本安装中找不到的库。你可以使用其包管理器向 Linux 发行版添加额外的库。对于基于 Ubuntu 和 Debian 的发行版，运行 `sudo apt-get install <package>` 来安装所需的库。请查看扩展文档或错误消息中提到的运行时以获取其他安装详细信息。

### 本地绝对路径设置在远程应用时失败

当你连接到远程端点时，VS Code 的本地用户设置会被重用。虽然这保持了用户体验的一致性，但你可能需要在本地机器和每台主机/容器/WSL 之间改变绝对路径设置，因为目标位置不同。

**解决方法：** 连接到远程端点后，你可以通过从命令面板（`kbstyle(F1)`）运行 **Preferences: Open Remote Settings** 命令，或在设置编辑器中选择**远程**选项卡来设置端点特定的设置。这些设置将在你连接时覆盖任何已有的本地设置。

### 需要在远程端点上安装本地 VSIX

有时你想在远程机器上安装本地 VSIX，无论是在开发期间还是当扩展作者要求你试修复程序时。

**解决方法：** 连接到 SSH 主机、容器或 WSL 后，你可以像在本地一样安装 VSIX。从命令面板（`kbstyle(F1)`）运行 **Extensions: Install from VSIX...** 命令。你可能还希望将 `"extensions.autoUpdate": false` 添加到 `settings.json` 中，以防止自动更新到最新的 Marketplace 版本。有关在远程环境中开发和测试扩展的更多信息，请参阅[支持远程开发](/api/advanced-topics/remote-extensions)。

### 浏览器不在本地打开

某些扩展使用外部 node 模块或自定义代码来启动浏览器窗口。不幸的是，这可能导致扩展在远程而不是本地启动浏览器。

**解决方法：** 扩展可以使用 `vscode.env.openExternal` API 解决此问题。详情请参阅[扩展作者指南](/api/advanced-topics/remote-extensions#opening-something-in-a-local-browser-or-application)。

### 剪贴板不工作

某些扩展使用 `clipboardy` 等 node 模块与剪贴板集成。不幸的是，这可能导致扩展错误地与远程端的剪贴板集成。

**解决方法：** 扩展可以切换到 VS Code 剪贴板 API 来解决此问题。详情请参阅[扩展作者指南](/api/advanced-topics/remote-extensions#using-the-clipboard)。

### 无法从浏览器或应用程序访问本地 Web 服务器

在容器、SSH 主机内或通过 GitHub Codespaces 工作时，浏览器连接到的端口可能被阻止。

**解决方法：** 扩展可以使用 `vscode.env.openExternal` 或 `vscode.env.asExternalUri` API（自动转发 localhost 端口）来解决此问题。详情请参阅[扩展作者指南](/api/advanced-topics/remote-extensions#opening-something-in-a-local-browser-or-application)。作为变通方法，使用**转发端口**命令手动执行此操作。

### Webview 内容不显示

如果扩展的 webview 内容使用 `iframe` 连接到本地 Web 服务器，则 webview 连接到的端口可能被阻止。此外，如果扩展硬编码 `vscode-resource://` URI 而不是使用 `asWebviewUri`，内容可能不会在 Codespaces 浏览器编辑器中显示。

**解决方法：** 扩展可以使用 `webview.asWebviewUri` 来解决 `vscode-resource://` URI 的问题。

如果端口被阻止，最佳方法是改用 [webview 消息传递](/api/extension-guides/webview#scripts-and-message-passing) API。作为变通方法，可以使用 `vscode.env.asExternalUri` 允许 webview 从 VS Code 连接到生成的 localhost Web 服务器。但是，目前由于 [MicrosoftDocs/vscodespaces#11](https://github.com/MicrosoftDocs/vscodespaces/issues/11)，此功能对 Codespaces 基于浏览器的编辑器（仅）已被阻止。有关变通方法的详细信息，请参阅[扩展作者指南](/api/advanced-topics/remote-extensions#workarounds-for-using-localhost-from-a-webview)。

### 被阻止的 localhost 端口

如果你尝试从外部应用程序连接到 localhost 端口，该端口可能被阻止。

**解决方法：** VS Code 1.40 引入了一个新的 `vscode.env.asExternalUri` API，供扩展以编程方式转发任意端口。详情请参阅[扩展作者指南](/api/advanced-topics/remote-extensions#forwarding-localhost)。作为变通方法，你可以使用**转发端口**命令手动执行此操作。

### 存储扩展数据时出错

扩展可能会通过在 Linux 上查找 `~/.config/Code` 文件夹来尝试持久化全局数据。此文件夹可能不存在，这可能导致扩展抛出类似 `ENOENT: no such file or directory, open '/root/.config/Code/User/filename-goes-here` 的错误。

**解决方法：** 扩展可以使用 `context.globalStorageUri` 或 `context.storageUri` 属性来解决此问题。详情请参阅[扩展作者指南](/api/advanced-topics/remote-extensions#persisting-extension-data-or-state)。

### 无法登录 / 每次连接到新端点时都必须登录

需要登录的扩展可能使用自己的代码来持久化密钥。此代码可能因缺少依赖项而失败。即使成功，密钥也将存储在远程，这意味着你必须为每个新端点登录。

**解决方法：** 扩展可以使用 [SecretStorage API](https://code.visualstudio.com/api/references/vscode-api#SecretStorage) 来解决此问题。详情请参阅[扩展作者指南](/api/advanced-topics/remote-extensions#persisting-secrets)。

### 不兼容的扩展阻止 VS Code 连接

如果远程主机、容器或 WSL 上安装了不兼容的扩展，我们见过因不兼容导致 VS Code Server 挂起或崩溃的情况。如果扩展立即激活，这可能会阻止你连接和卸载该扩展。

**解决方法：** 按照以下步骤手动删除远程扩展文件夹：

1. 对于容器，确保你的 `devcontainer.json` 不再包含对有问题扩展的引用。

2. 接下来，使用单独的终端 / 命令提示符连接到远程主机、容器或 WSL。

   * 如果是 SSH 或 WSL，相应地连接到环境（运行 `ssh` 连接到服务器或打开 WSL 终端）。
   * 如果使用容器，通过调用 `docker ps -a` 并在列表中查找具有正确名称的镜像来确定容器 ID。如果容器已停止，运行 `docker run -it <id> /bin/sh`。如果正在运行，运行 `docker exec -it <id> /bin/sh`。

3. 连接后，为 VS Code 稳定版运行 `rm -rf ~/.vscode-server/extensions`，和/或为 VS Code Insiders 运行 `rm -rf ~/.vscode-server-insiders/extensions` 来删除所有扩展。

### 自带或获取预构建原生模块的扩展失败

随 VS Code 扩展捆绑（或为其动态获取）的原生模块必须[使用 Electron 的 `electron-rebuild`](https://electronjs.org/docs/tutorial/using-native-node-modules) 重新编译。然而，VS Code Server 运行标准（非 Electron）版本的 Node.js，这可能导致二进制文件在远程使用时失败。

**解决方法：** 扩展需要进行修改以解决此问题。它们需要包含（或动态获取）两套二进制文件（Electron 和标准 Node.js），对应 VS Code 附带的 Node.js 中的"modules"版本，然后在其激活函数中检查 `context.executionContext === vscode.ExtensionExecutionContext.Remote` 以设置正确的二进制文件。详情请参阅[扩展作者指南](/api/advanced-topics/remote-extensions#using-native-nodejs-modules)。

### 扩展仅在非 x86_64 主机或 Alpine Linux 上失败

如果扩展在 Debian 9+、Ubuntu 16.04+ 或 RHEL / CentOS 7+ 远程 SSH 主机、容器或 WSL 上工作，但在受支持的非 x86_64 主机（例如 ARMv7l）或 Alpine Linux 容器上失败，则该扩展可能仅包含不支持这些平台的原生代码或运行时。例如，扩展可能仅包含 x86_64 编译版本的原生模块或运行时。对于 Alpine Linux，包含的原生代码或运行时可能因 Alpine Linux (`musl`) 与其他发行版 (`glibc`) 之间 `libc` 实现方式的[根本差异](https://wiki.musl-libc.org/functional-differences-from-glibc.html)而无法工作。

**解决方法：**
扩展需要通过为这些额外目标编译/包含二进制文件来选择支持这些平台。重要的是要注意，某些第三方 npm 模块也可能包含会导致此问题的原生代码。因此，在某些情况下，你可能需要与 npm 模块作者合作添加额外的编译目标。详情请参阅[扩展作者指南](/api/advanced-topics/remote-extensions#supporting-nonx8664-hosts-or-alpine-linux-containers)。

### 扩展因缺少模块而失败

依赖 Electron 或 VS Code 基础模块（未通过扩展 API 暴露）而没有提供回退的扩展在远程运行时可能会失败。你可能会在开发者工具控制台中看到 `original-fs` 未找到之类的错误。

**解决方法：** 移除对 Electron 模块的依赖或提供回退。详情请参阅[扩展作者指南](/api/advanced-topics/remote-extensions#avoid-using-electron-modules)。

### 无法访问/传输远程工作区文件到本地机器

在外部应用程序中打开工作区文件的扩展可能会遇到错误，因为外部应用程序无法直接访问远程文件。

**解决方法：** 如果你创建了一个旨在本地运行的"UI"扩展，则可以使用 `vscode.workspace.fs` API 与远程工作区文件系统交互。然后，你可以将其作为"Workspace"扩展的依赖项，并根据需要使用命令调用它。有关不同类型的扩展以及如何使用命令在它们之间进行通信的详细信息，请参阅[扩展作者指南](/api/advanced-topics/remote-extensions)。

### 无法从扩展访问连接的设备

访问本地连接设备的扩展在远程运行时将无法连接到它们。

**解决方法：** 目前暂无。我们正在研究解决此问题的最佳方法。

## 问题和反馈

### 报告问题

如果你遇到某个远程开发扩展的问题，收集正确的日志非常重要，这样我们才能帮助你[诊断问题](https://aka.ms/vscode-remote/issues/new)。

每个远程扩展都有一个查看其日志的命令。

你可以通过命令面板（`kbstyle(F1)`）中的 **Remote-SSH: Show Log** 获取 Remote - SSH 扩展日志。报告 Remote - SSH 问题时，也请验证你是否能够从外部终端（不使用 Remote - SSH）SSH 进入你的机器。

同样，你可以通过 **Dev Containers: Show Container Log** 获取 Dev Containers 扩展日志。

与上述两者一样，你可以通过 **WSL: Show Log** 获取 WSL 扩展日志。还要检查你的问题是否在 [WSL 仓库](https://github.com/microsoft/WSL/issues)中被跟踪（而不是由 WSL 扩展引起的）。

如果你在远程使用其他扩展时遇到问题（例如，其他扩展在远程上下文中未正确加载或安装），从**远程扩展主机**输出通道获取日志会很有帮助（**Output: Focus on Output View**），然后从下拉菜单中选择 **Log (Remote Extension Host)**。

> **注意**：如果你只看到 **Log (Extension Host)**，这是本地扩展主机，远程扩展主机未启动。这是因为日志通道仅在日志文件创建后才创建，因此如果远程扩展主机未启动，远程扩展主机日志文件未创建，也不会显示在输出视图中。在 issue 中提供此信息仍然很有帮助。

### 远程问题和反馈资源

我们有各种其他远程资源：

* 参阅[远程开发常见问题解答](/docs/remote/faq.md)。
* 在 [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-remote) 上搜索。
* 添加[功能请求](https://aka.ms/vscode-remote/feature-requests)或[报告问题](https://aka.ms/vscode-remote/issues/new)。
