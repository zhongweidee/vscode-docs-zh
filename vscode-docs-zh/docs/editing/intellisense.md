---
ContentId: 80f4fa1e-d4c5-42cf-8b12-4b8e88c41c3e
DateApproved: 6/10/2026
MetaDescription: 了解 Visual Studio Code IntelliSense（智能代码补全）。
---
# IntelliSense

IntelliSense 是各种代码编辑功能的总称，包括：代码补全、参数信息、快速信息和成员列表。IntelliSense 功能有时也被称为其他名称，如"代码补全"、"内容辅助"和"代码提示"。

<video src="images/intellisense/intellisense.mp4" title="Video that shows IntelliSense in action. When typing 'app' for an Express app, suggestions are shown, such as '_router'." autoplay loop controls muted></video>

## 编程语言的 IntelliSense

Visual Studio Code 为 JavaScript、TypeScript、JSON、HTML、CSS、SCSS 和 Less 开箱即用地提供了 IntelliSense。VS Code 支持任何编程语言的基于单词的补全，但也可以通过安装语言扩展来配置更丰富的 IntelliSense。

以下是 [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode) 中最受欢迎的语言扩展。选择下方的扩展磁贴以阅读描述和评论，从而决定哪个扩展最适合你。

<div class="marketplace-extensions-languages-curated"></div>

## IntelliSense 功能

VS Code IntelliSense 功能由语言服务提供支持。语言服务基于语言语义和对源代码的分析提供智能代码补全。如果语言服务知道可能的补全项，IntelliSense 建议就会在你键入时弹出。如果你继续键入字符，成员列表（变量、方法等）将被筛选，仅包含含有你所键入字符的成员。按 `kbstyle(Tab)` 或 `kbstyle(Enter)` 将插入所选成员。

你可以在任何编辑器窗口中通过键入 `kb(editor.action.triggerSuggest)` 或键入触发字符（例如 JavaScript 中的点字符（`kbstyle(.)`））来触发 IntelliSense。

<video src="images/intellisense/intellisense_packagejson.mp4" title="Video that shows IntelliSense triggered with 'Ctrl+Space' in a 'package.json' file." autoplay loop controls muted></video>

> [!TIP]
> 建议控件支持驼峰式筛选，这意味着你可以键入方法名称中的大写字母来限制建议。例如，"cra" 会显示 "createApplication"。

如果你愿意，可以在键入时关闭 IntelliSense。请参阅[自定义 IntelliSense](#自定义-intellisense)，了解如何禁用或自定义 VS Code 的 IntelliSense 功能。

通过语言服务提供，你可以按 `kb(toggleSuggestionDetails)` 或选择 `>` 图标来查看每个方法的**快速信息**。该方法的随附文档将展开到旁边。展开的文档保持可用，并会随着你浏览列表而更新。你可以通过再次按 `kb(toggleSuggestionDetails)` 或选择关闭图标来关闭它。

<video src="images/intellisense/intellisense_docs.mp4" title="Video that shows quick info for suggestions." autoplay loop controls muted></video>

选择方法后，系统会提供**参数信息**。

![parameter info](images/intellisense/paramater_info.png)

在适用的情况下，语言服务会在快速信息和方法签名中显示底层类型。在上面的截图中，你可以看到几个 `any` 类型。因为 JavaScript 是动态的，不需要也不强制类型，`any` 表示变量可以是任何类型。

## 补全类型

以下截图中的 JavaScript 代码展示了 IntelliSense 补全。IntelliSense 同时提供了推断建议和项目的全局标识符。推断符号首先显示，然后是全局标识符（由 `abc` 词图标表示）。

![intellisense icons](images/intellisense/intellisense_icons.png)

VS Code IntelliSense 提供不同类型的补全，包括语言服务器建议、代码片段和简单的基于单词的文本补全。

| 图标 | 名称 | 符号类型 |
| ---- | ---- | ----------- |
| <i class="codicon codicon-symbol-method" style="color:#b180d7"></i> | 方法和函数 | `method`、`function`、`constructor`  |
| <i class="codicon codicon-symbol-variable" style="color:#75beff"></i> | 变量 | `variable` |
| <i class="codicon codicon-symbol-field" style="color:#75beff"></i> | 字段 | `field` |
| <i class="codicon codicon-symbol-parameter"></i> | 类型参数 | `typeParameter` |
| <i class="codicon codicon-symbol-constant"></i> | 常量 | `constant` |
| <i class="codicon codicon-symbol-class" style="color:#ee9d28"></i> | 类 | `class` |
| <i class="codicon codicon-symbol-interface" style="color:#75beff"></i> | 接口 | `interface` |
| <i class="codicon codicon-symbol-structure"></i> | 结构体 | `struct` |
| <i class="codicon codicon-symbol-event" style="color:#ee9d28"></i> | 事件 | `event` |
| <i class="codicon codicon-symbol-operator"></i> | 运算符 | `operator` |
| <i class="codicon codicon-symbol-namespace"></i> | 模块 | `module` |
| <i class="codicon codicon-symbol-property"></i> | 属性和特性 | `property` |
| <i class="codicon codicon-symbol-enum" style="color:#ee9d28"></i> | 枚举 | `enum` |
| <i class="codicon codicon-symbol-enum-member" style="color:#75beff"></i> | 枚举成员 | `enumMember` |
| <i class="codicon codicon-symbol-reference"></i> | 引用 | `reference` |
| <i class="codicon codicon-symbol-keyword"></i> | 关键字 | `keyword` |
| <i class="codicon codicon-symbol-file"></i> | 文件 | `file` |
| <i class="codicon codicon-symbol-folder"></i> | 文件夹 | `folder` |
| <i class="codicon codicon-symbol-color"></i> | 颜色 | `color` |
| <i class="codicon codicon-symbol-ruler"></i> | 单位 | `unit` |
| <i class="codicon codicon-symbol-snippet"></i> | 代码片段前缀 | `snippet` |
| <i class="codicon codicon-symbol-text"></i> | 单词 | `text` |

## 自定义 IntelliSense

你可以在设置和键盘快捷键中自定义你的 IntelliSense 体验。

### 设置

下面显示的设置为默认设置。你可以在[设置编辑器](/docs/configure/settings.md#settings-editor)（`kb(workbench.action.openSettings)`）中更改这些设置。

```javascript
{
    // 控制是否在键入时显示快速建议
    "editor.quickSuggestions": {
        "other": true,
        "comments": false,
        "strings": false
    },

     // 控制是否应在提交字符上接受建议。例如，在 JavaScript 中，分号（`;`）可以是一个提交字符，用于接受建议并键入该字符。
    "editor.acceptSuggestionOnCommitCharacter": true,

    // 控制是否在按 'Enter' 时接受建议——除了 'Tab' 之外。有助于避免在插入新行或接受建议之间产生歧义。值 'smart' 表示仅当 Enter 会产生文本更改时才接受建议
    "editor.acceptSuggestionOnEnter": "on",

    // 控制快速建议显示前的延迟时间（毫秒）。
    "editor.quickSuggestionsDelay": 10,

    // 控制键入触发字符时是否自动显示建议
    "editor.suggestOnTriggerCharacters": true,

    // 控制按 Tab 键是否插入最佳建议，以及 Tab 键是否循环浏览其他建议
    "editor.tabCompletion": "off",

    // 控制排序是否优先考虑靠近光标出现的单词
    "editor.suggest.localityBonus": true,

    // 控制显示建议列表时如何预选建议
    "editor.suggestSelection": "first",

    // 启用基于单词的建议
    "editor.wordBasedSuggestions": "matchingDocuments",

    // 启用参数提示
    "editor.parameterHints.enabled": true,
}
```

### Tab 补全

编辑器支持 _Tab 补全_，在按 `kb(insertBestCompletion)` 时插入最佳匹配的补全。无论建议控件是否显示，这都可以工作。此外，在插入建议后按 `kb(insertNextSuggestion)` 会插入下一个最佳建议。

<video src="images/intellisense/tabCompletion.mp4" title="Video that shows toggling between suggestions with the Tab key." autoplay loop controls muted></video>

默认情况下，Tab 补全是禁用的。使用 `setting(editor.tabCompletion)` 设置来启用它。存在以下值：

* `off` -（默认）Tab 补全已禁用。
* `on` - 为所有建议启用 Tab 补全，重复调用会插入下一个最佳建议。
* `onlySnippets` - Tab 补全仅插入与当前行前缀匹配的静态代码片段。

### 位置加分

建议的排序取决于扩展信息以及它们与当前正在键入的单词的匹配程度。此外，你可以使用 `setting(editor.suggest.localityBonus)` 设置，让编辑器提升靠近光标位置出现的建议的优先级。

![Sorted By Locality](images/intellisense/localitybonus.png)

在上面的截图中，你可以看到 `count`、`context` 和 `colocated` 是根据它们出现的作用域（循环、函数、文件）进行排序的。

### 建议选择

默认情况下，VS Code 会预选建议列表中的第一个建议。如果你想要不同的行为，例如始终选择建议列表中最近使用的项目，可以使用 `setting(editor.suggestSelection)` 设置。

可用的 `setting(editor.suggestSelection)` 值包括：

* `first` -（默认）始终选择列表顶部的项目。
* `recentlyUsed` - 选择之前使用的项目，除非前缀（输入以选择）选择了不同的项目。
* `recentlyUsedByPrefix` - 基于之前完成过这些建议的前缀来选择项目。

选择最近使用的项目非常有用，因为你可以快速多次插入相同的补全。

"输入以选择"意味着使用当前前缀（大致为光标左侧的文本）来筛选和排序建议。当这种情况发生且其结果与 `recentlyUsed` 的结果不同时，它将优先使用。

使用最后一个选项 `recentlyUsedByPrefix` 时，VS Code 会记住为特定前缀（部分文本）选择了哪个项目。例如，如果你键入 `co` 然后选择了 `console`，下次键入 `co` 时，建议 `console` 将被预选。这让你可以快速将各种前缀映射到不同的建议，例如 `co` -> `console` 和 `con` -> `const`。

### 建议中的代码片段

默认情况下，VS Code 在同一个控件中显示代码片段和补全建议。你可以使用 `setting(editor.snippetSuggestions)` 设置来修改此行为。要从建议控件中移除代码片段，请将值设置为 `"none"`。如果你想看到代码片段，可以指定相对于建议的顺序；在顶部（`"top"`）、在底部（`"bottom"`），或按字母顺序内联排列（`"inline"`）。默认值为 `"inline"`。

### 键盘快捷键

这里显示的键盘快捷键是默认的键盘快捷键。要分配不同的键盘快捷键，请使用[键盘快捷键编辑器](/docs/configure/keybindings.md)（`kb(workbench.action.openGlobalKeybindings)`）。

| 命令 | 按键绑定 |
| --- | --- |
| `editor.action.triggerSuggest` | `kb(editor.action.triggerSuggest)` |
| `toggleSuggestionDetails` | `kb(toggleSuggestionDetails)` |
| `toggleSuggestionFocus` | `kb(toggleSuggestionFocus)` |

> [!TIP]
> 还有更多与 IntelliSense 相关的键盘快捷键。打开**默认键盘快捷键**（**文件** > **首选项** > **键盘快捷方式**），搜索 "suggest"。

## 使用 AI 增强补全

GitHub Copilot 在你于编辑器中键入时提供编码建议。你还可以向 Copilot 询问与编码相关的问题，例如如何最好地编写某些代码、如何修复 bug，或他人的代码是如何工作的。

要开始使用：

1. 安装 [GitHub Copilot 扩展](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)。

1. 通过我们的 [Copilot 快速入门](/docs/getstarted/getting-started.md)发现关键功能。

> [!TIP]
> 如果你还没有 Copilot 订阅，可以通过注册 [Copilot 免费计划](https://github.com/github-copilot/signup)免费使用 Copilot，并获得每月的内联建议和 AI 额度。

## 故障排除

如果你发现 IntelliSense 停止工作，语言服务可能没有运行。尝试重启 VS Code，这应该可以解决问题。如果安装语言扩展后仍然缺少 IntelliSense 功能，请在语言扩展的仓库中提交问题。

> [!NOTE]
> 在非常大的工作区中，出于性能原因，IntelliSense 功能可能会部分禁用。
> 如果发生这种情况，请尝试使用 `setting(files.exclude)` 或
> `setting(search.exclude)` 设置排除大型文件夹（例如
> `node_modules` 或构建输出目录）。

> [!TIP]
> 有关配置和故障排除 JavaScript IntelliSense，请参阅 [JavaScript 文档](/docs/languages/javascript.md#intellisense)。

特定的语言扩展可能不支持所有 VS Code IntelliSense 功能。请查看扩展的 README 以了解支持的功能。如果你认为语言扩展存在问题，通常可以通过 [VS Code Marketplace](https://marketplace.visualstudio.com/vscode) 找到扩展的问题仓库。导航到扩展的详情页面，然后选择**支持**链接。

## 后续步骤

IntelliSense 只是 VS Code 强大功能之一。继续阅读以了解更多：

* [调试](/docs/debugtest/debugging.md) - 了解如何为你的应用程序设置调试。
* [创建语言扩展](/api/language-extensions/programmatic-language-features.md) - 了解如何创建为新的编程语言添加 IntelliSense 的扩展。
* [VS Code 中的 GitHub Copilot](/docs/agent-native/overview.md) - 了解如何使用 GitHub Copilot 的 AI 来增强你的编码体验。

## 常见问题

### 为什么我得不到任何建议？

这可能是由多种原因造成的。首先，尝试重启 VS Code。如果问题仍然存在，请查阅语言扩展的文档。对于 JavaScript 特定的故障排除，请参阅 [JavaScript 语言主题](/docs/languages/javascript.md#intellisense)。

### 为什么我看不到方法和变量建议？

![image of IntelliSense showing no useful suggestions](images/intellisense/missing_typings.png)

此问题是由于 JavaScript 中缺少类型声明（typings）文件造成的。大多数常见的 JavaScript 库都附带声明文件或有类型声明文件可用。

请确保为你正在使用的库安装相应的 npm 或 yarn 包。在[使用 JavaScript](/docs/nodejs/working-with-javascript.md#intellisense) 文章中了解更多关于 IntelliSense 的信息。对于其他语言，请查阅扩展的文档。
