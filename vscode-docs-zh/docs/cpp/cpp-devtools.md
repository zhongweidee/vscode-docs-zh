---
ContentId: 1d39c52e-5856-4ce0-b622-82d1fd1c7a54
DateApproved: 02/17/2026
MetaDescription: 使用 C++ 代码理解和 CMake 工具，为 Copilot 提供丰富的符号上下文和构建配置知识。
Keywords:
- C++
- CMake
- Copilot
---
# 在 GitHub Copilot Chat 中使用 C++ 开发工具

在 C++ 代码中进行重构和更新通常需要跨多个文件追踪修改，并且需要了解构建配置。

GitHub Copilot Chat 可以使用 VS Code 内置的 C++ 工具为你的 C++ 项目提供上下文感知的辅助。通过使用代码理解和 CMake 工具，Copilot 能够理解你的代码库结构、依赖关系和构建配置，从而为你提供更准确、更有帮助且更快速的响应。

本指南涵盖了可用的工具以及如何有效地将其与 AI 代理配合使用来完成以下任务：

- 导航和理解复杂的 C++ 代码库
- 以完整的上下文感知能力重构代码
- 高效地配置和构建项目

## 前提条件

- [C/C++ DevTools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpp-devtools) 扩展
- [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) 扩展
- [CMake Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools) 扩展

这些扩展可作为 [C/C++ 扩展包](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-extension-pack) 的一部分获取。

你可以随时通过在聊天中选择 `Tools` 选项并选择要启用/禁用的相应工具来启用/禁用这些工具中的任何一个。

![屏幕截图显示了聊天工具快速选择中的 cpp 工具列表。](images/cpp-devtools/all-cpp-tools.png)

> [!NOTE]
> 仅启用与你的开发工作流相关的工具，以避免上下文膨胀。你可以通过同一个对话框禁用其他工具，例如通过 MCP 安装的工具。


## C++ 代码理解工具

C++ 扩展提供的工具使用语言服务，让 Copilot Chat 深入了解你的代码结构、符号和关系。请确保你已[配置好 IntelliSense](/docs/cpp/configure-intellisense.md) 以充分利用这些工具。

要启用这些工具，请在 VS Code 用户设置中选择 **Enable Cpp Code Editing Tools** 设置。

![设置编辑器的屏幕截图，显示了 Enable Cpp Code Editing Tools 设置。](images/cpp-devtools/cpp-code-editing-tools-setting.png)

### 获取符号信息（`GetSymbolInfo_CppTools`）

**功能：** 检索代码库中符号（函数、类、变量等）的详细信息，包括它们的定义、类型和文档。

**使用场景示例：**
*优化内存性能并确保非破坏性更改*

![聊天视图的屏幕截图，显示了一个将符号重构为内存安全的提示，该提示调用了获取符号信息工具。](images/cpp-devtools/get-symbol-info-example.png)

---

### 获取符号引用（`GetSymbolReferences_CppTools`）

**功能：** 在整个代码库中查找特定符号的所有引用，显示函数、类或变量的使用位置。

**使用场景示例：**
*向现有函数添加附加功能*

![聊天视图的屏幕截图，显示了一个更新现有函数并添加日志记录参数的提示，该提示调用了获取符号引用工具。](images/cpp-devtools/get-symbol-references-example.png)

> [!NOTE]
> 你可以通过调整 VS Code 中的符号引用限制设置来控制工具返回的符号引用的最大数量。
>
> ![设置编辑器的屏幕截图，显示了符号引用限制设置。](images/cpp-devtools/get-symbol-references-setting.png)

---

### 获取符号调用层次结构（`GetSymbolCallHierarchy_CppTools`）

**功能：** 显示函数的调用层次结构，揭示传入调用（谁调用了此函数）和传出调用（此函数调用了什么）。

**使用场景示例：**
*模块迁移的依赖关系分析*

![聊天视图的屏幕截图，显示了一个将模块迁移到单独库中并因此请求依赖关系分析的提示，该提示调用了获取符号调用层次结构工具。](images/cpp-devtools/get-symbol-call-hierarchy-example.png)

---

## CMake 工具集成

CMake 工具让 Copilot Chat 能够理解你的构建配置、目标和依赖关系，从而提供构建感知的辅助。

### CMake 构建（`Build_CMakeTools`）

**功能：** 使用当前配置和选定的目标构建你的 CMake 项目。

**使用场景示例：**
*解决构建错误*

![聊天视图的屏幕截图，显示了一个解决构建错误的提示，该提示调用了 CMake 构建工具。](images/cpp-devtools/cmake-build-example.png)

---

### 运行 CTest（`RunCTest_CMakeTools`）

**功能：** 运行项目中由 CTest 定义的测试套件

**使用场景示例：**
*根据单元测试修复代码*

![聊天视图的屏幕截图，显示了一个修复失败单元测试的提示，该提示调用了运行 ctest。](images/cpp-devtools/run-ctest-example.png)

---

### 有效提示的技巧

- **具体明确：** 明确指出你询问的具体符号、文件或组件（例如，“重构 `getConfig()` 函数”而不是“让它更快”）
- **引用上下文：** 在分析更改时，要求 Copilot Chat 考虑特定的文件、函数或模块
- **直接引用工具：** 在聊天中使用 # 直接引用相关工具以确保调用。
- **使用自定义指令：** 设置[自定义指令](/docs/agent-customization/custom-instructions.md)来指导 Copilot Chat。请参阅 [awesome-copilot 仓库](https://github.com/github/awesome-copilot/blob/main/instructions/cpp-language-service-tools.instructions.md?plain=1) 中记录的用于提高 C++ 工具调用率的示例自定义指令。
- **使用最新模型：** 使用支持工具调用的最新 AI 模型，以获得最准确的代码理解和工具使用体验
- **优化工具性能：** 仅启用与你的开发工作流相关的工具，以避免上下文膨胀

### 何时使用每个工具

**符号信息：** 当需要理解现有代码的结构或在更改之前验证属性时使用。

**符号引用：** 在重构时使用，以识别所有用法并确保更改不会破坏现有代码。

**调用层次结构：** 在分析依赖关系、理解调用链或规划模块迁移时使用。

**CMake 构建：** 在排查构建问题或验证更改是否成功编译时使用。

**CTest：** 在根据测试套件验证更改或调试测试失败时使用。
