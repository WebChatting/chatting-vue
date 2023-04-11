import axios from 'axios';
import { API_BASE_URL } from '@/config/api';
import api from '@/service/api/api';

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
  async error => {
    // 处理响应错误
    if (error.response.status === 401 && error.response.data.status === 402) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      // 发送登录请求以获取新的 token
      await api.loginUser(user.username, user.password);
      // 重新发送原始请求
      return instance(error.config);
    } else {
      // 如果没有响应错误，则抛出原始异常
      return Promise.reject(error);
    }
  }
);

export default instance;