---
ContentId: A5C839C4-67E9-449C-94B8-4B310FCAAB1B
DateApproved: 6/10/2026
MetaDescription: Visual Studio Code 支持便携模式，该模式允许你将安装及相关数据移动到不同位置。
---
# 便携模式

Visual Studio Code 支持[便携模式](https://en.wikipedia.org/wiki/Portable_application)。此模式允许 VS Code 创建和维护的所有数据都存放在自身附近，从而可以在不同环境之间移动。

此模式还提供了一种设置 VS Code 扩展安装文件夹位置的方法，适用于阻止扩展安装在 Windows AppData 文件夹中的企业环境。

便携模式适用于 Windows 的 ZIP 下载、Linux 的 TAR.GZ 下载以及 macOS 的常规应用程序下载。请参阅[下载页面](/download)，找到适合你平台的 `.zip / .tar.gz` 文件。

> [!IMPORTANT]
> 请勿尝试在通过 **Windows 用户安装程序或系统安装程序**安装的版本上配置便携模式。便携模式仅适用于 Windows ZIP (`.zip`) 存档。另请注意，Windows ZIP 存档不支持自动更新。

## 启用便携模式

### Windows、Linux

解压 VS Code 下载文件后，在 VS Code 的文件夹内创建一个 `data` 文件夹：

```
|- VSCode-win32-x64-1.84.2
|   |- Code.exe （或 code 可执行文件）
|   |- data
|   |- bin
|   |  |- code
|   |  |- ...
|   |- ...
```

此后，`data` 文件夹将用于包含所有 VS Code 数据，包括会话状态、首选项、扩展等。

> [!NOTE]
> `data` 文件夹将覆盖 `--user-data-dir` 和 `--extensions-dir` [命令行](/docs/configure/command-line.md#advanced-cli-options)选项。

`data` 文件夹可以移动到其他 VS Code 安装中。这在更新便携版 VS Code 版本时非常有用，你可以将 `data` 文件夹移动到新解压的 VS Code 版本中。

### Linux

在 **Linux** 上，除了创建 `data` 文件夹外，你还需要设置正确的 [Electron 沙盒](https://www.electronjs.org/docs/tutorial/sandbox)权限。

Chromium 在 Linux 上具有[多层沙盒模型](https://chromium.googlesource.com/chromium/src/+/0e94f26e8/docs/linux_sandboxing.md)。如果 Chromium 无法对第 1 层使用命名空间沙盒，它将尝试通过随应用程序二进制文件一起提供的辅助二进制文件 `chrome-sandbox` 来使用 [`setuid` 沙盒](https://chromium.googlesource.com/chromium/src/+/0e94f26e8/docs/linux_suid_sandbox.md)。

运行以下命令以设置 `setuid` 辅助程序的正确权限：

```bash
sudo chown root <path-to-vscode>/chrome-sandbox
sudo chmod 4755 <path-to-vscode>/chrome-sandbox
```

### macOS

在 **macOS** 上，你需要将 data 文件夹作为应用程序本身的同级文件夹放置。由于该文件夹将与应用程序并排放置，你需要为它指定特定的名称，以便 VS Code 能够找到它。默认的文件夹名称是 `code-portable-data`：

```
|- Visual Studio Code.app
|- code-portable-data
```

如果你的应用程序处于[隔离](https://apple.stackexchange.com/a/104875)状态（如果你刚下载了 VS Code，默认情况下会如此），便携模式将无法工作。如果便携模式似乎无法正常工作，请确保移除隔离属性：

```bash
xattr -dr com.apple.quarantine Visual\ Studio\ Code.app
```

> [!NOTE]
> 在 Insiders 版本上，文件夹应命名为 `code-insiders-portable-data`。

## 更新便携版 VS Code

在 **Windows** 和 **Linux** 上，你可以通过将 `data` 文件夹复制到更新版本的 VS Code 中来更新 VS Code。

在 **macOS** 上，自动更新应一如既往地工作，无需额外操作。

## 迁移到便携模式

你也可以将现有安装迁移到便携模式。

### Windows、Linux

1. 下载适用于你平台的 [VS Code](/download)（或 [VS Code Insiders](/insiders)）ZIP 分发包。
2. 如上所述创建 `data` 文件夹。
3. 将用户数据目录 `Code` 复制到 `data` 并重命名为 `user-data`：
    * **Windows** `%APPDATA%\Code`
    * **Linux** `$HOME/.config/Code`
4. 将扩展目录复制到 `data`：
    * **Windows** `%USERPROFILE%\.vscode\extensions`
    * **Linux** `~/.vscode/extensions`

以 **Windows** 为例，以下是期望的结果：

```
|- VSCode-win32-x64-1.84.2
|   |- Code.exe （或 code 可执行文件）
|   |- data
|   |   |- user-data
|   |   |   |- ...
|   |   |- extensions
|   |   |   |- ...
|   |- ...
```

### macOS

1. 下载适用于 macOS 的 [VS Code](/download)（或 [VS Code Insiders](/insiders)）。
2. 如上所述创建 `code-portable-data` 文件夹。
3. 将用户数据目录 `Code` 复制到 `code-portable-data` 并重命名为 `user-data`：
    * `$HOME/Library/Application Support/Code`
4. 将扩展目录复制到 `code-portable-data`：
    * `~/.vscode/extensions`

## TMP 目录

默认情况下，即使在便携模式下，默认的 `TMP` 目录仍然是系统目录，因为其中不会保留任何状态。如果你希望 TMP 目录也位于便携目录中，可以在 `data` 文件夹内创建一个空的 `tmp` 目录。只要存在 `tmp` 目录，它就会被用于存储 TMP 数据。
