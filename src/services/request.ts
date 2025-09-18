// utils/request.ts
import { message } from 'ant-design-vue'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios, { AxiosError } from 'axios'

// 创建实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api', // 你的接口基础路径
  timeout: 10000, // 请求超时时间
  withCredentials: true, // 携带cookie
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 你可以在这里加上 token
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    // 假设后端返回结构 { code: 0, data: {}, message: 'ok' }
    if (data.code !== 0) {
      message.error(data.message || '请求错误')
      return Promise.reject(data)
    }
    return data.data
  },
  (error: AxiosError<Record<string, unknown>>) => {
    if (error.response) {
      const { status, data } = error.response
      let msg = data?.message || '请求失败'
      if (status === 401) msg = '未授权，请登录'
      if (status === 403) msg = '没有权限访问'
      if (status === 500) msg = '服务器错误'
      message.error(msg)
    } else if (error.message.includes('timeout')) {
      message.error('请求超时，请重试')
    } else {
      message.error('网络错误')
    }
    return Promise.reject(error)
  },
)

export default service
