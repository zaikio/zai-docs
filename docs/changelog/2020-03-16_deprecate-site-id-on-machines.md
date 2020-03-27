---
title: "DEPRECATED: site_id in machines"
date: 2020-03-16 08:00:00
type: post
changelog: true
components:
    - Directory API
change_types:
    - Action required
    - Update
description: >
  The site is now part of machine ownership and should therefore be set together via `machines/{machine_id}/ownership`. That is why we now also offer a PATCH `machines/{machine_id}/ownership` so that the site ID can be changed.<br><br>

  We will allow the site to be set in the machine until April 6, 2020. After that, setting the site will only be possible in the ownership.

  <br><br>
  Further Reading: [Directory API Reference `POST /machines/{machine_id}/ownership`](/api/directory/#/Machines/post_machines__machine_id__machine_ownership)
---
