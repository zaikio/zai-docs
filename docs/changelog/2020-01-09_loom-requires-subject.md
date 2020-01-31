---
title: Events require valid subject
date: 2020-01-09 12:00:00
type: post
changelog: true
components:
    - Loom API
change_types:
    - Action required
    - Update
description: >
  From now on it is required that the JSON body includes a valid `subject` when posting events to the Loom API. The `subject identifies the Person or Organization in which context the event was triggered. The event will only be delivered to Apps that are connected to the subject and that have granted access to the specific event type. [Read more](/guide/loom/posting-events.html)
---
