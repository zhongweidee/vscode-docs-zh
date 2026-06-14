---
ContentId: 6DCA48F5-0566-4AEB-9C4C-CCBBA2945347
DateApproved: 6/10/2026
MetaDescription: 在 Visual Studio Code 中使用任务运行器的附加信息。
---
# 附录

这是 Visual Studio Code [任务](/docs/debugtest/tasks.md)的附加信息。

## tasks.json 架构

以下接口定义了 `tasks.json` 文件的基本架构。

>**注意**：某些任务选项由 VS Code 扩展提供。您可以使用 `tasks.json` IntelliSense 查找完整列表，使用**触发建议**命令（`kb(editor.action.triggerSuggest)`）。

```typescript

interface TaskConfiguration extends BaseTaskConfiguration {

    /**
     * 配置的版本号
     */
    version: "2.0.0";

    /**
     * Windows 特定的任务配置
     */
    windows?: BaseTaskConfiguration;

    /**
     * macOS 特定的任务配置
     */
    osx?: BaseTaskConfiguration;

    /**
     * Linux 特定的任务配置
     */
    linux?: BaseTaskConfiguration;
}

interface BaseTaskConfiguration {

    /**
     * 自定义任务的类型。类型为 "shell" 的任务将在
     * shell（例如 bash、cmd、powershell 等）内部执行
     */
    type?: "shell" | "process";

    /**
     * 要执行的命令。可以是外部程序或 shell
     * 命令。
     */
    command?: string;

    /**
     * 指定全局命令是否为后台任务。
     */
    isBackground?: boolean;

    /**
     * 执行命令时使用的命令选项。可以省略。
     */
    options?: CommandOptions;

    /**
     * 传递给命令的参数。可以省略。
     */
    args?: string[];

    /**
     * 呈现选项。
     */
    presentation?: PresentationOptions;

    /**
     * 执行全局命令时要使用的问题匹配器（例如，未定义
     * 任务时）。tasks.json 文件可以包含全局 problemMatcher
     * 属性或 tasks 属性，但不能同时包含两者。
     */
    problemMatcher?: string | ProblemMatcher | (string | ProblemMatcher)[];

    /**
     * 可用任务的配置。tasks.json 文件可以
     * 包含全局 problemMatcher 属性或 tasks 属性，但不能同时包含两者。
     */
    tasks?: TaskDescription[];
}


/**
 * 传递给外部程序或 shell 的选项
 */
export interface CommandOptions {

    /**
     * 执行的程序或 shell 的当前工作目录。
     * 如果省略，则使用当前工作区的根目录。
     */
    cwd?: string;

    /**
     * 执行的程序或 shell 的环境变量。如果省略，
     * 则使用父进程的环境变量。
     */
    env?: { [key:string]:string; };

    /**
      * 任务类型为 `shell` 时的 shell 配置
      */
     shell: {

        /**
        * 要使用的 shell。
        */
        executable: string;

        /**
        * 传递给 shell 可执行文件的参数，以命令模式运行
        * （例如，bash 的 ['-c'] 或 cmd.exe 的 ['/S', '/C']）。
        */
        args?: string[];
    }
}

/**
 * 任务的描述。
 */
interface TaskDescription {

    /**
     * 任务的名称
     */
    label: string;

    /**
     * 自定义任务的类型。类型为 "shell" 的任务将在
     * shell（例如 bash、cmd、powershell 等）内部执行
     */
    type?: "shell" | "process";

    /**
     * 要执行的命令。如果类型为 "shell"，则应为完整的
     * 命令行，包括传递给命令的任何附加参数。
     */
    command?: string;

    /**
     * 执行的命令是否保持运行并在后台运行。
     */
    isBackground?: boolean;

    /**
     * 传递给命令的附加参数。如果类型
     * 为 "process"，则应使用此选项。
     */
    args?: string[];

    /**
     * 定义此任务所属的组。同时支持将
     * 某个任务标记为组中的默认任务。
     */
    group?: "build" | "test" | { kind: "build" | "test"; isDefault: boolean };

    /**
     * 呈现选项。
     */
    presentation?: PresentationOptions;

    /**
     * 用于捕获任务输出中问题的问题匹配器。
     */
    problemMatcher?: string | ProblemMatcher | (string | ProblemMatcher)[];

    /**
     * 定义任务何时以及如何运行。
     */
    runOptions?: RunOptions;
}

interface PresentationOptions {

    /**
     * 控制是否在用户界面中显示任务输出。
     * 默认值为 `always`。
     */
    reveal?: "never" | "silent" | "always";

    /**
     * 控制与任务关联的命令是否在用户界面中回显。
     * 默认值为 `true`。
     */
    echo?: boolean;

    /**
     * 控制显示任务输出的面板是否获取焦点。
     * 默认值为 `false`。
     */
    focus?: boolean;

    /**
     * 控制任务面板是专用于此任务（dedicated）、
     * 在任务之间共享（shared），还是每次
     * 执行任务时创建一个新面板（new）。默认值为 `shared`。
     */
    panel?: "shared" | "dedicated" | "new";

    /**
     * 控制是否显示"终端将被任务重用，
     * 按任意键关闭"消息。
     */
    showReuseMessage?: boolean;

    /**
     * 控制在运行此任务之前是否清除终端。
     * 默认值为 `false`。
     */
    clear?: boolean;

    /**
     * 控制任务是否在使用分割窗格的特定终端
     * 组中执行。相同组（由字符串值指定）中的任务
     * 将使用分割终端呈现，而不是新的终端面板。
     */
    group?: string;
}

/**
 * 问题匹配器的描述，用于检测
 * 构建输出中的问题。
 */
interface ProblemMatcher {

    /**
     * 要使用的基础问题匹配器的名称。如果指定，则
     * 基础问题匹配器将用作模板，此处指定的
     * 属性将替换基础问题匹配器
     * 的属性。
     */
    base?: string;

    /**
     * 生成的 VS Code 问题的所有者。如果要将问题
     * 与语言服务生成的问题合并，则此值通常
     * 为 VS Code 语言服务的标识符或 'external'。如果省略，默认值为 'external'。
     */
    owner?: string;

    /**
     * 描述此问题来源的人类可读字符串。
     * 例如 'typescript' 或 'super lint'。
     */
    source?: string;

    /**
     * 此问题匹配器生成的 VS Code 问题的严重性。
     *
     * 有效值为：
     *   "error"：生成错误。
     *   "warning"：生成警告。
     *   "info"：生成信息。
     *
     * 如果模式未指定严重性匹配组，则使用此值。
     * 如果省略，默认值为 "error"。
     */
    severity?: string;

    /**
     * 定义应如何读取问题模式中报告的文件名。
     * 有效值为：
     *  - "absolute"：文件名始终被视为绝对路径。
     *  - "relative"：文件名始终被视为相对于
     *    当前工作目录。这是默认值。
     *  - ["relative", "path value"]：文件名始终
     *    被视为相对于给定的路径值。
     *  - "autodetect"：文件名被视为相对于
     *    当前工作区目录，如果文件
     *    不存在，则将其视为绝对路径。
     *  - ["autodetect", "path value"]：文件名被视为
     *    相对于给定的路径值，如果不存在，
     *    则将其视为绝对路径。
     *  - "search"：在目录中执行深度（可能较繁重）文件系统
     *    搜索。
     *  - ["search", {include: ["${workspaceFolder}"]}]：
     *    在 "include" 数组中给定的目录中执行深度搜索。
     *  - ["search", {include: ["${workspaceFolder}"], exclude: []}]：
     *    在 "include" 数组中给定的目录中执行深度搜索，
     *    排除 "exclude" 数组中命名的目录。
     */
    fileLocation?: string | string[] | ["search", {include?: string[]; exclude?: string[]}];

    /**
     * 预定义问题模式的名称、问题模式的内联定义
     * 或用于匹配跨多行分布的问题的模式数组。
     */
    pattern?: string | ProblemPattern | ProblemPattern[];

    /**
     * 用于检测后台任务（如 Gulp 中的监视任务）何时
     * 处于活动状态的附加信息。
     */
    background?: BackgroundMatcher;
}

/**
 * 跟踪后台任务开始和结束的描述。
 */
interface BackgroundMatcher {

    /**
     * 如果设置为 true，则监视器在任务启动时即处于活动模式。
     * 这相当于输出了一条匹配
     * beginPattern 的行。
     */
    activeOnStart?: boolean;

    /**
     * 如果在输出中匹配，则表示后台任务开始。
     */
    beginsPattern?: string | WatchingPattern;

    /**
     * 如果在输出中匹配，则表示后台任务结束。
     */
    endsPattern?: string | WatchingPattern;
}

interface WatchingPattern {

    /**
     * 用于检测后台任务开始或结束的正则表达式。
     */
    regexp?: string;

    /**
     * 文件名的匹配组索引。如果提供，则只
     * 对该文件匹配表达式。
     */
    file?: number;
}

interface ProblemPattern {

    /**
     * 用于在执行任务的终端输出中查找问题的正则表达式。
     */
    regexp: string;

    /**
     * 模式是否匹配整个文件的问题或文件内
     * 某个位置的问题。
     *
     * 默认值为 "location"。
     */
    kind?: "file" | "location";

    /**
     * 文件名的匹配组索引。
     */
    file: number;

    /**
     * 问题位置的匹配组索引。有效的位置
     * 模式为：(line)、(line,column) 和 (startLine,startColumn,endLine,endColumn)。
     * 如果省略，则使用 line 和 column 属性。
     */
    location?: number;

    /**
     * 源文件中问题行号的匹配组索引。
     * 只有在指定了 location 时才可以省略。
     */
    line?: number;

    /**
     * 源文件中问题列号的匹配组索引。
     */
    column?: number;

    /**
     * 源文件中问题结束行号的匹配组索引。
     *
     * 默认值为 undefined。不捕获结束行号。
     */
    endLine?: number;

    /**
     * 源文件中问题结束列号的匹配组索引。
     *
     * 默认值为 undefined。不捕获结束列号。
     */
    endColumn?: number;

    /**
     * 问题严重性的匹配组索引。
     *
     * 默认值为 undefined。在这种情况下，使用问题匹配器的严重性。
     */
    severity?: number;

    /**
     * 问题代码的匹配组索引。
     *
     * 默认值为 undefined。不捕获代码。
     */
    code?: number;

    /**
     * 消息的匹配组索引。默认值为 0。
     */
    message: number;

    /**
     * 指定多行问题匹配器中的最后一个模式是否应
     * 在连续匹配某行时循环。仅对多行问题匹配器中
     * 的最后一个问题模式有效。
     */
    loop?: boolean;
}

/**
 * 描述任务何时以及如何运行。
 */
interface RunOptions {

    /**
     * 控制通过"重新运行上次任务"命令执行任务时
     * 变量的评估方式。
     * 默认值为 `true`，表示重新运行任务时会重新评估变量。
     * 当设置为 `false` 时，将使用任务
     * 上一次运行时的已解析变量值。
     */
    reevaluateOnRerun?: boolean;

    /**
     * 指定任务何时运行。
     *
     * 有效值为：
     *   "default"：任务仅通过"运行任务"命令执行时运行。
     *   "folderOpen"：打开包含文件夹时运行任务。
     */
    runOn?: string;
}
```
