---
ContentId: 43095EAF-4B93-407C-A6F9-6DB173D79088
DateApproved: 6/10/2026
MetaDescription: 充分利用 Visual Studio Code 进行 HTML 开发
---
# Visual Studio Code 中的 HTML

Visual Studio Code 开箱即用地提供了对 HTML 编程的基本支持。包括语法高亮、IntelliSense 智能补全以及可自定义的格式化功能。VS Code 还内置了强大的 Emmet 支持。

## IntelliSense

在 HTML 中输入时，我们会通过 HTML IntelliSense 提供建议。在下图中，你可以看到建议的 HTML 元素闭合标签 `</div>` 以及上下文相关的建议元素列表。

![HTML IntelliSense](images/html/htmlintellisense.png)

文档符号也适用于 HTML，允许你通过 id 和 class 名称快速导航到 DOM 节点。

你还可以处理嵌入的 CSS 和 JavaScript。但请注意，不会跟踪从其他文件引入的 script 和 style，语言支持仅关注 HTML 文件本身的内容。

你可以随时按 `kb(editor.action.triggerSuggest)` 触发建议。

你还可以控制哪些内置代码补全提供程序处于活动状态。如果你不想看到相应的建议，可以在用户或工作区[设置](/docs/configure/settings.md)中覆盖这些设置。

```json
// 配置内置 HTML 语言是否建议 HTML5 标签、属性和值。
"html.suggest.html5": true
```

## 闭合标签

输入开始标签的 `>` 时，标签元素会自动闭合。

![HTML Close1](images/html/auto-close1.gif)

输入闭合标签的 `/` 时，会插入匹配的闭合标签。

![HTML Close2](images/html/auto-close2.gif)

你可以通过以下[设置](/docs/configure/settings.md)关闭自动闭合标签功能：

```json
"html.autoClosingTags": false
```

## 自动更新标签

修改标签时，链接编辑功能会自动更新匹配的闭合标签。该功能是可选的，可以通过以下设置启用：

```json
"editor.linkedEditing": true
```

## 颜色选取器

VS Code 的颜色选取器 UI 现在可在 HTML 样式部分中使用。

![color picker in HTML](images/html/color-picker-html.png)

它支持对从编辑器中拾取的颜色进行色调、饱和度和不透明度的配置。还可以通过点击选取器顶部的颜色字符串在不同的颜色模式之间切换。当你将鼠标悬停在颜色定义上时，选取器会显示出来。

## 悬停

将鼠标移到 HTML 标签或嵌入的样式和 JavaScript 上，可以获取光标下符号的更多信息。

![HTML Hover](images/html/htmlhover.png)

## 验证

HTML 语言支持对所有嵌入的 JavaScript 和 CSS 进行验证。

你可以通过以下设置关闭验证：

```json
// 配置内置 HTML 语言支持是否验证嵌入的脚本。
"html.validate.scripts": true,

// 配置内置 HTML 语言支持是否验证嵌入的样式。
"html.validate.styles": true
```

## 折叠

你可以使用行号和行首之间凹槽上的折叠图标来折叠源代码区域。折叠区域适用于源代码中的所有 HTML 元素及多行注释。

此外，你可以使用以下区域标记来定义折叠区域：
`<!-- #region -->` 和 `<!-- #endregion -->`

如果你希望为 HTML 切换到基于缩进的折叠方式，请使用：

```json
"[html]": {
    "editor.foldingStrategy": "indentation"
},
```

## 在集成浏览器中预览 HTML 文件

你可以在 VS Code 的[集成浏览器](/docs/debugtest/integrated-browser.md)中预览 HTML 文件。

要在集成浏览器中打开 HTML 文件，请在文件资源管理器或编辑器标签页中右键单击该文件，然后选择**在集成浏览器中打开**。你也可以在 HTML 文件处于活动状态时，点击编辑器标题栏中的**显示预览**图标。

当你修改 HTML 文件时，预览会实时更新以反映你的更改。

## 格式化

要改善 HTML 源代码的格式，你可以使用**格式化文档**命令 `kb(editor.action.formatDocument)` 来格式化整个文件，或使用**格式化选定内容** `kb(editor.action.formatSelection)` 来仅格式化选中的文本。

HTML 格式化器基于 [js-beautify](https://www.npmjs.com/package/js-beautify)。该库提供的格式化选项会显示在 VS Code [设置](/docs/configure/settings.md)中：

* `setting(html.format.wrapLineLength)`：每行最大字符数。
* `setting(html.format.unformatted)`：不应重新格式化的标签列表。
* `setting(html.format.contentUnformatted)`：内容不应重新格式化的标签列表，以逗号分隔。
* `setting(html.format.extraLiners)`：应在其前面添加额外换行的标签列表。
* `setting(html.format.preserveNewLines)`：是否保留元素前的现有换行符。
* `setting(html.format.maxPreserveNewLines)`：在一个块中保留的最大换行符数量。
* `setting(html.format.indentInnerHtml)`：缩进 `<head>` 和 `<body>` 部分。
* `setting(html.format.wrapAttributes)`：属性的换行策略：
  * `auto`：超过行长度时换行
  * `force`：除第一个外，所有属性换行
  * `force-aligned`：除第一个外，所有属性换行并对齐
  * `force-expand-multiline`：所有属性换行
  * `aligned-multiple`：超过行长度时换行，垂直对齐属性
  * `preserve`：保留属性的换行
  * `preserve-aligned`：保留属性的换行但对齐
* `setting(html.format.wrapAttributesIndentSize)`：在 `setting(html.format.wrapAttributes)` 中使用 `force aligned` 和 `aligned multiple` 时的对齐大小，或设为 `null` 使用默认缩进大小。
* `setting(html.format.templating)`：识别 django、erb、handlebars 和 php 模板语言标签。
* `setting(html.format.unformattedContentDelimiter)`：将文本内容保持在此字符串之间而不被分割。

> [!TIP]
> 格式化器不会格式化 `setting(html.format.unformatted)` 和 `setting(html.format.contentUnformatted)` 设置中列出的标签。嵌入的 JavaScript 会被格式化，除非 'script' 标签被排除在外。

市场中有多种替代格式化器可供选择。如果你想使用其他格式化器，请在设置中定义 `"html.format.enable": false` 来关闭内置格式化器。

## Emmet 片段

VS Code 支持 [Emmet 片段](https://emmet.io/)展开。Emmet 缩写会在编辑器自动补全列表中与其他建议和片段一起显示。

![Emmet HTML support built-in](images/html/emmetsnippet.gif)

> [!TIP]
> 请参阅 [Emmet 速查表](https://docs.emmet.io/cheat-sheet)的 HTML 部分了解有效的缩写。

如果你想在其他语言中使用 HTML Emmet 缩写，可以通过 `setting(emmet.includeLanguages)` [设置](/docs/configure/settings.md)将某个 Emmet 模式（如 `css`、`html`）与其他语言关联起来。该设置接受一个[语言标识符](/docs/languages/overview.md#language-identifier)，并将其与 Emmet 支持模式的语言 ID 关联。

例如，要在 JavaScript 中使用 Emmet HTML 缩写：

```json
{
    "emmet.includeLanguages": {
        "javascript": "html"
     }
}
```

我们还支持[用户自定义片段](/docs/editing/userdefinedsnippets.md)。

## HTML 自定义数据

你可以通过声明式的[自定义数据格式](https://github.com/microsoft/vscode-html-languageservice/blob/main/docs/customData.md)来扩展 VS Code 的 HTML 支持。通过将 `setting(html.customData)` 设置为遵循自定义数据格式的 JSON 文件列表，你可以增强 VS Code 对新 HTML 标签、属性和属性值的理解。VS Code 随后将为所提供的标签、属性和属性值提供语言支持，如补全和悬停信息。

你可以在 [vscode-custom-data](https://github.com/microsoft/vscode-custom-data) 仓库中阅读有关使用自定义数据的更多信息。

## HTML 扩展

安装扩展以添加更多功能。转到**扩展**视图（`kb(workbench.view.extensions)`）并输入 'html' 以查看与创建和编辑 HTML 相关的扩展列表。

<div class="marketplace-extensions-html-curated"></div>

> [!TIP]
> 点击上方的扩展卡片可阅读描述和评论，以决定哪个扩展最适合你。详见[市场](https://marketplace.visualstudio.com)。

## 后续步骤

继续阅读以了解以下内容：

* [CSS、SCSS 和 Less](/docs/languages/css.md) - VS Code 对 CSS（包括 Less 和 SCSS）提供一流的支持。
* [Emmet](/docs/languages/emmet.md) - 了解 VS Code 强大的内置 Emmet 支持。
* [Emmet 官方文档](https://docs.emmet.io/) - Emmet，Web 开发者的必备工具包。
