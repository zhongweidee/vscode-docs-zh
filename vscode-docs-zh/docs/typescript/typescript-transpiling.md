---
ContentId: 59543856-da91-4a0d-9a98-9d5f2bf70c71
DateApproved: 6/10/2026
MetaDescription: 了解如何使用 Visual Studio Code 进行 TypeScript 转译。
---
# TypeScript 转译

[TypeScript](https://www.typescriptlang.org) 是 JavaScript 的类型化超集，可转译为纯 JavaScript。它提供了类、模块和接口，帮助你构建健壮的组件。

## 安装 TypeScript 编译器

Visual Studio Code 内置了 TypeScript 语言支持，但不包含 TypeScript 编译器 `tsc`。你需要全局或在工作区中安装 TypeScript 编译器，才能将 TypeScript 源代码转译为 JavaScript（`tsc HelloWorld.ts`）。

安装 TypeScript 最简单的方法是通过 npm（即 [Node.js 包管理器](https://www.npmjs.com/)）。如果你已安装 npm，可以通过以下命令在计算机上全局（`-g`）安装 TypeScript：

```bash
npm install -g typescript
```

你可以通过检查版本或帮助信息来测试安装是否成功。

```bash
tsc --version
tsc --help
```

另一种选择是在项目中本地安装 TypeScript 编译器（`npm install --save-dev typescript`），这样做的好处是可以避免与你可能拥有的其他 TypeScript 项目产生交互影响。

### 编译器与语言服务

需要记住的重要一点是，VS Code 的 TypeScript 语言服务与你安装的 TypeScript 编译器是分开的。当你打开一个 TypeScript 文件时，可以在状态栏的语言状态项中看到 VS Code 的 TypeScript 版本。

![TypeScript version displayed in the language status in the Status Bar.](images/compiling/version-status-bar.png)

> [!TIP]
> 你可以使用_固定_图标将 TypeScript 版本固定到状态栏上。

在本文的后面部分，我们将讨论如何[更改](#使用较新版本的-typescript)VS Code 使用的 TypeScript 语言服务版本。

## tsconfig.json

通常，任何新的 TypeScript 项目的第一步是添加 `tsconfig.json` 文件。`tsconfig.json` 文件定义了 TypeScript [项目设置](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)，例如编译器选项和应包含的文件。为此，打开你想要存放源代码的文件夹，并添加一个名为 `tsconfig.json` 的新文件。在这个文件里，IntelliSense（`kb(editor.action.triggerSuggest)`）会一路帮助你。

![tsconfig.json IntelliSense](images/compiling/tsconfigintellisense.png)

一个简单的 `tsconfig.json` 示例如下，面向 ES5、**CommonJS** [模块](https://wiki.commonjs.org/wiki/Modules/1.0)和 source map：

```json
{
    "compilerOptions": {
        "target": "ES5",
        "module": "CommonJS",
        "sourceMap": true
    }
}
```

现在，当你创建作为项目一部分的 `.ts` 文件时，我们将提供丰富的编辑体验和语法验证。

## 将 TypeScript 转译为 JavaScript

VS Code 通过我们的集成[任务运行器](/docs/debugtest/tasks.md)与 `tsc` 集成。我们可以使用它将 `.ts` 文件转译为 `.js` 文件。使用 VS Code 任务的另一个好处是，你可以在[问题](/docs/editing/editingevolved.md#errors-warnings)面板中获得集成的错误和警告检测。让我们逐步完成一个简单的 TypeScript Hello World 程序的转译。

### 步骤 1：创建一个简单的 TS 文件

在一个空文件夹中打开 VS Code，创建一个 `helloworld.ts` 文件，并将以下代码放入该文件：

```typescript
let message : string = "Hello World";
console.log(message);
```

要测试你已正确安装 TypeScript 编译器 `tsc` 且 Hello World 程序可以工作，请打开终端并输入 `tsc helloworld.ts`。你可以直接在 VS Code 中使用集成终端（`kb(workbench.action.terminal.toggleTerminal)`）。

你现在应该能看到转译后的 `helloworld.js` JavaScript 文件，如果你安装了 [Node.js](https://nodejs.org)，可以通过输入 `node helloworld.js` 来运行它。

![build and run Hello World](images/compiling/build-hello-world.png)

### 步骤 2：运行 TypeScript 构建

从全局**终端**菜单中执行**运行生成任务**（`kb(workbench.action.tasks.build)`）。如果你在上一节中创建了 `tsconfig.json` 文件，应该会出现以下选择器：

![TypeScript Build](images/compiling/typescript-build.png)

选择 **tsc: build** 条目。这将在工作区中生成 `HelloWorld.js` 和 `HelloWorld.js.map` 文件。

如果你选择了 **tsc: watch**，TypeScript 编译器会监视你 TypeScript 文件的更改，并在每次更改时运行转译器。

在底层，我们将 TypeScript 编译器作为任务运行。我们使用的命令是：`tsc -p .`

### 步骤 3：将 TypeScript 构建设为默认

你还可以将 TypeScript 构建任务定义为默认构建任务，这样在触发**运行生成任务**（`kb(workbench.action.tasks.build)`）时会直接执行它。为此，从全局**终端**菜单中选择**配置默认生成任务**。这会显示一个包含可用构建任务的选择器。选择 TypeScript **tsc: build**，它将在 `.vscode` 文件夹中生成以下 `tasks.json` 文件：

```ts
{
    // 有关 tasks.json 格式的文档，
    // 请参阅 https://go.microsoft.com/fwlink/?LinkId=733558
    "version": "2.0.0",
    "tasks": [
        {
            "type": "typescript",
            "tsconfig": "tsconfig.json",
            "problemMatcher": [
                "$tsc"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```

请注意，该任务有一个 `group` JSON 对象，将任务的 `kind` 设置为 `build` 并将其设为默认。现在，当你选择**运行生成任务**命令或按（`kb(workbench.action.tasks.build)`）时，系统不会再提示你选择任务，编译会直接开始。

> **提示：** 你还可以使用 VS Code 的运行/调试功能来运行程序。有关在 VS Code 中运行和调试 Node.js 应用程序的详细信息，请参阅 [Node.js 教程](/docs/nodejs/nodejs-tutorial.md#debug-your-express-app)

### 步骤 4：审查构建问题

VS Code 任务系统还可以通过[问题匹配器](/docs/debugtest/tasks.md#defining-a-problem-matcher)检测构建问题。问题匹配器根据特定的构建工具解析构建输出，并提供集成的问显示和导航功能。VS Code 附带了许多问题匹配器，上面 `tasks.json` 中看到的 `$tsc` 就是用于 TypeScript 编译器输出的问题匹配器。

例如，如果我们的 TypeScript 文件中有一个简单的错误（`console.log` 中多了个 'g'），我们可能会从 `tsc` 得到以下输出：

    HelloWorld.ts(3,17): error TS2339: Property 'logg' does not exist on type 'Console'.

这会显示在终端面板（`kb(workbench.action.terminal.toggleTerminal)`）中，并在终端视图下拉菜单中选择 **Tasks - build tsconfig.json**。

你可以在状态栏中看到错误和警告计数。点击错误和警告图标可以获取问题列表并导航到它们。

![Error in Status Bar](images/compiling/error-status-bar.png)

你还可以使用键盘打开列表 `kb(workbench.actions.view.problems)`。

>**提示：** 任务对许多操作提供了丰富的支持。有关如何配置任务的更多信息，请参阅[任务](/docs/debugtest/tasks.md)主题。

## JavaScript source map 支持

TypeScript 调试支持 JavaScript source map。要为你的 TypeScript 文件生成 source map，请使用 `--sourcemap` 选项编译，或将 `tsconfig.json` 文件中的 `sourceMap` 属性设置为 `true`。

内联 source map（即内容存储为 data URL 而非单独文件的 source map）也受支持，但内联源代码尚不受支持。

## 生成文件的输出位置

将生成的 JavaScript 文件放在与 TypeScript 源文件相同的文件夹中，在较大的项目中很快就会变得混乱。你可以使用 `outDir` 属性为编译器指定输出目录。

```json
{
    "compilerOptions": {
        "target": "ES5",
        "module": "CommonJS",
        "outDir": "out"
    }
}
```

## 隐藏生成的 JavaScript 文件

在处理 TypeScript 时，你通常不希望文件资源管理器或搜索结果中显示生成的 JavaScript 文件。VS Code 通过 `files.exclude` [工作区设置](/docs/configure/settings.md)提供了过滤功能，你可以轻松创建一个表达式来隐藏这些生成的文件：

`**/*.js: { "when": "$(basename).ts" }`

此模式将匹配任何 JavaScript 文件（`**/*.js`），但仅当存在同名的同级 TypeScript 文件时。如果 JavaScript 编译到同一位置，文件资源管理器将不再显示生成的 JavaScript 资源。

![Hiding derived resources](images/compiling/hidingDerivedBefore.png) ![Hiding derived resources](images/compiling/hidingDerivedAfter.png)

在工作区根目录的 `.vscode` 文件夹中的 `settings.json` 文件里添加带过滤条件的 `files.exclude` 设置。你可以通过命令面板（`kb(workbench.action.showCommands)`）中的 **Preferences: Open Workspace Settings (JSON)** 命令打开工作区 `settings.json`。

要排除从 `.ts` 和 `.tsx` 源文件生成的 JavaScript 文件，请使用以下表达式：

```json
"files.exclude": {
    "**/*.js": { "when": "$(basename).ts" },
    "**/**.js": { "when": "$(basename).tsx" }
}
```

这有一点技巧。搜索[glob 模式](/docs/editor/glob-patterns.md)被用作键。上述设置使用两个不同的 glob 模式来提供两个唯一的键，但搜索仍会匹配相同的文件。

## 使用较新版本的 TypeScript

VS Code 附带了一个近期稳定版本的 TypeScript 语言服务，并默认使用它在工作区中提供 IntelliSense。工作区中的 TypeScript 版本与你用于编译 `*.ts` 文件的 TypeScript 版本是独立的。在大多数常见情况下，你可以放心地直接使用 VS Code 内置的 TypeScript 版本进行 IntelliSense，但有时你可能需要更改 VS Code 用于 IntelliSense 的 TypeScript 版本。

这样做原因包括：

* 通过切换到 TypeScript 每夜构建版本（`typescript@next`）来尝试最新的 TypeScript 功能。
* 确保你用于 IntelliSense 的 TypeScript 版本与用于编译代码的版本一致。

活动的 TypeScript 版本及其安装位置可以显示在状态栏中。选择状态栏中的语言栏项（`{ }`），然后选择 TypeScript 版本的固定图标，让它保持在状态栏中可见。

![TypeScript status bar version](images/compiling/status-bar-version-v2.png)

如果你想更改工作区中 TypeScript 的默认版本，有几种选择：

### 使用工作区版本的 TypeScript

如果你的工作区有特定的 TypeScript 版本，你可以通过打开一个 TypeScript 或 JavaScript 文件并点击状态栏中的 TypeScript 版本号，在工作区版本的 TypeScript 和 VS Code 默认使用的版本之间切换。系统将弹出一个消息框，询问你应该使用哪个版本的 TypeScript：

![TypeScript version selector](images/compiling/select-ts-version-message.png)

使用此功能可以在 VS Code 自带的 TypeScript 版本和工作区中的 TypeScript 版本之间切换。你还可以通过 **TypeScript: Select TypeScript Version** 命令触发 TypeScript 版本选择器。

VS Code 会自动检测工作区根目录 `node_modules` 下安装的工作区 TypeScript 版本。你也可以通过在用户或工作区[设置](/docs/configure/settings.md)中配置 `js/ts.tsdk.path` 来明确告诉 VS Code 使用哪个版本的 TypeScript。`js/ts.tsdk.path` 设置应指向包含 TypeScript `tsserver.js` 文件的目录。你可以使用 `npm list -g typescript` 查找 TypeScript 的安装位置。`tsserver.js` 文件通常位于 `lib` 文件夹中。

例如：

```json
{
   "js/ts.tsdk.path": "/usr/local/lib/node_modules/typescript/lib"
}
```

>**提示：** 要获取特定的 TypeScript 版本，请在 npm install 时指定 `@version`。例如，对于 TypeScript 3.6.0，你可以使用 `npm install --save-dev typescript@3.6.0`。要预览下一个 TypeScript 版本，请运行 `npm install --save-dev typescript@next`。

请注意，虽然上面的示例中 `js/ts.tsdk.path` 指向 `typescript` 内部的 `lib` 目录，但 `typescript` 目录必须是一个完整的 TypeScript 安装，包含 TypeScript 的 `package.json` 文件。

你还可以通过在特定工作区中添加指向 `tsserver.js` 文件目录的 `js/ts.tsdk.path` 工作区设置，来告诉 VS Code 在该工作区中使用特定版本的 TypeScript：

```json
{
   "js/ts.tsdk.path": "./node_modules/typescript/lib"
}
```

`js/ts.tsdk.path` 工作区设置仅告诉 VS Code 存在工作区版本的 TypeScript。要实际开始使用工作区版本进行 IntelliSense，你必须运行 **TypeScript: Select TypeScript Version** 命令并选择工作区版本。

### 使用 TypeScript 每夜构建版本

在 VS Code 中尝试最新 TypeScript 功能的最简单方法是安装 [JavaScript and TypeScript Nightly 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)。

此扩展自动将 VS Code 内置的 TypeScript 版本替换为最新的 TypeScript 每夜构建版本。需要注意的是，如果你之前通过 **TypeScript: Select TypeScript Version** 命令配置了 TypeScript 版本，请确保[切换回使用 VS Code 的 TypeScript 版本](#使用工作区版本的-typescript)。

## 混合 TypeScript 和 JavaScript 项目

可以拥有混合的 TypeScript 和 JavaScript 项目。要在 TypeScript 项目中启用 JavaScript，可以在 `tsconfig.json` 中将 `allowJs` 属性设置为 `true`。

>**提示：** `tsc` 编译器不会自动检测 `jsconfig.json` 文件的存在。使用 `–p` 参数让 `tsc` 使用你的 `jsconfig.json` 文件，例如 `tsc -p jsconfig.json`。

## 处理大型项目

如果你在一个拥有数百或数千个 TypeScript 文件的代码库中工作，以下是一些可以改善 VS Code 编辑体验以及命令行编译时间的步骤。

### 确保你的 tsconfig 只包含你关心的文件

在项目的 `tsconfig.json` 中使用 `include` 或 `files`，确保项目只包含应属于该项目的文件。

[更多信息](https://github.com/microsoft/TypeScript/wiki/Performance#configuring-tsconfigjson-or-jsconfigjson)请参阅关于配置项目 `tsconfig.json` 的文档。

### 使用项目引用拆分项目

与其将源代码组织为单个大型项目，不如使用[项目引用](https://www.typescriptlang.org/docs/handbook/project-references.html)将其拆分为较小的项目，以提高性能。这使 TypeScript 能够一次只加载代码库的一个子集，而不是加载整个代码库。

有关如何使用项目引用以及使用它们的最佳实践，请参阅 [TypeScript 文档](https://www.typescriptlang.org/docs/handbook/project-references.html)。

## 下一步

继续阅读以下内容：

* [编辑 TypeScript](/docs/typescript/typescript-editing.md) - TypeScript 的特定编辑功能。
* [重构 TypeScript](/docs/typescript/typescript-refactoring.md) - TypeScript 语言服务提供的有用重构。
* [调试 TypeScript](/docs/typescript/typescript-debugging.md) - 为你的 TypeScript 项目配置调试器。

## 常见问题

### 如何解决 TypeScript "Cannot compile external module" 错误？

如果你遇到该错误，可以通过在项目根文件夹中创建一个 `tsconfig.json` 文件来解决。tsconfig.json 文件可以让你控制 Visual Studio Code 如何编译你的 TypeScript 代码。更多信息，请参阅 [tsconfig.json 概述](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)。

### 为什么我在 VS Code 中看到的错误和警告与编译 TypeScript 项目时不同？

VS Code 附带了一个近期稳定版本的 TypeScript 语言服务，它可能与你在计算机上全局安装的或工作区中本地安装的 TypeScript 版本不匹配。因此，你可能会看到编译器输出与活动的 TypeScript 语言服务检测到的错误之间存在差异。有关安装匹配 TypeScript 版本的详细信息，请参阅[使用较新版本的 TypeScript](#使用较新版本的-typescript)。

### 我可以使用 VS 2022 自带的 TypeScript 版本吗？

不可以，Visual Studio 2019 和 2022 附带的 TypeScript 语言服务与 VS Code 不兼容。你需要从 [npm](https://www.npmjs.com/package/typescript) 安装一个单独的 TypeScript 版本。

### 为什么有些错误报告为警告？

默认情况下，VS Code TypeScript 将代码风格问题显示为警告而非错误。这适用于：

* 变量已声明但从未使用
* 属性已声明但其值从未被读取
* 检测到不可达代码
* 未使用的标签
* switch 中的 case 穿透
* 并非所有代码路径都返回值

将这些视为警告与其他工具（如 TSLint）一致。当你从命令行运行 `tsc` 时，这些问题仍将显示为错误。

你可以通过在用户[设置](/docs/configure/settings.md)中设置 `"js/ts.reportStyleChecksAsWarnings": false` 来禁用此行为。
