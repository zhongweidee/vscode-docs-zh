---
ContentId: 8966BBFD-C66D-4283-9DCA-8CAC0179886E
DateApproved: 6/10/2026
MetaDescription: Visual Studio Code 是一款一流的编辑器——但它远不止于此，它还拥有 IntelliSense 和智能代码导航等功能。
---
# 代码导航

Visual Studio Code 拥有高效能的代码编辑器，结合编程语言服务，为您提供 IDE 的强大功能和文本编辑器的速度。在本主题中，我们将首先介绍 VS Code 的语言智能功能（建议、参数提示、智能代码导航），然后展示核心文本编辑器的强大之处。

## 快速文件导航

>**提示：** 您可以通过输入 `kb(workbench.action.quickOpen)`（**快速打开**）按名称打开任何文件。

资源管理器非常适合在浏览项目时在文件之间导航。但是，当您执行某项任务时，您会发现自己需要在同一组文件之间快速跳转。VS Code 提供了两个强大的命令，可通过易于使用的键盘快捷键在文件内部和文件之间导航。

按住 `kbstyle(Ctrl)` 并按下 `kbstyle(Tab)` 可查看编辑器组中所有已打开文件的列表。要打开其中一个文件，请再次使用 `kbstyle(Tab)` 选择要导航到的文件，然后松开 `kbstyle(Ctrl)` 将其打开。

![Quick Navigation](images/editingevolved/quicknav.png)

或者，您可以使用 `kb(workbench.action.navigateBack)` 和 `kb(workbench.action.navigateForward)` 在文件和编辑位置之间导航。如果您在同一文件的不同行之间跳转，这些快捷键可以让您轻松地在这些位置之间导航。

## 面包屑导航

编辑器内容上方有一个导航栏，称为[面包屑导航](https://en.wikipedia.org/wiki/Breadcrumb_(navigation))。它显示当前位置，并允许您在文件夹、文件和符号之间快速导航。

![Breadcrumbs](images/editingevolved/breadcrumbs.png)

面包屑导航始终显示文件路径，并借助语言扩展显示光标位置之前的符号路径。显示的符号与大纲视图和转到符号中的符号相同。

在路径中选择一个面包屑会显示一个包含该层级同级项的下拉菜单，以便您可以快速导航到其他文件夹和文件。

![breadcrumb folder dropdown](images/editingevolved/breadcrumb-folder-dropdown.png)

如果当前文件类型支持符号语言，您将看到当前符号路径以及同层级和下级其他符号的下拉菜单。

![breadcrumb symbol dropdown](images/editingevolved/breadcrumb-symbol-dropdown.png)

您可以通过 **视图** > **显示面包屑** 切换开关或 `setting(breadcrumbs.enabled)` [设置](/docs/configure/settings.md)来关闭面包屑导航。

### 面包屑导航自定义

可以自定义面包屑导航的外观。如果路径非常长，或者您只对文件路径或符号路径感兴趣，可以使用 `setting(breadcrumbs.filePath)` 和 `setting(breadcrumbs.symbolPath)` 设置。两者都支持 `on`、`off` 和 `last`，用于定义是否显示路径以及显示路径的哪一部分。默认情况下，面包屑导航在面包屑左侧显示文件和符号图标，但您可以将 `setting(breadcrumbs.icons)` 设置为 false 来移除图标。

### 面包屑导航中的符号排序

您可以使用 `setting(breadcrumbs.symbolSortOrder)` 设置来控制符号在面包屑下拉菜单中的排序方式。

允许的值包括：

* `position` - 按文件中的位置排序（默认）
* `name` - 按字母顺序排序
* `type` - 按符号类型排序

### 面包屑路径复制

您可以通过右键单击编辑器标签页并选择 **复制面包屑路径** 来复制完整的面包屑路径。这将把包含文件和符号名称的完整路径复制到剪贴板。

您可以使用 `setting(breadcrumbs.symbolPathSeparator)` 设置配置符号路径分隔符。默认值为 `.`。

### 面包屑键盘导航

要与面包屑导航交互，请使用 **聚焦面包屑** 命令或按下 `kb(breadcrumbs.focusAndSelect)`。它将选择最后一个元素并打开一个下拉菜单，允许您导航到同级文件或符号。使用 `kb(breadcrumbs.focusPrevious)` 和 `kb(breadcrumbs.focusNext)` 键盘快捷键可以转到当前元素之前或之后的元素。当下拉菜单出现时，开始输入——所有匹配的元素将被高亮显示，最佳匹配项将被选中以便快速导航。

您也可以在不使用下拉菜单的情况下与面包屑导航交互。按下 `kb(breadcrumbs.focus)` 聚焦最后一个元素，使用 `kb(breadcrumbs.focusPrevious)` 和 `kb(breadcrumbs.focusNext)` 进行导航，并使用 `kb(breadcrumbs.revealFocused)` 在编辑器中显示该元素。

## 转到定义

如果某种[语言](/docs/languages/overview.md)支持，您可以通过按下 `kb(editor.action.revealDefinition)` 转到符号的定义。

如果您按下 `kbstyle(Ctrl)` 并将鼠标悬停在符号上，将显示声明的预览：

![Ctrl Hover](images/editingevolved/ctrlhover.png)

> **提示：** 您可以使用 `kbstyle(Ctrl+Click)` 跳转到定义，或使用 `kbstyle(Ctrl+Alt+Click)` 在侧边打开定义。

## 转到类型定义

某些[语言](/docs/languages/overview.md)还支持通过从编辑器上下文菜单或**命令面板**运行**转到类型定义**命令来跳转到符号的类型定义。这将带您转到符号类型的定义。命令 `editor.action.goToTypeDefinition` 默认没有绑定键盘快捷键，但您可以添加自己的自定义[按键绑定](/docs/configure/keybindings.md)。

## 转到实现

[语言](/docs/languages/overview.md)还可以支持通过按下 `kb(editor.action.goToImplementation)` 跳转到符号的实现。对于接口，这会显示该接口的所有实现者；对于抽象方法，这会显示该方法的所有具体实现。

## 转到符号

您可以使用 `kb(workbench.action.gotoSymbol)` 在文件内部导航符号。通过输入 `kbstyle(:)`，符号将按类别分组。按下 `kbstyle(Up)` 或 `kbstyle(Down)` 并导航到您想要的位置。

![Go to Symbol](images/editingevolved/gotosymbol.png)

## 按名称打开符号

某些语言支持使用 `kb(workbench.action.showAllSymbols)` 跨文件跳转到符号。输入您想要导航到的类型的首字母（无论它包含在哪个文件中），然后按下 `kbstyle(Enter)`。

![Open symbol by name](images/editingevolved/symbol.png)

## 速览

我们认为，当您只想快速查看某些内容时，没有什么比大幅度的上下文切换更糟糕的了。这就是我们支持速览编辑器的原因。当您执行**转到引用**搜索（通过 `kb(editor.action.goToReferences)`）或**速览定义**（通过 `kb(editor.action.peekDefinition)`）时，我们会将结果以内联方式嵌入：

![Peek References](images/editingevolved/references.png)

您可以在速览编辑器中浏览不同的引用，并直接进行快速编辑。单击速览编辑器文件名或双击结果列表将在外部编辑器中打开引用。

> **提示：** 此外，如果您按下 `kbstyle(Escape)` 或双击速览编辑器区域，速览窗口将关闭。您可以使用 `setting(editor.stablePeek)` [设置](/docs/configure/settings.md)禁用此行为。

## 括号匹配

当光标靠近匹配的括号之一时，匹配的括号将被高亮显示。

![Bracket Matching](images/editingevolved/brackets.png)

> **提示：** 您可以使用 `kb(editor.action.jumpToBracket)` 跳转到匹配的括号

### 括号对着色

也可以通过将 `setting(editor.bracketPairColorization.enabled)` 设置为 `true` 来对匹配的括号对进行着色。

![Bracket Pair Colorization](images/editingevolved/bracket-pair-colorization-on-off.drawio.png)

所有颜色都是可主题化的，最多可以配置六种颜色。

您可以在设置中使用 `setting(workbench.colorCustomizations)` 来覆盖这些由主题提供的颜色：

```json
"workbench.colorCustomizations": {
    "editorBracketHighlight.foreground1": "#FFD700",
    "editorBracketHighlight.foreground2": "#DA70D6",
    "editorBracketHighlight.foreground3": "#179fff",
},
```

## 引用信息

某些语言（如 C#）支持内联引用信息，并且会实时更新。这使您可以快速分析编辑的影响，或特定方法或属性在整个项目中的使用热度：

![Reference information](images/editingevolved/referenceinfo.png)

> **提示：** 单击这些注释可直接调用**速览引用**操作。

> **提示：** 可以通过 `setting(editor.codeLens)` [设置](/docs/configure/settings.md)打开或关闭 CodeLens 中显示的引用信息。

## 重命名符号

某些语言支持跨文件重命名符号。按下 `kb(editor.action.rename)`，然后输入所需的新名称并按下 `kbstyle(Enter)`。该符号的所有使用处都将被跨文件重命名。

![Rename](images/editingevolved/rename.png)

## 错误和警告

警告或错误可以通过[配置的任务](/docs/debugtest/tasks.md)、丰富的语言服务或代码检查工具（linter）生成，这些工具会在后台持续分析您的代码。由于我们热衷于无缺陷的代码，警告和错误会显示在多个位置：

* 在状态栏中，有一个所有错误和警告数量的摘要。
* 您可以单击摘要或按下 `kb(workbench.actions.view.problems)` 来显示**问题**面板，其中列出所有当前的错误。
* 如果您打开一个包含错误或警告的文件，它们将以内联方式呈现并与文本和概览标尺一起显示。

![errors in problems panel](images/editingevolved/errors.png)

> **提示：** 要循环浏览当前文件中的错误或警告，您可以按下 `kb(editor.action.marker.next)` 或 `kb(editor.action.marker.prev)`，这将显示一个内联区域，详细说明问题以及可能的代码操作（如果可用）：

![Errors and Warnings Inline](images/editingevolved/errorsinline.png)

## 代码操作

警告和错误可以提供代码操作（也称为快速修复）以帮助修复问题。这些将作为灯泡图标显示在编辑器的左边距中。单击灯泡图标将显示代码操作选项或执行该操作。

## 内联提示

某些语言提供内联提示：即以内联方式呈现的关于源代码的附加信息。这通常用于显示推断的类型。下面的示例显示了内联提示，这些提示显示了 JavaScript 变量和函数返回类型的推断类型。

![Inlay hints for inferred types in TypeScript](images/editingevolved/inlay-hints.png)

内联提示可以通过 `setting(editor.inlayHints.enabled)` 设置启用/禁用，默认情况下是启用的。需要扩展（如 TypeScript 或 Rust）来提供实际的内联提示信息。

## 外部链接保护

为了您的安全，VS Code 在从编辑器打开外部网站链接之前会显示提示。

![Outgoing link prompt](images/editingevolved/outgoing-link-prompt.png)

您可以在浏览器中继续访问外部网站，或者选择复制链接或取消请求。如果您选择**配置受信任的域**，会出现一个下拉菜单，让您可以信任确切的 URL、信任 URL 域及其子域，或信任所有域以禁用外部链接保护。

![Configure Trusted Domains dropdown](images/editingevolved/trusted-domain-dropdown.png)

**管理受信任的域**选项也可随时从命令面板中使用，它会打开**受信任的域** JSON 文件，您可以在其中添加、删除或修改受信任的域。

```jsonc
// 您可以使用"管理受信任的域"命令打开此文件。
// 保存此文件以应用受信任的域规则。
[
  "*.twitter.com"
]
```

**受信任的域** JSON 文件还包含注释，其中包含支持的域格式示例以及默认受信任的域列表，例如 `https://*.visualstudio.com` 和 `https://*.microsoft.com`。

## 后续步骤

现在您已经了解了编辑器的工作原理，是时候尝试其他一些功能了……

* [介绍视频 - 代码编辑](/docs/introvideos/codeediting.md) - 观看关于代码编辑功能的介绍视频。
* [用户界面](/docs/editing/userinterface.md) - 以防您错过了 VS Code 的基本导航。
* [按键绑定](/docs/configure/keybindings.md) - 了解如何根据自己的喜好修改键盘快捷键。
* [调试](/docs/debugtest/debugging.md) - 这是 VS Code 真正出彩的地方。

## 常见问题

### 如何自动选择快速打开中的第二个条目而不是第一个？

通过命令 `workbench.action.quickOpenPreviousEditor`，您可以在快速打开中自动选择第二个条目。当您想从列表中选择上一个条目而无需调用其他键盘快捷键时，这会很有用：

```json
[
    {
        "key": "ctrl+p",
        "command": "workbench.action.quickOpenPreviousEditor"
    },
    {
        "key": "ctrl+p",
        "command": "-workbench.action.quickOpen"
    }
]
```

### 如何配置 Ctrl+Tab 以在所有组的编辑器之间导航

默认情况下，`kbstyle(Ctrl+Tab)` 在同一编辑器组的编辑器之间导航。如果您想在所有组中所有已打开的编辑器之间导航，可以为 `workbench.action.quickOpenPreviousRecentlyUsedEditor` 和 `workbench.action.quickOpenLeastRecentlyUsedEditor` 命令创建键盘快捷键：

```json
[
    {
        "key": "ctrl+tab",
        "command": "workbench.action.quickOpenPreviousRecentlyUsedEditor",
        "when": "!inEditorsPicker"
    },
    {
        "key": "ctrl+shift+tab",
        "command": "workbench.action.quickOpenLeastRecentlyUsedEditor",
        "when": "!inEditorsPicker"
    }
]
```

### 如何在不使用选择器的情况下在最近使用的编辑器之间导航

以下是可以用来在编辑器中导航而无需打开选择器的命令列表：

键|命令|命令 ID
---|-------|----------
`kb(workbench.action.openNextRecentlyUsedEditor)`|打开下一个最近使用的编辑器|`workbench.action.openNextRecentlyUsedEditor`
`kb(workbench.action.openPreviousRecentlyUsedEditor)`|打开上一个最近使用的编辑器|`workbench.action.openPreviousRecentlyUsedEditor`
`kb(workbench.action.openNextRecentlyUsedEditorInGroup)`|打开组中下一个最近使用的编辑器|`workbench.action.openNextRecentlyUsedEditorInGroup`
`kb(workbench.action.openPreviousRecentlyUsedEditorInGroup)`|打开组中上一个最近使用的编辑器|`workbench.action.openPreviousRecentlyUsedEditorInGroup`
