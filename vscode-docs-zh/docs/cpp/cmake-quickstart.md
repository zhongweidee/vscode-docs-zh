---
ContentId: 55b5d15c-a020-4808-941f-e0255751a5f7
DateApproved: 5/29/2024
MetaDescription: 在 Visual Studio Code 中使用 CMake 工具扩展的 CMake 快速入门功能创建 Hello World 项目
Keywords:
- C++
---
# 使用 CMake 快速入门创建 CMake Hello World 项目

在本文中，你将了解如何使用 VS Code 中的 CMake 工具扩展从头创建 CMake hello world 项目。

如果你已有一个现有的 CMake 项目，该项目的根目录中已有 `CMakeLists.txt` 文件但没有 CMake 预设，则可以跳到[创建 `CMakePresets.json` 文件](#Create-a-CMakePresets.json-file)部分，以使用 CMake 预设配置你的项目。

否则，请为新项目创建一个文件夹。在终端窗口中，创建一个名为 `HelloWorld` 的空文件夹，导航到该文件夹，然后输入以下命令在该文件夹中打开 VS Code：

```bash
mkdir helloworld
cd helloworld
code .
```
`code .` 命令会在当前工作文件夹中打开 VS Code，该文件夹将成为你的"工作区"。

## 创建 CMakeLists.txt 文件

CMake 工具扩展可以为你创建基本 CMake 项目的文件。

1. 打开命令面板（`kb(workbench.action.showCommands)`）并运行 **CMake: Quick Start** 命令：

    ![Create CMake quickstart](images/cpp/cmake-quickstart-command-palette.png)

1. 输入项目名称，并选择 **C++** 作为项目语言。

    此信息将写入 `CMakeLists.txt` 和一些初始源文件。

    > **注意：** 如果此文件夹中有其他你想要添加为 `CmakeLists.txt` 目标的源代码文件，此时会提供添加这些文件的选项。但在本教程中，我们将只使用 hello world 文件。

1. 选择 **CTest** 作为附加选项以添加测试支持。你还可以选择 **CPack** 以获得 CPack 支持。

    ![Additional Options](images/cpp/cmake-quickstart-options.png)

1. 接下来，选择 **Executable** 作为项目类型以创建一个基本源文件（`main.cpp`），其中包含一个基本的 `main()` 函数。

    ![Choose project type](images/cpp/cmake-choose-type.png)

    > **注意：** 如果你想要创建基本的源文件和头文件，则应选择 **Library**。但在本教程中，**Executable** 就足够了。如果系统提示你为该文件夹配置 IntelliSense，请选择 **Allow**（允许）。

这样就成功创建了 `CMakeLists.txt` 文件，该文件会告诉 CMake 工具如何构建你的项目。

![Project contents](images/cpp/cmake-quickstart-cmakelists.png)

## 创建 CMakePresets.json 文件

接下来，继续使用 CMake 快速入门来创建 `CMakePresets.json` 文件。

1. 选择 **Add a New Preset**（添加新预设）并选择 **Create from Compilers**（从编译器创建）。

    该扩展会自动扫描你计算机上的工具包，并创建系统中找到的编译器列表。

1. 选择你要使用的编译器。

    例如，根据你安装的编译器，你可能会看到类似以下内容：

    ![Add a new preset](images/cpp/cmake-quickstart-selectkit.png)

1. 输入此新预设的名称。

    预设的名称将写入 `CMakePresets.json`。

完成这些步骤后，你现在应该拥有一个完整的 hello world CMake 项目，其中包含以下文件：`main.cpp`、`CMakeLists.txt` 和 `CMakePresets.json`。

![Add a new preset](images/cpp/cmake-quickstart-projcontents.png)
