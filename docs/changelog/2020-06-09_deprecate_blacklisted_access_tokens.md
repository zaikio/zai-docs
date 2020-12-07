---
title: "DEPRECATED: /blacklisted_access_tokens"
date: 2020-06-09 11:00:00
type: post
changelog: true
components:
    - Zaikio Hub API
change_types:
    - Action required
    - Update
description: >
  The API endpoints `GET/POST /blacklisted_access_tokens` is deprecated and got renamed to `GET/POST /revoked_access_tokens`.
  The attribute also got renamed to `revoked_token_ids`.
  The old API endpoints get deleted on the 1st of August.

  <br><br>
  Further Reading: [Zaikio Hub API Reference Revoked Access Tokens](/api/directory/directory.html#/Revoked%20Access%20Tokens)
---
