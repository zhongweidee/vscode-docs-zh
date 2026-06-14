---
ContentId: 557a7e74-f77e-488d-90ea-fd2cfecfffda
DateApproved: 6/10/2026
MetaDescription: 了解如何在 VS Code 中使用聊天功能。访问不同的聊天界面、发送请求、添加上下文、编写有效的提示词以及审查 AI 生成的更改。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# 在 VS Code 中使用聊天

Visual Studio Code 中的聊天功能让你可以使用自然语言与 AI 代理进行交互。通过对话式界面，你可以询问代码相关问题、获取理解复杂逻辑的帮助、生成新功能、修复错误等。

本文介绍与聊天交互的机制：如何发送请求、添加上下文、选择语言模型、编写有效的提示词以及审查 AI 生成的更改。这些机制适用于 VS Code 中的所有聊天界面。有关代理的功能以及如何配置会话的概述，请参阅[在 VS Code 中使用代理构建](/docs/agents/overview.md)。

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="开始使用代理">
跟随实践教程体验 VS Code 中的本地、后台和云端代理。

* [开始教程](/docs/agents/agents-tutorial.md)

</div>

## VS Code 中的聊天方式

VS Code 提供了两种主要的代理交互界面，以及用于快速交互的轻量级选项。你可以选择最适合当前任务和工作流的体验，并根据需要在它们之间切换。

| 名称 | 描述 | 如何打开 |
|------|-------------|-------------|
| [代理窗口](/docs/agents/agents-window.md) | 一个专用的、以代理为先的窗口，用于跨多个项目编排任务。专注于高级任务和结果。 | <ul><li>在 VS Code 标题栏中选择**在代理中打开**</li><li>使用**聊天: 打开代理窗口**命令</li><li>运行 `code --agents`</li></ul> |
| [聊天视图](/docs/agents/chat-view.md) | 一种以代码为先的体验，运行在编辑器侧边栏中，用于协助你在工作区中完成编码任务。 | <ul><li>选择 VS Code 标题栏中的聊天图标</li><li>使用**聊天: 打开聊天**命令</li><li>按 `kb(workbench.action.chat.open)`</li></ul> |
| [内联聊天](/docs/chat/inline-chat.md) | 快速的原处代码编辑或终端建议。 | <ul><li>按 `kb(inlineChat.start)`</li></ul> |
| [快速聊天](/docs/chat/inline-chat.md#use-quick-chat) | 一个位于编辑器顶部的轻量级聊天面板。 | <ul><li>按 `kb(workbench.action.quickchat.toggle)`</li></ul> |

## 发送聊天请求

在聊天输入框中键入你的消息，然后按 `kbstyle(Enter)` 或选择**发送**按钮。代理会分析你的代码，进行更改，并回复摘要。然后你可以通过后续消息继续对话。例如，你可以从以下请求开始：

```prompt
Add input validation to the signup form
```

要提供额外的项目特定上下文，你可以通过 `#`-提及引用文件、符号或其他信息来[向提示词添加上下文](#向提示词添加上下文)。

对于常见任务，你可以使用斜杠命令作为常用提示词的快捷方式，或调用[代理技能](/docs/agent-customization/agent-skills.md)。在聊天输入中键入 `/` 即可查看所有可用命令。

你可以并行运行多个会话，同时处理不同的任务。当你开始一个新会话时，上一个会话在后台保持活跃状态，你可以随时切换回去而不会丢失上下文。了解更多信息，请参阅[管理聊天会话](/docs/chat/chat-sessions.md)。

每个会话都有配置选项来影响代理的响应方式，例如代理类型、代理、权限级别和语言模型。了解如何[配置你的代理会话](/docs/agents/overview.md)。

> [!TIP]
> 要获得最佳结果，请明确说明你想要什么，提供相关上下文，并编写清晰的指令。更多信息请参阅[获得更好的回复](#获得更好的回复)。

## 在请求运行期间发送消息

你不必等待响应完成后才能发送下一条消息。当请求正在进行时，**发送**按钮会变成一个下拉菜单，为你提供三种处理新消息的方式。

![发送按钮下拉菜单的屏幕截图，显示排队、引导或停止并发送新消息的选项。](images/chat-sessions/send-dropdown.png)

* **添加到队列**：你的消息会等待，并在当前响应完成后自动发送。当前响应会不间断地完成。
* **引导消息**：通知当前请求在完成当前工具执行后让出控制权。当前响应会停止，你的新消息会立即处理。当代理朝着错误方向前进时，使用此选项来重定向代理。
* **停止并发送**：完全取消当前请求，并立即发送你的新消息。

**发送**按钮的默认操作是可配置的。使用 `setting(chat.requestQueuing.defaultAction)` 将其设置为 `steer`（默认）或 `queue`。

### 重新排序待处理消息

当你有多条待处理消息（已排队或引导中）时，你可以拖放它们来更改处理顺序。当有多条相同类型的消息待处理时，悬停时会出现拖动手柄。

![聊天输入框中待处理消息的屏幕截图，带有用于重新排序的拖动手柄。](images/chat-sessions/pending-messages.png)

## 向提示词添加上下文

提供正确的上下文有助于 AI 生成更相关、更准确的回复。

* **隐式上下文**：VS Code 会自动将活动文件、当前选择以及文件名作为上下文。当你使用代理时，代理会自主决定是否需要额外的上下文。

* **`#`-提及**：在聊天输入中键入 `#` 以显式引用文件（`#file`）、文件夹、符号、代码库（`#codebase`）、终端输出（`#terminalSelection`）或工具如 `#fetch`。

* **视觉**：附加图像，例如屏幕截图或 UI 模型，作为提示词的上下文。

* **浏览器元素**（实验性）：从[集成浏览器](/docs/debugtest/integrated-browser.md)中选择元素，将 HTML、CSS 和屏幕截图上下文添加到你的提示词中。

了解更多关于[为 AI 管理上下文](/docs/chat/copilot-chat-context.md)的信息。

## 图像轮播（实验性）

当启用 `setting(imageCarousel.chat.enabled)` 时，你可以在聊天回复中选择图像或视频，打开一个专用的轮播视图。来自工具结果（例如集成浏览器、Playwright 或其他 MCP 服务器）以及助手消息中内联的媒体文件都可以从轮播中访问。

![显示图像轮播视图的屏幕截图，其中包含多张图像。](images/chat-sessions/image-carousel.png)

## 审查和管理更改

AI 对你的文件进行更改后，请审查并接受或放弃它们。

* **审查内联差异**：打开已更改的文件以查看已应用更改的内联差异。使用编辑器覆盖控件在编辑之间导航，并**保留**或**撤销**单个更改。更多信息请参阅[审查 AI 生成的代码编辑](/docs/chat/review-code-edits.md)。

* **使用检查点**：VS Code 可以在聊天交互的关键节点自动创建文件的快照，使你能够回滚到之前的状态。更多信息请参阅[检查点和编辑请求](/docs/chat/chat-checkpoints.md)。

* **暂存以接受**：在源代码管理视图中暂存更改会自动接受任何待处理的编辑。放弃更改也会放弃待处理的编辑。

![显示编辑器的屏幕截图，其中包含建议的更改，突出显示编辑器覆盖控件中的审查控件。](images/review-code-edits/copilot-edits-file-review-controls.png)

## 获取聊天响应通知

当你在其他窗口或应用程序中工作时，VS Code 可以向你发送操作系统通知，让你了解重要的聊天事件，这样你就不必频繁切换回来查看。

使用 `setting(chat.notifyWindowOnResponseReceived)` 配置在收到聊天响应时何时接收操作系统通知。通知包含响应的预览，选择它可以将焦点带到聊天会话。

使用 `setting(chat.notifyWindowOnConfirmation)` 配置在代理需要你的输入或确认才能继续时何时接收操作系统通知。

这两个设置都有三个可能的值：

* `off`：从不显示通知
* `windowNotFocused`（默认）：仅在 VS Code 窗口未获得焦点时显示通知
* `always`：即使 VS Code 窗口处于焦点状态也显示通知

> [!TIP]
> 如果你希望在使用 VS Code 其他部分时保持对聊天活动的感知，例如在后台运行长时间的代理任务时，将值设为 `always`。

## 在聊天会话中浏览提示词

使用以下键盘快捷键在聊天会话中的提示词之间导航：

* `kb(workbench.action.chat.previousUserPrompt)`：转到聊天会话中的上一个提示词。
* `kb(workbench.action.chat.nextUserPrompt)`：转到聊天会话中的下一个提示词。
* `kb(workbench.action.chat.previousCodeBlock)`：转到聊天会话中的上一个代码块。
* `kb(workbench.action.chat.nextCodeBlock)`：转到聊天会话中的下一个代码块。

## 获得更好的回复

聊天提供多种方法来提高 AI 回复的质量和相关性：

* **编写有效的提示词**：明确说明你想要什么，引用相关文件和符号，对常见任务使用 `/` 命令。从[提示词示例](/docs/agents/guides/prompt-examples.md)中获得灵感，或查阅完整的[提示词工程指南](/docs/agents/best-practices.md)。

* **自定义 AI**：通过添加[自定义指令](/docs/agent-customization/custom-instructions.md)、创建可重用的[提示词文件](/docs/agent-customization/prompt-files.md)或为专业工作流构建[自定义代理](/docs/agent-customization/custom-agents.md)，为你的项目定制 AI 的行为。例如，创建一个"代码审查员"代理，提供关于代码质量以及是否符合团队编码标准的反馈。

* **使用工具扩展**：连接 [MCP 服务器](/docs/agent-customization/mcp-servers.md)或安装提供工具的扩展，使代理能够访问外部服务、数据库或 API。

更多信息请参阅[在 VS Code 中自定义 AI](/docs/agent-customization/overview.md)。

## 排查聊天交互问题

使用[代理日志和聊天调试视图](/docs/agents/agent-troubleshooting/chat-debug-view.md)来检查发送提示词时发生的情况。代理日志显示工具调用、LLM 请求和提示词文件发现的按时间顺序排列的事件日志。聊天调试视图显示每次交互的原始系统提示词、用户提示词、上下文和工具载荷。这些工具对于理解 AI 以某种方式响应的原因或排查意外结果非常有用。

## 支持

GitHub Copilot Chat 的支持由 GitHub 提供，可通过 <https://support.github.com> 联系。

要了解更多关于 Copilot 的安全性、隐私、合规性和透明度的信息，请参阅 [GitHub Copilot 信任中心常见问题解答](https://copilot.github.trust.page/faq)。

## 相关资源

* [创建和管理聊天会话](/docs/chat/chat-sessions.md)

* [选择代理并配置权限](/docs/agents/overview.md)

* [提示词示例](/docs/agents/guides/prompt-examples.md)
