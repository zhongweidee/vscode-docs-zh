---
ContentId: 79bb60fd-5248-43d2-8801-34b9fc2ec543
MetaDescription: Visual Studio Code 容器开发故障排除技巧和窍门
DateApproved: 12/21/2022
---
# 容器工具技巧与窍门

本文介绍 Visual Studio Code [容器工具](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-containers) 扩展的故障排除技巧和窍门。请参阅 [概述](/docs/containers/overview.md) 以及 [Node.js](/docs/containers/quickstart-node.md)、[Python](/docs/containers/quickstart-python.md) 或 [ASP.NET](/docs/containers/quickstart-aspnet-core.md) 的快速入门文章，了解设置和使用容器的详细信息。

## 以非 root 用户身份运行

出于安全原因，我们建议在执行"**容器：将 Docker 文件添加到工作区...**"命令时选择默认端口，或者尽可能选择**大于** 1023 的端口。这将允许 VS Code 配置具有非 root 访问权限的 Dockerfile，并防止恶意用户在容器中提升权限。在某些情况下，没有端口选择，因此容器工具扩展默认配置非 root 访问权限。在所有情况下，您必须确保应用程序修改或使用的每个资源（例如端口和文件）都可以由容器中的非 root 用户访问。

如果在向工作区添加 Dockerfile 时选择的端口小于 1024，则容器工具扩展**无法**创建以非 root 用户身份运行容器的 Dockerfile。这是因为此范围内的端口被称为**众所周知的**或**系统**端口，必须以 root 权限执行才能将网络套接字绑定到 IP 地址。

如果选择非系统端口，"**容器：将 Docker 文件添加到工作区...**"命令会设置非 root 权限。如果您当前的 Dockerfile 和 `tasks.json` 未针对非 root 使用进行设置，请尝试运行"**容器：将 Docker 文件添加到工作区...**"命令，并选择一个**大于** 1023 的端口。此命令会覆盖您当前的 Dockerfile 和 `tasks.json`。对于某些项目类型，例如 **Python：常规**，您可能仍需要修改 Dockerfile 和 `tasks.json`。在 Dockerfile 中，您必须公开一个**非系统端口**，为应用代码创建工作目录，然后添加一个有权访问应用目录的非 root 用户。确保在任何引用处更新您公开的端口。在下面的示例中，Gunicorn 端口必须更新以匹配公开的端口：

```docker
# 1024 或更高
EXPOSE 1024

# ... 其他指令，例如安装 requirements.txt 文件

# 如果容器中尚不存在 /app，则创建它
# 将代码移植到 /app
WORKDIR /app
ADD . /app

# 创建一个非 root 用户并添加访问 /app 文件夹的权限
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

CMD ["gunicorn", "--bind", "0.0.0.0:1024", "pythonPath.to.wsgi"]
```

接下来，确保 `tasks.json` 中的 `docker run` 任务也期望相同的端口。您通常可以在 `tasks.json` 中搜索旧端口号的所有出现位置，并将其替换为新端口号。以下示例展示了 Python Django 应用中所需的更改：

``` json
{
  "type": "docker-run",
  "label": "docker-run: debug",
  "dependsOn": [
    "docker-build"
  ],
  "python": {
    "args": [
      "runserver",
      "0.0.0.0:1024", //<- 更改冒号后面的数字
      "--nothreading",
      "--noreload"
    ],
    "file": "manage.py"
  }
}
```

## 错误 "connect EACCES /var/run/docker.sock"（Linux 上）

由于 VS Code 以非 root 用户身份运行，您需要按照 [Linux 安装后步骤](https://aka.ms/AA37yk6) 中的"以非 root 用户管理 Docker"步骤操作，以便从扩展访问 Docker。

## 容器和镜像从容器资源管理器中消失

这很可能是由另一个名为 `Docker Explorer` 的扩展（非 Microsoft 编写）引起的冲突。要解决此问题，请使用 [vscode-docker issue #1609](https://github.com/microsoft/vscode-docker/issues/1609#issuecomment-586331394) 中描述的解决方法。

## 扩展在远程计算机上找不到 Docker

错误消息 "Failed to connect. Is Docker installed and running?"

1. 确保远程计算机上**已安装** Docker 引擎，并且 Docker CLI 正常工作（从终端运行 `docker ps`，确保不返回任何错误）。
2. 如果您使用的是远程开发环境（通过 SSH 的远程计算机、WSL 子系统、GitHub Codespace），请确保容器工具扩展在远程和本地都已安装。

## 无效的 URL 错误

如果您需要连接到远程 Docker 守护进程，我们建议使用 Docker 上下文，而不是设置中的 `containers.environment` 属性。请查看本指南，了解如何 [创建和使用上下文](https://docs.docker.com/engine/context/working-with-contexts/) 与远程 Docker 守护进程通信。

如果您仍然需要覆盖当前使用的 Docker 上下文，请确保您的 `DOCKER_HOST` 环境变量或 `containers.environment.DOCKER_HOST` 属性在 URL 中包含协议（例如，`ssh://myuser@mymachine` 或 `tcp://1.2.3.4`）。

> **注意：** 请记住，您的 `containers.environment.DOCKER_HOST` 属性将覆盖您的 Docker 上下文，而 `DOCKER_HOST` 环境变量将同时覆盖 `containers.environment.DOCKER_HOST` 属性和您的 Docker 上下文。

> **提示：** 在 Powershell 中，您可以使用 `$ENV:DOCKER_HOST = 'ssh://username@1.2.3.4'` 更改 Docker 环境变量

## 问题和反馈

我们非常欢迎您的反馈！如果您有任何想法或建议，请 [报告问题](https://github.com/microsoft/vscode-containers/issues/new)。
