---
title: Changes to Variant paper_weight_unit value
date: 2021-02-04 11:00:00
type: post
changelog: true
components:
    - Procurement Consumers API
    - Procurement Suppliers API
change_types:
    - Action required
    - Update
description: >
  We are going to change the Variant property `paper_weight_unit` on 2021-03-04:

  - `basis weight` will no longer be supported as a value
  - Any existing fields set as `grammage` will be converted to the equivalent metric unit `gsm`
  - `gsm` will be the only accepted value when creating or updating Variants from this date

  If you are creating or updating Variants now, please set `paper_weight_unit` to `gsm`
  and be prepared to handle this value in any API response which includes Variant
  information.
---
