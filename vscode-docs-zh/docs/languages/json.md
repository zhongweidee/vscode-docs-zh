---
ContentId: FB3B14D9-A59A-4968-ACFC-5FB5D4E9B70E
DateApproved: 6/10/2026
MetaDescription: 在 Visual Studio Code 中编辑 JSON 文件
---
# 在 Visual Studio Code 中编辑 JSON

JSON 是一种数据格式，常用于 `package.json` 或 `project.json` 等配置文件中。我们在 Visual Studio Code 的配置文件中也广泛使用了 JSON。当打开以 `.json` 结尾的文件时，VS Code 会提供一些功能来简化对文件内容的编写或修改。

![JSON within VS Code](images/json/json_hero.png)

## IntelliSense 与验证

对于属性和值，无论是带或不带 schema 的 JSON 数据，我们都会在您输入时通过 IntelliSense 提供建议。您也可以使用 **触发建议** 命令（`kb(editor.action.triggerSuggest)`）手动查看建议。

我们还会根据关联的 JSON schema 执行结构和值验证，并以红色波浪线标出。要禁用验证，请使用 `setting(json.validate.enable)` [设置](/docs/configure/settings.md)。

![IntelliSense](images/json/intellisense.png)

### 包和项目依赖项

我们还为特定的值集提供 IntelliSense，例如 `package.json`、`project.json` 和 `bower.json` 中的包和项目依赖项。

## 快速导航

JSON 文件可能会变得很大，我们支持使用 **转到符号** 命令（`kb(workbench.action.gotoSymbol)`）快速导航到各个属性。

![Goto Symbol](images/json/gotosymbol.png)

## 悬停提示

当您将鼠标悬停在带或不带 schema 的 JSON 数据的属性和值上时，我们会提供额外的上下文信息。

![Hover](images/json/hoverandtoggle.png)

## 格式化

您可以使用 `kb(editor.action.formatDocument)` 或从上下文菜单中选择 **格式化文档** 来格式化您的 JSON 文档。

## 折叠

您可以使用行号和行首之间装订线上的折叠图标来折叠源代码区域。所有对象和数组元素都提供折叠区域。

## 带注释的 JSON

除了遵循 [JSON 规范](https://www.json.org/) 的默认 JSON 模式外，VS Code 还有一个 **带注释的 JSON** (jsonc) 模式。此模式用于 VS Code 的配置文件，如 `settings.json`、`tasks.json` 或 `launch.json`。在 **带注释的 JSON** 模式下，您可以使用单行注释 (`//`) 和块注释 (`/* */`)，就像在 JavaScript 中一样。此模式也接受尾随逗号，但不建议这样做，编辑器会显示警告。

当前编辑器模式在编辑器的状态栏中显示。选择模式指示器可以更改模式，并配置文件扩展名与模式的关联方式。您也可以直接修改 `setting(files.associations)` [设置](/docs/languages/overview.md#add-a-file-extension-to-a-language)，将文件名或文件名模式关联到 `jsonc`。

## JSON schema 与设置

为了理解 JSON 文件的结构，我们使用 [JSON schemas](https://json-schema.org/)。JSON schemas 描述了 JSON 文件的形状、值集、默认值和描述。VS Code 自带的 JSON 支持涵盖了草案 4 至草案 7 的所有版本，对 2019-09 和 2020-12 草案的支持有限。

像 [JSON Schema Store](https://www.schemastore.org) 这样的服务器为大多数常见的基于 JSON 的配置文件提供了 schema。不过，schema 也可以在 VS Code 工作区的文件以及 VS Code 的设置文件中定义。

将 JSON 文件与 schema 关联，既可以在 JSON 文件内部使用 `$schema` 属性来完成，也可以在用户或工作区 [设置](/docs/configure/settings.md)（**文件** > **首选项** > **设置**）中的 `setting(json.schemas)` 属性下完成。

VS Code 扩展也可以定义 schema 及其映射。这就是为什么 VS Code 已经知道某些常见的 JSON 文件（如 `package.json`、`bower.json` 和 `tsconfig.json`）的 schema。

### 在 JSON 中进行映射

在下面的示例中，JSON 文件指定其内容遵循 [CoffeeLint](https://coffeelint.github.io/) schema。

```json
{
   "$schema": "https://json.schemastore.org/coffeelint",
   "line_endings": "unix"
}
```

请注意，此语法是 VS Code 特有的，并非 [JSON Schema 规范](https://json-schema.org/specification) 的一部分。添加 `$schema` 键会改变 JSON 本身的内容，消费该 JSON 的系统可能不会预料到这一点，例如，schema 验证可能会失败。如果是这种情况，您可以使用其他映射方法。

### 在用户设置中进行映射

以下用户 [设置](/docs/configure/settings.md) 的摘录展示了如何将 `.babelrc` 文件映射到位于 [https://json.schemastore.org/babelrc](https://json.schemastore.org/babelrc) 的 [babelrc](https://babeljs.io/docs/usage/babelrc) schema。

```json
"json.schemas": [
    {
        "fileMatch": [
            "/.babelrc"
        ],
        "url": "https://json.schemastore.org/babelrc"
    }
]
```

>**提示：**除了为 `.babelrc` 定义 schema 外，还要确保 `.babelrc` 与 JSON 语言模式相关联。这也可以在设置中使用 `files.association` 数组设置来完成。

### 映射到工作区中的 schema

要映射位于工作区中的 schema，请使用相对路径。在此示例中，工作区根目录中名为 `myschema.json` 的文件将被用作所有以 `.foo.json` 结尾的文件的 schema。

```json
"json.schemas": [
    {
        "fileMatch": [
            "**/*.foo.json"
        ],
        "url": "./myschema.json"
    }
]
```

### 映射到在设置中定义的 schema

要映射在用户或工作区设置中定义的 schema，请使用 `schema` 属性。在此示例中，定义了一个 schema，该 schema 将用于所有名为 `.myconfig` 的文件。

```json
"json.schemas": [
    {
        "fileMatch": [
            "/.myconfig"
        ],
        "schema": {
            "type": "object",
            "properties": {
                "name" : {
                    "type": "string",
                    "description": "The name of the entry"
                }
            }
        }
    }
]
```

### 在扩展中进行映射

Schema 及其关联也可以通过扩展来定义。请参阅 [jsonValidation 贡献点](/api/references/contribution-points.md#contributesjsonvalidation)。

### 文件匹配语法

文件匹配语法支持 '*' 通配符。此外，您还可以定义以 '!' 开头的排除模式。要使关联生效，至少需要一个模式匹配，并且最后一个匹配的模式不能是排除模式。

```json
  "json.schemas": [
    {
      "fileMatch": [
        "/receipts/*.json",
        "!/receipts/*.excluded.json"
      ],
      "url": "./receipts.schema.json"
    }
  ]
```

### 在 JSON schema 中定义代码片段

JSON schema 描述了 JSON 文件的形状、值集和默认值，这些被 JSON 语言支持用来提供补全建议。如果您是 schema 作者，并且想要提供更自定义的补全建议，您还可以在 schema 中指定代码片段。

以下示例展示了一个键盘快捷键设置文件的 schema，其中定义了一个代码片段：

```json
{
    "type": "array",
    "title": "Keyboard shortcuts configuration",
    "items": {
        "type": "object",
        "required": ["key"],
        "defaultSnippets": [
            {
                "label": "New keyboard shortcut",
                "description": "Binds a key to a command for a given state",
                "body": { "key": "$1", "command": "$2", "when": "$3" }
            }
        ],
        "properties": {
            "key": {
                "type": "string"
            }
            ...
        }
    }
}
```

这是 JSON schema 中的示例：

![Default snippets in JSON schema](images/json/defaultSnippets.png)

使用属性 `defaultSnippets` 可以为给定的 JSON 对象指定任意数量的代码片段。

- `label` 和 `description` 将显示在补全选择对话框中。如果未提供 label，则会将代码片段的字符串化对象表示形式作为 label 显示。
- `body` 是一个 JSON 对象，当用户选择补全项时，它会被字符串化并插入。[代码片段语法](/docs/editing/userdefinedsnippets.md#snippet-syntax) 可以在字符串字面量内部使用，以定义制表位、占位符和变量。如果字符串以 `^` 开头，字符串内容将按原样插入，而不进行字符串化。您可以使用这种方式为数字和布尔值指定代码片段。

请注意，`defaultSnippets` 不是 JSON schema 规范的一部分，而是 VS Code 特有的 schema 扩展。

### 在悬停提示中使用富文本格式

VS Code 将使用 [JSON Schema 规范](https://json-schema.org/specification) 中的标准 `description` 字段，以便在悬停和自动补全时提供有关属性的信息。

如果您希望描述支持链接等格式，可以使用 `markdownDescription` 属性在格式设置中选择使用 [Markdown](/docs/languages/markdown.md)。

```json
{
   "$schema": "http://json-schema.org/draft-07/schema#",
   "type": "object",
   "properties": {
       "name" : {
           "type": "string",
           "description": "The name of the entry",
           "markdownDescription": "The name of the entry. [See the documentation](https://example.com)"
       }
   }
}
```

请注意，`markdownDescription` 不是 JSON schema 规范的一部分，而是 VS Code 特有的 schema 扩展。

### 离线模式

`setting(json.schemaDownload.enable)` 控制 JSON 扩展是否从 `http` 和 `https` 获取 JSON schema。

当当前编辑器需要使用无法下载的 schema 时，状态栏中会显示一个警告三角。
