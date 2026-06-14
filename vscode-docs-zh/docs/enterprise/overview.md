---
ContentId: a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d
DateApproved: 6/10/2026
MetaDescription: 了解如何在企业环境中配置和管理 Visual Studio Code，包括策略、扩展、AI 设置和网络配置。
---

# 企业版 VS Code

Visual Studio Code 可作为各种规模企业团队的开发工具。作为 IT 管理员，你可以配置 VS Code 以实现组织内的一致性与合规性。

## 企业策略

VS Code 支持集中管理的策略，这些策略会覆盖受管设备上的用户设置。策略可通过设备管理解决方案进行部署，例如 Microsoft Intune、Active Directory 组策略或 macOS 上的 MDM 解决方案。

策略可用于控制以下方面：

* [AI 与 Copilot 功能](/docs/enterprise/ai-settings.md) - 代理模式、MCP 服务器和工具审批
* [扩展](/docs/enterprise/extensions.md) - 允许的扩展和私有市场
* [遥测](/docs/enterprise/telemetry.md) - 数据收集级别和反馈机制
* [自动更新](/docs/enterprise/updates.md) - 控制 VS Code 何时以及如何更新

有关所有可用策略的完整列表，请参阅[企业策略参考](/docs/enterprise/policies.md)。

## 扩展管理

组织可以控制用户计算机上安装哪些扩展，并托管私有的扩展市场。

* **允许的扩展** - 按发布者、扩展 ID 或版本指定可安装的扩展
* **私有市场** - 为你的组织自托管扩展，并控制对公共市场的访问

详细了解[在企业环境中管理扩展](/docs/enterprise/extensions.md)。

## 网络配置

VS Code 需要网络访问来支持多项功能，包括自动更新、扩展市场和遥测。对于网络访问受限或使用代理服务器的环境，你可能需要配置：

* **防火墙允许列表** - 允许特定的主机名以实现 VS Code 功能
* **代理服务器** - VS Code 默认使用系统代理设置
* **SSL 证书** - 为 HTTPS 代理配置受信任的证书

有关详细的网络配置，请参阅 [VS Code 中的网络连接](/docs/setup/network.md)。

### 常用主机名

如果你的防火墙需要允许列表，需要允许的关键主机名包括：

* `update.code.visualstudio.com` - 更新
* `marketplace.visualstudio.com` - 扩展市场
* `*.gallery.vsassets.io` - 扩展资源
* `vscode.download.prss.microsoft.com` - 下载

请参阅网络文档中的[完整主机名列表](/docs/setup/network.md#common-hostnames)。

## 预装扩展

你可以准备包含 VS Code 和一组预装扩展的计算机镜像或虚拟机。当用户首次启动 VS Code 时，扩展会自动安装。

详细了解[预装扩展](/docs/enterprise/extensions.md#preinstall-extensions)。

## 相关资源

* [企业策略参考](/docs/enterprise/policies.md) - 完整策略列表
* [网络连接](/docs/setup/network.md) - 代理和防火墙配置
* [设置同步](/docs/configure/settings-sync.md) - 跨设备同步设置
