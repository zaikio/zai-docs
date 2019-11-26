# Event Handling with Loom

::: warning
**This document is for informational purposes only. The Loom event system is not published yet. If you have specific questions, please contact us.**
:::

Loom is a system to handle events between applications on the platform.

When a developer registers an application in the Directory two list of events can be configured

  - events which are fired by the application
  - events to which the application wants to subscribe

After an event was fired to Loom, it is verified and then immediately send to all subscribers via `HTTP POST` to their configured webhook URL.

Read more about:

  - [Posting events](./posting-events)
  - [Receiving events](./receiving-events)

## Design Goals

Loom follows an **at least once** approach. Once an event was received Loom will try hard to deliver this event to each subscriber at least once. To increase reliability senders might want to implement a queue that can buffer events in case of connection issues. Subscribers must be able to handle duplicate messages and implement idempotency.

An **order** of message **is not guaranteed** when pushing to webhooks. Subscribers should not rely on a specific order and need to handle situations in which events arrive out of the band.

The system is **scoped by applications**. It transfers messages between systems, not between tenants on those systems nor between specific organizations or users.

Loom was **designed to handle and delegate events between different applications**. Each application can subscribe to any event fired by another application. That means the system should only be used to handle events that might be interesting to other applications. Internal events between different parts of one application should not be handled with Loom.
