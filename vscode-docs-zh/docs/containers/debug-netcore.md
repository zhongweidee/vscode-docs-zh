---
ContentId: B1DF33C0-400C-413D-B60B-D1AA278F6DE3
DateApproved: 12/14/2023
MetaDescription: 使用 Visual Studio Code 调试在容器中运行的 .NET 应用。
---
# 在容器中调试 .NET 应用

## 先决条件

1. 安装 [.NET SDK](https://www.microsoft.com/net/download)，其中包含对附加 .NET 调试器的支持。使用 .NET SDK 7 或更高版本时，你可以选择在没有 Dockerfile 的情况下进行调试。

1. 安装 Visual Studio Code [C# 扩展](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)，其中包含通过 VS Code 附加 .NET 调试器的支持。

1. 仅限 macOS 用户：在 Docker 偏好设置中将 `/usr/local/share/dotnet/sdk/NuGetFallbackFolder` 添加为共享文件夹。

    ![dockerSharedFolders](images/debug/mac-folders.png)

## 操作步骤

- 如果需要，使用 `dotnet new` 创建一个 .NET 项目。
- 在 VS Code 中打开项目文件夹。
- 可选地，设置一个断点。

## .NET SDK 与 Dockerfile 构建

有两种方式可以在容器内构建和调试你的应用：使用 Dockerfile，或者对于 .NET 7 及更高版本，不使用 Dockerfile。

### .NET SDK 容器构建（无需 `Dockerfile` 的调试）

此选项适用于 Web 项目，并且在 Docker 设置为使用 Linux 容器时可用。

1. 按 `kb(workbench.action.debug.start)` 或从 **运行** 菜单中选择 **开始调试**。（如果你的 `launch.json` 中有任何现有的启动配置文件，你可以使用 `kb(editor.action.commentLine)` 将它们注释掉）
1. 系统会提示你选择调试器列表。选择 **容器: 在容器中调试**
1. 当提示选择是使用 `Dockerfile` 构建（**使用 Dockerfile**）还是使用 .NET SDK 构建（**使用 .NET SDK**）时，选择 **使用 .NET SDK**。
1. 如果你的工作区中有多个项目文件，请选择要调试的项目所关联的项目文件。如果构建成功，你的 .NET 应用将在容器中运行，并且 Web 应用会在浏览器中打开。

>**注意**：支持的 .NET SDK 版本：此功能默认适用于 .NET SDK 7.0.300 及以上版本。对于 7.0.100 到 7.0.300 之间的版本，请使用 `dotnet add package Microsoft.NET.Build.Containers` 来启用它。你可以在 [Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/docker/publish-as-container) 上了解更多关于 .NET SDK 容器构建的信息。


### 使用 `Dockerfile` 进行调试

1. 等待出现一条通知，询问你是否要添加调试所需的资源文件。选择 **是**：

   ![csharpPrompt](images/debug/csharp-prompt.png)

1. 打开命令面板 (`kb(workbench.action.showCommands)`) 并输入 **容器: 向工作区添加 Docker 文件...**。如果你已经将应用容器化，则可以执行 **容器: 初始化容器调试**。按照提示操作。
1. 切换到 **运行和调试** 视图 (`kb(workbench.view.debug)`)。
1. 选择 **容器: .NET Launch** 启动配置。
1. 开始调试！(`kb(workbench.action.debug.start)`)

## 使用 SSL 支持进行运行和调试

要启用 SSL（使用 HTTPS 协议），你需要对你的配置进行一些更改。

1. 在 Dockerfile 中，在基础部分添加一行 `EXPOSE`，以定义一个单独的 HTTPS / SSL 端口。同时保留另一行 `EXPOSE`，使用不同的端口号用于 HTTP 请求。

   ```docker
   FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
   WORKDIR /app
   EXPOSE 5000
   EXPOSE 5001
   ```

1. 在 `.vscode/tasks.json` 文件中，在 `netCore` 部分添加 `configureSsl: true`。同时，在 `docker-run: debug` 任务的 `dockerRun` 部分添加一个环境变量 `ASPNETCORE_URLS`，使用与 Dockerfile 中定义的相同端口号：

   ```json
   dockerRun: {
       "env": {
          "ASPNETCORE_URLS": "https://+:5001;http://+:5000"
      }
    }
    netCore: {
        "appProject": "${workspacefolder}/MyProject.csproj",
        "enableDebugging": true,
        "configureSsl": true
    }
   ```

有关其他自定义选项，请参阅 [任务](/docs/containers/reference.md) 和 [调试容器化应用](/docs/containers/debug-common.md) 的文档。

## 为 .NET SDK 容器构建保存项目文件偏好设置

如果你的工作区文件夹中有多个 .NET 项目文件，并且你想专门调试一个特定的项目（而不希望每次 `kb(workbench.action.debug.start)` 时都从项目文件列表中提示选择），你可以按照以下步骤保存你的启动配置文件：

1. 按照 [.NET SDK 容器构建](#net-sdk-container-build-debug-without-dockerfile) 中的步骤操作，并保持调试会话处于活动状态。
1. 点击调试器视图中的 `齿轮` 图标。

   ![dockerSharedFolders](images/debug/debugger-scaffolding.png)

1. 选择 **容器: 在容器中调试**
1. 选择要调试的项目所关联的项目文件

你的项目偏好设置已保存，此后在 `kb(workbench.action.debug.start)` 时不再需要选择项目文件。