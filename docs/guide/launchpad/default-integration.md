# Integrate Launchpad

If your App is confidential you can use this tutorial to integrate the launchpad:

1. Add `<script src="https://launchpad.zaikio.com/launchpad.js"></script>` to your HTML to load the launchpad script.

2. After this code you can initialise the launchpads like this:

```js
if (window.zaiLaunchpad) {
  window.zaiLaunchpad.setup({
    loadPersonData: () {
      return fetch('/current_person.json').then(response => response.json());
    },
    directoryHost: 'https://directory.sandbox.zaikio.com', // optional host, you can specify the sandbox for your test environment
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

3. Add an endpoint to your app that is called `current_person.json` that returns the same data as `api/v1/person.json` (see [Directory API Specification](/api/directory/v1/)). This encapsulation is required so that the JSON Web token is not exposed.


:::: tabs

::: tab RubyOnRails

```rb
class CurrentPersonController < ApplicationController
  def show
    # Current.directory_jwt - Stored JSON Web token with directory.person.r scope

    uri = URI('https://directory.sandbox.zaikio.com/api/v1/person.json')
    request = Net::HTTP::Get.new(uri,
      'Content-Type' => 'application/json',
      'Authorization' => "Bearer #{Current.directory_jwt}"
    )

    response = Net::HTTP.start(uri.hostname, uri.port) do |http|
      http.request(request)
    end

    render plain: response.body
  end
end
```

:::

::::
