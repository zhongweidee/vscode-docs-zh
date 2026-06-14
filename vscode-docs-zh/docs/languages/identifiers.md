---
ContentId: 3f773ade-7e71-4fb9-9bb9-d9e0b20fa799
DateApproved: 6/10/2026
MetaDescription: Visual Studio Code 语言模式标识符
---
# 语言标识符

在 Visual Studio Code 中，每种[语言模式](/docs/languages/overview.md#changing-the-language-for-the-selected-file)都有一个唯一的特定语言标识符。该标识符通常很少被用户看到，除非在设置中，例如在将文件扩展名关联到某种语言时：

```json
    "files.associations": {
        "*.myphp": "php"
    }
```

请注意，标识符匹配区分大小写（'Markdown' 不等于 'markdown'）。

对于 VS Code 扩展开发者来说，语言标识符在添加新的语言功能或替换语言支持时变得至关重要。

每种语言通过扩展的 `package.json` 文件中的 `languages` 配置点来定义其 *id*：

```json
    "languages": [{
        "id": "java",
        "extensions": [ ".java", ".jav" ],
        "aliases": [ "Java", "java" ]
    }]
```

语言支持使用语言标识符进行添加：

```json
    "grammars": [{
        "language": "groovy",
        "scopeName": "source.groovy",
        "path": "./syntaxes/Groovy.tmLanguage.json"
    }],
    "snippets": [{
        "language": "groovy",
        "path": "./snippets/groovy.json"
    }]
```

```typescript
languages.registerCompletionItemProvider('php', new PHPCompletionItemProvider(), '.', '$')
```

## 新标识符指南

在定义新的语言标识符时，请遵循以下指南：

- 使用小写的编程语言名称。
- 在 Marketplace 中搜索其他扩展，查看语言标识符是否已被使用。

## 已知的语言标识符

下表列出了已知的语言标识符：

语言 | 标识符
-------- | ----------
Agent | `chatagent`
批处理 | `bat`
BibTeX | `bibtex`
二进制 | `code-text-binary`
C | `c`
C# | `csharp`
C++ | `cpp`
Clojure | `clojure`
代码片段 | `snippets`
CoffeeScript | `coffeescript`
Compose | `dockercompose`
CSS | `css`
CUDA C++ | `cuda-cpp`
Dart | `dart`
Diff | `diff`
Docker | `dockerfile`
Dotenv | `dotenv`
F# | `fsharp`
Git 提交信息 | `git-commit`
Git 变基信息 | `git-rebase`
Go | `go`
Groovy | `groovy`
Handlebars | `handlebars`
HLSL | `hlsl`
HTML | `html`
Ignore | `ignore`
Ini | `ini`
指令集 | `instructions`
Java | `java`
JavaScript | `javascript`
JavaScript JSX | `javascriptreact`
JSON | `json`
JSON 行 | `jsonl`
带注释的 JSON | `jsonc`
Julia | `julia`
Julia Markdown | `juliamarkdown`
LaTeX | `latex`
Less | `less`
日志 | `log`
Lua | `lua`
Makefile | `makefile`
Markdown | `markdown`
MS SQL | `sql`
Objective-C | `objective-c`
Objective-C++ | `objective-cpp`
Perl | `perl`
PHP | `php`
纯文本 | `plaintext`
PowerShell | `powershell`
提示词 | `prompt`
属性 | `properties`
Pug | `jade`
Python | `python`
R | `r`
Raku | `raku`
Razor | `razor`
reStructuredText | `restructuredtext`
Ruby | `ruby`
Rust | `rust`
SCSS | `scss`
搜索结果 | `search-result`
ShaderLab | `shaderlab`
Shell 脚本 | `shellscript`
技能 | `skill`
Swift | `swift`
TeX | `tex`
TypeScript | `typescript`
TypeScript JSX | `typescriptreact`
Visual Basic | `vb`
WebAssembly 文本格式 | `wat`
XML | `xml`
XSL | `xsl`
YAML | `yaml`
