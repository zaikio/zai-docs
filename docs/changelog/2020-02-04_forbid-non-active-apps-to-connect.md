---
title: "Users can not connect to foreign and unreviewed Apps in production"
date: 2020-02-04 09:00:00
type: post
changelog: true
components:
    - Directory API
change_types:
    - Action required
    - Update
description: >
  It is no longer allowed for users to connect to any App in production environment. As the zaikio platform we have to make sure that all apps comply with our security standards and that malicious apps do not connect.<br><br>
  However, organizations and members can connect to self-created apps at any time (i.e. the vendor is the own organization). In addition, all apps can connect in the **sandbox environment**, since no sensitive data is stored there.<br><br>
  In order for your app to be available in production, you have to bring your app into the review process (this can be done on the detail page of your app). In order for us to activate the app, however, it should be usable (i.e. you provide a redirect flow and/or an API with appropriate documentation). For this purpose we will contact you.
---
