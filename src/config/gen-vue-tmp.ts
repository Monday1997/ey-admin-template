import prompts from "prompts";
import { TpromptsOptions } from "../types/cli";
export const promptsOptions: TpromptsOptions = [
  {
    type: "text",
    name: "pkgName",
    message: "请输入项目名",
  },
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
  {
    type: "multiselect",
    name: "config",
    message: "请选择要配置的基础模块",
    choices: [
      { title: "unplugin-vue-route，自动路由", value: "unplugin" },
      { title: "i18n", value: "i18n" },
      { title: "pwa", value: "pwa" },
      { title: "cdn打包处理(生产环境慎用)", value: "router" },
    ],
    hint: "↑/↓: 移动, ⎵: 选择, a: 全选, d: 反选, Enter: 确定",
    instructions: false,
  },
  {
    type: "toggle",
    name: "axios",
    message: "是否使用已初步封装的axios",
    initial: true,
    active: "yes",
    inactive: "no",
  },
];
