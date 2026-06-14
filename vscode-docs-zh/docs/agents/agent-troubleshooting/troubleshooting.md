---
ContentId: f8e4b2c1-9d3a-4e5f-b6c7-8a9d0e1f2b3c
DateApproved: 6/10/2026
MetaDescription: 使用日志、诊断和调试工具排查 Visual Studio Code 中 GitHub Copilot 的问题。
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- copilot
- troubleshooting
- diagnostics
- logs
- debugging
---
# 排查 Visual Studio Code 中的 AI 问题

本文介绍用于排查 VS Code 中 AI 相关问题的诊断工具和技术。使用这些工具可以识别网络连接、自定义文件和 AI 响应方面的问题。

## 查看 GitHub Copilot 的日志

GitHub Copilot 扩展的日志文件存储在 Visual Studio Code 扩展的标准日志位置。使用这些日志可以诊断连接问题、扩展错误和异常行为。

要查看详细日志：

1. 打开命令面板（`kb(workbench.action.showCommands)`）。
1. 运行**开发人员：设置日志级别**，并将 GitHub Copilot 和 GitHub Copilot Chat 扩展的值设置为**跟踪**。
1. 运行**输出：显示输出通道**，然后从列表中选择 **GitHub Copilot** 或 **GitHub Copilot Chat**。
1. 在"输出"面板中查看所选扩展的日志。

要在输出通道之间切换，请从"输出"面板右侧的下拉菜单中选择 **GitHub Copilot** 或 **GitHub Copilot Chat**。

## 收集网络诊断信息

如果在连接 GitHub Copilot 时遇到问题，请收集网络连接诊断信息以识别防火墙、代理或 VPN 问题。

1. 打开命令面板（`kb(workbench.action.showCommands)`）。
1. 运行 **GitHub Copilot：收集诊断信息**。
1. 将打开一个编辑器选项卡，其中包含诊断信息，您可以查看并在报告问题时分享。

有关网络配置的更多信息，请参阅 [Copilot 的网络和防火墙配置](/docs/agents/agent-troubleshooting/faq.md#network-and-firewall-configuration-for-copilot)。

## 调试聊天交互

VS Code 提供了不同的工具来检查向 AI 发送提示词时发生的情况。

* **`/troubleshoot` 斜杠命令：**

    让 AI 分析聊天会话的调试日志。可以选择包含 `#session` 来选择并诊断之前的聊天会话。输入 `/troubleshoot` 后跟随您的问题，例如 `/troubleshoot how many tokens did I use?` 或 `/troubleshoot list all paths you tried to load customizations in #session`。需要启用 `setting(github.copilot.chat.agentDebugLog.enabled)`。

* **代理调试日志面板（预览版）：**

    显示聊天会话期间代理交互的按时间顺序排列的事件日志，包括工具调用序列、LLM 请求、令牌使用情况、提示词文件发现和错误。这是理解和调试聊天交互的主要工具。

    要打开代理调试日志面板：

    1. 选择聊天视图中的省略号（**...**）菜单，然后选择**显示代理调试日志**。

    在代理调试日志面板中，您可以将代理调试事件的快照附加到聊天对话中，以向 AI 询问有关会话的问题并排查特定的交互。

    详细了解[代理调试日志面板](/docs/agents/agent-troubleshooting/chat-debug-view.md#agent-debug-log-panel)。

* **聊天调试视图：**

    显示每个 LLM 请求和响应的原始详细信息，包括完整的系统提示词、用户提示词、上下文和工具调用负载。使用此视图可以检查每次交互发送到语言模型和从语言模型接收的确切数据。

    要打开聊天调试视图：

    1. 选择聊天视图中的溢出菜单（`...`）。
    1. 选择**显示聊天调试视图**。

    详细了解[聊天调试视图](/docs/agents/agent-troubleshooting/chat-debug-view.md#chat-debug-view)。

## 排查 MCP 服务器问题

MCP 服务器通过连接到外部服务来扩展聊天功能。如果 MCP 服务器无法正常工作，您可以查看其日志并重新启动它。

要排查 MCP 服务器问题：

1. 打开命令面板并运行 **MCP：列出服务器**。
1. 选择一个服务器以查看其状态和可用操作。
1. 选择**显示输出**以查看服务器的日志。
1. 选择**重新启动服务器**以重新启动出现故障的服务器。

详细了解[配置和调试 MCP 服务器](/docs/agent-customization/mcp-servers.md)。

## 提供反馈

如果遇到无法解决的问题，请报告它们以帮助改进 GitHub Copilot：

* **Ghost 文本建议**：将鼠标悬停在编辑器中的 Ghost 文本建议上，然后选择**发送 Copilot 完成反馈**。
* **下一个编辑建议**：在编辑器边栏的"下一个编辑建议"菜单中选择**反馈**操作。
* **一般问题**：打开**帮助** > **报告问题**，选择 **VS Code 扩展**，然后选择 **GitHub Copilot Chat**。

报告问题时，请包含来自 [Copilot 日志](#view-logs-for-github-copilot)的相关信息，以帮助诊断问题。

## 相关资源

* [调试聊天交互](/docs/agents/agent-troubleshooting/chat-debug-view.md)
* [自定义指令](/docs/agent-customization/custom-instructions.md)
* [MCP 服务器](/docs/agent-customization/mcp-servers.md)
* [GitHub Copilot 常见问题解答](/docs/agents/agent-troubleshooting/faq.md)
