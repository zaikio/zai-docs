---
sidebar: auto
---

# Providing APIs and events guide

If you have already successfully connected people or organizations to your app through Zaikio, learn how to share your API with other participants in the Zaikio ecosystem. We recommend that you offer as many features as possible in your API and use the Zaikio JSON Web Token. If you already have an existing API, you can extend it to include the Zaikio Authorization.

If you have a Rails application or want to know how to implement the following steps, we recommend you take a look at our [Ruby Gem: Zaikio JWTAuth](https://github.com/crispymtn/zaikio-jwt_auth).


## Step 1: Provide OAuth Scopes

A scope is about whether you can make the API call at all. The role is to refine and filter the data that is send through. Therefore it is necessary to consider carefully what scopes your API offers. As deleting scopes is not allowed due to API backwards compatibility, we recommend to always start with as few scopes as possible and to refine the scopes as soon as there are more users of the API. At the same time the Zaikio user should not give more access to a third party app than it really needs. So it is an important task to design scopes in a meaningful way.

### Kinds of scopes

We distinguish three types of scopes: read only, write only and read and write. A read access should ideally always be a `GET` request. Whereby `POST`, `PATCH` and `DELETE` can also be used for a write access. For special `DELETE` requests it can make sense to hide them behind an extra scope.

### Bearer of scopes

There can also be different bearers for scopes. We distinguish between the types `Person` and `Organization`. A scope can also be allowed for both types of bearers, if this makes sense for the API.

### Technical names for scopes

We recommend always naming Scopes after the resource or resource top level class. We have a list of good and bad examples here:

<div style="display:flex">
  <div style="width:50%;margin-right:25px;">

#### Good scope names

<ul>
<li><code>catalog</code></li>
<li><code>sites</code></li>
<li><code>products</code></li>
</ul>

  </div>
  <div style="width:50%;margin-left:25px;">

#### Bad scope names

<ul>
<li><code>manage_catalog</code> - Verbs should be avoided, as this is already part of the kind of scope.</li>
<li><code>my_app_resources</code> - Scopes are always in the context of your app, even if a resource in another app has the same name, that's fine. </li>
</ul>

  </div>
</div>

### Creating OAuth Scopes in Zaikio

To offer OAuth Scopes, they must be created in Zaikio. Other apps can later select them as desired OAuth Scopes.

Go to `My Apps` to your App and click on `Provided OAuth Scopes`. Click on `Add new OAuth Scope` and enter the data of your scope.

In addition to the technical data, which have already been explained, a title and a description are also requested. The description is optional and should be used if the title otherwise becomes too long and complicated. This meta data can also be changed later.

Here are examples of well described scopes:

#### Good scope descriptions

- A bigger scope that covers multiple resources.
  - Scope: `catalog`, `read_only`, `Organization` bearer
  - Title: Read catalog
  - Description: Read catalog data such as articles, variants and SKUs.
- A small scope, use only a title
  - Scope: `sites`, `read_write`, `Organization` bearer
  - Title: Read, create and update sites


## Step 2: Validating OAuth Scopes and JWT in your API

Once you have created relevant OAuth Scopes, other Apps can use them to authorize API access. Besides the scopes you have to check the validity of the JSON web token first. To do this, you must check the signature and make sure that the JWT has not expired. How you can do this is already described in our [JWT Guide](/guide/jwt/). In many programming languages there are already libraries that do this check for you.

In order to test your API, it is recommended that you create a Private Access Token in Zaikio and provide it with the necessary scopes of your app.

In the payload of the JWT you find the scope attribute, which returns an array of all granted scopes.

This array could look like this and consist of multiple apps:

```
["my_app.catalog.rw", "my_app.sites.r", "directory.organization.r"]
```

If the scope expected in your endpoint is not available, you should return a Forbidden 403 and a meaningful error message.

## Step 3: Implement the revocation of JWTs

You should already have successfully validated the JWT and checked the scopes. Even if the JWTs expire at some point, an access token may be revoked before. This must be reflected in your API to prevent unauthorized access.

Therefore a list of revoked Access Token IDs (JTIs) should be stored, for example in a database like Redis. You only need to keep Access Tokens in this list that have not expired.

To let you know immediately when an access token has been revoked, we provide the `directory.revoked_access_token` event. The `access_token_id` is returned in the payload of this event. More information about this Loom Event, you can get in the [Directory Events Reference](/api/directory/events.html#directory-revoked-access-token). If you want to know how to receive Loom Events via a Webhook, read our [Loom Receive Event Guide](/guide/loom/receiving-events.html).

If you restart your app or your memory has been cleared, there is also the possibility to retrieve all revoked Access Tokens that have not yet expired via the Zaikio API. To retrieve this list make a `GET /api/v1/blacklisted_access_tokens` request. This endpoint is public. For more details see our [Directory API Reference](/api/directory/#/Blacklisted%20Access%20Tokens/get_blacklisted_access_tokens).

The different checks are already part of our [Ruby Gem Zaikio JWTAuth](https://github.com/crispymtn/zaikio-jwt_auth).

## Step 4: Provide Loom events

Similar to the OAuth Scopes, you must also create the events you provide in Zaikio. Other apps can then subscribe to your event.

Go to `My Apps` to your App and click on `Provided Events`. Click on `Add new Event` and enter the data of your event.

You must also specify a bearer child (`Person` or `Organization`) and a technical name. In addition, a title, a description and an example payload. The name should usually contain a subject and be followed by a verb in the past tense, for example `product_created` or `connection_established`.

You can read how to post events in our [Loom Guide about Posting Events](/guide/loom/posting-events.html#best-practices).

## Step 5: Write an API reference with OpenAPI 3.0

> The OpenAPI Specification (OAS) defines a standard, programming language-agnostic interface description for REST APIs, which allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic. When properly defined via OpenAPI, a consumer can understand and interact with the remote service with a minimal amount of implementation logic. Similar to what interface descriptions have done for lower-level programming, the OpenAPI Specification removes guesswork in calling a service.

[OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification)

To make it as convenient as possible for our developer community to consume different APIs, we always write an [OpenAPI 3 specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md) for our APIs and recommend it to any third party vendor. We also recommend to deal with the different [tooling around OAS](https://openapi.tools/), so that it remains easy to maintain the specification.

If you have a finished specification and your API is available (beta mode is sufficient here), you can also publish your specification in the Zaikio Developer Hub. Follow these steps:

### 1. Check that your specification is valid

Swagger offers a validation tool that we also use internally. You can check that your specification is valid by visiting `http://validator.swagger.io/validator/debug?url={YOUR_URL}` or if you have a file by posting to:

```
curl -X POST -d @my_open_api_spec.json -H 'Content-Type:application/json' http://validator.swagger.io/validator/debug
```

For more details have a look at the [swagger validation badge](https://github.com/swagger-api/validator-badge) project.

### 2. Create a `/docs` folder and move your specification there

Each API should also provide a docs folder. For example `https://mydomain.com/docs` or also `https://mydomain.com/my-api/docs`.

Within this `/docs` folder you should now put your specification. It doesn't matter if it is a YAML or JSON file. For example: `https://mydomain.com/docs/my-api.yml`. It is important that these files are publicly readable.

### 3. Create a `manifest.json`

Create a file called `manifest.json` in your `/docs` folder and put it there what your API is called and where the specification can be found.

The contents of this file must look like this:

```json
{
  "title": "My App",
  "specs": {
    "API Reference": "/docs/my-api.yml"
  }
}
```

### 4. Send us the specification

As soon as you have made these files available on your server, please let us know. We will then roughly check again that everything is correct and add the specification to the Zaikio Developer Hub.

All you need to do is to contact us via intercom, for example (bottom right).

You can see here for example how the manifest of the directory looks like:

[https://directory.zaikio.com/docs/manifest.json](https://directory.zaikio.com/docs/manifest.json)

## Step 6: Write additional guides with Markdown

Besides the specification as explained in the previous chapter, you can also provide guides in addition to your API specification, which will appear here in the Zaikio Developer Hub. To do this, the guides must be written in markdown.

Here you find an example how such a file can look like: [https://directory.zaikio.com/docs/events.md](https://directory.zaikio.com/docs/events.md)

The markdown files must then also be placed in the `/docs` folder and can then be added to `manifest.json`:

```json
{
  "title": "My App",
  "specs": {
    "API Reference": "/docs/my-api.yml",
    "My Guide": "/docs/my-guide.md"
  }
}
```
