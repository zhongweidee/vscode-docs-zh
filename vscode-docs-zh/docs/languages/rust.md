---
ContentId: 643d022e-9370-4ca5-bccd-c3a583c5df75
DateApproved: 6/10/2026
MetaDescription: 了解 Visual Studio Code 编辑器为 Rust 提供的各项功能（代码补全、调试、代码片段、代码检查）。
---
# Visual Studio Code 中的 Rust 支持

[Rust](https://www.rust-lang.org) 是一种强大的编程语言，常用于对性能与正确性要求极高的系统编程。如果你是 Rust 新手并希望深入学习，在线书籍 [The Rust Programming Language](https://doc.rust-lang.org/book) 是一个很好的起点。本主题将详细介绍如何在 Visual Studio Code 中配置和使用 Rust，借助 [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) 扩展实现。

![Rust extension banner](images/rust/rust-analyzer-extension.png)

> [!NOTE]
> VS Code 市场中还有另一个流行的 Rust 扩展（扩展 ID：rust-lang.rust），但该扩展已被弃用，rust-analyzer 是 rust-lang.org 推荐的 VS Code Rust 扩展。

## 安装

### 1. 安装 Rust

首先，你需要在你的机器上安装 Rust 工具集。Rust 通过 [rustup](https://rustup.rs) 安装程序进行安装，该程序支持在 Windows、macOS 和 Linux 上安装。请按照 rustup 针对你平台的安装指南进行操作，并注意安装构建和运行 Rust 程序所需的任何额外工具。

> [!NOTE]
> 与在你的机器上安装任何新工具集一样，你需要确保重启你的终端/命令提示符和 VS Code 实例，以使用更新后的工具集在你平台的 PATH 变量中的位置。

### 2. 安装 rust-analyzer 扩展

你可以在 VS Code 中通过扩展视图 (`kb(workbench.view.extensions)`) 搜索 'rust-analyzer' 来找到并安装 rust-analyzer 扩展。你应当安装**正式发布版本**。

![rust-analyzer extension in the Extensions view](images/rust/rust-analyzer-extensions-view.png)

我们将在本主题中讨论 rust-analyzer 的许多功能，但你也可以参阅该扩展的文档：[https://rust-analyzer.github.io](https://rust-analyzer.github.io)。

### 检查你的安装

安装 Rust 之后，你可以通过打开新的终端/命令提示符并输入以下命令来检查是否一切安装正确：

```bash
rustc --version
```

该命令将输出 Rust 编译器的版本。如果你想获取更多详细信息，可以添加 `--verbose` 参数。如果遇到问题，你可以查阅 Rust [安装指南](https://doc.rust-lang.org/book/ch01-01-installation.html)。

你可以通过运行以下命令使你的 Rust 安装保持最新版本：

```bash
rustup update
```

Rust 每隔 6 周会发布新的稳定版本，因此这是一个好习惯。

### 本地 Rust 文档

当你安装 Rust 时，你还会获得完整的 Rust 文档集，这些文档会本地安装在你机器上，你可以通过输入 `rustup doc` 来查阅。Rust 文档，包括 [The Rust Programming Language](https://doc.rust-lang.org/book/title-page.html) 和 [The Cargo Book](https://doc.rust-lang.org/stable/cargo/)，将在你的本地浏览器中打开，这样你就可以在离线状态下继续你的 Rust 学习之旅。

## Hello World

### Cargo

当你通过 rustup 安装 Rust 时，该工具集包含 rustc 编译器、rustfmt 源代码格式化器以及 clippy Rust 代码检查器。你还会获得 [Cargo](https://doc.rust-lang.org/cargo)，Rust 的包管理器，用于帮助你下载 Rust 依赖项并构建和运行 Rust 程序。你会发现，在使用 Rust 进行工作时，你几乎每件事都会用到 `cargo`。

### Cargo new

创建你的第一个 Rust 程序的一个好方法是使用 Cargo 通过输入 `cargo new` 来生成新项目的脚手架。这将创建一个简单的 Hello World 程序以及一个默认的 `Cargo.toml` 依赖项配置文件。你需要向 `cargo new` 传递你想要在其中创建项目的文件夹。

让我们来创建 Hello World。导航到你希望创建项目的文件夹并输入：

```bash
cargo new hello_world
```

要在 VS Code 中打开你的新项目，请进入该新文件夹并通过 `code .` 启动 VS Code：

```bash
cd hello_world
code .
```

> [!NOTE]
> 对你作为作者创建的新文件夹，请启用[工作区信任](/docs/editing/workspaces/workspace-trust.md)。你可以为整个父项目文件夹启用工作区信任，以避免在创建新项目时被提示，方法是勾选"信任父文件夹 'my_projects' 中所有文件的作者"选项。

`cargo new` 会创建一个简单的 Hello World 项目，其中包含一个 `main.rs` 源代码文件和一个 `Cargo.toml` [Cargo 清单](https://doc.rust-lang.org/cargo/reference/manifest.html)文件。

```
src\
    main.rs
.gitignore
Cargo.toml
```

`main.rs` 包含程序的入口函数 `main()`，并使用 `println!` 向控制台输出 "Hello, world!"。

```rust
fn main() {
    println!("Hello, world!");
}
```

这个简单的 Hello World 程序没有任何依赖项，但你可以在 `[dependencies]` 下添加 Rust 包（crate）引用。

### Cargo build

Cargo 可用于构建你的 Rust 项目。打开新的 VS Code [集成终端](/docs/terminal/basics.md) (`kb(workbench.action.terminal.new)`) 并输入 `cargo build`。

```bash
cargo build
```

![Cargo build output in the integrated terminal](images/rust/cargo-build.png)

现在你将拥有 `target\debug` 文件夹，其中包含构建输出，包括一个名为 `hello_world.exe` 的可执行文件。

### 运行 Hello World

Cargo 也可用于通过 `cargo run` 来运行你的 Rust 项目。

```bash
cargo run
```

你也可以在终端中通过输入 `.\target\debug\hello_world` 手动运行 `hello_world.exe`。

![Manually running hello_world.exe output in the integrated terminal](images/rust/cargo-run.png)

## IntelliSense

IntelliSense 功能由 Rust 语言服务器 [rust-analyzer](https://github.com/rust-lang/rust-analyzer/releases) 提供，它能提供详细的代码信息和智能建议。

当你首次打开一个 Rust 项目时，你可以在状态栏的左下角观察 rust-analyzer 的进度。你需要等待 rust-analyzer 完成对你项目的全面审查，才能充分发挥语言服务器的全部能力。

![rust-analyzer in progress status in the VS Code Status bar](images/rust/rust-analyzer-status-bar.png)

### 内联提示

你可能首先会注意到 rust-analyzer 提供了[内联提示](/docs/editing/editingevolved.md#inlay-hints)，在编辑器中使用浅色文本显示推断类型、返回值和命名参数。

![Rust program with inlay hints displayed](images/rust/inlay-hints.png)

虽然内联提示有助于理解你的代码，但你也可以通过 **Editor > Inlay Hints: Enabled** 设置 (`setting(editor.inlayHints.enabled)`) 来配置该功能。

### 悬停信息

将鼠标悬停在任何变量、函数、类型或关键字上，都会为你显示该项的信息，例如文档、签名等。你还可以跳转到你自己代码中或标准 Rust 库中的类型定义。

![Hover information for the Rust String type](images/rust/hover.png)

### 自动补全

当你在 Rust 文件中输入时，IntelliSense 会为你提供建议补全和参数提示。

![Smart completion for Rust String member](images/rust/code-completions.png)

> [!TIP]
> 使用 `kb(editor.action.triggerSuggest)` 手动触发生成建议。

## 语义语法高亮

由于 rust-analyzer 对项目源代码有深入的理解，它能够使用[语义语法高亮](https://github.com/microsoft/vscode/wiki/Semantic-Highlighting-Overview)和样式设置。例如，你可能已经注意到可变变量在编辑器中被显示为下划线样式。

![Mutable variable underline in the editor](images/rust/mutable-underline.png)

能够快速辨别哪些 Rust 变量可变为不可变，这有助于你理解源代码，但你也可以通过用户[设置](/docs/configure/settings.md)中的 VS Code `setting(editor.semanticTokenColorCustomizations)` 设置来更改样式。

在 `settings.json` 中，你可以添加以下内容：

```jsonc
{
  "editor.semanticTokenColorCustomizations": {
    "rules": {
      "*.mutable": {
        "fontStyle": "", // 设置为空字符串以禁用了默认的下划线样式，
      },
    }
  },
}
```

你可以在 rust-analyzer 文档的[编辑器功能](https://rust-analyzer.github.io/manual.html#editor-features)部分了解更多关于 rust-analyzer 语义语法自定义的信息。

## 代码导航

代码导航功能可通过编辑器中的上下文菜单使用。

* **转到定义** `kb(editor.action.revealDefinition)` - 转到类型定义的源代码。
* **速览定义** `kb(editor.action.peekDefinition)` - 弹出一个包含类型定义的速览窗口。
* **转到引用** `kb(editor.action.goToReferences)` - 显示该类型的所有引用。
* **显示调用层次结构** `kb(editor.showCallHierarchy)` - 显示对某个函数的所有调用或来自某个函数的所有调用。

你可以通过命令面板 (`kb(workbench.action.showCommands)`) 中的**转到符号**命令来通过符号搜索进行导航。

* 转到文件中的符号 - `kb(workbench.action.gotoSymbol)`
* 转到工作区中的符号 - `kb(workbench.action.showAllSymbols)`

## 代码检查

Rust 工具集包含代码检查功能，由 rustc 和 clippy 提供，用于检测源代码中的问题。

![linter warning about an unused variable](images/rust/linter-warning.png)

rustc 代码检查器默认启用，可检测基本的 Rust 错误，但你可以使用 [clippy](https://github.com/rust-lang/rust-clippy) 来获取更多检查规则。要在 rust-analyzer 中启用 clippy 集成，请将 **Rust-analyzer > Check: Command** (`rust-analyzer.check.command`) 设置更改为 `clippy`（替代默认的 `check`）。这样，rust-analyzer 扩展将在你保存文件时运行 `cargo clippy`，并直接在编辑器和问题视图中显示 clippy 警告和错误。

## 快速修复

当代码检查器在你的源代码中发现错误和警告时，rust-analyzer 通常可以提供建议的快速修复（也称为代码操作），这些快速修复可通过编辑器中的灯泡悬停提示来使用。你可以通过 `kb(editor.action.quickFix)` 快速打开可用的快速修复。

此外，**Code Action Widget: Include Nearby Quick Fixes** (`setting(editor.codeActionWidget.includeNearbyQuickFixes)`) 是一个默认启用的设置，当使用 `kb(editor.action.quickFix)`（命令 ID `editor.action.quickFix`）时，无论光标位于该行的什么位置，它都会激活该行中最临近的快速修复。

该命令会高亮显示将被重构或通过快速修复来修复的源代码。普通的代码操作和非修复类重构仍然可以在光标位置激活。

![Quick Fixes for greeting unused boolean variable](images/rust/quick-fixes.png)

## 重构

由于 rust-analyzer 对源代码的语义理解，它还可以在你的 Rust 文件中提供智能重命名。将光标放在一个变量上，然后从上下文菜单、命令面板中选择**重命名符号**，或通过 `kb(editor.action.rename)` 进行操作。

rust-analyzer 扩展还支持其他代码重构和代码生成功能，该扩展称之为[辅助功能](https://rust-analyzer.github.io/manual.html#assists-code-actions)。

以下是可用重构中的一小部分：

* 将 if 语句转换为受防护的 return
* 内联变量
* 提取函数
* 添加返回类型
* 添加导入

## 格式化

Rust 工具集包含一个格式化器 [rustfmt](https://github.com/rust-lang/rustfmt)，它可以格式化你的源代码以符合 Rust 约定。你可以使用 `kb(editor.action.formatDocument)`、从命令面板或编辑器上下文菜单中选择**格式化文档**命令来格式化你的 Rust 文件。

你还可以选择在每次保存时运行格式化器（**Editor: Format On Save**）或粘贴时运行格式化器（**Format On Paste**），以在工作时自动保持你的 Rust 代码格式正确。

## 调试

rust-analyzer 扩展支持在 VS Code 内调试 Rust。

### 安装调试支持

要开始调试，你首先需要安装以下两个具有调试支持的语言扩展之一：

* [Microsoft C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) (ms-vscode.cpptools) – *适用于 Windows*
* [CodeLLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) (vadimcn.vscode-lldb) – *适用于 macOS/Linux*

如果你忘记安装这些扩展中的一个，当你尝试启动调试会话时，rust-analyzer 会提供一个通知，其中包含指向 VS Code 市场的链接。

![rust-analyzer notification to install a debugging extension](images/rust/install-debugging-extensions.png)

### 使用 Rust Analyzer: Debug

rust-analyzer 扩展通过命令面板 (`kb(workbench.action.showCommands)`) 中的 **Rust Analyzer: Debug** 命令和编辑器中的 **Run|Debug** CodeLens 提供了基本的调试支持。

让我们来调试我们之前创建的 Hello World 程序。首先，我们将在 `main.rs` 中设置一个断点。

1. 你需要启用设置 **Debug: Allow Breakpoints Everywhere**，你可以在设置编辑器 (`kb(workbench.action.openSettings)`) 中搜索 "everywhere" 来找到它。

   ![Debug: Allow Breakpoints Everywhere in the Settings editor](images/rust/allow-breakpoints-everywhere.png)

2. 打开 `main.rs` 并点击编辑器左侧装订线，在 `println!` 行设置一个断点。它应该显示为一个红点。

   ![Red breakpoint dot in the left gutter of the editor](images/rust/set-breakpoint.png)

3. 要开始调试，请使用 **Rust Analyzer: Debug** 命令或选择 `main()` 上方的 **Debug** CodeLens。

   ![Debug session stopped at breakpoint](images/rust/debug-hello-world.png)

<!--
### 使用 launch.json

对于更复杂的调试场景，你可以创建一个 `launch.json` [调试配置](/docs/debugtest/debugging.md/#launch-configurations)文件。`launch.json` 文件允许你向程序传递参数、运行预启动任务、设置环境变量等等。

要为 Rust 程序创建 `launch.json`：

1. 在调试视图 (`kb(workbench.view.debug)`) 中，选择**创建 launch.json 文件**链接。
2. 这将显示一个下拉菜单，其中包含几个默认的启动配置类型。你可以选择第一个选项，因为我们稍后会添加另一个 Rust 配置。
3. 现在你将在编辑器中看到一个 `launch.json` 文件，它位于项目中的新 `.vscode` 文件夹内。
4. 选择右下角的**添加配置**按钮，然后选择 **C/C++: (Windows) Launch** 配置。
  ![Add Configuration with C/C++ Windows Launch selected](images/rust/add-configuration.png)
-->

## 后续步骤

以上是对 VS Code 中 rust-analyzer 扩展功能的简要概述。有关更多信息，请参阅 Rust Analyzer 扩展[用户手册](https://rust-analyzer.github.io/manual.html)中提供的详细信息，包括如何调整特定的 [VS Code 编辑器](https://rust-analyzer.github.io/manual.html#vs-code-2)配置。

要了解 rust-analyzer 扩展的最新功能/错误修复，请参阅[更新日志](https://rust-analyzer.github.io/thisweek)。你还可以通过在扩展视图的**安装**下拉菜单中安装 rust-analyzer 的**预发布版本**来尝试新功能和修复。

如果你有任何问题或功能请求，欢迎在 rust-analyzer 扩展的 [GitHub 仓库](https://github.com/rust-lang/rust-analyzer/issues)中提交。

如果你想了解更多关于 VS Code 的信息，请尝试以下主题：

* [基础编辑](/docs/editing/codebasics.md) - 快速介绍 VS Code 编辑器的基础知识。
* [安装扩展](/docs/configure/extensions/extension-marketplace.md) - 了解[市场](https://marketplace.visualstudio.com/vscode)中提供的其他扩展。
* [代码导航](/docs/editing/editingevolved.md) - 在你的源代码中快速移动。

## 常见问题

### 链接器错误

如果你在尝试构建 Rust 程序时看到诸如 **"error: linker `link.exe` not found"** 之类的链接器错误，你可能缺少必要的 C/C++ 工具集。根据你的平台，你需要安装一个包含 C/C++ 链接器的工具集来组合 Rust 编译器的输出。

**Windows**

在 Windows 上，你还需要安装 [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) 以获取 C/C++ 链接器 `link.exe`。在运行 Visual Studio 安装程序时，请确保选择**使用 C++ 的桌面开发**工作负载。

> [!NOTE]
> 你可以配合使用 Visual Studio Build Tools 中的 C++ 工具集和 Visual Studio Code 来编译、构建和验证任何代码库，只要你还拥有有效的 Visual Studio 许可证（Community、Pro 或 Enterprise）。

**macOS**

你可能需要通过终端运行 `xcode-select --install` 来安装 XCode 工具集。

**Linux**

你可能需要通过终端运行 `sudo apt-get install build-essential` 来安装 `build-essential` 包中的 GCC 工具集。

如需进一步的故障排除建议，请参阅 [Rust 安装](https://doc.rust-lang.org/book/ch01-01-installation.html)指南。
