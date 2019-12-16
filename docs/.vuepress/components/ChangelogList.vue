<script>
export default {
  name: "ChangelogList",
  props: {
    type: {
      type: String,
      default: "changelog"
    },
    pages: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      selectedTags: []
    };
  },
  computed: {
    filteredList() {
      if (this.pages) {
        return this.pages
          .filter(item => {
            const isChangelog = !!item.frontmatter.changelog;
            const isCorrectType = this.type === 'scheduled' ? new Date(item.frontmatter.date) > new Date() : new Date(item.frontmatter.date) <= new Date();
            // check for locales
            let isCurrentLocale = true;
            if (this.$site.locales) {
              const localePath = this.$route.path.split("/")[1] || "";
              isCurrentLocale = item.relativePath.startsWith(localePath);
            }
            // check if tags contain all of the selected tags
            const hasTags =
              !!item.frontmatter.components &&
              this.selectedTags.every(tag =>
                item.frontmatter.components.includes(tag)
              );

            if (
              !isChangelog ||
              !isCorrectType ||
              (this.selectedTags.length > 0 && !hasTags) ||
              !isCurrentLocale
            ) {
              return false;
            }

            return true;
          })
          .sort(
            (a, b) =>
              new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
          );
      }
    },
    tags() {
      return this.filteredList
        .map(item => item.frontmatter.components)
        .flat(1)
        .filter((tag, index, self) => self.indexOf(tag) === index);
    }
  },

  mounted() {},

  methods: {
    addTag(tag) {
      const tagExists = this.selectedTags.some(item => {
        return item === tag;
      });

      if (!tagExists) {
        this.selectedTags = this.selectedTags.concat(tag);
      }
    },
    removeTag(tag) {
      this.selectedTags.filter(t => t != tag);
    },
    resetTags() {
      this.selectedTags = [];
    }
  }
};
</script>

<template>
  <div>
    <div v-if="selectedTags.length > 0" class="filtered-heading">
      <h2>
        Filtered by: {{ selectedTags.join(",") }}
        <button
          type="button"
          @click="resetTags"
          class="blog-list__clear-filter"
        >
          Clear filter
        </button>
      </h2>
    </div>
    <ul class="blog-list">
      <li v-for="(item, index) in filteredList" class="blog-list__item">
        <Changelog v-show="index < 20" :item="item" />
        <hr />
      </li>
    </ul>

    <div class="blog-list__filter-by">
      Filter by:
      <span v-for="tag in tags">
        <button @click="addTag(tag)" class="blog-list__filter-by__button">
          {{ tag }}
        </button>
      </span>
    </div>
  </div>
</template>

<style scoped>
.blog-list {
  padding: 0;
  margin: 0;
}

.blog-list__item {
  list-style-type: none;
  margin-bottom: 60px;
}

.clear-filter-btn {
  align-self: center;
  margin-left: 20px;
}

.filtered-heading {
  margin-bottom: 30px;
}

.filtered-heading h2 {
  margin-top: 0px;
}

.blog-list__filter-by {
  font-size: 13px;
  color: #939aa0;
}

.blog-list__filter-by__button,
.blog-list__clear-filter {
  border: 0;
  background: transparent;
  padding: 5px;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 13px;
  line-height: 1.7;
  color: #767f87;
  outline: none;
}

.blog-list__filter-by__button:hover,
.blog-list__clear-filter:hover {
  text-decoration: underline;
}
</style>
