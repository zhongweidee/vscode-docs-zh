---
ContentId: d5f8a2c1-3e7b-4a9d-b6c4-8f2e1a3d5c7b
DateApproved: 6/10/2026
MetaDescription: 在 VS Code 中使用聊天视图，以代码优先的方式体验代理在工作区中辅助你编写和编辑代码。
MetaSocialImage: images/shared/github-copilot-social.png
---
# 使用聊天视图

聊天视图是你在 Visual Studio Code 中与代理协作的界面，同时让你专注于当前项目中的代码。它位于 VS Code 主窗口的编辑器选项卡旁，因此你可以向代理发出提示、查看其更改，并在不离开工作区的情况下继续编写代码。

当你的工作围绕单个项目展开，且你想要执行以下操作时，请使用聊天视图：

* **在编辑器中编辑和查看**：打开已更改的文件以查看行内差异，并使用编辑器叠加控件保留或撤销单个编辑。了解更多关于[查看 AI 生成的代码编辑](/docs/chat/review-code-edits.md)的信息。
* **调试和测试**：使用调试器、运行任务并执行测试，以在提交代理的更改之前验证其正确性。
* **使用扩展和笔记本**：代理可以访问你已安装的扩展，并可以直接在编辑器中[编辑笔记本](/docs/agents/guides/notebooks-with-ai.md)。
* **远程工作**：如果你已连接到[远程工作区](/docs/remote/remote-overview.md)，聊天视图中的代理也会在那里工作，并拥有与你相同的上下文和工具访问权限。

在本文中，你将了解如何在聊天视图中打开并使用代理。有关同时适用于聊天视图和[代理窗口](/docs/agents/agents-window.md)的聊天机制——例如发送请求、添加上下文和查看更改——请参阅[在 VS Code 中使用聊天](/docs/chat/chat-overview.md)。

![Screenshot showing an agent session in the Chat view alongside the editor in VS Code.](images/agents-overview/chat-sessions-view.png)

> [!TIP]
> 聊天视图（代码优先）和[代理窗口](/docs/agents/agents-window.md)（代理优先）是与代理协作的主要界面。它们共享相同的会话和设置，因此你可以在两者之间自由切换。要切换，请选择标题栏中的**在代理中打开**按钮，或运行 `code --agents`。如需选择帮助，请参阅[选择你与代理协作的方式](/docs/agents/overview.md#choose-how-you-work-with-agents)。

## 先决条件

* 已安装 Visual Studio Code。[下载 VS Code](/download)。
* 拥有 GitHub Copilot 访问权限。按照[在 VS Code 中设置 GitHub Copilot](/docs/setup/copilot.md) 中的步骤登录并激活你的订阅。

## 打开聊天视图

聊天视图在辅助侧边栏中打开，紧邻编辑器。要打开聊天视图，请使用以下方法之一：

* 在 VS Code 标题栏中选择**聊天**菜单，然后选择**打开聊天**。

    ![Screenshot showing the Chat menu in the VS Code title bar.](images/agents-overview/chat-sessions-view.png)

* 使用键盘快捷键 `kb(workbench.action.chat.open)`。

* 从命令行运行 `code chat`，从 VS Code 外部启动聊天。了解更多关于[从命令行启动聊天](/docs/configure/command-line.md#start-chat-from-the-command-line)的信息。

### 布局选项

聊天视图在 VS Code 主窗口中提供多种布局选项。选择最适合你工作流程的布局：

* **侧边栏**（默认）：选择**新建聊天 (+)** > **新建聊天**，或运行**聊天: 新建聊天**命令。最适合在代码旁边保持聊天可见。

    ![Screenshot of opening a new chat session in the Chat view in VS Code.](../chat/images/chat-sessions/new-chat-session-chat-view.png)

* **编辑器选项卡**：选择**新建聊天 (+)** > **新建聊天编辑器**，或运行**聊天: 新建聊天编辑器**命令。最适合为聊天提供更多空间或并排比较会话。

    ![Screenshot of opening a new chat session in an editor tab in VS Code.](../chat/images/chat-sessions/new-chat-session-editor-tab.png)

* **单独窗口**：选择**新建聊天 (+)** > **新建聊天窗口**，或运行**聊天: 新建聊天窗口**命令。最适合多显示器设置。

    ![Screenshot of opening a new chat session in a separate window in VS Code.](../chat/images/chat-sessions/new-chat-session-separate-window.png)

## 界面概览

聊天视图将代理保持在代码旁边，因此你可以在同一个窗口中提示、查看和编辑。聊天视图包含以下主要区域：

1. **会话列表**：位于视图顶部，你可以在此查看和管理当前工作区的会话。了解更多关于[会话列表](/docs/chat/chat-sessions.md#sessions-list)的信息。

1. **聊天对话**：位于中央，你可以在此查看对话历史和代理的响应，包括它对代码所做的更改。

1. **聊天输入**：位于底部，你可以在此输入提示，并通过代理目标、代理、语言模型和权限选择器配置会话。

![Screenshot showing the Chat view with the sessions list, conversation, and chat input.](images/agents-overview/chat-view-expanded.png)

聊天视图有两种模式：紧凑模式和并排模式。使用聊天视图右上角的切换控件在两者之间切换。在紧凑模式下，会话列表和对话共享同一个面板。在并排模式下，会话列表保持可见，位于对话旁边。了解更多关于[会话列表布局选项](/docs/chat/chat-sessions.md#sessions-list)的信息。

## 启动会话

要启动新会话，请选择**新建聊天**（`+`）或按 `kb(workbench.action.chat.newChat)`。在发送第一条提示之前，请使用聊天输入区域中的控件选择代理目标、代理、语言模型和权限级别。你可以在会话期间随时调整这些设置。了解更多关于[配置你的代理会话](/docs/agents/overview.md)的信息。

![Screenshot showing the agent target dropdown in the Chat view.](images/agents-overview/agent-type-dropdown.png)

输入提示并按 `kb(workbench.action.chat.submit)` 开始。代理会将你的任务分解为多个步骤，编辑工作区中的文件，运行命令，并在出现问题时自行修正。了解更多关于[管理聊天会话](/docs/chat/chat-sessions.md)的信息。

## 与代理协作

发送提示后，代理会逐步完成任务。由于聊天视图位于 VS Code 主窗口内，你可以使用完整的编辑器体验与代理的更改进行交互。

* **在编辑器中查看编辑**：代理直接编辑工作区中的文件。打开已更改的文件可查看所应用更改的行内差异，并使用编辑器叠加控件保留或撤销单个编辑。了解更多关于[查看 AI 生成的代码编辑](/docs/chat/review-code-edits.md)的信息。

* **跟踪终端活动**：当代理运行 shell 命令（如安装依赖项或运行构建）时，这些命令会在集成终端中执行。你可以实时查看输出并根据需要进行干预。

* **调试和测试**：使用 VS Code 调试器、运行任务并执行测试，以在提交代理的更改之前验证其正确性。这是在聊天视图中工作的一个关键优势，因为完整的编辑器工具始终可用。

* **使用扩展和笔记本**：代理可以访问你已安装的扩展，并可以直接在编辑器中处理[笔记本](/docs/agents/guides/notebooks-with-ai.md)。

> [!TIP]
> 你可以在编辑器选项卡、单独窗口或最大化模式下打开聊天以获得更多空间。了解更多关于[聊天视图布局选项](#layout-options)的信息。

## 后续步骤

* [聊天概览](/docs/chat/chat-overview.md) - 添加上下文、编写有效的提示并查看更改。
* [管理聊天会话](/docs/chat/chat-sessions.md) - 整理、归档和分支会话。
* [使用代理窗口](/docs/agents/agents-window.md) - 跨多个项目与代理协作。
