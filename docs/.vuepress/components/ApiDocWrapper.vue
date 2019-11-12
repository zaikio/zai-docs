<template>
  <div id="api-doc-wrapper" :data-src="src"></div>
</template>

<script>
  import SwaggerUI from 'swagger-ui';
  import 'swagger-ui/dist/swagger-ui.css';

  export default {
    // relating to the attribute define in outer <router-view> tag.
    props: ['src'],
    name: 'ApiDocWrapper',
    data: function () {
      return {};
    },
    mounted: function () {
      this.$nextTick(function () {
        const domNode = document.getElementById('api-doc-wrapper');
        const spec = require('@source/' + domNode.dataset.src);
        // config: https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md
        SwaggerUI({
          spec,
          domNode
        });
      });
    }
  }
</script>
