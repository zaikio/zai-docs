---
title: OAuth Scopes in directory are limited to certain bearer types
date: 2020-01-16 09:00:00
type: post
changelog: true
components:
    - Directory API
change_types:
    - Action required
    - Update
description: >
  As documented in the [Directory API Reference](/api/directory/v1/) these directory some scopes will only be available for certain Bearer types (otherwise an `unavailable_scope_for_bearer_type` error will be returned):<br><br>

  `directory.person.r` => only for `Person`<br>
  `directory.organization.r`, `directory.organization_members.r` => only for `Organization`<br><br>

  This does not change the functionality, as these scopes will not work with another Bearer type.
---
