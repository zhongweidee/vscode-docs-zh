---
ContentId: 039882CB-B5C4-46BD-A8D5-DB24A5E82706
DateApproved: 6/10/2026
MetaDescription: 了解 Visual Studio Code 如何支持 CSS、SCSS 和 Less 开发。
---
# CSS、SCSS 和 Less

Visual Studio Code 内置支持编辑 CSS `.css`、SCSS `.scss` 和 Less `.less` 样式表。此外，你还可以安装扩展以获得更强大的功能。

<div class="marketplace-extensions-css-curated"></div>

> **提示：** 点击上面的扩展卡片可阅读描述和评论，以决定哪个扩展最适合你。在[市场](https://marketplace.visualstudio.com)中查看更多信息。

## IntelliSense

VS Code 支持选择器、属性和值的智能提示。使用 `kb(editor.action.triggerSuggest)` 可获取上下文相关的选项列表。

![CSS 中的 IntelliSense](images/css/intellisense.png)

建议包含详尽的文档，包括支持该属性的浏览器列表。要查看选定条目的完整描述文本，请使用 `kb(toggleSuggestionDetails)`。

## 语法着色与颜色预览

在你输入时，编辑器会提供语法高亮显示以及上下文中的颜色预览。

![语法与颜色](images/css/color.png)

点击颜色预览将启动集成的颜色选择器，支持配置色相、饱和度和不透明度。

![CSS 中的颜色选择器](images/css/css-color-picker.png)

> **提示：** 你可以通过点击选择器顶部的颜色字符串在不同的颜色模式之间切换。

你可以通过以下[设置](/docs/configure/settings.md)来隐藏 VS Code 的颜色预览：

```json
"editor.colorDecorators": false
```

如果只想对 CSS、Less 和 SCSS 禁用，请使用：

```json
"[css]": {
    "editor.colorDecorators": false
}

```

## 折叠

你可以使用行号和行起始之间装订线上的折叠图标来折叠源代码区域。折叠区域适用于所有声明（例如规则声明）和源代码中的多行注释。

此外，你还可以使用以下区域标记来定义折叠区域：
CSS/SCSS/Less 中使用 `/*#region*/` 和 `/*#endregion*/`，SCSS/Less 中使用 `// #region` 和 `// #endregion`。

如果你希望为 CSS、Less 和 SCSS 切换到基于缩进的折叠，请使用：

```json
"[css]": {
    "editor.foldingStrategy": "indentation"
},
```

## Emmet 代码片段

VS Code 内置了 [Emmet 缩写支持](/docs/languages/emmet.md)，建议会与编辑器自动补全列表中的其他建议和代码片段一同列出。

>**提示：** 请参阅 [Emmet 速查表](https://docs.emmet.io/cheat-sheet)的 CSS 部分以了解有效的缩写。

VS Code 也支持[用户自定义代码片段](/docs/editing/userdefinedsnippets.md)。

## 语法验证与 Linting

支持 CSS 版本 <= 2.1、Sass 版本 <= 3.2 和 Less 版本 <= 2.3。

>**注意：** 你可以通过将相应的 `.validate` 用户或工作区[设置](/docs/configure/settings.md)设置为 false 来禁用 VS Code 默认的 CSS、Sass 或 Less 验证。
>```json
>"css.validate": false
>```

## 文件中的转到符号

你可以按 `kb(workbench.action.gotoSymbol)` 快速导航到当前文件中相关的 CSS 符号。

## 悬停提示

将鼠标悬停在选择器或属性上将显示与 CSS 规则匹配的 HTML 代码片段。

![CSS 中的悬停提示](images/css/hover.png)

## 转到声明和查找引用

此功能支持同一文件中的 Sass 和 Less 变量。同时也支持符合[标准草案](https://drafts.csswg.org/css-variables/)的 [CSS 变量](https://developer.mozilla.org/docs/Web/CSS/Using_CSS_variables)。

CSS、SCSS 和 Less 中的 `@import` 和 `url()` 链接支持跳转到定义。

## CSS 自定义数据

你可以通过声明式的[自定义数据格式](https://github.com/microsoft/vscode-css-languageservice/blob/main/docs/customData.md)来扩展 VS Code 的 CSS 支持。通过将 `setting(css.customData)` 设置为遵循自定义数据格式的 JSON 文件列表，你可以增强 VS Code 对新的 CSS 属性、at 指令、伪类和伪元素的理解。VS Code 随后将为所提供的属性、at 指令、伪类和伪元素提供语言支持，例如补全和悬停信息。

你可以在 [vscode-custom-data](https://github.com/microsoft/vscode-custom-data) 仓库中阅读有关使用自定义数据的更多信息。

## 格式化

CSS 语言功能扩展还提供了一个格式化器。该格式化器适用于 CSS、LESS 和 SCSS。它由 [JS Beautify 库](https://github.com/beautify-web/js-beautify)实现，并提供了以下设置：

* `setting(css.format.enable)` - 启用/禁用默认 CSS 格式化器。
* `setting(css.format.newlineBetweenRules)` - 用空行分隔规则集。
* `setting(css.format.newlineBetweenSelectors)` - 用换行符分隔选择器。
* `setting(css.format.spaceAroundSelectorSeparator)` - 确保选择器分隔符 '>'、'+'、'~' 周围有空格字符（例如 `a > b`）。

相同的设置也适用于 `less` 和 `scss`。

## 将 Sass 和 Less 转译为 CSS

VS Code 可以通过集成的[任务运行器](/docs/debugtest/tasks.md)与 Sass 和 Less 转译器集成。我们可以使用它来将 `.scss` 或 `.less` 文件转译为 `.css` 文件。下面让我们逐步了解如何转译一个简单的 Sass/Less 文件。

### 步骤 1：安装 Sass 或 Less 转译器

在本教程中，我们使用 [sass](https://www.npmjs.com/package/sass) 或 [less](https://www.npmjs.com/package/less) Node.js 模块。

>**注意：** 如果你尚未安装 [Node.js](https://nodejs.org) 和 [npm](https://www.npmjs.com/) 包管理器，需要先安装它们才能继续本教程。[为你的平台安装 Node.js](https://nodejs.org/en/download/)。Node 包管理器（npm）已包含在 Node.js 发行版中。你需要打开一个新的终端（命令提示符）才能使 `npm` 出现在你的 PATH 中。

```bash
npm install -g sass less
```

### 步骤 2：创建一个简单的 Sass 或 Less 文件

在一个空文件夹中打开 VS Code，创建一个 `styles.scss` 或 `styles.less` 文件。将以下代码放入该文件中：

```scss
$padding: 6px;

nav {
  ul {
    margin: 0;
    padding: $padding;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: $padding 12px;
    text-decoration: none;
  }
}
```

对于上述文件的 Less 版本，只需将 `$padding` 改为 `@padding`。

>**注意：** 这是一个非常简单的示例，因此两种文件类型的源代码几乎相同。在更高级的场景中，语法和结构将会大不相同。

### 步骤 3：创建 tasks.json

下一步是设置任务配置。为此，运行**终端** > **配置任务**，然后点击**从模板创建 tasks.json 文件**。在弹出的选择对话框中，选择**其他**。

这将在工作区的 `.vscode` 文件夹中创建一个示例 `tasks.json` 文件。文件的初始版本包含一个运行任意命令的示例。我们将修改该配置以用于转译 Sass/Less：

```json
// Sass 配置
{
    // 请参阅 https://go.microsoft.com/fwlink/?LinkId=733558
    // 了解 tasks.json 格式的文档
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Sass 编译",
            "type": "shell",
            "command": "sass styles.scss styles.css",
            "group": "build"
        }
    ]
}
```

```json
// Less 配置
{
    // 请参阅 https://go.microsoft.com/fwlink/?LinkId=733558
    // 了解 tasks.json 格式的文档
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Less 编译",
            "type": "shell",
            "command": "lessc styles.less styles.css",
            "group": "build"
        }
    ]
}
```

### 步骤 4：运行生成任务

由于这是文件中唯一的命令，你可以按 `kb(workbench.action.tasks.build)`（**运行生成任务**）来执行它。示例 Sass/Less 文件应该不会有任何编译问题，因此运行该任务后只会生成一个对应的 `styles.css` 文件。

由于在更复杂的环境中可能存在多个生成任务，按 `kb(workbench.action.tasks.build)`（**运行生成任务**）后，我们会提示你选择要执行的任务。此外，我们还允许你扫描输出中的编译问题（错误和警告）。根据编译器的不同，在列表中选择适当的条目来扫描工具输出中的错误和警告。如果你不想扫描输出，请从显示的列表中选择**从不扫描生成输出**。

此时，你应该会在文件列表中看到一个额外的文件 `styles.css`。

如果你想将该任务设为默认的生成任务，请从全局**终端**菜单中执行**配置默认生成任务**，然后从显示的列表中选择相应的 **Sass** 或 **Less** 任务。

>**注意：** 如果构建失败或出现诸如"编译目录时必须指定输出目录"之类的错误消息，请确保 `tasks.json` 中的文件名与磁盘上的文件名匹配。你始终可以通过从命令行运行 `sass styles.scss styles.css` 来测试你的构建。

## 自动化 Sass/Less 编译

让我们更进一步，用 VS Code 来自动化 Sass/Less 编译。我们可以使用与之前相同的任务运行器集成方式，但需要进行一些修改。

### 步骤 1：安装 Gulp 和一些插件

我们将使用 [Gulp](https://gulpjs.com/) 来创建一个自动化 Sass/Less 编译的任务。我们还将使用 [gulp-sass](https://www.npmjs.com/package/gulp-sass) 插件来简化操作。Less 的插件是 [gulp-less](https://www.npmjs.com/package/gulp-less)。

我们需要全局（`-g` 开关）和本地安装 gulp：

```bash
npm install -g gulp
npm install gulp gulp-sass gulp-less
```

> **注意：** `gulp-sass` 和 `gulp-less` 是我们之前使用的 `sass` 和 `lessc` 模块的 Gulp 插件。你还可以使用许多其他 Gulp Sass 和 Less 插件，以及 Grunt 插件。

你可以通过在终端中键入 `gulp -v` 来测试 gulp 安装是否成功。你应该会看到全局（CLI）和本地安装的版本号。

### 步骤 2：创建一个简单的 Gulp 任务

在与之前相同的文件夹中打开 VS Code（包含 `styles.scss`/`styles.less` 和 `.vscode` 文件夹下的 `tasks.json`），并在根目录创建 `gulpfile.js`。

将以下代码放入 `gulpfile.js` 文件中：

```javascript
// Sass 配置
var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function(cb) {
    gulp.src('*.scss')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }));
    cb();
});

gulp.task('default', gulp.series('sass', function(cb) {
    gulp.watch('*.scss', gulp.series('sass'));
    cb();
}));
```

```javascript
// Less 配置
var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function(cb) {
    gulp.src('*.less')
        .pipe(less())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }));
    cb();
});

gulp.task('default', gulp.series('less', function(cb) {
    gulp.watch('*.less', gulp.series('less'));
    cb();
}));
```

这里发生了什么？

1. 我们的 `default` gulp 任务在启动时首先运行一次 `sass` 或 `less` 任务。
2. 然后它监视工作区根目录（例如当前在 VS Code 中打开的文件夹）中任何 SCSS/Less 文件的更改。
3. 它获取已更改的 SCSS/Less 文件集，并通过我们各自的编译器（例如 `gulp-sass`、`gulp-less`）运行它们。
4. 现在我们得到了一组 CSS 文件，每个文件分别以其原始 SCSS/Less 文件命名。然后我们将这些文件放在同一目录中。

### 步骤 3：运行 gulp 默认任务

要完成与 VS Code 的任务集成，我们需要修改之前的任务配置，以运行我们刚刚创建的默认 Gulp 任务。你可以删除 `tasks.json` 文件或将其清空，只保留 `"version": "2.0.0"` 属性。现在从全局**终端**菜单执行**运行任务**。你会看到一个选择器，列出了 gulp 文件中定义的任务。选择 **gulp: default** 以启动任务。我们允许你扫描输出中的编译问题。根据编译器的不同，在列表中选择适当的条目来扫描工具输出中的错误和警告。如果你不想扫描输出，请从显示的列表中选择**从不扫描生成输出**。此时，如果你创建和/或修改 Less 或 Sass 文件，你将看到相应的 CSS 文件在保存时生成和/或反映更改。你还可以启用[自动保存](/docs/editing/codebasics.md#save-auto-save)来使流程更加顺畅。

如果你想将 **gulp: default** 任务设为按 `kb(workbench.action.tasks.build)` 时执行的默认生成任务，请从全局**终端**菜单中运行**配置默认生成任务**，然后从显示的列表中选择 **gulp: default**。

### 步骤 4：终止 gulp 默认任务

**gulp: default** 任务在后台运行，并监视 Sass/Less 文件的文件更改。如果你想停止该任务，可以使用全局**终端**菜单中的**终止任务**命令。

## 自定义 CSS、SCSS 和 Less 设置

你可以将以下 lint 警告配置为[用户和工作区设置](/docs/configure/settings.md)。

`validate` 设置允许你关闭内置验证。如果你希望使用其他 linter，可以这样做。

Id|描述|默认值
---|------------|----
css.validate | 启用或禁用所有 css 验证 | true
less.validate | 启用或禁用所有 less 验证 | true
scss.validate | 启用或禁用所有 scss 验证 | true

要为 CSS 配置选项，请使用 `css.lint.` 作为 id 的前缀；对于 SCSS 和 Less，请使用 `scss.lint.` 和 `less.lint.`。

如果你想启用 lint 检查，请将设置设为 `warning` 或 `error`，使用 `ignore` 可禁用它。Lint 检查会在你输入时执行。

Id|描述|默认值
---|------------|----
validate | 启用或禁用所有验证 | true
compatibleVendorPrefixes | 当使用带有浏览器厂商前缀的属性时（例如 `-webkit-transition`），确保也包含所有其他浏览器厂商特定属性，例如 `-moz-transition`、`-ms-transition` 和 `-o-transition` | ignore
vendorPrefix | 当使用带有浏览器厂商前缀的属性时（例如 `-webkit-transition`），确保也包含标准属性（如果存在），例如 `transition` | warning
duplicateProperties | 警告同一规则集中的重复属性 | ignore
emptyRules | 警告空规则集 | warning
importStatement | 警告使用 `import` 语句，因为 import 语句是按顺序加载的，会对网页性能产生负面影响 | ignore
boxModel | 使用 `padding` 或 `border` 时不要使用 `width` 或 `height` | ignore
universalSelector | 警告使用通用选择器 `*`，因为它已知速度较慢，应避免使用 | ignore
zeroUnits | 警告当零带有单位时，例如 `0em`，因为零不需要单位 | ignore
fontFaceProperties | 警告使用 `@font-face` 规则但未定义 `src` 和 `font-family` 属性 | warning
hexColorLength | 警告使用非三位或六位十六进制数的颜色值 | error
argumentsInColorFunction | 警告颜色函数（例如 `rgb`）中的参数数量无效 | error
unknownProperties | 警告使用未知属性 | warning
ieHack | 警告使用 IE hack `*propertyName` 或 `_propertyName` | ignore
unknownVendorSpecificProperties | 警告使用未知的浏览器厂商特定属性 | ignore
propertyIgnoredDueToDisplay | 警告使用因 display 属性而被忽略的属性。例如，当 `display: inline` 时，`width`、`height`、`margin-top`、`margin-bottom` 和 `float` 属性无效 | warning
important | 警告使用 `!important`，因为这表明整个 CSS 的特异性已失控，需要重构 | ignore
float | 警告使用 `float`，因为浮动会导致脆弱且难以维护的 CSS，布局的任何一个方面发生变化都容易出问题 | ignore
idSelector | 警告使用 id 选择器 `#id`，因为选择器不应包含 ID，这些规则与 HTML 的耦合过于紧密 | ignore

## 后续步骤

继续阅读以了解：

* [配置任务](/docs/debugtest/tasks.md) - 深入了解任务，帮助你转译 SCSS 和 Less 为 CSS。
* [基础编辑](/docs/editing/codebasics.md) - 了解功能强大的 VS Code 编辑器。
* [代码导航](/docs/editing/editingevolved.md) - 在源代码中快速移动。
* [HTML](/docs/languages/html.md) - CSS 仅仅是个开始，VS Code 对 HTML 的支持也非常出色。

## 常见问题

### VS Code 是否提供颜色选择器？

是的，将鼠标悬停在 CSS 颜色引用上即可显示颜色选择器。

### 是否支持基于缩进的 Sass 语法（.sass）？

不支持，但市场中有多个扩展支持缩进格式的 Sass，例如最初由 Robin Bentley 创建、现由 Leonard Grosoli 维护的 [Sass](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented) 扩展。
