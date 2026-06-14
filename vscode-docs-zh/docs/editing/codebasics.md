---
ContentId: DE4EAE2F-4542-4363-BB74-BE47D64141E6
DateApproved: 6/10/2026
MetaDescription: 了解 Visual Studio Code 的基本编辑功能。搜索、多重选择、代码格式化。
MetaSocialImage: images/codebasics/code-basics-social.png
---
# 基本编辑

Visual Studio Code 首先是一个编辑器，它包含了高效编辑源代码所需的功能。本主题将带你了解编辑器的基础知识，帮助你快速上手编写代码。

## 键盘快捷键

在编写代码时，能够保持双手不离开键盘对于高效工作至关重要。VS Code 拥有一套丰富的默认键盘快捷键，同时也允许你自定义它们。

* [键盘快捷键参考](/docs/configure/keybindings.md#keyboard-shortcuts-reference)——下载参考表，学习最常用和最受欢迎的键盘快捷键。
* [安装按键映射扩展](/docs/configure/keybindings.md#keymap-extensions)——通过安装按键映射扩展，在 VS Code 中使用你旧编辑器（如 Sublime Text、Atom 和 Vim）的键盘快捷键。
* [自定义键盘快捷键](/docs/configure/keybindings.md#keyboard-shortcuts-editor)——更改默认键盘快捷键以适应你的风格。

## 多重选择（多光标）

VS Code 支持多个光标以实现快速、同步的编辑。你可以使用 `kbstyle(Alt+Click)` 添加辅助光标（渲染更细）。每个光标根据其所在的上下文独立运作。添加更多光标的常用方法是使用 `kb(editor.action.insertCursorBelow)` 或 `kb(editor.action.insertCursorAbove)`，分别在下方或上方插入光标。

> [!NOTE]
> 你的显卡驱动程序（例如 NVIDIA）可能会覆盖这些默认快捷键。

![Multi-cursor](images/codebasics/multicursor.gif)

`kb(editor.action.addSelectionToNextFindMatch)` 会选择光标所在处的单词，或者当前选择内容的下一个匹配项。

>[!TIP]
> 你可以在使用多光标查找时跳过下一个匹配项，方法是执行
> `kb(editor.action.moveSelectionToNextFindMatch)`。这有助于你在编辑重复文本时避免添加不需要的选择。

![Multi-cursor-next-word](images/codebasics/multicursor-word.gif)

> [!TIP]
> 你还可以使用 `kb(editor.action.selectHighlights)` 添加更多光标，它将在当前选中文本的每个匹配项处添加一个选择。

### 多光标修饰键

如果你想将应用多光标的修饰键更改为 macOS 上的 `kbstyle(Cmd+Click)` 以及 Windows 和 Linux 上的 `kbstyle(Ctrl+Click)`，可以通过 `setting(editor.multiCursorModifier)` [设置](/docs/configure/settings.md)来实现。这样，来自其他编辑器（如 Sublime Text 或 Atom）的用户可以继续使用他们熟悉的键盘修饰键。

该设置可设置为：

* `ctrlCmd`——在 Windows 上映射到 `kbstyle(Ctrl)`，在 macOS 上映射到 `kbstyle(Cmd)`。
* `alt`——现有的默认值 `kbstyle(Alt)`。

还有一个菜单项 **选择** > **切换为 Ctrl+Click 进行多光标编辑** 或 **选择** > **切换为 Alt+Click 进行多光标编辑**，用于快速切换此设置。

**转到定义** 和 **打开链接** 手势也会遵循此设置并进行调整，以避免冲突。例如，当设置值为 `ctrlCmd` 时，可以使用 `kbstyle(Ctrl/Cmd+Click)` 添加多个光标，而打开链接或转到定义可以通过 `kbstyle(Alt+Click)` 调用。

### 缩小/扩展选择

快速缩小或扩展当前选择。使用 `kb(editor.action.smartSelect.shrink)` 和 `kb(editor.action.smartSelect.expand)` 触发。

以下是一个使用 `kb(editor.action.smartSelect.expand)` 扩展选择的示例：

![Expand selection](images/codebasics/expandselection.gif)

## 列（框）选择

将光标放在一个角，然后按住 `kbstyle(Shift+Alt)` 并拖动到对角：

![Column text selection](images/codebasics/column-select.gif)

> [!NOTE]
> 当使用 `kbstyle(Ctrl/Cmd)` 作为[多光标修饰键](#多光标修饰键)时，此操作会变为 `kbstyle(Shift+Ctrl/Cmd)`。

macOS 和 Windows 上还有默认的列选择键盘快捷键，但 Linux 上没有。

键|命令|命令 ID
---|-------|----------
`kb(cursorColumnSelectDown)`|向下列选择|`cursorColumnSelectDown`
`kb(cursorColumnSelectUp)`|向上列选择|`cursorColumnSelectUp`
`kb(cursorColumnSelectLeft)`|向左列选择|`cursorColumnSelectLeft`
`kb(cursorColumnSelectRight)`|向右列选择|`cursorColumnSelectRight`
`kb(cursorColumnSelectPageDown)`|向下翻页列选择|`cursorColumnSelectPageDown`
`kb(cursorColumnSelectPageUp)`|向上翻页列选择|`cursorColumnSelectPageUp`

如果你愿意，可以[编辑](/docs/configure/keybindings.md) `keybindings.json` 将它们绑定到你更熟悉的键上。

### 列选择模式

用户设置 **编辑器：列选择** 控制此功能。进入此模式后（状态栏中会有指示），鼠标手势和箭头键将默认创建列选择。此全局开关也可以通过 **选择** > **列选择模式** 菜单项访问。此外，还可以从状态栏中禁用列选择模式。

## 保存 / 自动保存

默认情况下，VS Code 需要一个显式操作来将更改保存到磁盘，即 `kb(workbench.action.files.save)`。

当编辑器有未保存的更改时，编辑器标签页上会显示一个圆点指示器，资源管理器视图中也会显示一个徽章，指示未保存文件的数量。这些更改尚未保存到磁盘，但 VS Code 会自动备份它们，以便在应用程序意外关闭时恢复（参见[热退出](#热退出)）。

不过，启用 `自动保存` 也很容易，它会在配置的延迟后或焦点离开编辑器时保存更改。启用此选项后，无需显式保存文件。启用 `自动保存` 的最简单方法是通过 **文件** > **自动保存** 开关，它会在延迟后保存的开和关之间切换。

要更精细地控制 `自动保存`，请打开用户或工作区[设置](/docs/configure/settings.md)并找到相关设置：

* `setting(files.autoSave)`：可以取以下值：
  * `off`——禁用自动保存。
  * `afterDelay`——在配置的延迟后保存文件（默认 1000 毫秒）。
  * `onFocusChange`——当焦点离开脏文件的编辑器时保存文件。
  * `onWindowChange`——当焦点离开 VS Code 窗口时保存文件。
* `setting(files.autoSaveDelay)`：当 `setting(files.autoSave)` 配置为 `afterDelay` 时，配置延迟的毫秒数。默认值为 1000 毫秒。

如果你想为特定语言或文件类型自定义 `自动保存` 功能，可以通过在 `settings.json` 文件中添加特定语言规则来实现。

例如，为 LaTeX 文件禁用 `自动保存`：

```json
    "[latex]": {
        "files.autoSave": "off",
    },
```

## 热退出

默认情况下，VS Code 会在退出时记住文件的未保存更改。热退出在通过 **文件** > **退出**（macOS 上为 **Code** > **退出**）关闭应用程序时，或当最后一个窗口关闭时触发。

你可以通过将 `setting(files.hotExit)` 设置为以下值来配置热退出：

* `"off"`：禁用热退出。
* `"onExit"`：热退出将在应用程序关闭时触发，即在 Windows/Linux 上关闭最后一个窗口时，或触发 `workbench.action.quit` 命令时（通过**命令面板**、键盘快捷键或菜单）。所有未打开文件夹的窗口将在下次启动时恢复。
* `"onExitAndWindowClose"`：热退出将在应用程序关闭时触发（即在 Windows/Linux 上关闭最后一个窗口时，或触发 `workbench.action.quit` 命令时（通过**命令面板**、键盘快捷键或菜单）），并且也会在任何包含文件夹的窗口关闭时触发，无论它是否是最后一个窗口。所有未打开文件夹的窗口将在下次启动时恢复。要恢复文件夹窗口在关闭前的状态，请将 `setting(window.restoreWindows)` 设置为 `all`。

如果热退出出现问题，所有备份都存储在以下文件夹中（以标准安装位置为准）：

* **Windows** `%APPDATA%\Code\Backups`
* **macOS** `$HOME/Library/Application Support/Code/Backups`
* **Linux** `$HOME/.config/Code/Backups`

## 查找和替换

VS Code 允许你快速在当前打开的文件中查找和替换文本。按 `kb(actions.find)` 打开编辑器中的查找控件，然后输入搜索字符串。搜索结果会在编辑器、概览标尺和缩略图中高亮显示。

VS Code 会在你输入时立即开始搜索。如果只想在按 `kbstyle(Enter)` 时才开始搜索，请取消 `setting(editor.find.findOnType)` 设置。

要在找到匹配项后自动关闭查找控件并将焦点返回到编辑器，请启用 `setting(editor.find.closeOnResult)` 设置。

如果当前文件中有多个匹配项，当查找输入框获得焦点时，按 `kb(editor.action.nextMatchFindAction)` 转到下一个结果，或按 `kb(editor.action.previousMatchFindAction)` 转到上一个结果。

默认情况下，VS Code 会保存工作区的查找和替换查询历史记录，并在重新启动后恢复。你可以通过 `setting(editor.find.history)` 和 `setting(editor.find.replaceHistory)` 设置来配置此行为。将值设置为 `never` 可禁用保存历史记录。

### 从选择中填充搜索字符串

当查找控件打开时，它会自动将编辑器中选中的文本填充到查找输入框中。如果选择为空，则会将光标下的单词插入输入框中。

![Seed Search String From Selection](images/codebasics/seed-search-string-from-selection.gif)

可以通过将 `setting(editor.find.seedSearchStringFromSelection)` 设置为 `"never"` 来关闭此功能。

### 在选择中查找

默认情况下，查找操作在整个编辑器文件上运行。要将搜索限制在文本选择范围内，请选择查找控件上的 **在选择中查找** 图标或按 `kb(toggleFindInSelection)`。

![Find In Selection](images/codebasics/find-in-selection.gif)

如果你希望它成为查找控件的默认行为，可以将 `setting(editor.find.autoFindInSelection)` 设置为 `always`，或者设置为 `multiline`，表示仅在选择了多行内容时才在选定文本中运行。

### 高级查找和替换选项

对于更高级的场景，查找和替换控件提供以下选项：

* 查找控件：

  * 区分大小写
  * 全词匹配
  * 正则表达式

* 替换控件：

  * 保留大小写

![Advanced Find and Replace Options](images/codebasics/search-replace-advanced-options.png)

### 多行支持和查找控件调整大小

你可以通过将文本粘贴到查找输入框和替换输入框来搜索多行文本。按 `kbstyle(Ctrl+Enter)` 在输入框中插入新行。

![Multiple Line Support](images/codebasics/multiple-line-support.gif)

在搜索长文本时，查找控件的默认大小可能太小。你可以拖动左侧窗框来放大查找控件，或双击左侧窗框将其最大化或缩小到默认大小。

![Resize Find control](images/codebasics/resize-find-widget.gif)

## 跨文件搜索

VS Code 允许你快速搜索当前打开的文件夹中的所有文件。按 `kb(workbench.view.search)` 并输入你的搜索词。搜索结果按包含搜索词的文件分组，并显示每个文件中命中次数及其位置。展开文件可以预览该文件中的所有命中。然后单击其中一个命中以在编辑器中查看它。

![A simple text search across files](images/codebasics/search.png)

> [!TIP]
> VS Code 还支持在搜索框中执行正则表达式搜索。

你可以通过选择搜索框右侧下方的省略号（**切换搜索详细信息**）（或按 `kb(workbench.action.search.toggleQueryDetails)`）来配置高级搜索选项。这将显示更多用于配置搜索的字段。

> [!TIP]
> 你可以使用快速搜索在当前打开的文件夹中的所有文件中快速查找文本。打开命令面板（`kb(workbench.action.showCommands)`）并输入 **搜索：快速搜索** 命令。

### 高级搜索选项

![Advanced search options](images/codebasics/searchadvanced-v2.png)

在搜索框下方的两个输入框中，你可以输入要包含在搜索中或从搜索中排除的模式。如果输入 `example`，它将匹配工作区中每个名为 `example` 的文件夹和文件。如果输入 `./example`，它将匹配工作区顶层的 `example/` 文件夹。使用 `,` 分隔多个模式。路径必须使用正斜杠。你还可以使用 [glob 模式](/docs/editor/glob-patterns.md)语法，例如：

* `*` 匹配路径段中的零个或多个字符
* `?` 匹配路径段中的一个字符
* `**` 匹配任意数量的路径段，包括零个
* `{}` 对条件进行分组（例如 `{**/*.html,**/*.txt}` 匹配所有 HTML 和文本文档）
* `[]` **声明**要匹配的字符范围（`example.[0-9]` 匹配 `example.0`、`example.1`……）
* `[!...]` 否定要匹配的字符范围（`example.[!0-9]` 匹配 `example.a`、`example.b`，但不匹配 `example.0`）

**关于大小写敏感的说明：** Glob 模式遵循你操作系统的文件系统规则。在 Windows 和 macOS 上，模式不区分大小写（例如，`*.CS` 匹配 `file.cs`）。在 Linux 上，模式区分大小写。这与搜索文本的 **区分大小写** 开关是分开的，后者控制搜索文本本身是否区分大小写。详细了解 [glob 模式](/docs/editor/glob-patterns.md#case-sensitivity)。

VS Code 默认会排除一些文件夹，以减少你不感兴趣的搜索结果数量（例如：`node_modules`）。打开[设置](/docs/configure/settings.md)，在 `setting(files.exclude)` 和 `setting(search.exclude)` 部分更改这些规则。

请注意，搜索视图中的 glob 模式与 `setting(files.exclude)` 和 `setting(search.exclude)` 等设置中的工作方式不同。在设置中，你必须使用 `**/example` 来匹配工作区中子文件夹 `folder1/example` 中名为 `example` 的文件夹。在搜索视图中，`**` 前缀是默认的。这些设置中的 glob 模式始终相对于工作区文件夹的路径进行评估。

另请注意 **要排除的文件** 框中的 **使用排除设置和忽略文件** 切换按钮。该开关决定是否排除被 `.gitignore` 文件忽略的和/或被 `setting(files.exclude)` 和 `setting(search.exclude)` 设置匹配的文件。

在 **要包含的文件** 框中，你可以使用 **仅搜索已更改的文件** 切换按钮将搜索结果限制为有未提交源代码管理更改的文件。当没有代码仓库或没有可搜索的更改时，此开关会被禁用。

> [!NOTE]
> `.gitignore` 文件中模式的匹配在 Windows 和 macOS 上不区分大小写，在 Linux 上区分大小写。详细了解 [glob 模式大小写敏感性](/docs/editor/glob-patterns.md#case-sensitivity)。

> [!TIP]
> 在资源管理器中，你可以右键单击一个文件夹并选择 **在文件夹中查找**，以仅在该文件夹内搜索。

### 搜索和替换

你还可以进行跨文件的搜索和替换。展开搜索控件以显示替换文本框。

![search and replace](images/codebasics/global-search-replace.png)

当你在替换文本框中输入文本时，你将看到待处理更改的差异显示。你可以从替换文本框跨所有文件替换、在一个文件中全部替换或替换单个更改。

![search and replace diff view](images/codebasics/search-replace-example.png)

> [!TIP]
> 你可以使用 `kb(history.showNext)` 和 `kb(history.showPrevious)` 快速重用之前的搜索词，在搜索词历史记录中导航。

### 正则表达式替换中的大小写更改

VS Code 支持在编辑器或全局范围内进行搜索和替换时更改正则表达式匹配组的大小写。这是通过修饰符 `\u\U\l\L` 实现的，其中 `\u` 和 `\l` 将单个字符大写/小写，而 `\U` 和 `\L` 将匹配组的其余部分大写/小写。

示例：

![Changing case while doing find and replace](images/codebasics/case-change-replace.gif)

修饰符也可以叠加——例如，`\u\u\u$1` 将组的前三个字符大写，或者 `\l\U$1` 将第一个字符小写，其余部分大写。捕获组在替换字符串中通过 `$n` 引用，其中 `n` 是捕获组的顺序。

## 搜索编辑器

搜索编辑器允许你在全尺寸编辑器中查看工作区搜索结果，并带有语法高亮显示和可选的周围上下文行。

以下是在匹配项前后各显示两行文本作为上下文的 "SearchEditor" 搜索示例：

![Search Editor overview](images/codebasics/search-editor-overview.png)

**打开搜索编辑器** 命令会打开一个现有的搜索编辑器（如果存在），否则创建一个新的。**新建搜索编辑器** 命令将始终创建一个新的搜索编辑器。

在搜索编辑器中，可以使用**转到定义**操作导航结果，例如 `kb(editor.action.revealDefinition)` 在当前编辑器组中打开源位置，或 `kb(editor.action.revealDefinitionAside)` 在侧边编辑器中打开位置。此外，你可以通过 `setting(search.searchEditor.singleClickBehaviour)` 和 `setting(search.searchEditor.doubleClickBehaviour)` 设置来配置单击或双击搜索结果的显示行为。例如，打开速览定义窗口或打开源位置。

你还可以使用搜索视图顶部的 **打开新建搜索编辑器** 按钮，并可以通过结果树顶部的 **在编辑器中打开** 链接或 **搜索编辑器：在编辑器中打开结果** 命令将搜索视图中的现有结果复制到搜索编辑器中。

![Search Editor Button](images/codebasics/search-editor-button.png)

上面的搜索编辑器是通过选择搜索视图顶部的 **打开新建搜索编辑器** 按钮（第三个按钮）打开的。

### 搜索编辑器命令和参数

* `search.action.openNewEditor`——在新标签页中打开搜索编辑器。
* `search.action.openInEditor`——将当前搜索结果复制到新的搜索编辑器中。
* `search.action.openNewEditorToSide`——在当前打开的窗口旁边的新窗口中打开搜索编辑器。

你可以向搜索编辑器命令（`search.action.openNewEditor`、`search.action.openNewEditorToSide`）传递两个参数，以允许键盘快捷键配置新搜索编辑器的行为方式：

* `triggerSearch`——打开搜索编辑器时是否自动运行搜索。默认值为 true。
* `focusResults`——是将焦点放在搜索结果中还是查询输入中。默认值为 true。

例如，以下键盘快捷键在打开搜索编辑器时运行搜索，但将焦点留在搜索查询控件中。

```json
{
    "key": "ctrl+o",
    "command": "search.action.openNewEditor",
    "args": { "query": "VS Code", "triggerSearch":true, "focusResults": false }
}
```

### 搜索编辑器默认上下文

`setting(search.searchEditor.defaultNumberOfContextLines)` 设置的默认值为 1，意味着在搜索编辑器中，每个结果行的前后各显示一行上下文。

### 重用上次搜索编辑器配置

`setting(search.searchEditor.reusePriorSearchConfiguration)` 设置（默认为 `false`）允许你在创建新的搜索编辑器时重用上次活跃的搜索编辑器的配置。

## IntelliSense

我们始终提供单词补全，但对于丰富的[语言](/docs/languages/overview.md)，如 JavaScript、JSON、HTML、CSS、SCSS、Less、C# 和 TypeScript，我们提供真正的 IntelliSense 体验。如果语言服务知道可能的补全项，IntelliSense 建议会在你输入时弹出。你可以随时通过 `kb(editor.action.triggerSuggest)` 手动触发它。默认情况下，`kbstyle(Tab)` 或 `kbstyle(Enter)` 是接受建议的键盘触发器，但你也可以[自定义这些键盘快捷键](/docs/configure/keybindings.md)。

> [!TIP]
>  建议筛选支持驼峰命名法，因此你可以输入方法名中大写的字母来缩小建议范围。例如，"cra" 将快速显示 "createApplication"。

> [!TIP]
> IntelliSense 建议可以通过 `setting(editor.quickSuggestions)` 和 `setting(editor.suggestOnTriggerCharacters)` [设置](/docs/configure/settings.md)进行配置。

JavaScript 和 TypeScript 开发人员可以利用 [npmjs](https://www.npmjs.com) 类型声明（typings）文件仓库来获取常用 JavaScript 库（Node.js、React、Angular）的 IntelliSense。你可以在 [JavaScript 语言](/docs/languages/javascript.md#intellisense)主题和 [Node.js](/docs/nodejs/nodejs-tutorial.md) 教程中找到有关使用类型声明文件的详细说明。

在 [IntelliSense 文档](/docs/editing/intellisense.md)中了解更多信息。

## 格式化

VS Code 对源代码格式化有出色的支持。编辑器有两个显式的格式化操作：

* **格式化文档**（`kb(editor.action.formatDocument)`）——格式化整个活动文件。
* **格式化所选内容**（`kb(editor.action.formatSelection)`）——格式化选中的文本。

你可以从**命令面板**（`kb(workbench.action.showCommands)`）或编辑器上下文菜单中调用这些操作。

VS Code 为 JavaScript、TypeScript、JSON、HTML 和 CSS 提供了默认格式化程序。每种语言都有特定的格式化选项（例如，`setting(html.format.indentInnerHtml)`），你可以在用户或工作区[设置](/docs/configure/settings.md)中根据自己的偏好进行调整。如果你安装了其他为相同语言提供格式化的扩展，也可以禁用默认的语言格式化程序。

```json
"html.format.enable": false
```

除了手动调用代码格式化外，你还可以根据用户操作（如输入、保存或粘贴）触发格式化。这些默认是关闭的，但你可以通过以下[设置](/docs/configure/settings.md)启用这些行为：

* `setting(editor.formatOnType)`——输入后格式化行。
* `setting(editor.formatOnSave)`——保存时格式化文件。
* `setting(editor.formatOnPaste)`——格式化粘贴的内容。

> [!NOTE]
> 并非所有格式化程序都支持粘贴时格式化，因为要做到这一点，它们必须支持格式化选择或文本范围。

除了默认格式化程序外，你还可以在 Marketplace 上找到扩展来支持其他语言或格式化工具。有一个 `格式化程序` 类别，你可以轻松搜索和查找[格式化扩展](https://marketplace.visualstudio.com/search?target=VSCode&category=Formatters&sortBy=Installs)。在**扩展**视图搜索框中，输入 'formatters' 或 'category:formatters' 可以在 VS Code 中查看经过筛选的扩展列表。

## 折叠

你可以使用行号和行首之间装订线上的折叠图标来折叠源代码区域。将鼠标移到装订线上并单击以折叠和展开区域。在折叠图标上使用 `kbstyle(Shift + Click)` 可折叠或展开该区域及其内部的所有区域。

![Folding](images/codebasics/folding.png)

你还可以使用以下操作：

* 折叠（`kb(editor.fold)`）折叠光标处最内层的未折叠区域。
* 展开（`kb(editor.unfold)`）展开光标处的折叠区域。
* 切换折叠（`kb(editor.toggleFold)`）折叠或展开光标处的区域。
* 递归折叠（`kb(editor.foldRecursively)`）折叠光标处最内层的未折叠区域及该区域内的所有区域。
* 递归展开（`kb(editor.unfoldRecursively)`）展开光标处的区域及该区域内的所有区域。
* 全部折叠（`kb(editor.foldAll)`）折叠编辑器中的所有区域。
* 全部展开（`kb(editor.unfoldAll)`）展开编辑器中的所有区域。
* 折叠级别 X（例如 `kb(editor.foldLevel2)` 用于级别 2）折叠级别 X 的所有区域，但当前光标位置的区域除外。
* 折叠所有块注释（`kb(editor.foldAllBlockComments)`）折叠所有以块注释标记开头的区域。

默认情况下，折叠区域根据行的缩进进行评估。当一个行的缩进小于其后一行或多行时，折叠区域开始；当出现缩进相同或更小的行时，折叠区域结束。

折叠区域也可以根据编辑器配置语言的语法标记进行计算。以下语言已经支持基于语法的折叠：Markdown、HTML、CSS、LESS、SCSS 和 JSON。

如果你希望将上述一种（或所有）语言切换回基于缩进的折叠，请使用：

```json
  "[html]": {
    "editor.foldingStrategy": "indentation"
  },
```

区域也可以由每种语言定义的标记来定义。以下语言目前已定义标记：

语言|开始区域|结束区域
--------|------------|----------
Bat|`::#region` 或 `REM #region`|`::#endregion` 或 `REM #endregion`
C#|`#region`|`#endregion`
C/C++|`#pragma region`|`#pragma endregion`
CSS/Less/SCSS|`/*#region*/`|`/*#endregion*/`
Coffeescript|`#region`|`#endregion`
F#|`//#region` 或 `(#region)`|`//#endregion` 或 `(#endregion)`
Java|`//#region` 或 `//<editor-fold>`|`//#endregion` 或 `//</editor-fold>`
Markdown|`<!-- #region -->`|`<!-- #endregion -->`
Perl5|`#region` 或 `=pod`|`#endregion` 或 `=cut`
PHP|`#region`|`#endregion`
PowerShell|`#region`|`#endregion`
Python|`#region` 或 `# region`|`#endregion` 或 `# endregion`
TypeScript/JavaScript|`//#region`|`//#endregion`
Visual Basic|`#Region`|`#End Region`

要仅折叠和展开由标记定义的区域，请使用：

* 折叠标记区域（`kb(editor.foldAllMarkerRegions)`）折叠所有标记区域。
* 展开标记区域（`kb(editor.unfoldAllMarkerRegions)`）展开所有标记区域。

### 折叠所选内容

命令 **从所选内容创建手动折叠范围**（`kb(editor.createFoldingRangeFromSelection)`）从当前选中的行创建一个折叠范围并将其折叠。该范围称为**手动**折叠范围，位于折叠提供程序计算的范围之上。

可以使用命令 **删除手动折叠范围**（`kb(editor.removeManualFoldingRanges)`）删除手动折叠范围。

在编程语言不支持折叠的情况下，手动折叠范围特别有用。

## 缩进

VS Code 允许你控制文本缩进以及是否使用空格或制表位。默认情况下，VS Code 插入空格，每个 `kbstyle(Tab)` 键使用 4 个空格。如果你想使用其他默认值，可以修改 `setting(editor.insertSpaces)` 和 `setting(editor.tabSize)` [设置](/docs/configure/settings.md)。

```json
    "editor.insertSpaces": true,
    "editor.tabSize": 4,
```

### 自动检测

VS Code 会分析你打开的文件并确定文档中使用的缩进方式。自动检测到的缩进会覆盖你的默认缩进设置。检测到的设置在状态栏右侧显示：

![auto detect indentation](images/codebasics/indentation-detection.png)

你可以单击状态栏上的缩进显示，弹出一个包含缩进命令的下拉菜单，允许你更改打开文件的默认设置或在制表位和空格之间进行转换。

![indentation commands](images/codebasics/indentation-commands.png)

> [!NOTE]
> VS Code 自动检测会检查 2、4、6 或 8 个空格的缩进。如果你的文件使用不同数量的空格，缩进可能无法正确检测到。例如，如果你的惯例是使用 3 个空格缩进，你可能需要关闭 `setting(editor.detectIndentation)` 并显式设置制表符大小为 3。

```json
    "editor.detectIndentation": false,
    "editor.tabSize": 3,
```

## 文件编码支持

通过在**用户设置**或**工作区设置**中使用 `setting(files.encoding)` 设置，可以全局或按工作区设置文件编码。

![files.encoding setting](images/codebasics/filesencodingsetting.png)

你可以在状态栏中查看文件编码。

![Encoding in status bar](images/codebasics/fileencoding.png)

单击状态栏中的编码按钮，以使用不同的编码重新打开或保存活动文件。

![Reopen or save with a different encoding](images/codebasics/encodingclicked.png)

然后选择一种编码。

![Select an encoding](images/codebasics/encodingselection.png)

## 改写模式

在 1.96 版本之前，VS Code 仅支持*插入*模式，即字符在光标位置插入，除非你安装了 Vim [按键映射扩展](/docs/configure/keybindings.md#keymap-extensions)。

从 1.96 版本开始，VS Code 支持*改写*模式，该模式允许你覆盖现有字符而不是在光标位置插入字符。默认情况下，改写模式是关闭的。

要在插入模式和改写模式之间切换，请在命令面板中运行 **切换改写/插入模式** 命令或按（`kb(editor.action.toggleOvertypeInsertMode)`）。当你处于改写模式时，状态栏指示器会显示 `OVR`。

你可以通过配置 `setting(editor.overtypeCursorStyle)` 设置来更改改写模式的光标样式。

使用 `setting(editor.overtypeOnPaste)` 设置可在粘贴时覆盖文本。你需要处于改写模式才能使此设置生效。

## 比较文件

VS Code 支持多种方式来比较当前文件或任意两个文件的内容。

如果你在编辑器中打开了一个活动文件，有以下比较选项：

* **与工作区文件比较**：在命令面板中，选择 **文件：比较活动文件与...**，然后选择另一个要比较的文件。
* **与剪贴板比较**：在命令面板中，选择 **文件：比较活动文件与剪贴板**（`kb(workbench.files.action.compareWithClipboard)`），将当前文件与剪贴板内容进行比较。
* **与已保存版本比较**：在命令面板中，选择 **文件：比较活动文件与已保存版本**（`kb(workbench.files.action.compareWithSaved)`），将当前文件与上次保存的版本进行比较。

要比较任意两个文件：

* 在资源管理器视图中右键单击一个文件，然后选择 **选择以进行比较**。然后，右键单击第二个文件并选择 **与已选项进行比较**。
* 要开始比较两个空的编辑器窗口，请从命令面板中选择 **文件：比较新的未命名文本文件**。

> [!TIP]
> 你可以从命令行使用 `--diff` 选项启动 VS Code 来比较两个文件。了解更多关于 [VS Code 命令行界面](/docs/configure/command-line.md#core-cli-options)的信息。

## 后续步骤

你已经了解了基本的用户界面——VS Code 还有更多精彩内容。继续阅读以了解：

* [入门视频——设置和基础](/docs/introvideos/basics.md)——观看关于 VS Code 基础知识的教程。
* [用户/工作区设置](/docs/configure/settings.md)——了解如何通过用户和工作区设置将 VS Code 配置为符合你的偏好。
* [代码导航](/docs/editing/editingevolved.md)——速览和转到定义，以及更多功能。
* [集成终端](/docs/terminal/basics.md)——了解集成终端，用于在 VS Code 中快速执行命令行任务。
* [IntelliSense](/docs/editing/intellisense.md)——VS Code 提供智能代码补全。
* [调试](/docs/debugtest/debugging.md)——这是 VS Code 真正大放异彩的地方。

## 常见问题

### 是否可以全局搜索和替换？

是的，展开搜索视图文本框以包含替换文本字段。你可以在工作区的所有文件中搜索和替换。请注意，如果你没有在文件夹中打开 VS Code，搜索将仅在当前打开的文件上运行。

![global search and replace](images/codebasics/global-search-replace.png)

### 如何开启自动换行？

你可以通过 `setting(editor.wordWrap)` [设置](/docs/configure/settings.md)来控制自动换行。默认情况下，`setting(editor.wordWrap)` 为 `off`，但如果将其设置为 `on`，文本将根据编辑器的视口宽度进行换行。

```json
    "editor.wordWrap": "on"
```

你可以使用 `kb(editor.action.toggleWordWrap)` 在当前 VS Code 会话中切换自动换行。

你还可以使用 `setting(editor.rulers)` 设置在编辑器中添加垂直列标尺，该设置接受一个包含你希望放置垂直标尺的列字符位置的数组。

与其他编辑器一样，**剪切**和**复制**等命令适用于整行换行。三击选择整行换行文本。按两次 `kbstyle(Home)` 将光标移动到行的最开头。按两次 `kbstyle(End)` 将光标移动到行的最末尾。

### 如何避免在自动换行行中放置多余的光标？

如果你想在添加光标到当前选择的上方或下方时忽略换行，可以在键盘快捷键的 `args` 中传入 `{ "logicalLine": true }`，如下所示：

```json
{
  "key": "shift+alt+down",
  "command": "editor.action.insertCursorBelow",
  "when": "textInputFocus",
  "args": { "logicalLine": true },
},
{
  "key": "shift+alt+up",
  "command": "editor.action.insertCursorAbove",
  "when": "textInputFocus",
  "args": { "logicalLine": true },
},
```
