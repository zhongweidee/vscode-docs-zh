---
ContentId: a6a1652b-c0d8-4054-a2da-feb915eef2cc
DateApproved: 6/10/2026
MetaDescription: Visual Studio Code 的内置终端可以与某些 shell 集成，以增强终端的功能。
---
# 终端 Shell 集成

Visual Studio Code 能够与常见的 shell 集成，使终端能够更深入地了解 shell 内部实际发生的情况。这些额外信息启用了一些有用的功能，例如[工作目录检测](#当前工作目录检测)和命令检测、[装饰器](#命令装饰器与概览标尺)以及[导航](#命令导航)。

支持的 shell：

- Linux/macOS：bash、fish、pwsh、zsh
- Windows：Git Bash、pwsh

## 安装

### 自动脚本注入

默认情况下，shell 集成脚本应在从 VS Code 启动的受支持 shell 上自动激活。这是通过在 shell 会话启动时注入参数和/或环境变量来实现的。可以通过将 `setting(terminal.integrated.shellIntegration.enabled)` 设置为 `false` 来禁用此自动注入。

这种标准、简单的方式不适用于某些高级使用场景，例如在子 shell 中、通过常规 `ssh` 会话（未使用 [Remote - SSH 扩展](/docs/remote/ssh.md) 时）或某些复杂的 shell 设置。对于这些情况，推荐的启用 shell 集成的方法是[手动安装](#手动安装)。

>**注意**：自动注入可能不适用于旧版本的 shell，例如较旧版本的 fish 不支持通过 `$XDG_DATA_DIRS` 环境变量进行注入。你仍然可以通过手动安装来实现集成。

>**Windows 注意**：VS Code shell 集成需要[运行 PowerShell 脚本的权限](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_execution_policies)。如果你对计算机上的用户账户拥有独占使用权，可以考虑运行：
>
> ```powershell
> if ((Get-ExecutionPolicy -Scope LocalMachine) -eq 'Undefined' -and (Get-ExecutionPolicy -Scope CurrentUser) -eq 'Undefined') {
>     Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> }
> ```

### 手动安装

要手动安装 shell 集成，需要在 shell 初始化时运行 VS Code 的 shell 集成脚本。具体方式和位置取决于你使用的 shell 和操作系统。使用手动安装时，建议将 `setting(terminal.integrated.shellIntegration.enabled)` 设置为 `false`，但不是强制性的。

> **提示：** 使用 [Insiders 版本](https://code.visualstudio.com/insiders)时，请将下面命令中的 `code` 替换为 `code-insiders`。

**bash**

将以下内容添加到你的 `~/.bashrc` 文件中。在 bash 中运行 `code ~/.bashrc` 以在 VS Code 中打开该文件。

```sh
[[ "$TERM_PROGRAM" == "vscode" ]] && . "$(code --locate-shell-integration-path bash)"
```

**fish**

将以下内容添加到你的 `config.fish` 文件中。在 fish 中运行 `code $__fish_config_dir/config.fish` 以在 VS Code 中打开该文件。

```sh
string match -q "$TERM_PROGRAM" "vscode"
and . (code --locate-shell-integration-path fish)
```

**pwsh**

将以下内容添加到你的 [PowerShell 配置文件](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.2)中。在 pwsh 中运行 `code $Profile` 以在 VS Code 中打开该文件。

```powershell
if ($env:TERM_PROGRAM -eq "vscode") { . "$(code --locate-shell-integration-path pwsh)" }
```

**zsh**

将以下内容添加到你的 `~/.zshrc` 文件中。在 zsh 中运行 `code ~/.zshrc` 以在 VS Code 中打开该文件。

```sh
[[ "$TERM_PROGRAM" == "vscode" ]] && . "$(code --locate-shell-integration-path zsh)"
```

**Git Bash**

将以下内容添加到你的 `~/.bashrc` 文件中。在 Git Bash 中运行 `code ~/.bashrc` 以在 VS Code 中打开该文件。

```sh
[[ "$TERM_PROGRAM" == "vscode" ]] && . "$(code --locate-shell-integration-path bash)"
```

#### 可移植性与性能

上述 shell 集成安装方式是跨平台的，只要 `code` 位于 `$PATH` 中就与任何安装类型兼容。但是，这种推荐的方法会启动 Node.js 来获取脚本路径，导致 shell 启动时有一个短暂的延迟。为了减少这种延迟，可以提前解析路径并将其直接内联添加到你的初始化脚本中。

```sh
# 首先输出可执行文件的路径：
code --locate-shell-integration-path bash

# 将上述结果添加到 source 语句中：
[[ "$TERM_PROGRAM" == "vscode" ]] && . "/path/to/shell/integration/script.sh"
```

## Shell 集成质量

使用 shell 集成时，会有一个与之关联的"质量"等级，用以描述其功能。这些质量等级由 shell 集成脚本的行为决定。

- **无**：没有激活的 shell 集成。
- **丰富**：shell 集成已激活，命令检测以理想方式工作。
- **基础**：shell 集成已激活，但命令检测可能不支持所有功能。例如，可以检测到命令运行位置，但无法检测其退出状态。

要查看 shell 集成质量，请将鼠标悬停在终端选项卡上。或者，在悬停时选择 **显示详细信息** 以查看更多详细信息。

## IntelliSense

终端中的 IntelliSense 使你能够获得文件、文件夹、命令、命令参数和选项的建议。可以通过 `setting(terminal.integrated.suggest.enabled)` 设置来启用或禁用此功能。

![终端截图，显示用户输入了 git checkout 并收到了分支名称的建议。](images/shell-integration/terminal-suggest.png)

在你输入时，会出现一个建议列表。要手动触发建议，请使用 `kb(workbench.action.terminal.triggerSuggest)` 键盘快捷键。

> [!TIP]
> `kbstyle(Ctrl+Space)` 可能是在操作系统级别触发输入法编辑器（IME）的快捷键。如果是这样，你可以通过自定义[键盘快捷键](/docs/configure/keybindings.md#keyboard-shortcuts-editor)来重新绑定 `workbench.action.terminal.triggerSuggest` 命令，或者更改操作系统级别的快捷键。

默认情况下，`kbstyle(Tab)` 插入建议。在列表中导航时，`kbstyle(Enter)` 插入建议。你可以通过 `setting(terminal.integrated.suggest.selectionMode)` 设置来配置此行为。

有多种设置可用于配置终端 IntelliSense 的行为：

- `setting(terminal.integrated.suggest.quickSuggestions)`：根据命令行的内容自动显示建议，而不是通过 `kbstyle(Ctrl+Space)` 手动触发。
- `setting(terminal.integrated.suggest.suggestOnTriggerCharacters)`：在遇到"触发字符"（如 `-` 或 `/`）后自动显示建议。
- `setting(terminal.integrated.suggest.runOnEnter)`：可选择在使用 `kbstyle(Enter)`（而非 `kbstyle(Tab)`）时运行命令。
- `setting(terminal.integrated.suggest.windowsExecutableExtensions)`：在 Windows 上被视为可执行文件的扩展名列表。
- `setting(terminal.integrated.suggest.providers)`：提供禁用特定提供程序的功能，例如扩展可能贡献了你不需要的补全项。
- `setting(terminal.integrated.suggest.showStatusBar)`：在 IntelliSense 弹出窗口底部显示状态栏。
- `setting(terminal.integrated.suggest.cdPath)`：启用 `$CDPATH` 集成。
- `setting(terminal.integrated.suggest.inlineSuggestion)`：与 shell "幽灵文本"集成以及如何呈现它。
- `setting(terminal.integrated.suggest.upArrowNavigatesHistory)`：将上箭头键发送给 shell 而不是浏览补全项，这在 zsh 中特别有用，可以先过滤再按上箭头键进行带前缀的历史记录搜索。
- `setting(terminal.integrated.suggest.selectionMode)`：IntelliSense 弹出窗口的聚焦方式，决定 `kbstyle(Enter)` 和 `kbstyle(Tab)` 的行为。
- `setting(terminal.integrated.suggest.insertTrailingSpace)`：在接受后插入尾随空格并重新触发补全。

### 全局补全缓存

为了提高性能，VS Code 会积极缓存特定 shell 的全局变量。当你对 shell 启动逻辑进行更改以添加命令时，如果这些更改没有被自动检测到，请使用 **终端：清除建议缓存全局变量** 命令（`terminal.integrated.suggest.clearCachedGlobals`）手动刷新缓存。

## 命令装饰器与概览标尺

shell 集成启用的功能之一是能够获取在终端中运行的命令的退出代码。利用这些信息，会在行左侧添加装饰器来指示命令是成功还是失败。这些装饰器也会显示在滚动条中相对较新的概览标尺中，就像在编辑器中一样。

![成功的命令旁边出现蓝色圆圈，失败的命令旁边出现带有叉号的红色圆圈。圆圈的颜色也会显示在滚动条中](images/shell-integration/decorations.png)

可以与该装饰器交互以提供一些上下文操作，例如重新运行命令：

![点击成功的命令装饰器会显示一个上下文菜单，包含以下项目：复制输出、复制输出为 HTML、重新运行命令以及这是如何工作的？](images/shell-integration/decoration-menu.png)

命令和概览标尺装饰器可以通过 `setting(terminal.integrated.shellIntegration.decorationsEnabled)` 设置进行配置。

## 命令导航

shell 集成检测到的命令会输入到命令导航功能（`kbStyle(Ctrl/Cmd+Up)`、`kbStyle(Ctrl/Cmd+Down)`）中，为其提供更可靠的命令位置。此功能允许在命令之间快速导航并选择其输出。要选择从当前位置到命令的内容，你还可以按住 `kbStyle(Shift)`，按下 `kbStyle(Shift+Ctrl/Cmd+Up)` 和 `kbStyle(Shift+Ctrl/Cmd+Down)`。

## 命令指示条

命令指示条是一个在悬停时显示在命令及其输出旁边的竖条。这有助于更快地识别命令，也是验证 shell 集成是否正常工作的方式。

![终端截图，突出显示了左侧的命令指示条竖线，用于指示命令的边界。](images/shell-integration/terminal-command-guide.png)

你可以使用颜色主题来自定义命令指示条的颜色。要切换命令指示条，请配置 `setting(terminal.integrated.shellIntegration.showCommandGuide)` 设置。

## 粘性滚动

粘性滚动功能会将终端顶部部分显示的命令"固定"住，使你更容易看到输出所属的命令。点击粘性滚动组件将滚动到该命令在终端缓冲区中的位置。

![粘性滚动将在终端视口顶部显示命令](images/shell-integration/sticky-scroll.png)

可以通过 `setting(terminal.integrated.stickyScroll.enabled)` 设置来启用此功能。

## 快速修复

VS Code 会扫描命令的输出，并呈现一个带有操作的快速修复建议，这些操作极有可能是用户接下来想做的事情。

![运行 'git push --set-upstream' 将显示一个灯泡图标，打开一个下拉菜单，其中包含在 github.com 上新建 PR 的选项](images/shell-integration/quick-fix.png)

以下是一些内置的快速修复：

- 当检测到某个端口已被监听时，建议终止该进程并重新运行上一个命令。
- 当 `git push` 由于未设置上游而失败时，建议使用设置上游的方式推送。
- 当 `git` 子命令因相似命令错误而失败时，建议使用相似的命令。
- 当 `git push` 导致建议创建 GitHub PR 时，建议打开链接。
- 当 `General` 或 `cmd-not-found` PowerShell 反馈提供程序触发时，建议每条建议。

快速修复功能还支持[辅助功能信号](/docs/configure/accessibility/accessibility.md#accessibility-signals)，以便在快速修复可用时提供额外的反馈。

## 运行最近的命令

**终端：运行最近的命令** 命令会在快速选择中显示来自各种来源的历史记录，提供类似于 shell 反向搜索（`kbstyle(Ctrl+R)`）的功能。来源包括当前会话的历史记录、此 shell 类型的之前会话历史记录以及常见的 shell 历史记录文件。

!["运行最近的命令"命令显示一个快速选择列表，其中包含之前运行过的命令，可以像"转到文件"命令一样进行过滤](images/shell-integration/recent-command.png)

该命令的其他一些功能：

- 默认情况下，搜索模式是"连续搜索"，即搜索词必须完全匹配。搜索输入右侧的按钮可以切换到模糊搜索。
- 在当前会话部分，快速选择右侧有一个剪贴板图标，点击后将在编辑器中打开命令输出。
- 快速选择右侧的固定操作可以将命令固定到列表顶部。
- 按住 `kbstyle(Alt)` 可以将文本写入终端而不运行它。
- 之前会话部分中存储的历史记录数量由 `setting(terminal.integrated.shellIntegration.history)` 设置决定。

此命令的默认键盘快捷键是 `kbstyle(Ctrl+Alt+R)`。但是，当辅助功能模式开启时，这些快捷键会互换；`kbstyle(Ctrl+R)` 运行最近的命令，`kbstyle(Ctrl+Alt+R)` 将 Ctrl+R 发送到 shell。

可以使用以下键盘快捷键在辅助功能模式关闭时交换这些键盘快捷键：

```jsonc
{
    "key": "ctrl+r",
    "command": "workbench.action.terminal.runRecentCommand",
    "when": "terminalFocus"
},
{
  "key": "ctrl+alt+r",
  "command": "workbench.action.terminal.sendSequence",
  "args": { "text": ""/*^R*/ },
  "when": "terminalFocus"
}
```

## 转到最近的目录

类似于运行最近的命令功能，**终端：转到最近的目录** 命令会跟踪访问过的目录，并允许快速过滤和导航（`cd`）到它们。按住 `kbstyle(Alt)` 可以将文本写入终端而不运行它。

此命令的默认键盘快捷键是 `kb(workbench.action.terminal.goToRecentDirectory)`，其行为类似于编辑器中的 **转到行/列** 命令。可以使用 `kbstyle(Ctrl+Alt+G)` 将 Ctrl+G 发送到 shell。

## 当前工作目录检测

shell 集成会告诉 VS Code shell 的当前工作目录是什么。在 Windows 上，如果不通过正则表达式尝试检测提示符，根本无法获得此信息；在 macOS 和 Linux 上则需要轮询，这对性能不利。

此功能启用的一大特性是增强了解析终端中的链接的能力。以链接 `package.json` 为例，当 shell 集成被禁用时激活该链接，如果工作区中有多个 `package.json` 文件，则会打开一个以 `package.json` 为过滤条件的搜索快速选择。然而，当 shell 集成启用时，它会直接打开当前文件夹中的 `package.json` 文件，因为当前位置是已知的。这使得例如 `ls` 的输出能够可靠地打开正确的文件。

当前工作目录还用于在终端选项卡中显示目录、在运行最近命令的快速选择中显示目录，以及用于 `"terminal.integrated.splitCwd": "inherited"` 功能。

## 扩展的 PowerShell 键盘快捷键

Windows 的控制台 API 允许比 Linux/macOS 终端更多的键盘快捷键，由于 VS Code 的终端模拟的是后者，即使在 Windows 上，由于缺乏 VT 编码，一些 PowerShell 键盘快捷键也无法通过标准方式实现，例如 `kbstyle(Ctrl+Space)`。shell 集成使 VS Code 能够附加自定义键盘快捷键，向 PowerShell 发送特殊序列，然后在 shell 集成脚本中处理并转发到正确的按键处理程序。

当 shell 集成启用时，以下键盘快捷键应在 PowerShell 中正常工作：

- `kbstyle(Ctrl+Space)`：默认仅限 Windows 上的 `MenuComplete`
- `kbstyle(Alt+Space)`：默认在所有平台上为 `SetMark`
- `kbstyle(Shift+Enter)`：默认在所有平台上为 `AddLine`
- `kbstyle(Shift+End)`：默认在所有平台上为 `SelectLine`
- `kbstyle(Shift+Home)`：默认在所有平台上为 `SelectBackwardsLine`

## 增强的辅助功能

shell 集成提供给 VS Code 的信息用于改进[终端的辅助功能](/docs/configure/accessibility/accessibility.md#terminal-accessibility)。一些增强功能示例包括：

- 在无障碍缓冲区中通过检测到的命令进行导航（`kb(workbench.action.terminal.focusAccessibleBuffer)`）
- 当命令失败时播放[音频提示](/docs/configure/accessibility/accessibility.md#accessibility-signals)
- 底层文本框同步，使箭头键和退格键的行为更加正确

## 支持的转义序列

VS Code 支持几种自定义转义序列：

### VS Code 自定义序列 'OSC 633 ; ... ST'

VS Code 有一套自定义转义序列，旨在在 VS Code 的终端中运行时启用 shell 集成功能。这些序列由内置脚本使用，但也可以由任何能够向终端发送序列的应用程序使用，例如 [Julia 扩展](https://marketplace.visualstudio.com/items?itemName=julialang.language-julia) 使用这些序列来支持 Julia REPL 中的 shell 集成。

这些序列应该会被其他终端忽略，但除非其他终端最终更广泛地采用这些序列，建议在写入它们之前检查 `$TERM_PROGRAM` 是否为 `vscode`。

- `OSC 633 ; A ST`：标记提示符开始。
- `OSC 633 ; B ST`：标记提示符结束。
- `OSC 633 ; C ST`：标记预执行。
- `OSC 633 ; D [; <exitcode>] ST`：标记执行结束，可选地附带退出代码。
- `OSC 633 ; E ; <commandline> [; <nonce>] ST`：显式设置命令行，可选地附带一个 nonce。

  E 序列允许终端可靠地获取 shell 解释的确切命令行。当未指定此序列时，终端可能会回退到使用 A、B 和 C 序列来获取命令，或者如果不可靠则完全禁用检测。

  可选的 nonce 可用于验证序列是否来自 shell 集成脚本，以防止命令欺骗。当 nonce 验证成功时，使用命令之前的一些保护措施将被移除，以获得更好的用户体验。

  命令行可以使用 `\xAB` 格式转义 ASCII 字符，其中 AB 是字符代码的十六进制表示（不区分大小写），并使用 `\\` 转义 `\` 字符。必须转义分号（`0x3b`）以及 0x20 及以下的字符，这对于换行符和分号尤为重要。

  一些示例：

  ```text
  "\"  -> "\\"
  "\n" -> "\x0a"
  ";"  -> "\x3b"
  ```

- `OSC 633 ; P ; <Property>=<Value> ST`：在终端上设置属性，仅处理已知属性。

  已知属性：

  - `Cwd`：向终端报告当前工作目录。
  - `IsWindows`：指示终端是否使用 Windows 后端（如 winpty 或 conpty）。这可用于启用额外的启发式检测，因为 shell 集成序列的位置不一定保证正确。有效值为 `True` 和 `False`。
  - `HasRichCommandDetection`：指示终端是否具有丰富的命令检测能力。当 shell 集成脚本按照 VS Code 期望的方式理想地执行时，此属性设置为 `True`，具体来说，序列应按 `A, B, E, C, D` 的顺序出现在预期位置。


### Final Term shell 集成

VS Code 支持 Final Term 的 shell 集成序列，这允许非 VS Code 的 shell 集成脚本在 VS Code 中正常工作。这会导致体验略有下降，因为它不支持 `OSC 633` 那么多的功能。以下是受支持的具体序列：

- `OSC 133 ; A ST`：标记提示符开始。
- `OSC 133 ; B ST`：标记提示符结束。
- `OSC 133 ; C ST`：标记预执行。
- `OSC 133 ; D [; <exitcode>] ST`：标记执行结束，可选地附带退出代码。

### iTerm2 shell 集成

支持以下由 iTerm2 首创的序列：

- `OSC 1337 ; CurrentDir=<Cwd> ST`：设置终端的当前工作目录，类似于 `OSC 633 ; P ; Cwd=<Cwd> ST`。
- `OSC 1337 ; SetMark ST`：在触发行左侧添加标记，并在滚动条中添加注释：

    ![当此序列被写入终端时，命令左侧会出现一个小灰色圆圈，滚动条中也会有相应的注释](images/shell-integration/setmark.png)

    这些标记与命令导航集成，使其易于通过 `kb(workbench.action.terminal.scrollToPreviousCommand)` 和 `kb(workbench.action.terminal.scrollToNextCommand)` 导航到。

## 常见问题

### 自动注入在什么情况下不起作用？

有几种情况下自动注入不起作用，以下是一些常见情况：

- `$PROMPT_COMMAND` 的格式不受支持，将其改为指向单个函数是解决此问题的简单方法。例如：

  ```sh
  prompt() {
    printf "\033]0;%s@%s:%s\007" "${USER}" "${HOSTNAME%%.*}" "${PWD/#$HOME/\~}"
  }
  PROMPT_COMMAND=prompt
  ```

- 某些 shell 插件可能在初始化时通过取消设置 `$VSCODE_SHELL_INTEGRATION` 来显式地禁用 VS Code 的 shell 集成。

### 为什么在功能已禁用的情况下仍显示命令装饰器？

这可能是因为你的系统安装了另一个终端的 shell 集成，而 [VS Code 能够识别它](#final-term-shell-integration)。如果你不想要任何装饰器，可以使用以下设置来隐藏它们：

```json
"terminal.integrated.shellIntegration.decorationsEnabled": never
```

或者，你可以从 shell 的 rc/启动脚本中移除 shell 集成脚本，但这样你将无法使用命令感知功能，如[命令导航](#命令导航)。

### 为什么 Windows 上的命令装饰会跳动？

Windows 使用一个称为 ConPTY 的模拟伪终端（pty）后端。它与常规 pty 的工作方式略有不同，因为它需要与 Windows 控制台 API 保持兼容。其影响之一是 pty 以特殊方式处理渲染，导致用于识别终端缓冲区中命令的 shell 集成序列可能错位。当命令跳动时，通常是在命令运行之后，VS Code 的启发式检测已启动以改善命令装饰器的位置。
