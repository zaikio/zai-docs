---
title: "Country code and currency for all organization and person responses"
date: 2020-02-03 08:00:00
type: post
changelog: true
components:
    - Zaikio Hub API
change_types:
    - New
description: >
  From now on, all responses from organisations and persons will contain a `country_code` and a `currency` attribute, the currency attribute being derived from the country code. The attributes can be `null` if the country was not provided by the organisation or person.<br><br>
  Further Reading: [Zaikio Hub API Reference](/api/directory/)
---
