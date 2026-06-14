---
ContentId: F5EA1A52-1EF2-4127-ABA6-6CEF5447C608
DateApproved: 6/10/2026
MetaDescription: 通过 Visual Studio Code 中的任务集成来扩展您的开发工作流。
---
# 通过任务与外部工具集成

存在大量工具用于自动化执行诸如代码检查、构建、打包、测试或部署软件系统等任务。例如 [TypeScript 编译器](https://www.typescriptlang.org/)、代码检查工具如 [ESLint](https://eslint.org/) 和 [TSLint](https://palantir.github.io/tslint/)，以及构建系统如 [Make](https://en.wikipedia.org/wiki/Make_software)、[Ant](https://ant.apache.org/)、[Gulp](https://gulpjs.com/)、[Jake](https://jakejs.com/)、[Rake](https://ruby.github.io/rake/) 和 [MSBuild](https://github.com/microsoft/msbuild)。

![VS Code 可以与多种外部工具交互](images/tasks/tasks_hero.png)

这些工具大多从命令行运行，用于自动化软件开发的内部和外部循环（编辑、编译、测试和调试）中的任务。鉴于它们在开发生命周期中的重要性，能够在 VS Code 内部运行工具并分析其结果是非常有帮助的。VS Code 中的任务可以配置为运行脚本和启动进程，这样许多现有的工具就可以在 VS Code 内部使用，而无需进入命令行或编写新代码。工作区或文件夹特定的任务在 `.vscode` 文件夹中的 `tasks.json` 文件中配置。

扩展也可以使用[任务提供程序](/api/extension-guides/task-provider.md)来贡献任务，这些贡献的任务可以添加在 `tasks.json` 文件中定义的工作区特定配置。

>**注意：** 任务支持仅在打开工作区文件夹时可用。在编辑单个文件时不可用。

## TypeScript Hello World

让我们从一个简单的"Hello World" TypeScript 程序开始，我们想将其编译为 JavaScript。

创建一个空文件夹 "mytask"，生成一个 `tsconfig.json` 文件，然后从该文件夹启动 VS Code。

```bash
mkdir mytask
cd mytask
tsc --init
code .
```

现在创建一个包含以下内容的 `HelloWorld.ts` 文件

```ts
function sayHello(name: string): void {
    console.log(`Hello ${name}!`);
}

sayHello('Dave');
```

按下 `kb(workbench.action.tasks.build)` 或从全局**终端**菜单运行**运行生成任务**，会显示以下选择器：

![TypeScript 生成任务](images/tasks/typescript-build.png)

第一个条目执行 TypeScript 编译器并将 TypeScript 文件翻译为 JavaScript 文件。编译器完成后，应该会有一个 `HelloWorld.js` 文件。第二个条目以监视模式启动 TypeScript 编译器。每次保存 `HelloWorld.ts` 文件时，都会重新生成 `HelloWorld.js` 文件。

您还可以将 TypeScript 构建或监视任务定义为默认生成任务，这样在触发**运行生成任务** (`kb(workbench.action.tasks.build)`) 时会直接执行它。为此，从全局**终端**菜单中选择**配置默认生成任务**。这将显示一个包含可用生成任务的选择器。选择 **tsc: build** 或 **tsc: watch**，VS Code 将生成一个 `tasks.json` 文件。下面显示的文件将 **tsc: build** 任务设置为默认生成任务：

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "type": "typescript",
            "tsconfig": "tsconfig.json",
            "problemMatcher": [
                "$tsc"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```

上面的 `tasks.json` 示例并未定义新任务。它只是将 VS Code 的 TypeScript 扩展贡献的 **tsc: build** 任务标注为默认生成任务。您现在可以通过按 `kb(workbench.action.tasks.build)` 来执行 TypeScript 编译器。

## 任务自动检测

VS Code 目前为以下系统自动检测任务：Gulp、Grunt、Jake 和 npm。我们正在与相应的扩展作者合作，以添加对 Maven 和 C# `dotnet` 命令的支持。如果您使用 Node.js 作为运行时开发 JavaScript 应用程序，通常会有一个 `package.json` 文件描述您的依赖项和要运行的脚本。如果您已经克隆了 [eslint-starter](https://github.com/spicydonuts/eslint-starter) 示例，那么从全局菜单执行**运行任务**会显示以下列表：

![任务 ESLint 启动器](images/tasks/eslint-starter.png)

如果您还没有安装必要的 npm 模块，请运行 `npm install` 进行安装。现在打开 `server.js` 文件，在语句末尾添加一个分号（请注意，ESLint 启动器假定语句不带分号），然后再次执行**运行任务**。这次选择 **npm: lint** 任务。当提示选择要使用的问题匹配器时，选择 **ESLint stylish**

![任务 ESLint 问题匹配器选择](images/tasks/eslint-problem-matcher-selection.png)

执行该任务会产生一个错误，显示在**问题**视图中：

![任务 ESLint 问题](images/tasks/eslint-problem.png)

此外，VS Code 创建了一个包含以下内容的 `tasks.json` 文件：

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "type": "npm",
            "script": "lint",
            "problemMatcher": [
                "$eslint-stylish"
            ]
        }
    ]
}
```

这指示 VS Code 使用 ESLint stylish 格式扫描 **npm lint** 脚本的输出以查找问题。

对于 Gulp、Grunt 和 Jake，任务自动检测的工作方式相同。下面是为 [vscode-node-debug](https://github.com/microsoft/vscode-node-debug) 扩展检测到的任务的示例。

![Gulp 任务自动检测](images/tasks/gulp-auto-detect.png)

>**提示：** 您可以通过**快速打开** (`kb(workbench.action.quickOpen)`) 输入 'task'、`kbstyle(Space)` 和命令名称来运行您的任务。例如，输入 'task lint'。

任务自动检测可以通过以下设置来禁用：

```json
{
    "js/ts.tsc.autoDetect": "off",
    "grunt.autoDetect": "off",
    "jake.autoDetect": "off",
    "gulp.autoDetect": "off",
    "npm.autoDetect": "off"
}
```

## 自定义任务

并非所有任务或脚本都能在工作区中被自动检测到。有时需要定义自己的自定义任务。假设您有一个脚本用于运行测试，以便正确设置某些环境。该脚本存储在您的工作区内的一个 script 文件夹中，在 Linux 和 macOS 上名为 `test.sh`，在 Windows 上名为 `test.cmd`。从全局**终端**菜单运行**配置任务**，然后选择**从模板创建 tasks.json 文件**条目。这将打开以下选择器：

![配置任务运行器](images/tasks/configure-task-runner.png)

>**注意：** 如果您没有看到任务运行器模板列表，可能您的文件夹中已经有一个 `tasks.json` 文件，其内容将在编辑器中打开。请关闭该文件，然后删除或重命名它以继续此示例。

我们正在努力提供更多自动检测支持，因此这个列表将来会越来越小。由于我们想编写自己的自定义任务，请从列表中选择**其他**。这将打开 `tasks.json` 文件，其中包含一个任务骨架。用以下内容替换：

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run tests",
            "type": "shell",
            "command": "./scripts/test.sh",
            "windows": {
                "command": ".\\scripts\\test.cmd"
            },
            "group": "test",
            "presentation": {
                "reveal": "always",
                "panel": "new"
            }
        }
    ]
}
```

任务属性具有以下语义：

* **label**：任务在用户界面中使用的标签。
* **type**：任务的类型。对于自定义任务，可以是 `shell` 或 `process`。如果指定 `shell`，命令将被解释为 shell 命令（例如：bash、cmd 或 PowerShell）。如果指定 `process`，命令将被解释为要执行的进程。
* **command**：要执行的实际命令。
* **windows**：任何 Windows 特定的属性。在 Windows 操作系统上执行命令时，将使用这些属性代替默认属性。
* **group**：定义任务属于哪个组。在示例中，它属于 `test` 组。属于 test 组的任务可以通过从**命令面板**运行**运行测试任务**来执行。
* **presentation**：定义任务输出在用户界面中的处理方式。在此示例中，显示输出的集成终端将 `always`（总是）显示，并且每次运行任务时都会创建一个 `new` 终端。
* **options**：覆盖 `cwd`（当前工作目录）、`env`（环境变量）或 `shell`（默认 shell）的默认值。选项可以按任务设置，也可以全局设置或按平台设置。此处配置的环境变量只能在您的任务脚本或进程中引用，如果它们是您的 args、command 或其他任务属性的一部分，则不会被解析。
* **runOptions**：定义任务何时以及如何运行。
* **hide**：在"运行任务"快速选择中隐藏任务，这对于复合任务中不能独立运行的元素非常有用。

您可以通过 `tasks.json` 文件中的 IntelliSense 查看完整的任务属性和值集合。使用**触发建议** (`kb(editor.action.triggerSuggest)`) 调出建议，并阅读悬停时或**了解更多...**（'i'）弹出窗口中的描述。

![tasks.json IntelliSense](images/tasks/tasks-intellisense.png)

您还可以查看 [tasks.json 架构](/docs/reference/tasks-appendix.md)。

当涉及包含空格或其他特殊字符（如 `$`）的命令和参数时，Shell 命令需要特殊处理。默认情况下，任务系统支持以下行为：

* 如果提供了单个命令，任务系统会将命令原样传递给底层 shell。如果命令需要引号或转义才能正常工作，则命令需要包含正确的引号或转义字符。例如，要列出名称中包含空格的文件夹的目录，在 bash 中执行的命令应如下所示：`ls 'folder with spaces'`。

```json
{
  "label": "dir",
  "type": "shell",
  "command": "dir 'folder with spaces'"
}
```

* 如果提供了命令和参数，当命令或参数包含空格时，任务系统将使用单引号。对于 `cmd.exe`，使用双引号。如下所示的 shell 命令将在 PowerShell 中执行为 `dir 'folder with spaces'`。

```json
{
  "label": "dir",
  "type": "shell",
  "command": "dir",
  "args": [
    "folder with spaces"
  ]
}
```

* 如果您想控制参数的引号方式，参数可以是一个字面量，指定值和引号样式。下面的示例对包含空格的参数使用转义而不是引号。

```json
{
  "label": "dir",
  "type": "shell",
  "command": "dir",
  "args": [
    {
      "value": "folder with spaces",
      "quoting": "escape"
    }
  ]
}
```

除了转义之外，还支持以下值：

* **strong**：使用 shell 的强引号机制，它抑制字符串内的所有求值。在 PowerShell 以及 Linux 和 macOS 的 shell 下，使用单引号（`'`）。对于 cmd.exe，使用 `"`。
* **weak**：使用 shell 的弱引号机制，它仍然对字符串内的表达式求值（例如，环境变量）。在 PowerShell 以及 Linux 和 macOS 的 shell 下，使用双引号（`"`）。cmd.exe 不支持弱引号，因此 VS Code 也使用 `"`。

如果命令本身包含空格，VS Code 默认也会对命令使用强引号。与参数一样，用户可以使用相同的字面量样式来控制命令的引号方式。

还有更多的任务属性可用于配置您的工作流。您可以使用 `kb(editor.action.triggerSuggest)` 通过 IntelliSense 获取有效属性的概述。

![任务 IntelliSense](images/tasks/intellisense.png)

除了全局菜单栏，任务命令还可以通过**命令面板** (`kb(workbench.action.showCommands)`) 访问。您可以过滤 'task'，并查看各种与任务相关的命令。

![命令面板中的任务](images/tasks/command-palette.png)

### 复合任务

您还可以使用 `dependsOn` 属性用较简单的任务组合出复合任务。例如，如果您有一个包含 client 和 server 文件夹的工作区，并且两者都包含构建脚本，您可以创建一个在单独的终端中启动两个构建脚本的任务。如果在 `dependsOn` 属性中列出了多个任务，它们默认是并行执行的。

`tasks.json` 文件如下所示：

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Client Build",
            "command": "gulp",
            "args": ["build"],
            "options": {
                "cwd": "${workspaceFolder}/client"
            }
        },
        {
            "label": "Server Build",
            "command": "gulp",
            "args": ["build"],
            "options": {
                "cwd": "${workspaceFolder}/server"
            }
        },
        {
            "label": "Build",
            "dependsOn": ["Client Build", "Server Build"]
        }
    ]
}
```

如果您指定 `"dependsOrder": "sequence"`，则您的任务依赖项将按它们在 `dependsOn` 中列出的顺序执行。在带有 `"dependsOrder": "sequence"` 的 `dependsOn` 中使用的任何后台/监视任务必须具有跟踪它们何时"完成"的问题匹配器。以下任务依次运行任务 Two、任务 Three 和任务 One。

```json
{
    "label": "One",
    "type": "shell",
    "command": "echo Hello ",
    "dependsOrder": "sequence",
    "dependsOn":[
        "Two",
        "Three"
    ]
}
```

### 用户级任务

您可以使用**任务：打开用户任务**命令创建不绑定到特定工作区或文件夹的用户级任务。此处只能使用 `shell` 和 `process` 任务，因为其他任务类型需要工作区信息。

## 输出行为

有时您想控制运行任务时集成终端面板的行为。例如，您可能希望最大化编辑器空间，只有在认为有问题时才查看任务输出。可以使用任务的 `presentation` 属性来控制终端的行为。它提供以下属性：

* **reveal**：控制是否将集成终端面板置于最前面。有效值为：
  * `always` - 面板始终置于最前面。这是默认值。
  * `never` - 用户必须通过**视图** > **终端**命令 (`kb(workbench.action.terminal.toggleTerminal)`) 显式地将终端面板置于最前面。
  * `silent` - 仅在输出未被扫描出错误和警告时才将终端面板置于最前面。
* **revealProblems**：控制运行此任务时是否显示问题面板。优先于选项 `reveal`。默认值为 `never`。
  * `always` - 执行此任务时始终显示问题面板。
  * `onProblem` - 仅在发现问题时才显示问题面板。
  * `never` - 执行此任务时从不显示问题面板。
* **focus**：控制终端是否获取输入焦点。默认值为 `false`。
* **echo**：控制执行的命令是否在终端中回显。默认值为 `true`。
* **showReuseMessage**：控制是否显示"终端将被任务重用，按任意键关闭它"的消息。
* **panel**：控制终端实例是否在任务运行之间共享。可能的值有：
  * `shared` - 终端是共享的，其他任务运行的输出将添加到同一终端。
  * `dedicated` - 终端专用于特定任务。如果该任务再次执行，终端将被重用。但是，不同任务的输出将显示在不同的终端中。
  * `new` - 该任务的每次执行都使用一个新的干净终端。
* **clear**：控制运行此任务之前是否清除终端。默认值为 `false`。
* **close**：控制任务退出时，该任务运行的终端是否关闭。默认值为 `false`。
* **group**：控制任务是否在特定的终端组中使用分屏窗格执行。同一组中的任务（由字符串值指定）将使用分屏终端来呈现，而不是一个新的终端面板。

您也可以修改自动检测任务的终端面板行为。例如，如果您想更改上面 ESLint 示例中 **npm: run lint** 的输出行为，请为其添加 `presentation` 属性：

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "type": "npm",
            "script": "lint",
            "problemMatcher": [
                "$eslint-stylish"
            ],
            "presentation": {
                "reveal": "never"
            }
        }
    ]
}

```

您还可以将自定义任务与检测到的任务的配置混合使用。一个配置了 **npm: run lint** 任务并添加了一个自定义**Run Test** 任务的 `tasks.json` 如下所示：

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "type": "npm",
            "script": "lint",
            "problemMatcher": [
                "$eslint-stylish"
            ],
            "presentation": {
                "reveal": "never"
            }
        },
        {
            "label": "Run tests",
            "type": "shell",
            "command": "./scripts/test.sh",
            "windows": {
                "command": ".\\scripts\\test.cmd"
            },
            "group": "test",
            "presentation": {
                "reveal": "always",
                "panel": "new"
            }
        }
    ]
}

```

## 运行行为

您可以使用 `runOptions` 属性指定任务的运行行为：

* **reevaluateOnRerun**：控制通过**重新运行上一个任务**命令执行任务时变量如何求值。默认值为 `true`，这意味着重新运行任务时将重新求值变量。当设置为 `false` 时，将使用上一次任务运行的已解析变量值。
* **runOn**：指定任务何时运行。
  * `default` - 任务仅在通过**运行任务**命令执行时运行。
  * `folderOpen`：任务将在包含的文件夹打开时运行。另请参阅如何[控制自动任务执行](#控制自动任务执行)。

* **instanceLimit**：允许同时运行的任务实例数量。默认值为 `1`。

* **instancePolicy**：确定任务达到其 `instanceLimit` 时的处理方式。可以设置为：
  * `prompt` - 提示用户选择终止哪个实例（默认）。
  * `silent` - 不启动新实例（静默）。
  * `terminateNewest` - 终止最新的运行实例。
  * `terminateOldest` - 终止最旧的运行实例。
  * `warn` - 不启动新实例（显示警告）。

### 控制自动任务执行

`setting(task.allowAutomaticTasks)` 设置控制是否允许带有 `"runOn": "folderOpen"` 的任务在您打开工作区时自动运行。自动任务永远不会在[不受信任的工作区](/docs/editing/workspaces/workspace-trust.md)中运行，无论此设置如何。

该设置接受两个值：

* **off**（默认）：不运行自动任务。如果您尚未对当前工作区做出选择，系统会提示您**允许**或**禁止**自动任务。如果您选择**禁止**（或显式将值设置为 `off`），任务将不会运行，并且您不会再次收到提示。
* **on**：在打开受信任的工作区时始终运行自动任务，无需提示。

要配置此设置，请将其添加到您的用户或工作区设置中：

```json
{
    "task.allowAutomaticTasks": "off"
}
```

您也可以随时使用命令面板中的**任务：管理自动任务**命令更改选择，并在当前工作区的**允许自动任务**和**禁止自动任务**之间进行选择。

## 自定义自动检测的任务

如上所述，您可以在 `tasks.json` 文件中自定义自动检测的任务。通常这样做是为了修改演示属性或附加问题匹配器以扫描任务输出中的错误和警告。您可以直接从**运行任务**列表自定义任务，方法是按右侧的齿轮图标将相应的任务引用插入到 `tasks.json` 文件中。假设您有以下 Gulp 文件用于使用 ESLint 检查 JavaScript 文件的代码（该文件取自 [https://github.com/adametry/gulp-eslint](https://github.com/adametry/gulp-eslint)）：

```js
const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], function () {
    // This will only run if the lint task is successful...
});
```

从全局**终端**菜单执行**运行任务**将显示以下选择器：

![配置任务](images/tasks/configure-tasks.png)

按齿轮图标。这将创建以下 `tasks.json` 文件：

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "type": "gulp",
            "task": "default",
            "problemMatcher": []
        }
    ]
}
```

通常您现在会添加一个问题匹配器（在本例中为 `$eslint-stylish`）或修改演示设置。

## 使用问题匹配器处理任务输出

VS Code 可以使用问题匹配器处理任务的输出。问题匹配器扫描任务输出文本中已知的警告或错误字符串，并在编辑器和问题面板中以内联方式报告。VS Code 内置了几个"开箱即用"的问题匹配器：

* **TypeScript**：`$tsc` 假定输出中的文件名相对于打开的文件夹。
* **TypeScript Watch**：`$tsc-watch` 匹配在监视模式下执行的 `tsc` 编译器报告的问题。
* **JSHint**：`$jshint` 假定文件名以绝对路径报告。
* **JSHint Stylish**：`$jshint-stylish` 假定文件名以绝对路径报告。
* **ESLint Compact**：`$eslint-compact` 假定输出中的文件名相对于打开的文件夹。
* **ESLint Stylish**：`$eslint-stylish` 假定输出中的文件名相对于打开的文件夹。
* **Go**：`$go` 匹配 `go` 编译器报告的问题。假定文件名相对于打开的文件夹。
* **CSharp 和 VB 编译器**：`$mscompile` 假定文件名以绝对路径报告。
* **Lessc 编译器**：`$lessc` 假定文件名以绝对路径报告。
* **Node Sass 编译器**：`$node-sass` 假定文件名以绝对路径报告。

您也可以创建自己的问题匹配器，我们将在[后面的部分](/docs/debugtest/tasks.md#定义问题匹配器)中讨论。

## 将键盘快捷键绑定到任务

如果您需要频繁运行某个任务，可以为该任务定义一个键盘快捷键。

例如，要将 `Ctrl+H` 绑定到上面的**Run tests**任务，请将以下内容添加到您的 `keybindings.json` 文件中：

```json
{
    "key": "ctrl+h",
    "command": "workbench.action.tasks.runTask",
    "args": "Run tests"
}
```

## 变量替换

在编写任务配置时，拥有一组预定义的通用变量（例如活动文件 `${file}` 或工作区根文件夹 `${workspaceFolder}`）非常有用。VS Code 支持在 `tasks.json` 文件中的字符串内进行变量替换，您可以在[变量参考](/docs/reference/variables-reference.md)中查看预定义变量的完整列表。

>**注意：** 并非所有属性都接受变量替换。具体来说，只有 `command`、`args` 和 `options` 支持变量替换。

下面是一个自定义任务配置示例，该配置将当前打开的文件传递给 TypeScript 编译器。

```json
{
    "label": "TypeScript compile",
    "type": "shell",
    "command": "tsc ${file}",
    "problemMatcher": [
        "$tsc"
    ]
}
```

类似地，您可以通过在名称前加上 **${config:** 来引用项目的配置设置。例如，`${config:python.formatting.autopep8Path}` 返回 Python 扩展设置 `formatting.autopep8Path`。

下面是一个自定义任务配置示例，该配置使用 `python.formatting.autopep8Path` 设置定义的 autopep8 可执行文件对当前文件执行 autopep8：

```json
{
    "label": "autopep8 current file",
    "type": "process",
    "command": "${config:python.formatting.autopep8Path}",
    "args": [
        "--in-place",
        "${file}"
    ]
}
```

如果您想为 `tasks.json` 或 `launch.json` 指定 Python 扩展使用的所选 Python 解释器，可以使用 `${command:python.interpreterPath}` 命令。

如果简单的变量替换还不够，您还可以通过在 `tasks.json` 文件中添加 `inputs` 部分来从任务的用户获取输入。

![输入示例](images/tasks/run-input-example.gif)

有关 `inputs` 的更多信息，请参阅[变量参考](/docs/reference/variables-reference.md)。

## 操作系统特定属性

任务系统支持定义特定于操作系统的值（例如，要执行的命令）。为此，将一个操作系统特定的字面量放入 `tasks.json` 文件中，并在该字面量内指定相应的属性。

下面是一个使用 Node.js 可执行文件作为命令并在 Windows 和 Linux 上进行不同处理的示例：

```json
{
    "label": "Run Node",
    "type": "process",
    "windows": {
        "command": "C:\\Program Files\\nodejs\\node.exe"
    },
    "linux": {
        "command": "/usr/bin/node"
    }
}
```

有效的操作系统属性包括用于 Windows 的 `windows`、用于 Linux 的 `linux` 和用于 macOS 的 `osx`。在操作系统特定作用域中定义的属性会覆盖在任务或全局作用域中定义的属性。

## 全局任务

任务属性也可以在全局作用域中定义。如果存在，它们将用于特定任务，除非这些任务用不同的值定义了相同的属性。在下面的示例中，有一个全局的 `presentation` 属性，它定义了所有任务都应在新的面板中执行：

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "presentation": {
        "panel": "new"
    },
    "tasks": [
        {
            "label": "TS - Compile current file",
            "type": "shell",
            "command": "tsc ${file}",
            "problemMatcher": [
                "$tsc"
            ]
        }
    ]
}
```

>**提示：** 要访问全局作用域的 `tasks.json` 文件，请打开命令面板 (`kb(workbench.action.showCommands)`) 并运行**任务：打开用户任务**命令。

### PowerShell 中的字符转义

当默认 shell 是 PowerShell 时，或者当任务配置为使用 PowerShell 时，您可能会看到意外的空格和引号转义。意外的转义仅在 cmdlet 中发生，因为 VS Code 不知道您的命令是否包含 cmdlet。下面的示例 1 显示了一种情况，您会得到不适用于 PowerShell 的转义。示例 2 显示了获得良好转义的最佳跨平台方式。在某些情况下，您可能无法遵循示例 2，而需要进行示例 3 中所示的手动转义。

```json
"tasks": [
    {
        "label": "PowerShell example 1 (unexpected escaping)",
        "type": "shell",
        "command": "Get-ChildItem \"Folder With Spaces\""
    },
    {
        "label": "PowerShell example 2 (expected escaping)",
        "type": "shell",
        "command": "Get-ChildItem",
        "args": ["Folder With Spaces"]
    },
    {
        "label": "PowerShell example 3 (manual escaping)",
        "type": "shell",
        "command": "& Get-ChildItem \\\"Folder With Spaces\\\""
    }
]
```

## 更改任务输出的编码

任务经常与磁盘上的文件交互。如果这些文件以不同于系统编码的方式存储在磁盘上，您需要让作为任务执行的命令知道要使用的编码。由于这取决于操作系统和使用的 shell，因此没有通用的解决方案来控制这一点。下面是一些如何使其工作的建议和示例。

如果您需要调整编码，您应该检查是否有意义更改操作系统使用的默认编码，或者至少通过调整 shell 的配置文件来更改您使用的 shell 的编码。

如果您只需要为特定任务调整它，那么请将更改编码所需的操作系统特定命令添加到任务命令行中。以下示例适用于使用代码页 437 作为默认值的 Windows。该任务显示包含西里尔字符的文件的内容，因此需要代码页 866。列出文件的任务如下所示，假设默认 shell 设置为 `cmd.exe`：

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "more",
            "type": "shell",
            "command": "chcp 866 && more russian.txt",
            "problemMatcher": []
        }
    ]
}
```

如果任务在 `PowerShell` 中执行，命令需要像这样 `chcp 866; more russian.txt`。在 Linux 和 macOS 上，可以使用 `locale` 命令检查区域设置并调整必要的环境变量。

## 任务的实际示例

为了突出任务的强大功能，这里有几个关于 VS Code 如何使用任务集成外部工具（如代码检查器和编译器）的示例。

### 将 TypeScript 转译为 JavaScript

[TypeScript 主题](/docs/typescript/typescript-transpiling.md)包含一个示例，该示例创建一个任务将 TypeScript 转译为 JavaScript，并在 VS Code 内观察任何相关错误。

### 将 Less 和 SCSS 转译为 CSS

CSS 主题提供了如何使用任务生成 CSS 文件的示例。

1. [手动使用生成任务进行转译](/docs/languages/css.md#transpiling-sass-and-less-into-css)
2. [使用文件监视器自动化编译步骤](/docs/languages/css.md#automating-sassless-compilation)

## 定义问题匹配器

VS Code 内置了一些最常见的问题匹配器。然而，市面上有大量的编译器和代码检查工具，它们都产生自己风格的错误和警告，因此您可能想创建自己的问题匹配器。

我们有一个 `helloWorld.c` 程序，其中开发者将 **printf** 误输入为 **prinft**。使用 [gcc](https://gcc.gnu.org/) 编译它会产生以下警告：

```bash
helloWorld.c:5:3: warning: implicit declaration of function 'prinft'
```

我们想创建一个问题匹配器，它可以捕获输出中的消息并在 VS Code 中显示相应的问题。问题匹配器严重依赖[正则表达式](https://en.wikipedia.org/wiki/Regular_expression)。以下部分假设您熟悉正则表达式。

>**提示：** 我们发现 [RegEx101 playground](https://regex101.com/)（具有 ECMAScript（JavaScript）风格）是开发和测试正则表达式的绝佳方式。

捕获上述警告（和错误）的匹配器如下所示：

```json
{
    // The problem is owned by the cpp language service.
    "owner": "cpp",
    // The file name for reported problems is relative to the opened folder.
    "fileLocation": ["relative", "${workspaceFolder}"],
    // The name that will be shown as the source of the problem.
    "source": "gcc",
    // The actual pattern to match problems in the output.
    "pattern": {
        // The regular expression. Example to match: helloWorld.c:5:3: warning: implicit declaration of function 'printf' [-Wimplicit-function-declaration]
        "regexp": "^(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
        // The first match group matches the file name which is relative.
        "file": 1,
        // The second match group matches the line on which the problem occurred.
        "line": 2,
        // The third match group matches the column at which the problem occurred.
        "column": 3,
        // The fourth match group matches the problem's severity. Can be ignored. Then all problems are captured as errors.
        "severity": 4,
        // The fifth match group matches the message.
        "message": 5
    }
}
```

请注意，file、line 和 message 属性是必需的。`fileLocation` 指定任务输出产生并在问题中匹配的文件路径是 `absolute` 还是 `relative`。如果任务同时产生绝对和相对路径，您可以使用 `autoDetect` 文件位置。使用 `autoDetect` 时，路径首先被测试为绝对路径，如果文件不存在，则假定路径是相对的。

`severity` 指定如果模式中不包含问题严重程度，则使用哪种问题严重程度。`severity` 的可能值为 `error`、`warning` 或 `info`。

以下是完成后的 `tasks.json` 文件，其中包含上述代码（注释已删除）并包装了实际的任务详细信息：

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "build",
            "command": "gcc",
            "args": ["-Wall", "helloWorld.c", "-o", "helloWorld"],
            "problemMatcher": {
                "owner": "cpp",
                "fileLocation": ["relative", "${workspaceFolder}"],
                "source": "gcc",
                "pattern": {
                    "regexp": "^(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
                    "file": 1,
                    "line": 2,
                    "column": 3,
                    "severity": 4,
                    "message": 5
                }
            }
        }
    ]
}
```

在 VS Code 中运行它并按 `kb(workbench.actions.view.problems)` 获取问题列表，会得到以下输出：

![GCC 问题匹配器](images/tasks/problemmatcher.png)

>**注意：** [C/C++ 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)包含用于 GCC 的问题匹配器，因此无需自己定义。

还有一些更多可在模式内部使用的属性。它们是：

* **location** - 如果问题位置是 line 或 line,column 或 startLine,startColumn,endLine,endColumn，则可以使用我们的通用 location 匹配组。
* **endLine** - 问题结束行的匹配组索引。如果编译器未提供结束行值，可以省略。
* **endColumn** - 问题结束列的匹配组索引。如果编译器未提供结束列值，可以省略。
* **code** - 问题代码的匹配组索引。如果编译器未提供代码值，可以省略。

您还可以定义一个仅捕获文件的问题匹配器。为此，定义一个 `pattern`，并将可选的 `kind` 属性设置为 `file`。在这种情况下，无需提供 `line` 或 `location` 属性。

>**注意：** 如果 `kind` 属性设置为 `file`，功能模式必须至少为 `file` 和 `message` 提供匹配组。如果未提供 `kind` 属性或将 `kind` 属性设置为 `location`，功能模式还必须提供 `line` 或 `location` 属性。

>**注意：** 问题匹配器仅解析给定命令的输出。如果您想解析写入到单独文件（例如日志文件）的输出，请使您运行的命令在完成执行之前打印出该单独文件中的行。

## 定义多行问题匹配器

某些工具将源文件中发现的问题分散在多个行上，特别是使用 stylish 报告器时。一个例子是 [ESLint](https://eslint.org/)；在 stylish 模式下，它产生如下输出：

```bash
test.js
  1:0   error  Missing "use strict" statement                 strict
✖ 1 problems (1 errors, 0 warnings)
```

我们的问题匹配器是基于行的，因此我们需要以不同于实际问题位置和消息（1:0   error  Missing "use strict" statement）的正则表达式来捕获文件名（test.js）。

为此，请为 `pattern` 属性使用问题模式数组。这样，您可以为您想要匹配的每一行定义一个模式。

> **注意：** 在多行问题匹配器中，模式数组必须从第一个模式开始匹配输出的每一个连续行。您不能跳过中间行，即使它们不包含有用的信息。

如果您的工具输出三行，而您只需要第一行和第三行的数据，您的模式数组仍然需要三个条目。对您不需要数据的行使用 `{"regexp": "^.*$"}` 且不分配捕获组：

```json
"pattern": [
    { "regexp": "^Error:\\s+(.*)$", "message": 1 },
    { "regexp": "^.*$" },
    { "regexp": "^\\s+at\\s+(.*):(\\d+)$", "file": 1, "line": 2 }
]
```

以下问题模式匹配 ESLint stylish 模式的输出 - 但仍然有一个小问题需要我们在接下来解决。下面的代码有一个第一个正则表达式来捕获文件名，第二个正则表达式来捕获行、列、严重程度、消息和错误代码：

```json
{
    "owner": "javascript",
    "fileLocation": ["relative", "${workspaceFolder}"],
    "pattern": [
        {
            "regexp": "^([^\\s].*)$",
            "file": 1
        },
        {
            "regexp": "^\\s+(\\d+):(\\d+)\\s+(error|warning|info)\\s+(.*)\\s\\s+(.*)$",
            "line": 1,
            "column": 2,
            "severity": 3,
            "message": 4,
            "code": 5
        }
    ]
}
```

但是，如果资源上有多个问题，此模式将不起作用。例如，想象一下来自 ESLint 的以下输出：

```bash
test.js
  1:0   error  Missing "use strict" statement                 strict
  1:9   error  foo is defined but never used                  no-unused-vars
  2:5   error  x is defined but never used                    no-unused-vars
  2:11  error  Missing semicolon                              semi
  3:1   error  "bar" is not defined                           no-undef
  4:1   error  Newline required at end of file but not found  eol-last
✖ 6 problems (6 errors, 0 warnings)
```

模式的第一个正则表达式将匹配 "test.js"，第二个匹配 "1:0  error ..."。下一行 "1:9  error ..." 被处理但没有被第一个正则表达式匹配，因此不会捕获到任何问题。

要使其工作，多行模式的最后一个正则表达式可以指定 `loop` 属性。如果设置为 true，它指示任务系统将多行匹配器的最后一个模式应用于输出中的行，只要正则表达式匹配即可。

由第一个模式（在本例中匹配 `test.js`）捕获的信息将与每个匹配 `loop` 模式的后续行组合，以创建多个问题。在此示例中，将创建六个问题。

以下是一个用于完全捕获 ESLint stylish 问题的问题匹配器：

```json
{
    "owner": "javascript",
    "fileLocation": ["relative", "${workspaceFolder}"],
    "pattern": [
        {
            "regexp": "^([^\\s].*)$",
            "file": 1
        },
        {
            "regexp": "^\\s+(\\d+):(\\d+)\\s+(error|warning|info)\\s+(.*)\\s\\s+(.*)$",
            "line": 1,
            "column": 2,
            "severity": 3,
            "message": 4,
            "code": 5,
            "loop": true
        }
    ]
}
```

>**注意**：如果您在同一个资源上有多个问题且行和列完全相同，则只会显示一个问题。这适用于所有问题匹配器，不仅是多行问题匹配器。

## 修改现有问题匹配器

如果现有问题匹配器接近您的需求，您可以在 `tasks.json` 任务中修改它。例如，`$tsc-watch` 问题匹配器仅适用于已关闭的文档。如果您希望它适用于所有文档，可以这样修改：

```json
{
    "type": "npm",
    "script": "watch",
    "problemMatcher": {
        "base": "$tsc-watch",
        "applyTo": "allDocuments"
    },
    "isBackground": true,
}
```

其他可修改的问题匹配器属性包括 `background`、`fileLocation`、`owner`、`pattern`、`severity` 和 `source`。

## 后台/监视任务

某些工具支持在后台运行，同时监视文件系统的更改，然后在磁盘上的文件更改时触发操作。对于 `Gulp`，此类功能通过 npm 模块 [gulp-watch](https://www.npmjs.com/package/gulp-watch) 提供。TypeScript 编译器 `tsc` 通过 `--watch` 命令行选项内置了对这一功能的支持。

为了在 VS Code 中提供后台任务处于活动状态并产生问题结果的反馈，问题匹配器必须使用额外信息来检测输出中的这些 `state` 变化。让我们以 `tsc` 编译器为例。当编译器在监视模式下启动时，它会向控制台打印以下附加信息：

```bash
> tsc --watch
12:30:36 PM - Compilation complete. Watching for file changes.
```

当磁盘上包含问题的文件更改时，会出现以下输出：

```bash
12:32:35 PM - File change detected. Starting incremental compilation...
src/messages.ts(276,9): error TS2304: Cannot find name 'candidate'.
12:32:35 PM - Compilation complete. Watching for file changes.
```

查看输出显示了以下模式：

* 当 `File change detected. Starting incremental compilation...` 打印到控制台时，编译器运行。
* 当 `Compilation complete. Watching for file changes.` 打印到控制台时，编译器停止。
* 在这两个字符串之间报告问题。
* 编译器在初始启动时也会运行一次（不会将 `File change detected. Starting incremental compilation...` 打印到控制台）。

为了捕获这些信息，问题匹配器可以提供 `background` 属性。

对于 `tsc` 编译器，一个适当的 `background` 属性如下所示：

```json
"background": {
    "activeOnStart": true,
    "beginsPattern": "^\\s*\\d{1,2}:\\d{1,2}:\\d{1,2}(?: AM| PM)? - File change detected\\. Starting incremental compilation\\.\\.\\.",
    "endsPattern": "^\\s*\\d{1,2}:\\d{1,2}:\\d{1,2}(?: AM| PM)? - Compilation complete\\. Watching for file changes\\."
}
```

除了问题匹配器上的 `background` 属性外，任务本身必须标记为 `isBackground`，以便任务在后台持续运行。

一个完整的用于在监视模式下运行 `tsc` 任务的手工 `tasks.json` 如下所示：

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "watch",
            "command": "tsc",
            "args": ["--watch"],
            "isBackground": true,
            "problemMatcher": {
                "owner": "typescript",
                "fileLocation": "relative",
                "pattern": {
                    "regexp": "^([^\\s].*)\\((\\d+|\\d+,\\d+|\\d+,\\d+,\\d+,\\d+)\\):\\s+(error|warning|info)\\s+(TS\\d+)\\s*:\\s*(.*)$",
                    "file": 1,
                    "location": 2,
                    "severity": 3,
                    "code": 4,
                    "message": 5
                },
                "background": {
                    "activeOnStart": true,
                    "beginsPattern": "^\\s*\\d{1,2}:\\d{1,2}:\\d{1,2}(?: AM| PM)? - File change detected\\. Starting incremental compilation\\.\\.\\.",
                    "endsPattern": "^\\s*\\d{1,2}:\\d{1,2}:\\d{1,2}(?: AM| PM)? - Compilation complete\\. Watching for file changes\\."
                }
            }
        }
    ]
}
```

## 后续步骤

以上就是任务 - 让我们继续...

* [tasks.json 架构](/docs/reference/tasks-appendix.md) - 您可以查看完整的 `tasks.json` 架构和描述。
* [基本编辑](/docs/editing/codebasics.md) - 了解强大的 VS Code 编辑器。
* [代码导航](/docs/editing/editingevolved.md) - 在源代码中快速移动。
* [语言支持](/docs/languages/overview.md) - 了解我们支持的编程语言，包括 VS Code 内置的和通过社区扩展提供的。
* [调试](/docs/debugtest/debugging.md) - 直接在 VS Code 编辑器中调试您的源代码。

## 常见问题

### 任务可以使用与集成终端指定的不同的 shell 吗？

可以。您可以使用 `"terminal.integrated.automationProfile.*"` 设置来设置将用于 VS Code 中所有自动化（包括任务）的 shell。

```json
    "terminal.integrated.automationProfile.windows": {
        "path": "cmd.exe"
    }
```

或者，您可以使用 `options.shell` 属性覆盖任务的 shell。您可以按任务、全局或按平台设置此属性。例如，要在 Windows 上使用 cmd.exe，您的 `tasks.json` 应包括：

```json
{
    "version": "2.0.0",
    "windows": {
        "options": {
            "shell": {
                "executable": "cmd.exe",
                "args": [
                    "/d", "/c"
                ]
            }
        }
    },
    ...
```

### 后台任务是否可以用作 launch.json 中的 `prelaunchTask`？

可以。由于后台任务会运行直到被终止，后台任务本身没有表明它已经"完成"的信号。要使用后台任务作为 `prelaunchTask`，您必须向后天任务添加适当的后台 `problemMatcher`，以便任务系统和调试系统知道该任务何时"完成"。

您的任务可以是：

```json
{
    "type": "npm",
    "script": "watch",
    "problemMatcher": "$tsc-watch",
    "isBackground": true,
}
```

>**注意：** `$tsc-watch` 是一个**后台**问题匹配器，这是后台任务所必需的。

然后您可以在 `launch.json` 文件中将该任务用作 `prelaunchTask`：

```json
{
    "name": "Launch Extension",
    "type": "extensionHost",
    "request": "launch",
    "runtimeExecutable": "${execPath}",
    "args": [
        "--extensionDevelopmentPath=${workspaceRoot}"
    ],
    "stopOnEntry": false,
    "sourceMaps": true,
    "outFiles": [
        "${workspaceRoot}/out/src/**/*.js"
    ],
    "preLaunchTask": "npm: watch"
}
```

有关后台任务的更多信息，请前往[后台/监视任务](/docs/debugtest/tasks.md#后台监视任务)。

### 为什么在运行任务时出现"command not found"？

"command not found"消息发生在您尝试运行的任务命令不被您的终端识别为可运行的东西时。最常见的原因是命令被配置为您的 shell 启动脚本的一部分。任务是以非登录和非交互方式运行的，这意味着您的 shell 启动脚本不会被运行。特别是 `nvm`，已知会使用启动脚本作为其配置的一部分。

有几种方法可以解决此问题：

1. 确保您的命令在您的路径上，并且不需要启动脚本将其添加到您的路径中。这是解决问题的最彻底的方法，也是推荐的解决方案。
2. 您可以为您的任务做一个一次性修复，使其以登录或交互方式运行。这不推荐，因为它可能会产生其他后果。但是，对于单个任务来说，这也可以是一种快速简便的修复方法。下面是一个以 `bash` 作为 shell 执行此操作的任务示例：

```json
{
    "type": "npm",
    "script": "watch",
    "options": {
        "shell": {
            "args": ["-c", "-l"]
        }
    }
}
```

上面的 `npm` 任务将使用命令 (`-c`) 运行 `bash`，就像任务系统默认做的那样。然而，此任务还以登录 shell (`-l`) 的方式运行 `bash`。
