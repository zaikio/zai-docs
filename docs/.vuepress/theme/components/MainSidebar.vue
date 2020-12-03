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
      <div class="app-box">
        <div
          v-if="currentApp.logo"
          class="app-box__logo"
          :style="`background-image:url(${currentApp.logo});`"
        ></div>
        <h3>{{ currentApp.title }}</h3>
      </div>
      <p v-if="currentApp.summary">
        <small>{{ currentApp.summary }}</small>
      </p>

      <SidebarLinks
        :depth="0"
        :sidebar-depth="0"
        :items="toItems(currentApp.guides)"
      />

      <h3>Reference</h3>
      <SidebarLinks
        :depth="0"
        :sidebar-depth="0"
        :items="
          Object.keys(currentApp.references).map(label => ({
            path: currentApp.references[label],
            title: label,
            type: 'group',
            children: []
          }))
        "
      />
    </div>

    <div v-if="!currentApp">
      <SidebarLinks
        :depth="0"
        :sidebar-depth="0"
        :items="[
          {
            path: '/',
            title: 'Home',
            type: 'group',
            children: []
          },
          {
            path: '/getting-started/',
            title: 'Getting started',
            type: 'group',
            children: []
          },
          {
            path: '/changelog/',
            title: 'Changelog',
            type: 'group',
            children: []
          },
          {
            path: '/guide/oauth/',
            title: 'OAuth',
            type: 'group',
            children: [
              {
                path: '/guide/oauth/redirect-flow',
                title: 'Redirect flow',
                children: []
              },
              {
                path: '/guide/oauth/device-flow',
                title: 'Device Flow',
                children: []
              },
              {
                path: '/guide/oauth/client-credentials',
                title: 'Client Credentials',
                children: []
              },
              {
                path: '/guide/oauth/access-token-refresh',
                title: 'Access token refresh',
                children: []
              },
              {
                path: '/guide/oauth/delegate-access',
                title: 'Delegate Access',
                children: []
              },
              {
                path: '/guide/oauth/scopes',
                title: 'Scopes',
                children: []
              }
            ]
          },
          {
            path: '/guide/try-api/',
            title: 'Try Zaikio APIs',
            type: 'group',
            children: []
          },
          {
            path: '/guide/loom/',
            title: 'Event Handling with Loom',
            type: 'group',
            children: [
              {
                path: '/guide/loom/receiving-events',
                title: 'Receiving events',
                children: []
              },
              {
                path: '/guide/loom/posting-events',
                title: 'Posting events',
                children: []
              }
            ]
          },
          {
            path: '/guide/provide-api/',
            title: 'Provide API and events',
            type: 'group',
            children: []
          },
          {
            path: '/guide/jwt/',
            title: 'JWT Validation',
            type: 'group',
            children: []
          },
          {
            path: '/guide/launchpad/',
            title: 'Launchpad',
            type: 'group',
            children: []
          },
          {
            path: '/guide/migrate-existing-customers/',
            title: 'Migrate an existing Customer Database',
            type: 'group',
            children: []
          }
        ]"
      />

      <h3>Apps</h3>
      <ul class="sidebar-links">
        <li v-for="item in apps">
          <RouterLink :to="item.home">{{ item.title }}</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { isActive } from "@vuepress/theme-default/util";
import SidebarGroup from "@vuepress/theme-default/components/SidebarGroup.vue";
import SidebarLinks from "@vuepress/theme-default/components/SidebarLinks.vue";
const context = require.context("../../apps", true, /\.json$/);
const cache = {};

function loadApps() {
  return context.keys().map(key => (cache[key] = context(key)));
}

export default {
  components: {
    SidebarGroup,
    SidebarLinks
  },
  data() {
    return {
      apps: loadApps(),
      currentApp: loadApps().find(item =>
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
      this.currentApp = loadApps().find(item =>
        this.$route.path.startsWith(item.path)
      );
    },

    toItems(obj) {
      return Object.keys(obj).map(label => ({
        path: obj[label].path,
        title: label,
        type: "group",
        children: this.toItems(obj[label].items || {})
      }));
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

.logo
  max-width: 100%

.home-link
  display: block
  margin-bottom: 4rem

.app-box
  display: flex
  margin-bottom: .5rem
  margin-top: 3rem
  align-items: center

  h3
    margin: 0

.app-box__logo
  width: 40px
  height: 40px
  background-size: cover
  background-repeat: no-repeat
  float: left
  flex-basis: 40px
  margin-right: 10px

.sidebar-group.depth-0 > a + .sidebar-links
  display: none

.sidebar-group.depth-0 > a.router-link-active + .sidebar-links
  display: block

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