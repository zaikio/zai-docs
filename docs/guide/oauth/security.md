---
sidebar: auto
---

# OAuth Security

Here is a listing of some best practices for OAuth security to prevent access tokens and thus customer data from being maliciously accessed or customer data from being maliciously manipulated. This guide focus specifically on common OAuth issues and not security in general.

You can also find an official list of [detailed OAuth 2.0 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics), including a list of possible attacks and their mitigations.

## OAuth Security Checklist

Please make sure that you implemented all listed best practices.

We distinguish between two types of clients in OAuth: confidential and unconfidential.

Unconfidential clients are all applications that do not have a dedicated backend. This includes native apps such as mobile apps, desktop apps, and on-premise apps, as well as all frontend web clients. If you are unsure whether your app is confidential or unconfidential, please contact us. This distinction is very important and has security implications.

### General

- **Never store client secret on the client** (even if it is encrypted)
  This will give a single client access to ALL your customer data.
- **Request minimal scopes**
  In case of an incident you want to make sure that only as little data as possible has leaked so make sure you only request the scopes you really need. If you need more fine-grained scopes, please get in touch with us.
- **Allow user to revoke access tokens in your app**
  Especially when creating long-living **Refresh tokens**, it is important that you give the user the possibility an easy option to revoke an access token. A best practice is to revoke the access token on **logout**.

### Frontend web clients & native clients (unconfidential)

- **Implement [PKCE](
https://docs.zaikio.com/guide/oauth/redirect-flow.html#pkce) (redirect flow)**
  PKCE prevens many different attacks such as [Credential Leakage via Referer Headers](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics#section-4.2), [Authorization Code Injection](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics#section-4.5), [Cross Site Request Forgery](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics#section-4.7)
- **Never pass access token as a parameter**
  Always use HTTP Auth headers (otherwise history playback, XSS etc. could give unwanted access).
- **(Frontend web clients) Prevent [Cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) vulnerabilities**
  XSS vulnerabilities could give an attacker access to a stored access token (e.g. in by accessing the cookie).
- **(Native clients) Use a system browser instead of an embedded browser**
  This is already the default on some platforms like iOS.
- **(Native clients) Encrypt access tokens and refresh tokens in storage**
  Depending on the operating system there are recommended options to do that. This makes it harder for other scripts or apps to access a stored access token.

### Backend clients (confidential)

- **Store Client Secret only on secure backend clients**
  Use environment variables and do not add a secret to your source code. Restrict access to the secret as much as possible. Everyone who gains the secret is able to get access to all your customers.
- **Encrypt access and refresh tokens in storage**
  When a someone gains access to your database they are not able to get access to the access tokens.
- **Do not expose access tokens to the client**
  Use an encrypted session store for example.
- **Rotate client credentials regularly**
  When a secret is leaked unnoticed you are on the safe site.

## What to do on incidents

### Credentials leaked

In case any credentials leaked or potentially leaked **delete broken credentials** (and recreate a new one). This will revoke all created access tokens that were created with the respective client ID. If you are unsure what exactly leaked this is the easiest way to regain control.

You can do this in Zaikio > Developer > Your Apps > (Selected App) > OAuth & Permissions

### Access token leaked

If you know that exactly one specific access token leaked you can use our [revoke access token API endpoint](https://docs.zaikio.com/api/directory/directory.html#/Revoked%20Access%20Tokens/post_revoked_access_tokens). You need to know the access token that you want to revoke.

## Other questions?

Security is very important at Zaikio. This list may not cover all your questions and requirements. Please reach out to us and join [our slack community](https://join.slack.com/t/zaikio-community/shared_invite/zt-g01gvvg2-lk0TcIzkhdtu~xIvRZ5xCw) so we can help you with further questions.

[Last updated on 2022-07-26]
