---
ContentId: 8f2c9a1b-3d4e-5f6a-7b8c-9d0e1f2a3b4c
DateApproved: 6/10/2026
MetaDescription: 开始使用 VS Code 中不同类型的代理，在本地、后台或云端运行任务。在不同代理之间交接工作，为你的工作流选择最优方案。
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- background
- cloud agent
- copilot coding agent
- copilot cli
- tutorial
---

# 教程：在 VS Code 中使用代理

本教程将带你了解如何在 Visual Studio Code 中使用不同类型的代理。你将从头构建一个待办事项应用，添加主题切换功能，并通过将工作委派给本地代理、计划代理、后台代理和云端代理来重新设计布局。

> [!TIP]
> 如果你还没有 Copilot 订阅，可以通过注册 [Copilot 免费计划](https://github.com/github-copilot/signup)免费使用 Copilot，并获得每月内联建议和 AI 使用额度。

> [!IMPORTANT]
> **自 2026 年 4 月 20 日起**，Copilot Pro、Copilot Pro+、Max 和 Student 计划的新注册暂时暂停。

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="使用浏览器代理工具测试 Web 应用">
使用浏览器代理工具构建并自动测试 Web 应用程序。

* [浏览器代理测试指南](/docs/agents/guides/browser-agent-testing-guide.md)

</div>

## 前提条件

要完成本教程，你需要：

* [在计算机上安装 Visual Studio Code](/download)

* [在 VS Code 中启用 AI 功能](/docs/getstarted/overview.md#enable-ai-features)

* [一个 GitHub 账号](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github)（用于云端代理工作流）

## 步骤 1：使用本地代理搭建应用脚手架

在此步骤中，你将使用本地代理创建初始的待办事项应用结构。本地代理适用于需要即时反馈和结果的交互式任务，例如搭建新项目或迭代新功能。

1. 创建一个新项目文件夹，并确保它处于 Git 版本控制之下。

    ```bash
    mkdir todo-app
    cd todo-app
    git init
    ```

1. 在 VS Code 中打开项目文件夹。

1. 打开聊天视图（`kb(workbench.action.chat.open)`），然后从代理下拉菜单中选择 **代理**。

    如果你有偏好，还可以选择特定的语言模型。

    > [!IMPORTANT]
    > 如果你没有看到代理选项，请确保在 VS Code 设置中启用了代理（`setting(chat.agent.enabled)`）。你的组织可能也已禁用代理——请联系你的管理员启用此功能。

1. 在聊天输入字段中输入以下提示来搭建待办事项应用，然后选择 **发送**。

    ```prompt
    Create a simple todo app with HTML, CSS, and JavaScript. Include an input field to add todos, a list to display them, and a delete button for each item.
    ```

    <video src="images/agents-tutorial/local-agent-todo-app-scaffold-v2.mp4" alt="Video showing a local agent scaffolding a todo app in VS Code." muted loop controls></video>

1. 查看代理为应用生成的不同文件。使用 **保留** 或 **撤销** 根据需要接受或拒绝更改。

1. 打开 `index.html` 文件，然后选择 **预览** 按钮以在集成浏览器中查看应用。

    ![Screenshot showing the Preview button in the top right corner of the editor when an HTML file is open.](images/agents-tutorial/preview-button.png)

1. 发送更多提示来进一步改进应用。请注意，预览会在你进行更改时实时更新。

    例如，你可以询问：

    ```prompt
    Mark todos as completed with a strikethrough effect.
    ```

现在你已经有了一个可用的待办事项应用，可以扩展更多功能。通过使用本地代理，你可以实时交互式地生成和完善代码。

## 步骤 2：使用 Copilot CLI 实现功能计划

在此步骤中，你将使用计划代理为主题切换功能创建实现计划，然后将实现工作移交给后台运行的 Copilot CLI。Copilot CLI 适用于委派不需要立即交互的任务。它可以使用 Git 工作树将文件更改与主工作区隔离，避免冲突。

1. 首先，在源代码管理视图中提交当前更改，以获得干净的状态。

1. 在聊天视图中，选择 **新建聊天 (+)** > **新建聊天** 以启动新的本地代理会话。请注意，你之前的聊天会话会保留在会话列表中。

1. 从代理下拉菜单中选择 **计划** 切换到计划代理，然后输入以下提示：

    ```prompt-plan
    Create a plan to add a dark/light theme toggle to the app. The toggle should switch between themes and persist the user's preference.
    ```

1. 计划代理可能会提出澄清问题以完善计划。根据需要做出回应。

1. 准备好后，选择 **开始实现** > **在 Copilot CLI 中继续**，将计划移交给 Copilot CLI。

    ![Screenshot showing the Start Implementation button in the Chat view.](images/agents-tutorial/plan-agent-start-implementation-cli.png)

1. Copilot CLI 会创建一个 Git 工作树来开始实现该功能。当被询问时，选择 **复制更改** 以确保所有当前更改对 Copilot CLI 可用。

1. 你可以在 **会话** 视图中跟踪 Copilot CLI 会话。选择该会话可查看其进度的详细信息。

    <video src="images/agents-tutorial/background-agent-theme-switcher-v2.mp4" alt="Video showing Copilot CLI implementing a theme switcher feature in VS Code." muted loop controls></video>

    > [!TIP]
    > 当 Copilot CLI 在后台工作时，你可以继续编辑主工作区而不会产生冲突。

1. 代理完成后，选择任意已更改的文件来查看其更改，或选择 **查看所有更改** 打开一个包含所有更改的多文件差异编辑器。

    > [!TIP]
    > 你可以向 Copilot CLI 发送后续提示，对功能进行调整或改进。

1. 在聊天视图中，选择 **应用** 将更改应用到你的主工作区。

你已经成功使用 Copilot CLI 在后台自主执行任务。你可以为不同的任务启动多个 Copilot CLI 会话，而不会中断你的主要工作流。

## 步骤 3：使用云端代理协作开发功能

在此步骤中，你将使用云端代理（Copilot 云端代理）重新设计应用布局，并使用 GitHub 中的拉取请求和协作功能。Copilot 云端代理运行在远程基础设施上，适用于不需要即时反馈、不需要在本地运行或涉及通过 GitHub 进行协作的任务。

1. 首先，将项目发布到 GitHub 仓库并将其添加为远程仓库，以便在你的项目上使用 Copilot 云端代理。

    1. 从命令面板（`kb(workbench.action.showCommands)`）运行 **发布到 GitHub** 命令，然后按照提示创建新仓库。

    1. 从命令面板运行 **Git: 添加远程仓库** 命令，然后按照提示将你的 GitHub 仓库添加为远程仓库。

1. 在聊天视图中，选择 **新建聊天 (+)** > **新建聊天**。

1. 从会话类型下拉菜单中选择 **云端** 切换到云端代理，然后输入以下提示：

    ```text
    Redesign the todo app layout to improve user experience. Update colors, spacing, typography, and add animations to give it a modern look.
    ```

1. 云端代理会启动一个新会话来处理你的请求。它在你的 GitHub 仓库中创建一个分支和拉取请求。

    <video src="images/agents-tutorial/cloud-agent-redesign-todo-app-v2.mp4" alt="Video showing a cloud agent redesigning a todo app in VS Code." muted loop controls></video>

1. 你可以在聊天视图中的 **会话** 视图中跟踪云端代理，或选择链接查看拉取请求的详细信息。

    > [!TIP]
    > 如果你安装了 GitHub 拉取请求扩展，还可以在 GitHub 拉取请求视图中的 **Copilot 代表我** 视图中跟踪拉取请求的进度。

1. 完成后，云端代理会将拉取请求分配给你进行审查。

    ![Screenshot showing the cloud agent session details, with the file change details.](images/agents-tutorial/cloud-agent-pull-request.png)

1. 在 **会话** 视图中右键单击云端代理会话以查看更多选项，或选择该会话并选择 **签出** 或 **应用**。

你已经成功使用云端代理通过 GitHub 协作开发功能。云端代理使你能够使用远程资源，并通过 GitHub 问题和拉取请求协作处理更改。

## 后续步骤

你已经成功使用不同类型的代理来构建、增强和重新设计待办事项应用。继续探索代理功能：

* 了解[代理类型及其适用场景](/docs/agents/overview.md)
* [使用计划代理规划和调研任务](/docs/agents/planning.md)
* 探索[创建自定义代理](/docs/agent-customization/custom-agents.md)
