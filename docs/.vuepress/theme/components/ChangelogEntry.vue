<template>
  <main class="home">
    <div class="changelog-wrapper">
      <Changelog :item="$page" />
    </div>

    <div class="footer">
      <router-link to="/changelog/">&lt; Back to Changelog</router-link>
    </div>
  </main>
</template>

<script>
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();
import Changelog from '../../components/Changelog.vue';

export default {
  props: [],
  name: 'ChangelogHeader',
  components: { Changelog },
  data: function () {
    return {};
  },
  computed: {
    data () {
      return this.$page.frontmatter
    },
    formatPublishDate() {
      const dateFormat = new Date(this.$page.frontmatter.date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };

      return dateFormat.toLocaleDateString("en-US", options);
    },
    htmlContent() {
      return md.render(this.$page.frontmatter.summary);
    }
  }
}
</script>
