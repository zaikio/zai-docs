# Receiving events

The preferred and easiest way to receive events is via webhook. A webhook URL must be provided when an application subscribes to an event in the Directory.

Loom will distribute incoming events to the subscriber by `HTTP POST` of a JSON document to the provided URL. To increase security these `POST` **requests are signed** with a shared secret that is only known to Loom and the application. This lets the receiver to verify that the message was forwarded by Loom and that it wasn't altered.

Loom **retries delivery multiple times** for several hours when webhooks don't respond in time with an HTTP status code in the 2xx range. _In time_ means within 1 second, after that the request will time out.

**Example** how a Loom posts to the subscriber's webhook

```bash
curl --request POST \
     --url https://api.app.example.tld/webhooks/abc \
     --header 'Content-Type: application/json'
     --header 'X-Loom-Signature: sha256=91e84e7acba6bad9160ee952691d71e4acf64c576bb52d7a0c4f9adc0f1923a3'
     --data '{"id":"62abcc92-e17e-4db0-b78e-13369251474b","name":"accounting.invoice_paid","timestamp":"2019-11-26T10:58:09.664Z","version":"1.0","payload":{"invoice_number":"b1a2eaa9-11ba-4cab-8580-40f091e37742"},"received_at":"2019-11-26T10:58:09.664Z"}'
```

## Best Practices

To allow event delivery in a high frequency webhooks must accept events fast and their response time must be under 1 second. This means that it is not feasable to accept events and process them synchronously in the request. Instead it is recommended to just store incoming events into an internal queue and **process the events asynchonously** in a background process.

Keep in mind that the **order of messages is not guaranteed**. The subscriber must be able to handle messages that are delivered out of band or multiple times. It is recommended to check if a record has already newer changes before applying updates from an event or to implement idempotency. A simple approach might be to always pull a full copy of the latest state of an object when there was an event and not relying on partial updates.

The receiver may want to **verify the signature** to increase security. Loom generates a `SHA256 HMAC` signature using the `shared_secret` of the subscriber application and the request body. Find the shared secret in the Directory and the signature in a custom `X-Loom-Signature` request header.

**Example** how to verify the signature

```ruby
shared_secret = "nq9oZo7haPgNVdNRccWhK551"
message       = "{\"id\":\"62abcc92-e17e-4db0-b78e-13369251474b\",\"name\":\"accounting.invoice_paid\",\"timestamp\":\"2019-11-26T10:58:09.664Z\",\"version\":\"1.0\",\"payload\":{\"invoice_number\":\"b1a2eaa9-11ba-4cab-8580-40f091e37742\"},\"received_at\":\"2019-11-26T10:58:09.664Z\"}"
signature     = "91e84e7acba6bad9160ee952691d71e4acf64c576bb52d7a0c4f9adc0f1923a3"

OpenSSL::HMAC.hexdigest("SHA256", shared_secret, message) == signature
```

## Pulling events

While getting events pushed via webhook is the default there still might be the need to replay events that have already been received and processed in the past. This shouldn't be the norm but might be  helpful when debugging or after restoring a database.

Loom allows reloading events for several weeks via `HTTP GET`. The application must authenticate via `HTTP Basic Auth` with its name and event password which can be found in the Directory.

An **example request** might look like this:

```bash
curl --request GET \
     --url 'https://loom.heidelberg.cloud/api/v1/events?filter[name]=accounting.invoice_paid&filter[from]=2019-11-26T10%3A00%3A00&filter[to]=2019-11-26T10%3A59%3A59&page=14' \
     --user app_name:password
     --header 'Content-Type: application/json'
```

Results from this endpoint are paginated to 25 events per page. Find the total number of events matching the filter in a custom `X-Total-Count` response header. Furthermore the response will contain `Link` headers following [RFC5988](https://tools.ietf.org/html/rfc5988). Example response from Loom to the above query:

**Body:**

```json
[
  {
    "id": "62abcc92-e17e-4db0-b78e-13369251474b",
    "name": "accounting.invoice_paid",
    "timestamp": "2019-11-26T10:58:09.664Z",
    "version": "1.0",
    "payload": {
      "invoice_number":"b1a2eaa9-11ba-4cab-8580-40f091e37742"
    },
    "received_at": "2019-11-26T10:58:09.664Z"
  },
  { ... },
  { ... },
]
```

**Header:**

```
X-Total-Count: 829
Link: <https://loom.heidelberg.cloud/api/v1/events?filter[name]=accounting.invoice_paid&filter[from]=2019-11-26T10%3A00%3A00&filter[to]=2019-11-26T10%3A59%3A59&page=15>; rel="next",<https://loom.heidelberg.cloud/api/v1/events?filter[name]=accounting.invoice_paid&filter[from]=2019-11-26T10%3A00%3A00&filter[to]=2019-11-26T10%3A59%3A59&page=34>; rel="last",<https://loom.heidelberg.cloud/api/v1/events?filter[name]=accounting.invoice_paid&filter[from]=2019-11-26T10%3A00%3A00&filter[to]=2019-11-26T10%3A59%3A59&page=1>; rel="first",<https://loom.heidelberg.cloud/api/v1/events?filter[name]=accounting.invoice_paid&filter[from]=2019-11-26T10%3A00%3A00&filter[to]=2019-11-26T10%3A59%3A59&page=13>; rel="prev"
```
