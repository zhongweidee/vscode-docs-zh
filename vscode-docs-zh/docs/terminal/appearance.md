---
ContentId: F1AA7F3E-E078-4C02-B2DE-EC3F5F36F751
DateApproved: 6/10/2026
MetaDescription: Visual Studio Code 的集成终端允许以多种方式自定义其外观。
---
# 终端外观

Visual Studio Code 终端的外观可以进行广泛的自定义。

![An example of a custom UI, using Powerline and Nerd Font symbols in the prompt and a custom workbench theme](images/appearance/terminal_appearance.png)

_[Sapphire](https://marketplace.visualstudio.com/items?itemName=tyriar.theme-sapphire) 主题搭配自定义 [Starship](https://starship.rs/) 提示符，使用 [Hack](https://sourcefoundry.org/hack/) 字体与 [Nerd Font](https://www.nerdfonts.com/) 符号_

## 文本样式

可以通过以下设置来自定义终端中的文本：

- `setting(terminal.integrated.fontFamily)`：要使用的字体系列，此设置接受 CSS 中 fontFamily 格式的字符串。例如，`"'Fira Code', monospace"` 将配置 `Fira Code` 作为主字体，`monospace` 作为缺少字形时的回退字体。
- `setting(terminal.integrated.fontSize)`：更改终端中文本的字体大小。
- `setting(terminal.integrated.letterSpacing)`：配置字符之间的额外水平间距（以像素为单位）。
- `setting(terminal.integrated.lineHeight)`：配置字符之间的额外垂直间距，以常规行高的倍数表示。例如，`1.1` 将添加 10% 的额外垂直空间。
- `setting(terminal.integrated.fontWeight)`：配置"正常"文本的字体粗细。
- `setting(terminal.integrated.fontWeightBold)`：配置"粗体"文本的字体粗细。
- `terminal.integrated.fontLigatures.*`：[配置连字](#连字)。

### Powerline 符号与 Nerd Fonts

[Powerline](https://powerline.readthedocs.io) 字体是特殊的补丁字体，包含可在终端中使用的额外字符。VS Code 的终端[无需配置字体即可渲染部分 Powerline 符号](#自定义字形)，但如果需要更多字形，请通过字体系列设置配置 Powerline 字体。Powerline 字体通常以 `" for Powerline"` 结尾，以下设置是如何配置经过补丁的 DejaVu Sans Mono 的示例：

```json
"editor.fontFamily": "'DejaVu Sans Mono for Powerline'"
```

Nerd Fonts 的工作方式相同，通常带有 `" NF"` 后缀，以下是如何配置 Hack 的 Nerd Fonts 变体的示例：

```json
"terminal.integrated.fontFamily": "'Hack NF'"
```

## 终端光标

可以通过以下设置自定义终端光标的样式以及是否闪烁：

- `setting(terminal.integrated.cursorStyle)`：定义光标的形状，可以是 block（方块）、line（线条）或 underline（下划线）。
- `setting(terminal.integrated.cursorWidth)`：当光标样式设置为 `line` 时光标的宽度（以像素为单位）。
- `setting(terminal.integrated.cursorBlinking)`：终端获得焦点时光标是否应闪烁。
- `setting(terminal.integrated.cursorStyleInactive)`：定义光标的形状，可以是 outline（轮廓）、block（方块）、line（线条）、underline（下划线）或 none（无）。

## 自定义选项卡

默认情况下，当有两个或更多终端时，终端选项卡会显示在终端视图的右侧，当只有一个终端时，活动终端会显示在视图标题中。

![A blank terminal without tabs and then with tabs displayed for three terminals](images/appearance/tabs.png)

### 可见性

默认的可见性设计旨在节省水平空间，但可能并非所有情况下都适用。可以通过以下设置配置选项卡的显示方式：

- `setting(terminal.integrated.tabs.hideCondition)`：何时隐藏右侧的选项卡，设置为 `never` 可始终显示它们。
- `setting(terminal.integrated.tabs.showActiveTerminal)`：何时在终端视图标题中显示活动终端。
- `setting(terminal.integrated.tabs.showActions)`：何时在视图标题中显示活动终端的操作。
- `setting(terminal.integrated.tabs.location)`：选项卡应显示在终端的左侧还是右侧。
- `setting(terminal.integrated.tabs.enabled)`：是否使用选项卡，禁用后将显示原始的下拉视图。

### 选项卡文本

每个选项卡上的文本由以下设置决定：

- `setting(terminal.integrated.tabs.title)`：选项卡标题。
- `setting(terminal.integrated.tabs.description)`：显示在标题右侧的文本。
- `setting(terminal.integrated.tabs.separator)`：标题和描述之间的分隔符。

默认情况下，标题显示 Shell 检测到的进程名称。

其他终端通常会显示 Shell 发送的转义序列作为标题，可以通过以下方式配置：

```json
"terminal.integrated.tabs.title": "${sequence}"
```

以下是所有可用的变量：

- `${cwd}`：终端的当前工作目录。
- `${cwdFolder}`：终端的当前工作目录，针对多根工作区显示，或在单根工作区中该值与初始工作目录不同时显示。在 Windows 上，仅当启用 Shell 集成时才会显示。
- `${workspaceFolder}`：终端启动时所在的工作区。
- `${workspaceFolderName}`：终端启动时所在的工作区名称。
- `${local}`：表示远程工作区中的本地终端。
- `${process}`：终端进程的名称。
- `${progress}`：由 OSC `9;4` 序列报告的进度状态。
- `${separator}`：一个条件分隔符（-），仅当它被带有值的变量或静态文本包围时才显示。
- `${sequence}`：进程提供给终端的名称。
- `${task}`：表示此终端与某个任务关联。
- `${shellType}`：检测到的 Shell 类型。
- `${shellCommand}`：根据 Shell 集成检测到的正在执行的命令。这还需要对检测到的命令行有较高的置信度，在某些提示符框架中可能无法正常工作。
- `${shellPromptInput}`：根据 Shell 集成检测到的 Shell 完整提示符输入。

### 图标

每个终端都有一个关联的图标，该图标由其[终端配置文件](/docs/terminal/profiles.md)决定。默认图标及其颜色（如果配置文件中未定义则使用）可以通过 `setting(terminal.integrated.tabs.defaultIcon)` 和 `setting(terminal.integrated.tabs.defaultColor)` 设置进行配置。

### 状态

终端的"状态"（如果有）由出现在选项卡右侧的图标表示。某些状态涉及动画。如果这会分散注意力，可以通过以下方式禁用动画：

```json
"terminal.integrated.tabs.enableAnimation": false
```

### 可视响铃

当终端的响铃被触发时，会短暂显示一个黄色的响铃图标。可以通过 `setting(terminal.integrated.enableBell)` 禁用它，并通过 `setting(terminal.integrated.bellDuration)` 配置持续时间。

## 终端颜色

虽然终端能够显示真彩色，但程序通常使用 8 种 ANSI 颜色（黑色、红色、绿色、黄色、蓝色、品红色、青色和白色）以及每种颜色的亮色变体。这些 ANSI 颜色由活动的[颜色主题](/docs/configure/themes.md)决定，但也可以通过 [workbench.colorCustomizations](/docs/configure/themes.md#workbench-colors) 设置独立于主题进行配置。

粗体文本是使用普通的 ANSI 颜色还是亮色变体，可以通过 `setting(terminal.integrated.drawBoldTextInBrightColors)` 设置进行配置。

### 最小对比度

终端通常会出现对比度问题，原因是深色/浅色主题、ANSI 颜色或正在运行的 Shell/程序之间存在冲突等等。

最小对比度功能通过增加或减少文本前景色的亮度直到达到 4.5:1 的对比度来解决此问题。

这样做的一个缺点是彩色文本有时可能会失去一些饱和度。可以通过以下方式配置或禁用此功能以获取原始颜色：

```json
"terminal.integrated.minimumContrastRatio": 1
```

## 连字

终端[连字](https://en.wikipedia.org/wiki/Ligature_(writing))允许将多个字符渲染为一个字符。你可以通过配置 `setting(terminal.integrated.fontLigatures.enabled)` 设置在终端中启用连字，前提是终端字体系列（`setting(terminal.integrated.fontFamily)`）支持连字。

![Enabling ligatures will combine certain sets of characters into one, for example >= into the greater than or equals sign](images/appearance/ligatures.png)

### 字体功能设置

启用连字后，还可以按照 [`font-feature-settings`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings) CSS 属性的格式设置详细的字体功能设置列表。这使你可以更精细地控制连字的渲染方式。例如，禁用标准的 `calt` 连字并启用特定的字体变体，看起来类似于 `"calt" off, "ss03"`。有关字体支持的变体列表，请参阅字体的文档。

### 回退连字

当字体支持连字但 VS Code 不支持解析该字体时，你可以禁用 [GPU 加速](#gpu-加速)或指定一个字符序列列表来手动组合以形成连字。

默认情况下，回退连字是编码中常用的连字列表。通过配置 `setting(terminal.integrated.fontLigatures.fallbackLigatures)` 设置来微调列表。例如：

```json
// 仅对 `ff`、`fi` 和 `fl` 使用连字
"terminal.integrated.fontLigatures.fallbackLigatures": [
    "ff",
    "fi",
    "fl"
]
```

## GPU 加速

终端具有两种不同的渲染器，每种都有不同的权衡：

- WebGL 渲染器 - 真正的 GPU 加速。
- DOM 渲染器 - 一个回退渲染器，速度慢得多但具有出色的兼容性。

由 WebGL 渲染器驱动的 GPU 加速在终端中默认启用。这通过显著减少 CPU 渲染每一帧所花费的时间，使终端运行更快并以高 FPS 显示。

`setting(terminal.integrated.gpuAcceleration)` 的默认值 `auto` 会首先尝试 WebGL 渲染器，如果失败则回退到 DOM 渲染器。在 Linux 虚拟机、不支持 WebGL 的浏览器或具有过时驱动程序的机器上，WebGL 可能无法正常工作。

### 自定义字形

当启用 [GPU 加速](#gpu-加速)时，自定义渲染（而非字体）会改善某些字符在终端中的显示效果。支持以下 Unicode 范围：

- 制表符（`U+2500`-`U+257F`）
- 方块元素（`U+2580`-`U+259F`）
- 盲文图案（`U+2800`-`U+28FF`）
- Powerline 符号（`U+E0A0`-`U+E0D4`，专用区）
- 进度指示器（`U+EE00`-`U+EE0B`，专用区）
- Git 分支符号（`U+F5D0`-`U+F60D`，专用区）
- 传统计算符号（`U+1FB00`-`U+1FBFF`）

这也意味着配置的字体不需要包含这些字符，并且它们会以像素完美的方式绘制，在适当的情况下会拉伸到整个单元格的大小。

以下是上述范围内所有约 800 个支持的字符：

![Box drawing, block characters and some Powerline symbols fill the entire cell in the terminal](images/appearance/custom-glyphs.png)

可以通过将 `setting(terminal.integrated.customGlyphs)` 设置为 `false` 来禁用此功能。

### 缩放模糊宽度字形

某些 Unicode 字符具有模糊宽度，终端后端和前端可能在大小上不一致。当启用 [GPU 加速](#gpu-加速)并出现这种模糊时，字形将在水平方向上进行缩放以适合单个单元格并防止重叠。

例如，下图中的罗马数字字符被压缩到单个单元格中：

![VIII and XII characters would be rescaled horizontally so as to not overlap with following characters. They feature a thinner stroke width when this happens due to the scaling](images/appearance/rescale-on.png)

可以通过将 `setting(terminal.integrated.rescaleOverlappingGlyphs)` 设置为 `false` 来禁用此功能，这将导致以下重叠渲染：

![When off, the VIII and XII characters may overlap the following characters](images/appearance/rescale-off.png)

## 自定义你的提示符

大多数 Shell 允许对终端提示符进行广泛的自定义。这是通过在 VS Code 外部配置你的 Shell 来完成的，通常通过修改 `$PS1` 变量、设置 `$PROMPT_COMMAND` 或安装插件来实现。

一些提示符工具如 [Starship](https://starship.rs/) 和 [oh-my-posh](https://ohmyposh.dev/) 会显示诸如 Git 状态等内容，并且适用于大多数 Shell，因此它们是入门时的不错选择。

## 常见问题

### 为什么我的终端显示一个多色三角形或黑色矩形？

在某些环境中，终端可能会遇到 GPU 加速渲染的问题。例如，你可能会看到一个大大的多色三角形而不是文本。这通常是由驱动程序/虚拟机图形问题引起的，同样的问题也会在 Chromium 中发生。通过使用 `--disable-gpu` 标志启动 `code`，或将 `setting(terminal.integrated.gpuAcceleration)` 设置为 `off` 以避免在终端中使用画布，可以解决这些问题。有关更多信息，请参阅 [GPU 加速](#gpu-加速)部分。

### 为什么终端中的颜色不正确？

[最小对比度功能](#最小对比度)可能会导致颜色未按预期显示。可以通过以下方式禁用它：

```json
"terminal.integrated.minimumContrastRatio": 1
```

默认启用的原因在 [vscode#146406](https://github.com/microsoft/vscode/issues/146406#issuecomment-1084825473) 中有说明。
