# Scopes

Scopes are used to determine which permissions each client has for a defined subject. An authenticated person must grant these permissions either to an organisation or to themselves.
We therefore distinguish between two types of bearers in a Authorization token: `Organization` and `Person`. Scopes are used to identify the subject type for which the token is to be created.

Scopes can also be added to various audiences.

## Requested Scope Structure

This is the basic structure of a requested scope `BEARER_TYPE_AND_ID`.`AUDIENCE_NAME`.`SCOPE_NAME`.`PERMISSION`

### `BEARER_TYPE_AND_ID`

Can be omitted or be `Org` or `Per`. For the [client credentials flow](/guide/oauth/client-credentials.html) it is also required to provide the UUID of the Organisation or Person (e.g. `Org/b1475f65-236c-58b8-96e1-e1778b43beb7`).

### `AUDIENCE_NAME`

Defines for which app the permission should be granted. For example: `warehouse`.

### `SCOPE_NAME`

The scope name is provided by each app and is given by each app.

### `PERMISSION`

The type of permission that is requested. `r` stands for _read_, `w` for _write_ and `rw` for _read_write_.

### Regex

```regex
/^(((Org|Per)(\/[a-z0-9-]+)?)\.)?[a-z]{1}[a-z0-9_]{2,}\.[a-z]{1}[a-z_]{2,}\.(rw|r|w)/
```

### Valid requested scopes examples

| Requested Scope                                              | Description                                                                                                                            |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `directory.person.r`                                         | By default, if no `BEARER_TYPE` is provided, the scope is read as a `Person` scope.                                                    |
| `Per.directory.person.r`                                     | Same as above.                                                                                                                         |
| `Org.directory.machines.rw`                                  | The person can choose which organisation will be the bearer.                                                                           |
| `Org.warehouse.items.r`                                      | This uses a scope, that needs to be provided by `warehouse`                                                                            |
| `Org/b1475f65-236c-58b8-96e1-e1778b43beb7.warehouse.items.r` | This format is required for the [client credentials flow](/guide/oauth/client-credentials.html).                                       |
| `Org.directory.delegations.rw`                               | Enable the access token to create delegated access tokens for subsystems. See [Delegating Access to Subsystems](./delegate-access.md). |

::: tip IMPORTANT
When scopes are returned in `POST oauth/access_tokens`, the `BEARER_TYPE` will be always omitted. Instead a specific `bearer` will be provided that has an `id` and a `type`. It can also happen that not all scopes that were requested are returned if the Bearer is not connected to the apps from the requested scopes.
:::

## Possible Errors

Scopes are validated and following errors can occur:

| Error identifier                          | Description                                                                                                                                                    |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `different_bearer_types`                  | Multiple scopes were specified for different bearer types.                                                                                                     |
| `invalid_audience`                        | The audience that was specified does not exist.                                                                                                                |
| `invalid_scope_name`                      | The given scope name does not exist for the provided audience.                                                                                                 |
| `invalid_permission`                      | The given permission does not exist for the provided scope.                                                                                                    |
| `malformed_scope`                         | The scope your provided does not match the regex as outlined above.                                                                                            |
| `unavailable_scope_for_bearer_type`       | Some scopes are only available for `Person` or `Organization`. Usually this should be documented by the app provider.                                          |
| `scope_is_not_included_in_desired_scopes` | The required scopes were not created as desired scopes.                                                                                                        |
| `different_bearer_ids`                    | The bearer types are correct, but the IDs are different (Only happens in [Client Credentials Flow](./client-credentials.html)).                                |
| `bearer_does_not_exist`                   | The bearer was not found or the client was not authorized by the bearer. (Only happens in [Client Credentials Flow](./client-credentials.html)).               |
| `unpermitted_bearer_id`                   | Bearer IDs are not allowed to be passed, the only exception is the [Client Credentials Flow](./client-credentials.html).                                       |
| `unconnected_app`                         | The bearer has not previously granted access to this app (e.g. through Redirect Flow). (Only happens in [Client Credentials Flow](./client-credentials.html)). |
| `scope_was_not_granted_in_parent`         | When a scope was not granted in the parent access token. See [Delegating Access to Subsystems](./delegate-access.md).                                          |
| `delegation_access_token_cannot_delegate` | A `directory.delegations.rw` scope cannot be granted for a delegated access token. See [Delegating Access to Subsystems](./delegate-access.md).                |
| `parent_has_no_delegation_permission`     | A `directory.delegations.rw` scope has to be present for the parent token. See [Delegating Access to Subsystems](./delegate-access.md).                        |

## Provided OAuth Scopes Guidelines

If you want to give third parties access to your APIs, you can offer them scopes to restrict access. You have to create OAuth Scopes for your app in the directory (Provided OAuth Scopes). How you treat these scopes is up to you. The scopes are part of the JSON Web Token (short: `JWT`) and can be processed by you.

In order to ensure consistency for the customer and the API consumer, we have created some guidelines.

### As few scopes as possible

In general, it makes sense not to describe scopes too granularly. On the one hand this has the disadvantage that the customer has to read a lot if they accept the scopes and on the other hand there is a limitation in the browser, which is why the JWT should not be larger than 8KB.

A rule of thumb is that an app should **not request more than 3 scopes of another app** at once. This can be achieved by combining several scopes to one larger scope.

Always remember what the use cases of the other providers could be. It's easy to add more scopes afterwards, so it makes sense to start with a few scopes.

### `write_only` scopes

Most apps do not require `write_only` scopes. It's obvious to add this once you have created a `read` scope, but in most cases a `read_only` and a `read_write` scope will do.

There is only one use case where it can make sense to offer a `write_only` scope and that is when you want to store things like in a drop box. For example, if you provide an API that sends messages but can't see the messages itself. However, if you provide a messaging service where customers send each other messages, you probably want to offer a scope like `messages read_and_write` where you decide which messages the customer is allowed to see based on the bearer.

### Naming scopes

The name of the scope is primarily significant for other third party developers and for the size of the JWT. Customers do not see the technical name of the scope, only its technical description.

The technical description should be short and simple for the customer. The customer sees the scopes with the sentence _YourApp would like..._. For example: _Receive and send messages_.

The technical name should be short and crisp, for example `messages read_and_write`. In most cases, the name depends on the resource or resource group.
