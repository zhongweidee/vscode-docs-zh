---
ContentId: 8105f83b-8291-467e-abac-2344b4f368cd
DateApproved: 12/14/2025
MetaDescription: Foundry 工具包中的性能分析快速入门。
---
# 使用 Windows 机器学习对应用进行性能分析

性能分析是一种工具，旨在帮助开发者和 AI 工程师诊断进程的 CPU、GPU 和 NPU 资源使用情况，在不同的执行提供程序上对 ONNX 模型进行性能分析，并捕获 Windows ML 事件。

在本文中，你将学习如何启动性能分析，以及如何检查资源使用视图和事件视图。

## 先决条件

- 安装最新版本的 [Visual Studio Code](/download)。
- 安装 Foundry 工具包 VS Code 扩展。有关详细信息，请参阅[安装 Foundry 工具包](/docs/intelligentapps/overview.md#install-and-setup)。

## 在应用启动时进行性能分析

在此模式下，性能分析工具会对下一个启动并发出 Windows ML 事件的应用进行性能分析。
此选项非常适合测试只需运行一次的应用。在这种情况下，你启动性能分析，然后运行应用，资源使用情况就会显示出来。

![Screenshot that shows how to start by the next session](./images/profiling/the-next-session-guide-2.png)

该工具会对新启动的应用开始性能分析。这意味着，对于 Python 笔记本的分析，如果内核已在运行，你需要重启内核才能开始对其进行性能分析。仅启动一个新笔记本不会自动开始性能分析。

> [!IMPORTANT]
> 要接收 Windows ML 事件，该工具需要在管理员模式下运行。如果 VS Code 未以管理员模式启动，则会显示一条通知，引导你重启 VS Code。你需要关闭所有其他 VS Code 实例，才能使管理员模式下的重启生效。
> ![Screenshot that shows a notification to restart VS Code in admin mode](./images/profiling/the-next-session-admin.png)


## 对正在运行的应用进行性能分析

在此模式下，性能分析工具会对已运行的应用开始性能分析。你可以根据以下条件选择进程：

- 进程 ID：例如 12345
- 进程名称：通常是去掉 `.exe` 的应用名称。将对第一个匹配项进行性能分析。
- 进程路径：例如 `c:\Users\xxx\Inference.Service.Agent.exe`。将对第一个匹配项进行性能分析。

此选项非常适合对已在运行且你无法为分析目的重启的应用进行性能分析。

![Screenshot that shows how to start by process id or name](./images/profiling/by-process-id-or-name-2.png)

## 对 ONNX 模型进行性能分析

在此模式下，性能分析工具会在目标执行提供程序（EP）上对 ONNX 模型文件进行性能分析，持续指定的时长。你可以在运行时查看资源使用情况。

此选项非常适合在不同的 EP 上对 ONNX 模型进行性能分析。

![Screenshot that shows how to start by model file](./images/profiling/by-model-file-config-2.png)

性能分析完成后，会显示一条通知，引导你打开或保存报告。

![Screenshot that shows the succeeded notification](./images/profiling/by-model-file-succeeded.png)

该报告包含 ONNX 模型的详细性能分析统计信息和结果。

![Screenshot that shows the report data](./images/profiling/by-model-file-result.png)

### 对每个操作的基准时间进行分析

如果启用了 OP 性能分析功能，将生成操作级别的数据，让你可以更详细地检查模型。

![Screenshot that shows the succeeded notification with OP profiling enabled](./images/profiling/by-model-file-op-succeeded.png)

该报告包含每个操作的详细延迟信息。

![Screenshot that shows the report data for each OP](./images/profiling/by-model-file-op-result.png)

#### 为 Intel (OpenVINO) EP 启用操作级别数据

要在 Intel (OpenVINO) EP 上运行时查看操作级别数据，请执行以下操作：

1. 下载 [Intel® Unified Telemetry](https://www.intel.com/content/www/us/en/developer/tools/intel-unified-telemetry.html)
1. 将内容解压到一个路径，例如 `C:\Users\XXX\Downloads\ut-tool-ext-v0.2.0-beta1.1`
1. 在 Foundry 工具包设置中，将 `Model Lab Intel Unified Telemetry Path` 设置为 `C:\Users\XXX\Downloads\ut-tool-ext-v0.2.0-beta1.1\bin`

Intel Unified Telemetry 需要管理员权限才能运行。如果 VS Code 未以管理员身份运行，性能分析将提示提升权限，并打开一个新的终端窗口显示其进度。在此进程完成之前，不要关闭此窗口。

如果 VS Code 已经以管理员身份运行，则不会提示，也不会打开额外的窗口。


## 对 ONNX GenAI 模型进行性能分析

在此模式下，性能分析工具会在目标执行提供程序（EP）上对 ONNX GenAI 模型进行性能分析，处理指定数量的提示。你可以在运行时查看资源使用情况。

![Screenshot that shows how to start by genai model](./images/profiling/by-genai-model-file-config.png)

> [!NOTE]
> 你需要选择 GenAI 模型的文件夹，该文件夹是包含 `genai_config.json` 的文件夹。

## 资源使用视图

在主窗口中，顶部的图表显示 CPU、GPU、NPU 和内存的使用情况。使用情况每秒更新一次，并保留 10 分钟。你可以使用右上角的工具通过放大、缩小和平移来导航时间轴。

![Screenshot that shows the resource usage view](./images/profiling/resource-usage-view.png)

> [!NOTE]
> 此功能使用性能计数器。要获得更高的准确性，你也可以尝试使用 [Windows Performance Recorder](https://learn.microsoft.com/en-us/windows-hardware/test/wpt/windows-performance-recorder)。

## Windows ML 事件视图

在主窗口中，底部的图表显示 Windows ML 事件。其时间轴与资源使用视图同步，因此你可以轻松确定在发生某些事件时资源是如何被使用的。

> [!IMPORTANT]
> 要接收 Windows ML 事件，该工具需要在管理员模式下运行。如果 VS Code 未以管理员模式启动，则会显示一条通知，引导你重启 VS Code。你需要关闭所有其他 VS Code 实例，才能使管理员模式下的重启生效。
> ![Screenshot that shows a notification to restart VS Code in admin mode](./images/profiling/events-view-admin.png)

目前，只显示以下事件类型：

- Ensure ExecutionProvider Ready：当 Windows ML 正在准备 EP 时
- Session Creation：当会话创建时
- Inference：当模型在会话上运行推理时

![Screenshot that shows the Windows ML events view](./images/profiling/events-view.png)

## 你学到内容

在本文中，你学习了如何：

- 以不同方式启动性能分析
- 检查资源使用视图
- 检查 Windows ML 事件视图

## 另请参阅

- [如何衡量在本地运行的 AI 模型的性能](https://learn.microsoft.com/en-us/windows/ai/npu-devices/#how-to-measure-performance-of-ai-models-running-locally-on-the-device-npu)
- [性能监视器](https://learn.microsoft.com/en-us/troubleshoot/windows-server/support-tools/troubleshoot-issues-performance-monitor)
- [ONNX Runtime 跟踪](https://onnxruntime.ai/docs/performance/tune-performance/logging_tracing.html)
