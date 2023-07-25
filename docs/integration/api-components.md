# Components of the API

Different types of applications will need to leverage different parts of the API in order to achieve their goals. A simple example is that an Imposing tool will not need to be aware of how to create Orders, or log shop floor data, but will need to know everything about the Job specification.

This document offers some thoughts as to the segments of the API that should be of interest to developers working on different kinds of products.

## Core Package

All Apps should be connected to the core features below. Very few apps do not need to make use of both of these,
and even then we're sure that being able to respond to events could create a more compelling user experience!
Finally, the core of the Zaikio data platform is the [Job](/api/mission_control/guides/api-topics/job/). This
concept is _thing which will be printed_ and thus forms the basis of everything that happens in
pre-print, printing and post-print phases.

| Element | Description | Link |
| --- | --- | --- |
| Authentication & Authorization | Required for all Apps to make requests | [details](/guides/oauth) |
| Events | Apps should react to changes in data and respond | [details](/guides/loom) |
| Jobs | Apps need to understand the concept of the print Job | [details](/api/mission_control/guides/api-topics/job/) |

Once the basics have been covered, it's worth looking at the kinds of things you wish to achieve.

## Topics

| Concept | Description | Scopes | Link |
| --- | --- | --- | --- |
| Estimation | Providing ideas for how expensive a Job would be to produce and how to produce it | `mission_control.estimates.rw` | [details](/api/mission_control/guides/api-topics/estimation) |
| Orders | Metadata about the transaction that one or more jobs might belong to. | `mission_control.orders.rw` | [details](/api/mission_control/guides/api-topics/business) |
| Sites, People, Machines | All of the people and assets that are part of a Printer | `zaikio.platform.rw` | [details](/api/directory/platform.html) |
