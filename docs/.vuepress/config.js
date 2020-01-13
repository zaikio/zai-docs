const path = require("path");
const fs = require("fs");

module.exports = {
  title: "Developer Hub",
  dest: "dist",
  description: `
    Welcome to the Connect Print Directory developer hub. You'll find
    comprehensive guides and documentation to help you start working with
    Connect Print Directory as quickly as possible, as well as support if
    you get stuck. Let's jump right in!
  `,
  themeConfig: {
    logo: "/connect_print_logo.png",
    nav: [
      {
        text: "Home",
        link: "/"
      },
      {
        text: "Guides",
        items: [
          {
            text: "Single Sign On & OAuth",
            link: "/guide/oauth/"
          },
          {
            text: "Event Handling with Loom",
            link: "/guide/loom/"
          }
        ]
      },
      {
        text: "Changelog",
        link: "/changelog/"
      },
      {
        text: "API Reference",
        items: [
          {
            text: "Directory API",
            link: "/api/directory/v1/"
          },
          {
            text: "Loom API",
            link: "/api/loom/v1/"
          },
          {
            text: "OAuth API",
            link: "/api/oauth/"
          }
        ]
      },
      {
        text: "Directory",
        link: "https://directory.heidelberg.cloud/"
      }
    ],
    sidebar: {
      "/guide/oauth/": [
        "redirect-flow",
        "device-flow",
        "client-credentials",
        "access-token-refresh",
        "delegate-access",
        "scopes",
        "jwt"
      ],
      "/guide/loom/": ["posting-events", "receiving-events"]
    }
  },
  plugins: [
    "vuepress-plugin-element-tabs",
    [
      "feed",
      {
        canonical_base: "https://docs.zaikio.com",
        feed_options: {
          title: "Connect Print Changelog",
          description: "Developer changelog and scheduled changes of Connect Print",
          copyright: "Crispy Mountain GmbH",
          language: "en"
        },
        sort: entries =>
          entries.sort(
            (a, b) =>
              new Date(a.frontmatter.date) - new Date(b.frontmatter.date)
          )
      }
    ]
  ],
  head: [
    ["link", { rel: "icon", href: "/favicon.png" }],
    [
      "script",
      {},
      fs.readFileSync(path.join(__dirname, "./intercom-snippet.js"), "utf8")
    ]
  ],
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      // mutate the config for client
      config.node.global = true;
      config.node.process = "mock";
      config.module.rules.push({
        test: /\.ya?ml$/,
        loader: "js-yaml-loader"
      });
    }
  }
};
