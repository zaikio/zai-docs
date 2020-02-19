---
title: "First name can be null"
date: 2020-02-25 08:00:00
type: post
changelog: true
components:
    - Directory API
change_types:
    - Action required
    - Update
description: >
  Since many countries do not have first names, we are now making this field optional for all members. This means in the API response the `first_name` can be `null`.  We recommend to always use the `full_name` to display a name.
---
