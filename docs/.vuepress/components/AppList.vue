<template>
  <div class="article-list">
    <div v-for="app in apps" class="article-list__item article-list__item--content-wrapped">
      <RouterLink :to="app.home" :class="`app-item-logo app-item-logo-${app.slug}`">
        <img v-if="app.logo" :src="app.logo" class="app-item-logo__logo" />
      </RouterLink>
      <h3>{{ app.title }}</h3>
      <p v-if="app.summary">{{ app.summary }}</p>
      <div class="article-list__item__footer">
        <div class="u-margin-reg-bottom" v-if="Object.keys(app.references).length > 0">
          <RouterLink :to="Object.values(app.references)[0]" class="link link--api-reference"
            >{{ Object.keys(app.references)[0] }} Reference</RouterLink
          >
        </div>
        <div>
          <RouterLink :to="app.home" class="link"
            >Read {{ app.title }} documentation →</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const context = require.context("../apps", true, /\.json$/);
const cache = {};

function loadApps() {
  return context.keys().reduce((h, key) => {
    return {
      ...h,
      [key.replace("./", "").replace(".json", "")]: (cache[key] = context(key))
    };
  }, {});
}

export default {
  name: "AppList",
  props: {
    limit: Number,
    onlyLogo: Boolean
  },
  data() {
    const allApps = loadApps();
    let apps = Object.keys(allApps).map(name => ({
      slug: name,
      ...allApps[name]
    }));
    if (this.onlyLogo) {
      apps = apps.filter(a => !!a.logo);
    }
    if (this.limit) {
      apps = apps.slice(0, this.limit);
    }
    return {
      apps
    };
  }
};
</script>
