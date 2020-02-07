# Access Token Refresh

Every time the Directory hands out an access token, this token is accompanied by a refresh token. The refresh token can be used to obtain a new access token, when the old one has expired. To ensure frequent check-ins with the Directory for security reasons, all access tokens are valid for 60 minutes. After this time it must be exchanged into a new one with the refresh token. If the permissions of the bearer have changed in the interim, this exchange will be denied, thus giving us one method of access control and permission revocation.

## Refresh token expiration time and refresh
The refresh token itself lives for 7 days. Whenever a refresh token is exchanged into a new access token, a new refresh token will be transmitted as well, which is again valid for 7 days. The refresh token can only be used once and expires immediately after being exchanged for a new access token. However this does not affect the old access token, if such a token is still valid, it will remain so.

## Exchanging a refresh token for an access token
In order to exchange a valid refresh token for an access token you need send a `POST` request to `/oauth/access_token`. The following parameters must accompany the request:

| Name | Required | Description |
| --- | --- | --- |
| grant_type| **Required** | The requested OAuth grant type, in this case `refresh_token`. |
| refresh_token| **Required** | The OAuth refresh token as issued before when getting an access token. |

## Authentication
Authentication for the token exchange is only possible (and required) for `OAuth confidential` apps. These apps must authenticate by using the `HTTP BASIC` authentication method, where the username is the app's `OAuth client ID` and the password is the app's `OAuth client secret`. When an app that is marked as OAuth confidential requests a token without providing authentication details or with wrong details, the request will be denied.

Since `OAuth non-confidential` apps cannot securely hold their secret, no further authentication is possible for those apps, except providing a correct and valid refresh token. This provides less security than the above authenticated method, so you should use OAuth confidential mode whenever possible.

## Security considerations
OAuth refresh tokens should be treated as password-equivalent. For non-OAuth confidential apps, all you need to get an access token, is to present a valid refresh token. Although these tokens are not guessable, they should be stored in a secure way inside your application. If a breach occurs where refresh tokens might have leaked, you need to inform our security team, so all refresh tokens attached to your app can be revoked immediately.
