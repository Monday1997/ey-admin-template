import axios from 'axios';
import * as qs from 'qs';

import { hostConfig } from '@/config/global-config';
import type { HostType } from '@/services/types/data';

import { DEFAULT_STATUS } from './config'
import { formatUrl } from './utils/format-url';
import { redirectLogin } from './utils/login';


const defaultContentType = 'application/x-www-form-urlencoded; charset=UTF-8';
const service = axios.create({
  baseURL: '/',
  timeout: 50000,
  withCredentials: true, // 跨域携带cookie
  maxRedirects: 0, // 将不处理任何重定向
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  paramsSerializer: params => {
    // tags: ['fiction', 'sci-fi', 'adventure'] -> tags[]=fiction&tags[]=sci-fi&tags[]=adventure
    // 这是php中的标准模式
    return qs.stringify(params, { arrayFormat: 'brackets' });
  },
});


/**
 * request拦截器 axios
 * 1. 处理url
 * 2. 处理header
 * 3. 处理token
 */
service.interceptors.request.use(
  async (config: any) => {
    config.url = formatUrl(config);
    // content-type 优先级：service指定 > global host config配置 > 默认值
    if (!config.headers['content-type']) {
      config.headers['content-type'] = hostConfig[config.hostType as HostType]?.contentType || defaultContentType;
    }
    // 默认post都是 application/x-www-form-urlencoded; charset=UTF-8，需要转换成string
    if (config.headers['content-type'] === defaultContentType) {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  (error: any) => Promise.reject(error),
);

/**
 * respone拦截器 axios
 */
service.interceptors.response.use(
  async (response: any) => {
    const { request, config, data, headers } = response;
    // 同后端规定成功时的status
    let successStatusCheckValue: any = config.successStatusCheckValue || DEFAULT_STATUS.succcess_status;
    if (config.successStatusCheckValue === 'none') {
      successStatusCheckValue = undefined;
      return data;
    }
    const logOutParams = {
      requestConfig: JSON.stringify(config),
      responseData: JSON.stringify(data),
    };
    // 接口重定向到登录时
    if (request && request.responseURL && request.responseURL.includes('/login')) {
      redirectLogin(logOutParams);
      return Promise.reject(data);
    }
    // 检测请求成功的标志
    if (
      data.status !== successStatusCheckValue &&
      data.code !== successStatusCheckValue
    ) {
      if (data.code === 401) {
        redirectLogin(logOutParams);
        return Promise.reject({ ...data, headers });
      }
      return Promise.reject({ ...data, headers });
    }
    return data;
  },
  (error: any) => {
    const logOutParams = {
      requestConfig: JSON.stringify(error?.response?.config),
      responseData: JSON.stringify(error?.response?.data),
    };
    // test 超时
    if (error.message.indexOf('timeout of') !== -1) {
      return Promise.reject(error.message);
    }
    // 处理没有权限的403
    if (error && error.response && error.response.data.code === 403 && error.response.data.name === 'Forbidden') {
      return Promise.reject(error.response.data);
    }
    // 用户登录信息过期
    if (error && error.response && [401, 403].includes(error.response.status)) {
      redirectLogin(logOutParams);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default service;
