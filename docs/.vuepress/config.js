const path = require("path");
const fs = require("fs");

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
    logo: "/zai_developer_hub_white.svg",
    nav: [
      {
        text: "Zaikio Hub",
        link: "https://hub.zaikio.com/"
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
              new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
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
