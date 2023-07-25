# Getting started and exploring the API

The simplest way to do this is to issue a Private Access Token. This can be done at the Zaikio Hub on the settings page for your Organisation.

![creating an auth token](./creating-an-auth-token.png)

To create a token, you simply need to provide it with a name to reference it by and select the scopes that you need - these represent access to different parts of the data model. To utilise the data platform effectively and experiment, we would suggest adding `zaikio.organization.r`, `zaikio.jobs.rw` and `zaikio.orders.rw` as a minimum.

![setting access scopes](./setting-access-scopes.png)

You will be presented with your access token only once, so store it securely - this is your key for accessing the API.

![getting the token](./getting-the-token.png)

This value can then be used to make requests to the Zaikio platform, such as retrieving the details of your Organisation. If you have a file containing a valid Authorisation header, such as:

```bash
# auth.txt
Authorization: Bearer YourSuperLongBearerTokenReplacesThisBitHereAndYesEvenThoughItIsReallyLongYouDoNeedAllOfIt
```

Then you can simply make a request to the API using a client like cURL:

```bash
curl -H @auth.txt -i https://hub.sandbox.zaikio.com/api/v1/organization
```

To return the details on your Organization

```json
// ➜  demo curl -H @auth.txt https://hub.sandbox.zaikio.com/api/v1/organization
{
  "id": "51232a2a-318a-4484-be86-db521b747b86",
  "name": "Sample Printing Solutions",
  "slug": "sample-printing-solutions",
  "connected": false,
  "kinds": [
    "software_developer"
  ],
  "sections": {
    "software_developer": [
      "web_to_print"
    ]
  },
  "country_code": "GB",
  "granted_oauth_scopes": [],
  "requested_oauth_scopes": [],
  "requested_oauth_scopes_waiting_for_approval": [],
  "brand_color": null,
  "currency": "GBP",
  "test_account_owner_id": null,
  "require_two_factor_authentication": false,
  "created_at": "2022-07-22T14:56:00.099Z",
  "updated_at": "2023-06-26T10:32:08.631Z",
  "unconfirmed_tax_identifier": null,
  "unconfirmed_tax_identifier_valid": null,
  "tax_identifier": null,
  "logo_url": null,
  "kind": "software_developer",
  "authorized_for_payment": false,
  "subscription": null
}
```

From here, the best place to go is [the data platform documentation](https://docs.zaikio.com/api/data_platform/guides)
to explore the topics you are interested in. Using our [OpenAPI Documentation](https://spec.openapis.org/oas/v3.0.3)
you can configure clients such as [PostMan](https://www.postman.com/), use [cURL](https://curl.se/), or a
fully-fledged programming language to get started.

<!-- To discover which parts of our API might help you solve different problems, you might enjoy browsing our [API Components guide](/integration/api-components) -->
