#!/usr/bin/env node
import fse from "fs-extra";
import fs from "node:fs";

import { dealParamsWithName } from "./utils/cli";

import { TInitProps, TpromptsOptions } from "./types/cli";

import path from "path";
import ejs from "ejs";
import { pathToFileURL } from "node:url";
import prompts from "prompts";
import _ from "lodash";
// import { promptsOptions } from "./config.ts/gen-vue-tmp";

const cwd = process.cwd();
let pkgName = "";
let userOptions = {};
// 用户的目标路径
let destDir = "";
let tmpPath = "";

// .data.ts数据集合
const dataTsMap = {};
function isSkippedFile(filePath) {
  return [".data.ts", ".ejs"].some((o) => filePath.endsWith(o));
}

let tmpDir = "";
async function walkFiles(filePath, level = 0) {
  if (level === 0) {
    tmpDir = filePath;
  }
  for (const fileName of fse.readdirSync(filePath)) {
    const curPath = path.join(filePath, fileName);
    const stat = fse.statSync(curPath);
    if (stat.isDirectory()) {
      await walkFiles(curPath, level + 1);
    } else {
      // 这是相对路径
      const relactivePath = curPath.replace(tmpDir, "");
      const destPath = path.join(destDir, relactivePath);
      if (!fse.existsSync(destPath) && !isSkippedFile(curPath)) {
        fse.ensureDirSync(path.dirname(destPath));
        fse.copyFileSync(curPath, destPath);
      } else {
        const pathExt = path.extname(curPath);
        if (pathExt === ".json") {
          // 合并json
          const destJson = JSON.parse(fse.readFileSync(destPath, "utf-8"));
          const curJson = JSON.parse(fse.readFileSync(curPath, "utf-8"));
          _.merge(destJson, curJson);
          fse.writeFileSync(destPath, JSON.stringify(destJson, null, 2));
        } else if (curPath.endsWith(".data.ts")) {
          const fileURL = pathToFileURL(curPath).href;
          const module = await import(fileURL);
          const data = module.default();
          if (dataTsMap[relactivePath]) {
            _.mergeWith(
              dataTsMap[relactivePath].data,
              data,
              (objValue, srcValue) => {
                if (_.isArray(objValue)) {
                  return _.uniq(objValue.concat(srcValue));
                }
              }
            );
          } else {
            dataTsMap[relactivePath] = { data };
          }
          dataTsMap[relactivePath].destPath = destPath.replace(".data", "");
        } else if (curPath.endsWith(".ejs")) {
          const curContent = fse.readFileSync(curPath, "utf-8");
          const destContent = ejs.render(curContent, userOptions);
          const realPath = destPath.replace(/\.ejs$/, "");
          fse.writeFileSync(realPath, destContent);
        } else if (curPath.endsWith(".d.ts")) {
          const destContent = fse.readFileSync(destPath, "utf-8");
          const currentContent = fse.readFileSync(curPath, "utf-8");
          fse.writeFileSync(destPath, destContent + "/n" + currentContent);
        } else {
          // 其他文件直接复制
          fse.copyFileSync(curPath, destPath);
        }
      }
    }
  }
}
async function makeFiles(result: any) {
  result.config.push("base");
  const { pkgName: pkgResult, ...resultOptions } = result;
  pkgName = pkgResult;
  userOptions = resultOptions;
  destDir = path.resolve(cwd, pkgName);
  fs.existsSync(destDir) && fse.removeSync(destDir);
  fse.copySync("./template/base", destDir, {
    filter: (src) => {
      // 不复制node_modules目录
      return !src.includes("node_modules");
    },
  });
  for (const fileName of Object.keys(userOptions)) {
    if (Array.isArray(result[fileName])) {
      for (const fileValue of result[fileName]) {
        const src = path.resolve(tmpPath, `./${fileName}/${fileValue}`);
        await walkFiles(src);
      }
    } else {
      const pathValue =
        typeof fileName === "string"
          ? `./${fileName}/${userOptions[fileName]}`
          : `./${fileName}`;
      const src = path.resolve(tmpPath, pathValue);
      await walkFiles(src);
    }
  }
  for (let key in dataTsMap) {
    const { data, destPath } = dataTsMap[key];
    const content = fse.readFileSync(destPath, "utf-8");
    const result = ejs.render(content, data);
    fse.writeFileSync(destPath, result);
  }
}

async function userChoice(promptsOptions: TpromptsOptions) {
  const result = await prompts(promptsOptions, {
    onCancel: () => {
      console.warn("已退出程序");
      process.exit();
    },
  });
  makeFiles(result);
}

// 先把taiwind合进去
export async function init<T extends Record<string, any>>(
  initProps: TInitProps<T>
) {
  try {
    tmpPath = initProps.tmpPath;
    dealParamsWithName<T>({
      defaultConfig: initProps.defaultConfig,
      transformBefore: initProps.tansformUserArgs || undefined,
      mainStep: makeFiles,
    });

    await userChoice(initProps.promptsOptions);
  } catch (error) {
    console.log("🚀 ~ init ~ error:", error);
  }
}
