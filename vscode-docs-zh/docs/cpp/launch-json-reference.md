---
ContentId: 8cb0c932-d5f2-41e7-b297-5fd100ce4e0c
DateApproved: 6/10/2021
MetaDescription: 在 Visual Studio Code 中配置 launch.json 以进行 C/C++ 调试
Keywords:
- C++
---
# 配置 C/C++ 调试

`launch.json` 文件用于在 Visual Studio Code 中配置[调试器](/docs/debugtest/debugging.md)。

Visual Studio Code 会生成一个 `launch.json` 文件（位于项目的 `.vscode` 文件夹下），其中几乎包含了所有必需的信息。要开始调试，你需要在 `program` 字段中填写要调试的可执行文件的路径。对于 launch 和 attach（如果你打算随时附加到正在运行的实例）配置，都必须指定此项。

生成的文件包含两个部分，一部分配置启动调试，另一部分配置附加调试。

## 配置 VS Code 的调试行为

设置或更改以下选项，以控制 VS Code 在调试期间的行为：

### program（必需）

指定调试器将要启动或附加到的可执行文件的完整路径。调试器需要此位置才能加载调试符号。

### symbolSearchPath

告诉 Visual Studio Windows 调试器搜索符号（.pdb）文件的路径。用分号分隔多个路径。例如：`"C:\\Symbols;C:\\SymbolDir2"`。

### requireExactSource

一个可选标志，告诉 Visual Studio Windows 调试器要求当前源代码与 pdb 匹配。

### additionalSOLibSearchPath

告诉 GDB 或 LLDB 搜索 .so 文件的路径。用分号分隔多个路径。例如：`"/Users/user/dir1;/Users/user/dir2"`。

### externalConsole

仅在启动被调试程序时使用。对于 `attach`，此参数不会改变被调试程序的行为。

- **Windows**：当设置为 true 时，将生成一个外部控制台。当设置为 false 时，将使用 VS Code 的 integratedTerminal。
- **Linux**：当设置为 true 时，将通知 VS Code 生成一个外部控制台。当设置为 false 时，将使用 VS Code 的 integratedTerminal。
- **macOS**：当设置为 true 时，将通过 `lldb-mi` 生成一个外部控制台。当设置为 false 时，可以在 VS Code 的 debugConsole 中查看输出。由于 `lldb-mi` 的限制，不支持 integratedTerminal。

### avoidWindowsConsoleRedirection

为了在 Windows 上支持 VS Code 的集成终端与 gdb 配合使用，扩展会向被调试程序的参数中添加控制台重定向命令，以使控制台输入和输出显示在集成终端中。将此选项设置为 `true` 将禁用它。

### logging

可选标志，用于确定应将哪些类型的消息记录到调试控制台。

- **exceptions**：可选标志，用于确定是否应将异常消息记录到调试控制台。默认值为 true。
- **moduleLoad**：可选标志，用于确定是否应将模块加载事件记录到调试控制台。默认值为 true。
- **programOutput**：可选标志，用于确定是否应将程序输出记录到调试控制台。默认值为 true。
- **engineLogging**：可选标志，用于确定是否应将诊断引擎日志记录到调试控制台。默认值为 false。
- **trace**：可选标志，用于确定是否应将诊断适配器命令跟踪记录到调试控制台。默认值为 false。
- **traceResponse**：可选标志，用于确定是否应将诊断适配器命令和响应跟踪记录到调试控制台。默认值为 false。

### visualizerFile

调试时要使用的 `.natvis` 文件。有关如何创建 Natvis 文件的信息，请参阅[创建本机对象的自定义视图](https://learn.microsoft.com/visualstudio/debugger/create-custom-views-of-native-objects)。

### showDisplayString

当指定了 `visualizerFile` 时，`showDisplayString` 将启用显示字符串。启用此选项可能会导致调试期间性能变慢。

**示例：**

```json
{
   "name": "C++ Launch (Windows)",
   "type": "cppvsdbg",
   "request": "launch",
   "program": "C:\\app1\\Debug\\app1.exe",
   "symbolSearchPath": "C:\\Symbols;C:\\SymbolDir2",
   "externalConsole": true,
   "logging": {
       "moduleLoad": false,
       "trace": true
    },
   "visualizerFile": "${workspaceFolder}/my.natvis",
   "showDisplayString": true
}
```

## 配置目标应用程序

以下选项使你能够在启动时修改目标应用程序的状态：

### args

启动时传递给程序的命令行参数的 JSON 数组。示例 `["arg1", "arg2"]`。如果你要转义字符，则需要对它们进行双重转义。例如，`["{\\\"arg1\\\": true}"]` 将向你的应用程序发送 `{"arg1": true}`。

### cwd

设置调试器启动的应用程序的工作目录。

### environment

要添加到程序环境中的环境变量。示例：`[ { "name": "config", "value": "Debug" } ]`，而不是 `[ { "config": "Debug" } ]`。

**示例：**

```json
{
   "name": "C++ Launch",
   "type": "cppdbg",
   "request": "launch",
   "program": "${workspaceFolder}/a.out",
   "args": ["arg1", "arg2"],
   "environment": [{"name": "config", "value": "Debug"}],
   "cwd": "${workspaceFolder}"
}
```

## 自定义 GDB 或 LLDB

你可以通过设置以下选项来更改 GDB 或 LLDB 的行为：

### MIMode

指示 VS Code 将连接到的调试器。必须设置为 `gdb` 或 `lldb`。这是根据每个操作系统预配置的，可以根据需要更改。

### miDebuggerPath

调试器（如 gdb）的路径。当仅指定可执行文件时，它将在操作系统的 PATH 变量中搜索调试器（在 Linux 和 Windows 上为 GDB，在 OS X 上为 LLDB）。

### miDebuggerArgs

传递给调试器（如 gdb）的附加参数。

### stopAtEntry

如果设置为 true，调试器应在目标的入口点处停止（在附加时忽略）。默认值为 `false`。

### stopAtConnect

如果设置为 true，调试器应在连接到目标后停止。如果设置为 false，调试器将在连接后继续。默认值为 `false`。

### setupCommands

用于设置 GDB 或 LLDB 的命令的 JSON 数组，按顺序执行。示例：`"setupCommands": [ { "text": "target-run", "description": "run target", "ignoreFailures": false }]`。

### customLaunchSetupCommands

如果提供，将使用其他命令替换用于启动目标的默认命令。例如，这可以是 "-target-attach" 以便附加到目标进程。空的命令列表将不以任何内容替换启动命令，这在调试器通过命令行选项提供启动选项时很有用。示例：`"customLaunchSetupCommands": [ { "text": "target-run", "description": "run target", "ignoreFailures": false }]`。

### launchCompleteCommand

调试器完全设置后执行的命令，以使目标进程运行。允许的值为 "exec-run"、"exec-continue"、"None"。默认值为 "exec-run"。

**示例：**

```json
{
   "name": "C++ Launch",
   "type": "cppdbg",
   "request": "launch",
   "program": "${workspaceFolder}/a.out",
   "stopAtEntry": false,
   "customLaunchSetupCommands": [
      { "text": "target-run", "description": "run target", "ignoreFailures": false }
   ],
   "launchCompleteCommand": "exec-run",
   "linux": {
      "MIMode": "gdb",
      "miDebuggerPath": "/usr/bin/gdb"
   },
   "osx": {
      "MIMode": "lldb"
   },
   "windows": {
      "MIMode": "gdb",
      "miDebuggerPath": "C:\\MinGw\\bin\\gdb.exe"
   }
}
```

### symbolLoadInfo

- **loadAll**：如果为 true，将加载所有库的符号，否则将不加载任何 solib 符号。由 ExceptionList 修改。默认值为 true。
- **exceptionList**：用分号 `;` 分隔的文件名列表（支持通配符）。修改 LoadAll 的行为。如果 LoadAll 为 true，则不会为列表中匹配任何名称的库加载符号。否则，仅加载匹配的库的符号。示例：```"foo.so;bar.so"```

## 调试转储文件

C/C++ 扩展支持在 Windows 上调试转储文件，以及在 Linux 和 OS X 上调试核心转储文件。

### dumpPath

如果你要调试 Windows 转储文件，请将此设置为转储文件的路径，以在 `launch` 配置中开始调试。

### coreDumpPath

要为指定程序调试的核心转储文件的完整路径。将此设置为核心转储文件的路径，以在 `launch` 配置中开始调试。
_注意：MinGw 不支持核心转储调试。_

## 远程调试或使用本地调试器服务器调试

### miDebuggerServerAddress

要连接以进行远程调试的调试器服务器（例如 gdbserver）的网络地址（示例：`localhost:1234`）。

### debugServerPath

要启动的调试服务器的完整路径。

### debugServerArgs

调试器服务器的参数。

### serverStarted

要在调试服务器输出中查找的服务器启动模式。支持正则表达式。

### filterStdout

如果设置为 true，则在 `stdout` 流中搜索服务器启动模式，并将 stdout 记录到调试输出。默认值为 `true`。

### filterStderr

如果设置为 true，则在 `stderr` 流中搜索服务器启动模式，并将 stderr 记录到调试输出。默认值为 `false`。

### serverLaunchTimeout

调试器等待 debugServer 启动的时间（以毫秒为单位）。默认为 10000。

### pipeTransport

有关附加到远程进程（例如调试 Docker 容器中的进程）的信息，请参阅[管道传输](/docs/cpp/pipe-transport.md)设置文章。

### hardwareBreakpoints

如果提供，则显式控制远程目标的硬件断点行为。如果 `require` 设置为 true，则始终使用硬件断点。默认值为 `false`。`limit` 是要使用的可用硬件断点数量的可选限制，仅在 `require` 为 true 且 `limit` 大于 0 时生效。默认值为 0。示例：```"hardwareBreakpoints": { require: true, limit: 6 }```。

## 附加属性

### processId

默认值为 `${command:pickProcess}`，它将显示调试器可以附加到的可用进程列表。我们建议你保留此默认值，但也可以将该属性显式设置为调试器要附加到的特定进程 ID。

### request

指示配置部分是用于 `launch` 程序，还是用于 `attach` 到已在运行的实例。

### targetArchitecture

`已弃用` 此选项不再需要，因为目标架构会自动检测。

### type

指示正在使用的基础调试器。使用 Visual Studio Windows 调试器时必须为 `cppvsdbg`，使用 GDB 或 LLDB 时必须为 `cppdbg`。创建 `launch.json` 文件时，此值会自动设置为正确的值。

### sourceFileMap

这允许将编译时的源代码路径映射到本地源代码位置。它是一个键值对对象，将解析第一个字符串匹配的路径。（示例：`"sourceFileMap": { "/mnt/c": "c:\\" }` 将把调试器返回的任何以 `/mnt/c` 开头的路径映射并转换为 `c:\\`。你可以在该对象中包含多个映射，但它们将按提供的顺序处理。）

## 环境变量定义文件

环境变量定义文件是一个简单的文本文件，包含 `环境变量=值` 形式的键值对，使用 `#` 进行注释。不支持多行值。

`cppvsdbg` 调试器配置还包含一个 `envFile` 属性，允许你轻松设置用于调试目的的变量。

例如：

**project.env 文件**：

```bash
# project.env

# Example environment with key as 'MYENVRIONMENTPATH' and value as C:\\Users\\USERNAME\\Project
MYENVRIONMENTPATH=C:\\Users\\USERNAME\\Project

# Variables with spaces
SPACED_OUT_PATH="C:\\This Has Spaces\\Project"
```

## 符号选项

`symbolOptions` 元素允许自定义调试器搜索符号的方式。示例：

```json
    "symbolOptions": {
        "searchPaths": [
            "C:\\src\\MyOtherProject\\bin\\debug",
            "https://my-companies-symbols-server"
        ],
        "searchMicrosoftSymbolServer": true,
        "cachePath": "%TEMP%\\symcache",
        "moduleFilter": {
            "mode": "loadAllButExcluded",
            "excludedModules": [ "DoNotLookForThisOne*.dll" ]
        }
    }
```

### 属性

**searchPaths**：用于搜索 .pdb 文件的符号服务器 URL（示例：https://msdl.microsoft.com/download/symbols）或目录（示例：/build/symbols）的数组。这些目录将在默认位置之外被搜索——即模块旁边以及 pdb 最初放置的路径。

**searchMicrosoftSymbolServer**：如果为 `true`，则将 Microsoft 符号服务器（https://msdl.microsoft.com/download/symbols）添加到符号搜索路径中。如果未指定，此选项默认值为 `false`。

**cachePath**：从符号服务器下载的符号应缓存的目录。如果未指定，调试器将默认使用 %TEMP%\\SymbolCache。

**moduleFilter.mode**：此值为 `"loadAllButExcluded"` 或 `"loadOnlyIncluded"`。在 `"loadAllButExcluded"` 模式下，调试器为所有模块加载符号，除非该模块在 'excludedModules' 数组中。在 `"loadOnlyIncluded"` 模式下，调试器不会尝试为任何模块加载符号，除非它在 'includedModules' 数组中，或者通过 'includeSymbolsNextToModules' 设置包含它。

#### `"loadAllButExcluded"` 模式的属性

**moduleFilter.excludedModules**：调试器不应为其加载符号的模块数组。支持通配符（示例：MyCompany.*.dll）。

#### `"loadOnlyIncluded"` 模式的属性

**moduleFilter.includedModules**：调试器应为其加载符号的模块数组。支持通配符（示例：MyCompany.*.dll）。

**moduleFilter.includeSymbolsNextToModules**：如果为 true，对于不在 'includedModules' 数组中的任何模块，调试器仍会检查模块本身和启动可执行文件旁边，但不会检查符号搜索列表中的路径。此选项默认为 'true'。
