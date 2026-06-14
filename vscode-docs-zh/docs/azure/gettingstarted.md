---
ContentId:
MetaDescription: 面向开发人员的 Visual Studio Code Azure 工具入门指南
DateApproved: 08/21/2024
---
# Visual Studio Code Azure 工具入门

[Azure 工具扩展包](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)使开发人员能够在当前环境中访问 Azure 云服务，简化了构建 Web 应用程序、管理后端服务、部署 API 以及处理大型数据集的过程。本指南专为在 VS Code 中使用 Azure 工具而设计，提供了有关入门、编写代码、部署应用程序、通过日志进行故障排除、利用 Azure 资源以及在 VS Code 中高效浏览代码的基本提示。

![Explorer view](images/extensions/explorer.png)

## 开始使用

**安装 Azure 工具扩展包。** 打开 VS Code，导航到扩展视图，搜索"Azure Tools"，然后从 Microsoft 安装 [Azure 工具扩展包](/docs/azure/overview.md)。

**导航到 Azure 资源视图。** 选择活动栏（侧边栏）中的 Azure 图标以打开 **Azure 资源**视图。登录 Azure 账户后，Azure 资源视图将显示您所有的现有资源。您可以直接从 VS Code 创建和管理这些服务。

![Azure icon](images/extensions/azure-icon.png)

**使用命令面板搜索 Azure 命令。** 需要了解的一个重要组合键是 (`kb(workbench.action.showCommands)`)，它可以打开命令面板。它是访问 VS Code 中所有功能的起点，包括命令、键盘快捷方式和打开文件。

在命令面板中输入 `Azure` 即可列出特定于 Azure 的命令。例如，打开 Cloud Shell。

![Command palette](images/extensions/command-palette.png)

**打开文件夹。** Visual Studio Code *工作区*是在一个 VS Code 窗口（实例）中打开的一个或多个文件夹的集合。在大多数情况下，您会打开单个文件夹作为工作区。您可以通过使用**文件 > 打开文件夹...**菜单并选择一个文件夹来打开工作区。不过，根据您的开发工作流程，您可以使用一种称为多根工作区的高级配置来包含多个文件夹。

**查看设置。** 要编辑或查看 VS Code 中的当前设置，请使用 (`kb(workbench.action.openSettings)`) 打开设置编辑器。查看任何扩展可能提供的设置会很有帮助。

**识别和自定义键盘快捷方式。** 您可以使用键盘快捷方式编辑器 (`kb(workbench.action.openGlobalKeybindings)`) 来查找和配置 VS Code 中的键盘快捷方式。获取有关[键盘快捷方式编辑器](/docs/configure/keybindings.md#keyboard-shortcuts-editor)的更多信息。

**重新显示通知。** 您可以右键单击 VS Code 状态栏右下角的铃铛图标，以查看错过的通知。

## 编写代码

利用以下功能节省时间：高效地创建和管理 Azure 资源、更轻松地组织文件和进行部署、根据工作流程进行自定义，以及直接从 VS Code 中通过已安装的扩展无缝创建 Azure 资源。

**资源和工作区视图** 使用资源浏览器创建和管理 Azure 资源。使用工作区浏览器创建文件和进行部署。

**分组** 更改资源的分组方式以适配您的工作流程。

**创建资源** 直接从 VS Code 中通过已安装的扩展创建 Azure 资源。

## Azure 应用/资源的故障排除

快速定位和查看详细的日志信息，访问您的近期活动，并轻松管理您最近创建的资源。

**查找日志。** 输出通道显示文本信息，如日志、消息和其他信息。使用 **Ctrl+Shift+U** 显示输出。

**提示：** 可以在输出通道中找到更详细的日志信息。

**访问资源。** 在**活动日志**中查看您的所有近期活动，并快速访问您最近创建的资源。

## 后续步骤

* [部署](/docs/azure/deployment.md) - 了解如何使用 Azure 将应用部署到云端。
