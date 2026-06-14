---
ContentId: 1e84d196-397f-4dbb-9746-06f15766d83e
DateApproved: 2/12/2020
MetaDescription: 如何在 macOS 上使用 LLDB-MI 设置调试
Keywords:
- C++
---
# 在 macOS 上使用 LLDB-MI 进行调试

[C/C++ 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)的调试适配器同时使用 gdb 和 lldb 的机器接口模式。要在 lldb 中使用此接口，该扩展会利用 `lldb-mi`。`lldb-mi` 可执行文件是从 GitHub [lldb-mi 仓库](https://github.com/lldb-tools/lldb-mi)构建的，并依赖于 Xcode 自带的 `LLDB.framework`。

## 先决条件

`lldb-mi` 可执行文件需要 `LLDB.framework` 才能运行。

### 如何获取 LLDB.framework

您可以通过以下两种方式之一获取 `LLDB.framework`。

Xcode：

   1. 打开 **Apple App Store**。
   2. 搜索 'Xcode'。
   3. 选择 **Xcode** 应用程序，然后点击 **安装（Install）**。

Xcode 命令行工具：

   1. 打开终端。
   2. 运行 `xcode-select --install`。
   3. 确认提示。

## launch.json 示例

以下是 `lldb` 的 `launch.json` 调试配置项示例：

```json
"configurations": [
    {
        "name": "Launch (lldb)",
        "type": "cppdbg",
        "request": "launch",
        "program": "${workspaceFolder}/a.out",
        "args": [],
        "stopAtEntry": false,
        "cwd": "${workspaceFolder}",
        "environment": [],
        "externalConsole": false
    }
]
```

## 如果出现开发者工具访问提示

您可能会看到一条对话框，提示"Developer Tools Access needs to take control of another process for debugging to continue."（开发者工具访问需要控制其他进程以继续调试。）

![Developer Tool Access problem](images/debugger/DeveloperToolsAccess.png)

如果出现此提示，您需要输入用户名和密码以允许调试。

如果您希望永久关闭此提示，可以在终端中运行以下命令：

```bash
sudo DevToolsSecurity --enable
```

## 其他配置

### 使用未通过 Xcode 安装的 LLDB.framework

如果您想使用未随 Xcode 安装的 LLDB.framework，您需要：

1. 将 `~/.vscode/extensions/ms-vscode.cpptools-<version>/debugAdapters/lldb-mi/bin` 中的 `lldb-mi` 可执行文件复制到 `LLDB.framework` 所在的文件夹。

2. 在 `launch.json` 配置中将 `lldb-mi` 的完整路径添加到 `miDebuggerPath`。

例如，如果您的 `LLDB.framework` 文件夹位于 `/Users/default/example/`，您需要：

1. 将 `~/.vscode/extensions/ms-vscode.cpptools-<version>/debugAdapters/lldb-mi/bin/lldb-mi` 复制到 `/Users/default/example/`。

2. 在现有配置中添加以下内容：

   ```json
   "miDebuggerPath": "/Users/default/example/lldb-mi"
   ```

### 使用自定义构建的 lldb-mi

如果您自己构建了 `lldb-mi`，可以通过将 `miDebuggerPath` 设置为可执行文件的完整路径来使用它。

## 参考

* [LLDB-MI 仓库](https://github.com/lldb-tools/lldb-mi)
