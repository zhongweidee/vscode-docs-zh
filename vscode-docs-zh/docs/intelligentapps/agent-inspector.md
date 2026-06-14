---
ContentId: 7ea83c06-5ed4-41ff-8929-fc1c6ab5ffee
DateApproved: 03/17/2026
MetaDescription: 使用 Foundry Toolkit 中的 Agent Inspector 调试、可视化并迭代改进 AI 代理。
---
# 使用 Foundry Toolkit 中的 Agent Inspector 开发代理

本文介绍如何使用 Agent Inspector 直接在 VS Code 中调试、可视化和改进你的 AI 代理。按 F5 以完整的调试器支持启动代理，实时查看流式响应，并观察多个代理如何协同工作。

![显示 Agent Inspector 界面的截图](./images/agent-inspector/test_tool_visualizer.png)

## 优势

Agent Inspector 为你的代理开发工作流提供了以下功能。

| 优势 | 描述 |
|---------|-------------|
| **一键 F5 调试** | 通过断点、变量检查和单步调试启动你的代理。 |
| **由 Copilot 自动配置** | GitHub Copilot 生成代理代码并配置调试、端点和环境。 |
| **生产就绪代码** | 生成的代码使用 Hosted Agent SDK，可直接部署到 Microsoft Foundry。 |
| **实时可视化** | 查看流式响应、工具调用以及代理之间的工作流图表。 |
| **快速代码导航** | 双击工作流节点可跳转到对应的代码。 |

## 先决条件

- **Python 3.10+** 和 **VS Code Foundry Toolkit** 扩展
- [**适用于 VS Code 的 Python** 扩展](https://marketplace.visualstudio.com/items?itemName=ms-python.python)，用于调试支持（如果使用 Python）

## 快速入门

选择以下选项之一，快速开始在代理项目中使用 Agent Inspector。

![显示 Agent Inspector 快速入门的截图](./images/agent-inspector/inspector-new.png)

### 选项 1：搭建示例项目（推荐）

1. 在活动栏中选择 **Foundry Toolkit** > **Developer Tools** > **Build** > **Agent Inspector**。
1. 选择 **Try a Sample** 以生成一个预配置的项目。
1. 按照 README 中的说明运行并调试示例代理。

### 选项 2：使用 Copilot 创建新代理

1. 在活动栏中选择 **Foundry Toolkit** > **Developer Tools** > **Build** > **Agent Inspector**。
1. 选择 **create with Copilot** 并提供代理需求。
1. GitHub Copilot 生成代理代码并自动配置调试。
1. 按照 Copilot 输出中的说明运行并调试你的代理。

### 选项 3：从现有代理开始

如果你已经有一个使用 Microsoft Agent Framework SDK 构建的代理，请让 GitHub Copilot 为 Agent Inspector 设置调试。

1. 从 Agent 下拉菜单中选择 **AIAgentExpert**。
1. 输入提示：

   ```prompt-AIAgentExpert
   Help me set up the debug environment for the workflow agent to use Foundry Toolkit Agent Inspector
   ```

1. Github Copilot 生成必要的配置文件以及使用 Agent Inspector 运行和调试你的代理的说明。

## 手动配置调试

将这些文件添加到你的 `.vscode` 文件夹中，为你的代理设置调试，并将 `${file}` 替换为你的代理的 `entrypoint` Python 文件路径。

<details>
<summary><b>tasks.json</b></summary>

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Validate prerequisites",
      "type": "aitk",
      "command": "debug-check-prerequisites",
      "args": { "portOccupancy": [5679, 8087] }
    },
    {
      "label": "Run Agent Server",
      "type": "shell",
      "command": "${command:python.interpreterPath} -m debugpy --listen 127.0.0.1:5679 -m agentdev run ${file} --port 8087",
      "isBackground": true,
      "dependsOn": ["Validate prerequisites"],
      "problemMatcher": {
        "pattern": [{"regexp": "^.*$", "file": 0, "location": 1, "message": 2}],
        "background": { "activeOnStart": true, "beginsPattern": ".*", "endsPattern": "Application startup complete|running on" }
      }
    },
    {
      "label": "Open Inspector",
      "type": "shell",
      "command": "echo '${input:openTestTool}'",
      "presentation": {"reveal": "never"},
      "dependsOn": ["Run Agent Server"]
    },
    { "label": "Terminate All", "command": "echo ${input:terminate}", "type": "shell", "problemMatcher": [] }
  ],
  "inputs": [
    { "id": "openTestTool", "type": "command", "command": "ai-mlstudio.openTestTool", "args": {"port": 8087} },
    { "id": "terminate", "type": "command", "command": "workbench.action.tasks.terminate", "args": "terminateAll" }
  ]
}
```
</details>

<details>
<summary><b>launch.json</b></summary>

```json
{
  "version": "0.2.0",
  "configurations": [{
    "name": "Debug Agent",
    "type": "debugpy",
    "request": "attach",
    "connect": { "host": "localhost", "port": 5679 },
    "preLaunchTask": "Open Inspector",
    "postDebugTask": "Terminate All"
  }]
}
```
</details>

## 使用 Inspector

### 聊天调试区
发送消息以触发工作流并实时查看执行情况。
![聊天消息区域](./images/agent-inspector/chat-area-new.png)

### 工作流可视化
对于 `WorkflowAgent`，查看包含代理之间消息流的执行图。你还可以：
1. 选择每个节点以查看代理的输入和输出。
1. 双击任意节点以导航到代码。
1. 在代码中设置断点以暂停执行并检查变量。![显示工作流可视化的截图](./images/agent-inspector/break-point.png)

## 故障排除

| 问题 | 解决方案 |
|-------|----------|
| **API 错误** | Agent Framework 正在持续演进。将终端错误复制给 Copilot 以获取修复方案。 |
| **连接失败** | 验证服务器是否在预期端口上运行（默认值：8087）。 |
| **断点未命中** | 确保已安装 `debugpy` 且 launch.json 中的端口匹配。 |

## 工作原理

当你按下 F5 时，Inspector 会执行以下操作：

1. **启动代理服务器：** `agentdev` CLI 将你的代理封装为一个 HTTP 服务器，监听端口 8087，并在端口 5679 上附加 debugpy。
1. **发现代理：** UI 从 `/agentdev/entities` 获取可用的代理/工作流。
1. **流式执行：** 聊天输入发送到 `/v1/responses`，该端点通过 SSE 流式返回事件，用于实时可视化。
1. **启用代码导航：** 双击工作流节点可在编辑器中打开对应的源文件。

### 架构概述

`agentdev` CLI 启动一个本地 TestToolServer，该服务器将你的代理封装为一个监听端口 8087 的 HTTP 服务器。Inspector UI（一个 VS Code webview）通过 HTTP 和 WebSocket 与此服务器通信，以列出代理、流式传输 SSE 响应并触发编辑器中的代码导航。EventMapper 将 Agent Framework 事件转换为与 OpenAI 兼容的 SSE 格式，Python 调试器（debugpy）在端口 5679 上附加以进行单步调试。你的代理或工作流通过 Agent Framework SDK 的 `run_stream()` 运行。

![显示 Agent Inspector 架构的图表](./images/agent-inspector/architecture-diagram.png)
