---
ContentId: b921a11a-ed69-4716-bc93-589ba8e01e22
DateApproved: 02/04/2026
MetaDescription: 了解 Visual Studio Code 扩展的安全措施，包括权限、用户可靠性检查以及 Marketplace 保护机制。
---
# 扩展运行时安全

[扩展](/docs/configure/extensions/extension-marketplace.md)极大地增强了 Visual Studio Code 的功能。但它们也可能引入风险，例如恶意代码执行和数据隐私问题。[Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode) 提供了多种方式来保护你免受恶意扩展的侵害。此外，VS Code 还为你提供了多个指示符来判断扩展的可靠性。

本文档概述了 VS Code 中扩展的运行时权限，以及为保护你免受恶意扩展侵害而采取的措施。你将了解如何在安装扩展之前，对其可靠性做出明智的判断。

## 关于扩展运行时权限

[扩展宿主](/api/advanced-topics/extension-host.md)负责在 VS Code 中运行扩展。扩展宿主拥有与 VS Code 本身相同的权限。这意味着 VS Code 能够执行的任何操作，扩展也可以通过扩展宿主来执行。

例如，扩展可以读取和写入你计算机上的文件、发出网络请求、运行外部进程以及修改工作区设置。

## 扩展发布者信任

从 VS Code 1.97 版本开始，当你首次安装来自第三方发布者的扩展时，VS Code 会显示一个对话框，提示你确认是否信任该扩展的发布者。

当你信任某个扩展包或依赖于其他扩展的扩展的发布者时，你也同时信任了这些被依赖扩展的发布者。

你之前安装的扩展的发布者被视为已信任，会自动添加到受信任发布者列表中。

你可以通过 **扩展: 管理受信任的扩展发布者** 命令来管理受信任扩展的列表。

> [!IMPORTANT]
> 当你通过 [VS Code 命令行](/docs/configure/command-line.md#working-with-extensions)安装扩展时，该扩展的发布者不会被自动信任。

## 判断扩展的可靠性

在安装扩展之前，你可以采取多种措施来判断其是否可靠。Visual Studio Marketplace 为你提供了有关扩展的信息，帮助你做出明智的决定：

* **评分和评论**: 阅读其他人对该扩展的评价。

* **问答**: 查看现有问题以及发布者的响应水平。如果你有疑虑，也可以与扩展的发布者进行交流。

* **问题、仓库和许可证**: 检查发布者是否提供了这些信息，以及它们是否满足你所期望的支持水平。

* **已验证的发布者**: 使用发布者名称和域名旁边的蓝色对勾标记作为额外的信任信号。该对勾标记表示发布者已向 Marketplace 证明了域名所有权。它还表明 Marketplace 已验证了域名的存在，并且发布者在 Marketplace 上至少有六个月的良好信誉。

    ![Verified publisher](images/extension-marketplace/bluecheck.png)

> [!TIP]
> 如果你想强制规定组织中允许使用哪些扩展，请查看如何[在 VS Code 中配置允许的扩展](/docs/enterprise/extensions.md#configure-allowed-extensions)。

## Marketplace 保护机制

Visual Studio Marketplace 采用了多种机制来保护你免受恶意扩展的侵害：

* **恶意软件扫描**: Marketplace 会对每个发布的扩展包运行恶意软件扫描，以确保其安全性。该扫描使用了多个反病毒引擎，每个新扩展和每个扩展更新都会进行扫描。在扫描结果全部清除之前，该扩展不会在 Marketplace 上公开发布。

* **动态检测**: Marketplace 通过在沙盒环境（_干净室虚拟机_）中运行扩展来验证其运行时行为，从而进行动态检测。

* **已验证的发布者**: 发布者可以通过证明域名所有权来验证其身份（蓝色对勾标记）。这表明发布者已向 Marketplace 证明了域名所有权。它还表明 Marketplace 已验证了域名的存在，并且发布者在 Marketplace 上至少有六个月的良好信誉。

* **异常使用监控**: Marketplace 会监控扩展的下载和使用模式，以检测异常行为。

* **名称抢注防范**: Marketplace 会阻止扩展作者盗用官方发布者（如 Microsoft 或 RedHat）以及热门扩展（如 GitHub Copilot）的名称。

* **阻止列表**: 如果恶意扩展被举报并得到验证，或在扩展依赖项中发现了漏洞，则该扩展将被从 Marketplace 移除并添加到*阻止列表*中。如果该扩展已被安装，VS Code 将自动卸载它。

* **扩展签名验证**: Visual Studio Marketplace 会在扩展发布时对所有扩展进行签名。VS Code 会在你安装扩展时检查此签名，以验证扩展包的完整性和来源。

* **密钥扫描**: Marketplace 会自动扫描每个新发布的扩展，查找是否存在密钥（例如 API 密钥或凭据，如 Azure DevOps PAT 令牌）。如果检测到任何密钥，发布将被阻止以防止潜在的安全风险。VSCE 工具会在打包过程中扫描 `.env` 文件，如果发现密钥则阻止发布。

你可以在[Visual Studio Marketplace 中的安全与信任博客文章](https://devblogs.microsoft.com/blog/security-and-trust-in-visual-studio-marketplace)中了解这些措施。

## 举报可疑扩展

如果你确实发现了看起来可疑的扩展，请将其举报给 Marketplace 团队。Marketplace 团队会在一个工作日内做出初步回复。

举报扩展的步骤：

1. 在 [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode) 中打开该扩展的页面。

1. 在扩展**更多信息**部分底部选择**报告问题**链接。

## 相关资源

* 了解如何在 [Visual Studio Code](/docs/configure/extensions/extension-marketplace.md) 中安装和管理扩展。

* 使用[工作区信任](/docs/editing/workspaces/workspace-trust.md)来决定项目文件夹中的代码是否可以在未经显式批准的情况下由 VS Code 和扩展执行。这为处理不熟悉的代码增加了一层额外的安全保障。

* 配置 [VS Code 中允许的扩展](/docs/enterprise/extensions.md#configure-allowed-extensions)，以强制规定组织中允许使用哪些扩展。
