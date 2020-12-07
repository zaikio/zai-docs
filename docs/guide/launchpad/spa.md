# Integrate into a single page application

If your App is non-confidential you can use this tutorial to integrate the launchpad:

1. Add `<script src="https://launchpad.zaikio.com/launchpad.js"></script>` to your HTML to load the launchpad script.

2. After this code you can initialise the launchpads like this:

```js
if (window.zaiLaunchpad) {
  const directoryAccessToken = "eyJraWQiOiJhNmE1MzF..."; // Access Token that has the scope directory.person.r

  window.zaiLaunchpad.setup({
    loadPersonData: () => {
      return fetch(
        'https://hub.sandbox.zaikio.com/api/v1/person.json',
        {
          headers: {
            "Authorization" : `Bearer ${directoryAccessToken}`
          }
        }
      ).then(response => response.json());
    },
    directoryHost: 'https://hub.sandbox.zaikio.com', // optional host, you can specify the sandbox for your test environment
    activeOrganizationId: activeOrganizationId, // The currently active organization or null if the user is selected
    activeAppName: 'your_app_name', // The currently active app, so the name of your app
    onSelectOrganization: organization => {
      if (organization) {
        // your code
      } else {
        // Person was selected
        // your code
      }
    },
    helpMenu: [
      {
        label: 'Ask us a question',
        onClick: () => {
          // custom JS behavior
        },
      },
      {
        divider: true,
      },
      {
        label: 'Developer Hub',
        url: 'https://docs.zaikio.com/',
      },
    ]
  });
}
```
