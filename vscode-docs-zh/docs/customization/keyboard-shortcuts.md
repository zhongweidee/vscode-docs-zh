## 常规

Key|命令
---|---
`kb(workbench.action.showCommands)`, `kbstyle(F1)`|显示命令面板
`kb(workbench.action.quickOpen)`|快速打开
`kb(workbench.action.newWindow)`|新建窗口/实例
`kb(workbench.action.closeWindow)`|关闭窗口/实例

## 基本编辑

Key|命令
---|---
`kb(editor.action.clipboardCutAction)`|剪切行（未选中内容时）
`kb(editor.action.clipboardCopyAction)`|复制行（未选中内容时）
`kb(editor.action.movelinesdownAction)`|向下移动行
`kb(editor.action.movelinesupAction)`|向上移动行
`kb(editor.action.copylinesdownAction)`|向下复制行
`kb(editor.action.copylinesupAction)`|向上复制行
`kb(editor.action.deletelines)`|删除行
`kb(editor.action.insertlineAfter)`|在下方插入行
`kb(editor.action.insertlineBefore)`|在上方插入行
`kb(editor.action.jumpToBracket)`|跳转到匹配的括号
`kb(editor.action.indentlines)`|缩进行
`kb(editor.action.outdentlines)`|减少缩进
`kb(cursorHome)`|转到行首
`kb(cursorend)`|转到行尾
`kb(cursorTop)`|转到文件开头
`kb(cursorBottom)`|转到文件结尾
`kb(scrolllineup)`|向上滚动行
`kb(scrolllinedown)`|向下滚动行
`kb(scrollPageup)`|向上滚动页面
`kb(scrollPagedown)`|向下滚动页面
`kb(editor.fold)`|折叠区域
`kb(editor.unfold)`|展开区域
`kb(editor.toggleFold)`|切换折叠区域
`kb(editor.foldRecursively)`|折叠所有子区域
`kb(editor.unfoldRecursively)`|展开所有子区域
`kb(editor.foldAll)`|折叠所有区域
`kb(editor.unfoldAll)`|展开所有区域
`kb(editor.action.addcommentline)`|添加行注释
`kb(editor.action.removecommentline)`|移除行注释
`kb(editor.action.commentline)`|切换行注释
`kb(editor.action.blockcomment)`|切换块注释
`kb(editor.action.toggleWordWrap)`|切换自动换行

## 搜索和替换

Key|命令
---|---
`kb(actions.find)`|查找
`kb(editor.action.startFindReplaceAction)`|替换
`kb(editor.action.nextMatchFindAction)`|查找下一个
`kb(editor.action.previousMatchFindAction)`|查找上一个
`kb(editor.action.selectAllMatches)`|选择所有查找匹配项
`kb(editor.action.addSelectionTonextFindMatch)`|将下一个查找匹配项添加到选中
`kb(editor.action.moveSelectionTonextFindMatch)`|将上次选中移动到下一个查找匹配项
`kb(toggleFindCaseSensitive)`|切换查找区分大小写
`kb(toggleFindRegex)`|切换查找正则表达式
`kb(toggleFindWholeWord)`|切换查找全字匹配

## 多光标和选择

Key|命令
---|---
`kbstyle(Alt+Click)`|插入光标
`kb(editor.action.insertCursorabove)`|在上方插入光标
`kb(editor.action.insertCursorbelow)`|在下方插入光标
`kb(cursorUndo)`|撤销上一次光标操作
`kb(editor.action.insertCursorAtendOfEachlineSelected)`|在选中每一行的末尾插入光标
`kb(expandlineSelection)`|选择当前行
`kb(editor.action.selectHighlights)`|选择当前选中的所有匹配项
`kb(editor.action.changeAll)`|选择当前单词的所有匹配项
`kb(editor.action.smartSelect.expand)`|扩展选择
`kb(editor.action.smartSelect.shrink)`|缩小选择
`kbstyle(Shift+Alt)` + 拖动鼠标 |列选择
`kb(cursorColumnSelectup)`|向上列选择
`kb(cursorColumnSelectdown)`|向下列选择
`kb(cursorColumnSelectLeft)`|向左列选择
`kb(cursorColumnSelectRight)`|向右列选择
`kb(cursorColumnSelectPageup)`|向上翻页列选择
`kb(cursorColumnSelectPagedown)`|向下翻页列选择

## 富语言编辑

Key|命令
---|---
`kb(editor.action.triggerSuggest)`|触发建议
`kb(editor.action.triggerParameterHints)`|触发参数提示
`kb(editor.action.formatDocument)`|格式化文档
`kb(editor.action.formatSelection)`|格式化选中内容
`kb(editor.action.revealDefinition)`|转到定义
`kb(editor.action.peekDefinition)`|速览定义
`kb(editor.action.revealDefinitionAside)`|在侧边打开定义
`kb(editor.action.quickFix)`|快速修复
`kb(editor.action.goToReferences)`|转到引用
`kb(editor.action.rename)`|重命名符号
`kb(editor.action.inPlaceReplace.down)`|替换为下一个值
`kb(editor.action.inPlaceReplace.up)`|替换为上一个值
`kb(editor.action.trimTrailingWhitespace)`|裁剪尾随空格
`kb(workbench.action.editor.changeLanguageMode)`|更改文件语言

## 导航

Key|命令
---|---
`kb(workbench.action.showAllSymbols)`|显示所有符号
`kb(workbench.action.gotoline)`|转到行...
`kb(workbench.action.quickOpen)`|转到文件...
`kb(workbench.action.gotoSymbol)`|转到符号...
`kb(workbench.actions.view.problems)`|显示问题面板
`kb(editor.action.marker.nextInFiles)`|转到下一个错误或警告
`kb(editor.action.marker.prevInFiles)`|转到上一个错误或警告
`kb(workbench.action.openpreviousRecentlyUsedEditorInGroup)`|导航编辑器组历史记录
`kb(workbench.action.navigateBack)`|后退
`kb(workbench.action.quickInputBack)`|在快速输入界面中返回上一步
`kb(workbench.action.navigateForward)`|前进
`kb(editor.action.toggleTabFocusMode)`|切换 Tab 键移动焦点

## 编辑器管理

Key|命令
---|---
`kb(workbench.action.closeActiveEditor)`, `kbstyle(Ctrl+W)`|关闭编辑器
`kb(workbench.action.closeFolder)`|关闭文件夹
`kb(workbench.action.splitEditor)`|拆分编辑器
`kb(workbench.action.focusFirstEditorGroup)`|聚焦到第一个编辑器组
`kb(workbench.action.focusSecondEditorGroup)`|聚焦到第二个编辑器组
`kb(workbench.action.focusThirdEditorGroup)`|聚焦到第三个编辑器组
`kb(workbench.action.moveEditorLeftInGroup)`| 向左移动编辑器
`kb(workbench.action.moveEditorRightInGroup)`| 向右移动编辑器
`kb(workbench.action.moveActiveEditorGroupLeft)`|向左/上移动活动编辑器组
`kb(workbench.action.moveActiveEditorGroupRight)`|向右/下移动活动编辑器组

## 文件管理

Key|命令
---|---
`kb(workbench.action.files.newUntitledfile)`|新建文件
`kb(workbench.action.files.openfile)`|打开文件...
`kb(workbench.action.files.openFileFolder)`|打开文件... (macOS)
`kb(workbench.action.files.save)`|保存
`kb(workbench.action.files.saveAs)`|另存为...
`kb(saveAll)`|全部保存
`kb(workbench.action.closeActiveEditor)`|关闭
`kb(workbench.action.closeAllEditors)`|全部关闭
`kb(workbench.action.reopenClosedEditor)`|重新打开已关闭的编辑器
`kb(workbench.action.keepEditor)`|保持打开
`kb(workbench.action.opennextRecentlyUsedEditorInGroup)`|打开下一个
`kb(workbench.action.openpreviousRecentlyUsedEditorInGroup)`|打开上一个
`kb(workbench.action.files.copyPathOfActivefile)`|复制活动文件的路径
`kb(workbench.action.files.revealActivefileInWindows)`|在资源管理器中显示活动文件
`kb(workbench.action.files.showOpenedfileInNewWindow)`|在新窗口/实例中显示活动文件

## 显示

Key|命令
---|---
`kb(workbench.action.toggleFullScreen)`|切换全屏
`kb(workbench.action.toggleEditorGroupLayout)`|切换编辑器布局
`kb(workbench.action.zoomIn)`|放大
`kb(workbench.action.zoomOut)`|缩小
`kb(workbench.action.toggleSidebarVisibility)`|切换侧边栏可见性
`kb(workbench.view.explorer)`|显示资源管理器 / 切换焦点
`kb(workbench.view.search)`|显示搜索
`kb(workbench.view.scm)`|显示源代码管理
`kb(workbench.view.debug)`|显示运行
`kb(workbench.view.extensions)`|显示扩展
`kb(workbench.action.replaceInfiles)`|在文件中替换
`kb(workbench.action.search.toggleQueryDetails)`|切换搜索详情
`kb(workbench.action.terminal.openNativeConsole)`|打开新的命令提示符/终端
`kb(workbench.action.output.toggleOutput)`|显示输出面板
`kb(markdown.togglePreview)`|切换 Markdown 预览
`kb(markdown.showPreviewToSide)`|在侧边打开 Markdown 预览

## 调试

Key|命令
---|---
`kb(editor.debug.action.toggleBreakpoint)`|切换断点
`kb(workbench.action.debug.start)`|开始
`kb(workbench.action.debug.continue)`|继续
`kb(workbench.action.debug.stepInto)`|步入
`kb(workbench.action.debug.stepOut)`|步出
`kb(workbench.action.debug.stepOver)`|步过
`kb(workbench.action.debug.stop)`|停止
`kb(editor.action.showHover)`|显示悬停提示

## 集成终端

Key|命令
---|---
`kb(workbench.action.terminal.toggleTerminal)`|显示集成终端
`kb(workbench.action.terminal.new)`|创建新终端
`kb(workbench.action.terminal.copySelection)`|复制选中内容
`kb(workbench.action.terminal.paste)`|粘贴到活动终端
`kb(workbench.action.terminal.scrollup)`|向上滚动
`kb(workbench.action.terminal.scrolldown)`|向下滚动
`kb(workbench.action.terminal.scrollupPage)`|向上滚动页面
`kb(workbench.action.terminal.scrolldownPage)`|向下滚动页面
`kb(workbench.action.terminal.scrollToTop)`|滚动到顶部
`kb(workbench.action.terminal.scrollToBottom)`|滚动到底部

