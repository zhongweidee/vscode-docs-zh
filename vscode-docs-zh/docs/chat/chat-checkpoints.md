---
ContentId: 8f4d3e2a-9b7c-4e1d-a6f5-3c2b1d8e9f0a
DateApproved: 6/10/2026
MetaDescription: 了解如何编辑之前的聊天请求、使用检查点将工作区恢复到早期状态，以及撤消 Visual Studio Code 中聊天所做的更改。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# 使用检查点和编辑请求撤消更改

在 Visual Studio Code 中进行聊天会话可能会导致工作区中的一个或多个文件发生更改。VS Code 提供了两种撤消或修正这些更改的方法：

* **编辑之前的请求**：修改您已经发送的提示词。VS Code 会撤消该请求及其所有后续请求所做的更改，然后重新发送编辑后的提示词。当您想重新表述请求以获得不同结果时，使用此方法。
* **恢复检查点**：将所有文件更改回滚到对话中的特定时间点。当您想返回到已知的正确状态而不修改提示词时，使用此方法。

> [!NOTE]
> 本页中的功能在[聊天视图](/docs/agents/chat-view.md)和[代理窗口](/docs/agents/agents-window.md)中均可使用。

这两种功能与[审查工作流](/docs/chat/review-code-edits.md)互为补充，在审查工作流中您可以接受或拒绝单个编辑。当您想一次性撤消整批更改时，使用检查点和编辑功能。

## 编辑之前的聊天请求

对话历史记录中的每个聊天请求都是可编辑的。当您编辑之前的聊天请求时，编辑后的请求将作为新请求发送给语言模型，并且原始请求及其后续请求所做的任何文件更改都将被撤消。

要编辑之前的聊天请求，请在聊天视图中选择要修改的请求，然后重新发送它。您可以通过 `setting(chat.editRequests)` 设置来配置或禁用编辑体验。

<video src="images/chat-checkpoints/chat-edit-request.mp4" title="Video showing the editing of a previous chat request in the Chat view." loop controls muted></video>

## 使用检查点撤消文件更改

聊天检查点提供了一种将工作区状态恢复到之前某个时间点的方法，这在聊天交互导致多个文件发生更改时非常有用。

启用检查点后，VS Code 会在处理每个聊天请求之前自动创建受影响文件的快照。这意味着对话中的每个聊天请求都有一个对应的检查点可供恢复。

要启用检查点，请配置 `setting(chat.checkpoints.enabled)` 设置。

### 恢复检查点

恢复检查点时，VS Code 会将工作区恢复到该检查点创建时的状态。这意味着在该检查点之后对文件所做的_所有_更改都将被撤消。

要将工作区恢复到之前的检查点：

1. 在聊天视图中，导航到聊天会话中的之前的聊天请求。

1. 将鼠标悬停在聊天请求上，然后选择**恢复检查点**。

    ![聊天视图截图，显示聊天视图中的"恢复检查点"操作。](images/chat-checkpoints/chat-restore-checkpoint.png)

1. 确认您想要恢复检查点并撤消该时间点之后所做的任何文件更改。

    请注意，该聊天请求将从对话历史记录中移除，工作区文件将恢复到检查点时的状态。

### 恢复后重做

恢复到之前的检查点后，您可以重做被撤消的更改。如果您不小心恢复了检查点，这可能会很有用。

要在恢复检查点后重做更改，请在聊天视图中选择**重做**。

![聊天视图截图，显示"重做"按钮，用于在恢复检查点到之前状态后重做更改。](images/chat-checkpoints/chat-redo-checkpoint.png)

### 查看检查点中的文件更改

为了帮助您了解每个聊天请求的效果，并更容易决定要恢复到哪个检查点，请启用 `setting(chat.checkpoints.showFileChanges)` 设置。这会在每个聊天请求的末尾显示被修改的文件列表，以及每个文件中添加和删除的行数。

![聊天视图截图，显示聊天请求末尾的文件更改情况。](images/chat-checkpoints/chat-checkpoint-changed-files.png)

### 从检查点派生对话

您可以从检查点派生对话，创建一个新的、独立的会话，其中包含到该时间点为止的对话内容。当您想分支出去探索替代方案同时保留原始对话时，这非常有用。

要从检查点派生对话，请将鼠标悬停在聊天请求上，然后选择**派生对话**按钮。详细了解[派生聊天会话](/docs/chat/chat-sessions.md#fork-a-chat-session)。

## 常见问题

### 检查点会取代 Git 版本控制吗？

不会。检查点是为在聊天会话中进行快速迭代而设计的，并且是临时的。它们是对 Git 的补充，但不能替代 Git。请使用 Git 进行永久版本控制和协作。检查点非常适合在活跃的聊天会话中进行实验。

## 相关资源

* [审查 AI 生成的代码编辑](/docs/chat/review-code-edits.md)
* [聊天会话](/docs/chat/chat-sessions.md)
* [聊天概述](/docs/chat/chat-overview.md)
