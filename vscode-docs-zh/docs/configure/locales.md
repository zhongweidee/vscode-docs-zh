---
ContentId: 413A7FA3-94F8-4FCB-A4A3-F4C1E77EF716
DateApproved: 02/04/2026
MetaDescription: 如何更改 Visual Studio Code 的显示语言（区域设置）。
---
# 显示语言

Visual Studio Code 默认以英语作为显示语言，其他[语言](#available-locales)依赖于从[市场](https://marketplace.visualstudio.com/search?target=VSCode&category=Language%20Packs&sortBy=Installs)获取的语言包[扩展](/docs/configure/extensions/extension-marketplace.md)。

VS Code 会检测操作系统的 UI 语言，并提示您安装相应的语言包（如果市场上有提供）。下面是一个推荐简体中文语言包的示例：

![Language Pack recommendation](images/locales/lang-pack-recommendation.png)

安装语言包扩展并按照提示重启后，VS Code 将使用与操作系统 UI 语言匹配的语言包。

>**注意**：本文介绍如何通过语言包（如法语或中文）更改 VS Code 界面中的显示语言。如果您想添加编程语言支持，例如 C++ 或 Java，请参阅文档中的[编程语言](/docs/languages/overview.md)部分。

## 更改显示语言

您也可以通过使用**配置显示语言**命令显式设置 VS Code 显示语言来覆盖默认的 UI 语言。

按下 `kb(workbench.action.showCommands)` 调出**命令面板**，然后开始输入 "display" 以筛选并显示**配置显示语言**命令。

![configure display language command](images/locales/configure-language-command.png)

按下 `kbstyle(Enter)`，将显示按[区域设置](#available-locales)列出的可用语言列表，其中当前活动（正在使用的）语言会高亮显示。

![installed languages list](images/locales/installed-languages-list.png)

选择另一种语言以更改显示语言。如果语言包尚未安装，VS Code 将安装它。选择不同的显示语言后，系统会提示您重启。

**配置显示语言**命令会写入用户 VS Code 文件夹（`.vscode`）中的运行时配置参数文件 `argv.json`。

也可以通过直接编辑 `argv.json` 文件（**首选项：配置运行时参数**）并重启 VS Code 来更改显示语言。

## 可用区域设置

显示语言 | 区域设置
-----------------|-------
英语（美国） | `en`
简体中文 | `zh-cn`
繁体中文 | `zh-tw`
法语 | `fr`
德语 | `de`
意大利语 | `it`
西班牙语 | `es`
日语 | `ja`
韩语 | `ko`
俄语 | `ru`
葡萄牙语（巴西） | `pt-br`
土耳其语 | `tr`
波兰语 | `pl`
捷克语 | `cs`
匈牙利语 | `hu`

## 市场语言包

如上所述，VS Code 默认以英语作为显示语言，但其他语言可通过[市场语言包](https://marketplace.visualstudio.com/search?target=VSCode&category=Language%20Packs&sortBy=Installs)获取。

您也可以在扩展视图（`kb(workbench.view.extensions)`）中搜索语言包，输入您要查找的语言以及 `category:"Language Packs"`。

![German Language Pack](images/locales/German-language-pack.png)

您可以安装多个语言包，并使用**配置显示语言**命令选择当前的显示语言。

## 设置语言

如果您想为某个 VS Code 会话使用特定语言，可以在启动 VS Code 时使用命令行开关 `--locale` 指定区域设置。

以下是一个使用 `--locale` 命令行开关将 VS Code 显示语言设置为法语的示例：

```bash
code . --locale=fr
```

**注意**：您必须为通过命令行开关指定的语言安装相应的语言包。如果匹配的语言包未安装，VS Code 将显示英文。

## 常见问题

### 无法写入文件，因为文件已更改

此通知可能意味着您的 `argv.json` 文件在上次更改后未保存。检查文件中是否有任何错误（**首选项：配置运行时参数**），确保文件已保存，然后尝试重新安装语言包。

### 我可以为语言包的翻译做出贡献吗？

可以，[Visual Studio Code 社区本地化项目](https://aka.ms/vscodeloc)对所有人开放，贡献者可以提供新的翻译、对现有翻译进行投票或提出流程改进建议。

### 如何启用像 Python 这样的编程语言？

请参阅[编程语言](/docs/languages/overview.md)部分，了解如何安装对 PHP、Python 和 Java 等编程语言的支持。
