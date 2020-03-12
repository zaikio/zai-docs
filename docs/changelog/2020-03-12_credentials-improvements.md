---
title: "OAuth Credentials: Name and description"
date: 2020-03-12 07:00:00
type: post
changelog: true
components:
    - Directory API
change_types:
    - New
    - Update
description: >
  From now on, a non-public description can be added when creating or modifying OAuth credentials.<br><br>
  In addition, a name with a maximum of 4 characters can optionally be added. This extends the audience (`aud`) of the JSON Web token. If the audience was `my_app` it can now also be `my_app/{credentials_name}` if a name is given. The name must be unique within your app. However, other apps may have the same name, so you need to check the app name as well.<br><br>
  If you want to test your JWT, try our [interactive JWT Verifier](/guide/jwt/).
---
