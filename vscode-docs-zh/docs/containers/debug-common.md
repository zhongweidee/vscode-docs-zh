---
ContentId: A1371726-5310-4923-B43B-240F36C6264E
DateApproved: 12/14/2023
MetaDescription: 使用 Visual Studio Code 调试在容器中运行的应用程序。
---
# 调试容器化应用

容器工具扩展为调试容器内的应用程序提供了更多支持，例如搭建 `launch.json` 配置，以便将调试器附加到容器内运行的应用程序。

容器工具扩展提供了一个 `docker` 调试配置提供程序，用于管理 VS Code 如何启动应用程序和/或将调试器附加到正在运行的容器中的应用程序。此提供程序通过 `launch.json` 中的条目进行配置，具体配置因该提供程序支持的每个应用程序平台而异。

容器工具扩展目前支持调试容器内的 [Node.js](#nodejs)、[Python](#python) 和 [.NET](#net) 应用程序。

## 要求

仅搭建或将启动配置粘贴到 `launch.json` 中，**不足以**构建和调试容器。要成功运行容器启动配置，您必须具有：

- 一个 Dockerfile。
- `tasks.json` 中的 `docker-build` 和 `docker-run` 任务。
- 一个调用这些任务的启动配置。

如果这些资源都还不存在，我们建议使用 **容器：将 Docker 文件添加到工作区...** 命令来创建这些项目。如果您已经有一个可用的 Dockerfile，我们建议使用 **容器：初始化容器调试** 命令来搭建启动配置和与容器相关的任务。

## Node.js

有关在容器内调试 Node.js 应用程序的更多信息，请参阅[在容器内调试 Node.js](/docs/containers/debug-node.md)。

调试 Node.js 应用程序的示例 `launch.json` 配置：

```json
{
    "configurations": [
        {
            "name": "Containers: Node.js Launch",
            "type": "docker",
            "request": "launch",
            "preLaunchTask": "docker-run: debug",
            "platform": "node"
        }
    ]
}
```

## Python

有关在容器内调试 Python 应用程序的更多信息，请参阅[在容器内调试 Python](/docs/containers/debug-python.md)。

调试 Python 应用程序的示例 `launch.json` 配置：

```json
{
  "configurations": [
    {
      "name": "Containers: Python - Django",
      "type": "docker",
      "request": "launch",
      "preLaunchTask": "docker-run: debug",
      "python": {
        "pathMappings": [
          {
            "localRoot": "${workspaceFolder}",
            "remoteRoot": "/app"
          }
        ],
        "projectType": "django"
      }
    }
  ]
}
```

## .NET

您可以选择两种在容器内构建和调试项目的方式：

- **使用 .NET SDK**：如果您熟悉 `MSBuild` 或者希望在不使用 Dockerfile 的情况下将项目容器化，这是推荐的选择。
  >**注意**：此选项仅适用于 .NET SDK 7 及以上版本，并使用 `dotnet publish` 命令来构建镜像。

- **使用 Dockerfile**：如果您偏好使用 `Dockerfile` 自定义项目，请选择此选项。

有关这两种选项的更多详细信息，请参阅[在容器内调试 .NET](/docs/containers/debug-netcore.md)。

使用 `Dockerfile` 调试 .NET 应用程序的示例 `launch.json` 配置：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Containers: .NET Launch",
            "type": "docker",
            "request": "launch",
            "preLaunchTask": "Run Container",
            "netCore": {
                "appProject": "${workspaceFolder}/project.csproj"
            }
        }
    ]
}
```

## 配置参考

| 属性 | 描述 |
| --- | --- |
| `containerName` | 用于调试的容器名称。 |
| `dockerServerReadyAction` | 启动浏览器访问容器的选项。类似于 serverReadyAction，但将容器端口替换为主机端口。 |
| `removeContainerAfterDebug` | 是否在调试后移除调试容器。 |
| `platform` | 应用程序的目标平台。可以是 `netCore` 或 `node`。 |
| `netCore` | 在容器中调试 .NET 项目的选项。 |
| `node` | 在容器中调试 Node.js 项目的选项。 |
| `python` | 在容器中调试 Python 项目的选项。 |

### dockerServerReadyAction 对象属性

| 属性 | 描述 |
| --- | --- |
| `action` | 找到匹配模式时要执行的操作。可以是 `debugWithChrome` 或 `openExternally`。 |
| `containerName` | 用于匹配主机端口的容器名称。 |
| `pattern` | 在调试控制台输出中查找的正则表达式模式。 |
| `uriFormat` | 要启动的 URI 格式。 |
| `webRoot` | 提供网页服务的根文件夹。仅当 `action` 设置为 `debugWithChrome` 时使用。 |

### node 对象属性

> 这些属性与 [VS Code 文档](/docs/nodejs/nodejs-debugging.md#launch-configuration-attributes)中描述的用于将调试器附加到 Node.js 应用程序的属性相同。传入 `node` 对象的所有属性都将传递给 Node.js 调试适配器，即使下面未具体列出。

| 属性 | 描述 | 默认值 |
| --- | --- | --- |
| `port` | 可选。要使用的调试端口。 | `9229` |
| `address` | 可选。调试端口的 TCP/IP 地址。 |
| `sourceMaps` | 可选。通过将此设置为 `true` 来启用源映射。 |
| `outFiles` | 可选。用于定位生成的 JavaScript 文件的 glob 模式数组。 |
| `autoAttachChildProcesses` | 可选。跟踪被调试程序的所有子进程，并自动附加到那些以调试模式启动的进程。 |
| `timeout` | 可选。重新启动会话时，在此毫秒数后放弃。 |
| `stopOnEntry` | 可选。程序启动时立即中断。 |
| `localRoot` | 可选。VS Code 的根目录。 | 根工作区文件夹。 |
| `remoteRoot` | 可选。容器中 Node.js 的根目录。 | `/usr/src/app` |
| `smartStep` | 可选。尝试自动跳过未映射到源文件的代码。 |
| `skipFiles` | 可选。自动跳过这些 glob 模式所涵盖的文件。 |
| `trace` | 可选。启用诊断输出。 |

### python 对象属性

| 属性 | 描述 | 默认值 |
| --- | --- | --- |
| `host` | 远程调试的主机。 | |
| `port` | 远程调试的端口。 | `5678` |
| `pathMappings` | 映射本地机器与远程主机之间的项目路径。 | |
| `projectType` | Python 项目的类型，`flask` 用于 Flask 项目，`django` 用于 Django，`fastapi` 用于 FastAPI，`general` 用于其他项目。项目类型将用于设置调试所使用的端口和命令。 |
| `justMyCode` | 仅调试用户编写的代码。 | |
| `django` | Django 调试。 | `false` |
| `jinja` | Jinja 模板调试（如 Flask）。 | `false` |

### netCore 对象属性

> 传入 `netCore` 对象的属性通常会传递给 .NET 调试适配器，即使下面未具体列出。调试器属性的完整列表请参阅 [OmniSharp VS Code 扩展文档](https://github.com/OmniSharp/omnisharp-vscode/blob/master/debugger-launchjson.md)。

| 属性 | 描述 |
| --- | --- |
| `appProject` | 要调试的 .NET 项目（.csproj、.fsproj 等）。 |

## 后续步骤

继续阅读以了解更多：

- [在容器内调试 Node.js](/docs/containers/debug-node.md)
- [在容器内调试 Python](/docs/containers/debug-python.md)
- [在容器内调试 .NET](/docs/containers/debug-netcore.md)
- [使用 Docker Compose 进行调试](/docs/containers/docker-compose.md#debug)
- [故障排除](/docs/containers/troubleshooting.md)
