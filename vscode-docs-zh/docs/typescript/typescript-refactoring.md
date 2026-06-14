---
ContentId: ff7a9f28-26b2-4ac6-8c16-1a16182bb6ca
DateApproved: 6/10/2026
MetaDescription: 了解 Visual Studio Code 支持的 TypeScript 重构操作。
---
# 重构 TypeScript

[源代码重构](https://en.wikipedia.org/wiki/Code_refactoring)可以在不修改运行时行为的情况下重组代码，从而提高项目的质量和可维护性。Visual Studio Code 支持重构操作（重构），例如[提取方法](https://refactoring.com/catalog/extractMethod.html)和[提取变量](https://refactoring.com/catalog/extractVariable.html)，以便在编辑器中改善代码库。

Visual Studio Code 通过 [TypeScript](https://www.typescriptlang.org/) 语言服务内置了对 TypeScript 重构的支持，在本主题中，我们将演示 TypeScript 语言服务提供的重构支持。

## 重命名

最简单的重构操作之一是重命名方法或变量。按下 `kb(editor.action.rename)` 即可在整个 TypeScript 项目中重命名光标下的符号：

![重命名方法](images/refactoring/rename.png)

## 重构

要查看可用的 TypeScript 重构操作，请将光标放在源代码的某个区域上，然后右键单击弹出编辑器上下文菜单并选择 **重构**，或直接按 `kb(editor.action.refactor)`。

![TypeScript 重构](images/refactoring/refactorings.png)

有关重构操作以及如何为各个重构操作配置键盘快捷方式的更多信息，请参阅[重构](/docs/editing/refactoring.md)。

可用的 TypeScript 重构操作包括：

* **提取到方法或函数** - 将选中的语句或表达式提取到文件中的新方法或新函数。

   ![对选中内容触发提取方法重构](images/refactoring/refactor-extract-function.gif)

   在选择 **提取到方法** 或 **提取到函数** 重构操作后，输入提取出的方法/函数的名称。

* **提取到常量** - 将选中的表达式提取到文件中的新常量。

   ![从选中内容提取常量](images/refactoring/refactor-extract-constant.gif)

* **将类型提取到接口或类型别名** - 将选中的复杂类型提取到接口或类型别名。

   ![将内联类型提取到接口](images/refactoring/refactor-extract-interface.gif)

* **移动到新文件** - 将文件顶层作用域中的一个或多个类、函数、常量或接口移动到新文件中。新文件的名称根据所选符号的名称推断得出。

   ![将类移动到新文件](images/refactoring/refactor-move-file.gif)

* **在命名导入和命名空间导入之间转换** - 在命名导入（`import { Name } from './foo'`）和命名空间导入（`import * as foo from './foo'`）之间进行转换。

   ![将命名导入转换为命名空间导入](images/refactoring/refactor-convert-import.gif)

* **在默认导出和命名导出之间转换** - 在使用 `export default` 和命名导出（`export const Foo = ...`）之间进行转换。

* **将参数转换为解构对象** - 将带有长参数列表的函数重写为接收单个参数对象的形式。

* **生成 get 和 set 访问器** - 通过为选中的类属性生成 getter 和 setter 来封装该属性。

   ![从类属性生成 getter 和 setter](images/refactoring/refactor-generate-get-set.gif)

* **推断函数返回类型** - 为函数添加显式的返回类型注解。

    ![推断函数返回类型重构操作的实际效果](images/refactoring/ts-infer-return.gif)

* **为箭头函数添加/删除大括号** - 将单行箭头函数转换为多行形式，反之亦然。

## 快速修复

快速修复是针对简单编码错误提供的建议性编辑。快速修复的示例包括：

* 为成员访问添加缺失的 `this`。
* 修复拼写错误的属性名称。
* 删除无法访问的代码或未使用的导入
* 声明

当你将光标移到 TypeScript 错误上时，VS Code 会显示一个灯泡图标，表示有可用的快速修复。点击该灯泡或按 `kb(editor.action.quickFix)` 即可显示可用的快速修复和[重构](#重构)列表。

此外，**代码操作小部件：包含附近的快速修复**（`editor.codeActionWidget.includeNearbyQuickFixes`）是一项默认启用的设置，它会在你按 `kb(editor.action.quickFix)`（命令 ID `editor.action.quickFix`）时激活该行中最近的快速修复，无论光标在该行中的哪个位置。

该命令会高亮显示将被重构或通过快速修复修复的源代码。普通的代码操作和非修复重构仍可在光标位置激活。

## 未使用的变量和无法访问的代码

未使用的 TypeScript 代码（例如始终为真的 `if` 语句的 `else` 块或未被引用的导入）会在编辑器中淡化显示：

![无法访问的源代码被淡化显示](images/refactoring/unreachable.png)

你可以通过将光标放在这些代码上并触发快速修复命令（`kb(editor.action.quickFix)`）或点击灯泡来快速删除它们。

要禁用未使用代码的淡化显示，请将 `"editor.showUnused"` 设置为 `false`。你也可以仅在 TypeScript 中禁用未使用代码的淡化显示，方法是设置：

```json
"[typescript]": {
    "editor.showUnused":  false
},
"[typescriptreact]": {
    "editor.showUnused":  false
},
```

## 整理导入

**整理导入**源代码操作会对 TypeScript 文件中的导入进行排序并删除未使用的导入：

<video src="images/refactoring/organize-imports.mp4" placeholder="images/refactoring/organize-imports-placeholder.png" autoplay loop controls muted>
    Sorry, your browser doesn't support HTML 5 video.
</video>

你可以从**源代码操作**上下文菜单中运行**整理导入**，或使用 `kb(editor.action.organizeImports)` 键盘快捷方式。

你也可以通过在保存 TypeScript 文件时自动整理导入来进行设置：

```json
"editor.codeActionsOnSave": {
    "source.organizeImports": "explicit"
}
```

## 文件移动时更新导入

当你在 TypeScript 项目中移动或重命名被其他文件导入的文件时，VS Code 可以自动更新所有引用该移动文件的导入路径。

`js/ts.updateImportsOnFileMove.enabled` 设置控制此行为。有效的设置值为：

* `"prompt"` - 默认值。每次移动文件时询问是否应更新路径。
* `"always"` - 始终自动更新路径。
* `"never"` - 不自动更新路径，也不提示。

## 保存时的代码操作

`editor.codeActionsOnSave` 设置允许你配置在保存文件时运行的一组代码操作。例如，你可以通过在保存时启用整理导入来进行设置：

```json
// 在显式保存时运行 fixAll 源代码操作。在自动保存（窗口或焦点变化）时运行 organizeImports 源代码操作。
"editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.organizeImports": "always",
}
```

截至目前，支持以下枚举值：
* `explicit`（默认）：在显式保存时触发代码操作。等同于 `true`。
* `always`：在显式保存以及窗口或焦点变化导致的自动保存时触发代码操作。
* `never`：在保存时永不触发代码操作。等同于 `false`。

你也可以将 `editor.codeActionsOnSave` 设置为一个代码操作数组，以按顺序执行。

以下是一些源代码操作：

* `"organizeImports"` - 在保存时启用整理导入。
* `"fixAll"` - 保存时自动修复会在一轮中计算所有可能的修复（适用于包括 ESLint 在内的所有提供程序）。
* `"fixAll.eslint"` - 仅针对 ESLint 的自动修复。
* `"addMissingImports"` - 在保存时添加所有缺失的导入。

有关更多信息，请参阅 [TypeScript](/docs/typescript/typescript-tutorial.md)。

## 代码建议

VS Code 会自动建议一些常见的代码简化操作，例如将 Promise 上的 `.then` 调用链转换为使用 `async` 和 `await`。

<video src="images/refactoring/code-suggestions-convert-async.mp4" placeholder="images/refactoring/code-suggestions-convert-async-placeholder.png" autoplay loop controls muted>
    Sorry, your browser doesn't support HTML 5 video.
</video>

将 `"js/ts.suggestionActions.enabled"` 设置为 `false` 可禁用建议。

## 后续步骤

继续阅读以了解：

* [编辑 TypeScript](/docs/typescript/typescript-editing.md) - 了解 VS Code 针对 TypeScript 的编辑功能。
* [调试 TypeScript](/docs/typescript/typescript-debugging.md) - 为你的 TypeScript 项目配置调试器。
