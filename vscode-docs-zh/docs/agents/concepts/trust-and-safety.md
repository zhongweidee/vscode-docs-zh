---
ContentId: a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d
DateApproved: 6/10/2026
MetaDescription: 了解 VS Code 中的 AI 安全控制，包括智能体沙盒、工具审批以及 AI 辅助开发的安全注意事项。
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- trust
- safety
- security
- sandbox
- sandboxing
- review
- checkpoints
- tool approval
- limitations
- prompt injection
---

# 信任与安全

AI 生成的输出需要经过审查。Visual Studio Code 包含多种机制，让你能掌控哪些更改会进入你的代码库。本文介绍了控制机制、AI 的局限性以及你应当了解的安全注意事项。

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="详细了解 AI 安全">
了解在 VS Code 中使用 AI 的控制机制和安全注意事项。

* [了解 AI 安全](/docs/agents/security.md)

</div>

## 保持掌控

智能体可以读取文件、编辑代码、运行终端命令以及调用外部服务。VS Code 的信任模型多层叠加了控制机制，让你始终掌握哪些内容会进入你的代码库：

* **应用前先审查。** 所有文件更改都会出现在差异视图（diff view）中，供你做出保留/撤销的决定；此外，[检查点](/docs/chat/chat-checkpoints.md)功能允许你回滚整个会话。
* **执行前先批准。** 具有副作用（side effect）的工具和终端命令会提示你批准，并且审批范围可以限定为当前会话、当前工作区或当前用户。
* **限制自主性。** [权限级别](/docs/agents/approvals.md#permission-levels)决定了智能体能够自主运行的程度：从每次都需批准的完全人工控制，到完全自主的 Autopilot 模式。
* **在操作系统层面强制执行边界。** [智能体沙盒](#agent-sandboxing)功能限制终端命令的文件系统和网络访问，确保自动批准的操作无法超出预设范围。
* **信任边界。** 在将信任授予工作区、扩展、MCP 服务器和网络域名之前，VS Code 会提示你确认。

有关这些控制机制的逐步配置——包括审批规则、敏感文件保护、沙盒设置、组织策略——请参阅 [VS Code 中的 AI 安全](/docs/agents/security.md)。

在提交之前，请始终审查 AI 生成的代码。确保它能够处理边缘情况、遵循你项目的约定，并且不会引入安全问题。

## 智能体沙盒

> [!NOTE]
> 智能体沙盒功能目前处于预览阶段，未来可能会有进一步变化。

智能体沙盒利用操作系统级别的隔离来限制智能体在你设备上的访问范围。与其完全依赖于每次操作前的审批提示，沙盒定义了严格的文件系统和网络访问边界，并由操作系统本身强制执行。

VS Code 目前会对智能体会话期间执行的终端命令（`runInTerminal` 智能体工具）应用沙盒。了解如何[配置智能体沙盒](/docs/agents/approvals.md#sandbox-agent-commands)。

启用沙盒后，VS Code 会自动批准命令和工具调用，无需弹出确认提示，因为它们已经在受控环境中运行。

### 为什么沙盒很重要

基于审批的安全性需要你在每条终端命令或工具调用执行之前进行确认。虽然这提供了控制能力，但也存在实际限制：

* **审批疲劳。** 反复批准命令可能会让你对批准的内容关注度下降，尤其是在长时间的智能体会话中。

* **解析的局限性。** 自动审批规则使用的是尽力而为的命令解析方式，存在已知的局限性。Shell 别名（alias）、引号拼接以及复杂的 shell 语法可能会绕过规则，在不被察觉的情况下通过审批。

* **提示注入。** 文件、工具输出或网页中的恶意内容可能试图诱导智能体运行有害命令。如果你在没有仔细审查的情况下就批准，可能会导致意外的操作和安全风险。

* **对外部服务的意外操作。** 即使没有恶意意图，具备网络访问能力的智能体也可能代表你执行难以撤销的操作。例如，智能体可能配置云资源、修改基础设施设置、将代码推送到远程仓库，或者调用某个会触发部署或金融交易的 API。网络隔离可确保智能体只能访问你明确允许的域名，降低对外部服务产生意外副作用的风险。

沙盒通过在操作系统级别强制执行边界来解决这些挑战。沙盒可以阻止自动批准的命令访问允许范围之外的文件或网络资源。如果需要额外的权限，VS Code 会提示你允许在沙盒外运行该命令。

### 沙盒的工作原理

沙盒强制执行两种类型的隔离：**文件系统访问**和**网络访问**。两者都在操作系统层面实施，沙盒内运行的命令无法绕过。

#### 文件系统隔离

如果没有文件系统隔离，受感染（compromised）的命令可能会修改你设备上任意位置的文件，例如将恶意代码注入到你的 Shell 配置文件中（`~/.bashrc`、`~/.zshrc`），或从 `~/.ssh/` 读取 SSH 密钥。文件系统隔离通过将访问限制在明确允许的路径上来防止这种情况。

* **默认行为。** 允许读取工作区文件夹和沙盒运行时临时文件夹。默认拒绝读取你的主目录（`$HOME`），以保护敏感文件，例如 SSH 密钥、Shell 配置和凭据。写入访问仅限于当前工作目录及其子目录。当某个请求需要额外的权限时，VS Code 会提示你允许在沙盒外运行该命令。

    ![VS Code 提示用户允许命令在沙盒外运行以获取额外权限的截图。](../images/trust-and-safety/sandbox-prompt.png)

* **针对每条命令的读取路径。** 在命令运行之前，VS Code 会解析该命令，并授予该命令所需特定路径的读取权限。这覆盖了常见的开发者工作流，例如 `git`、`node`、`npm`、`dotnet`、Java 和 Rust。例如，运行 `node` 命令会自动允许从 Node 版本管理器目录读取，运行 `git` 命令则允许从 `~/.gitconfig` 读取。

* **可配置的规则。** 你可以授予额外路径的读取或写入权限，也可以拒绝特定路径的读取或写入权限。拒绝规则始终优先于允许规则。

* **继承的限制。** 由沙盒命令生成的所有子进程都将继承相同的文件系统边界。这意味着诸如 `npm`、`pip` 或构建脚本等工具同样会受到限制。

#### 网络隔离

如果没有网络隔离，受感染（compromised）的命令可能会窃取敏感数据，或者对外部服务执行意外操作。网络隔离通过默认阻止所有出站连接来防止这种情况。

当 `setting(chat.agent.sandbox.enabled)` 设置为 `on` 时，所有出站网络访问都将被阻止，除非你明确允许特定的域名。如果你只需要文件系统隔离，但需要无限制的网络访问，可以将 `setting(chat.agent.sandbox.enabled)` 设置为 `allowNetwork`。在此模式下，命令可以自由地访问外部服务，同时文件系统限制仍然适用。

VS Code 提供了网络域名过滤功能，同时适用于智能体工具（fetch 工具、集成浏览器）和沙盒终端命令。启用 `setting(chat.agent.networkFilter)` 来激活网络过滤。使用 `setting(chat.agent.allowedNetworkDomains)` 和 `setting(chat.agent.deniedNetworkDomains)` 来控制智能体可以访问哪些域名。了解如何[配置网络访问](/docs/agents/approvals.md#configure-network-access)。

* **带网络访问的重试。** 当沙盒命令被网络限制阻止时，智能体首先会请求确认，以便在沙盒内以不受限的网络访问进行重试；如果此方式不可行，则退回到在沙盒外运行该命令。

* **域名允许列表。** 你可以明确允许访问特定域名。

    > [!CAUTION]
    > 智能体可以代表你在允许的域名上执行操作，不仅仅是读取数据。例如，允许 `api.github.com` 意味着智能体可以创建 Pull Request 或修改仓库设置。允许云服务 API 域名可能会导致云资源的修改。仅在绝对必要的情况下才配置此设置。此配置在设置中指定，并适用于所有智能体工具和沙盒命令，而不仅仅是当前任务。

* **继承的限制。** 所有子进程都将继承相同的网络限制，因此生成子进程的脚本或工具无法绕过网络规则。

### 操作系统级别的强制执行

智能体沙盒依赖操作系统级别的安全原语来强制执行文件系统和网络限制。由于强制执行发生在内核层面，沙盒化的进程及其所有子进程都无法绕过这些边界，即使命令被精心构造试图绕过。

| 平台 | 技术 | 前置条件 |
|----------|-----------|---------------|
| macOS | 苹果的沙盒框架（"Seatbelt"），内置于操作系统。在内核层面强制执行细粒度的文件系统和网络限制。 | 无需额外操作。开箱即用。 |
| Linux 和 WSL2 | [bubblewrap](https://github.com/containers/bubblewrap) 用于文件系统隔离，`socat` 用于网络代理。 | 安装所需软件包：`sudo apt-get install bubblewrap socat`（Debian 和 Ubuntu）或 `sudo dnf install bubblewrap socat`（Fedora）。 |

WSL 第 1 版不受支持，因为 bubblewrap 需要仅在 WSL2 中可用的 Linux 内核功能（用户命名空间）。

> [!NOTE]
> Windows 上的智能体沙盒支持目前使用 WSL2 作为底层平台。

### 沙盒不涵盖的范围

智能体沙盒仅适用于 Shell 子进程（终端命令）。它不涵盖内置的文件工具。智能体的读取、编辑和写入工具直接使用 VS Code 的权限系统，而不是通过沙盒运行。

> [!TIP]
> `setting(chat.agent.networkFilter)` 设置为智能体工具（如 fetch 工具和集成浏览器）提供网络域名过滤，独立于沙盒功能。当沙盒和网络过滤同时启用时，网络规则将应用于所有智能体工具和终端命令。

使用[审查流程](/docs/chat/review-code-edits.md)和[敏感文件保护](/docs/chat/review-code-edits.md#edit-sensitive-files)来控制这些操作。

要实现完整的环境隔离，可以将沙盒与[开发容器（dev container）](/docs/devcontainers/containers.md)搭配使用。开发容器为整个开发环境提供了完整的边界，涵盖所有工具、文件访问和网络访问。

智能体沙盒目前处于预览阶段，未来将不断演进以覆盖更多工具和场景。

## 需要注意的 AI 局限性

**错误输出。** 模型可能会生成看起来正确但实际上包含 Bug、使用了已弃用的 API，或者不能处理边缘情况的代码。请务必测试 AI 生成的代码，尤其是那些会影响安全、数据完整性或关键流程的逻辑。

**提示注入。** 文件、工具输出或网页中的恶意内容可能试图重定向智能体的行为。这正是 VS Code 提供工具审批关卡和信任边界的原因。了解有关 [AI 安全](/docs/agents/security.md)的更多信息。

将 AI 生成的输出视为初稿：作为起点很有用，但始终需要你的审查和判断。有关模型工作方式的更多信息，包括非确定性、知识边界和上下文限制，请参阅[语言模型](/docs/agents/concepts/language-models.md)。

## 相关资源

* [AI 安全注意事项](/docs/agents/security.md)
* [终端沙盒配置](/docs/agents/approvals.md#sandbox-agent-commands)
* [审查代码编辑](/docs/chat/review-code-edits.md)
* [检查点](/docs/chat/chat-checkpoints.md)
* [工具审批](/docs/agents/approvals.md#tool-approval)
