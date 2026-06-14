---
ContentId: 85ce0bcc-d2b8-4b7c-b744-5eddce9a8d00
DateApproved: 6/10/2026
MetaDescription: Vue JavaScript 教程，展示 Visual Studio Code 编辑器中的 IntelliSense、调试和代码导航支持。
---
# 在 Visual Studio Code 中使用 Vue

[Vue.js](https://vuejs.org/) 是一种流行的 JavaScript 库，用于构建 Web 应用程序和用户界面，而 Visual Studio Code 内置了对 Vue.js 构建块的支持，包括 [HTML](/docs/languages/html.md)、[CSS](/docs/languages/css.md) 和 [JavaScript](/docs/languages/javascript.md)。为了获得更丰富的 Vue.js 开发体验，你可以安装 [Vue - Official（前身为 Volar）](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 扩展，以获得对 IntelliSense、[TypeScript](/docs/languages/typescript)、格式化等的支持。

>**注意**：[Vue 2 的支持已于 2023 年 12 月 31 日结束](https://v2.vuejs.org/lts/)，因此[不建议](https://github.com/vuejs/vetur/discussions/3378)使用 [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) 扩展。你需要[禁用 Vetur](https://vuejs.org/guide/typescript/overview.html#ide-support) 才能使用 Vue - Official 扩展。

---

![welcome to Vue](images/vuejs/welcome-to-vue.png)

---

## 欢迎使用 Vue

我们将在本教程中使用 [Vite](https://vitejs.dev/) 工具。如果你刚接触 Vue.js 框架，可以在 [vuejs.org](https://vuejs.org) 网站上找到详尽的文档和教程。

要安装并使用 Vite 和 Vue.js，你需要安装 [Node.js](https://nodejs.org/) JavaScript 运行时和 [npm](https://www.npmjs.com/)（Node.js 包管理器）。npm 随 Node.js 一起提供，你可以从 [Node.js 下载页面](https://nodejs.org/en/download/)进行安装。

>**提示**：要测试你的计算机上是否正确安装了 Node.js 和 npm，可以输入 `node --version` 和 `npm --version`。

为了开始操作，请确保你位于打算创建项目的父目录中。然后打开终端或命令提示符并输入：

```bash
npm create vue@latest
```

系统将提示你安装 `create-vue`。

![Create vue](images/vuejs/create-vue.png)

安装和执行 [create-vue](https://github.com/vuejs/create-vue) 可能需要几分钟时间，它可以帮助你搭建 Vue 项目的脚手架。按照提示选择可选功能。如果你对某个选项不确定，可以选择"否"。

![Vue app scaffolding](images/vuejs/vue-app-scaffolding.png)

项目创建完成后，进入项目目录并安装依赖项。安装依赖项可能需要几分钟时间。

```bash
cd <你的项目名称>
npm install
```

让我们快速运行 Vue 应用程序，输入 `npm run dev` 来启动 Web 服务器并在浏览器中打开应用程序：

```bash
npm run dev
```

你应该在浏览器中访问 [http://localhost:5173](http://localhost:5173) 时看到"Welcome to your Vue.js App"。

要在 VS Code 中打开你的 Vue 应用程序，请在终端（或命令提示符）中导航到 `vue-project` 文件夹并输入 `code .`：

```bash
cd vue-project
code .
```

VS Code 将启动并在文件资源管理器中显示你的 Vue 应用程序。

## Vue - Official 扩展

现在展开 `src` 文件夹并选择 `App.vue` 文件。你会注意到 VS Code 没有显示任何语法高亮，并将该文件视为**纯文本**，正如你在右下角状态栏中看到的那样。你还会看到一个通知，推荐为 `.vue` 文件类型安装 [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 扩展。

Vue 扩展为 VS Code 提供 Vue.js 语言功能（语法高亮、IntelliSense 和格式化）。

![Vue - Official extension](images/vuejs/vue-extension.png)

从通知中，按**安装**来下载并安装 Vue 扩展。你应该会在扩展视图中看到 Vue 扩展**正在安装**。安装完成后（可能需要几分钟），**安装**按钮会变成**管理**齿轮按钮。

现在你应该会看到 `.vue` 是 Vue.js 语言的可识别文件类型，并且你拥有语法高亮、括号匹配和悬停描述等语言功能。

![Vue language features](images/vuejs/vue-language-features.png)

## IntelliSense

当你在 `App.vue` 中开始输入时，你会看到智能建议或补全，不仅适用于 HTML 和 CSS，还适用于 Vue.js 特定的项目，例如 Vue `template` 部分中的声明（`v-bind`、`v-for`）：

![Vue.js suggestions](images/vuejs/suggestions.png)

以及 Vue `scripts` 部分中的属性，例如 `computed`：

![Vue.js JavaScript suggestions](images/vuejs/javascript-suggestions.png)

### 转到定义、速览定义

VS Code 中的 Vue - Official 扩展通过提供类型定义等语言服务功能来增强 Vue.js 开发体验。你可以使用以下方式访问这些功能：

- **转到定义**（`kb(editor.action.revealDefinition)`）：直接导航到代码中的类型定义。
- **速览定义**（`kb(editor.action.peekDefinition)`）：在不离开当前上下文的情况下内联查看类型定义。

要使用速览定义，请按照以下步骤操作：
1. 将光标放在 `App` 上。
2. 右键单击，在上下文菜单中悬停在**速览**上，然后选择**速览定义**。
3. 一个[速览窗口](/docs/editing/editingevolved.md#peek)将打开，显示来自 `App.js` 的 `App` 定义。

![Vue.js peek definition](images/vuejs/peek-definition.png)

按 `kbstyle(Escape)` 关闭速览窗口。

## Hello World

让我们更新示例应用程序以渲染"Hello World!"。在 `App.vue` 中，将 HelloWorld 组件的 `msg` 自定义属性文本替换为"Hello World!"。

```html
<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="Hello World!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>
```

保存 `App.vue` 文件（`kb(workbench.action.files.save)`）后，Vite 的[热模块替换（HMR）](https://vite.dev/guide/features.html#hot-module-replacement)功能将立即在浏览器中反映更新，你会看到"Hello World!"。在我们继续学习 Vue.js 客户端调试时，请保持服务器运行。

>**提示**：VS Code 支持自动保存，默认情况下会在延迟后保存你的文件。在**文件**菜单中勾选**自动保存**选项来开启自动保存，或者直接配置 `files.autoSave` 用户[设置](/docs/configure/settings.md)。

---

![hello world](images/vuejs/hello-world.png)

---

## 代码检查

代码检查工具会分析你的源代码，并能在你运行应用程序之前警告你潜在的问题。Vue ESLint 插件（[eslint-plugin-vue](https://eslint.vuejs.org/)）会检查 Vue.js 特定的语法错误，这些错误在编辑器中显示为红色波浪线，也会显示在**问题**面板中（**查看** > **问题** `kb(workbench.actions.view.problems)`）。

以下示例中，当 Vue 代码检查工具检测到模板中有多个根元素时，你会看到一个错误：

![Vue linting](images/vuejs/vue-linting.png)

## 调试

你可以使用内置的 JavaScript 调试器调试客户端 Vue.js 代码。按照此[讨论](https://github.com/vitejs/vite/discussions/4065#discussioncomment-1359932)来配合使用 Vite/Vue.js 3 项目与 VS Code 和 Microsoft Edge。

对于[现已处于维护模式](https://vuejs.org/guide/scaling-up/tooling#vue-cli)的 Vue CLI，请查看 VS Code 调试[配方](https://github.com/microsoft/vscode-recipes)网站上的 [VS Code 中的 Vue.js 调试](https://github.com/microsoft/vscode-recipes/tree/main/vuejs-cli)配方以了解更多信息。

另一个流行的 Vue.js 调试工具是 [vue-devtools](https://devtools.vuejs.org/) 插件，它可以在任何环境中使用。

## 其他扩展

- 在扩展视图（`kb(workbench.view.extensions)`）中输入 _vue_ 进行搜索，以查找其他 Vue 扩展。

  ![Vue.js extensions](images/vuejs/vue-extensions.png)

- 像 [Vue VS Code Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets) 这样的扩展对 Vue 代码片段非常有用。

  ![Vue VS Code Snippets](images/vuejs/vue-vscode-snippets.png)

- 还有扩展包，它们汇集了其他人认为对 Vue.js 开发有用的扩展。

  ![Vue.js Extension Pack](images/vuejs/vue-extension-pack.png)
