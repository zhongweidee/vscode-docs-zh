---
ContentId: 2dd2eeff-2eb3-4a0c-a59d-ea9a0b10c468
DateApproved: 6/10/2026
MetaDescription: React JavaScript 教程，展示 Visual Studio Code 编辑器中的 IntelliSense、调试和代码导航支持。
---
# 在 Visual Studio Code 中使用 React

[React](https://reactjs.org) 是由 Facebook 开发的一个流行的 JavaScript 库，用于构建用户界面。Visual Studio Code 编辑器开箱即用地支持 React.js 的 IntelliSense 和代码导航。

![Welcome to React](images/reactjs/welcome-to-react.png)

## 欢迎使用 React

> [!IMPORTANT]
> `create-react-app` [已不再积极维护](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)。React 团队现在推荐使用像 [Vite](https://vite.dev) (`npm create vite@latest my-app -- --template react`) 或 [Next.js](https://nextjs.org) 这样的框架。本教程中的步骤仍然适用于任何 React 项目设置。

在本教程中，我们将使用 `create-react-app` [生成器](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)。要使用该生成器以及运行 React 应用程序服务器，你需要安装 [Node.js](https://nodejs.org/) JavaScript 运行时和 [npm](https://www.npmjs.com/)（Node.js 包管理器）。npm 包含在 Node.js 中，你可以从 [Node.js 下载页面](https://nodejs.org/en/download/) 下载安装。

> **提示**：要测试你的计算机上是否正确安装了 Node.js 和 npm，你可以在终端或命令提示符中输入 `node --version` 和 `npm --version`。

现在你可以通过输入以下命令来创建一个新的 React 应用程序：

```bash
npx create-react-app my-app
```

其中 `my-app` 是应用程序的文件夹名称。创建 React 应用程序并安装其依赖项可能需要几分钟时间。

>**注意**：如果你之前通过 `npm install -g create-react-app` 全局安装了 `create-react-app`，我们建议你使用 `npm uninstall -g create-react-app` 卸载该包，以确保 npx 始终使用最新版本。

让我们快速运行 React 应用程序，导航到新文件夹并输入 `npm start` 来启动 Web 服务器并在浏览器中打开应用程序：

```bash
cd my-app
npm start
```

<!-- TBD mention yarn and link -->

你应该会在浏览器中的 [http://localhost:3000](http://localhost:3000) 上看到 React 徽标和一个指向"Learn React"的链接。我们将保持 Web 服务器运行，同时使用 VS Code 查看应用程序。

要在 VS Code 中打开你的 React 应用程序，请打开另一个终端或命令提示符窗口，导航到 `my-app` 文件夹并输入 `code .`：

```bash
cd my-app
code .
```

### Markdown 预览

在文件资源管理器中，你会看到应用程序的 `README.md` Markdown 文件。这个文件包含了许多关于应用程序和 React 的有用信息。查看 README 的一个好方法是使用 VS Code 的 [Markdown 预览](/docs/languages/markdown.md#markdown-preview)。你可以在当前编辑器组中打开预览（**Markdown: 打开预览** `kb(markdown.togglePreview)`）或在侧边的新编辑器组中打开预览（**Markdown: 在侧边打开预览** `kb(markdown.showPreviewToSide)`）。你将获得良好的格式、标题超链接导航以及代码块中的语法高亮显示。

![README Markdown Preview](images/reactjs/markdown-preview.png)

### 语法高亮和括号匹配

现在展开 `src` 文件夹并选择 `index.js` 文件。你会注意到 VS Code 对各种源代码元素都有语法高亮，并且如果你将光标放在圆括号上，匹配的括号也会被选中。

![React bracket matching](images/reactjs/bracket-matching.png)

### IntelliSense

当你在 `index.js` 中开始输入时，你会看到智能建议或自动补全。

![React IntelliSense suggestions](images/reactjs/suggestions.png)

选择建议并输入 `.` 后，你可以通过 [IntelliSense](/docs/editing/intellisense.md) 查看对象上的类型和方法。

![React IntelliSense](images/reactjs/intellisense.png)

VS Code 使用 TypeScript 语言服务进行 JavaScript 代码智能分析，并且它有一个名为 [自动类型获取](/docs/nodejs/working-with-javascript.md#typings-and-automatic-type-acquisition) (ATA) 的功能。ATA 会下载 `package.json` 中引用的 npm 模块的 npm 类型声明文件（`*.d.ts`）。

如果你选择一个方法，你还会获得参数帮助：

![React parameter help](images/reactjs/parameter-help.png)

### 转到定义、速览定义

通过 TypeScript 语言服务，VS Code 还可以通过 **转到定义** (`kb(editor.action.revealDefinition)`) 或 **速览定义** (`kb(editor.action.peekDefinition)`) 在编辑器中提供类型定义信息。将光标放在 `App` 上，右键单击并选择 **速览定义**。一个 [速览窗口](/docs/editing/editingevolved.md#peek) 将打开，显示来自 `App.js` 的 `App` 定义。

![React Peek definition](images/reactjs/peek-definition.png)

按 `kbstyle(Escape)` 关闭速览窗口。

## Hello World

让我们将示例应用程序更新为"Hello World!"。在 `index.js` 中创建一个名为 `HelloWorld` 的组件，其中包含一个显示"Hello, world!"的 H1 标题，并将 `root.render` 中的 `<App />` 标签替换为 `<HelloWorld />`。

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function HelloWorld() {
  return <h1 className="greeting">Hello, world!</h1>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelloWorld />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

保存 `index.js` 文件后，正在运行的服务器实例将更新网页，当你刷新浏览器时，你将看到"Hello World!"。

>**提示**：VS Code 支持自动保存，默认情况下会在延迟后保存你的文件。在 **文件** 菜单中勾选 **自动保存** 选项来开启自动保存，或直接配置 `files.autoSave` 用户 [设置](/docs/configure/settings.md)。

![Hello, world](images/reactjs/hello-world.png)

## 调试 React

要调试客户端 React 代码，我们将使用内置的 JavaScript 调试器。

>注意：本教程假设你已安装 Edge 浏览器。如果你想使用 Chrome 进行调试，请将启动 `type` 替换为 `chrome`。还有用于 [Firefox](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-firefox-debug) 浏览器的调试器。

### 设置断点

要在 `index.js` 中设置断点，请单击行号左侧的装订线。这将设置一个断点，显示为红色圆圈。

![Set a breakpoint](images/reactjs/breakpoint.png)

### 配置调试器

我们需要先配置 [调试器](/docs/debugtest/debugging.md)。为此，转到 **运行和调试** 视图 (`kb(workbench.view.debug)`) 并选择 **创建 launch.json 文件** 链接来创建 `launch.json` 调试器配置文件。从 **选择调试器** 下拉列表中选择 **Web App (Edge)**。这将在项目中创建一个新的 `.vscode` 文件夹，其中包含一个用于启动网站的配置的 `launch.json` 文件。

对于我们的示例，我们需要做一处更改：将 `url` 的端口从 `8080` 更改为 `3000`。你的 `launch.json` 应该如下所示：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "msedge",
            "request": "launch",
            "name": "Launch Edge against localhost",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

确保你的开发服务器正在运行（`npm start`）。然后按 `kb(workbench.action.debug.start)` 或绿色箭头启动调试器并打开一个新的浏览器实例。设置断点的源代码在调试器附加之前在启动时运行，因此我们在刷新网页之前不会触发断点。刷新页面，你应该会触发断点。

![Debugger hitting breakpoint](images/reactjs/hit-breakpoint.png)

你可以逐步执行源代码 (`kb(workbench.action.debug.stepOver)`)，检查诸如 `HelloWorld` 等变量，并查看客户端 React 应用程序的调用堆栈。

![Debug element variable](images/reactjs/debug-variable.png)

有关调试器及其可用选项的更多信息，请查看我们关于 [浏览器调试](/docs/nodejs/browser-debugging.md) 的文档。

### 实时编辑和调试

如果你将 [webpack](https://webpack.js.org/) 与 React 应用程序一起使用，你可以通过利用 webpack 的 HMR 机制获得更高效的工作流，该机制使你能够直接从 VS Code 进行实时编辑和调试。你可以在 [Live edit and debug your React apps directly from VS Code](https://medium.com/@auchenberg/live-edit-and-debug-your-react-apps-directly-from-vs-code-without-leaving-the-editor-3da489ed905f) 博客文章和 [webpack 热模块替换文档](https://webpack.js.org/concepts/hot-module-replacement/) 中了解更多信息。

## 代码检查

代码检查工具会分析你的源代码，并可以在你运行应用程序之前就潜在问题发出警告。VS Code 内置的 JavaScript 语言服务默认支持语法错误检查，你可以在 **问题** 面板（**查看** > **问题** `kb(workbench.actions.view.problems)`）中看到它的实际效果。

尝试在你的 React 源代码中制造一个小错误，你会看到红色波浪线和 **问题** 面板中的错误。

![JavaScript error](images/reactjs/js-error.png)

代码检查工具可以提供更复杂的分析，强制执行编码规范并检测反面模式。一个流行的 JavaScript 代码检查工具是 [ESLint](https://eslint.org/)。将 ESLint 与 ESLint VS Code [扩展](https://marketplace.visualstudio.com/items/dbaeumer.vscode-eslint) 结合使用，可以提供出色的产品内代码检查体验。

首先，安装 ESLint 命令行工具：

```bash
npm install -g eslint
```

然后通过转到 **扩展** 视图并输入 'eslint' 来安装 ESLint 扩展。

![ESLint extension](images/reactjs/eslint-extension.png)

安装 ESLint 扩展并重新加载 VS Code 后，你需要创建一个 ESLint 配置文件 `.eslintrc.js`。你可以使用扩展的 **ESLint: 创建 ESLint 配置** 命令从 **命令面板** (`kb(workbench.action.showCommands)`) 创建。

![Find the configuration command](images/reactjs/create-eslintrc.png)

该命令将提示你在 **终端** 面板中回答一系列问题。接受默认值，它将在项目根目录中创建一个类似于以下的 `.eslintrc.js` 文件：

```js
module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
};
```

ESLint 现在将分析打开的文件，并在 `index.js` 中显示关于 'App' 被定义但从未使用的警告。

![App is unused](images/reactjs/app-is-unused.png)

你可以在 `.eslintrc.js` 文件中修改 ESLint [规则](https://eslint.org/docs/rules/)。

让我们为多余的分号添加一个错误规则：

```js
 "rules": {
        "no-extra-semi":"error"
    }
```

现在，当你在一行中错误地使用了多个分号时，你会在编辑器中看到一个错误（红色波浪线），并在 **问题** 面板中看到错误条目。

![Extra semicolon error](images/reactjs/extra-semi-error.png)

## 流行的入门套件

在本教程中，我们使用了 `create-react-app` 生成器来创建一个简单的 React 应用程序。有许多优秀的示例和入门套件可以帮助你构建第一个 React 应用程序。

### VS Code React 示例

这是一个 [示例](https://github.com/microsoft/vscode-react-sample) React 应用程序，它创建了一个简单的 TODO 应用程序，并包含一个 Node.js [Express](https://expressjs.com/) 服务器的源代码。它还展示了如何使用 [Babel](https://babeljs.io) ES6 转译器，然后使用 [webpack](https://webpack.js.org/) 来打包网站资源。

### TypeScript React

如果你对 TypeScript 和 React 感兴趣，你还可以通过指定要使用 TypeScript 模板来创建 `create-react-app` 应用程序的 TypeScript 版本：

```bash
npx create-react-app my-app --template typescript
```

详见 [Create React App 网站](https://create-react-app.dev) 上的 [添加 TypeScript](https://create-react-app.dev/docs/adding-typescript)。

### Angular

[Angular](https://angular.io/) 是另一个流行的 Web 框架。如果你想了解 Angular 与 VS Code 配合使用的示例，请查看 [使用 Angular CLI 进行调试](https://github.com/microsoft/vscode-recipes/tree/main/Angular-CLI) 指南。它将引导你完成创建 Angular 应用程序并为 JavaScript 调试器配置 `launch.json` 文件。

## 常见问题

### 我能在声明式 JSX 中使用 IntelliSense 吗？

是的。例如，如果你打开 `create-react-app` 项目的 `App.js` 文件，你可以在 `render()` 方法中的 React JSX 内看到 IntelliSense。

![JSX IntelliSense](images/reactjs/jsx-intellisense.png)
