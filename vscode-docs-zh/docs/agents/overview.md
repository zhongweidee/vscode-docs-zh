---
ContentId: 7c4b8b5e-2d3f-4e8a-9b2c-1a5d6f8e9c0b
DateApproved: 6/10/2026
MetaDescription: 在 Visual Studio Code 中使用 AI 代理进行构建。了解代理能做什么、配置代理会话以及为你的项目自定义代理。
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- GitHub Copilot
- AI
- agents
- autonomous
- agentic
- multi-file editing
- architecture
- refactoring
- background agent
- cloud agent
- copilot coding agent
- copilot cli
- third-party agents
- MCP
- enterprise
- overview
- getting started
---

# 在 VS Code 中使用代理进行构建

Visual Studio Code 内置了 AI 代理。用自然语言描述一个任务，代理会规划方案、跨项目编辑文件、运行命令并自我修正，直到工作完成。代理融入你已有的工作流程中，让你可以专注于意图和审查，而不是逐行输入代码。

<video src="images/agents-overview/agents-intro.mp4" title="Video showing an agent session building a complete feature in VS Code." controls muted></video>

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with AI">
跟着动手教程，在 VS Code 中构建你的第一个 AI 应用。

* [开始教程](/docs/getstarted/getting-started.md)

</div>

> [!NOTE]
> 确保已在 VS Code 设置中启用代理（`setting(chat.agent.enabled)`）。如果你的组织已禁用代理，请联系你的 GitHub 组织管理员。

## 代理能做什么

代理能端到端地处理真实的编码任务。以下是一些常见场景：

* **编程前先规划**：使用[规划代理](/docs/agents/planning.md)生成分步实现计划，你可以在修改任何文件之前审查和完善该计划。
* **构建新功能**：描述你想要的功能，让代理搭建 UI 框架、连接状态管理并更新测试。
* **原型设计和探索变体**：快速构建概念验证，或并行生成同一功能的多个设计变体，然后保留效果最好的那个。
* **大规模重构**：在整个工作区中重命名、重构或迁移代码，代理会跟踪哪些部分仍需修改。
* **构建和测试 Web 应用**：从聊天中驱动正在运行的 Web 应用，[在集成浏览器中端到端地验证行为](/docs/agents/guides/browser-agent-testing-guide.md)。
* **调试和修复失败的测试**：将代理指向堆栈跟踪或红色测试，让它找到根本原因并应用修复。

## 入门指南

AI 功能内置于 VS Code 中。要启用它们，请使用你的 GitHub 帐户登录：

1. 从 VS Code 标题栏中选择**登录**，或将鼠标悬停在状态栏中的 Copilot 图标上并选择**启用 AI 功能**。如果你没有订阅，系统会为你注册免费计划，每月对建议和聊天有使用次数限制。

1. 从 VS Code 标题栏中选择**在代理中打开**。

1. 选择一个工作区文件夹，然后选择 Copilot CLI 代理以启动会话。

1. 输入描述你想要做什么的提示词，例如"在页面头部添加一个深色模式切换开关，并确保它在移动设备上正常工作"。

> [!TIP]
> 你也可以使用自己的 API 密钥，无需 Copilot 订阅即可使用任何提供商的模型。详细了解[语言模型](/docs/agent-customization/language-models.md)。

## 选择与代理协作的方式

VS Code 为你提供了两种与代理协作的主要界面：**代理窗口**和**聊天视图**。选择适合你当前任务的方式，并可在两者之间自由切换。两者共享相同的代理会话，让你可以在一个界面中启动会话，在另一个界面中继续，而不会丢失上下文。

选择取决于你的工作方式和范围。代理窗口是**代理优先**的，能从单个窗口跨**所有工作区**工作，因此非常适合当你分配高层级任务并在多个项目中并行编排多个代理时使用。聊天视图是**代码优先**的，**限定在你打开的工作区范围内**，因此非常适合当你给代理分配编码任务并紧密跟踪其生成的代码时使用。

{% tabs id="agent-surface" %}
{% tab label="代理窗口" %}

[代理窗口](/docs/agents/agents-window.md)（预览版）是一个专用窗口，以聊天作为主要界面。它能从一个窗口跨所有工作区工作，让你可以分配高层级任务、评估结果，以及并行运行和跟踪多个代理。代理窗口针对**代理优先的工作流**进行了优化。

![截图显示如何通过在代理窗口侧边栏顶部选择"新建"来启动新的代理会话。](images/agents-overview/agents-window-hero.png)

{% /tab %}
{% tab label="聊天视图" %}

[聊天视图](/docs/agents/chat-view.md)是侧边栏中的一个聊天面板，位于工作区编辑器选项卡旁边。它限定在你在 VS Code 中打开的工作区范围内，让你可以给代理分配编码任务、审查其生成的代码，并使代理专注于你正在处理的代码。聊天视图针对**代码优先的工作流**进行了优化。

![截图显示聊天视图，其中包含会话列表、对话和聊天输入框。](images/agents-overview/chat-view-expanded.png)

{% /tab %}
{% /tabs %}

## 配置你的代理会话

每个代理会话都有几个控制其运行方式的设置。在启动会话时选择这些设置，并随着任务的进展随时调整。

![会话输入区域的截图，显示代理类型、代理、语言模型和权限级别的配置选项。](images/agents-overview/chat-session-configuration.png)

| 选项 | 描述 |
|---|---|
| **代理类型** | 代理的运行位置以及你与它的交互方式：通过[本地代理](/docs/agents/agent-types/local-agents.md)在 VS Code 中交互运行；通过 [Copilot CLI](/docs/agents/agent-types/copilot-cli.md) 在你机器上后台运行；通过[云代理](/docs/agents/agent-types/cloud-agents.md)在 GitHub 基础设施上远程运行；或通过 [第三方提供商](/docs/agents/agent-types/third-party-agents.md)（如 Anthropic 或 OpenAI）运行。<br>你可以将进行中的会话移交给不同的代理类型，例如将本地规划会话移交给 [Copilot CLI](/docs/agents/agent-types/copilot-cli.md#hand-off-a-local-session-to-copilot-cli) 或[云代理](/docs/agents/agent-types/cloud-agents.md#hand-off-an-agent-session-to-a-cloud-agent)。 |
| [代理](/docs/agents/agent-types/local-agents.md#built-in-agents) | 塑造代理处理任务方式以及它可以使用哪些工具的角色。选择一个内置代理（Agent、Plan、Ask），或使用[自定义代理](/docs/agent-customization/custom-agents.md)来担任专门的角色，如安全专家或文档编写者。 |
| [语言模型](/docs/agent-customization/language-models.md) | 为代理推理提供动力的模型。选择一个快速模型用于快速编辑和提问，或选择更强大的推理模型用于复杂、多步骤或研究类工作。 |
| [权限级别](/docs/agents/approvals.md#permission-levels) | 代理运行工具和终端命令的自主程度，从需要批准每个操作到允许其独立工作。 |

## 为你的代码库定制代理

当代理理解你项目的约定并拥有正确的工具时，它们的工作效果最佳。VS Code 为你提供了多种定制代理的方式，使其从一开始就生成符合你代码库和团队实践的代码：

* **设置编码标准**：使用[自定义指令](/docs/agent-customization/custom-instructions.md)定义项目级规则和约定，让代理按你的风格生成代码。

* **自动化可重复任务**：将常用提示词保存到[提示词文件](/docs/agent-customization/prompt-files.md)中，或将多步骤工作流与脚本打包为[代理技能](/docs/agent-customization/agent-skills.md)。

* **专门化代理**：创建[自定义代理](/docs/agent-customization/custom-agents.md)来担任特定的角色，如代码审查员、安全专家或测试员。

* **连接外部工具和数据**：添加 [MCP 服务器](/docs/agent-customization/mcp-servers.md)来访问数据库和 API，并使用[挂钩](/docs/agent-customization/hooks.md)在代理会话的关键节点运行脚本。

要确定哪种选项适合你的目标，请参阅[自定义概念](/docs/agents/concepts/customization.md)。有关设置步骤和示例，请参阅[自定义代理](/docs/agent-customization/overview.md)。你也可以安装[插件](/docs/agent-customization/agent-plugins.md)，从 Marketplace 添加预打包的定制化捆绑包。

## 信任与控制

代理可以读取和编辑文件、运行终端命令以及调用外部服务。VS Code 让你保持控制：在工具调用运行之前批准或拒绝它们，设置与你所适应的自主程度相匹配的权限级别，并启用代理沙箱以在操作系统级别限制文件系统和网络访问。详细了解[信任与安全](/docs/agents/concepts/trust-and-safety.md)和 [AI 安全](/docs/agents/security.md)。

组织可以集中管理哪些 AI 功能、模型和工具可供团队使用。管理员定义策略来控制代理能力、限制 MCP 服务器或扩展，以及强制执行合规要求，让开发人员开箱即获得一致、受管控的体验。详细了解[企业 AI 策略](/docs/enterprise/ai-settings.md)。

## 后续步骤

<div class="card-grid">
    <a class="card" href="/docs/agents/agents-tutorial">
        <i class="codicon codicon-mortar-board" aria-hidden="true"></i>
        <p>跟随代理教程</p>
    </a>
    <a class="card" href="/docs/agents/best-practices">
        <i class="codicon codicon-checklist" aria-hidden="true"></i>
        <p>学习代理最佳实践</p>
    </a>
    <a class="card" href="/docs/agents/concepts/overview">
        <i class="codicon codicon-lightbulb" aria-hidden="true"></i>
        <p>探索代理概念</p>
    </a>
</div>
