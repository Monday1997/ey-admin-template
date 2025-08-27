export type EnvType = 'dev' | 'test' | 'prod';
export type HostType = 'PHP' | 'Golang'
export interface ProxyConfig {
  /** 请求是在哪个服 */
  target: string;
  /** 目标环境 */
  envType: EnvType;
  /** 服务类型 */
  hostType: HostType;
}
