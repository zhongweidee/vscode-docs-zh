---
ContentId: 4E34F6AF-BFC6-4BBB-8464-2E50C85AE826
DateApproved: 4/25/2025
MetaDescription: 如何自定义 C++ 扩展的 c_cpp_properties.json 文件。
Keywords:
- C++
---
# C++ 扩展设置参考

C++ 扩展设置高度可配置。本文介绍 `c_cpp_properties.json` 文件的架构。有关 VS Code 中设置的常规信息，请参阅[配置设置](/docs/getstarted/personalize-vscode.md#configure-settings)，以及[变量参考](/docs/reference/variables-reference.md)和[VS Code 默认设置](/docs/reference/default-settings.md)。

想要开始配置你的 C++ 项目？请从[配置 IntelliSense](/docs/cpp/configure-intellisense.md) 开始。

## 变量示例

以下 JSON 代码片段是 `c_cpp_properties.json` 的配置示例。你只需在 JSON 文件中包含相关的变量，任何缺失的字段将由 C++ 扩展使用其默认值填充。

```json
{
    "env": {
        "myIncludePath": [
            "${workspaceFolder}/include",
            "${workspaceFolder}/src"
        ],
        "myDefines": [
            "DEBUG",
            "MY_FEATURE=1"
        ]
    },
    "configurations": [
        {
            "name": "Mac",
            "compilerPath": "/usr/bin/clang++",
            "intelliSenseMode": "macos-clang-x64",
            "includePath": [
                "${myIncludePath}",
                "${workspaceFolder}/**"
            ],
            "defines": [
                "${myDefines}"
            ],
            "cStandard": "c17",
            "cppStandard": "c++20",
            "macFrameworkPath": [
                "/System/Library/Frameworks",
                "/Library/Frameworks"
            ],
            "browse": {
                "path": [
                    "${myIncludePath}",
                    "${workspaceFolder}"
                ]
            }
        }
    ],
    "version": 4,
    "enableConfigurationSquiggles": true
}
```

## 顶级属性

- `env`:
  一个用户自定义变量数组，可通过标准环境变量语法 `${<var>}` 或 `${env:<var>}` 在配置中进行替换。接受字符串和字符串数组。

- `configurations`:
  一个配置对象数组，为 IntelliSense 引擎提供有关你的项目和偏好的信息。默认情况下，扩展会根据你的操作系统创建一个配置。你也可以添加更多配置。

- `version`:
  我们建议你不要编辑此字段。它跟踪 `c_cpp_properties.json` 文件的当前版本，以便扩展知道应该存在哪些属性和设置，以及如何将此文件升级到最新版本。

- `enableConfigurationSquiggles`:
  设置为 `true` 可将 `c_cpp_properties.json` 文件中检测到的错误报告给 C++ 扩展。

## 配置属性

- `name`:
  用于标识配置的友好名称。`Linux`、`Mac` 和 `Win32` 是会在这些平台上自动选择的配置的特殊标识符。VS Code 中的状态栏会显示当前活动的配置。你也可以点击状态栏中的标签来更改活动配置。

- `compilerPath`:
  用于构建项目的编译器的完整路径，例如 `/usr/bin/gcc`，以启用更精确的 IntelliSense。扩展会查询编译器以确定用于 IntelliSense 的系统包含路径和默认定义。

  设置 `"compilerPath": ""`（空字符串）会跳过查询编译器。如果你的首选编译器不支持查询所用的参数，这会很有用，因为扩展默认会使用它能找到的任何受支持的编译器（如 MSVC）。省略 `compilerPath` 属性不会跳过查询。

- `compilerArgs`:
  用于修改包含路径或定义的编译器参数，例如 `-nostdinc++`、`-m32` 等。接受额外空格分隔参数的参数应在数组中作为单独的参数输入，例如，对于 `--sysroot <arg>`，应使用 `\"--sysroot\", \"<arg>\"`。

- `intelliSenseMode`:
  要使用的 IntelliSense 模式，它映射到 MSVC、gcc 或 Clang 的特定架构变体。如果未设置或设置为 `${default}`，扩展会为该平台选择默认值。

  平台默认值：
  - Windows: `windows-msvc-x64`
  - Linux: `linux-gcc-x64`
  - macOS: `macos-clang-x64`

  仅指定 `<compiler>-<architecture>` 变体的 IntelliSense 模式（例如 `gcc-x64`）是旧版模式，会根据主机平台自动转换为 `<platform>-<compiler>-<architecture>` 变体。

- `includePath`:
  包含路径是源文件包含的头文件目录。例如，一个源文件包含引入指令 `#include "myHeaderFile.h"`，则需要将包含此头文件的路径添加到 `includePath`。指定一个路径列表供 IntelliSense 引擎在搜索所包含的头文件时使用。对列表这些路径的搜索不是递归的。在路径末尾指定 `/**` 表示递归搜索。例如，`${workspaceFolder}/**` 会搜索所有子目录，而 `${workspaceFolder}` 则不会。如果你在 Windows 上安装了 Visual Studio，或者在 `compilerPath` 设置中指定了编译器，则不应在此处列出系统包含路径。

- `defines`:
  供 IntelliSense 引擎在解析文件时使用的预处理器定义列表。可选地使用 `=` 设置一个值，例如 `VERSION=1`。

- `cStandard`:
  用于 IntelliSense 的 C 语言标准版本。例如 `c17`、`gnu23` 或 `${default}`。注意：GNU 标准仅用于查询设置的编译器以获取 GNU 定义，IntelliSense 会模拟等效的 C 标准版本。

- `cppStandard`:
  用于 IntelliSense 的 C++ 语言标准版本。例如 `c++20`、`gnu++23` 或 `${default}`。注意：GNU 标准仅用于查询设置的编译器以获取 GNU 定义，IntelliSense 会模拟等效的 C++ 标准版本。

- `configurationProvider`:
  可以为其提供源文件 IntelliSense 配置信息的 VS Code 扩展 ID。例如，使用 VS Code 扩展 ID `ms-vscode.cmake-tools` 来提供来自 CMake Tools 扩展的配置信息。如果指定了 `configurationProvider`，则它提供的配置将优先于你在 `c_cpp_properties.json` 中的其他设置。

  候选 `configurationProvider` 扩展必须实现 [vscode-cpptools-api](https://github.com/microsoft/vscode-cpptools-api)。

- `mergeConfigurations`:
  设置为 `true` 可将包含路径、定义和强制包含与配置提供程序中的内容合并。

- `windowsSdkVersion`:
  要在 Windows 上使用的 Windows SDK 包含路径的版本，例如 `10.0.17134.0`。

- `macFrameworkPath`:
  供 IntelliSense 引擎在搜索来自 Mac 框架的包含头文件时使用的路径列表。

- `forcedInclude`:
  在处理源文件中的任何文本之前应包含的文件列表。文件按所列顺序包含。

- `compileCommands`:
  一个路径数组，包含指向工作区 `compile_commands.json` 文件的完整路径。如果在 `compile_commands.json` 中有与编辑器中打开的文件匹配的条目，则该命令行动态将用于为该文件配置 IntelliSense，而不是使用 `c_cpp_properties.json` 中的其他字段。
  有关文件格式的更多信息，请参阅 [Clang 文档](https://clang.llvm.org/docs/JSONCompilationDatabase.html)。某些构建系统（例如 CMake）[可以简化此文件的生成](https://cmake.org/cmake/help/v3.5/variable/CMAKE_EXPORT_COMPILE_COMMANDS.html)。

- `dotConfig`:
  指向由 Kconfig 系统创建的 `.config` 文件的路径。Kconfig 系统会生成一个包含构建项目所需的所有定义的文件。使用 Kconfig 系统的项目示例包括 Linux 内核和 NuttX RTOS。

- `customConfigurationVariables`:
  可通过 `${cpptools:activeConfigCustomVariable}` 命令查询的自定义变量，用于 `launch.json` 或 `tasks.json` 中的输入变量。

- `browse`:
  与 IntelliSense 结合使用的一组属性，用于标识代码库中的所有符号。这些属性用于诸如**转到定义/声明**、全局符号搜索等功能，或者当"默认"IntelliSense 引擎无法解析源文件中的 `#includes` 时使用。

- `recursiveIncludes`:
  一组属性，用于配置扩展如何处理指定递归搜索的 `includePath` 条目。

### 浏览属性

- `path`:
  一个路径列表，其中的源文件会被解析并用于全局符号搜索。如果省略，则将 `includePath` 用作 `path`。对这些路径的搜索默认是递归的。指定 `*` 表示非递归搜索。例如，`${workspaceFolder}` 会搜索所有子目录，而 `${workspaceFolder}/*` 则不会。

- `limitSymbolsToIncludedHeaders`:
  当设置为 `true` 时，标记解析器仅解析由 `${workspaceFolder}` 中的源文件直接或间接包含的头文件。当设置为 `false` 时，标记解析器会解析在 `browse.path` 列表中指定的路径中能找到的所有代码文件。

- `databaseFilename`:
  生成的符号数据库的路径。此属性指示扩展将工作区符号数据库保存在工作区默认存储位置之外的其他位置。如果指定了相对路径，则该路径是相对于工作区的默认存储位置，而不是工作区文件夹本身。`${workspaceFolder}` 变量可用于指定相对于工作区文件夹的路径（例如 `${workspaceFolder}/.vscode/browse.vc.db`）

### 递归包含属性

- `reduce`:
  当递归 `includePath` 条目展开时，可能会导致 IntelliSense 在解析源文件中的 `#include` 语句时需要处理大量包含路径。向 IntelliSense 编译器发送大量包含路径可能会影响某些系统上 IntelliSense 的性能。默认情况下，扩展会通过首先对源文件进行标记解析来搜索 `#include` 语句并确定需要哪些包含路径，从而将包含路径集缩减到尽可能小的集合。此缩减过程与此设置的 `always` 选项行为相同。此行为以一些初始开销为代价，从而使 IntelliSense 之后可能运行得更快。将此属性设置为 `never` 将为 IntelliSense 进程提供完整的递归包含路径展开。由于不预先解析任何文件，此行为以后续性能可能的代价来确保 IntelliSense 在打开源文件时可以更快地启动。通常，当涉及大量路径时，减少配置中递归包含路径的数量可能会提高 IntelliSense 性能。

- `priority`:
  解析 `#include` 语句时递归包含路径搜索的优先级。如果设置为 `beforeSystemIncludes`，则在系统包含路径之前搜索递归包含路径。如果设置为 `afterSystemIncludes`，则在系统包含路径之后搜索递归包含路径。`beforeSystemIncludes` 更接近编译器的搜索顺序，从而更具可预测性，而 `afterSystemIncludes` 可能会带来性能提升。

- `order`:
  递归包含的子目录是按 `breadthFirst`（广度优先）还是按 `depthFirst`（深度优先）进行搜索。

## 支持的变量

你可以让 `tasks.json` 或 `launch.json` 查询 `c_cpp_properties.json` 中的当前活动配置。为此，请在 `tasks.json` 或 `launch.json` 脚本中使用变量 `${command:cpptools.activeConfigName}` 作为参数。

### VS Code 默认设置

所有 VS Code 默认设置，例如 `C_Cpp.default.includePath`，在 `c_cpp_properties.json` 中均受支持。唯一的例外是：

```json
C_Cpp.default.systemIncludePath : string[]
```

此设置允许你指定与包含路径分开的系统包含路径。但是，C++ 扩展从编译器接收到的所选系统包含路径不会传递给 IntelliSense 进程。这仅在罕见场景下使用，因为它会覆盖标准的编译器行为，例如在你的编译器不受支持的情况下。相反，使用 `compilerArgs` 设置并使用 `-isystem` 标志指定系统头文件，这在大多数场景下是更好的解决方案。
