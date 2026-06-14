---
ContentId: e3bf9098-7b2f-4b23-9e0f-3d2094bad80a
DateApproved:
MetaDescription: Visual Studio Code 语音辅助功能。了解 VS Code 如何通过语音进行各种操作。
---
# 语音支持

[VS Code Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech) 扩展通过使用您的语音来启用各种功能。安装后，该扩展使您能够在编辑器中听写，或通过语音与 [VS Code 中的聊天](/docs/chat/chat-overview.md) 进行交互。

![Screenshot of the VS Code Speech extension marketplace details](images/accessibility/speech-extension.png)

> [!NOTE]
> VS Code 中的语音支持不需要您保持在线。录音永远不会发送到任何在线服务，而是在您的本地计算机上进行处理。

## 入门

要开始使用 VS Code 中的语音支持，请从扩展市场安装 [VS Code Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech) 扩展。

## 编辑器听写

您可以通过以下命令在编辑器中进行听写：**Voice: Start Dictation in Editor** (`kb(workbench.action.editorDictation.start)`) 和 **Voice: Stop Dictation in Editor** (`kb(workbench.action.editorDictation.stop)`)。启动后，光标处会出现一个小型麦克风图标，等待您的语音输入：

![Editor Dictation Mode](images/accessibility/editor-dictate.png)

按住语音开始命令的键盘快捷键 (`kb(workbench.action.editorDictation.start)`) 可启用**对讲机模式**。语音识别将保持激活状态，直到您松开按键，之后请求会自动提交。

> [!NOTE]
> 听写甚至可以在使用富文本编辑器的其他地方工作，例如 SCM 提交输入框和审查拉取请求时的评论输入字段。

## 聊天中的语音

您可以轻松地使用语音与 [VS Code 中的聊天](/docs/chat/chat-overview.md) 进行交流。命令 **Chat: Start Voice Chat** (`kb(workbench.action.chat.startVoiceChat)`) 会打开一个语音聊天，无论当前焦点在哪里。如果焦点在编辑器中，则会启动编辑器内联聊天，否则会打开聊天视图。或者，您可以使用 **Chat: Inline Voice Chat**、**Chat: Quick Voice Chat** 或 **Chat: Voice Chat in Chat View** 命令在特定位置启动语音聊天。

当语音聊天处于活动状态时，聊天输入字段中会出现一个麦克风图标，表示语音输入处于活动状态：

![Screenshot of the chat input field showing an active microphone icon to enter a voice chat message](images/accessibility/voice-chat.png)

> [!NOTE]
> 在 VS Code 中使用语音聊天时，聊天提示将在您暂停时自动提交。您可以通过 `setting(accessibility.voice.speechTimeout)` 设置来配置提交前的等待时间，或者将该设置配置为 `0` 时禁用此功能。

VS Code 中的聊天还支持文本转语音功能。当您启用 `setting(accessibility.voice.autoSynthesize)` 设置时，如果也使用了语音作为输入，聊天响应将自动朗读出来。要中断合成，请选择图标或按 `kb(workbench.action.speech.stopReadAloud)`。

每个聊天响应还会显示一个新的扬声器图标，以便您可以有选择地朗读某个响应。

![Text to Speech for a Chat Response](images/accessibility/text-to-speech.png)

## 对讲机模式

在编辑器或聊天中使用键盘快捷键启动语音时（`kb(workbench.action.editorDictation.start)` 或 `kb(workbench.action.chat.startVoiceChat)`），您可以按住键盘快捷键启动语音识别。当您松开键盘快捷键时，语音识别将停止。此外，在聊天中使用时，提示将被提交。

## "Hey Code"

您可以启用一种模式，使 VS Code 始终监听"Hey Code"短语以启动语音聊天会话。相应地配置 `setting(accessibility.voice.keywordActivation)` 设置以启用此功能。当 VS Code 正在监听"Hey Code"时，状态栏中会出现一个麦克风图标来指示：

![Screenshot of a status bar entry to signal active listening to "Hey Code"](images/accessibility/hey-code.png)

## 多语言支持

您可以使用 `setting(accessibility.voice.speechLanguage)` 设置从 26 种受支持的语言中进行选择。如果您将值设置为 `auto`（默认值），VS Code Speech 扩展将使用 [VS Code 显示语言](/docs/configure/locales.md)（如果该语言可用）。

语音扩展的每种语言都作为独立的扩展提供。当您首次启动语音识别时，您将看到每个所选语言的扩展安装。

## 后续步骤

继续阅读以了解更多：

* [其他 VS Code 辅助功能](/docs/configure/accessibility/accessibility.md)。
* [Visual Studio Code 用户界面](/docs/editing/userinterface.md) - VS Code 快速入门指南。
* [基本编辑](/docs/editing/codebasics.md) - 了解强大的 VS Code 编辑器。
* [代码导航](/docs/editing/editingevolved.md) - 在源代码中快速移动。
