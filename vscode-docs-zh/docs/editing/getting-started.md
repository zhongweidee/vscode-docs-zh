---
ContentId: 72ad9b70-5227-4032-81d7-6aec00a1e8f8
DateApproved: 6/10/2026
MetaDescription: 本教程将概述 Visual Studio Code 的关键功能，帮助你快速入门。
---
# 教程：Visual Studio Code 入门

在本教程中，你将了解 Visual Studio Code 的关键功能，帮助你快速入门。你将认识用户界面的不同组成部分，使用 AI 代理构建一个 Web 应用，并探索如何通过扩展来增强你的设置。你还将学习配置 VS Code 设置、使用源代码管理以及运行和调试代码。

> [!TIP]
> 如果你更喜欢通过视频来了解 Visual Studio Code，可以观看我们 YouTube 频道上的[入门视频](https://www.youtube.com/watch?v=f8_uF_IDV50)。

<div class="docs-action" data-show-in-doc="false" data-show-in-doc="true" title="AI 入门">
按照动手实践教程，在 VS Code 中使用 AI 构建你的第一个应用。

* [开始教程](/docs/getstarted/getting-started.md)

</div>

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="观看介绍视频">
通过我们的介绍视频了解 Visual Studio Code 的关键功能。

* [观看视频](https://www.youtube.com/watch?v=f8_uF_IDV50)

</div>

## 前提条件

* [在计算机上下载并安装 Visual Studio Code](https://code.visualstudio.com/download)
* [在 VS Code 中设置 GitHub Copilot](/docs/setup/copilot.md)
* 安装 [Node.js](https://nodejs.org/)（用于运行和调试 JavaScript）

> [!TIP]
> 如果你还没有 Copilot 订阅，可以注册 [Copilot 免费计划](https://github.com/github-copilot/signup)来免费使用 Copilot，并获得每月的补全和聊天交互次数限制。

## 在 VS Code 中打开文件夹

你可以使用 VS Code 处理单个文件进行快速编辑，也可以打开一个文件夹，即所谓的*工作区*。

让我们先创建一个文件夹并在 VS Code 中打开它。本教程将全程使用这个文件夹。

1. 打开 Visual Studio Code，从菜单中选择**文件** > **打开文件夹...** 来打开一个文件夹。

1. 选择**新建文件夹**，创建一个名为 `vscode101` 的新文件夹。然后选择**选择文件夹**（macOS 上为**打开**）以在 VS Code 中打开该文件夹。

    VS Code 现在会把你打开的文件夹视为一个工作区。

1. 在"工作区信任"对话框中，选择**是，我信任此作者**以启用工作区中的所有功能。

    ![Screenshot that shows the Workspace Trust dialog.](images/getting-started/workspace-trust.png)

    > [!IMPORTANT]
    > 工作区信任允许你决定 VS Code 是否可以执行项目文件夹中的代码。当你从互联网下载代码时，应首先检查代码以确保其运行安全。获取有关[工作区信任](/docs/editing/workspaces/workspace-trust.md)的更多信息。

1. 现在你应该会在左侧看到**资源管理器**视图，显示文件夹的名称。

    你将使用资源管理器视图来查看和管理工作区中的文件和文件夹。

    ![Screenshot of VS Code with the Explorer view opened and showing the vscode101 folder.](images/getting-started/vscode-folder-opened.png)

> [!TIP]
> 在 VS Code 中打开文件夹时，VS Code 可以恢复该文件夹的 UI 状态，例如打开的文件、活动视图和编辑器的布局。你还可以配置仅适用于该文件夹的设置，或定义调试配置。获取有关[工作区](/docs/editing/workspaces/workspaces.md)的更多信息。

## 探索用户界面

现在你已经在 VS Code 中打开了文件夹，让我们快速浏览一下用户界面。

### 使用活动栏在视图之间切换

1. 使用活动栏在不同视图之间切换。

    ![Screenshot that highlights the Activity Bar.](images/getting-started/activity-bar.png)

    > [!TIP]
    > 将鼠标悬停在活动栏上可查看每个视图的名称和相应的键盘快捷键。你可以通过再次选择视图或按下键盘快捷键来切换视图的打开和关闭状态。

1. 在活动栏中选择一个视图时，**主侧边栏**会打开并显示视图相关的信息。

    例如，"运行和调试"视图允许你配置并启动调试会话。

    ![Screenshot that shows the Activity Bar and the Run and Debug view in the Primary Side Bar.](images/getting-started/activity-bar-and-side-bar.png)

    > [!TIP]
    > 请注意活动栏中的**聊天**视图。这是你与 AI 代理交互以生成代码、提问等操作的地方。你将在下一步中使用它来构建应用。

### 使用编辑器查看和编辑文件

1. 在活动栏中选择"资源管理器"视图，然后选择**新建文件...** 按钮以在工作区中创建新文件。

    ![Screenshot that shows the New File button in the Explorer view.](images/getting-started/explorer-new-file.png)

1. 输入文件名 `index.html` 并按下 `kbstyle(Enter)`。

    一个文件被添加到你的工作区中，编辑器会在窗口的主区域中打开。

    ![Screenshot that shows the Editor in the main area of the window.](images/getting-started/new-file-editor.png)

1. 开始在 `index.html` 文件中输入一些 HTML 代码。

    当你输入时，应该会看到弹出的建议帮助你完成代码（*IntelliSense*）。你可以使用 `kbstyle(Up)` 和 `kbstyle(Down)` 键浏览建议，并使用 `kbstyle(Tab)` 键插入选中的建议。

1. 向工作区添加更多文件，并注意每个文件都会打开一个新的编辑器标签页。

    你可以打开任意数量的编辑器，并垂直或水平并排查看它们。了解有关[并排编辑](/docs/editing/userinterface.md#side-by-side-editing)的更多信息。

    ![Screenshot that shows multiple Editor tabs.](images/getting-started/multiple-editors.png)

### 从面板区域访问终端

1. VS Code 内置了集成终端。按下 `kb(workbench.action.terminal.toggleTerminal)` 打开它。你也可以使用**视图** > **终端**菜单项。

    你可以根据自己的操作系统配置选择不同的 Shell，例如 PowerShell、命令提示符或 Bash。

    ![Screenshot that shows the Panel area with the Terminal view.](images/getting-started/vscode-panel.png)

1. 在终端中，输入以下命令以在工作区中创建新文件。

    ```bash
    echo "Hello, VS Code" > greetings.txt
    ```

    默认的工作文件夹是工作区的根目录。请注意，资源管理器视图会自动检测并显示新文件。

    ![Screenshot that shows the Explorer view with the new file.](images/getting-started/terminal-new-file.png)

1. 你可以同时打开多个终端。选择**启动配置文件**下拉菜单以查看可用的 Shell 并选择一个。

    ![Screenshot that shows the Launch Profile dropdown with the available shells.](images/getting-started/terminal-launch-profile.png)

### 使用命令面板访问命令

1. 按下 `kb(workbench.action.showCommands)` 打开**命令面板**。你也可以使用**视图** > **命令面板**菜单项。

    VS Code 中的许多命令都可以通过命令面板访问。当你安装扩展时，它们可以向命令面板添加额外的命令。

    ![Screenshot that shows the Command Palette.](images/getting-started/command-palette.png)

    > [!TIP]
    > 请注意，命令面板会显示有关联键盘快捷键的命令的默认快捷键。你可以使用键盘快捷键直接运行命令。

1. 命令面板支持不同的操作模式：

    1. **命令模式（`>`）**：在 `>` 符号之后，开始输入以筛选命令列表。例如，输入 `move terminal` 来查找将终端移动到新窗口的命令。

        ![Screenshot that shows the Command Palette, listing the entries for moving the terminal.](images/getting-started/command-palette-move-terminal.png)

    1. **快速打开模式**：删除 `>` 字符并开始输入以搜索工作区中的文件。你可以使用 `kb(workbench.action.quickOpen)` 键盘快捷键打开命令面板并直接开始搜索文件。

        ![Screenshot that shows the Quick Open feature in the Command Palette.](images/getting-started/quick-open.png)

    1. **符号搜索模式（`#`）**：将 `>` 字符替换为 `#`，以搜索代码中的符号，如变量或函数。

> [!TIP]
> VS Code 使用模糊匹配来查找文件或命令。例如，输入 `odks` 会返回 `Open Default Keyboard Shortcuts` 命令。

## 使用 AI 代理构建应用

Visual Studio Code 内置了对 GitHub Copilot 的支持，可实现 AI 驱动的编码。AI 代理可以自主规划解决方案，创建和编辑多个文件，运行终端命令，并根据错误进行迭代，所有这些都只需一个自然语言提示即可完成。你描述你想要什么，代理就会完成所有需要做的工作。

让我们使用代理从一个提示构建一个食谱列表 Web 应用。

1. 按下 `kb(workbench.action.chat.open)` 打开聊天视图。

1. 从聊天视图的下拉菜单中选择**代理**。代理使 AI 能够自主创建和编辑文件，运行终端命令等。

    ![Screenshot that shows the Agent mode selector in the Chat view.](images/getting-started/chat-agent-mode.png)

1. 在聊天输入框中输入以下提示：

    ```prompt
    Create a recipe list app with HTML, CSS, and JavaScript in separate files. Include an input field to add recipes with a name and description, a list to display them, and a delete button for each item. Use modern styling. Add some sample recipes to the list.
    ```

    > [!NOTE]
    > 如果你尚未设置 GitHub Copilot，系统会提示你登录 GitHub 账户并设置 Copilot，然后才能发送提示。如果你没有 Copilot 订阅，你将关联到一个免费账户，该账户为你提供每月的补全和聊天交互次数限制。

1. 按下 `kbstyle(Enter)` 发送提示。

    代理开始生成应用。请注意它是如何创建多个文件、向你显示建议的更改，并可能请求批准运行终端命令的。

    ![Screenshot that shows the agent generating the recipe list app in the Chat view.](images/getting-started/agent-generating-app.png)

1. 查看生成的文件，并在聊天视图中选择**保留**以接受所有更改。

在下一步中，你将安装一个扩展以将应用托管在集成浏览器中。

## 使用扩展增强你的设置

VS Code 拥有丰富的扩展生态系统，允许你向安装中添加语言、调试器和工具以支持你的开发工作流。[Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode) 中有数千个扩展可用。

让我们安装一个扩展来帮助管理你刚刚构建的食谱列表应用。

1. 在活动栏中选择**扩展**视图。

    扩展视图允许你在 VS Code 内浏览和安装扩展。

    ![Screenshot that shows the Extensions view, highlighting the Extensions icon in the Activity Bar.](images/getting-started/extensions-view.png)

1. 在扩展视图搜索框中输入 *Live Preview*。选择由 Microsoft 发布的 **Live Preview** 扩展，然后选择**安装**按钮。

    Live Preview 启动一个本地开发服务器，支持静态和动态页面的实时重载。

1. 打开 `index.html` 文件，在编辑器中右键单击，然后选择**显示预览**。

    你的食谱列表应用现在在浏览器中打开。当你修改代码时，浏览器会自动刷新以显示最新版本。

    ![Screenshot that shows the recipe list app preview.](images/getting-started/recipe-list-preview.png)

1. 通过要求代理添加功能来继续聊天对话。输入以下提示：

    ```prompt
    Add the ability to mark recipes as favorites with a star icon. Favorite recipes should appear at the top of the list.
    ```

    代理修改现有文件以添加新功能。这展示了如何通过后续提示迭代地构建你的应用。

探索 VS Code 中更多的 AI 功能，请参阅 [Copilot 快速入门](/docs/getstarted/getting-started.md)。

## 配置 VS Code 设置

你可以通过配置设置来自定义 VS Code 的几乎每个部分。你可以使用**设置编辑器**来修改 VS Code 中的设置，也可以直接修改 `settings.json` 文件。

1. 按下 `kb(workbench.action.openSettings)` 打开设置编辑器（或选择**文件** > **首选项** > **设置**菜单项）。

    ![Screenshot that shows the Settings Editor.](images/getting-started/settings-editor.png)

    > [!TIP]
    > 使用搜索框来筛选显示的设置列表。

1. 默认情况下，VS Code 不会自动保存修改过的文件。从"自动保存"下拉菜单中选择一个值来更改此行为。

    ![Screenshot that shows the Auto Save dropdown in the Settings Editor.](images/getting-started/settings-editor-auto-save.png)

    VS Code 会自动应用对设置的更改。当你修改工作区中的文件时，现在应该会自动保存。

1. 要将设置恢复为其默认值，请选择设置旁边的齿轮图标，然后选择**重置设置**。

    ![Screenshot that shows the gear icon next to a setting in the Settings Editor.](images/getting-started/settings-editor-reset-setting.png)

    > [!TIP]
    > 你可以通过在搜索框中输入 `@modified` 或选择**已修改**筛选器来快速找到所有已修改的设置。

1. 你可以使用设置编辑器中的选项卡在**用户**设置和**工作区**设置之间切换。

    用户设置适用于所有工作区。工作区设置仅适用于当前工作区。工作区设置会覆盖用户设置。获取有关 [VS Code 中的设置](/docs/configure/settings.md)的更多信息。

## 使用源代码管理

Visual Studio Code 具有集成的源代码管理（SCM）功能，并内置了对 [Git](https://git-scm.com/) 的支持。

让我们使用内置的 Git 支持来提交之前所做的更改。

1. 在活动栏中选择**源代码管理**视图以打开源代码管理视图。

    ![Screenshot that shows the Source Control view, highlighting the button in the Activity Bar.](images/getting-started/source-control-view.png)

1. 确保你的计算机上安装了 [Git](https://git-scm.com/)。如果没有安装 Git，你将在源代码管理视图中看到一个用于在你的计算机上安装它的按钮。

1. 选择**初始化存储库**以为你的工作区创建一个新的 Git 存储库。

    ![Screenshot that shows the Source Control view, highlighting the Initialize Repository button.](images/getting-started/source-control-initialize.png)

    初始化存储库后，源代码管理视图会显示你在工作区中所做的更改。

1. 你可以通过将鼠标悬停在文件上并选择文件旁边的 `+` 来暂存单个更改。

    ![Screenshot that shows the Source Control view with changes in the workspace.](images/getting-started/source-control-changes.png)

    > [!TIP]
    > 要暂存所有更改，请将鼠标悬停在**更改**上并选择**暂存所有更改**按钮。

1. 输入提交消息，例如 `Add recipe list app`，然后选择**提交**以将更改提交到 Git 存储库。

    ![Screenshot that shows the Source Control view with a commit message.](images/getting-started/source-control-commit.png)

    > [!TIP]
    > 在源代码管理视图中选择**图形**以显示 Git 存储库提交历史的可视化表示。

关于 VS Code 中的源代码管理，还有很多值得探索的内容。获取有关 [VS Code 中的源代码管理](/docs/sourcecontrol/overview.md)的更多信息。

## 运行和调试代码

VS Code 内置了对运行和调试 JavaScript 和 Node.js 应用程序的支持。让我们使用调试器逐步调试代理生成的食谱列表应用。

> [!NOTE]
> 由于代理动态生成代码，你项目中的文件名和函数名可能与这里展示的示例不同。请在你自己的生成代码中寻找类似的模式。

1. 打开代理为你的食谱列表应用创建的 JavaScript 文件（例如，`app.js` 或 `script.js`）。

1. 找到处理添加食谱的函数（例如，`addRecipe`）。将光标放在函数体内的第一行，然后按下 `kbstyle(F9)` 设置断点。

    编辑器左侧边距中出现一个红点，表示已设置断点。通过断点，你可以在程序的特定代码行处暂停执行。

    ![Screenshot that shows a breakpoint set in the addRecipe function in the JavaScript file.](images/getting-started/js-set-breakpoint.png)

1. 在活动栏中打开"运行和调试"视图，选择**调试 URL**，然后输入你的食谱列表应用预览的 URL（例如，`http://localhost:3000`）。

    ![Screenshot that shows the Debug URL configuration in the Run and Debug view.](images/getting-started/debug-url.png)

    调试器启动并打开一个包含你应用的浏览器窗口。

1. 当断点被命中时，执行暂停，VS Code 高亮显示当前行。

    ![Screenshot that shows the program stopped at a breakpoint in the editor, highlighting the Variables view to inspect variables.](images/getting-started/vscode-debugging.png)

    > [!TIP]
    > 在暂停执行时，将鼠标悬停在编辑器中的变量上可以查看它们的值。你可以在**运行和调试**视图中的**变量**视图中随时查看所有变量。

1. 使用调试工具栏逐步执行代码。按**逐过程**（`kbstyle(F10)`）执行当前行并移动到下一行，或按**继续**（`kbstyle(F5)`）恢复执行。

    ![Screenshot that shows the Debug toolbar with the Continue button highlighted.](images/getting-started/debug-toolbar-play.png)

VS Code 中还有更多调试功能，例如监视变量、条件断点和启动配置。深入了解 [VS Code 中的调试](/docs/debugtest/debugging.md)的详细信息。

## 后续步骤

恭喜！你已完成本教程，并探索了 Visual Studio Code 的一些关键功能。既然你已经学习了 Visual Studio Code 的基础知识，请获取更多关于以下内容的信息：

* [使用 AI 构建你的第一个应用](/docs/getstarted/getting-started.md)

* [探索不同的代理类型](/docs/agents/agents-tutorial.md)

* [发现并运行代码的单元测试](/docs/debugtest/testing.md)

* [使用集成终端](/docs/terminal/getting-started.md)

* [设置远程开发环境](/docs/remote/remote-overview.md)
