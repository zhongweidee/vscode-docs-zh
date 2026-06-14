---
ContentId: d665a790-1da1-4f45-bc0f-c09822528e55
DateApproved: 6/10/2026
MetaDescription: Visual Studio Code for the Web 和 vscode.dev URL
---
# Visual Studio Code for the Web（Web 版 VS Code）

Visual Studio Code for the Web 提供了一种免费、零安装的 Microsoft Visual Studio Code 体验，完全在浏览器中运行，让你可以快速、安全地浏览源代码仓库并进行轻量级代码更改。要开始使用，请在浏览器中访问 [https://vscode.dev](https://vscode.dev)。

Web 版 VS Code 拥有 VS Code 桌面版的许多你喜爱的功能，包括浏览和编辑时的搜索和语法高亮，以及对扩展的支持，以便在你自己的代码库上工作并进行更简单的编辑。除了从 GitHub 和 Azure Repos 等源代码管理提供程序打开仓库、分支和拉取请求外，你还可以处理存储在本地计算机上的代码。

Web 版 VS Code 完全在你的 Web 浏览器中运行，因此与桌面体验相比存在某些限制，你可以在[下方](#limitations)了解更多。

以下视频快速概述了 Visual Studio Code for the Web。

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/2sdXMJZKLJE" title="Introduction to Visual Studio Code for the Web" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 与 VS Code 桌面版的关系

Web 版 VS Code 提供了一种基于浏览器的体验，用于浏览文件和仓库以及提交轻量级代码更改。但是，如果你需要访问运行时来运行、构建或调试代码，或者你想使用平台功能（如终端），或者你想运行 Web 版不支持的扩展，我们建议你将工作转移到桌面应用程序、[GitHub Codespaces](https://github.com/features/codespaces)，或者使用 [Remote - Tunnels](#use-your-own-compute-instance-with-remote-tunnels) 来获得 VS Code 的完整功能。此外，VS Code 桌面版让你可以使用不受浏览器限制的完整键盘快捷键集。

当你准备切换时，只需点击几下即可["升级"](#continue-working-in-a-different-environment)到完整的 VS Code 体验。

你还可以通过选择齿轮图标，然后点击 **Switch to Insiders Version...**，或直接导航到 [https://insiders.vscode.dev](https://insiders.vscode.dev) 来在 VS Code for the Web 的稳定版和 Insiders 版本之间切换。

## 打开项目

通过导航到 [https://vscode.dev](https://vscode.dev)，你可以创建新的本地文件或项目，处理现有的本地项目，或访问托管在其他地方的源代码仓库，例如 GitHub 和 Azure Repos（Azure DevOps 的一部分）。

你可以像在 VS Code 桌面环境中一样，通过命令面板（`kbstyle(F1)`）使用 **File** > **New File** 在 Web 中创建新的本地文件。

## GitHub 仓库

你可以直接从 URL 在 Web 版 VS Code 中打开 GitHub 仓库，遵循以下模式：`https://vscode.dev/github/<organization>/<repo>`。以 [VS Code 仓库](https://github.com/microsoft/vscode)为例，它将类似于：`https://vscode.dev/github/microsoft/vscode`。

此体验通过自定义的 `vscode.dev/github` URL 提供，由 [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub) 扩展（属于更广泛的 [Remote Repositories](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-repositories) 扩展的一部分）驱动。

GitHub Repositories 允许你在编辑器中远程浏览和编辑仓库，无需将代码拉取到本地计算机。你可以在我们的 [GitHub Repositories](/docs/sourcecontrol/github.md#github-repositories-extension) 指南中了解有关该扩展及其工作原理的更多信息。

>**注意**：[GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub) 扩展也适用于 VS Code 桌面版，以提供快速的仓库浏览和编辑。安装扩展后，你可以使用 **GitHub Repositories: Open Repository...** 命令打开仓库。

你还可以通过安装 Chrome 和 Edge 的 `vscode.dev` [扩展](https://chrome.google.com/webstore/detail/vs-code/kobakmhnkfaghloikphojodjebdelppk)，在浏览器的搜索栏（即 omnibox）中打开 `vscode.dev` 上的 GitHub 仓库。然后，输入 `code` 来激活 omnibox，接着输入你的仓库名称。建议由你的浏览器搜索历史填充，因此如果你想要的仓库没有出现，你也可以输入完全限定的 `<owner>/<repo>` 名称来打开它，例如 `microsoft/vscode`。

![Type `code` in your browser and search a GitHub repository to open in vscode.dev](images/vscode-web/chrome-omnibox-extension.png)

如果你已经在 [https://vscode.dev](https://vscode.dev) 的 Web 版 VS Code 中，你也可以通过 [Remote Repositories](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-repositories) 扩展命令导航到不同的仓库。选择状态栏左下角的远程指示器，你将看到 **Open Remote Repository...** 命令。

![GitHub Repositories](images/vscode-web/remote-repositories.png)

## Azure Repos

你可以像在 Web 版 VS Code 中打开 Github 仓库一样打开 Azure Repos。

当你导航到模式为 `https://vscode.dev/azurerepos/<organization>/<project>/<repo>` 的 URL 时，你将能够读取、搜索仓库中的文件，并将更改提交到 Azure Repos。你可以获取、拉取和同步更改，以及查看分支。

你可以通过在 Azure Repos URL 前添加 `vscode.dev` 来在 Web 版 VS Code 中打开 Azure Repos 中的任何仓库、分支或标记。

或者，当你在 Azure DevOps 仓库或拉取请求页面上时，你可以按（`kbstyle(.)`）在 Web 版 VS Code 中打开它。

## 更多自定义 URL

与桌面版一样，你可以通过丰富的扩展生态系统来自定义 Web 版 VS Code，这些扩展几乎支持所有后端、语言和服务。`vscode.dev` 包含提供常见体验快捷方式的 URL。

我们已经探索了几个 URL（`vscode.dev/github` 和 `vscode.dev/azurerepos`）。以下是更完整的列表：

| 服务 | URL 结构 | 文档 |
| --- | --- | --- |
| GitHub | `/github/<org>/<repo>` | [更多信息见上文](#github-repos) |
| Azure Repos | `/azurerepos/<org>/<project>/<repo>` | [更多信息见上文](#azure-repos) |
| Visual Studio Live Share | `/editor/liveshare/<sessionId>` | [更多信息见下文](#visual-studio-live-share) |
| Visual Studio Marketplace | `/editor/marketplace/<marketplacePublisher>`<br>`/<extensionId>/<extensionVersion>` | [示例路由](https://insiders.vscode.dev/editor/marketplace/Brigit/devcontainer-image-convert/0.0.1) 用于编辑[此扩展](https://marketplace.visualstudio.com/items?itemName=Brigit.devcontainer-image-convert) |
| Power Pages | `/power/pages` | [Power Pages 文档](https://learn.microsoft.com/power-pages/configure/visual-studio-code-editor) |
| 配置文件 | `/editor/profile/github/<GUID>` | [配置文件文档](/docs/configure/profiles.md#save-as-a-github-gist) |
| 主题 | `/editor/theme/<extensionId>` | [更多信息见下文](#themes) |
| MakeCode | `/edu/makecode` | [MakeCode 文档](https://arcade.makecode.com/vscode) |
| VS Code for Education | `/edu` | [VS Code for Education 登录页面](https://vscodeedu.com/) |
| Azure Machine Learning (AML) | `/+ms-toolsai.vscode-ai-remote-web` | [AML 文档](https://learn.microsoft.com/azure/machine-learning/how-to-launch-vs-code-remote?view=azureml-api-2&tabs=vscode-web) |
| Azure | `/azure` | [VS Code for Azure](https://code.visualstudio.com/docs/azure/vscodeforweb) |

请注意，某些 URL 必须以特定方式输入（例如，`vscode.dev/editor/liveshare` 需要活动的 Live Share 会话）。请查看每个服务的文档以获取具体的访问和使用信息。

以下是一些 URL 的更多信息。

### 主题

你可以通过 URL 模式在 Web 版 VS Code 中分享和体验颜色主题：`https://vscode.dev/editor/theme/<extensionId>`。

例如，你可以访问 [https://vscode.dev/editor/theme/sdras.night-owl](https://vscode.dev/editor/theme/sdras.night-owl) 来体验 [Night Owl 主题](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl)，而无需经过下载和安装过程。

> 注意：颜色主题 URL 模式适用于完全声明性（无代码）的主题。

一个扩展可以定义多个主题。你可以使用模式 `/editor/theme/<extensionId>/<themeName>`。如果未指定 `themeName`，Web 版 VS Code 将采用第一个主题。

作为主题作者，你可以在扩展自述文件中添加以下徽章，让用户可以在 Web 版 VS Code 中轻松试用你的主题（将 `<extensionId>` 替换为主题扩展的唯一标识符）：

```markdown
[![Preview in vscode.dev](https://img.shields.io/badge/preview%20in-vscode.dev-blue)](https://vscode.dev/editor/theme/<extensionId>)
```

### Visual Studio Live Share

[Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare) 来宾会话可通过 `https://vscode.dev/editor/liveshare` URL 在浏览器中使用。`sessionId` 将被传递给扩展，以实现无缝加入体验。

## 在不同环境中继续工作

在某些情况下，你可能希望访问具有运行代码能力的不同环境。你可以切换到在支持本地文件系统以及完整语言和开发工具的开发环境中处理仓库。

GitHub Repositories 扩展让你可以轻松地在本地克隆仓库、在桌面上重新打开，或为当前仓库创建 GitHub codespace（如果你安装了 [GitHub Codespaces](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces) 扩展并有权限创建 GitHub codespaces）。为此，请使用命令面板（`kbstyle(F1)`）中的 **Continue Working On...** 命令，或点击状态栏中的远程指示器。

## 保存和分享工作

在 Web 中处理本地文件时，如果启用了[自动保存](/docs/editing/codebasics.md#save--auto-save)，你的工作将自动保存。你也可以像在 VS Code 桌面版中工作时一样手动保存（例如 **File** > **Save**）。

在处理远程仓库时，你的工作将保存在浏览器的本地存储中，直到你提交为止。如果你使用 GitHub Repositories 打开仓库或拉取请求，你可以在源代码管理视图中推送更改以保留任何新工作。

你还可以通过 [Continue Working On](#continue-working-in-a-different-environment) 在其他环境中继续工作。

首次使用 **Continue Working On** 并存在未提交的更改时，你可以选择使用 **Cloud Changes** 将你的编辑带到你选择的开发环境中，Cloud Changes 使用 VS Code 服务来存储待处理的更改。这在 [GitHub Repositories](/docs/sourcecontrol/github.md#continue-working-on) 文档中有进一步描述。

## 使用 Remote Tunnels 使用你自己的计算实例

你可以使用 [Remote - Tunnels](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-server) 扩展，在 Web 版 VS Code 中针对另一台计算机进行开发。

Remote - Tunnels 扩展允许你通过安全隧道连接到远程计算机（如台式电脑或虚拟机 (VM)）。然后，你可以从任何地方安全地连接到该计算机，而无需 SSH。这让你可以"自带计算"到 vscode.dev，从而实现更多场景，例如在浏览器中运行代码。

你可以在 Remote - Tunnels 的[文档](/docs/remote/tunnels.md)中了解更多信息。

## 安全探索

Web 版 VS Code 完全在你的 Web 浏览器沙箱中运行，并提供一个非常有限的执行环境。

当从远程仓库访问代码时，Web 编辑器不会"克隆"仓库，而是通过直接从浏览器调用服务的 API 来加载代码；这进一步减少了克隆不受信任的仓库时的攻击面。

在处理本地文件时，Web 版 VS Code 通过浏览器的文件系统访问 API 加载它们，这限制了浏览器可以访问的范围。

## 随处运行

与 [GitHub Codespaces](/docs/remote/codespaces.md) 类似，Web 版 VS Code 可以在平板设备（如 iPad）上运行。

## 语言支持

语言支持在 Web 上更细致一些，包括代码编辑、导航和浏览。桌面体验通常由期望文件系统、运行时和计算环境的语言服务和编译器提供支持。在浏览器中，这些体验由在浏览器中运行的语言服务提供支持，这些服务提供源代码标记化和语法着色、补全以及许多单文件操作。

通常，体验分为以下几类：

* **良好：** 对于大多数编程语言，Web 版 VS Code 提供代码语法着色、基于文本的补全和括号对着色。通过 [anycode 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode.anycode)使用 [Tree-sitter](https://tree-sitter.github.io/tree-sitter) 语法树，我们能够为 C/C++、C#、Java、PHP、Rust 和 Go 等流行语言提供额外体验，例如 **Outline/Go to Symbol** 和 **Symbol Search**。
* **更好：** TypeScript、JavaScript 和 Python 的体验均由在浏览器中原生运行的语言服务提供支持。对于这些编程语言，你将获得"**良好**"体验外加丰富的单文件补全、语义高亮、语法错误等。
* **最佳：** 对于许多"Web 风格"语言，如 JSON、HTML、CSS 和 LESS 等，vscode.dev 中的编码体验与桌面版几乎相同（包括 Markdown 预览！）。

你可以通过状态栏中的语言状态指示器确定当前文件的语言支持级别：

![Language status indicator](images/vscode-web/status-indicator.png)

## 限制

由于 Web 版 VS Code 完全在浏览器中运行，与桌面应用程序相比，某些体验自然会受到更多限制。例如，终端和调试器不可用，这是有道理的，因为你无法在浏览器沙箱中编译、运行和调试 Rust 或 Go 应用程序。

### 扩展

只有一部分扩展可以在浏览器中运行。你可以使用扩展视图在 Web 中安装扩展，无法安装的扩展将显示一个警告图标和 **Learn Why** 链接。我们预计随着时间的推移，会有更多扩展变得可用。

![Limited extension support](images/vscode-web/extension-limit.png)

当你安装扩展时，它保存在浏览器的本地存储中。你可以通过启用[设置同步](/docs/configure/settings-sync)来确保你的扩展在 VS Code 实例之间同步，包括不同的浏览器甚至桌面版。

当扩展包包含无法在浏览器沙箱中运行的扩展时，你将收到一条信息消息，其中包含查看包中包含的扩展的选项。

![Python extension pack limit](images/vscode-web/python-extension-limit.png)

当扩展在浏览器沙箱中执行时，它们会受到更多限制。纯声明性扩展（如大多数主题、代码片段或语法）可以不经修改地运行，并且无需扩展作者进行任何修改即可在 Web 版 VS Code 中使用。运行代码的扩展需要更新以支持在浏览器沙箱中运行。你可以在 [Web 扩展作者指南](/api/extension-guides/web-extensions.md)中阅读有关支持扩展在浏览器中运行所涉及的内容的更多信息。

还有一些扩展在浏览器中运行时仅提供部分支持。一个很好的例子是将[其支持限制](/docs/nodejs/working-with-javascript.md#partial-intellisense-mode)为单个文件或当前打开的文件的编程语言扩展。

### 文件系统 API

Edge 和 Chrome 目前支持[文件系统 API](https://developer.mozilla.org/docs/Web/API/File_System_Access_API)，允许网页访问本地文件系统。如果你的浏览器不支持文件系统 API，则无法在本地打开文件夹，但可以打开文件。

### 浏览器支持

你可以在最新版本的 Chrome、Edge、Firefox 和 Safari 中使用 Web 版 VS Code。每个浏览器的旧版本可能无法使用——我们只保证对最新版本的支持。

> **提示：** 检查兼容浏览器版本的一种方法是查看当前用于测试 VS Code 的 [Playwright](https://playwright.dev/) 版本，并查看其支持的浏览器版本。你可以在 VS Code 仓库的 [package.json](https://github.com/microsoft/vscode/blob/main/package.json) 文件的 `devDependencies/@playwright/test` 中找到当前使用的 Playwright 版本。一旦你知道了 Playwright 版本，例如 `1.37`，你就可以查看其[发布说明](https://playwright.dev/docs/release-notes)中的**浏览器版本**部分。

在 Firefox 和 Safari 中，Web 视图可能会显示不同或出现一些意外行为。你可以在 VS Code GitHub 仓库中查看问题查询，以跟踪与特定浏览器相关的问题，例如带有 [Safari 标签](https://github.com/microsoft/vscode/labels/safari)和 [Firefox 标签](https://github.com/microsoft/vscode/labels/firefox)的问题。

你可以采取额外的步骤来改善使用 Web 版 VS Code 的浏览器体验。请查看[额外的浏览器设置](#additional-browser-setup)部分以获取更多信息。

### 移动设备支持

你可以在移动设备上使用 Web 版 VS Code，但较小的屏幕可能会有某些限制。

### 键盘快捷键

某些键盘快捷键在 Web 中可能也会有不同的工作方式。

| 问题 | 原因 |
|-|-|
| `kb(workbench.action.showCommands)` 在 Firefox 中无法启动命令面板。 | `kb(workbench.action.showCommands)` 在 Firefox 中被保留。<br> 作为解决方法，请使用 `kbstyle(F1)` 启动命令面板。 |
| `kb(workbench.action.files.newUntitledFile)` 用于新建文件在 Web 中无效。 | `kb(workbench.action.files.newUntitledFile)` 会打开一个新窗口。<br> 作为解决方法，你可以使用 `kbstyle(Ctrl+Alt+N)`（macOS 上为 `kbstyle(Cmd+Alt+N)`）。 |
| `kb(workbench.action.closeActiveEditor)` 用于关闭编辑器在 Web 中无效。 | `kb(workbench.action.closeActiveEditor)` 在浏览器中会关闭当前标签页。<br> 作为解决方法，你可以使用 `kbstyle(Ctrl+Shift+Alt+N)`（macOS 上为 `kbstyle(Cmd+Shift+Alt+N)`）。 |
| `kb(workbench.action.tasks.build)` 不会在浏览器中切换收藏夹栏。 | Web 版 VS Code 会覆盖此项并重定向到命令面板中的"Build"菜单。 |
| `kbstyle(Alt+Left)` 和 `kbstyle(Alt+Right)` 应在编辑器内导航，但可能错误地触发标签页历史导航。 | 如果焦点在编辑器外部，这些快捷键会改为触发标签页历史导航。 |

## 额外的浏览器设置

在浏览器中使用 VS Code 时，你可以采取一些额外的浏览器配置步骤。

### 打开新标签页和新窗口

在某些情况下，你可能需要在 Web 版 VS Code 中工作时打开新的标签页或窗口。当从剪贴板读取时，VS Code 可能会请求你允许访问剪贴板。根据你的浏览器，你可以通过不同的方式授予剪贴板访问权限或以其他方式允许弹出窗口：

* Chrome、Edge、Firefox：在浏览器设置中搜索"网站权限"，或在地址栏右侧查找以下选项：

![Allow clipboard access in the browser](images/vscode-web/allow-clipboard-access.png)

* Safari：在 Safari 浏览器中，转到 **Preferences...** > **Websites** > **Pop-up Windows** > 你正在访问的域（例如 `vscode.dev`），然后从下拉列表中选择 **Allow**。
