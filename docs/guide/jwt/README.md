---
title: JSON Web Tokens
lang: en-US
sidebar: auto
---

# Exchanging JSON Web Tokens

To exchange [JSON Web Tokens](https://tools.ietf.org/html/rfc7519) with each other, the recipient must check the validity of the token. Since we issue the token, only the validity must be checked using the public key (which is provided as a [JWK](https://tools.ietf.org/html/rfc7517)). You can use the following interactive validity checker to decode the payload and verify the signature.

As an API provider, you **MUST** to validate incoming tokens and verify that the subject is authorized to perform certain operations by checking the specified scopes.

## Interactive Verifier

<ClientOnly><JWTVerifier></JWTVerifier></ClientOnly>

## How to validate a JWT

Each programming language usually provides public libraries that can be used to validate and decode the JWT.

1. Get the public JWK (JSON Web Key) via the directory API `GET https://hub.zaikio.com/api/v1/jwt_public_keys`
2. (optionally) Depending on the library used, transform the JWK into a public certificate `.pem` (since some libraries require this format)
3. Decode the payload and verify validity of the JWT with a JWT library

:::: tabs

::: tab JavaScript

```js
// npm install jwk-to-pem jsonwebtoken axios
// https://github.com/auth0/node-jsonwebtoken

import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const SANDBOX_SERVER = 'https://hub.sandbox.zaikio.com/api/v1';
let jwk;

async function validateJWT(jwt) {
  if (!jwk) { // you should cache the jwk
    const response = await axios.get(SANDBOX_SERVER + '/jwt_public_keys');
    jwk = response.data.keys[0];
  }

  return jwt.verify(this.jwt, jwkToPem(jwk)); // throws error if JWT is invalid
}
```

:::

::: tab Ruby

```rb
# gem install jwt
# https://github.com/jwt/ruby-jwt

require 'jwt'
require 'net/http'
require 'active_support/all'

sandbox_server = 'https://hub.sandbox.zaikio.com/api/v1'
uri = URI("#{sandbox_server}/jwt_public_keys.json")
keys = JSON.parse(Net::HTTP.get(uri))['keys']
# Cache JWKs on your server
@jwks = keys.map { |key_data| JWT::JWK.import(key_data.with_indifferent_access) }

def validate_jwt(jwt) # might raise JWT::DecodeError
  JWT.decode(jwt, nil, true, { algorithm: 'RS256', jwks: { keys: @jwks.map(&:export) } }).first
end
```

:::

::::
