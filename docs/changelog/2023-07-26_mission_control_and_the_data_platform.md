---
title: "[IMPORTANT] Mission Control and Data Platform split"
date: 2023-06-26 08:00:00
type: post
changelog: true
components:
    - Mission Control
    - Data Platform
change_types:
    - Action required
    - Update
description: >
  As we've learned more about how we think about the world of print data, we've decided to split what used to be known as
  "Mission Control" into two concepts. "Mission Control" will specialise as an App on the Zaikio platform that offers an
  industry leading set of List-based functionality, advanced production planning tools and a great shop floor data collection
  experience.

  Now for the fun bit.

  We're delighted to promote our modeling of the print ecosystem to the heart of our product offering. As we've spoken to our
  Partner Community, we've understood that print job data isn't part of what we do, it's the very core of what we do. We're
  moving the majority of the former "Mission Control" API into the "Zaikio" namespace to better reflect its importance to us
  as the essence of our business.

  All Zaikio Organizations will now automatically have access to the data platform, and in time this will be charged on a metered
  per-Job basis with packages available at common usage bands. More details on this will follow in future, and there will be
  a free tier.

  The good news is that there are no immediate changes to the data model, and we'll operate a long crossover period to make
  switching simple.

  TLDR;

  - No immediate changes needed
  - No changes in the data model
  - All non-List API endpoints are available at their new home:
    - sandbox: `https://data.sandbox.zaikio.com`
    - live: `https://data.zaikio.com`
  - All `mission_control.*` OAuth scopes are now also available as `zaikio.*` scopes
  - All `mission_control.*` events are also available as `zaikio.*` events
  - All existing endpoints, scopes and events will run for the next months to allow for graceful migrations
  - List based activities continue to use the existing `mission_control` endpoints, scopes and events

  ### What do I need to do?

  #### OAuth Scopes

  All former _mission_control.*_ scopes are now available as _zaikio.*_ scopes. The existing scopes will still work without
  any changes. We would request that over time you look to migrate to the new scopes, but we will advertise our hard deadlines for
  this in future.

  #### Events

  All former _mission_control.*_ events are now available as _zaikio.*_ events. We are sending both versions of the event for now
  but in time we will migrate remaining subscriptions to the new `zaikio` namespace. Again, we will advertise this transition date
  well before it happens

  #### URLs

  Please start using the new `data.` URLs to access our API. We will shortly be upgrading the infrastructure that our data platform
  runs on, but the performance advantages will require you to migrate to the new URL... In time, we will switch off the old ones, and
  again this will be publicised well in advance. How's that for a carrot-or-stick situation?

  Please reach out to our partner success team directly or on the community slack if you've got any questions or notice any strange
  behaviours. We run all of our own products on the platform and are confident this is stable, but we're standing by to support you all.
---
