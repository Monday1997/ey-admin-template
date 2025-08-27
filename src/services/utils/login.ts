import { message } from 'ant-design-vue';

import router from '@/router/index';

import { POST } from '../api';
// const isSuper = window.location.href.includes('super');

/**
 * 处理登录重定向
 *
 * errorParams - 可选，包含请求配置和响应数据，用于记录触发退出登录的请求信息
 * @property {string} [requestConfig] - 请求配置
 * @property {string} [responseData]  - 响应数据
 *
 */
export const redirectLogin = (errorParams?: { requestConfig?: string; responseData?: string }): void => {
  const currentRoute = router.currentRoute.value;
  if (currentRoute.name !== 'Login') {
    POST('/site/logout', errorParams);
    router.push(`/login?path=${encodeURIComponent(currentRoute.fullPath)}`);
    message.destroy();
    message.info('身份验证失败，请先登录');
  }
};
