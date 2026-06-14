---
ContentId: ee9b8bb7-0e8a-478d-842b-f9691f25e820
DateApproved: 6/10/2026
MetaDescription: 了解如何使用主题、图标、键盘快捷键、显示语言和设置来个性化定制 VS Code。
---
# 个性化定制 VS Code

VS Code 具有高度可定制性。你可以通过颜色和图标主题来更改编辑器的外观，并分配你最熟悉的键盘快捷键。通过设置，你可以配置 VS Code 编辑器、用户界面和功能行为的几乎所有方面。

本文涵盖以下主题：

* [配置设置](#configure-settings)
* [更改默认键盘快捷键](#change-default-keyboard-shortcuts)
* [使用主题更改 VS Code 的外观](#change-the-look-of-vs-code-with-themes)
* [更改显示语言](#change-the-display-language)

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="开始使用 AI">
跟随动手教程，在 VS Code 中使用 AI 构建你的第一个应用。

* [开始教程](/docs/getstarted/getting-started.md)

</div>

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="观看介绍视频">
在我们的介绍视频中了解 Visual Studio Code 的关键功能。

* [观看视频](https://www.youtube.com/watch?v=f8_uF_IDV50)

</div>

## 配置设置

VS Code 的几乎所有方面都可以通过设置进行自定义。设置可以让你配置编辑器选项，例如启用自动换行或显示缩略图、设置语言特定的调试器设置、启用工作区信任等。当你从 Visual Studio Marketplace 安装扩展时，它们可能会添加自己的[扩展设置](/docs/configure/extensions/extensions.md#open-extension-settings)。

设置编辑器（`kb(workbench.action.openSettings)`）提供了一个图形界面来修改设置。当你修改设置时，VS Code 会将其存储在 `settings.json` 文件中。你也可以选择直接编辑 `settings.json` 文件。

![显示设置编辑器的截图，设置按 'wordwrap' 进行了过滤。](images/personalize-vscode/settings-search.png)

VS Code 提供两种类型的设置。_用户设置_ 全局应用于任何 VS Code 实例，而 _工作区设置_ 随你的项目一起存储，仅应用于该项目。在设置编辑器中，你可以使用相应的选项卡在用户设置和工作区设置之间切换。

要在 VS Code 中使用设置编辑器修改设置：

1. 通过 **文件** > **首选项** > **设置** 菜单打开设置编辑器，或按 `kb(workbench.action.openSettings)`。

1. 使用树状视图或在搜索栏中输入内容来搜索你想要更改的设置。

1. 在设置编辑器中修改设置。

    > [!TIP]
    > 要显示已修改的设置，请在设置编辑器搜索栏中选择 **已修改** 过滤器值。

## 欢迎页面

默认情况下，VS Code 启动时会显示一个欢迎页面。欢迎页面提供了对常见任务的快速访问，例如打开最近的项目、克隆仓库和安装扩展。

你可以自定义 VS Code 启动时显示的内容。如果你经常使用代理会话，可以将 `setting(workbench.startupEditor)` 设置设为 `agentSessionsWelcomePage`，以显示一个包含最近会话、嵌入式聊天和快速操作的欢迎页面。详细了解 [代理会话欢迎页面](/docs/chat/chat-sessions.md#vs-code-welcome-page)。

获取更多有关[在 VS Code 中配置设置](/docs/configure/settings.md)的详细信息，例如配置语言特定的设置或跨机器同步设置。

## 更改默认键盘快捷键

VS Code 允许你直接从键盘执行大多数任务。当你安装 VS Code 时，它附带了一组[默认键盘快捷键](/docs/reference/default-keybindings.md)。将鼠标悬停在 VS Code 界面的 UI 元素上，可以查看其键盘快捷键（如果有的话）。命令面板也会显示具有快捷键的命令的键盘快捷键。

你可以使用键盘快捷方式编辑器（`kb(workbench.action.openGlobalKeybindings)`）来自定义这些默认快捷键，或为你喜欢的命令和操作添加新的快捷键。

![展示如何打开键盘快捷方式编辑器、搜索命令和修改快捷键的视频。](images/personalize-vscode/keyboard-shortcuts.gif)

要在 VS Code 中使用键盘快捷方式编辑器更改键盘快捷键：

1. 选择 **文件** > **首选项** > **键盘快捷方式**，或使用 `kb(workbench.action.openGlobalKeybindings)` 快捷键打开键盘快捷方式编辑器。
1. 选择要更改的命令旁边的铅笔图标。
1. 按下你想要分配给该命令作为快捷键的按键。

_键映射扩展_ 允许你将 VS Code 的快捷键修改为与你偏好的编辑器一致。从命令面板中选择 **首选项：键映射** 命令，以查看可用的键映射扩展列表。

获取更多有关[在 VS Code 中配置键盘快捷键](/docs/configure/keybindings.md)的详细信息，例如指定键盘规则或运行多个命令。

## 使用主题更改 VS Code 的外观

主题允许你修改 VS Code 的外观以符合你的偏好。VS Code 附带了多个内置主题。你也可以从 [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode) 安装更多主题。

_颜色主题_ 允许你修改 Visual Studio Code 用户界面中的颜色，以匹配你的偏好和工作环境。主题会影响 VS Code 用户界面元素和编辑器的高亮颜色。VS Code 支持浅色和深色颜色主题，以适应不同的光线环境和个人喜好。

![展示如何从命令面板预览颜色主题的视频。](images/personalize-vscode/themes_hero.gif)

要在 VS Code 中更改颜色主题：

1. 打开命令面板（`kb(workbench.action.showCommands)`）。
1. 输入 _color_，然后选择 **首选项：颜色主题**。
1. 使用 `kbstyle(Up)` 和 `kbstyle(Down)` 键预览颜色主题，使用 `kbstyle(Enter)` 键选择一个主题。
1. 或者，选择 **浏览其他颜色主题** 以在 [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode) 中浏览更多颜色主题。

VS Code 中还有更多主题选项可用，例如文件图标主题或创建你自己的主题。获取更多有关 [VS Code 中的主题](/docs/configure/themes.md)的详细信息。

## 更改显示语言

Visual Studio Code 默认以英语作为显示语言发布。你可以通过从 [Visual Studio Marketplace](https://marketplace.visualstudio.com/search?target=VSCode&category=Language%20Packs&sortBy=Installs) 安装语言包扩展来更改显示语言。

VS Code 会检测操作系统的 UI 语言，并提示你安装相应的语言包（如果在 Marketplace 上可用）。

要更改当前显示语言：

1. 打开命令面板（`kb(workbench.action.showCommands)`）。
1. 选择 **配置显示语言** 命令。
1. 从列表中选择你偏好的语言。
1. 在提示时重启 VS Code。

获取更多有关[更改 VS Code 显示语言](/docs/configure/locales.md)的详细信息。

## 后续步骤

在个性化定制 VS Code 之后，你可以：

* [通过快速入门探索 VS Code 的关键功能](/docs/editing/getting-started.md)
* [安装扩展以为你的编程语言添加功能](/docs/configure/extensions/extensions.md)
* [使用 Git 设置版本控制](/docs/sourcecontrol/overview.md)
* [为你的项目配置调试](/docs/debugtest/debugging.md)
