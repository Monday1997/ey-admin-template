
import { createVNode } from 'vue';
import { message } from 'ant-design-vue';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import http from './axios';
import type { HostType } from './types/data';
export interface IAxiosResponse<T> extends AxiosResponse {
  status: number;
  data: T;
  message?: string;
  error?: string;
  [key: string]: any;
}

const env = import.meta.env.DEV;



export interface RequestConfig extends AxiosRequestConfig {
  closeErrorMessage?: boolean;
  hostType?: HostType;
  successStatusCheckValue?: number | 'none';
  encryptField?: any;
}
/**
 * GET 一个示例: GET('/edit', { name: 'libai' }, { baseUrl: 'www.baidu.com' })
 * @param url
 * @param params
 * @param config
 */
export function GET<T, K = any>(url: string, params?: T, config?: RequestConfig): Promise<IAxiosResponse<K>> {
  return http
    .get<K>(url, { ...config, params })
    .catch(error => {
      if (env) {
        console.error('GET接口请求异常。下面是请求参数和异常信息：');
        console.error(url);
        console.error(error);
      }
      if (config && config.closeErrorMessage) {
        return Promise.reject(error);
      }
      errorMessage(error, url);
      return Promise.reject(error);
    });
}

/**
 * POST 一个示例: POST('/edit', { name: 'libai' }, { params: { id: 2 } })
 * @param url
 * @param data
 * @param config
 */
export function POST<T, K = any>(url: string, data?: T, config?: RequestConfig): Promise<IAxiosResponse<K>> {
  return http.post<K>(url, data, config).catch(error => {
    if (env) {
      console.error('POST接口请求异常。下面是请求参数和异常信息：');
      console.error(url);
      console.error(error);
    }
    if (config && config.closeErrorMessage) {
      return Promise.reject(error);
    }
    errorMessage(error, url);
    return Promise.reject(error);
  });
}
/** 接口错误信息统一处理 */
export function errorMessage(error: any, url: string) {
  const copyErrorVNode = createCopyErrorVNode(error, url);
  // 权限问题 提示申请权限
  // if () {  }
  message.error(copyErrorVNode)
}
function createCopyErrorVNode(error: any, url: string) {
  createVNode('div', {}, [
    createVNode('div', { style: 'margin-bottom: 8px;' }, '请求地址：' + url),
    createVNode('div', {}, '错误信息：' + (error.response?.data?.message || error.message || '请求失败，请重试'))
  ]);
}
