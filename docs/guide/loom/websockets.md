# Websocket Delivery

[[toc]]

## Introduction

Our websocket delivery mechanism is designed to solve three problematic use-cases
where webhook delivery is impractical or impossible.

1. The receiving system has no web-server element and thus cannot receive webhooks
2. The receiving system exists behind a firewall and configuring access is impractical
3. The receiving system operates across many machines with no single central place
  to receive webhooks

In this situation, we recommend you to implement our websocket event delivery API.
This prevents the need for inbound requests to penetrate a firewall, and allows apps
to still receive live event notifications to act upon.

Websockets are a robust technology with clients available in all modern programming
languages. The commands to implement are detailed below.

## Connecting

Firstly, you will need to setup an application on the Zaikio platform. All of our event
deliveries are scoped to an App. You can find help in doing this in
[our documentation](https://docs.zaikio.com/getting-started/create-app.html)

This will give you access to our HTTP based endpoints for event retrieval, such as this websocket endpoint.

| Environment | Description | URL |
| --- | --- | --- |
| `sandbox` | Used for testing implementations | wss://loom.sandbox.zaikio.com/websocket |
| `production` | Used for live apps | wss://loom.zaikio.com/websocket |

You will need to authorise your application for an Organization, help in doing this can
be found [in the docs](https://docs.zaikio.com/guide/oauth/redirect-flow.html). For most apps, this will be using
the `client_credentials` method after a previous authentication elsewhere. Then you can use this token to subscribe
to our Websocket endpoint.

For each websocket connection, events will only be delivered for the Organization ID that the OAuth token
has been requested for. Receiving events for more than one Organization would require multiple connections,
however we would recommend adopting webhook delivery if that is required.

### Setting up the Connection

```js
import WebSocket from 'ws';

const ws = new WebSocket('wss://loom.sandbox.zaikio.com/websocket', {
   headers: {
      authorization: `Bearer ${proces.env.JWT_TOKEN}`, // auth is passed to the initial request through a Bearer token
   },
});

// This should have more advanced error handling.
ws.on('error', console.error.bind(console));

ws.on('open', () => {
  const msg = {
    // subscribe to a channel
    command: 'subscribe',
    identifier: JSON.stringify({
      // a CSN list of the events to listen for.
      events: "mission_control.job_added,mission_control.job_updated",
      // the channel name, must be EventChannel
      channel: 'EventChannel'
    }),
  };

  // send the subscription request
  ws.send(JSON.stringify(msg));
});
```

### Receiving Events

```js
ws.on('message', (data) => {
  // parse the received payload
  const msg = JSON.parse(data);

  // Ignores pings.
  if (msg.type === "ping") {
    return;
  }

  // if a message property is present, this is a real webhook
  if (msg.message != null) {
    console.log('webhook received', msg.message);
  }
});
```

### Sample received events

```
received { type: 'welcome' }

received {
  identifier: '{"channel":"EventChannel","events":"mission_control.job_added,mission_control.job_changed"}',
  type: 'confirm_subscription'
}

webhook received {
  identifier: '{"channel":"EventChannel","events":"mission_control.job_added,mission_control.job_changed"}',
  message: {
    id: 'bd6b9b7f-5ea2-4015-a07a-e3ba15d083cd',
    timestamp: '2023-07-23T22:04:46.000Z',
    name: 'mission_control.job_added',
    version: '1.0',
    payload: { _meta: [Object], job_id: '9e11ad29-7729-46a4-b8a3-937c64ff9cd5' },
    link: 'https://mc.sandbox.zaikio.com/api/v1/jobs/9e11ad29-7729-46a4-b8a3-937c64ff9cd5',
    received_at: '2023-07-23T22:04:46.474Z',
    subject: 'Org/837ebb91-2d4b-4818-a19b-04fea7be8cde'
  }
}
```

## Roadmap

- [ ] Allow rewinding event history through Websocket commands
- [ ] Allow ack-ing events through Websocket command
