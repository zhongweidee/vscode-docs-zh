---
ContentId: 9d8f3a2b-5c6e-4f7a-8b9c-1d2e3f4a5b6c
DateApproved: 6/10/2026
MetaDescription: 探索在 VS Code 中跨不同场景（包括代码生成、调试、测试和使用 Notebook）进行聊天的有效提示词示例。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# 提示词示例

本文提供了在 Visual Studio Code 中跨不同场景和代理进行聊天的示例提示词。使用这些示例作为灵感，为自己的开发任务编写有效的提示词。

如果你是 VS Code 聊天的新手，请详细了解[聊天入门](/docs/chat/chat-overview.md)或查阅[提示词编写最佳实践](/docs/agents/best-practices.md)。

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
按照实践教程体验 VS Code 中的本地代理、后台代理和云端代理。

* [开始教程](/docs/agents/agents-tutorial.md)

</div>

## 通用编码和技术问题

使用 **Ask** 代理快速获取有关编码概念、技术主题和通用编程问题的答案。

```prompt-ask
什么是链表？
```

```prompt-ask
提供在 React 中实现搜索功能的 3 种方法。
```

```prompt-ask
解释 async/await 和 promise 之间的区别。
```

## 理解和探索你的代码库

使用 **Ask** 代理并结合 `#codebase` 来了解项目的运行方式、定位特定功能或探索代码关系。

```prompt-ask
解释 #codebase 中的身份验证是如何工作的
```

```prompt-ask
数据库连接字符串在哪里配置？ #codebase
```

```prompt-ask
如何构建这个 #codebase？
```

```prompt-ask
#calculator.test.js 使用了哪个测试框架？
```

## 代码生成和编辑

使用 **Agent** 进行多文件创建，使用**内联聊天**（`kb(inlinechat.start)`）进行针对性的就地编辑。

```prompt
添加一个登录按钮并根据 #styles.css 为其设置样式
```

```prompt
使用 React 和 Node.js 创建一个膳食规划 Web 应用
```

```prompt
将此代码重构为使用 async/await
```

## 测试和质量保证

使用 **Agent** 生成测试或修复失败的测试。

```prompt
为用户服务添加单元测试。
```

```prompt
修复失败的测试 #testFailure
```

## 调试和修复问题

使用 **Agent** 修复跨文件的问题，或先使用 **Ask** 了解根本原因。

```prompt
修复 #problems 中的问题
```

```prompt
为什么这个函数返回 undefined？
```

## 使用源代码管理

使用聊天处理待处理的更改并生成发布文档。

```prompt
总结 #changes
```

```prompt
基于 #changes 生成发布说明
```

## 使用外部资源

使用 `#fetch` 引用网页内容，或使用 GitHub MCP 服务器在公共 GitHub 仓库中搜索代码示例。

```prompt
如何在 React 18 中使用 'useState' 钩子？ #fetch https://18.react.dev/reference/react/useState#usage
```

```prompt
构建一个 API 端点来获取地址信息，使用 GitHub 仓库 contoso/api-templates 中的模板
```

```prompt
此工作区中排名靠前的 #extensions 有哪些？
```

## 终端和命令行任务

使用[终端内联聊天](/docs/chat/inline-chat.md#use-terminal-inline-chat)获取 Shell 命令和终端操作的帮助。

```prompt
如何安装 npm 包？
```

```prompt
列出 src 目录中最大的 5 个文件
```

```prompt
撤销最后一次 git 提交
```

## 使用 Jupyter Notebook

使用 **Agent** 创建、编辑和处理 Jupyter Notebook。

```prompt
/newNotebook 使用 pandas 和 seaborn 读取并可视化 titanic 数据集。展示数据集中的关键信息。
```

```prompt
创建一个 Notebook 来读取 #housing.csv 中的数据并绘制价格分布图
```

```prompt
确保数据在可视化和处理之前已清理
```

```prompt
展示数据集中不同特征之间的相关性
```

## 多轮对话示例

聊天支持在同一会话中进行后续提示。使用多轮对话迭代结果并优化 AI 的输出。

**第一个提示词：**

```prompt
使用 Express.js 创建一个 REST API，包含用户和产品的端点
```

**后续提示词：**

```prompt
为两个端点添加输入验证和错误处理
```

```prompt
现在为验证逻辑添加单元测试
```

通过在之前的回复基础上构建，AI 会保留之前步骤的上下文并生成更连贯的代码。

## 编写有效提示词的技巧

* **具体明确**：包含关于你想要完成什么、使用哪些技术以及期望的输出格式的详细信息。
* **添加上下文**：使用 #-提及 来引用文件、符号或上下文变量，如 `#codebase`、`#changes` 或 `#problems`。
* **迭代优化**：从一个简单的提示词开始，根据回复进行优化。提出后续问题以改进结果。
* **拆解复杂任务**：不要一次性要求所有内容，而是将大型任务分解为更小、可管理的步骤。

详细了解[提示词编写最佳实践](/docs/agents/best-practices.md)和[为提示词添加上下文](/docs/chat/copilot-chat-context.md)。

## 相关资源

* [聊天概览](/docs/chat/chat-overview.md)
* [为聊天提示词添加上下文](/docs/chat/copilot-chat-context.md)
* [内联聊天](/docs/chat/inline-chat.md)
* GitHub 文档中的 [Copilot Chat Cookbook](https://docs.github.com/en/copilot/example-prompts-for-github-copilot-chat)
