---
sidebar: auto
---

# Test Accounts

Especially to show potential customers the value of your app, it is necessary to offer interactive demos. We recommend linking a demo app (in the sandbox) with pre-filled data in the Zaikio App Store.

To make this as automated and simple as possible, Zaikio provides an API to create and reset test accounts. Different from other APIs, connections and subscriptions, as well as persons can already be created in one single request.

## Create or reset a test account

By posting to `/test_accounts` (see also [Hub API Specification](/api/directory/directory.html#/Test%20Accounts/post_test_accounts)) with the OAuth credentials of one of your apps, you can create or reset a test organisation.

**IMPORTANT**: The API is only available in the sandbox environment.

::: tip Test organisation name
The name of the organisation is used to uniquely identify the organisation. It is therefore also not possible to change the name of a test organisation in Zaikio Hub. If a `POST` request is sent again for the same organisation name, the previous organisation will be deleted.
:::

```bash
curl --request POST \
  --url https://hub.sandbox.zaikio.com/api/v1/test_accounts \
  --header 'Authorization: Basic xxx' \
  --header 'Content-Type: application/json' \
  --data '{
  "test_account": {
    "name": "Bounty Soap Inc.",
    "country_code": "DE",
    "logo_url": "string",
    "kinds": [
      "printer"
    ],
    "sections": {
      "printer": [
        "softcover_books"
      ],
      "supplier": [
        "sheet_substrates"
      ],
      "machine_vendor": [
        "sheet_fed_offset_presses"
      ],
      "designer": [
        "self_employed"
      ],
      "publisher": [
        "softcover_books"
      ],
      "software_developer": [
        "imposing"
      ]
    },
    "connection_attributes": [
      "procurement_consumer"
    ],
    "subscription_attributes": [
      {
        "app_name": "keyline_classic",
        "plan_name": "basic"
      }
    ],
    "member_attributes": [
      {
        "email": "jane.doe@gmail.com",
        "password": "string",
        "country_code": "DE",
        "locale": "de",
        "first_name": "Jane",
        "name": "Doe",
        "avatar_url": "string",
        "roles": [
          "owner"
        ]
      }
    ],
    "site_attributes": [
      {
        "name": "Berlin North",
        "headquarter": true,
        "address_attributes": {
          "addressee": "Zaikio GmbH",
          "text": "Emmerich-Josef-Straße 1A, 55116 Mainz"
        }
      }
    ]
  }
}'
```

## Manage test accounts

Besides creating new test organizations, it is also possible to list and delete test organizations. For further details please refer to the [Test Accounts API](/api/directory/directory.html#/Test%20Accounts).

In addition, `test_account_owner_id` is passed when calling the  `GET /person` or `GET /organization` endpoint. If it isn't a test organisation or person, `null` will be returned. Otherwise the UUID of the app vendor will be returned.

## Best practices

In addition to test accounts used in guided demos, we also recommend linking an interactive demo directly in the Zaikio App Store so that a potential customer can immediately try out the functionality. For onprem software, one should display test login credentials to the customer with additional instructions.

We recommend that customers using the redirect flow provide the following in the app's sandbox environment. This flow will even work for users that don't have a Zaikio account yet.

1. Potential customer clicks on link in Zaikio App Store e.g. `https://app.sandbox.example.com/try-demo`
2. App creates a new Zaikio test account with a unique name and connects them (via `connection_attributes: ['myapp']`) with the current app.
3. The app creates comprehensive in-app test data for the Zaikio test organisation.
4. (optional) Calling APIs of other apps that are involved to create respective test data.
5. Since the app is connected, the app can perform a [client credentials OAuth flow](/guide/oauth/client-credentials.html) with a test person you created.
6. The created Zaikio access token will be used to sign in the user to your app (no redirect flow needed!). Now the user can test your app.
8. App cleans up test accounts (e.g. in the night)

If you have multiple test scenarios, you can repeat these steps for each scenario or allow the potential customer to choose between different scenarios within your app.
