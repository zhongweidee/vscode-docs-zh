---
ContentId: 37fd3bd2-4209-49f6-bec5-c544d6b1b289
DateApproved: 6/10/2026
MetaDescription: 访问 GitHub Copilot 订阅并在 Visual Studio 中设置 GitHub Copilot。
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# 在 VS Code 中设置 GitHub Copilot

本指南将引导你在 Visual Studio Code 中设置 GitHub Copilot。要在 VS Code 中使用 Copilot，你需要通过 GitHub 账户获取 GitHub Copilot 访问权限。

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="开始使用 AI">
跟随动手实践教程，在 VS Code 中构建你的第一个 AI 应用。

* [开始教程](/docs/getstarted/getting-started.md)

</div>

按照以下步骤在 VS Code 中开始使用 Copilot：

1. 将鼠标悬停在状态栏中的 Copilot 图标上，然后选择“**使用 AI 功能**”。

1. 选择一种登录方式并按照提示操作。

    * 如果你的账户已有 Copilot 订阅，VS Code 将使用该订阅。

    * 如果你还没有 Copilot 订阅，你将注册 [Copilot 免费计划](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-copilot-free/about-github-copilot-free)，并获得每月限额的内联建议和 AI 积分。详细了解不同的 [GitHub Copilot 计划](https://docs.github.com/en/copilot/get-started/plans)。

    > [!IMPORTANT]
    > **自 2026 年 4 月 20 日起**，Copilot Pro、Copilot Pro+、Max 和 Student 计划的新注册已暂停。

1. 开始在 VS Code 中使用 Copilot！

    通过 [VS Code 教程](/docs/getstarted/getting-started.md)了解基础知识。

1. 在聊天会话中键入 `/init` 来为 AI 设置你的项目。

    `/init` 命令会分析你的代码库并创建[自定义指令](/docs/agent-customization/custom-instructions.md)，帮助 AI 生成符合你编码实践的代码。

> [!IMPORTANT]
> 你的 GitHub Copilot 免费版本中的遥测功能目前已启用。默认情况下，允许匹配公共代码的代码建议，包括在 VS Code 和 [github.com](http://github.com/copilot) 体验中的代码引用。你可以通过在 VS Code 中将 `setting(telemetry.telemetryLevel)` 设置为 `off` 来禁用遥测以退出遥测数据收集，也可以在 [Copilot 设置](https://github.com/settings/copilot)中调整遥测和代码建议设置。

## 使用 GHE 账户的 Copilot

如果你的 Copilot 订阅关联了 GitHub Enterprise (GHE) 账户，可以在 VS Code 中使用 GHE 凭据登录 Copilot。

1. 如果尚未操作，请将鼠标悬停在状态栏中的 Copilot 图标上，然后选择“**使用 AI 功能**”。

1. 在登录对话框中，选择“**使用 GHE.com 继续**”并提供你的 GHE 实例 URL 和凭据。

如果需要在 GitHub.com 账户和 GHE 账户之间切换，请参阅[为每个工作区或配置文件使用不同的 GitHub 账户](#为每个工作区或配置文件使用不同的-github-账户)获取说明。

## 使用其他 GitHub 账户的 Copilot

如果你的 Copilot 订阅关联了另一个 GitHub 账户，请按照以下步骤在 VS Code 中退出当前 GitHub 账户，然后使用其他账户登录。

1. 在活动栏中选择“**账户**”菜单，然后为你当前已登录的账户选择“**退出**”。

    ![VS Code 中的账户菜单，显示退出当前 GitHub 账户的选项。](images/copilot/vscode-accounts-menu-signout.png)

1. 使用以下任一方法登录你的 GitHub 账户：

    * 从状态栏的 Copilot 菜单中选择“**登录以使用 Copilot**”。

        ![从 Copilot 状态菜单登录以使用 Copilot。](images/copilot/copilot-signedout-sign-in.png)

    * 在活动栏中选择“**账户**”菜单，然后选择“**使用 GitHub 登录以使用 GitHub Copilot**”。

        ![VS Code 中的账户菜单，显示使用 GitHub 登录以使用 GitHub Copilot 的选项。](images/copilot/vscode-accounts-menu.png)

    * 在命令面板（`kb(workbench.action.showCommands)`）中运行 **GitHub Copilot：登录**命令。

## 为每个工作区或配置文件使用不同的 GitHub 账户

你可以为每个 VS Code 工作区或配置文件使用不同的 GitHub 账户进行 Copilot。这对于在工作项目和个人项目中使用不同的账户，或者为使用 GitHub 身份验证的不同扩展使用不同的账户非常有用。

请按照以下步骤配置用于 Copilot 的 GitHub 账户。此配置按工作区和配置文件保存。

* 对于 GitHub.com 账户：

    1. 在活动栏的账户菜单中，选择“**管理扩展账户偏好设置**”
    1. 从扩展列表中选择 **GitHub Copilot Chat**
    1. 选择要在当前工作区和配置文件中用于 Copilot 的 GitHub 账户

* 对于 GHE.com 账户：

    > [!TIP]
    > 如果你只想使用 GHE 账户进行 Copilot，请按照[使用 GHE 账户的 Copilot](#使用-ghe-账户的-copilot)中的步骤使用 GHE 账户登录。

    1. 从命令面板（`kb(workbench.action.showCommands)`）运行 **偏好设置：打开用户设置 (JSON)** 或 **偏好设置：打开工作区设置 (JSON)**

    1. 添加以下设置以指定 GitHub Enterprise 作为 Copilot 的身份验证提供程序：

        ```json
        "github.copilot.advanced": {
            "authProvider": "github-enterprise"
        }
        ```

    1. 如果尚未登录，请重新登录你的 GitHub Enterprise 账户

## 从 VS Code 中移除 AI 功能

你可以使用 `setting(chat.disableAIFeatures)` 设置来禁用 VS Code 中的内置 AI 功能，类似于在 VS Code 中配置其他功能的方式。这将禁用并隐藏 VS Code 中的聊天或内联建议等功能，并禁用 Copilot 扩展。你可以在工作区或用户级别配置此设置。

或者，使用标题栏中聊天菜单的“**了解如何隐藏 AI 功能**”操作来访问该设置。

> [!NOTE]
> 如果你之前已禁用内置 AI 功能，在更新到新版 VS Code 时，你的选择将得到保留。

## 为工作区禁用 AI 功能

若要为特定工作区禁用 AI 功能，请在工作区设置中配置 `setting(chat.disableAIFeatures)` 设置。该设置可在设置编辑器（`kb(workbench.action.openSettings)`）中使用，或者你可以编辑工作区中的 `settings.json` 文件。

## 后续步骤

* 继续阅读[使用 AI 快速入门](/docs/getstarted/getting-started.md)，了解 VS Code 中 AI 驱动开发的关键功能。
