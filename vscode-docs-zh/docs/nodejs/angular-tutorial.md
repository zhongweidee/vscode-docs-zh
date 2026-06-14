---
ContentId: f6b7b0c2-ccbe-4e5f-8f2e-6c1ecea52f69
DateApproved: 6/10/2026
MetaDescription: Angular TypeScript 教程，演示 Visual Studio Code 编辑器中的智能感知、调试和代码导航支持。
MetaSocialImage: images/angular/Welcome-to-app.png
---
# 在 Visual Studio Code 中使用 Angular

[Angular](https://angular.io/) 是一个流行的网络开发平台，由 Google 开发和维护。Angular 使用 [TypeScript](/docs/languages/typescript.md) 作为其主要编程语言。Visual Studio Code 开箱即支持 TypeScript 智能感知和代码导航，因此你无需安装任何其他扩展即可进行 Angular 开发。

![Welcome to app](images/angular/Welcome-to-app.png)

>**注意**：为了帮助你开始 Angular 开发，你可以使用 [Angular 配置文件模板](/docs/configure/profiles.md#angular-profile-template)，其中包含有用的扩展、设置和代码片段。

## 欢迎来到 Angular

本教程我们将使用 [Angular CLI](https://cli.angular.io/)。要安装和使用命令行界面以及运行 Angular 应用程序服务器，你需要安装 [Node.js](https://nodejs.org/) JavaScript 运行时和 [npm](https://www.npmjs.com/)（Node.js 包管理器）。npm 包含在 Node.js 中，你可以从 [Node.js 下载页面](https://nodejs.org/en/download/) 安装。

>**提示**：要测试你是否在计算机上正确安装了 Node.js 和 npm，你可以键入 `node --version` 和 `npm --version`。

要安装 Angular CLI，请在终端或命令提示符中键入：

```bash
npm install -g @angular/cli
```

这可能需要几分钟来完成安装。你现在可以通过键入以下命令来创建一个新的 Angular 应用程序：

```bash
ng new my-app
```

`my-app` 是应用程序的文件夹名称。`ng new` 命令会提示你为生成的应用程序选择选项。按 `kbstyle(Enter)` 键接受默认设置。这可能需要几分钟来创建 [TypeScript](/docs/languages/typescript.md) Angular 应用程序并安装其依赖项。

让我们快速运行 Angular 应用程序，导航到新文件夹并键入 `ng serve` 来启动网络服务器并在浏览器中打开应用程序：

```bash
cd my-app
ng serve
```

你应该在浏览器的 [http://localhost:4200](http://localhost:4200) 上看到 "Welcome to app!!"。我们将在通过 VS Code 查看应用程序的同时保持网络服务器运行。

要在 VS Code 中打开你的 Angular 应用程序，请打开另一个终端（或命令提示符），导航到 `my-app` 文件夹并键入 `code .`：

```bash
cd my-app
code .
```

### 语法高亮和括号匹配

现在展开 `src\app` 文件夹并选择 `app.component.ts` 文件。你会注意到 VS Code 对各种源代码元素具有语法高亮，并且如果你将光标放在括号上，匹配的括号也会被选中。

![angular bracket matching](images/angular/bracket-matching.png)

### 智能感知

当你将鼠标悬停在文件中的文本上时，你会看到 VS Code 为你提供有关源代码中关键项的信息。变量、类和 Angular 装饰器等项目是你会获得此类信息的几个例子。

![angular decorator hover](images/angular/decorator-hover.png)

当你在 `app.component.ts` 中开始键入时，你会看到智能建议和代码片段。

![angular suggestions](images/angular/suggestions.png)

你可以点击信息按钮（`i`）来查看包含更多文档的弹出窗口。

![angular intellisense](images/angular/intellisense.png)

VS Code 使用 TypeScript 语言服务来实现代码智能（[智能感知](/docs/editing/intellisense.md)），并且它具有一个名为 [自动类型获取](/docs/nodejs/working-with-javascript.md#typings-and-automatic-type-acquisition)（ATA）的功能。ATA 会为 `package.json` 中引用的 npm 模块下载 npm Type 声明文件（`*.d.ts`）。

### 转到定义、速览定义

通过 TypeScript 语言服务，VS Code 还可以通过 **转到定义**（`kb(editor.action.revealDefinition)`）或 **速览定义**（`kb(editor.action.peekDefinition)`）在编辑器中提供类型定义信息。打开 `app.module.ts` 文件，将光标放在 `bootstrap` 属性声明中的 `AppComponent` 上，右键单击并选择 **速览定义**。一个 [速览窗口](/docs/editing/editingevolved.md#peek) 将打开，显示来自 `app.component.ts` 的 `AppComponent` 定义。

![angular peek definition](images/angular/peek-definition.png)

按 `kbstyle(Escape)` 关闭速览窗口。

## Hello World

让我们将示例应用程序更新为 "Hello World"。回到 `app.component.ts` 文件，将 `AppComponent` 中的 `title` 字符串更改为 "Hello World"。

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hello World';
}
```

一旦你保存了 `app.component.ts` 文件，正在运行的服务器实例将更新网页，你将看到 "Welcome to Hello World!!"。

>**提示**：VS Code 支持自动保存，默认情况下会在延迟后保存你的文件。在 **文件** 菜单中勾选 **自动保存** 选项以启用自动保存，或直接配置 `files.autoSave` 用户 [设置](/docs/configure/settings.md)。

![hello world](images/angular/hello-world.png)

## 调试 Angular

要调试客户端 Angular 代码，我们将使用内置的 JavaScript 调试器。

>注意：本教程假设你已经安装了 Edge 浏览器。如果你想使用 Chrome 进行调试，请将启动 `type` 替换为 `chrome`。还有一个用于 [Firefox](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-firefox-debug) 浏览器的调试器。

### 设置断点

要在 `app.component.ts` 中设置断点，请单击行号左侧的装订线区域。这将设置一个断点，显示为一个红色圆圈。

![set a breakpoint](images/angular/breakpoint.png)

### 配置调试器

我们需要首先配置 [调试器](/docs/debugtest/debugging.md)。为此，请转到 **运行和调试** 视图（`kb(workbench.view.debug)`），选择 **创建 launch.json 文件** 链接以创建 `launch.json` 调试器配置文件。从 **选择调试器** 下拉列表中选择 **Web App（Edge）**。这将在项目的 `.vscode` 新文件夹中创建一个 `launch.json` 文件，其中包含启动网站的配置。

我们需要针对我们的示例做一项更改：将 `url` 的端口从 `8080` 更改为 `4200`。你的 `launch.json` 应该如下所示：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "msedge",
            "request": "launch",
            "name": "Launch Edge against localhost",
            "url": "http://localhost:4200",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

按 `kb(workbench.action.debug.start)` 或绿色箭头启动调试器并打开一个新的浏览器实例。设置断点的源代码在调试器附加之前就在启动时运行了，因此我们需要刷新网页才能触发断点。刷新页面，你应该会触发你的断点。

![hit breakpoint](images/angular/hit-breakpoint.png)

你可以逐步执行源代码（`kb(workbench.action.debug.stepOver)`）、检查变量（如 `AppComponent`），以及查看客户端 Angular 应用程序的调用堆栈。

![debug variable](images/angular/debug-variable.png)

有关调试器及其可用选项的更多信息，请查看我们的 [浏览器调试](/docs/nodejs/browser-debugging.md) 文档。

## Angular 配置文件模板

[配置文件](https://code.visualstudio.com/docs/configure/profiles) 可让你根据当前项目或任务快速切换扩展、设置和用户界面布局。为了帮助你开始 Angular 开发，你可以使用 [Angular 配置文件模板](/docs/configure/profiles.md#angular-profile-template)，这是一个精选的配置文件，包含有用的扩展和设置。你可以直接使用该配置文件模板，也可以将其作为起点，根据个人工作流程进一步自定义。

你通过 **配置文件** > **创建配置文件...** 下拉菜单选择配置文件模板：

![Create Profile dropdown with profile templates](images/angular/profile-template-dropdown.png)

选择配置文件模板后，你可以查看设置和扩展，如果不想包含某些项目，可以逐个移除以将它们排除在新配置文件之外。基于模板创建新配置文件后，对设置、扩展或用户界面的更改将持久保存在你的配置文件中。

## 流行的入门套件

在本教程中，我们使用了 Angular CLI 来创建一个简单的 Angular 应用程序。还有很多优秀的示例和入门套件可用于帮助你构建你的第一个 Angular 应用程序。

### Recipes

VS Code 团队创建了 [recipes](https://github.com/microsoft/vscode-recipes) 来涵盖更复杂的调试场景。在那里你会找到 [使用 Angular CLI 进行调试](https://github.com/microsoft/vscode-recipes/tree/main/Angular-CLI) 的配方，该配方同样使用 Angular CLI，并详细介绍了如何调试生成项目的单元测试。

### MEAN 入门套件

如果你想查看一个完整的 MEAN（MongoDB、Express、Angular、Node.js）技术栈示例，请查看 [MEAN.JS](https://meanjs.org)。他们提供了文档和一个用于示例 MEAN 项目的应用程序生成器。你需要安装并启动 [MongoDB](https://docs.mongodb.com/v3.0/installation/)，但很快你就能运行一个 MEAN 应用程序。VS Code 还通过 [Azure 数据库](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb) 扩展提供了出色的 [MongoDB 支持](/docs/azure/mongodb.md)。

### React

[React](https://reactjs.org) 是一个用于构建用户界面的库，它比 Angular 更加精简。如果你想查看 React 与 VS Code 配合使用的示例，请查看 [在 VS Code 中使用 React](/docs/nodejs/reactjs-tutorial.md) 教程。它将指导你创建一个 React 应用程序并为 JavaScript 调试器配置 `launch.json` 文件。

## Angular 扩展

除了 VS Code 内置的功能之外，你还可以安装 VS Code 扩展以获得更强大的功能。

<div class="marketplace-extensions-angular-curated"></div>

点击上面的扩展磁贴以阅读 [市场](https://marketplace.visualstudio.com) 上的描述和评价。

要查找其他 Angular 扩展，请打开扩展视图（`kb(workbench.view.extensions)`）并键入 'angular' 以查看经过筛选的 Angular 扩展列表。

![angular extensions](images/angular/angular-extensions.png)

社区还创建了"扩展包"，将有用的扩展（例如 linter、调试器和代码片段）打包到一个下载中。要查看可用的 Angular 扩展包，请在筛选条件中添加 "extension packs" 类别（angular @category:"extension packs"）。
