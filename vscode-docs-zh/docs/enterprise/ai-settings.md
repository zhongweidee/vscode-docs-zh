---
ContentId: f8a9c3d2-4e7b-5f1a-b6c8-9d0e2f3a7b4c
DateApproved: 6/10/2026
MetaDescription: 了解如何在企业环境中集中管理 VS Code 的 AI 设置，包括代理模式、MCP 服务器和工具审批。
---

# 在企业环境中管理 AI 设置

VS Code 通过 GitHub Copilot 提供 AI 驱动的开发能力，包括代理模式、MCP 服务器和聊天工具。组织可以集中管理这些功能，以控制 AI 行为、强制执行安全策略并在开发团队中保持合规性。

本文涵盖了 IT 管理员可以通过[企业策略](/docs/enterprise/policies.md)管理的 AI 相关设置。

用户可以通过 VS Code 设置来控制 AI 功能的行为。组织可以通过设备管理解决方案部署企业策略来强制执行特定配置。这些策略会覆盖受管设备上的用户配置设置。

了解如何[为 VS Code 部署策略](/docs/enterprise/policies.md)到组织的设备。

## 将 AI 功能限制为已批准的 GitHub 组织

组织可以要求开发人员在激活 VS Code 中的 AI 功能之前，先登录属于已批准组织的 GitHub 账户。这使企业能够确保其 GitHub 组织设置的账户级策略（例如，Copilot 内容排除或模型可用性）在聊天、代理或内联建议可用之前生效。

要启用此限制，请将 `ChatApprovedAccountOrganizations` 策略设置为 GitHub 组织登录名的 JSON 数组。例如，`["contoso", "contoso-research"]`。使用通配符值 `["*"]` 允许任何已登录的 GitHub 账户。

当设置此策略后，AI 功能将被限制，直到以下两个条件同时满足：

* 用户登录的 GitHub 账户是已批准组织之一的成员。
* 账户级策略数据已解析。

当未设置此策略时，AI 功能不受此限制。

此策略是故障关闭的：如果用户未登录、使用非 GitHub 账户登录或登录的 GitHub 账户不属于已批准的组织，AI 功能将保持禁用状态。

IT 管理员可以随时使用**开发者：策略诊断**命令验证限制状态，该命令包含**账户策略限制**部分。有关更多信息，请参阅[验证策略强制执行](/docs/enterprise/policies.md#verify-policy-enforcement)。

## 启用或禁用代理的使用

[代理](/docs/agents/overview.md)使 AI 能够自主执行任务，如编辑文件、运行终端命令和使用工具。代理使开发人员能够提供高层需求，并让 AI 助手分析、规划和执行实现该目标所需的步骤。

要完全禁用代理，请将 `ChatAgentMode` 策略设置为 `false`。这将配置 VS Code 中的 `setting(chat.agent.enabled)` 设置。

应用此策略后，聊天视图的代理下拉菜单中将不显示**代理**选项。开发人员仍可以使用[聊天或编辑模式](/docs/chat/chat-overview.md)进行代码解释和文件编辑，但无法使用自主代码生成和任务执行功能。

## 启用或禁用钩子

[钩子](/docs/agent-customization/hooks.md)使您能够在代理会话的关键生命周期点执行自定义 shell 命令，例如在工具调用之前或之后、会话开始时或代理停止时。钩子可以自动化工作流、强制执行安全策略并控制代理行为。

要完全禁用钩子，请将 `ChatHooks` 策略设置为 `false`。这将配置 VS Code 中的 `setting(chat.useHooks)` 设置。

应用此策略后，钩子配置将被忽略，代理会话期间不会执行任何钩子命令。

## 启用或禁用扩展语言工具

[聊天中的工具](/docs/chat/chat-tools.md)通过专用功能扩展了 AI 助手的能力。这些工具可以来自内置功能、模型上下文协议（MCP）服务器或第三方扩展。

第三方扩展可以使用[语言模型工具 API](/api/extension-guides/ai/tools) 贡献与聊天集成的工具。

要阻止开发人员使用扩展贡献的工具，同时仍允许内置工具和 MCP 工具，请将 `ChatAgentExtensionTools` 策略设置为 `false`。这将配置 VS Code 中的 `setting(chat.extensionTools.enabled)` 设置。

聊天代理还可以使用浏览器工具在集成浏览器中打开和交互网页。要禁用聊天代理的浏览器工具，请将 `BrowserChatTools` 策略设置为 `false`。这将配置 VS Code 中的 `setting(workbench.browser.enableChatTools)` 设置。

要禁用聊天中的代理插件集成，请将 `ChatPluginsEnabled` 策略设置为 `false`。这将配置 VS Code 中的 `setting(chat.plugins.enabled)` 设置。

## 管理代理插件和市场

[代理插件](/docs/agent-customization/agent-plugins.md)是开发人员从插件市场发现和安装的预打包代理自定义捆绑包。组织可以集中控制哪些插件和市场可用，而不是让每个开发人员各自进行本地配置。

VS Code 从与驱动 [Copilot CLI 的企业插件标准](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/configure-enterprise-plugin-standards)相同的 Copilot 企业设置文件中读取这些策略，因此单个策略定义同时适用于两个客户端。您也可以通过现有的设备管理解决方案进行配置。

> [!NOTE]
> 这些插件策略是实验性的。

以下策略可用：

* 要允许列出开发人员可以使用的插件 ID，请设置 `ChatEnabledPlugins` 策略。这将配置 VS Code 中的 `setting(chat.plugins.enabledPlugins)` 设置。组织明确启用或禁用列表中的每个插件。
* 要添加额外的插件市场，请设置 `ChatExtraMarketplaces` 策略。这将配置 VS Code 中的 `setting(chat.plugins.extraMarketplaces)` 设置。此策略没有面向用户的设置，只能通过策略进行配置。
* 要仅信任通过策略提供的市场，请将 `ChatStrictMarketplaces` 策略设置为 `true`。这将配置 VS Code 中的 `setting(chat.plugins.strictMarketplaces)` 设置。启用此策略后，开发人员通过 `setting(chat.plugins.marketplaces)` 添加的市场将不受信任。

被策略阻止的插件在扩展视图中仍然可见，但显示为已禁用。由策略管理的市场在市场选择器中带有相应标记。

IT 管理员可以使用**开发者：策略诊断**命令验证应用的插件策略，该命令包含**托管设置**部分。有关更多信息，请参阅[验证策略强制执行](/docs/enterprise/policies.md#verify-policy-enforcement)。

## 配置 MCP 服务器访问

[模型上下文协议（MCP）服务器](/docs/agent-customization/mcp-servers.md)通过外部工具和服务扩展聊天功能。组织可以通过 GitHub 组织设置和 VS Code 策略来控制开发人员可以使用哪些 MCP 服务器。

### 限制 MCP 服务器来源

`ChatMCP` 策略控制可以从哪些来源安装 MCP 服务器。这将配置 VS Code 中的 `setting(chat.mcp.access)` 设置。

支持以下值：

| 值        | 描述                                |
|-----------|-------------------------------------|
| `all`     | 开发人员可以从任何来源运行 MCP 服务器 |
| `registry`| 开发人员只能从配置的注册表运行 MCP 服务器 |
| `none`    | MCP 服务器支持已禁用                 |

### 配置自定义 MCP 注册表

您可以为组织托管私有 MCP 服务器注册表，并通过 `McpGalleryServiceUrl` 策略配置 VS Code 使用它。这使您能够：

* 提供经过审核的已批准 MCP 服务器列表
* 为组织托管内部 MCP 服务器
* 阻止访问公共 GitHub MCP 注册表

配置后，开发人员在扩展视图的搜索字段中输入 `@mcp` 时，会看到来自自定义注册表的 MCP 服务器。

拥有 GitHub Copilot Enterprise 或 Business 的组织也可以通过 [GitHub 组织设置](https://docs.github.com/en/copilot/how-tos/administer-copilot/configure-mcp-server-access)配置 MCP 服务器访问。

## 配置代理工具审批

代理工具可以执行修改文件、运行命令或访问外部服务的操作。VS Code 包含对潜在风险操作的审批提示。组织可以强制执行更严格的审批要求或完全禁用自动审批。

了解更多关于 VS Code 中[工具审批](/docs/agents/approvals.md#tool-approval)的信息。

### 禁用全局自动审批

`ChatToolsAutoApprove` 策略控制全局自动审批设置。启用后，AI 助手无需手动审批即可执行所有工具。出于安全原因，不推荐这样做。

要阻止开发人员启用全局自动审批，请将 `ChatToolsAutoApprove` 策略设置为 `false`。这将配置 VS Code 中的 `setting(chat.tools.global.autoApprove)` 设置，并在聊天视图的[权限选择器](/docs/agents/approvals.md#permission-levels)中隐藏**跳过审批**和**自动驾驶**选项。

> [!CAUTION]
> 全局自动审批绕过所有工具调用的安全提示。强烈建议在企业环境中禁用此功能。

### 要求对特定工具进行手动审批

`ChatToolsEligibleForAutoApproval` 策略控制哪些工具可以被自动审批。设置为 `false` 的工具始终需要手动审批，用户无法将其设为自动审批。

使用一个列出工具名称及其审批资格的 JSON 对象来配置此策略。这将配置 VS Code 中的 `setting(chat.tools.eligibleForAutoApproval)` 设置。

以下 JSON 片段显示了一个示例配置，该配置要求对任务执行、URL 获取和终端命令进行手动审批：

```json
{
    "runTask": false,
    "fetch": false,
    "runInTerminal": false
}
```

### 配置终端自动审批

`ChatToolsTerminalEnableAutoApprove` 策略专门控制终端命令的基于规则的自动审批系统。启用后，VS Code 会应用一组规则来自动批准安全命令，同时对潜在危险的命令提示审批。

要完全禁用终端自动审批，请将该策略设置为 `false`。这将配置 VS Code 中的 `setting(chat.tools.terminal.enableAutoApprove)` 设置。

### 配置代理沙箱

组织应建议开发人员启用[代理沙箱](/docs/agents/concepts/trust-and-safety.md#agent-sandboxing)，尤其是在使用自动审批或自动驾驶模式的环境中。代理沙箱使用操作系统级隔离来限制代理执行命令的文件系统和网络访问，提供比单独的审批规则更强大的保护。

`ChatAgentSandboxEnabled` 策略控制代理沙箱是启用还是禁用。这将配置 VS Code 中的 `setting(chat.agent.sandbox.enabled)` 设置。

设置为 `true` 时，代理执行的终端命令在权限受限的沙箱环境中运行。设置为 `false` 时，不应用沙箱。

## 配置代理网络过滤

网络过滤限制代理工具（获取工具、集成浏览器）在聊天会话期间可以访问哪些域。启用后，代理只能访问配置的域列表中明确允许的域。

### 启用网络过滤

`ChatAgentNetworkFilter` 策略为代理工具启用网络域过滤。这将配置 VS Code 中的 `setting(chat.agent.networkFilter)` 设置。

当策略设置为 `true` 时，代理工具的网络访问将根据允许和拒绝的域列表受到限制。当设置为 `false`（默认值）时，不应用网络过滤。

当两个域列表都为空且过滤已启用时，代理工具的所有网络访问都将被阻止。

### 配置允许的域

`ChatAgentAllowedNetworkDomains` 策略控制代理工具可以访问哪些域。这将配置 VS Code 中的 `setting(chat.agent.allowedNetworkDomains)` 设置。

提供域模式列表。支持通配符，例如 `*.example.com`。当同时启用了[代理沙箱](/docs/agents/concepts/trust-and-safety.md#agent-sandboxing)时，这些域规则还适用于代理执行的终端命令。

### 配置拒绝的域

`ChatAgentDeniedNetworkDomains` 策略控制代理工具被阻止访问哪些域。这将配置 VS Code 中的 `setting(chat.agent.deniedNetworkDomains)` 设置。

拒绝的域始终优先于允许的域。支持通配符，例如 `*.example.com`。

## 配置代理网络过滤

网络过滤限制代理工具（获取工具、集成浏览器）在聊天会话期间可以访问哪些域。启用后，代理只能访问配置的域列表中明确允许的域。

### 启用网络过滤

`ChatAgentNetworkFilter` 策略为代理工具启用网络域过滤。这将配置 VS Code 中的 `setting(chat.agent.networkFilter)` 设置。

当策略设置为 `true` 时，代理工具的网络访问将根据允许和拒绝的域列表受到限制。当设置为 `false`（默认值）时，不应用网络过滤。

当两个域列表都为空且过滤已启用时，代理工具的所有网络访问都将被阻止。

### 配置允许的域

`ChatAgentAllowedNetworkDomains` 策略控制代理工具可以访问哪些域。这将配置 VS Code 中的 `setting(chat.agent.allowedNetworkDomains)` 设置。

提供域模式列表。支持通配符，例如 `*.example.com`。当同时启用了[代理沙箱](/docs/agents/concepts/trust-and-safety.md#agent-sandboxing)时，这些域规则还适用于代理执行的终端命令。

### 配置拒绝的域

`ChatAgentDeniedNetworkDomains` 策略控制代理工具被阻止访问哪些域。这将配置 VS Code 中的 `setting(chat.agent.deniedNetworkDomains)` 设置。

拒绝的域始终优先于允许的域。支持通配符，例如 `*.example.com`。

## 配置 Copilot 代码审查

Copilot 代码审查支持 AI 驱动的代码更改审查。组织可以控制对这些功能的访问。

`CopilotReviewSelection` 策略控制开发人员是否可以请求审查编辑器中选定的代码。这将配置 VS Code 中的 `setting(github.copilot.chat.reviewSelection.enabled)` 设置。

`CopilotReviewAgent` 策略控制对 Copilot 代码审查代理的访问，用于审查拉取请求和已更改的文件。这将配置 VS Code 中的 `setting(github.copilot.chat.reviewAgent.enabled)` 设置。

## 配置下一编辑建议

下一编辑建议（NES）根据最近的更改提出下一个编辑建议，帮助开发人员更快地应用重复或相关的修改。

要禁用下一编辑建议，请将 `CopilotNextEditSuggestions` 策略设置为 `false`。这将配置 VS Code 中的 `setting(github.copilot.nextEditSuggestions.enabled)` 设置。

## 启用或禁用 Claude Agent

Claude Agent 会话让开发人员可以直接在编辑器中启动和恢复由 Anthropic 的 Claude Agent SDK 驱动的代理编码会话，使用他们现有的 Copilot 订阅。

要禁用 Claude Agent 会话，请将 `Claude3PIntegration` 策略设置为 `false`。这将配置 VS Code 中的 `setting(github.copilot.chat.claudeAgent.enabled)` 设置。

## 配置组织级 AI 自定义

GitHub Copilot 支持在 GitHub 组织级别定义自定义指令和自定义代理。当组织成员在组织拥有的仓库中使用 VS Code 工作时，这些自定义会自动提供给所有成员。

### 组织级自定义指令

组织管理员可以定义适用于其组织中所有仓库的自定义指令。这些指令确保团队间 AI 行为的一致性，例如强制执行编码标准、安全指南或文档要求。

当开发人员将 `setting(github.copilot.chat.organizationInstructions.enabled)` 设置为 `true` 时，VS Code 会自动检测并将组织级指令应用于所有聊天请求。这些指令会与个人和工作区指令一起显示在**聊天指令**菜单中。

了解如何在 GitHub 文档中[为组织添加自定义指令](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-organization-instructions)。

### 组织级自定义代理

组织还可以定义在所有仓库间共享的自定义代理。这些代理提供专门的 AI 角色，配备特定工具和针对您组织工作流定制的指令。

当开发人员将 `setting(github.copilot.chat.customAgents.showOrganizationAndEnterpriseAgents)` 设置为 `true` 时，组织级代理会与内置和个人代理一起显示在代理下拉菜单中。

了解如何在 GitHub 文档中[为组织创建自定义代理](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)。

> [!NOTE]
> 组织级自定义通过 GitHub 组织设置管理，而不是 VS Code 企业策略。开发人员个人通过其 VS Code 设置控制是否使用这些自定义。

## 安全注意事项

AI 驱动的开发功能可以以用户级权限自主执行操作。请参阅[安全文档](/docs/agents/security.md)了解 AI 安全注意事项和最佳实践的全面概述。

对于代理以较高自主性运行的环境（自动审批或自动驾驶模式），建议开发人员启用[代理沙箱](/docs/agents/concepts/trust-and-safety.md#agent-sandboxing)或在[开发容器](/docs/devcontainers/containers.md)中工作，以限制意外或恶意操作的影响。

### 代理部署选项和数据驻留

代理可以根据代理类型在不同的基础设施上运行，每种选项具有不同的数据驻留和访问控制特性：

* **本地代理和 Copilot CLI** 在开发人员的机器上运行，在本地处理数据。
* **云代理** 在 GitHub 的基础设施上运行。代码和对话数据受 GitHub Copilot 数据处理策略的约束。

有关 GitHub Copilot 的安全性、隐私、合规性和透明度信息，请参阅 [GitHub Copilot 信任中心 FAQ](https://copilot.github.trust.page/faq)。

## 相关资源

* [企业策略参考](/docs/enterprise/policies.md) - 企业策略完整列表
* [在聊天中使用工具](/docs/chat/chat-tools.md) - 了解工具在 VS Code 聊天中的工作方式
* [VS Code 中的 MCP 服务器](/docs/agent-customization/mcp-servers.md) - 配置和使用 MCP 服务器
* [自定义指令](/docs/agent-customization/custom-instructions.md) - 为 AI 响应定义自定义指令
* [自定义代理](/docs/agent-customization/custom-agents.md) - 创建自定义 AI 角色和工作流
* [AI 安全注意事项](/docs/agents/security.md) - AI 功能的安全最佳实践
* [GitHub Copilot 信任中心 FAQ](https://copilot.github.trust.page/faq) - 安全性、隐私和合规性信息
