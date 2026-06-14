---
ContentId: 2061194e-c34d-4ab0-a135-088bee575314
DateApproved: 6/6/2023
MetaDescription: Visual Studio Code 中的 C# 语言功能，如"转到定义"和"智能选择"
---
# 导航与编辑

本概述中介绍的导航和编辑工具由 [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) 扩展启用，这是一个轻量级扩展，用于增强您在 Visual Studio Code 中的 C# 开发体验。

## 代码导航

通过[大纲视图](/docs/editing/userinterface.md#outline-view)，您可以方便地浏览当前文件中的成员。安装 C# Dev Kit 扩展后，您还可以获得[解决方案资源管理器视图](/docs/csharp/project-management.md)。此视图可帮助您添加、管理和修改包含在较大解决方案中的项目，而无需在命令行和编辑器之间切换。

## 转到定义

**转到定义**功能可导航到类型或成员的源文件，并在新选项卡中打开结果。如果您是键盘用户，请将文本光标置于符号名称中，然后按 `kb(editor.action.revealDefinition)`。如果您是鼠标用户，请右键单击符号名称并从上下文菜单中选择**转到定义**，或使用 `kbstyle(Ctrl+click)` 单击符号名称。您也可以使用 `kbstyle(Ctrl+Alt+click)` 在侧边打开定义。

![Go to Definition example](images/navigate-edit/go-to-definition.gif)

## 速览定义

您可以使用**速览定义**功能快速查看符号的定义方式。此功能会在速览窗口中显示定义附近的几行代码，让您无需离开当前位置即可查看。

要速览符号的定义，请将光标放在源代码中该符号的任何使用位置，然后按 `kb(editor.action.peekDefinition)`。或者，您可以从上下文菜单中选择**速览定义**（右键单击，然后选择**速览 > 速览定义**）。

![Peek Definition example](images/navigate-edit/peek-definition.gif)

## 速览实现

您可以使用**速览实现**功能快速内联查看类、方法或符号的实现位置和方式。

要查看实现位置的列表，请将光标放在源代码中该符号的任何使用位置，然后按 `kb(editor.action.peekImplementation)`。或者，您可以从上下文菜单中选择**速览实现**（右键单击，然后选择**速览 > 速览实现**）。

## 速览引用

您可以使用**速览引用**功能获取所选符号在代码中被引用的内联源列表。将光标放在源代码中该符号的任何使用位置，右键单击，然后选择**速览 > 速览引用**。

![Peek References example](images/navigate-edit/peek-references.gif)

## 折叠或展开代码片段

为了更好地查看源代码，将鼠标悬停在编辑器装订线上，使用出现的箭头符号来折叠或展开代码片段。

![Collapse or expand code snippet example](images/navigate-edit/collapse-or-expand-code-snippets.gif)

## 智能选择

通过[智能选择](/updates/v1_33.md#smart-select-api)（语义选择），您可以根据源代码中光标位置的语义信息来扩展或缩小选择范围。

* 要扩展选择，请使用 `kb(editor.action.smartSelect.expand)`
* 要缩小选择，请使用 `kb(editor.action.smartSelect.shrink)`

## 内联提示

内联提示是出现在代码中内联的细微注释，用于提供有关代码元素的附加上下文信息。在 C# 中，这些提示可以显示调用位置的参数名称、变量的类型信息以及其他有用的细节，使您的代码更易读，而无需导航到定义。当处理具有多个参数的方法或类型推断使变量的类型不太明显时，这些提示尤其有用。

![Inlay hints examples](images/navigate-edit/inlay-hints.png)

要更改要启用或禁用的内联提示，请查看 `setting(csharp.inlayHints)` 设置。
