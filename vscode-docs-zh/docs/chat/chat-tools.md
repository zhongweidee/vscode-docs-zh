---
ContentId: 8f2c4a1d-9e3b-4c5f-a7d8-6b9c2e4f1a3d
DateApproved: 6/10/2026
MetaDescription: 了解如何使用内置工具、MCP 工具和扩展工具，通过专用功能扩展 VS Code 中的聊天。
MetaSocialImage: ../images/shared/github-copilot-social.png
keywords:
- copilot
- ai
- agents
- chat
- tools
- terminal
- customization
---
# 在聊天中使用工具

工具为 Visual Studio Code 中的智能体提供专用功能，用于完成特定任务，例如搜索代码、运行命令、获取网页内容或调用 API。VS Code 支持三种类型的工具：内置工具、模型上下文协议（MCP）工具和扩展工具。

有关工具类型以及工具在智能体循环中如何工作的背景信息，请参阅[工具概念](/docs/agents/concepts/tools.md)。

本文介绍如何在聊天提示中使用工具以及如何管理工具调用。要控制智能体如何请求工具调用的批准以及其拥有的自主程度，请参阅[管理批准和权限](/docs/agents/approvals.md)。

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="体验工具的实际使用">
启动一个聊天提示，使用网页工具总结最新的 VS Code 更新。

* [在 VS Code 中打开](vscode://GitHub.Copilot-Chat/chat?agent=agent%26prompt=Summarize%20the%20latest%20VS%20Code%20updates%20%23web)

</div>

## 为聊天启用工具

在使用聊天中的工具之前，你需要在聊天视图中启用它们。你可以通过工具选择器按请求启用或禁用工具。你可以通过[安装 MCP 服务器](/docs/agent-customization/mcp-servers.md)或[提供工具的扩展](/docs/configure/extensions/extensions.md)来添加更多工具。

> [!TIP]
> 仅选择与你的提示相关的工具，以获得更好的结果。

访问工具选择器的方式：

1. 打开聊天视图，从智能体选择器中选择 **Agent**。

1. 在聊天输入字段中选择**配置工具**按钮。

    ![截图显示聊天视图，突出显示聊天输入中的配置工具按钮。](images/chat-tools/agent-mode-select-tools.png)

1. 选中或取消选中工具，以控制当前请求可用的工具。

    使用搜索框筛选工具列表。

当你使用[提示文件](/docs/agent-customization/prompt-files.md)或[自定义智能体](/docs/agent-customization/custom-agents.md)自定义聊天时，可以指定给定提示或模式可用的工具。详细了解[工具列表优先级顺序](/docs/agent-customization/custom-agents.md#tool-list-priority)。

## 在提示中使用工具

使用[智能体](/docs/agents/agent-types/local-agents.md)时，智能体会根据你的提示和请求上下文自动从已启用的工具中确定使用哪些工具。智能体自主选择并调用相关工具，以完成任务。

你也可以在提示中通过输入 `#` 后跟工具名称来显式引用工具。当你想要确保使用特定工具时，这种方法非常有用。在聊天输入字段中输入 `#` 可查看可用工具列表，包括内置工具、已安装服务器的 MCP 工具、扩展工具和工具集。

**显式引用工具的示例：**

* `"最新版本的 Node.js 是什么 #web"`
* `"Next.js 中的路由是如何工作的？#web"`
* `"修复 #problems 中的问题"`
* `"解释认证流程 #codebase"`

> [!TIP]
> 默认情况下，工具调用详情在聊天对话中处于折叠状态。你可以通过在聊天中选择工具摘要行来展开它们，或通过 `setting(chat.agent.thinking.collapsedTools)` 设置（实验性）更改默认行为。

## 编辑工具参数

你可以在工具运行前查看和编辑输入参数：

1. 当工具确认对话框出现时，选择工具名称旁边的箭头以展开其详细内容。

1. 根据需要编辑任何工具输入参数。

1. 选择**允许**以使用修改后的参数运行该工具。

## 使用工具集分组工具

工具集是一组工具的集合，你可以在提示中将其作为单个实体引用。工具集帮助你组织相关工具，使其更易于在聊天提示、[提示文件](/docs/agent-customization/prompt-files.md)和[自定义聊天智能体](/docs/agent-customization/custom-agents.md)中使用。一些内置工具属于预定义的工具集，例如 `#edit` 和 `#search`。

### 创建工具集

创建工具集的步骤：

1. 从命令面板运行**聊天：配置工具集**命令，然后选择**创建新工具集文件**。

    或者，在聊天视图中选择省略号（**...**）菜单，选择**工具集**，然后选择**创建新工具集文件**。

1. 在打开的 `.jsonc` 文件中定义你的工具集。

    工具集的结构如下：

    ```json
    {
        "reader": {
            "tools": [
                "search/changes",
                "search/codebase",
                "read/problems",
                "search/usages"
            ],
            "description": "用于阅读和收集上下文的工具",
            "icon": "book"
        }
    }
    ```

    工具集属性：

    * `tools`：工具名称数组（内置工具、MCP 工具或扩展工具）
    * `description`：显示在工具选择器中的简要描述
    * `icon`：工具集的图标（参见[产品图标参考](/api/references/icons-in-labels.md)）

### 使用工具集

在提示中通过输入 `#` 后跟工具集名称来引用工具集：

* `"分析代码库中的安全问题 #reader"`
* `"数据库连接字符串定义在哪里？#search"`

在工具选择器中，工具集以可折叠的相关工具组形式显示。你可以选中或取消选中整个工具集，以快速启用或禁用多个相关工具。

## 运行终端命令

在所有内置工具中，终端工具是最常用的工具之一。智能体使用它来运行命令作为其工作流程的一部分，例如安装依赖项、运行构建或执行测试。由于终端命令可能会改变你的环境，VS Code 提供了额外的控制功能，用于查看、运行和监控它们，这些功能建立在之前描述的[批准](/docs/agents/approvals.md)行为之上。

当智能体决定运行命令时，它使用内置的终端工具在 VS Code 中的集成终端中执行该命令。

在聊天对话中，智能体显示它运行的命令。你可以通过选择命令旁边的**显示输出**（`>`）在聊天中内联查看命令输出。你也可以通过选择**显示终端**在集成终端中查看完整输出。

![截图显示聊天中的终端命令输出。](images/chat-tools/terminal-command-output.png)

使用实验性 `setting(chat.tools.terminal.outputLocation)` 设置来配置终端命令输出的显示位置：在聊天中内联显示，或直接在集成终端中显示。

### 在后台继续终端命令

当智能体运行长时间运行的终端命令时，例如启动开发服务器或在监视模式下运行构建，你可以将命令推送到后台。这允许智能体继续处理其他任务，而无需等待命令完成。

当命令正在运行时，聊天对话中的终端命令旁边会出现一个**在后台继续**按钮。选择此按钮将命令移到后台。该命令继续运行，智能体可以稍后检查其输出，或使用终端执行其他任务。

智能体在运行终端命令时也可以指定超时。当达到超时时，智能体停止等待命令并返回截至目前收集的输出。使用 `setting(chat.tools.terminal.enforceTimeoutFromModel)` 设置来控制是否强制执行智能体指定的超时值。

智能体还可以选择直接在后台运行命令，无需用户交互。你未显示的后的台终端在其命令完成后会自动清理，这可以防止在长时间的会话中积累过时的终端。要在命令完成后显示后台终端并保持其打开，请在聊天工具调用头部中选择**显示**链接。终端输出即使在被清理后仍会在聊天对话中保持可见。

> [!TIP]
> 要自动批准终端命令或限制智能体命令的文件系统和网络访问，请参阅[管理批准和权限](/docs/agents/approvals.md)。

## 常见问题解答

<details>
<summary>如何知道哪些工具可用？</summary>

在聊天输入字段中输入 `#` 可查看所有可用工具的列表。你也可以使用聊天中的工具选择器来查看和管理活动工具列表。

</details>

<details>
<summary>我收到一个错误提示"每个请求不能超过 128 个工具。"</summary>

一个聊天请求一次最多可以启用 128 个工具。如果你看到关于每个请求超过 128 个工具的错误：

* 在聊天视图中打开工具选择器，取消选中一些工具或整个 MCP 服务器以减少数量。

* 或者，使用 `setting(github.copilot.chat.virtualTools.threshold)` 设置启用虚拟工具，自动管理大型工具集。

</details>

<details>
<summary>为什么智能体没有使用我配置的终端 shell？</summary>

智能体使用你配置为终端默认的 shell，但 Windows 上的 `cmd`（命令提示符）和 macOS/Linux 上的 `sh` 除外。这是因为这些 shell 不支持[shell 集成](/docs/terminal/shell-integration.md)，这意味着智能体对终端内部发生的情况的可见性非常有限。智能体无法获得命令何时运行或何时完成运行时的直接信号，而需要依赖超时和监视终端何时空闲来继续。这会导致缓慢且不稳定的体验。

你仍然可以通过终端配置文件设置将智能体配置为使用这些 shell，但与在 Windows 上使用 PowerShell 或在 macOS/Linux 上使用 `bash`/`zsh` 相比，这将导致较差的体验。

* `setting(chat.tools.terminal.terminalProfile.windows)` - 覆盖 Windows 上的 shell
* `setting(chat.tools.terminal.terminalProfile.osx)` - 覆盖 macOS 上的 shell
* `setting(chat.tools.terminal.terminalProfile.linux)` - 覆盖 Linux 上的 shell

</details>

<details>
<summary>我可以创建自己的工具吗？</summary>

可以。你可以通过两种方式创建工具：

* **开发 VS Code 扩展**，使用[语言模型工具 API](/api/extension-guides/ai/tools.md) 提供工具
* **创建 MCP 服务器**来提供工具。请参阅 [MCP 开发者指南](/docs/agents/guides/mcp-developer-guide.md)

</details>

## 相关资源

* [聊天工具参考](/docs/agents/reference/ai-features-cheat-sheet.md#chat-tools)
* [智能体挂钩](/docs/agent-customization/hooks.md) - 在工具生命周期事件中执行自定义命令
* [在 VS Code 中使用 AI 的安全注意事项](/docs/agents/security.md)
