---
ContentId: 481dfd3a-d847-4ed3-b37b-7fc8d234a4c2
DateApproved: 6/10/2026
MetaDescription: 在 Visual Studio Code 中重构源代码。
---
# 重构

[源代码重构](https://en.wikipedia.org/wiki/Code_refactoring)可以在不修改运行时行为的前提下，通过重组代码来提升项目的质量和可维护性。Visual Studio Code 支持重构操作（*重构*），例如[提取方法](https://refactoring.com/catalog/extractMethod.html)和[提取变量](https://refactoring.com/catalog/extractVariable.html)，以便你在编辑器中改进代码库。

![refactoring hero image](images/refactoring/refactoring-hero.png)

例如，为了避免代码重复（维护的一大痛点），常用的重构手法是[提取方法](https://refactoring.com/catalog/extractMethod.html)重构，即选中一段源代码，将其提取到独立的共享方法中，以便在其他位置复用该代码。

重构由语言服务提供。VS Code 通过 [TypeScript](https://www.typescriptlang.org/) 语言服务内置了对 TypeScript 和 JavaScript 重构的支持。其他编程语言的重构支持则通过提供语言服务的 VS Code [扩展](/docs/configure/extensions/extension-marketplace.md)来启用。

重构的 UI 元素和 VS Code 命令在不同语言间保持一致。本文以 TypeScript 语言服务为例，演示 VS Code 中的重构支持。

## Code Action = 快速修复和重构

在 VS Code 中，Code Action 可以同时提供重构和针对检测到的问题（以红色波浪线高亮显示）的快速修复。当光标位于波浪线上或选中的文本区域内时，VS Code 会在编辑器中显示一个灯泡图标，表示有可用的 Code Action。如果你点击 Code Action 灯泡或使用**快速修复**命令 `kb(editor.action.quickFix)`，就会显示快速修复和重构控件。

如果你只想查看重构而不显示快速修复，可以使用**重构**命令（`kb(editor.action.refactor)`）。

>**注意：** 你可以通过 `editor.lightbulb.enable` [设置](/docs/configure/settings.md)完全禁用编辑器中的 Code Action 灯泡。你仍然可以通过**快速修复**命令和 `kb(editor.action.quickFix)` 键盘快捷键打开快速修复。

### 保存时的 Code Action

通过 `setting(editor.codeActionsOnSave)` 设置，你可以配置一组在保存文件时自动应用的 Code Action，例如用于整理导入语句。根据你的工作区文件和已启用的扩展，IntelliSense 会提供可用的 Code Action 列表。

![Screenshot of settings.json, showing IntelliSense suggestions for the editor.codeActionsOnSave setting.](images/refactoring/code-actions-on-save.png)

你可以为 `setting(editor.codeActionsOnSave)` 配置一个或多个 Code Action。这些 Code Action 将按列出顺序依次执行。

以下示例展示了如何配置多个保存时的 Code Action：

```json
// On explicit save, run sortImports source action. On auto save (window or focus change), run organizeImports source action.
"editor.codeActionsOnSave": {
    "source.organizeImports": "always",
    "source.sortImports": "explicit",
},
```

每个 Code Action 支持以下值：

* `explicit`（默认）：在显式保存时触发 Code Action
* `always`：在显式保存以及窗口或焦点更改导致的自动保存时触发 Code Action
* `never`：保存时永不触发 Code Action

> [!NOTE]
> 虽然目前 `true` 和 `false` 仍是有效的配置值，但将来会被弃用，推荐使用 `explicit`、`always` 和 `never`。

## 重构操作

### 提取方法

选中你要提取的源代码，然后点击行号槽中的灯泡或按 (`kb(editor.action.quickFix)`) 查看可用的重构。源代码片段可以被提取到一个新方法中，或者提取到不同作用域的新函数中。在提取重构过程中，系统会提示你提供一个有意义的名称。

### 提取变量

TypeScript 语言服务提供了**提取为常量**重构，用于为当前选中的表达式创建一个新的局部变量：

![Extract local](images/refactoring/ts-extract-local.gif)

在处理类时，你也可以将值提取为一个新的属性。

### 重命名符号

重命名是与源代码重构相关的常见操作，VS Code 提供了专门的**重命名符号**命令（`kb(editor.action.rename)`）。某些语言支持跨文件重命名符号。按 `kb(editor.action.rename)`，输入新的名称，然后按 `kbstyle(Enter)`。该符号在所有文件中的所有实例都会被重命名。

![Rename](images/refactoring/rename.png)

## 重构预览

当你应用重构时，更改会直接应用到你的代码中。在**重构预览**面板中，你可以预览重构操作将要应用的更改。

要打开**重构预览**面板，请打开 Code Action 控件，将鼠标悬停在某个重构选项上，然后按 `kb(previewSelectedCodeAction)`。

![Video of launching the Refactor Preview panel by pressing `CtrlCmd + Enter` on the Code Actions control.](images/refactoring/refactor-preview-launch.gif)

你可以在**重构预览**面板中选择任意更改，以查看重构操作所产生的更改差异视图。

![Screenshot of the Refactor Preview panel that shows an 'Extract to' refactoring that results in two changes](images/refactoring/refactor-preview.png)

使用**接受**或**放弃**控件来应用或取消提议的重构更改。

你还可以通过在重构预览面板中取消选中某些提议的更改，来部分应用重构更改。

![Screenshot of the Refactor Preview panel that shows how to partially apply changes by deselecting specific changes.](images/refactoring/refactor-preview-partial.png)

## Code Action 的键盘快捷键

`editor.action.codeAction` 命令让你可以为特定的 Code Action 配置键盘快捷键。例如，以下键盘快捷键可触发**提取函数**重构 Code Action：

```json
{
  "key": "ctrl+shift+r ctrl+e",
  "command": "editor.action.codeAction",
  "args": {
    "kind": "refactor.extract.function"
  }
}
```

Code Action 种类由扩展使用增强的 `CodeActionProvider` API 指定。种类是分层的，因此 `"kind": "refactor"` 会显示所有重构 Code Action，而 `"kind": "refactor.extract.function"` 仅显示**提取函数**重构。

使用上述键盘快捷键时，如果只有一个 `"refactor.extract.function"` Code Action 可用，则会自动应用它。如果有多个**提取函数** Code Action 可用，VS Code 会弹出上下文菜单供你选择：

![Select Code Action context menu](images/refactoring/code-action-context-menu.png)

你还可以通过使用 `apply` 参数来控制如何以及何时自动应用 Code Action：

```json
{
  "key": "ctrl+shift+r ctrl+e",
  "command": "editor.action.codeAction",
  "args": {
    "kind": "refactor.extract.function",
    "apply": "first"
  }
}
```

`apply` 的有效值：

* `first` - 始终自动应用第一个可用的 Code Action。
* `ifSingle` - （默认）仅当只有一个 Code Action 可用时自动应用。否则，显示上下文菜单。
* `never` - 始终显示 Code Action 上下文菜单，即使只有一个 Code Action 可用。

当 Code Action 键盘快捷键配置了 `"preferred": true` 时，仅显示首选快速修复和重构。首选快速修复解决底层错误，而首选重构是最常用的重构选项。例如，可能存在多个 `refactor.extract.constant` 重构，每个都将代码提取到文件中的不同作用域，但首选的 `refactor.extract.constant` 重构是将代码提取为局部变量的那个。

此键盘快捷键使用 `"preferred": true` 创建了一个重构，始终尝试将选中的源代码提取为当前作用域中的常量：

```json
{
  "key": "shift+ctrl+e",
  "command": "editor.action.codeAction",
  "args": {
    "kind": "refactor.extract.constant",
    "preferred": true,
    "apply": "ifSingle"
  }
}
```

## 支持重构的扩展

你可以在 VS Code [市场](https://marketplace.visualstudio.com/vscode)中查找支持重构的扩展。你可以进入扩展视图（`kb(workbench.view.extensions)`），在搜索框中输入"refactor"。然后可以按安装量或评分排序，查看哪些扩展比较受欢迎。

<div class="marketplace-extensions-refactor"></div>

> **提示**：以上显示的扩展是动态查询的。点击上方的扩展板块，阅读描述和评价，来决定哪款扩展最适合你。

## 后续步骤

* [入门视频 - 代码编辑](/docs/introvideos/codeediting.md) - 观看代码编辑功能的入门视频。
* [代码导航](/docs/editing/editingevolved) - VS Code 让你能快速浏览源代码。
* [调试](/docs/debugtest/debugging.md) - 了解如何在 VS Code 中进行调试。

## 常见问题

### 为什么我的代码有错误时没有看到任何灯泡图标？

灯泡图标（Code Action）仅在光标位于显示错误的文本上时显示。将鼠标悬停在文本上会显示错误描述，但你需要将光标移至该处或选中文本，才能看到用于快速修复和重构的灯泡图标。
