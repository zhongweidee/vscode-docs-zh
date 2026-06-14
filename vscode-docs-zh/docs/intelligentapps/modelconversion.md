---
ContentId: 2452fb1c-7636-44d3-a52d-00923844d384
DateApproved: 07/14/2025
MetaDescription: Foundry Toolkit 中的模型转换快速入门。
---
# 使用 Foundry Toolkit for VS Code 转换模型

模型转换是一个集成开发环境，旨在帮助开发者和 AI 工程师在本地 Windows 平台上转换、量化、优化和评估预构建的机器学习模型。它为从 Hugging Face 等来源转换的模型提供了精简的端到端体验，可对其进行优化并支持在搭载 NPU、GPU 和 CPU 的本地设备上进行推理。

## 先决条件

- 安装最新版本的 [Visual Studio Code](/download)。
- 安装 Foundry Toolkit VS Code 扩展。有关详细信息，请参阅[安装 Foundry Toolkit](/docs/intelligentapps/overview.md#install-and-setup)。

## 创建项目

在模型转换中创建项目是转换、优化、量化和评估机器学习模型的第一步。

1. 打开 Foundry Toolkit 视图，选择 **Models** > **Conversion** 启动模型转换。

2. 通过选择 **New Model Project** 开始新项目。

    ![Screenshot that shows view for creating model project, including Primary Side Bar and create project button.](./images/modelconversion/create-project-default.png)

3. 选择基础模型。
    - `Hugging Face Model`：从支持的模型列表中选择带有预定义配方的基础模型。
    - `Model Template`：如果基础模型列表中不包含该模型，可为自定义配方选择一个空白模板（高级场景）。

    ![Screenshot that shows model list, such as bert, resnet, llama and so on.](./images/modelconversion/create-project-model-list.png)

4. 输入项目详细信息：唯一的**项目文件夹**和**项目名称**。

    一个以指定项目名称命名的新文件夹将在你选择的位置创建，用于存储项目文件。

> [!NOTE]
> 首次创建模型项目时，设置环境可能需要一些时间。
> 未完成设置也没关系。你可以在准备就绪后选择重新设置环境。
> ![Screenshot that shows re-setup.](./images/modelconversion/re-init.png)
>
> 每个项目中都包含一个 `README.md` 文件。如果你关闭了它，可以通过工作区重新打开。
> ![Screenshot that shows model readme.](./images/modelconversion/create-project-readme.png)

### 支持的模型

模型转换目前支持的模型列表在持续增长，包括 PyTorch 格式的热门 Hugging Face 模型。有关详细的模型列表，请参阅：[模型列表](https://github.com/microsoft/olive-recipes/blob/main/.aitk/docs/guide/ModelList.md)

### （可选）向现有项目添加模型

1. 打开模型项目。

2. 选择 **Models** > **Conversion**，然后在右侧面板上选择 **Add Models**。

    ![Screenshot that shows how to add model. It contains a button to add models.](./images/modelconversion/create-project-add-models.png)

3. 选择一个基础模型或模板，然后选择 **Add**。

    一个包含新模型文件的文件夹将在当前项目文件夹中创建。

### （可选）创建新的模型项目

1. 打开模型项目。

2. 选择 **Models** > **Conversion**，然后在右侧面板上选择 **New Project**。

    ![Screenshot that shows how to create a new project. It contains a button to create a new project.](./images/modelconversion/create-project-default.png)

3. 或者，关闭当前模型项目并从头开始[创建新项目](#创建项目)。

### （可选）删除模型项目

1. 打开模型项目，选择 **Models** > **Conversion**。

2. 在右上方视图中，选择省略号 (**...**)，然后选择 **Delete** 以删除当前选中的模型项目。

    ![Screenshot that shows how to delete a model project. It contains a button to open mean and detele a model project.](./images/modelconversion/delete-project.png)

### （可选）更新模型项目

Foundry Toolkit 更新后，你可能会看到模型项目的 **Need Update** 通知。

![Screenshot showing that a model needs an update](./images/modelconversion/need-update.png)

这意味着某些工作流已更新，你可以选择：

- 如果你没有手动修改过工作流，选择 **Update**。
- 创建一个新的模型项目，将旧模型项目中的更改迁移到新项目中，或反之。
- 将 Foundry Toolkit 恢复到先前的版本，以便继续使用该版本的工作流。

对于已转换的模型，如果它们正常运行，你仍然可以使用它们。或者你可以重新运行工作流以生成新模型。如果工作流变化不大，由于之前的结果已缓存，速度会很快。

在[如何更新模型项目](/docs/intelligentapps/reference/UpdateModelProject.md)中了解更多信息。


## 运行工作流

在模型转换中运行工作流是将预构建的 ML 模型转换为优化和量化的 ONNX 模型的核心步骤。

1. 在 VS Code 中选择 **File** > **Open Folder** 以打开模型项目文件夹。

2. 查看工作流配置。

    1. 选择 **Models** > **Conversion**。
    2. 选择工作流模板以查看转换配方。

    ![Screenshot that shows running a workflow. There is a workflow configuration section containing Conversion, Quantization and Evaluation.](./images/modelconversion/run.png)

    **转换**

    工作流将始终执行转换步骤，将模型转换为 ONNX 格式。此步骤无法禁用。

    **量化**

    此部分允许你配置量化参数。

    > [!Important]
    > **Hugging Face 合规提醒**：在量化过程中，我们需要校准数据集。你可能需要在继续之前接受许可条款。如果你错过了通知，运行过程将暂停，等待你的输入。请确保通知已**启用**，并且你接受了所需的许可。
    > ![Screenshot that shows disclaimer.](./images/modelconversion/run-disclaimer.png)

    - **激活类型**：用于表示神经网络中每层中间输出（激活值）的数据类型。
    - **权重类型**：用于表示模型学习参数（权重）的数据类型。
    - **量化数据集**：用于量化的校准数据集。

      如果你的工作流使用的数据集需要在 Hugging Face 上同意许可协议（例如 ImageNet-1k），系统将提示你在数据集页面上接受条款后才能继续。这是法律合规所必需的。

      1. 选择 **HuggingFace Access Token** 按钮以获取你的 Hugging Face 访问令牌。

          ![Screenshot that shows input token step 1: start to get Hugging Face Access Token.](./images/modelconversion/run-token-1.png)
      2. 选择 **Open** 打开 Hugging Face 网站。

          ![Screenshot that shows input token step 2: open Hugging Face websites.](./images/modelconversion/run-token-2.png)

      3. 在 Hugging Face 门户上获取你的令牌并粘贴到快速选取框中。按 `kbstyle(Enter)`。

          ![Screenshot that shows input token step 3: input token on dropdown textbox.](./images/modelconversion/run-token-3.png)

    - **量化数据集分割**：数据集可以有不同的分割，如验证、训练和测试。
    - **量化数据集大小**：用于量化模型的数据数量。

    有关激活和权重类型的更多信息，请参阅[数据类型选择](https://onnxruntime.ai/docs/performance/model-optimizations/quantization.html#data-type-selection)。

    你也可以禁用此部分。在这种情况下，工作流将仅将模型转换为 ONNX 格式，但不会量化模型。

    **评估**

    在此部分中，你需要选择用于评估的执行提供程序（EP），无论模型是在哪个平台上转换的。
    - **评估目标**：你希望评估模型的目标设备。可能的值包括：
      - **Qualcomm NPU/GPU**：要使用此选项，你需要兼容的 Qualcomm 设备。
      - **AMD NPU/GPU**：要使用此选项，你需要搭载受支持的 AMD NPU/GPU 的设备。
      - **Intel CPU/GPU/NPU**：要使用此选项，你需要搭载受支持的 Intel CPU/GPU/NPU 的设备。
      - **NVIDIA TRT for RTX**：要使用此选项，你需要搭载支持 TensorRT for RTX 的 Nvidia GPU 的设备。
      - **DirectML**：要使用此选项，你需要搭载支持 DirectML 的 GPU 的设备。
      - **CPU**：任何 CPU 均可使用。
    - **评估数据集**：用于评估的数据集。
    - **评估数据集分割**：数据集可以有不同的分割，如验证、训练和测试。
    - **评估数据集大小**：用于评估模型的数据数量。

    你也可以禁用此部分。在这种情况下，工作流将仅将模型转换为 ONNX 格式，但不会评估模型。

3. 通过选择 **Run** 运行工作流。

    系统会使用工作流名称和时间戳生成默认的作业名称（例如 `bert_qdq_2025-05-06_20-45-00`），以便于跟踪。

    在作业运行期间，你可以通过选择状态指示器或历史记录面板中 **Action** 下的三点菜单并选择 **Stop Running** 来**取消**作业。

    **Hugging Face 合规提醒**：在量化过程中，我们需要校准数据集。你可能需要在继续之前接受许可条款。如果你错过了通知，运行过程将暂停，等待你的输入。请确保通知已启用，并且你接受了所需的许可。

4. （可选）在云端运行模型转换

    当你的本地计算机没有足够的计算或存储容量时，云端转换可让你在云端运行模型转换和量化。你需要一个 Azure 订阅才能使用云端转换。

    1. 从右上方的下拉菜单中选择 **Run with Cloud**。
        请注意，**评估**部分将被禁用，因为云端环境没有用于推理的目标处理器。

        ![Screenshot that shows Run with Cloud button.](./images/modelconversion/cloud-conversion-run.png)

    2. Foundry Toolkit 首先检查云端转换的 Azure 资源是否已准备好。如果需要，系统将提示你提供 Azure 订阅和资源组以预配 Azure 资源。

        ![Screenshot that shows prompt for provisionning.](./images/modelconversion/provisioning.png)

    3. 预配完成后，预配配置将保存在工作区根文件夹中的 `model_lab.workspace.provision.config` 中。
        此信息被缓存以重用 Azure 资源并加速云端转换过程。如果你想使用新资源，请删除此文件并再次运行云端转换。

    4. 系统将触发一个 Azure 容器应用（ACA）作业来运行云端转换。对于正在运行的作业，你可以：
        - 选择状态链接导航到 Azure ACA 作业执行历史记录页面。
        - 选择 **logs** 导航到 Azure Log Analytics。
        - 选择刷新按钮以获取当前作业状态。

        ![Screenshot that shows prompt for provisionning.](./images/modelconversion/cloud-conversion-history.png)

> [!TIP]
> 如果你没有可用的 GPU 进行 LLM 模型转换，可以使用 **Run with Cloud**。
> Run with Cloud 选项仅支持模型转换和量化。你需要将转换后的模型下载到本地计算机进行评估。
>
> Run with Cloud 不支持使用 DirectML 或 NVIDIA TRT for RTX 工作流进行模型转换。

> [!NOTE]
> **Recommended** 列将根据你的设备是否准备好运行转换后的模型来显示推荐的工作流。你仍然可以选择你偏好的工作流。
> **模型转换和量化**：你可以在除 LLM 模型之外的任何设备上运行工作流。**量化**配置仅针对 NPU 进行了优化。如果目标系统不是 NPU，建议取消选中此步骤。
>
> **LLM 模型量化**：如果你想量化 [LLM 模型](#llm-模型)，需要 Nvidia GPU。
>
> 如果你想在配备 GPU 的其他设备上量化模型，可以自行设置环境，请参阅[手动 GPU 转换](/docs/intelligentapps/reference/ManualConversionOnGPU.md)。请注意，只有"量化"步骤需要 GPU。量化后，你可以在 NPU 或 CPU 上评估模型。

### 重新评估的提示

在模型成功转换后，你可以使用重新评估功能再次进行评估，而无需重新进行模型转换。

转到历史记录面板，找到模型运行作业。选择 **Action** 下的三点菜单以**重新评估**模型。

你可以选择不同的 EP 或数据集进行重新评估。

![Screenshot that shows re-evaluation. It contains configurations such as name, system and datasets settings.](./images/modelconversion/re-evaluate.png)

### 作业失败的提示

如果你的作业被取消或失败，你可以选择作业名称来调整工作流并再次运行作业。为避免意外覆盖，每次执行都会创建一个带有自己配置和结果的新历史记录文件夹。

> [!NOTE]
> 某些工作流可能要求你先登录 Hugging Face。如果你的作业失败并输出类似 `huggingface_hub.errors.LocalTokenNotFoundError: Token is required ('token=True'), but no token found. You need to provide a token or be logged in to Hugging Face with 'hf auth login' or 'huggingface_hub.login'` 的错误信息，请导航到 <https://huggingface.co/settings/tokens> 并按照说明完成登录过程，然后重试。
>
> 如果你的重新评估失败并输出类似 `Microsoft Visual C++ Redistributable is not installed` 的警告信息，你需要手动安装以下软件包：
> 1. [Microsoft Visual C++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170#latest-microsoft-visual-c-redistributable-version)
> 2. （ARM64 可选）从 [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) 下载。在安装过程中还需勾选 `Desktop development with C++` 工作负载。

## 查看结果

**Conversion** 中的历史记录面板是你跟踪、查看和管理所有工作流运行的中心仪表板。每次运行模型转换和评估时，都会在历史记录面板中创建一个新条目——确保完整的可追溯性和可复现性。

- 找到你要查看的工作流运行。每次运行都列有状态指示器（例如 Succeeded、Cancelled）。
- 选择运行名称以查看转换配置。
- 选择状态指示器下的 **logs** 以查看日志和详细的执行结果。
- 模型成功转换后，你可以在 Metrics 下查看评估结果。每次运行旁边会显示准确率、延迟和吞吐量等指标。

  ![Screenshot that shows history, including name, time, parameters and so on.](./images/modelconversion/history.png)

- 你可以选择 **Action** 下的三点菜单与转换后的模型进行交互。

  ![Screenshot that shows actions, including inference, copy model path and re-evaluate.](./images/modelconversion/historyaction.png)


### 复制转换后的模型路径

- 从下拉菜单中选择 **Copy model path**。输出转换后的模型路径如 `c:/{workspace}/{model_project}/history/{workflow}/model/model.onnx` 将被复制到剪贴板供你参考。对于 LLM 模型，将复制输出文件夹。

### 使用示例笔记本进行模型推理

- 从下拉菜单中选择 **Inference in Sample**。
- 选择 Python 环境
  - 系统将提示你选择一个 Python 虚拟环境。
  默认运行时为：`C:\Users\{user_name}\.aitk\bin\model_lab_runtime\Python-WCR-win32-x64-3.12.9`。
  - 请注意，默认运行时包含所需的一切，否则，请手动安装 requirements.txt。
- 示例将在 Jupyter Notebook 中启动。你可以自定义输入数据或参数来测试不同的场景。

> [!NOTE]
> 对于使用云端转换的模型，在状态变为 **Succeeded** 后，选择云下载图标将输出模型下载到本地计算机。
> ![Screenshot that shows action, including icon for downloading model from cloud.](./images/modelconversion/cloud-download.png)
>
> 为避免覆盖任何现有的本地文件（如配置或历史记录相关文件），只会下载缺失的文件。如果你想下载干净的副本，请先删除本地文件夹，然后重新下载。

> [!TIP]
> **模型兼容性：**确保转换后的模型支持推理示例中指定的 EP。
>
> **示例位置：**推理示例与运行产物一起存储在历史记录文件夹中。

### 导出并与他人共享

转到历史记录面板。选择 **Export** 将模型项目共享给他人。这会复制不包含历史记录文件夹的模型项目。如果你想与他人共享模型，请选择相应的作业。这会复制包含模型及其配置的所选历史记录文件夹。

## 使用 Windows ML CLI 构建（预览）

除了基于 Olive 的转换工作流之外，Foundry Toolkit 还提供了由 [Windows ML CLI](https://github.com/microsoft/winml-cli) 驱动的精简**构建**流程。Olive 配方侧重于 EP 驱动的优化工作流，而 Windows ML CLI 则提供了适用于 Windows ML 的精简跨 EP 开发工作流。你无需手动组装优化配方，而是可以使用 Windows ML CLI 通过 Windows PC 上简化的命令行体验来转换、分析、优化、验证和基准测试模型。除了从 Hugging Face 转换模型外，Windows ML CLI 还可以直接在 Windows PC 上分析、优化、验证和基准测试现有的 ONNX 模型。

### 选择 Windows ML CLI 基础模型

当你创建新的模型项目（或向现有项目添加模型）时，**Choose a Base Model** 页面会显示一个由 Windows ML CLI 驱动的 **Recommend Process** 区域：

![Screenshot that shows the Recommend Process area with Hugging Face Hub and Local ONNX Files cards.](./images/modelconversion/winmlcli-recommend-process.png)

- **Hugging Face Hub**：提供 Hugging Face 模型 ID（例如 `microsoft/resnet-50`），Windows ML CLI 将自动下载、转换、分析和优化模型。
- **Local ONNX Files**：浏览到磁盘上的 ONNX 文件，让 Windows ML CLI 对其进行分析和优化。

你还可以选择已经过 Windows ML CLI 验证的精选 Hugging Face 模型。打开 **Provided By** 筛选器并选择 **Windows ML CLI** 以查看支持的列表。

![Screenshot that shows HuggingFace Models filtered by the Windows ML CLI provider.](./images/modelconversion/winmlcli-model-list.png)

> [!NOTE]
> 通过 Windows ML CLI 生成的模型可以在 Windows ML 支持的所有执行提供程序（EP）上运行。支持的 EP 包括：
>
> - QNN（NPU、GPU）
> - OpenVINO（CPU、NPU、GPU）
> - VitisAI（NPU）
> - NVIDIA TensorRT RTX（GPU）
> - DirectML（DML）（GPU）
> - CPU

> [!NOTE]
> 对于使用 **Hugging Face Hub** 或 **Local ONNX Files** 模板的"自带模型"场景，Windows ML CLI 目前仅支持经典深度学习模型。LLM 支持即将推出。

### 运行构建流程

项目打开后，**Run Workflows** 面板会为每个选定的 Windows ML CLI 模型显示一个 **Build Flow** 卡片。

![Screenshot that shows the Build Flow card with Edit Config and Build buttons for a Hugging Face model.](./images/modelconversion/winmlcli-build-flow.png)

首次进入时的行为取决于模型添加到项目的方式。

#### 内置模型

内置模型已包含经过验证的 Windows ML CLI 工作流配置。这些精选模型附带为 Windows ML EP 优化的预构建 Build Config 文件。Build Flow 卡片直接以 **Configured** 状态打开——不会运行自动配置。选择 **Edit Config** 查看准备好的配方，然后选择 **Build**。

#### 按 ID 添加的 Hugging Face 模型

按 ID 添加的 Hugging Face 模型在首次进入时自动处理。卡片会经历以下状态转换：

- **Configuring**：Windows ML CLI 检查 Hugging Face 上的模型并生成构建配置。
- **Configured**：配置已就绪。
- **Failed**：无法完成配置。卡片会内联显示失败信息，并显示 **Re-config** 按钮（位于 **Edit Config** 左侧），使你无需离开工作流即可重试。

> [!NOTE]
> **Failed** 配置状态通常意味着无法将模型自动映射到支持的优化或验证工作流。这可能发生在以下情况：
>
> - 模型架构尚未受支持，
> - 缺少必需的模型元数据，或
> - ONNX 图包含不受支持的运算符。

> [!NOTE]
> 自动配置仅在首次进入按 ID 添加的 Hugging Face 模型时运行，或在你明确选择 **Re-config** 后运行。工具包不会自行重试失败的配置，因此你可以检查日志并决定何时重试。

**步骤 1：生成构建配置**

Windows ML CLI 查询 Hugging Face，自动检测任务和模型类型，并自动生成 Build Config JSON 文件。在引导过程中，Windows ML CLI 会生成三种配置变体：

- `config-noquant.json`
- `config-w8a16.json`
- `config-w8a8.json`

它们之间的主要区别是量化策略：

- **No Quant** — 全精度模型。
- **W8A16** — 8 位权重，16 位激活值。
- **W8A8** — 8 位权重，8 位激活值，以实现更积极的压缩和性能优化。

**步骤 2：自定义配置**

你可以在运行构建管道之前自定义工作流。典型的自定义领域包括任务类型、编译目标和精度细节。默认情况下，**Compile** 设置为 `null`。你可以使用目标 EP 自定义 **Compile**。

**步骤 3：运行构建**

选择 **Build** 会按顺序运行所有四个管道阶段：

1. 导出
2. 优化
3. 量化
4. 编译

工作流读取 `config*.json` 中记录的设置。构建步骤之后，Windows ML CLI 会自动生成一个声明性的 `build_config.json` 文件，该文件定义了工作流的端到端运行方式。你可以通过 **View Config** 检查并进行自定义。这种声明式配置模型使得将 Windows ML CLI 集成到具有可复现和可移植构建工作流的 CI/CD 管道中变得容易。

Windows ML CLI 还会生成分析报告，你可以通过 **View Analysis** 打开。分析结果提供详细的模型兼容性见解，包括 Windows ML EP 中受支持的运算符、部分受支持的运算符和不受支持的运算符。在分析过程中，Windows ML CLI 会自动检查 ONNX 图，检测优化模式，并生成推荐的 Windows ML 优化工作流。

#### 本地 ONNX 模型

对于本地 ONNX 模型，构建工作流会自动分析 ONNX 图并生成推荐的 Windows ML 优化工作流。因为输入已经是 ONNX 模型，Windows ML CLI 会跳过**导出**阶段，直接从模型优化开始。默认情况下，**Build** 配置也会跳过**量化**和**编译**阶段——你可以稍后自定义它们。

![Screenshot that shows the Build Flow card for a local ONNX model with just a Build button.](./images/modelconversion/winmlcli-local-onnx.png)

### 检查构建、评估和性能结果

每次构建运行都会在 **Generated Flow History** 表中生成一个条目。你可以从中：

- 选择 **View Config** 打开用于运行的配置文件。
- 选择 **View Analysis** 打开 EP 兼容性分析。
- 选择 **Performance** 针对选定的 EP 启动性能运行，并在表中直接查看设备、延迟和吞吐量结果。
- 选择 **Evaluation** 运行质量评估。评估仅适用于**内置模型**，这些模型附带准备好的评估数据集和指标。

![Screenshot that shows the Generated Flow History table with View Config, View Analysis, Performance, and Evaluation actions.](./images/modelconversion/winmlcli-history.png)

## 你学到了什么

在本文中，你学习了如何：

- 在 Foundry Toolkit for VS Code 中创建模型转换项目。
- 配置转换工作流，包括量化和评估设置。
- 运行转换工作流，将预构建的模型转换为优化的 ONNX 模型。
- 查看转换结果，包括指标和日志。
- 使用示例笔记本进行模型推理和测试。
- 导出并与他人共享模型项目。
- 使用不同的执行提供程序或数据集重新评估模型。
- 处理失败的作业并调整配置以重新运行。
- 了解支持的模型及其转换和量化的要求。
- 使用 Windows ML CLI 流程构建 Hugging Face 或本地 ONNX 模型。

## 另请参阅

- [如何手动设置 GPU 转换](/docs/intelligentapps/reference/ManualConversionOnGPU.md)
- [如何手动设置环境](/docs/intelligentapps/reference/SetupWithoutAITK.md)
- [如何自定义模型模板](/docs/intelligentapps/reference/TemplateProject.md)
- [如何更新模型项目](/docs/intelligentapps/reference/UpdateModelProject.md)
- [转换文件结构](/docs/intelligentapps/reference/FileStructure.md)
