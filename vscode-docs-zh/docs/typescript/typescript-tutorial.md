---
ContentId: cb4f3742-733c-49d8-96db-d4bf8403bf64
DateApproved: 6/10/2026
MetaDescription: 使用 Visual Studio Code 的 TypeScript 教程。
MetaSocialImage: ../languages/images/typescript/typescript-social.png
---
# Visual Studio Code 中的 TypeScript 教程

[TypeScript](https://www.typescriptlang.org) 是 JavaScript 的类型化超集，可编译为纯 JavaScript。它提供了类、模块和接口，帮助你构建健壮的组件。

## 安装 TypeScript 编译器

Visual Studio Code 包含 TypeScript 语言支持，但不包含 TypeScript 编译器 `tsc`。你需要全局或在工作区中安装 TypeScript 编译器，以便将 TypeScript 源代码转译为 JavaScript（`tsc HelloWorld.ts`）。

安装 TypeScript 最简单的方法是通过 npm，即 [Node.js 包管理器](https://www.npmjs.com/)。如果你已安装 npm，可以通过以下命令在计算机上全局（`-g`）安装 TypeScript：

```bash
npm install -g typescript
```

你可以通过检查版本来测试安装是否成功。

```bash
tsc --version
```

## Hello World

让我们从一个简单的 Hello World Node.js 示例开始。创建一个新文件夹 `HelloWorld` 并启动 VS Code。

```bash
mkdir HelloWorld
cd HelloWorld
code .
```

在文件资源管理器中，创建一个名为 `helloworld.ts` 的新文件。

![create new file](images/tutorial/create-new-file.png)

现在添加以下 TypeScript 代码。你会注意到 TypeScript 关键字 `let` 和 `string` 类型声明。

```typescript
let message : string = "Hello World";
console.log(message);
```

要编译你的 TypeScript 代码，可以打开[集成终端](/docs/terminal/basics.md)（`kb(workbench.action.terminal.toggleTerminal)`）并输入 `tsc helloworld.ts`。这将编译并创建一个新的 `helloworld.js` JavaScript 文件。

![compiled hello world](images/tutorial/compiled-hello-world.png)

如果你已安装 Node.js，可以运行 `node helloworld.js`。

![run hello world](images/tutorial/run-hello-world.png)

如果你打开 `helloworld.js`，会发现它与 `helloworld.ts` 看起来没有太大区别。类型信息已被移除，`let` 现在变成了 `var`。

```javascript
var message = "Hello World";
console.log(message);
```

## IntelliSense

在 VS Code 中，你可以看到语法高亮和括号匹配等语言功能。当你在编辑器中输入时，你可能已经注意到 IntelliSense，即 VS Code 和 TypeScript 语言服务器提供的智能代码补全和建议。下面你可以看到 `console` 的方法。

![IntelliSense](images/tutorial/intellisense.png)

当你选择一个方法时，你会得到参数帮助，并且始终可以获得悬停信息。

![parameter help](images/tutorial/parameter-help.png)

## tsconfig.json

到目前为止，在本教程中，你一直依赖 TypeScript 编译器的默认行为来编译 TypeScript 源代码。你可以通过添加一个 `tsconfig.json` 文件来修改 TypeScript 编译器选项，该文件定义了 TypeScript [项目设置](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)，例如[编译器选项](https://www.typescriptlang.org/docs/handbook/compiler-options.html)以及应包含的文件。

**重要提示**：在本教程的后续部分中，要使用 `tsconfig.json`，请在调用 `tsc` 时不指定输入文件。TypeScript 编译器会知道去查找你的 `tsconfig.json` 以获取项目设置和编译器选项。

添加一个简单的 `tsconfig.json`，设置编译到 ES5 并使用 **CommonJS** [模块](https://wiki.commonjs.org/wiki/Modules/1.0)。

```json
{
    "compilerOptions": {
        "target": "ES5",
        "module": "CommonJS"
    }
}
```

在编辑 `tsconfig.json` 时，IntelliSense（`kb(editor.action.triggerSuggest)`）会帮助你完成编辑。

![tsconfig.json IntelliSense](images/tutorial/tsconfig-intellisense.png)

默认情况下，如果未包含 `files` 属性，TypeScript 会包括当前文件夹及子文件夹中的所有 `.ts` 文件，因此我们不需要显式列出 `helloworld.ts`。

### 更改构建输出

将生成的 JavaScript 文件放在与 TypeScript 源代码相同的文件夹中，在较大项目中会很快变得混乱，因此你可以使用 `outDir` 属性为编译器指定输出目录。

```json
{
    "compilerOptions": {
        "target": "ES5",
        "module": "CommonJS",
        "outDir": "out"
    }
}
```

删除 `helloworld.js` 并运行不带选项的命令 `tsc`。你会看到 `helloworld.js` 现在被放置在 `out` 目录中。

请参阅[转译 TypeScript](/docs/typescript/typescript-transpiling.md) 以了解 TypeScript 语言服务的其他功能，以及如何使用任务直接从 VS Code 运行构建。

## 错误检查

TypeScript 通过强类型检查帮助你避免常见的编程错误。例如，如果你将一个数字赋值给 `message`，TypeScript 编译器会报错 **'error TS2322: Type '2' is not assignable to type 'string''**。你可以在 VS Code 的编辑器（带悬停信息的红色波浪线）和问题面板（`kb(workbench.actions.view.problems)`）中看到类型检查错误。`[ts]` 前缀让你知道此错误来自 TypeScript 语言服务。

![incorrect type error](images/tutorial/incorrect-type-error.png)

## 快速修复

TypeScript 语言服务拥有一套强大的诊断功能，用于查找常见的编码问题。例如，它可以分析你的源代码并检测不可达代码，这些代码会在编辑器中以灰色显示。如果你将鼠标悬停在源代码行上，会看到解释性悬停信息；如果你将光标放在该行上，会看到一个快速修复灯泡图标。

![unreachable code detected](images/tutorial/unreachable-code-detected.png)

点击灯泡图标或按下 `kb(editor.action.quickFix)` 会弹出快速修复菜单，你可以在其中选择**删除不可达代码**修复。

此外，**代码操作小组件：包含附近的快速修复**（`editor.codeActionWidget.includeNearbyQuickFixes`）是一项默认启用的设置，当你按下 `kb(editor.action.quickFix)`（命令 ID `editor.action.quickFix`）时，无论光标在该行的哪个位置，它都会激活该行中最接近的快速修复。

该命令会高亮显示将通过快速修复进行重构或修复的源代码。常规代码操作和非修复重构仍然可以在光标位置激活。

## 调试

VS Code 内置了对 TypeScript 调试的支持。为了支持 TypeScript 调试与正在执行的 JavaScript 代码配合使用，VS Code 依赖[源码映射](https://firefox-source-docs.mozilla.org/devtools-user/debugger/how_to/use_a_source_map/index.html)，使调试器能够在原始 TypeScript 源代码与运行的 JavaScript 之间进行映射。你可以在构建过程中通过在你的 `tsconfig.json` 中设置 `"sourceMap": true` 来创建源码映射。

```json
{
    "compilerOptions": {
        "target": "ES5",
        "module": "CommonJS",
        "outDir": "out",
        "sourceMap": true
    }
}
```

通过运行 `tsc` 重新构建，你现在应该在 `out` 目录中的 `helloworld.js` 旁边看到一个 `helloworld.js.map` 文件。

在编辑器中打开 `helloworld.ts`，按下 `kb(workbench.action.debug.start)`。如果你安装了其他调试器扩展，需要从下拉列表中选择 **Node.js**。

调试器将会启动一个会话，运行你的代码，并在调试控制台面板中显示"Hello World"消息。

![debug console output](images/tutorial/debug-console.png)

在 `helloworld.ts` 中，通过点击编辑器左侧的边距来设置断点。如果断点已设置，你会看到一个红色圆圈。再次按下 `kb(workbench.action.debug.start)`。当断点被命中时，执行将停止，你可以在**运行和调试**视图（`kb(workbench.view.debug)`）中查看变量值和调用堆栈等调试信息。

![debug breakpoint](images/tutorial/debug-breakpoint.png)

请参阅[调试 TypeScript](/docs/typescript/typescript-debugging.md) 以详细了解 VS Code 对 TypeScript 的内置调试支持，以及如何为你的项目场景配置调试器。

## 后续步骤

本教程简要介绍了如何使用 VS Code 进行 TypeScript 开发。继续阅读以了解有关使用 VS Code 的 TypeScript 编译和调试支持的更多信息：

* [转译 TypeScript](/docs/typescript/typescript-transpiling.md) - 使用 VS Code 强大的任务系统编译 TypeScript。
* [编辑 TypeScript](/docs/typescript/typescript-editing.md) - TypeScript 特有的编辑功能。
* [重构 TypeScript](/docs/typescript/typescript-refactoring.md) - TypeScript 语言服务提供的有用重构。
* [调试 TypeScript](/docs/typescript/typescript-debugging.md) - 为你的 TypeScript 项目配置调试器。

## 常见问题

### 无法启动程序，因为找不到相应的 JavaScript

你可能没有在你的 `tsconfig.json` 中设置 `"sourceMap": true`，并且 VS Code 的 Node.js 调试器无法将你的 TypeScript 源代码映射到运行的 JavaScript。请打开源码映射并重新构建你的项目。
