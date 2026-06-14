---
ContentId: e6b33fcb-8240-49dd-b6ca-5412d6fa669a
DateApproved: 6/10/2026
MetaDescription: 在 Visual Studio Code 中使用内联聊天，直接在编辑器中进行编辑，或在终端中获取命令建议。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# 内联聊天

在 Visual Studio Code 中使用内联聊天，你可以直接在编辑器中请求生成代码或进行编辑，也可以在集成终端中获取 Shell 命令的帮助。内联聊天让你能够保持工作流程的连续性，无需切换到单独的聊天视图。

当你需要在可见代码上下文中进行快速、有针对性的编辑时，请使用内联聊天。对于多步骤任务、多文件更改或更广泛的代码库探索，请改用[聊天视图](/docs/chat/chat-overview.md)。

## 使用编辑器内联聊天

当你使用编辑器内联聊天时，提示词的范围限定为活动编辑器中的代码。内联聊天可能会使用工作区中其他文件的内容作为提示词的上下文。

使用编辑器内联聊天的方法：

1. 在编辑器中打开一个文件。

1. 使用 `kb(inlinechat.start)` 键盘快捷键或在标题栏的**聊天**菜单中选择**打开内联聊天**，即可打开编辑器内联聊天。

1. 在聊天输入框中输入提示词，然后按 `kbstyle(Enter)`。

    ![编辑器内联聊天控件截图。](images/copilot-chat/inline-chat-control.png)

    > [!TIP]
    > 在编辑器中选择一段代码，可以将提示词范围限定为该代码。

1. VS Code 会在编辑器中以内联方式显示代码建议的差异对比。使用**保留**或**撤销**来接受或拒绝更改。

    ![编辑器内联聊天建议非递归阶乘实现的截图。](images/copilot-chat/inline-chat-recursion.png)

### 活动编辑会话中的内联聊天

当某个文件属于活动聊天编辑会话时，按 `kb(inlinechat.start)` 会在聊天视图中打开"在聊天中询问"，而不是常规的内联聊天。这会将你的提示词路由到现有会话中，以便利用完整的对话上下文。对于这些文件，编辑器上下文菜单也会显示**在聊天中询问**，而不是**打开内联聊天**。

要始终使用常规内联聊天，即使文件属于聊天会话，请将 `setting(inlineChat.askInChat)` 设置为 `false`。

对于不属于任何聊天会话的文件，无论此设置如何，`kb(inlinechat.start)` 始终打开常规内联聊天。

### 在文本选择时显示视觉提示（实验性功能）

当你在编辑器中选择文本时，VS Code 可以显示一个视觉提示，帮助你为所选代码启动内联聊天。使用 `setting(inlineChat.affordance)` 设置来控制此提示的显示方式：

* `off`：选择文本时不显示任何提示
* `gutter`：提示显示在选区旁边的行号区域
* `editor`：提示显示在选区内光标位置，与代码操作的灯泡图标集成在一起

![编辑器中选择文本时，行号区域显示内联聊天提示的截图。](images/copilot-chat/inline-chat-hint-gutter.png)

该提示显示一个内联聊天输入框以及用于将选择内容添加到聊天、解释代码和启动代码审查的操作。

> [!NOTE]
> 此功能为实验性功能，需要将 `setting(inlineChat.renderMode)` 设置设为 `hover` 才能使用。

## 使用终端内联聊天

你可以在[集成终端](/docs/terminal/basics.md)中调出终端内联聊天，以获取 Shell 命令的帮助或询问终端相关问题。

使用终端内联聊天的方法：

1. 通过选择**视图** > **终端**菜单项或使用 `kb(workbench.action.terminal.toggleTerminal)` 键盘快捷键，在 VS Code 中打开终端。

1. 使用 `kb(workbench.action.terminal.chat.start)` 键盘快捷键或在命令面板中运行**终端内联聊天**命令，启动终端内联聊天。

1. 在聊天输入框中输入提示词，然后按 `kbstyle(Enter)`。

    ![显示可以询问复杂问题的截图，例如"列出 src 目录中最大的 5 个文件"。](images/copilot-chat/terminal-chat.png)

1. 查看回复并选择**运行**（`kb(workbench.action.terminal.chat.runCommand)`）以在终端中运行命令。

    或者，选择**插入**（`kb(workbench.action.terminal.chat.insertCommand)`）将命令插入终端，在运行前进行修改。

## 更改内联聊天的模型

你可以更改编辑器内联聊天使用的语言模型。要配置内联聊天的默认模型，请使用 `setting(inlineChat.defaultModel)` 设置。此设置列出了模型选择器中所有可用的模型。

如果在内联聊天会话期间更改模型，所选模型将在会话剩余时间内持续有效。重新加载 VS Code 后，模型将重置为 `setting(inlineChat.defaultModel)` 设置中指定的值。

详细了解[为你的任务选择合适的模型](/docs/agents/concepts/language-models.md#choose-the-right-model)。

## 使用快速聊天

快速聊天提供一个轻量级的聊天面板，在编辑器顶部打开。用它来进行快速提问和简短交互，无需打开完整的聊天视图或离开当前工作流程。

要打开快速聊天，请按 `kb(workbench.action.quickchat.toggle)` 或在标题栏的**聊天**菜单中选择**快速聊天**。

输入提示词并按 `kbstyle(Enter)` 获取回复。快速聊天支持与聊天视图相同的 `#`-提及和 `@`-提及功能，用于添加上下文。选择**在聊天视图中打开**按钮，可以在完整聊天视图中继续对话。

## 相关资源

* [在 VS Code 中使用聊天](/docs/chat/chat-overview.md)
* [为聊天提示词添加上下文](/docs/chat/copilot-chat-context.md)
* [审查 AI 生成的代码编辑](/docs/chat/review-code-edits.md)
* [VS Code 中的 AI 语言模型](/docs/agent-customization/language-models.md)
