---
ContentId: 164299e8-d27d-40b9-8b8d-a6e05df8ac69
DateApproved: 03/12/2026
MetaDescription: 使用 Foundry Toolkit for Visual Studio Code 构建、测试和部署 AI 应用程序。功能包括模型演练场、提示工程、批量评估、微调以及对 LLM 和 SLM 的多模态支持。
---
# Foundry Toolkit for Visual Studio Code

Foundry Toolkit for Visual Studio Code 帮助开发者和 AI 工程师使用生成式 AI 模型构建、测试和部署 AI 应用程序。你可以在本地或云端使用它，在一个地方管理完整的 AI 应用程序工作流。

Foundry Toolkit 提供与 OpenAI、Anthropic、Google 和 GitHub 等提供商的热门 AI 模型的无缝集成，同时还通过 ONNX 和 Ollama 支持本地模型。从模型发现和实验到提示工程和部署，Foundry Toolkit 在 VS Code 中简化了你的 AI 开发工作流。

## 关键功能

| 功能 | 描述 | 截图 |
|---------|-------------|------------|
| [创建代理](/docs/intelligentapps/create-agents.md) | 使用不同技术创建利用工具和向量的提示代理，或使用自定义代码的托管代理。 | ![显示创建代理界面的截图，展示了创建新代理的各种起点](./images/overview/create-agent.png) |
| [模型目录](/docs/intelligentapps/models.md) | 从多个来源发现和访问 AI 模型，包括 Microsoft Foundry、Foundry Local、GitHub、ONNX、Ollama、OpenAI、Anthropic 和 Google。并行比较模型，为你的用例找到最佳匹配。 | ![显示 Foundry Toolkit 模型目录界面的截图，展示了各种 AI 模型选项](./images/overview/model-catalog.png) |
| [演练场](/docs/intelligentapps/playground.md) | 用于实时模型测试的交互式聊天环境。尝试不同的提示、参数以及包括图像和附件在内的多模态输入。 | ![显示 Foundry Toolkit 演练场界面的截图，展示了聊天消息和模型参数控制](./images/overview/model-playground.png) |
| [代理构建器](/docs/intelligentapps/agentbuilder) | 简化的提示工程和代理开发工作流。创建复杂的提示，集成 MCP 工具，并使用结构化输出生成生产就绪的代码。 | ![显示代理构建器界面的截图，用于创建和管理 AI 代理](./images/overview/agent-builder.png) |
| [代理检查器](/docs/intelligentapps/agent-inspector) | 直接在 VS Code 中调试、可视化和迭代 AI 代理。 | ![显示代理检查器界面的截图，用于调试和可视化 AI 代理](./images/overview/agent-inspector.png) |
| [模型评估](/docs/intelligentapps/evaluation) | 使用数据集和标准指标进行全面的模型评估。使用内置评估器（F1 分数、相关性、相似度、连贯性）衡量性能，或创建自定义评估标准。 | ![显示模型评估界面的截图，展示了指标和性能分析工具](./images/overview/model-evaluation.png) |
| [工具目录](/docs/intelligentapps/tool-catalog) | 使用 Visual Studio Code 中的工具目录连接 Foundry 工具和本地 MCP 服务器工具，并通过代理构建器将其添加到代理中。 | ![显示工具目录的截图，列出了 Foundry 中托管的多个工具](./images/overview/tool-catalog.png) |
| [微调](/docs/intelligentapps/finetune) | 针对特定领域和需求自定义和适配模型。在本地使用 GPU 支持训练模型，或使用 Azure Container Apps 进行云端微调。 | ![显示微调界面的截图，展示了模型适配和训练控制](./images/overview/fine-tuning.png) |
| [模型转换](/docs/intelligentapps/modelconversion) | 转换、量化和优化机器学习模型以进行本地部署。将来自 Hugging Face 和其他来源的模型进行转换，以便在使用 CPU、GPU 或 NPU 加速的 Windows 上高效运行。 | ![显示模型转换界面的截图，展示了优化和转换 AI 模型的工具](./images/overview/model-conversion.png) |
| [跟踪](/docs/intelligentapps/tracing) | 监控和分析 AI 应用程序的性能。收集和可视化跟踪数据，以深入了解模型行为和性能。 | ![显示跟踪界面的截图，展示了监控 AI 应用程序的工具](./images/overview/tracing.png) |
| [性能分析（Windows ML）](/docs/intelligentapps/profiling) | 诊断进程的 CPU、GPU、NPU 资源使用情况、不同执行提供程序上的 ONNX 模型以及 Windows 机器学习事件。 | ![显示性能分析工具的截图](./images/overview/profiling.png) |

## Foundry Toolkit 面向哪些用户？

Foundry Toolkit 专为从事生成式 AI 的人员设计，从初学者到专家均适用：

### 开发者
* **应用程序开发者**：构建 AI 驱动的应用程序，需要集成语言模型
* **全栈开发者**：希望为 Web 和桌面应用程序添加智能功能
* **移动开发者**：在生产部署之前对 AI 功能进行原型设计

### AI 工程师和数据科学家
* **AI 工程师**：针对特定领域微调模型并将其部署到生产环境
* **数据科学家**：评估模型性能并比较不同方案
* **ML 工程师**：转换和优化模型以实现高效的本地部署

### 研究人员和教育工作者
* **AI 研究人员**：尝试不同的模型和提示工程技术
* **教育工作者**：教授 AI 概念并演示模型能力
* **学生**：学习生成式 AI 并进行实操模型交互

### 关键用例
* 探索和评估来自 Anthropic、OpenAI 和 GitHub 等提供商的模型
* 使用 ONNX 和 Ollama 在本地运行模型，以实现隐私保护和成本控制
* 构建和测试具有提示生成和 MCP 工具集成的代理
* 转换和优化模型以在不同硬件配置上部署

## 安装与设置

### 快速安装

> 由于 Foundry Toolkit 依赖 [.NET 运行时](https://learn.microsoft.com/en-us/dotnet/core/install/)，需要预先安装。

通过 Visual Studio Marketplace 安装扩展是最快捷的上手方式：

> <a class="install-extension-btn" href="vscode:extension/ms-windows-ai-studio.windows-ai-studio">安装 Foundry Toolkit for VS Code</a>

成功安装后，Foundry Toolkit 图标将出现在活动栏中。

### 手动安装

你也可以从 Visual Studio Code Marketplace 手动安装 Foundry Toolkit 扩展。按照[安装扩展](/docs/configure/extensions/extension-marketplace.md#install-an-extension)中详述的步骤操作。

> [!TIP]
>   或者，选择活动栏中的扩展图标。

* 搜索 **Foundry Toolkit for Visual Studio Code** 并从搜索结果中选择**安装**。

   ![显示 VS Code Marketplace 中 Foundry Toolkit 扩展及安装按钮的截图](./images/overview/install.png)

> [!TIP]
> 安装后请查看**新增功能**页面，了解每个版本的详细功能。

* 成功安装后，Foundry Toolkit 图标将出现在活动栏中。

### 验证并安装 Foundry Toolkit 先决条件（本地模型）

Foundry Toolkit 通过 [Foundry Local](https://www.foundrylocal.ai/) 提供本地 LLM 运行能力，运行 `Foundry Toolkit: 安装环境先决条件` 命令完成 Foundry 本地设置，以利用这些功能。

你可以使用 `Foundry Toolkit: 验证环境先决条件` 命令来验证先决条件的安装状态：

![显示 Foundry Toolkit 验证环境先决条件状态报告的截图](./images/overview/validate-prerequisites.png)

## 探索 Foundry Toolkit

Foundry Toolkit 直接包含 Foundry 侧边栏，因此你可以在一个地方管理 Microsoft Foundry 资源和 Foundry Toolkit 功能。

> [!NOTE]
> Foundry 侧边栏将于 2026 年 6 月 1 日停用。所有 Foundry 侧边栏功能现已在 Foundry Toolkit 侧边栏中可用。

Foundry Toolkit 在其自己的视图中打开，Foundry Toolkit 图标显示在 VS Code 活动栏上。该扩展有三个主要部分：我的资源、开发者工具以及帮助和反馈。

![显示 Foundry Toolkit 扩展并突出显示各部分的截图](./images/overview/initial-view.png)

- **我的资源**：此部分包含你在 Foundry Toolkit 中可访问的资源。**我的资源**部分是与你 Azure AI 资源交互的主要视图。它包含以下子部分：
  - **本地资源**：此部分包含你本地机器上的 AI 资源，例如本地模型、代理和工具。
  - **你的 Foundry 项目**：此部分显示连接到 Foundry Toolkit 的 Microsoft Foundry 项目。使用你的 Foundry 项目管理和部署 AI 资源，例如已部署的模型、提示代理、托管代理、连接、工具、向量存储和经典代理。
    - **模型**：查看项目中部署的模型，包括目标 URI 和身份验证密钥等终结点信息。
    - **提示代理**：查看项目中部署的提示代理（包括先前版本），通过演练场进行测试，查看对话并设置评估。
    - **工作流**：查看和创建新的声明式预定义操作序列，在可视化构建器中编排代理和业务逻辑。
    - **托管代理（预览版）**：查看项目中部署的托管代理。
    - **工具**：浏览、发现和配置来自 Microsoft Foundry 的模型上下文协议（MCP）服务器，或创建自定义 MCP 服务器。
    - **知识库**：查看和添加代理使用的新向量存储和其他数据源。
    - **经典**：查看在"经典"Foundry 中创建的代理和线程。
  - **已连接的资源**：此部分包含从 GitHub 模型等提供商连接到 Foundry Toolkit 的资源。
- **开发者工具**：此部分包含可用于构建和部署 AI 应用程序的工具。**开发者工具**视图是你找到可用于部署以及后续使用已部署模型和代理的工具的地方。它包含以下子部分：
  - **发现**：此部分包含帮助你发现和管理 AI 模型和工具的工具。它包含以下子部分：
    - **模型目录**：模型目录让你从多个来源发现和访问 AI 模型，包括 GitHub、ONNX、Ollama、OpenAI、Anthropic 和 Google。并行比较模型，为你的用例找到合适的模型。
    - **工具目录**：浏览和管理 Foundry Toolkit 中可用的工具。
  - **构建**：此部分是你找到可用于部署以及后续使用 Foundry Toolkit 中已部署代理的工具的地方。它包含以下子部分：
    - **创建代理**：轻松创建和部署代理。
    - **代理检查器**：直接在 VS Code 中调试、可视化和迭代 AI 代理。
    - **部署到 Microsoft Foundry**：将本地代理作为托管代理部署到 Microsoft Foundry。
    - **托管代理演练场**：托管代理演练场提供一个交互式环境来试验你的托管代理。
    - **模型演练场**：模型演练场提供一个交互式环境来试验生成式 AI 模型。
    - **模型转换**：模型转换工具帮助你在本地 Windows 平台上转换、量化、优化和评估预构建的机器学习模型。
    - **微调**：此工具允许你使用自定义数据集在带有 GPU 的本地计算环境中或在云端（Azure Container Apps）带有 GPU 的环境中对预训练模型运行微调作业。
  - **监控**：此部分用于监控和分析 AI 应用程序的性能。它包含以下子部分：
    - **跟踪**：跟踪功能帮助你监控和分析 AI 应用程序的性能。
    - **评估**：通过将模型、提示和代理的输出与真实数据进行比较并计算评估指标来对它们进行评估。
    - **模型性能分析（Windows ML）（预览版）**：此工具允许你诊断进程的 CPU、GPU、NPU 资源使用情况、不同执行提供程序上的 ONNX 模型以及 Windows 机器学习事件。
- **帮助和反馈**：此部分包含 Foundry Toolkit 文档、反馈、支持和 Microsoft 隐私声明的链接。它包含以下子部分：
  - **查看文档**：Foundry Toolkit 文档的链接。
  - **新增功能**：Foundry Toolkit 发行说明的链接。
  - **报告问题**：Foundry Toolkit GitHub 仓库问题页面的链接。
  - **加入社区**：加入 Foundry Toolkit 社区，分享反馈并与其他用户和 Foundry Toolkit 团队建立联系。

## 后续步骤

- 获取有关在 Foundry Toolkit 中[添加生成式 AI 模型](/docs/intelligentapps/models.md)的更多信息
- 使用[模型演练场](/docs/intelligentapps/playground.md)与模型交互
- 使用[代理构建器](/docs/intelligentapps/agentbuilder)开发代理，并使用[代理检查器](/docs/intelligentapps/agent-inspector)进行调试
