---
ContentId: DDE07043-BA8C-4D75-B392-ABACC31F6EA8
DateApproved: 11/21/2022
MetaDescription: 通过 SSH 连接到远程机器上运行的 Docker 引擎，并将远程机器用作 Visual Studio Code 的开发环境。
---
# 通过 SSH 连接到远程 Docker

我们建议使用 Visual Studio Code 的 [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) 扩展来连接到运行 Docker 引擎的远程机器。你可以将 [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) 和 [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) 扩展一起使用。你可以查看 [Dev Containers 文档](/docs/devcontainers/containers.md#open-a-folder-on-a-remote-ssh-host-in-a-container) 中的步骤。

也可以通过 SSH 隧道直接连接到远程 Docker 引擎，详情请参阅下文。

## 设置 SSH 隧道

1. 使用 [ssh-keygen](https://www.ssh.com/ssh/keygen) 或类似工具获取并配置用于 SSH 身份验证的公钥/私钥对。Docker 不支持密码身份验证，并且基于 `DOCKER_HOST` 的配置无法使用密码认证。如果已经设置好了密钥对，则可以直接使用。

1. 在**本地**系统上使用上面生成的**私钥**文件配置 `ssh-agent`。

    * **Windows (OpenSSH)：** 最新版本的 Windows 10 默认包含 OpenSSH。有一个 Windows 服务 `ssh-agent`，默认是禁用的，需要重新启用并设置为自动启动。在管理员 PowerShell 提示符下，运行 `Set-Service ssh-agent -StartupType "Automatic"` 和 `Start-Service ssh-agent`。然后执行 `ssh-add <keyfile>`。

    * **Windows (Pageant)：** 你可以使用 Pageant 代替 OpenSSH，这种情况下需要设置环境变量 `SSH_AUTH_SOCK=pageant`。将其设为用户或系统环境变量最为简便。

    * **Linux：** `ssh-agent` 默认存在。执行 `ssh-add <keyfile>`。已在 Ubuntu 上测试；其他发行版的结果可能有所不同。

    * **macOS：** `ssh-agent` 默认存在，但 `ssh-add` 不会在登录之间持久保留。执行 `ssh-add <keyfile>`。我们建议配置 VS Code 在终端启动时运行此命令，通过 `setting(terminal.integrated.profiles.osx)` 的 `args` 值进行配置，或者配置启动脚本。你也可以在每次登录时手动运行该命令。

1. 使用 `ssh-add -l` 验证你的身份信息是否对代理可用。它应该列出一个或多个身份信息，类似于 `2048 SHA256:abcdefghijk somethingsomething (RSA)`。如果没有列出任何身份信息，你将无法连接。此外，它还需要具有正确的身份信息。如果 Docker CLI 正常工作，容器资源管理器也应该正常工作。容器资源管理器窗口使用 Docker CLI，而 Docker CLI 又使用 `ssh` 命令，并受益于自动推断的配置。

1. 创建一个指向运行 Docker 的远程机器的 [Docker 上下文](https://docs.docker.com/engine/context/working-with-contexts/)。使用 `ssh://username@host:port` 作为 Docker 端点（将 "host" 替换为你的远程机器名称或远程机器 IP 地址）。在终端窗口中执行以下命令：

    ```shell
    docker context create my-remote-docker-machine --docker "host=ssh://username@host:port"
    ```

    始终在 Docker 端点地址中包含用户名，即使它与本地用户名相同。如果省略端口，则默认为 22。

1. 使用**命令面板**（`kb(workbench.action.showCommands)`）执行 **Docker Contexts: Use** 命令，以激活指向远程机器的 Docker 上下文。此命令会使 VS Code 和 Docker CLI 都使用远程机器上下文。

    如果没有此命令，请确保安装 [Container Tools 扩展](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-containers)。

1. 建议使用 `containers.explorerRefreshInterval` 设置将刷新频率调整为比默认值更长的间隔。通过 SSH 的连接速度较慢，可能导致在前一次刷新完成之前再次尝试刷新。我们建议至少设置为 3000 毫秒。

## 提示

* Docker 端点字符串（`ssh://username@host:port`）中的 "host" 部分必须是全局可解析的 DNS 机器名或 IP 地址。Container Tools 扩展无法使用在 [SSH 配置文件](https://www.ssh.com/ssh/config/) 中定义的主机别名。

* 确保远程机器的主机密钥已[在 known_hosts 文件中](https://www.ssh.com/ssh/key/#known-host-keys)记录。最简单的方法是通过 `ssh` 客户端程序连接到机器（在命令行中运行 `ssh username@host:port`）。首次连接时，`ssh` 程序将显示主机密钥并让你批准它，同时自动更新 `known_hosts` 文件。

* 存在[一个与 Windows 10 build 1909 及更早版本附带的 ssh-keygen 实用工具相关的问题](https://github.com/PowerShell/Win32-OpenSSH/issues/1263)，该问题导致其无法与较新的 SSH 守护进程（例如 Ubuntu 20.04 LTS 及更新版本附带的守护进程）正常工作。解决方法是使用 ECDSA 类型的密钥而非 RSA 类型的密钥进行 SSH 连接。你可以使用以下命令生成 ECDSA SSH 密钥并将其添加到 SSH 代理：

    ```shell
    ssh-keygen -t ecdsa -b 521
    ssh-add id_ecdsa
    ```

* Windows 10 build 1909 及更早版本受到[一个问题的困扰，该问题会导致 Windows 操作系统更新后 SSH 无法获取你的身份信息](https://github.com/PowerShell/Win32-OpenSSH/issues/1234)。解决方法是在系统配置中添加一个虚拟服务条目。在管理员 PowerShell 窗口中运行以下命令：

    ```powershell
    New-Service sshd -BinaryPathName "C:\Windows\System32\OpenSSH\ssh.exe"
    ```
