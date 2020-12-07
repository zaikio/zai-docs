---
title: New connections endpoint and connected attribute
date: 2020-01-28 13:00:00
type: post
changelog: true
components:
    - Zaikio Hub API
change_types:
    - New
description: >
  It is now possible to retrieve all connections for an app. To do this, a GET request must be made to `/api/v1/connections` or `/api/v1/connections/Person-abc-def-ghi`. This request must be authenticated by Basic Auth (the Client Id must be the username and the Client Secret the password, this is only possible if the credentials are confidential).<br><br>

  Additionally, there is the `connected` attribute in all API replies sent. So it is for example possible to see via a GET `/api/v1/person` request which organizations of the person are already connected to the app that requested the access token.

  Please check the [Zaikio Hub API Reference](/api/directory/) for more details.
