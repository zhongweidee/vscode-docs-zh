---
ContentId: c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f
DateApproved: 6/10/2026
MetaDescription: 了解 VS Code 如何为 AI 提示词组装上下文，包括工作区索引、隐式上下文、显式引用以及上下文窗口管理。
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- context
- context window
- workspace indexing
- prompt
- mentions
- implicit context
---

# 上下文

上下文是模型在生成响应时所能看到的一切。它包括对话历史、来自工作区的文件内容、工具输出、自定义指令以及你显式添加的任何引用。模型只能根据它能看到的内容进行推理，因此提供相关上下文是改善 AI 响应的最有效方法之一。

本文介绍 VS Code 如何组装上下文、有哪些类型的上下文可用，以及如何有效地处理上下文窗口限制。

## 为什么上下文很重要

一个带有相关文件、清晰指令和聚焦历史的提示词，比一个没有上下文的模糊提示词能产生更好的结果。模型对之前的会话没有记忆，也无法访问未被提供的文件。它对于你的任务所知道的一切，都来自为当前请求组装的上下文。

## VS Code 如何组装上下文

当你发送消息时，VS Code 会从多个来源构建语言模型提示词：

![显示上下文窗口为一个包含七层的容器的示意图：系统指令、自定义设置、用户消息、对话历史、隐式上下文、显式引用和工具输出，箭头将组装好的提示词发送给语言模型。](../images/concepts/context-assembly.png)

* **系统指令**：定义代理行为的内置准则。
* **自定义设置**：你设置的 AI 自定义设置，包括自定义代理、技能和自定义指令。
* **用户消息**：你发送给代理的当前消息。
* **对话历史**：当前会话中到目前为止交换的消息。
* **隐式上下文**：你正在编辑的文件、当前选中的内容、可见的错误以及 git 状态。
* **显式引用**：你通过 `#` 引用引用的文件、编辑器上下文、网页内容和其他来源。
* **工具输出**：在代理会话期间，文件读取、终端命令、代码库搜索结果以及其他工具调用的结果。

这个组装好的提示词就是模型看到的内容。除此之外的一切对模型来说都是不可见的。这就是为什么使用 `#file` 引用特定文件比询问模型未曾见过的代码能得到更好的结果。

## 工作区索引

VS Code 使用索引来快速准确地搜索代码库中的相关代码片段。此索引可以由 GitHub 维护，也可以存储在本地计算机上。

* **远程索引**：如果你的代码托管在 GitHub 仓库中，你可以构建远程索引来快速搜索代码库，即使对于大型代码库也是如此。
* **本地索引**：使用存储在本地计算机上的高级语义索引，以获得快速准确的搜索结果。
* **基础索引**：如果本地索引不可用，则使用更简单的算法在本地处理较大的代码库。

详细了解[工作区索引](/docs/agents/reference/workspace-context.md)。

## 隐式上下文

VS Code 会根据你当前的活动自动向提示词提供上下文：

* 活动编辑器中当前选中的文本。
* 活动编辑器的文件名或笔记本名称。
* 如果你正在使用 **Ask** 代理，活动文件会自动包含为上下文。
* 使用 **Agent** 时，它会根据你的提示词自主决定是否需要添加活动文件。

## 有效处理上下文

* **为新任务开始新会话。**[会话](/docs/chat/chat-sessions.md)是一个独立的对话，拥有自己的上下文窗口和历史记录。每个会话都是全新的，因此不要将同一个对话用于不相关的任务。
* **有选择地使用上下文。**将整个代码库都添加进去并不总是有帮助的。要引用与任务相关的特定文件。
* **使用自定义指令设置持久规则。**你在[自定义指令](/docs/agent-customization/custom-instructions.md)中添加的规则会包含在每次请求中，这样即使对话被总结，也不会丢失这些规则。

### 示例

以下示例展示了添加上下文如何改善结果：

**模糊的提示词（无上下文）**：

```prompt
How does authentication work?
```

模型无法知道你所指的项目是哪个，只能给出关于身份验证模式的通用回答。

**带有显式上下文的提示词**：

```prompt
How does authentication work for this project?
```

模型会读取你实际的身份验证文件，并解释*你的*实现是如何工作的，引用具体的函数和配置值。

**带有网页上下文的提示词**：

```prompt
Migrate the auth module to the latest passport.js API #fetch https://www.passportjs.org/concepts/authentication/
```

模型会使用来自网页的最新文档来指导迁移，避免使用训练数据中过时的 API 模式。

详细了解[向聊天添加上下文](/docs/chat/copilot-chat-context.md)。

## 相关资源

* [语言模型](/docs/agents/concepts/language-models.md)
* [管理 AI 上下文](/docs/chat/copilot-chat-context.md)
* [上下文工程指南](/docs/agents/guides/context-engineering-guide.md)
* [工作区索引](/docs/agents/reference/workspace-context.md)
