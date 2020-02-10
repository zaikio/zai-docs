---
title: "New: sites read OAuth Scope"
date: 2020-02-10 07:00:00
type: post
changelog: true
components:
    - Directory API
change_types:
    - New
    - Update
description: >
  The directory now offers a new OAuth Scope called `directory.sites.r` which can only read information from the sites.<br><br>
  A new endpoint has also been added to return information of a single page (`/api/v1/sites/{site_id}`).<br><br>
  Also, addresses can now be retrieved for each site if they have been added.<br><br>
  Furthermore, the `site_id` is now also returned for the machines, if a site has been assigned to the machine.<br><br>
  Further Reading: [Directory API Reference](/api/directory/)
---
