---
ContentId: 8493ea9e-061a-4519-b807-57bd320cc60c
DateApproved: 05/13/2025
MetaDescription: 关于环境设置方面的模型转换参考。
---
# 手动设置环境

本文介绍如何为不同硬件目标上的模型转换和模型推理手动设置 Python 环境。

## 为模型转换设置环境

建议在[使用 uv 的 Python 虚拟环境](https://docs.astral.sh/uv/reference/cli/#uv-venv)中安装环境，因为 Foundry Toolkit 在内部使用这种方式。

除非另行配置，否则默认的 Python 版本为 3.12。

### 安装所需组件

当 Foundry Toolkit 设置虚拟环境时，它按顺序安装三类所需组件：

- **基础所需组件**：包含所有包的基本所需组件。
- **功能所需组件**：配方的附加所需组件，在基础所需组件之后安装。
- **项目所需组件**：项目内的 `requirements.txt` 文件，允许你自定义依赖项。

这些文件托管在 [olive-recipes 仓库](https://github.com/microsoft/olive-recipes/tree/main/.aitk/requirements)中。

> [!NOTE]
> 所需组件文件支持[特殊命令](https://github.com/microsoft/olive-recipes/blob/main/.aitk/docs/guide/ReqCommands.md)，这些命令丰富了文件内容。在安装所需组件文件之前，请检查是否有任何特殊命令并相应地处理它们，然后使用 `uv pip install -r xxx.txt` 正常安装。

#### 示例：Qualcomm NPU

对于 [Deepseek Qualcomm NPU](https://github.com/microsoft/olive-recipes/blob/main/deepseek-ai-DeepSeek-R1-Distill-Qwen-1.5B/aitk/deepseek_qnn_config.json.config)，`runtimeOverwrite.executeEp` 为 `CUDAExecutionProvider`，因此基础所需组件文件是 [NvidiaGPU](https://github.com/microsoft/olive-recipes/blob/main/.aitk/requirements/requirements-NvidiaGPU.txt)。`executeRuntimeFeatures` 为 `AutoGptq`，因此功能所需组件文件是 [AutoGptq](https://github.com/microsoft/olive-recipes/blob/main/.aitk/requirements/requirements-NvidiaGPU-AutoGptq.txt)。

#### 示例：AMD NPU

对于 [Deepseek AMD NPU](https://github.com/microsoft/olive-recipes/blob/main/deepseek-ai-DeepSeek-R1-Distill-Qwen-1.5B/aitk/deepseek_vitis_ai_config.json.config)，`runtimeOverwrite.executeEp` 为 `AMD/Quark_py3.10.17`，因此基础所需组件文件是 [AMD/Quark_py3.10.17](https://github.com/microsoft/olive-recipes/blob/main/.aitk/requirements/AMD/Quark_py3.10.17.txt)。没有功能所需组件。此虚拟环境请使用 Python 3.10。

## 为模型推理设置环境

此过程与[为模型转换设置环境](#为模型转换设置环境)类似。

> [!TIP]
> 相同的所需组件文件也可用于转换。你可能只需要从该文件中安装 `onnxruntime-windowsml` 和 `onnxruntime-genai-winml`。

[WCR](https://github.com/microsoft/olive-recipes/blob/main/.aitk/requirements/requirements-WCR.txt) 是用于在 Foundry Toolkit 中在所有执行提供程序上运行模型的最新所需组件文件。

> [!NOTE]
> 对于 QNN 上的 LLM 模型，arm64 Python 环境可提供更好的性能。有一个专门的[所需组件文件](https://github.com/microsoft/olive-recipes/blob/main/.aitk/requirements/requirements-QNN_LLM.txt)可用于此配置。
