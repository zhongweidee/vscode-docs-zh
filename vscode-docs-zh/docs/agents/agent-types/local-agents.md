---
ContentId: 3a6e8c1d-5f2b-4d9a-b7e1-9c4f2a8d6b3e
DateApproved: 6/10/2026
MetaDescription: 了解如何在 VS Code 中使用本地代理进行交互式编码任务，并完全访问您的工作区、工具和模型。
MetaSocialImage: ../../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- local agent
- chat
- copilot
---

# Visual Studio Code 中的本地代理

本地代理在您机器上的 Visual Studio Code 中以交互方式运行。它们在当前工作区上工作，并可以访问 VS Code 中可用的全部工具和模型，包括扩展提供的工具和 MCP 服务器。通过[创建自定义代理](/docs/agent-customization/custom-agents.md)，您可以让代理在任务中扮演特定角色或身份，例如代码审查者、测试人员或文档编写者。

本地代理在 VS Code 的聊天界面中运行。当您关闭聊天会话时，本地代理保持活动状态，您可以在会话视图中跟踪它。

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="开始使用代理">
跟随动手教程，体验 VS Code 中的本地代理、后台代理和云端代理。

* [开始教程](/docs/agents/agents-tutorial.md)

</div>

## 为什么使用本地代理？

* 需要即时反馈的交互式对话，例如头脑风暴、规划或尚未完全定义的任务
* 需要从开发环境中获取上下文的任务，例如 lint 错误、堆栈跟踪、单元测试结果
* 需要访问 VS Code 扩展或 MCP 服务器中特定工具的任务，或需要使用特定模型（如 BYOK 模型）的任务
* 不需要其他团队成员协作的任务

## 关键特性

* 在本地机器上的 VS Code 中运行，并在当前工作区上工作
* 基于聊天的交互式界面，实现实时反馈和迭代
* 完全访问您的工作区、文件和上下文
* 可以访问 VS Code 中配置的所有代理工具，例如内置工具、MCP 工具和扩展提供的工具
* 可以使用 VS Code 中所有可用的模型，包括 BYOK 模型和其他提供商的模型

## 内置代理

本地代理会话使用三种内置代理之一，每种代理针对不同类型的任务进行了优化。您可以随时在聊天会话期间通过从聊天视图的代理选择器中选择不同的代理来切换代理。对于更专业的工作流程，您可以创建自己的[自定义代理](/docs/agent-customization/custom-agents.md)。

### Agent

Agent 针对基于高层级需求的复杂编码任务进行了优化，这些任务可能需要运行终端命令和工具。AI 自主运行，确定相关的上下文和要编辑的文件，规划所需的工作，并迭代解决出现的问题。

VS Code 直接在编辑器中应用代码更改，编辑器叠加控件使您能够在建议的编辑之间导航并审查它们。代理可能会调用多个[工具](/docs/chat/chat-tools.md)来完成不同的任务。

您可以通过添加 MCP 服务器或安装提供工具的扩展来[使用额外工具自定义聊天](/docs/chat/chat-tools.md)。

使用 Agent 打开聊天：[稳定版](vscode://GitHub.Copilot-Chat/chat?mode=agent) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=agent)

> [!IMPORTANT]
> 如果您没有看到代理选项，请确保在 VS Code 设置中启用了代理（`setting(chat.agent.enabled)`）。您的组织也可能禁用了代理。请联系管理员启用此功能。

### Plan

计划代理针对为编码任务创建结构化实施计划进行了优化。当您想在实施之前将复杂的功能或更改分解为更小、可管理的步骤时，请使用计划代理。

计划代理会生成一个详细的计划，概述所需的步骤，并提出澄清性问题以确保对任务的全面理解。然后，您可以将计划交给实施代理或将其用作指南。

使用 Plan 打开聊天：[稳定版](vscode://GitHub.Copilot-Chat/chat?mode=plan) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=plan)

了解更多关于[使用代理进行规划](/docs/agents/planning.md)的信息。

### Ask

Ask 功能最适合回答有关代码库、编码和一般技术概念的问题。当您想了解某些东西如何工作、探索想法或获取编码任务的帮助时，请使用 Ask。

Ask 使用代理能力来研究您的代码库并收集相关上下文。响应可以包含代码块，您可以单独将其应用到代码库中。要应用代码块，请悬停在代码块上并选择**在编辑器中应用**按钮。

使用 Ask 打开聊天：[稳定版](vscode://GitHub.Copilot-Chat/chat?mode=ask) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=ask)

### 编辑模式（已弃用）

编辑模式已弃用。请改用 Agent 模式进行多文件代码编辑。您可以通过启用 `setting(chat.editMode.hidden)` 设置来恢复编辑模式。

## 开始使用

> [!TIP]
> 如需了解演示如何使用不同代理类型（包括后台代理和云端代理）的动手教程，请参阅[代理教程](/docs/agents/agents-tutorial.md)。

要启动本地代理会话：

1. 从聊天视图的代理选择器中选择 **Agent**。

1. 在聊天输入字段中键入一个高层级提示。例如，您可以问：

    ```prompt-agent
    Implement a user authentication system with OAuth2 and JWT.
    ```

    或

    ```prompt-agent
    Set up a CI/CD pipeline for this project.
    ```

1. 使用工具选择器来[启用工具](/docs/chat/chat-tools.md)，为代理赋予更多能力。

1. 选择**发送**或按 `kb(workbench.action.chat.submit)` 提交您的提示。

1. 在代理处理您的请求时，审查并确认代码更改和工具调用。

    您可以在代理工作时发送后续提示。将消息排入队列稍后发送，引导代理转向新方向，或停止并立即发送。了解更多关于[在请求运行时发送消息](/docs/chat/chat-overview.md#send-messages-while-a-request-is-running)的信息。

    > [!TIP]
    > VS Code 帮助您防止意外编辑敏感文件，例如工作区配置设置或环境设置。了解更多关于[编辑敏感文件](/docs/chat/review-code-edits.md#edit-sensitive-files)的信息。

要使用 Ask 开始：

1. 在聊天输入字段中键入您的提示。例如，您可以问：

    ```prompt-ask
    Provide 3 ways to implement a search feature in React.
    ```

    或

    ```prompt-ask
    Where is the db connection configured in this project? #codebase
    ```

1. 从聊天视图的代理选择器中选择 **Ask**。

1. 可选地，[为您的提示添加上下文](/docs/chat/copilot-chat-context.md)以获取更准确的响应。

1. 选择**发送**或按 `kb(workbench.action.chat.submit)` 提交您的提示。

## 常见问题

<details>
<summary>语言模型是在我的机器上本地运行的吗？</summary>

语言模型的位置不取决于代理类型。代理类型决定了代理框架在哪里运行，即代理编排逻辑在哪里运行。例如，本地代理在您机器上的 VS Code 中运行，而 Copilot 云端代理在远程服务器上运行。

语言模型的位置取决于您为请求选择的模型提供商。例如，如果您选择由 GitHub Copilot 提供的模型，它将在远程基础设施上运行。如果您选择连接到在您机器或私有基础设施上运行的模型的 [BYOK 模型](/docs/agent-customization/language-models.md#bring-your-own-language-model-key)，那么模型将在那里运行。

## 相关资源

* [代理概述](/docs/agents/overview.md)：选择代理、配置权限以及在代理类型之间切换。
* [管理聊天会话](/docs/chat/chat-sessions.md)：创建、切换和组织您的会话。
* [代理教程](/docs/agents/agents-tutorial.md)：使用不同代理类型的动手教程。
* [工具](/docs/chat/chat-tools.md)：使用内置工具、MCP 工具和扩展工具扩展代理。
* [自定义代理](/docs/agent-customization/custom-agents.md)：创建您自己的 AI 代理和扩展。
