import minimist from "minimist";
import prompts from "prompts";

type TMinimistRreturn = ReturnType<typeof minimist>;
export type TpromptsOptions = typeof prompts extends (data: infer P) => any
  ? P
  : never;

export type TDealParamsWithNameArags<T> = {
  defaultConfig: T;
  transformBefore?: (args: TMinimistRreturn) => any;
  mainStep: (data: any) => Promise<any>;
};

export type TInitProps<T extends Record<string, any>> = {
  /**  转换用户cli输入的参数*/
  tansformUserArgs?: TDealParamsWithNameArags<T>["transformBefore"];
  /** 对应模板所在路径  */
  tmpPath: string;
  /** 默认配置 */
  defaultConfig: T;
  promptsOptions: TpromptsOptions;
};
