---
ContentId: d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a
DateApproved: 6/10/2026
MetaDescription: 通过选择高效的模型、管理上下文和监控消耗，优化你在 VS Code 中的 AI 积分使用。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# 在 VS Code 中优化 AI 积分使用

每个 GitHub Copilot 计划都包含每月 [AI 积分](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals)额度。不同的操作会以不同的速率消耗积分，具体取决于所采用的模型和处理的令牌数量。本指南介绍了在 Visual Studio Code 中充分利用 AI 积分的实用方法。

## 选择高效的模型

能力更强的模型每个令牌的成本更高，而轻量级模型则能让你更充分地使用积分。根据任务的复杂程度来匹配合适的模型：

* 对于快速编辑、样板代码生成和简单问题，使用**轻量级模型**。
* 对于复杂的重构、架构决策和多步骤调试，使用**推理模型**。
* 使用**自动模型选择**，让 VS Code 将每个请求路由到在质量和成本之间取得平衡的高效模型。
* 使用具有首选模型的[自定义代理](/docs/agent-customization/custom-agents.md)，将特定子任务路由到专业的、具有成本效益的模型。当你将自定义代理作为子代理调用时，它会使用自己配置的模型，而不是聊天会话的模型。

聊天中的模型选择器在悬停菜单中显示成本详情，包括每种令牌类型的成本以及通用的成本等级标签（低、中、高）。利用这些信息做出明智的选择。

有关更多信息，请参阅[选择和配置语言模型](/docs/agent-customization/language-models.md)以及[模型选择最佳实践](/docs/agents/best-practices.md#choose-the-right-model)。

## 先规划再实现

直接跳入代码生成可能会导致方案错误而浪费精力。同时，整个过程都需要一个具有足够推理能力的模型，这会消耗更多积分。相反，应将规划和实现阶段分开。这样你就可以使用推理模型进行规划，然后在计划确定后切换到更快、更高效的模型进行实现。

1. 使用[计划代理](/docs/agents/planning.md)研究任务并创建结构化的实现计划。
1. 在代理编写任何代码之前，先审阅和完善计划。
1. 将批准的计划移交给使用更快模型的实现代理来执行。

这种工作流可确保代理在开始生成代码之前理解需求，从而减少反复修改和返工。

有关更多信息，请参阅[先规划，再实现](/docs/agents/best-practices.md#plan-first-then-implement)。

## 使用默认的思考力度

思考力度控制着模型对每个请求施加的推理程度。更高的力度级别会产生更多的思考令牌，从而增加延迟和积分消耗。VS Code 根据评估结果设置了默认的力度级别，并启用了自适应推理，即模型会根据每个请求的复杂程度动态决定推理深度。

对于大多数任务，默认设置已足够。只有在处理真正复杂的问题时（如架构规划或多步骤调试）才需要提高思考力度。

有关更多信息，请参阅[配置思考力度](/docs/agent-customization/language-models.md#configure-thinking-effort)。

## 为新任务开启新的聊天

随着对话的增长，它会累积来自之前消息、工具输出和文件内容的上下文。当你在同一个会话中切换到不相关的任务时，模型仍然会处理所有那些无关的历史记录，这会消耗令牌却不会改善结果。

当话题改变时，开启一个[新的聊天会话](/docs/agents/sessions/chat-sessions.md)（`kb(workbench.action.chat.newChat)`）。这为模型提供了一个专注于当前任务的干净上下文窗口。

## 善用分支分叉

当你想探索替代方案或提出附带问题时，[对对话进行分支分叉](/docs/agents/sessions/chat-sessions.md#fork-a-chat-session)，而不是从头开始重新提示。分支分叉会创建一个新会话，该会话继承现有的对话历史记录，因此你无需重新建立上下文。

* 在聊天输入框中输入 `/fork`，将截至当前消息的整个会话进行分支分叉。
* 将鼠标悬停在之前的消息上，选择**分支分叉对话**以从特定检查点进行分支分叉。

## 禁用不需要的工具和 MCP 服务器

每个工具调用都会产生输出，这会占用[上下文窗口](/docs/agents/concepts/language-models.md#context-window)的空间并导致积分消耗。为当前任务禁用不需要的工具，以防止不必要的调用。

* 使用聊天输入字段中的**配置工具**按钮，为当前请求启用或禁用单个工具或整个 MCP 服务器。
* 在[自定义代理](/docs/agent-customization/custom-agents.md)中，通过 `tools` 属性仅指定代理所需的工具。这可以防止代理调用与其工作流无关的工具。

有关更多信息，请参阅[在聊天中使用工具](/docs/chat/chat-tools.md)。

## 将文件排除在 Copilot 上下文之外

大型生成文件、构建输出或无关目录可能会被包含在 AI 上下文中，从而增加令牌使用量却没有实际价值。排除这些文件以减少不必要的上下文：

* 使用 `.gitignore` 文件将文件从[工作区索引](/docs/agents/reference/workspace-context.md#what-content-is-included-in-the-semantic-index)中排除。工作区索引会遵循 `.gitignore` 规则。
* 使用 `setting(files.exclude)` 设置将文件完全从 VS Code 中隐藏，这也会将其从索引中排除。

有关更多信息，请参阅[工作区上下文](/docs/agents/reference/workspace-context.md)。

## 通过压缩来管理上下文

当对话变得冗长时，使用 `/compact` 来总结对话的较早部分并回收上下文窗口空间。你可以选择添加指令来引导总结的方向，例如 `/compact 重点关注 API 设计决策`。

有关更多信息，请参阅[上下文压缩](/docs/chat/copilot-chat-context.md#context-compaction)。

## 监控你的使用情况

你可以在 Copilot 状态仪表板中查看当前的 Copilot 使用情况，该仪表板可通过 VS Code 状态栏访问。仪表板会显示你当月 AI 积分（以及 Copilot Free 计划的内联建议）已消耗的百分比。

<!-- TODO: add screenshot of Copilot status dashboard -->

请访问 GitHub Copilot 文档，了解有关[监控使用情况和权益](https://docs.github.com/en/copilot/managing-copilot/monitoring-usage-and-entitlements/monitoring-your-copilot-usage-and-entitlements)的更多信息。

你还可以在任何聊天会话中运行 `/chronicle:cost-tips` 命令，以根据你最近的活动获取个性化的 AI 积分优化建议。了解有关[会话洞察和 chronicle 命令](/docs/agents/sessions/session-insights.md)的更多信息。

## 检查令牌使用量和缓存

使用[代理调试日志](/docs/agents/agent-troubleshooting/chat-debug-view.md)来了解会话中是什么在消耗积分：

* **摘要视图**显示会话的聚合令牌使用量，包括工具调用总数和整体持续时间。
* **缓存浏览器视图**显示提示缓存命中率以及有多少输入令牌被重复使用。提示缓存允许模型提供商重复使用与之前请求匹配的请求前缀，从而降低延迟和令牌成本。

审阅这些日志可以帮助你识别消耗令牌超出预期的会话或工作流，从而调整你的使用方式。

## 相关内容

* [AI 积分和模型成本](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs)
* [选择和配置语言模型](/docs/agent-customization/language-models.md)
* [GitHub Copilot 最佳实践](/docs/agents/best-practices.md)
* [GitHub Copilot 计划](https://docs.github.com/en/copilot/get-started/plans)
* [按使用量计费](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals)
