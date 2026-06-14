---
ContentId: d2ce015b-4075-4467-a221-114aff2633db
DateApproved: 6/3/2026
MetaDescription: 了解如何从 Visual Studio Marketplace 安装扩展，为 Visual Studio 添加编程语言、框架或开发工作流的功能。
---
# 在 Visual Studio Code 中使用扩展

Visual Studio Code 扩展允许你向安装中添加语言、调试器和工具，以支持你的开发工作流。使用 VS Code 时，你可以直接从 [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode) 安装扩展，并利用自动更新功能始终拥有最新特性。在本文中，你将学习如何在 VS Code 中浏览和安装扩展。

Visual Studio Marketplace 托管了涵盖各种类别的数千个扩展。为了保护你免受恶意扩展的侵害，它采用了多种机制，例如发布者信任、恶意软件扫描等。详细了解[扩展运行时安全性](/docs/configure/extensions/extension-runtime-security.md)。

## 浏览扩展

VS Code 中的"扩展"视图允许你浏览和安装来自 [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode) 的扩展。

要在 VS Code 中浏览扩展 Marketplace：

1. 通过选择活动栏中的"扩展"图标或使用 `kb(workbench.view.extensions)` 键盘快捷键来打开"扩展"视图。

    ![扩展视图的屏幕截图，按"todo"筛选，突出显示活动栏图标。](images/extensions/search-for-todo-extension.png)

1. 可选择使用搜索框搜索扩展或使用筛选条件之一。例如，按扩展类别筛选。

1. 选择一个扩展以查看其详细信息，例如其描述、发布者、安装次数、用户评分等。

## 安装 VS Code 扩展

你可以直接从 VS Code 的"扩展"视图安装扩展。或者，你也可以从 [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode) 网站安装扩展。

1. 打开"扩展"视图（`kb(workbench.view.extensions)`）。
1. 选择扩展卡片上的"**安装**"按钮。

    ![扩展视图的屏幕截图，突出显示安装按钮。](images/extensions/todo-extension-install.png)

1. 你也可以在扩展的详细信息视图中选择"**安装**"按钮。

> [!TIP]
> 如果你需要在不同技术栈之间切换，请使用 [VS Code 配置文件](/docs/configure/profiles.md)仅为给定工作负载安装所需的扩展。例如，你可以在一个配置文件中安装用于 Web 开发的扩展，在另一个配置文件中安装用于数据科学的扩展。

## 打开扩展设置

扩展也可以向 VS Code 贡献设置。使用[设置编辑器](/docs/getstarted/personalize-vscode.md#configure-settings)来查看和修改这些设置，就像处理 VS Code 中的其他设置一样。

1. 通过"**文件**" > "**首选项**" > "**设置**"菜单或使用 `kb(workbench.action.openSettings)` 键盘快捷键打开设置编辑器。
1. 在设置树视图中，选择"**扩展**"，然后选择特定的扩展以查看其设置。

    ![设置视图的屏幕截图，显示 GitHub Pull Requests 扩展的设置，突出显示树视图中的"扩展"条目。](images/extensions/settings-view-extension-settings.png)

## 卸载 VS Code 扩展

你可以在 VS Code 的"扩展"视图中卸载扩展。如果你希望暂时禁用某个扩展，可以选择禁用它而不是卸载它。

1. 打开"扩展"视图（`kb(workbench.view.extensions)`）。
1. 选择扩展卡片上的齿轮图标或右键单击扩展卡片，然后选择"**卸载**"。

## 后续步骤

* [扩展 Marketplace](/docs/configure/extensions/extension-marketplace.md)：详细了解推荐的扩展、预发布扩展或从命令行安装扩展。
* [扩展运行时安全性](/docs/configure/extensions/extension-runtime-security.md)：详细了解 VS Code 如何保护你免受恶意扩展的侵害。
* [VS Code 扩展开发](/api/get-started/your-first-extension.md)：为 VS Code 创建和发布你自己的扩展。
* [VS Code 快速入门](/docs/editing/getting-started.md)：通过分步指南了解 VS Code 的关键功能。
* [版本控制](/docs/sourcecontrol/overview.md)：了解如何在 VS Code 中使用 Git 设置版本控制。
* [调试](/docs/debugtest/debugging.md)：为你的项目配置调试。
