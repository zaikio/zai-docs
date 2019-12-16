# hc-docs

Visit the docs here: [docs.zaiku.cloud](https://docs.zaiku.cloud/)

Developer Hub based on [Vuepress](https://vuepress.vuejs.org/) and [swagger-ui](https://swagger.io/tools/swagger-ui/).

## Getting started

```
$ npm install
$ npm run serve
```

Open [http://localhost:8080](http://localhost:8080)

### Building static site

```
$ npm run build
```

## Contributing

### Guides

All guides are written in Markdown. In addition some of [Vuepress' Markdown Extensions](https://vuepress.vuejs.org/guide/markdown.html) and
the [Tabs Markdown Extension](https://github.com/superbiger/vuepress-plugin-tabs) can be used. Checkout our existing docs in `docs/guide` to get some inspiration.

### API Reference

For API References we use [OpenAPI 3.0](https://github.com/OAI/OpenAPI-Specification) and [swagger-ui](https://swagger.io/tools/swagger-ui/). If you want to
modify or add a new reference have a look at `docs/api`.

### Navigation Links

If you want to change the navigation links, please modify `docs/.vuepress/config.js` in `themeConfig.nav`. In addition to that you can also
setup a sidebar for you guide by either adding it to `docs/.vuepress/config.js` or via `sidebar: 'auto'` (see [Vuepress frontmatter](https://vuepress.vuejs.org/guide/frontmatter.html#predefined-variables)).

### Changelog and scheduled changes

In the `docs/changelog` folder you will find recent changes and schedules ones. You can copy one of the existing changelogs to see it in action.
Each changelog can have a list of `components` (usually the APIs they refer to) and `change_types` (like `New`, `Action Required`, `Updated`, `Deprecation`).
We automatically resolve changelogs from the future into the scheduled changes.

It is recommended to add a changelog item if you want to promote a feature or if you want to introduce breaking changes.

### Advanced

There are many features coming with Vuepress. If the markdown options is not enough, you can also add custom Vue Components.
Please have a look to the [Vuepress Documentation](https://vuepress.vuejs.org/) for more details.


## Deployment

The deployment is automatically triggered in heroku with every push to `master`.
