---
ContentId: 29F731D4-C6FE-4742-A1E7-7288FDB81CB9
DateApproved: 12/13/2022
MetaDescription: 使用 Visual Studio Code 在 Docker 容器中开发、构建和调试 ASP.NET Core 应用。
---
# 容器中的 ASP.NET Core

在本指南中，你将学习如何：

- 创建描述简单 .NET Core 服务容器的 `Dockerfile` 文件。
- 构建、运行并验证服务的功能。
- 调试以容器形式运行的服务。

## 先决条件

- 必须按照[概述](/docs/containers/overview.md#installation)中所述安装 Docker 和 VS Code 容器工具扩展。
- 对于 .NET 开发，请安装 [.NET SDK](https://dotnet.microsoft.com/download)。
- Microsoft [C# for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) 扩展。

## 创建 .NET Web API 项目

1. 为项目创建一个文件夹。
1. 在项目文件夹中打开开发者命令提示符并初始化项目：

   ```bash
   dotnet new webapi --no-https
   ```

## 向项目添加 Docker 文件

1. 在 VS Code 中打开项目文件夹。
1. 等待 C# 扩展提示你添加构建和调试所需的资源，然后选择**是**。你也可以打开命令面板（`kb(workbench.action.showCommands)`）并使用 **.NET: Generate Assets for Build and Debug** 命令。
1. 打开命令面板（`kb(workbench.action.showCommands)`）并使用 **Containers: Add Docker Files to Workspace...** 命令：

   ![添加 Dockerfile 到 .NET 项目](images/quickstarts/aspnetcore-add-dotnet.png)

1. 当提示选择应用程序平台时，选择 **.NET: ASP.NET Core**。
1. 当提示选择操作系统时，选择 **Windows** 或 **Linux**。
    > Windows 仅在你的 Docker 安装配置为使用 Windows 容器时适用。
1. 系统会询问你是否要添加 Docker Compose 文件。在本教程中我们不会使用 Docker Compose，所以回答"是"或"否"都可以。
1. 将应用程序端点的端口更改为 `5000`。
1. `Dockerfile` 和 `.dockerignore` 文件将被添加到工作区。

   该扩展还将创建一组用于构建和运行容器的 **VS Code 任务**（包含调试配置和发布配置，共四个任务），以及一个用于以调试模式启动容器的**调试配置**。

## 构建应用程序

1. 打开终端提示符（`kb(workbench.action.terminal.toggleTerminal)`）。
1. 执行 `dotnet build` 命令来构建应用程序：

   ```
   PS C:\source\repos\net> dotnet build
   MSBuild version 17.4.0-preview-22470-08+6521b1591 for .NET
     Determining projects to restore...
     All projects are up-to-date for restore.
     net -> C:\source\repos\net\bin\Debug\net7.0\net.dll

   Build succeeded.
       0 Warning(s)
       0 Error(s)

   Time Elapsed 00:00:08.96
   ```

## 向镜像添加环境变量

你可以使用容器工具扩展来编写 Docker 文件。该扩展提供自动补全和上下文帮助。要查看这些功能，请按照以下步骤向服务镜像添加环境变量：

1. 打开 `Dockerfile` 文件。
1. 使用 `ENV` 指令向服务容器镜像添加一个环境变量。该指令应放在 `Dockerfile` 的 `base` 阶段（文件中的第一个阶段）。将 `ASPNETCORE_URLS` 变量设置为 `http://*:5000`：

   ![向 Docker 镜像添加环境变量](images/quickstarts/aspnetcore-intellisense-env.png)

   请注意容器工具扩展如何列出所有可用的 Dockerfile 指令并描述其语法。

   > 容器工具扩展使用 `Dockerfile` 的 `base` 阶段为你的服务创建调试版本的容器镜像。将 `ASPNETCORE_URLS` 环境变量定义放在 `base` 阶段，使该变量在容器镜像的调试版本和发布版本中都可用。
1. 保存 `Dockerfile` 文件。

## 构建镜像

1. 打开命令面板（`kb(workbench.action.showCommands)`）并执行 **Container Images: Build Image...** 命令。
1. 打开容器资源管理器，验证新镜像在镜像树中可见：

   ![验证 Docker 镜像存在](images/quickstarts/aspnetcore-verify-image.png)

## 测试服务容器

1. 右键单击上一步构建的镜像，选择**运行**或**交互式运行**。容器应该会启动，你应该能在容器资源管理器的"容器"视图中看到它：

   ![运行中的服务容器](images/quickstarts/aspnetcore-running-container.png)

1. 打开网页浏览器并导航到 [http://localhost:5000/WeatherForecast](http://localhost:5000/WeatherForecast)。你应该会看到 JSON 格式的天气数据，类似如下：

   ```jsonc
   [
       {"date":"2019-11-07T23:31:57.0527092+00:00","temperatureC":4,"temperatureF":39,"summary":"Bracing"},
       {"date":"2019-11-08T23:31:57.0539243+00:00","temperatureC":-19,"temperatureF":-2,"summary":"Freezing"},
       {"date":"2019-11-09T23:31:57.0539269+00:00","temperatureC":2,"temperatureF":35,"summary":"Freezing"},
       {"date":"2019-11-10T23:31:57.0539275+00:00","temperatureC":-4,"temperatureF":25,"summary":"Freezing"},
       {"date":"2019-11-11T23:31:57.053928+00:00","temperatureC":9,"temperatureF":48,"summary":"Bracing"}
    ]
   ```

   > 默认情况下，Docker 会为容器暴露的端口（**容器端口**）分配一个随机选择的**主机端口**。在我们的应用程序中，暴露的（容器）端口是 5000。当你对镜像执行**运行**命令时，VS Code 会尝试对主机端口和容器端口使用相同的端口号。这使得记住使用哪个端口与容器通信变得容易，但如果主机端口已被占用，则不会生效。
   >
   > 如果你在浏览器中看不到容器中的数据，请确保 `docker run` 命令没有报告错误（查看终端窗口中的命令输出）。你还可以通过右键单击容器资源管理器中的容器并选择**检查**来验证容器使用的是哪个主机端口。这将打开一个详细描述容器的 JSON 文档。搜索 `PortBindings` 元素，例如：
   >
   > ```jsonc
   > "PortBindings": {
   >   "5000/tcp": [
   >     {
   >       "HostIp": "",
   >       "HostPort": "5000"
   >     }
   >   ]
   > },
   > ```

1. 测试完成后，右键单击容器资源管理器中的容器并选择**停止**。

## 在容器中调试

当 Docker 文件被添加到应用程序时，容器工具扩展还会添加一个 **VS Code 调试器配置**，用于在服务运行在容器内部时进行调试。该扩展将自动检测服务使用的协议和端口，并将浏览器指向该服务，但我们需要告诉它使用什么 URL 路径。

1. 在 `Controllers/WeatherForecastController.cs` 文件的 `Get()` 方法代码开头设置一个断点。
1. 打开 `.vscode/launch.json` 文件，找到 `Containers: .NET Core Launch` 调试配置。
1. 将 `dockerServerReadyAction` 添加到 `Containers: .NET Core Launch` 配置中：

    ```json
    "dockerServerReadyAction": {
        "uriFormat": "%s://localhost:%s/WeatherForecast"
    }
    ```

1. 确保该配置被选为活动配置：

    ![选中的 Docker 调试配置](images/quickstarts/aspnetcore-debug-configuration.png)

1. 开始调试（`kb(workbench.action.debug.start)`）。
    - 调试版本的服务容器将构建并启动。
    - 浏览器打开以请求新的天气预报。
    - `WeatherForecastController` 中的断点被命中。

你可以通过更改 `docker-run: debug` 任务（在 `.vscode/tasks.json` 文件中定义）使用的 Docker 运行选项来在主机上使用特定端口。例如，如果你想使用相同的端口（5000）来暴露服务，`docker-run: debug` 任务定义将如下所示：

```json
 {
    "type": "docker-run",
    "label": "docker-run: debug",
    "dependsOn": [
        "docker-build: debug"
    ],
    "dockerRun": {
        "ports": [
            { "hostPort": 5000, "containerPort": 5000 }
        ]
    },
    "netCore": {
        "appProject": "${workspaceFolder}/netcorerest.csproj",
        "enableDebugging": true
    }

```

## 后续步骤

你已经完成了！现在你的容器已经准备就绪，你可能想要：

- [了解如何在容器中调试 .NET](/docs/containers/debug-netcore.md)
- [自定义 Docker 构建和运行任务](/docs/containers/reference.md)
- [将镜像推送到容器注册表](/docs/containers/quickstart-container-registries.md#push-an-image-to-a-container-registry)
- [将容器化应用部署到 Azure 应用服务或 Azure 容器应用](/docs/containers/app-service.md)
- [了解如何使用 Docker Compose](/docs/containers/docker-compose.md)
