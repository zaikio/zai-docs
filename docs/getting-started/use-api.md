---
sidebar: auto
---

# 3. Fetch data about person with the Zaikio Hub API

<div class="float-article">
  <div class="article-list__item article-list__item--box">
    <a href="https://github.com/crispymtn/zaikio-directory-ruby" target="_blank" class="link link--github u-margin-reg-bottom" style="margin-top: 0">
      crispymtn/zaikio-directory-ruby
    </a>
    <p class="u-small">
      Ruby API Client for Zaikio Hub
    </p>
    <div class="article-list__item__footer">
      <img src="../ruby.png" alt="Ruby" style="width:30px" />
    </div>
  </div>
</div>

With the Zaikio access token you obtained in the previous step, we can now get more information about the users, as we have passed the scope `zaikio.person.r` and the permission was granted.

<div class="u-clearfix"></div>

::: tip
See details in API specification: [GET `https://hub.sandbox.zaikio.com/api/v1/person.json`](/api/directory/directory.html#/Person/getPerson)
:::

To authenticate against the Zaikio Hub API the `Authorization` header must be set.

An example call to this endpoint might look like this (where `749ceefd1f7909a1773501e0bc57d5b2` is the access token from the previous step):

```
curl --request GET \
     --url https://hub.sandbox.zaikio.com/api/v1/person \
     --header 'Authorization: Bearer 749ceefd1f7909a1773501e0bc57d5b2'
```

:::: tabs

::: tab Node.js

Using [axios](https://github.com/axios/axios)

```js
app.get("/", async (req, res) => {
  // const access_token = fetch from the session
  axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
  res.render("pages/index", {
    currentUser: (
      await axios.get(process.env.ZAIKIO_HUB_HOST + "/api/v1/person.json")
    ).data,
  });
});
```
:::

::::


<div style="text-align:right;margin-top: 30px;">

[Continue to install app for organizations ➞](./organisation-install.html)

</div>
