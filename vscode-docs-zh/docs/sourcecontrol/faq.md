---
ContentId: 431b4458-34c4-4aba-a0ee-eaddf7cd91a1
MetaDescription: Visual Studio Code 中关于源代码管理、Git 和 GitHub 的常见问题解答 (FAQ)
DateApproved: 6/10/2026
Keywords:
- source control
- scm
- version control
- git
---
# 源代码管理常见问题解答

本主题解答了在 Visual Studio Code 中使用 Git 源代码管理和 GitHub 的常见问题。

## Git

### 如何还原或撤销 Git 提交？

使用 **Git: 撤销上次提交** 命令来还原你最近的一次提交。这会将你的分支重置为提交之前的状态，包括所有更改。该命令也可通过源代码管理视图顶部的 **提交** 下的 **更多操作** `...` 菜单来访问。

### 如何重命名本地分支？

**Git: 重命名分支...** 命令将提示你输入新名称。

### 如何在提交之前撤销 git add？

在 **暂存的更改** 中列出的已添加文件，可以通过 **-** 图标或拖放操作取消暂存。

### 如何编辑最近一次的提交消息？

要更新最近一次本地提交的提交消息，请使用 **Git: 提交暂存（修订）** 命令。它将打开一个编辑器来编辑并保存最后一条消息。请确保没有其他更改被暂存，因为它们将被包含在提交中。

### 我初始化了我的存储库，但 `...` 菜单中的所有操作都显示为灰色

要进行 **推送、拉取和同步**，你需要先设置 Git 远程仓库。你可以从存储库托管服务获取所需的 URL。获取该 URL 后，需要运行一些命令行操作将其添加到 Git 设置中。例如：

```bash
> git remote add origin https://github.com/<repo owner>/<repo name>.git
> git push -u origin main
```

### 我的团队使用的是 Team Foundation 版本控制 (TFVC) 而不是 Git。我该怎么办？

使用 [Azure Repos](https://marketplace.visualstudio.com/items?itemName=ms-vsts.team) 扩展，它将启用 TFVC 支持。

### 为什么拉取、推送和同步操作永远不会完成？

这通常意味着 Git 中没有配置凭据管理，并且由于某种原因你没有收到凭据提示。

你可以随时设置一个[凭据助手](https://docs.github.com/get-started/getting-started-with-git/caching-your-github-credentials-in-git)，以便从远程服务器拉取和推送，而无需 VS Code 每次都提示你输入凭据。

### 如何使用需要多重身份验证的 Azure DevOps 组织登录 Git？

[Git 凭据管理器](https://github.com/GitCredentialManager/git-credential-manager) (GCM) 是适用于 Windows、macOS 和 Linux 的推荐 Git 凭据助手。如果你正在运行 Git for Windows，则 GCM 已为你安装和配置。如果你在 macOS 或 Linux 上运行，请参阅 GCM [README](https://github.com/GitCredentialManager/git-credential-manager#download-and-install) 中的安装说明。

### 我在计算机上安装了 GitHub Desktop，但 VS Code 忽略了它

VS Code 的 Git 集成仅支持[官方 Git 发行版](https://git-scm.com/)。

### 每当 VS Code 运行时，我不断收到 Git 身份验证对话框

VS Code 会自动从服务器获取更改，以便向你展示传入更改的摘要。Git 身份验证对话框独立于 VS Code 本身，是你当前 Git 凭据助手的一部分。

避免这些提示的一种方法是设置一个[凭据助手](https://docs.github.com/get-started/getting-started-with-git/caching-your-github-credentials-in-git)来记住你的凭据。

另一种选择是通过更改以下设置来禁用自动获取功能：`"git.autofetch": false`。

### 为什么 VS Code 警告我 Git 存储库可能不安全？

VS Code 使用 `git.exe` 来执行所有 Git 操作。从 Git [2.35.2](https://github.blog/2022-04-18-highlights-from-git-2-36/#stricter-repository-ownership-checks) 开始，用户被禁止在位于其他用户（而非当前用户）拥有的文件夹中的存储库中运行 Git 操作，因为此类存储库被认为可能不安全。

如果你尝试打开此类存储库，VS Code 将在源代码管理视图或错误通知中显示欢迎视图。欢迎视图和通知都包含 **管理不安全的存储库** 命令，可让你查看可能不安全的存储库列表，将其标记为安全，并打开它们。**管理不安全的存储库** 命令也可在命令面板中使用 (`kb(workbench.action.showCommands)`)。将存储库标记为安全会将存储库位置添加到 `safe.directory` [Git 配置](https://git-scm.com/docs/git-config#Documentation/git-config.txt-safedirectory)中。

在 Windows 上，发生此问题的常见场景是：使用"以管理员身份运行"的应用程序（例如 Windows 终端或 VS Code）克隆存储库，但使用另一个不以"管理员身份运行"的应用程序或实例（例如 VS Code）打开该存储库。

### 为什么 VS Code 无法发现工作区或打开文件的父文件夹中的 Git 存储库？

VS Code 使用 `git rev-parse --show-toplevel` 来确定 Git 存储库的根目录。在大多数情况下，Git 存储库的根目录位于工作区内，但也存在 Git 存储库的根目录位于工作区或打开文件的父文件夹中的情况。虽然在工作区或打开文件的父文件夹中打开 Git 存储库对高级用户来说是一项很棒的功能，但对新用户可能会造成困惑。我们曾看到因这种困惑导致这些 Git 存储库中的更改被丢弃，进而造成数据丢失的情况。

为避免困惑并降低数据丢失的风险，VS Code 将显示通知和源代码管理视图中的新欢迎视图，并且不会自动从工作区和打开文件的父文件夹中打开 Git 存储库。

你可以使用 `setting(git.openRepositoryInParentFolders)` 设置来控制如何处理来自父文件夹的 Git 存储库。如果你想恢复到旧行为，请将 `setting(git.openRepositoryInParentFolders)` 设置为 `always`。

### 我可以在 VS Code 中使用 SSH Git 身份验证吗？

可以，不过 VS Code 在使用没有密码短语的 SSH 密钥时最为便捷。如果你有一个带有密码短语的 SSH 密钥，则需要从 Git Bash 提示符启动 VS Code，以继承其 SSH 环境。

## GitHub

### 是否支持 GitHub Enterprise？

VS Code 官方支持 GitHub Enterprise Server 的身份验证。打开 GHES 存储库的本地签出，系统将提示你使用 GitHub Enterprise Server 账户登录。

## 故障排除

有关诊断和解决 Git 问题的帮助，请参阅[故障排除](/docs/sourcecontrol/troubleshooting.md)指南。该指南涵盖了使用 Git 输出日志和启用跟踪日志以获取详细诊断信息的内容。
