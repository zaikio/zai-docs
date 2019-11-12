const path = require('path');

module.exports = {
  title: 'Connect Print | Developer Hub',
  dest: 'dist',
  extraWatchFiles: [
    '.vuepress/public/api_specs/*.yaml'
  ],
  description: `
    Welcome to the Connect Print Directory developer hub. You'll find
    comprehensive guides and documentation to help you start working with
    Connect Print Directory as quickly as possible, as well as support if
    you get stuck. Let's jump right in!
  `,
  themeConfig: {
    nav: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Guides',
        items: [
          {
            text: 'Single Sign On & OAuth',
            link: '/guide/oauth/'
          }
        ]
      },
      {
        text: 'API Reference',
        items: [
          {
            text: 'Directory API',
            link: '/api/directory/v1/'
          }
        ]
      }
    ],
    sidebar: {
      '/guide/oauth/': [
        'redirect-flow',
        'device-flow',
        'access-token-refresh'
      ]
    }
  },
  plugins: [
    'vuepress-plugin-element-tabs'
  ],
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      // mutate the config for client
      config.node.global = true
      config.node.process = 'mock'
      config.module.rules.push({
        test: /\.ya?ml$/,
        loader: 'js-yaml-loader'
      })
    }
  }
}
