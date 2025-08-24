import { init } from "./common-tmp";
import { promptsOptions } from "./config/gen-vue-tmp";

import { vueTmp } from "./utils/path";
type TdefaultConfig = {
  pkgName: string;
  config: string[];
  css: string;
};
const defaultConfig = {
  pkgName: "",
  config: ["router"], // TODO 后续给个layout
  css: "unocss",
  //TODO 后续toogle直接用false
};

init<TdefaultConfig>({
  defaultConfig,
  tmpPath: vueTmp,
  tansformUserArgs(args: any) {
    if (args.config && !Array.isArray(args.config)) {
      args.config = [args.config];
    }
  },
  promptsOptions,
});
