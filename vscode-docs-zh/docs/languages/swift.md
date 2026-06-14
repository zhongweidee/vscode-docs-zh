---
DateApproved: 6/10/2026
MetaDescription: 了解 Visual Studio Code 编辑器针对 Swift 的功能（代码补全、调试、测试）。
---
# Visual Studio Code 中的 Swift

[Swift](https://www.swift.org) 是一种通用编程语言，对新手友好，对专家功能强大。
它快速、现代、安全，编写起来令人愉悦。本主题详细介绍了如何使用 [swiftlang.swift-vscode](https://marketplace.visualstudio.com/items?itemName=swiftlang.swift-vscode) 扩展在 Visual Studio Code 中设置和使用 Swift。

Swift 扩展包括：

- 语法高亮和代码补全
- 代码导航功能，例如转到定义和查找所有引用
- 代码重构和快速修复
- 包管理和任务，支持 Swift Package Manager
- 丰富的调试支持
- 使用 XCTest 或 Swift Testing 框架进行测试

Swift 扩展旨在支持以下项目：

- Swift Package Manager 项目（例如使用 `Package.swift`）
- 可以生成 `compile_commands.json` 的项目（例如使用 CMake）

## 安装扩展

1. 首先，安装 Swift。如果你尚未在系统上安装 Swift，请参阅
   [Swift.org 上的入门指南](https://www.swift.org/getting-started/)。
2. 下载并安装 [Visual Studio Code](https://code.visualstudio.com/Download)。
3. 从
   [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=swiftlang.swift-vscode)
   或直接在 VS Code 扩展窗格中安装 Swift 扩展。

![从扩展窗格安装 swift-vscode 扩展](images/swift/installation.png)

## 创建新的 Swift 项目

要创建新的 Swift 项目，你可以使用 Swift 扩展中的 `Swift: Create New Project...` 命令
引导你完成整个过程。你可以通过打开
命令面板并按以下说明操作来找到此命令。

- macOS：`kbstyle(CMD+Shift+P)`
- 其他平台：`kbstyle(Ctrl+Shift+P)`

![显示可用项目模板的创建新项目命令](images/swift/select-project-template.png)

1. 从模板列表中选择你要创建的项目类型。
2. 选择项目将存储的目录。
3. 为你的项目命名。
4. 打开新创建的项目。系统将提示你在
   当前窗口、新窗口中打开项目，或将其添加到当前工作区。
   默认行为可以通过
   `swift.openAfterCreateNewProject` 设置进行配置。

## 语言功能

Swift 扩展使用 [SourceKit LSP](https://github.com/apple/sourcekit-lsp)
来驱动语言功能。SourceKit LSP 在编辑器中提供以下功能。
使用以下链接查看每个主题的 VS Code 文档：

- [代码补全](/docs/editing/intellisense.md)
- [转到定义](/docs/editing/editingevolved.md#go-to-definition)
- [查找所有引用](/docs/editing/editingevolved.md#peek)
- [重命名重构](/docs/editing/refactoring.md#rename-symbol)
- [诊断](/docs/editing/editingevolved.md#errors--warnings)
- [快速修复](/docs/editing/editingevolved.md#code-action)

SourceKit LSP 还提供代码操作来自动化常见任务。VS Code 中的代码操作
显示为编辑器边距附近的灯泡图标（参见下方截图中的
示例）。点击灯泡将显示可用的操作，
包括：

- 向 `Package.swift` 添加目标
- 将 JSON 转换为协议
- 向函数添加文档

![Package swift 操作](images/swift/package_actions.png)

> [!IMPORTANT]
> 在 Swift 6.1 之前，你必须先在命令行上或使用 VS Code 中的任务对项目执行 `swift build` 命令，
> 然后才能使用语言功能。
> 这会填充 SourceKit-LSP 中的索引。

## Swift 任务

Visual Studio Code 提供任务作为运行外部工具的方式。请参阅
[通过任务与外部工具集成](/docs/debugtest/tasks.md)
文档了解更多信息。

Swift 扩展提供了一些内置任务，你可以使用它们通过
Swift Package Manager 进行构建。你还可以通过在项目的根文件夹中创建
`tasks.json` 文件来配置自定义任务。例如，此
`tasks.json` 以发布模式构建你的 Swift 目标：

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "swift",
      "label": "Swift Build All - Release",
      "detail": "swift build --build-tests",
      "args": ["build", "--build-tests", "-c", "release"],
      "env": {},
      "cwd": "${workspaceFolder}",
      "group": "build"
    }
  ]
}
```

上述任务配置在 `build` 组中。这意味着它将
出现在 `运行生成任务` 菜单中，该菜单可以通过 macOS 上的 `kbstyle(CMD+Shift+B)`
或其它平台上的 `kbstyle(Ctrl+Shift+B)` 打开：

![运行生成任务菜单](images/swift/build-tasks.png)

构建过程中出现的任何错误都会在编辑器中显示为诊断信息，
与 SourceKit-LSP 提供的诊断信息并列。运行另一个构建任务会清除
之前构建任务的诊断信息。

## 调试

Visual Studio Code 提供丰富的调试体验。请参阅
[调试](/docs/debugtest/debugging.md) 文档
了解更多信息。

Swift 扩展依赖
[LLDB DAP 扩展](https://marketplace.visualstudio.com/items?itemName=llvm-vs-code-extensions.lldb-dap) 来启用
调试支持。

默认情况下，扩展会为 Swift 包中的每个可执行
目标创建启动配置。你可以通过在项目的根文件夹中添加
`launch.json` 文件来自行配置。例如，此
`launch.json` 使用自定义参数启动 Swift 可执行文件：

```json
{
  "configurations": [
    {
      "type": "swift",
      "name": "Debug swift-executable",
      "request": "launch",
      "args": ["--hello", "world"],
      "cwd": "${workspaceFolder}",
      "program": "${workspaceFolder}/.build/debug/swift-executable",
      "preLaunchTask": "swift: Build Debug swift-executable"
    }
  ]
}
```

你可以通过 VS Code 中的调试视图启动调试会话。

1. 选择你要调试的启动配置。
2. 点击绿色播放按钮启动调试会话。

可执行文件将启动，你可以在 Swift 代码中设置断点，
这些断点将在代码执行时被命中。

下方截图显示了一个调试 Hello World 程序的示例。它
在断点处暂停，你可以看到调试视图显示了作用域内变量的值。
你还可以在编辑器中悬停在标识符上以查看
其变量值：

![调试](images/swift/debugging.png)

## 测试资源管理器

Visual Studio Code 在左侧边栏中提供测试资源管理器视图，可用于：

- 导航到测试
- 运行测试
- 调试测试

Swift 扩展支持 [XCTest](https://developer.apple.com/documentation/xctest) 以及
[Swift Testing](https://swiftpackageindex.com/swiftlang/swift-testing)。
当你编写测试时，它们会自动添加到测试资源管理器中。

![内联测试错误](images/swift/inline_assertion_failures.png)

调试测试：

1. 设置断点
2. 使用 `调试测试` 配置文件运行测试、测试套件或整个测试目标。

`使用覆盖率运行测试` 配置文件会对被测代码进行插桩，并在
测试运行完成时打开代码覆盖率报告。当你浏览已覆盖的文件时，
测试期间执行过的行号显示为绿色，未覆盖的
显示为红色。悬停在行号上会显示覆盖行
被执行了多少次。可以使用
`Test: Show Inline Coverage` 命令显示或隐藏行执行计数。

带有
[标签](https://swiftpackageindex.com/swiftlang/swift-testing/6.2.0/documentation/testing/addingtags)
注解的 Swift Testing 测试可以在测试资源管理器中使用 `@TestTarget:tagName` 进行筛选。
然后你可以运行或调试筛选后的测试列表。

> [!IMPORTANT]
> Swift VS Code 扩展不支持在 Swift 5.10 或更早版本中运行 Swift Testing 测试。

## 高级工具链选择

Swift 扩展会自动检测已安装的 Swift 工具链。
但是，它还提供了一个名为 `Swift: Select Toolchain...` 的命令，
如果你安装了多个工具链，可以使用该命令进行选择。

> [!IMPORTANT]
> 这是一项高级功能，用于将 VS Code 配置为使用你计算机上默认工具链
> 以外的其他工具链。建议在 macOS 上使用 `xcode-select` 或在
> Linux 上使用 `swiftly` 来全局切换工具链。

系统可能会提示你选择将此新路径配置在哪里。你的选项
包括：

- 保存在用户设置中
- 保存在工作区设置中

请注意，工作区设置的优先级高于用户设置：

![设置选择](images/swift/configuration.png)

然后，Swift 扩展将提示你重新加载扩展以
启用新的工具链。你必须这样做，否则扩展将无法
正常运行：

![重新加载 VS Code 警告](images/swift/reload.png)
