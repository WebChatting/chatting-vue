import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

// 创建axios实例
const instance = axios.create({
  baseURL: API_BASE_URL, // 你的API服务器地址
  timeout: 5000 // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在请求发送之前做些什么
    const token = localStorage.getItem('jwt')
    if (token) {
      // 设置Authorization头部
      config.headers.authorization = token
    }
    return config;
  },
  error => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    const token = response.headers.authorization
    if (token) {
      localStorage.setItem("jwt", token)
    }
    return response;
  },
  error => {
    // 处理响应错误
    if (error.response) {
      // 如果有响应错误，则根据实际情况返回自定义的错误响应
      return Promise.reject(error.response.data);
    } else {
      // 如果没有响应错误，则抛出原始异常
      return Promise.reject(error);
    }
  }
);

export default instance;