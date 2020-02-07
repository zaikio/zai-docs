# Getting Started

With Zaikio you can create great solutions for all participants in the printing industry: printers, press manufacturers and suppliers. We offer you a large ecosystem where you can focus on making your solution perfect.

# Building an app

The integration with the Zaikio platform can be done in different ways. Depending on the requirements of your app, different approaches are possible. First of all you have to decide which type of app is right for you. We distinguish between **public** and **private** apps.

## Types of Zaikio Apps

<div style="display:flex">
  <div style="width:50%;margin-right:50px;">

### Public apps (recommended)

<ul>
<li>Different organisations and persons can connect</li>
<li>Must go through Zaikio's app approval process</li>
<li>Can be listed in Zaikio's connectivity hub and can receive payments/subscriptions</li>
<li>Can be accessed through the Zaikio launchpad</li>
<li>Manage authentication with <strong>OAuth 2.0</strong></li>
<li>Can consume APIs and events of other published apps</li>
<li>Can offer APIs and events to other Zaikio apps</li>
</ul>

  </div>
  <div style="width:50%;">

### Private apps

<ul>
<li>Only invited organisations and its members can connect</li>
<li>Don't go through Zaikio's app approval process</li>
<li>Can't be listed in Zaikio's connectivity hub</li>
<li>Can be accessed through the Zaikio launchpad</li>
<li>Manage authentication with <strong>OAuth 2.0</strong></li>
<li>Can consume APIs and events of other published apps</li>
<li>Can offer APIs and events to other Zaikio apps</li>
</ul>

  </div>
</div>

In order to use the different Zaikio APIs, it is also possible to issue a _private access token_ in the Organisation Admin.

## Environments

**We recommend you create all your apps in our [sandbox](https://directory.sandbox.zaikio.com) first.** Only if you want to make your app available to real organisations, you should actually create the app in our production environment.

## Create app in the Zaikio platform

To be able to manage apps you must first create an organisation in [Zaikio sandbox](https://directory.sandbox.zaikio.com) and be an admin in that organisation. We recommend that you use _Software Vendor_ as your organisation category.

Go then in the context of your organisation to `Dashboard` > `App Developer Programme` and accept our terms and conditions.

Afterwards you can access `My Apps` in the sidebar and click on `Create new app`. You can leave the `Entry point url` and `Webhook url` empty for the beginning. You can change them later.

Your app is created as a draft and is not visible to others. We recommend that you create important meta data such as logo, screenshots and texts for your app before publishing it.

### Single Sign On with OAuth

- [OAuth guide](/guide/oauth/)
- [Launchpad guide: add a general navigation component to your app](/guide/launchpad/)


### Consuming Zaikio-APIs

- [Make your first request to the directory API with postman](#coming-soon)
- [Receiving Zaikio events with webhooks](#coming-soon)

### OAuth Scopes & Provided Events

If you have already successfully connected to Zaikio and would like to give other apps access to your API and events, please read our guides.

- [Providing APIs and events guide](#coming-soon)
