---
ContentId: EEADB50A-F5E3-41E9-89DA-35F165196691
DateApproved: 6/10/2026
MetaDescription: 在 macOS 上安装 Visual Studio Code，将 code 命令添加到路径中，并解决常见的安装问题。
MetaSocialImage: images/quicksetup/quick-setup-social.png
---
# 在 macOS 上安装 Visual Studio Code

Visual Studio Code 可通过可下载的磁盘映像在 macOS 上使用。VS Code 支持基于 Intel 的 Mac 和搭载 Apple 芯片的 Mac。

## 在 macOS 上安装 VS Code

1. [下载适用于 macOS 的 Visual Studio Code](https://go.microsoft.com/fwlink/?LinkID=534106)。

1. 打开下载的 `.dmg` 文件。

1. 将 `Visual Studio Code.app` 拖放到 **应用程序** 文件夹中。

1. 双击图标，从 **应用程序** 文件夹中打开 VS Code。

1. 要将 VS Code 保留在 Dock 中，按住 Control 键点击 Dock 中的图标，然后选择 **选项** > **在 Dock 中保留**。

> [!NOTE]
> [下载 Visual Studio Code](/download) 页面还列出了通用版、Intel 芯片版和 Apple 芯片版。

## 从命令行启动 VS Code

要通过在终端中键入 `code` 来运行 VS Code，需要将 VS Code 添加到 `$PATH` 环境变量中。

### 使用 VS Code 配置 PATH

1. 启动 VS Code。

1. 打开 **命令面板** (`kbstyle(Cmd+Shift+P)`)，输入 `shell command`，然后运行 **Shell Command: Install 'code' command in PATH** 命令。

    ![Screenshot showing the Shell Command command in the Command Palette on macOS.](images/mac/shell-command.png)

1. 重启终端以使新的 `$PATH` 值生效。

    在任意文件夹中运行 `code .` 即可开始编辑该文件夹中的文件。

> [!NOTE]
> 如果 `.bash_profile` 或等效的 shell 配置文件中还保留着旧版 VS Code 中的 `code` 别名，请将其删除，然后重新运行 **Shell Command: Install 'code' command in PATH** 命令。

### 手动配置 PATH

要手动将 VS Code 添加到路径中，请运行适用于你的 shell 的命令。

**Zsh**：

```zsh
cat << EOF >> ~/.zprofile
# Add Visual Studio Code (code)
export PATH="\$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
EOF
```

**Bash**：

```bash
cat << EOF >> ~/.bash_profile
# Add Visual Studio Code (code)
export PATH="\$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
EOF
```

> [!NOTE]
> `\$PATH` 中的前导反斜杠可防止 `$PATH` 在拼接过程中被展开。在终端中直接运行 export 命令时，请删除该反斜杠。

启动新的终端以使更改生效。在任意文件夹中运行 `code .` 即可开始编辑该文件夹中的文件。

## 更新

VS Code 每周发布[更新版本](/updates)，并在新版本可用时支持自动更新。当 VS Code 提示你进行更新时，接受提示以安装新版本。

> [!NOTE]
> 如果你希望按照自己的计划更新 VS Code，可以[禁用自动更新](/docs/supporting/faq.md#how-do-i-opt-out-of-vs-code-auto-updates)。

## Touch Bar 支持

VS Code 在受支持的 Mac 上添加了以下 Touch Bar 操作：

* 编辑器历史记录导航。
* 用于控制调试器的调试工具栏。

![Screenshot showing VS Code Touch Bar actions on macOS.](images/mac/touchbar.gif)

## 安装之后

安装 VS Code 后，请完成开发工作流的设置：

* [安装其他组件](/docs/setup/additional-components.md)，包括 Git、Node.js、TypeScript、语言运行时和命令行工具。
* [从 Visual Studio Marketplace 安装扩展](https://marketplace.visualstudio.com/VSCode)，以添加主题、格式化工具、调试器和语言支持。
* [设置 GitHub Copilot](/docs/setup/copilot.md)，以使用 VS Code 中的 AI 功能。
* [开始 VS Code 教程](/docs/editing/getting-started.md)，亲身了解用户界面和主要功能。

## 常见问题

<details>
<summary>为什么 Visual Studio Code 会请求访问我的日历？</summary>

在 macOS Mojave 中，对话框可能会显示"Visual Studio Code 想要访问您的日历、通讯录或照片"。这些对话框来自 macOS 的隐私保护机制，并非 VS Code 特有。请选择 **不允许**，因为 VS Code 不需要访问这些文件夹。

</details>

<details>
<summary>VS Code 更新失败</summary>

如果 VS Code 在重启后没有更新，macOS 可能已将其置于隔离状态。请按照 [issue #7426](https://github.com/microsoft/vscode/issues/7426#issuecomment-425093469) 中的步骤解决该问题。

</details>

<details>
<summary>VS Code 能否在 Apple 芯片的 Mac 上运行？</summary>

可以。VS Code 支持在搭载 Apple 芯片的 Mac 上运行的 macOS Arm64 版本。你可以安装通用版（同时包含 Intel 和 Apple 芯片版本），或者安装特定平台的版本。

</details>
