---
ContentId: E059E35A-8AD0-4D4A-9BE1-E23D45D75C1C
DateApproved: 6/10/2026
MetaDescription: 在 Raspberry Pi OS 上安装并运行 Visual Studio Code。
---
# 在 Raspberry Pi 上使用 Visual Studio Code

虽然尚未获得官方支持，但你仍然可以在 [Raspberry Pi](https://www.raspberrypi.org) 设备上运行 Visual Studio Code。

[![Raspberry Pi Logo](images/raspberry-pi-os/RPi-Logo-Landscape-Reg-SCREEN.png)](https://www.raspberrypi.org)

下载和使用 Visual Studio Code 即表示你同意[许可条款](https://code.visualstudio.com/license)和[隐私声明](https://go.microsoft.com/fwlink/?LinkID=528096&clcid=0x409)。

## 安装

Visual Studio Code 通过 [Raspberry Pi OS](https://www.raspberrypi.com/software/operating-systems/)（以前称为 Raspbian）的 APT 仓库进行官方分发，提供 32 位和 64 位两种版本。

你可以通过运行以下命令进行安装：

```bash
sudo apt update
sudo apt install code
```

### 运行 VS Code

安装 VS Code 包后，你可以在终端中输入 `code` 来运行 VS Code，或通过**编程**菜单启动它。

![Visual Studio Code under the Programming menu on Raspberry Pi](images/raspberry-pi-os/vscode-under-programming.jpg)

## 更新

你的 Raspberry Pi 应该会像处理系统中其他软件包一样自动处理 VS Code 的更新：

```bash
sudo apt update
sudo apt upgrade code
```

你可以随时在我们的[更新](/updates)页面查看新版本发布信息。

## 系统要求

VS Code 在 Raspberry Pi 上未获得官方支持。请查看我们的[社区讨论](https://github.com/microsoft/vscode-discussions/discussions/2379)以了解已知可用的平台信息。

## 后续步骤

安装 VS Code 后，以下主题将帮助你进一步了解它：

* [附加组件](/docs/setup/additional-components.md) —— 了解如何安装 Git、Node.js、TypeScript 以及 Yeoman 等工具。
* [用户界面](/docs/editing/userinterface.md) —— VS Code 快速入门指南。
* [用户/工作区设置](/docs/configure/settings.md) —— 了解如何通过设置将 VS Code 配置为符合你的偏好。
