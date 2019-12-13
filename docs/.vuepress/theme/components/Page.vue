<template>
  <main class="page">
    <slot name="top" />

    <ChangelogEntry v-if="data.changelog" />
    <Content class="theme-default-content" v-if="!data.changelog" />
    <PageEdit />
    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@vuepress/theme-default/components/PageEdit.vue'
import PageNav from '@vuepress/theme-default/components/PageNav.vue'
import ChangelogEntry from '../components/ChangelogEntry.vue'
export default {
  components: { PageEdit, PageNav, ChangelogEntry },
  props: ['sidebarItems'],
  computed: {
    data () {
      return this.$page.frontmatter
    }
  }
}
</script>
