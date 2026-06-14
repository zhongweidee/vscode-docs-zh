---
ContentId: 2c4d6e8f-0a1b-3c5d-7e9f-1a2b3c4d5e6f
DateApproved: 6/10/2026
MetaDescription: 了解如何集中管理企业环境中的 VS Code 自动更新，包括更新模式与部署策略。
---

# 管理企业环境中的更新

VS Code 每周发布更新，包含新功能、错误修复和安全补丁。组织可以集中管理各开发团队中 VS Code 的更新处理方式。

本文介绍 IT 管理员如何通过[企业策略](/docs/enterprise/policies.md)来配置自动更新。

## 更新策略

VS Code 提供 `UpdateMode` 策略来控制自动更新。该策略控制 VS Code 中的 `setting(update.mode)` 设置。

了解如何将[策略部署](/docs/enterprise/policies.md)到组织内的设备上。

## 更新模式选项

`UpdateMode` 策略接受以下值：

| 值         | 描述                                         |
|-----------|---------------------------------------------|
| `default` | 启用自动检查更新，并在后台运行                          |
| `start`   | 仅在 VS Code 启动时检查更新                        |
| `manual`  | 禁用自动检查；用户可以手动检查更新                        |
| `none`    | 完全禁用更新                                     |

## 禁用自动更新

要阻止 VS Code 自动检查或安装更新，请将 `UpdateMode` 策略设置为 `none`：

**策略值**：

```text
none
```

当更新被禁用后，用户无法通过应用程序更新 VS Code。此时您可以通过软件部署工具来控制 VS Code 的版本。

## 仅启用手动更新

要允许用户手动检查更新，同时禁用后台自动检查，请将 `UpdateMode` 策略设置为 `manual`：

**策略值**：

```text
manual
```

用户可以通过选择**帮助** > **检查更新**来检查更新。

## 仅在启动时检查更新

要仅在 VS Code 启动时检查更新，而不进行后台检查，请将 `UpdateMode` 策略设置为 `start`：

**策略值**：

```text
start
```

## 网络要求

VS Code 从 Microsoft 服务器下载更新。如果您的网络有访问限制，请确保允许以下主机名：

* `update.code.visualstudio.com` - VS Code 下载和更新服务器

请参阅[网络文档](/docs/setup/network.md#common-hostnames)以获取完整的主机名列表。

## 相关资源

* [企业策略参考](/docs/enterprise/policies.md) - 企业策略完整列表
* [网络连接](/docs/setup/network.md) - 代理和防火墙配置
