---
title: "BREAKING: OAuth Redirect Flow redirect with errors"
date: 2021-04-16 07:00:00
type: post
changelog: true
components:
    - Zaikio OAuth API
change_types:
    - Action required
    - Update
description: >
  In the OAuth redirect flow, the client typically has the ability to process error messages if they are returned as a query parameter to the redirect URL (see OAuth RFC: [https://tools.ietf.org/html/rfc6749#section-4.1.2.1](https://tools.ietf.org/html/rfc6749#section-4.1.2.1)).<br /><br />
  Until today this was unfortunately not possible and error messages were displayed directly in Zaikio. With this change it is possible to handle the error by yourself.<br /><br />

  In case of an error, the redirect URL will be redirected in the following way: `{REDIRECT_URL}?error={error_id}&error_description={optional description}`

  Possible Errors:

  - `invalid_request`: Usually related to invalid PKCE

  - `access_denied`: The user cancelled the redirect flow intentionally

  - `invalid_scope`: The scopes provided were invalid, the error description contains details about the invalid scope (see [Scopes](https://docs.zaikio.com/guide/oauth/scopes.html))


  This change affects the Zaikio OAuth redirect flow. On June 15, 2021, this change will be rolled out to everyone on a mandatory basis. Until then, the new logic can already be used via an optional parameter (`https://hub.zaikio.com/oauth/authorize/?redirect_with_error=1&client_id=...`) to enable a smooth transition. For all new apps created from now on, the new logic already applies. Many OAuth client libraries will probably already handle this behavior, so we recommend just trying the parameter.
---
