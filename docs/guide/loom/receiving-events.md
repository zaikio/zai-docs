# Receiving events

<div class="float-article">
  <div class="article-list__item article-list__item--box">
    <a href="https://github.com/crispymtn/zaikio-webhooks" target="_blank" class="link link--github u-margin-reg-bottom">
      crispymtn/zaikio-webhooks
    </a>
    <p class="u-small">
      Allows to register webhook callbacks for Zaikio Loom for multiple apps as background jobs
    </p>
    <div class="article-list__item__footer">
      <img src="../../ruby.png" alt="Ruby" style="width:30px" />
    </div>
  </div>
</div>

The preferred and easiest way to receive events is via webhook. An Application must configure a Webhook URL to be able to subscribe to events in the Zaikio Hub.

<div style="clear:both;"></div>

## Webhooks

Loom will distribute incoming events to the subscriber by `HTTP POST` of a JSON document to the provided Webhook URL. To increase security these `POST` **requests are signed** by Loom with a shared secret that is only known to Loom and the receiving application. This lets the receiver to verify that the message was forwarded by Loom and that it wasn't altered.

Loom **retries delivery multiple times** for several hours when webhooks don't respond in time with an HTTP status code in the 2xx range. _In time_ means within 1 second, after that the request will time out.

**Example** how a Loom posts to the subscriber's webhook

```bash
curl --request POST \
     --url https://api.app.example.tld/webhooks/abc \
     --header 'Content-Type: application/json'
     --header 'X-Loom-Signature: 0d2744941cc989ce12a43339727768c5e9f1948a6bb764507e09e0f8ea7299b4'
     --data '{"id":"62abcc92-e17e-4db0-b78e-13369251474b","name":"accounting.invoice_paid","subject":"Org/2b271d51-e447-4a16-810f-5abdc596700a","timestamp":"2019-11-26T10:58:09.664Z","version":"1.0","payload":{"invoice_number":"b1a2eaa9-11ba-4cab-8580-40f091e37742"},"link":"https://account.example.tld/api/v1/payments/1234","received_at":"2019-11-26T10:58:09.664Z"}'
```

### Adding Webhook URLs

You can either specify on webhook URL per app or use our **new** webhooks API. The new API allows you to add multiple webhook URLs per app and filter the delieveries by subject (Organization & Person). This is useful if you want to receive events for a specific subject in a different system than for another subject.

#### Setup single Webhook URL

Navigate to [Zaikio](https://hub.sandbox.zaikio.com) choose your organization and go to `Developer > Apps`. Click on the app you want to configure and go to `Event Subscriptions`. There you can add a single webhook URL and read the `shared_secret` you will need to verify each incoming event.

Make sure that you subscribe to all events you want to listen to.

#### Creating multiple Webhook URLs

Currently the new webhooks feature is API only.

You will first need to generate a [Private Access Token](/guide/try-api/#step-1-generate-private-access-token) for your vendor organization. You will need to require the `zaikio.webhooks.rw` scope.

Then you can create a webhook for your app via `POST`:

```bash
curl --request POST \
     --url https://loom.sandbox.zaikio.com/webhooks \
     --header 'Content-Type: application/json'
     --header 'Authorization: Bearer <Vendor Private Access Token>'
     --data '{"app_id":"<technical_app_name>","description":"staging","subscribers":["Org/2b271d51-e447-4a16-810f-5abdc596700a"],"url":"https://api.app.example.tld/webhooks/abc"}'
```

The response will include a shared secret that you will need to [verify each incoming event](#verify-the-signature). You can find more details about the API in our [API specification](/api/directory/loom.html#/Webhooks/post_webhooks).

You can also instead of setting each subscriber add a `["*"]` to subscribe to all subjects that the app is connected to.

### Verify the signature

The receiver must **verify the signature** to increase security. Loom generates a `SHA256 HMAC` signature using the `shared_secret` of the subscriber application and the request body. Find the shared secret in the Zaikio Hub and the signature in a custom `X-Loom-Signature` request header.

**Example** how to verify the signature

```ruby
shared_secret = "nq9oZo7haPgNVdNRccWhK551"
message       = "{\"id\":\"62abcc92-e17e-4db0-b78e-13369251474b\",\"name\":\"accounting.invoice_paid\",\"subject\":\"Org/2b271d51-e447-4a16-810f-5abdc596700a\",\"timestamp\":\"2019-11-26T10:58:09.664Z\",\"version\":\"1.0\",\"payload\":{\"invoice_number\":\"b1a2eaa9-11ba-4cab-8580-40f091e37742\"},\"link\":\"https://account.example.tld/api/v1/payments/1234\",\"received_at\":\"2019-11-26T10:58:09.664Z\"}"
signature     = "853fcdb7a11e0106694f5e5033df2210a0876548b68292bed6f6917602498400"

ActiveSupport::SecurityUtils.secure_compare(
  OpenSSL::HMAC.hexdigest("SHA256", shared_secret, message),
  signature
)
```

### Best Practices

To allow event delivery in a high frequency webhooks must accept events fast and their response time must be under 1 second. This means that it is not feasable to accept events and process them synchronously in the request. Instead it is recommended to just store incoming events into an internal queue and **process the events asynchonously** in a background process.

Keep in mind that the **order of messages is not guaranteed**. The subscriber must be able to handle messages that are delivered out of band or multiple times. It is recommended to check if a record has already newer changes before applying updates from an event or to implement idempotency. A simple approach might be to always pull a full copy of the latest state of an object when there was an event and not relying on partial updates.


## Pulling events

::: warning Important
**Event delivery via webhook is preferred! Avoid pulling events and only use it to replay or debug events that you already got pushed via webhook.**
:::

While getting events pushed via webhook is the default there still might be the need to replay events that have already been received and processed in the past. This shouldn't be the norm but might be helpful when debugging or after restoring a database.

Loom allows reloading events for several weeks via `HTTP GET`. The application must authenticate via `HTTP Basic Auth` with its name and event password which can be found in the Zaikio Hub.

An **example request** might look like this:

```bash
curl --request GET \
     --url 'https://loom.zaikio.com/api/v1/events?filter[name]=accounting.invoice_paid&filter[from]=2019-11-26T10%3A00%3A00&filter[to]=2019-11-26T10%3A59%3A59&page=14' \
     --user app_name:password
     --header 'Content-Type: application/json'
```

This endpoint only returns events to which the application subscribed in the Zaikio Hub. The subscription type must be `pull`.

Results from this endpoint are paginated to 100 events per page. Find the total number of events matching the filter in a custom `Total-Count` response header. Furthermore the response will contain `Link` headers following [RFC5988](https://tools.ietf.org/html/rfc5988). Example response from Loom to the above query:

**Body:**

```json
[
  {
    "id": "62abcc92-e17e-4db0-b78e-13369251474b",
    "name": "accounting.invoice_paid",
    "subject": "Org/2b271d51-e447-4a16-810f-5abdc596700a",
    "timestamp": "2019-11-26T10:58:09.664Z",
    "version": "1.0",
    "payload": {
      "invoice_number":"b1a2eaa9-11ba-4cab-8580-40f091e37742"
    },
    "link": "https://accounting.example.tld/api/v1/payments/1234",
    "received_at": "2019-11-26T10:58:09.664Z"
  },
  { ... },
  { ... },
]
```

**Header:**

```
Total-Count: 3316
Link: <https://loom.zaikio.com/api/v1/events?filter[name]=accounting.invoice_paid&filter[from]=2019-11-26T10%3A00%3A00&filter[to]=2019-11-26T10%3A59%3A59&page=15>; rel="next",<https://loom.zaikio.com/api/v1/events?filter[name]=accounting.invoice_paid&filter[from]=2019-11-26T10%3A00%3A00&filter[to]=2019-11-26T10%3A59%3A59&page=34>; rel="last",<https://loom.zaikio.com/api/v1/events?filter[name]=accounting.invoice_paid&filter[from]=2019-11-26T10%3A00%3A00&filter[to]=2019-11-26T10%3A59%3A59&page=1>; rel="first",<https://loom.zaikio.com/api/v1/events?filter[name]=accounting.invoice_paid&filter[from]=2019-11-26T10%3A00%3A00&filter[to]=2019-11-26T10%3A59%3A59&page=13>; rel="prev"
```
