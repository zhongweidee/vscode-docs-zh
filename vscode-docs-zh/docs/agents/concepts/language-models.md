---
ContentId: b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e
DateApproved: 6/10/2026
MetaDescription: 了解大语言模型如何驱动 VS Code 中的 AI 功能，包括模型特性、上下文窗口和模型选择。
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- language model
- LLM
- context window
- nondeterministic
- model selection
- BYOK
---

# 语言模型

Visual Studio Code 使用大语言模型（LLM）来驱动其 AI 功能。你可以通过 GitHub Copilot 计划从多个模型中选择，也可以使用自带模型。本文介绍语言模型的工作原理、特性以及如何进行模型选择。

## 语言模型的工作原理

语言模型接收文本输入（"提示词"）并生成文本输出。在 VS Code 中，提示词由多个来源组合而成：你的消息、对话历史、文件内容、工具输出以及自定义指令。模型生成的响应可以包含解释说明、代码编辑或调用[工具](/docs/agents/concepts/tools.md)的请求。

语言模型不会直接执行代码或访问文件。相反，它们生成文本，由[代理循环](/docs/agents/concepts/agents.md#agent-loop)将其解释为操作。当模型请求工具调用时，VS Code 执行该工具并将结果反馈给模型，用于下一次迭代。

## 关键特性

* **非确定性**：相同的提示词每次可能产生不同的结果。这是有意设计的，反映了模型从概率分布中采样的方式。
* **依赖上下文**：响应的质量取决于提示词中提供的上下文的质量和相关性。
* **知识边界**：模型是在特定日期之前的数据上训练的，对于超出其训练数据范围的主题，可能会产生过时或不正确的信息。VS Code 通过工具和工作区索引来缓解这一问题。

## 上下文窗口

上下文窗口是模型在单次请求中可以处理的信息总量。它包含所有内容：系统提示词、自定义指令、对话历史、文件内容、工具输出以及你当前的消息。不同模型具有不同的上下文窗口大小。

当上下文窗口填满时，VS Code 会自动总结对话中较早的部分以腾出空间。这意味着在长时间对话中，早期的细节可能会被压缩或丢失。你也可以在聊天输入框中输入 `/compact` 随时手动触发压缩。你还可以在命令后添加自定义指令来引导摘要，例如 `/compact focus on the API design decisions`。

了解更多关于 [VS Code 如何组装上下文](/docs/agents/concepts/context.md) 和 [上下文压缩](/docs/chat/copilot-chat-context.md#context-compaction)。

## 思考与推理

某些语言模型在生成响应之前可以执行扩展推理，也称为"思考"。推理模型不是立即生成答案，而是先在内部处理问题，考虑多种方法、评估权衡并构建逐步的思维链。这种内部推理发生在专用的思考令牌中，与最终输出分离。

推理模型特别适用于复杂任务，例如多步调试、架构规划、代码重构以及数学或科学分析。对于生成样板代码或回答基本问题等简单任务，额外的推理会增加延迟而不会带来显著收益。

### 思考力度

思考力度控制模型对每次请求投入多少推理。更高的力度级别会产生更彻底的内部推理，从而提高复杂问题的质量。较低的力度级别通过限制或跳过思考步骤来减少延迟和令牌使用。

可用的力度级别及其默认值因模型和提供商而异。某些模型还支持*自适应思考*，即模型根据每次请求的复杂度动态决定是否思考以及思考多少，而不是始终使用固定的思考预算。

VS Code 根据评估数据和线上性能数据设置了默认的思考力度级别，并在支持的情况下启用了自适应推理。对于大多数使用场景，默认设置无需更改即可良好运行。

### 思考令牌

思考令牌计入模型的上下文窗口，即使它们在响应中不可见。实际的思考输出通常以摘要形式返回，或者可以完全省略以降低延迟。请注意，更高的思考力度级别可能会产生更多的思考令牌，从而增加延迟。

了解如何在 VS Code 中[配置思考力度级别](/docs/agent-customization/language-models.md#configure-thinking-effort)。

## 选择合适的模型

每个模型都有不同的优势。有些模型针对速度进行了优化，适合快速编辑和简单问题。其他模型具有更大的上下文窗口或更好的推理能力，非常适合复杂任务。作为一般准则：

* **快速模型**最适合快速代码编辑、样板代码生成和简单问题。
* **推理模型**擅长复杂重构、架构决策、多步调试以及需要分析权衡的任务。
* **大上下文模型**适用于大型代码库或需要保留更多信息的长时间对话。

你可以根据特定任务的需要随时切换模型。有关详细比较，请参阅 GitHub Copilot 文档中的 [Choosing the right AI model for your task](https://docs.github.com/en/copilot/using-github-copilot/ai-models/choosing-the-right-ai-model-for-your-task)。

### 自动模型选择

自动模型选择结合两个系统将每个请求路由到最优模型。一个系统跟踪实时模型健康状态和可用性，另一个系统评估任务复杂度。两者协同工作，将每个任务匹配到能够高效解决的模型，将更高成本的推理模型保留给需要它们的复杂问题，并将简单任务路由到更快的模型。

自动选择从多个模型中选择，并遵循你组织的[模型访问设置](https://docs.github.com/en/copilot/how-tos/use-ai-models/configure-access-to-ai-models)。自动选择不会选取管理员策略排除的模型或数据驻留策略限制的模型。

有关更多详细信息，请参阅 GitHub 文档中的 [About Copilot auto model selection](https://docs.github.com/en/copilot/concepts/auto-model-selection)。

### AI 积分与模型成本

每个 Copilot 计划包含每月的 [AI 积分](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals) 额度。不同模型以不同速率消耗 AI 积分，取决于模型和处理的令牌数量。功能更强的模型每个令牌的成本更高，而轻量模型则可以让你的使用量延续更长。当你使用自动模型选择时，VS Code 会将每个请求路由到平衡质量与成本的高效模型。

其他因素也会影响积分消耗，例如[思考力度](/docs/agent-customization/language-models.md#configure-thinking-effort)（更高的力度产生更多思考令牌）、上下文窗口大小和工具使用。有关减少积分消耗的实用技巧，请参阅[优化 AI 积分使用](/docs/agents/guides/optimize-usage.md)。

了解如何在 VS Code 中[选择和配置语言模型](/docs/agent-customization/language-models.md)。

## 使用自带语言模型密钥

如果内置模型不能满足你的需求，你可以使用自带语言模型 API 密钥（BYOK）来使用其他提供商的模型或在本地运行模型。BYOK 允许你连接到任何兼容的模型提供商，同时仍然使用 VS Code 的聊天体验和工具。

### 为什么使用自带密钥

* **模型选择**：访问来自不同提供商的数百种模型，超越内置模型的范围。
* **实验探索**：尝试尚未在内置模型中提供的新模型或功能。
* **本地计算**：使用你自己的计算资源来运行 GitHub Copilot 已支持的模型，或运行尚未可用的模型。
* **更高的控制权**：绕过内置模型上的标准速率限制和约束。
* **离线和气隙环境**：在没有 GitHub 账户、Copilot 计划或互联网连接的情况下，使用本地模型（如 Ollama）来使用 AI 聊天功能。

### 注意事项

* BYOK 仅适用于聊天体验和辅助任务。内联建议（代码补全）和依赖嵌入的功能（如语义搜索）仍然需要 GitHub 账户。
* 功能取决于模型，可能与内置模型有所不同，例如对工具调用、视觉或思考功能的支持。
* 使用 BYOK 时，无法保证对模型输出应用负责任的 AI 过滤。

了解如何在 VS Code 中[添加你自己的语言模型密钥](/docs/agent-customization/language-models.md#bring-your-own-language-model-key)。

## 相关资源

* [上下文](/docs/agents/concepts/context.md)
* [VS Code 中的 AI 语言模型](/docs/agent-customization/language-models.md)
