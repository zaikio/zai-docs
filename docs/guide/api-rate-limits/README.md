# API Rate Limits

Learn about API rate limits and how to work with them.

The Zaikio API employs several safeguards to protect the application from brute force and denial of service attacks or bursts of incoming traffic in general to maximize its stability. Clients who send many requests in a short timeframe may see error responses that show up as status code 429.

Treat these limits as maximums and don’t generate unnecessary load. See Handling limiting gracefully for advice on handling 429s.

The configuration of these API rate limits might be different for various Zaikio applications or different endpoints depending on the complexity of the underlying operation or security requirements. Furthermore, these API limits can change at any moment without notice to prevent abuse.

## Handling limiting gracefully

Rate limiting can occur under a variety of conditions, but the most common is running a large volume of closely-spaced requests. Often this is part of an analytical or migration operation. When engaging in these activities, you should try to control the request rate on the client-side.

When the API rate limit is hit then the Zaikio API will set to additional response headers:

- `RateLimit-Reset`: UNIX timestamp that tells when the current rate limit will be reset. When you want to retry your request then retry after that time.
- `RateLimit-Rule`: A short description of the rate limit rule that triggered throttling the request, e.g. "300reqs/60s" means this endpoint allows 300 requests per 60 seconds.

A basic technique for integrations to gracefully handle limiting is to watch for 429 status codes and build in a retry mechanism. The retry mechanism should follow an exponential backoff schedule to reduce request volume when necessary. We’d also recommend building some randomness into the backoff schedule to avoid a thundering herd effect.

You can only optimize individual requests to a limited degree, so an even more sophisticated approach would be to control traffic to Zaikio at a global level, and throttle it back if you detect substantial rate limiting. A common technique for controlling rate is to implement something like a token bucket rate-limiting algorithm on the client-side. Ready-made and mature implementations for token buckets are available in almost any programming language.

## Load testing

It’s common for users to prepare for a major event by load testing their systems, with the sandbox environment of the Zaikio API as part of it. We generally discourage this practice because API limits might be different in the sandbox mode. The sandbox environment is also not a perfect stand-in for live API calls because the sandbox environment has less data, less average load, and runs on fewer servers.

As an alternative, we recommend building integrations so that they have a configurable system for mocking out requests to the Zaikio API, which can be enabled for load tests. For realistic results, they should simulate latency by sleeping for a time that you determine by sampling the durations of real production mode Zaikio API calls, as seen from the perspective of the integration.
