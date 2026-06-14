---
ContentId: 7E22CCC0-2AB8-4729-A4C9-BE2B16853820
DateApproved: 6/10/2026
MetaDescription: 了解如何使用 VS Code 集成的 Git 源代码管理功能，如暂存、提交、分支、合并冲突解决和 GitHub 集成。
Keywords:
- source control
- scm
- version control
- git
---
# VS Code 中的源代码管理

Visual Studio Code 集成了源代码管理（SCM）功能，让您可以直接在编辑器中操作 Git 和其他版本控制系统。Git 支持是内置的，您还可以从 [Visual Studio Marketplace](https://marketplace.visualstudio.com/search?target=VSCode&category=SCM%20Providers&sortBy=Installs) 安装其他 SCM 提供者的扩展。

集成的源代码管理界面通过图形界面提供 Git 功能，无需使用终端命令。您可以执行诸如暂存更改、提交文件、创建分支和解决合并冲突等 Git 操作，而无需切换到命令行。

您在 VS Code 界面中做出的更改会与命令行 Git 操作保持同步，因此您可以根据需要同时使用 UI 和终端。源代码管理界面与命令行协同工作，而非替代它。

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/i_23KUAEtUM" title="Video showing how to use Git with Visual Studio Code." frameborder="0" allowfullscreen></iframe>

## 先决条件

要在 VS Code 中使用 Git 功能，您需要：

* VS Code 使用您机器上的 Git 安装。[安装 Git 2.0.0 或更高版本](https://git-scm.com/download)。

* 当您提交更改时，Git 会使用您配置的用户名和电子邮件。您可以通过以下命令设置这些值：

    ```bash
    git config --global user.name "Your Name"
    git config --global user.email "your.email@example.com"
    ```

> [!TIP]
> 如果您刚接触 Git，[git-scm](https://git-scm.com/doc) 网站是一个不错的起点，其中包含一本流行的在线[书籍](https://git-scm.com/book)、入门[视频](https://git-scm.com/video/what-is-git)和[速查表](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf)。

## 开始使用仓库

当您打开一个 Git 仓库的文件夹时，VS Code 会自动检测到它并激活所有源代码管理功能。要开始使用新的或现有的仓库，您有以下几个选项：

* **初始化新仓库**：为当前文件夹创建一个新的 Git 仓库。

* **克隆仓库**：从 GitHub 或其他 Git 托管平台克隆一个现有仓库。

* **打开远程仓库**：通过 [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=github.remotehub) 扩展，无需将仓库克隆到本地即可操作。

> [!TIP]
> 您可以使用 **发布到 GitHub** 命令直接将本地仓库发布到 GitHub，该命令会创建一个新仓库并一步完成提交推送。

详细了解[克隆和发布仓库](/docs/sourcecontrol/repos-remotes.md#clone-repositories)。

## 源代码管理界面

VS Code 通过几个关键界面元素提供 Git 功能。这些 UI 集成使您无需了解终端命令即可执行 Git 操作：

* **源代码管理视图**：用于暂存、提交和管理更改等常见 Git 操作的中央枢纽

    ![Screenshot of the Source Control view showing staged changes, and the diff editor showing side-by-side changes.](images/overview/overview.png)

* **源代码管理图**：提交历史记录和分支关系的图形化表示

    ![Screenshot of the Source control graph showing commit history.](images/overview/source-control-graph.png)

* **差异编辑器**：并排文件比较，便于高效审查更改

    ![Screenshot of the diff editor showing changes between file versions.](images/overview/diff.png)

* **其他 UI 元素**：上下文中的 Git 信息，如编辑器边栏指示器或 Git 追溯注释

    ![Screenshot of editor gutter indicators showing line changes and a hover showing Git blame information.](images/overview/git-blame-status-bar.png)

## 常见工作流

### 提交前审查更改

在提交更改之前，务必对其进行审查以确保准确性和质量。使用 VS Code 的 AI 功能对更改进行代码审查，并在编辑器中获取审查评论和建议。

![Screenshot of the code review results, showing as editor overlay comments.](images/overview/copilot-code-review-results.png)

### 暂存与提交更改

在源代码管理视图中审查您的更改，然后通过选择每个文件旁边的 **+** 图标来暂存文件，或一次性暂存所有更改。如需更精细的控制，可以从文件的差异视图中暂存特定的行或选区。

![Screenshot of staging changes in the Source Control view.](images/overview/stage-changes.png)

在输入框中输入提交消息，或在提交消息输入框中选择星形图标（<i class="codicon codicon-sparkle"></i>），使用 AI 根据已暂存的更改生成提交消息。

![Screenshot of generating a commit message with Copilot.](images/overview/copilot-generate-commit-message.png)

详细了解[暂存更改与编写提交](/docs/sourcecontrol/staging-commits.md)。

### 与远程仓库同步

当您的分支连接到远程分支时，VS Code 会在状态栏中显示同步状态，并在源代码管理视图中显示传入和传出的提交。您可以快速同步或执行单独的拉取（fetch）、拉取（pull）和推送（push）操作。

![Screenshot of the Source Control view showing the sync button indicating outgoing and incoming changes.](images/overview/incoming-outgoing-changes.png)

详细了解[操作仓库和远程仓库](/docs/sourcecontrol/repos-remotes.md)。

### 解决合并冲突

遇到合并冲突时，VS Code 会在源代码管理视图中高亮显示冲突文件。打开有冲突的文件以查看内联冲突标记。您有几种选项来解决冲突：

* 使用内联编辑器操作直接在编辑器中选择如何解决冲突
* 使用三路合并编辑器并排查看更改和合并结果
* 使用 AI 辅助帮助解决合并冲突

![Screenshot of the 3-way merge editor.](images/overview/merge-editor-overview.png)

详细了解[解决合并冲突](/docs/sourcecontrol/merge-conflicts.md)。

### 操作分支、工作树和贮藏

VS Code 支持多种用于管理并行开发工作的流程。

* 在单个工作区内快速切换**分支**，以处理不同的功能或修复。

    ![Screenshot of the branch Quick Pick showing options to switch to a branch or create a new branch.](images/overview/gitbranches.png)

* 使用 Git **工作树**为不同分支创建独立的工作目录，以便同时操作多个分支。

* 当您需要快速切换上下文时，使用 Git **贮藏**临时保存未提交的更改。

详细了解[操作分支和工作树](/docs/sourcecontrol/branches-worktrees.md)。

### 查看提交历史

审查提交历史有助于了解代码随时间的演变过程。

* **源代码管理图**以可视化方式呈现分支结构和提交历史，突出显示传入和传出的提交。

    ![Screenshot of the Source Control Graph showing commit history and branch structure.](images/overview/source-control-graph.png)

* **资源管理器视图**中的**时间线视图**显示特定文件的提交历史，让您了解其演变过程。您可以筛选时间线以仅显示 Git 提交，或同时包含本地文件更改。

    ![Screenshot of the timeline view showing file commit history.](images/overview/timeline-view.png)

详细了解[使用图和时间线视图以及审查更改](/docs/sourcecontrol/staging-commits.md#timeline-view-for-file-history)。

## 使用 GitHub 拉取请求和议题

VS Code 与 GitHub 集成，可直接在编辑器中提供拉取请求和议题管理。安装 [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) 扩展后可以：

* 创建、审查和合并拉取请求
* 查看和管理议题
* 在不离开 VS Code 的情况下评论和批准 PR
* 检出 PR 分支并在本地审查更改

详细了解[在 VS Code 中使用 GitHub](/docs/sourcecontrol/github.md)。

## 其他源代码管理提供者

VS Code 支持多种源代码管理提供者。虽然 Git 支持是内置的，但您可以[安装扩展](https://marketplace.visualstudio.com/search?target=VSCode&category=SCM%20Providers&sortBy=Installs)来支持其他版本控制系统，如 Azure DevOps、Subversion 或 Mercurial。

在扩展视图（`kb(workbench.view.extensions)`）中通过搜索 `@category:"scm providers"` 浏览可用的 SCM 提供者扩展。

<div class="marketplace-extensions-scm-curated"></div>

## 后续步骤

* [源代码管理快速入门](/docs/sourcecontrol/quickstart.md) - 快速开始在 VS Code 中使用 Git 源代码管理

* [入门视频 - Git 版本控制](/docs/introvideos/versioncontrol.md) - 概述 VS Code Git 支持的入门视频

* [分支和工作树](/docs/sourcecontrol/branches-worktrees.md) - 了解分支管理、Git 工作树和贮藏操作
* [仓库和远程仓库](/docs/sourcecontrol/repos-remotes.md) - 了解克隆、发布以及与远程仓库同步
* [使用 GitHub](/docs/sourcecontrol/github.md) - 了解如何在 VS Code 中操作拉取请求和议题
* [故障排除](/docs/sourcecontrol/troubleshooting.md) - 通过输出日志和跟踪日志诊断并解决 Git 问题
* [VS Code 中的 Copilot](/docs/agent-native/overview.md) - 探索 Git 工作流之外的更多 AI 驱动功能
