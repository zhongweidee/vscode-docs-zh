---
ContentId: 9b3e5c2d-1a4f-6e8b-c7d9-0f2a3b4c5d6e
DateApproved: 6/10/2026
MetaDescription: 了解如何在企业环境中集中管理 VS Code 遥测设置，包括遥测级别和反馈选项。
---

# 在企业环境中管理遥测

VS Code 收集遥测数据以帮助了解产品的使用情况并改进产品。组织可以集中管理遥测设置，以控制在其开发团队中收集哪些数据。

本文介绍 IT 管理员如何通过[企业策略](/docs/enterprise/policies.md)来配置遥测。

## 遥测相关策略

VS Code 提供了以下用于管理遥测的策略：

| 策略              | 描述                             | VS Code 设置                          | 自版本起可用 |
|-------------------|----------------------------------|---------------------------------------|--------------|
| `TelemetryLevel`  | 指定遥测数据级别                  | `setting(telemetry.telemetryLevel)`   | 1.99         |
| `EnableFeedback`  | 配置反馈机制（问题报告器和调查）   | `setting(telemetry.feedback.enabled)` | 1.99         |

了解如何将[部署策略](/docs/enterprise/policies.md)部署到组织内的设备。

## 配置遥测级别

`TelemetryLevel` 策略控制 VS Code 遥测、第一方扩展遥测以及参与的第三方扩展遥测。

> [!NOTE]
> 某些第三方扩展可能不遵循此设置。请查阅特定扩展的文档以了解其遥测报告行为。

### 遥测级别选项

| 值       | 崩溃报告 | 错误遥测 | 使用数据 |
|----------|:--------:|:--------:|:--------:|
| `all`    | ✓        | ✓        | ✓        |
| `error`  | ✓        | ✓        | -        |
| `crash`  | ✓        | -        | -        |
| `off`    | -        | -        | -        |

**数据类型：**

* **崩溃报告** - VS Code 崩溃时的诊断信息
* **错误遥测** - 有关不会导致应用程序崩溃的错误信息
* **使用数据** - 有关功能使用情况和性能的信息

### 禁用遥测

要在整个组织内禁用所有遥测，请将 `TelemetryLevel` 策略设置为 `off`：

**策略值**：

```text
off
```

> [!IMPORTANT]
> 将遥测设置为 `off` 或 `error` 会禁用 A/B 实验。这可能会延迟新功能向用户的推送，直到这些功能正式发布。

### 仅启用错误遥测

要仅收集崩溃报告和错误遥测，同时禁用使用数据，请将 `TelemetryLevel` 策略设置为 `error`：

**策略值**：

```text
error
```

## 配置反馈机制

`EnableFeedback` 策略控制用户是否可以访问 VS Code 中的反馈机制，例如问题报告器和调查。

要禁用反馈机制，请将 `EnableFeedback` 策略设置为 `false`：

**策略值**：

```text
false
```

## 扩展遥测

VS Code 扩展可能会收集自己的遥测数据。`setting(telemetry.telemetryLevel)` 设置会影响第一方 Microsoft 扩展和参与的第三方扩展。但是，某些扩展可能不遵循此设置，并可能具有自己的遥测配置。

请查阅组织内所用扩展的文档，以了解其遥测实践。

## 用于代理交互的 OpenTelemetry 支持

VS Code 中的 [Copilot Chat](/docs/agent-native/overview.md) 可以通过 [OpenTelemetry](https://opentelemetry.io/)（OTel）导出追踪、指标和事件，让您实时了解代理交互、LLM 调用、工具执行和令牌使用情况。您可以将这些遥测数据与任何兼容 OTel 的后端一起使用。

详细了解如何[使用 OpenTelemetry 监控代理交互](https://github.com/microsoft/vscode-copilot-chat/blob/main/docs/monitoring/agent_monitoring.md)。

## GDPR 合规性

VS Code 设计为符合 GDPR 要求。当用户禁用遥测时，VS Code 将停止发送后续的遥测数据。有关 GDPR 与 VS Code 的更多信息，请参阅[遥测文档](/docs/configure/telemetry.md#gdpr-and-vs-code)。

## 相关资源

* [企业策略参考](/docs/enterprise/policies.md) - 完整的企业策略列表
* [VS Code 中的遥测](/docs/configure/telemetry.md) - 了解遥测数据收集
* [隐私声明](https://go.microsoft.com/fwlink/?LinkID=528096&clcid=0x409) - Microsoft 隐私声明
