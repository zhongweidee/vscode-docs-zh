---
ContentId: c68118c4-453e-404a-97a5-4509850a2da2
DateApproved: 03/12/2026
MetaDescription: 从本地代理游乐场和本地可视化工具迁移到 Foundry Toolkit 中的代理检查器，以实现统一的调试、工作流可视化和代码导航。
---
# 从本地代理游乐场和本地可视化工具迁移到代理检查器

在本文中，你将学习如何将现有的 AI 代理项目从本地代理游乐场和本地可视化工具迁移到 Foundry Toolkit 中的代理检查器。代理检查器将聊天、工作流可视化和调试支持整合到一个统一的体验中。

Foundry Toolkit 将**本地代理游乐场**和**本地可视化工具**整合为一个统一的体验，称为**代理检查器**。这一转变改善了你开发 AI 代理的工作流。

### 代理检查器以开发者为中心的优势

代理检查器相较之前的工具有多项改进。

| 能力 | 之前的体验 | 代理检查器 |
|------------|---------------------|------------------|
| **调试** | 无集成调试功能 | 一键 F5 调试，支持断点、变量检查和单步执行 |
| **代码导航** | 无 | 双击工作流节点直接跳转到源代码 |
| **工作流 + 聊天** | 分离的工具（可视化工具 + 游乐场） | 统一的界面，聊天与可视化同时呈现 |
| **生产路径** | 手动配置部署 | 生成的代码使用 Hosted Agent SDK，可直接部署到 Microsoft Foundry |

### 主要改进

代理检查器相较于本地代理游乐场和本地可视化工具提供了以下改进。

1. **统一体验**：代理检查器将聊天和跟踪整合到一个界面中，因此你不再需要在不同的工具之间切换。

2. **调试支持**：在代理代码中设置断点、暂停执行、检查变量并逐步执行工作流逻辑。之前的独立工具不具备这些功能。

3. **Copilot 辅助设置**：GitHub Copilot 可以自动生成调试配置、端点和环境设置，减少手动配置错误。

4. **代码导航**：在查看工作流执行图时，双击任意节点即可立即在编辑器中打开对应的源文件。

5. **与生产环境一致**：代理检查器中使用的 `agentdev` CLI 和 Agent Framework SDK 与部署到 Microsoft Foundry 时使用的基础相同，确保你的本地开发与生产行为一致。

### 你的工作流有哪些变化

| 之前（旧工具） | 之后（代理检查器） |
|--------------------|-------------------------|
| 运行 `Microsoft Foundry: Open Visualizer for Hosted Agents` 命令 | 在 VS Code 中按 `kbstyle(F5)` |
| 在本地代理游乐场中手动输入端点 URL | 自动，在 launch.json 中配置 |
| 在单独的可视化工具选项卡中查看跟踪 | 在检查器中查看跟踪，与聊天并排显示 |
| 无调试功能 | 完整的断点和单步调试功能 |

---

## 迁移指南：现有项目

如果你的项目使用了**本地可视化工具**（通过 Microsoft Foundry 扩展）或**本地代理游乐场**，请按照以下步骤迁移到代理检查器。

### 先决条件

在开始之前，请确保你已具备：

- 已安装 **Python 3.10+**
- 已安装 **VS Code Foundry Toolkit 扩展**（代理检查器是该扩展的一部分）。有关更多信息，请参阅[安装 Foundry Toolkit](/docs/intelligentapps/overview.md#install-and-setup)。
- 你的代理已使用 [Agent Framework SDK（`agent-framework` 包）](https://github.com/microsoft/agent-framework)构建。

### 步骤 1：更新可观测性代码

移除之前的可视化工具设置代码：

代理检查器通过 `agent-dev-cli` 与你的代理服务器通信，不需要 OTEL 跟踪。如果你只需要工作流可视化，请移除以下代码。如果你想继续使用 Foundry Toolkit 中的跟踪功能，请将端口更改为 4317。

```python
from agent_framework.observability import setup_observability
setup_observability(vs_code_extension_port=4319)
```

### 步骤 2：添加 VS Code 调试配置

使用 GitHub Copilot 生成调试文件，或手动添加：

#### 选项 A：让 GitHub Copilot 配置（推荐）

1. 在 VS Code 中打开 GitHub Copilot。
2. 从代理模式中选择 **AIAgentExpert**。
3. 输入以下提示：
   ```
   Help me set up the debug environment for the workflow agent to use Foundry Toolkit Agent Inspector
   ```
4. GitHub Copilot 会为你生成 `.vscode/tasks.json` 和 `.vscode/launch.json` 文件。

#### 选项 B：手动配置

创建或更新你的 `.vscode` 文件夹，添加以下文件：

**`.vscode/tasks.json`**
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
    {
      "label": "Terminate All",
      "command": "echo ${input:terminate}",
      "type": "shell",
      "problemMatcher": []
    }
  ],
  "inputs": [
    { "id": "openTestTool", "type": "command", "command": "ai-mlstudio.openTestTool", "args": {"port": 8087} },
    { "id": "terminate", "type": "command", "command": "workbench.action.tasks.terminate", "args": "terminateAll" }
  ]
}
```

**`.vscode/launch.json`**
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

> [!NOTE]
> 如果你想要固定的配置，请将 tasks.json 中的 `${file}` 替换为你的代理入口点 Python 文件路径。

### 步骤 3：安装所需的依赖

安装 `debugpy` 和 `agent-dev-cli`：

```bash
pip install debugpy agent-dev-cli
```

### 步骤 4：使用代理检查器运行你的代理

1. 按 `kbstyle(F5)` 开始调试。
2. 代理检查器会自动：
   - 在端口 8087 上启动你的代理服务器
   - 在端口 5679 上附加 Python 调试器
   - 打开检查器界面，其中包含聊天游乐场和工作流可视化

### 故障排除

| 问题 | 解决方案 |
|-------|----------|
| 端口 8087 已被占用 | 检查其他正在运行的代理服务器并先停止它们 |
| 端口 5679 已被占用 | 可能另一个调试会话正在运行。关闭它并重试 |
| 断点未命中 | 确保已安装 `debugpy` 且端口 5679 与 launch.json 中的一致 |
| API 或框架错误 | Agent Framework 正在积极演进。将终端错误复制到 Copilot 中寻求帮助 |

如有其他问题或疑问，请访问 [Foundry Toolkit GitHub 仓库](https://github.com/microsoft/vscode-ai-toolkit/issues)。

## 你学到了什么

在本文中，你学习了如何：

- 从本地代理游乐场和本地可视化工具迁移到代理检查器。
- 更新你的代理代码和 VS Code 配置以获得新的调试体验。
- 使用代理检查器的新功能来改善代理开发工作流。
- 解决迁移和设置过程中的常见问题。
