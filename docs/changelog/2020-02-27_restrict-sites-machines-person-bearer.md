---
title: "Person Bearer: Restrictions on sites and machines"
date: 2020-02-27 08:00:00
type: post
changelog: true
components:
    - Directory API
change_types:
    - Action required
    - Update
description: >
  If you use an Access Token with Person Bearer, it is no longer possible to perform every action for security reasons. If the bearer is a normal member of an organization (not an admin) then it is no longer possible:<br><br>
  - `POST /machines​/{machine_id}​/machine_ownership`<br>
  - `POST /sites`<br>
  - `PATCH /sites/{site_id}`<br>
  <br>
  If these requests now fail a 403 Forbidden is returned. Every other endpoint works as before. If an admin is the bearer, there is no change.
---
