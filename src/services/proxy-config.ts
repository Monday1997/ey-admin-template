import * as devHost from '../../devHostConfig'
import { getProxyTarget } from './utils/url'
export function getProxy() {
  return {
    '/api': {
      target: getProxyTarget({
        target: devHost.defaultTarget,
        envType: devHost.defaultEnv,
        hostType: 'PHP',
      }),
      // 改变原始请求头中的 Host 和 Origin 字段值为目标服务器的域名。
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, ''),
      //将所有目标服务器返回的 Cookie 的 domain 属性重写为空字符串。
      cookieDomainRewrite: { '*': '' },
      protocolRewrite: 'https',
    },
    '/go-api': {
      target: getProxyTarget({
        target: devHost.golangTarget,
        envType: devHost.golangEnv,
        hostType: 'Golang',
      }),
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/go-api/, ''),
      cookieDomainRewrite: { '*': '' },
      protocolRewrite: 'https',
    },
  }
}
