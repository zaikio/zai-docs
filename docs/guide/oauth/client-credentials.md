# Client Credentials Flow

As a trusted client, you can also use the Client Credentials Flow. It enables you to establish machine to machine communication. Especially in the IoT this can make sense. It is important to be aware that this **only works for `OAuth confidential` apps**.

After the token generation you will need to use the regular [Access Token Refresh](./access-token-refresh.html).

## Becoming a trusted client

Requested scopes by the Client Credentials Flow must be granted beforehand, otherwise the scope error `ungranted_scope` (see [scope errors](/guide/oauth/scopes.html)) will be returned.

This means that the person or organization must have successfully accepted the scopes in advance through a [Redirect Flow](/guide/oauth/redirect-flow.html) (or through the Device Flow) for this app.

::: tip
This authorization can also be done later directly through the Zaikio Hub App (via Connections), if the App has been approved by the Zaikio Team. If you want to participate, please contact us directly.
:::

## Creating an access token

In order to create a valid access token you need send a `POST` request to `https://hub.zaikio.com/oauth/access_token`. The following parameters must accompany the request:

| Name       | Required     | Description                                                                                                                                                                                    |
| ---------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| grant_type | **Required** | The requested OAuth grant type, in this case `client_credentials`.                                                                                                                             |
| scope      | **Required** | The comma-separated list of scopes containing the id of the bearer e.g. `Org/b1475f65-236c-58b8-96e1-e1778b43beb7.warehouse.items.r` Please read the [scope guides](/guide/oauth/scopes.html). |

After receiving the `access_token` (as described in the other flows). The `Authorization` header can be used to perform authorized requests. More details can be found in the [Redirect Flow Guide](redirect-flow.html#retrieve-user-information-via-the-directory-api).

## Authentication

When using the client credentials flow authentication needs to happen by using the `HTTP BASIC` authentication method, where the username is the app's `OAuth client ID` and the password is the app's `OAuth client secret`.
