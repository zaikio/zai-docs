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

<h2>Explore our apps</h2>

<AppList :only-logo="true" :limit="3" />

<RouterLink to="/apps/" class="btn">Explore all apps →</RouterLink>

<br /><br />
<p style="color:#6B6C6E;">Copyright © 2020 Zaikio GmbH</p>
