---
ContentId: 8d5c9f2a-1e4b-7c9f-3a8e-2b7d4f1c6e0a
DateApproved: 6/10/2026
MetaDescription: 在 VS Code 中使用 GitHub Copilot 云代理等云代理，通过自动生成拉取请求和团队协作工作流自主处理编码任务。
MetaSocialImage: ../../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- cloud agent
- copilot coding agent
---

# Visual Studio Code 中的云代理

云代理运行在远程基础设施上，并与 GitHub 仓库集成，通过拉取请求实现团队协作。例如，GitHub Copilot 云代理运行在 GitHub 的基础设施上，可以自主地实现功能、处理代码审查反馈并创建拉取请求。

本文介绍云代理的主要功能，以及如何启动和管理云代理会话来执行从简单到复杂的编码任务。

![云代理会话作为 VS Code 聊天编辑器的屏幕截图。](../images/cloud-agents/cloud-agent-session.png)

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="开始使用代理">
跟随实践教程，体验 VS Code 中的本地代理、后台代理和云代理。

* [开始教程](/docs/agents/agents-tutorial.md)

</div>

## 什么是云代理？

与运行在本地计算机上的本地代理和后台代理不同，像 Copilot 云代理这样的云代理运行在远程基础设施上。你可以从 VS Code 的统一聊天视图中查看和管理所有云代理会话。此视图还允许你直接从 VS Code 创建新的云代理会话，或将本地或后台代理对话转交给云代理。

VS Code 支持不同的云代理，例如 Copilot 云代理和[第三方代理](/docs/agents/agent-types/third-party-agents.md)，如 Claude 和 Codex。

> [!TIP]
> 如果你更倾向于以代理优先的方式来运行云代理会话，同时跨多个项目运行 Copilot CLI 和 Claude 会话，请使用[代理窗口](/docs/agents/agents-window.md)。会话在 VS Code 主窗口和代理窗口之间共享。

由于云代理在没有用户交互的情况下远程运行，因此它们非常适合具有明确定义范围和所有必要上下文的任务。它们与拉取请求的集成使其在团队协作中非常高效。

由于远程执行环境的限制，云代理无法直接访问 VS Code 内置工具和运行时上下文（如失败的测试或文本选择）。它们限于在云代理服务中配置的 MCP 服务器和语言模型。

要将任务分配给云代理，你可以直接从聊天视图创建新的云会话，或将 VS Code 中的本地或后台代理对话转交给云代理。

### GitHub Copilot 云代理

**GitHub Copilot 云代理**是 VS Code 中通过 Copilot 订阅可使用的主要云代理。

主要功能包括：

* 跨 GitHub 仓库的大规模重构
* 从高层次需求出发完成完整的功能实现
* 自动生成包含详细描述的拉取请求
* 代码审查集成和反馈处理

### 第三方云代理

VS Code 支持第三方云代理，如 Claude 编码代理和 Codex 编码代理，作为云代理会话的选项。你需要先在 Copilot 账户设置中启用对云端第三方代理的支持，然后才能在 VS Code 中使用它们。

你无需安装提供商的 VS Code 扩展即可在 VS Code 中使用他们的云代理。

详细了解 [VS Code 中的第三方代理](/docs/agents/agent-types/third-party-agents.md) 以及如何启用它们。

## 启动云代理会话

你可以通过直接向云代理发送聊天提示来启动云代理会话，也可以将正在进行的本地或后台对话转交给云代理。转交正在进行的对话对于需要先进行需求澄清或规划再进行自主执行的复杂任务特别有用。

如果你更喜欢在浏览器中工作，也可以直接通过 [GitHub Copilot 云代理](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/manage-agents)从 GitHub.com 启动云代理会话。

### 创建新的云代理会话

创建新的云代理会话：

1. 在聊天视图中，从会话列表下拉菜单中选择**新建聊天**，然后从会话类型下拉菜单中选择**云端**

    或者，你也可以从命令面板运行**聊天：新建云代理**命令 (`kb(workbench.action.showCommands)`)。

1. 从下拉菜单中选择云代理提供商，并可选择自定义代理和模型。

1. 输入你的提示，让云代理处理任务

    例如，你可以输入：

    ```text
    Refactor the authentication module to improve security and performance. Implement OAuth2 and JWT for token management, and optimize database queries for user sessions.
    ```

1. 云代理开始在远程处理任务。你可以在聊天视图中监控会话进度，并继续与之交互。

> [!NOTE]
> 如果你在 GitHub.com 上已为 Copilot 云代理分配了议题或拉取请求，该会话会自动出现在 VS Code 的会话列表中。

### 将代理会话转交给云代理

对于复杂任务，可以先用本地代理在 VS Code 聊天中进行需求澄清，例如使用计划代理，然后将任务转交给云代理进行自主执行。当你将本地代理对话转交给云代理会话时，整个聊天上下文都会传递给云代理。

将本地代理会话转交给云代理会话：

1. 在聊天视图中打开正在进行的本地代理会话。

1. 选择会话类型下拉菜单，然后选择**云端**以云代理方式继续会话。

    如果你正在使用[计划代理](/docs/agents/planning.md)，可以从**开始实施**下拉菜单中选择**在云端继续**，以便在云代理会话中执行计划实现。

要将后台代理会话转交给云代理会话，请在后台代理会话的聊天输入框中输入 `/delegate`。此命令会将完整的聊天历史和上下文传递给新的云代理会话，然后你可以在聊天视图中监控该会话。

## 查看和管理云代理会话

你可以从 VS Code 的聊天视图中查看和管理所有云代理会话。通过从筛选选项中选择**云代理**来过滤会话列表，仅显示云代理会话。

![VS Code 聊天视图中云代理过滤器的屏幕截图。](../images/cloud-agents/cloud-agent-filter.png)

从列表中选择一个云代理会话，即可在聊天视图中打开会话详情。如果你更倾向于在编辑器标签页（聊天编辑器）中查看会话，请右键单击会话并选择**作为编辑器打开**。

![云代理会话作为 VS Code 聊天编辑器的屏幕截图。](../images/cloud-agents/cloud-agent-session.png)

## 相关资源

* [代理概述](/docs/agents/overview.md)：了解不同的代理类型和委托
* [后台代理](/docs/agents/agent-types/copilot-cli.md)：了解用于隔离开发的基于 CLI 的自主代理
* [自定义代理](/docs/agent-customization/custom-agents.md)：创建自定义代理角色和个性
* [GitHub Copilot 云代理](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/manage-agents)：在 GitHub.com 上管理代理
