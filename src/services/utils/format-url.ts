import { globalConfig, hostConfig } from '@/config/global-config';
import type { HostType } from '@/services/types/data';
import { useCounterStore } from '@/stores/service'

import { envHostMap } from '../config'
import { getProxyTarget } from '../utils/url';
const store = useCounterStore();

const env = import.meta.env.DEV;
// cross_env 变量
const buildEnv = import.meta.env.VITE_BUILD_ENV as 'dev' | 'test' | 'prod'
const { baseUrl } = globalConfig;

export const formatUrl = (config: any = {}): string => {
  const storeBaseUrl = store.baseUrl; // route.query.origin 部署环境注入的 origin 路由参数值
  config.hostType = config.hostType ?? 'PHP';
  const currentConfig = hostConfig[config.hostType as HostType] || {};
  if (env) {
    // 开发环境，使用代理proxy
    const proxyPath = currentConfig.proxyPath || '/api';
    const targetBaseUrl = config.baseUrl || storeBaseUrl || '';
    return `${targetBaseUrl}${proxyPath}${config.url}`;
  } else {
    // 打包环境（部署环境），使用完整url
    // 打包环境又分三种：正式服、开发服、测试服
    let customHost = '';
    // 生产环境的请求地址
    customHost = currentConfig.host;
    const { serverNum } = getCurrentServerConfig();
    // 开发环境
    if (serverNum || buildEnv !== 'prod') {
      const target = envHostMap[config.hostType as HostType] || serverNum || '1'; // 默认1服
      customHost =
        getProxyTarget({
          target,
          envType: buildEnv || 'dev',
          hostType: config.hostType,
        }) || '';
    }
    const targetUrl = config.baseUrl || storeBaseUrl || baseUrl; // 对应打包环境baseUrl优先级
    return `${customHost || targetUrl}${config.url}`;
  }
};

export function getCurrentServerConfig(): {
  serverNum: string;
} {
  const topHost = window.location.href;
  // 解析location.host
  const num = topHost.match(/\d+/g)?.[0] || topHost.split(/\.dev(.*?)\-/)?.[1];
  const informal = /dev\d+\-/.test(topHost) || /admin\w+\./.test(topHost) || /test\d+\-/.test(topHost);
  return {
    serverNum: informal ? num || '1' : '',

  };
}
