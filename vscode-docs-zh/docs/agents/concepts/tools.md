---
ContentId: d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a
DateApproved: 6/10/2026
MetaDescription: 了解扩展 VS Code 中 AI 代理的不同工具类型，包括内置工具、MCP 服务器和扩展工具。
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- tools
- MCP
- model context protocol
- built-in tools
- extension tools
- tool approval
---

# 工具

工具是让模型能够对开发环境执行操作的机制。没有工具，[语言模型](/docs/agents/concepts/language-models.md)只能生成文本。有了工具，[代理](/docs/agents/concepts/agents.md)就能读取文件、编写代码、运行终端命令、搜索代码库以及连接外部服务。

在[代理循环](/docs/agents/concepts/agents.md#agent-loop)过程中，模型会根据任务决定调用哪些工具。每次工具调用产生的输出都会成为下一次迭代中[上下文](/docs/agents/concepts/context.md)的一部分。

本文介绍了可用的工具类型、代理如何选择和使用工具，以及如何控制启用哪些工具。

## 工具类型

VS Code 支持三种类型的工具：

* **内置工具**：随 VS Code 提供的工具，用于常见开发任务，如读取和写入文件、运行终端命令、搜索代码库以及浏览编辑器。这些工具无需任何设置即可立即使用。
* **MCP工具**：由[模型上下文协议 (MCP)](https://modelcontextprotocol.io/) 服务器提供的工具，这是一种将 AI 模型连接到外部工具和数据源的开放标准。MCP 服务器可以在本地计算机上运行，也可以远程托管。使用 MCP 工具可以连接数据库、API 和其他外部服务。
* **扩展工具**：由 VS Code 扩展通过 Language Model Tools API 提供贡献的工具。扩展工具与编辑器深度集成，安装扩展后即可使用。

## 工具的工作原理

当代理处理任务时，模型会检查可用的工具并决定调用哪些工具。这个过程是自主进行的：你给代理一个高层次的任务，它会在每一步自行确定使用哪些合适的工具。

你也可以在提示中显式引用工具，输入 `#` 后跟工具名称。当你希望确保使用某个特定工具时，这种方法非常有用。

## 为什么要限制可用工具

代理可以调用的每个工具都会增加模型需要推理的决策空间，而每次工具调用产生的输出都会被添加到[上下文窗口](/docs/agents/concepts/language-models.md#context-window)中。将可用工具集缩小到与任务相关的工具有助于：

* **保留上下文**：更少的工具调用意味着中间结果消耗的上下文更少。
* **减少信用额度消耗**：不必要的工具调用会增加令牌使用量，并消耗更多的 [AI 信用额度](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs)。
* **获得更相关的结果**：代理专注于最合适的工具，而不是从大量工具中选择。
* **提升性能**：较小的工具集减少了模型的决策空间。

工具可用性可以按每次请求限定范围，也可以通过[提示文件](/docs/agent-customization/prompt-files.md)和[自定义代理](/docs/agent-customization/custom-agents.md)为特定工作流固定工具集。有关配置步骤，请参阅[在聊天中使用工具](/docs/chat/chat-tools.md)。

## 工具审批与信任

工具可以执行修改文件、环境或访问外部服务的操作。VS Code 包含安全控制功能，让你始终掌控局面：

* **审批提示**：具有副作用的工具在运行前会显示确认对话框。你可以批准单次使用、当前会话或所有后续调用。
* **URL 审批**：当工具访问 URL 时，一个两步流程会验证请求和响应内容。
* **权限级别**：[权限选择器](/docs/agents/approvals.md#permission-levels)控制代理拥有多少自主权，从需要手动审批到完全自动运行。

了解更多关于[信任与安全](/docs/agents/concepts/trust-and-safety.md)的信息。

## 相关资源

* [在聊天中使用工具](/docs/chat/chat-tools.md)
* [添加和管理 MCP 服务器](/docs/agent-customization/mcp-servers.md)
* [代理](/docs/agents/concepts/agents.md)
