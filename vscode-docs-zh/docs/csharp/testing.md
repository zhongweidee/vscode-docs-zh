---
ContentId: 0e62b3c9-6c13-4a71-a942-63d37c8f47d1
DateApproved: 3/12/2025
MetaDescription: 在 Visual Studio Code 中使用 C# Dev Kit 测试 C#
---
# 使用 C# Dev Kit 进行测试

在 Visual Studio Code 中使用 C# 进行测试是通过 C# Dev Kit 扩展启用的。它是一个轻量级扩展，用于增强你的 C# 开发体验。

## 概述

该扩展支持以下测试框架：

- [xUnit](https://learn.microsoft.com/dotnet/core/testing/unit-testing-with-dotnet-test)
- [NUnit](https://learn.microsoft.com/dotnet/core/testing/unit-testing-with-nunit)
- [MSTest](https://learn.microsoft.com/dotnet/core/testing/unit-testing-with-mstest)

C# Dev Kit 扩展提供以下功能：

- 运行/调试测试用例
- 查看测试报告
- 在测试资源管理器中查看测试

## 要求

- [.NET 6.0 SDK 或更高版本](https://dotnet.microsoft.com/download)
- Visual Studio Code（版本 1.58.0 或更高版本）
- [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)

## 项目设置

> 注意：如果你已经在项目中设置了 C# 测试框架，可以跳转到功能部分。

### 启用测试并向项目添加测试框架包

你只需在解决方案资源管理器中执行几个步骤，即可为项目启用测试框架：

**xUnit**

打开命令面板并选择 **.NET: New Project..**，然后选择 **xUnit Test Project**，并为新项目提供名称和位置。这将创建一个新项目和目录，使用 xUnit 作为测试库，并通过向项目文件添加以下 `<PackageReference />` 元素来配置测试运行器。

- Microsoft.NET.Test.Sdk
- xunit
- xunit.runner.visualstudio
- coverlet.collector

在终端中运行以下命令：

```bash
dotnet add [location of your test csproj file] reference [location of the csproj file for project to be tested]
```

**NUnit**

打开命令面板并选择 **.NET: New Project..**，然后选择 **NUnit3 Test Project**，并为新项目提供名称和位置。这将创建一个新项目和目录，使用 NUnit 作为测试库，并通过向项目文件添加以下 `<PackageReference />` 元素来配置测试运行器。

- Microsoft.NET.Test.Sdk
- nunit
- NUnit3TestAdapter

在终端中运行以下命令：
```bash
dotnet add [location of your test csproj file] reference [location of the csproj file for project to be tested]
```

**MSTest**

打开命令面板并选择 **.NET: New Project..**，然后选择 **MSTest Test Project**，并为新项目提供名称和位置。这将创建一个新项目和目录，使用 MSTest 作为测试库，并通过向项目文件添加以下 `<PackageReference />` 元素来配置测试运行器。

- Microsoft.NET.Test.Sdk
- MSTest.TestAdapter
- MSTest.TestFramework
- coverlet.collector

在终端中运行以下命令：

```bash
dotnet add [location of your test csproj file] reference [location of the csproj file for project to be tested]
```

## 功能

### 运行/调试测试用例

编写测试用例后，你需要对测试项目执行生成操作，以使它们被识别为测试。打开命令面板并选择 **.NET: Build**。这将生成你的项目。

[C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) 将在类和方法定义的左侧生成快捷方式（绿色播放按钮）。要运行目标测试用例，请选择绿色播放按钮。你也可以右键单击它以查看更多选项。

### 测试资源管理器

测试资源管理器是一个树视图，用于显示工作区中的所有测试用例。你可以选择 Visual Studio Code 左侧活动栏上的烧杯按钮来打开它。你还可以从那里运行/调试测试用例并查看其测试结果。如果你尚未对项目执行生成操作，请选择 **刷新测试** 按钮来执行生成并发现所有测试。

### C# Dev Kit 中的代码覆盖率
C# Dev Kit 现在通过 VS Code 代码覆盖率 API 支持代码覆盖率。此功能允许你通过显示测试期间执行了哪些代码行以及哪些未执行来衡量测试的有效性。


代码覆盖率是一个指标，用于跟踪自动化测试执行的代码库百分比。它有助于识别未经测试的
代码部分，并通过确保全面的覆盖率来提高测试质量。


> **注意**：要启用代码覆盖率，请确保你已安装最新版本的 C# Dev Kit。

要运行带代码覆盖率的测试，请按以下步骤操作：
  - 1. 从活动栏打开测试资源管理器。
  - 2. 选择并运行带覆盖率的测试：选择要运行的测试并执行带覆盖率的运行。
  - 3. 查看覆盖率数据：代码覆盖率数据会自动生成，并与测试结果一起显示在测试资源管理器中。

如果你已生成覆盖率报告并想在 VS Code 中查看结果：
  - 1. 使用命令面板：打开命令面板（`kb(workbench.action.showCommands)`）并搜索 "Test: Show Coverage" 以访问覆盖率数据。
  - 2. 在编辑器中查看高亮显示的代码覆盖率：
      - 绿色行：表示已测试的代码。
      - 红色行：表示未测试的代码。
  - 3. 测试资源管理器摘要：测试资源管理器提供总体覆盖率摘要，并允许你浏览需要额外测试的特定文件或方法。

要提高代码的测试覆盖率：
  - 检查覆盖率报告（在测试资源管理器或编辑器中）以识别标记为红色的区域，
表示未测试的代码。
  - 创建新的测试以覆盖报告中高亮显示的未测试区域。
  - 重新运行测试并查看更新后的覆盖率，以确保你的代码经过了充分测试。


### 查看测试结果

运行/调试测试用例后，相关测试项的状态将在编辑器装饰和测试资源管理器中更新。

![View test results](images/testing/view-test-results.png)

你可以选择堆栈跟踪中的链接导航到源代码位置。

### VS Code 测试命令

有一些测试命令（例如，**Run All Tests**）可以通过在命令面板（`kb(workbench.action.showCommands)`）中搜索 **Test:** 来找到。

![Testing command in Command Palette](images/testing/testing-command.png)

### VS Code 测试设置

有一些特定于测试的 VS Code 设置，可以通过在设置编辑器（`kb(workbench.action.openSettings)`）中搜索 **Testing** 来找到。

![Testing settings](images/testing/testing-settings.png)
