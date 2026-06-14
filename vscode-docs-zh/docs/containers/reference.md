---
ContentId: 6784FBBE-9EE4-44A8-AC48-A52617EB1968
DateApproved: 4/18/2022
MetaDescription: Visual Studio Code 容器工具扩展中 Docker 构建和 Docker 运行任务及属性的参考文档。
---
# 自定义容器工具扩展

容器工具扩展包含多个 Visual Studio Code 任务，用于控制 Docker [构建](#docker-build-task)和[运行](#docker-run-task)的行为，并构成启动容器进行调试的基础。

这些任务允许进行大量的控制和自定义。最终配置是通用默认值、平台特定默认值（如 Node.js、Python 或 .NET）以及用户输入的组合。当用户输入与默认值冲突时，用户输入优先。

Visual Studio Code 任务的所有通用功能（例如将任务组合为复合任务）均由容器工具扩展任务支持。有关通用任务功能和属性的更多信息，请参阅 Visual Studio Code [自定义任务](/docs/debugtest/tasks.md#custom-tasks)文档。

## Docker 构建任务

`docker-build` 任务使用 Docker 命令行（CLI）来构建镜像。该任务可以单独使用，也可以作为运行和/或调试容器中应用程序的任务链的一部分。

`docker-build` 任务最重要的配置设置是 `dockerBuild` 和 `platform`：

- `dockerBuild` 对象指定 Docker 构建命令的参数。此对象指定的值会直接应用于 Docker 构建 CLI 调用。
- `platform` 属性是一个提示，用于改变 `docker-build` 任务确定 Docker 构建默认值的方式。

有关所有任务属性的完整列表，请参阅[属性参考](#build-task-reference)。

### 平台支持

虽然 `tasks.json` 中的 `docker-build` 任务可用于构建任何镜像，但该扩展对 Node.js、Python 和 .NET Core 提供了显式支持（以及简化的配置）。

### Node.js（docker-build）

**使用默认值的最小配置**

对于没有特定平台选项的 Node.js 镜像，只需将 `platform` 属性设置为 `node`：

```json
{
  "version": "2.0.0",
  "tasks": [
      {
          "label": "Build Node Image",
          "type": "docker-build",
          "platform": "node"
      }
  ]
}
```

**平台默认值**

对于基于 Node.js 的镜像，`docker-build` 任务会推断出以下选项：

| 属性 | 推断值 |
| --- | --- |
| `dockerBuild.context` | `package.json` 所在的目录。 |
| `dockerBuild.dockerfile` | 与 `package.json` 位于同一目录中的 `Dockerfile` 文件。 |
| `dockerBuild.tag` | `package.json` 中应用程序的 `name` 属性（如果已定义），否则为 `package.json` 所在文件夹的基本名称。 |
| `dockerBuild.pull` | 默认为 `true`，以便在构建前拉取新的基础镜像。 |

### Python（docker-build）

**使用默认值的最小配置**

对于没有特定平台选项的 Python 镜像，只需将 `platform` 属性设置为 `python`：

```json
{
  "tasks": [
      {
      "type": "docker-build",
      "label": "docker-build",
      "platform": "python"
    }
  ]
}
```

**平台默认值**

对于基于 Python 的镜像，`docker-build` 任务会推断出以下选项：

| 属性 | 推断值 |
| --- | --- |
| `dockerBuild.context` | 默认上下文为工作区文件夹。 |
| `dockerBuild.dockerfile` | 默认 `Dockerfile` 路径位于工作区文件夹的根目录。 |
| `dockerBuild.tag` | 根工作区文件夹的基本名称。 |
| `dockerBuild.pull` | 默认为 `true`，以便在构建前拉取新的基础镜像。 |

### .NET（docker-build）

**使用默认值的最小配置**

构建基于 .NET 的镜像时，可以省略 `platform` 属性，只需设置 `netCore` 对象（当 `netCore` 对象存在时，`platform` 会隐式设置为 `netcore`）。请注意，`appProject` 是必需属性：

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Build Node Image",
            "type": "docker-build",
            "netCore": {
                "appProject": "${workspaceFolder}/project.csproj"
            }
        }
    ]
}
```

**平台默认值**

对于基于 .NET 的镜像，`docker-build` 任务会推断出以下选项：

| 属性 | 推断值 |
| --- | --- |
| `dockerBuild.context` | 根工作区文件夹。 |
| `dockerBuild.dockerfile` | 位于根工作区文件夹中的 `Dockerfile` 文件。 |
| `dockerBuild.tag` | 根工作区文件夹的基本名称。 |
| `dockerBuild.pull` | 默认为 `true`，以便在构建前拉取新的基础镜像。 |

## 构建任务参考

以下是配置 `docker-build` 任务可用的所有属性。除非另有说明，所有属性均为可选。

| 属性 | 描述 |
| --- | --- |
| `dockerBuild` | 控制执行的 `docker build` 命令的选项（[见下文](#dockerbuild-object-properties)）。<br/> 除非设置了 `platform`，否则为必需项。 |
| `platform` | 确定平台：.NET（`netcore`）或 Node.js（`node`）以及 `docker build` 命令的默认设置。 |
| `node` | 确定 Node.js 项目特定的选项（[见下文](#node-object-properties-dockerbuild-task)）。 |
| `python` | `docker-build` 任务中没有 Python 的对象属性。 |
| `netCore` | 确定 .NET 项目特定的选项（[见下文](#netcore-object-properties-dockerbuild-task)）。 |

### dockerBuild 对象属性

| 属性 | 描述 | `docker build` CLI 等效项 |
| --- | --- | --- |
| `context` | 构建上下文的路径。<br/> 除非从平台推断，否则为必需项。 | `PATH` |
| `dockerfile` | Dockerfile 的路径。<br/> 除非从平台推断，否则为必需项。 | `-f` 或 `--file` |
| `tag` | 应用于镜像的标签。<br/> 除非从平台推断，否则为必需项。 | `-t` 或 `--tag` |
| `buildArgs` | 应用于命令行的构建参数。这是一个键值对列表。 | `--build-arg` |
| `labels` | 添加到镜像的标签。这是一个键值对列表（JSON 对象）。<br/> 除了此处指定的标签外，还会向镜像添加一个 `com.microsoft.created-by` 标签，其值设置为 `visual-studio-code`。可以通过将 `labels` 对象的 `includeDefaults` 属性设置为 false 来关闭此行为。 | `--label` |
| `target` | Dockerfile 中要构建到的目标。 | `--target` |
| `pull` | 是否在构建前拉取新的基础镜像。 | `--pull` |
| `customOptions` | 在上下文参数之前添加的任何额外参数。不会尝试解决与其他选项的冲突或验证此选项。 | （任意） |

### node 对象属性（`docker-build` 任务）

| 属性 | 描述 | 默认值 |
| --- | --- | --- |
| `package` | 与 Dockerfile 和 `docker-build` 任务关联的 `package.json` 文件的路径。 | 根工作区文件夹中的 `package.json` 文件。 |

### netCore 对象属性（`docker-build` 任务）

| 属性 | 描述 |
| --- | --- |
| `appProject` | 与 Dockerfile 和 `docker-build` 任务关联的 .NET 项目文件（`.csproj`、`.fsproj` 等）。<br/> 始终为必需项。 |

## Docker 运行任务

`tasks.json` 中的 `docker-run` 任务使用 Docker 命令行（CLI）创建并启动容器。该任务可以单独使用，也可以作为在容器中调试应用程序的任务链的一部分。

`docker-run` 任务最重要的配置设置是 `dockerRun` 和 `platform`：

- `dockerRun` 对象指定 Docker 运行命令的参数。此对象指定的值会直接应用于 Docker 运行 CLI 调用。
- `platform` 属性是一个提示，用于改变 `docker-run` 任务确定 Docker 运行默认值的方式。

有关所有任务属性的完整列表，请参阅[属性参考](#run-task-reference)。

### Docker 运行平台支持

虽然 `docker-run` 任务可用于运行任何 Docker 镜像，但该扩展对 Node.js、Python 和 .NET 提供了显式支持（以及简化的配置）。

### Node.js（docker-run）

**使用默认值的最小配置**

对于没有特定平台选项的 Node.js 镜像，只需将 `platform` 属性设置为 `node`。

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run Node Image",
            "node": "docker-run",
            "platform": "node"
        }
    ]
}
```

**平台默认值**

对于基于 Node.js 的镜像，`docker-run` 任务会推断出以下选项：

| 属性 | 推断值 |
| --- | --- |
| `dockerRun.command` | 由 `package.json` 中的 npm `start` 脚本生成（如果存在），否则由 `package.json` 中的 `main` 属性生成。 |
| `dockerRun.containerName` | 从应用程序包名称派生。 |
| `dockerRun.image` | 来自依赖的 `docker-build` 任务的标签（如果存在），或从应用程序包名称派生，该名称本身从 `package.json` 中的 `name` 属性或所在文件夹的基本名称派生。 |

### Python（docker-run）

构建基于 Python 的镜像时，可以省略 `platform` 属性，只需设置 `python` 对象（当 `python` 对象存在时，`platform` 会隐式设置为 `python`）

**Django 应用的最小配置**

```json
{
    "type": "docker-run",
    "label": "docker-run: debug",
    "dependsOn": [
      "docker-build"
    ],
    "python": {
      "args": [
        "runserver",
        "0.0.0.0:8000",
        "--nothreading",
        "--noreload"
      ],
      "file": "path_to/manage.py"
    }
}
```

**Flask 应用的最小配置**

```json
{
    "type": "docker-run",
    "label": "docker-run: debug",
    "dependsOn": [
      "docker-build"
    ],
    "dockerRun": {
      "env": {
        "FLASK_APP": "path_to/flask_entry_point.py"
      }
    },
    "python": {
      "args": [
        "run",
        "--no-debugger",
        "--no-reload",
        "--host", "0.0.0.0",
        "--port", "5000"
      ],
      "module": "flask"
    }
}
```

**通用应用的最小配置**

```json
{
    "type": "docker-run",
    "label": "docker-run: debug",
    "dependsOn": [
      "docker-build"
    ],
    "python": {
      "file": "path_to/app_entry_point.py"
    }
}
```

**平台默认值**

对于基于 Python 的镜像，`docker-run` 任务会推断出以下选项：

| 属性 | 推断值 |
| --- | --- |
| `dockerRun.command` | 由 Python 对象生成，并由 Python 调试器调用。 |
| `dockerRun.containerName` | 从根工作区文件夹的基本名称派生。 |
| `dockerRun.image` | 来自依赖的 docker-build 任务的标签（如果存在），或从根工作区文件夹的基本名称派生。 |

### .NET（docker-run）

**使用默认值的最小配置**

构建基于 .NET 的镜像时，可以省略 `platform` 属性，只需设置 `netCore` 对象（当 `netCore` 对象存在时，`platform` 会隐式设置为 `netcore`）。请注意，`appProject` 是必需属性：

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run .NET Core Image",
            "type": "docker-run",
            "netCore": {
                "appProject": "${workspaceFolder}/project.csproj"
            }
        }
    ]
}
```

**平台默认值**

对于基于 .NET 的镜像，`docker-run` 任务会推断出以下选项：

| 属性 | 推断值 |
| --- | --- |
| `dockerRun.containerName` | 从根工作区文件夹的基本名称派生。 |
| `dockerRun.env` | 根据需要添加以下环境变量：`ASPNETCORE_ENVIRONMENT`、`ASPNETCORE_URLS` 和 `DOTNET_USE_POLLING_FILE_WATCHER`。 |
| `dockerRun.image` | 来自依赖的 `docker-build` 任务的标签（如果存在），或从根工作区文件夹的基本名称派生。 |
| `dockerRun.os` | `Linux` |
| `dockerRun.volumes` | 根据需要添加以下卷：本地应用程序文件夹、源文件夹、调试器文件夹、NuGet 包文件夹和 NuGet 回退文件夹。 |

## 运行任务参考

以下是配置 `docker-run` 任务可用的所有属性。除非另有说明，所有属性均为可选。

| 属性 | 描述 |
| --- | --- |
| `dockerRun` | 控制执行的 `docker run` 命令的选项（[见下文](#dockerrun-object-properties)）。<br/> 除非设置了 `platform`，否则为必需项。 |
| `platform` | 确定平台：.NET（`netcore`）或 Node.js（`node`）以及 `docker run` 命令的默认设置。 |
| `node` | 对于 Node.js 项目，此属性控制各种选项（[见下文](#node-object-properties-dockerrun-task)）。 |
| `python` | 对于 Python 项目，此属性控制各种选项（[见下文](#python-object-properties-dockerrun-task)）。 |
| `netCore` | 对于 .NET 项目，此属性控制各种选项（[见下文](#netcore-object-properties-dockerrun-task)）。 |

### dockerRun 对象属性

| 属性 | 描述 | CLI 等效项 |
| --- | --- | --- |
| `image` | 要运行的镜像的名称（标签）。<br/> 除非从平台推断，否则为必需项。 | `IMAGE` |
| `command` | 启动容器时要运行的命令。<br/> 除非从平台推断，否则为必需项。 | `COMMAND [ARG...]` |
| `containerName` | 为启动的容器指定的名称。<br/> 除非从平台推断，否则为必需项。 | `--name` |
| `env` | 在容器中设置的环境变量。这是一个键值对列表。 | `-e` 或 `--env` |
| `envFiles` | 这是一个 `.env` 文件列表。 | `--env-file` |
| `labels` | 为启动的容器指定的标签。这是一个键值对列表。 | `--label` |
| `network` | 容器将连接到的网络名称。 | `--network` |
| `networkAlias` | 启动的容器的网络范围别名。 | `--network-alias` |
| `os` | 默认值为 `Linux`，另一个选项是 `Windows`。所使用的容器操作系统。 | 不适用 |
| `ports` | 要从容器发布（映射）到主机的端口。这是一个对象列表（[见下文](#ports-object-properties)）。 | `-p` 或 `--publish` |
| `portsPublishAll` | 是否发布 Docker 镜像暴露的所有端口。如果未明确发布任何端口，则默认为 `true`。 | `-P` |
| `extraHosts` | 要添加到容器中用于 DNS 解析的主机。这是一个对象列表（[见下文](#extrahosts-object-properties)）。 | `--add-host` |
| `volumes` | 要映射到已启动容器中的卷。这是一个对象列表（[见下文](#volumes-object-properties)）。 | `-v` 或 `--volume` |
| `remove` | 容器停止后是否将其移除。 | `--rm` |
| `customOptions` | 在镜像参数之前添加的任何额外参数。不会尝试解决与其他选项的冲突或验证此选项。 | （任意） |

### ports 对象属性

| 属性 | 描述 | 默认值 |
| --- | --- | --- |
| `containerPort` | 绑定在容器上的端口号。<br/> 必需项。 |
| `hostPort` | 绑定在主机上的端口号。 | （由 Docker 随机选择） |
| `protocol` | 绑定的协议（`tcp` 或 `udp`）。 | `tcp` |

### extraHosts 对象属性

| 属性 | 描述 |
| --- | --- |
| `hostname` | 用于 DNS 解析的主机名。<br/> 必需项。 |
| `ip` | 与上述主机名关联的 IP 地址。<br/> 必需项。 |

### volumes 对象属性

| 属性 | 描述 | 默认值 |
| --- | --- | --- |
| `localPath` | 本地机器上将被映射的路径。<br/> 必需项。 |
| `containerPath` | 容器中本地路径将被映射到的路径。<br/> 必需项。 |
| `permissions` | 容器对映射路径拥有的权限。可以是 `ro`（只读）或 `rw`（读写）。 | 取决于容器。 |

### node 对象属性（`docker-run` 任务）

| 属性 | 描述 | 默认值 |
| --- | --- | --- |
| `package` | 与 `docker-run` 任务关联的 `package.json` 文件的路径。 | 根工作区文件夹中的 `package.json` 文件。 |
| `enableDebugging` | 是否在容器中启用调试。 | `false` |
| `inspectMode` | 定义应用程序与调试器之间的初始交互方式（`default` 或 `break`）。<br/> 值 `default` 允许应用程序在调试器附加之前一直运行。<br/> 值 `break` 阻止应用程序在调试器附加之前运行。 | `default` |
| `inspectPort` | 调试应在其上进行的端口。 | `9229` |

### python 对象属性（`docker-run` 任务）

| 属性 | 描述 | 默认值 |
| --- | --- | --- |
| `args` | 传递给 Python 应用程序的参数。 | 取决于平台。脚手架默认值如[上文](#python-docker-run)所示 |
| `debugPort` | 调试器将监听的端口。 | `5678` |
| `wait` | 是否等待调试器附加。 | `true` |
| `module` | 要运行的 Python 模块（只能选择模块**或**文件）。 | |
| `file` | 要运行的 Python 文件（只能选择模块**或**文件）。 | |

### netCore 对象属性（`docker-run` 任务）

| 属性 | 描述 |
| --- | --- |
| `appProject` | 与 `docker-run` 任务关联的 .NET 项目文件（`.csproj`、`.fsproj` 等）。<br/> 必需项。 |
| `configureSsl` | 是否配置 ASP.NET Core SSL 证书和其他设置以在容器中的服务上启用 SSL。 |
| `enableDebugging` | 是否为调试启用已启动的容器。这将推断出调试所需的额外卷映射和其他选项。 |

## Docker Compose 任务

`tasks.json` 中的 `docker-compose` 任务使用 Docker Compose 命令行（CLI）创建并启动容器。该任务可以单独使用，也可以作为在容器中调试应用程序的任务链的一部分。

`docker-compose` 任务最重要的配置设置是 `dockerCompose`：

- `dockerCompose` 对象指定 Docker Compose 命令的参数。此对象指定的值会直接应用于 Docker Compose CLI 调用。

有关所有任务属性的完整列表，请参阅[属性参考](#compose-task-reference)。

**示例配置**

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run docker-compose up",
            "type": "docker-compose",
            "dockerCompose": {
                "up": {
                    "detached": true,
                    "build": true,
                    "services": [
                      "myservice"
                    ]
                },
                "files": [
                    "${workspaceFolder}/docker-compose.yml",
                    "${workspaceFolder}/docker-compose.debug.yml"
                ]
            }
        }
    ]
}
```

## Compose 任务参考

以下是配置 `docker-compose` 任务可用的所有属性。除非另有说明，所有属性均为可选。

| 属性 | 描述 |
| --- | --- |
| `dockerCompose` | 控制执行的 `docker-compose` 命令的选项（[见下文](#dockercompose-object-properties)）。<br/> 必需项。 |

### dockerCompose 对象属性

| 属性 | 描述 | CLI 等效项 |
| --- | --- | --- |
| `up` | 运行 `docker-compose up` 命令。<br/> 必须指定此项或 `down`，但不能同时指定两者。 | `docker-compose up` |
| `down` | 运行 `docker-compose down` 命令。<br/> 必须指定此项或 `up`，但不能同时指定两者。 | `docker-compose down` |
| `files` | 要在 `docker-compose` 命令中使用的 Docker Compose YAML 文件列表。如果未指定，Docker Compose CLI 将查找 `docker-compose.yml` 和 `docker-compose.override.yml`。 | `-f <file>` |
| `envFile` | 读入并应用于容器的环境变量文件。 | `--env-file <file>` |
| `projectName` | 在命名和标记 Docker 对象时使用的备用项目名称。如果在 compose up 时使用备用项目名称，则在 compose down 时必须指定相同的项目名称。 | `--project-name <name>` |

### up 对象属性

| 属性 | 描述 | CLI 等效项 | 默认值 |
| --- | --- | --- | --- |
| `detached` | 是否以分离模式运行。 | `-d` | `true` |
| `build` | 是否在运行前构建。 | `--build` | `true` |
| `scale` | 每个服务要运行的实例数量。这是一个键值对列表。 | `--scale SERVICE=NUM` |
| `services` | 要启动的服务子集。不能与 `profiles` 组合使用。 | `[SERVICE...]` | （全部） |
| `profiles` | 要启动的配置文件子集。不能与 `services` 组合使用。 | `--profile <profile>` | （全部） |
| `customOptions` | 在 `up` 参数之后添加的任何额外参数。不会尝试解决与其他选项的冲突或验证此选项。 | （任意） |

### down 对象属性

| 属性 | 描述 | CLI 等效项 | 默认值 |
| --- | --- | --- | --- |
| `removeImages` | 是否移除镜像以及移除哪些镜像。`all` 将移除任何服务使用的所有镜像，`local` 将仅移除没有自定义标签的镜像。不设置此项将不移除任何镜像。 | `--rmi` |
| `removeVolumes` | 是否移除命名卷。 | `-v` | `false` |
| `customOptions` | 在 `down` 参数之后添加的任何额外参数。不会尝试解决与其他选项的冲突或验证此选项。 | （任意） |

## 命令自定义

当您执行各种操作（例如构建镜像、运行容器、附加到容器以及查看容器日志）时，容器工具扩展会执行多个 Docker CLI 命令。其中一些命令有大量可选参数，通常用于非常特定的场景。作为上述 Visual Studio Code 任务的替代方案，在不使用任务时可以自定义多个命令。

例如，[Compose Up](#docker-compose-up) 命令中的 `${serviceList}` 和 `${profileList}` 令牌允许您轻松启动 Docker Compose YAML 文件中服务的子集。

对于每个可自定义的 Docker 命令，都有一个配置设置用于设置要执行的模板。或者，您可以定义多个模板，并可选择使用正则表达式，当匹配时，提示应在哪个上下文中使用模板。模板支持一些类似于 `launch.json` 和 `tasks.json` 的令牌，例如 `${workspaceFolder}`。

### 设置 JSON 模式

您有两个选项来配置每个模板（如下所列）。第一个选项是覆盖默认行为的单个模板：

```json
{
    "containers.commands.build": "docker build --rm -f \"${dockerfile}\" -t ${tag} \"${context}\""
}
```

第二个选项是多个模板，将根据 `match` 正则表达式以及用户输入来选择。

例如，以下示例显示了三个模板：

```json
{
    "containers.commands.build": [
        {
            "label": "Default build command",
            "template": "docker build --rm -f \"${dockerfile}\" -t ${tag} \"${context}\""
        },
        {
            "label": "Alpine-specific build command",
            "template": "docker build -p 1234:1234 -f \"${dockerfile}\" -t ${tag} \"${context}\"",
            "match": "alpine"
        }
    ]
}
```

### 选择行为

选择要执行的命令模板基于以下规则：

1. 如果未配置任何设置，则选择默认命令模板。
1. 如果仅配置了单个模板（如上文第一个示例），则选择该模板。
1. 如果配置了多个模板：
    1. 检查受限模板。受限模板具有 `match`。`match` 正则表达式会与上下文提示进行比较——例如镜像名称、容器名称等。
    1. 如果有多个受限模板适用，将提示用户选择。如果只有一个适用，则不会提示用户。
    1. 如果没有适用的受限模板，则检查非受限模板。非受限模板没有 `match`，因此始终适用。
    1. 如果有多个非受限模板适用，将提示用户选择。如果只有一个适用，则不会提示用户。

### Docker 构建

| 配置设置 | 默认值 |
|--|--|
| `docker.commands.build` | `${containerCommand} build --rm -f "${dockerfile}" -t ${tag} "${context}"` |

支持的令牌：

| 令牌 | 描述 |
| -- | -- |
| `${containerCommand}` | 用于执行容器命令的 CLI 命令/可执行文件。 |
| `${dockerfile}` | 所选 `Dockerfile` 的工作区相对路径。 |
| `${tag}` | 用户在调用构建命令时输入/确认的值。如果之前已构建，则默认为该 `Dockerfile` 之前输入的值。 |
| `${context}` | 如果已设置，则为 `containers.imageBuildContextPath` 配置设置的值。否则为 `Dockerfile` 所在的工作区相对文件夹。 |

> **注意**：如果 `containers.commands.build` 设置不包含 `${tag}` 令牌，则**不会**提示用户输入/确认标签。

> **注意**：`match` 正则表达式将与所选 Dockerfile 名称和工作区文件夹名称进行比较。

### Docker 运行

| 配置设置 | 默认值 |
|--|--|
| `containers.commands.run` | `${containerCommand} run --rm -d ${exposedPorts} ${tag}` |
| `containers.commands.runInteractive` | `${containerCommand} run --rm -it ${exposedPorts} ${tag}` |

支持的令牌：

| 令牌 | 描述 |
| -- | -- |
| `${containerCommand}` | 用于执行容器命令的 CLI 命令/可执行文件。 |
| `${exposedPorts}` | 由镜像中暴露的端口列表（最终来自 `Dockerfile`）生成，其中每个暴露的端口映射到本地机器上的相同端口。例如，`"EXPOSE 5000 5001"` 将生成 `"-p 5000:5000 -p 5001:5001"`。 |
| `${tag}` | 所选镜像的完整标签。 |

> **注意**：`match` 正则表达式将与所选镜像的完整标签进行比较。

### 附加到容器

| 配置设置 | 默认值 |
|--|--|
| `containers.commands.attach` | `${containerCommand} exec -it ${containerId} ${shellCommand}`

支持的令牌：

| 令牌 | 描述 |
| -- | -- |
| `${containerCommand}` | 用于执行容器命令的 CLI 命令/可执行文件。 |
| `${containerId}` | 要附加到的容器的 ID。 |
| `${shellCommand}` | 如果容器中存在 `bash`，则在此处替换，否则替换为 `sh`。在 Windows 容器中，始终使用 `cmd`。 |

> **注意**：`match` 正则表达式将与容器名称和容器镜像的完整标签进行比较。

### 容器日志

| 配置设置 | 默认值 |
|--|--|
| `containers.commands.logs` | `${containerCommand} logs -f ${containerId}`

支持的令牌：

| 令牌 | 描述 |
| -- | -- |
| `${containerCommand}` | 用于执行容器命令的 CLI 命令/可执行文件。 |
| `${containerId}` | 要查看日志的容器的 ID。 |

> **注意**：`match` 正则表达式将与容器名称和容器镜像的完整标签进行比较。

### Docker Compose Up

| 配置设置 | 默认值 |
|--|--|
| `containers.commands.composeUp` | `${composeCommand} ${configurationFile} up ${detached} ${build}` |

支持的令牌：

| 令牌 | 描述 |
| -- | -- |
| `${configurationFile}` | 设置为 `-f` 加上所选 Docker Compose YAML 文件的工作区相对路径。 |
| `${detached}` | 如果配置设置 `containers.composeDetached` 设置为 `true`，则设置为 `-d`。否则设置为 `""`。 |
| `${build}` | 如果配置设置 `containers.composeBuild` 设置为 `true`，则设置为 `--build`。否则设置为 `""`。 |
| `${serviceList}` | 如果指定，在命令运行时提示选择要启动的服务子集。 |
| `${profileList}` | 如果指定且 Docker Compose YAML 文件包含配置文件，在命令运行时提示选择要启动的配置文件子集。 |
| `${composeCommand}` | 如果已设置 `containers.composeCommand` 设置，则设置为其值，否则扩展将尝试自动确定要使用的命令（`docker compose` 或 `docker-compose`）。 |

### Docker Compose Down

| 配置设置 | 默认值 |
|--|--|
| `containers.commands.composeDown` | `${composeCommand} ${configurationFile} down` |

支持的令牌：

| 令牌 | 描述 |
| -- | -- |
| `${configurationFile}` | 设置为 `-f` 加上所选 Docker Compose YAML 文件的工作区相对路径。 |
| `${composeCommand}` | 如果已设置 `containers.composeCommand` 设置，则设置为其值，否则扩展将尝试自动确定要使用的命令（`docker compose` 或 `docker-compose`）。 |

### 其他支持的令牌

除了命令专用的支持令牌外，所有命令模板还支持以下令牌：

| 令牌 | 描述 |
| -- | -- |
| `${workspaceFolder}` | 选定的工作区文件夹路径。 |
| `${config:some.setting.identifier}` | 任何配置设置的值，只要它是字符串、数字或布尔值。这些设置标识符可以任意定义，不需要属于 Visual Studio Code 或任何扩展。 |
| `${env:Name}` | 环境变量的值。 |
| `${command:commandID}` | 命令的字符串返回值。 |
