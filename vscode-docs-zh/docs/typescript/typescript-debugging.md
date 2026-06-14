---
ContentId: 19c60eb6-662b-444a-92f6-009642cc1e5b
DateApproved: 6/10/2026
MetaDescription: 使用 Visual Studio Code 进行 TypeScript 调试。
MetaSocialImage: ../languages/images/typescript/typescript-social.png
---
# 调试 TypeScript

Visual Studio Code 通过内置的 [Node.js 调试器](/docs/nodejs/nodejs-debugging.md) 和 [Edge 与 Chrome 调试器](/docs/nodejs/browser-debugging.md) 支持 TypeScript 调试。

## JavaScript 源映射支持

TypeScript 调试支持 JavaScript 源映射。若要为您的 TypeScript 文件生成源映射，请使用 `--sourcemap` 选项进行编译，或将 `tsconfig.json` 文件中的 `sourceMap` 属性设置为 `true`。

内联源映射（源映射内容以数据 URL 形式存储，而非单独文件）也受支持，但内联源代码尚未支持。

有关源映射实际应用的简单示例，请参阅 [TypeScript 教程](/docs/typescript/typescript-tutorial.md)，其中展示了使用以下 `tsconfig.json` 和 VS Code 默认 Node.js 调试配置来调试一个简单的 "Hello World" Node.js 应用程序。

```json
{
    "compilerOptions": {
        "target": "ES5",
        "module": "CommonJS",
        "outDir": "out",
        "sourceMap": true
    }
}
```

对于更高级的调试场景，您可以创建自己的调试配置 `launch.json` 文件。要查看默认配置，请转到 **运行和调试** 视图（`kb(workbench.view.debug)`）并选择 **创建 launch.json 文件** 链接。

这将在 `.vscode` 文件夹中创建一个 `launch.json` 文件，其中包含在项目中检测到的默认值。

```json
{
    // 使用 IntelliSense 了解可能的属性。
    // 悬停以查看现有属性的描述。
    // 有关详细信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/helloworld.ts",
            "preLaunchTask": "tsc: build - tsconfig.json",
            "outFiles": [
                "${workspaceFolder}/out/**/*.js"
            ]
        }
    ]
}
```

VS Code 已确定要启动的程序 `helloworld.ts`，将构建作为 `preLaunchTask` 包含在内，并告知调试器在哪里查找生成的 JavaScript 文件。

`launch.json` 提供完整的 IntelliSense 建议和信息，帮助您了解其他调试配置选项。您也可以使用右下角的 **添加配置** 按钮向 `launch.json` 添加新的调试配置。

![launch.json IntelliSense](images/debugging/launch-json-intellisense.png)

另请参阅 [Node.js 调试](/docs/nodejs/nodejs-debugging.md) 以获取示例和更多说明。

## 映射输出位置

如果生成（转译后）的 JavaScript 文件不与源文件位于同一位置，您可以通过在启动配置中设置 `outFiles` 属性来帮助 VS Code 调试器定位它们。每当您在原始源代码中设置断点时，VS Code 都会尝试通过搜索 `outFiles` 中由 glob 模式指定的文件来找到生成的源文件。

## 客户端调试

TypeScript 不仅适用于编写 Node.js 应用程序，也非常适合编写客户端代码，您可以使用[内置的 Edge 和 Chrome 调试器](/docs/nodejs/browser-debugging.md)调试客户端源代码。

我们将创建一个简单的 Web 应用程序来演示客户端调试的实际操作。

创建一个新文件夹 `HelloWeb` 并添加三个文件：`helloweb.ts`、`helloweb.html` 和 `tsconfig.json`，内容如下：

helloweb.ts

```typescript
let message : string = "Hello Web";
document.body.innerHTML = message;
```

helloweb.html

```html
<!DOCTYPE html>
<html>
    <head><title>TypeScript Hello Web</title></head>
    <body>
        <script src="out/helloweb.js"></script>
    </body>
</html>
```

tsconfig.json

```json
{
    "compilerOptions": {
        "target": "ES5",
        "module": "CommonJS",
        "outDir": "out",
        "sourceMap": true
    }
}
```

运行 `tsc` 构建应用程序，然后通过在浏览器中打开 `helloweb.html` 进行测试（您可以在文件资源管理器中右键单击 `helloweb.html` 并选择 **复制路径** 以粘贴到浏览器中）。

在 **运行和调试** 视图（`kb(workbench.view.debug)`）中，选择 **创建 launch.json 文件** 以创建一个 `launch.json` 文件，选择 **Web App (Edge)** 作为调试器，或者如果您更偏好 Chrome，则选择 **Web App (Chrome)**。

更新 `launch.json` 以指定 `helloweb.html` 的本地文件 URL：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "msedge",
            "request": "launch",
            "name": "Launch Edge against localhost",
            "url": "file:///C:/Users/username/HelloWeb/helloweb.html",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

**运行和调试** 视图的配置下拉菜单现在将显示新的配置 **Launch Edge against localhost**。如果您运行该配置，浏览器将启动并显示您的网页。在编辑器中打开 `helloweb.ts`，单击左侧边栏添加断点（将显示为红色圆点）。按 `kb(workbench.action.debug.start)` 启动调试会话，这将启动浏览器并在 `helloweb.ts` 中命中断点。

![客户端调试断点](images/debugging/client-side-debug-breakpoint.png)

## 常见问题

### 无法启动程序，因为找不到对应的 JavaScript 文件

您可能未在 `tsconfig.json` 中设置 `"sourceMap": true` 或在 `launch.json` 中设置 `outFiles`，导致 VS Code Node.js 调试器无法将您的 TypeScript 源代码映射到正在运行的 JavaScript。请启用源映射并重新构建您的项目。
