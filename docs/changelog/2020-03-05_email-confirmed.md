---
title: "API returns if email of person was confirmed"
date: 2020-03-05 07:00:00
type: post
changelog: true
components:
    - Zaikio Hub API
change_types:
    - New
    - Update
description: >
  We already return the email in our API. In addition, there is a new attribute `email_confirmed`, which indicates whether the user has confirmed the given email. No emails should be sent or the identity should be confirmed based on an email as long as this email has not also been confirmed.
---
