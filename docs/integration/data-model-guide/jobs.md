# Data Model Guide: Job

[[toc]]

## Introduction

Job payloads can be extremely minimal, but with little data present there is little utility to be derived for
downstream apps to utilise. All participants should aim to provide as much data as they are capable of doing
to support other applications being able to participate fully in the ecosystem.

### Requirements

```yaml
url: https://data.sandbox.zaikio.com/api/v1/jobs
scopes:
- `zaikio.jobs.rw`
outcome_event:
- `zaikio.job_added`
```

::: tip Documentation format
To make commenting on the payload simple, we're providing these examples as JS code samples. This allows
things such as identifiers to be dynamically generated as well as comments being allowed. We are using `log`
as a helper function here, which is implemented as follows.

```js
const log = (data) => console.log(JSON.stringify(data, undefined, 2));
```

At simplest you can copy the above into a file with your chosen payload and then just run the file using:
`node my-file.js`
:::

## Minimal Payload

```js
log({
  job: {
    // The Job name should be readable and give context for what is being printed
    name: `My Business Card`,
    // The quantity or circulation of the Job that should be produced
    quantity: 10,
    // The kind of the Job, all options can be found in our guide linked below.
    kind: "business_card",
  },
});
```

## Adding a Part to a Job and expanding the model

::: tip
The types of parts that are available for each Job kind are available in our
[guide to job and part kinds](/api/data_platform/guides/resources/job-kinds-and-parts/)
:::

```js
log({
  job: {
    name: `My Business Card`,
    quantity: 10,
    kind: "business_card",
    // You can provide references for this job - these could be anything but we
    // advise keeping them human readable.
    references: ["Example/Reference1", "External/55"],
    // The state of the Job
    state: "draft",
    // When is the Job due to be completed
    due_date: new Date(2025, 12, 13, 12),
    // Here you can define the parts for the Job, a business card has a single part
    // which is the business card itself.
    parts: [{
      // A part must have a relevant kind
      kind: "business_card",
      // Dimensions are the closed, or finished dimensions of the part
      dimensions: { width: "88.9", height: "50.8" },
      // The unit that dimensions are given in
      dimensions_unit: "mm",
      // How many pages are present within a single print of this part
      pages: 1
    }]
  },
});
```

## Adding a Layout, substrate and colour information to a Part

::: tip
More information on layouts can be found at the [Layout reference guide](/api/data_platform/guides/resources/layout-engine/)
:::

```js
log({
  job: {
    name: `My Business Card`,
    quantity: 10,
    kind: "business_card",
    references: ["Example/Reference1", "External/55"],
    state: "draft",
    due_date: new Date(2025, 12, 13, 12),
    parts: [{
      kind: "business_card",
      dimensions: { width: "88.9", height: "50.8" },
      dimensions_unit: "mm",
      pages: 1,
      /*
      * Colour information can be provided in a simple array of colour definitions.
      * These are defined as closest-to-the-substrate to furthest-from-the-substrate
      * in case application sequence is important, such as in the case of offset printing
      */
      colors: ["Cyan", "Magenta", "Yellow", "Black"].map(colour => ({
        system: "CMYK",
        name: colour,
        coverage: 0.5,
        surface: "front"
      })),
      /*
      * Suggested substrate information can be provided here, although the final used
      * substrate will be setup through the production strategy for this Job.
      */
      desired_substrate: {
        paper_weight: 320,
        paper_weight_unit: "gsm",
        grain: "short",
        coated: [true, true]
      },
      /*
      * This is the key to providing a fully semantic model. Given a complete layout,
      * machines can be automatically configured providing a zero-intervention workflow
      * throughout the life of a Job.
      */
      layout: {
        // Currently only "box" layouts are supported, but "path" based layouts are in development
        format: "box",
        // Schema version to validate against, currently only `1`
        version: 1,
        // Units of measurements for this layout, applies to all measurements in the layout
        unit: "mm",
        // The contents of this layout
        contents: [{
          // Each box within a layout has a specific kind which defines the properties it
          // has, making it simple to understand its role in the Part.
          kind: "page",
          // The position this box has, relative to the bottom left point of its parent.
          position: { x: 0, y: 0},
          // The dimensions of the box, in the unit declared at the top level of the layout
          dimensions: { width: 88.9, height: 50.8 },
          // The bleeds of this page, which lie outside the dimensions of the box
          bleeds: { left: 5, top: 5, right: 5, bottom: 5 },
          // The print free margins of this page, which are inside the dimensions of the box
          print_free_margins: { left: 5, top: 5, right: 5, bottom: 5 }
        }]
      }
    }]
  },
});
```

## Adding Print Data files

```js
log({
  job: {
    name: `My Business Card`,
    quantity: 10,
    kind: "business_card",
    references: ["Example/Reference1", "External/55"],
    state: "draft",
    due_date: new Date(2025, 12, 13, 12),
    parts: [{
      kind: "business_card",
      dimensions: { width: "88.9", height: "50.8" },
      dimensions_unit: "mm",
      pages: 1,
      colors: ["Cyan", "Magenta", "Yellow", "Black"].map(colour => ({
        system: "CMYK",
        name: colour,
        coverage: 0.5,
        surface: "front"
      })),
      desired_substrate: {
        paper_weight: 320,
        paper_weight_unit: "gsm",
        grain: "short",
        coated: [true, true]
      },
      /*
      * File references are how artwork, paths and other file-based components are attached
      * to resources. You provide a url, mime type and file size. The URL could be a local
      * file on a network share, or available through a HTTP server, we don't mind, it's just
      * ideal to be able to accessible over the internet so connected apps can perform tasks
      * such as preflighting or imposing.
      *
      * Another approach is to use the Zaikio Vault storage service and we'll handle all the
      * heavy lifting for you, only requiring the IDs of the file and vault to be provided here.
      */
      file_references: [
        {
          kind: "artwork",
          mime_type: "application/pdf",
          url: "https://www.dropbox.com/scl/fi/alee5ik58onyi08af3h8n/sample-business-card.pdf?rlkey=ezfzqpp6t3bqn86guxq84ykwk&dl=1",
          size: 636000
        }
      ],
      layout: {
        format: "box",
        version: 1,
        unit: "mm",
        contents: [{
          kind: "page",
          position: { x: 0, y: 0},
          dimensions: { width: 88.9, height: 50.8 },
          bleeds: { left: 5, top: 5, right: 5, bottom: 5 },
          print_free_margins: { left: 5, top: 5, right: 5, bottom: 5 },
          /*
          * Declaring a front of the page box allows you to reference a given page within
          * the FileReference to be printed here.
          */
          front: { page_number: 1 },
          // This business card is only to be printed single-sided
          sides: "one"
        }]
      }
    }]
  },
});
```

## Adding Finishings

::: tip
You can manually assign IDs to items like finishings, so that you can reference
them in other parts of the same payload.
:::

```js
// Used later to tie the finishing into the layout.
const finishing_id = crypto.randomUUID();

log({
  job: {
    name: `My Business Card`,
    quantity: 10,
    kind: "business_card",
    references: ["Example/Reference1", "External/55"],
    state: "draft",
    due_date: new Date(2025, 12, 13, 12),
    parts: [{
      kind: "business_card",
      dimensions: { width: "88.9", height: "50.8" },
      dimensions_unit: "mm",
      pages: 1,
      colors: ["Cyan", "Magenta", "Yellow", "Black"].map(colour => ({
        system: "CMYK",
        name: colour,
        coverage: 0.5,
        surface: "front"
      })),
      desired_substrate: {
        paper_weight: 320,
        paper_weight_unit: "gsm",
        grain: "short",
        coated: [true, true]
      },
      file_references: [
        {
          kind: "artwork",
          mime_type: "application/pdf",
          url: "https://www.dropbox.com/scl/fi/alee5ik58onyi08af3h8n/sample-business-card.pdf?rlkey=ezfzqpp6t3bqn86guxq84ykwk&dl=1",
          size: 636000
        }
      ],
      /*
      * We can attach one or more finishings to a part covering anything from lamination to
      * hole drilling or beyond. Each type of finishing has a reach data model that explains
      * everything a finishing machine requires to know in order to be able to execute the
      * task required.
      *
      * If a finishing, such as hot foil lamination, requires a path or additional data
      * files to apply to the part, then the finishing supports a `file_references` array
      * with the same format as on the Part itself.
      */
      finishings: [
        {
          id: finishing_id,
          kind: "lamination",
          method: "varnish",
          color: "transparent",
          texture: "smooth"
          // file_references: [{ }]
        }
      ],
      layout: {
        format: "box",
        version: 1,
        unit: "mm",
        contents: [{
          kind: "page",
          position: { x: 0, y: 0},
          dimensions: { width: 88.9, height: 50.8 },
          bleeds: { left: 5, top: 5, right: 5, bottom: 5 },
          print_free_margins: { left: 5, top: 5, right: 5, bottom: 5 },
          front: { page_number: 1 },
          sides: "one",
          /*
          * This time the page object has a child object, which is a Finishing that
          * covers the same dimensions as the page itself. The position is set to (0, 0)
          * so we cover the whole of the page.
          *
          * This references `finishing_id` to point to the data we set above for the
          * lamination that we want on this business card.
          */
          children: [{
            kind: "finishing",
            finishing_id: finishing_id,
            dimensions: { width: 88.9, height: 50.8 },
            position: { x: 0, y: 0 }
          }]
        }]
      }
    }]
  },
});
```
