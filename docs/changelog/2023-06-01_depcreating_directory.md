---
title: "[DEPRECATING] The directory app name"
date: 2023-06-01 10:00:00
type: post
changelog: true
components:
    - Zaikio OAuth API
    - Zaikio Loom
change_types:
    - Action required
    - Update
description: >
  As we are upgrading and merging some of our APIs we are deprecating the `directory` app name. Instead the main app everybody is connected with will be called `zaikio`.
  Currently you can use both app names for requesting OAuth Scopes or receiving Loom events. You can see app specific warnings and instructions in Zaikio's Developer area of your vendor organization.


  ### What do I need to do?

  #### OAuth Scopes

  Make sure that all OAuth scopes that you pass as `scopes` and are prefixed with `directory.` in the various OAuth flows are prefixed now with `zaikio.`. For example `directory.person.r` becomes `zaikio.person.r`.

  #### Loom Events

  Make sure that you are listening to `zaikio.` loom events instead of `directory.` loom events. For example `directory.connection_established` becomes `zaikio.connection_established`. We recommend to support receiving events with both app names. After you are able to receive `zaikio.` events you can switch to only listen to those by pressing "Receive zaikio. events" in Zaikio's Developer area within "Subscribed Events" section.


  ### What's next?

  - On **October 4th 2023** we will drop the support for requested `directory.` OAuth scopes in every OAuth Flow. This means those scopes will not be included in the access token in case there were requested. We will also stop sending `directory.` loom events and instead send only `zaikio.` events.
  - If you have any questions or need help, please contact us in the Zaikio Slack Community Workspace.
---
