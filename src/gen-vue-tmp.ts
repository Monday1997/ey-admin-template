#!/usr/bin/env node
import fse from "fs-extra";
import fs from "node:fs";

import minimist from "minimist";
import path from "path";
import getData from "../template/css/tailwind/vite.config.data.ts";
import ejs from "ejs";
import { pathToFileURL } from "node:url";
import prompts from "prompts";
import _ from "lodash";
let userResult: {
  pkgName: string;
  config: string[];
  css: "tailwind" | "unocss";
  cdn: boolean;
  pwa: boolean;
} = {
  pkgName: "project_ey",
  config: [],
  css: "tailwind",
  cdn: false,
  pwa: false,
};
const cwd = process.cwd();
const sourceDir = path.resolve(__dirname, "../template/base");
function isSkippedFile(filePath) {
  return [".data.ts", ".ejs"].some((o) => filePath.endsWith(o));
}
const dataTsMap = {};
async function fileCopy() {
  userResult.config.push("base");
  const { pkgName, ...userOptions } = userResult;
  const destDir = path.resolve(cwd, pkgName);
  let tmpDir = path.resolve(__dirname, "../template");
  fs.existsSync(destDir) && fse.removeSync(destDir);
  fse.copySync("./template/base", destDir, {
    filter: (src) => {
      // 不复制node_modules目录
      return !src.includes("node_modules");
    },
  });
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
    console.log("dataTsMap", dataTsMap);
  }
  for (const fileName of Object.keys(userOptions)) {
    if (Array.isArray(userResult[fileName])) {
      for (const fileValue of userResult[fileName]) {
        const src = path.resolve(
          __dirname,
          `../template/${fileName}/${fileValue}`
        );
        await walkFiles(src);
      }
    } else {
      const pathValue =
        typeof fileName === "string"
          ? `../template/${fileName}/${userOptions[fileName]}`
          : `../template/${fileName}`;
      const src = path.resolve(__dirname, pathValue);
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

async function userChoice() {
  userResult = await prompts(
    [
      {
        type: "text",
        name: "pkgName",
        message: "请输入项目名",
      },
      {
        type: "multiselect",
        name: "config",
        message: "请选择要配置的基础模块",
        choices: [
          // { title: "layout组件", value: "#ff0000" },  lodash vue-use
          // { title: "axios封装", value: "axios" },
          { title: "unplugin-vue-route，自动路由", value: "router" },
        ],
        hint: "↑/↓: 移动, ⎵: 选择, a: 全选, d: 反选, Enter: 确定",
        instructions: false,
      },
      // {
      //   type: "toggle",
      //   name: "cdn",
      //   message: "是否需要配置cdn加速",
      //   initial: true,
      //   active: "yes",
      //   inactive: "no",
      // },
      {
        type: "select",
        name: "css",
        message: "请选择一个css framework",
        initial: 0,
        choices: [
          {
            title: "tailwindcss",
            value: "tailwind",
            description: "使用tailwindcss进行开发",
          },
          {
            title: "unocss",
            value: "unocss",
            description: "使用unocss进行开发",
          },
        ],
      },
    ],
    {
      onCancel: () => {
        console.warn("已退出程序");
        process.exit();
      },
    }
  );
}
function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName
  );
}

// 先把taiwind合进去
async function init() {
  try {
    const args = minimist(process.argv.slice(2), {
      alias: {
        template: "t",
      },
    });
    const [pkgName] = args._;
    if (isValidPackageName(pkgName)) {
      args.pkgName = pkgName;
      if (args.config && !Array.isArray(args.config)) {
        args.config = [args.config];
      }
      // 使用预设值 用户可以覆盖预设值
      if (args.template) {
        const defaultConfig = {
          pkgName: pkgName,
          config: ["router"], // TODO 后续给个layout
          css: "unocss",
          //TODO 后续toogle直接用false
        };
        userResult = Object.assign(
          defaultConfig,
          _.pick(args, _.keys(defaultConfig))
        );
        await fileCopy();
        process.exit();
      }
    } else if (pkgName || args._.length > 0) {
      console.error("项目名称输入不合法");
      process.exit();
    }

    prompts.override(args);
    await userChoice();
    fileCopy();
  } catch (error) {
    console.log("🚀 ~ init ~ error:", error);
  }
}
init();
