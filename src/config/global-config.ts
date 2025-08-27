import type { HostType } from '@/services/types/data';

export const globalConfig = {
  baseUrl: '', // 一般情况不需要设置
};
// 正式环境的配置
export const hostConfig: { [key in HostType]: { proxyPath: string; host: string; contentType?: string } } = {
  PHP: {
    proxyPath: '/api',
    host: 'https://admin.rrzu.com',
  },
  Golang: {
    proxyPath: '/go-api',
    host: 'https://go-micro.rrzu.com',
    contentType: 'application/json;charset=utf-8',
  }
};
