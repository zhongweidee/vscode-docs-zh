---
ContentId: 8a7c3f4e-5b2d-4c9a-8e1f-6d3a2b1c0e9f
MetaDescription: 使用输出日志、跟踪日志和诊断工具在 Visual Studio Code 中诊断 Git 问题
DateApproved: 6/10/2026
Keywords:
- source control
- git
- troubleshooting
- debugging
- logs
---
# 源代码管理故障排除

本文帮助你使用输出日志和跟踪日志来诊断和解决 Visual Studio Code 中的 Git 问题。当 Git 操作失败或行为异常时，使用这些诊断工具。

## Git 输出窗口

VS Code 使用你机器上的 Git 安装来执行源代码管理操作。Git 输出窗口提供了 VS Code 所执行 Git 命令的详细日志。这些信息有助于了解正在执行哪些 Git 操作以及诊断问题。

要打开 Git 输出窗口：

* 在源代码管理视图中，选择 **...** 菜单，然后选择 **显示 Git 输出**

* 从命令面板 (`kb(workbench.action.showCommands)`) 运行 **Git: Show Git Output** 命令

* 打开 **输出** 面板 (`kb(workbench.action.output.toggleOutput)`)，然后从下拉菜单中选择 **Git**

![显示 Git 输出通道的输出面板截图。](images/troubleshooting/git-output.png)

Git 输出窗口显示：

* Git 扩展的当前日志级别
* 正在使用的 Git 可执行文件的位置
* VS Code 执行的 Git 命令
* 命令错误消息
* 每个命令的时间戳和耗时

当 Git 操作失败或行为异常时，请查看此输出。这些信息有助于识别 Git 配置、身份验证或仓库状态方面的问题。

> [!TIP]
> 默认情况下，除非发生错误，否则 Git 输出窗口不会显示 Git 命令的标准输出。通过 `setting(git.commandsToLog)` 设置，你可以指定哪些 Git 命令应始终记录其标准输出，以获取更详细的诊断信息。

## 筛选和搜索 Git 日志

Git 输出窗口可能会生成大量信息。要高效地查找相关条目，可以使用以下技巧：

* 使用输出面板中的下拉菜单按日志级别或日志类别筛选输出

    ![输出面板筛选下拉菜单截图。](images/troubleshooting/git-output-filters.png)

    日志级别包括：`trace`、`debug`、`info`、`warning`、`error`。默认情况下，Git 输出窗口显示 `info` 级别及以上的日志。

    日志类别会根据记录的内容而变化，例如 `git` 或 `repository`。要查看正在运行的 Git 命令，请选择 `git` 类别。

* 使用输出面板中的搜索框 (`kb(actions.find)`) 搜索特定词语

    Git 输出窗口会高亮显示搜索词语，并允许你在匹配项之间导航。搜索框支持使用正则表达式进行高级搜索。

    ![输出面板搜索框截图。](images/troubleshooting/git-output-search.png)

## 启用 Git 扩展的跟踪日志

要获取更详细的诊断信息，你可以为 Git 扩展启用跟踪日志。跟踪日志提供了扩展操作的详细冗余信息，包括内部状态和详细的命令执行过程。

要启用跟踪日志：

1. 打开 Git 输出窗口

1. 选择输出面板标题中的齿轮图标，然后选择一个日志级别，例如 `trace`

    ![输出面板日志级别选择截图。](images/troubleshooting/git-output-log-level.png)

    当你选择一个日志级别时，VS Code 会记录该级别及以上的消息。例如，选择 `trace` 会记录所有消息，而选择 `error` 则只记录错误消息。

## 后续步骤

* [源代码管理常见问题解答](/docs/sourcecontrol/faq.md) - 关于 Git 和源代码管理的常见问题解答
* [源代码管理概览](/docs/sourcecontrol/overview.md) - 了解 VS Code 的源代码管理功能
* [Git 文档](https://git-scm.com/doc) - Git 官方文档和资源
