import prompts from "prompts";
type TpromptsOptions = typeof prompts extends (data: infer P) => any
  ? P
  : never;
export const promptsOptions: TpromptsOptions = [
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
];
