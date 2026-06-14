---
ContentId: 7b232695-cbbe-4f3f-a625-abc7a5e6496c
DateApproved: 6/10/2026
MetaDescription: Visual Studio Code 中 AI 功能和代理的配置设置概览。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# AI 设置参考

本文列出了 Visual Studio Code 中 AI 功能和代理的配置设置。有关在 VS Code 中使用设置的通用信息，请参阅[用户设置和工作区设置](/docs/configure/settings.md)。

团队持续致力于改进 VS Code 中的 AI 功能并添加新功能。部分功能仍处于实验阶段。欢迎试用并通过[我们的问题页面](https://github.com/microsoft/vscode/issues)分享反馈。详细了解 [VS Code 中的功能生命周期](/docs/configure/settings.md#feature-lifecycle)。

> [!TIP]
> 如果你还没有 Copilot 订阅，可以注册 [Copilot 免费计划](https://github.com/github-copilot/signup)免费使用 Copilot，每月可获得一定额度的行内建议和 AI 积分。

> [!IMPORTANT]
> **自 2026 年 4 月 20 日起**，Copilot Pro、Copilot Pro+、Max 和学生计划的新注册将暂时暂停。

## 通用设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(chat.commandCenter.enabled)`<br/>控制是否在 VS Code 标题栏中显示聊天菜单。 | `true` |
| `setting(workbench.settings.showAISearchToggle)`<br/>在设置编辑器中启用使用 AI 搜索设置。 | `true` |
| `setting(workbench.commandPalette.experimental.askChatLocation)` _(实验性)_<br/>控制命令面板应在何处询问聊天问题。 | `"chatView"` |
| `setting(search.searchView.semanticSearchBehavior)` _(预览)_<br/>配置何时在搜索视图中运行语义搜索：手动（默认）、未找到文本搜索结果时、或始终运行。 | `"manual"` |
| `setting(search.searchView.keywordSuggestions)` _(预览)_<br/>控制是否在搜索视图中显示关键词建议。 | `false` |
| `setting(chat.disableAIFeatures)`<br/>禁用并隐藏 VS Code 中的内置 AI 功能（如聊天和行内建议），并禁用 Copilot 扩展。 | `false` |

## 代码编辑设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(github.copilot.editor.enableCodeActions)`<br/>控制是否在可用的代码操作中显示 AI 命令。 | `true` |
| `setting(github.copilot.renameSuggestions.triggerAutomatically)`<br/>生成符号重命名建议。 | `true` |
| `setting(github.copilot.enable)`<br/>为指定的[语言](/docs/languages/identifiers.md)启用或禁用行内建议。 | `{ "*": true, "plaintext": false, "markdown": false, "scminput": false }` |
| `setting(github.copilot.nextEditSuggestions.enabled)`<br/>启用[下一编辑建议](/docs/editing/ai-powered-suggestions.md#next-edit-suggestions)（NES）。 | `true` |
| `setting(editor.inlineSuggest.edits.allowCodeShifting)`<br/>配置 NES 是否可以移动代码以显示建议。 | `"always"` |
| `setting(editor.inlineSuggest.edits.renderSideBySide)`<br/>配置 NES 在可能时是否并排显示较大的建议，或是否始终在相关代码下方显示较大的建议。 | `"auto"` |
| `setting(github.copilot.nextEditSuggestions.fixes)`<br/>启用基于诊断信息（波浪线）的下一编辑建议。例如，缺少的导入。 | `true` |
| `setting(editor.inlineSuggest.edits.showCollapsed)`<br/>仅在你按下 `kbstyle(Tab)` 导航到建议或将鼠标悬停在装订线箭头上时，才在编辑器中显示 NES 代码更改。 | `false` |
| `setting(editor.inlineSuggest.fontFamily)`<br/>配置行内补全的字体族。 | `"default"` |
| `setting(editor.inlineSuggest.showToolbar)`<br/>启用或禁用行内补全时显示的工具栏。 | `"onHover"` |
| `setting(editor.inlineSuggest.minShowDelay)`<br/>显示行内建议前等待的时间（毫秒）。 | `0` |

## 聊天设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(github.copilot.chat.localeOverride)`<br/>指定聊天响应的区域设置，例如 `en` 或 `fr`。 | `"auto"` |
| `setting(github.copilot.chat.useProjectTemplates)`<br/>使用 `/new` 时，将相关的 GitHub 项目用作入门项目。 | `true` |
| `setting(github.copilot.chat.scopeSelection)`<br/>如果使用 `/explain` 且活动编辑器中没有选中内容，是否提示指定符号范围。 | `false` |
| `setting(github.copilot.chat.terminalChatLocation)`<br/>控制来自终端的聊天查询应在何处打开。 | `"chatView"` |
| `setting(chat.detectParticipant.enabled)`<br/>在聊天视图中启用聊天参与者检测。 | `true` |
| `setting(chat.artifacts.enabled)` _(实验性)_<br/>启用或禁用在聊天中显示[产物面板](/docs/chat/chat-artifacts.md)（预览）。 | `false` |
| `setting(chat.artifacts.rules.byMimeType)` _(实验性)_<br/>按 MIME 类型模式从工具结果中提取产物的规则。将 MIME 类型模式（如 `"image/*"`）映射到分组配置。 | `{ "image/*": { "groupName": "Screenshots", "onlyShowGroup": true } }` |
| `setting(chat.artifacts.rules.byFilePath)` _(实验性)_<br/>按文件路径 glob 模式从写入文件中提取产物的规则。将 glob 模式（如 `"**/*plan*.md"`）映射到分组配置。 | `{ "**/*plan*.md": { "groupName": "Plans" } }` |
| `setting(chat.artifacts.rules.byMemoryFilePath)` _(实验性)_<br/>按记忆文件路径 glob 模式从记忆工具写入中提取产物的规则。将 glob 模式映射到分组配置。 | `{ "**/*plan*.md": { "groupName": "Plans" } }` |
| `setting(chat.checkpoints.enabled)` <br/>在聊天中启用或禁用[检查点](/docs/chat/chat-checkpoints.md)。 | `true` |
| `setting(chat.checkpoints.showFileChanges)` <br/>在每个聊天请求结束时显示文件更改摘要。 | `false` |
| `setting(chat.editRequests)`<br/>启用或禁用[编辑之前的聊天请求](/docs/chat/chat-checkpoints.md#edit-a-previous-chat-request)。 | `"inline"` |
| `setting(chat.editor.fontFamily)`<br/>聊天代码块中的字体族。 | `"default"` |
| `setting(chat.editor.fontSize)`<br/>聊天代码块中的字体大小（像素）。 | `14` |
| `setting(chat.editor.fontWeight)`<br/>聊天代码块中的字体粗细。 | `"default"` |
| `setting(chat.editor.lineHeight)`<br/>聊天代码块中的行高（像素）。 | `0` |
| `setting(chat.editor.wordWrap)`<br/>切换聊天代码块中的自动换行。 | `"off"` |
| `setting(chat.editing.confirmEditRequestRemoval)`<br/>在撤销编辑前要求确认。 | `true` |
| `setting(chat.editing.confirmEditRequestRetry)`<br/>在重做最后一次编辑前要求确认。 | `true` |
| `setting(chat.editing.autoAcceptDelay)`<br/>配置建议编辑自动接受的延迟时间，设置为零则禁用自动接受。 | `0` |
| `setting(chat.editing.revealNextChangeOnResolve)`<br/>控制在保留或撤销聊天编辑后，编辑器是否自动显示下一个更改。 | `true` |
| `setting(chat.fontFamily)`<br/>聊天中 Markdown 内容的字体族。 | `"default"` |
| `setting(chat.fontSize)`<br/>聊天中 Markdown 内容的字体大小（像素）。 | `13` |
| `setting(chat.notifyWindowOnConfirmation)`<br/>配置在聊天会话需要用户输入时何时显示操作系统通知：`off` 表示从不显示通知，`windowNotFocused`（默认）表示仅在 VS Code 窗口未聚焦时显示通知，`always` 表示始终显示通知。 | `"windowNotFocused"` |
| `setting(chat.notifyWindowOnResponseReceived)`<br/>配置在收到聊天响应时何时显示操作系统通知：`off` 表示从不显示通知，`windowNotFocused`（默认）表示仅在 VS Code 窗口未聚焦时显示通知，`always` 表示始终显示通知。 | `"windowNotFocused"` |
| `setting(chat.requestQueuing.defaultAction)`<br/>配置请求进行中时**发送**按钮的默认操作：`queue` 将消息添加到队列，`steer` 指示当前请求让出。 | `"queue"` |
| `setting(chat.tools.terminal.autoReplyToPrompts)` <br/>使用默认答案自动回复终端提示。 | `false` |
| `setting(chat.tools.terminal.terminalProfile.<platform>)`<br/>配置在每个平台上用于聊天终端命令的终端配置文件。 | `""` |
| `setting(chat.hookFilesLocations)` _(预览)_ <br/>配置额外的[钩子文件位置](/docs/agent-customization/hooks.md#hook-file-locations)。指定文件夹路径（加载所有 `*.json` 文件）或 `.json` 文件的直接路径。仅支持相对路径和波浪号路径。 | `{}` |
| `setting(chat.useCustomAgentHooks)` _(预览)_ <br/>启用在自定义代理 frontmatter 中定义的[代理作用域钩子](/docs/agent-customization/hooks.md#agentscoped-hooks)。启用后，`.agent.md` 文件中的钩子仅在该代理激活时运行。 | `false` |
| `setting(chat.useAgentsMdFile)` <br/>启用或禁用使用 `AGENTS.md` 文件作为聊天请求的上下文。 | `true` |
| `setting(chat.math.enabled)` <br/>启用或禁用在聊天中使用 [KaTeX](https://katex.org) 渲染数学公式。 | `false` |
| `setting(chat.viewTitle.enabled)` _(预览)_<br/>在聊天标题中显示当前聊天会话的标题。 | `true` |
| `setting(github.copilot.chat.codesearch.enabled)` _(预览)_<br/>在提示词中使用 `#codebase` 时，代理会自动发现需要编辑的相关文件。 | `false` |
| `setting(chat.emptyState.history.enabled)` _(实验性)_<br/>在聊天视图的空状态中显示最近的聊天历史记录。 | `false` |
| `setting(imageCarousel.chat.enabled)` _(实验性)_<br/>启用图片轮播以便浏览聊天响应中的图片。在工具结果或助手消息中选择图片标签可打开轮播视图。 | `false` |
| `setting(chat.sendElementsToChat.enabled)` _(实验性)_<br/>启用以将[集成浏览器](/docs/debugtest/integrated-browser.md)中的元素发送到聊天视图作为上下文。 | `true` |
| `setting(chat.sendElementsToChat.attachCSS)` _(实验性)_<br/>在将集成浏览器中的元素添加到聊天上下文时包含 CSS 样式。 | `true` |
| `setting(chat.sendElementsToChat.attachImages)` _(实验性)_<br/>在将集成浏览器中的元素添加到聊天上下文时包含图片。 | `true` |
| `setting(workbench.browser.enableChatTools)` _(实验性)_<br/>启用允许代理与集成浏览器中的页面交互的[浏览器工具](/docs/debugtest/integrated-browser.md#browser-tools-for-agents)。 | `true` |
| `setting(chat.useClaudeMdFile)`<br/>启用或禁用使用 `CLAUDE.md` 文件作为始终开启的自定义指令。 | `true` |
| `setting(chat.useNestedAgentsMdFiles)` _(实验性)_<br/>启用或禁用在聊天请求中使用工作区子文件夹中的 `AGENTS.md` 文件作为上下文。 | `false` |
| `setting(github.copilot.chat.customOAIModels)` _(已弃用)_<br/>为聊天配置自定义 OpenAI 兼容模型。已弃用，推荐使用[自定义端点](/docs/agent-customization/language-models.md#add-a-custom-endpoint-model)提供程序，该提供程序支持 Chat Completions、Responses 和 Messages API。 | `[]` |
| `setting(chat.utilityModel)`<br/>覆盖用于内置[实用工具流程](/docs/agent-customization/language-models.md#change-the-model-for-utility-tasks)的语言模型，例如生成标题、摘要和回退响应。 | `"Default"` |
| `setting(chat.utilitySmallModel)`<br/>覆盖用于快速、轻量级[实用工具流程](/docs/agent-customization/language-models.md#change-the-model-for-utility-tasks)的语言模型，例如提交消息、重命名建议和意图检测。建议使用快速、经济的模型。 | `"Default"` |
| `setting(github.copilot.chat.edits.suggestRelatedFilesFromGitHistory)` _(实验性)_<br/>在聊天上下文中根据 git 历史记录建议相关文件。 | `true` |
| `setting(github.copilot.chat.localIndex.enabled)`<br/>启用用于[会话洞察](/docs/agents/sessions/session-insights.md)和 `/chronicle` 命令的本地会话跟踪。 | `true` |
| `setting(chat.sessionSync.enabled)`<br/>启用[会话同步](/docs/agents/sessions/session-sync.md)到 GitHub.com。启用后，Copilot 会话数据将同步到你的 GitHub 账户以便跨设备访问。需要同时启用 `setting(github.copilot.chat.localIndex.enabled)`。 | `true` |
| `setting(chat.sessionSync.excludeRepositories)`<br/>要从[会话同步](/docs/agents/sessions/session-sync.md)中排除的仓库模式。使用精确的 `owner/repo` 名称或 glob 模式（如 `my-org/*`）。匹配仓库的会话仅存储在本地。 | `[]` |

## 代理设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(chat.agent.enabled:true)`<br/>启用或禁用使用代理（需要 VS Code 1.99 或更高版本）。 | `true` |
| `setting(chat.agent.maxRequests)`<br/>代理可以发出的最大请求数。 | `25` |
| `setting(github.copilot.chat.agent.autoFix)`<br/>自动诊断并修复生成的代码更改中的问题。 | `true` |
| `setting(chat.mcp.access)`<br/>管理可以在 VS Code 中使用哪些模型上下文协议（MCP）服务器。 | `true` |
| `setting(chat.mcp.discovery.enabled)`<br/>配置从其他应用程序自动发现 MCP 服务器配置。 | `false` |
| `setting(chat.mcp.serverSampling)`<br/>配置将哪些模型暴露给 MCP 服务器进行采样。 | `{}` |
| `setting(chat.mcp.apps.enabled)` _(实验性)_<br/>启用或禁用 MCP 应用，这些是由 MCP 服务器提供的丰富用户界面。 | `true` |
| `setting(chat.tools.compressOutput.enabled)` _(预览)_<br/>在发送到模型之前压缩大型终端输出以减少上下文窗口用量。折叠未更改的差异块，丢弃锁定文件差异，并去除安装进度。 | `false` |
| `setting(chat.tools.riskAssessment.enabled)` _(实验性)_<br/>在终端命令确认上显示 AI 生成的风险徽章，指示命令是安全的、需要谨慎还是应仔细检查。 | `true` |
| `setting(chat.tools.terminal.autoApprove)` <br/>控制哪些终端命令在[使用代理时自动批准](/docs/agents/approvals.md#automatically-approve-terminal-commands)。命令可以设置为 `true`（自动批准）或 `false`（需要批准）。可以通过用 `/` 字符包裹模式来使用正则表达式。 | `{ "rm": false, "rmdir": false, "del": false, "kill": false, "curl": false, "wget": false, "eval": false, "chmod": false, "chown": false, "/^Remove-Item\\b/i": false }` |
| `setting(chat.tools.terminal.enableAutoApprove)` <br/>启用或禁用终端命令的自动批准。 | `true` |
| `setting(chat.tools.edits.autoApprove)` <br/>配置哪些文件在应用编辑前需要批准。使用 glob 模式匹配工作区中的文件路径。 | `{}` |
| `setting(chat.tools.terminal.outputLocation)` _(实验性)_<br/>配置终端命令输出的显示位置：内联在聊天中或集成终端中。 | `"chat"` |
| `setting(chat.tools.terminal.enforceTimeoutFromModel)` _(实验性)_<br/>控制是否强制执行代理为终端命令指定的超时值。启用后，代理在指定时长后停止跟踪命令，并返回目前已收集的输出。 | `true` |
| `setting(chat.tools.terminal.ignoreDefaultAutoApproveRules)` <br/>忽略终端命令的默认自动批准规则。 | `false` |
| `setting(chat.tools.global.autoApprove)`<br/>自动批准所有工具——此设置会[禁用关键安全保护](/docs/agents/security.md)。 | `false` |
| `setting(chat.permissions.default)` _(实验性)_<br/>为新的聊天会话设置默认[权限级别](/docs/agents/approvals.md#permission-levels)。选项：`default`（默认批准）、`autoApprove`（绕过批准）、`autopilot`（自动驾驶）。你仍可针对每个会话更改权限级别。如果企业策略禁用了自动批准，新会话将使用默认批准。 | `"default"` |
| `setting(chat.autopilot.advanced.enabled)` _(实验性)_<br/>启用[高级自动驾驶](/docs/agents/approvals.md#advanced-autopilot)，在每次自动驾驶轮次后由单独的模型评估你的请求是否完成并指导下一轮，而非依赖代理发出完成信号。 | `false` |
| `setting(chat.tools.urls.autoApprove)` <br/>控制哪些 [URL 请求和响应自动批准](/docs/agents/approvals.md#url-approval)。 | `[]` |
| `setting(chat.agent.thinking.collapsedTools)` _(实验性)_<br/>配置聊天对话中工具调用详情是默认折叠还是展开。 | `always` |
| `setting(chat.agent.thinkingStyle)` _(实验性)_<br/>配置思考令牌在聊天中的呈现方式。 | `fixedScrolling` |
| `setting(chat.mcp.autoStart)` _(实验性)_<br/>在检测到 MCP 配置更改时自动启动 MCP 服务器。 | `newAndOutdated` |
| `setting(chat.tools.eligibleForAutoApproval)` _(实验性)_<br/>配置哪些工具在被代理使用之前需要手动批准。 | `[]` |
| `setting(chat.tools.terminal.blockDetectedFileWrites)` _(实验性)_<br/>要求对在工作区之外执行文件写入的终端命令进行用户批准。当会话级命令批准处于活动状态时，写入操作系统临时文件夹（macOS 和 Linux 上的 `/tmp`，Windows 上的 `%TEMP%`）的操作除外。 | `outsideWorkspace` |
| `setting(chat.agent.sandbox.enabled)` _(预览)_<br/>启用代理执行的命令的[沙盒机制](/docs/agents/approvals.md#sandbox-agent-commands)（仅限 macOS 和 Linux）。可选值：`off`（禁用）、`on`（完全文件系统和网络隔离）、`allowNetwork`（仅文件系统隔离，允许所有出站网络流量）。启用后，命令将自动批准且具有受限访问权限。 | `off` |
| `setting(chat.agent.sandbox.FileSystem.linux)` _(预览)_<br/>配置 Linux 上沙盒代理命令的文件系统访问规则。支持 `allowRead`、`allowWrite`、`denyRead` 和 `denyWrite` 属性。 | `{}` |
| `setting(chat.agent.sandbox.FileSystem.mac)` _(预览)_<br/>配置 macOS 上沙盒代理命令的文件系统访问规则。支持 `allowRead`、`allowWrite`、`denyRead` 和 `denyWrite` 属性。 | `{}` |
| `setting(chat.agent.networkFilter)`<br/>启用代理工具（抓取工具、集成浏览器）的网络域过滤。启用后，网络访问将根据 `setting(chat.agent.allowedNetworkDomains)` 和 `setting(chat.agent.deniedNetworkDomains)` 进行限制。禁用时，不应用任何过滤。 | `false` |
| `setting(chat.agent.allowedNetworkDomains)`<br/>配置代理工具网络访问的允许域。仅在 `setting(chat.agent.networkFilter)` 启用时生效。当同时也启用了沙盒机制时，这些规则还适用于终端命令。当允许列表和拒绝列表均为空时，所有域均被阻止。支持通配符，如 `*.example.com`。 | `[]` |
| `setting(chat.agent.deniedNetworkDomains)`<br/>配置代理工具网络访问的拒绝域。仅在 `setting(chat.agent.networkFilter)` 启用时生效。拒绝域优先于允许域。支持通配符，如 `*.example.com`。 | `[]` |
| `setting(github.copilot.chat.newWorkspaceCreation.enabled)` _(实验性)_<br/>启用在聊天中搭建新工作区的工具。 | `true` |
| `setting(chat.planWidget.inlineEditor.enabled)` <br/>在计划控件中使用内联编辑器编辑计划，而不是打开单独的编辑器标签页。 | `true` |
| `setting(chat.planAgent.defaultModel)` <br/>为计划代理选择默认语言模型。 | `"Auto (Vendor Default)"`|
| `setting(github.copilot.chat.implementAgent.model)` _(实验性)_<br/>选择用于计划后实现步骤的语言模型。 | `` |
| `setting(github.copilot.chat.planAgent.additionalTools)` _(实验性)_<br/>在研究和规划阶段为计划代理提供额外工具的访问权限。 | `[]` |
| `setting(github.copilot.chat.additionalReadAccessFolders)`<br/>为内置代理工具授予对当前工作区之外的额外文件夹的只读访问权限。 | `[]` |
| `setting(github.copilot.chat.claudeAgent.enabled)` <br/>启用或禁用对由 Anthropic 的 Claude Agent SDK 驱动的 Claude 代理会话的支持。 | `true` |
| `setting(github.copilot.chat.claudeAgent.allowDangerouslySkipPermissions)` <br/>绕过 Claude 代理的所有权限检查。仅在隔离的沙盒环境中启用此设置。 | `false` |
| `setting(github.copilot.chat.agent.thinkingTool:true)` _(实验性)_<br/>在使用代理时启用思考工具。 | `false` |
| `setting(github.copilot.chat.summarizeAgentConversationHistory.enabled)` _(实验性)_<br/>当上下文窗口已满时自动总结代理对话历史记录。 | `true` |
| `setting(github.copilot.chat.virtualTools.threshold)` _(实验性)_<br/>应使用虚拟工具的工具数量阈值。虚拟工具将类似的工具组合在一起，使模型能够按需激活它们。使你能够超越每次聊天请求 128 个工具的限制。 | `128` |

## 代理会话

[代理视图](/docs/agents/overview.md)提供了一个集中位置，用于管理本地聊天对话和远程编码代理会话。此视图使你能够同时处理多个 AI 会话、跟踪其进度并高效管理长时间运行的任务。

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(workbench.startupEditor)` <br/>配置 VS Code 欢迎页面作为代理会话入口点。设置为 `agentSessionsWelcomePage` 以显示带有最近会话、嵌入式聊天和快速操作的 [VS Code 欢迎页面](/docs/chat/chat-sessions.md#vs-code-welcome-page)。 | 不适用 |
| `setting(chat.viewSessions.enabled)` <br/>在聊天视图中显示代理会话列表。 | `true` |
| `setting(chat.viewSessions.orientation)` <br/>控制聊天视图中会话列表的布局方向。 | `"sideBySide"` |
| `setting(chat.editMode.hidden)` <br/>恢复已弃用的编辑模式，用于多文件代码编辑。 | `true` |
| `setting(chat.agentsControl.enabled)` _(实验性)_<br/>在命令中心启用[会话状态指示器](/docs/chat/chat-sessions.md#session-status-indicator-experimental)。显示未读和进行中的会话徽章。 | `true` |
| `setting(chat.agentsControl.clickBehavior)` _(实验性)_<br/>配置在代理状态指示器中选择聊天图标时的行为。 | `"cycle"`（Insiders）<br/>`"default"`（稳定版） |
| `setting(chat.unifiedAgentsBar.enabled)` _(实验性)_<br/>将命令中心搜索框替换为统一的聊天和搜索控件。 | `false` |
| `setting(github.copilot.chat.cli.remote.enabled)` <br/>启用从 github.com 或 GitHub Mobile 应用对 Copilot CLI 会话的远程控制支持。 | `true` |

## 行内聊天设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(inlineChat.defaultModel)`<br/>为编辑器行内聊天配置默认语言模型。你选择的模型在会话期间保持不变，但在 VS Code 重新加载后重置为此配置的默认值。 | 不适用 |
| `setting(inlineChat.askInChat)`<br/>当文件属于活动聊天编辑会话时，按下 `kb(inlineChat.start)` 后使用聊天视图中的"在聊天中询问"而非打开常规行内聊天。禁用时，始终打开常规行内聊天。 | `true` |
| `setting(inlineChat.renderMode)` _(实验性)_<br/>配置行内聊天的显示方式。`hover`：在浮动叠加层中显示行内聊天，`zone`：在编辑器的专用区域中显示行内聊天。 | `"hover"` |
| `setting(inlineChat.finishOnType)`<br/>在更改区域之外输入时结束编辑器行内聊天会话。 | `false` |
| `setting(inlineChat.holdToSpeech)`<br/>按住编辑器行内聊天键盘快捷键（`kb(inlineChat.start)`）可自动启用语音识别。 | `true` |
| `setting(editor.inlineSuggest.syntaxHighlightingEnabled)`<br/>为行内建议显示语法高亮。 | `true` |
| `setting(inlineChat.affordance)` _(实验性)_<br/>当你选中文本时显示视觉提示以帮助启动行内聊天。`off`：无提示，`gutter`：在行号区域中显示，`editor`：在光标位置显示灯泡图标。 | `"off"` |
| `setting(inlineChat.lineEmptyHint)` _(实验性)_<br/>在空行上显示编辑器行内聊天的提示。 | `false` |
| `setting(inlineChat.lineNaturalLanguageHint)` _(实验性)_<br/>当一行主要由单词组成时，立即触发编辑器行内聊天。 | `true` |
| `setting(github.copilot.chat.editor.temporalContext.enabled)` _(实验性)_<br/>在编辑器行内聊天的上下文中包含最近查看和编辑过的文件。 | `false` |

## 代码审查设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(github.copilot.chat.reviewSelection.enabled)` _(预览)_<br/>为编辑器文本选中内容启用 AI 代码审查。 | `true` |
| `setting(github.copilot.chat.reviewSelection.instructions)` _(预览)_<br/>添加到使用 AI 审查当前编辑器选中内容的请求中的自定义指令。 | `[]` |

## 源代码管理设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(git.addAICoAuthor)`<br/>为 AI 生成的更改在提交消息后附加 `Co-authored-by:` Git 尾行。选项：`off`（不添加尾行）、`chatAndAgent`（为 Copilot Chat 或代理模式更改添加尾行）、`all`（为所有 AI 生成的代码（包括行内补全）添加尾行）。请参阅 [AI 联合作者署名](/docs/sourcecontrol/staging-commits.md#ai-co-author-attribution)。 | `"chatAndAgent"` |

## 自定义指令设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(chat.instructionsFilesLocations)` <br/>搜索自定义指令文件的位置。将递归搜索每个文件夹，包括子目录。相对路径相对于工作区的根文件夹解析。支持文件路径的 glob 模式。 | `{ ".github/instructions": true, "~/.claude/rules": false" }` |
| `setting(chat.includeApplyingInstructions)`<br/>自动将具有匹配 `applyTo` 模式的指令文件添加到聊天请求中。 | `true` |
| `setting(chat.includeReferencedInstructions)`<br/>自动将通过 Markdown 链接引用的指令文件添加到聊天请求中。 | `false` |
| `setting(github.copilot.chat.codeGeneration.useInstructionFiles)`<br/>自动将 `.github/copilot-instructions.md` 中的自定义指令添加到聊天请求中。 | `true` |
| `setting(github.copilot.chat.commitMessageGeneration.instructions)` _(实验性)_<br/>用于使用 AI 生成提交消息的自定义指令。 | `[]` |
| `setting(github.copilot.chat.pullRequestDescriptionGeneration.instructions)` _(实验性)_<br/>用于使用 AI 生成拉取请求标题和描述的自定义指令。 | `[]` |
| `setting(github.copilot.chat.organizationInstructions.enabled)`<br/>启用发现在 GitHub 组织级别定义的自定义指令。 | `true` |
| `setting(chat.useCustomizationsInParentRepositories)`<br/>启用发现在[父仓库文件夹](/docs/agent-customization/overview.md#use-customizations-in-a-monorepo)中的代理自定义（指令、提示词、代理、技能、钩子）。适用于你打开子文件夹而非仓库根目录的单仓库设置。 | `false` |

## 可复用提示词文件设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(chat.promptFilesLocations)` <br/>搜索提示词文件的位置。相对路径相对于工作区的根文件夹解析。支持文件路径的 glob 模式。 | `{ ".github/prompts": true }` |
| `setting(chat.promptFilesRecommendations)` <br/>启用或禁用在打开新聊天会话时的提示词文件推荐。由提示词文件名与布尔值或 when 子句组成的键值对列表。 | `[]` |

## 自定义代理设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(chat.agentFilesLocations)` <br/>搜索自定义代理文件的位置。相对路径相对于工作区的根文件夹解析。支持用户特定路径的主目录展开（`~`）。 | `{ ".github/agents": true }` |
| `setting(github.copilot.chat.cli.customAgents.enabled)` <br/>启用在 GitHub 后台代理会话中使用自定义代理。 | `false` |
| `setting(github.copilot.chat.organizationCustomAgents.enabled)` <br/>启用发现在 GitHub 组织级别定义的自定义代理。 | `true` |

## 代理技能设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(chat.useAgentSkills)` <br/>在 VS Code 中启用对[代理技能](/docs/agent-customization/agent-skills.md)的支持。 | `true` |
| `setting(chat.agentSkillsLocations)` <br/>搜索代理技能的位置。相对路径相对于工作区的根文件夹解析。支持用户特定路径的主目录展开（`~`）。 | `"chat.agentSkillsLocations": { ".github/skills": true,".claude/skills": true,"~/.copilot/skills": true,"~/.claude/skills": true}` |
| `setting(github.copilot.chat.skillTool.enabled)` _(实验性)_<br/>启用用于调用[代理技能](/docs/agent-customization/agent-skills.md)的专用技能工具。需要使用 [`context: fork`](/docs/agent-customization/agent-skills.md#run-a-skill-in-a-forked-context-experimental) 在单独的子代理上下文中运行技能。 | `false` |

## 可观测性设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(github.copilot.chat.otel.enabled)` <br/>启用 Copilot Chat 代理交互的 [OpenTelemetry](/docs/agents/guides/monitoring-agents.md) 发射。 | `false` |
| `setting(github.copilot.chat.otel.exporterType)` <br/>OTel 导出器类型：`otlp-http`、`otlp-grpc`、`console` 或 `file`。 | `"otlp-http"` |
| `setting(github.copilot.chat.otel.otlpEndpoint)` <br/>OTLP 收集器端点 URL。 | `"http://localhost:4318"` |
| `setting(github.copilot.chat.otel.outfile)` <br/>使用 `file` 导出器类型时的 JSON-lines 输出文件路径。 | `""` |
| `setting(github.copilot.chat.otel.captureContent)` <br/>在 OTel 跨度中捕获完整的提示词和响应内容。可能包含敏感信息。 | `false` |

## 代理插件设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(chat.plugins.enabled)` _(预览)_<br/>启用或禁用对[代理插件](/docs/agent-customization/agent-plugins.md)的支持。 | `false` |
| `setting(chat.plugins.marketplaces)` _(实验性)_<br/>配置用于发现代理插件的其他插件市场 Git 仓库。 | `["github/copilot-plugins", "github/awesome-copilot"]` |
| `setting(chat.plugins.enabledPlugins)` _(实验性)_<br/>要启用或禁用的插件 ID 允许列表。可以通过[企业策略集中管理](/docs/enterprise/ai-settings.md#manage-agent-plugins-and-marketplaces)。 | `{}` |
| `setting(chat.plugins.strictMarketplaces)` _(实验性)_<br/>仅信任由[企业策略](/docs/enterprise/ai-settings.md#manage-agent-plugins-and-marketplaces)提供的市场。 | `false` |
| `setting(chat.pluginLocations)` _(实验性)_<br/>通过将目录路径映射到启用或禁用状态来注册本地克隆或下载的代理插件。 | `{}` |

## 调试设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(github.copilot.chat.agentDebugLog.enabled)`<br/>启用[代理调试日志](/docs/agents/agent-troubleshooting/chat-debug-view.md)和用于检查聊天会话的 [`/troubleshoot`](/docs/agents/agent-troubleshooting/chat-debug-view.md#attach-debug-events-to-chat) 斜杠命令。 | `false` |
| `setting(github.copilot.chat.agentDebugLog.fileLogging.enabled)`<br/>启用代理调试日志的文件日志记录，将调试事件写入磁盘上的文件。 | `false` |
| `setting(github.copilot.chat.startDebugging.enabled)` _(预览)_<br/>在聊天视图中启用实验性的 `/startDebugging` 意图以生成调试配置。 | `true` |
| `setting(github.copilot.chat.copilotDebugCommand.enabled)` _(预览)_<br/>启用 `copilot-debug` 终端命令。 | `true` |

## 测试设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(github.copilot.chat.generateTests.codeLens)` _(实验性)_<br/>为未被当前测试覆盖率信息覆盖的符号显示**生成测试** Code Lens。 | `false` |
| `setting(github.copilot.chat.setupTests.enabled)` _(实验性)_<br/>启用实验性的 `/setupTests` 意图和 `/tests` 生成中的提示。 | `true` |

## Notebook 设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(notebook.experimental.generate)` _(实验性)_<br/>启用**生成**操作以使用 Notebook 行内聊天创建代码单元格。 | `true` |
| `setting(github.copilot.chat.edits.newNotebook.enabled)` _(实验性)_<br/>在编辑模式（已弃用）中启用创建新 notebook 文件的 notebook 工具。 | `true` |
| `setting(github.copilot.chat.notebook.followCellExecution.enabled)` _(实验性)_<br/>在编辑器中显示当前正在执行的单元格。 | `false` |

## 无障碍设置

| 设置与说明 | 默认值 |
|------------------------|---------------|
| `setting(inlineChat.accessibleDiffView)`<br/>行内聊天是否也为其更改呈现无障碍差异查看器。 | `"auto"` |
| `setting(accessibility.signals.chatRequestSent)`<br/>当做出聊天请求时，播放信号——声音（音频提示）和/或播报（提示）。 | `{ "sound": "auto", "announcement": "auto" }` |
| `setting(accessibility.signals.chatResponseReceived)`<br/>收到响应时播放声音/音频提示。 | `{ "sound": "auto" }` |
| `setting(accessibility.signals.chatEditModifiedFile)`<br/>文件被聊天编辑修改时播放声音/音频提示。 | `{ "sound": "auto" }` |
| `setting(accessibility.signals.chatUserActionRequired)`<br/>用户需要在聊天中执行操作时播放声音/音频提示。 | `{ "sound": "auto", "announcement": "auto" }` |
| `setting(accessibility.signals.lineHasInlineSuggestion)`<br/>当光标位于有行内建议的行上时播放声音/音频提示。 | `{ "sound": "auto" }` |
| `setting(accessibility.signals.nextEditSuggestion)`<br/>当下一个编辑建议可用时播放声音/音频提示。 | `{ "sound": "auto", "announcement": "auto" }` |
| `setting(accessibility.verboseChatProgressUpdates)`<br/>提供有关聊天活动的详细更新。 | `true` |
| `setting(accessibility.verbosity.inlineChat)`<br/>提供有关如何访问行内编辑器聊天无障碍帮助菜单的信息，并在输入获得焦点时通过提示说明如何使用该功能。 | `true` |
| `setting(accessibility.verbosity.inlineCompletions)`<br/>提供有关如何访问行内建议悬停提示和无障碍视图的信息。 | `true` |
| `setting(accessibility.verbosity.panelChat)`<br/>在聊天输入获得焦点时，提供有关如何访问聊天帮助菜单的信息。 | `true` |
| `setting(accessibility.voice.keywordActivation)`<br/>控制是否识别关键词短语 'Hey Code' 以启动语音聊天会话。 | `"off"` |
| `setting(accessibility.voice.autoSynthesize)`<br/>控制当使用语音作为输入时，文本响应是否应自动朗读出来。 | `"off"` |
| `setting(accessibility.voice.speechTimeout)`<br/>停止说话后语音识别保持活动的持续时间（毫秒）。 | `1200` |

## 相关资源

* [快速概览 VS Code 中的 AI 功能](/docs/agents/reference/ai-features-cheat-sheet.md)
