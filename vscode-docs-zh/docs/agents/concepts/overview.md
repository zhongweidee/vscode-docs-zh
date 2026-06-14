---
ContentId: a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d
DateApproved: 6/10/2026
MetaDescription: 了解 AI 如何在 VS Code 中运作，从内联建议到自主代理，以及语言模型、上下文和工具如何协同工作。
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- concepts
- overview
- agents
- chat
- inline suggestions
- smart actions
---

# AI 如何在 VS Code 中运作

Visual Studio Code 内置的 AI 功能由 GitHub Copilot 和大语言模型（LLM）提供支持。本文介绍这些功能背后的概念、驱动它们的构建模块，以及它们如何协同工作。通过本文了解 AI *如何* 在 VS Code 中运作，从而在使用过程中做出更好的决策。

要了解你可以使用代理构建什么，请参阅[使用 VS Code 中的代理进行构建](/docs/agents/overview.md)。要开始交互，请参阅[在 VS Code 中使用聊天](/docs/chat/chat-overview.md)。

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="开始使用 AI">
跟随动手教程，在 VS Code 中使用 AI 构建你的第一个应用。

* [开始教程](/docs/getstarted/getting-started.md)

</div>

## AI 在 VS Code 中的体现位置

AI 在一系列交互界面中为你提供帮助，这些界面在自主性和控制力之间进行权衡，从完成整个任务的自主代理到在你输入时出现的建议。相同的底层概念适用于所有这些界面。

* **[代理](/docs/agents/overview.md)**：自主会话，遵循[代理循环](/docs/agents/concepts/agents.md#agent-loop)来读取文件、在项目中做出协调性的更改、运行命令，并反复迭代直到任务完成。
* **[聊天](/docs/chat/chat-overview.md)**：用于与代理交互、提问和分配任务的对话式界面。
* **[内联聊天](/docs/chat/inline-chat.md)**：编辑器中的轻量级聊天界面，用于快速、聚焦的编辑。
* **[内联建议](/docs/editing/ai-powered-suggestions.md)**：在你输入时以幽灵文本形式出现的代码建议，使用专门的补全模型，无需代理循环。
* **[智能操作](/docs/editing/copilot-smart-actions.md)**：工作流中的一键式 AI 操作，例如生成提交消息或修复诊断问题。

## 核心概念

以下文章介绍了驱动这些功能的架构和构建模块：

* [语言模型](/docs/agents/concepts/language-models.md)：驱动所有功能的 AI 模型，包括如何选择和配置它们。
* [上下文](/docs/agents/concepts/context.md)：VS Code 如何为模型组装信息，从你的文件到对话历史记录。
* [工具](/docs/agents/concepts/tools.md)：让代理能够对你的开发环境进行操作并连接到外部服务的机制。
* [代理](/docs/agents/concepts/agents.md)：代理循环、代理类型、子代理、记忆和规划。
* [自定义](/docs/agents/concepts/customization.md)：如何使用指令、提示文件、自定义代理、技能、钩子和插件来定制 AI 行为。
* [信任与安全](/docs/agents/concepts/trust-and-safety.md)：控制机制、AI 局限性及安全考虑。

## 各概念如何协同工作

这些构建模块在你每次发送请求时组合在一起。**语言模型**负责推理。为了做出有用的响应，它需要**上下文**：VS Code 组装相关的文件、对话历史记录和其他信息并将其发送给模型。为了对你的环境进行操作而不仅仅是回答问题，模型调用**工具**来读写文件、运行命令或访问外部服务。**代理**在代理循环中将它们整合在一起，调用工具并将结果反馈给模型，直到任务完成。**自定义**塑造代理的行为方式，**信任与安全**控制让你始终掌控代理能够执行的操作。

要将这些概念付诸实践，请参阅[配置你的代理会话](/docs/agents/overview.md)。

## 相关资源

* [快速入门：开始在 VS Code 中使用 AI](/docs/getstarted/getting-started.md)
* [在 VS Code 中使用 AI 的最佳实践](/docs/agents/best-practices.md)
* [配置你的代理会话](/docs/agents/overview.md)
