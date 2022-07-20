---
title: "Removing refresh_token in client_credentials flow"
date: 2022-08-09 10:00:00
type: post
changelog: true
components:
    - Zaikio OAuth API
change_types:
    - Action required
    - Update
description: >
  If you are using the `grant_type: client_credentials` to fetch access token and you are currently using the `refresh_token` from
  that response to fetch further access tokens, this is a breaking change.


  In order to improve regular security measures we want to follow OAuth RFC recommendations. This includes not responding with a `refresh_token` in the Client Credentials Grant flow (see [https://www.rfc-editor.org/rfc/rfc6749#section-4.4.3](https://www.rfc-editor.org/rfc/rfc6749#section-4.4.3)).


  ### What do I need to do?

  If you only use the refresh token as intended (e.g. through redirect grant or device grant flow), there is nothing you need to do.


  If you use the `refresh_token` from the Client Credentials Grant, you will need to re-fetch an access token by performing another Client Credentials Grant instead of using a `refresh_token`.


  ### What's next?

  - On **Tuesday August 8th, 2022 around 10:00 AM CEST** we will drop the `refresh_token` from the `client_credentials` responses.
---
