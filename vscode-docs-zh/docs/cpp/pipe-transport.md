---
ContentId: 59BE5FF7-563F-4044-A562-294E75A75F96
DateApproved: 7/25/2019
MetaDescription: 如何在 Visual Studio Code 中设置用于调试 C++ 代码的管道传输。
Keywords:
- C++
---
# 管道传输

管道传输允许通过管道程序与远程 shell 进行通信。例如，Linux 上的 `ssh`。随着 [Visual Studio Code 远程开发](/docs/remote/remote-overview.md) 的推出，管道传输主要适用于 IoT 场景。

## 操作方法

`pipeTransport` 是 **launch.json** 文件中的一个选项。其结构如下：

```json
"pipeTransport": {
    "pipeCwd": "/usr/bin",
    "pipeProgram": "/usr/bin/ssh",
    "pipeArgs": [
        "-pw",
        "<password>",
        "user@10.10.10.10"
    ],
    "debuggerPath": "/usr/bin/gdb"
},
```

`pipeArgs` 可以是建立和验证管道连接所需的任意参数集。示例中使用的是密码，但你也可以使用 SSH 密钥。

你可能还需要添加 `sourceFileMap`，将代码在远程 shell 上的路径映射到本地路径：

```json
"sourceFileMap": {
    // "remote": "local"
    "/home/user/src": "/src/projectA/src"
}
```

## 附加

你也可以使用上述 `pipeTransport` 代码块来附加到远程进程。在附加情况下，你需要指定一个 `processId`。扩展可以从远程计算机查询进程。为此，将 `processId": "${command:pickProcess}` 改为 `processId": "${command:pickRemoteProcess}`。`pipeTransport` 设置将用于查询远程计算机上的进程。然后从下拉列表中选择进程。与 `launch` 一样，你可能需要配置 `sourceFileMap`。

## Docker 示例

`pipeTransport` 也可用于调试 Docker 容器中的进程。对于附加操作，**launch.json** 将包含：

```json
"pipeTransport": {
    "pipeCwd": "${workspaceFolder}",
    "pipeProgram": "docker",
    "pipeArgs": [
        "exec",
        "-i",
        "hello_gdb",
        "sh",
        "-c"
    ],
    "debuggerPath": "/usr/bin/gdb"
},
```

其中 `hello_gdb` 是你的容器名称。

通过启动容器，然后使用相同的 `pipeTransport` 在容器中启动额外的进程来进行启动调试。有关[完整示例](https://github.com/andyneff/hello-world-gdb/)，请参阅此 [launch.json](https://github.com/andyneff/hello-world-gdb/blob/master/.vscode/launch.json)。
