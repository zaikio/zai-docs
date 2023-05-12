# On Behalf Tokens

You may have use cases where you want to perform actions within the realm of an organization but still keep the 
possibility to identify the person who initiated these actions, and this can be done through `on-behalf` tokens.

It is important that both the person and the organization have already been connected to the app and that the 
organization has already requested the required permissions in the form of scopes.:

These tokens can be acquired by using the redirect flow or device flow and identifying the scope a user needs in 
a specific format.

## Unrequested Scopes

It may be the case that an on-behalf token is requested for a scope that was never granted before within the 
organization. Two scenarios are to be considered in that case: 

- The user is a member: the scope won't be granted at all, the token you will receive won't possess the requested scope.
- The user is an `admin` or `owner`: upon organization selection, the user will be prompted to agree to give the permissions to the app.

::: warning
As mentioned above, if the requesting user can't be granted the requested scope this will not trigger any error and any 
subsequent request with the issued token will therefore result in a permission error.
Make sure to handle this scenario and to inform your user to ask the administrator to grant it in case the requested 
scope is not available.
:::


## Requesting the authorisation grant

In both cases you may add an `on-behalf` formatted scope to the `scope` field, which takes the following form : 

```
Per>Org.app.resource.flag
```

You may also directly specify for which organization to act on behalf of by adding the organization's `id` to the scope such as: 

```
Per>Org/b1475f65-236c-58b8-96e1-e1778b43beb7.directory.machines.rw
```
See the [scope guides](/guide/oauth/scopes.html) for more information and refer to the 
[redirect flow](/guide/oauth/redirect-flow.html#requesting-a-user-s-identity) and 
[device flow](/guide/oauth/device-flow.html#your-device-requests-a-device-authorisation-grant) 
for specific flow documentation on this step.

## Exchange the grant code for an access token

Now you have received the authorization grant, you can exchange it for an access token as described in the 
[redirect flow](/guide/oauth/redirect-flow.html#exchange-the-grant-code-for-an-access-token) and 
[device flow](/guide/oauth/redirect-flow.html#exchange-the-grant-code-for-an-access-token).

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
  "jku": "https://https://hub.zaikio.com/api/v1/jwt_public_keys",
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

::: warning
Remember that tokens issued as `on_behalf` have a bearer type of `Organization`, this means you should only request 
scopes that are usable by organizations, scopes that are dedicated to people will be dismissed.
:::

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
