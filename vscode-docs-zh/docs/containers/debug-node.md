---
ContentId: F0C800DD-C477-492D-9545-745F570FE042
DateApproved: 12/21/2022
MetaDescription: 如何使用 Visual Studio Code 配置和排查在容器中运行的 Node.js 应用的调试。
---
# 在容器中调试 Node.js

向 Node.js 项目添加 Docker 文件时，会添加任务和启动配置，以便在容器中调试该应用程序。但是，由于 Node.js 拥有庞大的生态系统，这些任务无法适应所有应用程序框架或库，这意味着某些应用程序需要额外的配置。

## 配置容器入口点

容器工具扩展通过 `package.json` 的属性推断容器的入口点——即在容器中以调试模式启动应用程序的命令行。该扩展首先在 `scripts` 对象中查找 `start` 脚本；如果找到，且它以 `node` 或 `nodejs` 命令开头，则使用该命令构建在调试模式下启动应用程序的命令行。如果未找到，或者不是可识别的 `node` 命令，则使用 `package.json` 中的 `main` 属性。如果两者都未找到或无法识别，则需要显式设置用于启动容器的 `docker-run` 任务的 `dockerRun.command` 属性。

某些 Node.js 应用程序框架包含用于管理应用程序的 CLI，并在 `start` 脚本中使用它们来启动应用程序，这会掩盖底层的 `node` 命令。在这些情况下，容器工具扩展无法推断启动命令，您必须显式配置启动命令。

### 示例：为 [Nest.js](https://nestjs.com/) 应用程序配置入口点

```json
{
    "tasks": [
        {
            "type": "docker-run",
            "label": "docker-run: debug",
            "dependsOn": [
                "docker-build"
            ],
            "dockerRun": {
                "command": "nest start --debug 0.0.0.0:9229",
            },
            "node": {
                "enableDebugging": true
            }
        }
    ]
}
```

### 示例：为 [Meteor](https://www.meteor.com/) 应用程序配置入口点

```json
{
    "tasks": [
        {
            "type": "docker-run",
            "label": "docker-run: debug",
            "dependsOn": [
                "docker-build"
            ],
            "dockerRun": {
                "command": "node --inspect=0.0.0.0:9229 main.js",
            },
            "node": {
                "enableDebugging": true
            }
        }
    ]
}
```

## 自动启动浏览器到应用程序的入口页面

容器工具扩展可以在调试器中启动应用程序后自动启动浏览器访问其入口页面。此功能默认启用，并通过 `launch.json` 中调试配置的 `dockerServerReadyAction` 对象进行配置。

此功能取决于应用程序的几个方面：

- 应用程序必须将日志输出到调试控制台。
- 应用程序必须记录"服务器就绪"消息。
- 应用程序必须提供一个可浏览的页面。

虽然默认设置可能适用于基于 Express.js 的应用程序，但其他 Node.js 框架可能需要显式配置上述一个或多个方面。

### 确保应用程序日志写入调试控制台

此功能依赖于应用程序将其日志写入附加调试器的调试控制台。但是，并非所有日志框架都会写入调试控制台，即使配置为使用基于控制台的日志记录器（因为某些"控制台"日志记录器实际上绕过控制台，直接写入 `stdout`）。

解决方案因日志框架而异，但通常需要创建/添加一个*实际*写入控制台的日志记录器。

### 示例：配置 Express 应用程序写入调试控制台

默认情况下，[Express.js](https://expressjs.com/) 使用 [debug](https://github.com/visionmedia/debug) 日志模块，该模块可能会绕过控制台。可以通过将日志函数显式绑定到控制台的 `debug()` 方法来解决此问题。

```js
var app = require('../app');
var debug = require('debug')('my-express-app:server');
var http = require('http');

// 强制将日志记录到调试控制台。
debug.log = console.debug.bind(console);
```

另请注意，`debug` 日志记录器仅在通过 `DEBUG` 环境变量启用时才会写入日志，该变量可以在 `docker-run` 任务中设置。（当 Docker 文件添加到应用程序时，此环境变量默认设置为 `*`。）

```json
{
    "tasks": [
        {
            "type": "docker-run",
            "label": "docker-run: debug",
            "dependsOn": [
                "docker-build"
            ],
            "dockerRun": {
                "env": {
                    "DEBUG": "*"
                }
            },
            "node": {
                "enableDebugging": true
            }
        }
    ]
}
```

### 配置应用程序"就绪"的时机

当应用程序向调试控制台写入形如 `Listening on port <number>` 的消息时，扩展会判定应用程序已"就绪"接受 HTTP 连接，这与 Express.js 的默认行为相同。如果应用程序记录的是不同的消息，则应将调试启动配置中 [dockerServerReadyAction](/docs/containers/debug-common.md#dockerserverreadyaction-object-properties) 对象的 `pattern` 属性设置为匹配该消息的 [JavaScript 正则表达式](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions)。该正则表达式应包含一个捕获组，对应应用程序正在监听的端口。

例如，假设应用程序记录了以下消息：

```js
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Application has started on ' + bind);
}
```

调试启动配置（在 `launch.json` 中）中对应的 `pattern` 为：

```json
{
    "configurations": [
        {
            "name": "Containers: Node.js Launch",
            "type": "docker",
            "request": "launch",
            "preLaunchTask": "docker-run: debug",
            "platform": "node",
            "dockerServerReadyAction": {
                "pattern": "Application has started on port (\\d+)"
            }
        }
    ]
}
```

> 请注意用于端口号的 `(\\d+)` 捕获组，以及在 `\d` 字符类中使用 `\` 作为 JSON 转义字符表示反斜杠。

### 配置应用程序入口页面

默认情况下，容器工具扩展将打开浏览器的"主页"面（由应用程序决定）。如果应将浏览器打开到特定页面，则应将调试启动配置中 [dockerServerReadyAction](/docs/containers/debug-common.md#dockerserverreadyaction-object-properties) 对象的 `uriFormat` 属性设置为一个 Node.js 格式字符串，其中包含一个字符串标记，指示应在何处替换端口。

在调试启动配置（在 `launch.json` 中）中，用于打开 `about.html` 页面而非主页面的对应 `uriFormat` 为：

```json
{
    "configurations": [
        {
            "name": "Containers: Node.js Launch",
            "type": "docker",
            "request": "launch",
            "preLaunchTask": "docker-run: debug",
            "platform": "node",
            "dockerServerReadyAction": {
                "uriFormat": "http://localhost:%s/about.html"
            }
        }
    ]
}
```

## 将容器源文件映射到本地工作区

默认情况下，容器工具扩展假定运行中容器内的应用程序源文件位于 `/usr/src/app` 文件夹中，然后调试器将这些文件映射回已打开工作区的根目录，以便将容器中的断点转换回 Visual Studio Code。

如果应用程序源文件位于不同的位置（例如，不同的 Node.js 框架有不同的约定），无论是在容器内还是在已打开的工作区内，则应分别将调试启动配置中 [node](/docs/containers/debug-common.md#node-object-properties) 对象的 `localRoot` 和 `remoteRoot` 属性之一或两者设置为工作区内和容器内的根源位置。

例如，如果应用程序位于 `/usr/my-custom-location`，则对应的 `remoteRoot` 属性为：

```json
{
    "configurations": [
        {
            "name": "Containers: Node.js Launch",
            "type": "docker",
            "request": "launch",
            "preLaunchTask": "docker-run: debug",
            "platform": "node",
            "node": {
                "remoteRoot": "/usr/my-custom-location"
            }
        }
    ]
}
```

## 疑难解答

### 由于缺少 node_modules 导致容器映像无法构建或启动

Dockerfile 通常以优化映像构建时间、映像大小或两者兼有的方式进行编排。但是，并非所有 Node.js 应用程序框架都支持所有典型的 Node.js Dockerfile 优化。特别是，对于某些框架，`node_modules` 文件夹必须是应用程序根文件夹的直接子文件夹，而容器工具扩展生成的 Dockerfile 中 `node_modules` 文件夹位于父级或祖先级别（这通常是 Node.js 允许的）。

解决方案是从 `Dockerfile` 中移除该优化：

```docker
FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# 从 RUN 命令中移除 `&& mv node_modules ../`：
# RUN npm install --production --silent && mv node_modules ../
RUN npm install --production --silent
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
```
