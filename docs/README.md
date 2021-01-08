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
  <div class="article-list__item article-list__item--content-wrapped">
    <RouterLink to="/guide/oauth/"><img src="./preview_sso.png" /></RouterLink>
    <h3>Single Sign-On</h3>
    <p>Learn how to create a Zaikio account and a Zaikio app. Sign in users with Zaikio. Install an app for an organization.</p>
    <div class="article-list__item__footer"><RouterLink to="/guide/oauth/" class="link">Explore Single Sign-On →</RouterLink></div>
  </div>
  <div class="article-list__item article-list__item--content-wrapped">
    <RouterLink to="/guide/try-api"><img src="./preview_try_api.png" /></RouterLink>
    <h3>Test API requests interactively</h3>
    <p>Learn how to create a private access token and how to interactively use Zaikio’s API documentations to test.</p>
    <div class="article-list__item__footer"><RouterLink to="/guide/try-api" class="link">Explore Zaikio API requests →</RouterLink></div>
  </div>
  <div class="article-list__item article-list__item--content-wrapped">
    <RouterLink to="/guide/migrate-existing-customers/"><img src="./preview_migration.png" /></RouterLink>
    <h3>Migrate existing customers</h3>
    <p>Iteratively migrate your current user database and organisations to Zaikio.</p>
    <div class="article-list__item__footer"><RouterLink to="/guide/migrate-existing-customers/" class="link">Explore migration →</RouterLink></div>
  </div>
</div>

<div class="u-margin-huge-bottom"><RouterLink to="/guide/" class="btn">Explore all guides →</RouterLink></div>

<h2 class="u-no-border">Explore our apps</h2>

<AppList :only-logo="true" :limit="3" />

<div class="u-margin-super-huge-bottom"><RouterLink to="/apps/" class="btn">Explore all apps →</RouterLink></div>

<h2 class="u-no-border">Try our demo apps</h2>

<div class="article-list u-margin-super-huge-bottom">
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

<h2 class="u-no-border">Libraries</h2>

<div class="article-list u-margin-super-huge-bottom">
  <div class="article-list__item article-list__item--box">
    <a href="https://github.com/crispymtn/zaikio-oauth_client" target="_blank" class="link link--github u-margin-reg-bottom">
      crispymtn/zaikio-oauth_client
    </a>
    <p class="u-small">
      This gem is a mountable Rails engine that provides single sign on, Zaikio access and further Zaikio platform connectivity
    </p>
    <div class="article-list__item__footer">
      <img src="./ruby.png" alt="Ruby" style="width:30px" />
    </div>
  </div>
  <div class="article-list__item article-list__item--box">
    <a href="https://github.com/crispymtn/zaikio-webhooks" target="_blank" class="link link--github u-margin-reg-bottom">
      crispymtn/zaikio-webhooks
    </a>
    <p class="u-small">
      Allows to register webhook callbacks for Zaikio Loom for multiple apps as background jobs
    </p>
    <div class="article-list__item__footer">
      <img src="./ruby.png" alt="Ruby" style="width:30px" />
    </div>
  </div>
  <div class="article-list__item article-list__item--box">
    <a href="https://github.com/crispymtn/zaikio-procurement-ruby" target="_blank" class="link link--github u-margin-reg-bottom">
      crispymtn/zaikio-procurement-ruby
    </a>
    <p class="u-small">
      Ruby API Client for Zaikio Procurement
    </p>
    <div class="article-list__item__footer">
      <img src="./ruby.png" alt="Ruby" style="width:30px" />
    </div>
  </div>
</div>

<div class="u-margin-big-bottom"><a href="https://github.com/search?q=topic%3Azaikio-gem+org%3Acrispymtn&type=Repositories" target="_blank" class="btn btn--link">Explore all libraries on GitHub →</a></div>

<h1 class="u-huge">Need help? Get in touch!</h1>

<div class="u-flex u-margin-big-bottom">
  <div class="u-col-8">
    <p class="u-lead u-margin-super-huge-bottom u-margin-no-top">If you ever need help, please feel free to contact us and join our Slack Zaikio community to stay up to date.</p>
    <a href="https://join.slack.com/t/zaikio-community/shared_invite/zt-g01gvvg2-lk0TcIzkhdtu~xIvRZ5xCw" target="_blank" class="link link--img u-margin-big-bottom">
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
<p style="color:#6B6C6E; margin: 0px">Copyright © 2020 Zaikio GmbH</p>
