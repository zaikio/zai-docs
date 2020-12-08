<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div style="display:none">
      <div class="sidebar-mask" @click="toggleSidebar(false)" />

      <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
        <template #top>
          <slot name="sidebar-top" />
        </template>
        <template #bottom>
          <slot name="sidebar-bottom" />
        </template>
      </Sidebar>
    </div>

    <MainSidebar />

    <div class="zaikio-wrapper">
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

      <div :class="`zaikio-content ${sidebarItems.length > 0 && 'zaikio-content--inner-sidebar'}`">
        <Home v-if="$page.frontmatter.home" />

        <Page v-else :sidebar-items="sidebarItems">
          <template #top>
            <slot name="page-top" />
          </template>
          <template #bottom>
            <slot name="page-bottom" />
          </template>
        </Page>

        <Sidebar v-if="!$page.frontmatter.home" :items="sidebarItems" @toggle-sidebar="toggleSidebar">+
          <template #top>
            <slot name="sidebar-top" />
          </template>
          <template #bottom>
            <slot name="sidebar-bottom" />
          </template>
        </Sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "@vuepress/theme-default/components/Home.vue";
import Navbar from "../components/Navbar.vue";
import Page from "../components/Page.vue";
import MainSidebar from "../components/MainSidebar.vue";
import Sidebar from "@vuepress/theme-default/components/Sidebar.vue";
import { resolveSidebarItems } from "@vuepress/theme-default/util";

export default {
  name: "Layout",

  components: {
    Home,
    Page,
    Sidebar,
    Navbar,
    MainSidebar
  },

  data() {
    return {
      isSidebarOpen: false
    };
  },

  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      );
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar
        },
        userPageClass
      ];
    }
  },

  mounted() {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    }
  }
};
</script>

<style lang="stylus">
.theme-container
  display: flex
  height: 100vh

.zaikio-wrapper
  flex-grow: 1
  display: flex
  flex-direction: column
  height: 100vh

.zaikio-content
  flex-grow: 1
  margin-left: 300px

  .page
    padding: 0
    padding-top: $navbarHeight

  .theme-default-content
    max-width: 900px
    padding-top: 0

.zaikio-content--inner-sidebar
  .page
    max-width: 980px
    padding-right: "%s" % $sidebarWidth
    margin: 0 auto

  .sidebar
    position: fixed
    right: "max(0\px, calc((100vw - 300px) / 2 - (%s / 2) - 490px))" % $sidebarWidth
    left: auto
    top "calc(1px + %s)" % $navbarHeight
    border-left: 1px solid $borderColor
    background-color: transparent

  .theme-default-content
    margin: 0

.landing-page
  .zaikio-content
    .theme-default-content
      max-width: 980px


</style>
