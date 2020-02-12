---
title: "New: Create Organizations"
date: 2020-02-12 15:00:00
type: post
changelog: true
components:
    - Directory API
change_types:
    - New
description: >
  It is now possible to create new organizations with a Person Access Token. For this purpose the new scope `directory.organizations.w` is required. The current user will then automatically become the owner of the organization.<br><br>

  In addition, the app that issued the token will connect directly with desired OAuth Scopes and Event Subscriptions from the directory.
  This means that after creation you can directly request an Organization Access Token via the Client Credentials Flow.<br><br>

  Further Reading: [Directory API Reference `POST /person/organizations`](/api/directory/#/Person/post_person_organizations)
---
