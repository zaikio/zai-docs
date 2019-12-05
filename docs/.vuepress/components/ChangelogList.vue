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
            const isCorrectType = item.frontmatter.type === this.type;
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
      <h2>Filtered by {{ selectedTags.join(",") }}</h2>
      <button type="button" @click="resetTags" class="btn clear-filter-btn">
        Clear filter
      </button>
    </div>
    <ul class="blog-list">
      <li v-for="(item, index) in filteredList" class="blog-list__item">
        <Changelog
          v-show="index < 20"
          :item="item"
        />
        <ul v-for="tag in item.frontmatter.components" class="blog-list__tags">
          <li>
            <button @click="addTag(tag)">{{ tag }}</button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.blog-list {
  padding: 0;
  margin: 0;
}

.blog-list__item {
  list-style-type: none;
}

.blog-list__tags {
  margin-bottom: 15px;
}

.button--pagination {
  background-color: #32c8cf;
  border-radius: 4px;
  color: #fff;
  font-size: 0.8rem;
  padding: 0.5rem 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
  box-shadow: 0 0;
  transition: background-color 0.2s ease-in, color 0.2s ease-in;
}

.button--pagination:hover {
  background-color: #fff;
  border: 1px solid #32c8cf;
  border-radius: 4px;
  color: #32c8cf;
}

.clear-filter-btn {
  align-self: center;
  margin-left: 20px;
}

.filtered-heading {
  display: flex;
}

.pagination {
  text-align: center;
}
</style>
