---
title: "Client Credentials Flow: The bearer must first grant access to the app"
date: 2020-01-21 09:00:00
type: post
changelog: true
components:
    - Zaikio Hub API
change_types:
    - Action required
    - Update
description: >
  Requested scopes by the Client Credentials Flow must be granted beforehand, otherwise the scope error `ungranted_scope` (see [scope errors](/guide/oauth/scopes.html)) will be returned.<br><br>

  This means that the person or organization must have successfully accepted the scopes in advance through a [Redirect Flow](/guide/oauth/redirect-flow.html) (or through the Device Flow) for this app.<br><br>

  This authorization can also be done later directly through the Zaikio Hub App (via Connections), if the App has been approved by the Zaikio Team. If you want to participate, please contact us directly.
---
