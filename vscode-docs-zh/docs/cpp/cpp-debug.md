---
ContentId: 9150091A-6F3A-46B9-881B-B8FD788FA705
DateApproved: 5/21/2020
MetaDescription: 如何在 Visual Studio Code 中调试 C++ 程序。
Keywords:
- C++
---
# 在 Visual Studio Code 中进行 C++ 调试

根据各目标编译器/平台的配置教程完成调试环境的基本设置后，您可以在本节中了解更多关于 C/C++ 调试的详细信息。

Visual Studio Code 支持以下 C/C++ 调试器，具体取决于您使用的操作系统：

* **Linux**: GDB
* **macOS**: LLDB 或 GDB
* **Windows**: Visual Studio Windows 调试器或 GDB（通过 Cygwin 或 MinGW）

## 在 Windows 上使用 GDB 进行调试

您可以使用 VS Code 调试通过 Cygwin 或 MinGW 创建的 Windows 应用程序。要使用 Cygwin 或 MinGW 调试功能，必须在启动配置（`launch.json`）中手动设置调试器路径。要调试 Cygwin 或 MinGW 应用程序，请添加 `miDebuggerPath` 属性，并将其值设为您 Cygwin 或 MinGW 环境中对应 gdb.exe 的位置。

例如：

```json
    "miDebuggerPath": "c:\\mingw\\bin\\gdb.exe"
```

在 Windows 上进行 Cygwin/MinGW 调试同时支持附加和启动调试场景。

要了解更多信息，请参阅[配置 C/C++ 调试](/docs/cpp/launch-json-reference.md)。

如果您在 Windows 上使用 GDB 进行调试，请参阅[使用 MinGW64 进行 Windows 调试](/docs/cpp/config-mingw.md)。

## 条件断点

条件断点使您仅在条件值为真时在特定代码行上中断执行。要设置条件断点，请右键单击现有断点并选择**编辑断点**。这将打开一个小型的快速查看窗口，您可以在其中输入必须计算为真的条件，以便在调试期间触发断点。

![A conditional break](images/cpp/condbreak.png)

在编辑器中，条件断点由一个内部带有黑色等号的断点符号表示。您可以将光标悬停在条件断点上方以显示其条件。

## 函数断点

函数断点使您能够在函数的开头中断执行，而不是在特定的代码行上。要设置函数断点，请在**运行**视图中右键单击**断点**部分，然后选择**添加函数断点**并输入要中断执行的函数的名称。

## 表达式求值

VS Code 在多种上下文中支持表达式求值：

* 您可以在**运行**视图的**监视**部分中键入表达式，每次触发断点时都会对其进行求值。
* 您可以在**调试控制台**中键入表达式，它将仅被求值一次。
* 当您在断点处停止时，可以对代码中出现的任何表达式进行求值。

**监视**部分中的表达式在正在调试的应用程序中生效；修改变量值的表达式将在程序运行期间修改该变量。

## 多线程调试

VS Code 的 C/C++ 扩展能够调试多线程程序。所有线程及其调用堆栈都显示在**调用堆栈**部分中：

![Multi-threaded process](images/cpp/threads.png)

## 内存转储调试

VS Code 的 C/C++ 扩展也可以调试内存转储。要调试内存转储，请打开 `launch.json` 文件，并将 `coreDumpPath`（GDB 或 LLDB）或 `dumpPath`（Visual Studio Windows 调试器）属性添加到 **C++ 启动**配置中，将其值设置为包含内存转储路径的字符串。这甚至适用于在 x64 计算机上调试的 x86 程序。

## 附加符号文件

如果调试器可以在其他目录中找到符号文件（例如，Visual Studio Windows 调试器的 `.pdb` 文件），则可以通过添加 `additionalSOLibSearchPath`（GDB 或 LLDB）或 `symbolSearchPath`（Visual Studio Windows 调试器）来指定这些目录。

例如：

```json
    "additionalSOLibSearchPath": "/path/to/symbols;/another/path/to/symbols"
```

或

```json
    "symbolSearchPath": "C:\\path\\to\\symbols;C:\\another\\path\\to\\symbols"
```

## 定位源文件

如果源文件不在编译位置，则可以更改源文件路径。这是通过在 `sourceFileMap` 部分中添加简单的替换对来实现的。将使用此列表中的第一个匹配项。

例如：

```json
"sourceFileMap": {
    "/build/gcc-4.8-fNUjSI/gcc-4.8-4.8.4/build/i686-linux-gnu/libstdc++-v3/include/i686-linux-gnu": "/usr/include/i686-linux-gnu/c++/4.8",
    "/build/gcc-4.8-fNUjSI/gcc-4.8-4.8.4/build/i686-linux-gnu/libstdc++-v3/include": "/usr/include/c++/4.8"
}
```

## GDB、LLDB 和 LLDB-MI 命令（GDB/LLDB）

对于 `C++ (GDB/LLDB)` 调试环境，您可以通过调试控制台使用 `-exec` 命令直接执行 GDB、LLDB 和 LLDB-MI 命令，但请注意，直接在调试控制台中执行命令未经测试，在某些情况下可能会导致 VS Code 崩溃。

## 其他调试功能

* 无条件断点
* 监视窗口
* 调用堆栈
* 单步执行

有关使用 VS Code 进行调试的更多信息，请参阅此 [VS Code 调试](/docs/debugtest/debugging.md) 介绍。

有关配置 launch.json 文件以调试 C/C++ 应用程序的其他方式，请参阅[配置 C/C++ 调试](/docs/cpp/launch-json-reference.md)。

### Natvis 框架

您可以使用 [Natvis](https://learn.microsoft.com/visualstudio/debugger/create-custom-views-of-native-objects) 框架在调试器中创建 C++ 对象的自定义视图。您可以阅读[本机对象的自定义视图](/docs/cpp/natvis.md)主题，了解有关在 C/C++ 扩展中使用 Natvis 的详细信息。

### 远程调试

有关附加到远程进程（例如调试 Docker 容器中的进程）的信息，请参阅[管道传输](/docs/cpp/pipe-transport.md)。

### 调试调试器

如果您遇到了无法根据问题报告中的信息诊断的扩展调试问题，我们可能会要求您启用日志记录并向我们发送日志。请参阅[为调试适配器启用日志记录](/docs/cpp/enable-logging-cpp.md#enable-logging-for-the-debug-adapter)，了解如何获取 C/C++ 扩展日志。

## 已知限制

### 符号和代码导航

所有平台：

* 由于该扩展不解析函数体，**速览定义**和**转到定义**不适用于函数体内定义的符号。

### 调试

Windows：

* Cygwin 和 MinGW 上的 GDB 无法中断正在运行的进程。要在应用程序运行时（未在调试器下停止）设置断点，或暂停正在调试的应用程序，请在应用程序的终端中按 `kbstyle(Ctrl-C)`。
* Cygwin 上的 GDB 无法打开核心转储文件。

Linux：

* 您可能会看到错误消息：`ptrace: Operation not permitted`。这是因为 GDB 需要提升的权限才能附加到进程。可以使用以下解决方案解决：
    1. 使用*附加到进程*时，您需要在调试会话开始前提供密码。
    1. 要临时禁用此错误，请使用以下命令：

        `echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope`

    1. 要永久消除此错误，请在 `/etc/sysctl.d/` 中添加一个名为 `10-ptrace.conf` 的文件，并添加以下内容 `kernel.yama.ptrace_scope = 0`。

macOS：

* LLDB：
    * 使用 LLDB 调试时，如果在中断模式下关闭终端窗口，调试不会停止。可以通过按**停止**按钮来停止调试。
    * 调试停止后，终端窗口不会关闭。
* GDB：
    * 在 macOS 上使用 GDB 需要额外的手动安装步骤。请参阅 [README](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) 中的《macOS 上手动安装 GDB》章节。
    * 使用 GDB 附加到进程时，无法中断正在调试的应用程序。GDB 只会绑定在应用程序未运行时（在附加到应用程序之前或应用程序处于停止状态时）设置的断点。这是由于[GDB 中的一个错误](https://sourceware.org/bugzilla/show_bug.cgi?id=20035)。
    * 使用 GDB 调试时无法加载核心转储文件，因为 GDB [不支持 macOS 中使用的核心转储格式](https://www.sourceware.org/ml/gdb/2014-01/msg00036.html)。
    * 使用 GDB 附加到进程时，全部中断将终止进程。

## 后续步骤

继续阅读以了解：

* [为适用于 Linux 的 Windows 子系统配置 VS Code](/docs/cpp/config-wsl.md)
* [为 Mingw-w64 和 GCC 配置 VS Code](/docs/cpp/config-mingw.md)
* [为 macOS 配置 VS Code](/docs/cpp/config-clang-mac.md)
* [配置 C/C++ 调试](/docs/cpp/launch-json-reference.md) - 了解有关其他调试器配置选项的信息。
* [基本编辑](/docs/editing/codebasics.md) - 了解功能强大的 Visual Studio Code 编辑器。
* [代码导航](/docs/editing/editingevolved.md) - 在源代码中快速移动。
* [任务](/docs/debugtest/tasks.md) - 使用任务构建项目及更多功能。
* [调试](/docs/debugtest/debugging.md) - 了解 Visual Studio Code 调试器。

如果您有任何其他问题或遇到任何问题，请在 [GitHub](https://github.com/microsoft/vscode-cpptools/issues) 上提交 issue。
