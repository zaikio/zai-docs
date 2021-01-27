---
title: "Links for nested SKUs on OrderLineItems will return null if the SKU has been deleted"
date: 2021-01-27 12:00:00
type: post
changelog: true
components:
    - Procurement API
change_types:
    - Update
description: >
    All endpoints that retrieve OrderLineItems with nested SKU data, will now return ``null`` for the ``links`` attribute of the SKU if the SKU has been deleted. The following endpoints are affected:<br><br>
    - `GET /orders`<br>
    - `POST /orders`<br>
    - `GET /orders/{order_id}`<br>
    - `PATCH /orders/{order_id}`<br>
    - `GET /orders/{order_id}/order_line_items`<br>
    - `POST /orders/{order_id}/order_line_items`<br>
    - `GET /order_line_items/{order_line_item_id}`<br>
    - `PATCH /order_line_items/{order_line_item_id}`<br>
---
