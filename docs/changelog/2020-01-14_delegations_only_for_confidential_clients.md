---
title: Delegations only usable for confidential clients
date: 2020-01-14 09:00:00
type: post
changelog: true
components:
    - Directory API
change_types:
    - Action required
    - Update
description: >
  The [Delegation access flow](/guide/oauth/delegate-access.html) only accepts access tokens to delegate that were created with OAuth confidential credentials.

  If you try to access this endpoint without an access token that was created with OAuth confidential credentials, it will return from now on a 403 (Forbidden).
---
