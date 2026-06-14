---
ContentId: 8d3f4a2e-9b1c-4f5e-a8d7-2c4b6e9f1a3d
DateApproved: 6/10/2026
MetaDescription: 了解如何在 Visual Studio Code 聊天中查看和管理 AI 生成的代码编辑。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# 查看 AI 生成的代码编辑

在 Visual Studio Code 中与聊天交互时，代理可以跨项目中的多个文件生成代码编辑。本文介绍如何查看、接受或放弃这些 AI 生成的代码编辑。

> [!NOTE]
> 您可以在[聊天视图](/docs/agents/chat-view.md)和[代理窗口](/docs/agents/agents-window.md)中查看 AI 生成的编辑。查看体验遵循相同的概念，但两个界面的用户界面可能有所不同。

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="开始使用代理">
跟随实践教程体验 VS Code 中的本地、后台和云端代理。

* [开始教程](/docs/agents/agents-tutorial.md)

</div>

## 待处理更改

代理更新您的文件后，VS Code 会将编辑应用到磁盘并保存。VS Code 会跟踪哪些文件有待处理的编辑，并允许您逐个或一次性查看它们。

{% tabs id="chat-surface" %}
{% tab label="代理窗口" %}

在代理窗口中，专用的**更改**面板会列出已编辑的文件并显示其差异统计信息。选择一个文件即可打开其差异视图。

![Screenshot showing the Changes panel in the Agents window, highlighting the Changes and Files tabs and the list of edited files.](images/agents-window/agents-window-changes.png)

有关更改面板的更多信息，请参阅[管理和查看文件更改](/docs/agents/agents-window.md#manage-and-review-file-changes)。

{% /tab %}
{% tab label="聊天视图" %}

聊天视图会显示已编辑且等待您查看的文件列表。有待处理编辑的文件还会在资源管理器视图和编辑器选项卡中显示一个方形点图标指示器。

![Screenshot that shows the Chat view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](images/review-code-edits/copilot-edits-changed-files-full.png)

当您打开已更改的文件时，编辑器会显示已应用更改的内联差异。

{% /tab %}
{% /tabs %}

当您关闭 VS Code 时，待处理编辑的状态会被记住，并在重新打开 VS Code 时恢复。

## 查看更改

查看 AI 生成的编辑的方式取决于您使用的界面。在聊天视图中，您可以直接在编辑器中查看编辑。在代理窗口中，您可以在专用的更改面板中查看编辑。

{% tabs id="chat-surface" %}
{% tab label="代理窗口" %}

在代理窗口中，您在专用的**更改**面板中查看编辑，而不是编辑器覆盖层：

1. 在**更改**选项卡中选择一个文件，以打开代理编辑的差异视图。

    ![Screenshot showing the Changes panel in the Agents window, highlighting the list of edited files and the diff view.](images/review-code-edits/agents-window-diff-view.png)

    默认情况下，选择一个文件会打开一个包含所有更改的多文件差异编辑器。要改为为所选文件打开一个聚焦的单文件差异编辑器，请启用 `setting(sessions.changes.openSingleFileDiff)` 设置。

1. 在差异视图中选择**添加反馈**，对特定编辑发表评论并指示代理进行调整。

    ![Screenshot showing the Add Feedback button in the Changes diff view.](images/review-code-edits/agents-window-add-feedback.png)

1. 使用**提交**、**合并**、**签出**或**放弃**操作来处理编辑。

有关更多信息，请参阅[管理和查看文件更改](/docs/agents/agents-window.md#manage-and-review-file-changes)。

{% /tab %}
{% tab label="聊天视图" %}

查看文件中 AI 生成的代码编辑：

1. 通过从聊天视图的已更改文件列表或资源管理器视图中选择，打开有待处理编辑的文件。

    ![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor overlay controls.](images/review-code-edits/copilot-edits-file-review-controls.png)

1. 使用编辑器覆盖层中的 `kbstyle(上箭头)` 和 `kbstyle(下箭头)` 控件在文件中的各个编辑之间导航。

1. 对于每个编辑，选择以下操作之一：
    * 选择**保留**以接受编辑。
    * 选择**撤销**以拒绝编辑并还原更改。
    * 将鼠标悬停在内联更改上，以接受或拒绝该特定更改，而不影响文件中的其他编辑。

1. 或者，从聊天视图中一次性接受或拒绝所有文件中的所有更改。

以下键盘快捷方式可帮助您导航和查看编辑：

| 操作 | 快捷方式 |
|---|---|
| 导航到下一个编辑 | 编辑器覆盖层中的 `kbstyle(下箭头)` |
| 导航到上一个编辑 | 编辑器覆盖层中的 `kbstyle(上箭头)` |

当您在文件中保留或撤销某个编辑时，编辑器会自动导航到下一个有待处理更改的编辑，该编辑可能位于不同的文件中。要禁用此自动导航并留在当前文件中，请将 `setting(chat.editing.revealNextChangeOnResolve)` 设置为 `false`。

{% /tab %}
{% /tabs %}

## 源代码管理集成

如果您在源代码管理视图中暂存更改，则所有待处理编辑都会自动被接受。如果您放弃更改，则所有待处理编辑也会被放弃。

## 自动接受编辑

您可以配置 VS Code，使其在可配置的延迟后使用 `setting(chat.editing.autoAccept)` 设置自动接受 AI 生成的代码编辑。将鼠标悬停在编辑器覆盖层控件上可停止自动接受倒计时。

> [!IMPORTANT]
> 如果您自动接受所有编辑，请在源代码管理中提交更改之前查看这些更改。详细了解[在 VS Code 中使用 AI 的安全注意事项](/docs/agents/security.md)。

## 编辑敏感文件

为防止无意中编辑敏感文件（例如工作区配置设置或环境设置），VS Code 会在应用编辑之前提示您批准。在聊天中，您可以查看建议更改的差异视图，并选择批准或拒绝它们。

使用 `setting(chat.tools.edits.autoApprove)` 设置来配置哪些文件需要批准。该设置使用 glob 模式来匹配工作区中的文件路径。

以下示例配置自动允许编辑所有文件，但 `.vscode` 文件夹中的 JSON 文件和名为 `.env` 的文件除外，这些文件需要您批准：

```json
"chat.tools.edits.autoApprove": {
  "**/*": true,
  "**/.vscode/*.json": false,
  "**/.env": false
}
```

## 从会话列表查看文件更改

当会话完成并对项目进行代码更改时，[会话列表](/docs/chat/chat-sessions.md#sessions-list)会显示该会话的文件更改统计信息。要查看更改，请从列表中选择相应会话以打开会话详细信息。

![Screenshot of the file changes diff editor in an agent session.](images/agents-overview/agent-file-changes-v2.png)

根据代理类型，您可以选择将更改应用到本地工作区，或从会话中签出分支（适用于云端代理）。

## 相关资源

* [使用检查点还原更改](/docs/chat/chat-checkpoints.md)
* [在 VS Code 中使用聊天](/docs/chat/chat-overview.md)
* [聊天会话](/docs/chat/chat-sessions.md)
* [在 VS Code 中使用 AI 的安全注意事项](/docs/agents/security.md)
