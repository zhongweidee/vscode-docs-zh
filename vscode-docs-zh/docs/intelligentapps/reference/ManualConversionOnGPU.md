---
ContentId: 47b2131d-2e68-46c6-a0aa-9c3586b5a2a9
DateApproved: 05/13/2025
MetaDescription: 模型转换中关于使用 GPU 手动转换 LLM 模型的参考文档。
---
# 在 GPU 上手动转换模型
本文介绍在本地 Nvidia GPU 上手动转换 LLM 模型的工作流程。文章内容包括所需的环境配置、执行步骤，以及如何在搭载 Qualcomm NPU 的 Windows Copilot+ PC 上运行推理。

转换 LLM 模型需要 Nvidia GPU。如果希望模型实验室管理本地 GPU，请按照[转换模型](/docs/intelligentapps/modelconversion.md#conversion)中的步骤操作。否则，请按照本文中的步骤操作。

## 在 GPU 上手动运行模型转换
此工作流程通过 `qnn_config.json` 文件进行配置，并需要两个独立的 Python 环境。
- 第一个环境用于带 GPU 加速的模型转换，包含 onnxruntime-gpu 和 AutoGPTQ 等包。
- 第二个环境用于 QNN 优化，包含 onnxruntime-qnn 及特定依赖项。

### 第一个环境配置
在一个安装了 Olive 的 **Python 3.10** [x64 Python 环境](https://github.com/microsoft/Olive/blob/main/examples/README.md#important)中，安装所需的包：

```bash
# 安装通用依赖项
pip install -r requirements.txt

# 安装 ONNX Runtime GPU 包
pip install "onnxruntime-gpu>=1.21.0" "onnxruntime-genai-cuda>=0.6.0"

# AutoGPTQ：从源代码安装（稳定版包在权重打包时可能较慢）
# 禁用 CUDA 扩展构建（非必需）
# Linux
export BUILD_CUDA_EXT=0
# Windows
# set BUILD_CUDA_EXT=0

# 从源代码安装 AutoGPTQ
pip install --no-build-isolation git+https://github.com/PanQiWei/AutoGPTQ.git

# 如有需要请更新 CUDA 版本
pip install torch --index-url https://download.pytorch.org/whl/cu121
```

> ⚠️ 只需配置环境并安装这些包。此时不要运行 `olive run` 命令。

### 第二个环境配置
在一个安装了 Olive 的 **Python 3.10** [x64 Python 环境](https://github.com/microsoft/Olive/blob/main/examples/README.md#important)中，安装所需的包：

```bash
# 安装 ONNX Runtime QNN
pip install -r https://raw.githubusercontent.com/microsoft/onnxruntime/refs/heads/main/requirements.txt
pip install -U --pre --extra-index-url https://aiinfra.pkgs.visualstudio.com/PublicPackages/_packaging/ORT-Nightly/pypi/simple onnxruntime-qnn --no-deps
```

将 `qnn_config.json` 中的 `/path/to/qnn/env/bin` 替换为包含**第二个环境**的 Python 可执行文件所在目录的路径。

### 运行配置
激活**第一个环境**并运行工作流程：

```bash
olive run --config qnn_config.json
```

完成此命令后，优化后的模型将保存在：`./model/model_name`。

> ⚠️ 如果优化因内存不足而失败，请删除配置文件中的 `calibration_providers`。

> ⚠️ 如果优化在上下文二进制文件生成期间失败，请重新运行该命令。进程将从上次完成的步骤继续执行。


## 手动运行推理示例
优化后的模型可使用 [ONNX Runtime QNN Execution Provider](https://onnxruntime.ai/docs/execution-providers/QNN-ExecutionProvider.html) 和 [ONNX Runtime GenAI](https://onnxruntime.ai/docs/genai/) 进行推理。推理必须在**搭载 Qualcomm NPU 的 Windows Copilot+ PC** 上运行。

### 在 arm64 Python 环境中安装所需包
使用 QNN Execution Provider 进行模型编译需要安装了 onnxruntime-qnn 的 Python 环境。在一个安装了 Olive 的独立 Python 环境中，安装所需的包：

```bash
pip install -r https://raw.githubusercontent.com/microsoft/onnxruntime/refs/heads/main/requirements.txt
pip install -U --pre --extra-index-url https://aiinfra.pkgs.visualstudio.com/PublicPackages/_packaging/ORT-Nightly/pypi/simple onnxruntime-qnn --no-deps
pip install "onnxruntime-genai>=0.7.0rc2"
```

### 运行推理示例
执行提供的 `inference_sample.ipynb` 笔记本。选择 ipykernel 为此 **arm64** Python 环境。

> ⚠️ 如果遇到 `6033` 错误，请替换 `./model/model_name` 文件夹中的 `genai_config.json`。
