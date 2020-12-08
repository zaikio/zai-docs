---
pageClass: landing-page
---

<div class="u-flex u-flex-align-center u-margin-big-bottom">
  <div class="u-col-8 u-lead">
    Welcome to the Zaikio developer documentation. You'll find comprehensive guides and documentation to help you start working with Zaikio as quickly as possible, as well as support if you get stuck. Let's jump right in!
  </div>
  <div class="u-col-4 u-right">
    <RouterLink to="/getting-started/" class="btn btn--cta">Getting started →</RouterLink>
  </div>
</div>

<h2 class="u-no-border">Read our guides</h2>

<div class="article-list">
  <div class="article-list__item">
    <RouterLink to="/guide/oauth/"><img src="./preview_sso.png" /></RouterLink>
    <h3>Single Sign-On</h3>
    <p>Learn how to create a Zaikio account and a Zaikio app. Sign in users with Zaikio. Install an app for an organization.</p>
    <div class="article-list__item__footer"><RouterLink to="/guide/oauth/" class="link">Explore Single Sign-On →</RouterLink></div>
  </div>
  <div class="article-list__item">
    <RouterLink to="/guide/try-api"><img src="./preview_try_api.png" /></RouterLink>
    <h3>Test API requests interactively</h3>
    <p>Learn how to create a private access token and how to interactively use Zaikio’s API documentations to test.</p>
    <div class="article-list__item__footer"><RouterLink to="/guide/try-api" class="link">Explore Zaikio API requests →</RouterLink></div>
  </div>
  <div class="article-list__item">
    <RouterLink to="/guide/migrate-existing-customers/"><img src="./preview_migration.png" /></RouterLink>
    <h3>Migrate existing customers</h3>
    <p>Iteratively migrate your current user database and organisations to Zaikio.</p>
    <div class="article-list__item__footer"><RouterLink to="/guide/migrate-existing-customers/" class="link">Explore migration →</RouterLink></div>
  </div>
</div>

<div class="u-margin-big-bottom"><RouterLink to="/guide/" class="btn">Explore all guides →</RouterLink></div>

<h2>Explore our apps</h2>

<AppList :only-logo="true" :limit="3" />

<div class="u-margin-super-huge-bottom"><RouterLink to="/apps/" class="btn">Explore all apps →</RouterLink></div>

<h2>Try our demo apps</h2>

<div class="article-list">
  <div class="article-list__item article-list__item--box">
    <div>Node.js</div>
    <h3>Redirect Flow & Organisation installation</h3>
    <div class="article-list__item__footer">
      <a href="https://github.com/crispymtn/zai-demo-node" target="_blank" class="link link--github">crispymtn/zai-demo-node</a>
      <a href="https://node-demonstrator.zaikio.com/" target="_blank" class="link link--demo">node-demonstrator.zaikio.com</a>
    </div>
  </div>
  <div class="article-list__item article-list__item--box">
    <div>Javascript / Webpack</div>
    <h3>Redirect Flow SPA</h3>
    <div class="article-list__item__footer">
      <a href="https://github.com/crispymtn/zai-demo-app-javascript" target="_blank" class="link link--github">crispymtn/zai-demo-app-javascript</a>
      <a href="https://redirect-flow-demonstrator.zaikio.com/" target="_blank" class="link link--demo">redirect-flow-demonstrator.zaikio.com</a>
    </div>
  </div>
  <div class="article-list__item article-list__item--box">
    <div>Javascript / Webpack</div>
    <h3>Device Flow</h3>
    <div class="article-list__item__footer">
      <a href="https://github.com/crispymtn/zai-device-flow-demo" target="_blank" class="link link--github">crispymtn/zai-device-flow-demo</a>
      <a href="https://device-flow-demonstrator.zaikio.com/" target="_blank" class="link link--demo">device-flow-demonstrator.zaikio.com</a>
    </div>
  </div>
</div>

<h1 class="u-huge">Need help? Get in touch!</h1>

<div class="u-flex u-margin-big-bottom">
  <div class="u-col-8">
    <p class="u-lead u-margin-super-huge-bottom">If you ever need help, please feel free to contact us and join our Slack Zaikio community to stay up to date.</p>
    <a href="https://join.slack.com/t/zaikio-community/shared_invite/zt-g01gvvg2-lk0TcIzkhdtu~xIvRZ5xCw" target="_blank" class="link link--img u-margin-huge-bottom">
      <img src="./slack.png" />
      Join our Slack Community Workspace
    </a>
    <a onclick="Intercom('showNewMessage');" style="cursor:pointer" class="link link--img">
      <img src="./intercom.png" />
      Send us a direct message
    </a>
  </div>
  <div class="u-col-4">
    <img src="./help.png" />
  </div>
</div>



<br /><br />
<p style="color:#6B6C6E;">Copyright © 2020 Zaikio GmbH</p>
