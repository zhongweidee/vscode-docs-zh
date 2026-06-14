---
ContentId: d7a80c88-c091-4d13-9240-d432c12407a7
DateApproved: 6/10/2026
MetaDescription: 使用 Visual Studio Code 让你的本地 Web 服务可通过互联网访问
---
# 端口转发

Visual Studio Code 内置了端口转发支持，通过 [Microsoft dev tunnels](https://learn.microsoft.com/azure/developer/dev-tunnels/overview) 实现，无需安装扩展。在运行本地 Web 服务时，你可以使用 **端口** 视图使其可通过互联网被他人访问。

## 如何使用端口转发

首先，你需要有一个要转发的服务。如果你还没有但已安装 Node.js，可以运行以下命令在端口 3000 上启动服务器：

```bash
npx serve
```

然后，导航到面板区域中的 **端口** 视图（**端口：聚焦端口视图**），并选择 **转发端口**。

![Forward a Port button displayed in the Ports view](images/port-forwarding/ports-view.png)

如果你之前未使用 GitHub 登录，系统会提示你进行登录。然后，输入你要转发的端口；使用上述命令的默认端口是 3000。完成后，端口转发就会启动，**端口** 视图会更新显示你转发的端口及其 **转发地址**。

![Port 3000 added to the Ports view](images/port-forwarding/forwarded-port.png)

将鼠标悬停在 **转发地址** 上，你可以使用内联操作来复制地址、在浏览器中打开，或在编辑器中打开预览。

默认情况下，转发的端口是 **私有** 的。当你访问该 URL 时，需要使用你在 VS Code 中启动端口转发过程时所使用的同一 GitHub 账户登录。你可以通过右键单击端口并选择 **端口可见性 > 公共** 来更改可见性。**公共** 端口不需要登录。

## 常见问题

### 如果我连接到远程计算机，如何转发本地服务？

端口转发目前仅公开本地运行的服务。尚未支持远程连接，但我们计划在未来添加此功能。

根据你的场景，你可能需要使用 VS Code [Remote - Tunnels](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-server) 扩展来通过隧道连接到远程计算机。你可以在 [Remote - Tunnels 文档](/docs/remote/tunnels.md) 中了解更多信息。

### 转发的端口是如何保障安全的？

默认情况下，托管隧道和连接隧道都需要在两端使用相同的 GitHub 或 Microsoft 账户进行身份验证。在这两种情况下，VS Code 都会向 Azure 中托管的服务建立出站连接；通常无需更改防火墙，VS Code 也不会设置任何网络侦听器。

> [!CAUTION]
> 如果你已打开 **公共** 端口，任何拥有你链接的用户都可以访问转发的服务。请避免在公共端口上托管机密信息或不安全的服务。

详细了解 [底层 dev tunnels 服务的安全性](https://learn.microsoft.com/azure/developer/dev-tunnels/security)。

### 端口转发有哪些限制？

端口转发对带宽使用量和可使用的活动计算机数量都有限制，并且这些限制可能会随时间变化。详细了解[隧道使用限制](https://aka.ms/vscode-dev-tunnel-limit)。

### 我能否在整个组织中配置策略？

如果你所在的组���希望控制对端口转发的访问，可以通过允许或拒绝对域 `global.rel.tunnels.api.visualstudio.com` 的访问来实现。

对于运行 Windows 设备的用户，你还可以配置并部署 dev tunnels 的组策略设置。你可以在 [dev tunnels 文档](https://learn.microsoft.com/azure/developer/dev-tunnels/policies) 中了解更多信息。
