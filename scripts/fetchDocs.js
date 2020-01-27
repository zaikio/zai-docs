const https = require("https");
const fs = require("fs");
const path = require("path");

const AVAILABLE_APPS = {
  directory: "https://directory.heidelberg.cloud"
};

const navFilePath = path.join(
  __dirname,
  "../docs/.vuepress/externalApisNav.json"
);

fs.writeFile(navFilePath, JSON.stringify([]), err => {
  if (err) {
    console.log(err);
  }
});

Object.keys(AVAILABLE_APPS).forEach(appName => {
  const url = AVAILABLE_APPS[appName];
  https.get(`${url}/docs/manifest.json`, response => {
    response.on("data", data => {
      const manifest = JSON.parse(data);
      const appApiDir = path.join(__dirname, `../docs/api/${appName}`);
      if (!fs.existsSync(appApiDir)) {
        fs.mkdirSync(appApiDir);
      }
      console.log("FETCHED MANIFEST", manifest);

      if (manifest.specs) {
        Object.keys(manifest.specs).forEach(specName => {
          const specPath = manifest.specs[specName];
          const filePath = path.join(appApiDir, specPath.split("/").pop());
          const file = fs.createWriteStream(filePath);
          https.get(`${url}${specPath}`, response => {
            console.log("FETCHED", `${url}${specPath}`);
            response.pipe(file);
            fs.writeFile(
              path.join(appApiDir, "README.md"),
              `---
title: ${specName}
lang: en-US
pageClass: full-width
---

<ClientOnly><ApiDocWrapper src="api/${appName}/${specPath
                .split("/")
                .pop()}"></ApiDocWrapper></ClientOnly>
            `,
              err => {
                if (err) {
                  console.log(err);
                }
              }
            );
            let apiSpecLinks = fs.existsSync(navFilePath)
              ? JSON.parse(require("fs").readFileSync(navFilePath, "utf8"))
              : [];

            apiSpecLinks.push({
              text: specName,
              link: `/api/${appName}/`
            });

            fs.writeFile(navFilePath, JSON.stringify(apiSpecLinks), err => {
              if (err) {
                console.log(err);
              }
            });
          });
        });
      }
    });
  });
});
