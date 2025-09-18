import type { HostType } from "./types/data";

// 默认的一些状态值
export const DEFAULT_STATUS = {
  // 请求成功的code和status
  succcess_status: 0,
  // 接口重定向到的登录地址
  redirect_login_path: '/login'
}
// 环境和host的映射
// cicd运行时选择的参数

export const envHostMap: Record<HostType, string> = {
  PHP: import.meta.env.VITE_PHP_HOST,
  Golang: import.meta.env.VITE_GO_DEV
}
