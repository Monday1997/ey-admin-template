#!/usr/bin/env node
import fse from "fs-extra";
import fs from "node:fs";

import path from "path";
import getData from "../template/css/tailwind/vite.config.data.ts";
import ejs from "ejs";
function fileCopy() {
  fse.copySync("./template/base", "./test", {
    filter: (src) => {
      // 不复制node_modules目录
      return !src.includes("node_modules");
    },
  });
}
function mergePkg() {
  // css/tailwind
  const tailwindJsonPath = path.resolve(
    __dirname,
    "../template/css/tailwind/package.json"
  );
  const destPath = path.resolve(__dirname, "../test/package.json");
  const content = fs.readFileSync(tailwindJsonPath, "utf-8");
  const sourceContent = JSON.parse(fs.readFileSync(tailwindJsonPath, "utf-8"));
  const destContent = JSON.parse(fs.readFileSync(destPath, "utf-8"));
  sourceContent.dependencies = {
    ...sourceContent.dependencies,
    ...destContent.dependencies,
  };
  sourceContent.devDependencies = {
    ...sourceContent.devDependencies,
    ...destContent.devDependencies,
  };
  fs.writeFileSync(destPath, JSON.stringify(sourceContent, null, 2), "utf-8");
}
function mergeViteConfig() {
  const tmpVite = path.resolve(__dirname, "../template/base/vite.config.ts");
  const sourceVite = path.resolve(
    __dirname,
    "../template/css/tailwind/vite.config.data.ts"
  );
  const originVite = fs.readFileSync(tmpVite, "utf-8");
  const data = getData();

  const result = ejs.render(originVite, data);

  const destVite = path.resolve(__dirname, "../test/vite.config.ts");
  fs.writeFileSync(destVite, result);
}
// 先把taiwind合进去
function init() {
  fileCopy();
  mergePkg();
  mergeViteConfig();
}
init();
