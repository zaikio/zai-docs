---
title: "Removing ability to update email attributes via API"
date: 2023-02-22 10:00:00
type: post
changelog: true
components:
    - Zaikio Hub API
change_types:
    - Action required
    - Update
description: >
  It will no longer be possible to update the `email` attribute via the `PATCH api/v1/person` API.

  In order to increase security measures changes to the email address attribute will be only possible with a password confirmation to avoid changes from attackers who are using the same computer.

  ### What do I need to do?

  Remove any email address changes from your app and direct your urser to the hub to change their email address.

  ### What's next?

  - On **February 22th '23** we will not accept the `email` attribute as part of the request body.
---
