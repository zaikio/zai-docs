# Private Apps

[[toc]]

## Introduction

Creating a private App is an easy process, and has a really nice advantage for people who are building an App that might not have a
user interface - they are automatically installed into your Organisation when created. When building an internal integration, it's
good to think of the App as a kind of container to access your data that gives you more controls and more flexibility.
![create a private app](./create-private-app.png)
When you create a new App, simply select the "Private app" option in the dropdown. This will set the App's visibility to private,
preventing it appearing in the App store, and automatically install the App within your Organisation.

## Setup

### Connecting other Organisations

It's possible to share your private App with other Organisations - in order to do this, two conditions must be met.

1. The Organisation must have their visibility set to be discoverable (this can be done in the Organisation settings page, example below)

![setting visibility](./organisation-discovery.png)

2. The App must invite them to join.

![start connecting a private app](./private-app-connect-empty.png)
![select an organisation](./private-app-connect-selected.png)
![connected to private app](./private-app-connect-result.png)

## Comments

Other than those two details, there is nothing special to know about a private App, it supports all of the same concepts as public Apps
do, and you can follow the descriptions of those concepts on the [public App page](./public-apps.html#setup).
