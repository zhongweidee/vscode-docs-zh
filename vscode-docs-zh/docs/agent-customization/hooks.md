---
ContentId: 9c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f
DateApproved: 6/10/2026
MetaDescription: 了解如何在 VS Code 中使用钩子（hooks），在代理会话的关键生命周期节点执行自定义 Shell 命令，实现自动化、验证和策略执行。
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- hooks
- automation
- lifecycle
- preToolUse
- postToolUse
---

# Visual Studio Code 中的代理钩子（预览版）

钩子（Hooks）使您能够在代理会话的关键生命周期节点执行自定义 Shell 命令。使用钩子可以自动化工作流程、强制执行安全策略、验证操作以及集成外部工具。

有关钩子在 AI 自定义框架中的定位，请参阅[自定义概念](/docs/agents/concepts/customization.md)。

本文介绍了如何在 VS Code 中配置和使用钩子。

> [!NOTE]
> 代理钩子目前处于预览阶段。配置格式和行为在未来的版本中可能会发生变化。

> [!IMPORTANT]
> 您的组织可能已禁用 VS Code 中的钩子功能。请联系您的管理员获取更多信息。有关详细信息，请参阅[企业策略](/docs/enterprise/policies.md)。

> [!TIP]
> 使用[代理自定义编辑器](/docs/agent-customization/overview.md#manage-customizations-in-the-editor)（预览版）在一个地方发现、创建和管理所有代理自定义配置。通过命令面板运行 **Chat: Open Customizations**。

钩子被设计为跨代理类型工作，包括本地代理、后台代理和云端代理。每个钩子接收结构化的 JSON 输入，并可返回 JSON 输出来影响代理行为。

## 为什么使用钩子？

钩子提供了确定性的、代码驱动的自动化。与引导代理行为的指令或自定义提示不同，钩子在特定的生命周期节点执行您的代码，并保证结果：

* **强制执行安全策略**：在执行之前阻止诸如 `rm -rf` 或 `DROP TABLE` 等危险命令，无论代理受到何种提示。

* **自动化代码质量**：在文件修改后自动运行格式化工具、代码检查工具或测试。

* **创建审计跟踪**：记录每个工具调用、命令执行或文件变更，用于合规性和调试。

* **注入上下文**：添加项目特定信息、API 密钥或环境详细信息，帮助代理做出更好的决策。

* **控制审批**：自动批准安全操作，同时对敏感操作要求确认。

## 快速入门：您的第一个钩子

以下示例创建一个在每个文件编辑后运行 Prettier 的钩子。在工作区中创建一个 `.github/hooks/format.json` 文件：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx prettier --write \"$TOOL_INPUT_FILE_PATH\""
      }
    ]
  }
}
```

保存此文件后，VS Code 会自动加载该钩子。下次代理编辑文件时，Prettier 将在更改的文件上运行。检查 **GitHub Copilot Chat Hooks** 输出通道以验证钩子已执行。

有关使用自定义脚本的更复杂钩子，请参阅[使用场景](#usage-scenarios)。

## 钩子生命周期事件

VS Code 支持八个钩子事件，它们在代理会话期间的特定时间点触发：

| 钩子事件 | 触发时机 | 常见用例 |
|------------|---------------|------------------|
| `SessionStart` | 用户提交新会话的第一个提示时 | 初始化资源、记录会话开始、验证项目状态 |
| `UserPromptSubmit` | 用户提交提示时 | 审计用户请求、注入系统上下文 |
| `PreToolUse` | 代理调用任何工具之前 | 阻止危险操作、要求审批、修改工具输入 |
| `PostToolUse` | 工具成功完成后 | 运行格式化工具、记录结果、触发后续操作 |
| `PreCompact` | 会话上下文被压缩之前 | 导出重要上下文、在截断之前保存状态 |
| `SubagentStart` | 子代理被创建时 | 跟踪嵌套代理使用情况、初始化子代理资源 |
| `SubagentStop` | 子代理完成时 | 聚合结果、清理子代理资源 |
| `Stop` | 代理会话结束时 | 生成报告、清理资源、发送通知 |

## 配置钩子

钩子通过存储在工作区或用户目录中的 JSON 文件进行配置。

### 钩子文件位置

VS Code 在以下位置搜索钩子配置文件：

> [!TIP]
> 在单体仓库（monorepo）中，启用 `setting(chat.useCustomizationsInParentRepositories)` 来发现来自父仓库根目录的钩子。了解更多关于[父仓库发现](/docs/agent-customization/overview.md#use-customizations-in-a-monorepo)的信息。

| 作用域 | 默认文件位置 |
|-------|-----------------------|
| 工作区 | `.github/hooks/*.json` |
| 工作区（Claude 格式） | `.claude/settings.json`、`.claude/settings.local.json` |
| 用户 | `~/.copilot/hooks`、`~/.claude/settings.json` |
| 自定义代理 | `.agent.md` 前言中的 `hooks` 字段（请参阅[代理作用域钩子](#agentscoped-hooks)） |
| 插件 | `hooks.json` 或 `hooks/hooks.json`，具体取决于插件格式（请参阅[插件中的钩子](/docs/agent-customization/agent-plugins.md#hooks-in-plugins)） |

对于同一事件类型，工作区钩子优先于用户钩子。

使用 `setting(chat.hookFilesLocations)` 设置来自定义加载哪些钩子文件。您可以指定文件夹路径（VS Code 加载该文件夹中的所有 `*.json` 文件）或直接指向单个 `.json` 文件的路径。仅支持相对路径和波浪号（`~`）路径。

默认值包含以下位置：

```json
"chat.hookFilesLocations": {
  ".github/hooks": true,
  ".claude/settings.local.json": true,
  ".claude/settings.json": true,
  "~/.claude/settings.json": true
}
```

要添加自定义位置，请向此设置添加条目：

```json
"chat.hookFilesLocations": {
  "custom/hooks": true,
  "~/my-hooks/security.json": true
}
```

将路径设置为 `false` 可禁用从该位置加载钩子，包括默认位置。例如，要停止从 Claude Code 配置文件加载钩子：

```json
"chat.hookFilesLocations": {
  ".claude/settings.json": false,
  ".claude/settings.local.json": false,
  "~/.claude/settings.json": false
}
```

### 代理作用域钩子

> [!NOTE]
> 代理作用域钩子目前处于预览阶段。

您可以直接在[自定义代理](/docs/agent-customization/custom-agents.md)的 YAML 前言中定义钩子。代理作用域钩子仅在该自定义代理处于活动状态时运行，无论是用户选择还是作为子代理调用。代理作用域钩子会与针对同一事件配置的任何工作区或用户级别钩子一起运行。

要启用代理作用域钩子，请将 `setting(chat.useCustomAgentHooks)` 设置为 `true`。

在代理前言中添加一个 `hooks` 字段，其结构与钩子配置文件相同：事件名称映射到钩子命令对象数组。

```markdown
---
name: "Strict Formatter"
description: "每次编辑后自动格式化代码的代理"
hooks:
  PostToolUse:
    - type: command
      command: "./scripts/format-changed-files.sh"
---

您是一个代码编辑代理。进行更改后，文件会自动格式化。
```

### 钩子配置格式

创建一个 JSON 文件，其中包含一个 `hooks` 对象，该对象包含每个事件类型的钩子命令数组。VS Code 使用与 Claude Code 和 Copilot CLI 相同的钩子格式，以实现兼容性：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/validate-tool.sh",
        "timeout": 15
      }
    ],
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx prettier --write \"$TOOL_INPUT_FILE_PATH\""
      }
    ]
  }
}
```

### 钩子命令属性

每个钩子条目必须包含 `type: "command"` 和至少一个命令属性：

| 属性 | 类型 | 描述 |
|----------|------|-------------|
| `type` | string | 必须为 `"command"` |
| `command` | string | 默认运行的命令（跨平台） |
| `windows` | string | Windows 特定的命令覆盖 |
| `linux` | string | Linux 特定的命令覆盖 |
| `osx` | string | macOS 特定的命令覆盖 |
| `cwd` | string | 工作目录（相对于仓库根目录） |
| `env` | object | 额外的环境变量 |
| `timeout` | number | 超时时间，单位为秒（默认：30） |

> [!NOTE]
> 特定操作系统的命令是根据扩展主机平台选择的。在远程开发场景中（SSH、容器、WSL），这可能与您本地的操作系统不同。

### 特定操作系统的命令

为每个操作系统指定不同的命令：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "./scripts/format.sh",
        "windows": "powershell -File scripts\\format.ps1",
        "linux": "./scripts/format-linux.sh",
        "osx": "./scripts/format-mac.sh"
      }
    ]
  }
}
```

执行服务会根据您的操作系统选择适当的命令。如果未定义特定操作系统的命令，则会回退到 `command` 属性。

## 钩子输入和输出

钩子通过 stdin（输入）和 stdout（输出）使用 JSON 与 VS Code 通信。

### 通用输入字段

每个钩子通过 stdin 接收一个 JSON 对象，其中包含以下通用字段：

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `timestamp` | string | 钩子触发时的 ISO 8601 时间戳 |
| `cwd` | string | （可选）代理会话的工作目录 |
| `session_id` | string | （可选）当前代理会话的唯一标识符 |
| `hook_event_name` | string | 钩子事件的名称（例如 `PreToolUse`） |
| `transcript_path` | string | （可选）包含会话对话记录的文件的绝对路径 |

> [!NOTE]
> `transcript_path` 是为了方便而提供的——例如用于日志记录、审计或轻量级检查，如检查会话期间是否读取了某个文件。记录文件格式不是稳定的钩子 API，在未来的 VS Code 版本中可能会发生变化。请尽可能优先使用文档化的钩子输入字段（`tool_name`、`tool_input`、`prompt` 等）。

### 通用输出格式

钩子可以通过 stdout 返回 JSON 来影响代理行为。所有钩子都支持以下输出字段：

```json
{
  "continue": true,
  "stopReason": "违反安全策略",
  "systemMessage": "单元测试失败"
}
```

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `continue` | boolean | 设置为 `false` 以停止处理（默认：`true`） |
| `stopReason` | string | 当 `continue` 为 `false` 时的停止原因（显示给用户） |
| `systemMessage` | string | 显示给用户的警告消息 |

### 退出代码

钩子的退出代码决定了 VS Code 如何处理结果：

| 退出代码 | 行为 |
|-----------|----------|
| `0` | 成功：将 stdout 解析为 JSON |
| `2` | 阻止错误：停止处理并显示错误给模型 |
| 其他 | 非阻止警告：显示警告给用户，继续处理 |

### 选择如何返回数据

钩子有多种方式来控制代理行为：退出代码、顶层输出字段（`continue`、`stopReason`）和钩子特定的输出字段（`hookSpecificOutput`）。按以下方式组合使用它们：

* **退出代码 2** 是阻止操作的最简单方式。钩子的 stderr 作为上下文显示给模型。不需要 JSON 输出。
* **JSON 输出中的 `continue: false`** 会停止整个代理会话。使用 `stopReason` 告诉用户原因。这比阻止单个工具调用更严格。
* **`hookSpecificOutput`** 提供了针对每个钩子事件的细粒度控制。例如，`PreToolUse` 钩子使用 `permissionDecision` 来允许、拒绝或提示单个工具调用，而不会停止会话。
* **`systemMessage`** 在聊天中向用户显示警告，无论其他决策如何。

当多种控制机制一起使用时，最严格的获胜。例如，如果钩子返回 `continue: false` 和 `permissionDecision: "allow"`，会话仍然会停止。

## PreToolUse

`PreToolUse` 钩子在代理调用工具之前触发。

### PreToolUse 输入

除了通用字段外，`PreToolUse` 钩子还会接收：

```json
{
  "tool_name": "editFiles",
  "tool_input": { "files": ["src/main.ts"] },
  "tool_use_id": "tool-123"
}
```

### PreToolUse 输出

`PreToolUse` 钩子可以通过 `hookSpecificOutput` 对象控制工具执行：

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "策略阻止了破坏性命令",
    "updatedInput": { "files": ["src/safe.ts"] },
    "additionalContext": "用户对生产文件只有只读权限"
  }
}
```

| 字段 | 值 | 描述 |
|-------|--------|-------------|
| `permissionDecision` | `"allow"`、`"deny"`、`"ask"` | 控制工具审批 |
| `permissionDecisionReason` | string | 显示给用户的原因 |
| `updatedInput` | object | 修改后的工具输入（可选） |
| `additionalContext` | string | 为模型提供的额外上下文 |

**权限决策优先级**：当同一工具调用运行多个钩子时，最严格的决策获胜：

1. `deny`（最严格）：阻止工具执行
2. `ask`：需要用户确认
3. `allow`（最宽松）：自动批准执行

**`updatedInput` 格式**：要确定 `updatedInput` 的格式，请打开[代理日志](/docs/agents/agent-troubleshooting/chat-debug-view.md#agent-debug-log-panel)并找到记录的工具模式。如果 `updatedInput` 与预期的模式不匹配，它将被忽略。

## PostToolUse

`PostToolUse` 钩子在工具成功完成后触发。

### PostToolUse 输入

除了通用字段外，`PostToolUse` 钩子还会接收：

```json
{
  "tool_name": "editFiles",
  "tool_input": { "files": ["src/main.ts"] },
  "tool_use_id": "tool-123",
  "tool_response": "文件编辑成功"
}
```

### PostToolUse 输出

`PostToolUse` 钩子可以为模型提供额外的上下文，或阻止进一步处理：

```json
{
  "decision": "block",
  "reason": "后处理验证失败",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "已编辑的文件存在需要修复的 lint 错误"
  }
}
```

| 字段 | 值 | 描述 |
|-------|--------|-------------|
| `decision` | `"block"` | 阻止进一步处理（可选） |
| `reason` | string | 阻止的原因（显示给模型） |
| `hookSpecificOutput.additionalContext` | string | 注入到对话中的额外上下文 |

## UserPromptSubmit

`UserPromptSubmit` 钩子在用户提交提示时触发。

### UserPromptSubmit 输入

除了通用字段外，`UserPromptSubmit` 钩子还会接收一个 `prompt` 字段，其中包含用户提交的文本。

`UserPromptSubmit` 钩子仅使用通用输出格式。

## SessionStart

`SessionStart` 钩子在新代理会话开始时触发。

### SessionStart 输入

除了通用字段外，`SessionStart` 钩子还会接收：

```json
{
  "source": "new"
}
```

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `source` | string | 会话的启动方式。目前始终为 `"new"`。 |

### SessionStart 输出

`SessionStart` 钩子可以向代理的对话中注入额外的上下文：

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "项目：my-app v2.1.0 | 分支：main | Node：v20.11.0"
  }
}
```

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `additionalContext` | string | 添加到代理对话中的上下文 |

## Stop

`Stop` 钩子在代理会话结束时触发。当作用域为自定义代理时，`Stop` 钩子也会被视为 `SubagentStop`。

### Stop 输入

除了通用字段外，`Stop` 钩子还会接收：

```json
{
  "stop_hook_active": false
}
```

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `stop_hook_active` | boolean | 当代理因前一个 stop 钩子而继续运行时为 `true`。检查此值以防止代理无限运行。 |

### Stop 输出

`Stop` 钩子可以阻止代理停止：

```json
{
  "hookSpecificOutput": {
    "hookEventName": "Stop",
    "decision": "block",
    "reason": "在完成之前运行测试套件"
  }
}
```

| 字段 | 值 | 描述 |
|-------|--------|-------------|
| `decision` | `"block"` | 阻止代理停止 |
| `reason` | string | 当 decision 为 `"block"` 时必需。告知代理为什么应该继续。 |

> [!IMPORTANT]
> 当 `Stop` 钩子阻止代理停止时，代理会继续运行，额外的轮次将消耗 [AI 积分](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals)。始终检查 `stop_hook_active` 字段以防止代理无限运行。

## SubagentStart

`SubagentStart` 钩子在子代理被创建时触发。

### SubagentStart 输入

除了通用字段外，`SubagentStart` 钩子还会接收：

```json
{
  "agent_id": "subagent-456",
  "agent_type": "Plan"
}
```

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `agent_id` | string | 子代理的唯一标识符 |
| `agent_type` | string | 代理名称（例如，内置代理的 `"Plan"` 或自定义代理名称） |

### SubagentStart 输出

`SubagentStart` 钩子可以向子代理的对话中注入额外的上下文：

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SubagentStart",
    "additionalContext": "此子代理应遵循项目编码指南"
  }
}
```

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `additionalContext` | string | 添加到子代理对话中的上下文 |

## SubagentStop

`SubagentStop` 钩子在子代理完成时触发。

### SubagentStop 输入

除了通用字段外，`SubagentStop` 钩子还会接收：

```json
{
  "agent_id": "subagent-456",
  "agent_type": "Plan",
  "stop_hook_active": false
}
```

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `agent_id` | string | 子代理的唯一标识符 |
| `agent_type` | string | 代理名称（例如，内置代理的 `"Plan"` 或自定义代理名称） |
| `stop_hook_active` | boolean | 当子代理因前一个 stop 钩子而继续运行时为 `true`。检查此值以防止子代理无限运行。 |

### SubagentStop 输出

`SubagentStop` 钩子可以阻止子代理停止：

```json
{
  "decision": "block",
  "reason": "在完成之前验证子代理结果"
}
```

| 字段 | 值 | 描述 |
|-------|--------|-------------|
| `decision` | `"block"` | 阻止子代理停止 |
| `reason` | string | 当 decision 为 `"block"` 时必需。告知子代理为什么应该继续。 |

## PreCompact

`PreCompact` 钩子在对话上下文被压缩之前触发。

### PreCompact 输入

除了通用字段外，`PreCompact` 钩子还会接收：

```json
{
  "trigger": "auto"
}
```

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `trigger` | string | 压缩的触发方式。当对话超出提示预算时，为 `"auto"`。 |

`PreCompact` 钩子仅使用通用输出格式。

## 通过 UI 配置钩子

您可以通过多种方式通过交互式 UI 配置钩子：

* 在聊天输入中键入 `/hooks` 并按 `kbstyle(Enter)`。
* 打开命令面板（`kb(workbench.action.showCommands)`）并运行 **Chat: Configure Hooks**。
* 选择聊天视图顶部的 **设置** 图标（<i class="codicon codicon-gear"></i>），然后选择 **Hooks**。

在配置钩子菜单中：

1. 从列表中选择一个钩子事件类型。

1. 选择现有钩子进行编辑，或选择 **添加新钩子** 来创建一个。

1. 选择或创建一个钩子配置文件。

该命令会在编辑器中打开钩子文件，并将光标定位在命令字段上，准备进行编辑。

### 使用 AI 生成钩子

您可以使用 AI 生成钩子配置。在聊天中键入 `/create-hook` 并描述您想要的自动化（例如，"每次文件编辑后运行 ESLint"）。代理会提出澄清性问题，并生成具有适当事件类型、命令和设置的钩子配置文件。

## 使用场景

以下示例演示了常见的钩子模式。

<details>
<summary>阻止危险的终端命令</summary>

创建一个 `PreToolUse` 钩子来阻止破坏性命令：

**.github/hooks/security.json**：
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/block-dangerous.sh",
        "timeoutSec": 5
      }
    ]
  }
}
```

**scripts/block-dangerous.sh**：
```bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
TOOL_INPUT=$(echo "$INPUT" | jq -r '.tool_input')

if [ "$TOOL_NAME" = "runTerminalCommand" ]; then
  COMMAND=$(echo "$TOOL_INPUT" | jq -r '.command // empty')

  if echo "$COMMAND" | grep -qE '(rm\s+-rf|DROP\s+TABLE|DELETE\s+FROM)'; then
    echo '{"hookSpecificOutput":{"permissionDecision":"deny","permissionDecisionReason":"安全策略阻止了破坏性命令"}}'
    exit 0
  fi
fi

echo '{"continue":true}'
```

</details>

<details>
<summary>编辑后自动格式化代码</summary>

在任何文件修改后自动运行 Prettier：

**.github/hooks/formatting.json**：
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "./scripts/format-changed-files.sh",
        "windows": "powershell -File scripts\\format-changed-files.ps1",
        "timeout": 30
      }
    ]
  }
}
```

**scripts/format-changed-files.sh**：
```bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')

if [ "$TOOL_NAME" = "editFiles" ] || [ "$TOOL_NAME" = "createFile" ]; then
  FILES=$(echo "$INPUT" | jq -r '.tool_input.files[]? // .tool_input.path // empty')

  for FILE in $FILES; do
    if [ -f "$FILE" ]; then
      npx prettier --write "$FILE" 2>/dev/null
    fi
  done
fi

echo '{"continue":true}'
```

</details>

<details>
<summary>记录工具使用情况用于审计</summary>

创建所有工具调用的审计跟踪：

**.github/hooks/audit.json**：
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/log-tool-use.sh",
        "env": {
          "AUDIT_LOG": ".github/hooks/audit.log"
        }
      }
    ]
  }
}
```

**scripts/log-tool-use.sh**：
```bash
#!/bin/bash
INPUT=$(cat)
TIMESTAMP=$(echo "$INPUT" | jq -r '.timestamp')
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
SESSION_ID=$(echo "$INPUT" | jq -r '.sessionId')

echo "[$TIMESTAMP] Session: $SESSION_ID, Tool: $TOOL_NAME" >> "${AUDIT_LOG:-audit.log}"
echo '{"continue":true}'
```

</details>

<details>
<summary>对特定工具要求审批</summary>

强制对修改基础设施的工具进行手动确认：

**.github/hooks/approval.json**：
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/require-approval.sh"
      }
    ]
  }
}
```

**scripts/require-approval.sh**：
```bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')

# 应始终要求审批的工具
SENSITIVE_TOOLS="runTerminalCommand|deleteFile|pushToGitHub"

if echo "$TOOL_NAME" | grep -qE "^($SENSITIVE_TOOLS)$"; then
  echo '{"hookSpecificOutput":{"permissionDecision":"ask","permissionDecisionReason":"此操作需要手动审批"}}'
else
  echo '{"hookSpecificOutput":{"permissionDecision":"allow"}}'
fi
```

</details>

<details>
<summary>在会话开始时注入项目上下文</summary>

在会话开始时提供项目特定信息：

**.github/hooks/context.json**：
```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "./scripts/inject-context.sh"
      }
    ]
  }
}
```

**scripts/inject-context.sh**：
```bash
#!/bin/bash
PROJECT_INFO=$(cat package.json 2>/dev/null | jq -r '.name + " v" + .version' || echo "未知项目")
BRANCH=$(git branch --show-current 2>/dev/null || echo "未知")

cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "项目：$PROJECT_INFO | 分支：$BRANCH | Node：$(node -v 2>/dev/null || echo '未安装')"
  }
}
EOF
```

</details>

## 安全性

如果代理有权编辑钩子运行的脚本，那么它有能力在自己的运行期间修改这些脚本，并执行它编写的代码。我们建议使用 `chat.tools.edits.autoApprove` 来禁止代理在未经手动审批的情况下编辑钩子脚本。

## 故障排除

### 查看钩子诊断信息

要查看已加载的钩子并检查配置错误：

1. 选择 **查看日志** 以查看所有日志。

1. 查找 "Load Hooks" 以查看已加载的钩子及其加载来源。

### 查看钩子输出

要查看钩子的输出和错误：

1. 打开 **输出** 面板。

1. 从频道列表中选择 **GitHub Copilot Chat Hooks**。

### 常见问题

**钩子未执行**：验证钩子文件位于 `.github/hooks/` 中且具有 `.json` 扩展名。检查 `type` 属性是否设置为 `"command"`。

**权限被拒绝错误**：确保您的钩子脚本具有执行权限（`chmod +x script.sh`）。

**超时错误**：增加 `timeout` 值或优化您的钩子脚本。默认值为 30 秒。

**JSON 解析错误**：验证您的钩子脚本向 stdout 输出有效的 JSON。使用 `jq` 或 JSON 库来构造输出。

## 常见问题

### VS Code 如何处理 Claude Code 钩子配置？

默认情况下，VS Code 从 `.claude/settings.json`、`.claude/settings.local.json` 和 `~/.claude/settings.json` 读取钩子配置。VS Code 解析 Claude Code 的钩子配置格式，包括匹配器语法。目前，VS Code 忽略匹配器值，因此钩子会在所有工具调用上运行，无论匹配器如何。

如果您正在将 Claude Code 钩子适配到 VS Code，请注意以下差异：

* **工具输入属性名称**：Claude Code 对工具输入属性使用 snake_case（例如 `tool_input.file_path`），而 VS Code 工具使用 camelCase（例如 `tool_input.filePath`）。更新您的钩子脚本以读取正确的属性名称。
* **工具名称**：Claude Code 和 VS Code 使用不同的工具名称。例如，Claude Code 对文件操作使用 `Write` 和 `Edit`，而 VS Code 使用诸如 `create_file` 和 `replace_string_in_file` 等工具名称。检查 `tool_name` 输入字段中的工具名称，并相应更新您的钩子逻辑。
* **匹配器被忽略**：诸如 `"Edit|Write"` 这样的钩子匹配器会被解析但不会应用。所有钩子都会在每个匹配的事件上运行，无论匹配器中的工具名称是什么。

### VS Code 如何处理 Copilot CLI 钩子配置？

VS Code 解析 Copilot CLI 钩子配置，并将 lowerCamelCase 钩子事件名称（如 `preToolUse`）转换为 VS Code 使用的 PascalCase 格式（`PreToolUse`）。`bash` 和 `powershell` 命令属性映射到特定操作系统的命令：`powershell` 映射到 `windows`，`bash` 映射到 `osx` 和 `linux`。

## 安全注意事项

> [!CAUTION]
> 钩子以与 VS Code 相同的权限执行 Shell 命令。请仔细审查钩子配置，尤其是在使用来自不受信任来源的钩子时。

* **审查钩子脚本**：在启用之前检查所有钩子脚本，尤其是在共享仓库中。

* **限制钩子权限**：使用最小权限原则。钩子只应拥有它们所需的访问权限。

* **验证输入**：钩子脚本接收来自代理的输入。验证并清理所有输入以防止注入攻击。

* **保护凭据安全**：切勿在钩子脚本中硬编码密钥。使用环境变量或安全的凭据存储。

## 相关资源

* [在聊天中使用工具](/docs/chat/chat-tools.md) - 了解工具审批和执行
* [自定义代理](/docs/agent-customization/custom-agents.md) - 创建专门的代理配置
* [子代理](/docs/agents/subagents.md) - 将任务委派给上下文隔离的子代理
* [安全注意事项](/docs/agents/security.md) - VS Code 中 AI 安全的最佳实践
