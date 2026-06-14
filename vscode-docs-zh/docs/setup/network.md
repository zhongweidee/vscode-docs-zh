---
ContentId: 84F36EDE-4D66-4A2E-B4D1-F020C73EB2AD
DateApproved: 6/10/2026
MetaDescription: 配置 VS Code 的网络连接。
---
# Visual Studio Code 中的网络连接

Visual Studio Code 构建于 [Electron](https://www.electronjs.org) 之上，并受益于 [Chromium](https://www.chromium.org/) 的所有网络栈能力。这也意味着 VS Code 用户可以获得 [Google Chrome](https://www.google.com/chrome/index.html) 中可用的大部分网络支持。

## 常见主机名

VS Code 中的一些功能需要网络通信才能正常工作，例如自动更新机制、查询和安装扩展以及遥测。为了让这些功能在代理环境中正常工作，你必须正确配置产品。

如果你处于需要允许 VS Code 使用的特定域通过防火墙的环境中，以下是应允许通信通过的主机名列表：

* `update.code.visualstudio.com` - Visual Studio Code 下载和更新服务器
* `code.visualstudio.com` - Visual Studio Code 文档
* `go.microsoft.com` - Microsoft 链接转发服务
* `marketplace.visualstudio.com` - Visual Studio Marketplace
* `*.gallery.vsassets.io` - Visual Studio Marketplace
* `*.gallerycdn.vsassets.io` - Visual Studio Marketplace
* `rink.hockeyapp.net` - 崩溃报告服务
* `raw.githubusercontent.com` - GitHub 仓库原始文件访问
* `vsmarketplacebadges.dev` - Visual Studio Marketplace 徽章服务
* `*.vscode-cdn.net` - Visual Studio Code CDN
* `vscode.download.prss.microsoft.com` - Visual Studio Code 下载 CDN
* `download.visualstudio.microsoft.com` - Visual Studio 下载服务器，为部分 VS Code 扩展（C++、C#）提供依赖项
* `vscode-sync.trafficmanager.net` - Visual Studio Code 设置同步服务
* `vscode-sync-insiders.trafficmanager.net` - Visual Studio Code 设置同步服务（Insiders）
* `vscode.dev` - 在通过 GitHub 或 Microsoft 登录扩展或设置同步时用作回退地址（仅 `vscode.dev/redirect`）
* `*.vscode-unpkg.net` - 加载 Web 扩展时使用
* `default.exp-tas.com` - Visual Studio Code 实验服务，用于提供实验性用户体验

## 代理服务器支持

VS Code 拥有与 Google Chromium 完全相同的代理服务器支持。以下是 [Chromium 文档](https://www.chromium.org/developers/design-documents/network-settings) 的摘录：

```
"Chromium 网络栈使用系统网络设置，以便用户和管理员能够轻松控制所有应用程序的网络设置。网络设置包括：

 - 代理设置
 - SSL/TLS 设置
 - 证书吊销检查设置
 - 证书和私钥存储"
```

这意味着你的代理设置应该会自动被识别。

否则，你可以使用以下命令行参数来控制你的代理设置：

```bash
# 禁用代理
--no-proxy-server

# 手动代理地址
--proxy-server=<scheme>=<uri>[:<port>][;...] | <uri>[:<port>] | "direct://"

# 手动 PAC 地址
--proxy-pac-url=<pac-file-url>

# 按主机禁用代理
--proxy-bypass-list=(<trailing_domain>|<ip-address>)[:<port>][;...]
```

要了解有关这些命令行参数的更多信息，请参阅 [Chromium 网络设置](https://www.chromium.org/developers/design-documents/network-settings)。

### 需要认证的代理

通过 [PR #22369](https://github.com/microsoft/vscode/pull/22369) 的添加，需要认证的代理在 VS Code 中应该可以无缝工作。

支持的认证方法包括：

* Basic
* Digest
* NTLM
* Negotiate

在需要通过认证的 HTTP 代理环境中使用 VS Code 时，应出现以下认证弹窗：

![proxy](images/network/proxy.png)

请注意，SOCKS5 代理认证支持尚未实现；你可以关注 [Chromium 问题跟踪器中的这个问题](https://bugs.chromium.org/p/chromium/issues/detail?id=256785)。

请参阅 [Chromium HTTP 认证](https://www.chromium.org/developers/design-documents/http-authentication) 以了解有关 VS Code 中 HTTP 代理认证的更多信息。

### SSL 证书

HTTPS 代理通常会重写传入请求的 SSL 证书。Chromium 被设计为拒绝由其不信任的证书签名的响应。如果你遇到任何 SSL 信任问题，有以下几个选项可供你选择：

* 由于 Chromium 使用操作系统的证书信任基础设施，首选方案是将你的代理证书添加到操作系统的信任链中。请参阅 [Chromium 根证书策略](https://www.chromium.org/Home/chromium-security/root-ca-policy) 文档以了解更多信息。
* 如果你的代理运行在 `localhost`，你可以尝试使用 [--allow-insecure-localhost](https://peter.sh/experiments/chromium-command-line-switches/#allow-insecure-localhost) 命令行标志。
* 如果以上方法都无效，你可以使用 [--ignore-certificate-errors](https://peter.sh/experiments/chromium-command-line-switches/#ignore-certificate-errors) 命令行标志告诉 VS Code 忽略所有证书错误。**警告：** 这是**危险的**且**不推荐**的做法，因为它会带来安全问题。

> **Linux 用户注意事项**：要在 Linux 上添加代理证书，你需要将其添加到系统信任存储和 NSS 信任存储中。具体步骤因发行版而异：
> - 对于 Ubuntu/Debian：将证书复制到 `/usr/local/share/ca-certificates/` 并运行 `sudo update-ca-certificates`
> - 对于 RHEL/CentOS/Fedora：使用 `sudo trust anchor --store <certificate-file>` 或将证书放置在 `/etc/pki/ca-trust/source/anchors/` 并运行 `sudo update-ca-trust`
> - 此外，使用 `certutil -A -n "ProxyCA" -t "CT,," -i <certificate-file> -d sql:$HOME/.pki/nssdb` 将其添加到 NSS 信任存储中。

## 传统代理服务器支持

扩展尚未受益于 VS Code 支持的同一代理支持。你可以在 [GitHub](https://github.com/microsoft/vscode/issues/12588) 上关注此问题的开发进展。

与扩展类似，VS Code 的其他一些功能尚未完全支持代理网络，特别是 CLI 接口。CLI 接口是你在命令提示符或终端中运行 `code --install-extension vscodevim.vim` 时获得的功能。你可以在 [GitHub](https://github.com/microsoft/vscode/issues/29910) 上关注此问题的开发进展。

由于这两个限制，`setting(http.proxy)`、`setting(http.proxyStrictSSL)` 和 `setting(http.proxyAuthorization)` 变量仍然是 VS Code 设置的一部分，但它们仅在这两种场景中生效。

## 疑难解答

以下是一些可能有用的链接，可帮助你排查 VS Code 中的网络问题：

* [网络设置](https://www.chromium.org/developers/design-documents/network-settings)
* [调试网络代理问题](https://www.chromium.org/developers/design-documents/network-stack/debugging-net-proxy)
* [在 Chrome 中配置 SOCKS 代理服务器](https://www.chromium.org/developers/design-documents/network-stack/socks-proxy)
* [代理设置和回退（Windows）](https://www.chromium.org/developers/design-documents/network-stack/proxy-settings-fallback)
