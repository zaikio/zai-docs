---
sidebar: auto
---

# Migrate an existing customer database

If you want to integrate Zaikio into an existing application, you need to ask yourself how to map people and organizations securely and distinctively in your application.

It depends strongly on your user organization model how you implement a mapping. However, we recommend that you map organizations or accounts to Zaikio organizations.

In the following guide, we assume that your app, similar to Zaikio, has organizations that can include several people. If each organization has only one authentication account, you will need to adapt the guide for your setup.

## Step 1: Add a Zaikio UUID to your database table

The first thing you need to do is to save in your app which account or organization belongs to the Zaikio organization. You can create a column in your database for this purpose. The same is needed for the persons table.

## Step 2: Claim Zaikio Person Accounts

To ensure that users of your App can be securely and unambiguously linked to a Zaikio person, the person must be authorised for both your App and Zaikio.

This can be achieved by generating a unique and non-guessable token for the person, which ideally expires at some point, similar to a password reset token.

This token needs to be attached as the `state` parameter when using the [Zaikio Redirect OAuth Flow](/guide/oauth/redirect-flow.html).

The first request that is made would look similar to this:

```
GET https://hub.zaikio.com/oauth/authorize?client_id={YOUR_CLIEND_ID}&scope=directory.person.r&redirect_uri={YOUR_REDIRECT_URL}&state={SECURE_TOKEN_FOR_CURRENT_PERSON}
```

If the person is now redirected back to the `YOUR_REDIRECT_URL`, they have created a Zaikio account or logged in with an existing one. It is also possible to prefill the person's data in this request, if he/she registers newly. [Read our detailed API Reference](/api/oauth/oauth.html#/OAuth/get_authorize).

When redirecting back to your app, the passed `state` parameter will be sent back by zaikio. It will contain the token that you passed initially as `SECURE_TOKEN_FOR_CURRENT_PERSON`. With this you can see who the person is in your app. After you have created the access token as described in the [Redirect Flow Guide](/guide/oauth/redirect-flow.html), you will also see the Zaikio UUID of the person you can now insert the mapping into your database (in `response.body.bearer.id`).

Please be aware that this token/OAuth Redirect should only be visible to authorized persons. For example after they have logged in using the current authentication or via e-mail. Otherwise, an unauthorized person could claim the account.

As long as only the right person can see the secret token and it is not guessable, this procedure is very secure. The wrong person can therefore not claim a wrong account.

This procedure also allows the user to use an account with, for example, another e-mail or details that differ from your app. This is very important if there is already an account.


## Step 3: Claim Zaikio Organizations

Claiming of organizations works in the same way as described in step 2.

Here you only have to consider who should do the claiming, usually the owner of the organization should do it. In the above request the scope must be replaced by `Org.directory.organization.r`.

We recommend that only persons who have already migrated can claim organizations. This ensures that at least the owner has the correct access.

Therefore it makes sense to offer the claiming only after the migration of persons. For the user this can happen seamlessly. For example, you could send him/her directly back to the redirect flow after the person account has been successfully claimed.

## Further notes

After the accounts have been successfully mapped with Zaikio, you should allow your users to also use the normal Zaikio SSO. You can offer this immediately, even if not all accounts have been mapped yet. If people log in via Zaikio who do not have an account, you must either create one or inform them that no account has been mapped.

From a certain point on you should also force your users to use the new Zaikio account. To do this, you can, for example, deactivate your current authentication method and send the claim URL by email.

If an organization has been successfully claimed, you should also use the Zaikio Membership and its roles. This means that if a person is a member of a mapped Zaikio organization, you should be able to derive the access rights in your app from the roles in Zaikio. You could even delete all memberships in your app if the organization was successfully claimed.
