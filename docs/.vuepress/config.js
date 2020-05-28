const path = require("path");
const fs = require("fs");

const externalApisNav = require("./externalApisNav.json");

module.exports = {
  title: "Zaikio Developer Hub",
  dest: "dist",
  description: `
    Welcome to the Zaikio developer hub. You'll find
    comprehensive guides and documentation to help you start working with
    Zaikio as quickly as possible, as well as support if
    you get stuck. Let's jump right in!
  `,
  themeConfig: {
    repo: "crispymtn/zai-docs",
    repoLabel: "Contribute",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    logo: "/zai_developer_hub.svg",
    sidebar: {
      "/guide/oauth/": [
        "/guide/oauth/",
        {
          title: "OAuth in detail",
          collapsable: false,
          children: [
            "redirect-flow",
            "device-flow",
            "client-credentials",
            "access-token-refresh",
            "delegate-access",
            "scopes"
          ]
        }
      ],
      "/guide/loom/": ["posting-events", "receiving-events"],
      "/guide/launchpad/": ["default-integration", "spa", "custom-switch"]
    },
    nav: [
      {
        text: "Getting Started",
        link: "/getting-started/"
      },
      {
        text: "Guides",
        items: [
          {
            text: "General Guides",
            items: [
              {
                text: "OAuth",
                link: "/guide/oauth/"
              },
              {
                text: "Try Zaikio API",
                link: "/guide/try-api/"
              },
              {
                text: "Event Handling with Loom",
                link: "/guide/loom/"
              },
              {
                text: "Provide API and events",
                link: "/guide/provide-api/"
              },
              {
                text: "JWT Validation",
                link: "/guide/jwt/"
              },
              {
                text: "Launchpad",
                link: "/guide/launchpad/"
              }
            ]
          },
          {
            text: "Use Cases",
            items: [
              {
                text: "Migrate an existing Customer Database",
                link: "/guide/migrate-existing-customers/"
              }
            ]
          }

        ]
      },
      {
        text: "Changelog",
        link: "/changelog/"
      },
      {
        text: "API Reference",
        items: externalApisNav
      },
      {
        text: "Zaikio Hub",
        link: "https://directory.zaikio.com/"
      }
    ]
  },
  plugins: [
    "vuepress-plugin-element-tabs",
    [
      "feed",
      {
        canonical_base: "https://docs.zaikio.com",
        feed_options: {
          title: "Zaikio Changelog",
          description: "Developer changelog and scheduled changes of Zaikio",
          copyright: "Zaikio GmbH",
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
    ],
    [
      "script",
      {},
      fs.readFileSync(path.join(__dirname, "./fathom-snippet.js"), "utf8")
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
