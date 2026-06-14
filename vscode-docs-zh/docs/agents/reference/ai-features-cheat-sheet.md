---
ContentId: de6f9f68-7dd5-4de3-a210-3db57882384b
DateApproved: 6/10/2026
MetaDescription: VS Code AI 功能快速参考，包括自主代理、多文件编辑、内联建议和企业控制。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# VS Code 中的 AI 功能速查表

Visual Studio Code 提供 AI 驱动的自主代理、内联建议、聊天和智能操作。代理可以跨多个文件规划、实施和验证更改，并以并行、本地、后台或云端方式运行。您可以从多种 AI 模型中选择，通过 MCP 连接到外部工具，并为团队的工作流自定义代理。本速查表为您提供所有功能的快速概览。

> [!TIP]
> 如果您还没有 Copilot 订阅，可以通过注册 [Copilot 免费计划](https://github.com/github-copilot/signup)免费使用 Copilot，并获取每月内联建议和 AI 信用额度。

> [!IMPORTANT]
> **从 2026 年 4 月 20 日起**，Copilot Pro、Copilot Pro+、Max 和学生计划的新注册将暂时暂停。

## 基本键盘快捷键

* `kb(workbench.panel.chat)` - 打开聊天视图
* `kb(workbench.action.chat.startVoiceChat)` - 在聊天视图中输入语音聊天提示
* `kb(workbench.action.chat.newChat)` - 在聊天视图中开始新的聊天会话
* `kb(workbench.action.chat.openAgent)` - 在聊天视图中切换到使用代理
* `kb(inlineChat.start)` - 在编辑器或终端中启动内联聊天
* `kb(workbench.action.chat.startVoiceChat)` (按住) - 启动内联语音聊天
* `kb(editor.action.inlineSuggest.commit)` - 接受内联建议或导航到下一个编辑建议
* `kb(editor.action.inlineSuggest.hide)` - 忽略内联建议

## 在 VS Code 中访问 AI

* 使用自然语言开始聊天对话
    * 聊天视图 (`kb(workbench.action.chat.open)`)：在次要侧边栏中保持持续的聊天对话
    * 编辑器或终端中的内联聊天 (`kb(inlineChat.start)`)：在工作流中随时提问
    * 快速聊天 (`kb(workbench.action.quickchat.toggle)`)：在不离开当前任务的情况下快速提问

* [编辑器](/docs/editing/ai-powered-suggestions.md)中的 AI
    * 内联建议：在输入时获取建议，按 `kb(editor.action.inlineSuggest.commit)` 接受建议
    * 编辑上下文菜单操作：访问常见的 AI 操作，如解释或修复代码、生成测试或审查文本选择
    * 代码操作：获取编辑器代码操作（灯泡图标）以修复 lint 和编译器错误

* VS Code 中针对特定任务的[智能操作](/docs/editing/copilot-smart-actions.md)
    * 生成提交消息和拉取请求标题及描述
    * 修复测试错误
    * 语义化文件搜索建议

## VS Code 中的聊天体验

开始自然语言聊天对话以获取编码任务的帮助。例如，要求解释一段代码或一个编程概念，重构一段代码，或实现一个新功能。了解更多关于[使用聊天](/docs/chat/chat-overview.md)的信息。

| 操作 | 描述 |
|--------|-------------|
| `kb(workbench.action.chat.open)` | 在次要侧边栏中打开[聊天视图](/docs/chat/chat-overview.md)。 |
| `kb(inlinechat.start)` | 启动[内联聊天](/docs/chat/inline-chat.md)以在编辑器或终端中打开聊天。 |
| `kb(workbench.action.quickchat.toggle)` | 在不中断工作流的情况下打开[快速聊天](/docs/chat/chat-overview.md)。 |
| `kb(workbench.action.chat.newChat)` | 在聊天视图中开始新的聊天会话。 |
| `kb(workbench.action.chat.toggleAgentMode)` | 在聊天视图中切换不同的[代理](/docs/agent-customization/custom-agents.md)。 |
| `kb(workbench.action.chat.openModelPicker)` | 显示模型选择器以[选择不同的 AI 模型](/docs/agent-customization/language-models.md)用于聊天。 |
| 上下文窗口控制 | 聊天输入框中显示[上下文窗口使用情况](/docs/chat/copilot-chat-context.md#monitor-context-window-usage)的可视化指示器。悬停可查看总令牌数和按类别细分。 |
| `添加上下文...` | 将不同类型的[上下文附加到您的聊天提示](/docs/chat/copilot-chat-context.md)。 |
| `/`-命令 | 使用[斜杠命令](#slash-commands)执行常见任务或调用[可重用聊天提示](/docs/agent-customization/overview.md)。 |
| `#`-提及 | 引用常用工具或聊天变量以在提示中[提供上下文](/docs/chat/copilot-chat-context.md)。 |
| 编辑 (<i class="codicon codicon-pencil"></i>) | [编辑先前的聊天提示](/docs/chat/chat-checkpoints.md#edit-a-previous-chat-request)并还原更改。 |
| 历史记录 (<i class="codicon codicon-history"></i>) | 访问您的聊天会话历史记录。 |
| 排队或引导 | 在请求运行时[发送后续消息](/docs/chat/chat-overview.md#send-messages-while-a-request-is-running)。选择排队消息、引导当前请求或立即停止并发送。 |
| 语音 (<i class="codicon codicon-mic"></i>) | 通过语音输入聊天提示（语音聊天）。聊天响应会朗读出来。 |
| [KaTeX](https://katex.org) | 在聊天响应中渲染数学方程式。通过 `setting(chat.math.enabled)` 启用。右键单击数学表达式以复制源表达式。 |
| [Mermaid](https://mermaid.js.org) | 在聊天响应中渲染 Mermaid 图表。通过 `setting(mermaid-chat.enabled)` 启用。右键单击图表以复制源代码。 |

> **提示**
>
> * 使用 `#`-提及为您的聊天提示添加更多上下文。
> * 具体明确、保持简单，并通过追问来获得最佳结果。
> * 选择适合您具体任务的内置代理或自定义代理。

## 为您的提示添加上下文

通过[为您的聊天提示提供上下文](/docs/chat/copilot-chat-context.md)来获取更相关的响应。从不同的上下文类型中选择，例如文件、符号、编辑器选择、源代码控制提交、测试失败等。

| 操作 | 描述 |
|--------|-------------|
| **添加上下文** | 打开快速选择以为您的聊天提示选择相关上下文。从不同的上下文类型中选择，例如工作区文件、符号、当前编辑器选择、终端选择等。 |
| 拖放文件 | 从资源管理器或搜索视图拖放文件，或将编辑器选项卡拖放到聊天视图上。 |
| 拖放文件夹 | 将文件夹拖放到聊天视图上以附加其中的文件。 |
| 拖放问题 | 从问题面板拖放项目。 |
| `#<文件\|文件夹\|符号>` | 输入 `#`，后跟文件、文件夹或符号名称，将其添加为聊天上下文。 |
| `#`-提及 | 输入 `#`，后跟[聊天工具](#chat-tools)以添加特定的上下文类型或工具。 |

## 聊天工具

在聊天中使用[工具](/docs/chat/chat-tools.md)来处理处理用户请求时的专门任务。此类任务的示例包括列出目录中的文件、编辑工作区中的文件、运行终端命令、获取终端输出等。

VS Code 提供内置工具，您可以通过 [MCP 服务器](/docs/agent-customization/mcp-servers.md)和[扩展](/api/extension-guides/ai/tools.md)的工具来扩展聊天功能。了解更多关于[工具类型](/docs/agents/concepts/tools.md#types-of-tools)的信息。

下表列出了 VS Code 内置工具：

| 聊天变量/工具 | 描述 |
|--------|-------------|
| `#agent` (工具集) | 将任务委托给其他[代理](/docs/agents/subagents.md)。 |
| `#agent/runSubagent` | 在隔离的[子代理上下文](/docs/agents/subagents.md)中运行任务。有助于改进主代理线程的上下文管理。 |
| `#browser` (工具集) | _（实验性）_ 与[集成浏览器](/docs/debugtest/integrated-browser.md)中的页面交互：导航、读取页面内容、截图、点击、输入、悬停、拖放和处理对话框。通过 `setting(workbench.browser.enableChatTools)` 启用。 |
| `#edit` (工具集) | 启用在工作区中的修改。 |
| `#edit/createDirectory` | 在工作区中创建新目录。 |
| `#edit/createFile` | 在工作区中创建新文件。 |
| `#edit/editFiles` | 对工作区中的文件应用编辑。 |
| `#edit/editNotebook` | 对笔记本进行编辑。 |
| `#execute` (工具集) | 在您的机器上执行代码和应用程序。 |
| `#execute/createAndRunTask` | 在工作区中创建并运行新的[任务](/docs/debugtest/tasks.md)。 |
| `#execute/getTerminalOutput` | 获取在工作区中运行终端命令的输出。 |
| `#execute/runInTerminal` | 在集成终端中运行 shell 命令。 |
| `#execute/runNotebookCell` | 运行笔记本单元格。 |
| `#execute/testFailure` | 获取单元测试失败信息。在运行和诊断[测试](/docs/debugtest/testing.md)时很有用。 |
| `#githubRepo` | 对 GitHub 仓库进行语义搜索，查找相关源代码片段。使用 `owner/repo` 指定仓库。 |
| `#githubTextSearch` | 对 GitHub 仓库或组织进行文本搜索，查找包含特定关键字或代码模式的文件。 |
| `#newWorkspace` | 创建新的工作区。 |
| `#read` (工具集) | 读取工作区中的文件。 |
| `#read/getNotebookSummary` | 获取笔记本单元格列表及其详细信息。 |
| `#read/problems` | 将**问题**面板中的工作区问题和错误添加为上下文。在修复代码或调试时很有用。 |
| `#read/readFile` | 读取工作区中文件的内容。 |
| `#read/readNotebookCellOutput` | 读取笔记本单元格执行的输出。 |
| `#read/terminalLastCommand` | 获取最后运行的终端命令及其输出。 |
| `#read/terminalSelection` | 获取当前终端选择。 |
| `#search` (工具集) | 在当前工作区中启用文件搜索。 |
| `#search/changes` | 源代码控制更改列表。 |
| `#search/codebase` | 在当前工作区中执行代码搜索，自动为聊天提示查找相关上下文。 |
| `#search/fileSearch` | 使用 glob 模式搜索工作区中的文件并返回其路径。 |
| `#search/listDirectory` | 列出工作区中目录的文件。 |
| `#search/textSearch` | 在文件中查找文本。 |
| `#search/usages` | 组合"查找所有引用"、"查找实现"和"转到定义"。 |
| `#selection` | 获取当前编辑器选择（仅在选择文本时可用）。 |
| `#todos` | 使用待办事项列表跟踪聊天请求的实施和进度。 |
| `#vscode/askQuestions` | 使代理能够使用交互式问题轮播询问澄清问题。 |
| `#vscode/extensions` | 搜索和询问 VS Code 扩展。例如，"如何开始使用 Python #extensions？" |
| `#vscode/getProjectSetupInfo` | 为搭建不同类型的项目提供说明和配置。 |
| `#vscode/installExtension` | 安装 VS Code 扩展。 |
| `#vscode/runCommand` | 运行 VS Code 命令。例如，"启用禅模式 #runCommand。" |
| `#vscode/VSCodeAPI` | 询问 VS Code 功能和扩展开发。 |
| `#web` (工具集) | 访问 Web 内容。 |
| `#web/fetch` | 获取给定网页的内容。例如，"总结 #web/fetch code.visualstudio.com/updates。" |

## 斜杠命令

斜杠命令是聊天中特定功能的快捷方式。您可以使用它们快速执行操作，例如修复问题、生成测试或解释代码。

| 斜杠命令 | 描述 |
|---------------|-------------|
| `/doc` | 从编辑器内联聊天生成代码文档注释。 |
| `/explain` | 解释代码块、文件或编程概念。 |
| `/fix` | 要求修复代码块或解决编译器或 lint 错误。 |
| `/tests` | 为编辑器中所有或仅选定的方法和函数生成测试。 |
| `/setupTests` | 获取为您的代码设置测试框架的帮助。获取相关测试框架的推荐、设置和配置步骤，以及 VS Code 测试扩展的建议。 |
| `/clear` | 在聊天视图中开始新的聊天会话。 |
| `/compact` | 通过总结来压缩对话上下文。当对话过长超出模型上下文窗口时很有用。 |
| `/fork` | 将当前聊天会话分叉到一个继承完整对话历史的新独立会话中。了解更多关于[分叉聊天会话](/docs/chat/chat-sessions.md#fork-a-chat-session)的信息。 |
| `/debug` | 显示聊天调试视图以[检查聊天日志进行故障排除](/docs/agents/agent-troubleshooting/troubleshooting.md)。 |
| `/troubleshoot` | 要求 AI 分析当前聊天会话的[代理调试日志](/docs/agents/agent-troubleshooting/chat-debug-view.md)。可选地包含 `#session` 来选择并诊断先前的聊天会话。例如，`/troubleshoot 我使用了多少令牌？` 或 `/troubleshoot 列出您在 #session 中尝试加载自定义设置的所有路径`。需要 `setting(github.copilot.chat.agentDebugLog.enabled)`。 |
| `/new` | 搭建新的 VS Code 工作区或文件。使用自然语言描述您需要的项目/文件类型，并在创建前预览搭建内容。 |
| `/newNotebook` | 根据您的要求搭建新的 Jupyter 笔记本。使用自然语言描述笔记本应包含的内容。 |
| `/init` | 根据您的项目结构和编码模式生成或更新工作区说明（`copilot-instructions.md` 或 `AGENTS.md`）。 |
| `/plan` | 为复杂的编码任务创建详细的实施计划。研究需求、询问澄清问题，并生成包含步骤、验证和决策的结构化计划。 |
| `/search` | 为搜索视图生成搜索查询。使用自然语言描述您要搜索的内容。 |
| `/startDebugging` | 生成 `launch.json` 调试配置文件并从聊天视图启动调试会话。 |
| `/agents` | 配置您的[自定义代理](/docs/agent-customization/custom-agents.md)。 |
| `/hooks` | 配置您的[钩子](/docs/agent-customization/hooks.md)。 |
| `/instructions` | 配置您的[自定义说明](/docs/agent-customization/custom-instructions.md)。 |
| `/prompts` | 配置您的[可重用提示文件](/docs/agent-customization/prompt-files.md)。 |
| `/skills` | 配置您的[代理技能](/docs/agent-customization/agent-skills.md)。 |
| `/create-prompt` | 在代理模式下借助 AI 辅助生成[提示文件](/docs/agent-customization/prompt-files.md)。 |
| `/create-instruction` | 在代理模式下借助 AI 辅助生成[说明文件](/docs/agent-customization/custom-instructions.md)。 |
| `/create-skill` | 在代理模式下借助 AI 辅助生成[代理技能](/docs/agent-customization/agent-skills.md)。 |
| `/create-agent` | 在代理模式下借助 AI 辅助生成[自定义代理](/docs/agent-customization/custom-agents.md)。 |
| `/create-hook` | 在代理模式下借助 AI 辅助生成[钩子](/docs/agent-customization/hooks.md)配置。 |
| `/yolo`<br/>`/autoApprove` | 启用所有工具调用的[全局自动批准](/docs/agents/approvals.md) (`setting(chat.tools.global.autoApprove)`)。首次显示警告对话框。 |
| `/disableYolo`<br/>`/disableAutoApprove` | 禁用所有工具调用的[全局自动批准](/docs/agents/approvals.md)。 |
| `/<技能名称>` | 在聊天中运行[代理技能](/docs/agent-customization/agent-skills.md)。例如，如果您有一个名为 `webapp-testing.md` 的技能文件，可以通过输入 `/webapp-testing` 来运行它。 |
| `/<提示名称>` | 在聊天中运行[可重用提示](/docs/agent-customization/prompt-files.md)。 |

## 聊天参与者

使用聊天参与者来处理聊天中的特定领域请求。聊天参与者以 `@` 为前缀，可用于询问有关特定主题的问题。VS Code 提供内置聊天参与者，例如 `@github`、`@terminal` 和 `@vscode`，扩展可以提供额外的参与者。

| 聊天参与者 | 描述 |
|------------------|-------------|
| `@github` | 使用 `@github` 参与者询问有关 GitHub 仓库、问题、拉取请求等的问题。了解更多关于[可用的 GitHub 技能](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide#currently-available-skills)的信息。<br/>示例：`@github 分配给我的所有待处理 PR 有哪些？`、`@github 显示 @dancing-mona 最近合并的 PR` |
| `@terminal` | 使用 `@terminal` 参与者询问有关集成终端或 shell 命令的问题。<br/>示例：`@terminal 列出此工作区中最大的 5 个文件` |
| `@vscode` | 使用 `@vscode` 参与者询问有关 VS Code 功能、设置和 VS Code 扩展 API 的问题。<br/>示例：`@vscode 如何启用自动换行？` |

## 使用代理

使用[代理](/docs/agents/agent-types/local-agents.md)时，您可以使用自然语言指定一个高层次任务，让 AI 自主推理请求、规划所需工作，并将更改应用到您的代码库。代理使用代码编辑和工具调用的组合来完成您指定的任务。在处理您的请求时，它会监控编辑和工具的结果，并迭代解决出现的任何问题。

| 操作 | 描述 |
|--------|-------------|
| `kb(workbench.action.chat.openAgent)` | 在聊天视图中切换到使用代理 |
| 工具 (<i class="codicon codicon-tools"></i>) | 配置使用代理时可用的工具。从内置工具、MCP 服务器和扩展提供的工具中选择。 |
| 权限级别 | 为当前会话选择[权限级别](/docs/agents/approvals.md#permission-levels)：**默认批准**、**绕过批准**或**自动驾驶**。控制工具批准的处理方式。 |
| 自动批准工具 | 使用代理时启用[所有工具的自动批准](/docs/agents/approvals.md#tool-approval) (`setting(chat.tools.autoApprove)`)。 |
| 自动批准终端命令 | 使用代理时启用[终端命令的自动批准](/docs/agents/approvals.md#automatically-approve-terminal-commands) (`setting(chat.tools.terminal.autoApprove)`)。 |
| MCP | 配置 [MCP 服务器](/docs/agent-customization/mcp-servers.md)以扩展代理功能和工具。 |
| [第三方代理](/docs/agents/agent-types/third-party-agents.md) | 使用来自外部提供商的代理，如 Claude Agent（预览）和 OpenAI Codex，配合您的 Copilot 订阅。 |
| Claude Agent _（预览）_ | 启动由 Anthropic 的 Claude Agent SDK 驱动的 Claude Agent 会话。使用 `/agents`、`/hooks` 和 `/memory` 斜杠命令进行高级工作流。 |

> **提示**
>
> * 在使用代理时添加额外工具以扩展其功能。
> * 配置自定义代理以定义代理的操作方式，例如实现只读规划模式。
> * 定义自定义说明以指导代理如何生成和构建代码。
> * 尝试第三方代理，如 Claude Code 或 OpenAI Codex，以获得替代的代理编码体验。

## 规划

使用 VS Code 聊天中的[规划代理](/docs/agents/planning.md)在开始复杂的编码任务之前创建详细的实施计划。将批准的计划交给实施代理开始编码。

| 操作 | 描述 |
|--------|-------------|
| 规划代理 | 从代理下拉菜单中选择**规划**代理，或使用 `/plan` 斜杠命令为复杂的编码任务创建详细的实施计划。 |
| 待办事项列表 | 查看待办事项列表以跟踪复杂任务的进度。通过 `setting(chat.tools.todos.showWidget` 设置启用此功能。 |
| [记忆](/docs/agents/memory.md) | 代理跨对话保存和调用持久笔记。使用**聊天：显示记忆文件**命令查看已存储的记忆。 |

## 自定义您的聊天体验

自定义您的聊天体验以生成符合您编码风格、工具和开发工作流的响应。有几种方法可以在 VS Code 中自定义您的聊天体验：

* [自定义说明](/docs/agent-customization/custom-instructions.md)：为诸如生成代码、执行代码审查或生成提交消息等任务定义通用指南或规则。自定义说明描述了 AI 应如何操作的条件（任务应*如何*完成）。

* [可重用提示文件](/docs/agent-customization/prompt-files.md)：为常见任务定义可重用提示，如生成代码或执行代码审查。提示文件是您可以直接在聊天中运行的独立提示。它们描述了要执行的任务（*应该*做什么）。

* [自定义代理](/docs/agent-customization/custom-agents.md)：定义聊天的运作方式、可以使用的工具以及如何与代码库交互。每个聊天提示都在代理的边界内运行，无需为每个请求配置工具和说明。

使用[代理自定义编辑器](/docs/agent-customization/overview.md#manage-customizations-in-the-editor)（预览）在一个地方发现、创建和管理所有自定义设置。在聊天视图中选择**配置聊天**（齿轮图标），或从命令面板运行**聊天：打开自定义设置**。

> **提示**
>
> * 定义特定语言的说明以为每种语言生成更准确的代码。
> * 将您的说明存储在工作区中，以便轻松与团队共享。
> * 为常见任务定义可重用提示文件，以节省时间并帮助团队成员快速上手。

## 编辑器 AI 功能

在编辑器中编码时，您可以使用 AI 在输入时生成内联建议。调用内联聊天以在保持编码流程的同时提问和获取帮助。例如，要求 AI 为函数或方法生成单元测试。了解更多关于[内联建议](/docs/editing/ai-powered-suggestions.md)和[内联聊天](/docs/chat/inline-chat.md)的信息。

| 操作 | 描述 |
|--------|-------------|
| 内联建议 | 在编辑器中开始输入以获取[内联建议](/docs/editing/ai-powered-suggestions.md)，这些建议符合您的编码风格并考虑现有代码。 |
| 代码注释 | 通过在代码注释中编写指令来提供内联建议提示。<br/>示例：`# 编写一个包含加法、减法和乘法静态方法的计算器类` |
| `kb(inlinechat.start)` | 启动编辑器内联聊天，直接从编辑器发送聊天请求。使用自然语言并引用聊天变量和斜杠命令来提供上下文。 |
| `kb(editor.action.rename)` | 在重命名代码中的符号时获取 AI 驱动的建议。 |
| 上下文菜单操作 | 使用编辑器上下文菜单访问常见的 AI 操作，例如解释代码、生成测试、审查代码等。在编辑器中右键单击打开上下文菜单，选择**生成代码**。 |
| 代码操作（灯泡） | 在编辑器中选择代码操作（灯泡）以修复代码中的 lint 或编译器错误。 |

> **提示**
>
> * 使用有意义的方法或函数名称以更快获得更好的内联建议。
> * 选择代码块以限定内联聊天提示的范围，或通过附加文件或符号来附加相关上下文。
> * 使用编辑器上下文菜单选项直接从编辑器访问常见的 AI 驱动操作。

## 源代码控制与问题

使用 AI 分析提交和拉取请求中的更改，并为提交消息和拉取请求描述提供建议。

| 操作 | 描述 |
|--------|-------------|
| `#changes` | 将当前源代码控制更改作为上下文添加到聊天提示中。 |
| 提交作为上下文 | 将源代码控制历史记录中的提交作为上下文添加到聊天提示中。 |
| 提交消息 | 为源代码控制提交中的当前更改生成提交消息。 |
| 合并冲突（实验性） | 获取[使用 AI 解决 Git 合并冲突](/docs/sourcecontrol/merge-conflicts.md)的帮助。 |
| 拉取请求描述 | 生成与拉取请求中的更改相对应的拉取请求标题和描述。 |
| `@github` | 在聊天中使用 `@github` 参与者询问跨仓库的问题、拉取请求等。了解更多关于[可用的 GitHub 技能](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide#currently-available-skills)的信息。<br/>示例：`@github 分配给我的所有待处理 PR 有哪些？`、`@github 显示 @dancing-mona 最近合并的 pr` |

## 审查代码（实验性）

使用 AI 对代码块进行快速审查，或对工作区中未提交的更改进行审查。审查反馈以注释形式显示在编辑器中，您可以在其中应用建议。

| 操作 | 描述 |
|--------|-------------|
| **审查选择** _（预览）_ | 选择一段代码，然后从编辑器上下文菜单中选择**生成代码** > **审查**以进行快速审查。 |
| **代码审查** | 在源代码控制视图中选择**代码审查**按钮，对所有未提交的更改进行更深入的审查。 |

## 搜索与设置

在搜索视图中获取语义相关的搜索结果，或在设置编辑器中获取搜索设置的帮助。

| 操作 | 描述 |
|--------|-------------|
| 设置搜索 | 在设置编辑器中包含语义搜索结果 (`setting(workbench.settings.showAISearchToggle)`)。 |
| 语义搜索 _（预览）_ | 在搜索视图中包含语义搜索结果 (`setting(search.searchView.semanticSearchBehavior)`)。 |

## 生成测试

VS Code 可以通过在聊天中使用斜杠命令为代码库中的函数和方法生成测试。斜杠命令是您可以在聊天提示中使用的常见任务的简写。输入 `/` 后跟命令名称以使用斜杠命令。

| 操作 | 描述 |
|--------|-------------|
| `/tests` | 为编辑器中所有或仅选定的方法和函数生成测试。生成的测试会附加到现有测试文件或创建新的测试文件。 |
| `/setupTests` | 获取为您的代码设置测试框架的帮助。获取相关测试框架的推荐、设置和配置步骤，以及 VS Code 测试扩展的建议。 |
| `/fixTestFailure` | 向 AI 征求如何修复失败测试的建议。 |
| 测试覆盖率 _（实验性）_ | 为尚未被测试覆盖的函数和方法生成测试。[了解更多信息](/updates/v1_93.md#generate-tests-based-on-test-coverage-experimental)。 |

> **提示**
>
> * 提供有关要使用的测试框架或库的详细信息。

## 调试与修复问题

使用 AI 帮助修复编码问题，并获取在 VS Code 中配置和启动调试会话的帮助。

| 操作 | 描述 |
|--------|-------------|
| `/fix` | 向 AI 征求如何修复代码块或如何解决代码中任何编译器或 lint 错误的建议。例如，帮助修复未解析的 Node.js 包名称。 |
| `/fixTestFailure` | 向 AI 征求如何修复失败测试的建议。 |
| `/startDebugging` _（实验性）_ | 生成 `launch.json` 调试配置文件并从聊天视图[启动调试会话](/docs/agents/guides/debug-with-copilot.md)。 |
| `copilot-debug` 命令 | 终端命令，帮助您[调试程序](/docs/agents/guides/debug-with-copilot.md)。在运行命令前加上此前缀以为其启动调试会话（例如，`copilot-debug python foo.py`）。 |

> **提示**
>
> * 提供有关所需修复类型的其他信息，例如优化内存消耗或性能。
> * 关注编辑器中指示修复代码问题建议的 AI 代码操作。

## 搭建新项目

AI 可以通过生成项目结构搭建或根据您的要求生成笔记本来帮助您创建新项目。

| 操作 | 描述 |
|--------|-------------|
| 代理 | 使用[代理](/docs/agents/agent-types/local-agents.md)并使用自然语言提示创建新项目或文件。例如，`创建一个 Svelte Web 应用程序来跟踪我的任务`。 |
| `/new` | 在聊天视图中使用 `/new` 命令搭建新项目或新文件。使用自然语言描述您需要的项目/文件类型，并在创建前预览搭建内容。<br/>示例：`/new 使用 TypeScript 和 Svelte 的 Express 应用` |
| `/newNotebook` | 在聊天视图中使用 `/newNotebook` 命令根据您的要求生成新的 Jupyter 笔记本。使用自然语言描述笔记本应包含的内容。<br/>示例：`/newNotebook 获取人口普查数据并用 Seaborn 预览关键洞察`。 |

## 终端

获取关于 shell 命令以及如何在终端中运行命令时解决错误的帮助。

| 操作 | 描述 |
|--------|-------------|
| `kb(inlinechat.start)` | 启动终端内联聊天，使用自然语言询问关于 shell 命令和终端的问题。<br/>示例：`这台机器有多少核心？` |
| `@terminal` | 在聊天视图中使用 `@terminal` 参与者询问有关集成终端或 shell 命令的问题。<br/>示例：`@terminal 列出此工作区中最大的 5 个文件` |
| `@terminal /explain` | 在聊天视图中使用 `/explain` 命令解释终端中的内容。<br/>示例：`@terminal /explain top shell 命令` |

## Python 与笔记本支持

您可以使用聊天来帮助您在原生 Python REPL 和 Jupyter 笔记本中进行 Python 编程任务。

| 操作 | 描述 |
|--------|-------------|
| <i class="codicon codicon-sparkle"></i> 生成<br/>`kb(inlinechat.start)` | 在笔记本中启动内联聊天以生成代码块或 Markdown 块。 |
| `#` | 在聊天提示中附加 Jupyter 内核中的变量以获取更相关的响应。 |
| 原生 REPL + `kb(inlinechat.start)` | 在原生 Python REPL 中启动内联聊天并运行生成的命令。 |
| `kb(workbench.action.chat.open)` | 打开**聊天视图**并使用代理进行笔记本编辑。 |
| `/newNotebook` | 在聊天视图中使用 `/newNotebook` 命令根据您的要求生成新的 Jupyter 笔记本。使用自然语言描述笔记本应包含的内容。<br/>示例：`/newNotebook 获取人口普查数据并用 Seaborn 预览关键洞察`。 |

## 后续步骤

* [教程：VS Code 中 AI 功能入门](/docs/getstarted/getting-started.md)
