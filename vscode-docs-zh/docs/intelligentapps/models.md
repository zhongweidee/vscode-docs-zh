---
ContentId: 52ad40fe-f352-4e16-a075-7a9606c5df3b
DateApproved: 03/12/2026
MetaDescription: 按发布者和来源查找流行的生成式 AI 模型。使用 URL 托管自有模型，或选择 Ollama 模型。
---
# 在 Foundry Toolkit 中探索模型

Foundry Toolkit 为各种生成式 AI 模型提供了全面的支持。

在模型目录中，你可以浏览和使用来自多种托管来源的模型：

- 托管在 GitHub 上的模型，如 Llama3、Phi-3 和 Mistral，包括即用即付选项。
- 由发布者直接提供的模型，包括 OpenAI 的 ChatGPT、Anthropic 的 Claude 和 Google 的 Gemini。
- 托管在 Microsoft Foundry 上的模型。
- 从 Foundry Local、Ollama 和 ONNX 等仓库本地下载的模型。
- 通过自带模型（BYOM）集成访问的自定义自托管或外部部署的模型。

直接从模型目录中将模型部署到 Foundry，简化你的工作流。

> [!NOTE]
> 使用 Microsoft Foundry、Foundry Local 和 GitHub 模型添加到 Foundry Toolkit，与 GitHub Copilot 配合使用。有关更多信息，请参阅[更改聊天模型](/docs/agent-customization/language-models.md#change-the-model-for-chat)。

![Foundry Toolkit model catalog displaying various generative AI models](./images/models/models.png)

## 查找模型

要在模型目录中查找模型：

1. 在活动栏中选择 Foundry Toolkit 视图
1. 选择**开发者工具** > **发现** > **模型目录**以打开模型目录
1. 使用筛选器缩小可用模型列表。

    - **托管方**：Foundry Toolkit 支持 Microsoft Foundry、Foundry Local、GitHub、ONNX、OpenAI、Ollama、Anthropic、Google、NVIDIA NIM、MiniMax、Kimi、GLM 和 Windows AI API 作为模型托管来源。
    - **发布者**：AI 模型的发布者，如 Microsoft、Meta、Google、OpenAI、Anthropic、Mistral AI 等。
    - **功能**：模型支持的功能，如 `Text Attachment`、`Image Attachment`、`Web Search`、`Structured Outputs` 等。
    - **模型类型**：筛选可在远程运行或在 CPU、GPU 或 NPU 上本地运行的模型。此筛选器取决于本地可用性。
    - **微调支持**：显示可用于微调的模型。
1. 按不同类别浏览模型，例如：
    - **热门模型**是跨各种任务和领域广泛使用的模型的精选列表。
    - **Microsoft Foundry 托管模型**提供对托管在 Microsoft Foundry 上的热门模型的轻松访问。
    - **GitHub 模型**提供对托管在 GitHub 上的热门模型的轻松访问。最适合快速原型设计和实验。
    - **本地模型**选择托管在 Windows 版 Microsoft Foundry 或 Ollama 上的模型，支持通过 GGUF 量化的 CPU。
1. 或者，使用搜索框按名称或描述查找特定模型

## 添加模型

根据你的起点，将模型添加到 Foundry Toolkit 中有不同的流程。

### 从目录中添加模型

要从模型目录中添加模型：

1. 在模型目录中找到你要添加的模型
1. 添加模型的流程因提供者略有不同：

    - **Microsoft Foundry**：在你的 Microsoft Foundry 项目中部署模型。请参阅[将模型部署到 Microsoft Foundry](#deploy-a-model-to-microsoft-foundry) 以获取详细说明。

    - **自定义模型**，远程托管、需要 API 密钥并具有 OpenAI 聊天补全兼容终结点 URL。请参阅[添加自定义模型](#add-a-custom-model) 以获取详细说明。

    - **Foundry Local**：Foundry Local 下载并运行模型，根据你的网速可能需要几分钟。模型在 localhost 页面上可用，并添加到 Foundry Toolkit 中。了解更多信息，请参阅[什么是 Foundry Local？](https://learn.microsoft.com/azure/ai-foundry/foundry-local/what-is-foundry-local?view=foundry-classic&preserve-view=true)。

    - **Ollama**：模型从 Ollama 下载并添加到 Foundry Toolkit 中。请参阅[添加 Ollama 模型](#add-ollama-models) 以获取详细说明。

    - **GitHub**：Foundry Toolkit 会要求你提供 GitHub 凭据以访问模型仓库。身份验证后，模型将直接添加到 Foundry Toolkit 中。
        > [!NOTE]
        > Foundry Toolkit 现已[支持 GitHub 即用即付模型](/docs/intelligentapps/playground.md#github-pay-as-you-go-model-support)，因此你可以在超过免费层限制后继续工作。

    - **ONNX**：要添加 ONNX 模型，首先使用[模型转换工具](/docs/intelligentapps/modelconversion.md)将其转换为 Foundry Toolkit 模型格式。转换后，将模型添加到 Foundry Toolkit 中。

一旦模型添加完成，它将出现在树视图的**我的资源/模型**下，你可以在[**演练场**](/docs/intelligentapps/playground.md)或[**智能体构建器**](/docs/intelligentapps/agentbuilder.md)中使用它。

## 将模型部署到 Microsoft Foundry

直接从 Foundry Toolkit 将模型部署到 Microsoft Foundry。在云端运行模型并通过终结点访问它。

1. 在模型目录中，选择你要部署的模型。
1. 从下拉菜单中选择**部署到 Microsoft Foundry**，或直接点击**部署到 Microsoft Foundry**按钮，如下方截图所示：

    ![Screenshot of the Foundry Toolkit interface showing the model catalog with a model selected and the Deploy to Microsoft Foundry button highlighted.](./images/models/catalog-deploy-dropdown.png)

1. 在**模型部署**选项卡中，输入所需信息，如模型名称、描述和任何其他设置，如下方截图所示：

    ![Screenshot of the Foundry Toolkit interface showing the model deployment tab with fields for model name, description, and additional settings.](./images/models/deploy-to-azure-dialog.png)

1. 选择**部署到 Microsoft Foundry**以开始部署过程。
1. 通过查看详细信息并选择**部署**来确认部署。
1. 部署完成后，模型将在 Foundry Toolkit 的**我的资源** > **你的项目名称** > **模型**部分中可用，你可以在演练场或智能体构建器中使用它。

### 添加自定义模型

对于可通过互联网访问且具有 OpenAI 兼容终结点的自托管或已部署模型，将其添加到 Foundry Toolkit 中以在演练场中使用。

1. 有两种添加自定义模型的方式：

    - 在模型目录中，选择**+ 自带模型**按钮

      ![Screenshot of the Foundry Toolkit interface showing the model catalog with the Bring Your Own Model button highlighted.](./images/models/custom-2.png)

    - 在模型目录中，滚动到"添加自定义模型"部分，选择**添加自定义模型**按钮。

      ![Screenshot of the Foundry Toolkit interface showing the model catalog with the Add a custom model button highlighted.](./images/models/custom-3.png)

1. 将出现一个对话框，提示你输入 OpenAI 兼容终结点 URL、模型名称、API 密钥和其他所需信息。

      ![Screenshot of the dialog requesting the URL of the custom remote model.](./images/models/custom-4.png)

### 添加 Ollama 模型

Ollama 使许多流行的生成式 AI 模型能够通过 GGUF 量化在 CPU 上本地运行。如果 Ollama 已安装在你的本地机器上并且已下载了 Ollama 模型，则将它们添加到 Foundry Toolkit 中以在模型演练场中使用。

在 Visual Studio Code 的 Microsoft Foundry Toolkit 扩展中使用 Ollama 模型的先决条件是安装 [Ollama](https://ollama.com/download)（已在 Ollama v0.4.1 上测试）。

要将本地 Ollama 添加到 Foundry Toolkit 中：

1. 从前面提到的入口点之一，选择**添加 Ollama 模型**。

    - **我的资源** > **本地资源**，选择**模型**旁边的 **+** 按钮。

      ![Screenshot of the plus button next to models in local resources.](./images/models/my-resources-local-resources-models.png)

      这将打开添加模型选择器。选择"添加 Ollama 模型"。

      ![Select model type to add](./images/models/select-type.png)

    - 在模型目录中，向下滚动到"本地模型"部分，选择"Ollama"选项卡。选择列出的模型旁边的**添加**按钮，或选择**添加你自己的模型**。

      ![Screenshot of the plus button next to models in local resources.](./images/models/model-catalog-local-models-ollama.png)

1. 阅读 Ollama 是第三方模型提供者的确认提示后，选择**继续**。

    ![SCreenshot of Ollama acknowledgement.](./images/models/ollama-acknowledgement.png)

1. 接下来，选择**从 Ollama 库中选择模型**。这将显示你已在 Ollama 中安装的模型。使用复选框选择你要在 Foundry Toolkit 中使用的模型。

    ![Select model type to add](./images/models/ollama-model-selector.png)

    > [!NOTE]
    > Foundry Toolkit 仅显示已在 Ollama 中下载且尚未添加到 Foundry Toolkit 中的模型。要从 Ollama 下载模型，可以运行 `ollama pull <model-name>`。要查看 Ollama 支持的模型列表，请参阅 [Ollama 库](https://ollama.com/library)或参阅 [Ollama 文档](https://github.com/ollama/ollama)。

    或者，如果你在不同的终结点上启动 Ollama 运行时，选择**提供自定义 Ollama 终结点**以指定一个 Ollama 终结点。

1. 你现在应该能在树视图的模型列表中看到选中的一个或多个 Ollama 模型。

    > [!NOTE]
    > Ollama 模型尚不支持附件。Foundry Toolkit 使用 [OpenAI 兼容终结点](https://github.com/ollama/ollama/blob/main/docs/openai.md)连接到 Ollama，目前尚不支持附件。

## 选择模型进行测试

你可以在演练场中测试模型的聊天补全功能。

使用模型目录中模型卡片上的操作：

- **在演练场中试用**：加载所选模型以在[演练场](/docs/intelligentapps/playground.md)中进行测试。
- **在智能体构建器中试用**：在[智能体构建器](/docs/intelligentapps/agentbuilder.md)中加载所选模型以构建 AI 智能体。

## 管理模型

你可以在 Foundry Toolkit 侧边栏的**我的资源/模型**部分中管理你的模型：

- 查看已添加到 Foundry Toolkit 的模型列表。
- 右键点击模型以访问以下选项：
  - **在演练场中加载**：在[演练场](/docs/intelligentapps/playground.md)中加载模型进行测试。
  - **复制模型名称**：将模型名称复制到剪贴板，以便在其他上下文中使用，如代码集成。
    - **刷新**：刷新模型配置以确保你拥有最新的设置。
    - **编辑**：修改模型设置，如 API 密钥或终结点。
    - **删除**：从 Foundry Toolkit 中移除模型。
    - **关于此模型**：查看有关模型的详细信息，包括其发布者、来源和支持的功能。

- 右键点击 `ONNX` 部分标题以访问以下选项：
  - **启动服务器**：启动 ONNX 服务器以在本地运行 ONNX 模型。
  - **停止服务器**：如果 ONNX 服务器正在运行，则停止它。
  - **复制终结点**：将 ONNX 服务器终结点复制到剪贴板，以便在其他上下文中使用，如代码集成。

## 许可证和登录

某些模型需要发布者或托管服务的许可证和账户才能登录。在这种情况下，你需要先提供这些信息，然后才能在[模型演练场](/docs/intelligentapps/playground.md)中运行模型。

## 你学到了什么

在本文中，你学习了如何：

- 在 Foundry Toolkit 中探索和管理生成式 AI 模型。
- 从各种来源查找模型，包括 Microsoft Foundry、Foundry Local、GitHub、ONNX、OpenAI、Anthropic、Google、Ollama 和自定义终结点。
- 将模型添加到你的工具包并将其部署到 Microsoft Foundry。
- 添加自定义模型，包括 Ollama 和 OpenAI 兼容模型，并在演练场或智能体构建器中测试它们。
- 使用模型目录查看可用模型并为你的 AI 应用需求选择最佳匹配。
- 使用筛选器和搜索快速查找模型。
- 按类别浏览模型，如热门、GitHub、ONNX 和 Ollama。
- 使用模型转换工具转换和添加自定义 ONNX 模型。
- 在"我的资源/模型"中管理模型，包括编辑、删除、刷新和查看详细信息。
- 启动和停止 ONNX 服务器并为本地模型复制终结点。
- 在测试模型之前处理某些模型的许可证和登录要求。
