---
ContentId: DD4E5A59-1586-4A5D-8047-3D58B2FE6937
DateApproved: 6/10/2026
MetaDescription: 了解 Visual Studio Code 编辑器针对 PHP 的功能（语法高亮、代码片段、Linting）以及扩展。
---
# 在 Visual Studio Code 中使用 PHP

Visual Studio Code 是一款出色的 PHP 开发编辑器。它开箱即用地提供语法高亮、括号匹配、IntelliSense（代码补全）和代码片段等功能，你还可以通过社区创建的 VS Code [扩展](/docs/configure/extensions/extension-marketplace.md)来添加更多功能。

## Linting

VS Code 使用官方的 PHP Linter（`php -l`）进行 PHP 语言诊断。这使得 VS Code 能够与 PHP Linter 的改进保持同步。

> 提示：使用 XAMPP？请安装完整版 PHP 以获取开发库。

有三个[设置](/docs/configure/settings.md)用于控制 PHP Linter：

* `setting(php.validate.enable)`：控制是否启用 PHP Linting。默认已启用。
* `setting(php.validate.executablePath)`：指向磁盘上 PHP 可执行文件的路径。如果 PHP 可执行文件不在系统路径中，请设置此项。
* `setting(php.validate.run)`：控制验证是在保存时触发（值：`"onSave"`）还是输入时触发（值：`"onType"`）。默认为保存时触发。

要更改 PHP 设置，请打开你的**用户设置或工作区设置**（`kb(workbench.action.openSettings)`），然后输入 "php" 来筛选可用设置列表。

![显示 PHP 设置](images/php/php-settings.png)

要设置 PHP 可执行文件路径，请选择 **PHP > Validate: Executable Path** 下的 **在 settings.json 中编辑** 链接，这将打开你的用户 `settings.json` 文件。添加 `setting(php.validate.executablePath)` 设置以及 PHP 安装的路径：

### Windows

```json
{
    "php.validate.executablePath": "c:/php/php.exe"
}
```

### Linux 和 macOS

```json
{
    "php.validate.executablePath": "/usr/bin/php"
}

或

{
    "php.validate.executablePath": "/usr/local/bin/php"
}
```

## 代码片段

Visual Studio Code 包含一组常用的 PHP 代码片段。要访问这些代码片段，请按 `kb(editor.action.triggerSuggest)` 以获取上下文相关的列表。

![PHP 代码片段](images/php/php-snippets.png)

## PHP 扩展

[VS Code Marketplace](https://marketplace.visualstudio.com/VSCode) 上有许多 PHP 语言扩展，并且还有更多扩展正在开发中。你可以在 VS Code 的**扩展**视图（`kb(workbench.view.extensions)`）中搜索 PHP 扩展，然后通过输入 "php" 来筛选扩展下拉列表。

![在扩展视图中搜索 PHP](images/php/category-php.png)

### 禁用内置 PHP 支持

要禁用内置的 PHP 智能补全，转而使用已安装 PHP 扩展提供的建议，请取消选中 **PHP > Suggest: Basic**，这会将你的 `settings.json` 文件中的 `setting(php.suggest.basic)` 设置为 false。

## 调试

使用 **XDebug** 进行 PHP 调试可通过 [PHP Debug 扩展](https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug)支持。请按照该扩展的说明配置 **XDebug** 以与 VS Code 配合使用。

## 后续步骤

请继续阅读以下内容：

* [扩展市场](/docs/configure/extensions/extension-marketplace.md) - 浏览其他人共享的扩展
* [调试](/docs/debugtest/debugging.md) - 了解有关 VS Code 调试的更多信息
