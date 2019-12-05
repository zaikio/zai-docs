<template>
  <ParentLayout>
    <template #page-top>
      <ChangelogHeader />
    </template>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import ChangelogHeader from './ChangelogHeader.vue'
export default {
  name: 'ChangelogLayout',
  components: {
    ParentLayout,
    ChangelogHeader
  }
}
</script>
