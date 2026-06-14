---
ContentId: 8946213d-716e-41ca-955f-944a41c70353
MetaDescription: 开发容器（dev container）命令行接口使用文档
DateApproved: 6/10/2026
---
# 开发容器 CLI

本文介绍开发容器命令行接口（dev container CLI），它允许你构建和管理开发容器，是[开发容器规范](https://containers.dev)的配套工具。

## 开发容器

一致、可预测的环境是高效愉快的软件开发体验的关键。

容器（例如 [Docker](https://www.docker.com) 容器）历来用于在部署时标准化应用程序，但在支持其他场景方面也有很大的机会，包括持续集成（CI）、测试自动化以及功能齐全的编码环境。**开发容器**提供了这种工作环境，并确保你的项目拥有所需的工具和软件，无论它是复杂且分布式的，还是只有少量的需求。

![开发容器与生产容器的对比图](images/devcontainer-cli/dev-container-stages.png)

开发容器通过 [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) 扩展在 Visual Studio Code 中得到支持，并在 [GitHub Codespaces](https://docs.github.com/codespaces/setting-up-your-project-for-codespaces/introduction-to-dev-containers) 中得到支持。此支持基于 [devcontainer.json](https://containers.dev/implementors/json_reference)，这是一种带注释的结构化 JSON（jsonc）元数据格式，用于配置容器化环境。

随着容器化生产工作负载变得普遍，开发容器已广泛适用于 VS Code 之外的场景。为了在任何环境中推广开发容器，[开发容器规范](https://containers.dev/)的工作已经启动，这使得任何人在任何工具中都可以配置一致的开发环境。开源的 **dev container CLI** 作为该规范的参考实现。

## dev container CLI

当 VS Code 和 Codespaces 等工具在用户项目中检测到 `devcontainer.json` 文件时，它们会使用 CLI 来配置开发容器。dev container CLI 是一个参考实现，以便个人用户和其他工具可以读入 `devcontainer.json` 元数据并从中创建开发容器。

此 CLI 可以直接使用，也可以集成到产品体验中，类似于它今天在 Dev Containers 和 Codespaces 中的集成方式。它目前支持简单的单容器选项，并与 [Docker Compose](https://docs.docker.com/compose/) 集成以支持多容器场景。

CLI 可在 [devcontainers/cli](https://github.com/devcontainers/cli) 仓库中获取。

## 安装

你可以通过 Dev Containers 扩展快速试用 CLI。从命令面板（`kbstyle(F1)`）中选择 **Dev Containers: Install devcontainer CLI** 命令。

## 替代安装方式

在其他地方使用 CLI 还有以下选项：
- 安装其 npm 包
- 使用 GitHub Action 或 Azure DevOps Task
     - 你可以在 [devcontainers/ci](https://github.com/devcontainers/ci) 中找到这些
- 从源代码构建 CLI 仓库
     - 你可以在 [CLI 仓库的 README](https://github.com/devcontainers/cli#try-it-out) 中了解更多关于从源代码构建的信息

在本页中，我们将重点介绍使用 npm 包。

### npm 安装

要安装 npm 包，你需要安装 Python、Node.js（版本 14 或更高）和 C/C++ 来构建其中一个依赖项。VS Code [如何贡献](https://github.com/microsoft/vscode/wiki/How-to-Contribute) Wiki 提供了有关推荐工具集的详细信息。

```bash
npm install -g @devcontainers/cli
```

验证你可以运行 CLI 并查看其帮助文本：

```bash
devcontainer <command>

Commands:
  devcontainer up                   创建并运行开发容器
  devcontainer build [path]         构建开发容器镜像
  devcontainer run-user-commands    运行用户命令
  devcontainer read-configuration   读取配置
  devcontainer features             Features 命令
  devcontainer templates            Templates 命令
  devcontainer exec <cmd> [args..]  在运行中的开发容器上执行命令

Options:
  --help     显示帮助                                                 [boolean]
  --version  显示版本号                                                [boolean]
```

> **注意：** 如果你通过 VS Code 安装了 CLI，将会列出打开开发容器的 `open` 命令。

## 运行 CLI

安装 CLI 后，你可以尝试一个示例项目，比如这个 [Rust 示例](https://github.com/microsoft/vscode-remote-try-rust)。

将 Rust 示例克隆到你的机器上，然后使用 CLI 的 `up` 命令启动开发容器：

```bash
git clone https://github.com/microsoft/vscode-remote-try-rust
devcontainer up --workspace-folder <path-to-vscode-remote-try-rust>
```

这将从容器注册表下载容器镜像并启动容器。你的 Rust 容器现在应该正在运行：

```bash
[88 ms] dev-containers-cli 0.1.0.
[165 ms] Start: Run: docker build -f /home/node/vscode-remote-try-rust/.devcontainer/Dockerfile -t vsc-vscode-remote-try-rust-89420ad7399ba74f55921e49cc3ecfd2 --build-arg VARIANT=bullseye /home/node/vscode-remote-try-rust/.devcontainer
[+] Building 0.5s (5/5) FINISHED
 => [internal] load build definition from Dockerfile                       0.0s
 => => transferring dockerfile: 38B                                        0.0s
 => [internal] load .dockerignore                                          0.0s
 => => transferring context: 2B                                            0.0s
 => [internal] load metadata for mcr.microsoft.com/vscode/devcontainers/r  0.4s
 => CACHED [1/1] FROM mcr.microsoft.com/vscode/devcontainers/rust:1-bulls  0.0s
 => exporting to image                                                     0.0s
 => => exporting layers                                                    0.0s
 => => writing image sha256:39873ccb81e6fb613975e11e37438eee1d49c963a436d  0.0s
 => => naming to docker.io/library/vsc-vscode-remote-try-rust-89420ad7399  0.0s
[1640 ms] Start: Run: docker run --sig-proxy=false -a STDOUT -a STDERR --mount type=bind,source=/home/node/vscode-remote-try-rust,target=/workspaces/vscode-remote-try-rust -l devcontainer.local_folder=/home/node/vscode-remote-try-rust --cap-add=SYS_PTRACE --security-opt seccomp=unconfined --entrypoint /bin/sh vsc-vscode-remote-try-rust-89420ad7399ba74f55921e49cc3ecfd2-uid -c echo Container started
Container started
{"outcome":"success","containerId":"f0a055ff056c1c1bb99cc09930efbf3a0437c54d9b4644695aa23c1d57b4bd11","remoteUser":"vscode","remoteWorkspaceFolder":"/workspaces/vscode-remote-try-rust"}
```

之后，你可以在此开发容器中运行命令：

```bash
devcontainer exec --workspace-folder <path-to-vscode-remote-try-rust> cargo run
```

这将编译并运行 Rust 示例，输出如下：

```bash
[33 ms] dev-containers-cli 0.1.0.
   Compiling hello_remote_world v0.1.0 (/workspaces/vscode-remote-try-rust)
    Finished dev [unoptimized + debuginfo] target(s) in 1.06s
     Running `target/debug/hello_remote_world`
Hello, VS Code Dev Containers!
{"outcome":"success"}
```

上述步骤也在 CLI 仓库的 [README](https://github.com/devcontainers/cli/blob/main/README.md) 中提供。

## 自动化

如果你想在 CI/CD 构建或测试自动化中使用 dev container CLI，你可以在 [devcontainers/ci](https://github.com/devcontainers/ci) 仓库中找到 GitHub Actions 和 Azure DevOps Tasks 的示例。

## 预构建

`devcontainer build` 命令允许你按照 Dev Containers 扩展或 GitHub Codespaces 使用的相同步骤快速构建开发容器镜像。当你想要使用 GitHub Actions 等 CI 或 DevOps 产品预构建开发容器镜像时，这特别有用。

`build` 接受一个包含 `.devcontainer` 文件夹或 `.devcontainer.json` 文件的文件夹路径。例如，`devcontainer build --workspace-folder <my_repo>` 将为 `my_repo` 构建容器镜像。

### 构建并发布镜像的示例

例如，你可能想要预构建一些镜像，然后在多个项目或仓库中重用。为此，请按照以下步骤操作：

1. [创建](/docs/sourcecontrol/overview.md#initialize-a-repository)一个源代码仓库。

1. 为你想要预构建的每个镜像创建开发容器配置，并根据需要进行自定义（包括[开发容器 Features](/docs/devcontainers/containers.md#dev-container-features)）。例如，考虑以下 `devcontainer.json` 文件：

    ```json
    {
        "build": {
            "dockerfile": "Dockerfile"
        },
        "features": {
            "ghcr.io/devcontainers/features/docker-in-docker:1": {
                 "version": "latest"
            }
        }
    }
    ```

1. 使用 `devcontainer build` 命令构建镜像并将其[推送](https://docs.docker.com/engine/reference/commandline/push/)到你的镜像注册表。请参阅你的镜像注册表文档（例如 [Azure 容器注册表](https://learn.microsoft.com/azure/container-registry/container-registry-get-started-docker-cli?tabs=azure-cli)、[GitHub 容器注册表](https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-container-registry#pushing-container-images)或 [Docker Hub](https://docs.docker.com/engine/reference/commandline/push)）了解有关镜像命名和身份验证等其他步骤的信息。

    ```bash
    devcontainer build --workspace-folder <my_repo> --push true --image-name <my_image_name>:<optional_image_version>
    ```

## 避免使用 Docker 构建的镜像出现问题

鉴于 Dockerfile 和 Docker Compose 文件可以在没有 VS Code 或 `devcontainer` CLI 的情况下使用，你可能需要告知用户不应直接尝试构建镜像。你可以在[高级开发容器文档](/remote/advancedcontainers/reduce-docker-warnings.md#avoiding-problems-with-images-built-using-docker)中了解更多信息。

## Templates 和 Features

你可以使用 dev container CLI 来处理开发容器 [Templates](https://containers.dev/implementors/templates/) 和 [Features](https://containers.dev/implementors/features/)。在创建和使用 Templates 时，你可能希望将它们发布给其他人，你可以在[开发容器规范](https://containers.dev/implementors/templates-distribution/)中了解更多信息。

## 反馈

dev container CLI 和规范正在积极开发中，我们欢迎你的反馈，你可以在[此 issue](https://github.com/devcontainers/cli/issues/7) 中提供，或通过在 [devcontainers/cli](https://github.com/devcontainers/cli) 仓库中提交新 issue 和拉取请求来提供。

## 后续步骤

* [开发容器规范仓库](https://containers.dev/) - 阅读并为开放规范做出贡献。
* [devcontainer.json 参考](https://containers.dev/implementors/json_reference) - 查看 `devcontainer.json` 架构。
* [创建开发容器](/docs/devcontainers/create-dev-container.md) - 为你的工作环境创建自定义容器。
* [高级容器](/remote/advancedcontainers/overview.md) - 查找高级容器场景的解决方案。
