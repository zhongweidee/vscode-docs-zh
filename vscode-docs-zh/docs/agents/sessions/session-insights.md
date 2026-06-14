---
ContentId: a3f7d8e2-5c4b-49a1-b6d3-7e8f9a2c1d4b
DateApproved: 6/10/2026
MetaDescription: 在 VS Code 中使用 chronicle 命令生成站会报告、获取个性化提示，以及用自然语言查询你的 Copilot 会话历史。
MetaSocialImage: ../../images/shared/github-copilot-social.png
---
# 使用 chronicle 查询会话历史

你的 GitHub Copilot 会话会构建一个可搜索的历史记录，涵盖你所做的所有工作。你可以用自然语言对过去的会话提问、生成站会报告、获取个性化提示，以及搜索你的编码历史。由于[会话同步](/docs/agents/sessions/session-sync.md)默认为启用状态，查询会汇集来自 Copilot CLI、编码代理、代码审查和 VS Code 的会话数据。

## Chronicle 命令

在聊天输入框中使用以下命令来查询你的会话历史：

| 命令 | 描述 |
|---------|-------------|
| `/chronicle:standup` | 将最近的编码会话汇总为一份站会报告，按分支和仓库分组。默认涵盖过去 24 小时的内容。包括已编辑的文件、引用的 PR 或议题，以及工作是否已完成或仍在进行中。 |
| `/chronicle:tips` | 分析你最近的会话历史（通常为 7 天），并建议如何更有效地使用 Copilot。提示基于你的实际使用模式：你很少使用的工具、能带来更好结果的提示模式，或工作流改进建议。 |
| `/chronicle:cost-tips` | 分析最近的会话，识别减少 token 使用量和 Copilot 成本的机会。 |
| `/chronicle:search <query>` | 按关键字、文件路径或 PR 或议题引用来搜索会话。使用基于会话摘要、对话轮次、文件路径和检查点笔记的全文索引。结果包含会话 ID 和时间戳，让你可以恢复相关的会话。 |
| `/chronicle:reindex` | 重建本地会话索引并将会话数据同步到你的账户。 |

## 自由形式提问

你也可以直接在聊天中自由地提出关于会话历史的问题。例如，输入"我昨天编辑了哪些文件？"或"我是否进行过与 payments API 相关的操作？"，Copilot 就会搜索你已同步的会话历史来回答。与 `/chronicle:search` 执行直接内容搜索不同，自由形式提问使用语义理解来查找相关的会话。

## 记录哪些内容

对于每个聊天会话，本地会话存储会记录：

* **会话元数据**：仓库、分支、工作目录、时间戳，以及所使用的代理或参与者。
* **对话轮次**：用户消息（最多 1,000 个字符）和助手响应（最多 5,000 个字符）。
* **涉及的文件**：来自工具调用的文件路径，例如 `replace_string_in_file`、`create_file`、`read_file` 和 `apply_patch`。
* **外部引用**：从 GitHub MCP 工具调用和终端命令中提取的 PR 编号、议题编号和提交 SHA。

数据存储在本地 SQLite 数据库中。令牌、API 密钥、密码和连接字符串等机密信息会在数据同步到云端之前自动过滤。

## 重建会话索引

如果会话看起来缺失或数据库损坏，可以重建索引。重建索引还会将会话数据同步到你的账户。

```prompt
/chronicle:reindex
```

你还可以从命令面板运行**重建会话索引**命令（`github.copilot.chronicle.reindex`）。

以下情况适合重建索引：

* 从备份恢复会话文件后
* 出现意外崩溃导致数据未能写入存储后
* 手动删除会话目录后
* 重新选择加入会话同步后

## 相关内容

* [会话同步](/docs/agents/sessions/session-sync.md) - 将会话同步到你的 GitHub 账户以实现跨设备访问
* [管理聊天会话](/docs/chat/chat-sessions.md) - 创建和管理聊天会话
* [设置参考](/docs/agents/reference/ai-settings.md) - 所有 AI 和代理设置
