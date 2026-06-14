---
ContentId: fb94d678-70e5-49e9-9192-a1294a2bc14d
DateApproved: 10/28/2025
MetaDescription: 开始使用 Foundry Toolkit Copilot 工具，简化和增强 AI 代理应用程序的开发。
---
# 使用 Foundry Toolkit Copilot 工具进行 AI 代理开发

Foundry Toolkit Copilot 工具可帮助你更快地构建 AI 代理应用程序。这些工具为你提供现成的功能、模板和最佳实践。你可以更快地创建使用 AI 的智能应用程序。

> [!NOTE]
> Foundry Toolkit Copilot 工具使用 VS Code 的[语言模型工具 API](/api/extension-guides/ai/tools.md)。这些工具通过聊天中的特定领域功能来扩展大型语言模型（LLM）。在代理模式下，VS Code 可以自动使用这些工具来处理用户提示并执行任务。

Foundry Toolkit Copilot 工具包含四个主要工具：

- Agent Code Gen（代理代码生成）
- AI Model Guide（AI 模型指南）
- Evaluation Code Gen（评估代码生成）
- Tracing Code Gen（跟踪代码生成）

## 先决条件

1. [Visual Studio Code](/download) - 最新版本以支持 MCP Server 开发。
1. [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) Visual Studio Code 扩展
1. [Foundry Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-ai.vscode-ai-toolkit) Visual Studio Code 扩展

## 在 Foundry Toolkit 中使用 Copilot 工具

安装先决条件后，你可以在聊天的代理模式下使用 Foundry Toolkit 提供的工具：

1. 打开聊天视图 `kb(workbench.action.chat.open)`，然后从下拉菜单中选择 **Agent**（代理）。

1. 选择 **Configure Tools...** 按钮查看可用工具列表。

    或者，你可以选择或取消选择要使用的工具。你也可以通过在搜索框中输入内容来搜索工具。

    ![Screenshot showing the Chat view in Visual Studio Code with Agent mode selected. The Tools button is highlighted, displaying a list of available tools including Agent Code Gen, AI Model Guide, Evaluation Code Gen, and Tracing Code Gen.](./images/copilottools/configure-tools.png)

## Agent Code Gen 工具

Agent Code Gen 工具有助于开发者更轻松地创建代理代码。使用此工具可以快速生成适用于 AI 代理的代码片段和模板。这种方法可以加快开发速度，并确保你的代码遵循 AI 代理开发的最佳实践。

### Agent Code Gen 工具的关键功能

Agent Code Gen 工具有几个重要的功能：

- **智能代理代码生成：** 该工具根据你的需求创建代理代码。
- **默认框架选择：** 如果你没有选择框架，该工具会自动选择 Microsoft Agent Framework SDK。

    需求示例：

    ```text
    Create an AI app that helps me to manage travel queries.
    ```

- **集成模型指导：** 该工具使用 **AI Model Guide** 在构建代理时为你提供模型详细信息。除非你选择其他模型，否则它会选择 **GPT4.1** 作为默认模型。

    需求示例：

    ```text
    Create an AI app to manage travel queries, use Microsoft Foundry models.
    ```

- **各种代理框架功能支持：** 该工具支持许多功能，如函数调用、MCP 和流式响应。

    需求示例：

    ```text
    Create an AI app to check the CNN headline, use local MCP playwright to fetch CNN web page.
    ```

- **工作流支持：** 该工具支持 Agent Framework 中的多种工作流，如顺序（Sequential）、分支选择（Switch-case）、循环（Loop）和人在回路（Human-In-The-Loop）。

    需求示例：

    ```text
    Build a conditional routing workflow based on email classification:
     - "Email Classifier": determines if email is spam or legitimate.
     - "Spam Handler": processes spam emails (if spam detected).
     - "Email Assistant": drafts responses for legitimate emails (if not spam).
    ```

## AI Model Guide 工具

AI Model Guide 工具有助于开发者为他们的应用程序选择最佳的 AI 模型。它推荐 Microsoft Foundry 和 GitHub 模型，包括最新和最流行的模型。该工具提供详细信息，如输入类型、上下文长度、成本以及指标（质量、速度、安全性）。它还会解释如何连接模型，例如 GitHub 端点和令牌。

该工具支持：

- 基本模型推荐：

    信息提示示例：

    ```text
    Which models are specifically designed for reasoning or math tasks?
    ```

    对于此示例，Copilot 从此工具收集模型信息，并推荐 o-series 模型用于推理或数学任务。

- 与 Code Gen 工具协同工作，在代理代码生成过程中提供模型选择：

    需求提示示例：

    ```text
    Create a quick demo AI Chat app
    ```

    对于此示例，Copilot 为聊天应用选择诸如免费的 GitHub GPT-4.1 等模型。

- 基于特定需求的模型选择：

    需求提示示例：

    ```text
    Create an AI app to manage travel queries using a cheap and fast azure model.
    ```

    对于此示例，Copilot 选择类似于 MicrosoftFoundry GPT-4.1-mini 的模型。

## Evaluation Code Gen 工具

Evaluation Code Gen 工具有助于你为 AI 应用或代理添加评估功能。它使用 Plan 工具在生成代码之前收集详细信息并准备资源。

### Evaluation Code Gen 工具的关键功能

Evaluation Code Gen 工具有四个主要功能：

- **分析和指标建议：** 审查你的 AI 应用并建议最佳测试。
- **合成查询生成：** 根据你的测试目标创建测试问题。
- **批量应用程序执行：** 使用测试问题多次运行你的应用并收集结果。
- **评估代码生成：** 使用 Azure AI Eval SDK 生成测试代码。

无论你的技能水平如何，这些工具都很有帮助。新开发者可以获得测试和工具的指导，有经验的开发者可以节省时间。Plan 工具会找到你的测试文件或询问它们的位置，从而轻松为你的应用添加测试。

需求提示示例：

- 示例 1：

    ```text
    Create an evaluation for my AI travel assistant application that assesses response accuracy and user satisfaction.
    ```

- 示例 2：

    ```text
    Measure the tool call accuracy of the agent.
    ```

## Tracing Code Gen 工具

Tracing Code Gen 工具分享了为 AI 应用添加跟踪功能的最佳实践。它有助于开发者轻松地监控和调试 AI 代理和工作流。
该工具支持以下语言和 SDK 的本地跟踪：

- （**Python**）agent-framework、azure-ai-inference、azure-ai-agents、azure-ai-projects、openai、openai-agents、langchain、google-genai、anthropic
- （**JS/TS**）azure-ai-inference、azure-ai-projects、openai、langchain、anthropic

需求提示示例：

```text
Enable tracing for my AI travel assistant application built with the agent-framework SDK in Python.
```

## Foundry 技能

Foundry Toolkit 还安装了两个技能，帮助你使用 GitHub Copilot 聊天来处理代理和其他资源，并生成脚手架代码。

- **microsoft-foundry-agent-framework-code-gen** - 使用 Microsoft Agent Framework SDK for Foundry 生成和修改 AI 代理代码。此技能为 Microsoft Foundry 搭建、构建和增强基于代理的应用程序，包括添加工具、修复问题以及实现多代理工作流。
- **microsoft-foundry** - 端到端地部署、评估和管理 AI 代理及 Foundry 资源。此技能处理 Foundry 代理的完整生命周期——从部署和执行到评估、提示优化和资源管理。

要使用它们，你无需做任何特殊操作。当你的对话上下文明确表明你想要使用 Foundry 或 Microsoft Agent Framework 时，这些技能就会被调用。

## 你学到了什么

在本文中，你学会了如何：

- 使用 AI 工具加速应用开发。
- 添加跟踪功能以监控和调试你的 AI 应用。
- 为你的任务选择最佳的 AI 模型。
- 将评估和测试纳入你的 AI 工作流。
