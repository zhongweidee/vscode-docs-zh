---
ContentId: f9ffec31-9253-4f71-a4eb-79ea7b3a8f55
DateApproved: 12/21/2021
MetaDescription: 如何使用 Visual Studio Code 配置和排查在容器中运行的 Python 应用程序的调试。
---

# 在容器中调试 Python

向 Python 项目添加 Docker 文件时，会添加任务和启动配置以便在容器内调试应用程序。为了适应 Python 项目的各种场景，某些应用程序可能需要额外配置。

## 配置容器入口点

你可以通过在 `tasks.json` 中设置属性来配置容器的入口点。当你首次使用 **容器: 将 Docker 文件添加到工作区...** 命令时，VS Code 会自动配置容器入口点。

### 示例：为 Python 模块配置入口点

```json
{
  "tasks": [
    {
      "type": "docker-run",
      "label": "docker-run: debug",
      "dependsOn": [
        "docker-build"
      ],
      "python": {
        "module": "myapp"
      }
    }
  ]
}
```

### 示例：为 Python 文件配置入口点

```json
{
  "tasks": [
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
        "file": "manage.py"
      }
    }
  ]
}
```

## 自动启动浏览器并打开应用程序入口页面

你可以选择 **容器: Python - Django** 或 **容器: Python - Flask** 启动配置，以自动启动浏览器并打开应用程序的主页面。此功能默认启用，但你也可以通过在 `launch.json` 中设置 `dockerServerReadyAction` 对象来显式配置此行为。

此功能依赖于应用程序的以下几个方面：

- 应用程序**必须将输出发送到调试控制台或 Docker 日志**。
- 应用程序必须记录"服务器就绪"消息。
- 应用程序必须提供一个可浏览的页面。

以下示例使用 `dockerServerReadyAction`，根据特定的服务器消息模式启动浏览器并打开 `about.html` 页面：

```json
{
  "configurations": [
    {
      "name": "容器: Python - Django",
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
      },
      "dockerServerReadyAction": {
        "action": "openExternally",
        "pattern": "Starting development server at (https?://\\S+|[0-9]+)",
        "uriFormat": "%s://localhost:%s/about.html"
      }
    }
  ]
}
```

  > **注意**：`pattern` 属性中的正则表达式会尝试捕获类似于 "Starting development server at `http://localhost:8000`" 的记录消息。它支持 http 或 https、任何主机名以及任何端口的 URL 变化。

### 重要的 dockerServerReadyAction 对象属性

- `action`：当找到匹配模式时要执行的操作。可以是 `debugWithChrome` 或 `openExternally`。

- `pattern`：如果应用程序记录的消息与上面显示的不同，请将 [dockerServerReadyAction](/docs/containers/debug-common.md#dockerserverreadyaction-object-properties) 对象的 `pattern` 属性设置为与该消息匹配的 [JavaScript 正则表达式](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions)。正则表达式应包含一个与应用程序监听的端口相对应的捕获组。
- `uriFormat`：默认情况下，容器工具扩展将打开浏览器的主页面（具体由应用程序决定）。如果你想如上面示例那样让浏览器打开特定页面，应将 [dockerServerReadyAction](/docs/containers/debug-common.md#dockerserverreadyaction-object-properties) 对象的 `uriFormat` 属性设置为一个格式字符串，其中包含两个字符串标记分别表示协议和端口的替换。

## 如何在 Django 或 Flask 应用程序中启用热重载

当你为 Django 或 Flask 选择 **容器: 将 Docker 文件添加到工作区** 时，我们会为你提供一个配置为静态部署的 Dockerfile 和 `tasks.json`。每次对应用程序代码进行更改时，你都需要重新构建并重新运行容器。热重载允许你在容器继续运行时可视化地查看应用程序代码中的更改。按照以下步骤启用热重载：

### 对于 Django 应用程序

1. 在 Dockerfile 中，注释掉将应用程序代码添加到容器的那一行。

    ```docker
    #ADD . /app
    ```

1. 在 `tasks.json` 文件的 `docker-run` 任务中，创建一个带有 `volumes` 属性的新 `dockerRun` 属性。此设置创建从当前工作区文件夹（应用程序代码）到容器中 `/app` 文件夹的映射。

    ``` json
    {
      "type": "docker-run",
      "label": "docker-run: debug",
      "dependsOn": [
        "docker-build"
      ],
      "dockerRun": {
        "volumes": [
          {
            "containerPath": "/app", "localPath": "${workspaceFolder}"
          }
        ]
      },
      ...
    }
    ```

1. 编辑 python 属性，**删除** `--noreload` 和 `--nothreading`。

    ``` json
    {
      ...
      "dockerRun": {
        "volumes": [
          {
            "containerPath": "/app", "localPath": "${workspaceFolder}"
          }
        ]
      },
      "python": {
        "args": [
          "runserver",
          "0.0.0.0:8000",
        ],
        "file": "manage.py"
      }
    }
    ```

1. 选择 **容器: Python – Django** 启动配置，然后按 `kb(workbench.action.debug.start)` 构建并运行你的容器。
1. 修改并保存任意文件。
1. 刷新浏览器并验证更改已生效。

### 对于 Flask 应用程序

1. 在 Dockerfile 中，注释掉将应用程序代码添加到容器的那一行。

    ```docker
    #ADD . /app
    ```

1. 在 `tasks.json` 文件的 `docker-run` 任务中，编辑现有的 dockerRun 属性，在 `env` 属性中添加 `FLASK_ENV` 以及一个 `volumes` 属性。此设置创建从当前工作区文件夹（应用程序代码）到容器中 `/app` 文件夹的映射。

    ``` json
    {
      "type": "docker-run",
      "label": "docker-run: debug",
      "dependsOn": [
        "docker-build"
      ],
      "dockerRun": {
        "env": {
          "FLASK_APP": "path_to/flask_entry_point.py",
          "FLASK_ENV": "development"
        },
        "volumes": [
          {
            "containerPath": "/app", "localPath": "${workspaceFolder}"
          }
        ]
      },
      ...
    }
    ```

1. 编辑 python 属性，**删除** `--no-reload` 和 `--no-debugger`。

    ``` json
    {
      ...
      "dockerRun": {
        "env": {
          "FLASK_APP": "path_to/flask_entry_point.py",
          "FLASK_ENV": "development"
        },
        "volumes": [
          {
            "containerPath": "/app", "localPath": "${workspaceFolder}"
          }
        ]
      },
      "python": {
        "args": [
          "run",
          "--host", "0.0.0.0",
          "--port", "5000"
        ],
        "module": "flask"
      }
    }
    ```

1. 选择 **容器: Python – Flask** 启动配置，然后按 `kb(workbench.action.debug.start)` 构建并运行你的容器。
1. 修改并保存任意文件。
1. 刷新浏览器并验证更改已生效。

## 如何一起构建和运行容器

1. 在前面提到的 `tasks.json` 文件中，存在对 `docker-build` 任务的依赖。该任务是 `tasks.json` 中 `tasks` 数组的一部分。例如：

```json
"tasks":
[
  {
    ...
  },
  {
    "label": "docker-build",
    "type": "docker-build",
    "dockerBuild": {
        "context": "${workspaceFolder}",
        "dockerfile": "${workspaceFolder}/Dockerfile",
        "tag": "YOUR_IMAGE_NAME:YOUR_IMAGE_TAG"
    }
  }
]
```

**提示：** 由于依赖项明确将 `docker-build` 声明为其依赖，因此名称必须与此任务匹配。如果需要，你可以更改名称。

1. JSON 中的 `dockerBuild` 对象支持以下参数：

    - context：构建上下文，你的 Dockerfile 从该上下文被调用
    - dockerfile：要执行的 Dockerfile 的路径
    - tag：要构建的镜像名称及其版本标签

1. 总体而言，用于构建和调试 Flask 应用程序的 VS Code 设置可以如下所示：

    - `launch.json`

      ```json
      {
          "version": "0.2.0",
          "configurations": [
            {
              "name": "调试 Flask 应用程序",
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
                "projectType": "flask"
              },
              "dockerServerReadyAction": {
                "action": "openExternally",
                "pattern": "Running on (http?://\\S+|[0-9]+)",
                "uriFormat": "%s://localhost:%s/"
              }
            }
          ]
      }
      ```

    - `tasks.json`

      ```json
      {
        "version": "2.0.0",
        "tasks": [
          {
            "type": "docker-run",
            "label": "docker-run: debug",
            "dependsOn": [
                "docker-build"
            ],
            "dockerRun": {
                "containerName": "YOUR_IMAGE_NAME",
                "image": "YOUR_IMAGE_NAME:YOUR_IMAGE_TAG",
                "env": {
                    "FLASK_APP": "path_to/flask_entry_point.py",
                    "FLASK_ENV": "development"
                },
                "volumes": [
                    {
                        "containerPath": "/app",
                        "localPath": "${workspaceFolder}"
                    }
                ],
                "ports": [
                    {
                        "containerPort": 5000,
                        "hostPort": 5000
                    }
                ]
            },
            "python": {
                "args": [
                    "run",
                    "--host",
                    "0.0.0.0",
                    "--port",
                    "5000"
                ],
                "module": "flask"
            }
        },
        {
            "label": "docker-build",
            "type": "docker-build",
            "dockerBuild": {
                "context": "${workspaceFolder}",
                "dockerfile": "${workspaceFolder}/Dockerfile",
                "tag": "YOUR_IMAGE_NAME:YOUR_IMAGE_TAG"
            }
          }
        ]
      }
      ```

## 后续步骤

了解更多关于：

- [在容器中配置非根用户](/docs/containers/troubleshooting.md#running-as-a-non-root-user)
