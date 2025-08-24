import minimist from "minimist";
type TMinimistRreturn = ReturnType<typeof minimist>;
export type TDealParamsWithNameArags<T> = {
  defaultConfig: T;
  transformBefore?: (args: TMinimistRreturn) => any;
  mainStep: (data: any) => Promise<any>;
};
