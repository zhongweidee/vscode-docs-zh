---
ContentId: b4e8c9f3-6d5a-4b2e-c7a4-8f9e1b3d2c5a
DateApproved: 6/10/2026
MetaDescription: 将会话同步到 GitHub，实现跨设备访问、企业策略控制和团队成员共享。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# 将会话同步到 GitHub

默认情况下，VS Code 会将你的聊天会话同步到你的 GitHub 账户，包括所有本地代理会话。同步的会话默认是私有的，除非你显式分享，否则其他人无法查看。它们会显示在 GitHub.com 仓库的 **Agents** 选项卡中，支持[会话洞察](/docs/agents/sessions/session-insights.md)跨所有会话进行查询，包括来自 Copilot CLI、编码代理、代码审查和 GitHub Copilot Desktop 应用的会话。

## 退出会话同步

若仅保留本地会话数据，将 `setting(chat.sessionSync.enabled)` 设置为 `false`。当你退出后，会话数据将保留在你的计算机上，你只能本地查询。

## 从同步中排除仓库

使用 `setting(chat.sessionSync.excludeRepositories)` 防止特定仓库中的会话同步到云端。该设置接受精确的 `owner/repo` 名称或 glob 模式：

```json
"chat.sessionSync.excludeRepositories": [
    "my-org/private-repo",
    "my-org/secret-*"
]
```

匹配到的仓库的会话将仅存储在本地。

## 企业策略

对于 Copilot Business 和 Copilot Enterprise 用户，有两个策略控制会话同步：

* **GitHub.com 企业策略**（"将会话存储在云端"）：企业所有者和组织所有者在 GitHub.com 上配置此项，为其用户启用或禁用云端同步。
* **VS Code 组策略** (`CopilotSessionSync`): 当禁用时，`setting(chat.sessionSync.enabled)` 设置将被强制设为 `false`，会话将仅保留在本地。

> [!IMPORTANT]
> 启用该策略不会赋予管理员对你的会话数据的访问权限。同步的会话绑定到你的个人账户，默认只有你自己可以访问。

当被策略禁用时，会话同步状态显示为 **已由策略禁用**，用户无法覆盖该设置。

## 分享会话

会话默认不会被分享。在 GitHub.com 上，你可以将同步的会话以仅查看权限分享给有权访问该仓库的任何人：

1. 在 GitHub.com 上打开 **Agents** 选项卡。
2. 选择一个会话，从 `...` 菜单中打开 **分享设置**。
3. 启用分享，为仓库协作者授予仅查看权限。

接收者可以查看会话的提示词、响应和文件更改，但不能操控或修改会话。被分享的会话不会被索引到其他用户的会话查询中。

## 会话同步状态

会话同步状态显示在聊天视图中的 Copilot 状态栏中，显示云端同步的当前状态：

| 状态 | 描述 |
|-------|-------------|
| **未启用** | 会话同步已关闭。数据仅保留在此设备上。 |
| **已启用** | 会话正在同步到你的 GitHub 账户。 |
| **已同步 N 个会话** | 显示已上传的会话数量。选择可在 GitHub.com 上查看会话。 |
| **正在同步 N 个会话** | 上传正在进行中。 |
| **已由策略禁用** | 你所在组织的策略禁止了会话同步。 |
| **同步错误** | 上次同步时发生错误。请稍后重试。 |

## 隐私与数据控制

* 会话默认是私有的。同步的会话绑定到你的个人 GitHub 账户，除非你显式分享，否则只有你自己可以访问。
* 密钥，如令牌、API 密钥和凭据，会在数据离开你的计算机之前被自动剥离。
* 你可以随时通过将 `setting(chat.sessionSync.enabled)` 设置为 `false` 来退出。已有的同步会话会保留在 GitHub.com 上，直到你删除它们。

## 删除同步的会话

若要删除同步的会话数据，请从命令面板中运行 **删除会话同步数据** 命令 (`github.copilot.sessionSync.deleteSessions`)。该命令会显示一个选择器，供你选择要删除的会话。选择会话后，你需要选择删除范围：

* **从本地和云端删除**: 从你的计算机和 GitHub.com 上删除会话数据。此操作无法撤销。
* **仅从云端删除**: 从 GitHub.com 上删除会话数据，但保留本地数据。

你也可以在 GitHub.com 的 **Agents** 选项卡中隐藏或删除单个同步的会话。隐藏会话会将其从你的会话索引中移除，使其不再出现在查询结果中。

## 设置参考

| 设置 | 默认值 | 描述 |
|---------|---------|-------------|
| `setting(github.copilot.chat.localIndex.enabled)` | `true` | 启用本地会话跟踪（同步的前提条件） |
| `setting(chat.sessionSync.enabled)` | `true` | 将会话同步到你的 GitHub 账户 |
| `setting(chat.sessionSync.excludeRepositories)` | `[]` | 从同步中排除的仓库模式 |

## 相关内容

* [会话洞察](/docs/agents/sessions/session-insights.md) - 查询你的会话历史，获取站会报告、提示和搜索
* [管理聊天会话](/docs/chat/chat-sessions.md) - 创建和组织聊天会话
* [安全](/docs/agents/security.md) - Copilot 安全与隐私
