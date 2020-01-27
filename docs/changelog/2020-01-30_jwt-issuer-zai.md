---
title: "JWT Issuer (iss) changes from CP to ZAI"
date: 2020-01-30 09:00:00
type: post
changelog: true
components:
    - Directory API
change_types:
    - Action required
    - Update
description: >
  JSON web tokens created by the directory are now issued by `ZAI`, before it was `CP`. Since you most likely do not work with this attribute, nothing needs to be done.
---
