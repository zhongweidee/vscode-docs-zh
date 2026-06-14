---
ContentId: fc1e60f9-86a6-47c2-beb6-5289d21f48d1
MetaDescription: 适用于 Visual Studio Code 的 Azure 资源扩展
DateApproved: 5/5/2025
---
# 适用于 Visual Studio Code 的 Azure 资源扩展

[Azure 资源](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureresourcegroups)扩展允许你直接在 VS Code 中无缝查看和管理 Azure 资源。它还提供了身份验证以及管理 Azure 账户和租户的功能。

## 如何登录 Azure 账户

Azure 资源扩展使用内置的 VS Code Microsoft 身份验证提供程序来通过 Azure 进行身份验证。
在 Azure 资源视图中选择“登录 Azure…”项即可登录。

![Screenshot that shows where to sign in to your Azure account](images/extensions/signInView.png)

你也可以使用 Azure 资源扩展提供的“Azure: 登录”命令进行登录。

![Screenshot that shows where to sign in to an Azure account from the command palette](images/extensions/signInCommandPallete.png)

## 如何注销

在 VS Code 窗口左下角的“账户”菜单中进行注销。

![Screenshot that shows where to sign out of an Azure account](images/extensions/signOut.png)

## 筛选订阅

你可以通过选择任意订阅上的筛选图标来筛选显示的订阅。

![Screenshot that shows where to filter your subscriptions](images/extensions/filterSub.png)

筛选后的订阅存储在 `setting(azureResourceGroups.selectedSubscriptions)` 设置中。

## 账户和租户视图

在 Azure 资源扩展中，你可以使用“账户和租户”视图来管理和验证账户及租户。

![Screenshot that shows the Accounts & Tenants view](images/extensions/accountsAndTenants.png)

### 筛选租户

你还可以通过勾选和取消勾选租户来筛选租户。这将根据租户视图中勾选/取消勾选的租户，导致资源视图和订阅筛选器中的订阅被筛选掉。

<img width = "900" alt = "Accounts & Tenants view" src = "https://github.com/user-attachments/assets/d34c1f79-fb21-46f9-af3a-cbb109ba0414">

### 验证租户

在“账户和租户”视图中，你可以查看与你的账户关联的所有租户。许多租户需要多重身份验证（MFA）才能访问。需要多重身份验证的租户在悬停时将显示一个登录按钮，位于租户的右侧。

![Screenshot that shows where to authenticate your tenants](images/extensions/authenticateTenant.png)

你可以通过导航到“账户和租户”视图，并选择租户右侧的登录按钮，或者直接勾选未经身份验证的租户，来对特定租户进行身份验证。

### 多账户支持

通过“账户和租户”视图，你可以通过选择视图右上角的 `+` 图标来登录新账户。

![Screenshot that shows where to sign in to multiple Azure Accounts](images/extensions/multiAccount.png)

### 使用主权云

要连接到主权云，你可以选择“账户和租户”视图右侧的齿轮图标。

<img width = "474" alt = "Sovereign Clouds" src = "https://github.com/user-attachments/assets/d07af7a8-eab9-46db-8ab5-f386c5c78b57">

这将显示一个可供选择的主权云列表。

![Screenshot that shows where to connect to a sovereign cloud](images/extensions/cloudOptions.png)

选择后，`setting(Microsoft-sovereign-cloud.environment)` 设置会自动配置。资源和账户与租户视图也会刷新，允许你登录主权云账户。
