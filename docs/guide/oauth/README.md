# OAuth

Your app cannot access data through our REST API of a Zaikio organization or person without the organization's admin or person having granted access. Here we show you how the installation and authorization process works in Zaikio. For further details please refer to the [OAuth 2.0 specification](https://tools.ietf.org/html/rfc6749).

## Introduction

There are several ways to connect to an app. Here we will show you one of the standard flows, but we will also discuss other alternatives.

The most important thing to understand is that we distinguish between two types of authorization. The first type is **authorization with a single person** in Zaikio and the second is **authorization to an organization** in Zaikio. Access to an organization can ONLY be granted by administrators of that organization. This means that both ways typically coexist in one app. Most operations are done as an organization but the Single Sign On is usually done with one person.

The default way to install an app in Zaikio is via the Zaikio connectivity hub (if necessary with prior subscription). Usually the administrator of an organization will first install this app and grant it the requested permissions. Then the app can be accessed by all people in the organisation via the [launchpad](/guide/launchpad/) and each person can then, depending on the app, transfer further permissions for their data to the app. It is important to note that the person must never have direct access to an access token of the organization. If they do, they could perform unauthorized actions on behalf of the organization.

The app is allowed to freely design the actions that the individual person may perform in the app. We offer a [list of roles](/api/directory/#/Roles/get_roles) (among others we distinguish between Admin and Member) that can be used to perform authorization within the app. Of course, the app can also create its own roles and access rights and have them distributed by the organization administrator, for example.

An app in Zaikio can not only request permissions for the Zaikio app, but also request data from other apps in Zaikio. We recommend to increase connectivity by offering as many integrations with different apps as possible. In this guide we will mainly focus on connecting to the Zaikio platform.


## Terminology

- **API**: Zaikio's REST API or Zaikio apps that offer a REST API.
- **Bearer**: We distinguish between two types of bearers: `Organization` and `Person`. For the default Authentication flow you will most likely use a `Person` bearer.
- **User**: A `Person` that is giving access.
- **OAuth Client**: A Zaikio app that wants to access data of an organisation or person.

## Zaikio App Installation Flow

![Default Zaikio Organization Flow](./zaikio_organization_authorization_flow.png)

Coming soon

See also: [The Redirect Flow](./redirect-flow.html)

## Refreshing tokens

Coming soon

See also: [Access Token Refresh](./access-token-refresh.html)

## Other Flows

Currently the following OAuth flows are supported:

- [The Device Flow](./device-flow.html)
- [Client Credentials Flow](./client-credentials.html)
- [Delegating Access to Subsystems](./delegate-access.html)

## Further Reading

- [Make your first request to the Zaikio directory API with postman](#coming-soon)
- [Connect with other Zaikio apps and use their API](#coming-soon)
- [Receiving Zaikio events with webhooks](#coming-soon)
