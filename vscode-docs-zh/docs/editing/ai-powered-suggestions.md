---
ContentId: 7ab2cd6c-45fd-4278-a6e8-1c9e060593ea
DateApproved: 6/10/2026
MetaDescription: 在 VS Code 中获取来自 GitHub Copilot 的 AI 驱动的内联建议，包括幽灵文本补全和下一编辑建议。
MetaSocialImage: images/shared/github-copilot-social.png
Keywords: [nes, 建议, 内联补全, 幽灵文本, 下一编辑建议]
---
# VS Code 中来自 GitHub Copilot 的内联建议

VS Code 中的 GitHub Copilot 提供 AI 驱动的内联建议，在你输入时自动补全代码、注释、测试等内容。内联建议适用于广泛的编程语言和框架。它们是 VS Code 中多种 AI 交互界面之一，此外还有用于自主多文件任务的[代理](/docs/agents/overview.md)、[聊天](/docs/chat/chat-overview.md)和[智能操作](/docs/editing/copilot-smart-actions.md)。

你可能会体验来自 Copilot 的两种内联建议，它们都会匹配你的编码风格并考虑你现有的代码：

* **幽灵文本建议**：在编辑器中开始输入，Copilot 会在你当前光标位置提供淡色的*幽灵文本*建议。

* **下一编辑建议**：通过 Copilot 下一编辑建议（即 Copilot NES）预测你的下一次代码编辑。基于你正在进行的编辑，NES 会预测你下一步想要编辑的位置以及该编辑应该是什么内容。

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="开始使用 AI">
跟随动手教程，在 VS Code 中使用 AI 构建你的第一个应用。

* [开始教程](/docs/getstarted/getting-started.md)

</div>

## 先决条件

* 在你的计算机上安装 Visual Studio Code。按照以下步骤[设置 VS Code](/docs/getstarted/overview.md)。
* 拥有 GitHub Copilot 订阅访问权限。按照以下步骤[设置 GitHub Copilot](/docs/agents/overview.md#get-started)。你可以设置 Copilot Free 来获取每月内联建议和 AI 积分额度。

## 幽灵文本建议

### 获取你的第一份建议

当你输入时，Copilot 会提供淡色的*幽灵文本*建议：有时是当前行的补全，有时是全新的一段代码块。

1. 打开一个你选择的编程语言文件并开始输入。你应该会在输入时看到来自 Copilot 的内联建议。

    以下示例展示了 Copilot 如何使用淡色*幽灵文本*为 `calculateDaysBetweenDates` JavaScript 函数建议实现：

    ![JavaScript 幽灵文本建议。](images/inline-suggestions/js-suggest.png)

1. 按 `kbstyle(Tab)` 键接受建议。

    要部分接受建议，可以使用 `kb(editor.action.inlineSuggest.acceptNextWord)` 键盘快捷键来接受建议的下一个词或下一行。

### 替代建议

对于任何给定的输入，Copilot 可能会提供多个替代建议。你可以将鼠标悬停在建议上查看其他建议。

![将鼠标悬停在内联建议上可以选择多个建议](images/inline-suggestions/copilot-hover-highlight.png)

### 从代码注释生成建议

除了依赖 Copilot 提供建议之外，你还可以通过代码注释来提示你期望的代码内容。例如，你可以指定要使用的算法类型或概念（例如，"使用递归"或"使用单例模式"），或者要添加到类中的方法和属性。

以下示例展示了如何指示 Copilot 在 TypeScript 中创建一个表示学生的类，并提供有关方法和属性的信息：

![使用代码注释让 Copilot 生成带有属性和方法的 TypeScript Student 类。](images/inline-suggestions/ts-suggest-code-comment.png)

## 下一编辑建议

幽灵文本建议在自动补全一段代码方面表现出色。但由于大多数编码活动都是在编辑现有代码，因此内联建议自然演进为也能帮助进行编辑——无论是在光标处还是更远的位置。编辑通常不是单独进行的——在不同场景下需要进行的编辑存在逻辑流程。下一编辑建议（Copilot NES）正是这种演进。

<video src="./images/inline-suggestions/nes-video.mp4" title="Video showing next edit suggestions in action on a Point typescript class." loop controls muted poster="./images/inline-suggestions/point3d.png"></video>

基于你正在进行的编辑，下一编辑建议会预测你下一步想要编辑的位置以及该编辑应该是什么内容。Copilot NES 帮助你保持工作流畅，建议与你当前工作相关的未来更改，你可以按 `kbstyle(Tab)` 快速导航并接受 Copilot 的建议。建议可能涵盖单个符号、整行或多行，具体取决于潜在更改的范围。

要开始使用 Copilot NES，请启用 VS Code 设置 `setting(github.copilot.nextEditSuggestions.enabled)`。

### 导航并接受编辑建议

你可以使用 `kbstyle(Tab)` 键快速导航到建议的代码更改，从而节省寻找下一个相关编辑的时间（无需手动搜索文件或引用）。然后你可以再次按 `kbstyle(Tab)` 键接受建议。

装订线中的箭头指示是否有可用的编辑建议。箭头显示下一个编辑建议相对于你当前光标位置的位置。

你可以将鼠标悬停在箭头上以展开编辑建议菜单，其中包含键盘快捷键和设置配置：

![Copilot NES 装订线菜单已展开](./images/inline-suggestions/gutter-menu-highlighted-updated.png)

> [!IMPORTANT]
> 如果你使用的是 [VS Code vim 扩展](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)，请使用该扩展的最新版本，以避免与 NES 的键绑定产生冲突。

### 减少编辑建议的干扰

默认情况下，编辑建议由装订线箭头指示，代码更改显示在编辑器中。启用 `setting(editor.inlineSuggest.edits.showCollapsed)` 设置后，代码更改仅在编辑器中显示，直到你按 `kbstyle(Tab)` 键导航到建议或将鼠标悬停在装订线箭头上。或者，将鼠标悬停在装订线箭头上并从菜单中选择**显示折叠**选项。

### 下一编辑建议的使用案例

**发现并纠正错误**

* **Copilot 可以帮助处理简单的拼写错误。** 它会建议修复字母缺失或错位的情况，例如 `cont x = 5` 或 `conts x = 5`，它们本应是 `const x = 5`。

    ![NES 将 "conts" 拼写错误修复为 "const"](./images/inline-suggestions/nes-typo.png)

* **Copilot 还可以帮助处理更具挑战性的逻辑错误**，例如反转的三元表达式：

    ![NES 修复三元逻辑错误](./images/inline-suggestions/nes-ternary-logic.png)

    或者一个本应使用 `&&` 而非 `||` 的比较：

    ![NES 修复 if 语句错误](./images/inline-suggestions/nes-de-morgan.png)

**改变意图**

* **Copilot 会建议对代码其余部分的更改以匹配新的意图变化。** 例如，当将类从 `Point` 更改为 `Point3D` 时，Copilot 会建议在类定义中添加 `z` 变量。接受更改后，Copilot NES 接下来会建议将 `z` 添加到距离计算中：

    ![NES 将 Point 更新为 Point3D 的动图](./images/inline-suggestions/nes-point.png)

**重构**

* **在文件中一次重命名变量，Copilot 会建议在其他所有地方更新它。** 如果你使用了新的名称或命名模式，Copilot 会建议在后续代码中进行类似更新。

    ![Copilot NES 在更新函数名称后建议更改](./images/inline-suggestions/nes-rename.png)

* **匹配代码风格**。在复制粘贴一些代码后，Copilot 会建议如何调整它以匹配粘贴位置当前的代码风格。

## 启用或禁用内联建议

你可以为所有语言或仅为特定语言启用或禁用内联建议。要启用或禁用内联建议，请选择状态栏中的 Copilot 菜单，然后勾选或取消勾选启用或禁用内联建议的选项。为特定语言禁用内联建议的选项取决于当前活动编辑器的语言。

![状态栏中 Copilot 菜单的屏幕截图，显示暂停和取消暂停按钮。](images/inline-suggestions/snooze-code-completions.png)

或者，在设置编辑器中修改 `setting(github.copilot.enable)` 设置。为你想要启用或禁用内联建议的每种语言添加条目。要为所有语言启用或禁用内联建议，请将 `*` 的值设置为 `true` 或 `false`。

要临时禁用编辑器中的所有内联建议，请选择状态栏中的 Copilot 菜单，然后选择**暂停**按钮以将暂停时间增加五分钟。要恢复内联建议，请在 Copilot 菜单中选择**取消暂停**按钮。

或者，使用命令面板中的**暂停内联建议**和**取消暂停内联建议**命令。

## 更改建议的 AI 模型

不同的大型语言模型（LLM）在训练时使用了不同类型的数据，可能具有不同的能力和优势。详细了解如何在 VS Code 中[选择不同的 AI 语言模型](/docs/agent-customization/language-models.md)。

要更改用于在编辑器中生成幽灵文本建议的语言模型：

1. 在 VS Code 标题栏的聊天菜单中选择**配置内联建议...**。

1. 选择**更改补全模型...**，然后从列表中选择一个模型。

> [!NOTE]
> 可用模型的列表可能会随时间变化而有所不同。当没有替代模型可用时，更改模型的选项不可用。
>
> 如果你是 Copilot Business 或 Enterprise 用户，你的管理员需要在 GitHub.com 上的 [Copilot 策略设置](https://docs.github.com/en/enterprise-cloud@latest/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization)中选择加入 `编辑器预览功能`，才能为你的组织启用某些模型。

## 技巧与窍门

### 上下文

为了给你提供相关的内联建议，Copilot 会查看编辑器中当前和打开的文件，以分析上下文并创建适当的建议。在使用 Copilot 时，在 VS Code 中打开相关文件有助于设置此上下文，并让 Copilot 对你的项目有更全面的了解。

## 设置

### 幽灵文本建议设置

* `setting(github.copilot.enable)` - 为所有语言或特定语言启用或禁用内联补全。

* `setting(editor.inlineSuggest.fontFamily)` - 配置内联补全的字体。

* `setting(editor.inlineSuggest.showToolbar)` - 启用或禁用内联补全时出现的工具栏。

* `setting(editor.inlineSuggest.syntaxHighlightingEnabled)` - 启用或禁用内联补全的语法高亮。

### 下一编辑建议设置

* `setting(github.copilot.nextEditSuggestions.enabled)` - 启用 Copilot 下一编辑建议（Copilot NES）。

* `setting(editor.inlineSuggest.edits.allowCodeShifting)` - 配置 Copilot NES 是否可以移动你的代码以显示建议。

* `setting(editor.inlineSuggest.edits.renderSideBySide)` - 配置 Copilot NES 是否可以在可能的情况下并排显示较大的建议，或者是否始终在相关代码下方显示较大的建议。

     * **auto（默认）**：如果视口中有足够的空间，则并排显示较大的编辑建议，否则建议将显示在相关代码下方。
     * **never**：从不并排显示建议，始终在相关代码下方显示建议。

* `setting(github.copilot.nextEditSuggestions.fixes)` - 启用基于诊断（波浪线）的下一编辑建议。例如，缺少导入。

* `setting(editor.inlineSuggest.minShowDelay)` - 显示内联建议前等待的时间（以毫秒为单位）。默认为 `0`。

## 后续步骤

* 在[快速入门](/docs/getstarted/getting-started.md)中探索关键功能。

* 使用 [VS Code 中的聊天](/docs/chat/chat-overview.md)进行 AI 聊天对话。

* 在 YouTube 上观看我们的 [VS Code Copilot 系列](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt)视频。
