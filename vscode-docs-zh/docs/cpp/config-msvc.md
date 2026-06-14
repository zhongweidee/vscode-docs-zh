---
ContentId: c8b779d6-79e2-49d6-acfc-430d7ac3a299
DateApproved: 3/7/2023
MetaDescription: 在 Visual Studio Code 中配置 C++ 扩展以在 Windows 上使用 Microsoft C++
Keywords:
- C++
---
# 为 Microsoft C++ 配置 VS Code

在本教程中，你将在 Windows 上配置 Visual Studio Code 以使用 Microsoft Visual C++ 编译器和调试器。

配置 VS Code 后，你将在 VS Code 中编译和调试一个简单的 Hello World 程序。本教程不会教你 Microsoft C++ 工具集或 C++ 语言的详细信息。关于这些主题，网上有许多优质资源可供参考。

如果你遇到任何问题，欢迎在 [VS Code 文档仓库](https://github.com/microsoft/vscode-docs/issues) 中为本教程提交 issue。

## 前提条件

要成功完成本教程，你必须完成以下步骤：

1. 安装 [Visual Studio Code](/download)。

1. 安装 [C/C++ 扩展 for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)。你可以在扩展视图（`kb(workbench.view.extensions)`）中搜索 'c++' 来安装 C/C++ 扩展。

    ![C/C++ extension](images/cpp/cpp-extension.png)

1. 安装 Microsoft Visual C++ (MSVC) 编译器工具集。

   如果你有较新版本的 Visual Studio，请从 Windows 开始菜单打开 Visual Studio Installer，并确认已勾选 C++ 工作负载。同时确认已选中 MSVC 构建工具和 Windows SDK。如果其中任何组件未安装，请勾选相应的复选框，然后在安装程序中选择 **修改** 按钮。

   你也可以在不安装完整 Visual Studio IDE 的情况下安装 **使用 C++ 的桌面开发** 工作负载。在 Visual Studio [下载](https://visualstudio.microsoft.com/downloads/#remote-tools-for-visual-studio-2022) 页面中，向下滚动到 **所有下载** 部分下的 **Tools for Visual Studio**，然后选择 **Build Tools for Visual Studio 2022** 的下载链接。

   ![Build Tools for Visual Studio download](images/msvc/build-tools-for-vs-2022.png)

   这将启动 Visual Studio Installer，并弹出一个对话框，显示可用的 Visual Studio 构建工具工作负载。勾选 **使用 C++ 的桌面开发** 工作负载，确保已选中 MSVC 构建工具和 Windows SDK，然后选择 **安装**。

   ![Cpp build tools workload](images/msvc/desktop_development_with_cpp-2022.png)

>**注意**：你可以将 Visual Studio 构建工具中的 C++ 工具集与 Visual Studio Code 一起使用，来开发、构建和测试任何 C++ 代码，前提是你拥有有效的 Visual Studio 许可证（可以是 Community、Pro 或 Enterprise 版）。

### 检查你的 Microsoft Visual C++ 安装

要从命令行或 VS Code 使用 MSVC，你必须从 **Developer Command Prompt for Visual Studio** 中运行。普通的 shell（如 PowerShell、Bash 或 Windows 命令提示符）没有设置必要的路径环境变量。

要打开 Developer Command Prompt for VS，请在 Windows 开始菜单中输入 'developer'，你应该会在建议列表中看到它。具体名称取决于你安装的 Visual Studio 或 Visual Studio 构建工具的版本。选择该项以打开提示符。

![Developer Command Prompt](images/msvc/developer-cmd-prompt-menu.png)

你可以通过输入 'cl' 来测试 C++ 编译器 `cl.exe` 是否已正确安装，你应该会看到包含版本和基本用法说明的版权信息。

![Checking cl.exe installation](images/msvc/check-cl-exe.png)

如果 Developer Command Prompt 使用 BuildTools 位置作为起始目录（你不想把项目放在那里），请在开始创建新项目之前导航到你的用户文件夹（`C:\users\{你的用户名}\`）。

>**注意**：如果出于某种原因，你无法从 **Developer Command Prompt** 运行 VS Code，你可以在 [在 Developer Command Prompt 之外运行 VS Code](#在-developer-command-prompt-之外运行-vs-code) 中找到在 VS Code 中构建 C++ 项目的替代方法。

## 创建 Hello World

在 Developer Command Prompt 中，创建一个名为 "projects" 的空文件夹来存放你所有的 VS Code 项目，然后创建一个名为 "helloworld" 的子文件夹，导航到其中，并通过输入以下命令在该文件夹（`.`）中打开 VS Code（`code`）：

```bat
mkdir projects
cd projects
mkdir helloworld
cd helloworld
code .
```

"code ." 命令会在当前工作文件夹中打开 VS Code，该文件夹将成为你的"工作区"。在完成本教程的过程中，你将在工作区的 `.vscode` 文件夹中看到三个创建的文件：

- `tasks.json`（构建指令）
- `launch.json`（调试器设置）
- `c_cpp_properties.json`（编译器路径和 IntelliSense 设置）

### 添加源代码文件

在文件资源管理器标题栏中，选择 **新建文件** 按钮并将文件命名为 `helloworld.cpp`。

![New File title bar button](images/msvc/new-file-button.png)

### 添加 hello world 源代码

现在粘贴以下源代码：

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main()
{
    vector<string> msg {"Hello", "C++", "World", "from", "VS Code", "and the C++ extension!"};

    for (const string& word : msg)
    {
        cout << word << " ";
    }
    cout << endl;
}
```

现在按 `kb(workbench.action.files.save)` 保存文件。注意你刚刚添加的文件是如何出现在 VS Code 侧边栏的 **文件资源管理器** 视图（`kb(workbench.view.explorer)`）中的：

![File Explorer](images/msvc/file-explorer.png)

你还可以通过在主 **文件** 菜单中勾选 **自动保存**，来启用 [自动保存](/docs/editing/codebasics.md#save-auto-save) 功能以自动保存文件更改。

最左侧的活动栏让你可以打开不同的视图，如 **搜索**、**源代码管理** 和 **运行**。你将在本教程的后面部分查看 **运行** 视图。你可以在 VS Code [用户界面文档](/docs/editing/userinterface.md) 中了解有关其他视图的更多信息。

>**注意**：当你保存或打开 C++ 文件时，你可能会看到来自 C/C++ 扩展的通知，提示有 Insiders 版本可用，该版本允许你测试新功能和修复。你可以通过选择 `X`（**清除通知**）来忽略此通知。

## 探索 IntelliSense

在你新建的 `helloworld.cpp` 文件中，将鼠标悬停在 `vector` 或 `string` 上以查看类型信息。在声明 `msg` 变量后，开始输入 `msg.`，就像调用成员函数时那样。你应该会立即看到一个显示所有成员函数的补全列表，以及一个显示 `msg` 对象类型信息的窗口：

![Statement completion IntelliSense](images/wsl/msg-intellisense.png)

你可以按 `kbstyle(Tab)` 键插入选中的成员；然后，当你添加左圆括号时，你将看到有关该函数所需参数的信息。

## 运行 helloworld.cpp

请记住，C++ 扩展使用你机器上安装的 C++ 编译器来构建你的程序。在尝试在 VS Code 中运行和调试 `helloworld.cpp` 之前，请确保你已安装了 C++ 编译器。

1. 打开 `helloworld.cpp`，使其成为活动文件。
2. 按编辑器右上角的运行按钮。

   ![Screenshot of helloworld.cpp and play button](images/playbutton/run-play-button.png)

3. 从系统上检测到的编译器列表中选择 **C/C++: cl.exe 生成和调试活动文件**。

   ![C++ debug configuration dropdown](images/playbutton/select-cl-compiler.png)

你只会在第一次运行 `helloworld.cpp` 时被要求选择编译器。此编译器将被设置为 `tasks.json` 文件中的"默认"编译器。

4. 构建成功后，你的程序输出将出现在集成 **终端** 中。

    ![screenshot of program output](images/playbutton/helloworld-terminal-output.png)

如果你在使用 cl.exe 构建和调试时出现错误，请确保你已使用 `code .` 快捷方式[从 Developer Command Prompt for Visual Studio 启动 VS Code](#检查你的-microsoft-visual-c-安装)。

![Error notification when trying to use MSVC without running VS Code from the Developer Command Prompt for VS](images/playbutton/dev-command-prompt-error.png)

第一次运行程序时，C++ 扩展会创建 `tasks.json`，你可以在项目的 `.vscode` 文件夹中找到它。`tasks.json` 存储构建配置。

你新建的 `tasks.json` 文件应该类似于以下 JSON：

```json
{
"version": "2.0.0",
"tasks": [
    {
        "type": "shell",
        "label": "C/C++: cl.exe build active file",
        "command": "cl.exe",
        "args": [
            "/Zi",
            "/EHsc",
            "/Fe:",
            "${fileDirname}\\${fileBasenameNoExtension}.exe",
            "${file}"
        ],
        "problemMatcher": [
            "$msCompile"
        ],
        "group": {
            "kind": "build",
            "isDefault": true
        },
        "detail": "Task generated by Debugger."
    }
]
}
```

>**注意**：你可以在 [变量参考](/docs/reference/variables-reference.md) 中了解有关 `tasks.json` 变量的更多信息。

`command` 设置指定要运行的程序；在本例中是 "cl.exe"。`args` 数组指定将传递给 cl.exe 的命令行参数。这些参数必须按照编译器期望的顺序指定。

此任务告诉 C++ 编译器获取活动文件（`${file}`），编译它，并在当前目录（`${fileDirname}`）中创建一个可执行文件（`/Fe:` 开关），文件名与活动文件相同但带有 `.exe` 扩展名（`${fileBasenameNoExtension}.exe`），在我们的示例中结果是 `helloworld.exe`。

`label` 值是你在任务列表中看到的内容；你可以随意命名。

`detail` 值是你在任务列表中看到的任务描述。强烈建议重命名此值以区别于类似的任务。

`problemMatcher` 值选择用于在编译器输出中查找错误和警告的输出解析器。对于 cl.exe，使用 `$msCompile` 问题匹配器可获得最佳结果。

从现在开始，运行按钮将从 `tasks.json` 读取信息以确定如何构建和运行你的程序。你可以在 `tasks.json` 中定义多个构建任务，标记为默认的任务将被运行按钮使用。如果你需要更改默认编译器，可以运行 **任务：配置默认生成任务**。或者，你可以修改 `tasks.json` 文件并通过替换以下段来移除默认设置：

```json
    "group": {
        "kind": "build",
        "isDefault": true
    },
```

将其替换为：

```json
    "group": "build",
```

### 修改 tasks.json

你可以通过使用类似 `"${workspaceFolder}/*.cpp"` 的参数替代 `"${file}"` 来修改 `tasks.json` 以构建多个 C++ 文件。这将构建当前文件夹中的所有 `.cpp` 文件。你还可以通过将 `"${fileDirname}\\${fileBasenameNoExtension}.exe"` 替换为硬编码的文件名（例如 `"${workspaceFolder}\\myProgram.exe"`）来修改输出文件名。

## 调试 helloworld.cpp

要调试你的代码，

1. 返回到 `helloworld.cpp`，使其成为活动文件。
1. 通过单击编辑器边栏或按当前行的 F9 来设置断点。
   ![screenshot of breakpoint in helloworld.cpp](images/playbutton/cpp-breakpoint.png)
1. 从运行按钮旁边的下拉菜单中，选择 **调试 C/C++ 文件**。
   ![Screenshot of play button drop-down](images/playbutton/debug-cpp-file-play-button.png)
1. 从系统上检测到的编译器列表中选择 **C/C++: cl.exe 生成和调试活动文件**（你只会在第一次运行或调试 `helloworld.cpp` 时被要求选择编译器）。
   ![C++ debug configuration dropdown](images/playbutton/select-cl-compiler.png)

运行按钮有两种模式：**运行 C/C++ 文件** 和 **调试 C/C++ 文件**。它将默认为上次使用的模式。如果你在运行按钮中看到调试图标，你可以直接选择运行按钮进行调试，而不必选择下拉菜单项。

如果你在使用 cl.exe 构建和调试时出现错误，请确保你已使用 `code .` 快捷方式[从 Developer Command Prompt for Visual Studio 启动 VS Code](#检查你的-microsoft-visual-c-安装)。

![Error notification when trying to use MSVC without running VS Code from the Developer Command Prompt for VS](images/playbutton/dev-command-prompt-error.png)

## 探索调试器

在开始单步调试代码之前，让我们花点时间注意一下用户界面中的几处变化：

- 集成终端出现在源代码编辑器的底部。在 **调试输出** 选项卡中，你会看到指示调试器已启动并正在运行的输出。
- 编辑器高亮显示了你在开始调试前设置断点的行：

   ![Initial breakpoint](images/playbutton/breakpoint-debug.png)

- 左侧的 **运行和调试** 视图显示了调试信息。你将在本教程后面部分看到一个示例。

- 在代码编辑器的顶部，会出现一个调试控制面板。你可以通过抓住左侧的圆点来在屏幕上移动它。

   ![Debugging controls](images/cpp/debug-controls.png)

## 单步调试代码

现在你已经准备好开始单步调试代码了。

1. 单击或按调试控制面板中的 **逐过程** 图标。

   ![Step over button](images/cpp/step-over-button.png)

   这会将程序执行推进到 for 循环的第一行，并跳过在创建和初始化 `msg` 变量时调用的 `vector` 和 `string` 类中的所有内部函数调用。注意左侧 **变量** 窗口中的变化。

   ![Debugging windows](images/wsl/debug-view-variables.png)

   在这种情况下，错误是可以预料的，因为尽管循环的变量名称现在对调试器可见，但该语句尚未执行，所以此时没有内容可读取。然而，`msg` 的内容是可见的，因为该语句已经完成。

1. 再次按 **逐过程** 以推进到此程序中的下一条语句（跳过执行以初始化循环的所有内部代码）。现在，**变量** 窗口显示了有关循环变量的信息。
1. 再次按 **逐过程** 以执行 `cout` 语句。（请注意，C++ 扩展不会向 **调试控制台** 打印任何输出，直到循环退出。）
1. 如果你愿意，可以继续按 **逐过程** 直到向量中的所有单词都已打印到控制台。但如果你好奇，可以尝试按 **逐语句** 按钮来单步调试 C++ 标准库中的源代码！

   ![Breakpoint in gcc standard library header](images/cpp/gcc-system-header-stepping.png)

   要返回到你自己的代码，一种方法是继续按 **逐过程**。另一种方法是通过切换到代码编辑器中的 `helloworld.cpp` 选项卡，将插入点放在循环内 `cout` 语句的某个位置，然后按 `kb(editor.debug.action.toggleBreakpoint)` 来在你的代码中设置断点。左侧的装订线中会出现一个红点，表示已在此行设置了断点。

   ![Breakpoint in main](images/cpp/breakpoint-in-main.png)

   然后按 `kb(workbench.action.debug.start)` 从标准库头文件的当前行开始执行。执行将在 `cout` 处中断。如果你愿意，可以再次按 `kb(editor.debug.action.toggleBreakpoint)` 来关闭该断点。

## 设置监视

有时你可能希望在程序执行过程中跟踪某个变量的值。你可以通过在该变量上设置 **监视** 来实现。

1. 将插入点放在循环内。在 **监视** 窗口中，选择加号并在文本框中输入 `word`，即循环变量的名称。现在在你单步调试循环时查看监视窗口。

   ![Watch window](images/cpp/watch-window.png)

1. 通过在循环前添加此语句来添加另一个监视：`int i = 0;`。然后，在循环内添加此语句：`++i;`。现在像上一步那样添加对 `i` 的监视。

1. 要快速查看任何变量的值（当执行在断点处暂停时），你可以将鼠标指针悬停在其上。

   ![Mouse hover](images/cpp/mouse-hover.png)

## 使用 launch.json 自定义调试

当你使用运行按钮或 `kb(workbench.action.debug.start)` 进行调试时，C++ 扩展会动态创建一个临时的调试配置。

在某些情况下，你可能想要自定义调试配置，例如指定在运行时传递给程序的参数。你可以在 `launch.json` 文件中定义自定义调试配置。

要创建 `launch.json`，请从运行按钮下拉菜单中选择 **添加调试配置**。

![Add debug configuration play button menu](images/playbutton/add-debug-configuration.png)

然后你将看到一个包含各种预定义调试配置的下拉菜单。选择 **C/C++: cl.exe 生成和调试活动文件**。

![C++ debug configuration dropdown](images/playbutton/select-cl-compiler.png)

VS Code 会创建一个 `launch.json` 文件，内容大致如下：

```json
{
"version": "0.2.0",
"configurations": [
    {
        "name": "C/C++: cl.exe build and debug active file",
        "type": "cppvsdbg",
        "request": "launch",
        "program": "${fileDirname}\\${fileBasenameNoExtension}.exe",
        "args": [],
        "stopAtEntry": false,
        "cwd": "${workspaceFolder}",
        "environment": [],
        "externalConsole": false,
        "preLaunchTask": "C/C++: cl.exe build active file"
    }
]
}
```

在上面的 JSON 中，`program` 指定你要调试的程序。这里它被设置为活动文件文件夹（`${fileDirname}`）和带有 `.exe` 扩展名的活动文件名（`${fileBasenameNoExtension}.exe`），如果 `helloworld.cpp` 是活动文件，则会是 `helloworld.exe`。`args` 属性是传递给程序运行时的参数数组。

默认情况下，C++ 扩展不会在你的源代码中添加任何断点，并且 `stopAtEntry` 值设置为 `false`。

将 `stopAtEntry` 值更改为 `true` 可使调试器在你开始调试时停止在 `main` 方法上。

> 从现在开始，运行按钮和 `kb(workbench.action.debug.start)` 在启动程序进行调试时将从你的 `launch.json` 文件中读取配置。

## C/C++ 配置

如果你希望对 C/C++ 扩展有更多的控制，你可以创建一个 `c_cpp_properties.json` 文件，这将允许你更改设置，例如编译器路径、包含路径、C++ 标准（默认是 C++17）等等。

你可以通过从命令面板（`kb(workbench.action.showCommands)`）运行 **C/C++: 编辑配置（UI）** 命令来查看 C/C++ 配置 UI。

![Command Palette](images/cpp/command-palette.png)

这将打开 **C/C++ 配置** 页面。当你在此处进行更改时，VS Code 会将它们写入 `.vscode` 文件夹中名为 `c_cpp_properties.json` 的文件。

![Command Palette](images/msvc/configurations-ui.png)

Visual Studio Code 将这些设置放在 `.vscode\c_cpp_properties.json` 中。如果你直接打开该文件，它应该类似于以下内容：

```json
{
"configurations": [
    {
        "name": "Win32",
        "includePath": [
            "${workspaceFolder}/**"
        ],
        "defines": [
            "_DEBUG",
            "UNICODE",
            "_UNICODE"
        ],
        "windowsSdkVersion": "10.0.18362.0",
        "compilerPath": "C:/Program Files (x86)/Microsoft Visual Studio/2019/BuildTools/VC/Tools/MSVC/14.24.28314/bin/Hostx64/x64/cl.exe",
        "cStandard": "c11",
        "cppStandard": "c++17",
        "intelliSenseMode": "msvc-x64"
    }
],
"version": 4
}
```

只有当你的程序包含不在工作区或标准库路径中的头文件时，你才需要添加到 **包含路径** 数组设置中。

### 编译器路径

`compilerPath` 设置是配置中的一个重要设置。扩展使用它来推断 C++ 标准库头文件的路径。当扩展知道在哪里可以找到这些文件时，它可以提供有用的功能，如智能补全和 **转到定义** 导航。

C/C++ 扩展会根据在系统上找到的默认编译器位置尝试填充 `compilerPath`。扩展会在几个常见的编译器位置中查找。

`compilerPath` 的搜索顺序是：

- 首先检查 Microsoft Visual C++ 编译器
- 然后在 Windows Subsystem for Linux (WSL) 上查找 g++
- 然后查找 Mingw-w64 的 g++。

如果你安装了 g++ 或 WSL，你可能需要更改 `compilerPath` 以匹配你项目的首选编译器。对于 Microsoft C++，路径应该类似于以下内容，具体取决于你安装的特定版本："C:/Program Files (x86)/Microsoft Visual Studio/2017/BuildTools/VC/Tools/MSVC/14.16.27023/bin/Hostx64/x64/cl.exe"。

## 重用你的 C++ 配置

VS Code 现在已配置为使用 Microsoft C++ 编译器。该配置适用于当前工作区。要重用该配置，只需将 JSON 文件复制到新项目文件夹（工作区）中的 `.vscode` 文件夹，并根据需要更改源文件和可执行文件的名称。

## 在 Developer Command Prompt 之外运行 VS Code

在某些情况下，无法从 **Developer Command Prompt for Visual Studio** 运行 VS Code（例如，在通过 SSH 进行远程开发的场景中）。在这种情况下，你可以使用以下 `tasks.json` 配置在构建过程中自动初始化 **Developer Command Prompt for Visual Studio**：

```json
{
    "version": "2.0.0",
    "windows": {
        "options": {
            "shell": {
                "executable": "cmd.exe",
                "args": [
                    "/C",
                    // The path to VsDevCmd.bat depends on the version of Visual Studio you have installed.
                    "\"C:/Program Files (x86)/Microsoft Visual Studio/2019/Community/Common7/Tools/VsDevCmd.bat\"",
                    "&&"
                ]
            }
        }
    },
    "tasks": [
        {
            "type": "shell",
            "label": "cl.exe build active file",
            "command": "cl.exe",
            "args": [
                "/Zi",
                "/EHsc",
                "/Fe:",
                "${fileDirname}\\${fileBasenameNoExtension}.exe",
                "${file}"
            ],
            "problemMatcher": [
                "$msCompile"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```

>**注意**：`VsDevCmd.bat` 的路径可能因 Visual Studio 版本或安装路径而异。你可以通过打开命令提示符并运行 `dir "\VsDevCmd*" /s` 来查找 `VsDevCmd.bat` 的路径。

## 故障排除

### 未识别 "cl.exe" 命令

如果你看到错误 "The term 'cl.exe' is not recognized as the name of a cmdlet, function, script file, or operable program."，这通常意味着你在 **Developer Command Prompt for Visual Studio** 之外运行 VS Code，并且 VS Code 不知道 `cl.exe` 编译器的路径。

VS Code 必须从 Developer Command Prompt for Visual Studio 启动，或者必须配置任务以[在 Developer Command Prompt 之外运行](#在-developer-command-prompt-之外运行-vs-code)。

你可以通过打开一个新终端（`kb(workbench.action.terminal.new)`）并输入 'cl' 来验证 `cl.exe` 是否对 VS Code 可用，以检查你是否在 Developer Command Prompt 的上下文中运行 VS Code。

### 致命错误 C1034：assert.h：未设置包含路径

在这种情况下，`cl.exe` 通过 `PATH` 环境变量对 VS Code 可用，但 VS Code 仍然需要从 **Developer Command Prompt for Visual Studio** 启动，或者需要配置为[在 Developer Command Prompt 之外运行](#在-developer-command-prompt-之外运行-vs-code)。否则，`cl.exe` 无法访问重要的环境变量，如 `INCLUDE`。

## 后续步骤

- 探索 [VS Code 用户指南](/docs/editing/codebasics.md)。
- 查看 [C++ 扩展概述](/docs/languages/cpp.md)。
- 创建一个新的工作区，将你的 `.vscode` JSON 文件复制到其中，根据需要调整新工作区路径、程序名称等设置，然后开始编码！
