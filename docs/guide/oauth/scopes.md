# Scopes

Scopes are used to determine which permissions each client has for a defined subject. An authenticated person must grant these permissions either to an organisation or to themselves.
We therefore distinguish between two types of bearers in a Authorization token: `Organization` and `Person`. Scopes are used to identify the subject type for which the token is to be created.

Scopes can also be added to various audiences.

## Requested Scope Structure

This is the basic structure of a requested scope `BEARER_TYPE_AND_ID`.`APP_NAME`.`SCOPE_NAME`.`PERMISSION`

### `BEARER_TYPE_AND_ID`

Can be omitted or be `Org` or `Per`. For the [client credentials flow](/guide/oauth/client-credentials.html) it is also required to provide the UUID of the Organisation or Person (e.g. `Org/b1475f65-236c-58b8-96e1-e1778b43beb7`).

It is also allowed to pass the Organization ID in the Redirect Flow or Device Flow, so that the user does not have to select an organisation again. However, this does not work for people, because it is automatically the currently logged in person.

### `APP_NAME`

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
| `malformed_scope`                         | The scope your provided does not match the regex as outlined above.                                                                                            |
| `scope_is_not_included_in_desired_scopes` | The required scopes were not created as desired scopes.                                                                                                        |
| `different_bearer_ids`                    | The bearer types are correct, but the IDs are different (Might happen in [Client Credentials Flow](./client-credentials.html)).                                |
| `bearer_does_not_exist`                   | The bearer was not found or the client was not authorized by the bearer. (Might happen in [Client Credentials Flow](./client-credentials.html)).               |
| `unpermitted_bearer_id`                   | Bearer IDs are not allowed to be passed, the only exception is the [Client Credentials Flow](./client-credentials.html) or to set a specific organisation.     |
| `scope_was_not_granted_in_parent`         | When a scope was not granted in the parent access token. See [Delegating Access to Subsystems](./delegate-access.md).                                          |
| `delegation_access_token_cannot_delegate` | A `directory.delegations.rw` scope cannot be granted for a delegated access token. See [Delegating Access to Subsystems](./delegate-access.md).                |
| `parent_has_no_delegation_permission`     | A `directory.delegations.rw` scope has to be present for the parent token. See [Delegating Access to Subsystems](./delegate-access.md).                        |


**If a scope does not exist or is not applicable to the bearer type, the scope will not be part of the created access token.**
