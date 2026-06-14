---
ContentId: AC888642-FBE5-43E5-9DC2-47B197717940
DateApproved: 6/10/2026
MetaDescription: Visual Studio Code 支持所有常见编程语言，包括智能代码补全和调试功能。
---
# 编程语言

## 支持数百种编程语言

在 Visual Studio Code 中，我们几乎支持所有主流的编程语言。一些语言是开箱即用的，例如 JavaScript、TypeScript、CSS 和 HTML，但更多丰富的语言扩展可以在 [VS Code Marketplace](https://marketplace.visualstudio.com/vscode/Languages) 中找到。

以下是八个最受欢迎的语言扩展：

<div class="marketplace-extensions-languages-curated"></div>

前往 [Marketplace](https://marketplace.visualstudio.com/vscode) 或使用集成的 [扩展视图](/docs/configure/extensions/extension-marketplace.md) 搜索您需要的编程语言，以查找代码片段、代码补全/IntelliSense 提供程序、代码检查工具、调试器等功能。

>**注意**: 如果您想更改 VS Code 的显示语言（例如改为中文），请参阅 [显示语言](/docs/configure/locales.md) 主题。

## 特定语言的文档

了解 VS Code 支持的编程语言。其中包括: [C++](/docs/languages/cpp.md) - [C&#35;](/docs/languages/csharp.md) - [CSS](/docs/languages/css.md) - [Dart](https://dart.dev/tools/vs-code) - [Dockerfile](/docs/azure/docker.md) - [F&#35;](/docs/languages/dotnet.md#create-an-f-hello-world-app) - [Go](/docs/languages/go.md) - [HTML](/docs/languages/html.md) - [Java](/docs/languages/java.md) - [JavaScript](/docs/languages/javascript.md) - [JSON](/docs/languages/json.md) - [Julia](/docs/languages/julia.md) - [Less](/docs/languages/css.md) -
[Markdown](/docs/languages/markdown.md) - [PHP](/docs/languages/php.md) - [PowerShell](/docs/languages/powershell.md) - [Python](/docs/languages/python.md) - [R](/docs/languages/r.md) - [Ruby](/docs/languages/ruby.md) - [Rust](/docs/languages/rust.md) - [SCSS](/docs/languages/css.md) - [Swift](/docs/languages/swift.md) - [T-SQL](/docs/languages/tsql.md) - [TypeScript](/docs/languages/typescript.md)。

单击任何链接项即可获取在该语言环境中使用 VS Code 的概述。大多数语言扩展的 README 中也包含了其核心功能的摘要。

## VS Code 中的语言功能

不同语言及其扩展的丰富支持程度各不相同：

* 语法高亮和括号匹配
* 智能补全（IntelliSense、由 [GitHub Copilot](/docs/editor/github-copilot.md) 提供的人工智能）
* 代码检查与纠正
* 代码导航（转到定义、查找所有引用）
* 调试
* 重构

## 使用 AI 增强代码补全

在 VS Code 中，您可以通过人工智能（AI）来增强编码体验，例如代码行或整个函数的建议、快速文档创建，以及帮助创建代码相关的产物（如测试）。

[GitHub Copilot](https://copilot.github.com/) 是一个由 AI 驱动的代码补全工具，可帮助您更快、更智能地编写代码。您可以在 VS Code 中使用 [GitHub Copilot 扩展](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) 来生成代码，或从它生成的代码中学习。

[![VS Code Marketplace 中的 GitHub Copilot 扩展](images/overview/copilot-extension.png)](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

您可以在 [Copilot 文档](/docs/editor/github-copilot.md) 中了解有关如何开始使用 Copilot 的更多信息。

## 更改当前文件的编程语言

在 VS Code 中，我们默认根据文件扩展名为文件分配语言支持。然而，有时您可能想要更改语言模式，要执行此操作，请单击位于状态栏右侧的语言指示器。这将弹出**选择语言模式**下拉菜单，您可以在其中为当前文件选择另一种语言。

![Language Selector](images/overview/languageselect.png)

**提示**: 您也可以通过运行**更改语言模式**命令 (`kb(workbench.action.editor.changeLanguageMode)`) 来调出相同的下拉菜单。

## 语言标识符

VS Code 将语言模式与特定的语言标识符关联起来，这样各种 VS Code 功能就可以根据当前的语言模式来启用。

语言标识符通常（但并非总是）是小写的编程语言名称。请注意，大小写对于标识符的精确匹配非常重要（'Markdown' != 'markdown'）。未知语言文件的标识符为 `plaintext`。

您可以在**更改语言模式** (`kb(workbench.action.editor.changeLanguageMode)`) 下拉菜单中查看当前已安装的语言及其标识符列表。

![language identifiers](images/overview/language-identifiers.png)

您可以在 [语言标识符参考](/docs/languages/identifiers.md) 中找到已知标识符的列表。

## 为语言添加文件扩展名

您可以通过 `setting(files.associations)` [设置](/docs/configure/settings.md) 为现有语言添加新的文件扩展名。

例如，以下设置将 `.myphp` 文件扩展名关联到 `php` 语言标识符：

```json
    "files.associations": {
        "*.myphp": "php"
    }
```

IntelliSense (`kb(editor.action.triggerSuggest)`) 将显示可用的语言标识符。

![Language ID IntelliSense](images/overview/language-id-intellisense.png)

## 后续步骤

现在您已了解 VS Code 支持您所关心的语言。继续阅读……

* [代码导航](/docs/editing/editingevolved.md) - 速览和转到定义等
* [调试](/docs/debugtest/debugging.md) - 这是 VS Code 真正出彩的地方

## 常见问题

### 我可以贡献自己的语言服务吗？

可以！请查看 [VS Code 扩展 API](/api) 文档中的 [语言服务器示例](/api/language-extensions/language-server-extension-guide.md)。

### 如果我不想创建完整的语言服务，可以复用现有的 TextMate 包吗？

可以，您也可以通过 TextMate 着色器为您喜欢的语言添加支持。请参阅扩展 API 部分的 [语法高亮指南](/api/language-extensions/syntax-highlight-guide.md)，了解如何将 TextMate `.tmLanguage` 语法文件集成到 VS Code 中。

### 我能否将其他文件扩展名映射到一种语言？

可以，通过 `setting(files.associations)` [设置](/docs/configure/settings.md)，您可以在全局或每个工作区中将文件扩展名映射到现有语言。

下面是一个将更多文件扩展名关联到 PHP 语言的示例：

```json
"files.associations": {
    "*.php4": "php",
    "*.php5": "php"
}
```

您还可以根据需要配置完整的文件路径到语言的映射。以下示例将某个文件夹 `somefolder` 中的所有文件关联到 PHP：

```json
"files.associations": {
    "**/somefolder/*.*": "php"
}
```

请注意，该模式是一个 [glob 模式](/docs/editor/glob-patterns.md)，如果包含 `/`，它将匹配文件的完整路径，否则将仅匹配文件名。

### 如何设置新文件的默认语言？

使用 `setting(files.defaultLanguage)` [设置](/docs/configure/settings.md)，您可以将所有新文件映射到默认语言。每当打开一个新的空白文件时，编辑器将配置为该语言模式。

以下示例将新文件关联到 HTML 语言：

```json
  // 分配给新文件的默认语言模式。
  "files.defaultLanguage": "html"
```
