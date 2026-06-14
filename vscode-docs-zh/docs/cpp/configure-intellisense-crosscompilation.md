---
ContentId: 381b7ce1-5766-49b0-ad26-f9eedae70e63
DateApproved: 1/17/2023
MetaDescription: 配置 Visual Studio Code c_cpp_properties.json，以便在针对不同平台进行编译时获取 IntelliSense
Keywords:
- C++
---
# 交叉编译的 IntelliSense

本文介绍如何配置 C/C++ 扩展，以便在 Visual Studio Code 中为与开发主机构架不同的目标平台编译时提供正确的 IntelliSense（例如代码补全）。例如，当你的主机是 x64 但你在为 Arm 编译时。

C/C++ 扩展不是编译器——它提供丰富的语言功能，例如语法高亮和 IntelliSense。为了让扩展提供正确的 IntelliSense 建议并反映正确的数据类型大小，你需要配置 C++ 扩展来模拟目标架构。

这些配置设置存储在你项目的 `c_cpp_properties.json` 文件中。要在 VS Code 中编辑此文件，请从命令面板 (`kb(workbench.action.showCommands)`) 中选择 **C/C++: 编辑配置 (UI)**：

![命令面板](images/cpp/command-palette.png)

## IntelliSense 配置示例

下面展示了如何为以 Linux Arm 为目标的 Linux x64 主机配置 C/C++ 扩展。它配置了以下 IntelliSense 设置：

- **编译器路径**：扩展在此位置查询编译器，以检索系统库和编译器定义。
- **IntelliSense 模式**：模拟目标架构和编译器，以便扩展能够提供正确的 IntelliSense 并反映正确的数据类型大小，例如 `pointer`、`size_t`、`long` 等。

至少，设置**编译器路径**和 **IntelliSense 模式**就足以让扩展模拟你项目的目标架构，不过如果扩展能够根据查询**编译器路径**返回的定义自动正确选择 **IntelliSense 模式**，则可能不需要设置它。

### 编译器路径

设置为你用于构建项目的编译器的完整路径。

例如：

![编译器路径设置](images/intellisense/compiler-path.png)

### IntelliSense 模式

设置为你所使用的编译器的特定架构变体。

例如：

![IntelliSense 模式设置](images/intellisense/intellisense-mode.png)

### 包含路径

只有在你的程序包含不在工作区中或不在标准库路径中的头文件时，才需要修改**包含路径**。

C/C++ 扩展通过查询**编译器路径**指定的编译器来填充包含路径。如果扩展找不到目标系统库的路径，你可以手动输入包含路径：

![包含路径设置](images/intellisense/include-path.png)

根据上述设置，你的 `c_cpp_configuration.json` 文件将类似于以下内容。你可以通过从命令面板中选择 **C/C++: 编辑配置 (JSON)** 来打开它：

```json
{
    "configurations": [
        {
            "name": "myConfigurationName",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [],
            "compilerPath": "/usr/bin/arm-none-eabi-g++",
            "cStandard": "c11",
            "cppStandard": "c++14",
            "IntelliSenseMode": "gcc-arm"
        }
    ],
    "version": 4
}
```

## 后续步骤

- 有关 IntelliSense 配置的更多信息，请参阅[自定义默认设置](/docs/cpp/customize-cpp-settings.md)。
- 如果你在配置设置时遇到问题，请在 [GitHub 讨论区](https://github.com/microsoft/vscode-cpptools/discussions)发起讨论，或者如果你发现需要修复的问题，请在 [GitHub 问题](https://github.com/microsoft/vscode-cpptools/issues)提交问题。
- 查看 [C++ 扩展概述](/docs/languages/cpp.md)。
