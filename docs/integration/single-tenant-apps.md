# Single Tenant Applications

Single tenant deployments follow many of the same concepts as multi-tenant applications, with the following differences.

## Security

Similar to a native or mobile application, it is important to consider each installation of a single-tenant deployment as a security perimeter and not trust the installation within. An unexpected compromise of one tenant's installation should never result in leaking credentials that could be used to access data from other tenants. Practices such as per-installation database credentials, correctly scoped within the DBMS should always be followed. Zaikio helps to ensure that access to Job data is controlled by offering PKCE support for our oAuth flows. It is imperative that this is used for single-tenant applications, even if it might be simpler to just pass the oAuth App Credentials around, as doing that is insecure.

## oAuth

We have already discussed the need for PKCE within a single-tenant context, and this is covered in more detail below, under the [Confidentiality]() section. Additional considerations are required in the handling of the redirect section of the oAuth flow.

### Confidentiality

Applications deployed as single-tenant solutions should always classified as _public_ - they should not be considered to have the ability to store an application secret securely.

_Public_ applications use a slightly different flow to authenticate - PKCE. To read more about this, the [oAuth documentation](https://datatracker.ietf.org/doc/html/rfc6749#section-2.1) is the best place, but to summarise - it removes the need for the application secret, limiting the app to only act on behalf of the currently-authenticated user. If you're using NodeJS then our [Passport](https://github.com/zaikio/passport-zaikio) plugin handles this correctly with a single config option, otherwise please consult the oAuth library of your choice.

To use a PKCE flow, you must mark the credentials as _public_ in your app's settings page. Click the padlock icon next to the credentials you wish you use, and you will be greeted with a popup:

Screenshot 2023-06-26 at 09.43.40.png

Which, when accepted, will transform the credential to public credentials ready for usage.

Screenshot 2023-06-26 at 09.53.01.png

### Handling oAuth flows

oAuth requires all URLs specified as redirect targets to be fully-qualified, i.e. an absolute URL. For some single-tenant deployments this might not be a problem - for example if the solution runs as a virtual machine within a customer datacenter that is always available via a pre-determined URL that is the same for all clients. If this is the case, then simply provide this URL to the application configuration and all will work correctly without further configuration.

However, if the application runs with its own access URL that differs per tenant - e.g. `customer1.example.com` or `example.com/customer1`, then you will need to provide a function for dynamically redirecting the tenant to their own installation.

The process in this situation is relatively simple. A redirection service needs to be operated which runs at a single, well-known endpoint. This is configured to accept the redirect request, and using a URL state parameter identify the originator of the request.

```
https://hub.zaikio.com/oauth/authorize?state=CLIENT1&redirect_url=https://redirection.example.com/oauth/callback
```

This app then would take the state parameter, look up which client it refers to and then perform a second redirection to the right endpoint for that app. This can be an extremely minimal solution, and we have provided a sample that can be used as a basis for your use-case.

More information on our oAuth solutions can be found in our main documentation [here](https://docs.zaikio.com/guide/oauth/)

### Secure storage of credentials

Whilst in this integration model the application itself does not contain any app secrets, once authenticated it will receive an access token and a refresh token than can be used to access data. It is always best to store this securely using encryption. The scope of doing this is outside of our advice, however we would advise following platform-specific best-practices to ensure good hygiene.

## Receiving Events

Normally, when a resource is created, updated or destroyed, Loom will send an event notification to an endpoint that your application has defined in its config. This allows you to build reactive applications that respond quickly and effectively to changes in the data.

Unfortunately, due to the deployment model of having many installations, we do not currently offer the ability to route Loom events to many endpoints with the correct filtering. We are working on releasing this, but until then there are two options.

Firstly, you could expand the redirection app used for oAuth (if required) to accept all Loom events for your application and then reroute them to each installation depending on the Organization ID in the event. This would allow you simply to remove this step when we upgrade Loom in the future to allow multiple bindings natively.

Alternatively, you can ask each installation to poll Loom for changes. This might be a better approach if your applications run behind a firewall, such as inside a client's datacenter or print shop.

```bash
curl --request GET \
     --url 'https://loom.zaikio.com/api/v1/events?filter[name]=zaikio.job_added&filter[from]=2023-06-26T10%3A00%3A00&page=1' \
     --header "Authorization: Bearer $YOUR_OAUTH_ACCESS_TOKEN"
     --header 'Content-Type: application/json'
```

Results are paginated, and can be filtered according to the event name or timestamps as follows:

| Parameter name | Description |
| --- | --- |
| filter[name] | The name of the event to return events for |
| filter[from] | A URL-encoded timestamp that marks the earliest an event should be returned from |
| filter[to] | A URL-encoded timestamp that marks the latest an event should be returned to |
| page | The page of results to return |
| per | How many results to return in a page |

Loom will rate limit your requests according to our rate-limiting policies, so consider how regularly you actually need to be alerted to updates. For many applications polling for changes each minute is ample.

This would allow you to build more advanced and scalable application topologies but further guides to doing this are outside of the scope of our documentation. Many use-cases can get started and go a long way simply polling for changes though, and we would recommend that as a simple starting point.

In future we will be offering advanced web-socket based  endpoints to allow realtime responses from within the firewall. We'll be communicating this through our community channels as soon as this is available.
