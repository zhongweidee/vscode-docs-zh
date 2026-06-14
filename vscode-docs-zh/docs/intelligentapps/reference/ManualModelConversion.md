---
ContentId: d40f8c19-a7a4-4d53-9303-b9cb128af591
DateApproved: 05/13/2025
MetaDescription: 关于手动模型转换的模型转换参考。
---
# 将模型转换为 ONNX 格式

Foundry Toolkit 支持使用[开放神经网络交换](https://onnx.ai)（ONNX）格式来在本地运行模型。ONNX 是一种表示机器学习模型的开放标准，它定义了一组通用的运算符和文件格式，使模型能够在各种硬件平台上运行。

要在 Foundry Toolkit 中使用来自其他目录（例如 Microsoft Foundry 或 Hugging Face）的模型，必须先将它们转换为 ONNX 格式。

本教程将指导你将 Hugging Face 模型转换为 ONNX 格式，并将其加载到 Foundry Toolkit 中。

## 设置环境

要从 Hugging Face 或 Microsoft Foundry 转换模型，你需要使用 [Model Builder](https://onnxruntime.ai/docs/genai/howto/build-model.html) 工具。

按照以下步骤设置你的环境：

1. 确保你的设备上已安装 [Anaconda](https://www.anaconda.com/download) 或 [Miniconda](https://www.anaconda.com/docs/getting-started/miniconda/install)。

2. 为 Model Builder 创建一个专用的 conda 环境，并安装必要的依赖项（`onnx`、`torch`、`onnxruntime_genai` 和 `transformers`）：

    ```powershell
    conda create -n model_builder python==3.11 -y
    conda activate model_builder
    pip install onnx torch onnxruntime_genai==0.6.0 transformers
    ```

    > 注意：对于某些较新的模型（如 Phi-4-mini），你可能需要直接从 GitHub 安装最新开发版的 transformers：

    ```powershell
    pip install git+https://github.com/huggingface/transformers
    ```

## 访问 Hugging Face 模型

有多种方式可以访问 Hugging Face 模型。在本教程中，我们以 `huggingface_hub` CLI 为例来演示如何管理模型仓库。

> 注意：在继续之前，请确保你的 Python 环境已正确设置。

要从 Hugging Face 下载模型：

1. [安装 CLI](https://huggingface.co/docs/huggingface_hub/main/en/guides/cli#getting-started)：

    ```powershell
    pip install -U "huggingface_hub[cli]"
    ```

2. [下载模型仓库](https://huggingface.co/docs/huggingface_hub/main/en/guides/cli#download-an-entire-repository)。

3. 下载仓库中的所有文件将在转换过程中被使用。

## 创建目录结构

Foundry Toolkit 从其工作目录加载 ONNX 模型：

* Windows：`%USERPROFILE%\.aitk\models`
* 类 Unix 系统（macOS）：`$HOME/.aitk/models`

为确保你的模型正确加载，请在 Foundry Toolkit 的工作目录中创建所需的四层目录结构。例如：

```powershell
mkdir C:\Users\Administrator\.aitk\models\microsoft\Phi-3.5-vision-instruct-onnx\cpu\phi3.5-cpu-int4-rtn-block-32
```

在此示例中，四层目录结构为 `microsoft\Phi-3.5-vision-instruct-onnx\cpu\phi3.5-cpu-int4-rtn-block-32`。

> [!IMPORTANT]
> 四层目录结构的命名很重要。每个目录层对应一个特定的系统参数：`$publisherName\$modelName\$runtime\$displayName`。`$displayName` 会显示在扩展左上方的本地模型树视图中。请为不同的模型使用不同的 `displayName` 值，以避免混淆。

## 将模型转换为 ONNX 格式

运行以下命令将你的模型转换为 ONNX 格式：

```powershell
python -m onnxruntime_genai.models.builder -m $modelPath -p $precision -e $executionProvider -o $outputModelPath -c $cachePath --extra_options include_prompt_templates=1
```

> [!TIP]
> 常见的精度和执行提供程序组合包括：`FP32 CPU`、`FP32 CUDA`、`FP16 CUDA`、`FP16 DML`、`INT4 CPU`、`INT4 CUDA` 和 `INT4 DML`。

以下是一个将模型转换为 ONNX 格式的完整命令示例：

```powershell
python -m onnxruntime_genai.models.builder -m C:\hfmodel\phi3 -p fp16 -e cpu -o C:\Users\Administrator\.aitk\models\microsoft\Phi-3-mini-4k-instruct\cpu\phi3-cpu-int4-rtn-block-32-acc-level-4 -c C:\temp --extra_options include_prompt_templates=1
```

有关精度和执行提供程序的更多详细信息，请参阅以下教程：

- [精度基础知识](https://huggingface.co/docs/optimum/en/concept_guides/quantization)
- [执行提供程序基础知识](https://onnxruntime.ai/docs/execution-providers)

## 将模型加载到 Foundry Toolkit 中

转换完成后，将你的 ONNX 模型文件移动到新创建的目录中。Foundry Toolkit 会在激活时自动从此目录加载 ONNX 模型。

你可以在 `MY MODELS` 视图中找到你的模型。要使用某个模型，请双击其名称，或打开 `TOOLS` > `Playground`，然后从下拉列表中选择该模型，即可开始与之交互。

> 注意：Foundry Toolkit 不支持直接删除手动添加的模型。要删除模型，请手动删除其目录。

## 支持转换的模型

下表列出了 Foundry Toolkit 中支持转换为 ONNX 格式的模型：

| 支持矩阵 | 当前支持 | 开发中 | 路线图上 |
| :------------: | :-----------: | :---------------: | :------------: |
| 模型架构 | `DeepSeek`、`Gemma`、`Llama`、`Mistral`、`Phi (Language + Vision)`、`Qwen`、`Nemotron`、`Granite`、`AMD OLMo` | `Whisper` | `Stable Diffusion` |