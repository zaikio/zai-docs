---
title: Accept only desired scopes
date: 2020-01-15 09:00:00
type: post
changelog: true
components:
    - Directory API
change_types:
    - Action required
    - Update
description: >
  Requested scopes must be created as `Desired Scopes` in the directory app, otherwise a new scope error `scope_is_not_included_in_desired_scopes` (see [scope errors](/guide/oauth/scopes.html)) is returned.
---
