---
ContentId: 05C114DF-4FDC-4C65-8954-58F5F293FAFD
DateApproved: 6/10/2026
MetaDescription: 充分利用 Visual Studio Code 编辑 TypeScript 的强大功能。
MetaSocialImage: images/typescript/typescript-social.png
---
# Visual Studio Code 中的 TypeScript

[TypeScript](https://www.typescriptlang.org) 是 JavaScript 的类型化超集，可编译为纯 JavaScript。它提供类、模块和接口，帮助你构建健壮的组件。

![Working with TypeScript in Visual Studio Code](images/typescript/overview.png)

## 安装 TypeScript 编译器

Visual Studio Code 内置了 TypeScript 语言支持，但不包含 TypeScript 编译器 `tsc`。你需要全局安装或在工作区中安装 TypeScript 编译器，才能将 TypeScript 源代码转译为 JavaScript（`tsc HelloWorld.ts`）。

安装 TypeScript 最简单的方式是通过 npm（[Node.js 包管理器](https://www.npmjs.com/)）。如果你已安装 npm，可以通过以下命令在计算机上全局（`-g`）安装 TypeScript：

```bash
npm install -g typescript
```

你可以通过检查版本来测试安装是否成功。

```bash
tsc --version
```

另一种选择是在项目中本地安装 TypeScript 编译器（`npm install --save-dev typescript`），这样做的好处是可以避免与其他 TypeScript 项目之间可能产生的冲突。

## Hello World

让我们从一个简单的 Hello World Node.js 示例开始。创建一个名为 `HelloWorld` 的新文件夹并启动 VS Code。

```bash
mkdir HelloWorld
cd HelloWorld
code .
```

在文件资源管理器中，创建一个名为 `helloworld.ts` 的新文件。

![create new file](images/typescript/create-new-file.png)

现在添加以下 TypeScript 代码。你会注意到 TypeScript 关键字 `let` 和 `string` 类型声明。

```typescript
let message : string = "Hello World";
console.log(message);
```

要编译 TypeScript 代码，你可以打开[集成终端](/docs/terminal/basics.md)（`kb(workbench.action.terminal.toggleTerminal)`）并输入 `tsc helloworld.ts`。这将编译并创建一个新的 `helloworld.js` JavaScript 文件。

![compiled hello world](images/typescript/compiled-hello-world.png)

如果你已安装 Node.js，可以运行 `node helloworld.js`。

![run hello world](images/typescript/run-hello-world.png)

如果你打开 `helloworld.js`，你会发现它和 `helloworld.ts` 看起来差别不大。类型信息已被移除，`let` 变成了 `var`。

```javascript
var message = "Hello World";
console.log(message);
```

## IntelliSense

IntelliSense 为你提供智能代码补全、悬停信息和签名帮助，让你能够更快速、更准确地编写代码。

![TypeScript small completions for String type](images/typescript/ts-intellisense.png)

VS Code 为单个 TypeScript 文件以及 TypeScript `tsconfig.json` 项目提供 IntelliSense。

### 悬停信息

将鼠标悬停在 TypeScript 符号上，可以快速查看其类型信息和相关文档：

![Hover for a lodash function](images/typescript/hover.png)

你也可以使用 `kb(editor.action.showHover)` 键盘快捷键在当前光标位置显示悬停信息。

### 签名帮助

当你编写 TypeScript 函数调用时，VS Code 会显示函数签名信息，并高亮显示你当前正在输入的参数：

![Signature help for the lodash capitalize function](images/typescript/signature-help.png)

签名帮助会在你在函数调用中输入 `(` 或 `,` 时自动显示。使用 `kb(editor.action.triggerParameterHints)` 可以手动触发签名帮助。

## 代码片段

除了智能代码补全之外，VS Code 还包含基本的 TypeScript [代码片段](/docs/editing/userdefinedsnippets.md)，在你输入时会自动建议。

![TypeScript 'for' snippet suggestions](images/typescript/ts-snippets.png)

你可以安装扩展来获取更多代码片段，也可以为 TypeScript 定义自己的代码片段。有关更多信息，请参阅[用户自定义代码片段](/docs/editing/userdefinedsnippets.md)。

> **提示**：你可以在[设置](/docs/configure/settings.md)文件中将 `setting(editor.snippetSuggestions)` 设置为 `"none"` 来禁用代码片段。如果你想查看代码片段，可以指定它们相对于建议的排序方式：置顶（`"top"`）、置底（`"bottom"`）或按字母顺序内联排列（`"inline"`）。默认值为 `"inline"`。

## 错误和警告

TypeScript 语言服务会分析你的程序中是否存在编码问题，并报告错误和警告：

* 在状态栏中，会显示所有错误和警告数量的摘要。
* 你可以点击摘要或按 `kb(workbench.actions.view.problems)` 来显示**问题**面板，其中列出所有当前错误。
* 如果你打开的文件包含错误或警告，它们将以内联方式显示在文本旁和概览标尺中。

![Error in the editor and Problems panel](images/typescript/ts-error.png)

要在当前文件中循环浏览错误或警告，你可以按 `kb(editor.action.marker.nextInFiles)` 或 `kb(editor.action.marker.prevInFiles)`，这将显示一个内联区域，详细说明问题及可能的代码操作（如果可用）：

![Error inline in the editor](images/typescript/ts-error-inline.png)

## 代码导航

代码导航让你能够快速浏览 TypeScript 项目。

* **转到定义** `kb(editor.action.revealDefinition)` - 转到符号定义的源代码。
* **速览定义** `kb(editor.action.peekDefinition)` - 弹出一个速览窗口，显示符号的定义。
* **转到引用** `kb(editor.action.goToReferences)` - 显示符号的所有引用。
* **转到类型定义** - 转到定义符号的类型。对于类的实例，这将显示类本身，而不是实例的定义位置。
* **转到实现** `kb(editor.action.goToImplementation)` - 转到接口或抽象方法的实现。

你可以通过**命令面板**（`kb(workbench.action.showCommands)`）中的**转到符号**命令来进行符号搜索导航。

* **转到文件中的符号** `kb(workbench.action.gotoSymbol)`
* **转到工作区中的符号** `kb(workbench.action.showAllSymbols)`

## 格式化

VS Code 包含一个 TypeScript 格式化器，提供基本的代码格式化功能，并具有合理的默认设置。

使用 `js/ts.format.*` [设置](/docs/configure/settings.md)来配置内置格式化器，例如让大括号单独占一行。或者，如果内置格式化器干扰了你的工作，可以将 `"js/ts.format.enable"` 设置为 `false` 来禁用它。

如需更专业的代码格式化风格，请尝试从 VS Code Marketplace 安装格式化扩展。

## 重构

VS Code 为 TypeScript 提供了一些便捷的重构功能，例如**提取函数**和**提取常量**。只需选中你想要提取的源代码，然后点击行号旁的灯泡图标或按（`kb(editor.action.quickFix)`）即可查看可用的重构选项。

![TypeScript refactoring](images/typescript/refactorings.png)

有关重构以及如何为各个重构操作配置键盘快捷键的更多信息，请参阅[重构 TypeScript](/docs/typescript/typescript-refactoring.md)。

### 重命名

最简单的重构操作之一是重命名方法或变量。按 `kb(editor.action.rename)` 可以重命名光标所在符号，该更改会应用于整个 TypeScript 项目：

![Renaming a method](images/typescript/rename.png)

## 调试

VS Code 为 TypeScript 提供了出色的调试支持，包括对 sourcemap 的支持。你可以设置断点、检查对象、浏览调用堆栈，并在调试控制台中执行代码。有关详细信息，请参阅[调试 TypeScript](/docs/typescript/typescript-debugging.md) 和[调试概述主题](/docs/debugtest/debugging.md)。

### 调试客户端代码

你可以使用浏览器调试器调试客户端代码，例如[内置的 Edge 和 Chrome 调试器](/docs/nodejs/browser-debugging.md)，或 [Debugger for Firefox](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-firefox-debug)。

### 调试服务端代码

使用内置调试器在 VS Code 中调试 Node.js。设置非常简单，还有 [Node.js 调试教程](/docs/nodejs/nodejs-tutorial.md#debug-your-express-app)可以帮助你。

![debug data inspection](images/javascript/debug_data_inspection.gif)

## Linter

[Linter](https://en.wikipedia.org/wiki/Lint_%28software%29) 可以对可疑代码提供警告。虽然 VS Code 不包含内置的 TypeScript linter，但 Marketplace 中提供了 TypeScript linter [扩展](/docs/configure/extensions/extension-marketplace.md)。

[ESLint](https://eslint.org) 是一款流行的 linter，同样支持 TypeScript。[ESLint 扩展](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 将 ESLint 集成到 VS Code 中，让你可以直接在编辑器中查看 lint 错误，甚至可以使用[快速修复](/docs/typescript/typescript-refactoring.md#quick-fixes)快速修复其中的许多问题。[ESLint 插件指南](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin#readme)详细说明了如何为你的 TypeScript 项目配置 ESLint。

## TypeScript 扩展

VS Code 开箱即用地为 TypeScript 提供了许多功能。除了内置功能之外，你还可以安装扩展以获得更强大的功能。

<div class="marketplace-extensions-typescript-curated"></div>

> 提示：点击上方的扩展磁贴即可阅读描述和评价，以决定哪款扩展最适合你。在 [Marketplace](https://marketplace.visualstudio.com) 中查看更多内容。

## 后续步骤

要了解更多信息，请参阅：

* [TypeScript 教程](/docs/typescript/typescript-tutorial.md) - 在 VS Code 中创建一个简单的 Hello World TypeScript。
* [编辑 TypeScript](/docs/typescript/typescript-editing.md) - TypeScript 的特定编辑功能。
* [重构 TypeScript](/docs/typescript/typescript-refactoring.md) - TypeScript 语言服务提供的实用重构功能。
* [转译 TypeScript](/docs/typescript/typescript-transpiling.md) - 将 TypeScript 编译为指定版本的 JavaScript 目标。
* [调试 TypeScript](/docs/typescript/typescript-debugging.md) - 了解如何使用 VS Code 在服务端和客户端进行 TypeScript 调试。

## 常见问题

### 可以使用 VS 2022 附带的 TypeScript 版本吗？

不可以，Visual Studio 2019 和 2022 附带的 TypeScript 语言服务与 VS Code 不兼容。你需要从 [npm](https://www.npmjs.com/package/typescript) 安装一个独立的 TypeScript 版本。

### 如何在 VS Code 中使用最新的 TypeScript Beta 版？

在 VS Code 中试用最新 TypeScript 功能的最简单方法是安装 [JavaScript and TypeScript Nightly 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)。

你也可以[配置 VS Code 使用特定的 TypeScript 版本](/docs/typescript/typescript-transpiling.md#using-newer-typescript-versions)。
