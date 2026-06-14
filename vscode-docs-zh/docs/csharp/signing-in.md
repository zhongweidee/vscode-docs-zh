---
ContentId: 44aa6759-14dd-41ba-b48c-dc5ba3a6e8de
DateApproved: 6/6/2023
MetaDescription: 登录到 C# Dev Kit
---
# 登录到 C# Dev Kit

通过本文，你将了解：

* 如何[使用账户登录](#sign-in-with-a-microsoft-or-organizational-account)。
* 如何检查 [Visual Studio 订阅的状态](#verifying-your-visual-studio-subscription-status)。
* 如何[注销账户](#how-to-sign-out)。
* 如何[排查登录问题](#troubleshoot-sign-in-issues)。

你也可以获取[订阅支持](https://visualstudio.microsoft.com/subscriptions/support/)，并搜索 FAQ 以查找关于订阅、账户和计费的常见支持问题的解答。

## 使用 Microsoft 账户或组织账户登录

1. 启动 Visual Studio Code。当 C# Dev Kit 扩展首次激活时，系统会通过弹窗通知提示你登录。

  ![Sign-in notification](images/signing-in/sign-in-notification.png)

  或者，你也可以前往活动栏中的**账户**按钮进行登录。

  ![Sign-in with the Account button](images/signing-in/account-button-sign-in.png)

2. 启动登录流程后，浏览器会打开，你可以使用 Microsoft 账户或组织（工作或学校）账户进行登录。

>**注意**：虽然该扩展不要求或强制登录，但你可能需要使用 Visual Studio 账户登录，以遵守 C# Dev Kit 扩展的 EULA 要求。

## 验证你的 Visual Studio 订阅状态

登录使用 C# Dev Kit 扩展后，状态栏图标可能会根据与该账户关联的 Visual Studio 订阅状态而变化。如果你尚未登录，或使用未包含有效 Visual Studio 订阅的账户登录，你将看到以下图标及其工具提示消息：

![Invalid Visual Studio subscription](images/signing-in/no-subscription-found.png)

如果你使用拥有有效 Visual Studio 订阅的账户登录，状态栏图标及其关联的工具提示将变化如下：

![Successful Visual Studio subscription sign-in](images/signing-in/valid-vs-subscription.png)

你还可以通过单击状态栏图标来查看你的 Visual Studio 订阅信息。

![Visual Studio subscription information](images/signing-in/subscription-status.png)

>**注意**：在 Microsoft Dev Box 或 GitHub Codespace 环境中使用 C# Dev Kit 扩展时，无论登录状态如何，系统将自动为你授予 C# Dev Kit 的使用权限。

## 如何注销

你可以通过活动栏中的**账户**按钮进行注销。进入后，选择所需账户并选择注销。

![Sign out of Visual Studio subscription](images/signing-in/sign-out.png)

## 排查登录问题

### 无法获取许可证

如果你在成功登录后无法获取许可证，则可能需要修改防火墙设置，将以下 URL 添加到允许列表中：

`https://api.subscriptions.visualstudio.microsoft.com/Me/Entitlements/IDEBenefits`
