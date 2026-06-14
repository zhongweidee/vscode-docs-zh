---
ContentId: EC8DC085-A0E4-4401-B41F-6497EDD49352
DateApproved: 7/25/2019
MetaDescription: 如何在 Visual Studio Code 的 C/C++ 扩展中启用日志记录
Keywords:
- C++
---
# C/C++ 扩展日志记录

语言服务器和调试适配器均提供日志记录信息。如果您遇到的问题我们无法根据问题报告中的信息进行诊断，我们可能会要求您启用日志记录并将日志发送给我们。

日志记录信息会直接发送到语言服务器的输出面板和调试适配器的调试控制台。

## 为语言服务器启用日志记录

要为语言服务器启用完整日志记录，请按照以下步骤操作：

1. 打开**命令面板**，选择 **首选项: 工作区设置**。
1. 在搜索框中搜索 "logging"。
1. 找到 **C_Cpp: Logging Level**，然后将级别更改为 **Debug**。

   ![Logging level](images/cpp/logging-level.png)

1. 从主菜单中选择 **查看** > **输出**，打开输出面板。

1. 在日志筛选器选择器中选择 **C/C++** 选项：

   ![Log filter selector](images/cpp/log-filter-selector.png)

## 为调试适配器启用日志记录

为调试适配器启用日志记录将显示 VS Code 与我们的扩展之间以及我们的扩展与调试适配器之间的通信信息。

调试适配器的日志记录配置在 `launch.json` 中进行设置。

### LLDB-MI 调试器的日志记录

macOS LLDB-MI 调试器的日志记录块及其默认配置位于 `launch.json` 中：

```json
"logging": {
    "trace": false,
    "traceResponse": false,
    "engineLogging": false
}
```

## VS Code 与 CppTools 扩展

此处的日志记录称为 `trace` 日志记录，可以通过在 `launch.json` 的日志记录块中将 `trace` 和 `traceResponse` 设置为 `true` 来启用。这将有助于诊断 VS Code 与我们的扩展之间的通信以及我们扩展的响应相关问题。

### CppTools 扩展与调试器

CppTools 与调试器之间的日志记录称为 `engineLogging`。当使用 `gdb` 或 `lldb` 等 MI 调试器时，这将显示使用 `mi` 解释器的请求、响应和事件。此日志记录将帮助我们确定调试器是否接收到正确的命令并生成正确的响应。

## Visual C++ 调试器的日志记录

Visual C++ 调试器的日志记录块及其在 `launch.json` 中的默认配置如下：

```json
"logging": {
    "engineLogging": false
}
```

Visual C++ 调试器日志记录将仅显示与 VS Code 之间的通信，因为与调试器的所有通信均在进程内部完成，无法通过日志记录查看。
