---
ContentId: 34c5ba31-5844-4eca-8fef-dabb6e917314
DateApproved: 6/6/2023
MetaDescription: 在 Visual Studio Code 中格式化和检查 C# 源代码
---
# 格式化和代码检查

你可以使用 [C# Dev Kit 扩展](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)来格式化你的 C# 源代码，这是一个轻量级扩展，用于增强你在 Visual Studio Code 中的 C# 开发体验。

导航到 **文件** > **首选项** > **设置**(`kb(workbench.action.openSettings)`)以自定义 `.cs` 文件的格式化方式。设置编辑器为你提供了一个不同格式化选项的列表（特别是在 **常用** 和 **文本编辑器** 下），你可以在特定工作区或整个用户配置文件中进行调整。

![Commonly Used menu](images/formatting-linting/commonly-used-menu.png)

## 如何在 C# Dev Kit 中使用 EditorConfig

**EditorConfig (.editorconfig) 文件** 通过 [EditorConfig for VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)得到支持，使你能够自定义 C# 项目中的格式化选项。这些文件也可以用来覆盖用户/工作区设置，以你在其中指定的设置进行配置。

![Editorconfig file example](images/formatting-linting/editorconfig-example.png)
