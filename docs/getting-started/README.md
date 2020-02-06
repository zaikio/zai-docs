# Getting Started

With zaikio you can create great solutions for all participants in the printing industry: printers, press manufacturers and suppliers. We offer you a large ecosystem where you can focus on making your solution perfect.

# Building an app

The integration with the zaikio platform can be done in different ways. Depending on the requirements of your app, different approaches are possible. First of all you have to decide which type of app is right for you. We distinguish between **public** and **private** apps.

## Types of zaikio Apps

<div style="display:flex">
  <div style="width:50%;margin-right:50px;">

### Public apps (recommended)

<ul>
<li>Different organisations and persons can connect</li>
<li>Must go through zaikio's app approval process</li>
<li>Can be listed in zaikio's connectivity hub and can receive payments/subscriptions</li>
<li>Can be accessed through the zaikio launchpad</li>
<li>Manage authentication with <strong>OAuth 2.0</strong></li>
<li>Can use APIs and events of other published apps</li>
</ul>

  </div>
  <div style="width:50%;">

### Private apps

<ul>
<li>Exactly one organisation and its members can connect</li>
<li>Don't go through zaikio's app approval process</li>
<li>Can't be listed in zaikio's connectivity hub</li>
<li>Can be accessed through the zaikio launchpad</li>
<li>Manage authentication with <strong>OAuth 2.0</strong></li>
<li>Can use APIs and events of other published apps</li>
</ul>

  </div>
</div>

In order to use the different zaikio APIs, it is also possible to issue a *private access token* in the Organisation Admin.

## Environments

**We recommend you create all your apps in our [sandbox](https://directory.sandbox.zaikio.com) first.** Only if you want to make your app available to real organisations, you should actually create the app in our production environment.

## Create app in the zaikio platform

To be able to manage apps you must first create an organisation in [zaikio sandbox](https://directory.sandbox.zaikio.com) and be an admin in that organisation. We recommend that you use *Software Vendor* as your organisation category.

Go then in the context of your organisation to `Dashboard` > `App Developer Programme` and accept our terms and conditions.

Afterwards you can access `My Apps` in the sidebar and click on `Create new app`. You can leave the `Entry point url` and `Webhook url` empty for the beginning. You can change them later.

Your app is created as a draft and is not visible to others. We recommend that you create important meta data such as logo, screenshots and texts for your app before publishing it.

### SSO & OAuth

Coming soon

### OAuth Scopes & Provided Events

If you have already successfully connected to zaikio and would like to give other apps access to your API and events, please read our [Providing APIs and events Guides](#comming-soon).
