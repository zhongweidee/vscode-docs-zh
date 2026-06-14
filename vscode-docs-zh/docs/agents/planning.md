---
ContentId: 8f9a3e5c-2b4d-4a7f-9c8e-1d6f3a2b5c4e
DateApproved: 6/10/2026
MetaDescription: 了解如何在 VS Code 聊天中使用计划代理进行自主规划和任务管理，结合待办事项列表。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# 在 VS Code 中使用代理进行规划

计划代理使你能够在开始实现之前创建详细的实现计划，以确保满足所有需求。借助待办事项列表，代理可以确保始终保持对整体目标的关注，并有效跟踪进度。

有关计划代理在代理架构中如何定位的背景信息，请参见[代理概念](/docs/agents/concepts/agents.md#planning)。

本文介绍了如何在 VS Code 中使用计划代理和待办事项列表。

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="使用代理规划功能">
使用计划代理为新功能创建结构化的实现计划。

* [在 VS Code 中打开](vscode://GitHub.Copilot-Chat/chat?agent=agent%26prompt=%2Fplan%20a%20terminal%20UI%20app%20to%20track%20my%20todo%20list.)

</div>

## 如何规划任务

要规划任务，请在聊天视图（Chat view）中使用内置的**计划**代理，描述你的任务，并对生成的计划进行迭代优化。

1. 按 `kb(workbench.action.chat.open)` 打开聊天视图，然后从代理下拉菜单中选择**计划**

    或者，输入 `/plan` 后跟你的任务描述，即可一步切换到计划代理并开始规划。

1. 输入一个高层次任务（功能、重构、缺陷等）并提交。例如：

    ```prompt-plan
    Implement a user authentication system with OAuth2 and JWT
    ```

    使用 `/plan` 斜杠命令可以直接从聊天输入框开始规划：

    ```prompt
    /plan Add unit tests for all API endpoints
    ```

1. 回答代理在研究你的任务后提出的任何澄清性问题。

1. 计划代理会生成高层次计划摘要、实现和验证步骤。审查计划草案，并提交后续提示来迭代优化计划，直到它满足你的需求为止。

1. 当计划最终确定后，选择开始实现，或在编辑器中打开规划提示以进行进一步审查。

    要实现该计划，你可以在同一个会话中继续操作，或者启动一个新的 [Copilot CLI 会话](/docs/agents/agent-types/copilot-cli.md) 在后台实现该计划。

> [!TIP]
> 计划代理会自动将其实现计划保存到会话记忆文件(`/memories/session/plan.md`)中。要访问此文件，请运行**聊天：显示记忆文件**命令，并从列表中选择 `plan.md`。会话记忆在对话结束时会被清除，因此该计划在后续会话中将不可用。

## 自定义规划

你可以根据团队的工作流程来定制规划过程：

* **创建自定义规划代理。** 定义一个[自定义代理](/docs/agent-customization/custom-agents.md)，为其提供针对你规划流程的特定说明，例如强制执行架构指南或要求特定的规划交付物。

* **为规划和实现选择合适的模型。** 使用 `setting(chat.planAgent.defaultModel)` 设置为计划代理选择默认模型，并使用 `setting(github.copilot.chat.implementAgent.model)` 为实现步骤选择模型。

* **为计划代理添加额外工具（实验性）。** 使用 `setting(github.copilot.chat.planAgent.additionalTools)` 设置在研究和规划阶段为计划代理提供额外的工具访问权限。例如，使用 MCP 服务器连接到内部数据源或工具。

## 相关资源

* [使用研究代理进行深度研究](/docs/agents/agent-types/copilot-cli.md#run-deep-research-with-the-research-agent)
* [VS Code 代理中的记忆](/docs/agents/memory.md)
* [为代理配置工具](/docs/chat/chat-tools.md)
* [上下文工程用户指南](/docs/agents/guides/context-engineering-guide.md)
