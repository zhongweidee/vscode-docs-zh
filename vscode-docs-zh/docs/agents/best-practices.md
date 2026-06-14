---
ContentId: 58ea6755-9bfa-42c2-a4c8-ff0510f9c031
DateApproved: 6/10/2026
MetaDescription: 在 VS Code 中充分利用 GitHub Copilot 的最佳实践，从编写提示词到为 AI 配置项目。
MetaSocialImage: images/shared/github-copilot-social.png
---
# 在 VS Code 中使用 AI 的最佳实践

本文介绍了在 Visual Studio Code 中充分利用 AI 的经过验证的实践。每个部分都提供了可操作的指导，并附有深入文档的链接。

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="AI 在 VS Code 中的运作方式">
了解代理循环、上下文窗口、工具及其他核心概念。

* [了解核心概念](/docs/agents/concepts/overview.md)

</div>

## 为 AI 优化你的项目

通过以 AI 为考量来配置你的项目和代码库，你可以提高 AI 响应的准确性，并确保 AI 遵循你团队的编码标准和实践。

VS Code 支持多种机制来为你的项目配置 AI 行为。在聊天中输入 `/init` 即可生成初始配置。

| 机制 | 最适用于 | 入门指南 |
|-----------|----------|-------------|
| [自定义指令](/docs/agent-customization/custom-instructions.md) | 项目范围的编码标准和架构上下文 | 输入 `/init` 为你的项目生成始终开启的指令 |
| [自定义代理](/docs/agent-customization/custom-agents.md) | 专业工作流或角色（TDD、安全审计） | 输入 `/create-agent <描述>` 生成自定义代理 |
| [技能](/docs/agent-customization/agent-skills.md) | 领域特定能力（测试、部署） | 输入 `/create-skill <描述>` 生成技能 |
| [工具和 MCP 服务器](/docs/chat/chat-tools.md) | 连接到外部系统（数据库、API、CLI） | 在 `mcp.json` 中配置 |

有效项目配置的技巧：

* **保持指令文件简洁。** 它们在每次聊天交互时都会加载。重点提供 AI 无法从代码中推断的信息，例如非默认约定、架构决策或环境设置。
* **使用 `applyTo` 模式限定指令范围。** 输入 `/instructions` 创建特定语言或特定文件夹的指令文件，而不是将所有内容放在一个文件中。
* **限制启用的工具数量。** 激活的工具越少，响应就越快、越相关。仅在任务需要时才启用工具。

完整设置详情，请参见[自定义概述](/docs/agent-customization/overview.md)。

## 为任务选择合适的工具

VS Code 中的 AI 提供了多种交互模式。为当前任务选择正确的模式可以节省时间并产生更好的结果。

| 工具 | 最适用于 | 示例 |
|------|----------|---------|
| [内联建议](/docs/editing/ai-powered-suggestions.md) | 在编写代码时保持流畅 | 内联建议、变量名、样板代码 |
| [提问（聊天）](/docs/chat/chat-overview.md) | 提问、头脑风暴、探索想法 | "这个项目中的身份验证是如何工作的？" |
| [内联聊天](/docs/chat/inline-chat.md) | 无需切换上下文的定向即时编辑 | 重构函数、添加错误处理 |
| [代理](/docs/agents/overview.md) | 需要自主规划和工具使用的多文件更改 | 端到端实现一个功能 |
| [计划](/docs/agents/planning.md) | 实现前的结构化规划 | 设计架构或迁移策略 |
| [智能操作](/docs/editing/copilot-smart-actions.md) | 内置的专业化单步任务 | 生成提交信息、修复错误、重命名符号 |

## 选择正确的代理类型

使用代理时，请选择与你的任务和工作流匹配的代理类型。每种类型在交互性、速度和隔离性方面都有不同的权衡。

* **使用本地代理进行交互式工作。** 本地代理在你的编辑器中运行，可以完全访问你的工作区、工具和扩展。当你需要快速迭代、在修改发生时审查更改，或使用 VS Code 特定工具（如[集成浏览器](/docs/debugtest/integrated-browser.md)或 MCP 服务器）时，请选择本地代理。

* **将定义明确的任务交给后台代理。** 当任务足够清晰、无需观察每一步时，使用 [Copilot CLI](/docs/agents/agent-types/copilot-cli.md) 或[云代理](/docs/agents/agent-types/cloud-agents.md)。

* **使用云代理进行团队协作。** [云代理](/docs/agents/agent-types/cloud-agents.md)在远程运行并创建拉取请求，非常适合需要团队审查的任务，或者当你希望将 GitHub 议题直接分配给代理时。

* **为独立任务运行并行会话。** 在本地、后台和云环境中同时启动多个代理会话，同时处理不相关的任务。通过[会话列表](/docs/chat/chat-sessions.md#sessions-list)监控它们。

* **在不同代理类型之间移交。** 先使用本地代理以交互方式探索和规划，然后[移交](/docs/agents/overview.md#hand-off-a-session-to-another-agent)给后台或云代理进行实现。对话历史会延续。

更多信息，请参见[使用代理](/docs/agents/overview.md)和[代理教程](/docs/agents/agents-tutorial.md)。

## 编写有效的提示词

AI 响应的质量取决于你提示词的清晰度和具体性。以下技巧有助于获得更好的结果。

* **明确输入、输出和约束条件。** 说明你希望使用的编程语言、框架和库。描述预期行为或包含示例输入和输出。

    ```prompt
    编写一个验证电子邮件地址的 TypeScript 函数。
    对于有效地址返回 true，否则返回 false。不要使用正则表达式。
    示例：validateEmail("user@example.com") 返回 true
    示例：validateEmail("invalid") 返回 false
    ```

* **分解复杂任务。** 不要一次性要求实现整个功能，而是将其分解为更小、范围明确的步骤。这种方法能产生更可靠的结果，并更容易及早发现问题。

* **包含用于验证的预期输出。** 提供测试用例、预期结果或验收标准，以便 AI 可以验证自己的工作。这是你能做的最有杠杆效应的事情之一。

    ```prompt
    使用令牌桶算法实现速率限制器。
    编写单元测试验证：允许每秒 10 次请求、
    第 11 次请求被拒绝、桶在 1 秒后重新填充。
    实现后运行测试。
    ```

* **避免模糊的提示词。** 像"让这个更好"这样的提示词没有给 AI 提供方向。相反，要说明"更好"意味着什么："降低时间复杂度"或"为 null 值添加输入验证"。

* **使用追问迭代优化。** 通过追加约束条件或修正来细化响应，而不是重写整个提示词。

* **尽早纠正方向。** 如果 AI 的方向不对，通过追问消息来[引导](/docs/chat/chat-overview.md#send-messages-while-a-request-is-running)它，重定向当前请求、排队后续请求，或停止并发送新的提示词。

* **告诉 AI 提出澄清问题。** 如果任务不明确，指示 AI 在继续之前向你提问。这比猜测需求能产生更准确的结果。

* **并行任务。** 如果你有多个独立任务，可以要求 AI 并行运行它们以节省时间。例如，"并行地对 X 和 Y 进行独立研究，并总结研究结果"。

更多信息，请在 GitHub Copilot 文档中查找实用的[提示词示例](https://docs.github.com/en/copilot/copilot-chat-cookbook)。

## 提供正确的上下文

当 AI 拥有相关上下文时，它会做出更准确的响应。使用以下技巧引导 AI 获取正确的信息：

* AI 会自动执行代码搜索以收集相关上下文。当你的提示词不明确时，可以通过在提示词中使用 `#<文件>`、`#<文件夹>` 或 `#<符号>` 引用特定的文件、文件夹或符号来引导 AI。

* 要从网页或 GitHub 仓库获取信息，请使用 `#fetch` 为 AI 提供代码库之外的最新信息，或使用来自 MCP 服务器（如 GitHub MCP）的工具。

* 引用 VS Code 环境上下文（如源代码管理更改、终端输出或测试失败），帮助 AI 理解项目的当前状态并提供更相关的响应。

* 添加图像或截图，让 AI 分析视觉内容。

* 使用[集成浏览器](/docs/debugtest/integrated-browser.md)预览你的应用，并选择页面元素作为上下文。

更多信息，请参见[为聊天提示词添加上下文](/docs/chat/copilot-chat-context.md)和[配置工具](/docs/chat/chat-tools.md)。

## 选择合适的模型

每个 AI 模型都有不同的优势。有些更擅长推理，其他则在代码生成或快速响应方面表现出色。为你的任务选择合适的模型可以改善结果。

* **将模型与任务复杂度匹配。** 使用快速模型进行简单的补全和样板代码。切换到推理优化的模型进行规划、调试或架构决策。

* **使用最新模型。** 较新的模型通常具有更强的能力。VS Code 持续添加对新模型和模型版本的支持。查看[可用模型](/docs/agent-customization/language-models.md)并使用最新模型。

* **在提示文件和代理中固定模型。** 在提示文件或自定义代理定义中指定首选模型，以确保在特定任务中始终使用正确的模型。

* **实验和比较。** 如果你对响应不满意，请尝试使用不同的模型。对于相同的提示词，不同模型可能产生显著不同的结果。

* **调整推理模型的思考力度。** 在模型选择器中使用[思考力度控制](/docs/agent-customization/language-models.md#configure-thinking-effort)，为复杂任务增加力度或为简单任务降低力度。

* **使用 BYOK 获得额外控制。** 使用自己的 API 密钥以获取更多模型选择和托管选项。

* **考虑额度消耗。** 能力更强的模型每个 token 消耗更多的 [AI 额度](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs)。自动模型选择会自动平衡质量和成本。更多技巧，请参见[优化 AI 额度使用](/docs/agents/guides/optimize-usage.md)。

更多信息，请参见[选择 AI 模型](/docs/agent-customization/language-models.md)和 [Copilot Chat 可用模型](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat)。

## 先做计划，再实现

对于涉及多个文件的复杂更改，要将规划与实现分开。这种方法可以防止 AI 解决错误的问题，并避免将 [AI 额度](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs) 花在需要丢弃的代码上。

1. **探索。** 使用提问模式或子代理来阅读相关代码，理解其工作原理后再进行更改。
1. **计划。** 使用[计划代理](/docs/agents/planning.md)创建结构化的实现计划。在执行前审查并完善计划。
1. **实现。** 切换到代理模式，根据计划进行实现。包含测试或预期输出，以便代理能够验证自己的工作。对于较长的任务，移交给[后台代理](/docs/agents/agent-types/copilot-cli.md)或[云代理](/docs/agents/agent-types/cloud-agents.md)。
1. **审查。** 使用[检查点](/docs/chat/chat-checkpoints.md)审查进度，在代理偏离轨道时回退，或在生成的拉取请求上[请求 Copilot 代码审查](https://docs.github.com/en/copilot/concepts/agents/code-review)。

更多信息，请参见[上下文工程工作流](/docs/agents/guides/context-engineering-guide.md)。

## 审查和验证 AI 输出

AI 生成的代码可能包含 bug、安全问题或细微的逻辑错误。始终将 AI 输出视为需要审查的起点。

* **接受前先审查。** 在接受更改前仔细阅读生成的代码。注意边缘情况、错误处理和 AI 可能做出的假设。

* **在 AI 更改后运行测试。** 在提示词中包含测试用例，以便 AI 能够验证自己的工作。如果 AI 没有自动运行测试，请在继续之前自行运行。

* **使用检查点回退。** 如果代理偏离轨道，使用[检查点](/docs/chat/chat-checkpoints.md)回滚到已知的良好状态，而不是试图修复级联错误。

* **检查安全问题。** 审查 AI 生成的代码是否存在常见漏洞，如注入缺陷、硬编码密钥或缺少输入验证。避免将凭证或敏感数据粘贴到提示词中。

更多信息，请参见 [GitHub Copilot 安全](/docs/agents/security.md)和 [GitHub Copilot 信任中心](https://copilot.github.trust.page/faq)。

## 管理上下文和会话

随着对话中无关上下文的积累，AI 响应质量可能会下降。请主动管理你的会话。

* **为不相关的任务启动新会话。** 不要将不相关的问题不断堆砌到同一个会话中。上下文污染会降低响应质量，并在无关历史上浪费 token。

* **移除无关历史。** 删除不再相关的过去提问和响应，或启动一个新的会话。

* **压缩上下文。** 使用 [/compact](/docs/chat/copilot-chat-context.md#context-compaction) 并提供指令来有选择地压缩上下文，仅保留最相关的信息。压缩可以减少每次后续请求发送的 token，有助于[管理 AI 额度使用](/docs/agents/guides/optimize-usage.md)。

* **使用子代理进行调查。** 提示 AI 通过使用[子代理](/docs/agents/subagents.md)在隔离环境中进行研究和探索，这样研究发现就不会弄乱你的主上下文。

* **选择合适的会话类型。** 使用本地会话来处理需要你立即关注的当前代码上的快速任务，使用后台任务来处理可以本地运行且与主上下文隔离的任务，或使用云会话进行利于团队协作的任务。

* **通过并行会话来扩展规模。** 为独立任务并行运行多个会话，以节省时间并保持上下文分离。你可以同时在本地、后台和云环境中运行多个会话，并通过 VS Code 中的[会话列表](/docs/chat/chat-sessions.md#sessions-list)在它们之间切换。

* **使用分支替代重新提示。** 使用 [`/fork`](/docs/chat/chat-sessions.md#fork-a-chat-session) 来探索替代方案而不丢失上下文，而不是从头开始重新建立上下文。

更多信息，请参见[会话管理](/docs/chat/chat-sessions.md)、[工作区索引](/docs/agents/reference/workspace-context.md)和[优化 AI 额度使用](/docs/agents/guides/optimize-usage.md)。

## 优化 AI 额度使用

本文中的许多实践也有助于控制成本。能力更强的模型、较大的上下文和需要丢弃的工作都会消耗 [AI 额度](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs)。以下几个杠杆影响最大：

* **将模型与任务匹配。** 使用更快、更便宜的模型进行简单工作，将高级模型保留用于规划、调试和架构决策。自动模型选择会为你平衡质量和成本。

* **保持上下文精简。** 只发送相关上下文，[压缩](/docs/chat/copilot-chat-context.md#context-compaction)长对话，为不相关的任务启动新会话，避免在每次请求中为无关历史付费。

* **先做计划再实现。** 将规划与实现分开可以避免将额度花在需要丢弃的代码上。

完整的技巧集，请参见[优化 AI 额度使用](/docs/agents/guides/optimize-usage.md)。

## 处理大型代码库

Copilot 被设计为能够有效地处理大型、复杂和多根工作区。使用以下实践在大规模项目中获得最佳结果。

* **使用工作区索引。** VS Code 使用语义搜索、语言智能和 GitHub 代码搜索自动为你的项目建立索引，以进行深度跨文件推理。这适用于小型项目和大型企业代码库。对于大型仓库，使用[远程索引](/docs/agents/reference/workspace-context.md#semantic-index-sources)在你的仓库和 GitHub 上的相关仓库中获得快速、全面的结果。

* **使用多根工作区限定工作范围。** 对于 monorepo 或包含多个服务的项目，使用[多根工作区](/docs/editing/workspaces/multi-root-workspaces.md)为 AI 提供清晰的边界和专注的上下文。

* **提供项目级指令。** 使用[自定义指令](/docs/agent-customization/custom-instructions.md)描述项目的架构、模块边界以及 AI 仅凭代码无法推断的约定。这为 AI 提供了进行架构级更改所需的上下文。

* **为独立更改运行并行会话。** 将大任务分解为独立的子任务，并在[并行会话](/docs/chat/chat-sessions.md#sessions-list)中运行它们，每个会话专注于代码库的不同区域。

* **使用计划代理处理跨领域更改。** 对于涉及多个文件或模块的更改，在执行前先使用[计划代理](/docs/agents/planning.md)创建结构化的实现计划。

更多信息，请参见[工作区上下文](/docs/agents/reference/workspace-context.md)和[代理](/docs/agents/overview.md)。

## 相关资源

* [上下文工程指南](/docs/agents/guides/context-engineering-guide.md)
* [优化 AI 额度使用](/docs/agents/guides/optimize-usage.md)
* [自定义概述](/docs/agent-customization/overview.md)
* [速查表](/docs/agents/reference/ai-features-cheat-sheet.md)
* [GitHub Copilot 安全](/docs/agents/security.md)
* GitHub Copilot 文档中的[使用 GitHub Copilot 的最佳实践](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot)
