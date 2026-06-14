---
ContentId: 09cb23b6-b1e9-4a29-a934-cbc16fe109c7
MetaDescription: 使用 Visual Studio Code 对 Node.js 进行 Azure 远程调试
DateApproved: 11/1/2022
---
# Azure 远程调试 Node.js

将 Visual Studio Code 调试器连接到在 **Linux** 上的 **Azure 应用服务** 中运行的 Node.js 应用程序。调试器的工作方式与连接到本地 Node.js 进程时相同——包括断点和日志点的使用。

## 安装扩展

VS Code 的远程调试支持由 [Azure 应用服务](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) 扩展提供，适用于部署到 Azure 的应用程序。

![选择应用服务扩展](images/remote-debugging/install-app-service.png)

要安装 Azure 应用服务扩展：

1. 按 `kb(workbench.view.extensions)` 打开扩展视图
1. 搜索 'azure app service' 以筛选结果。
1. 选择 Microsoft **Azure 应用服务** 扩展并选择 **安装**。

## 连接到 Azure

安装 Azure 应用服务扩展后，你会注意到活动栏中添加了一个 **Azure** 视图。选择 Azure 视图以打开 Azure 应用服务资源管理器。

![应用服务资源管理器](images/remote-debugging/app-service-explorer.png)

在应用服务资源管理器中选择 **登录到 Azure**，或从 **命令面板** (`kb(workbench.action.showCommands)`) 中选择 **Azure: 登录** 以登录到你的 Azure 帐户。如果你没有帐户，请选择 **创建 Azure 帐户...** 来创建一个 Azure 免费帐户，以便试用 Azure 服务的任意组合。

> **提示：** 如果你还没有将应用部署到 Azure 应用服务，可以先按照本教程进行操作：[将 Node.js + MongoDB Web 应用部署到 Azure](https://learn.microsoft.com/azure/app-service/tutorial-nodejs-mongodb-app)。

## 启动远程调试会话

要为你的应用程序启动远程调试会话，请在应用服务资源管理器中右键单击你的应用，然后选择 **启动远程调试**。

![启动远程调试](images/remote-debugging/start-remote-debugging.png)

此过程要求重启应用并启用调试器。系统会提示你确认重启。

重启后，VS Code 会通过 SSH 隧道连接到应用的调试端口。建立连接可能需要一些时间。连接成功后，VS Code 会切换到调试模式，其工作方式与在本地调试应用时相同。

![远程断点](images/remote-debugging/remote-breakpoint.png)

当你准备结束远程调试会话时，像平常一样断开调试器的连接，并确认要重启应用。

## 后续步骤

* [日志点](/docs/debugtest/debugging.md#logpoints) - 使用日志点将日志输出到控制台，而无需在调试器中"中断"。
* [Azure 扩展](/docs/azure/extensions.md) - VS Code 市场中包含数百个适用于 Azure 和云服务的扩展。
* [部署到 Azure](/docs/azure/deployment.md) - 逐步了解如何将你的应用程序部署到 Azure。
