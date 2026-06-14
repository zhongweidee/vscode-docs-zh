---
ContentId: 1d35afc9-2439-48bf-84e5-547446d89239
DateApproved: 6/6/2023
MetaDescription: 适用于 Visual Studio Code 的 C# 构建工具
---
# 构建工具

本文档概述了如何在 Visual Studio Code 的 C# 工具中构建 C# 项目和解决方案。它涵盖了 [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) 扩展提供的功能。

## 构建解决方案

当加载一个解决方案时，C# Dev Kit 扩展提供了若干个对该解决方案及其包含的项目进行操作的 `task`。除了能够在解决方案资源管理器中右键单击任何解决方案或项目并进行构建之外，你还可以使用 `.NET: Build` 命令构建整个解决方案：

![Choosing the .NET:Build command](images/build-tools/net-build-command.gif)

你还可以使用 Visual Studio Code 的 `Tasks` 功能来构建解决方案。C# Dev Kit 与任务系统集成，并在 `dotnet` 分组下注册了多个任务。如下所示：

![Showing the `dotnet` task grouping here](images/build-tools/show-dotnet-tasks.gif)

`build` 任务通过 [dotnet build](https://learn.microsoft.com/dotnet/core/tools/dotnet-build) 命令构建已打开的解决方案，而 `clean` 任务则通过 [dotnet clean](https://learn.microsoft.com/dotnet/core/tools/dotnet-clean) 命令清理所有解决方案的输出。

你还可以使用这些任务来监视（`watch`）特定项目。监视项目意味着持续监控项目的文件，并在这些文件发生更改时重新构建项目。这与直接对项目运行 [dotnet watch](https://learn.microsoft.com/dotnet/core/tools/dotnet-watch) 命令相同，只是集成到了你的编辑器中。

## 管理项目文件

项目文件是一个可扩展的 XML 文档，用于描述项目的构建方式。你可以在 [.NET 项目 SDK 文档](https://learn.microsoft.com/dotnet/core/project-sdk/overview)中了解有关 .NET 项目文件的更多信息，但一般来说，你可以通过添加属性（带有内部值的 XML 元素）和项（带有属性的 XML 元素）来修改构建配置。

要添加编辑器功能，例如属性和项的代码补全、语法高亮以及常用项目属性的工具提示，你可以安装 [MSBuild 项目工具](https://marketplace.visualstudio.com/items?itemName=tintoy.msbuild-project-tools) 扩展。请注意，此扩展是一个社区项目，不直接受 Microsoft 支持。
