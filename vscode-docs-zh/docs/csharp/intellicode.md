---
ContentId: 0a0fd079-c56b-413c-8394-b166cd76be38
DateApproved: 6/6/2023
MetaDescription: Visual Studio Code 中适用于 C# 的 IntelliCode
---
# 适用于 C# Dev Kit 的 IntelliCode

对于在 Visual Studio Code 中使用 [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) 扩展的用户，可以使用[适用于 C# Dev Kit 的 IntelliCode](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscodeintellicode-csharp) 扩展来提供 IntelliCode 支持。C# Dev Kit 用户可以使用整行代码预测功能，以及在 IntelliSense 列表中对方法和属性进行排名。

## 整行建议

**场景 1**：当显示灰色文本时，按 `kbstyle(Tab)` 接受预测（建议）。

![按 Tab 接受预测](images/intellicode/accept-prediction.gif)

**场景 2**：当灰色文本与 IntelliSense 列表同时显示时，按 `kbstyle(Tab)` 接受 IntelliSense 列表选择，然后再按 `kbstyle(Tab)` 接受多标记预测的其余部分。在此场景中，您可以使用 IntelliSense 列表选择来引导 IntelliCode 提供的多标记预测。

![使用列表选择引导多选预测](images/intellicode/multi-token-prediction.gif)

此外，如果模型建议某个字符串应该存在，但对该字符串没有建议，按 `kbstyle(Tab)` 会将光标移入空字符串中，使您更容易完成代码行。

该模型根据对您迄今为止所编写代码的丰富了解来预测您接下来要输入的内容，包括：

* 变量名称和位置
* 您正在使用的库
* 附近代码中的函数
* IntelliSense 列表

## 星级建议

此扩展通过将推荐补全项显示在补全列表顶部，提供 AI 辅助的 IntelliSense 功能。

![在 IntelliSense 列表中使用星级对方法和属性进行排名](images/intellicode/rank-methods.png)

对于重载，IntelliCode 不会让您花时间循环浏览按字母顺序排列的成员列表，而是首先显示最相关的成员。此扩展不仅会对已知方法进行排名，其深度学习模型还会对您代码中独有的方法进行排名。

要查看 IntelliSense 列表中的 AI 辅助排名，您必须首先打开属于解决方案一部分的 C# 文件。不属于解决方案的 C# 文件将无法使用此功能。

## 安全与隐私

您的所有代码都保留在本地——模型直接在您的计算机上运行——因此无需将代码传输到远程服务器进行自定义模型训练。这得益于我们的机器学习系统设计，该设计大幅减少了内存占用并提高了推理速度。

由于支持 IntelliCode 功能的模型在您的本地计算机上运行，因此 IntelliCode 支持可以在离线和气隙环境中使用。

## 获取其他语言的支持

要在 VS Code 中获取 Python、JavaScript 和 TypeScript 的 IntelliCode 整行自动补全功能，请安装通用的 [IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode) 扩展。除了支持整行自动补全的语言外，通用扩展还会在 IntelliSense 列表中使用星级对 Python 和 SQL 的方法和属性进行排名。

## 先决条件

要使用此扩展，您必须在计算机上安装并启用 C# Dev Kit 和 .NET 6。此扩展支持以下平台和操作系统：

* **Windows**：x64 和 ARM
  * x64 和 ARM 已在 Windows 11 22H2 上测试
* **macOS**：x64 和 ARM
  * x64 已在 OS X Monterey v12.6.5 上测试
  * ARM 已在 OS X v PENDING 上测试
* **Linux**：x64 和 ARM
  * x64 已在 Ubuntu 22.04 上测试

## 如何报告反馈和问题

您可以在我们的 IntelliCode for VS Code 扩展 [GitHub 反馈仓库](https://github.com/MicrosoftDocs/intellicode/issues)上提交问题。
