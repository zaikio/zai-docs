# Client Credentials Flow

As a trusted client, you can also use the Client Credentials Flow. It enables you to establish machine to machine communication. Especially in the IoT this can make sense. It is important to be aware that this **only works for `OAuth confidential` apps**.

After the token generation you will need to use the regular [Access Token Refresh](./access-token-refresh.html).

## Becoming a trusted client

Requested scopes by the Client Credentials Flow must be granted beforehand, otherwise the scope error `ungranted_scope` (see [scope errors](/guide/oauth/scopes.html)) will be returned.

This means that the person or organization must have successfully accepted the scopes in advance through a [Redirect Flow](/guide/oauth/redirect-flow.html) (or through the Device Flow) for this app.

::: tip
This authorization can also be done later directly through the Directory App (via Connections), if the App has been approved by the Zaikio Team. If you want to participate, please contact us directly.
:::

## Creating an access token

In order to create a valid access token you need send a `POST` request to `https://directory.sandbox.zaikio.com/oauth/access_token`. The following parameters must accompany the request:

| Name       | Required     | Description                                                                                                                                                                                    |
| ---------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| grant_type | **Required** | The requested OAuth grant type, in this case `client_credentials`.                                                                                                                             |
| scope      | **Required** | The comma-separated list of scopes containing the id of the bearer e.g. `Org/b1475f65-236c-58b8-96e1-e1778b43beb7.warehouse.items.r` Please read the [scope guides](/guide/oauth/scopes.html). |

After receiving the `access_token` (as described in the other flows). The `Authorization` header can be used to perform authorized requests. More details can be found in the [Redirect Flow Guide](redirect-flow.html#retrieve-user-information-via-the-directory-api).

## Authentication

When using the client credentials flow authentication needs to happen by using the `HTTP BASIC` authentication method, where the username is the app's `OAuth client ID` and the password is the app's `OAuth client secret`.


## On behalf of Person

In addition, the Client Credentials Flow provides the option of issuing a token for an organization, which also references a person and specifies their roles in the context of this organization in the JWT (JSON Web Token).

It is important that both the person and the organization have already been connected to the app and that the organization has already requested the required permissions in the form of scopes. Requested scopes must then receive the person and the organization in this format:

```
scope: Per/29b276b7-c0fa-4514-a5b1-c0fb4ee40fa7>Org/b1475f65-236c-58b8-96e1-e1778b43beb7.directory.machines.rw
```

If such a token was successfully requested, the following JWT payload and response is returned:

:::: tabs
::: tab JWT-payload

```json
{
  "iss": "ZAI",
  "sub": "Person/29b276b7-c0fa-4514-a5b1-c0fb4ee40fa7>Organization/b1475f65-236c-58b8-96e1-e1778b43beb7",
  "aud": [],
  "jti": "b1475f65-236c-58b8-96e1-e1778b43beb7",
  "nbf": 1576225131,
  "exp": 1576225731,
  "jku": "https://directory.sandbox.zaikio.com/api/v1/jwt_public_keys",
  "scope": [
    "directory.machines.rw"
  ],
  "roles": 3
}
```

:::

::: tab oauth/access_token

```json
{
  "access_token": "749ceefd1f7909a1773501e0bc57d5b2",
  "token_type": "bearer",
  "scope": "directory.machines.rw",
  "refresh_token": "TYi5nzw1VEUTDpimEFAqnDbL",
  "expires_in": 599,
  "audiences": [
    "directory"
  ],
  "bearer": {
    "id": "b1475f65-236c-58b8-96e1-e1778b43beb7",
    "type": "Organization"
  },
  "bearer_on_behalf_of": {
    "id": "29b276b7-c0fa-4514-a5b1-c0fb4ee40fa7",
    "type": "Person",
    "roles": ["owner", "admin"]
  }
}
```

:::
::::

The role attribute is represented as integer to save space, as many servers limit the header size. Since we offer a very granular role model, this is very helpful.

This is a so-called bitfield ([Wikipedia: Bitfield](https://en.wikipedia.org/wiki/Bit_field)).

For this you need the list of all existing roles with the same sorting (this is provided by us via the endpoint `GET /api/v1/roles`), e.g.:

```json
[
  "owner",
  "admin",
  "member",
  "print_admin"
]
```

The bitfield can be read with following implementation:

:::: tabs
::: tab Ruby

```rb
class RoleBitField
  attr_reader :bitfield

  def initialize(bitfield, roles)
  	@bitfield = bitfield || 0
    @roles = roles || []
  end

  def role?(role_name)
    return !(bitfield & bit_for_role(role_name)).zero?
  end

  def add_role(role_name)
    return if role?(role_name)

    @bitfield += bit_for_role(role_name)
  end

  def remove_role(role_name)
    return unless role?(role_name)

    @bitfield -= bit_for_role(role_name)
  end

  def active_roles
    roles.select { |r| role?(r) }
  end

  private

  attr_reader :roles

  def bit_for_role(role_name)
    2 ** roles.index(role_name)
  end
end

roles =  [ # Get from API
  "owner",
  "admin",
  "member",
  "print_admin"
]

role_bit_field = RoleBitField.new(3, roles) # 3 comes from JWT-roles
puts role_bit_field.active_roles # ['owner', 'admin']
```

:::
::: tab Javascript

```js
class RoleBitField {
  constructor(bitfield, roles) {
  	this.bitfield = bitfield || 0;
    this.roles = roles || [];
  }

  hasRole(roleName) {
    return ((this.bitfield & this.bitForRole(roleName)) !== 0);
  }

  addRole(roleName) {
    if (!this.hasRole(roleName)) {
      this.bitfield += this.bitForRole(roleName);
    }
  }

  removeRole(roleName) {
    if (this.hasRole(roleName)) {
      this.bitfield -= this.bitForRole(roleName);
    }
  }

  bitForRole(roleName) {
    const pos = this.roles.indexOf(roleName);
    return Math.pow(2, pos);
  }

  get activeRoles() {
    return this.roles.filter(r => this.hasRole(r));
  }

  get bitField() {
    return this.bitfield;
  }
}

const roles = [ // Get from API
  "owner",
  "admin",
  "member",
  "print_admin"
]

const roleBitField = new RoleBitField(3, roles); // 3 comes from JWT-roles
console.log(example1.bitField, example1.activeRoles); // 3, ['owner', 'admin']
```

:::

::::
