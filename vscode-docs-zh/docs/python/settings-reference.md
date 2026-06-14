---
ContentId: d256dc5c-95e9-4c02-a82f-947bf34a3517
DateApproved: 02/04/2026
MetaDescription: Visual Studio Code 中 Python 扩展的设置参考
MetaSocialImage: images/tutorial/python-social.png
---
# Python 设置参考

Visual Studio Code 的 Python 扩展具有高度可配置性。本页介绍了你可以使用的主要设置。

有关在 VS Code 中使用设置的一般信息，请参阅[用户和工作区设置](/docs/configure/settings.md)，以及[变量参考](/docs/reference/variables-reference.md)中关于预定义变量支持的说明。

## 通用 Python 设置

| 设置 (python.) | 默认值 | 说明 |
| --- | --- | --- |
| condaPath | `"conda"` | `conda` 可执行文件的路径。 |
| defaultInterpreterPath | `"python"` | Python 扩展在首次加载工作区时要使用的默认 Python 解释器的路径，或者包含 Python 解释器的文件夹的路径。可以使用变量，如 `${workspaceFolder}` 和 `${workspaceFolder}/.venv`。使用文件夹路径可以让项目中的任何人在 `.venv` 文件夹中创建适合其操作系统的环境，而不必指定一个与平台相关的确切路径。然后，`settings.json` 文件可以被包含在源代码仓库中。**注意**：在已为工作区选择了某个解释器之后，对该设置所做的更改不会应用或被 Python 扩展考虑。Python 扩展不会自动添加或更改此设置。 |
| envFile | `"${workspaceFolder}/.env"` | 包含环境变量定义的文件绝对路径。请参阅[.env 文件支持](/docs/python/environments.md#env-file-support)。 |
| experiments.enabled | `true` | 启用 [Python 扩展中的 A/B 实验](https://aka.ms/AAjvt9q)。如果启用，你可能会获得提议的增强功能和/或特性的体验。 |
| globalModuleInstallation | `false` | 指定是使用 `--user` 命令行参数仅为当前用户安装包（默认行为），还是为全局环境中的所有用户安装包（设置为 `true` 时）。使用虚拟环境时此设置被忽略。有关 `--user` 参数的更多信息，请参阅 [pip - 用户安装](https://pip.pypa.io/en/stable/user_guide/#user-installs)。 |
| interpreter.infoVisibility | `"onPythonRelated"` | 控制何时在状态栏上显示已选择的解释器信息。默认情况下，仅在编辑器中有 Python 相关文件打开时才显示。你可以将其设置为 `"always"` 使其始终显示在状态栏上，或设置为 `"never"` 完全隐藏。 |
| pipenvPath | `"pipenv"` | 用于激活的 pipenv 可执行文件的路径。 |
| poetryPath | `"poetry"` | 指定 [Poetry 依赖管理器](https://poetry.eustace.io/)的可执行文件位置（如果已安装）。默认值 `"poetry"` 假定可执行文件在当前路径中。当 Poetry 可用且工作区文件夹中存在 `poetry.lock` 文件时，Python 扩展将使用此设置来安装包。 |
| REPL.enableREPLSmartSend | `true` | 指定 `Shift+Enter` 是否利用智能发送。智能发送会查找光标所在的代码，将最小的可运行代码块发送到 Python REPL，然后将光标放在下一行代码上。 |
| terminal.activateEnvInCurrentTerminal | `false` | 指定在激活 Python 扩展时，是否使用选定的虚拟环境来激活当前已打开的终端。 |
| terminal.activateEnvironment | `true` | 指示在创建新终端时，是否自动激活你使用 **Python: Select Interpreter** 命令选择的环境。例如，当此设置为 `true` 且你选择了一个虚拟环境时，扩展会在创建新终端时自动运行该环境的*激活*命令（macOS/Linux 上为 `source env/bin/activate`；Windows 上为 `env\scripts\activate`）。**注意**：当配置了 `python-envs.terminal.autoActivationType` 设置时，此设置将被其取代。 |
| terminal.executeInFileDir | `false` | 指示是否在文件所在目录中运行文件，而不是在当前文件夹中运行。 |
| terminal.focusAfterLaunch | `false` | 启动 Python 终端时，是否将光标焦点切换到终端。 |
| terminal.launchArgs | `[]` | 当你使用诸如 **Python: Run Python File in Terminal** 等命令运行文件时，传递给 Python 解释器的启动参数。在 `launchArgs` 列表中，每个项目都是一个顶层命令行元素，由空格分隔（包含空格的引用值是单个顶层元素，因此在列表中是单个项目）。例如，对于参数 `--a --b --c {"value1" : 1, "value2" : 2}`，列表项目应为 `["--a", "--b", "--c", "{\"value1\" : 1, \"value2\" : 2}\""]`。请注意，VS Code 在调试时忽略此设置，因为它会转而使用你在 `launch.json` 中选择的调试配置中的参数。 |
| terminal.useEnvFile | `false` | 控制是否将来自 env 文件和 python.envFile 设置的环境变量注入到终端中。 |
| venvFolders | `[]` | 虚拟环境所在文件夹的路径。根据所使用的虚拟化工具不同，它可以是项目本身：`${workspaceFolder}`，也可以是并排放置的所有虚拟环境的独立文件夹：`.\envs`、`~/.virtualenvs` 等。**注意**：此设置会自动与 `python-envs.globalSearchPaths` 合并。考虑迁移到新设置以获取更多功能。 |

## Python 环境扩展设置

Python 环境扩展在 VS Code 用户界面中提供环境和包管理功能。这些设置控制环境发现、创建和终端激活。

有关环境管理的更多信息，请参阅 [Python 环境](/docs/python/environments.md)。

### 环境管理设置

| 设置 (python-envs.) | 默认值 | 说明 |
| --- | --- | --- |
| defaultEnvManager | `"ms-python.python:venv"` | 用于创建和管理环境的默认环境管理器。 |
| defaultPackageManager | `"ms-python.python:pip"` | 在环境中安装包的默认包管理器。 |
| pythonProjects | `[]` | Python 项目列表。每个项目都是一个包含以下属性的对象：`path`（字符串）、`envManager`（字符串）、`packageManager`（字符串）。用于在多根工作区中配置按文件夹划分的环境。 |
| workspaceSearchPaths | `["./**/.venv"]` | 用于在此工作区中搜索环境的 glob 模式。默认情况下，搜索工作区中任何名为 `.venv` 的文件夹。**注意**：此设置必须配置在工作区或文件夹级别，而非用户级别。 |
| globalSearchPaths | `[]` | 用于在所有工作区中搜索 Python 环境的绝对路径。用于共享环境文件夹，如 `~/envs`。**注意**：旧版设置 `python.venvPath` 和 `python.venvFolders` 会自动与此设置合并。 |
| alwaysUseUv | `true` | 设置为 `true` 时，[uv](https://github.com/astral-sh/uv) 将用于管理所有虚拟环境（如果可用）。设置为 `false` 时，uv 将仅管理由 uv 显式创建的虚拟环境。 |

### 终端设置

| 设置 (python-envs.terminal.) | 默认值 | 说明 |
| --- | --- | --- |
| autoActivationType | `"command"` | 指定扩展如何在终端中激活环境。可用值：`command`（通过在终端中执行命令来激活）、`shellStartup`（通过 shell 集成或修改终端 shell 启动脚本来激活，支持 zsh、fish、pwsh、bash、cmd）、`off`（不自动激活）。**注意**：此设置优先于 `python.terminal.activateEnvironment`。 |
| showActivateButton | `false` | （实验性）是否在终端菜单中显示"激活"按钮。 |

### 旧版设置迁移

如果你正在从较旧的 Python 扩展设置迁移，下表显示了新旧设置的映射关系：

| 旧版设置 | 新设置 | 备注 |
| --- | --- | --- |
| `python.venvPath` | `python-envs.globalSearchPaths` 或 `python-envs.workspaceSearchPaths` | 旧版设置仍然有效，会自动合并。考虑迁移使用 glob 模式。 |
| `python.venvFolders` | `python-envs.globalSearchPaths` 或 `python-envs.workspaceSearchPaths` | 旧版设置仍然有效，会自动合并。 |
| `python.terminal.activateEnvironment` | `python-envs.terminal.autoActivationType` | 设置为 `"off"` 可禁用自动激活。新设置在配置后优先。 |

## 调试器设置

### 通用调试

| 设置 (python.debugpy.) | 默认值 | 说明 | 另请参阅 |
| --- | --- | --- | --- |
| debugJustMyCode | `true` | 指定调试器是否应仅单步执行用户编写的代码。禁用后，你也可以单步执行库代码。 | [调试](/docs/python/debugging.md) |

## 测试设置

### 通用测试

| 设置 (python.testing.) | 默认值 | 说明 | 另请参阅 |
| --- | --- | --- | --- |
| autoTestDiscoverOnSaveEnabled | `true` | 指定在保存测试文件时是否启用或禁用自动运行测试发现。 | [测试](/docs/python/testing.md) |
| cwd | null | 指定可选的测试工作目录。 | [测试](/docs/python/testing.md) |
| debugPort | `3000` | 用于调试 unittest 测试的端口号。 | [测试](/docs/python/testing.md) |
| promptToConfigure | `true` | 指定当发现潜在的测试时，VS Code 是否提示配置测试框架。 | [测试](/docs/python/testing.md) |

### unittest 框架

| 设置 (python.testing.) | 默认值 | 说明 | 另请参阅 |
| --- | --- | --- | --- |
| unittestArgs | `["-v", "-s", ".", "-p", "*test*.py"]` | 传递给 unittest 的参数，其中每个由空格分隔的顶层元素都是列表中的单独项目。 | [测试](/docs/python/testing.md) |
| unittestEnabled | `false` | 指定是否为测试启用 unittest。 | [测试](/docs/python/testing.md) |

### pytest 框架

| 设置 (python.testing.) | 默认值 | 说明 | 另请参阅 |
| --- | --- | --- | --- |
| pytestArgs | `[]` | 传递给 pytest 的参数，其中每个由空格分隔的顶层元素都是列表中的单独项目。当调试安装了 pytest-cov 的测试时，请在这些参数中包含 `--no-cov`。 | [测试](/docs/python/testing.md) |
| pytestEnabled | `false` | 指定是否为测试启用 pytest。 | [测试](/docs/python/testing.md) |
| pytestPath | `"pytest"` | pytest 的路径。如果 pytest 位于当前环境之外，请使用完整路径。 | [测试](/docs/python/testing.md) |

## 代码分析设置

### IntelliSense 引擎设置

> **注意：** 如果你从未更改过语言服务器设置，则你的语言服务器会通过"Default"设置值使用 Pylance。

| 设置 (python.) | 默认值 | 说明 |
| --- | --- | --- |
| languageServer | Default | 定义语言服务器的类型（Default、[Pylance](https://devblogs.microsoft.com/python/announcing-pylance-fast-feature-rich-language-support-for-python-in-visual-studio-code/)、Jedi 和 None）。 |

### Python 语言服务器设置

#### Pylance 语言服务器

语言服务器设置在 `python.languageServer` 为 `Pylance` 或 `Default` 时适用。如果你在使用语言服务器时遇到困难，请参阅语言服务器仓库中的[故障排除](https://github.com/microsoft/pylance-release/blob/main/TROUBLESHOOTING.md)。

| 设置 (python.analysis.) | 默认值 | 说明 |
| --- | --- | --- |
| aiCodeActions | true | 是否启用特定的 AI 辅助代码操作。需要启用 [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) 扩展。接受的值是一个对象，以代码操作为键，布尔值为值。可用的代码操作：`implementAbstractClasses`（启用以实现从抽象类继承的类方法的代码操作，使用来自 GitHub Copilot 的 AI 建议填充方法体）。使用示例：`{"implementAbstractClasses": true}` |
| autoFormatStrings | false | 在字符串中键入 "{" 时，是否自动为其添加 "f" 前缀。 |
| autoImportCompletions | false | 控制是否在补全中提供自动导入。可用值为 `true` 和 `false`。 |
| autoIndent | true | 键入 Python 代码时，是否根据语言语义自动调整缩进。接受的值为 `true` 或 `false`。 |
| autoSearchPaths | true | 指示是否基于某些预定义名称（如 `src`）自动添加搜索路径。可用值为 `true` 和 `false`。 |
| completeFunctionParens | false | 为函数补全添加括号。接受的值为 `true` 和 `false`。 |
| diagnosticMode | openFilesOnly | 指定语言服务器分析哪些代码文件中的问题。可用值为 `workspace` 和 `openFilesOnly`。 |
| diagnosticSeverityOverrides | {} | 允许用户覆盖各个诊断规则的严重性级别。对于每个规则，可用的严重性级别有 `error`（红色波浪线）、`warning`（黄色波浪线）、`information`（蓝色波浪线）和 `none`（禁用规则）。有关用于诊断严重性规则的键的信息，请参阅下方的 **诊断严重性规则** 部分。 |
| enableEditableInstalls | `false` | 通过解析以可编辑模式安装的包（`pip install -e .`）的导入路径来启用改进的 IntelliSense 支持，如 [PEP 660](https://peps.python.org/pep-0660/) 所定义。 |
| exclude | [] | 不应包含在分析中的目录或文件路径。这些路径会覆盖 `python.analysis.include` 设置中列出的目录，从而可以排除特定的子目录。请注意，列在此 `exclude` 设置中的文件如果在未排除的源文件中被引用/导入，仍可能包含在分析中。路径可以包含通配符，如 `**`（一个目录或多级目录）、`*`（零个或多个字符的序列）或 `?`（单个字符）。如果未指定排除路径，Pylance 会自动排除以下内容：`**/node_modules`、`**/__pycache__`、`.git` 和任何虚拟环境目录。 |
| extraPaths | [] | 指定用于导入解析的额外搜索路径。接受以字符串指定的路径，如果有多个路径，则用逗号分隔。例如：`["path 1","path 2"]`。 |
| importFormat | absolute | 定义自动导入模块时的默认格式。接受值 `absolute` 或 `relative`。 |
| include | [] | 应包含在分析中的目录或文件路径。如果未指定路径，Pylance 默认使用包含工作区根目录的目录。路径可以包含通配符，如 `**`（一个目录或多级目录）、`*`（零个或多个字符的序列）或 `?`（单个字符）。 |
| fixAll | `[]` | 运行 **Fix All** 命令或 `source.fixAll` 代码操作时要运行的代码操作列表。接受值：`source.unusedImports`（移除打开文件中所有未使用的导入）、`source.convertImportFormat`（根据 `python.analysis.importFormat` 设置转换导入格式）。 |
| includeAliasesFromUserFiles | false | 是否在自动导入建议和添加导入快速修复中包含来自用户文件的别名符号。禁用时，Pylance 将提供来自符号定义位置的导入建议。启用时，它还将提供来自导入了该符号（即别名）的文件的导入建议。可用值为 `true` 和 `false`。 |
| ignore | [] | 应抑制其诊断输出（错误和警告）的目录或文件路径，即使它们是包含的文件或在包含文件的可传递闭包中也是如此。路径可以包含通配符，如 `**`（一个目录或多级目录）、`*`（零个或多个字符的序列）或 `?`（单个字符）。如果未提供值，将使用 `python.linting.ignorePatterns` 的值（如果已设置）。 |
| indexing | true | 用于指定 Pylance 是否应在启动时为已安装的第三方库以及用户文件建立索引，以便在自动导入、快速修复、自动补全等功能中提供更完整的符号集。接受值为 `true` 或 `false`。设置为 `true` 时，默认情况下 Pylance 会为已安装包的顶层符号（即 `package/__init__.py` 下的 `__all__` 中的符号）以及最多 2000 个用户文件中的所有符号建立索引。设置为 `false` 时，Pylance 将仅显示已在先前在编辑器中打开或加载的文件中被引用或使用的符号。 |
| inlayHints.callArgumentNames | off | 控制调用参数名的内联提示显示。可用值为 `off`、`partial` 和 `all`。设置为 `off` 时，不显示内联提示。设置为 `partial` 时，对仅位置参数和仅关键字参数禁用提示。设置为 `all` 时，显示所有参数的提示。 |
| inlayHints.functionReturnTypes | false | 是否显示函数返回类型的内联提示。接受值为 `true` 或 `false`。 |
| inlayHints.pytestParameters | false | 是否显示 pytest 夹具参数类型的内联提示。接受值为 `true` 或 `false`。 |
| inlayHints.variableTypes | false | 是否显示变量类型的内联提示。接受值为 `true` 或 `false`。 |
| languageServerMode | default | 提供预定义配置，以根据开发需求优化 Pylance 的性能。可用值为 `default` 和 `light`。设置为 `default` 时，语言服务器为大多数机器提供足够的功能，而不会使系统过载。设置为 `light` 时，它启用轻量级、节省内存的设置。此模式禁用各种功能，使 Pylance 更像精简的文本编辑器，非常适合那些不需要全面 IntelliSense 功能并希望 Pylance 尽可能节省资源的人。在 `light` 模式下，以下设置会被覆盖：`python.analysis.exclude` 设为 `["**"]`，`python.analysis.useLibraryCodeForTypes` 设为 `false`，`python.analysis.enablePytestSupport` 设为 `false`，以及 `python.analysis.indexing` 设为 `false`。 |
| logLevel | `Error` | 指定语言服务器执行的日志记录级别。可能的日志记录级别按提供信息量递增排列如下：`Error`、`Warning`、`Information` 和 `Trace`。 |
| nodeArguments | `"--max-old-space-size=8192"` | 指定直接传递给由 `python.analysis.nodeExecutable` 定义的自定义 Node.js 可执行文件的自定义参数。可用于分配更多内存或配置 Node.js 行为。接受 Node.js 支持的参数列表。每个 `"arg=value"` 应在列表中以逗号分隔。使用示例：`"python.analysis.nodeArguments": ["--max-old-space-size=8192"]` |
| nodeExecutable | `""` | 指定要使用的 Node.js 可执行文件，这允许 Pylance 分配更多内存。接受值为带有可执行文件路径的字符串、空字符串或 `"auto"`。设置为空字符串时，Pylance 将使用 VS Code 的 node 可执行文件。设置为 `"auto"` 时，它会自动下载 [Node.js](https://nodejs.org/dist/)。 |
| packageIndexDepths | [] | 用于按包覆盖已安装包下的索引深度层级。默认情况下，仅索引顶层模块（深度 = 1）。要索引子模块，每深入一层子模块，深度增加 1。接受值是一个对象元组，如 `{"name": "包名（str）", "depth": "扫描深度（int）", "includeAllSymbols": "是否包含所有符号（bool）"}`。如果 `includeAllSymbols` 设为 `false`，则仅包含每个包的 `__all__` 中的符号。当设为 `true` 时，Pylance 将索引文件中的每个模块/顶层符号声明。使用示例：`[{"name": "sklearn", "depth": 2, "includeAllSymbols": true}, {"name": "matplotlib", "depth": 3, "includeAllSymbols": false}]` |
| stubPath | ./typings | 指定包含自定义类型存根的目录路径。每个包的类型存根文件应位于其自己的子目录中。 |
| typeCheckingMode | off | 指定要执行的类型检查分析级别。可用值为 `off`、`basic` 和 `strict`。设置为 `off` 时，不执行类型检查分析；产生未解析导入/变量诊断。设置为 `basic` 时，使用非类型检查相关规则（`off` 中的所有规则）以及基本的类型检查规则。设置为 `strict` 时，以最高严重性级别 `error` 使用所有类型检查规则（包括 `off` 和 `basic` 类别中的所有规则）。 |
| useLibraryCodeForTypes | true | 在找不到类型存根时，解析包的源代码。可用值为 `true` 和 `false`。 |
| userFileIndexingLimit | 2000 | 设置 Pylance 在工作区中索引的最大用户文件数。设置为 -1 时，Pylance 将索引所有文件。请注意，索引文件是一项性能密集型任务。 |

**诊断严重性规则**

本部分详细说明了可以使用 `python.analysis.diagnosticSeverityOverrides` 设置自定义的所有可用规则，如下例所示。

```json
{
    "python.analysis.diagnosticSeverityOverrides": {
        "reportUnboundVariable": "information",
        "reportImplicitStringConcatenation": "warning"
    }
}
```

| 值 | 说明 |
| --- | ---|
| reportAssertAlwaysTrue | 针对可能始终为真的 'assert' 语句的诊断。这可能表明存在编程错误。 |
| reportCallInDefaultInitializer | 针对默认值初始化表达式中的函数调用的诊断。此类调用可能掩盖在模块初始化时执行的昂贵操作。 |
| reportConstantRedefinition | 针对尝试重新定义全大写且包含下划线和数字的变量名的诊断。 |
| reportDuplicateImport | 针对被多次导入的导入符号或模块的诊断。 |
| reportFunctionMemberAccess | 针对函数上的成员访问的诊断。 |
| reportGeneralTypeIssues | 针对一般类型不一致、不支持的操作、参数/形参不匹配等的诊断。这涵盖了未被其他规则涵盖的所有基本类型检查规则。不包括语法错误。 |
| reportImportCycles | 针对循环导入链的诊断。这些在 Python 中不是错误，但它们会减慢类型分析速度，并且通常暗示架构分层问题。通常应避免使用。 |
| reportImplicitStringConcatenation | 针对两个或多个连续字符串字面量导致隐式拼接的诊断。这被认为是一种不良实践，通常会掩盖诸如遗漏逗号之类的错误。 |
| reportIncompatibleMethodOverride | 针对以不兼容方式（参数数量错误、参数类型不兼容或返回类型不兼容）覆盖基类中同名方法的方法的诊断。 |
| reportIncompatibleVariableOverride | 针对以与基类符号类型不兼容的类型覆盖基类中同名符号的类变量声明的诊断。 |
| reportInvalidStringEscapeSequence | 针对字符串字面量中使用的无效转义序列的诊断。Python 规范指出此类序列将在未来版本中生成语法错误。 |
| reportInvalidStubStatement | 针对不应出现在存根文件中的语句的诊断。 |
| reportInvalidTypeVarUse | 针对函数签名中类型变量使用不当的诊断。 |
| reportMissingImports | 针对没有对应的已导入 Python 文件或类型存根文件的导入的诊断。 |
| reportMissingModuleSource | 针对没有对应源文件的导入的诊断。当找到类型存根但未找到模块源文件时会发生这种情况，表明代码在此执行环境中运行时可能会失败。类型检查将使用类型存根进行。 |
| reportMissingTypeArgument | 针对泛型类在使用时未提供显式或隐式类型参数的情况的诊断。 |
| reportMissingTypeStubs | 针对没有对应类型存根文件（typeshed 文件或自定义类型存根）的导入的诊断。类型检查器需要类型存根才能进行最佳分析。 |
| reportOptionalCall | 针对尝试调用 Optional 类型变量的诊断。 |
| reportOptionalContextManager | 针对尝试将 Optional 类型用作上下文管理器（作为 with 语句的参数）的诊断。 |
| reportOptionalIterable | 针对尝试将 Optional 类型用作可迭代值（例如在 for 语句中）的诊断。 |
| reportOptionalMemberAccess | 针对尝试访问 Optional 类型变量的成员的诊断。 |
| reportOptionalOperand | 针对尝试将 Optional 类型用作二元或一元运算符（如 '+'、'=='、'or'、'not'）的操作数的诊断。 |
| reportOptionalSubscript | 针对尝试对 Optional 类型变量进行下标（索引）操作的诊断。 |
| reportPrivateUsage | 针对私有或受保护变量或函数使用不当的诊断。受保护类成员以单下划线 `_` 开头，只能被子类访问。私有类成员以双下划线开头但不以双下划线结尾，只能在声明类中访问。在类外部声明的变量和函数如果名称以单下划线或双下划线开头，则被视为私有，且不能在声明模块外部访问。 |
| reportPropertyTypeMismatch | 针对属性中传入 setter 的值类型与 getter 返回的值类型不兼容的诊断。此类不匹配违反了属性的预期用途，即属性应当像变量一样运行。 |
| reportSelfClsParameterName | 针对实例方法中缺少或命名错误的 "self" 参数，以及类方法中缺少或命名错误的 "cls" 参数的诊断。元类（从 "type" 派生的类）中的实例方法允许使用 "cls" 作为实例方法参数。 |
| reportUndefinedVariable | 针对未定义变量的诊断。 |
| reportUnboundVariable | 针对未绑定和可能未绑定的变量的诊断。 |
| reportUnknownArgumentType | 针对函数或方法的调用参数具有未知类型的诊断。 |
| reportUnknownLambdaType | 针对 lambda 表达式的输入或返回参数具有未知类型的诊断。 |
| reportUnknownMemberType | 针对类或实例变量具有未知类型的诊断。 |
| reportUnknownParameterType | 针对函数或方法的输入或返回参数具有未知类型的诊断。 |
| reportUnknownVariableType | 针对具有未知类型的变量的诊断。 |
| reportUnnecessaryCast | 针对静态确定为不必要的 'cast' 调用的诊断。此类调用有时表明存在编程错误。 |
| reportUnnecessaryIsInstance | 针对静态确定结果始终为 true 或始终为 false 的 'isinstance' 或 'issubclass' 调用的诊断。此类调用通常表明存在编程错误。 |
| reportUnusedCallResult | 针对调用表达式的结果未被使用且不为 None 的诊断。 |
| reportUnusedClass | 针对名称私有（以单下划线开头）且未被访问的类的诊断。 |
| reportUnusedCoroutine | 针对返回 Coroutine 且其结果未被使用的调用表达式的诊断。 |
| reportUnusedFunction | 针对名称私有（以单下划线开头）且未被访问的函数或方法的诊断。 |
| reportUnusedImport | 针对在该文件内未被引用的导入符号的诊断。 |
| reportUnusedVariable | 针对未被访问的变量的诊断。 |
| reportUnsupportedDunderAll | 针对对 `__all__` 执行不支持的操作的诊断。 |
| reportWildcardImportFromLibrary | 针对从外部库进行的通配符导入的诊断。 |

## 自动完成设置

| 设置 (python.autoComplete.) | 默认值 | 说明 | 另请参阅 |
| --- | --- | --- | --- |
| extraPaths | `[]` | 指定加载自动完成数据的额外包的位置。 | [编辑](/docs/python/editing.md#autocomplete-and-intellisense) |

## 预定义变量

Python 扩展设置支持预定义变量。与通用 VS Code 设置类似，变量使用 **${variableName}** 语法。具体而言，该扩展支持以下变量：

- **${cwd}** - 任务运行器启动时的当前工作目录
- **${workspaceFolder}** - VS Code 中打开的文件夹的路径
- **${workspaceRootFolderName}** - VS Code 中打开的文件夹的名称，不包含任何斜杠 (/)
- **${workspaceFolderBasename}** - VS Code 中打开的文件夹的名称，不包含任何斜杠 (/)
- **${file}** - 当前打开的文件
- **${relativeFile}** - 相对于 `workspaceFolder` 的当前打开的文件
- **${relativeFileDirname}** - 相对于 `workspaceFolder` 的当前打开文件的目录名
- **${fileBasename}** - 当前打开文件的基本名
- **${fileBasenameNoExtension}** - 当前打开文件不带扩展名的基本名
- **${fileDirname}** - 当前打开文件的目录名
- **${fileExtname}** - 当前打开文件的扩展名

- **${lineNumber}** - 活动文件中当前选中的行号
- **${selectedText}** - 活动文件中当前选中的文本
- **${execPath}** - 正在运行的 VS Code 可执行文件的路径

有关预定义变量和示例用法的更多信息，请参阅通用 VS Code 文档中的[变量参考](/docs/reference/variables-reference.md)。

## 下一步

- [Python 环境](/docs/python/environments.md) - 控制用于编辑和调试的 Python 解释器。
- [编辑代码](/docs/python/editing.md) - 了解 Python 的自动完成、IntelliSense、格式化和重构。
- [Linting](/docs/python/linting.md) - 启用、配置和应用各种 Python linter。
- [调试](/docs/python/debugging.md) - 学习本地和远程调试 Python。
- [测试](/docs/python/testing.md) - 配置测试环境以及发现、运行和调试测试。
