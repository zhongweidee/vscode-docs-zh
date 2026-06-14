---
ContentId: 3224f624-a3fc-4eeb-81d1-eb653a90a6fc
DateApproved: 6/10/2026
MetaDescription: 了解如何在 Visual Studio Code 编辑器中安装和集成 JavaScript 和 Node.js 扩展。
---
# VS Code 的 JavaScript 扩展

Visual Studio Code 为 JavaScript 和 Node.js 开发提供了许多功能支持。随下载产品附带的功能是核心功能：调试、IntelliSense、代码导航等。

除了这些核心功能之外，你还可以安装大量高质量的扩展，为 VS Code 添加 JavaScript 开发的功能。

> **提示：** 要了解如何安装和管理扩展，请参阅[扩展文档](/docs/configure/extensions/extension-marketplace.md)。

## 查找扩展

你可以在扩展视图搜索栏中输入 `JavaScript` 来查找 JavaScript 扩展。或者，你也可以使用标签来查找 JavaScript 扩展：`"tag:javascript"`。在 VS Code 中或 [Marketplace](https://marketplace.visualstudio.com/vscode) 中搜索更多扩展。

<div class="marketplace-extensions-javascript-curated"></div>

此外，你还可以搜索 `Node.js` 扩展。

<div class="marketplace-extensions-node-curated"></div>

> 提示：上面显示的扩展是动态查询的。单击上面的扩展卡片可阅读描述和评论，以决定哪个扩展最适合你。在 [Marketplace](https://marketplace.visualstudio.com/vscode) 中查看更多信息。

## 推荐的扩展

如果你刚开始使用，以下是我们推荐尝试的扩展。

### ESLint

Marketplace — [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

发布者 — [Microsoft](https://marketplace.visualstudio.com/publishers/Microsoft)

轻松将 [ESLint](https://eslint.org/) 集成到你的项目中。如果 ESLint 不是你喜欢的代码检查工具，还可以选择其他各种代码检查扩展，包括 [JSHint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.jshint)、[JSCS](https://marketplace.visualstudio.com/items?itemName=ms-vscode.jscs) 和 [JS Standard](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs)。

在 VS Code [文档](/docs/languages/javascript.md#linters)中了解更多关于设置 JavaScript 代码检查工具的信息。

![ESLint animation](images/extensions/eslint.gif)

### SonarLint

Marketplace — [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)

发布者 — [SonarSource](https://marketplace.visualstudio.com/publishers/SonarSource)

SonarLint 帮助你在编码时发现并修复错误和安全问题。该扩展在后台运行，就像拼写检查器一样，高亮显示编码问题。SonarLint 不仅会告诉你问题是什么，还会提供上下文指导，说明问题为何有害以及如何修复，并附有相关示例。该扩展支持 [200 多条 JS/TS 规则](https://rules.sonarsource.com/javascript)，并包含多个[快速修复](https://rules.sonarsource.com/javascript/quickfix)功能，可自动处理你的编码问题。

在 VS Code Marketplace 中搜索 "SonarLint" 并安装。无需任何配置。你可以从适合大多数用户的默认配置文件开始，然后根据你的特定需求进行自定义。

![SonarLint animation](images/extensions/sonarlint.gif)

### JavaScript (ES6) code snippets

Marketplace — [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)

发布者 — [charalampos karypidis](https://marketplace.visualstudio.com/search?term=publisher%3A%22charalampos%20karypidis%22&target=VSCode)

VS Code 自带了许多内置的代码片段。**JavaScript (ES6) code snippets** 扩展添加了 ES6 (ECMAScript 6) 语法的代码片段。以下是该扩展提供的一小部分代码片段示例。请参阅该扩展的 [README](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)，了解该扩展为你提供的数十个代码片段。

![javascript snippets](images/extensions/javascript_snippets.png)

你可以在 VS Code [文档](/docs/languages/javascript.md#snippets)中了解更多关于 JavaScript 代码片段的信息。如需更多代码片段包，包括 [Angular 1](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular1)、[Angular 2](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)、[Bootstrap 3](https://marketplace.visualstudio.com/items?itemName=wcwhitehead.bootstrap-3-snippets)、[ReactJs](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets) 和 [jQuery](https://marketplace.visualstudio.com/items?itemName=donjayamanne.jquerysnippets)，请查看 Marketplace 的[代码片段类别](https://marketplace.visualstudio.com/vscode/Snippets?sortBy=Installs)。

### npm IntelliSense

Marketplace — [npm IntelliSense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)

发布者 — [Christian Kohler](https://marketplace.visualstudio.com/search?term=publisher%3A%22Christian%20Kohler%22&target=VSCode)

此扩展在使用 `import` 或 `require` 时为 npm 模块提供 IntelliSense 支持。

![npm intellisense](images/extensions/npm_intellisense.gif)
