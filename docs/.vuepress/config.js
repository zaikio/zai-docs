const path = require("path");
const fs = require("fs");

const externalApisNav = require("./externalApisNav.json");

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
    repo: "crispymtn/zai-docs",
    repoLabel: "Contribute",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    logo: "/connect_print_logo.png",
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
            text: "OAuth",
            link: "/guide/oauth/"
          },
          {
            text: "Launchpad",
            link: "/guide/launchpad/"
          },
          {
            text: "Event Handling with Loom",
            link: "/guide/loom/"
          },
          {
            text: "JWT Validation",
            link: "/guide/jwt/"
          }
        ]
      },
      {
        text: "Changelog",
        link: "/changelog/"
      },
      {
        text: "API Reference",
        items: externalApisNav.concat([
          {
            text: "OAuth",
            items: [
              {
                text: "API Reference",
                link: "/api/oauth/"
              }
            ]
          }
        ])
      },
      {
        text: "Directory",
        link: "https://directory.heidelberg.cloud/"
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
