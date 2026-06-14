---
ContentId: dc79a06a-6665-478c-9298-a1fc9cf8010d
DateApproved: 5/13/2022
MetaDescription: 在 Visual Studio Code 中配置 C++ 扩展，以在安装了 Ubuntu 的 WSL 上使用 g++ 和 GDB
Keywords:
- C++
---
# 在 VS Code 中使用 C++ 和 WSL

在本教程中，你将在[适用于 Linux 的 Windows 子系统](https://learn.microsoft.com/windows/wsl/install) (WSL) 的 Ubuntu 中配置 Visual Studio Code，以使用 GCC C++ 编译器 (g++) 和 GDB 调试器。GCC 代表 GNU 编译器集合；GDB 是 GNU 调试器。WSL 是一个 Windows 中的 Linux 环境，直接运行在计算机硬件上，而不是在虚拟机中。

> **注意**：本教程的大部分内容也适用于直接在 Linux 机器上使用 C++ 和 VS Code。

Visual Studio Code 通过 [WSL 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)支持直接在 WSL 中工作。我们推荐这种 [WSL 开发](/docs/remote/wsl.md)模式，在这种模式下，所有源代码文件以及编译器都托管在 Linux 发行版上。有关更多背景信息，请参阅 [VS Code 远程开发](/docs/remote/remote-overview.md)。

完成本教程后，你将能够创建和配置自己的 C++ 项目，并探索 VS Code 文档以了解其众多功能的更多信息。本教程不教授 GCC、Linux 或 C++ 语言。关于这些主题，网上有许多优秀的资源可供参考。

如果你遇到任何问题，请随时在 [VS Code 文档仓库](https://github.com/microsoft/vscode-docs/issues)中为本教程提交问题。

## 先决条件

要成功完成本教程，你必须执行以下步骤：

1. 安装 [Visual Studio Code](/download)。

1. 安装 [WSL 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)。

1. 安装[适用于 Linux 的 Windows 子系统](https://learn.microsoft.com/windows/wsl/install)，然后使用同一页面上的链接安装你选择的 Linux 发行版。本教程使用 Ubuntu。安装过程中，请记住你的 Linux 用户密码，因为你安装其他软件时需要用到它。

## 设置你的 Linux 环境

1. 打开 WSL 的 Bash shell。如果你安装了 Ubuntu 发行版，请在 Windows 搜索框中输入 "Ubuntu"，然后在结果列表中单击它。对于 Debian，输入 "Debian"，以此类推。

   ![Ubuntu in Start Menu](images/wsl/start-ubuntu.png)

   shell 出现时会显示命令提示符，默认由你的用户名和计算机名组成，并将你放在主目录中。对于 Ubuntu，它看起来像这样：

   ![Bash Shell](images/wsl/bash-ubuntu.png)

1. 创建一个名为 `projects` 的目录，然后在其下创建一个名为 `helloworld` 的子目录：

   ```bash
   mkdir projects
   cd projects
   mkdir helloworld
   ```

1. 虽然你将使用 VS Code 来编辑源代码，但你将在 Linux 上使用 g++ 编译器编译源代码。你还将使用 GDB 在 Linux 上进行调试。这些工具在 Ubuntu 上默认没有安装，所以你需要安装它们。幸运的是，这个任务非常简单！

1. 在 WSL 命令提示符中，首先运行 `apt-get update` 来更新 Ubuntu 软件包列表。过时的发行版有时会干扰安装新软件包的尝试。

   ```bash
   sudo apt-get update
   ```

   如果你愿意，也可以运行 `sudo apt-get update && sudo apt-get dist-upgrade` 来同时下载最新版本的系统软件包，但这可能会根据你的网络连接速度花费更长的时间。

1. 在命令提示符中，输入以下命令安装 GNU 编译器工具和 GDB 调试器：

   ```bash
   sudo apt-get install build-essential gdb
   ```

1. 通过定位 g++ 和 gdb 来验证安装是否成功。如果 `whereis` 命令没有返回文件名，请尝试再次运行更新命令。

   ```bash
   whereis g++
   whereis gdb
   ```

>**注意**：安装 g++ 编译器和 GDB 调试器的设置步骤同样适用于直接使用 Linux 机器而非 WSL 的情况。在 helloworld 项目中运行 VS Code，以及编辑、构建和调试步骤都是相同的。

## 在 WSL 中运行 VS Code

导航到你的 helloworld 项目文件夹，并在 WSL 终端中使用 `code .` 命令启动 VS Code：

```bash
cd $HOME/projects/helloworld
code .
```

你将看到一条关于"正在安装 VS Code Server"的消息。VS Code 正在 Linux 端下载并安装一个小型服务器，桌面版 VS Code 随后将与之通信。VS Code 随后将启动并打开 `helloWorld` 文件夹。文件资源管理器显示 VS Code 现在在 WSL 上下文中运行，标题栏显示 **WSL: Ubuntu**。

![File Explorer in WSL](images/wsl/file-explorer-wsl.png)

你也可以从状态栏中识别远程上下文。

![Remote context in the Status bar](images/wsl/wsl-status-bar.png)

如果你单击远程状态栏项，你将看到适合该会话的远程命令下拉菜单。例如，如果你想结束在 WSL 中运行的会话，可以从下拉菜单中选择 **关闭远程连接** 命令。从 WSL 命令提示符运行 `code .` 将重新在 WSL 中启动 VS Code。

**code .** 命令在当前工作文件夹中打开 VS Code，该文件夹将成为你的"工作区"。在完成本教程的过程中，你将看到在工作区的 `.vscode` 文件夹中创建了三个文件：

- `c_cpp_properties.json`（编译器路径和 IntelliSense 设置）
- `tasks.json`（构建指令）
- `launch.json`（调试器设置）

## 添加源代码文件

在文件资源管理器标题栏中，选择 **新建文件** 按钮并将文件命名为 `helloworld.cpp`。

![New File title bar button](images/wsl/new-file-button.png)

### 安装 C/C++ 扩展

创建文件后，VS Code 检测到它是一个 C++ 语言文件时，如果你尚未安装 [Microsoft C/C++ 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)，系统可能会提示你安装它。

![C++ extension notification](images/wsl/cpp-extension-notification.png)

选择 **安装**，然后在扩展视图中显示 **需要重新加载** 按钮时单击它，以完成 C/C++ 扩展的安装。

如果你已经在 VS Code 本地安装了 C/C++ 语言扩展，则需要转到扩展视图 (`kb(workbench.view.extensions)`) 并将这些扩展安装到 WSL 中。本地安装的扩展可以通过选择 **在 WSL 中安装** 按钮，然后单击 **需要重新加载** 安装到 WSL 中。

![Install in WSL button](images/wsl/install-in-wsl.png)

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

现在按 `kb(workbench.action.files.save)` 保存文件。注意你刚刚添加的文件是如何出现在 VS Code 侧栏的 **文件资源管理器** 视图 (`kb(workbench.view.explorer)`) 中的：

![File Explorer](images/wsl/file-explorer-helloworld.png)

你也可以启用[自动保存](/docs/editing/codebasics.md#save-auto-save)以自动保存文件更改，方法是选中主 **文件** 菜单中的 **自动保存**。

最左侧的活动栏允许你打开不同的视图，如 **搜索**、**源代码管理** 和 **运行**。你将在本教程后面查看 **运行** 视图。你可以在 VS Code [用户界面文档](/docs/editing/userinterface.md)中了解有关其他视图的更多信息。

## 探索 IntelliSense

在你新建的 `helloworld.cpp` 文件中，将鼠标悬停在 `vector` 或 `string` 上方以查看类型信息。在声明 `msg` 变量后，开始输入 `msg.`，就像调用成员函数时那样。你应该会立即看到一个完成列表，显示所有成员函数，以及一个显示 `msg` 对象类型信息的窗口：

![Statement completion IntelliSense](images/wsl/msg-intellisense.png)

你可以按 `kbstyle(Tab)` 键插入选中的成员；然后，当你添加左括号时，你将看到该函数所需参数的信息。

## 运行 helloworld.cpp

请记住，C++ 扩展使用你计算机上安装的 C++ 编译器来构建你的程序。在尝试在 VS Code 中运行和调试 `helloworld.cpp` 之前，请确保已安装 C++ 编译器。

1. 打开 `helloworld.cpp`，使其成为活动文件。
2. 按编辑器右上角的播放按钮。

   ![Screenshot of helloworld.cpp and play button](images/playbutton/run-play-button.png)

3. 从系统上检测到的编译器列表中选择 **g++ 生成和调试活动文件**。

   ![C++ debug configuration dropdown](images/wsl/build-and-debug-active-file.png)

你只会在第一次运行 `helloworld.cpp` 时被要求选择编译器。该编译器将被设置为 `tasks.json` 文件中的"默认"编译器。

4. 构建成功后，程序的输出将显示在集成 **终端** 中。

    ![screenshot of program output](images/playbutton/helloworld-terminal-output.png)

第一次运行程序时，C++ 扩展会创建 `tasks.json`，你可以在项目的 `.vscode` 文件夹中找到它。`tasks.json` 存储构建配置。

你的新 `tasks.json` 文件应该类似于下面的 JSON：

```json
{
"version": "2.0.0",
"tasks": [
    {
        "type": "shell",
        "label": "C/C++: g++ build active file",
        "command": "/usr/bin/g++",
        "args": [
            "-g",
            "${file}",
            "-o",
            "${fileDirname}/${fileBasenameNoExtension}"
        ],
        "options": {
            "cwd": "/usr/bin"
        },
        "problemMatcher": [
            "$gcc"
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

>**注意**：你可以在[变量参考](/docs/reference/variables-reference.md)中了解有关 `tasks.json` 变量的更多信息。

`command` 设置指定要运行的程序；在本例中为 g++。
`args` 数组指定将传递给 g++ 的命令行参数。这些参数必须按照编译器期望的顺序指定。

此任务告诉 g++ 获取活动文件 (`${file}`)，编译它，并在当前目录 (`${fileDirname}`) 中创建一个与活动文件同名但没有扩展名 (`${fileBasenameNoExtension}`) 的可执行文件，在我们的示例中结果为 `helloworld`。

`label` 值是你在任务列表中看到的内容；你可以随意命名。

`detail` 值是你在任务列表中看到的任务描述。强烈建议重命名此值以区别于类似的任务。

从现在开始，播放按钮将从 `tasks.json` 中读取以确定如何构建和运行你的程序。你可以在 `tasks.json` 中定义多个构建任务，标记为默认的任务将被播放按钮使用。如果你需要更改默认编译器，可以运行 **任务：配置默认生成任务**。或者，你可以修改 `tasks.json` 文件，通过将以下片段：

```json
    "group": {
        "kind": "build",
        "isDefault": true
    },
```

替换为：

```json
    "group": "build",
```

来删除默认设置。

### 修改 tasks.json

你可以修改 `tasks.json` 来构建多个 C++ 文件，方法是使用类似 `"${workspaceFolder}/*.cpp"` 的参数代替 `"${file}"`。这将构建当前文件夹中的所有 `.cpp` 文件。你还可以通过将 `"${fileDirname}/${fileBasenameNoExtension}"` 替换为硬编码的文件名（例如 'helloworld.out'）来修改输出文件名。

## 调试 helloworld.cpp

要调试你的代码，

1. 回到 `helloworld.cpp`，使其成为活动文件。
1. 通过单击编辑器边距或按 F9 在当前行设置断点。
   ![screenshot of breakpoint in helloworld.cpp](images/playbutton/cpp-breakpoint.png)
1. 从播放按钮旁边的下拉菜单中，选择 **调试 C/C++ 文件**。
   ![Screenshot of play button drop-down](images/playbutton/debug-cpp-file-play-button.png)
1. 从系统上检测到的编译器列表中选择 **C/C++: g++ 生成和调试活动文件**（你只会在第一次运行或调试 `helloworld.cpp` 时被要求选择编译器）。
   ![C++ debug configuration dropdown](images/wsl/build-and-debug-active-file.png)

播放按钮有两种模式：**运行 C/C++ 文件** 和 **调试 C/C++ 文件**。它将默认为最后使用的模式。如果你在播放按钮中看到调试图标，你可以选择播放按钮进行调试，而无需选择下拉菜单项。

## 探索调试器

在你开始逐步执行代码之前，让我们花点时间注意一下用户界面中的几个变化：

- 集成终端出现在源代码编辑器的底部。在 **调试输出** 选项卡中，你可以看到指示调试器已启动并正在运行的输出。
- 编辑器高亮显示第 12 行，这是你在启动调试器之前设置的断点：

   ![Initial breakpoint](images/playbutton/breakpoint-debug.png)

- 左侧的 **运行和调试** 视图显示调试信息。你将在本教程后面看到一个示例。

- 在代码编辑器的顶部，出现一个调试控制面板。你可以通过拖拽左侧的圆点将其在屏幕上移动。

   ![Debugging controls](images/cpp/debug-controls.png)

如果你在工作区中已经有一个 launch.json 文件，播放按钮将从中读取以确定如何运行和调试你的 C++ 文件。如果你没有 launch.json，播放按钮将动态创建一个临时的"快速调试"配置，完全无需 launch.json！

## 逐步执行代码

现在你已准备好开始逐步执行代码。

1. 单击或按调试控制面板中的 **逐过程** 图标。

   ![Step over button](images/cpp/step-over-button.png)

   这将使程序执行前进到 for 循环的第一行，并跳过在创建和初始化 `msg` 变量时调用的 `vector` 和 `string` 类中的所有内部函数调用。注意侧边 **变量** 窗口中的变化。

   ![Debugging windows](images/wsl/debug-view-variables.png)

1. 再次按 **逐过程** 前进到此程序中的下一条语句（跳过为初始化循环而执行的所有内部代码）。现在，**变量** 窗口显示有关循环变量的信息。
1. 再次按 **逐过程** 执行 `cout` 语句。（注意，C++ 扩展在最后一个 cout 执行之前不会将任何输出打印到 **调试控制台**。）
1. 如果你愿意，可以继续按 **逐过程**，直到向量中的所有单词都打印到控制台。但如果你好奇，可以尝试按 **逐语句** 按钮来逐步执行 C++ 标准库中的源代码！

   ![Breakpoint in gcc standard library header](images/cpp/gcc-system-header-stepping.png)

   要返回到你自己的代码，一种方法是继续按 **逐过程**。另一种方法是在你的代码中设置断点，方法是切换到代码编辑器中的 `helloworld.cpp` 选项卡，将插入点放在循环内 `cout` 语句的某个位置，然后按 `kb(editor.debug.action.toggleBreakpoint)`。左侧的边槽中会出现一个红点，表示已在此行设置断点。

   ![Breakpoint in main](images/cpp/breakpoint-in-main.png)

   然后按 `kb(workbench.action.debug.start)` 从标准库头文件的当前行开始执行。执行将在 `cout` 处中断。如果你愿意，可以再次按 `kb(editor.debug.action.toggleBreakpoint)` 来关闭断点。

   当循环完成后，你可以在集成终端的 **调试控制台** 选项卡中看到输出，以及 GDB 输出的一些其他诊断信息。

   ![Debug console display](images/wsl/debug-console-output-wsl.png)

## 设置监视

要在程序执行时跟踪变量的值，请为该变量设置 **监视**。

1. 将插入点放在循环内。在 **监视** 窗口中，单击加号，在文本框中输入 `word`，这是循环变量的名称。现在在你逐步执行循环时查看监视窗口。

   ![Watch window](images/cpp/watch-window.png)

1. 要在断点暂停执行时快速查看任何变量的值，你可以用鼠标指针悬停在其上方。

   ![Mouse hover](images/cpp/mouse-hover.png)

接下来，你将创建一个 `tasks.json` 文件来告诉 VS Code 如何构建（编译）程序。此任务将调用 g++ 编译器从源代码创建可执行文件。

在编辑器中打开 `helloworld.cpp` 很重要，因为下一步使用编辑器中的活动文件作为上下文来在下一步中创建构建任务。

## 使用 launch.json 自定义调试

当你使用播放按钮或 `kb(workbench.action.debug.start)` 进行调试时，C++ 扩展会动态创建一个动态调试配置。

在某些情况下，你可能需要自定义调试配置，例如指定在运行时传递给程序的参数。你可以在 `launch.json` 文件中定义自定义调试配置。

要创建 `launch.json`，请从播放按钮下拉菜单中选择 **添加调试配置**。

![Add debug configuration play button menu](images/playbutton/add-debug-configuration.png)

然后你将看到一个包含各种预定义调试配置的下拉菜单。选择 **g++ 生成和调试活动文件**。

![C++ debug configuration dropdown](images/wsl/build-and-debug-active-file.png)

VS Code 创建一个 `launch.json` 文件，内容大致如下：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "C/C++: g++ build and debug active file",
            "type": "cppdbg",
            "request": "launch",
            "program": "${fileDirname}/${fileBasenameNoExtension}",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "miDebuggerPath": "/usr/bin/gdb",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ],
            "preLaunchTask": "C/C++: g++ build active file"
        }
    ]
}
```

 在上面的 JSON 中，`program` 指定你要调试的程序。这里它被设置为活动文件文件夹 `${fileDirname}` 和不带扩展名的活动文件名 `${fileBasenameNoExtension}`，如果 `helloworld.cpp` 是活动文件，则为 `helloworld`。`args` 属性是在运行时传递给程序的参数数组。

默认情况下，C++ 扩展不会在你的源代码中添加任何断点，`stopAtEntry` 值设置为 `false`。

 将 `stopAtEntry` 值更改为 `true`，使调试器在开始调试时停在 `main` 方法处。

 > 从现在开始，播放按钮和 `kb(workbench.action.debug.start)` 将在启动程序进行调试时从 `launch.json` 文件中读取。

## C/C++ 配置

如果你想更好地控制 C/C++ 扩展，可以创建一个 `c_cpp_properties.json` 文件，它允许你更改设置，例如编译器路径、包含路径、C++ 标准（默认为 C++17）等。

你可以通过从命令面板 (`kb(workbench.action.showCommands)`) 运行 **C/C++: 编辑配置 (UI)** 命令来查看 C/C++ 配置 UI。

![Command Palette](images/cpp/command-palette.png)

这将打开 **C/C++ 配置** 页面。当你在此处进行更改时，VS Code 会将它们写入 `.vscode` 文件夹中名为 `c_cpp_properties.json` 的文件。

![Command Palette](images/wsl/intellisense-configurations-wsl.png)

只有当你的程序包含不在工作区或标准库路径中的头文件时，你才需要修改 **包含路径** 设置。

Visual Studio Code 将这些设置保存在 `.vscode/c_cpp_properties.json` 中。如果你直接打开该文件，它应该看起来像这样：

```json
{
    "configurations": [
        {
            "name": "Linux",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [],
            "compilerPath": "/usr/bin/gcc",
            "cStandard": "c11",
            "cppStandard": "c++17",
            "intelliSenseMode": "clang-x64"
        }
    ],
    "version": 4
}
```

## 关闭 WSL 会话

当你在 WSL 中完成工作后，可以使用主 **文件** 菜单和命令面板 (`kb(workbench.action.showCommands)`) 中的 **关闭远程连接** 命令关闭远程会话。这将重新启动本地运行的 VS Code。你可以从 **文件** > **打开最近的文件** 列表中通过选择带有 **[WSL]** 后缀的文件夹轻松重新打开 WSL 会话。

## 后续步骤

- 探索 [VS Code 用户指南](/docs/editing/codebasics.md)。
- 查看 [C++ 扩展概述](/docs/languages/cpp.md)。
- 创建一个新的工作区，将你的 .json 文件复制到其中，为新工作区路径、程序名称等调整必要的设置，然后开始编码！
