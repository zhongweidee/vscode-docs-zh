---
ContentId: 652c9cec-b8fa-4597-a894-f2ea9a095c31
DateApproved: 1/17/2023
MetaDescription: 关于 Visual Studio Code 中 C/C++ 扩展的常见问题解答。
Keywords:
- C++
---
# 常见问题解答

- [如何让 IntelliSense 正常工作？](#how-do-i-get-intellisense-to-work-correctly)
- [c_cpp_properties.json 中 includePath 和 browse.path 的区别是什么？](#what-is-the-difference-between-includepath-and-browsepath)
- [为什么标准库类型下方会出现红色波浪线？](#why-do-i-see-red-squiggles-under-standard-library-types)
- [如何在 Windows 上让新版 IntelliSense 与 MinGW 配合使用？](#how-do-i-get-the-new-intellisense-to-work-with-mingw-on-windows)
- [如何在适用于 Linux 的 Windows 子系统上让新版 IntelliSense 工作？](#how-do-i-get-the-new-intellisense-to-work-with-the-windows-subsystem-for-linux)
- [为什么格式化后我的文件会损坏？](#why-are-my-files-corrupted-on-format)
- [如何重新创建 IntelliSense 数据库？](#how-do-i-recreate-the-intellisense-database)
- [什么是 ipch 文件夹？](#what-is-the-ipch-folder)
- [如何禁用 IntelliSense 缓存 (ipch)？](#how-do-i-disable-the-intellisense-cache-ipch)
- [如何设置调试？](#how-do-i-set-up-debugging)
- [如何启用调试符号？](#how-do-i-enable-debug-symbols)
- [为什么调试不工作？](#why-is-debugging-not-working)
- [如果我怀疑存在 C/C++ 扩展问题该怎么办](#what-do-i-do-if-i-suspect-a-cc-extension-problem)

## 如何让 IntelliSense 正常工作？

在没有任何配置的情况下，扩展会尝试通过搜索你的工作区文件夹以及模拟在计算机上找到的编译器来定位头文件（例如 Windows 上的 cl.exe/MinGW，macOS/Linux 上的 gcc/clang）。如果此自动配置不够充分，你可以通过运行 **C/C++: Edit Configurations (UI)** 命令来修改默认设置。在该视图中，你可以更改要模拟的编译器、要使用的包含文件路径、预处理器定义等。

或者，如果你安装了一个与我们的扩展交互的构建系统扩展，你可以让该扩展为你提供配置。例如，CMake Tools 扩展可以配置使用 CMake 构建系统的项目。使用 **C/C++: Change Configuration Provider...** 命令来启用任何此类扩展以为 IntelliSense 提供配置。

对于没有构建系统扩展支持的项目的第三种选择是：如果你的构建系统支持生成 [compile_commands.json](https://clang.llvm.org/docs/JSONCompilationDatabase.html) 文件，可以使用该文件。在配置界面的"Advanced"部分中，你可以提供 `compile_commands.json` 的路径，扩展将使用该文件中列出的编译信息来配置 IntelliSense。

**注意：** 如果扩展无法解析源代码中的任何 `#include` 指令，它将不会显示源文件主体的 linting 信息。如果你查看 VS Code 中的**问题**窗口，扩展将提供有关哪些文件它无法定位的更多信息。如果你仍想显示 linting 信息，可以更改 `C_Cpp.errorSquiggles` 设置的值。

## c_cpp_properties.json 中 includePath 和 browse.path 的区别是什么？

这两个设置在 `c_cpp_properties.json` 中可用，可能会造成困惑。

### includePath

此路径字符串数组由"默认"IntelliSense 引擎使用，该引擎提供具有语义感知的 IntelliSense 功能。包含路径与通过 `-I` 开关传递给编译器的路径相同。解析源文件时，IntelliSense 引擎在尝试解析时会将这些路径添加到 `#include` 指令指定的文件之前。这些路径**不会**被递归搜索，除非它们以 `/**` 结尾。

### browse.path

此路径字符串数组由"标签解析器"（"浏览引擎"）使用，该引擎用全局符号信息填充数据库。此引擎将**递归**枚举指定路径下的所有文件，并在对项目文件夹进行标签解析时将它们作为潜在的包含文件进行跟踪。要禁用路径的递归枚举，可以在路径字符串后追加 `/*`。

首次打开工作区时，扩展会将 `${workspaceFolder}/**` 添加到 `includePath`，而 `browse.path` 则保持未定义（因此它默认为 `includePath`）。如果不希望这样，可以打开 **c_cpp_properties.json** 文件并进行更改。

## 为什么标准库类型下方会出现红色波浪线？

最常见的原因是缺少包含路径和定义。解决此问题最简单的方法是将 **c_cpp_properties.json** 中的 `compilerPath` 设置为编译器的路径。

## 如何在 Windows 上让新版 IntelliSense 与 MinGW 配合使用？

请参阅 [Visual Studio Code 中 C++ 与 Mingw-w64 入门](/docs/cpp/config-mingw.md)。

## 如何在适用于 Linux 的 Windows 子系统上让新版 IntelliSense 工作？

请参阅 [Visual Studio Code 中 C++ 与适用于 Linux 的 Windows 子系统入门](/docs/cpp/config-wsl.md)。

## 为什么格式化后我的文件会损坏？

如果工作区文件夹是通过包含符号链接的路径打开的，文件可能会损坏（且其他功能也可能失败）（问题 [vscode-cpptools#5061](https://github.com/microsoft/vscode-cpptools/issues/5061)）。解决方法是使用已将符号链接解析为目标位置的路径打开工作区文件夹。

## 如何重新创建 IntelliSense 数据库？

从扩展版本 0.12.3 开始，有一个用于重置 IntelliSense 数据库的命令。打开命令面板 (`kb(workbench.action.showCommands)`) 并选择 **C/C++: Reset IntelliSense Database** 命令。

## 什么是 ipch 文件夹？

语言服务器缓存有关已包含头文件的信息，以提高 IntelliSense 的性能。当你在工作区文件夹中编辑 C/C++ 文件时，语言服务器会将缓存文件存储在 `ipch` 文件夹中。默认情况下，`ipch` 文件夹存储在用户目录下。具体来说，Windows 上存储在 `%LocalAppData%/Microsoft/vscode-cpptools` 下，Linux 上存储在 `$XDG_CACHE_HOME/vscode-cpptools/` 下（如果未定义 `XDG_CACHE_HOME`，则存储在 `$HOME/.cache/vscode-cpptools/` 下），macOS 上存储在 `$HOME/Library/Caches/vscode-cpptools/` 下。通过使用用户目录作为默认路径，它将为扩展的每个用户创建一个缓存位置。由于缓存大小限制是应用于缓存位置的，因此每个用户一个缓存位置会将缓存的磁盘空间使用限制在单个文件夹中，供所有使用默认设置值的用户共享。

没有使用 VS Code 的按工作区存储文件夹，是因为 VS Code 提供的位置不够明确，我们不想在用户可能看不到或不知道如何找到的地方写入 GB 级别的文件。

鉴于这一点，我们知道我们无法满足每个不同开发环境的需求，因此我们提供了设置，允许你自定义最适合你情况的工作方式。

### `"C_Cpp.intelliSenseCachePath": <string>`

此设置允许你为缓存路径设置工作区或全局覆盖。例如，如果你想在所有工作区文件夹之间共享一个缓存位置，请打开 VS Code 设置，并为 **IntelliSense Cache Path** 添加一个用户设置。

### `"C_Cpp.intelliSenseCacheSize": <number>`

此设置允许你为扩展执行的缓存量设置限制。这是一个近似值，但扩展将尽最大努力使缓存大小尽可能接近你设置的限制。如果你按上述方式跨工作区共享缓存位置，仍然可以增加/减少限制，但应确保为 **IntelliSense Cache Size** 添加一个用户设置。

## 如何禁用 IntelliSense 缓存 (ipch)？

如果你不想使用 IntelliSense 缓存功能（例如为了绕过可能仅在启用缓存时出现的错误），可以通过将 **IntelliSense Cache Size** 设置设为 0（或在 JSON 设置编辑器中设置为 `"C_Cpp.intelliSenseCacheSize": 0"`）来禁用该功能。如果你发现磁盘写入过多，尤其是在编辑头文件时，禁用缓存也可能有所帮助。

## 如何设置调试？

需要配置调试器以知道要使用哪个可执行文件和调试器：

从主菜单中，选择 **Run** > **Add Configuration...**。

文件 `launch.json` 现在将打开以供编辑，并带有一个新的配置。默认设置*可能*有效，但你需要指定 `program` 设置。

请参阅 [配置 C/C++ 调试](/docs/cpp/launch-json-reference.md) 以获取有关如何配置调试器的更深入文档。

## 如何启用调试符号？

启用调试符号取决于你使用的编译器类型。以下是一些编译器及启用调试符号所需的编译器选项。

如有疑问，请查阅编译器的文档以了解在输出中包含调试符号所需的选项。这可能是 `-g` 或 `--debug` 的某种变体。

### Clang (C++)

- 如果手动调用编译器，请添加 `--debug` 选项。
- 如果使用脚本，请确保设置了 `CXXFLAGS` 环境变量。例如，`export CXXFLAGS="${CXXFLAGS} --debug"`。
- 如果使用 CMake，请确保设置了 `CMAKE_CXX_FLAGS`。例如，`export CMAKE_CXX_FLAGS=${CXXFLAGS}`。

### Clang (C)

参见 Clang C++，但使用 `CFLAGS` 代替 `CXXFLAGS`。

### gcc 或 g++

如果手动调用编译器，请添加 `-g` 选项。

### cl.exe

符号位于 `*.pdb` 文件中。

## 为什么调试不工作？

### 我的断点没有被命中

当你开始调试时，如果断点没有被绑定（实心红色圆圈）或者没有被命中，你可能需要在编译期间启用[调试符号](#how-do-i-enable-debug-symbols)。

### 调试已启动，但堆栈跟踪中的所有行都是灰色的

如果调试器显示灰色的堆栈跟踪、不会在断点处停止，或者调用堆栈中的符号是灰色的，则说明你的可执行文件是在没有[调试符号](#how-do-i-enable-debug-symbols)的情况下编译的。

## 如果我怀疑存在 C/C++ 扩展问题该怎么办

如果你有任何其他问题，请在 [GitHub discussions](https://github.com/microsoft/vscode-cpptools/discussions) 中发起讨论，或者如果你发现需要修复的问题，请在 [GitHub issues](https://github.com/microsoft/vscode-cpptools/issues) 中提交问题。

如果你遇到的扩展问题我们无法根据你的问题报告中的信息进行诊断，我们可能会要求你启用调试日志并将日志发送给我们。请参阅 [C/C++ 扩展日志记录](/docs/cpp/enable-logging-cpp.md) 了解如何获取 C/C++ 扩展日志。
