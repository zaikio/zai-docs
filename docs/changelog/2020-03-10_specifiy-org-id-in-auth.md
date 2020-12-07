---
title: "In Redirect Flow and Device Flow an organization can be pre-selected"
date: 2020-03-10 07:00:00
type: post
changelog: true
components:
    - Zaikio Hub API
change_types:
    - New
    - Update
description: >
  It is now allowed to pass an Organization ID in Redirect Flow and Device Flow, so the user does not have to select the organization in Zaikio.<br><br>
  The organizational ID is then passed as a scope as in Client Credentials Flow. For example:<br>`Org/5345a2a-8786-5b46-a1e2-516658fde390.directory.organization.r`<br><br>
  **It is only possible to set organizations where the current user is also the admin.**
---
