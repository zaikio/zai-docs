---
title: Event Webhook URL is now managed in the App configuration
date: 2020-01-27 12:00:00
type: post
changelog: true
components:
    - Directory API
change_types:
    - Action required
    - Update
description: >
  In the past each Event Subscription had to define its own Webhook URL. Now each App needs to define only one Webhook URL in its configuration and this Webhook URL will be used to deliver all Events.<br><br>

  Note: At the moment this Webhook URL is only required when you want to add an Event Subscription to your App. In the future there will be events types that sent to all Apps and Apps will not need to explicitly subscribe to these event types. Therefore we will need to require all Apps having a Webhook URL soon.

