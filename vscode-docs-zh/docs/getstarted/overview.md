---
ContentId: FC5262F3-D91D-4665-A5D2-BCBCCF66E53A
DateApproved: 6/10/2026
MetaDescription: 开始使用 Visual Studio Code，这是一个面向 AI 智能体的开放平台。在 Windows、macOS 或 Linux 上安装，并通过智能体编码、扩展和强大的编辑器开始构建。
MetaSocialImage: images/quicksetup/quick-setup-social.png
---
# 开始使用 Visual Studio Code

Visual Studio Code 是一款免费、开源的代码编辑器，适用于 Windows、macOS 和 Linux。它是面向 AI 智能体的开放平台，可扩展性强，并拥有内置调试、Git 和 IntelliSense 功能的强大编辑器。

你可以[下载](https://code.visualstudio.com/download)并将 VS Code 安装到桌面上，或零配置直接在浏览器中打开 [vscode.dev](https://vscode.dev) 立即使用（详细了解 [VS Code for the Web](/docs/remote/vscode-web.md)）。

![Screenshot of VS Code with a travel blog project open, showing an agent session in the Chat view and previewing the site in the integrated browser.](images/overview/vscode-overview.png)

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with VS Code">
跟随实践教程，在 VS Code 中使用 AI 构建你的第一个应用。

* [开始教程](/docs/getstarted/getting-started.md)

</div>

## 安装 VS Code

[下载适用于你平台的安装程序](https://code.visualstudio.com/download)，然后按照以下步骤操作。VS Code 轻量级且可在大多数硬件上运行。详情请查看[系统要求](/docs/supporting/requirements.md)。

VS Code 每周发布[稳定版](/updates)，并支持自动更新。如需预览即将推出的功能，可安装[ Insiders ](/insiders)版本，该版本每夜构建，可与稳定版并行运行。

{% tabs id="os" %}
{% tab label="Windows" %}

1. 下载[用户安装程序](https://code.visualstudio.com/download)（`.exe`）。
1. 运行安装程序并按照提示操作。
1. VS Code 即可使用。安装程序会将 `code` 添加到你的 PATH 中，这样你就可以在终端中使用 `code .` 打开文件夹。

如需系统安装程序、ZIP 压缩包或其他选项，请参阅[完整的 Windows 安装指南](/docs/setup/windows.md)。

{% /tab %}
{% tab label="macOS" %}

1. 下载 [`.dmg` 安装程序](https://code.visualstudio.com/download)。
1. 打开 `.dmg` 文件，将 **Visual Studio Code.app** 拖到 **Applications** 文件夹中。
1. 从 Applications 文件夹或 Spotlight 打开 VS Code。

要在终端中使用 `code` 命令，请打开命令面板（`kb(workbench.action.showCommands)`）并运行 **Shell Command: Install 'code' command in PATH**。更多选项请参阅[完整的 macOS 安装指南](/docs/setup/mac.md)。

{% /tab %}
{% tab label="Linux" %}

选择你使用的发行版以获取安装说明。安装软件包将设置 apt 或 dnf 仓库以实现自动更新。关于 Snap、Arch、Nix 和其他选项，请参阅[完整的 Linux 安装指南](/docs/setup/linux.md)。

* **Debian / Ubuntu**
     1. 从 [VS Code 下载页面](/download)下载 `.deb` 软件包
     1. 使用 `sudo apt install ./<file>.deb` 进行安装

* **Fedora / RHEL**
     1. 从 [VS Code 下载页面](/download)下载 `.rpm` 软件包
     1. 使用 `sudo dnf install ./<file>.rpm` 进行安装

{% /tab %}
{% /tabs %}

## 启用 AI 功能

VS Code 内置支持 AI 功能，如内联建议和帮助你完成编码任务的 AI 智能体。你可以通过登录 GitHub 来开始使用 AI 功能，并使用你的 GitHub Copilot 订阅来访问各种大语言模型以及 VS Code 中的其他 AI 功能。

按照以下步骤在 VS Code 中开始使用 Copilot：

1. 从 VS Code 标题栏中选择**登录**，或将鼠标悬停在状态栏中的 Copilot 图标上，然后选择**启用 AI 功能**。

    ![Screenshot showing a new VS Code window, highlighting the Copilot icon in the Status Bar and the Sign In button in the VS Code title bar.](images/overview/vscode-enable-ai-features.png)

1. 选择登录方式并按照提示操作。

    * 如果你的账户已拥有 Copilot 订阅，VS Code 将使用该订阅。

    * 如果你还没有 Copilot 订阅，你将注册 [Copilot Free 计划](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-copilot-free/about-github-copilot-free)，并获得每月限额的内联建议和 AI 积分。

1. 开始在 VS Code 中使用 Copilot！

> [!TIP]
> 你也可以在 VS Code 中使用 AI 功能而无需 Copilot 订阅，只需提供你自己的语言模型 API 密钥。详细了解[在 VS Code 中使用语言模型](/docs/agent-customization/language-models.md#bring-your-own-language-model-key)。

## 后续步骤

<div class="card-grid">
    <a class="card" href="/docs/getstarted/getting-started">
        <i class="codicon codicon-hubot" aria-hidden="true"></i>
        <div>
            <p><strong>AI 智能体</strong></p>
            <p>通过我们的实践指南了解 AI 智能体。</p>
        </div>
    </a>
    <a class="card" href="/docs/editing/getting-started">
        <i class="codicon codicon-tools" aria-hidden="true"></i>
        <div>
            <p><strong>强大的编辑器</strong></p>
            <p>学习 VS Code 中编辑、调试和语言支持的基础知识。</p>
        </div>
    </a>
    <a class="card" href="/docs/configure/extensions/extensions">
        <i class="codicon codicon-extensions" aria-hidden="true"></i>
        <div>
            <p><strong>可扩展平台</strong></p>
            <p>扩展、MCP 服务器、自定义指令和开放 API。</p>
        </div>
    </a>
</div>

## 常见问题

<details>
<summary>VS Code 的系统要求是什么？</summary>

请查看[系统要求](/docs/supporting/requirements.md)，了解支持的平台和硬件。

</details>

<details>
<summary>VS Code 有多大？</summary>

VS Code 安装包较小，不到 200 MB，磁盘占用空间不到 500 MB。

</details>

<details>
<summary>如何创建和运行新项目？</summary>

VS Code 不包含传统的**文件** > **新建项目**对话框或预装的项目模板。根据你的开发工作流程添加[其他组件](/docs/setup/additional-components.md)和脚手架工具。诸如 [Yeoman](https://yeoman.io/) 等脚手架工具以及 [npm](https://www.npmjs.com/) 包管理器提供的软件包可提供创建项目的模板和工具。

</details>

<details>
<summary>如何知道我正在运行哪个版本？</summary>

在 Linux 和 Windows 上，选择**帮助** > **关于**。在 macOS 上，使用 **Code** > **关于 Visual Studio Code**。**关于**对话框会显示版本号和提交 ID。对于 Insiders 版本，多个构建版本可能共享相同的版本号，因此请使用提交 ID 来唯一标识你的构建版本。

</details>

<details>
<summary>为什么 VS Code 提示我的安装不受支持？</summary>

VS Code 检测到某些安装文件已被修改，可能是由某个扩展导致的。重新安装 VS Code 将替换受影响的文件。更多详情请参阅我们的[常见问题解答](/docs/supporting/faq.md#installation-appears-to-be-corrupt-unsupported)。

</details>

<details>
<summary>如何对 VS Code 进行'干净'卸载？</summary>

要在[卸载](/docs/setup/uninstall.md) VS Code 后删除所有用户数据，请删除用户数据文件夹 `Code` 和 `.vscode`。这将使 VS Code 恢复到安装前的状态，并且可以在不卸载 VS Code 的情况下重置所有设置。

文件夹位置因平台而异：

* **Windows** - 删除 `%APPDATA%\Code` 和 `%USERPROFILE%\.vscode`。
* **macOS** - 删除 `$HOME/Library/Application Support/Code` 和 `~/.vscode`。
* **Linux** - 删除 `$HOME/.config/Code` 和 `~/.vscode`。

</details>
