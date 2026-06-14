---
ContentId: 276ecd8f-2a76-467e-bf82-846d49c13ab5
DateApproved: 6/10/2026
MetaDescription: 了解如何创建自定义代理（以前称为自定义聊天模式），为特定工作流和开发场景定制 VS Code 中的 AI 聊天行为。
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- 自定义代理
- 聊天模式
- 代理角色
- 交接
- 子代理
- copilot
- ai
- 自定义
- 代码审查
---
# VS Code 中的自定义代理

自定义代理使您可以配置 AI 采用不同的角色，以针对特定的开发角色和任务量身定制。例如，您可以创建安全审查员、规划者、解决方案架构师或其他专业角色的代理。每个角色都可以拥有自己的行为方式、可用工具和指令。

您还可以使用交接来创建代理之间的引导式工作流。只需一次选择即可从一个专业代理无缝切换到另一个。例如，从规划代理直接进入实现代理，或者将相关上下文交接给代码审查员。

本文介绍如何在 VS Code 中创建和管理自定义代理。

> [!TIP]
> **代理、提示文件还是技能？** 当您需要一个具有特定工具限制、模型偏好或角色间交接的持久角色时，请使用自定义代理。对于不需要工具限制的一次性任务，请使用[提示文件](/docs/agent-customization/prompt-files.md)。对于带有脚本和资源的可移植、可复用功能，请使用[代理技能](/docs/agent-customization/agent-skills.md)。

> [!TIP]
> 使用[代理自定义编辑器](/docs/agent-customization/overview.md#manage-customizations-in-the-editor)（预览版）在一个地方发现、创建和管理所有代理自定义项。从命令面板运行 **聊天：打开自定义项**。

## 什么是自定义代理？

[内置代理](/docs/agents/agent-types/local-agents.md)为 VS Code 中的聊天提供了通用配置。要获得更量身定制的聊天体验，您可以创建自己的自定义代理。

自定义代理由一组指令和工具组成，这些指令和工具会在您切换到该代理时应用。例如，"规划"代理可以包含生成实现计划的指令，并仅使用只读工具。通过创建自定义代理，您可以快速切换到该特定配置，而无需每次手动选择相关工具和指令。

自定义代理定义在 `.agent.md` Markdown 文件中，可以存储在工作区中供他人使用，也可以存储在您的用户配置文件中，以便在不同工作区中复用。

您可以在[后台代理](/docs/agents/agent-types/copilot-cli.md)和[云端代理](/docs/agents/agent-types/cloud-agents.md)中复用自定义代理，从而使用相同的专业配置运行自主任务。

## 为什么使用自定义代理？

不同的任务需要不同的能力。规划代理可能只需要用于研究和分析的只读工具，以防止意外的代码更改，而实现代理则需要完整的编辑能力。自定义代理使您可以精确指定每个任务可用的工具，确保 AI 具备适合该工作的能力。

自定义代理还使您可以提供专门的指令，定义 AI 应如何运作。例如，规划代理可以指示 AI 收集项目上下文并生成详细的实现计划，而代码审查代理则可能专注于识别安全漏洞并建议改进。这些专门的指令确保每次切换到该代理时都能获得一致且适合任务的响应。

> [!NOTE]
> 子代理可以使用自定义代理运行。了解有关[使用自定义代理运行子代理](/docs/agents/subagents.md#run-a-custom-agent-as-a-subagent)（实验性）的更多信息。

## 交接

交接使您可以创建引导式的顺序工作流，在代理之间过渡，并提供建议的下一步操作。聊天响应完成后，会出现交接按钮，让用户可以将相关上下文和预填充的提示词移到下一个代理。

交接对于编排多步骤工作流非常有用，它让开发人员可以在进入下一步之前审查和批准每一步。例如：

* **规划 → 实现**：在规划代理中生成计划，然后交接给实现代理开始编码。
* **实现 → 审查**：完成实现后，切换到代码审查代理检查质量和安全问题。
* **编写失败的测试 → 编写通过的测试**：生成比大型实现更容易审查的失败测试，然后交接以通过实现所需的代码更改使这些测试通过。

要在代理文件中定义交接，请将它们添加到前置元数据中。每个交接指定目标代理、按钮标签以及可选的发送提示词：

```markdown
---
description: 生成实现计划
tools: ['search', 'web']
handoffs:
  - label: 开始实现
    agent: implementation
    prompt: 现在实现上面概述的计划。
    send: false
    model: GPT-5.2 (copilot)
---
```

当用户看到交接按钮并选择它时，他们会切换到目标代理，提示词已预填充。如果 `send: true`，提示词会自动提交以开始下一个工作流步骤。

## 自定义代理文件位置

您可以为特定工作区定义自定义代理，也可以在用户级别定义，使其在所有工作区中可用。下表列出了基于作用域的自定义代理的默认文件位置。您可以使用 `setting(chat.agentFilesLocations)` 设置配置工作区自定义代理文件的其他文件位置。

| 作用域 | 默认文件位置 |
|-------|-----------------------|
| 工作区 | `.github/agents` 文件夹 |
| 工作区（Claude 格式） | `.claude/agents` 文件夹 |
| 用户配置文件 | `~/.copilot/agents` 或您的用户数据（特定于您的 VS Code 配置文件） |

要在用户数据中创建自定义代理，请使用代理自定义编辑器或使用 **聊天：新建自定义代理** 命令。

> [!TIP]
> 在单仓中，启用 `setting(chat.useCustomizationsInParentRepositories)` 可以从父仓库根目录发现自定义代理。了解有关[父仓库发现](/docs/agent-customization/overview.md#use-customizations-in-a-monorepo)的更多信息。

## 自定义代理文件结构

自定义代理文件是 Markdown 文件，使用 `.agent.md` 扩展名，具有以下结构。

> [!NOTE]
> VS Code 将工作区 `.github/agents` 文件夹中的任何 `.md` 文件检测为自定义代理。

### 页眉（可选）

页眉格式为 YAML 前置元数据，包含以下字段：

| 字段 | 描述 |
| --- | --- |
| `description`     | 自定义代理的简要描述，在聊天输入字段中显示为占位符文本。 |
| `name`            | 自定义代理的名称。如果未指定，则使用文件名。 |
| `argument-hint`   | 在聊天输入字段中显示的可选提示文本，用于指导用户如何与自定义代理交互。 |
| `tools`           | 可供此自定义代理使用的工具或工具集名称列表。可以包括内置工具、工具集、MCP 工具或扩展贡献的工具。要包含 MCP 服务器的所有工具，请使用 `<server name>/*` 格式。<br/>了解有关[聊天中使用工具](/docs/chat/chat-tools.md)的更多信息。 |
| `agents`          | 可在此代理中作为[子代理](/docs/agents/subagents.md)使用的代理名称列表。使用 `*` 允许所有代理，或使用空数组 `[]` 阻止任何子代理使用。如果指定 `agents`，请确保在 `tools` 属性中包含 `agent` 工具。要创建在 `agents` 中列出自身的自引用代理，请启用 `setting(chat.subagents.allowInvocationsFromSubagents)`。了解有关[嵌套子代理](/docs/agents/subagents.md#nested-subagents)的更多信息。 |
| `model`           | 运行提示词时使用的 AI 模型。指定单个模型名称（字符串）或优先模型列表（数组）。指定数组时，系统会按顺序尝试每个模型，直到找到可用的模型。如果未指定，则使用模型选择器中当前选择的模型。 |
| `user-invocable`  | 可选布尔标志，控制代理是否出现在聊天的代理下拉列表中（默认为 `true`）。设置为 `false` 可创建只能作为[子代理](/docs/agents/subagents.md)或以编程方式访问的代理。 |
| `disable-model-invocation` | 可选布尔标志，阻止代理被其他代理作为子代理调用（默认为 `false`）。 |
| `infer`           | **已弃用。** 请改用 `user-invocable` 和 `disable-model-invocation`。以前，`infer: true`（默认值）使代理在选择器中可见且可作为子代理使用。`infer: false` 则两者都隐藏。新字段提供独立控制：使用 `user-invocable: false` 从选择器中隐藏，同时仍允许子代理调用；或使用 `disable-model-invocation: true` 阻止子代理调用，同时保留在选择器中。 |
| `target`          | 自定义代理的目标环境或上下文（`vscode` 或 `github-copilot`）。 |
| `mcp-servers`     | 可选的 Model Context Protocol（MCP）服务器配置 json 列表，用于 [GitHub Copilot 中的自定义代理](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)（target: `github-copilot`）。 |
| `handoffs`        | 可选的建议下一步操作或提示词列表，用于在自定义代理之间过渡。交接按钮在聊天响应完成后作为交互式建议出现。 |
| `handoffs.label`  | 交接按钮上显示的文本。 |
| `handoffs.agent`  | 要切换到的目标代理标识符。 |
| `handoffs.prompt` | 发送到目标代理的提示文本。 |
| `handoffs.send`   | 可选布尔标志，自动提交提示词（默认为 `false`） |
| `handoffs.model`  | 交接执行时使用的可选语言模型。使用格式为 `模型名称 (vendor)` 的限定模型名称，例如 `GPT-5 (copilot)` 或 `Claude Sonnet 4.5 (copilot)`。 |
| `hooks`（预览版）  | 限定于此代理的可选钩子命令。此处定义的钩子仅在此代理处于活动状态时运行，无论是用户调用还是作为子代理调用。使用与[钩子配置文件](/docs/agent-customization/hooks.md#hook-configuration-format)相同的格式。需要启用 `setting(chat.useCustomAgentHooks)`。 |

> [!NOTE]
> 如果使用自定义代理时某个工具不可用，则该工具会被忽略。

### 正文

自定义代理文件正文包含自定义代理的实现，格式为 Markdown。您可以在此处提供希望 AI 在此自定义代理中遵循的特定提示词、指南或任何其他相关信息。

您可以使用 Markdown 链接引用其他文件，例如复用指令文件。

要在正文中引用代理工具，请使用 `#tool:<tool-name>` 语法。例如，要引用 `fetch` 工具，请使用 `#tool:web/fetch`。

当您在聊天视图中选择自定义代理时，自定义代理文件正文中的指南会被添加到用户聊天提示词之前。

### 示例

<details>
<summary>规划代理示例</summary>

以下代码片段展示了一个"规划"自定义代理文件的示例，该文件生成实现计划且不进行任何代码编辑。有关更多社区贡献的示例，请参阅 [Awesome Copilot 仓库](https://github.com/github/awesome-copilot/tree/main)。

```markdown
---
description: 为新功能或重构现有代码生成实现计划。
name: Planner
tools: ['web/fetch', 'search/codebase', 'search/usages']
model: ['Claude Opus 4.5', 'GPT-5.2']  # 按顺序尝试模型
handoffs:
  - label: 实现计划
    agent: agent
    prompt: 实现上面概述的计划。
    send: false
---
# 规划指令
您处于规划模式。您的任务是为新功能或重构现有代码生成一个实现计划。
不要进行任何代码编辑，只需生成计划。

计划由 Markdown 文档组成，描述实现计划，包括以下部分：

* 概述：功能或重构任务的简要描述。
* 需求：功能或重构任务的需求列表。
* 实现步骤：实现功能或重构任务的详细步骤列表。
* 测试：需要实现的验证功能或重构任务的测试列表。
```

</details>

<details>
<summary>代理编排示例</summary>

以下示例展示了一个"功能构建器"代理，它协调专业化的子代理以完成先研究后实现的工作流。主代理使用 `agents` 属性限制哪些代理可以作为子代理被调用。

**feature-builder.agent.md** - 协调代理：

```markdown
---
name: Feature Builder
description: 先研究再实现来构建功能
tools: ['agent']
agents: ['Researcher', 'Implementer']
---
您是一个功能构建器。对于每个任务：
1. 使用 Researcher 代理收集上下文并在代码库中查找相关模式
2. 使用 Implementer 代理根据研究发现进行实际的代码更改
```

**researcher.agent.md** - 只读研究代理：

```markdown
---
name: Researcher
description: 研究代码库模式并收集上下文
tools: ['search/codebase', 'web/fetch', 'search/usages']
---
使用只读工具进行全面研究。返回发现的摘要。
```

**implementer.agent.md** - 代码编辑代理：

```markdown
---
name: Implementer
description: 基于提供的上下文实现代码更改
tools: ['edit', 'read/terminalLastCommand']
---
遵循现有代码模式实现更改。进行最小化、有重点的编辑。
```

</details>

<details>
<summary>带作用域钩子的代理示例（预览版）</summary>

以下示例展示了一个在其前置元数据中定义钩子的自定义代理。`PostToolUse` 钩子在文件编辑后运行格式化程序，并且仅在此代理处于活动状态时运行。启用 `setting(chat.useCustomAgentHooks)` 以使用此功能。

```markdown
---
name: "严格格式化程序"
description: "每次编辑后自动格式化代码的代理"
hooks:
  PostToolUse:
    - type: command
      command: "./scripts/format-changed-files.sh"
---

您是一个代码编辑代理。更改后，文件会自动格式化。
```

在[代理钩子](/docs/agent-customization/hooks.md)中了解有关钩子的更多信息。

</details>

### Claude 代理格式

`.claude/agents` 文件夹中的代理文件使用纯 `.md` 文件并支持 Claude 特定的前置元数据属性：

| 字段 | 描述 |
|-------|-------------|
| `name` | 代理名称（必需） |
| `description` | 代理的功能描述 |
| `tools` | 允许的工具的逗号分隔字符串（例如，`"Read, Grep, Glob, Bash"`） |
| `disallowedTools` | 要阻止的工具的逗号分隔字符串 |

VS Code 将 Claude 特定的工具名称映射到相应的 VS Code 工具。VS Code `.agent.md` 格式（使用 YAML 数组表示工具）和 Claude 格式（使用逗号分隔字符串）均受支持。

> [!NOTE]
> VS Code 还会检测 `.claude/agents` 文件夹中的 `.md` 文件，遵循 [Claude 子代理格式](https://code.claude.com/docs/en/sub-agents)。这使您可以在 VS Code 和 Claude Code 中使用相同的代理定义。

## 创建自定义代理

您可以在工作区或用户配置文件中创建自定义代理文件。

> [!TIP]
> 在聊天输入中键入 `/agents` 可快速打开**配置自定义代理**菜单。

1. 在聊天视图中，选择**配置聊天**（齿轮图标）打开代理自定义编辑器，然后选择**代理**选项卡。

1. 从下拉菜单中选择**新建代理（工作区）**或**新建代理（用户）**，具体取决于您要将代理文件存储在何处。

    ![Screenshot of the Agent Customizations editor, showing the Agents tab and the dropdown to create a new custom agent.](images/customization/create-custom-agent.png)

    或者，从命令面板（`kb(workbench.action.showCommands)`）运行**聊天：新建自定义代理**命令。

    > [!TIP]
    > 您可以使用 `setting(chat.agentFilesLocations)` 设置配置 VS Code 搜索自定义代理文件的其他位置。这对于跨项目共享代理或将它们保存在工作区之外的中心位置非常有用。

1. 选择位置并输入自定义代理的文件名。这是显示在代理下拉列表中的默认名称。

1. 在新创建的 `.agent.md` 文件中提供自定义代理的详细信息。

    * 在文件顶部的 YAML 前置元数据中填写自定义代理的名称、描述、工具和其他设置。
    * 在文件正文中添加自定义代理的指令。

您可以通过在代理自定义编辑器中打开现有自定义代理来修改它们。

### 使用 AI 生成自定义代理

您可以使用 AI 基于角色描述生成自定义代理。在代理模式聊天中键入 `/create-agent` 并描述您想要的角色（例如，"一个安全审查代理"）。代理会提出澄清问题并生成带有适当工具、指令和前置元数据的 `.agent.md` 文件。

您还可以从正在进行的对话中提取自定义代理。例如，经过多轮调试会话后，询问"为此类任务创建一个代理"将该工作流捕获为可复用的自定义代理。

您也可以通过从代理自定义编辑器的下拉菜单中选择**生成代理**来生成自定义代理。

## 自定义代理下拉列表

如果您有多个自定义代理，可以自定义哪些出现在代理下拉列表中。要显示或隐藏特定的自定义代理：

1. 从代理下拉列表中选择**配置自定义代理**。

1. 将鼠标悬停在列表中的自定义代理上，然后选择眼睛图标以在代理下拉列表中显示或隐藏它。

## 工具列表优先级

当您在自定义代理和提示文件中都使用 `tools` 时，提示文件的工具优先。有关完整的优先级顺序，请参阅提示文件文档中的[工具列表优先级](/docs/agent-customization/prompt-files.md#tool-list-priority)。

## 在团队中共享自定义代理

要在团队中共享自定义代理，您可以创建工作区级别的自定义代理（`.github/agents` 文件夹）。如果您想在组织内的多个工作区中共享自定义代理，可以在 GitHub 组织级别定义它们。

VS Code 会自动检测您的账户有权访问的组织级别定义的自定义代理。这些代理会与内置代理以及您的个人和工作区自定义代理一起出现在聊天的代理下拉列表中。

要启用发现组织级别的自定义代理，请将 `setting(github.copilot.chat.organizationCustomAgents.enabled)` 设置为 `true`。

在 GitHub 文档中了解如何[为您的组织创建自定义代理](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)。

## 常见问题解答

### 自定义代理与聊天模式不同吗？

自定义代理以前称为自定义聊天模式。功能保持不变，但术语已更新，以更好地反映其为特定任务定制 AI 行为的目的。

如果您有现有的 `.chatmode.md` 文件，请将其重命名为 `.agent.md` 以转换为新的自定义代理格式，并将其放置在适当的位置（`setting(chat.agentFilesLocations)`）以继续使用它们。

### 如何删除自定义代理？

要从 VS Code 中完全删除自定义代理：

* 从工作区或用户配置文件中删除相应的 `.agent.md` 文件。
* 从代理下拉列表中选择**配置自定义代理**，将鼠标悬停在列表中的自定义代理上，然后选择垃圾桶图标。

要删除由扩展贡献的自定义代理，您需要卸载提供它的扩展。如果不想卸载扩展，可以改为从代理下拉列表中隐藏该自定义代理。按照[自定义代理下拉列表](#customize-the-agents-dropdown-list)中的步骤操作。

### 如何知道自定义代理的来源？

自定义代理可以来自不同的来源：内置代理、配置文件中的用户定义代理、当前工作区中的工作区定义代理、组织定义代理或扩展贡献的代理。

要识别自定义代理的来源：

1. 从代理下拉列表中选择**配置自定义代理**。
1. 将鼠标悬停在列表中的自定义代理上。来源位置会显示在工具提示中。

> [!TIP]
> 使用聊天自定义诊断视图查看所有已加载的自定义代理、提示文件、指令文件和技能以及任何错误。在聊天视图中右键单击并选择**诊断**。了解有关[在 VS Code 中排查 AI 问题](/docs/agents/agent-troubleshooting/troubleshooting.md)的更多信息。

## 安全考虑事项

自定义代理可以限制可用的工具，这让您可以控制 AI 能做什么。对于对安全敏感的工作流，请创建具有只读工具的代理以防止意外的修改。在仓库中共享代理时，请审查工具列表和指令以确保它们遵循最小权限原则。

## 相关资源

* [使用代理进行规划](/docs/agents/planning.md)
* [使用自定义指令定制 AI](/docs/agent-customization/custom-instructions.md)
* [创建可复用的提示文件](/docs/agent-customization/prompt-files.md)
* [在聊天中使用工具](/docs/chat/chat-tools.md)
