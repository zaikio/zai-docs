# OAuth

Your app cannot access data through our REST API of a Zaikio organization or person without the organization's admin or person having granted access. Here we show you how the installation and authorization process works in Zaikio. For further details please refer to the [OAuth 2.0 specification](https://tools.ietf.org/html/rfc6749).


## Terminology

- **API**: Zaikio's REST API or Zaikio apps that offer a REST API.
- **Bearer**: We distinguish between two types of bearers: `Organization` and `Person`. For the default Authentication flow you will most likely use a `Person` bearer.
- **User**: A `Person` that is giving access.
- **OAuth Client**: A Zaikio app that wants to access data of an organisation or person.

## Zaikio App Installation Flow

![Default Zaikio Organization Flow](./zaikio_organization_authorization_flow.png)

Coming soon

See also: [The Redirect Flow](./redirect-flow.html)

## Refreshing tokens

Coming soon

See also: [Access Token Refresh](./access-token-refresh.html)

## Other Flows

Currently the following OAuth flows are supported:

- [The Device Flow](./device-flow.html)
- [Client Credentials Flow](./client-credentials.html)
- [Delegating Access to Subsystems](./delegate-access.html)
