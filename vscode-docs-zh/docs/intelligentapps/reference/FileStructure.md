---
ContentId: fea54c41-e5bb-49e2-89bd-518af096ba8e
DateApproved: 05/13/2025
MetaDescription: 关于项目结构的模型转换参考。
---
# 模型转换文件结构
本文介绍了模型转换工作流中生成的文件结构以及每个文件夹和文件的用途，包括缓存处理、历史记录跟踪、推理等。

创建模型项目并多次运行后，文件结构可能如下所示：

```
model_project_name/
├── model_lab.workspace.config
└── huggingface_microsoft_resnet-50_v1/
    ├── .gitignore
    ├── imagenet.py
    ├── inference_sample.ipynb
    ├── model_project.config
    ├── README.md
    ├── requirements.txt
    ├── resnet_ptq_qnn.json
    ├── cache/
    └── history/
        └── history_1(20250414_161046)/
            ├── model/
            ├── footprints.json
            ├── history.config
            ├── history.config.user
            ├── inference_sample.ipynb
            ├── log.txt
            ├── metrics.json
            ├── model_config.json
            ├── olive_config.json
            ├── output_footprint.json
            └── run_history.txt
        └── history_2/
        └── history_3/
```

在 `model_project_name` 文件夹中，每个模型的工作流都存储在单独的文件夹中。

- `requirements.txt`：列出了运行工作流和推理示例所需的依赖项。
- `resnet_ptq_qnn.json`、`imagenet.py`：用于通过 Olive 转换模型的 JSON 文件。某些可能需要额外的 Python 文件进行自定义。
- `README.md`：描述模型详细信息，例如模型的任务、性能指标和使用说明。
- `model_project.config`：包含项目模板设置。某些设置可以根据您的具体需求进行覆盖。
- `inference_sample.ipynb`：用于测试输出模型的示例。此文件将被复制到 `history` 文件夹中，以便使用不同的 Jupyter 笔记本比较来自不同历史记录的模型。

## 缓存文件夹

`cache` 文件夹存储工作流执行期间生成的缓存文件。这些缓存结果有助于加速工作流的重复运行。

如果不再需要，您可以删除此文件夹以释放空间。

## 历史记录文件夹

`history` 文件夹名称中的时间戳表示运行时间，例如：`2025年4月14日 16:10:46`。

- `model`：模型文件。
- `model_config.json`：包含模型的详细信息。
- `footprints.json`、`output_footprint.json`、`run_history.txt`：Olive 输出。
- `history.config`、`history.config.user`：模型转换使用的历史记录配置。
- `inference_sample.ipynb`：用于测试输出模型的示例。
- `log.txt`：包含日志。
- `metrics.json`：如果启用评估，则包含评估结果。
- `olive_config.json`：用于运行转换的配置。

## 关于 git

默认情况下，`cache` 和 `history` 文件夹被排除在版本控制之外（`.gitignore`），但以下两个配置文件除外：`history.config` 和 `olive_config.json`

您可以更新 `.gitignore` 文件以包含值得保存的特定历史记录文件夹。

当其他人克隆仓库时，这两个文件确保他们可以重新运行这些历史记录以重现转换结果。

```
__pycache__
/cache
/history/*/*
!/history/*/history.config
!/history/*/olive_config.json
```
