---
sidebar: auto
---

# Try Zaikio API

If you want a quick start to the Zaikio API, you can follow this guide.

## Step 1: Generate Private Access Token

To easily test the API, you can generate Private Access Tokens. These have the same structure as access tokens generated via Client Credentials Flow or Redirect Flow.

Access Tokens are issued either to a person or to an organization. Depending on your use case, one or the other may make sense. In our [API reference](/api/directory) we define all Scopes and their Bearer Type. In this example we use a person token.

Log into the [zaikio sandbox](https://directory.sandbox.zaikio.com) and select `Private Access Tokens` in the navigation. Then click on `Generate new Access Token`:

<img src="./step1.png" alt="Step 1" style="border: 1px solid #adadad;" />

Select the scopes you want to share and generate the token. The generated access token will then be displayed once. The Access Token has to be treated as protected passwords.

<img src="./step2.png" alt="Step 2" style="border: 1px solid #adadad;" />

If you want to know what structure the JSON Web Token has, you can use our interactive [JWT Verifier](/guide/jwt/).

## Step2: Use token in API Reference

Since our [API reference](/api/directory/directory.html) is interactive, you can transfer the access token there. The access token is not stored.

### Choose the right environment

If you use the access token for testing purposes, it probably makes sense to select the sandbox environment:

<img src="./step3.png" alt="Step 3" style="border: 1px solid #adadad;" />

### Enter Access Token

Click on `Authorize` in the upper right corner with the lock icon.

In the opening modal insert your access token under bearerAuth:

<img src="./step4.png" alt="Step 4" style="border: 1px solid #adadad;" />

Then click on `Authorize` and `Close`.

### Try out an endpoint

Then open the endpoint you would like to test. Which endpoints you can now test is indicated by the black, closed lock icon.

Then click on the `Try out` button on the left. Specify the parameters, if there are any.

Then click on `Execute`.

<img src="./step5.png" alt="Step 5" style="border: 1px solid #adadad;" />

Now you see on the right side the response to your request and the call in CURL. You can now easily test API requests this way.
