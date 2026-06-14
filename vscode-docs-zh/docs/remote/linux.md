---
ContentId: 7ec8dedf-0659-437e-98f1-2d27f5e243eb
MetaDescription: VS Code 远程开发的 Linux 先决条件 - SSH、开发容器和 WSL 扩展
DateApproved: 6/10/2026
---
# 在 Linux 上进行远程开发

Linux 是一个高度多变的环境，大量的服务器、容器和桌面发行版可能会让人难以了解哪些受到支持。Visual Studio Code 远程开发对你将要连接的特定主机/容器/WSL 发行版有先决条件要求。

这些扩展已知可以在连接到以下最新稳定/LTS 版本时正常工作：

* **Ubuntu 64-bit x86, ARMv8l (AArch64)** (20.04+)
* **Debian 64-bit x86, ARMv8l (AArch64)** (Buster/10+)
* **Raspberry Pi OS ARMv7l (AArch32) 32-bit** (Buster/10+)（以前称为 Raspbian）
* **CentOS / RHEL 64-bit x86** (8+)
* **Alpine Linux 64-bit x86 容器或 WSL 主机** (3.16+) 适用于开发容器、WSL

以下非 Linux SSH 主机也受支持：

* **Windows 10/11 / Server 2016/2019 SSH 主机** (1803+) 使用[官方 OpenSSH 服务器](https://learn.microsoft.com/windows-server/administration/openssh/openssh_install_firstuse)。
* **macOS** 10.14+ (Mojave) SSH 主机需[启用远程登录](https://support.apple.com/guide/mac-help/allow-a-remote-computer-to-access-your-mac-mchlp1066/mac)。

但是，如果你使用的是非标准配置或 Linux 下游发行版，可能会遇到问题。本文档提供了有关要求的信息以及一些提示，即使你的配置仅受社区支持，也能帮助你顺利运行。

请注意，**其他扩展可能有此处未列出的依赖项**。某些扩展还包含已编译的原生代码，**可能无法在 Alpine Linux、ARMv7 (AArch32) 或 ARMv8 (AArch64) 上工作**。出于这个原因，这些平台被视为处于"预览"阶段。如果你遇到仅在特定扩展上出现的问题，请**联系扩展作者**以了解其原生依赖项的信息。

## 本地 Linux 先决条件

如果你在本地运行 Linux，[VS Code 先决条件](/docs/supporting/requirements.md)涵盖了大部分要求。

此外，特定的远程开发扩展还有进一步要求：

* **Remote - SSH：** `ssh` 需要在路径中。该 shell 二进制文件通常位于 `openssh-client` 软件包中。
* **Dev Containers：** Docker CE/EE 18.06+ 和 Docker Compose 1.21+。按照[适用于你的发行版的 Docker CE/EE 官方安装说明](https://docs.docker.com/install/#supported-platforms)进行操作。如果你使用 Docker Compose，也请按照[安装 Docker Compose 指南](https://docs.docker.com/compose/install/)进行操作。（请注意，不支持 Ubuntu Snap 软件包，并且发行版中的软件包可能已过时。）`docker` 和 `docker-compose` 也必须在路径中。但是，如果你正在[使用远程主机](https://aka.ms/vscode-remote/containers/remote-host)，则 Docker 不需要运行。你可以在[开发容器文档](/docs/devcontainers/containers.md#system-requirements)中了解更多关于配置 Docker 的方法。

## 远程主机/容器/WSL Linux 先决条件

平台先决条件主要由 Node.js 运行时（以及扩展而来的 [V8 JavaScript 引擎](https://v8docs.nodesource.com)）的版本决定，该运行时随自动安装在每个远程端点上的服务器组件一起提供。此服务器还具有一组相关的原生 Node 模块，需要为每个目标进行编译和测试。**基于 64-bit x86 glibc** 的 Linux 发行版目前在这些要求下提供了最佳支持。

在使用具有原生依赖项的扩展时，你可能会在**基于 ARMv7l (AArch32) / ARMv8l (AArch64) glibc** 的主机、容器或 WSL 以及**基于 64-bit x86 musl 的 Alpine Linux** 上遇到问题。对于 ARMv7l/ARMv8l，扩展可能仅在扩展中包含 x86_64 版本的原生模块或运行时。对于 Alpine Linux，包含的原生代码或运行时可能因 Alpine Linux (`musl`) 与其他发行版 (`glibc`) 在 `libc` 实现方式上的[根本差异](https://wiki.musl-libc.org/functional-differences-from-glibc.html)而无法工作。在这两种情况下，扩展都需要通过为这些额外目标编译/包含二进制文件来选择支持这些平台。如果你遇到某个扩展无法按预期工作的情况，请向相应的扩展作者提交问题以请求支持。

| 发行版 | 基本要求 | Remote - SSH 要求 | 备注 |
|--------------|-------------------|------------------|-------|
| 通用 | kernel >= 4.18, glibc >=2.28, libstdc++ >= 3.4.25, tar | OpenSSH 服务器、`bash` 和 `curl` 或 `wget` | 运行 `ldd --version` 检查 glibc 版本。运行 `strings /usr/lib64/libstdc++.so.6 \| grep GLIBCXX` 查看 libstdc++ 3.4.25 是否可用。 |
| 通用 Arm32 | `libatomic1` | 无额外要求。 | |
| Ubuntu 20.04+、Debian 10+、Raspberry Pi OS Buster/10+ 及下游发行版 | `libc6 libstdc++6 ca-certificates tar` | `openssh-server bash` 和 `curl` 或 `wget` | 需要 kernel >= 4.18、glibc >= 2.28、libstdc++ >= 3.4.25。 |
| RHEL / CentOS 8+ | `glibc libgcc libstdc++ ca-certificates tar` | `openssh-server bash` 和 `curl` 或 `wget` | 需要 kernel >= 4.18、glibc >= 2.28、libstdc++ >= 3.4.25。 |
| Alpine Linux 3.16+ | `musl libgcc libstdc++`。musl >= 1.2.3，不需要 glibc。 | 尚不支持。 | 在开发容器和 WSL 中受支持。由于扩展原生代码中的 `glibc` 依赖项，安装在容器中的扩展可能无法工作。 |
| openSUSE Leap / SUSE Linux Enterprise 15+|`glibc libgcc_s1 libstdc++6 ca-certificates gzip tar`|`curl` 或 `wget` |需要 kernel >= 4.18、glibc、libstdc++6|

## 各 Linux 发行版的提示

以下是各个发行版及其可能缺失的基本要求的列表。不包括已终止生命周期的发行版版本。

* ✅ = 可用
* ⚠️ = 可用，但有关限制请参阅备注
* 🔬 = 实验性
* 🛑 = 不受支持，但有变通方法
* ❌ = 不受支持

| 服务器发行版 | Docker 镜像 | 缺失的库 | 备注/额外步骤 |
|---------------------|--------------|-------------------|------------------|
| ⚠️ Alpine Linux 3.16（64-bit） | `alpine:3.16` | `libgcc libstdc++` | 仅在开发容器和 WSL 中受支持。由于扩展原生代码中的 `glibc` 依赖项，安装在容器中的某些扩展可能无法工作。 |
| ✅ CentOS 8 Server（64-bit） | `centos:8` | &lt;none&gt; | &lt;none&gt; |
| ❌ CentOS 7 Server（64-bit） | `centos:7` | `glibc` >= 2.28、`libstdc++` >= 3.4.25 | &lt;none&gt; |
| ✅ Debian 10 Server（64-bit） | `debian:10` | &lt;none&gt; | &lt;none&gt; |
| ❌ Debian 9 Server（64-bit） | `debian:9` | `glibc` >= 2.28、`libstdc++` >= 3.4.25 | &lt;none&gt; |
| ✅ openSUSE Leap Server 15（64-bit） | `opensuse/leap:15` | Docker 镜像缺少 `tar` 和 `gzip`。 | &lt;none&gt; |
| ✅ Oracle Linux 8（64-bit） | `oraclelinux:8` | &lt;none&gt; | &lt;none&gt; |
| ❌ Oracle Linux 7（64-bit） | `oraclelinux:7` | `glibc` >= 2.28、`libstdc++` >= 3.4.25。Docker 镜像缺少 `tar`。 | &lt;none&gt; |
| ⚠️ Raspberry Pi OS Buster/10（ARMv7l 32-bit） | &lt;n/a&gt; | &lt;none&gt; | 由于扩展的 x86 原生代码，某些扩展安装在 ARMv7l 主机上时可能无法工作。Dev Containers **确实**支持连接到 ARM 主机上的容器。 |
| ✅ RedHat Enterprise Linux 8（64-bit） |  | &lt;none&gt; | &lt;none&gt; |
| ❌ RedHat Enterprise Linux 7（64-bit） |  | `glibc` >= 2.28、`libstdc++` >= 3.4.25 | &lt;none&gt; |
| ✅ SUSE Linux Enterprise Server 15（64-bit） |  | Docker 镜像缺少 `tar` 和 `gzip`。 | &lt;none&gt; |
| ✅ Ubuntu Server 20.04（64-bit） | `ubuntu:20.04` | &lt;none&gt; | &lt;none&gt; |
| ❌ Ubuntu Server 18.04（64-bit） | `ubuntu:18.04` | `glibc` >= 2.28 | &lt;none&gt; |

## 问题或反馈

* 参见[提示和技巧](/docs/remote/troubleshooting.md)或[常见问题](/docs/remote/faq.md)。
* 在 [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-remote) 上搜索。
* 提交[功能请求](https://aka.ms/vscode-remote/feature-requests)或[报告问题](https://aka.ms/vscode-remote/issues/new)。
* 创建[开发容器模板](https://containers.dev/templates)或[功能](https://containers.dev/features)供他人使用。
* 为[我们的文档](https://github.com/microsoft/vscode-docs)或 [VS Code 本身](https://github.com/microsoft/vscode)做贡献。
* 有关详细信息，请参阅我们的[贡献](https://aka.ms/vscode-remote/contributing)指南。
