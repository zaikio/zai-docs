---
title: JSON Web Tokens
lang: en-US
sidebar: auto
---

# Exchanging JSON Web Tokens

To exchange [JSON Web Tokens](https://tools.ietf.org/html/rfc7519) with each other, the recipient must check the validity of the token. Since we issue the token, only the validity must be checked using the public keys (which are provided as [JWKs](https://tools.ietf.org/html/rfc7517)). You can use the following interactive validity checker to decode the payload and verify the signature.

As an API provider, you **MUST** validate incoming tokens and verify that the subject is authorized to perform certain operations by checking the specified scopes.

Be aware that, in order to ensure security for our end users, we rotate our keys regularly (every 3-6 months). It is recommended to not cache the public keys for longer than one day. There will be very long transition periods where you must test against an incoming JWT against multiple keys as done in the example code below.

## Interactive Verifier

<ClientOnly><JWTVerifier></JWTVerifier></ClientOnly>

## How to validate a JWT

Each programming language usually provides public libraries that can be used to validate and decode the JWT.

1. Get the public JWKs (JSON Web Key) via the directory API `GET https://hub.zaikio.com/api/v1/jwt_public_keys`
2. (optionally) Depending on the library used, transform the JWKs into public certificates `.pem` (since some libraries require this format)
3. Decode the payload and verify validity of the JWT with a JWT library

:::: tabs

::: tab JavaScript

```js
// npm install jwk-to-pem jsonwebtoken axios
// https://github.com/auth0/node-jsonwebtoken

import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import axios from 'axios';

function verifyJWT(token, pems) {
  const pem = pems.shift();

  try {
    return jwt.verify(token, pem);
  } catch (e) {
    if (pems.length === 0) {
      throw e;
    } else {
      return verifyJWT(token, pems);
    }
  }
}

const SANDBOX_SERVER = 'https://hub.sandbox.zaikio.com/api/v1';

let pems;

async function validateJWT(jwt) {
  if (!jwk) { // you should cache the jwk
    const response = await axios.get(SANDBOX_SERVER + '/jwt_public_keys');
    pems = response.data.keys.map((jwk) => jwkToPem(jwk));
  }

  return verifyJWT(this.jwt, pems); // throws error if JWT is invalid
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
