<template>
  <div class="zaikio-sidebar">
    <RouterLink :to="$localePath" class="home-link">
      <img
        v-if="$site.themeConfig.logo"
        class="logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      />
    </RouterLink>

    <div v-if="currentApp">
      <RouterLink to="/">← Home</RouterLink>
      <h3>{{ currentApp.text }}</h3>
      <ul class="sidebar-links">
        <li v-for="item in currentApp.items">
          <RouterLink :to="item.link">{{ item.text }}</RouterLink>
        </li>
      </ul>
    </div>

    <div v-if="!currentApp">
      <ul class="sidebar-links">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/getting-started/">Getting started</RouterLink></li>
        <li><RouterLink to="/changelog/">Changelog</RouterLink></li>
        <li><RouterLink to="/guide/oauth/">OAuth</RouterLink></li>
        <li><RouterLink to="/guide/try-api/">Try Zaikio APIs</RouterLink></li>
        <li><RouterLink to="/guide/loom/">Event Handling with Loom</RouterLink></li>
        <li><RouterLink to="/guide/provide-api/">Provide API and events</RouterLink></li>
        <li><RouterLink to="/guide/jwt/">JWT Validation</RouterLink></li>
        <li><RouterLink to="/guide/launchpad/">Launchpad</RouterLink></li>
        <li><RouterLink to="/guide/migrate-existing-customers/">Migrate an existing Customer Database</RouterLink></li>
      </ul>

      <h3>Apps</h3>
      <ul class="sidebar-links">
        <li v-for="item in externalApi">
          <RouterLink :to="item.items[0].link">{{ item.text }}</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { isActive } from "@vuepress/theme-default/util";
import externalApi from "../../externalApisNav.json";

export default {
  data() {
    return {
      externalApi,
      currentApp: externalApi.find(item =>
        this.$route.path.startsWith(item.path)
      )
    };
  },
  watch: {
    $route() {
      this.refresh();
    }
  },
  methods: {
    refresh() {
      this.currentApp = externalApi.find(item =>
        this.$route.path.startsWith(item.path)
      );
    }
  }
};
</script>

<style lang="stylus">
.zaikio-sidebar
  height: 100%
  flex-basis: 300px
  width: 300px
  border-right: 1px solid $borderColor
  box-sizing: border-box
  padding: 1rem
  position: fixed
  overflow-y: auto

  h3
    margin-bottom: .5rem
    margin-top: 3rem

.logo
  max-width: 100%

.home-link
  display: block
  margin-bottom: 4rem

.sidebar-links
  list-style: none
  margin: 0
  padding: 0

  li
    margin: 0
    padding: 0
    a
      color: lighten($textColor, 30%)

    a:hover
      color: $accentColor

    a.router-link-exact-active
      color: $textColor
      font-weight: bold
</style>
