---
ContentId: A963901F-BF3F-455F-AD75-AB54EAE72BEF
DateApproved: 12/13/2022
MetaDescription: 使用 Visual Studio Code 在容器中开发、构建和调试 Node.js 应用。
---
# 容器中的 Node.js

在本指南中，你将学习如何：

- 为 [Express](https://expressjs.com/) Node.js 服务容器创建 `Dockerfile` 文件
- 构建、运行并验证服务的功能
- 调试在容器中运行的服务

## 先决条件

- 必须按照[概述](/docs/containers/overview.md#installation)中的说明安装 Docker 和 VS Code 容器工具扩展
- [Node.js](https://nodejs.org/) 版本 10 或更高版本

## 创建 Express Node.js 应用程序

1. 为项目创建一个文件夹。
1. 在项目文件夹中打开开发命令提示符并创建项目：

   ```bash
   npx express-generator
   npm install
   ```

## 向项目添加 Docker 文件

1. 在 VS Code 中打开项目文件夹。
1. 打开命令面板（`kb(workbench.action.showCommands)`）并使用 **Containers: Add Docker Files to Workspace...** 命令：

   ![向 Node.js 项目添加 Dockerfile](images/quickstarts/node-add-node-dark.png)

1. 当提示选择应用程序平台时，选择 **Node.js**。
1. 选择默认的 **package.json** 文件。
1. 当提示输入应用程序端口时，输入 `3000`。
1. 当提示是否包含 Docker Compose 文件时，选择 **是** 或 **否**。Compose 通常用于同时运行多个容器。

扩展会创建 `Dockerfile` 和 `.dockerignore` 文件。如果你选择包含 Docker Compose 文件，还将生成 `docker-compose.yml` 和 `docker-compose.debug.yml`。最后，扩展会在 `.vscode/tasks.json` 中创建一组 **VS Code 任务**，用于构建和运行容器（包括调试和发布配置），并在 `.vscode/launch.json` 中创建**启动调试配置**，用于在容器内调试服务。

## 向镜像添加环境变量

容器工具扩展通过使用 [IntelliSense](/docs/editing/intellisense.md) 提供自动完成和上下文帮助，帮助你编写 Dockerfile。要查看此功能的实际效果，请按照以下步骤向服务镜像添加环境变量：

1. 打开 `Dockerfile` 文件。
1. 使用 `ENV` 指令向服务容器镜像添加环境变量。

   ![向 Docker 镜像添加环境变量](images/quickstarts/nodejs-intellisense-env.png)

   请注意容器工具扩展如何列出所有可用的 Dockerfile 指令并描述其语法。

   > 容器工具扩展使用 `Dockerfile` 的 `base` 阶段来为你的服务创建容器镜像的调试版本。请将环境变量定义放在 `base` 阶段中，以使此变量在容器镜像的调试和发布版本中都可用。
1. 保存 `Dockerfile` 文件。

## 在本地运行服务

1. 打开终端（`kb(workbench.action.terminal.toggleTerminal)`）。
1. 输入 `npm run start` 启动应用程序：

   ```
   > express-app@0.0.0 start /Users/user/code/scratch/express-app
   > node ./bin/www
   ```

1. 打开网页浏览器并导航到 [http://localhost:3000](http://localhost:3000)。你应该会看到类似以下的页面：

   ![浏览器中的应用程序页面](images/quickstarts/node-run-browser.png)

1. 测试完成后，在终端中输入 `kbstyle(Ctrl+C)`。

## 构建服务镜像

1. 打开命令面板（`kb(workbench.action.showCommands)`）并选择 **Container Images: Build Image...** 命令。
1. 打开容器资源管理器并验证新镜像在镜像视图中可见：

   ![验证 Docker 镜像存在](images/quickstarts/node-verify-image-dark.png)

## 运行服务容器

1. 右键单击上一节中构建的镜像，然后选择 **运行** 或 **交互式运行**。容器应该会启动，你应该能够在容器视图中看到它：

   ![运行中的服务容器](images/quickstarts/node-running-container-dark.png)

1. 打开网页浏览器并导航到 [http://localhost:3000](http://localhost:3000)。你应该会看到类似以下的页面：

   ![浏览器中的应用程序页面](images/quickstarts/node-run-browser.png)

1. 测试完成后，在容器视图中右键单击容器并选择 **停止**。

## 在服务容器中调试

当容器工具扩展向应用程序添加文件时，它还会在 `.vscode/launch.json` 中添加一个 **VS Code 调试器配置**，用于在容器内运行服务时进行调试。该扩展会检测服务使用的协议和端口，并将浏览器指向该服务。

1. 在 `routes/index.js` 中 `'/'` 路由的 `get()` 处理程序中设置一个断点。

1. 确保选择了 **Containers: Node.js Launch** 调试器配置。

   ![已选择的调试配置](images/quickstarts/node-debug-configuration-dark.png)

1. 开始调试（使用 `kb(workbench.action.debug.start)` 键）。
    - 服务的镜像会构建。
    - 服务的容器会运行。
    - 浏览器会打开到映射到服务容器的（随机）端口。
    - 调试器会在 `index.js` 中的断点处停止。

    > 请注意，由于调试器在应用程序启动*之后*附加，因此断点可能会在第一次时被错过；你可能需要刷新浏览器才能在第二次尝试时看到调试器在断点处停止。
    >
    > 你可以通过在 `tasks.json` 中 `docker-run: debug` 任务的 `node` 对象下，将 [inspectMode](/docs/containers/reference.md#node-object-properties-dockerrun-task) 属性设置为 `break`，来配置应用程序在开始执行之前等待调试器附加。

## 查看应用程序日志

你可以通过容器上的 **查看日志** 命令在 VS Code 中查看日志：

1. 导航到容器资源管理器。
1. 在 **容器** 视图中，右键单击你的容器并选择 **查看日志**。

    ![终端中日志的截图](images/quickstarts/node-view-logs-dark.png)

1. 输出将显示在终端中。

## 后续步骤

你已完成！现在你的容器已准备就绪，你可能想要：

- [了解在容器中调试 Node.js](/docs/containers/debug-node.md)
- [自定义你的 Docker 构建和运行任务](/docs/containers/reference.md)
- [将镜像推送到容器注册表](/docs/containers/quickstart-container-registries.md#push-an-image-to-a-container-registry)
- [了解如何使用 Docker Compose](/docs/containers/docker-compose.md)
