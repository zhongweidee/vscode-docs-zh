---
# DO NOT TOUCH — Managed by doc writer
ContentId: 200bf922-3684-45ee-a8dd-43191d6b3f8b
DateApproved: 6/10/2026

VSCodeCommitHash: 77dfb21e210c8be0d72ab995889cbc7e4a9ae468
VSCodeVersion: 1.124.0

# 用少于300个字符总结整个主题，用于SEO
MetaDescription: Visual Studio Code 中的企业策略使组织能够为其开发团队集中管理设置。本文参考介绍了可用的策略及其实现方法。
---

# 使用策略集中管理 VS Code 设置

Visual Studio Code 中的企业策略使组织能够为其开发团队集中管理 VS Code 设置，确保整个组织的一致性和兼容性。当设置了策略值时，该值将覆盖在任何级别（默认、用户和工作区）配置的 VS Code 设置值。

IT 管理员可以通过不同的设备管理解决方案在用户设备上部署并强制执行特定的 VS Code 配置。VS Code 支持在 Windows、macOS 和 Linux 上应用策略。

![设置编辑器显示“扩展: 允许”设置由组织管理。](images/policies/allowed-extensions-managed-by-organization.png)

在本文中，你将了解 VS Code 中有哪些可用的企业策略，以及如何在不同的操作系统上配置它们。

## Windows 组策略

VS Code 支持 [基于 Windows 注册表的组策略](https://learn.microsoft.com/previous-versions/windows/desktop/policy/implementing-registry-based-policy)。

这些配置文件可以使用移动设备管理 (MDM) 解决方案进行部署，也可以在单个设备上手动安装。

### 步骤 1：获取示例 ADMX 和 ADML 文件

从 VS Code 1.69 版本开始，每个版本都附带一个 `policies` 目录，其中包含定义可用策略的 ADMX 模板文件。

你可以从现有安装中获取 ADMX 和 ADML 文件，也可以通过下载并解压 VS Code zip 压缩包来获取。请按照以下步骤获取文件：

1. 下载适用于你的 VS Code 版本的 [VS Code zip 压缩包](/download)。
1. 将 zip 文件解压到临时位置。
1. 在解压后的文件中导航到 `policies` 文件夹。此文件夹包含 ADMX 模板文件（例如 `vscode.admx`）以及一个包含不同语言 ADML 文件的 `locales` 子文件夹。

### 步骤 2：配置策略值

根据你的需求编辑策略值：

**字符串策略** - 接受文本值或 JSON 字符串的策略：

```xml
<!-- 示例：允许来自特定发布者的扩展 -->
<key>AllowedExtensions</key>
<string>{"microsoft": true, "github": true}</string>

<!-- 示例：将更新模式设置为特定值 -->
<key>UpdateMode</key>
<string>start</string>
```

> [!IMPORTANT]
> 如果策略值中存在语法错误，该设置将不会被应用。你可以在 VS Code 中检查窗口日志以查看错误（按 `kb(workbench.action.showCommands)` 并输入 **显示窗口日志**）。

**布尔策略** - 接受 true/false 值的策略：

```xml
<!-- 示例：启用用户反馈 -->
<key>EnableFeedback</key>
<true/>

<!-- 示例：禁用遥测 -->
<key>EnableTelemetry</key>
<false/>
```

**删除不需要的策略** - 对于任何你不想强制执行的策略，删除其键和值：

```xml
<!-- 要不强制执行更新模式策略，请删除以下行： -->
<key>UpdateMode</key>
<string>start</string>
```

有关每个策略的可接受值和行为的详细信息，请参考下面的[策略参考](#vs-code-企业策略参考)。

### 步骤 3：部署策略

现在，你可以使用设备管理解决方案将配置好的策略大规模部署到组织中的所有相关设备。在部署到大规模环境之前，你可以使用本地组策略编辑器在本地 Windows 计算机上手动测试这些策略。

<details name="deploy-policies-win">
<summary>大规模部署策略</summary>

可以使用 [Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune) 或 Active Directory 组策略等产品在组织内大规模集中管理设备策略。这些解决方案允许管理员从中央位置将 ADMX/ADML 文件和策略配置部署到多台设备。

对于 Active Directory 环境，请将 ADMX 和 ADML 文件复制到[中央存储](https://learn.microsoft.com/troubleshoot/windows-client/group-policy/create-and-manage-central-store)，以使策略在整个域中可用。

</details>

<details name="deploy-policies-win">
<summary>在本地计算机上手动测试策略</summary>

如果你想在部署到大规模环境之前，在本地 Windows 计算机上测试这些策略，可以手动安装 ADMX/ADML 文件，并使用本地组策略编辑器配置策略。

请按照以下步骤在本地 Windows 计算机上配置 VS Code 策略：

#### 步骤 1：安装策略定义文件

1. 将 `vscode.admx` 文件复制到 `C:\Windows\PolicyDefinitions`。
1. 将适当的 ADML 文件从 `locales` 子文件夹（例如 `en-US\vscode.adml`）复制到 `C:\Windows\PolicyDefinitions\<你的区域设置>`（例如 `C:\Windows\PolicyDefinitions\en-US`）。

> [!NOTE]
> 你需要管理员权限才能将文件复制到 `PolicyDefinitions` 目录。

#### 步骤 2：打开本地组策略编辑器

1. 按 `Windows+R` 打开“运行”对话框。
1. 输入 `gpedit.msc` 并按 Enter 键打开本地组策略编辑器。
1. 如果用户帐户控制提示，请选择 **是** 以允许该应用进行更改。

#### 步骤 3：导航到 VS Code 策略

VS Code 策略在“计算机配置”和“用户配置”下均可使用：

* **计算机配置** > **管理模板** > **Microsoft VS Code**
* **用户配置** > **管理模板** > **Microsoft VS Code**

> [!TIP]
> 当两者都配置时，计算机级策略优先于用户级策略。

#### 步骤 4：配置策略

1. 选择策略类别（计算机配置或用户配置）。
1. 导航到 **管理模板** > **Microsoft VS Code**。
1. 双击要配置的策略（例如 **更新模式**）。
1. 在策略设置对话框中，选择 **已启用** 以强制执行该策略。
1. 使用可用的选项或文本字段配置策略值。
1. 选择 **确定** 保存更改。
1. 关闭本地组策略编辑器。

该策略将在下次启动 VS Code 时生效。某些策略可能需要重新启动 Windows 才能生效。

</details>

## macOS 配置文件

配置文件管理 macOS 设备上的设置。配置文件是一个 XML 文件（`.mobileconfig`），其中的键/值对与可用策略相对应。

这些配置文件可以使用移动设备管理 (MDM) 解决方案进行部署，也可以在单个设备上手动安装。

### 步骤 1：获取示例配置文件

从 VS Code 1.99 版本开始，每个版本都附带一个示例 `.mobileconfig` 文件。请按照以下步骤在安装了 VS Code 的 macOS 设备上找到该示例文件：

1. 打开 Finder 并导航到 `/Applications`。
1. 右键单击 **Visual Studio Code.app**（或你的 VS Code 变体），然后选择 **显示包内容**。
1. 导航到 `Contents/Resources/app/policies`。
1. 找到示例 `.mobileconfig` 文件（例如 `vscode-sample.mobileconfig`）。

### 步骤 2：配置策略值

1. 将示例 `.mobileconfig` 文件复制到工作位置（例如你的桌面或文稿文件夹）。
1. 在文本编辑器中打开复制的文件（例如 TextEdit、VS Code 或任何 XML 编辑器）。
1. 根据你的需求编辑策略值：

    **字符串策略** - 接受文本值或 JSON 字符串的策略：

    ```xml
    <!-- 示例：允许来自特定发布者的扩展 -->
    <key>AllowedExtensions</key>
    <string>{"microsoft": true, "github": true}</string>

    <!-- 示例：将更新模式设置为特定值 -->
    <key>UpdateMode</key>
    <string>start</string>
    ```

    > [!IMPORTANT]
    > 如果策略值中存在语法错误，该设置将不会被应用。你可以在 VS Code 中检查窗口日志以查看错误（按 `kb(workbench.action.showCommands)` 并输入 **显示窗口日志**）。

    **布尔策略** - 接受 true/false 值的策略：

    ```xml
    <!-- 示例：启用用户反馈 -->
    <key>EnableFeedback</key>
    <true/>

    <!-- 示例：禁用遥测 -->
    <key>EnableTelemetry</key>
    <false/>
    ```

    **删除不需要的策略** - 对于任何你不想强制执行的策略，删除其键和值：

    ```xml
    <!-- 要不强制执行更新模式策略，请删除以下行： -->
    <key>UpdateMode</key>
    <string>start</string>
    ```

有关每个策略的可接受值和行为的详细信息，请参考[策略参考](#vs-code-企业策略参考)。

### 步骤 3：部署策略

现在，你可以使用 MDM 解决方案将配置好的策略大规模部署到组织中的所有相关设备。在部署到大规模环境之前，你可以在本地计算机上手动测试这些策略。

<details name="deploy-policies-mac">
<summary>大规模部署配置文件</summary>

对于跨多台设备的企业部署，请使用以下移动设备管理 (MDM) 解决方案：

* [Microsoft Intune](https://learn.microsoft.com/mem/intune/configuration/device-profiles)
* 带有 MDM 的 Apple Business Manager

有关配置文件的更多信息，请参考 [Apple 文档](https://support.apple.com/guide/mac-help/configuration-profiles-standardize-settings-mh35561/mac)。

</details>

<details name="deploy-policies-mac">
<summary>在本地计算机上手动测试策略</summary>

### 手动配置策略

请按照以下步骤在部署到大规模环境之前，在 macOS 设备上手动测试你的 VS Code 策略配置：

#### 步骤 1：安装配置文件

1. 保存你编辑好的 `.mobileconfig` 文件。
1. 在 Finder 中双击 `.mobileconfig` 文件。
1. 系统设置（或旧版 macOS 上的系统偏好设置）将会打开。
1. 查看配置文件详细信息，然后选择 **安装**（或 **继续**，具体取决于你的 macOS 版本）。
1. 如果出现提示，请使用你的管理员凭据进行身份验证。
1. 在出现提示时确认安装。

#### 步骤 2：验证配置文件安装

1. 打开 **系统设置**（macOS Ventura 及更高版本）或 **系统偏好设置**（早期版本）。
1. 导航到 **隐私与安全性** > **配置文件**（或旧版本上的 **通用** > **设备管理**）。
1. 验证你的 VS Code 配置文件是否出现在列表中。
1. 启动 VS Code 以查看策略生效。

> [!NOTE]
> 策略对新启动的 VS Code 实例立即生效。如果 VS Code 已在运行，你可能需要重新启动它。

#### 删除配置文件

要删除策略并恢复为默认设置：

1. 打开 **系统设置** > **隐私与安全性** > **配置文件**。
1. 选择 VS Code 配置文件。
1. 选择 **移除**（或 **-**）按钮。
1. 使用你的管理员凭据进行身份验证以确认删除。

</details>

## Linux JSON 策略

从 VS Code 1.106 版本开始，你可以通过在 `/etc/vscode/policy.json` 路径下放置一个 JSON 策略文件来在 Linux 设备上配置 VS Code 设置策略。此方法使用简单的 JSON 格式来定义策略值。

这些配置文件可以使用移动设备管理 (MDM) 解决方案进行部署，也可以在单个设备上手动安装。

### 步骤 1：获取示例策略文件

从 VS Code 1.106 版本开始，每个版本都附带一个示例 `.policy.json` 文件。你可以从现有安装中获取该文件，也可以通过下载并解压 VS Code 压缩包来获取。该文件位于 `resources/app/policies` 目录中。

### 步骤 2：配置策略值

1. 将示例 `policy.json` 文件复制到工作位置：

    ```bash
    sudo cp /usr/share/code/resources/app/policies/policy.json /tmp/policy.json
    ```

1. 使用你喜欢的文本编辑器编辑该文件：

    ```bash
    sudo nano /tmp/policy.json
    # 或
    sudo vim /tmp/policy.json
    # 或
    code /tmp/policy.json
    ```

1. 根据你的需求编辑策略值：

    **字符串策略** - 接受文本值或 JSON 字符串的策略：

    ```xml
    <!-- 示例：允许来自特定发布者的扩展 -->
    <key>AllowedExtensions</key>
    <string>{"microsoft": true, "github": true}</string>

    <!-- 示例：将更新模式设置为特定值 -->
    <key>UpdateMode</key>
    <string>start</string>
    ```

    > [!IMPORTANT]
    > 如果策略值中存在语法错误，该设置将不会被应用。你可以在 VS Code 中检查窗口日志以查看错误（按 `kb(workbench.action.showCommands)` 并输入 **显示窗口日志**）。

    **布尔策略** - 接受 true/false 值的策略：

    ```xml
    <!-- 示例：启用用户反馈 -->
    <key>EnableFeedback</key>
    <true/>

    <!-- 示例：禁用遥测 -->
    <key>EnableTelemetry</key>
    <false/>
    ```

    **删除不需要的策略** - 对于任何你不想强制执行的策略，删除其键和值：

    ```xml
    <!-- 要不强制执行更新模式策略，请删除以下行： -->
    <key>UpdateMode</key>
    <string>start</string>
    ```

有关每个策略的可接受值和行为的详细信息，请参考[策略参考](#vs-code-企业策略参考)。

### 步骤 3：部署策略

现在，你可以使用 MDM 解决方案将配置好的策略大规模部署到组织中的所有相关设备。在部署到大规模环境之前，你可以在本地计算机上手动测试这些策略。

<details name="deploy-policies-linux">
<summary>大规模部署策略</summary>

对于跨多台设备的企业 Linux 部署，请使用 Ansible、Puppet、Chef 或 Salt 等配置管理工具来部署 `policy.json` 文件。

这些工具允许管理员在组织内所有受管理的 Linux 设备上远程部署、更新和删除策略。

</details>

<details name="deploy-policies-linux">
<summary>在本地计算机上手动测试策略</summary>

#### 步骤 1：复制策略文件

1. 确保 `/etc/vscode` 目录存在：

    ```bash
    sudo mkdir -p /etc/vscode
    ```

    > [!NOTE]
    > 你需要 root 或 sudo 权限才能在 `/etc/vscode` 中创建目录并管理策略文件。

1. 将编辑好的策略文件复制到 `/etc/vscode/` 系统位置：

    ```bash
    sudo cp /tmp/policy.json /etc/vscode/policy.json
    ```

    设置适当的权限：

    ```bash
    sudo chmod 644 /etc/vscode/policy.json
    sudo chown root:root /etc/vscode/policy.json
    ```

#### 步骤 2：验证策略安装

1. 启动 VS Code（如果已在运行，请重新启动）。
1. 打开 **文件** > **首选项** > **设置**（或按 `Ctrl+,`）。
1. 查找与你配置的策略相对应的设置——它们应该显示为“由你的组织管理”或带有锁定图标。
1. 将鼠标悬停在受管理的设置上，查看它们是否受策略控制。

> [!TIP]
> 你可以通过检查 VS Code 的日志或尝试更改受管理的设置来验证策略文件是否被读取（更改将被阻止）。

#### 删除策略

要删除所有策略并恢复为默认设置，请删除 `/etc/vscode/policy.json` 文件并重新启动 VS Code。

</details>

## 验证策略强制执行

在将企业策略部署到设备后，你可以使用 **Developer: Policy Diagnostics** 命令来确认 VS Code 正在读取并强制执行这些策略。该命令会打开一个新的无标题 Markdown 文档，其中包含设备上当前策略状态的报告。它在 Windows、macOS 和 Linux 上的工作方式相同。

该报告包含以下部分：

* **系统信息**：VS Code 产品名称、版本和提交，用于将报告与特定构建匹配。
* **帐户信息**：已登录的默认帐户的详细信息，包括帐户提供程序返回的原始帐户级策略数据。
* **帐户策略门**：控制 AI 功能的[已批准的 GitHub 组织门](/docs/enterprise/ai-settings.md#restrict-ai-features-to-approved-github-organizations)的状态。可能的状态有 `inactive`、`satisfied` 和 `restricted`。当状态为 `restricted` 时，报告还会列出原因，例如 `noAccount`、`wrongProvider`、`orgNotApproved` 或 `policyNotResolved`。
* **策略控制的设置**：两个表格，列出了每个已注册设置的策略状态：
    * **已应用的策略**：当前被策略覆盖的设置，包括设置键、策略名称、策略来源、默认值、当前值以及策略强制执行的值。
    * **未应用的策略**：当前未被强制执行的已注册策略。使用此表格来检测部署错误，例如拼写错误的键或未被读取的策略文件。
* **身份验证信息**：已注册的身份验证提供程序、会话、帐户以及有权访问每个帐户的扩展。

> [!CAUTION]
> 该报告可能包含敏感信息，例如帐户标识符、会话详细信息以及有权访问每个帐户的扩展列表。请在共享报告之前查看其内容。

> [!TIP]
> 如果 **帐户策略门** 状态为 `policyNotResolved`，请运行 **Developer: Sync Account Policy** 命令以强制刷新帐户端策略数据，然后重新生成报告。

## VS Code 企业策略参考

下表列出了 VS Code 中所有可用的企业策略。

{$ Content $}

> [!NOTE]
> 如果你想实施更多策略，请在 [VS Code GitHub 仓库](https://github.com/microsoft/vscode/issues)中提交问题。团队将确定是否已有相应的设置来控制该行为，或者是否需要创建新的设置和策略。
