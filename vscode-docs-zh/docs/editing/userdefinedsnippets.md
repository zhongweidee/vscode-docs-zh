---
ContentId: 79CD9B45-97FF-48B1-8DD5-2555F56206A6
DateApproved: 6/10/2026
MetaDescription: 可以轻松地将代码片段添加到 Visual Studio Code 中，无论是供自己使用还是通过公共扩展市场与他人共享。支持 TextMate .tmSnippets 文件。
---
# Visual Studio Code 中的代码片段

代码片段是模板，可以更轻松地输入重复出现的代码模式，例如循环或条件语句。

在 Visual Studio Code 中，代码片段会出现在 IntelliSense 中（`kb(editor.action.triggerSuggest)`），与其他建议混合显示，也会出现在专用的代码片段选择器中（命令面板中的**插入代码片段**）。还支持 Tab 键补全：通过 `"editor.tabCompletion": "on"` 启用，输入**代码片段前缀**（触发文本），然后按 `kb(insertSnippet)` 即可插入代码片段。

代码片段语法遵循 [TextMate 代码片段语法](https://manual.macromates.com/en/snippets)，但不支持"插值 shell 代码"和 `\u` 的使用。

![ajax snippet](images/userdefinedsnippets/ajax-snippet.gif)

## 内置代码片段

VS Code 为多种语言提供了内置代码片段，例如：JavaScript、TypeScript、Markdown 和 PHP。

![builtin javascript snippet](images/userdefinedsnippets/builtin-javascript-snippets.png)

您可以通过在命令面板中运行**插入代码片段**命令来查看某种语言的可用代码片段，以获取当前文件对应语言的代码片段列表。不过，请记住，此列表还包括您定义的用户代码片段以及已安装扩展提供的任何代码片段。

## 从市场安装代码片段

[VS Code 市场](https://marketplace.visualstudio.com/vscode)上的许多[扩展](/docs/configure/extensions/extension-marketplace.md)都包含代码片段。您可以使用 `@category:"snippets"` 过滤器在扩展视图（`kb(workbench.view.extensions)`）中搜索包含代码片段的扩展。

![Searching for extensions with snippets](images/userdefinedsnippets/category-snippets.png)

如果找到想要使用的扩展，请安装它，然后重启 VS Code，新的代码片段即可使用。

## 创建您自己的代码片段

您可以轻松地定义自己的代码片段，而无需使用任何扩展。要创建或编辑自己的代码片段，请在**文件** > **首选项**下选择**配置代码片段**，然后选择代码片段应该出现的语言（按[语言标识符](/docs/languages/identifiers.md)），或者选择**新建全局代码片段文件**选项，使代码片段适用于所有语言。VS Code 会为您管理底层代码片段文件的创建和刷新。

![snippet dropdown](images/userdefinedsnippets/snippet-dropdown.png)

代码片段文件以 JSON 格式编写，支持 C 风格注释，并且可以定义无限数量的代码片段。代码片段支持大多数 TextMate 语法以实现动态行为，基于插入上下文智能格式化空白字符，并允许轻松进行多行编辑。

以下是 JavaScript 的 `for` 循环代码片段示例：

```json
// in file 'Code/User/snippets/javascript.json'
{
    "For Loop": {
        "prefix": [
          "for",
          "for-const"
        ],
        "body": [
          "for (const ${2:element} of ${1:array}) {",
          "\t$0",
          "}"
        ],
        "description": "A for loop."
    }
}
```

在上面的示例中：

* "For Loop" 是代码片段名称。如果没有提供 `description`，它将通过 IntelliSense 显示。
* `prefix` 定义一个或多个触发词，用于在 IntelliSense 中显示该代码片段。前缀匹配采用子字符串匹配方式，因此在本例中，"fc" 可以匹配 "for-const"。
* `body` 是一行或多行内容，插入时将合并为多行。换行符和嵌入的制表符将根据代码片段插入的上下文进行格式化。
* `description` 是代码片段的可选描述，由 IntelliSense 显示。

此外，上面示例中的 `body` 包含三个占位符（按遍历顺序列出）：`${1:array}`、`${2:element}` 和 `$0`。您可以使用 `kb(jumpToNextSnippetPlaceholder)` 快速跳转到下一个占位符，此时您可以编辑占位符或跳转到下一个。冒号 `:` 后面的字符串（如果有）是默认文本，例如 `${2:element}` 中的 `element`。占位符遍历顺序按数字升序排列，从 1 开始；0 是一个可选的特殊情况，始终排在最后，并在指定位置退出代码片段模式并将光标置于该位置。

### 文件模板代码片段

如果代码片段旨在填充或替换文件内容，您可以在代码片段定义中添加 `isFileTemplate` 属性。文件模板代码片段会在您运行**代码片段：用代码片段填充文件**命令时，在新文件或现有文件的下列列表中显示。

## 代码片段作用域

代码片段具有作用域，以便只建议相关的代码片段。代码片段可以通过以下两种方式进行作用域限定：

1. 代码片段所针对的**语言**（可能是所有语言）
2. 代码片段所针对的**项目**（可能是所有项目）

### 语言代码片段作用域

每个代码片段的作用域可以限定为一种语言、多种语言或所有语言（"全局"），这取决于它定义在：

1. **语言**代码片段文件中
2. **全局**代码片段文件中

单语言用户定义代码片段定义在特定语言的代码片段文件中（例如 `javascript.json`），您可以通过**代码片段：配置代码片段**按语言标识符访问它。该代码片段仅在编辑其所定义的语言时可用。

多语言和全局用户定义代码片段都定义在"全局"代码片段文件中（文件后缀为 `.code-snippets` 的 JSON 文件），同样可以通过**代码片段：配置代码片段**访问。在全局代码片段文件中，代码片段定义可以有一个额外的 `scope` 属性，该属性接受一个或多个[语言标识符](/docs/languages/identifiers.md)，使代码片段仅对这些指定的语言可用。如果未提供 `scope` 属性，则全局代码片段适用于**所有**语言。

大多数用户定义的代码片段的作用域限定为单一语言，因此定义在特定语言的代码片段文件中。

### 项目代码片段作用域

您还可以将全局代码片段文件（文件后缀为 `.code-snippets` 的 JSON 文件）的作用域限定到您的项目。项目文件夹代码片段通过**代码片段：配置代码片段**下拉菜单中的**为 '\<folder-name\>' 新建代码片段文件...** 选项创建，并位于项目根目录的 `.vscode` 文件夹中。项目代码片段文件对于与使用该项目的所有用户共享代码片段非常有用。项目文件夹代码片段类似于全局代码片段，可以通过 `scope` 属性限定到特定语言。

### 文件模式作用域

您可以使用可选的 `include` 和 `exclude` 属性来指定文件模式，从而进一步控制代码片段的出现时机。这些属性适用于特定语言和全局代码片段文件，并且可以与 `scope` 属性结合使用，以实现对代码片段建议的更精确控制。

* `include` - 一个 glob 模式或 glob 模式数组，用于指定代码片段应该在哪些文件中出现。
* `exclude` - 一个 glob 模式或 glob 模式数组，用于指定代码片段不应该在哪些文件中出现。

模式匹配规则如下：

* **仅文件名模式**（例如 `*.test.ts`）基于文件名进行匹配，不考虑文件在项目中的位置。
* **基于路径的模式**（例如 `**/*.test.ts` 或 `**/dist/**`）根据完整文件路径进行匹配。
* 如果文件同时匹配 `include` 和 `exclude` 模式，则 `exclude` 模式优先。
* 如果未指定这两个属性，代码片段将基于 `scope` 属性出现在所有适用的文件中。

<details>
<summary>示例</summary>

**示例：测试代码片段**

此代码片段仅在 TypeScript 测试文件中出现：

```json
{
  "Test Block": {
    "prefix": "test",
    "body": [
      "test('${1:description}', () => {",
      "\t${0}",
      "});"
    ],
    "description": "Insert a test block",
    "scope": "typescript",
    "include": ["**/*.test.ts", "**/*.spec.ts"]
  }
}
```

**示例：排除目录**

此代码片段出现在所有 JavaScript 文件中，但排除 `dist` 或 `node_modules` 目录中的文件：

```json
{
  "Console Log": {
    "prefix": "log",
    "body": "console.log(${0});",
    "description": "Insert console.log",
    "scope": "javascript",
    "exclude": ["**/dist/**", "**/node_modules/**"]
  }
}
```

**示例：配置文件代码片段**

此代码片段仅出现在 `travis.yml` 文件中，使用仅文件名模式：

```json
{
  "Travis CI Node": {
    "prefix": "travis-node",
    "body": [
      "language: node_js",
      "node_js:",
      "  - ${1:18}"
    ],
    "description": "Travis CI Node.js configuration",
    "scope": "yaml",
    "include": ["travis.yml"]
  }
}
```

</details>

使用 `include` 和 `exclude` 模式可以通过仅在相关处显示代码片段来减少 IntelliSense 中的杂乱。

## 代码片段语法

代码片段的 `body` 可以使用特殊结构来控制光标和要插入的文本。以下是支持的功能及其语法：

### 制表位

使用制表位，您可以使编辑器光标在代码片段内移动。使用 `$1`、`$2` 来指定光标位置。数字表示访问制表位的顺序，而 `$0` 表示最终光标位置。同一制表位的多次出现是关联的，会同步更新。

### 占位符

占位符是带有值的制表位，例如 `${1:foo}`。占位符文本将被插入并选中，以便可以轻松更改。占位符可以嵌套，例如 `${1:another ${2:placeholder}}`。

### 选项

占位符可以有选项作为值。语法是以管道符括起来的逗号分隔枚举值，例如 `${1|one,two,three|}`。当代码片段被插入并选中占位符时，选项将提示用户选择一个值。

### 变量

使用 `$name` 或 `${name:default}`，您可以插入变量的值。当变量未设置时，将插入其**默认值**或空字符串。当变量未知（即其名称未定义）时，将插入变量的名称并将其转换为占位符。

以下变量可以使用：

* `TM_SELECTED_TEXT` 当前选中的文本或空字符串
* `TM_CURRENT_LINE` 当前行的内容
* `TM_CURRENT_WORD` 光标下单词的内容或空字符串
* `TM_LINE_INDEX` 基于零索引的行号
* `TM_LINE_NUMBER` 基于一索引的行号
* `TM_FILENAME` 当前文档的文件名
* `TM_FILENAME_BASE` 当前文档的文件名（不含扩展名）
* `TM_DIRECTORY` 当前文档的目录
* `TM_FILEPATH` 当前文档的完整文件路径
* `RELATIVE_FILEPATH` 当前文档相对于（打开的工作区或文件夹）的文件路径
* `CLIPBOARD` 剪贴板的内容
* `WORKSPACE_NAME` 打开的工作区或文件夹的名称
* `WORKSPACE_FOLDER` 打开的工作区或文件夹的路径
* `CURSOR_INDEX` 基于零索引的光标编号
* `CURSOR_NUMBER` 基于一索引的光标编号

用于插入当前日期和时间：

* `CURRENT_YEAR` 当前年份
* `CURRENT_YEAR_SHORT` 当前年份的最后两位数字
* `CURRENT_MONTH` 两位数字的月份（例如 '02'）
* `CURRENT_MONTH_NAME` 月份的全名（例如 'July'）
* `CURRENT_MONTH_NAME_SHORT` 月份的缩写（例如 'Jul'）
* `CURRENT_DATE` 两位数字的日期（例如 '08'）
* `CURRENT_DAY_NAME` 星期几的名称（例如 'Monday'）
* `CURRENT_DAY_NAME_SHORT` 星期几的缩写（例如 'Mon'）
* `CURRENT_HOUR` 24 小时制的当前小时
* `CURRENT_MINUTE` 两位数字的当前分钟
* `CURRENT_SECOND` 两位数字的当前秒
* `CURRENT_MILLISECOND` 三位数字的当前毫秒（例如 `078`）
* `CURRENT_SECONDS_UNIX` 自 Unix 纪元以来的秒数
* `CURRENT_MILLISECONDS_UNIX` 自 Unix 纪元以来的毫秒数
* `CURRENT_TIMEZONE_OFFSET` 当前 UTC 时区偏移量，格式为 `+HH:MM` 或 `-HH:MM`（例如 `-07:00`）。
* `CURRENT_TIMEZONE_NAME` 当前时区的 IANA 名称（例如 `America/Los_Angeles`）

用于插入随机值：

* `RANDOM` 6 位随机十进制数字
* `RANDOM_HEX` 6 位随机十六进制数字
* `UUID` 版本 4 UUID

用于插入行注释或块注释，遵循当前语言：

* `BLOCK_COMMENT_START` 示例输出：PHP 中为 `/*`，HTML 中为 `<!--`
* `BLOCK_COMMENT_END` 示例输出：PHP 中为 `*/`，HTML 中为 `-->`
* `LINE_COMMENT` 示例输出：PHP 中为 `//`

下面的代码片段在 JavaScript 文件中插入 `/* Hello World */`，在 HTML 文件中插入 `<!-- Hello World -->`：

```json
{
    "hello": {
        "scope": "javascript,html",
        "prefix": "hello",
        "body": "$BLOCK_COMMENT_START Hello World $BLOCK_COMMENT_END"
    }
}
```

### 变量变换

变换允许您在插入变量之前修改变量的值。变换的定义由三部分组成：

1. 一个正则表达式，与变量的值进行匹配，如果变量无法解析则匹配空字符串。
2. 一个"格式字符串"，允许引用正则表达式中的匹配组。格式字符串支持条件插入和简单修改。
3. 传递给正则表达式的选项。

以下示例插入当前文件的文件名（不含扩展名），因此对于 `foo.txt`，它将生成 `foo`。

```
${TM_FILENAME/(.*)\\..+$/$1/}
  |           |         |  |
  |           |         |  |-> 无选项
  |           |         |
  |           |         |-> 引用第一个捕获组的内容
  |           |
  |           |-> 用于捕获最后一个 `.suffix` 之前
  |               所有内容的正则表达式
  |
  |-> 解析为文件名
```

### 占位符变换

与变量变换类似，占位符变换允许在移动到下一个制表位时更改占位符的插入文本。
插入的文本与正则表达式进行匹配，匹配项将根据选项被替换为指定的替换格式文本。
占位符的每次出现都可以使用第一个占位符的值独立定义自己的变换。
占位符变换的格式与变量变换的格式相同。

### 变换示例

示例以双引号显示，就像它们在代码片段主体中出现的那样，以说明需要对某些字符进行双重转义。以下是针对文件名 `example-123.456-TEST.js` 的示例变换及其结果输出。

示例 | 输出 | 说明
-------------|--------|------------
`"${TM_FILENAME/[\\.]/_/}"` | `example-123_456-TEST.js` | 将第一个 `.` 替换为 `_`
`"${TM_FILENAME/[\\.-]/_/g}"` | `example_123_456_TEST_js` | 将每个 `.` 或 `-` 替换为 `_`
`"${TM_FILENAME/(.*)/${1:/upcase}/}"` | `EXAMPLE-123.456-TEST.JS` | 全部改为大写
`"${TM_FILENAME/[^0-9a-z]//gi}"` | `example123456TESTjs` | 移除非字母数字字符

### 语法

以下是代码片段的 EBNF（[扩展巴科斯-瑙尔范式](https://en.wikipedia.org/wiki/Extended_Backus-Naur_form)）。使用 `\`（反斜杠）可以对 `$`、`}` 和 `\` 进行转义。在选项元素中，反斜杠还可以对逗号和管道符进行转义。只有需要转义的字符才能被转义，因此在这些结构中不应转义 `$`，在选项结构中也不应转义 `$` 和 `}`。

```
any         ::= tabstop | placeholder | choice | variable | text
tabstop     ::= '$' int
                | '${' int '}'
                | '${' int  transform '}'
placeholder ::= '${' int ':' any '}'
choice      ::= '${' int '|' text (',' text)* '|}'
variable    ::= '$' var | '${' var '}'
                | '${' var ':' any '}'
                | '${' var transform '}'
transform   ::= '/' regex '/' (format | text)+ '/' options
format      ::= '$' int | '${' int '}'
                | '${' int ':' '/upcase' | '/downcase' | '/capitalize' | '/camelcase' | '/pascalcase' | '/snakecase' | '/kebabcase' '}'
                | '${' int ':+' if '}'
                | '${' int ':?' if ':' else '}'
                | '${' int ':-' else '}' | '${' int ':' else '}'
regex       ::= JavaScript Regular Expression value (ctor-string)
options     ::= JavaScript Regular Expression option (ctor-options)
var         ::= [_a-zA-Z] [_a-zA-Z0-9]*
int         ::= [0-9]+
text        ::= .*
if          ::= text
else        ::= text
```

## 使用 TextMate 代码片段

您还可以在 VS Code 中使用现有的 TextMate 代码片段（.tmSnippets）。请参阅我们扩展 API 部分的[使用 TextMate 代码片段](/api/language-extensions/snippet-guide.md#using-textmate-snippets)主题以了解更多信息。

## 为代码片段分配键盘快捷键

您可以创建自定义[键盘快捷键](/docs/configure/keybindings.md)来插入特定的代码片段。打开 `keybindings.json`（**首选项：打开键盘快捷方式文件**），它定义了您的所有键盘快捷键，并添加一个键盘快捷键，将 `"snippet"` 作为额外参数传递：

```json
{
  "key": "cmd+k 1",
  "command": "editor.action.insertSnippet",
  "when": "editorTextFocus",
  "args": {
    "snippet": "console.log($1)$0"
  }
}
```

该键盘快捷键将调用**插入代码片段**命令，但不会提示您选择代码片段，而是直接插入提供的代码片段。您可以按照通常的方式定义自定义[键绑定](/docs/configure/keybindings.md)，包括键盘快捷键、命令 ID 以及可选的[条件子句上下文](/docs/configure/keybindings.md#when-clause-contexts)，用于指定键盘快捷键何时启用。

此外，除了使用 `snippet` 参数值来内联定义代码片段外，您还可以通过使用 `langId` 和 `name` 参数来引用现有代码片段。`langId` 参数选择由 `name` 指定的代码片段所对应的语言，例如下面的示例选择了适用于 `csharp` 文件的 `myFavSnippet`。

```json
{
  "key": "cmd+k 1",
  "command": "editor.action.insertSnippet",
  "when": "editorTextFocus",
  "args": {
    "langId": "csharp",
    "name": "myFavSnippet"
  }
}
```

## 后续步骤

* [命令行](/docs/configure/command-line.md) - VS Code 具有丰富的命令行界面，用于打开或比较文件以及安装扩展。
* [扩展 API](/api) - 了解扩展 VS Code 的其他方式。
* [代码片段指南](/api/language-extensions/snippet-guide.md) - 您可以打包代码片段以在 VS Code 中使用。

## 常见问题

### 如果我想使用 .tmSnippet 文件中的现有 TextMate 代码片段怎么办？

您可以轻松地打包 TextMate 代码片段文件以在 VS Code 中使用。请参阅我们扩展 API 文档中的[使用 TextMate 代码片段](/api/language-extensions/snippet-guide.md#using-textmate-snippets)。

### 如何在粘贴的脚本中让代码片段放置一个变量？

要在粘贴的脚本中包含一个变量，您需要转义 `$variable` 名称中的 `$`，以免它在代码片段展开阶段被解析。

```json
"VariableSnippet":{
    "prefix": "_Var",
    "body": "\\$MyVar = 2",
    "description": "A basic snippet that places a variable into script with the $ prefix"
  }
```

这将使粘贴的代码片段结果为：

```
$MyVar = 2
```

### 我可以从 IntelliSense 中移除代码片段吗？

可以，您可以通过选择**插入代码片段**命令下拉列表中代码片段项右侧的**从 IntelliSense 中隐藏**按钮，隐藏特定代码片段不在 IntelliSense（补全列表）中显示。

 ![Hide from IntelliSense button in Insert Snippet dropdown](images/userdefinedsnippets/hide-from-intellisense.png)

 您仍然可以通过**插入代码片段**命令选择该代码片段，但隐藏的代码片段不会在 IntelliSense 中显示。
