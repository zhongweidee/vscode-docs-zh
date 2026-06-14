---
ContentId: a9b2c3d4-e5f6-7890-ab12-cd3456789012
DateApproved: 6/10/2026
MetaDescription: 了解如何在 VS Code 中使用 Git 分支和工作树。创建、切换和管理多个分支，使用 Git 工作树进行并行开发，以及管理临时更改的储藏。
Keywords:
- source control
- scm
- version control
- git
---
# VS Code 中的 Git 分支与工作树

Git 分支使您能够在不同的功能或实验上同时工作，而不会影响主代码库。VS Code 提供了分支管理工具、用于并行开发的 Git 工作树，以及用于临时更改的储藏管理。

本文介绍如何在 VS Code 中使用分支、工作树和储藏来管理并行开发工作。

## 使用分支

分支是 Git 历史记录中指向特定提交的轻量级、可移动指针。它们允许您从主开发线分离开来，独立开发功能。

例如，假设您正在开发一个 Web 应用程序，需要添加用户身份验证功能，同时还要修复支付系统中的一个错误。您可以创建两个分支：

* `feature/user-authentication` - 包含您的登录和注册功能
* `bugfix/payment-validation` - 包含支付处理错误的修复

每个分支都维护自己的一组更改，互不影响。您可以在分支之间切换以处理不同的任务，并在之后将完成的分支合并回主分支。

### 查看当前分支

当前分支在 VS Code 中的多个位置显示：

* **状态栏**：显示当前分支名称，并允许快速切换分支
* **存储库视图**：在存储库标题中显示当前分支
* **源代码管理图**：直观地表示分支关系和历史记录

![显示状态栏和源代码管理视图中当前分支的截图。](images/branches-worktrees/current-branch.png)

### 切换分支

切换到不同的分支在 Git 术语中称为"检出"一个分支。当您检出一个分支时，Git 会更新您的工作目录以匹配该分支的状态。

要切换到不同的分支：

1. 在状态栏中选择分支名称，或从命令面板 (`kb(workbench.action.showCommands)`) 中运行 **Git: Checkout to** 命令。

2. 从可用分支列表中选择：
   * **本地分支**：存在于您本地机器上的分支
   * **远程分支**：来自远程仓库的分支，您可以在本地检出
   * **最近分支**：最近使用过的分支

> [!TIP]
> 如果在切换分支时有未提交的更改，Git 可能会阻止切换以避免丢失工作内容。建议在切换前提交更改或使用[储藏](#储藏管理)。

### 创建新分支

创建一个新分支以开始开发功能或实验：

1. 在状态栏中选择分支名称，或从命令面板中运行 **Git: Create Branch** 命令。

1. 为新分支输入名称。使用描述性名称，如 `feature/user-authentication` 或 `bugfix/login-error`。

    > [!TIP]
    > VS Code 可以为您生成随机分支名称。通过 `setting(git.branchRandomName.enable)` 和 `setting(git.branchRandomName.dictionary)` 设置来配置此功能。

1. 选择要从中创建新分支的源分支（通常是 `main` 或 `develop`）。

![显示创建分支对话框的截图，包含分支名称输入和源分支选择。](images/branches-worktrees/scm-create-branch.png)

VS Code 在创建后会自动切换到新分支。

> [!TIP]
> 如果您使用 [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) 扩展，可以直接从 GitHub 问题创建分支，这样您就可以在新的本地分支中开始工作，并自动为您预填充拉取请求。

### 重命名和删除分支

要重命名当前分支：

1. 从命令面板中运行 **Git: Rename Branch**，或从 **更多操作**（...）菜单中选择。
1. 输入新的分支名称。

要删除分支：

1. 切换到不同的分支（您无法删除当前活动的分支）。
1. 从命令面板中运行 **Git: Delete Branch**，或从 **更多操作**（...）菜单中选择。
1. 从列表中选择要删除的分支。

您还可以使用对应的 **Delete Remote Branch** 操作来删除远程分支。

> [!CAUTION]
> 删除分支会将其从本地仓库中永久移除。请确保该分支已被合并，或者您不再需要其中的更改。

### 合并和发布分支

当您的功能完成后，将其合并回主分支：

1. 切换到目标分支（通常是 `main` 或 `develop`）。
1. 从命令面板中运行 **Git: Merge Branch**。
1. 选择要合并的分支。

要发布分支到远程仓库，请使用 **Publish Branch** 操作。

VS Code 在源代码管理视图中显示合并结果。如果有冲突，VS Code 会突出显示它们并提供解决工具。了解更多关于[解决合并冲突](/docs/sourcecontrol/merge-conflicts.md)的信息。

## 使用 Git 工作树

VS Code 内置了对 [Git 工作树](https://git-scm.com/docs/git-worktree) 的支持，使您可以轻松地同时管理和使用多个分支。

### 了解工作树

工作树是在其自己的目录中对 Git 分支的单独检出。这允许您为同一个仓库拥有多个工作目录，每个工作目录位于不同的分支上。工作树功能特别适用于：

* 在单独的文件夹中同时开发多个功能
* 并排运行应用程序的不同版本
* 跨分支比较实现

### 创建工作树

要在 VS Code 中创建新工作树：

1. 从源代码管理视图中打开 **源代码管理存储库** 视图。

    ![显示源代码管理存储库视图的截图，其中列出了多个存储库。](images/branches-worktrees/source-control-view-repositories.png)

1. 选择您的存储库，打开 **更多操作（...）** 菜单，然后选择 **Worktrees** > **Create Worktree**。

    ![显示源代码管理存储库视图中工作树上下文菜单的截图。](images/branches-worktrees/worktree-create.png)

1. 按照提示选择分支和新工作树的位置。

    VS Code 在指定位置为新工作树创建一个文件夹，并将所选分支检出到该文件夹中。

新工作树会作为单独条目出现在 **源代码管理存储库** 视图中。

### 创建工作树时包含文件

创建新工作树时，Git 不会复制被 `.gitignore` 排除的文件，例如本地配置文件、环境文件或已安装的依赖项。要在新工作树中工作，您可能需要这些文件存在。

使用 `setting(git.worktreeIncludeFiles)` 设置来配置要复制到新工作树中的文件和文件夹的 [glob 模式](https://aka.ms/vscode-glob-patterns)。只有当文件与其中一个模式匹配且同时列在 `.gitignore` 中时，该文件才会被复制。

一个常见用途是将 `node_modules` 文件夹复制到每个新工作树中。这样，您可以立即开始工作，而无需重新安装依赖项。例如，按如下方式配置设置，同时复制本地 `.env` 文件：

```json
"git.worktreeIncludeFiles": [
    ".env",
    "node_modules/**"
]
```

### 在工作树之间切换

VS Code 可以同时显示多个存储库（包括工作树）：

* 每个工作树在 **源代码管理存储库** 视图中显示为单独的存储库
* 您可以打开多个 VS Code 窗口，每个窗口指向不同的工作树
* 使用 **文件** > **打开最近的文件** 快速在工作树目录之间切换

### 打开工作树

有多种方法可以打开工作树：

* 直接在 VS Code 中打开与工作树关联的文件夹。VS Code 会自动检测到它是现有存储库的工作树。

* 在源代码管理存储库视图中右键单击工作树，然后选择 **Open Worktree in New Window** 或 **Open Worktree in Current Window**。

* 在命令面板中运行 **Git: Open Worktree in Current Window** 或 **Git: Open Worktree in New Window** 命令，然后选择所需的工作树。

### 自动检测工作树

默认情况下，VS Code 会列出您从 **源代码管理存储库** 视图创建的工作树。要同时自动检测存储库中已存在的工作树，请启用 `setting(git.detectWorktrees)` 设置。启用此设置后，VS Code 会扫描存储库中的工作树并在 **源代码管理存储库** 视图中显示它们。

为避免扫描大量工作树，VS Code 限制了检测工作树的数量。使用 `setting(git.detectWorktreesLimit)` 设置来更改此限制。默认值为 50。

### 比较和迁移工作树的更改

当您在工作树中进行更改时，可以将这些更改与主工作区进行比较，并将工作树的更改带回主仓库。

1. 在源代码管理视图中，右键单击工作树中已更改的文件，然后选择 **Compare with Workspace** 以并排查看差异。

    ![显示工作树上下文菜单中"与工作区比较"选项及并排差异视图的截图。](images/branches-worktrees/worktree-compare-changes.png)

1. 查看后，使用命令面板中的 **Migrate Worktree Changes** 命令将工作树中的所有更改合并到当前工作区中。

## 后续步骤

* [暂存与提交](/docs/sourcecontrol/staging-commits.md) - 了解如何在分支内提交更改
* [合并冲突](/docs/sourcecontrol/merge-conflicts.md) - 处理合并分支时的冲突
* [存储库与远程](/docs/sourcecontrol/repos-remotes.md) - 使用远程分支和协作
* [在 GitHub 上协作](/docs/sourcecontrol/github.md) - 在分支工作流中使用 GitHub 拉取请求
