---
ContentId: d750ab6d-82c2-4e64-8fbb-7888e1374381
MetaDescription: 使用 Visual Studio Code Server
DateApproved: 6/10/2026
---
# Visual Studio Code Server

Visual Studio Code Server 是一项你可以在远程开发机器（如桌面电脑或虚拟机 (VM)）上运行的服务。它允许你通过本地 VS Code 客户端从任何地方安全地连接到该远程机器，而无需 SSH。

## 什么是 VS Code Server？

在 VS Code 中，我们希望用户能够无缝地利用使其最高效的开发环境。[VS Code 远程开发扩展](/docs/remote/remote-overview.md) 允许你直接在 VS Code 中操作 Windows Subsystem for Linux (WSL)、通过 SSH 连接远程机器以及开发容器。这些扩展会在远程环境中安装一个服务器，使本地 VS Code 能够与远程源代码和运行时顺畅交互。

我们现在提供了一个独立的"VS Code Server"，它是基于远程扩展所使用的相同底层服务器构建的服务，并附加了一些额外功能，例如交互式 CLI 以及促进与 vscode.dev 的安全连接。

![vscode.dev connected to the VS Code Server](images/vscode-server/server-connected.png)

## 架构

我们希望提供统一的 VS Code 体验，无论你如何使用编辑器，无论是在本地还是远程，在桌面端还是在浏览器中。

对 VS Code Server 的访问已内置到现有的 [`code` CLI](/docs/configure/command-line.md#launching-from-command-line) 中。

该 CLI 在 VS Code 客户端和你的远程机器之间建立一条隧道。隧道技术能够安全地将数据从一个网络传输到另一个网络。

![The VS Code Server architecture](images/vscode-server/server-arch-latest.png)

VS Code Server 体验包含以下几个组件：

* VS Code Server：使 VS Code 远程体验成为可能的后端服务器。
* [Remote - Tunnels 扩展](/docs/remote/tunnels.md)：自动加载到你的本地 VS Code 客户端中，用于促进与远程机器的连接。

## 使用场景

VS Code Server 允许你以新的方式使用 VS Code，例如：

* 在 SSH 支持可能受限或需要基于 Web 访问的远程机器上进行开发。
* 在不支持安装 VS Code 桌面的机器上开发，如 iPad/平板电脑或 Chromebook。
* 体验客户端安全优势，即所有代码都可以在浏览器沙箱中执行。

## 入门指南

你可以选择以下两种路径来启用隧道功能，各自的文档内容中有更详细的描述：

* [在 `code` CLI 中运行 `tunnel` 命令](/docs/remote/tunnels.md#using-the-code-cli)
* [通过 VS Code 用户界面启用隧道](/docs/remote/tunnels.md#using-the-vs-code-ui)

## 尝试一下

### 许可协议及其他命令

首次运行 VS Code Server 时，系统会提示你查看许可条款。你可以在[此处](https://aka.ms/vscode-server-license)查看 VS Code Server 的许可协议。

```bash
* Visual Studio Code Server
*
* By using the software, you agree to
* the Visual Studio Code Server License Terms (https://aka.ms/vscode-server-license) and
* the Microsoft Privacy Statement (https://privacy.microsoft.com/en-US/privacystatement).
```

你可以通过运行 `code -h` 来探索 CLI 的其他命令，特别是通过运行 `code tunnel -help` 来了解隧道相关命令：

![Output of tunnel help CLI command](images/vscode-server/tunnel-help.png)

### 扩展命令

与 CLI 一样，VS Code Remote Tunnels 扩展也有额外的命令，你可以通过在 VS Code 中打开命令面板（`F1`）并输入 **Remote Tunnels** 来探索。你可以在 [Remote Tunnels 文档](/docs/remote/tunnels.md) 中了解更多信息。

## 遥测

如果你想禁用遥测，可以在启动 VS Code Server 时传入 `--disable-telemetry`：`code tunnel --disable-telemetry`。或者，如果你想指定初始遥测级别，例如仅收集错误，可以传入 `--telemetry-level` 后跟你想要的级别（例如，`error`）。

如果未通过 CLI 禁用遥测，VS Code Server 将在成功连接后开始遵循客户端的遥测设置（你在 vscode.dev 或桌面端中的遥测设置）。

## 常见问题

### VS Code Server 是否设计为供多个用户访问同一个远程实例？

不，服务器的每个实例设计为仅供单个用户访问。

### 我可以将 VS Code Server 作为服务托管吗？

不可以，将其作为服务托管是不允许的，详见 [VS Code Server 许可协议](https://aka.ms/vscode-server-license)。

### VS Code Server 是否有使用的端点列表？

如果你在受限环境中工作，可能需要确保 VS Code Server 能够访问以下文章中列出的端点：

* [设置网络常用主机名](/docs/setup/network.md#common-hostnames)
* [VS Code Server 在远程机器/虚拟机上运行时的连接要求](/docs/remote/ssh.md#what-are-the-connectivity-requirements-for-the-vs-code-server-when-it-is-running-on-a-remote-machine--vm)

### 还有其他扩展限制吗？

在 VS Code 的基于 Web 的实例中，不支持纯 UI 扩展，你可以在扩展作者[远程开发](/api/advanced-topics/remote-extensions.md#architecture-and-extension-kinds)指南中了解更多信息。

### 浏览器有什么限制吗？

在浏览器中工作时，需要考虑某些限制和配置步骤。你可以在 [VS Code for the Web](/docs/remote/vscode-web.md#additional-browser-setup) 文档中阅读更多相关内容。

### 如何保持 VS Code Server 更新？

当有更新可用时，你在连接到远程机器时会在 VS Code 中收到通知，并且你可以直接通过此通知进行更新。

### 我看到一个关于密钥环存储的错误。该怎么办？

设置同步需要对设置同步服务器进行身份验证。相应的密钥会保存在服务器上。这需要在服务器上设置密钥环。当密钥环未设置时，VS Code Server 会回退到存储在服务器上的内存中密钥。在这种情况下，密钥仅在服务器运行期间保留。

[此问题](https://github.com/microsoft/vscode-remote-release/issues/8628) 提供了更多上下文，可能有助于你进行故障排查。如果你仍然遇到问题，请随时在 [VS Code Remote GitHub 仓库](https://github.com/microsoft/vscode-remote-release/issues) 中提交新问题。

### 我在哪里可以提供反馈或报告问题？

如果你有任何问题或反馈，请在 [VS Code Remote GitHub 仓库](https://github.com/microsoft/vscode-remote-release/issues) 中提交问题。提交问题时，请包含详细日志，你可以通过使用 `-v` 标志启动 VS Code Server 来启用详细日志：`code -v tunnel`。

你可以使用 [`code-server` 标签](https://github.com/microsoft/vscode-remote-release/issues?q=is%3Aissue+is%3Aopen+label%3Acode-server) 来筛选仅包含 VS Code Server 相关的问题。
