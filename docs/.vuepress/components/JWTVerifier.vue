<template>
  <div class="jwt-verifier">
    <label>Environment:</label>
    <select v-model="server">
      <option value="sandbox">Sandbox https://directory.sandbox.zaikio.com/api/v1/</option>
      <option value="production">Production https://directory.zaikio.com/api/v1/</option>
    </select>
    <textarea
      v-model="jwt"
      placeholder="Paste Encoded JWT here"
    ></textarea>
    <button v-on:click="verify">Validate &amp; Decode</button>
    <div class="clearfix"></div>
    <label>Decoded Payload:</label>
    <pre class="language-json">{{ response }}</pre>
    <label>Validity Check:</label>
    <pre class="language-json">{{ validityResponse }}</pre>
  </div>
</template>

<script>
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const API_URLS = {
  sandbox: 'https://directory.sandbox.zaikio.com/api/v1',
  production: 'https://directory.zaikio.com/api/v1'
}

export default {
  props: [],
  name: "JWTVerifier",
  data: function() {
    return {
      jwt: '',
      server: 'sandbox',
      response: '{}',
      validityResponse: ''
    };
  },
  methods: {
    verify: async function(evt) {
      try {
        if (!this.jwt || this.jwt === '') {
          alert('Please provide a JWT!');
          return;
        }

        this.validityResponse = '';
        const response = await axios.get(API_URLS[this.server] + '/jwt_public_keys');
        const jwk = response.data.keys[0];
        const pem = jwkToPem(jwk);
        const decoded = jwt.decode(this.jwt);
        this.response = JSON.stringify(decoded, null, 2);
        const valid = jwt.verify(this.jwt, pem);
        this.validityResponse = 'VALID';
      } catch(e) {
        this.validityResponse = JSON.stringify(e, null, 2);
      }
    }
  }
};
</script>
