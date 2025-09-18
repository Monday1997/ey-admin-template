import type { ProxyConfig } from '../types/data'
/**
 * 获取本地调试代理目标baseURL
 * @returns {string} baseUrl
 */
export const getProxyTarget = function (config: ProxyConfig) {
  const { target, envType, hostType } = config;
  switch (hostType) {
    case 'PHP':
      return getDefaultProxyTarget(target, envType);
    case 'Golang':
      return getGolangProxyTarget(target, envType);
  }
};
export function getDefaultProxyTarget(target: string, type = 'dev') {
  switch (type) {
    case 'dev':
      return `https://dev${target}-admin.rrzuji.com`;
    case 'test':
      return `https://test${target}-admin.rrzuji.com`;
    // prod
  }
}
export function getGolangProxyTarget(target: string, type = 'dev') {
  switch (type) {
    case 'dev':
      return `https://dev${target}-go-micro.rrzuji.com`;
    case 'test':
      return `https://test${target}-go-micro.rrzuji.com`;
  }
}
