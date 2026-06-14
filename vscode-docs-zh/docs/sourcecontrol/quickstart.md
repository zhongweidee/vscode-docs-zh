---
ContentId: 5f83254d-2817-4398-9321-456789abcdef
DateApproved: 6/10/2026
MetaDescription: 快速入门 Visual Studio Code 中的 Git 源代码管理。初始化仓库、暂存更改并在几分钟内提交代码。
Keywords:
- source control
- scm
- version control
- git
---
# 快速入门：在 VS Code 中使用源代码管理

在几分钟内开始在 Visual Studio Code 中使用 Git。本指南涵盖了设置仓库、保存更改和同步代码的基础知识。

## 前提条件

1. **安装 Git**：确保你的计算机上已安装 Git。[下载 Git](https://git-scm.com/downloads)

1. **打开 VS Code**：确保你已安装最新版本的 [Visual Studio Code](https://code.visualstudio.com/download)。

## 步骤 1：打开项目

你可以从现有的 Git 仓库或本地项目文件夹开始。

### 选项 A：将仓库克隆到本地

如果你想处理已托管在 GitHub、Azure DevOps 或其他 Git 提供者上的代码，请克隆仓库。如果你之前已克隆过该仓库，可以直接在 VS Code 中打开该文件夹，VS Code 将自动检测到 Git 仓库。

在 VS Code 中克隆仓库：

1. 打开源代码管理视图（`kb(workbench.view.scm)`）并选择**克隆仓库**

    ![Screenshot of the Source Control view with the Clone Repository button highlighted.](images/quickstart/clone-repository-url.png)

    或者，打开命令面板（`kb(workbench.action.showCommands)`）并输入 `Git: Clone`。

1. 输入仓库 URL（例如，`https://github.com/microsoft/PowerToys`）

    如果从 GitHub 克隆，你也可以选择**从 GitHub 克隆**并登录你的 GitHub 帐户以查看你的仓库列表。

1. 在计算机上选择一个父文件夹来保存项目

1. 当提示在 VS Code 中打开克隆的仓库时，选择**打开**

1. 在[工作区信任](/docs/editing/workspaces/workspace-trust.md)对话框中确认你是否信任该仓库

    > [!CAUTION]
    > 仅信任来自你所知来源的仓库。不信任的代码可能会损害你的计算机。

### 选项 B：在本地文件夹中初始化仓库

要使用 Git 开始一个新项目，你可以在现有的本地文件夹中初始化一个仓库。此选项会在你的文件夹中创建一个新的 Git 仓库来跟踪更改。

1. 在 VS Code 中打开你的项目文件夹（**文件** > **打开文件夹...**）。

1. 打开源代码管理视图（`kb(workbench.view.scm)`）并选择**初始化仓库**

    ![Screenshot of the Source Control view with the Initialize Repository button highlighted.](images/quickstart/initialize-repository.png)

    或者，打开命令面板（`kb(workbench.action.showCommands)`）并输入 `Git: Initialize Repository`。

## 步骤 2：进行更改并审查

Git 会跟踪项目中文件的更改。VS Code 中的源代码管理视图是你在不使用命令行的情况下管理这些更改的中心。

让我们进行一个简单的代码更改，并使用源代码管理视图和差异编辑器来审查它。

1. 编辑项目中的现有文件并保存它。

    如果你刚刚初始化了一个新仓库，可以直接进入下一步。

1. 打开源代码管理视图（`kb(workbench.view.scm)`）。

    请注意，已更改的文件在**更改**下列出，旁边带有"U"（未跟踪）或"M"（已修改）图标。活动栏中的源代码管理图标也会显示一个带有受影响文件数量的徽章。

    ![Screenshot of the Source Control view showing a modified and new file under Changes.](images/quickstart/git-modified-files.png)

1. 要审查文件的更改，在源代码管理视图中选择它以打开差异编辑器。

    差异编辑器显示文件的当前版本与上次提交版本之间的差异。如果窗口足够宽，差异编辑器会显示并排比较，否则更改以内联方式显示。

    ![Screenshot of the Diff Editor showing side-by-side changes between file versions.](images/quickstart/diff-editor.png)

    > [!TIP]
    > 如果你有 Copilot 订阅，在源代码管理视图中选择代码审查按钮，可以在提交更改之前对更改执行 AI 驱动的代码审查。
    >
    > ![Screenshot of the Code Review button in the Source Control view.](images/quickstart/ai-code-review-button.png)

## 步骤 3：暂存和提交

Git 使用两步过程来保存更改：暂存（准备）和提交（保存）。在源代码管理视图中，更改首先列在**更改**下，暂存后，它们会移到**暂存的更改**下，准备提交。

1. 要暂存更改，请执行以下操作之一：

    * 将鼠标悬停在**更改**列表中的文件上，然后选择 **+**（加号）以暂存它

        ![Screenshot of the Source Control view with the Stage Changes button highlighted.](images/quickstart/stage-changes-button.png)

    * 右键单击**更改**列表中的文件，然后选择**暂存更改**

    * 将鼠标悬停在**更改**标题上，然后选择 **+**（加号）按钮以一次性暂存所有更改

1. （可选）如果需要，你可以取消暂存或放弃更改：

    * 要取消暂存文件，将鼠标悬停在**暂存的更改**列表中的文件上，然后选择 **-**（减号）按钮

    * 要放弃对文件的更改，右键单击**更改**列表中的文件，然后选择**放弃更改**

1. 要提交暂存的更改，你可以提供提交消息。

    1. 在源代码管理视图顶部的文本框中输入提交消息。

        你也可以通过选择提交消息输入框中的星标图标 <i class="codicon codicon-sparkle"></i>，使用 AI 根据暂存的更改生成提交消息。

    1. 选择**提交**将更改提交到你的 Git 历史记录

        ![Screenshot of the Commit button in the Source Control view.](images/quickstart/commit-button.png)

        提交后，暂存的更改将从源代码管理视图中清除，并保存在你的本地 Git 历史记录中。

        > [!NOTE]
        > 只有暂存的更改才会包含在提交中。如果你有未暂存的更改，它们将保留在**更改**下以供将来提交。

1. 要查看你的提交历史记录，在源代码管理视图中选择**源代码管理图**。

    ![Screenshot of the Source Control Graph in the Source Control view.](images/quickstart/source-control-graph.png)

## 步骤 4：与服务器同步

如果你的仓库连接到远程服务器（例如，GitHub 或 Azure DevOps），你可以将本地提交与远程仓库同步。

1. 打开源代码管理视图（`kb(workbench.view.scm)`）

1. 选择**同步更改**以从远程拉取最新更改并推送你的本地提交

    ![Screenshot of the Sync Changes button in the Source Control view.](images/quickstart/sync-changes.png)

    或者，状态栏会显示同步状态，你可以通过选择同步图标（旋转箭头）来同步更改。

1. 选择它以从服务器拉取新更改并推送你的提交。

1. 要单独拉取或推送，在源代码管理视图中选择省略号菜单（...）并选择**拉取**或**推送**。

    ![Screenshot of the Pull and Push commands in the Source Control view ellipsis menu.](images/quickstart/pull-push-commands.png)

> [!TIP]
> 如果你是从本地文件夹开始的（选项 B）并希望将其保存到 GitHub，请使用源代码管理视图中的**发布到 GitHub**按钮。

## 后续步骤

现在你已经掌握了基础知识，可以探索更多功能：

* [分支和工作树](/docs/sourcecontrol/branches-worktrees.md) - 了解分支管理和并行开发。
* [仓库和远程](/docs/sourcecontrol/repos-remotes.md) - 了解克隆、发布以及与远程仓库同步。
* [解决合并冲突](/docs/sourcecontrol/merge-conflicts.md) - 了解如何在合并分支时处理冲突。
* [使用 GitHub](/docs/sourcecontrol/github.md) - 了解拉取请求和问题。
* [故障排除](/docs/sourcecontrol/troubleshooting.md) - 诊断和解决 Git 问题。
* [源代码管理概述](/docs/sourcecontrol/overview.md) - 源代码管理功能的完整参考。
