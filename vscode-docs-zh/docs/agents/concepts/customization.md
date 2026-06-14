---
ContentId: f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c
DateApproved: 6/10/2026
MetaDescription: 了解 VS Code 中的 AI 自定义选项，包括指令、提示文件、自定义代理、技能、钩子和插件。
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- customization
- instructions
- prompt files
- custom agents
- agent skills
- hooks
- plugins
- MCP
---

# 自定义

AI 模型拥有广泛的通用知识，但不了解你的代码库或团队实践。可以将 AI 想象成一位技术娴熟的新团队成员：它能写出很棒的代码，但不知道你的编码约定、架构决策或首选的库。自定义就是让你分享这些上下文的方式，使得 AI 的响应符合你的编码标准、项目结构和工作流。

本文是自定义的决策矩阵：它解释了不同的选项，并帮助你选择最适合你目标的选项。有关设置步骤和示例，请参阅[在 Visual Studio Code 中自定义 AI](/docs/agent-customization/overview.md) 以及每个选项所链接的独立指南。

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="开始使用自定义功能">
跟随实践教程，探索自定义选项并为你的项目进行配置。

* [为你的项目自定义 AI](/docs/agents/guides/customize-copilot-guide.md)

</div>

## 自定义选项一览

| 目标 | 使用方式 | 示例 | 激活时机 |
|------|---------|------|----------|
| 在所有地方应用编码标准 | [始终启用的指令](/docs/agent-customization/custom-instructions.md) | 强制执行 ESLint 规则，要求 JSDoc 注释 | 在每个请求中自动包含 |
| 为不同文件类型设置不同规则 | [基于文件的指令](/docs/agent-customization/custom-instructions.md) | 为 `.tsx` 文件设定 React 模式 | 当文件匹配某个模式或描述时 |
| 可重复执行的可复用任务 | [提示文件](/docs/agent-customization/prompt-files.md) | 脚手架生成 React 组件 | 当你调用斜杠命令时 |
| 用脚本封装多步骤工作流 | [代理技能](/docs/agent-customization/agent-skills.md) | 测试、代码检查与部署流水线 | 当任务匹配技能描述时 |
| 具有工具限制的专用 AI 角色 | [自定义代理](/docs/agent-customization/custom-agents.md) | 安全审查员、数据库管理员 | 当你选择它或另一个代理委托给它时 |
| 连接到外部 API 或数据库 | [MCP](/docs/agent-customization/mcp-servers.md) | 查询 PostgreSQL 数据库 | 当任务匹配工具描述时 |
| 在代理生命周期节点自动执行任务 | [钩子](/docs/agent-customization/hooks.md) | 每次文件编辑后运行格式化工具 | 当代理到达匹配的生命周期事件时 |
| 安装预打包的自定义内容 | [代理插件](/docs/agent-customization/agent-plugins.md) | 安装社区测试插件 | 当你安装插件时 |

从自定义指令开始，用于项目范围内的标准。当你有可重复的任务时，添加提示文件。当需要外部数据时，使用 MCP。为专用角色创建自定义代理。随着需求增长，你可以组合使用多种自定义类型。

## 自定义功能的组合方式

各个自定义选项设计为可以分层叠加：

* **指令**塑造 AI *如何*编写代码（约定、风格、库）。
* **提示文件**和**代理技能**封装了 AI 为重复性任务*做什么*，从单个提示到多步骤的脚本工作流。
* **自定义代理**定义 AI *扮演谁*（角色、工具、模型），并可以委托其他代理执行多步骤工作流。
* **MCP 服务器**通过添加连接外部系统的[工具](/docs/agents/concepts/tools.md)来扩展*AI 能触及的范围*。
* **钩子**在代理循环中的特定生命周期节点强制执行*确定性操作*，无论模型决定做什么。
* **代理插件**是上述内容的预打包集合，通过插件市场分发。

有关配置步骤和示例，请参阅[在 Visual Studio Code 中自定义 AI](/docs/agent-customization/overview.md) 以及上表中链接的各篇文章。

## 相关资源

* [在 Visual Studio Code 中自定义 AI](/docs/agent-customization/overview.md)
* [代理](/docs/agents/concepts/agents.md)
* [工具](/docs/agents/concepts/tools.md)
