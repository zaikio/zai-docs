---
title: "BREAKING: /connections and /subscriptions"
date: 2021-02-01 11:00:00
type: post
changelog: true
components:
    - Zaikio Hub API
change_types:
    - Action required
    - Update
description: >
  The API endpoints `GET /connections` AND `GET /subscriptions` will introduce pagination.

  The reponse will include following Headers:

  - `Link` Links to previous and next pages, in the format described in [RFC 8288](https://tools.ietf.org/html/rfc8288) The relations `first`, `prev`, `next` and `last` can be present.

  - `Current-Page` The current page of the paginated response (starting at 1)

  - `Total-Count` The total number of items in this collection

  - `Total-Pages` The total number of pages for the current page size in this collection

  <br /><br />
  and following query parameters will be accepted:
  <br />

  - `page` The page of the current collection that shall be returned (starting at 1)

  - `per_page` The maximum number of items included in the response, ie., the page size (100 by default)

  <br /><br />
  Furthermore it is also possible to provide a filter on `GET /subscriptions`:

  - `filters[subscriber_id]` e.g. `Organization-d2e78ba7-5cfc-4359-9d8a-43ce0fa3a795`

  <br /><br />
  and on `GET /connections`:

  - `filters[connectable_id]` e.g. `Organization-d2e78ba7-5cfc-4359-9d8a-43ce0fa3a795`

  <br><br>
  Further Reading: [Zaikio Hub API Reference to be released](/changelog/hub_api_2020-01-25.json)
---
