---
ContentId: a3e1f7c2-8d4b-4f9a-b6e5-2c8d3f1a9b7e
DateApproved: 6/10/2026
MetaDescription: Visual Studio Code 中 MCP 服务器配置格式、命令和设置的参考。
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- mcp
- model context protocol
- mcp.json
- configuration
- sandbox
- tools
- copilot
- reference
- ai
---
# MCP 配置参考

本文提供 MCP 服务器配置文件的格式、相关命令和 VS Code 设置的参考。有关添加和管理 MCP 服务器的信息，请参阅[添加和管理 MCP 服务器](/docs/agent-customization/mcp-servers.md)。

## 配置文件

MCP 服务器配置存储在 `mcp.json` JSON 文件中。此文件可以位于工作区（`.vscode/mcp.json`）或[用户配置文件](/docs/configure/profiles.md)中。VS Code 为该配置文件提供了 IntelliSense 支持。

### 配置结构

配置文件有三个主要部分：

* **`"servers": {}`**：一个对象，将服务器名称映射到其配置。每个键是服务器名称，值是对应的服务器配置对象。根据服务器类型，需要不同的字段。

* **`"inputs": []`**：一个可选的输入变量定义数组，用于存储敏感信息，例如 API 密钥。

* **`"sandbox": {}`**：一个可选对象，用于定义沙箱化服务器的文件系统和网络访问规则。请参阅[沙箱配置](#沙箱配置)。仅适用于 macOS 和 Linux。

您可以在服务器配置中使用[预定义变量](/docs/reference/variables-reference.md)，例如引用工作区文件夹（`${workspaceFolder}`）。

### 标准 I/O（stdio）服务器

对通过标准输入和输出流进行通信的服务器使用此配置。这是本地运行的 MCP 服务器最常见的类型。

| 字段 | 是否必需 | 描述 | 示例 |
|-------|----------|-------------|----------|
| `type` | 是 | 服务器连接类型 | `"stdio"` |
| `command` | 是 | 启动服务器可执行文件的命令。必须在系统路径中可用或包含完整路径。 | `"npx"`、`"node"`、`"python"`、`"docker"` |
| `args` | 否 | 传递给命令的参数数组 | `["server.py", "--port", "3000"]` |
| `cwd` | 否 | 服务器命令的工作目录。在工作区中运行时默认为工作区文件夹。 | `"${workspaceFolder}"` |
| `env` | 否 | 服务器的环境变量。值可以是字符串、数字或 null。 | `{"API_KEY": "${input:api-key}"}` |
| `envFile` | 否 | 要加载更多变量的环境文件路径 | `"${workspaceFolder}/.env"` |
| `dev` | 否 | 开发模式设置，用于监视文件更改和调试服务器。请参阅[开发模式](#开发模式)。 | `{"watch": "src/**/*.ts"}` |
| `sandboxEnabled` | 否 | 在沙箱环境中运行服务器。仅支持 macOS 和 Linux。 | `true` |

> [!NOTE]
> 当将 Docker 与 stdio 服务器一起使用时，不要使用 detach 选项（`-d`）。服务器必须在前台运行才能与 VS Code 通信。

<details>
<summary>本地服务器配置示例</summary>

此示例展示了一个基本的本地 MCP 服务器使用 `npx` 的最小配置：

```json
{
    "servers": {
        "memory": {
            "command": "npx",
            "args": [
            "-y",
            "@modelcontextprotocol/server-memory"
            ]
        }
    }
}
```

</details>

### 沙箱配置

您可以为本地运行的 stdio MCP 服务器启用沙箱功能，以限制其对文件系统和网络的访问。沙箱化服务器只能访问您明确允许的文件系统路径和网络域。沙箱功能仅适用于 macOS 和 Linux。

要为某个服务器启用沙箱功能，请在其配置中设置 `"sandboxEnabled": true`。然后，定义一个顶层的 `sandbox` 对象来指定文件系统和网络访问规则。`sandbox` 对象与 `servers` 和 `inputs` 同级，其规则适用于所有沙箱化服务器。当沙箱化服务器需要访问但当前规则不允许时，请检查服务器输出中的错误消息并相应地更新 `sandbox` 配置。

> [!NOTE]
> 启用沙箱功能后，工具确认将自动批准，因为服务器在受控环境中运行。

`sandbox` 对象支持以下属性：

| 属性 | 类型 | 描述 |
|----------|------|-------------|
| `filesystem.allowWrite` | string[] | 允许服务器写入的文件路径。 |
| `filesystem.denyRead` | string[] | 不允许服务器读取的文件路径。 |
| `filesystem.denyWrite` | string[] | 不允许服务器写入的文件路径。 |
| `network.allowedDomains` | string[] | 允许服务器访问的域。支持通配符，例如 `*.example.com`。 |
| `network.deniedDomains` | string[] | 不允许服务器访问的域。 |

您可以在文件系统路径值中使用[预定义变量](/docs/reference/variables-reference.md)，例如 `${workspaceFolder}`。

<details>
<summary>沙箱配置示例</summary>

此示例启用沙箱功能，并授予工作区的写入访问权限，拒绝读取 `.ssh` 目录，并允许对特定域的网络访问：

```json
{
    "servers": {
        "myServer": {
            "type": "stdio",
            "command": "npx",
            "args": ["-y", "@example/mcp-server"],
            "sandboxEnabled": true
        }
    },
    "sandbox": {
        "filesystem": {
            "allowWrite": ["${workspaceFolder}"],
            "denyRead": ["${userHome}/.ssh"]
        },
        "network": {
            "allowedDomains": ["api.example.com", "*.cdn.example.com"]
        }
    }
}
```

</details>

### HTTP 和服务器发送事件（SSE）服务器

对通过 HTTP 进行通信的服务器使用此配置。VS Code 首先尝试 HTTP Stream 传输，如果 HTTP 不受支持，则回退到 SSE。

| 字段 | 是否必需 | 描述 | 示例 |
|-------|----------|-------------|----------|
| `type` | 是 | 服务器连接类型 | `"http"`、`"sse"` |
| `url` | 是 | 服务器的 URL | `"http://localhost:3000"`、`"https://api.example.com/mcp"` |
| `headers` | 否 | 用于身份验证或配置的 HTTP 头 | `{"Authorization": "Bearer ${input:api-token}"}` |
| `oauth` | 否 | 用于与服务器进行身份验证的 OAuth 配置 | `{"clientId": "example-client-id"}` |

除了可通过网络访问的服务器外，VS Code 还可以通过 Unix 套接字或 Windows 命名管道连接到监听 HTTP 流量的 MCP 服务器，通过指定格式为 `unix:///path/to/server.sock` 的套接字路径或在 Windows 上使用 `pipe:///pipe/named-pipe`。您可以通过使用 URL 片段指定子路径，例如 `unix:///tmp/server.sock#/mcp/subpath`。

`oauth` 对象支持以下属性：

| 属性 | 类型 | 是否必需 | 描述 |
|----------|------|----------|-------------|
| `clientId` | string | 是 | 与服务器进行身份验证时使用的 OAuth 客户端 ID。 |
| `enterpriseManaged` | boolean | 否 | （预览）通过由 `mcp.enterpriseManagedAuth.idp` 设置配置的企业单点登录（SSO）颁发者进行身份验证，使用 OAuth 身份断言授权授予（ID-JAG）。完成一次性登录后，后续的企业管理服务器将静默连接。默认为 `false`。 |

> [!NOTE]
> 配置了 `oauth` 后，VS Code 会自动处理 OAuth 流程。首次连接到服务器时，会打开一个浏览器窗口进行授权。

<details>
<summary>远程服务器配置示例</summary>

此示例展示了一个无需身份验证的远程 MCP 服务器的最小配置：

```json
{
    "servers": {
        "context7": {
            "type": "http",
            "url": "https://mcp.context7.com/mcp"
        }
    }
}
```

</details>

<details>
<summary>带 OAuth 的 HTTP 服务器示例</summary>

此示例展示了使用 OAuth 进行身份验证的 MCP 服务器的配置。首次使用时，VS Code 会打开一个浏览器窗口以完成 OAuth 流程。

```json
{
    "servers": {
        "slack": {
            "type": "http",
            "url": "https://mcp.slack.com/mcp",
            "oauth": {
                "clientId": "example-client-id"
            }
        }
    }
}
```

</details>

### 敏感数据的输入变量

输入变量允许您为配置值定义占位符，避免在服务器配置中直接硬编码敏感信息（如 API 密钥或密码）。

当您使用 `${input:variable-id}` 引用输入变量时，VS Code 会在服务器首次启动时提示您输入该值。然后该值将被安全存储以供后续使用。了解有关 VS Code 中[输入变量](/docs/reference/variables-reference.md#input-variables)的更多信息。

每个输入变量都有一个 `type`，决定 VS Code 如何提示输入该值。支持以下输入类型：

* `promptString`：打开一个输入框，要求用户输入自由文本值。
* `pickString`：显示一个选项列表供用户选择。
* `command`：运行一个命令并将其结果用作输入值。

**通用属性：**

| 字段 | 是否必需 | 描述 | 示例 |
|-------|----------|-------------|---------|
| `type` | 是 | 输入提示的类型：`promptString`、`pickString` 或 `command` | `"promptString"` |
| `id` | 是 | 在服务器配置中引用的唯一标识符 | `"api-key"`、`"database-url"` |

**`promptString` 属性：**

| 字段 | 是否必需 | 描述 | 示例 |
|-------|----------|-------------|---------|
| `description` | 是 | 用户友好的提示文本 | `"GitHub Personal Access Token"` |
| `default` | 否 | 输入的默认值 | `"https://localhost"` |
| `password` | 否 | 隐藏键入的输入（默认：false） | 对于 API 密钥和密码设置为 `true` |

**`pickString` 属性：**

| 字段 | 是否必需 | 描述 | 示例 |
|-------|----------|-------------|---------|
| `description` | 是 | 用户友好的提示文本 | `"选择一个环境"` |
| `options` | 是 | 可供选择的选项数组。每个选项可以是一个字符串，或具有 `label` 和 `value` 属性的对象。 | `["dev", "prod"]` |
| `default` | 否 | 输入的默认值 | `"dev"` |

**`command` 属性：**

| 字段 | 是否必需 | 描述 | 示例 |
|-------|----------|-------------|---------|
| `command` | 是 | 要运行以获取输入值的命令 ID | `"myExtension.getApiKey"` |
| `args` | 否 | 传递给命令的参数。可以是字符串、数组或对象。 | `{ "scope": "global" }` |

<details>
<summary>带输入变量的服务器配置示例</summary>

此示例配置了一个需要 API 密钥的本地服务器：

```json
{
    "inputs": [
        {
            "type": "promptString",
            "id": "perplexity-key",
            "description": "Perplexity API Key",
            "password": true
        }
    ],
    "servers": {
        "perplexity": {
            "type": "stdio",
            "command": "npx",
            "args": [
                "-y",
                "server-perplexity-ask"
            ],
            "env": {
                "PERPLEXITY_API_KEY": "${input:perplexity-key}"
            }
        }
    }
}
```

</details>

### 开发模式

您可以通过在服务器配置中添加 `dev` 键来为 MCP 服务器启用_开发模式_。这是一个包含两个属性的对象：

* `watch`：一个 glob 模式，或 glob 模式数组，用于监视文件更改以重启 MCP 服务器。适用于所有服务器类型。
* `debug`：使您能够为 MCP 服务器设置调试器。目前，VS Code 支持调试 Node.js 和 Python MCP 服务器。仅适用于 stdio 服务器。

在 MCP 开发指南中了解更多关于 [MCP 开发模式](/api/extension-guides/ai/mcp.md#mcp-development-mode-in-vs-code) 的信息。

### 服务器命名规范

在定义 MCP 服务器时，请遵循以下服务器名称的命名规范：

* 对服务器名称使用小驼峰命名法，例如 "uiTesting" 或 "githubIntegration"
* 避免使用空格或特殊字符
* 为每个服务器使用唯一的名称以避免冲突
* 使用反映服务器功能或品牌的描述性名称，例如 "github" 或 "database"

## 命令

下表列出了命令面板（`kb(workbench.action.showCommands)`）中可用的 MCP 相关命令。

| 命令 | 描述 |
|---------|-------------|
| **MCP: 添加服务器** | 向工作区或用户配置文件添加新的 MCP 服务器。 |
| **MCP: 浏览 MCP 服务器** | 在扩展视图中打开 MCP 服务器库。 |
| **MCP: 浏览资源** | 浏览 MCP 服务器提供的资源。 |
| **MCP: 从清单安装服务器** | 从 MCP 清单文件安装 MCP 服务器。 |
| **MCP: 列出服务器** | 列出所有已配置的 MCP 服务器，并执行启动、停止、重启或显示输出等操作。 |
| **MCP: 打开远程用户配置** | 打开远程环境的 `mcp.json` 文件。 |
| **MCP: 打开用户配置** | 打开用户配置文件中的 `mcp.json` 文件。 |
| **MCP: 打开工作区文件夹 MCP 配置** | 打开工作区中的 `.vscode/mcp.json` 文件。 |
| **MCP: 重置缓存工具** | 清除 MCP 服务器的缓存工具列表。当服务器的工具有更改时使用此命令。 |
| **MCP: 重置信任** | 重置 MCP 服务器的信任决策，需要在下次启动时重新确认。 |
| **MCP: 显示已安装的服务器** | 显示所有已安装的 MCP 服务器列表。 |

## 设置

有关 VS Code AI 设置的完整列表，请参阅 [AI 设置参考](/docs/agents/reference/ai-settings.md)。以下设置专用于 MCP 服务器。

| 设置 | 描述 |
|---------|-------------|
| `setting(chat.mcp.access)` | 管理哪些 MCP 服务器可在 VS Code 中使用。 |
| `setting(chat.mcp.discovery.enabled)` | 配置从其他应用程序自动发现 MCP 服务器配置。 |
| `setting(chat.mcp.autostart)`（实验性） | 当检测到配置更改时自动启动 MCP 服务器。 |
| `setting(chat.mcp.serverSampling)` | 配置哪些模型暴露给 MCP 服务器以进行采样（在后台发出请求）。 |
| `setting(chat.mcp.apps.enabled)`（实验性） | 启用或禁用 MCP 应用，即 MCP 服务器提供的富用户界面。 |

## 相关资源

* [添加和管理 MCP 服务器](/docs/agent-customization/mcp-servers.md)
* [Model Context Protocol 文档](https://modelcontextprotocol.io/)
* [MCP 开发指南](/docs/agents/guides/mcp-developer-guide.md)
