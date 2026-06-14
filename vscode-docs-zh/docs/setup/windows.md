---
ContentId: 4670C281-5761-46E6-8C46-10D523946FFB
DateApproved: 6/10/2026
MetaDescription: 在 Windows 上安装 Visual Studio Code，选择用户安装或系统安装，并配置 Windows 开发者工具。
MetaSocialImage: images/quicksetup/quick-setup-social.png
---
# 在 Windows 上安装 Visual Studio Code

Visual Studio Code 在 Windows 上提供用户安装程序、系统安装程序和 ZIP 压缩包。推荐大多数用户使用用户安装程序，因为它不需要管理员权限，并且支持更顺畅的后台更新。

## 在 Windows 上安装 VS Code

### 选择用户安装或系统安装

VS Code 提供 Windows 用户级别和系统级别的安装程序。

| 安装类型 | 使用场景 | 说明 |
|------------|----------|-------|
| [用户安装程序](https://go.microsoft.com/fwlink/?LinkID=534107) | 为你的 Windows 账户安装 VS Code。 | 此安装程序不需要管理员权限。它安装到 `%LOCALAPPDATA%\Programs\Microsoft VS Code` 下，并提供最流畅的更新体验。当从用户安装程序安装的 VS Code 以管理员身份运行时，更新功能会被禁用。 |
| [系统安装程序](https://go.microsoft.com/fwlink/?linkid=852157) | 为计算机上的所有用户安装 VS Code。 | 此安装程序需要管理员权限，并安装到 `Program Files` 下。产品内的更新也需要提权。 |

请参阅[下载 Visual Studio Code](/download) 页面，获取完整的安装选项列表。

### 使用 Windows 安装程序进行安装

1. 下载 Windows 版 [Visual Studio Code 用户安装程序](https://go.microsoft.com/fwlink/?LinkID=534107)。

1. 运行安装程序 `VSCodeUserSetup-{version}.exe`。

    默认情况下，用户安装程序会将 VS Code 安装到 `C:\Users\{Username}\AppData\Local\Programs\Microsoft VS Code` 下。

> [!TIP]
> 安装程序会将 Visual Studio Code 添加到你的 `%PATH%` 环境变量中。安装后重启控制台，然后在一个文件夹中运行 `code .` 即可在 VS Code 中打开该文件夹。

### 使用系统安装程序进行安装

1. 下载 Windows 版 [Visual Studio Code 系统安装程序](https://go.microsoft.com/fwlink/?linkid=852157)。

1. 以管理员权限运行安装程序。

系统安装程序使计算机上的所有用户都可以使用 VS Code。

### 从 ZIP 压缩包安装

1. 下载 Windows 版 [Visual Studio Code ZIP 压缩包](/download)。

1. 解压 ZIP 压缩包，从解压后的文件夹中运行 VS Code。

> [!NOTE]
> 通过 ZIP 压缩包安装 VS Code 时，需要为每个[版本](/updates)手动更新。

## 更新

VS Code 每周发布[版本](/updates)，并在有新版本可用时支持自动更新。当 VS Code 提示你更新时，接受提示即可安装新版本。

> [!NOTE]
> 如果你希望按照自己的计划更新 VS Code，可以[禁用自动更新](/docs/supporting/faq.md#how-do-i-opt-out-of-vs-code-auto-updates)。

## 在 Windows 上进行开发

Windows 是一个出色的跨平台开发环境。本节介绍[适用于 Linux 的 Windows 子系统](https://learn.microsoft.com/windows/wsl/install)（WSL）和 Windows 终端。

> [!NOTE]
> 保持 Windows 为最新版本。请在**设置** > **Windows 更新**中查看可用的更新。

### 适用于 Linux 的 Windows 子系统

通过 WSL，你可以在 Windows 上安装和运行 Linux 发行版，从而在本地使用 Windows 计算机的同时在 Linux 上开发和测试源代码。

当搭配 [WSL 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)使用时，VS Code 在 WSL 的上下文中运行并提供编辑和调试支持。

请参阅[在 WSL 中开发](/docs/remote/wsl.md)文档以了解更多信息，或尝试[在 WSL 中工作](/docs/remote/wsl-tutorial.md)入门教程。

### Windows 终端

[Windows 终端](https://apps.microsoft.com/detail/9n0dx20hk701)可从 Microsoft Store 获取，是一个用于命令行工具和 Shell（如命令提示符、PowerShell 和 WSL）的终端应用程序。其主要功能包括多标签页、窗格、Unicode 和 UTF-8 字符支持、GPU 加速的文本渲染引擎、自定义主题、样式和配置。

## 安装后

安装 VS Code 后，请完成开发工作流的设置：

* [安装其他组件](/docs/setup/additional-components.md)，包括 Git、Node.js、TypeScript、语言运行时和命令行工具。
* [从 Visual Studio Marketplace 安装扩展](https://marketplace.visualstudio.com/VSCode)，以添加主题、格式化工具、调试器和语言支持。
* [设置 GitHub Copilot](/docs/setup/copilot.md)，以便在 VS Code 中使用 AI 功能。
* [开始 VS Code 教程](/docs/editing/getting-started.md)，通过动手实践了解用户界面和核心功能。

## 常见问题

<details>
<summary>Windows 安装程序支持哪些命令行参数？</summary>

VS Code 使用 [Inno Setup](https://www.jrsoftware.org/isinfo.php) 创建其 Windows 安装包。所有 [Inno Setup 命令行开关](https://www.jrsoftware.org/ishelp/index.php?topic=setupcmdline)均可使用。

若要防止安装程序在完成后启动 VS Code，请使用 `/mergetasks=!runcode`。

</details>

<details>
<summary>我在使用安装程序时遇到问题</summary>

请使用 [ZIP 压缩包](/download)代替安装程序。使用此安装方法时，将 VS Code 解压到你的 `AppData\Local\Programs` 文件夹中。

</details>

<details>
<summary>启用 AppLocker 时无法以管理员身份运行</summary>

随着进程沙盒的引入，由于运行沙盒的限制，当配置了 AppLocker 时，当前不支持以管理员身份运行。请阅读 [VS Code 沙盒博客文章](https://code.visualstudio.com/blogs/2022/11/28/vscode-sandbox)了解更多信息。

如果你的工作需要从提权的终端运行 VS Code：

1. 在 VS Code 中，在命令面板（`kb(workbench.action.showCommands)`）中运行**首选项: 配置运行时参数**命令。

    此命令会打开一个 `argv.json` 文件来配置 VS Code 的运行时参数。该文件可能已包含一些默认参数。

1. 在 `argv.json` 文件中添加 `"disable-chromium-sandbox": true`。

1. 重启 VS Code。之后 VS Code 就可以从提权的终端运行了。

订阅 [issue #122951](https://github.com/microsoft/vscode/issues/122951) 以获取更新。

</details>

<details>
<summary>使用 UNC 路径</summary>

从版本 `1.78.1` 开始，Windows 上的 VS Code 仅打开在启动时由用户批准或者其主机名通过 `setting(security.allowedUNCHosts)` 设置配置的 UNC 路径。UNC 路径以 `\\` 开头。

如果你的工作流依赖 VS Code 中的 UNC 路径，请使用以下选项之一：

* 通过 `setting(security.allowedUNCHosts)` 设置配置主机。例如，在打开 `\\server-a\path` 这样的路径时，添加 `server-a`。
* [将 UNC 路径映射为网络驱动器](https://support.microsoft.com/en-us/windows/map-a-network-drive-in-windows-29ce55d1-34e3-a7e2-4801-131475f9557d)，然后使用驱动器号代替 UNC 路径。
* 定义一个名为 `NODE_UNC_HOST_ALLOWLIST` 的全局环境变量，其值为以反斜杠分隔的允许的主机名列表。例如，`server-a\server-b` 允许主机 `server-a` 和 `server-b`。

> [!NOTE]
> 如果远程扩展连接到远程工作区（例如通过 SSH），请在远程计算机上（而非本地计算机上）配置 `setting(security.allowedUNCHosts)`。

此更改提高了使用 UNC 路径时 VS Code 的安全性。有关更多信息，请参阅相关的[安全公告](https://github.com/microsoft/vscode/security/advisories/GHSA-mmfh-4pv3-39hr)。

</details>
