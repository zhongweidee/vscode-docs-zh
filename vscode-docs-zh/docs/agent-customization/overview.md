---
ContentId: 16c73175-a606-4aab-8ae5-a5071d3b9e24
DateApproved: 6/10/2026
MetaDescription: 通过自定义指令、提示文件、自定义代理、MCP 服务器等方式，开始在 VS Code 中自定义 AI，使 AI 的响应符合你的编码实践。
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- copilot
- customization
- chat
- instructions
- rules
- slash commands
- prompt files
- custom agents
- agent skills
- mcp
---
# 在 Visual Studio Code 中自定义 AI

Visual Studio Code 为你提供了多种方式，让 AI 了解你的代码库、编码标准和工作流。本文介绍了各种自定义选项，帮助你快速入门。你可以从[聊天视图](/docs/agents/chat-view.md)和[代理窗口](/docs/agents/agents-window.md)管理自定义设置。

<div class="docs-action" data-show-in-doc="true" data-show-in-sidebar="true" title="核心概念">
了解不同的自定义类型以及何时使用每种类型。

* [自定义概念](/docs/agents/concepts/customization.md)

</div>

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="教程">
跟随实践教程，为你的项目自定义 AI。

* [为你的项目自定义 AI](/docs/agents/guides/customize-copilot-guide.md)

</div>

## 自定义类型

VS Code 提供了多种自定义类型，每种类型适用于不同的目标。以下列表简要描述了每种类型并链接到其设置文章：

* [指令](/docs/agent-customization/custom-instructions.md)：描述你的编码标准、规范和项目结构，应用于每个请求或限定于特定文件。
* [提示文件](/docs/agent-customization/prompt-files.md)：保存可重复使用的提示，在聊天中作为斜杠命令调用。
* [代理技能](/docs/agent-customization/agent-skills.md)：将多步骤工作流、脚本和资源打包，当任务匹配时代理自动加载。
* [自定义代理](/docs/agent-customization/custom-agents.md)：定义具有自己指令、工具访问权限和模型的专用角色。
* [语言模型](/docs/agent-customization/language-models.md)：选择处理你请求的模型，或使用自己的模型和 API 密钥。
* [MCP 服务器](/docs/agent-customization/mcp-servers.md)：通过模型上下文协议将代理连接到外部工具、服务和数据。
* [钩子](/docs/agent-customization/hooks.md)：在代理循环的特定点执行确定性操作，以强制执行策略和护栏规则。
* [代理插件](/docs/agent-customization/agent-plugins.md)（预览）：将其他自定义类型打包成一个可安装的包。

要比较各个选项并确定哪个适合你的目标，请参阅[自定义概念](/docs/agents/concepts/customization.md)。本文剩余部分重点介绍如何设置和管理自定义。

## 逐步入门

逐步采用自定义设置，而不是一次性全部应用。从项目级指令开始，然后在发现重复出现的需求时逐步添加更具体的自定义设置。如需实践教程，请参阅[为你的项目自定义 AI](/docs/agents/guides/customize-copilot-guide.md) 指南。

1. **设置项目指令**：在聊天中输入 `/init`，生成一个 `.github/copilot-instructions.md` 文件，其中包含根据你的代码库量身定制的编码标准。

1. **添加目标指令**：创建 `*.instructions.md` 文件，适用于代码库中特定的语言、框架或文件夹。

1. **自动化重复任务**：为常见工作流创建提示文件，例如生成测试或搭建组件脚手架。

1. **为特定角色专业化 AI**：创建自定义代理，并将可重复使用的功能打包为代理技能，以便跨项目和工具共享。

1. **连接外部工具和数据**：添加 MCP 服务器和钩子，通过外部服务和自定义操作扩展 AI。

> [!TIP]
> 你可以使用 AI 生成自定义文件。在聊天中输入 `/create-instruction`、`/create-prompt`、`/create-skill`、`/create-agent` 或 `/create-hook`，即可在 AI 辅助下搭建新的自定义设置。

## 在编辑器中管理自定义设置

> [!NOTE]
> 代理自定义编辑器目前处于预览阶段。

代理自定义编辑器提供了一个集中的 UI，用于在一个地方创建和管理所有代理自定义设置。编辑器将不同的自定义类型组织到不同的选项卡中，并提供一个嵌入式代码编辑器，用于编辑自定义文件，支持语法高亮和验证。

你可以通过编辑相应的 Markdown 从零开始创建新的自定义设置，或使用 AI 根据你的特定项目生成初始内容。

要添加 MCP 服务器和代理插件，你可以直接从编辑器浏览相应的市场，安装新项目并管理现有项目。

你可以从任一聊天界面打开代理自定义编辑器：

{% tabs id="chat-surface" %}
{% tab label="代理窗口" %}

在代理窗口中，选择会话列表下方**自定义设置**面板中的自定义类型。

![Screenshot showing the Agent Customizations panel in the Agents window, with the list of available customizations visible.](images/customization/agents-window-customizations.png)

{% /tab %}
{% tab label="聊天视图" %}

在聊天视图中，选择**配置聊天（齿轮图标）**或从命令面板运行**聊天：打开自定义设置**（`kb(workbench.action.showCommands)`）。

![Screenshot of the Agent Customizations editor, showing the sidebar with customization categories and the main view listing custom agents.](images/customization/chat-customizations-editor.png)

{% /tab %}
{% /tabs %}

你可以为不同的[代理类型](/docs/agents/overview.md#configure-your-agent-session)配置自定义设置：本地代理、Copilot CLI 和 Claude 代理。从编辑器顶部的下拉菜单中选择代理类型，以查看和管理该代理类型的自定义设置。

## 在单体仓库中使用自定义设置

在单体仓库设置中，你可能在 VS Code 中打开仓库的子文件夹而不是仓库根目录。默认情况下，Visual Studio Code 仅发现在你打开的工作区文件夹内的自定义文件。启用 `setting(chat.useCustomizationsInParentRepositories)` 设置也可以发现来自父仓库的自定义设置。

启用此设置后，VS Code 会从每个工作区文件夹向上遍历文件夹层级，直到找到 `.git` 文件夹。如果找到，它会收集从工作区文件夹到仓库根目录（含）之间所有文件夹中的自定义设置。这适用于所有自定义类型：始终启用的指令（`copilot-instructions.md`、`AGENTS.md`、`CLAUDE.md`）、基于文件的指令、提示文件、自定义代理、代理技能和钩子。

例如，考虑以下单体仓库结构：

```text
my-monorepo/              # 仓库根目录（含有 .git 文件夹）
├── .github/
│   ├── copilot-instructions.md
│   ├── instructions/
│   │   └── style.instructions.md
│   ├── prompts/
│   │   └── review.prompt.md
│   └── agents/
│       └── reviewer.agent.md
├── packages/
│   └── frontend/          # 作为工作区文件夹打开
│       └── src/
```

如果你在 VS Code 中仅打开 `packages/frontend/` 并启用该设置，VS Code 会发现仓库根目录的自定义文件，例如 `copilot-instructions.md`、`style.instructions.md`、`review.prompt.md` 和 `reviewer.agent.md`。

父仓库发现的条件：

* 工作区文件夹不包含 `.git` 文件夹（它本身不是仓库根目录）。
* 父文件夹包含 `.git` 文件夹。
* 父仓库文件夹是[受信任的](/docs/editing/workspaces/workspace-trust.md)。VS Code 会在打开工作区时提示你信任父文件夹。

> [!NOTE]
> `setting(chat.useCustomizationsInParentRepositories)` 设置默认处于禁用状态。

## 排查自定义问题

如果你的自定义设置未被应用或导致意外行为，请打开**代理调试日志**面板以[排查代理问题](/docs/agents/agent-troubleshooting/troubleshooting.md)。从命令面板运行**开发者：打开代理调试面板**（`kb(workbench.action.showCommands)`），或在聊天视图中选择省略号（**...**）菜单并选择**显示代理调试日志**。

## 相关资源

* [自定义概念](/docs/agents/concepts/customization.md)
* [为你的项目自定义 AI 指南](/docs/agents/guides/customize-copilot-guide.md)
