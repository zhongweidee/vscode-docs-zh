---
ContentId: 1a9d76e8-9c8c-446e-974e-d71570e7d62a
DateApproved: 6/10/2026
MetaDescription: Visual Studio Code 的集成终端允许配置各种配置文件，以便更方便地启动各种 shell。
---
# 终端配置文件

终端配置文件是平台特定的 shell 配置，由可执行路径、参数和其他自定义设置组成。默认情况下，系统会自动检测多个配置文件，您可以对这些配置文件进行自定义或添加新配置。

<!-- TODO: Image of customized select default profile quick pick -->

示例配置文件：

```jsonc
{
  "terminal.integrated.profiles.windows": {
    "Custom Init": {
      "path": "pwsh.exe",
      "args": [
         "-noexit",
         "-file",
         "${env:APPDATA}\\PowerShell\\custom-init.ps1"
      ]
    }
  },
  "terminal.integrated.defaultProfile.windows": "Custom Init"
}
```

您可以在终端配置文件中使用变量，如上面示例中的 `APPDATA` 环境变量所示。可用变量列表请参阅[变量参考](/docs/reference/variables-reference.md)主题。

通过运行**终端: 选择默认配置文件**命令来配置您的默认配置文件，该命令也可以通过新建终端下拉菜单访问。

![Select Default Profile is located at the bottom of the dropdown menu attached to the new terminal button](images/basics/terminal-dropdown.png)

默认终端配置文件 shell 在 Linux 和 macOS 上默认为 `$SHELL`，在 Windows 上默认为 PowerShell。VS Code 会自动检测大多数标准 shell，然后可以将它们配置为默认值。

## 配置配置文件

要创建新的配置文件，请运行**终端: 选择默认配置文件**命令，然后点击 shell 右侧的配置按钮以基于该 shell 创建新的配置文件。这将在您的设置中添加一个新条目，您可以在 `settings.json` 文件中手动调整。

配置文件可以使用 `path` 或 `source` 创建，还可以包含一组可选的参数。`source` 仅在 Windows 上可用，可用于让 VS Code 检测 `PowerShell` 或 `Git Bash` 的安装。或者，也可以使用直接指向 shell 可执行文件的 `path`。以下是一些示例配置文件配置：

```json
{
  "terminal.integrated.profiles.windows": {
    "PowerShell -NoProfile": {
      "source": "PowerShell",
      "args": ["-NoProfile"]
    }
  },
  "terminal.integrated.profiles.linux": {
    "zsh (login)": {
      "path": "zsh",
      "args": ["-l"]
    }
  }
}
```

配置文件中支持的其他参数包括：

* `overrideName`: 一个布尔值，指示是否用静态配置文件名称替换用于检测正在运行程序的动态终端标题。
* `env`: 一个映射，定义环境变量及其值，将变量设置为 `null` 可将其从环境中删除。可以使用 `terminal.integrated.env.<platform>` 设置为所有配置文件配置此项。
* `icon`: 用于配置文件的图标 ID。
* `color`: 用于设置图标样式的主题颜色 ID。

> [!TIP]
> 路径、参数和环境变量均支持[变量解析](https://code.visualstudio.com/docs/reference/variables-reference)

**默认配置文件**可以通过 `terminal.integrated.defaultProfile.*` 设置手动定义。应将其设置为现有配置文件的名称：

```json
{
  "terminal.integrated.profiles.windows": {
    "my-pwsh": {
      "source": "PowerShell",
      "args": ["-NoProfile"]
    }
  },
  "terminal.integrated.defaultProfile.windows": "my-pwsh"
}
```

> [!TIP]
> 集成终端 shell 以 VS Code 的权限运行。如果需要以提升的（管理员）或不同权限运行 shell 命令，请在终端中使用 `runas.exe` 等平台实用工具。

## 删除内置配置文件

要删除内置配置文件并防止其显示在新建终端下拉菜单中，请将配置文件的名称设置为 `null`。例如，要在 Windows 上删除 `Git Bash` 配置文件，请使用以下设置：

```json
{
  "terminal.integrated.profiles.windows": {
    "Git Bash": null
  }
}
```

## 配置任务/调试配置文件

默认情况下，任务/调试功能将使用默认配置文件。如果您的默认配置有较重的 PowerShell 启动脚本或者是非 POSIX 兼容的 shell，这可能不太理想。要配置仅用于调试/任务功能的配置文件，请使用 `terminal.integrated.automationProfile.<platform>` 设置：

```jsonc
{
  "terminal.integrated.defaultProfile.osx": "fish",
  // 使用完全兼容 POSIX 的 shell，并避免为任务和调试运行复杂的 ~/.config/fish/config.fish
  "terminal.integrated.automationProfile.osx": {
    "path": "/bin/sh"
  }
}
```

## 配置文件特定的键盘快捷键

可以通过 `workbench.action.terminal.newWithProfile` 命令使用[专用键盘快捷键](/docs/configure/keybindings.md#advanced-customization)启动具有特定配置文件的终端。此命令接收配置文件名称和可选的位置参数。例如，将 `kbstyle(Ctrl+Shift+T)` 绑定到使用 `zsh` 配置文件打开终端：

```json
{
  "key": "ctrl+shift+t",
  "command": "workbench.action.terminal.newWithProfile",
  "args": {
    "profileName": "zsh",
    "location": "editor"
  }
}
```

## 不安全配置文件检测

某些 shell 默认安装在不安全的路径中，例如在 Windows 环境中其他用户可以写入的路径。VS Code 仍会检测这些 shell，但在通过**终端: 选择默认配置文件**命令显式配置之前，不会将其作为正式配置文件公开。在配置不安全配置文件时，添加之前会显示警告：

![Shells with unsafe paths like c:\msys64 will show a warning before you can use the detected profile](images/profiles/unsafe-profile-warning.png)

## Cmder

Cmder 本身是一个终端，但您可以在 VS Code 中使用 [Cmder](https://cmder.app) shell，配置如下：

```json
{
  "terminal.integrated.profiles.windows": {
    "cmder": {
      "path": "C:\\WINDOWS\\System32\\cmd.exe",
      "args": ["/K", "C:\\cmder\\vendor\\bin\\vscode_init.cmd"]
    }
  },
  "terminal.integrated.defaultProfile.windows": "cmder"
}
```

当设置了 `CMDER_ROOT` 环境变量时，此配置文件应会被自动检测到。如果安装在 `C:\cmder`，它也会被检测为[不安全配置文件](#不安全配置文件检测)。有关更多信息，请参阅 [Cmder 的 wiki](https://github.com/cmderdev/cmder/wiki/Seamless-VS-Code-Integration)。

## Cygwin

Cygwin 本身是一个终端，但您可以在 VS Code 中使用 [Cygwin](https://www.cygwin.com/) shell，配置如下：

```json
{
  "terminal.integrated.profiles.windows": {
    "Cygwin": {
      "path": "C:\\cygwin64\\bin\\bash.exe",
      "args": ["--login"]
    }
  },
  "terminal.integrated.defaultProfile.windows": "Cygwin"
}
```

当安装在默认路径 `C:\cygwin` 或 `C:\cygwin64` 时，此配置文件应会被自动检测为[不安全配置文件](#不安全配置文件检测)。

## Git Bash

当 VS Code 使用 bash.exe（shell）而不是 git-bash.exe（终端）时，[Git Bash 的一个限制](https://github.com/microsoft/vscode/issues/85831#issuecomment-943403803)是 shell 会话之间的历史记录不会保留。您可以通过在 `~/.bashrc` 或 `~/.bash_profile` 文件中添加以下内容来解决此问题：

```bash
export PROMPT_COMMAND='history -a'
```

这将导致 shell 在每次打印提示符时调用 `history -a`，从而将当前会话的命令刷新到历史文件中。

## MSYS2

MSYS2 的 bash shell 可以通过以下配置文件进行配置：

```json
{
  "terminal.integrated.profiles.windows": {
    "bash (MSYS2)": {
      "path": "C:\\msys64\\usr\\bin\\bash.exe",
      "args": [
        "--login",
        "-i"
      ],
      "env": { "CHERE_INVOKING": "1" }
    }
  }
}
```

[`CHERE_INVOKING` 环境变量](https://www.msys2.org/wiki/Launchers/#the-idea)用于告诉登录初始化脚本保留当前工作目录，而不是在 `$HOME` 打开。

当安装在默认路径 `C:\\msys64` 时，此配置文件应会被自动检测为[不安全配置文件](#不安全配置文件检测)。

## Windows PowerShell

安装 PowerShell 6+ 后，Windows PowerShell 默认不会包含在配置文件列表中。要将 Windows PowerShell 添加为配置文件，请在新建终端下拉菜单中选择**选择默认配置文件**选项，然后选择 Windows PowerShell 项。这将配置该配置文件并将其设置为您的默认值。

## WSL

在本地计算机上运行 VS Code 时，Windows Subsystem for Linux shell 应会被自动检测到。根据您的设置，如果您安装了许多发行版，这可能会造成不便。要更精细地控制 WSL 配置文件，可以通过 `setting(terminal.integrated.useWslProfiles)` 设置禁用自动检测，以下是如何手动配置 WSL shell 的示例：

```jsonc
{
  "terminal.integrated.profiles.windows": {
    "Debian (WSL)": {
      "path": "C:\\WINDOWS\\System32\\wsl.exe",
      "args": [
        "-d",
        "Debian"
      ]
    }
  }
}
```

## 常见问题

### 为什么终端的 `$PATH` 环境变量中存在重复路径和/或在 macOS 上路径顺序被反转？

这种情况可能发生在 macOS 上，因为终端使用 VS Code 的环境启动。当 VS Code 首次启动时，为了获取您的"开发环境"，它会将您配置的 shell 作为**登录 shell** 启动，这会运行您的 `~/.profile`/`~/.bash_profile`/`~/.zprofile` 脚本。现在当终端启动时，它也会作为登录 shell 运行，这将把标准路径放到前面（例如 `/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`）并重新初始化您的 shell 环境。

为了更好地理解这一点，您可以在操作系统的内置终端中通过启动内部登录 shell 来模拟所发生的情况：

```sh
# 将 /test 添加到 $PATH 的开头
export PATH=/test:$PATH
# 输出 $PATH，/test 应该在最前面
echo $PATH
# 以登录 shell 运行 bash
bash -l
# 输出 $PATH，值应该是混乱的
echo $PATH
```

不幸的是，与 Linux 不同，独立的 macOS 终端默认都以登录 shell 运行，因为 macOS 在用户登录系统时不运行登录 shell。这助长了"不良行为"，例如在配置文件脚本中初始化别名，而它们应该放在 `rc` 脚本中，因为该脚本在非登录 shell 上运行。

对此有两种直接的解决方法。第一种是设置 `"terminal.integrated.inheritEnv": false`，这将从终端的环境中剥离大多数环境变量，但保留一些重要的变量（如 `HOME`、`SHELL`、`TMPDIR` 等）。

另一种解决方法是通过创建终端配置文件并将其 `args` 设置为 `[]` 来不再在终端中运行登录 shell。如果采用此方法，您需要确保将配置文件脚本中的任何别名移到 `~/.bashrc`/`~/.zshrc` 文件中，因为别名仅适用于设置它们的 shell。
