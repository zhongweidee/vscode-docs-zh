---
ContentId: 7FDF94DB-3527-4296-BE1C-493495B89408
DateApproved: 6/10/2026
MetaDescription: 通过 Debian、RPM、Snap、Arch 或 Nix 包选项在 Linux 上安装 Visual Studio Code。
MetaSocialImage: images/quicksetup/quick-setup-social.png
---
# 在 Linux 上安装 Visual Studio Code

Visual Studio Code 在 Linux 上可通过官方的 Debian、RPM 和 Snap 包获取。Arch Linux 和 Nix 也提供了社区维护的包。

## 在 Linux 上安装 VS Code

请选择与你的 Linux 发行版匹配的包安装方式。

<details id="_debian-and-ubuntubased-distributions">
<summary id="debian-and-ubuntu-based-distributions">基于 Debian 和 Ubuntu 的发行版</summary>

1. 下载 [.deb 包](https://go.microsoft.com/fwlink/?LinkID=760868)。

1. 使用图形化软件中心安装该包，或通过命令行安装：

    ```bash
    sudo apt install ./<file>.deb

    # 在较旧的 Linux 发行版上，请改用以下命令：
    # sudo dpkg -i <file>.deb
    # sudo apt-get install -f # 安装依赖项
    ```

    > [!NOTE]
    > 其他二进制文件可在 [VS Code 下载页面](/download)获取。

`.deb` 包会提示安装 apt 仓库和签名密钥，从而通过系统包管理器启用自动更新。

如需非交互式安装，请在安装 `.deb` 包之前运行以下命令，以自动安装 apt 仓库和签名密钥：

```bash
echo "code code/add-microsoft-repo boolean true" | sudo debconf-set-selections
```

手动安装 apt 仓库的步骤：

1. 安装签名密钥：

    ```bash
    sudo apt install wget gpg &&
    wget -qO- https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/microsoft.gpg
    ```

1. 创建 `/etc/apt/sources.list.d/vscode.sources` 文件，内容如下：

    ```plaintext
    Types: deb
    URIs: https://packages.microsoft.com/repos/code
    Suites: stable
    Components: main
    Architectures: amd64,arm64,armhf
    Signed-By: /usr/share/keyrings/microsoft.gpg
    ```

1. 更新包缓存并安装该包：

    ```bash
    sudo apt update &&
    sudo apt install code # 或 code-insiders
    ```

> [!NOTE]
> 由于手动签名过程和发布系统的原因，Debian 仓库可能会有最多三小时的延迟，不会立即包含最新版本的 VS Code。

</details>

<details id="_rhel-fedora-and-centosbased-distributions">
<summary id="rhel-fedora-and-centos-based-distributions">基于 RHEL、Fedora 和 CentOS 的发行版</summary>

Microsoft 在 yum 仓库中为基于 RHEL、Fedora 和 CentOS 的发行版提供了稳定的 64 位 VS Code 包。

1. 安装密钥和 yum 仓库：

    ```bash
    sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc &&
    echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\nautorefresh=1\ntype=rpm-md\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" | sudo tee /etc/yum.repos.d/vscode.repo > /dev/null
    ```

1. 更新包缓存并在 Fedora 22 及更高版本上使用 `dnf` 安装该包：

    ```bash
    dnf check-update &&
    sudo dnf install code # 或 code-insiders
    ```

    在较旧的版本上，请使用 `yum`：

    ```bash
    yum check-update &&
    sudo yum install code # 或 code-insiders
    ```

> [!NOTE]
> 由于手动签名过程和发布系统的原因，yum 仓库可能会有最多三小时的延迟，不会立即包含最新版本的 VS Code。

</details>

<details id="_snap-package">
<summary id="snap-package">Snap 包</summary>

VS Code 在 [Snap Store](https://snapcraft.io/store) 中以 Snap 包形式官方发布。

[![从 Snap Store 获取](images/linux/snap-store.png)](https://snapcraft.io/code)

使用以下命令安装 Snap 包：

```bash
sudo snap install --classic code # 或 code-insiders
```

安装后，Snap 守护程序会在后台自动更新 VS Code。每当有新更新可用时，VS Code 会在产品内显示更新通知。

> [!NOTE]
> 如果你的 Linux 发行版中 `snap` 不可用，请查阅[安装 snapd 指南](https://docs.snapcraft.io/installing-snapd)。

有关 snap 的更多信息，请参阅[官方 Snap 文档](https://docs.snapcraft.io)。

</details>

<details id="_opensuse-and-slebased-distributions">
<summary id="opensuse-and-sle-based-distributions">基于 openSUSE 和 SLE 的发行版</summary>

[RHEL、Fedora 和 CentOS 面板](#rhel-fedora-and-centosbased-distributions)中的 yum 仓库同样适用于基于 openSUSE 和 SLE 的系统。

1. 安装密钥和 yum 仓库：

    ```bash
    sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc &&
    echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\nautorefresh=1\ntype=rpm-md\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" | sudo tee /etc/zypp/repos.d/vscode.repo > /dev/null
    ```

1. 更新包缓存并安装该包：

    ```bash
    sudo zypper install code
    ```

</details>

<details id="_arch-linux-aur-package">
<summary id="arch-linux-aur-package">Arch Linux AUR 包</summary>

[VS Code 的 Arch 用户仓库包](https://aur.archlinux.org/packages/visual-studio-code-bin)由社区维护。

有关安装详情，请参阅 Arch Linux wiki 中关于[安装 AUR 包](https://wiki.archlinux.org/index.php/Arch_User_Repository)的文章。

</details>

<details id="_nix-package">
<summary id="nix-package">Nix 包</summary>

nixpkgs 仓库中的 [VS Code Nix 包](https://github.com/NixOS/nixpkgs/blob/master/pkgs/applications/editors/vscode/vscode.nix)由社区维护。

使用 Nix 安装 VS Code 的步骤：

1. 在 `config.nix` 中将 `allowUnfree` 选项设置为 true。

1. 运行以下命令：

    ```bash
    nix-env -i vscode
    ```

</details>

<details id="_manual-rpm-package">
<summary id="manual-rpm-package">手动 RPM 包安装</summary>

当仓库安装不可用时，可手动下载并安装 [VS Code .rpm 包](https://go.microsoft.com/fwlink/?LinkID=760867)。除非安装了仓库，否则自动更新不会生效。

使用包管理器安装下载的 `.rpm` 包，例如使用 `dnf`：

```bash
sudo dnf install <file>.rpm
```

> [!NOTE]
> 其他二进制文件可在 [VS Code 下载页面](/download)获取。

</details>

## 更新

VS Code 每周发布[更新](/updates)。如果 VS Code 仓库已正确安装，系统包管理器会像处理系统上其他包一样自动处理更新。

> [!NOTE]
> 对于 [Snap 包](#snap-package)，更新是自动的并在后台运行。

## 将 VS Code 配置为默认文本编辑器

### xdg-open

将 VS Code 设置为 `xdg-open` 使用的文本文件（`text/plain`）的默认文本编辑器：

```bash
xdg-mime default code.desktop text/plain
```

### Debian alternatives 系统

基于 Debian 的发行版支持通过 [Debian alternatives 系统](https://wiki.debian.org/DebianAlternatives)设置默认**编辑器**，无需关心 MIME 类型。使用以下命令将 VS Code 设置为默认编辑器：

```bash
sudo update-alternatives --set editor /usr/bin/code
```

如果 VS Code 是通过 Snap 包安装的，请改用以下命令：

```bash
sudo update-alternatives --set editor /snap/bin/code
```

如果 VS Code 未显示为默认 `editor` 的候选项，请注册它：

```bash
sudo update-alternatives --install /usr/bin/editor editor $(which code) 10
```

## 使用自定义标题栏

自定义标题栏提供主题支持，并通过键盘导航和屏幕阅读器提供更好的无障碍体验。这些优势在 Linux 上可能并不总是适用，因为桌面环境和窗口管理器各不相同。因此，自定义标题栏在 Linux 上默认不启用。

为了在使用屏幕阅读器时获得更好的无障碍体验，请在无障碍模式下启用自定义标题栏。

通过 **Window: Title Bar Style**（`setting(window.titleBarStyle)`）设置来配置标题栏：

* `custom`：使用自定义标题栏。
* `native`：使用操作系统标题栏。

## 使用 WSL 在 Linux 上开发

在 Linux 上使用 VS Code 进行开发的另一种选择是，在 Windows 机器上使用 [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/install)（WSL）。

借助 WSL，你可以在 Windows 上安装和运行 Linux 发行版，在本地 Windows 机器上工作的同时，在 Linux 上开发和测试源代码。WSL 支持从 Microsoft Store 安装 Ubuntu、Debian、SUSE 和 Alpine 等 Linux 发行版。

配合 [WSL 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)使用时，VS Code 可在 WSL 上的 Linux 发行版环境中提供编辑和调试支持。

请参阅[在 WSL 中开发](/docs/remote/wsl.md)文档以了解更多信息，或尝试[在 WSL 中工作](/docs/remote/wsl-tutorial.md)入门教程。

## 安装后

安装 VS Code 后，请完成开发工作流的设置：

* [安装附加组件](/docs/setup/additional-components.md)，包括 Git、Node.js、TypeScript、语言运行时和命令行工具。
* [从 Visual Studio Marketplace 安装扩展](https://marketplace.visualstudio.com/VSCode)，以添加主题、格式化工具、调试器和语言支持。
* [设置 GitHub Copilot](/docs/setup/copilot.md)，以在 VS Code 中使用 AI 功能。
* [开始 VS Code 教程](/docs/editing/getting-started.md)，体验用户界面和关键功能的实操导览。

## 常见问题

<details>
<summary>包 git 未安装</summary>

在安装过程中，当包管理器的列表过期时可能会出现此错误。请更新包管理器并重新安装：

```bash
# 对于 .deb
sudo apt-get update

# 对于 Fedora 21 及更早版本上的 .rpm
sudo yum check-update

# 对于 Fedora 22 及更高版本上的 .rpm
sudo dnf check-update
```

</details>

<details>
<summary>与其他仓库的 VS Code 包冲突</summary>

某些发行版（例如 [Pop!_OS](https://pop.system76.com)）提供了自己的 `code` 包。为确保使用官方 VS Code 仓库，请创建一个名为 `/etc/apt/preferences.d/code` 的文件，内容如下：

```plaintext
Package: code
Pin: origin "packages.microsoft.com"
Pin-Priority: 9999
```

</details>

<details>
<summary>Debian 与文件移入回收站</summary>

如果在 Debian 上从 VS Code 资源管理器删除文件失败，可能是因为 VS Code 使用的回收站实现缺失。

运行以下命令安装缺失的包：

```bash
sudo apt-get install gvfs libglib2.0-bin
```

</details>

<details>
<summary>"Visual Studio Code 无法在此大型工作区中监视文件更改"（错误 ENOSPC）</summary>

此通知表示 VS Code 文件监视器的文件句柄已耗尽。当打开包含大量文件的工作区时，经常会出现这种情况。在调整平台限制之前，请先将大型文件夹（例如 Python `.venv`）添加到 `setting(files.watcherExclude)` 设置中。其他正在运行的应用程序也可能消耗文件句柄，因此关闭其他应用程序可能会有所帮助。

运行以下命令查看当前限制：

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

通过编辑 `/etc/sysctl.conf` 并在文件末尾添加以下行，将限制增加到最大值。Arch Linux 和 Ubuntu 24.10 及更高版本使用 `/etc/sysctl.d/*.conf` 中的文件。

```bash
fs.inotify.max_user_watches=524288
```

加载新值：

```bash
sudo sysctl --system
```

每个文件监视[占用 1,080 字节](https://stackoverflow.com/a/7091897/1156119)。如果全部 524,288 个监视都被消耗，上限约为 540 MiB。在内存受限的环境中，请选择较低的值。

另一种选择是通过 `setting(files.watcherExclude)` [设置](/docs/configure/settings.md)将特定工作区目录从 VS Code 文件监视器中排除。默认的 `setting(files.watcherExclude)` 值排除了 `node_modules` 和 `.git` 下的某些文件夹。你可以添加其他不希望 VS Code 跟踪的目录。

```json
"files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/*/**": true
}
```

</details>

<details>
<summary>在 Ubuntu 中看不到中文字符</summary>

打开应用程序菜单，然后选择**文件** > **首选项** > **设置**。在**文本编辑器** > **字体**部分，将**字体系列**设置为 `Droid Sans Mono, Droid Sans Fallback`。

要直接编辑 `settings.json` 文件，请设置 `setting(editor.fontFamily)`：

```json
"editor.fontFamily": "Droid Sans Mono, Droid Sans Fallback"
```

</details>

<details>
<summary>在 Ubuntu 上 code bin 命令无法将窗口带到前台</summary>

当 VS Code 已在当前目录中打开时，在 Ubuntu 上运行 `code .` 不会将 VS Code 带到前台。这是一种操作系统行为，可以通过 `ccsm` 更改。

```bash
# 安装
sudo apt-get update
sudo apt-get install compizconfig-settings-manager

# 运行
ccsm
```

在**常规** > **常规选项** > **焦点与提升行为**下，将**焦点阻止级别**设置为**关闭**。此操作系统设置适用于所有应用程序，而不仅仅是 VS Code。

</details>

<details>
<summary>无法安装 .deb 包，提示"/etc/apt/sources.list.d/vscode.list：没有此文件或目录"</summary>

当 `sources.list.d` 不存在或当前用户没有创建该文件的权限时，可能会出现此错误。请创建该文件夹和一个空的 `vscode.list` 文件：

```bash
sudo mkdir /etc/apt/sources.list.d
sudo touch /etc/apt/sources.list.d/vscode.list
```

</details>

<details>
<summary>通过 X 转发远程窗口时无法移动或调整窗口大小</summary>

如果使用 X 转发远程使用 VS Code，请使用原生标题栏来操作窗口。将 `setting(window.titleBarStyle)` 设置为 `native`。

</details>

<details>
<summary>仓库更改了其 Origin 值</summary>

如果出现类似以下的错误：

```plaintext
E: Repository '...' changed its 'Origin' value from '...' to '...'
N: This must be accepted explicitly before updates for this repository can be applied. See apt-secure(8) manpage for details.
```

请使用 `apt` 而不是 `apt-get`，并在提示时接受 origin 更改：

```bash
sudo apt update
```

</details>
