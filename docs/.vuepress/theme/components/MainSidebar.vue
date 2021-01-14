<template>
  <div class="zaikio-sidebar">
    <RouterLink :to="$localePath" class="home-link-logo">
      <img
        v-if="$site.themeConfig.logo"
        class="logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      />
    </RouterLink>

    <div v-if="currentApp">
      <RouterLink to="/">← Home</RouterLink>
      <div class="app-section">
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
      </div>

      <SidebarLinks
        :depth="0"
        :sidebar-depth="0"
        :items="toItems(currentApp.guides)"
      />

      <div class="app-references">
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
    </div>

    <div v-if="!currentApp">
      <RouterLink :to="$localePath" class="home-link">
        Home
      </RouterLink>

      <div class="guide-links">
        <SidebarLinks
          :depth="0"
          :sidebar-depth="0"
          :items="[
            {
              path: '/getting-started/',
              title: 'Getting started',
              type: 'group',
              children: [
                {
                  path: '/getting-started/create-app.html',
                  title: '1. Setup Zaikio App',
                  type: 'group',
                  children: []
                },
                {
                  path: '/getting-started/sso-person.html',
                  title: '2. SSO with Zaikio account',
                  type: 'group',
                  children: []
                },
                {
                  path: '/getting-started/use-api.html',
                  title: '3. Fetch data with API',
                  type: 'group',
                  children: []
                },
                {
                  path: '/getting-started/organisation-install.html',
                  title: '4. Install app for organisations',
                  type: 'group',
                  children: []
                }
              ]
            },
            {
              path: '/changelog/',
              title: 'Changelog',
              type: 'group',
              children: []
            },
            {
              title: 'Guides',
              path: '/guide/',
              type: 'group',
              children: [
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
                  path: '/guide/api-rate-limits',
                  title: 'API Rate Limits',
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
              ]
            }
          ]"
        />
      </div>

      <h3>Zaikio Apps</h3>
      <ul class="sidebar-links app-list">
        <li v-for="item in apps">
          <div class="depth-0">
            <RouterLink :to="item.home">
              <div
                v-if="item.logo"
                class="link-app-logo"
                :style="`background-image:url(${item.logo});`"
              ></div>
              <div v-if="!item.logo" class="link-app-logo"></div>
              <div class="link-app-text">{{ item.title }}</div>
            </RouterLink>
          </div>
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
  padding: 2rem
  position: fixed
  overflow-y: auto
  background-color: $greySidebarBg
  color: $white

  .logo
    max-width: 100%

  a
    color: #40f1a4

  .home-link-logo
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
    min-width: 40px
    height: 40px
    background-size: cover
    background-repeat: no-repeat
    float: left
    flex-basis: 40px
    margin-right: 20px
    border-radius: 6px

  .sidebar-group.depth-0 > a + .sidebar-links
    display: none

    li
      margin: 8px 0
      padding: 0
    a
      display: block
      color: lighten($textColor, 60%)
      border: none
      border-radius: 6px

      &:hover
        color: $white

  .sidebar-group.depth-0 > a.router-link-active + .sidebar-links
  //.sidebar-group.depth-0 > a.open + .sidebar-links
    display: block

  .app-list.sidebar-links
    .link-app-logo
      height: 40px
      width: 40px
      background-size: cover
      background-color: #ccc
      border-radius: 6px
      min-width: 40px
      flex-basis: 40px
      margin-right: 20px

    li:nth-of-type(4n - 3) .depth-0 > a
      .link-app-logo
        background-color: #E2B3FF

    li:nth-of-type(4n - 2) .depth-0 > a
      .link-app-logo
        background-color: #B3C4FF

    li:nth-of-type(4n - 1) .depth-0 > a
      .link-app-logo
        background-color: #FFE380

    li:nth-of-type(4n - 0) .depth-0 > a
      .link-app-logo
        background-color: #FFBD99

    li .depth-0 > a
      display: flex
      align-items: center
      padding-left: 0
      padding-right: 0

  .app-section
    margin-bottom: 40px

    p
      line-height: 1.5

  .app-references
    margin-top: 40px

    .sidebar-links li .depth-0 > a
      display: block
      background-image: url(./book_inactive.svg)
      background-repeat: no-repeat
      background-position: 12px center
      padding: 4px 12px 4px 48px
      color: lighten($textColor, 60%)
      background-size: 20px
      border-radius: 6px
      line-height: 1.7

      &:hover
        background-image: url(./book_hover.svg)
        color: #fff

      &.active
        background-image: url(./book_active.svg)
        color: $textColor
        background-color: $accentColorLight


  .home-link
    display: block
    margin-bottom: 40px
    background-image: url(./home_inactive.svg)
    background-repeat: no-repeat
    background-position: 12px calc(50% - 1px)
    padding: 4px 12px 4px 48px
    color: lighten($textColor, 60%)
    background-size: 20px
    border-radius: 6px
    line-height: 1.7

    &:hover
      background-image: url(./home_hover.svg)
      color: #fff

    &.router-link-exact-active
      background-image: url(./home_active.svg)
      color: $textColor
      background-color: $accentColorLight

  .guide-links
    margin-bottom: 40px

  .sidebar-links
    list-style: none
    margin: 0
    padding: 0

    li
      margin: 0 0 8px 0
      padding: 0

      .depth-0
        > a
          font-size: 1em
          display: block
          color: lighten($textColor, 60%)
          border: none
          border-radius: 6px
          padding: 4px 12px
          font-weight: 600

          &:hover
            color: $accentColor

          &.router-link-exact-active,
          &.router-link-active.open,
          &.active
            color: $textColor !important
            background-color: $accentColorLight

      .is-sub-group
        > a
          &.router-link-exact-active,
          &.router-link-active,
          &.active
            color: $white
            font-weight: 600

      .sidebar-group-items
        > li > a
          &.router-link-exact-active,
          &.router-link-active,
          &.active
            color: $white
            font-weight: 600
</style>
