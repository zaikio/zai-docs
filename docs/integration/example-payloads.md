# Example Payloads

[[toc]]

## Introduction

These example payloads can be used to help you quickly get started sending Jobs to the Zaikio platform. We will look to expand these
with popular requests over time, so if there's something you'd like to see then please drop us a line on our
[Community Slack](https://join.slack.com/t/zaikio-community/shared_invite/zt-1zubd0xar-bxO0MjznmwOkCfVANN2j1g) and let us know what
you'd like to see.

## Create a Job

#### Details

```yml
url: https://data.sandbox.zaikio.com/api/v1/jobs
scopes:
- `zaikio.jobs.rw`
- `zaikio.jobs.w`
triggers_event:
- `zaikio.job_added`
```

#### Payload

```json
{
  "job": {
    "quantity": 2500,
    "name": "flyer",
    "due_at": "2024-09-20T12:00:00Z",
    "description": "",
    "kind": "flyer",
    "parts": [
      {
        "kind": "flyer",
        "colors": [
          {
            "surface": "front",
            "system": "CMYK",
            "print_standard": "FOGRA39",
            "name": "Cyan"
          },
          {
            "surface": "front",
            "system": "CMYK",
            "print_standard": "FOGRA39",
            "name": "Magenta"
          },
          {
            "surface": "front",
            "system": "CMYK",
            "print_standard": "FOGRA39",
            "name": "Yellow"
          },
          {
            "surface": "front",
            "system": "CMYK",
            "print_standard": "FOGRA39",
            "name": "Black"
          }
        ],
        "dimensions_unit": "mm",
        "dimensions": [297.6377952755906, 419.5275590551181],
        "layout": {
          "contents": [
            {
              "children": [],
              "kind": "page",
              "position": {
                "x": 0,
                "y": 0
              },
              "dimensions": {
                "width": 297.6377952755906,
                "height": 419.5275590551181
              },
              "bleeds": {
                "left": 5.669291338582677,
                "top": 5.669291338582677,
                "right": 5.669291338582677,
                "bottom": 5.669291338582677
              },
              "print_free_margins": {
                "left": 0,
                "top": 0,
                "right": 0,
                "bottom": 0
              },
              "sides": "one",
              "front": {
                "page_number": 0
              }
            }
          ],
          "format": "box",
          "version": "1",
          "unit": "mm"
        },
        "desired_substrate": {
          "category": "uncoated",
          "paper_weight": 135,
          "paper_weight_unit": "gsm",
          "grain": null,
          "coating": [false, false]
        }
      }
    ]
  }
}
```
