const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const $RefParser = require("json-schema-ref-parser");
const yaml = require("js-yaml");

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function saveFile(path, content) {
  fs.writeFileSync(path, content, err => (err ? console.log(err) : null));
}

function parameterize(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 -]/, "")
    .replace(/\s/g, "-");
}

function swaggerFile(title, folder, fileName) {
  return `---
title: ${title}
lang: en-US
pageClass: full-width
editLink: false
---

<div class="api-content">
<a target="_blank" href="/api/${folder}/${fileName.replace('.yml', '.json')}" class="api-download">Download .json</a>

<ClientOnly><ApiDocWrapper src="api/${folder}/${fileName}"></ApiDocWrapper></ClientOnly>

</div>`;
}

class AppDocs {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }

  get publicFolder() {
    return path.join(__dirname, `../docs/.vuepress/public/api/${this.name}`);
  }

  get folder() {
    return path.join(__dirname, `../docs/api/${this.name}`);
  }

  get configFolder() {
    return path.join(__dirname, `../docs/.vuepress/apps`);
  }

  get relativeFolder() {
    return `/api/${this.name}`;
  }

  getFullUrl(url) {
    if (url.startsWith("https:")) {
      return url;
    } else {
      return `${this.url}${url}`;
    }
  }

  async getManifest() {
    this.manifest =
      this.manifest ||
      (await fetch(`${this.url}/docs/manifest.json`).then(res => res.json()));

    return this.manifest;
  }

  async createGuideItems(folder, relativeFolder, guides) {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    const text = await fetch(this.getFullUrl(guides.url)).then(res =>
      res.text()
    );

    saveFile(`${folder}/README.md`, text);

    await asyncForEach(guides.assets || [], async path => {
      const buffer = await fetch(this.getFullUrl(path)).then(res => res.buffer());
      const assetPath = path.replace("/docs/guides", "")

      saveFile(`${folder}${assetPath}`, buffer)
    });

    let items = {};

    await asyncForEach(Object.keys(guides.items || {}), async itemName => {
      items[itemName] = {
        path: `${relativeFolder}/${parameterize(itemName)}`,
        items: await this.createGuideItems(
          `${folder}/${parameterize(itemName)}`,
          `${relativeFolder}/${parameterize(itemName)}`,
          guides.items[itemName]
        )
      };
    });

    return items;
  }

  async createGuides() {
    const manifest = await this.getManifest();

    if (!manifest.guides) {
      return {};
    }

    return {
      Overview: { path: `${this.relativeFolder}/guides` },
      ...(await this.createGuideItems(
        `${this.folder}/guides`,
        `${this.relativeFolder}/guides`,
        manifest.guides
      ))
    };
  }

  async createReferences() {
    const manifest = await this.getManifest();

    if (!manifest.references) {
      manifest.references = manifest.specs;
    }

    let references = {};

    await asyncForEach(
      Object.keys(manifest.references),
      async referenceName => {
        const content = await fetch(
          this.getFullUrl(manifest.references[referenceName])
        ).then(res => res.text());
        const fileName = manifest.references[referenceName].split("/").pop();

        if (manifest.references[referenceName].includes(".yml")) {
          const parser = new $RefParser();
          await parser
            .dereference(this.getFullUrl(manifest.references[referenceName]))
            .then(schema => {
              saveFile(
                `${this.publicFolder}/${fileName}`,
                yaml.dump(schema)
              );
              saveFile(`${this.folder}/${fileName}`, yaml.dump(schema));
              saveFile(
                `${this.publicFolder}/${fileName.replace(".yml", ".json")}`,
                JSON.stringify(schema, null, 2)
              );
              saveFile(
                `${this.folder}/${fileName.replace(".yml", ".md")}`,
                swaggerFile(referenceName, this.name, fileName)
              );
              references[referenceName] = `${
                this.relativeFolder
              }/${fileName.replace(".yml", "")}`;
            });
        } else {
          saveFile(`${this.folder}/${fileName}`, content);
          references[referenceName] = `${this.relativeFolder}/${fileName
            .split(".")
            .shift()}`;
        }
      }
    );

    return references;
  }

  async create() {
    if (!fs.existsSync(this.folder)) {
      fs.mkdirSync(this.folder);
    }

    if (!fs.existsSync(this.publicFolder)) {
      fs.mkdirSync(this.publicFolder);
    }

    const manifest = await this.getManifest();
    let logo = null;

    if (manifest.logo) {
      const logoBuffer = await fetch(this.getFullUrl(manifest.logo)).then(res =>
        res.buffer()
      );

      saveFile(`${this.publicFolder}/logo.png`, logoBuffer);
      logo = `${this.relativeFolder}/logo.png`;
    }

    const guides = await this.createGuides();
    const references = await this.createReferences();

    saveFile(
      `${this.configFolder}/${this.name}.json`,
      JSON.stringify(
        {
          title: manifest.title,
          summary: manifest.summary,
          path: this.relativeFolder,
          home: guides.Overview
            ? guides.Overview.path
            : Object.values(references)[0],
          logo,
          guides,
          references
        },
        null,
        2
      )
    );
  }
}

const AVAILABLE_APPS = {
  directory: "https://hub.zaikio.com",
  mission_control: "https://mc.zaikio.com",
  procurement_suppliers: "https://procurement.zaikio.com/suppliers",
  procurement_consumers: "https://procurement.zaikio.com/consumers",
  warehouse: "https://warehouse.keyline.app"
};

asyncForEach(Object.keys(AVAILABLE_APPS), async app => {
  await new AppDocs(app, AVAILABLE_APPS[app]).create();
});
