---
ContentId: c35d24d0-5d2c-493d-9635-10601a13848e
DateApproved: 12/11/2024
MetaDescription: 查找有关使用 Foundry Toolkit 的常见问题解答（FAQ）。获取故障排除建议。
---
# Foundry Toolkit 常见问题解答

## 模型

### 如何找到我的远程模型终结点和身份验证标头？

以下是一些关于如何在常见的 OpenAI 服务提供商中查找终结点和身份验证标头的示例。对于其他提供商，您可以查阅他们关于聊天补全终结点和身份验证标头的文档。

#### 示例 1：Azure OpenAI

1. 转到 [Azure OpenAI Studio](https://oai.azure.com/) 中的 **部署** 边栏选项卡，然后选择一个部署，例如 `gpt-4o`。如果您还没有部署，请查看 [Azure OpenAI 文档](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource?pivots=web-portal) 了解如何创建部署。

    ![选择模型部署](./images/faq/6-aoai-deployments.png)

1. 在 **终结点** 部分的 **目标 URI** 字段中找到您的聊天补全终结点

    ![查找模型终结点](./images/faq/7-aoai-model.png)

1. 从 **终结点** 部分的 **密钥** 属性获取 API 密钥。

    复制 API 密钥后，将其按 `api-key: <YOUR_API_KEY>` 的格式添加到 Foundry Toolkit 中的身份验证标头。请参阅 [Azure OpenAI 服务文档](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#request-header-2) 了解有关身份验证标头的更多信息。

#### 示例 2：OpenAI

1. 目前，聊天补全终结点固定为 `https://api.openai.com/v1/chat/completions`。请参阅 [OpenAI 文档](https://platform.openai.com/docs/api-reference/chat/create) 了解更多信息。

1. 转到 [OpenAI 文档](https://platform.openai.com/docs/api-reference/authentication) 并选择 `API Keys` 或 `Project API Keys` 来创建或检索您的 API 密钥。

    复制 API 密钥后，将其按 `Authorization: Bearer <YOUR_API_KEY>` 的格式填写到 Foundry Toolkit 中的身份验证标头。请参阅 OpenAI 文档了解更多信息。

    ![查找模型访问密钥](./images/faq/8-openai-key.png)

### 如何编辑终结点 URL 或身份验证标头？

如果您输入了错误的终结点或身份验证标头，可能会在推理时遇到错误。

1. 打开 VS Code `setting.json` 文件：

    - 在身份验证失败通知中选择 `Edit settings.json`

        ![编辑](./images/faq/9-edit.png)

    - 或者，在命令面板（`kb(workbench.action.showCommands)`）中输入 `Open User Settings (JSON)`

1. 搜索 `windowsaistudio.remoteInfereneEndpoints` 设置

1. 编辑或删除现有的终结点 URL 或身份验证标头。

    ![在设置中编辑终结点](./images/faq/10-edit-settings.png)

    保存设置后，树视图或游乐场中的模型列表将自动刷新。

### 如何加入 OpenAI o1-mini 或 OpenAI o1-preview 的等候名单？

OpenAI o1 系列模型专为处理推理和问题解决任务而设计，具有更高的专注度和能力。这些模型会花更多时间处理和理解用户的请求，使其在科学、编程、数学等领域表现出色。例如，o1 可以被医疗研究人员用于标注细胞测序数据，被物理学家用于生成量子光学所需的复杂数学公式，并被各个领域的开发人员用于构建和执行多步骤工作流。

> [!IMPORTANT]
> o1-preview 模型仅限有限访问。要在游乐场中试用该模型，需要注册，并且访问权限根据 Microsoft 的资格标准授予。

访问 [GitHub 模型市场](https://aka.ms/github-model-marketplace) 查找 OpenAI o1-mini 或 OpenAI o1-preview 并加入等候名单。

### 我可以使用自己的模型或来自 Hugging Face 的其他模型吗？

如果您自己的模型支持 OpenAI API 合约，您可以在云中托管它，并将其作为自定义模型 [添加到 Foundry Toolkit](/docs/intelligentapps/models.md)。您需要提供关键信息，例如模型终结点 URL、访问密钥和模型名称。

## 微调

### 微调设置很多，我是否需要全部关注？

不需要，您可以仅使用默认设置和我们的示例数据集进行测试。您也可以选择自己的数据集，但需要调整一些设置。请参阅 [微调教程](https://github.com/AI-Mou/windows-ai-studio/blob/main/walkthrough-hf-dataset.md) 了解更多信息。

### Foundry Toolkit 没有搭建微调项目

请确保在安装扩展之前检查 [扩展先决条件](https://github.com/AI-Mou/windows-ai-studio/blob/main/README.md#prerequisites)。

### 我拥有 NVIDIA GPU 设备，但先决条件检查失败

如果您拥有 NVIDIA GPU 设备，但先决条件检查失败并显示"未检测到 GPU"，请确保已安装最新的驱动程序。您可以在 [NVIDIA 网站](https://www.nvidia.com/Download/index.aspx?lang=en-us) 检查并下载驱动程序。

此外，请确保其已安装在路径中。要验证，请从命令行运行 `nvidia-smi`。

### 我生成了项目，但 Conda 激活找不到环境

可能是设置环境时出现了问题。您可以在工作区内通过运行 `bash /mnt/[PROJECT_PATH]/setup/first_time_setup.sh` 来手动初始化环境。

### 使用 Hugging Face 数据集时，我该如何获取它？

在开始运行 `python finetuning/invoke_olive.py` 命令之前，请确保您已运行 `huggingface-cli login` 命令。这样可以确保数据集可以代表您下载。

## 环境

### 该扩展是否适用于 Linux 或其他系统？

是的，Foundry Toolkit 可在 Windows、Mac 和 Linux 上运行。

### 如何从我的 WSL 中禁用 Conda 自动激活

要在 WSL 中禁用 Conda 安装，请运行 `conda config --set auto_activate_base false`。这将禁用基础环境。

### 目前是否支持容器？

我们目前正在开发容器支持，该功能将在未来的版本中启用。

### 为什么需要 GitHub 和 Hugging Face 凭据？

我们将所有项目模板托管在 GitHub 中，基础模型托管在 Azure 或 Hugging Face 中。这些环境需要一个帐户才能通过 API 访问它们。

### 我在下载 Llama2 时遇到错误

请确保您通过 [Llama 2 注册页面](https://github.com/llama2-onnx/signup) 申请访问 Llama。这是为了遵守 Meta 的贸易合规要求。

### 我无法在 WSL 实例中保存项目

由于在运行 Foundry Toolkit 操作时目前不支持远程会话，因此您在连接到 WSL 时无法保存项目。要关闭远程连接，请在屏幕左下角选择 "WSL"，然后选择 "Close Remote Connections"。

### 错误：GitHub API 被禁止访问

我们将项目模板托管在 `microsoft/windows-ai-studio-templates` GitHub 仓库中，该扩展使用 GitHub API 来加载仓库内容。如果您在 Microsoft 内部，可能需要授权 Microsoft 组织以避免此类禁止访问问题。

请参阅 [此问题](https://github.com/microsoft/vscode-ai-toolkit/issues/70#issuecomment-2126089884) 了解解决方法。详细步骤如下：

1. 从 VS Code 退出 GitHub 帐户
1. 重新加载 VS Code 和 Foundry Toolkit，系统将要求您再次登录 GitHub
1. **重要：** 在浏览器的授权页面中，请确保授权该应用访问 Microsoft 组织

    ![授权访问](./images/faq/faq-github-api-forbidden.png)

### 无法列出、加载或下载 ONNX 模型

请检查 VS Code 输出面板中的 Foundry Toolkit 日志。如果您看到 *Agent* 错误或 *获取已下载模型失败*，请关闭所有 VS Code 实例并重新打开 VS Code。

（*此问题是由于底层 ONNX 代理想意外关闭引起的，上述步骤是为了重新启动代理。*）
