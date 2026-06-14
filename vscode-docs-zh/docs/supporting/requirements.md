---
Order:
TOCTitle: 系统要求
ContentId: 1D4850EE-85E2-4152-81BE-FECAE62EA99E
PageTitle: Visual Studio Code 系统要求
DateApproved: 02/04/2026
MetaDescription: Visual Studio Code 硬件和平台（操作系统）要求。
---
# Visual Studio Code 系统要求

## 硬件

Visual Studio Code 安装包体积较小（小于 200 MB），磁盘占用空间小于 500 MB。VS Code 非常轻量，可轻松在当今的硬件上运行。

我们推荐：

* 1.6 GHz 或更快的处理器
* 1 GB 内存

## 平台

VS Code 支持以下平台：

* [受支持的 Windows 客户端版本](https://learn.microsoft.com/zh-cn/windows/release-health/supported-versions-windows-client)（64 位）。
* 具有 Apple 安全更新支持的 macOS 版本。通常为最新版本及前两个版本。
* Linux (Debian)：Ubuntu Desktop 20.04、Debian 10
* Linux (Red Hat)：Red Hat Enterprise Linux 8、Fedora 36

支持使用[开发容器](/docs/devcontainers/containers.md)扩展运行 VS Code。使用开发容器扩展时，VS Code 服务端在容器中运行，VS Code 客户端则位于桌面上。

## 不支持的情况

* 在应用程序虚拟化解决方案中运行 VS Code，例如 Microsoft App-V 或 MSIX for Windows，或第三方应用程序虚拟化技术。
* 在虚拟机环境中运行 VS Code 需要一个完整的操作系统。
* 在非持久化虚拟机上运行 VS Code。
* 在利用或通过 FSLogix 管理用户的系统上运行 VS Code。
* 多个用户同时在同一台计算机上使用该软件，包括共享的虚拟桌面基础架构计算机或共用的 Windows/Linux 虚拟桌面主机池。
* 在 Windows/Linux 容器中运行完整的 VS Code。
* Windows Server

### 其他 Linux 要求

* GLIBCXX 版本 3.4.25 或更高版本
* GLIBC 版本 2.28 或更高版本

有关当前已知问题的列表，请参阅我们的[常见问题解答](faq)。
