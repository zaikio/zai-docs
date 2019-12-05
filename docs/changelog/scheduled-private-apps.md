---
title: Private apps take effect
date: 2019-12-12 09:00:00
type: scheduled
changelog: true
layout: ChangelogLayout
components:
    - Directory API
change_types:
    - Action required
    - Deprecation
    - New
---

If your app is specified as `Private` then only the organisation that created the App or its members can from now on access it through the OAuth flow.

If you don't want that please switch to an `External` app by editing the app detail's.
