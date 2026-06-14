---
ContentId: 843e139a-9e3c-4b4f-95d1-32a9a7480e8e
DateApproved: 12/9/2021
MetaDescription: 在 Visual Studio Code 中导航和编辑 Java 源代码
---
# 导航和编辑 Java 源代码

Visual Studio Code 首先是一个源代码编辑器，具有丰富的编辑[功能](/docs/editing/codebasics.md)。在本文档中，我们将介绍一些在使用 Java 时非常有帮助的 Java 专属功能。

如果你在使用以下功能时遇到任何问题，可以通过提交 [issue](https://github.com/microsoft/vscode-java-pack/issues) 与我们联系。

## 代码导航

通过[大纲视图](/docs/editing/userinterface.md#outline-view)，你可以方便地浏览当前文件中的成员。[项目视图](/docs/java/java-project.md#projects-view)也提供了项目的整体概览。作为 Java 编辑器，它还支持调用层次结构、类型层次结构、定义导航、在工作区中搜索类型等功能。

## 搜索符号

你可以在当前文件或工作区中搜索符号，以便更快地导航代码。

### 在工作区中搜索符号

要在当前工作区中搜索符号，首先按下 `kb(workbench.action.showAllSymbols)`，然后输入符号名称。将显示一个可能的匹配项列表。如果你选择的匹配项位于尚未打开的文件中，该文件将在导航到匹配项位置之前打开。或者，你也可以使用**快速打开**（`kb(workbench.action.quickOpen)`），然后输入 '#' 命令来搜索当前工作区。`kb(workbench.action.showAllSymbols)` 就是 '#' 命令的快捷键，所以两者的工作方式完全相同。

<video src="images/java-editing/search-in-workspace.mp4" autoplay loop muted playsinline controls title="在工作区中搜索符号">
</video>

### 在当前文件中搜索符号

要在当前文件中搜索符号，使用**快速打开**（`kb(workbench.action.quickOpen)`），然后输入 '@' 命令，再输入你要查找的符号名称。将显示一个可能的匹配项列表，并在你输入时进行过滤。从匹配项列表中选择一个以导航到其位置。

<video src="images/java-editing/search-in-file.mp4" autoplay loop muted playsinline controls title="在当前文件中搜索符号">
</video>

## 速览定义

你可以使用速览定义功能快速查看符号的定义方式。此功能会在速览窗口中显示定义位置附近的几行代码，这样你就不必离开当前位置即可查看。

要速览符号的定义，将光标放在源代码中使用该符号的任意位置，然后按下 `kb(editor.action.peekDefinition)`。或者，你也可以从上下文菜单中（右键单击，然后选择**速览定义**）选择**速览定义**。

## 转到定义

你还可以使用转到定义功能快速导航到符号的定义位置。

要转到符号的定义，将光标放在源代码中使用该符号的任意位置，然后按下 `kb(editor.action.revealDefinition)`。或者，你也可以从上下文菜单中（右键单击，然后选择**转到定义**）选择**转到定义**。当该符号只有一个定义时，你将直接导航到其位置；否则，竞争的定义将显示在速览窗口中（如上一节所述），你需要选择要转到的定义。

## 转到超级实现

你可以通过悬停时单击**转到超级实现**链接来跟踪类实现和重写方法。

![Spring 导航](images/java-editing/goto-super.png)

<video src="images/java-editing/goto-super-implementation.mp4" autoplay loop muted playsinline controls title="转到超级实现">
</video>

## 调用层次结构

调用层次结构视图显示函数的所有调用方和被调用方，并允许你深入查看调用方的调用方和被调用的调用。右键单击一个函数，选择**速览** > **速览调用层次结构**。

![调用层次结构速览](images/java-editing/call-hierarchy.png)

你也可以在函数体内右键单击，选择**显示调用层次结构**。

![调用层次结构菜单](images/java-editing/call-hierarchy.gif)

## 类型层次结构

类型层次结构视图显示 Java 对象之间的继承关系。你可以右键单击一个类型，选择**显示类型层次结构**。

<video src="images/java-editing/type-hierarchy.mp4" autoplay loop muted playsinline controls title="类型层次结构">
</video>

## 折叠区域

折叠区域允许你折叠或展开代码片段，以便更好地查看源代码。

<video src="images/java-editing/folding-range.mp4" autoplay loop muted playsinline controls title="折叠区域">
</video>

## 智能选择

通过[智能选择](/updates/v1_33.md#smart-select-api)（语义选择），你可以根据源代码中光标位置的语义信息来扩展或收缩选择范围。

* 要扩展选择，使用 `kb(editor.action.smartSelect.expand)`。
* 要收缩选择，使用 `kb(editor.action.smartSelect.shrink)`。

<video src="images/java-editing/smart-selection.mp4" autoplay loop muted playsinline controls title="智能选择">
</video>

## 语义高亮

语法高亮是一项重要功能，可以让你更高效地阅读代码。借助[语义高亮](https://github.com/microsoft/vscode/wiki/Semantic-Highlighting-Overview)，VS Code 可以根据 Java 语言服务提供的符号信息，提供更准确的源代码着色。

下面是一个示例，左侧是启用语义高亮后的效果，右侧是仅使用语法高亮的效果。

![语义高亮](images/java-editing/semantic-highlighting.png)

你可以在 [Java 语言支持扩展 wiki](https://github.com/redhat-developer/vscode-java/wiki/Semantic-Highlighting) 上了解有关 Java 语义高亮的更多详细信息。

## 使用 Spring Boot 导航代码

[Spring Boot Tools](https://marketplace.visualstudio.com/items?itemName=vmware.vscode-spring-boot) 扩展为 Spring Boot 项目提供了增强的导航和代码补全支持。

* `@/` 显示所有已定义的请求映射（映射路径、请求方法、源位置）
* `@+` 显示所有已定义的 Bean（Bean 名称、Bean 类型、源位置）
* `@>` 显示所有函数（原型实现）
* `@` 显示代码中的所有 Spring 注解

![Spring 导航](images/java-editing/spring-navigation.png)

要了解有关在 Visual Studio Code 中使用 Spring Boot 支持的更多信息，请阅读 [Visual Studio Code 中的 Spring Boot](/docs/java/java-spring-boot.md)。

## 代码编辑

通过 IntelliSense 进行智能代码补全和签名详情，编写代码也变得很轻松。你可以使用代码片段以及各种代码操作（如生成 Getter/Setter 和组织导入）来进一步提高工作效率。

<video src="images/java-editing/code-editing.mp4" autoplay loop muted playsinline controls title="代码编辑">
</video>

Visual Studio Code 中的 Java 支持会自动检测代码中的问题，并为你提供快速修复建议。

<video src="images/java-editing/quick-fix.mp4" autoplay loop muted playsinline controls title="快速修复建议">
</video>

有关重构和代码操作的更多详细信息，请参见[重构和源代码操作](/docs/java/java-refactoring.md)。

## IntelliSense

Visual Studio Code 中 Java 的代码补全由 [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) 提供。该扩展由与 Eclipse 背后相同的 [Java 开发工具（JDT）](https://www.eclipse.org/jdt/)提供支持，因此你可以期待获得相同级别的支持。

此外，还有一个名为 [IntelliCode](https://visualstudio.microsoft.com/services/intellicode/) 的 AI 辅助 IntelliSense。它通过将你最可能使用的项目放在补全列表的顶部来节省你的时间。IntelliCode 的建议基于 GitHub 上成千上万的开源项目（每个项目都有超过 100 个星标），因此它是在高质量项目中最常见的用法上进行训练的。结合你的代码上下文，补全列表会定制为推广这些最佳实践。以下是 IntelliCode for Java 的实际效果。

<video src="images/java-editing/intellicode.mp4" autoplay loop muted playsinline controls title="IntelliSense 代码补全建议">
</video>

IntelliCode 与流行的 Java 库和框架（如 Java SE 和 Spring）配合得很好。无论你是在开发单体 Web 应用还是现代微服务，它都能帮助你。

## 创建新文件

VS Code 支持在创建 Java 源文件时应用模板。当你在文件资源管理器中创建一个 `.java` 文件时，语言服务器将自动生成类主体，并为你填充包信息：

<video src="images/java-editing/create-new-file.mp4" autoplay loop muted playsinline controls title="创建新文件">
</video>

## 代码片段

Visual Studio Code 支持各种常用的 Java 代码片段，让你更高效地工作，例如 class/interface、syserr、sysout、if/else、try/catch、static main method。利用 Java 语言服务器的信息，它还在选择过程中提供代码片段的预览。

例如，输入 "**sout**" 或 "**sysout**" 将生成 `System.out.println()` 的代码片段。<br>
类似地，输入 "**main**" 或 "**psvm**" 将生成 `public static void main(String[] args) {}` 的代码片段。

![代码片段](images/java-editing/code-snippet.png)

完整的快捷键列表如下：

### 代码片段快捷键

| 快捷键 | 描述 |
|---|---|
| ctor | 公共构造函数 |
| dowhile | Do-while 语句 |
| foreach, iter | 遍历数组或 Iterable |
| fori | 遍历数组 |
| if | If 语句 |
| ifelse | If-else 语句 |
| ifnull | 检查是否为 null 的 if 语句 |
| ifnotnull | 检查是否不为 null 的 if 语句 |
| main, psvm | 公共静态 main 方法 |
| new | 创建新对象 |
| private_method | 私有方法 |
| private_static_method | 私有静态方法 |
| prf | 私有字段 |
| protected_method | 受保护方法 |
| public_method | 公共方法 |
| public_static_method | 公共静态方法 |
| switch | Switch 语句 |
| syserr, serr | 打印到标准错误输出 |
| sysout, sout | 打印到标准输出 |
| systrace, soutm | 将当前方法打印到标准输出 |
| try_catch | Try/catch 块 |
| try_resources | Try-with-resources 语句 |
| while | While 语句 |

### 后缀片段快捷键

| 快捷键 | 模板内容 | 描述 |
|---|---|---|
| cast | ((SomeType) expr) | 将表达式强制转换为新类型 |
| else | if (!expr) | 创建一个取反的 if 语句 |
| for | for (T item : expr) | 创建一个 for 语句 |
| fori | for (int i = 0; i < expr.length; i++) | 创建一个遍历数组的 for 语句 |
| forr | for (int i = expr.length-1; i >= 0; i--) | 创建一个逆序遍历数组的 for 语句 |
| if | if (expr) | 创建一个 if 语句 |
| nnull | if (expr != null) | 创建一个 if 语句并检查表达式是否不为 null |
| null | if (expr == null) | 创建一个 if 语句并检查表达式是否为 null |
| sysout | System.out.println(expr) | 将受影响的字符串发送到 System.out.println(..) 调用 |
| throw | throw expr | 抛出给定的异常 |
| var | T name = expr | 创建一个新变量 |
| while | while (expr) {} | 创建一个 while 循环 |
