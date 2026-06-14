---
ContentId: 8dfdd336-fbbf-440c-9bc1-3f98a1787dfc
DateApproved: 05/13/2025
MetaDescription: 模型转换中关于设置模板项目的参考信息。
---
# 在模型转换中设置模板项目
本文介绍如何在模型转换中设置和自定义模板项目，指导你编辑 sample.json、model_project.config 等配置文件，以适配你的特定模型、数据集和工作流需求。

创建模板项目后，你可以看到以下文件已生成。要让模板项目正常工作，可以参照项目中的 readme 文件，根据你的需要更新相应参数。

![Template project files](../images/modelconversion//TemplateFiles.png)

## 更新 sample.json
要使示例生效，你需要填写以下属性。例如：
- `MODEL_PATH: Intel/bert-base-uncased-mrpc`
- `MODEL_TASK: text-classification`
- `DS_NAME: glue`
- `DS_SUBSET: mrpc`
- `DS_SPLIT: validation`
- `DATA_COLS: [ "sentence1", "sentence2" ]`
- `FIXED_PARAMS: [ "batch_size", "sequence_length" ]`
- `FIXED_VALUES: [ 1, 128 ]`

你还可以根据自己的需求调整其他参数：

- `execution_providers: [ "CPUExecutionProvider" ]`：可更改为其他提供程序，如 QNNExecutionProvider。你需要在匹配的设备上运行它。
- `max_length: 128` / `batch_size: 1`：对于静态量化，输入大小应为固定值。请调整这些值以匹配 `FIXED_VALUES`。
- `max_samples: 100`：使用的样本数量。

## 更新 model_project.config（可选）
更新工作流的 `name` 以反映你想要执行的操作，这样在工作流列表中更容易找到。

更新 modelInfo 的 `displayName` 和 `modelLink` 为你所使用的模型，这样在模型列表中更容易找到。

## 更新 sample.custom.config（可选）
此文件用于渲染`运行`面板和`重新评估`面板。
你可以删除或添加参数以匹配你的 `sample.json`。如果更改了 JSON 属性名称，可能需要更新路径。

## 更新 inference_sample.ipynb（可选）
编写你自己的代码来加载和测试输出模型。此文件将被复制到历史文件夹中，你可以使用不同的 ipynb 来比较不同历史记录中的模型。
