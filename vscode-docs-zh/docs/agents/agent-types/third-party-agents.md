---
ContentId: 8b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e
DateApproved: 6/10/2026
MetaDescription: 了解如何使用第三方代理（如 Claude Agent 和 OpenAI Codex）在 VS Code 中执行自主编码任务，由你的 GitHub Copilot 订阅提供支持。
MetaSocialImage: ../../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- third-party agent
- claude
- codex
- anthropic
- openai
- copilot
---

# Visual Studio Code 中的第三方代理

Visual Studio Code 中的第三方代理是由外部提供商（如 Anthropic 和 OpenAI）开发的 AI 代理。第三方代理使你能够利用这些 AI 提供商的独特能力，同时仍然受益于 VS Code 中统一的代理会话管理以及丰富的编辑器体验，包括编码、调试、测试等。此外，你可以通过现有的 GitHub Copilot 订阅来使用这些提供商。

VS Code 使用提供商的 SDK 和代理框架来访问代理的独特能力。你可以在 VS Code 中使用本地和云端的第三方代理。云端第三方代理的集成通过你的 GitHub Copilot 计划启用。

> [!NOTE]
> 云端的第三方编码代理目前处于预览阶段。

## 为什么使用第三方代理？

在 VS Code 中使用第三方代理的好处包括：

* **使用独特的能力**：每个第三方代理都有其自身的优势和专门的功能。VS Code 使用提供商的 SDK 和代理框架来访问这些能力，让你可以为编码任务选择最佳的代理。
* **统一的体验**：从同一个 VS Code 代理体验中管理所有代理会话，包括第三方代理。
* **丰富的编辑器集成**：结合使用 VS Code 的编码功能，如丰富的调试和测试，与代理的能力。
* **计费**：通过你现有的 GitHub Copilot 订阅进行身份验证和管理计费，无需额外设置。

## 启用第三方云端代理

在 VS Code 中使用云端第三方代理之前，你需要在你的 Copilot 账户设置中启用对云端第三方代理的支持。请按照 GitHub 文档中[在代码仓库中启用或禁用第三方编码代理](https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies#enabling-or-disabling-third-party-coding-agents-in-your-repositories)的步骤操作。

在 VS Code 中使用云端代理无需安装提供商的 VS Code 扩展。

## Claude Agent（预览）

Claude 代理会话在 VS Code 中直接提供由 Anthropic 的 Claude Agent SDK 驱动的代理编码能力。Claude 代理在你的工作区上自主运行，通过其自己的工具和能力来规划、执行和迭代编码任务。

使用 `setting(github.copilot.chat.claudeAgent.enabled)` 设置来启用或禁用对 Claude 代理会话的支持。

### 启动 Claude 代理会话

要启动一个新的 Claude 代理会话：

1. 打开聊天视图（`kb(workbench.action.chat.open)`），然后选择**新建聊天**（`+`）。

1. 选择本地或云端代理会话：

    * 对于本地会话，从**会话类型**下拉菜单中选择 **Claude**

        ![Screenshot showing session type dropdown with Claude agent option selected.](../images/third-party-agents/claude-agent-new-chat.png)

    * 对于云端会话，从**会话类型**下拉菜单中选择 **Cloud**，然后从**合作代理**下拉菜单中选择 **Claude**。

        ![Screenshot showing cloud agent partner selection picker in chat input.](../images/third-party-agents/partner-agent-cloud-chat.png)

1. 输入你的提示词，让代理处理任务

    Claude 代理会自动决定使用哪些工具并对你的工作区进行更改。

### Claude 代理斜杠命令

Claude 代理提供了用于高级工作流的专用斜杠命令。在聊天输入框中输入 `/` 可查看可用命令。

| 斜杠命令 | 描述 |
|---------------|-------------|
| `/agents` | 创建和管理针对特定任务的专用 Claude 代理。通过向导定义自定义代理行为。详细了解 [Claude 子代理](https://code.claude.com/docs/en/sub-agents)。 |
| `/hooks` | 配置在 Claude 代理会话期间的关键点执行的生命周期钩子，例如在工具执行之前或之后。详细了解 [Claude hooks](https://code.claude.com/docs/en/hooks)。 |
| `/memory` | 打开并编辑 `CLAUDE.md` 记忆文件，该文件为 Claude 代理提供跨会话的持久上下文。 |
| `/init` | 为你的项目初始化一个新的 `CLAUDE.md` 记忆文件。 |
| `/pr-comments` | 从拉取请求获取评论。 |
| `/review` | 审查拉取请求中的代码更改。 |
| `/security-review` | 对当前分支上待处理的代码更改进行安全审查。 |

### 权限模式

Claude 代理在执行某些操作之前会请求权限。默认情况下，工作区内的文件编辑会自动批准，而其他操作（如运行终端命令）可能需要确认。

你可以选择代理如何将更改应用于你的工作区：

* **自动编辑**：Claude 代理在处理任务时自主对工作区进行更改。
* **请求批准**：Claude 代理在对工作区进行更改之前请求你的审查。
* **规划**：Claude 代理在开始处理任务之前概述其计划采用的方法。

![Screenshot showing Claude agent permission mode options.](../images/third-party-agents/claude-agent-permission-modes.png)

> [!CAUTION]
> `setting(github.copilot.chat.claudeAgent.allowDangerouslySkipPermissions)` 设置会绕过所有权限检查。仅在无互联网访问的隔离沙盒环境中启用此设置。

## OpenAI Codex

OpenAI Codex 代理使用 OpenAI 的 Codex 来自主执行编码任务。Codex 可以在 VS Code 中交互式运行，也可以在后台无人值守运行。

要禁用 OpenAI Codex 代理，请在 VS Code 中禁用或卸载 [OpenAI Codex](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt) 扩展。

### 先决条件

* 一个 Copilot Pro+ 订阅用于身份验证
* 对于本地会话，需要安装 [OpenAI Codex](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt) 扩展

VS Code 中的 OpenAI Codex 使你能够使用你的 Copilot Pro+ 订阅进行身份验证和访问 Codex，无需额外设置。在 GitHub 文档中获取更多关于 [GitHub Copilot 按量计费](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals)的信息。

### 启动 Codex 会话

要启动一个新的 OpenAI Codex 代理会话：

1. 打开聊天视图（`kb(workbench.action.chat.open)`），然后选择**新建聊天**（`+`）。

1. 选择本地或云端代理会话：

    * 对于本地会话，从**会话类型**下拉菜单中选择 **Codex**

        ![Screenshot showing session type dropdown with Codex agent option selected.](../images/third-party-agents/codex-agent-new-chat.png)

    * 对于云端会话，从**会话类型**下拉菜单中选择 **Cloud**，然后从**合作代理**下拉菜单中选择 **Codex**。

        ![Screenshot showing cloud agent partner selection picker in chat input.](../images/third-party-agents/partner-agent-cloud-chat.png)

1. 在聊天编辑器输入框中输入你的提示词，让代理处理任务

## 常见问题解答

<details>
<summary>我可以使用现有的 Copilot 订阅来使用第三方代理吗？</summary>

可以，VS Code 中的第三方代理通过你现有的 GitHub Copilot 订阅进行身份验证和管理计费。对于云端第三方代理，请按照步骤启用代理。

对于云端第三方代理，可用性可能取决于你的 Copilot 订阅计划。请在 GitHub 文档中查看[关于第三方代理](https://docs.github.com/en/copilot/concepts/agents/about-third-party-agents)了解更多信息。

</details>

<details>
<summary>第三方代理与使用提供商的 VS Code 扩展有何不同？</summary>

提供商的 VS Code 扩展和 VS Code 中的第三方代理集成都让你能够使用提供商的 AI 能力和代理框架。区别在于计费：当你使用 VS Code 中的第三方代理时，GitHub 通过你的 Copilot 订阅计费。当你使用提供商的扩展时，通过提供商的订阅计费。

</details>

<details>
<summary>为什么有两个 Claude/Codex 代理？</summary>

VS Code 让你可以根据提供商的可用性选择本地或云端第三方代理。当你从**会话类型**下拉菜单中选择第三方代理时，会为该提供商创建一个本地代理会话。

要选择云端第三方代理，首先从**会话类型**下拉菜单中选择 **Cloud** 选项，然后从**合作代理**下拉菜单中选择提供商。

</details>

## 相关资源

* [代理概述](/docs/agents/overview.md)：了解不同的代理类型以及如何在代理之间交接任务
* [关于第三方代理](https://docs.github.com/en/copilot/concepts/agents/about-third-party-agents)：在 GitHub 文档中了解有关第三方代理的更多信息
