---
Order:
TOCTitle: 终端启动故障排除
ContentId: c9dd7da5-2ad9-4862-bf24-2ed0fb65675e
PageTitle: Visual Studio Code 集成终端启动失败故障排除
DateApproved: 02/04/2026
MetaDescription: Visual Studio Code 集成终端启动失败故障排除
---

# 终端启动失败故障排除

首先，很抱歉您正在阅读本文档，而不是愉快地使用 Visual Studio Code 的集成终端。VS Code 团队努力让终端体验尽可能无缝，但在某些情况下，shell 或终端配置存在问题，导致 VS Code 编辑器无法绕过。

在与数百名开发者合作诊断他们的终端启动失败问题之后，VS Code 团队整理了这篇文章，其中包含过去帮助过人们的建议和故障排除技巧。我们希望您能在此找到 shell 或终端问题的答案，并可以快速恢复工作。

## 集成终端用户指南

如果您是初次使用 VS Code 集成终端，可以在[集成终端](/docs/terminal/basics.md)用户指南中了解更多信息。您可以在其中阅读如何[配置](/docs/terminal/profiles.md)终端，以及查看[常见问题](/docs/terminal/basics.md#common-questions)的解答。

如果您参考用户指南后仍无法诊断启动失败问题，以下是具体的故障排除步骤。这些故障排除步骤（例如检查设置和启用日志记录）适用于所有支持 VS Code 的平台：macOS、Linux 和 Windows。

> **注意**：如果您使用的是 Windows，建议先查看 [Windows 常见问题](#windows-上常见问题)部分。

## 故障排除步骤

若要排查 Visual Studio Code 中集成终端启动失败的问题，请按照以下步骤诊断问题：

1. **检查用户设置。** 查看以下可能影响启动的 `terminal.integrated` [设置](/docs/configure/settings.md)：

   * `terminal.integrated.defaultProfile.{platform}` - 终端使用的默认 shell 配置文件。
   * `terminal.integrated.profiles.{platform}` - 已定义的 shell 配置文件。设置 shell 路径和参数。
   * `terminal.integrated.cwd` - shell 进程的当前工作目录 (cwd)。
   * `terminal.integrated.env.{platform}` - 添加到 shell 进程的环境变量。
   * `terminal.integrated.inheritEnv` - 新 shell 是否应从 VS Code 继承其环境。
   * `terminal.integrated.automationProfile.{platform}` - 用于自动化相关终端使用（如任务和调试）的 shell 配置文件。
   * `terminal.integrated.splitCwd` - 控制拆分终端启动时的当前工作目录。
   * `terminal.integrated.windowsEnableConpty` - 是否使用 ConPTY 进行 Windows 终端进程通信。

   您可以在设置编辑器（**文件** > **首选项** > **设置**）中查看设置，并通过设置 ID 搜索特定设置。

   ![搜索集成终端设置](images/troubleshoot-terminal-launch/search-for-settings.png)

   快速检查是否更改了您可能未注意到的设置的方法是使用设置编辑器中的 `@modified` 过滤器。

   ![过滤已修改的设置](images/troubleshoot-terminal-launch/search-for-modified-settings.png)

   大多数集成终端设置需要直接在您的用户 `settings.json` JSON 文件中修改。您可以通过设置编辑器中的 **在 settings.json 中编辑** 链接，或通过命令面板 (`kb(workbench.action.showCommands)`) 中的 **首选项：打开用户设置 (JSON)** 命令来打开 `settings.json`。

   ![用户的 settings.json 文件](images/troubleshoot-terminal-launch/settings-json-file.png)

2. **直接测试您的 shell。** 尝试在 VS Code 之外通过外部终端或命令提示符运行您指定的集成终端 shell。某些终端启动失败可能是由于您的 shell 安装问题，并非 VS Code 所特有。显示的退出代码来自 shell，您可以通过在互联网上搜索特定 shell 和退出代码来诊断 shell 问题。

3. **使用最新版本的 VS Code。** 每个 VS Code 每周发布版本都有许多更新和修复，可能包含集成终端的改进。您可以通过 **帮助** > **关于**（在 macOS 上为 **Code** > **关于 Visual Studio Code**）检查您的 VS Code 版本。要查找最新版本的 VS Code，请访问 VS Code [发布说明](/updates)。您可能还想确认已安装最新版本的 shell。

4. **使用最新版本的 shell。** 如果您的 shell 是与平台分开安装的，请尝试安装最新可用版本的 shell。如果您使用的是旧版操作系统，同样的建议也适用。例如，某些旧版本的 Windows 10 与 VS Code 终端配合使用时效果不佳。

5. **启用跟踪日志记录。** 您可以启用[跟踪日志记录](https://github.com/microsoft/vscode/wiki/Terminal-Issues#enabling-trace-logging)并在启动终端时捕获日志。日志记录通常会揭示问题所在，因为用于创建终端进程/pty 的所有参数都会被记录。错误的 shell 名称、参数或环境变量都可能导致终端无法启动。如果问题未解决，请保留此日志以备后用。

## 其他故障排除步骤

如果以上步骤都未能帮助解决问题，您还可以尝试：

* 在 [Stack Overflow](https://stackoverflow.com/) 上提问，启动问题通常与环境设置有关，而不是 VS Code 的问题。
* 如果终端是由扩展启动的，请通过打开问题报告器（帮助 > 报告问题）并将"文件位于"设置为"扩展"来向该扩展报告问题。
* 如果您认为这是 VS Code 的bug，请使用问题报告器（**帮助** > **报告问题**）报告问题。问题报告器会自动填充相关信息，有关报告中还应包含哪些内容，请参阅[创建高质量的终端问题报告](https://github.com/microsoft/vscode/wiki/Terminal-Issues#creating-great-terminal-issues)。
* 如果您使用的是 Windows 10 1809（内部版本 17763）或更低版本，该问题可能与旧版"winpty"后端有关。升级到 Windows 1903（内部版本 18362）将使您切换到由 Microsoft 构建的新"conpty"后端，这可能会解决您的问题。
* 如果您的终端设置为仅以管理员身份运行，而您未以管理员身份启动 VS Code，则终端无法打开。您可以更改默认终端或编辑终端可执行文件的属性，使其不以管理员身份运行。

## 退出代码

终端启动失败通知中显示的退出代码是 shell 进程返回的，并非由 VS Code 生成。终端中可以使用许多不同的 shell，并且有数百种可能的退出代码。

* 尝试在互联网上搜索您的特定 shell 和退出代码（例如，"PowerShell 4294901760"），您可能会找到与终端启动失败相关的具体建议或已知问题。
* 尝试在您的 shell 的问题仓库中搜索。例如，如果您在使用 WSL 时遇到问题，可以在 [https://github.com/microsoft/WSL/issues](https://github.com/microsoft/WSL/issues) 上搜索您的错误代码，可能会在已打开或已解决的问题中找到解决方法。

## Windows 上常见问题

### 确保兼容模式已禁用

当您升级到 Windows 10 时，某些应用程序可能会自动启用兼容模式。如果为 VS Code 启用了兼容模式，终端将无法正常工作，因为它会执行一些低级别操作来实现其使用的模拟。您可以通过右键单击 VS Code 可执行文件，选择 **属性**，然后在 **兼容性** 选项卡中取消选中 **以兼容模式运行这个程序** 选项来检查并禁用兼容模式。

### 在 Windows 10 上终端退出并返回代码 1（以 WSL 为默认 shell）

如果 Windows Subsystem for Linux (WSL) 未设置有效的默认 Linux 发行版，可能会出现此错误。

**注意：** 'docker-desktop-data' 不是一个有效的发行版。

* 打开 PowerShell 并输入 `wslconfig.exe /l` 以确认 WSL 已正确安装，并列出系统中当前可用的 Linux 发行版。确认一个有效的发行版旁边有 **（默认）** 标记。
* 要更改默认发行版，请输入 `wslconfig.exe /setdefault "列表中显示的发行版名称"`

### 发生本机异常

此错误通常是由于防病毒软件拦截并阻止了 winpty/conpty 组件创建终端进程而导致的。要解决此错误，您可以将以下文件排除在防病毒扫描之外：

```
{install_path}\resources\app\node_modules.asar.unpacked\node-pty\build\Release\winpty.dll
{install_path}\resources\app\node_modules.asar.unpacked\node-pty\build\Release\winpty-agent.exe
{install_path}\resources\app\node_modules.asar.unpacked\node-pty\build\Release\conpty.node
{install_path}\resources\app\node_modules.asar.unpacked\node-pty\build\Release\conpty_console_list.node
```

向防病毒团队报告此问题也有助于彻底解决该问题。

### 终端退出并返回代码 259

退出代码 **259** 可能意味着当终端尝试启动新进程（如 PowerShell.exe）时的 `STILL_ACTIVE` 状态。您可以尝试终止计算机上未使用的程序和进程，以避免其中某个程序使终端 shell 进程保持活动状态而无法重新启动。

计算机上运行的防病毒软件也可能干扰启动终端 shell。

### 终端退出并返回代码 3221225786（或类似代码）

当 conhost 的属性中启用了旧版控制台模式时，可能会出现此情况。要更改此设置，请从开始菜单打开 cmd.exe，右键单击标题栏，转到 **属性**，然后在 **选项** 选项卡中取消选中 **使用旧版控制台**。

![使用旧版控制台模式复选框](images/troubleshoot-terminal-launch/legacy-console-mode.png)

## 后续步骤

* [集成终端用户指南](/docs/terminal/basics.md) - 了解有关终端常规使用和配置的更多信息。
