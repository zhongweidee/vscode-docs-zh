---
ContentId: 8f34d9b6-3185-426a-b6d9-7e5ac7138a31
DateApproved: 6/10/2026
MetaDescription: 掌握在 VS Code 中处理 Git 仓库和远程仓库的方法。了解克隆、发布、推送/拉取/同步操作、上游跟踪、自动获取以及管理多个仓库。
Keywords:
- source control
- scm
- version control
- git
---
# 使用仓库和远程仓库

Git 仓库和远程仓库使你能够通过在不同位置同步工作来与他人协作。VS Code 提供了用于处理远程仓库的集成工具，无需掌握命令行 Git 知识。

本文介绍了在 VS Code 中处理 Git 仓库和远程仓库的方法，包括克隆、发布、同步更改以及管理多个仓库。

## 理解远程仓库

远程仓库是托管在另一台服务器（如 GitHub、Azure DevOps 或 GitLab）上的 Git 仓库。远程仓库通过提供团队成员可以共享工作的中心位置来实现协作。

当你克隆一个仓库时，Git 会自动创建一个名为 `origin` 的远程仓库，指向原始仓库。如果你需要与不同的服务器或仓库交互，可以使用多个远程仓库。

处理远程仓库涉及三个主要操作：

* **获取（Fetch）**：从远程仓库下载提交，但不更改你的工作文件。这使你可以查看其他人所做的更改，而无需将他们的更改合并到你的工作中。

* **拉取（Pull）**：从远程仓库下载提交并将其合并到你的当前分支中。这是获取加合并的合并操作。

* **推送（Push）**：将你的本地提交上传到远程仓库，以便其他人可以访问你的更改。

![Diagram of Git fetch, pull, and push operations between local and remote repositories.](images/repos-remotes/git-fetch-pull-push.png)

<!-- ```mermaid
sequenceDiagram
    participant Local as Local Repository
    participant Remote as Remote Repository

    Note over Remote: Remote commits <br>from others
    Remote->>Local: Fetch (download commits without merging)

    Remote->>Local: Pull (fetch + merge)
    Note over Local: Remote commits <br>merged locally

    Local->>Remote: Push (upload local commits)
    Note over Remote: Local commits<br>available to others
``` -->

当你推送时，Git 需要知道将提交发送到哪个远程仓库。默认情况下，Git 使用为当前分支配置的上游分支。如果未设置上游，VS Code 会提示你发布分支并设置上游。

## 添加远程仓库

向仓库添加新的远程仓库：

1. 在"源代码管理"视图（`kb(workbench.view.scm)`）中，选择"**更多操作**"（**...**）> "**远程**" > "**添加远程**"

    或者，从命令面板（`kb(workbench.action.showCommands)`）运行"**Git: 添加远程仓库**"命令。

1. 输入远程仓库 URL

1. 输入远程仓库的名称（例如 `upstream`）

你的仓库现在拥有一个额外的远程仓库，你可以从中获取或向其推送。

使用类似的步骤来删除远程仓库（**Git: 删除远程仓库**）。

## 克隆仓库

克隆操作会在你的计算机上创建远程仓库的本地副本。克隆的仓库包括来自远程仓库的所有分支、提交和历史记录。默认情况下，Git 会配置一个名为 `origin` 的远程仓库，指向你克隆时的 URL。

要克隆仓库，请在命令面板（`kb(workbench.action.showCommands)`）中运行"**Git: 克隆**"命令，或选择"源代码管理"视图中的"**克隆仓库**"按钮。

如果你从 GitHub 克隆，VS Code 会提示你通过 GitHub 进行身份验证。然后，从列表中选择一个仓库将其克隆到你的计算机。该列表包含公共仓库和私有仓库。对于其他 Git 提供商，请输入仓库 URL。

![Screenshot of the Clone Repository prompt in VS Code.](images/repos-remotes/github-clone.png)

克隆时，VS Code 会要求你选择一个本地文件夹来存储仓库。克隆完成后，你可以选择在新窗口中打开克隆的仓库。

[GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) 扩展通过拉取请求和问题管理增强了 GitHub 集成。详细了解[在 VS Code 中处理 GitHub](/docs/sourcecontrol/github.md)。

## 发布到 GitHub

如果你有一个未连接到远程仓库的本地仓库，可以直接从 VS Code 将其发布到 GitHub。

将仓库发布到 GitHub：

1. 打开"源代码管理"视图

1. 在"源代码管理"视图中选择"**发布到 GitHub**"

1. 如果提示，登录 GitHub

1. 选择创建公共仓库还是私有仓库

1. 选择初始提交中包含哪些文件

VS Code 会在 GitHub 上创建一个新仓库，将其添加为远程仓库，并推送你的提交。

> [!TIP]
> 发布到 GitHub 是将你的本地工作上线的最快方式。它会在一步中创建仓库、配置远程仓库并推送你的提交。

## 推送、拉取和同步

推送、拉取和同步是保持本地工作与远程仓库同步的核心操作。

### 推送提交

推送操作将你的本地提交上传到远程仓库。推送提交的方法：

1. 在本地提交你的更改

1. 在"源代码管理"视图中选择"**更多操作**"（**...**）> "**推送**"

    或者，选择状态栏中的同步图标来一次性完成拉取和推送。如果你想推送到特定的远程仓库，请使用"**推送到**"选项。

    你也可以使用"源代码管理图"视图工具栏中的"推送"图标来推送本地提交。

1. 如果提示，请登录以通过远程仓库进行身份验证

你的提交已上传到远程分支。其他团队成员现在可以拉取你的更改了。

> [!NOTE]
> 如果你的分支未配置上游，VS Code 会首先提示你发布该分支。

### 拉取提交

拉取操作用从远程仓库下载提交并将其合并到你的本地分支中。拉取提交的方法：

1. 在"源代码管理"视图中选择"**更多操作**"（**...**）> "**拉取**"

    或者，选择状态栏中的同步图标来一次性完成拉取和推送。如果你想从特定的远程仓库拉取，请使用"**从...拉取**"选项。

    你也可以使用"源代码管理图"视图工具栏中的"拉取"图标来拉取远程提交。

1. VS Code 下载并合并远程提交

如果你的本地更改和远程提交之间存在冲突，VS Code 会通过[合并冲突解决工具](/docs/sourcecontrol/merge-conflicts.md)帮助你解决这些冲突。

### 通过变基方式拉取

除了合并远程更改，你也可以将本地提交变基到远程更改之上：

1. 在"源代码管理"视图中选择"**更多操作**"（**...**）> "**拉取（变基）**"

1. VS Code 首先应用远程提交，然后将你的本地提交重放到最上层

变基操作会创建一个没有合并提交的线性历史记录。详细了解 [Git 变基](https://git-scm.com/docs/git-rebase)。

### 同步更改

同步操作将拉取和推送合并在一起——它首先从远程仓库拉取更改，然后推送你的本地提交。这是保持工作同步的推荐方式。

同步更改的方法：

* 在"源代码管理"视图中选择"**同步更改**"
* 选择状态栏中的同步图标

![Screenshot of the Sync Changes button in the Source Control view.](images/quickstart/sync-changes.png)

状态栏同步指示器显示你需要推送（↑）和拉取（↓）的提交数量。例如，`↑2 ↓1` 表示你有 2 个提交需要推送，1 个提交需要拉取。

> [!TIP]
> 配置 `setting(git.confirmSync)` 设置来控制 VS Code 是否在同步前要求确认。

### 获取提交

获取操作从远程仓库下载提交，但不会将其合并到你的本地分支中。这样你就可以在集成之前先审查传入的更改。

获取提交的方法：

* 在"源代码管理"视图中选择"**更多操作**"（**...**）> "**获取**"
* 选择"**从所有远程仓库获取**"以从所有配置的远程仓库获取
* 选择"**获取（修剪）**"以获取并删除已删除的远程分支（要始终修剪，请启用 `setting(git.pruneOnFetch)` 设置）

获取后，你可以在"源代码管理图"中审查传入的提交，然后再使用"**拉取**"将其合并。

要在后台自动获取提交，请启用 `setting(git.autofetch)` 设置（默认禁用）。要配置获取间隔，请使用 `setting(git.autofetchPeriod)` 设置（默认 180 秒）。

## 状态栏同步操作

状态栏提供了对常见仓库和远程仓库操作的快速访问，无需打开"源代码管理"视图。

### 分支指示器

左下角的分支指示器显示：

* **当前分支名称**：选择以切换分支
* **同步状态**：需要推送（↑）和拉取（↓）的提交数量
* **发布状态**：对于未发布的分支显示"**发布分支**"

![Screenshot of the Status Bar showing the branch indicator with sync status.](images/repos-remotes/git-status-bar-sync.png)

状态栏中的同步图标（旋转箭头）使你能够与远程仓库同步更改（推送和拉取）。

你可以使用以下设置自定义状态栏行为：

* `setting(git.showActionButton)`：控制显示哪个操作按钮（同步或提交）
* `setting(git.showPushSuccessNotification)`：推送成功后显示通知
* `setting(git.showCommitInput)`：在"源代码管理"视图中显示提交输入框

## 源代码管理图

"源代码管理图"提供你的提交历史记录、分支关系以及与远程仓库同步状态的可视化表示。这使你能够轻松理解传入和传出的更改。

![Screenshot of the Source Control Graph showing commit history and incoming/outgoing commits.](images/staging-commits/source-control-graph.png)

图表显示：

* **当前分支**：以特殊指示器突出显示
* **上游分支**：显示远程仓库上你尚未拉取的提交
* **传入提交**（↓）：远程仓库上你可以拉取的提交
* **传出提交**（↑）：可以推送的本地提交
* **其他分支**：仓库中的本地和远程分支

你可以直接从图表工具栏进行获取、推送和拉取操作。图表视图还显示传入和传出的更改，使你能够轻松了解何时需要同步。选择图表中的某个项目可以查看该提交中更改的各个文件。

使用以下设置自定义"源代码管理图"：

* `setting(scm.graph.showIncomingChanges)`：显示或隐藏传入提交
* `setting(scm.graph.showOutgoingChanges)`：显示或隐藏传出提交
* `setting(scm.graph.pageSize)`：初始加载的提交数量

详细了解[使用源代码管理图查看提交历史记录](/docs/sourcecontrol/staging-commits.md#graph-view-for-commit-history)。

## 使用仓库

"仓库"视图使你能够在单个工作区中管理多个 Git 仓库。这在处理跨多个仓库的项目时非常有用。"仓库"视图还显示与你的仓库关联的 [Git 工作树](/docs/sourcecontrol/branches-worktrees.md)。

![Screenshot of the Repositories view in VS Code showing multiple Git repositories.](images/repos-remotes/multiple-repositories.png)

要显示"仓库"视图，请从命令面板（`kb(workbench.action.showCommands)`）运行"**源代码管理: 聚焦于仓库视图**"命令。配置 `setting(scm.alwaysShowRepositories)` 设置以始终在"源代码管理"视图中显示"仓库"视图。

对于每个仓库，你可以查看活动分支、同步状态，并访问获取、拉取、推送等操作。

当你打开包含 Git 仓库的文件夹时，VS Code 会自动检测这些仓库。如果你打开一个包含多个仓库的文件夹（如单体仓库），所有仓库都会显示在"仓库"视图中。

### 仓库选择模式

如果你希望一次只关注一个仓库或工作树，可以切换到单仓库模式。在该模式下，你只会看到所选仓库的更改和图表。在多仓库模式下操作时，"源代码管理"视图会显示所有仓库的更改。使用 `setting(scm.repositories.selectionMode)` 设置可在多仓库模式和单仓库模式之间切换。

## 凭据助手

凭据助手安全地存储你的身份验证凭据，这样你就不必每次推送或拉取时都输入它们。你应该[设置凭据助手](https://docs.github.com/get-started/getting-started-with-git/caching-your-github-credentials-in-git)，以避免每次 VS Code 与远程仓库交互时都被要求输入凭据。

## 后续步骤

* [分支和工作树](/docs/sourcecontrol/branches-worktrees.md) - 了解分支管理和并行开发
* [暂存和提交](/docs/sourcecontrol/staging-commits.md) - 掌握提交工作流
* [合并冲突](/docs/sourcecontrol/merge-conflicts.md) - 处理合并分支时的冲突
* [使用 GitHub](/docs/sourcecontrol/github.md) - 了解拉取请求和 GitHub 集成
