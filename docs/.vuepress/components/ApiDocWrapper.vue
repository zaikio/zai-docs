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
        const urlParts = window.location.href.split('/')
        urlParts.pop()

        // config: https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md
        const ui = SwaggerUI({
          spec,
          domNode,
          oauth2RedirectUrl: '/oauth2-redirect.html',
          withCredentials: true,
          docExpansion: 'list',
          deepLinking: true,
          requestInterceptor: (request) => {
            // Otherwise we run into CORS errors
            // https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
            request.credentials = 'omit';
            return request;
          }
        });

        ui.initOAuth({
          usePkceWithAuthorizationCodeGrant: true
        })
      });
    }
  }
</script>
