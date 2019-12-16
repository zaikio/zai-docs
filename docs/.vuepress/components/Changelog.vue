<script>
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

export default {
  name: "Changelog",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    formatPublishDate() {
      const dateFormat = new Date(this.item.frontmatter.date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };

      return dateFormat.toLocaleDateString("en-US", options);
    },

    htmlContent() {
      return md.render(this.item.frontmatter.description);
    }
  }
};
</script>

<template>
  <section class="changelog">
    <div class="changelog__left">
      <div class="changelog__components">
        <span v-for="(component, index) in item.frontmatter.components" :key="index" :class="['changelog__component', 'changelog__component--' + component.replace(/\s+/g, '-').toLowerCase()]">
          {{ component }}
        </span>
      </div>
      <time class="changelog__date">{{ formatPublishDate }}</time>
    </div>
    <div class="changelog__right">
      <h3 class="changelog__title">{{ item.frontmatter.title }}</h3>
      <div class="changelog__types">
        <span v-for="(type, index) in item.frontmatter.change_types" :key="index" :class="['changelog__type', 'changelog__type--' + type.replace(/\s+/g, '-').toLowerCase()]">
          {{ type }}
        </span>
      </div>
      <div v-if="item.frontmatter.description" v-html="htmlContent"></div>
    </div>
  </section>
</template>

<style scoped>
.changelog {
  display: flex;
}

.changelog__left {
  margin-right: 40px;
  width: 20%;
}

.changelog__right {
  flex-grow: 1;
  width: 80%;
}

.changelog__components {
  margin-bottom: 15px;
}

.changelog__component {
  text-transform: uppercase;
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 15px;
  border: 1px solid #9eadbc;
  background-color: #edf2f7;
  border-radius: 20px;
  margin-right: 5px;
}

.changelog__component--directory-api {
  border-color: #9eadbc;
  background-color: #eaf7f1;
  color: #36c987;
}

.changelog__date {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
}

.changelog__title {
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 28px;
}

.changelog__types {
  margin-bottom: 15px;
}

.changelog__type {
  text-transform: uppercase;
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  font-size: 15px;
  margin-right: 10px;
}

.changelog__type--new {
  color: #2caa49;
}

.changelog__type--update {
  color: #45a8ad;
}

.changelog__type--fix {
  color: #89ce29;
}

.changelog__type--action-required {
  color: #bc1c1c;
}

.changelog__type--deprecation {
  color: #db8c2b;
}
</style>
