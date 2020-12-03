---
sidebar: auto
sidebarDepth: 0
---

# Single sign-on with Zaikio

Your app cannot access data through our REST API of a Zaikio organization or person without the organization's admin or person having granted access. Here we show you how the installation and authorization process works in Zaikio. For in-depth details please refer to the [OAuth 2.0 specification](https://tools.ietf.org/html/rfc6749).

::: tip TIP
We recommend that you use a OAuth Client Library. Checkout OAuth's [list of available clients](https://oauth.net/code/).
:::

Currently the following OAuth flows are supported:

- [The Redirect Flow](./redirect-flow.html) - Default for most Apps
- [The Device Flow](./device-flow.html) - For IoT or Mobile Devices
- [Client Credentials Flow](./client-credentials.html) - Machine to Machine communication
- [Delegating Access to Subsystems](./delegate-access.html)
- [Access Token Refresh](./access-token-refresh.html)
- [Scopes](./scopes.html)
