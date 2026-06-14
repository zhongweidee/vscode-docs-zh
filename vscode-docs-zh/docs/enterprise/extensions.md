---
ContentId: 8a2b5f4c-9e3d-4c6a-b8f1-2d7e9a4c5b3f
DateApproved: 6/10/2026
MetaDescription: 了解如何在企业环境中管理和控制 VS Code 扩展，包括私有扩展市场、允许的扩展以及预安装扩展。
---

# 在企业环境中管理扩展

Visual Studio Code 扩展可以提高生产力，但在企业环境中需要谨慎管理，以维护安全性和合规性。本文介绍了 IT 管理员如何控制扩展安装、托管私有扩展市场以及向用户计算机部署扩展。

## 配置允许的扩展

> [!NOTE]
> 对允许的扩展的支持从 VS Code 版本 1.96 开始提供。

VS Code 支持通过 `setting(extensions.allowed)` 应用程序级设置来控制用户计算机上可以安装哪些扩展。你可以按发布者、特定扩展、版本和平台选择性地允许扩展。默认情况下，所有扩展都是允许的。当你配置此设置后，只有列出的扩展可以安装，未列出的扩展将被阻止。如果你阻止了已安装的扩展或版本，该扩展将被禁用。

### 按发布者允许或阻止

使用发布者 ID 来允许或阻止某个发布者的所有扩展。不包含句点 (`.`) 的键将被视为发布者 ID。

```jsonc
"extensions.allowed": {
    "microsoft": true,
    "github": true
}
```

> [!TIP]
> 使用 `microsoft` 作为发布者 ID 来引用 Microsoft 发布的所有扩展，即使它们可能具有不同的发布者 ID。

### 按扩展允许或阻止

使用完整扩展 ID (`<publisher>.<extension>`) 来允许或阻止特定扩展。包含句点的键将被视为扩展 ID。

```jsonc
"extensions.allowed": {
    "esbenp.prettier-vscode": true,
    "ms-azuretools.vscode-containers": false
}
```

### 允许特定版本或平台

将扩展固定到一个或多个已批准的版本。不支持版本范围，因此你必须逐个列出每个版本。要进一步按平台限制，请在版本后追加 `@<platform>`。

```jsonc
"extensions.allowed": {
    "dbaeumer.vscode-eslint": ["3.0.0"],
    "figma.figma-vscode-extension": ["3.0.0", "4.2.3", "4.1.2"],
    "rust-lang.rust-analyzer": ["5.0.0@win32-x64", "5.0.0@darwin-x64"]
}
```

### 仅允许稳定版本

使用 `"stable"` 作为值来允许扩展或发布者所有扩展的稳定版本，同时阻止预发布版本。

```jsonc
"extensions.allowed": {
    "github.vscode-pull-request-github": "stable",
    "redhat": "stable"
}
```

### 优先级和规则

* 更具体的选择器优先。例如，`"microsoft": true` 和 `"microsoft.cplusplus": false` 将允许除 C++ 扩展之外的所有 Microsoft 扩展。
* 不支持重复的键值。同时包含 `"microsoft": true` 和 `"microsoft": false` 会导致无效的配置。
* 扩展或发布者 ID 中不支持通配符，除了 `"*"` 用于允许或阻止所有扩展。例如，`"*": false` 会阻止所有扩展。

### 通过组织策略部署

组织可以通过使用 `AllowedExtensions` [策略](/docs/enterprise/policies.md) 来集中管理允许的扩展。通过设备管理解决方案，管理员可以部署并在所有受管设备上强制执行该策略。这会覆盖单个设备上用户配置的 `setting(extensions.allowed)` 设置。

![在本地组策略编辑器中配置 AllowedExtensions 的屏幕截图。](images/policies/allowed-extensions-local-gp-editor.png)

> [!IMPORTANT]
> 如果策略值中存在语法错误，则 `extensions.allowed` 设置将不会应用。请在 VS Code 中查看窗口日志以了解错误（按 `kb(workbench.action.showCommands)` 并输入 **显示窗口日志**）。

## 预安装扩展

你可以配置 VS Code 以预装一组扩展（*引导安装*）。此功能适用于你准备计算机映像、虚拟机或云工作站的情况，其中 VS Code 已预安装，并且特定扩展可立即供用户使用。

> [!NOTE]
> 对预安装扩展的支持目前仅在 Windows 上可用。

按照以下步骤引导安装扩展：

1. 在 VS Code 安装目录中创建一个 `bootstrap\extensions` 文件夹。

1. 下载你想要预安装的扩展的 [VSIX 文件](/docs/configure/extensions/extension-marketplace.md#can-i-download-an-extension-directly-from-the-marketplace)，并将其放入 `bootstrap\extensions` 文件夹。

1. 当用户首次启动 VS Code 时，`bootstrap\extensions` 文件夹中的所有扩展将在后台静默安装。

用户仍然可以卸载已预安装的扩展。卸载扩展后重新启动 VS Code 不会重新安装该扩展。

## 托管私有扩展市场

私有扩展市场使企业能够在组织内部自托管和分发扩展，以满足安全性和合规性要求。私有扩展市场与 VS Code 扩展体验集成，为用户提供私有扩展的发现和自动更新功能。

私有扩展市场的主要功能：

* **自托管**：在自己的基础设施（如 Azure 或 Kubernetes）上托管内部扩展，以保护知识产权。
* **上游代理**：自动包含来自 [Visual Studio Marketplace](https://marketplace.visualstudio.com) 的公共扩展，即使在互联网连接受限的环境中也能使用。通过设置 [允许列表](#configure-allowed-extensions) 来允许或拒绝选定的扩展。
* **重新托管**：下载并托管公共扩展以应用企业特定的验证和安全标准，支持离线（air-gapped）环境。了解 [Microsoft 如何保护你的软件供应链](https://aka.ms/vsmsecurityblog)。
* **简单部署**：以无状态 Docker 容器形式部署，无需外部数据库。
* **灵活的存储**：使用任何文件系统或 Azure Artifacts 发布和管理扩展。
* **集中部署**：使用 Windows 和 macOS 上的组策略将私有扩展市场部署到你的团队。
* **集成安装和更新**：直接从 VS Code 搜索和安装扩展，并提供新版本的自动更新。
* **跨平台支持**：兼容 Windows、macOS 和 Linux 上的 VS Code 桌面版。

> [!NOTE]
> 不支持从 VS Code Server 或 VS Code for the Web 连接。

私有扩展市场目前可供 GitHub Enterprise 客户使用。VS Code 用户必须使用 GitHub Enterprise 或 Copilot Enterprise/Business 账户登录才能访问私有扩展市场。

从 **[部署和功能指南](https://aka.ms/private-marketplace/readme)** 开始，其中包含部署说明、脚本和开发环境配置。如有问题或需要帮助，请联系 [私有扩展市场支持](https://aka.ms/vspm/support)。

## 相关资源

* [扩展市场](/docs/configure/extensions/extension-marketplace.md) - 了解如何在 VS Code 中安装和管理扩展。
* [扩展运行时安全性](/docs/configure/extensions/extension-runtime-security.md) - 了解 VS Code 中的扩展安全性。
* [企业策略](/docs/enterprise/policies.md) - VS Code 中所有企业策略的参考。
