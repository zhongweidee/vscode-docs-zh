---
ContentId: 435486d3-ad55-4a31-a087-d108f75ba669
DateApproved: 6/10/2026
MetaDescription: 卸载 Visual Studio Code 并进行清理。
---
# 卸载 Visual Studio Code

卸载 Visual Studio Code 的步骤取决于你的平台（Windows、macOS 或 Linux）以及你使用的安装选项。例如，在 Windows 上，你可以使用系统或用户 Windows 安装程序，也可以下载 `.zip` 文件并将其内容解压到计算机上的任意位置。

一般来说，你可以像卸载其他桌面应用程序一样卸载 VS Code，并遵循对应平台推荐的软件卸载流程。下面提供了具体平台的指导，以及如何[彻底清理](#clean-uninstall)所有剩余的 VS Code 配置文件。

## Windows

### Windows 安装程序

如果你通过 Windows 安装程序（用户版或系统版）安装了 VS Code，请使用安装程序来卸载 VS Code。

* 开始菜单
  * 搜索**添加或删除程序**，并在**应用** > **应用和功能**列表中找到 Visual Studio Code。
  * 从右侧的操作下拉菜单（三个垂直点）中选择**卸载**。
  * 按照提示卸载 VS Code。
* 控制面板
  * 在**程序**下，选择**卸载程序**链接。
  * 找到 Visual Studio Code 条目，右键单击，然后选择**卸载**命令。
  * 按照提示卸载 VS Code。

### .zip 文件安装

如果你是通过下载并解压 [Visual Studio Code 网站](https://code.visualstudio.com/#alt-downloads) 上提供的 `.zip` 文件之一在 Windows 上安装 VS Code 的，你可以通过删除解压 `.zip` 内容所在的文件夹来进行卸载。

## macOS

要在 macOS 上卸载 VS Code，请打开**访达**并进入**应用程序**文件夹。右键单击 Visual Studio Code 应用程序，然后选择**移动到废纸篓**。

## Linux

要在 Linux 上卸载 VS Code，你应该使用软件包管理器的卸载或移除选项。具体使用的命令行会因你使用的软件包管理器而异（例如 `apt-get`、`rpn`、`dnf`、`yum` 等）。

VS Code 软件包的名称如下：

* `code` - VS Code 稳定版
* `code-insiders` - VS Code [Insiders](/insiders) 版

例如，如果你通过 Debian 软件包（`.deb`）和 `apt-get` 软件包管理器安装了 VS Code，你可以运行以下命令：

```bash
sudo apt-get remove code
```

其中 `code` 是 VS Code Debian 软件包的名称。

## 彻底清理

如果你希望在卸载 VS Code 后移除所有用户数据，可以删除用户数据文件夹 `Code` 和 `.vscode`。这将使你的系统回到安装 VS Code 之前的状态。如果你不想卸载 VS Code，此操作也可用于重置所有设置。

这些文件夹的位置因平台而异：

* **Windows** - 删除 `%APPDATA%\Code` 和 `%USERPROFILE%\.vscode`。
* **macOS** - 删除 `$HOME/Library/Application Support/Code` 和 `~/.vscode`。
* **Linux** - 删除 `$HOME/.config/Code` 和 `~/.vscode`。

## 后续步骤

* [安装概述](/docs/getstarted/overview.md) - 关于 VS Code 安装与更新的常规信息。
* [Windows 安装](/docs/setup/windows.md) - 在 Windows 上安装 VS Code 的详细信息和常见问题。
* [macOS 安装](/docs/setup/mac.md) - VS Code 同时支持 Intel 和 Apple 芯片的 macOS 设备。
* [Linux 安装](/docs/setup/linux.md) - 了解适用于 Linux 的不同 VS Code 软件包。
