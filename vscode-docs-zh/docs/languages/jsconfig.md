---
ContentId: 201cd81d-523c-4f62-b1f5-ed26c091657b
DateApproved: 6/10/2026
MetaDescription: 查看 jsconfig.json 参考文档。
---
# jsconfig.json

## 什么是 jsconfig.json？

目录中存在 `jsconfig.json` 文件表示该目录是 JavaScript 项目的根目录。`jsconfig.json` 文件指定了根文件以及 [JavaScript 语言服务](https://github.com/microsoft/TypeScript/wiki/JavaScript-Language-Service-in-Visual-Studio) 提供的功能的选项。

> **提示：** 如果你不使用 JavaScript，则无需关心 `jsconfig.json`。

> **提示：** `jsconfig.json` 是 [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 的后代，后者是 TypeScript 的配置文件。`jsconfig.json` 就是 `tsconfig.json` 并将 `"allowJs"` 属性设置为 `true`。

## 为什么需要 jsconfig.json 文件？

Visual Studio Code 的 JavaScript 支持可以在两种不同模式下运行：

* **文件作用域 - 无 jsconfig.json**：在此模式下，在 Visual Studio Code 中打开的 JavaScript 文件被视为独立单元。只要文件 `a.js` 没有显式引用文件 `b.ts`（通过 `import` 或 **CommonJS** [模块](https://wiki.commonjs.org/wiki/Modules/1.0)），两个文件之间就没有共同的项目上下文。

* **显式项目 - 有 jsconfig.json**：JavaScript 项目通过 `jsconfig.json` 文件定义。目录中存在此类文件表示该目录是 JavaScript 项目的根目录。该文件本身可以选择性地列出属于项目的文件、要从项目中排除的文件以及编译器选项（见下文）。

当工作区中存在定义项目上下文的 `jsconfig.json` 文件时，JavaScript 体验会得到改善。因此，当你在新工作区中打开 JavaScript 文件时，我们会提示你创建 `jsconfig.json` 文件。

### jsconfig.json 的位置

我们通过创建 `jsconfig.json` 文件来将这部分代码（我们网站的客户端）定义为 JavaScript 项目。将该文件放在 JavaScript 代码的根目录下，如下所示。

![jsconfig setup](images/javascript/jsconfig_setup.png)

在更复杂的项目中，你可能在工作区中定义了多个 `jsconfig.json` 文件。这样做是为了避免一个项目中的代码被作为另一个项目中代码的 IntelliSense 建议。下图展示了一个包含 `client` 和 `server` 文件夹的项目，显示了两个独立的 JavaScript 项目。

![multiple jsconfigs](images/javascript/complex_jsconfig_setup.png)

## 示例

默认情况下，JavaScript 语言服务将分析并为你的 JavaScript 项目中的所有文件提供 IntelliSense。你需要指定要排除或包含哪些文件，以便提供适当的 IntelliSense。

### 使用 `"exclude"` 属性

`exclude` 属性（一种 [glob 模式](/docs/editor/glob-patterns.md)）告诉语言服务哪些文件不是源代码的一部分。这有助于保持高性能。如果 IntelliSense 运行缓慢，请将文件夹添加到 `exclude` 列表中（VS Code 在检测到速度变慢时会提示你这样做）。

```json
{
    "compilerOptions": {
        "module": "CommonJS",
        "target": "ES6"
    },
    "exclude": [
        "node_modules"
    ]
}
```

> **提示：** 你应该 `exclude` 构建过程中生成的文件（例如 `dist` 目录）。这些文件会导致建议出现两次并降低 IntelliSense 的速度。

### 使用 `"include"` 属性

或者，你可以使用 `include` 属性（一种 [glob 模式](/docs/editor/glob-patterns.md)）显式设置项目中的文件。如果未指定 `include` 属性，则默认包含所在目录及其子目录中的所有文件。当指定了 `include` 属性时，仅包含这些文件。以下是一个带有显式 `include` 属性的示例。

```json
{
    "compilerOptions": {
        "module": "CommonJS",
        "target": "ES6"
    },
    "include": [
        "src/**/*"
    ]
}
```

> **提示：** `exclude` 和 `include` 中的文件路径是相对于 `jsconfig.json` 所在位置的。

## jsconfig 选项

以下是用于配置 JavaScript 语言支持的 `jsconfig` `"compilerOptions"`。

> **提示：** 不要被 `compilerOptions` 所困惑，因为 JavaScript 不需要实际编译。此属性的存在是因为 `jsconfig.json` 是 `tsconfig.json` 的后代，后者用于编译 TypeScript。

选项  | 描述
----------------|-----
`noLib` | 不包含默认库文件（lib.d.ts）
`target`| 指定要使用的默认库（lib.d.ts）。可选值为 "ES3"、"ES5"、"ES6"、"ES2015"、"ES2016"、"ES2017"、"ES2018"、"ES2019"、"ES2020"、"ES2021"、"ES2022"、"ES2023"、"ESNext"。
`module` | 指定生成模块代码时使用的模块系统。可选值为 "AMD"、"CommonJS"、"ES2015"、"ES2020"、"ES2022"、"ES6"、"Node16"、"NodeNext"、"ESNext"、"None"、"System"、"UMD"。
`moduleResolution` | 指定导入模块的解析方式。可选值为 "Node"、"Classic"、"Node16"、"NodeNext"、"Bundler"。
`checkJs` | 对 JavaScript 文件启用类型检查。
`experimentalDecorators`| 启用对提议的 ES 装饰器的实验性支持。
`allowSyntheticDefaultImports`| 允许从没有默认导出的模块中进行默认导入。这不会影响代码输出，仅影响类型检查。
`baseUrl`| 解析非相对模块名称的基本目录。
`paths`| 指定相对于 baseUrl 选项计算的路径映射。

你可以在 [TypeScript compilerOptions 文档](https://www.typescriptlang.org/tsconfig#compilerOptions) 中阅读更多关于可用 `compilerOptions` 的信息。

## 使用 webpack 别名

要使 IntelliSense 与 webpack 别名配合使用，你需要使用 [glob 模式](/docs/editor/glob-patterns.md) 指定 `paths` 键。

例如，对于别名 'ClientApp'：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "ClientApp/*": ["./ClientApp/*"]
    }
  }
}
```

然后使用别名：

```js
import Something from 'ClientApp/foo'
```

## 最佳实践

只要可能，你应该将不属于项目源代码的 JavaScript 文件所在的文件夹排除在外。

> **提示：** 如果你在工作区中没有 `jsconfig.json`，VS Code 默认会排除 `node_modules` 文件夹。

下表列出了常见的项目组件及其建议排除的安装文件夹：

组件 | 要排除的文件夹
----------|-----------
`node` | 排除 `node_modules` 文件夹
`webpack`、`webpack-dev-server` | 排除内容文件夹，例如 `dist`。
`bower` | 排除 `bower_components` 文件夹
`ember` | 排除 `tmp` 和 `temp` 文件夹
`jspm` | 排除 `jspm_packages` 文件夹

当你的 JavaScript 项目变得过大且性能变慢时，通常是因为像 `node_modules` 这样的库文件夹。如果 VS Code 检测到你的项目变得过大，它会提示你编辑 `exclude` 列表。
