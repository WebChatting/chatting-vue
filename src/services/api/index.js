import axios from "axios";
import { API_BASE_URL } from "@/config/api";
import api from "@/services/api/api";

// 创建axios实例
const instance = axios.create({
    baseURL: API_BASE_URL, // 你的API服务器地址
    timeout: 5000, // 请求超时时间
});

let requestQueue = []; // 请求队列

let isRefreshing = false; // 是否正在刷新token

// 添加一个等待鉴权的请求到队列中
function addRequestToQueue(config, resolve, reject) {
    requestQueue.push({ config, resolve, reject });
}

// 处理队列中的请求，并清空队列
function processRequestQueue() {
    requestQueue.forEach(({ config, resolve, reject }) => {
        // 重新发送原始请求
        instance(config)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
    requestQueue = [];
}

const ABSOLUTE_PATH_PREFIX = "http";

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在请求发送之前做些什么
        const token = sessionStorage.getItem("jwt");
        if (token && !config.url.startsWith(ABSOLUTE_PATH_PREFIX)) {
            // 设置Authorization头部
            config.headers.authorization = token;
        }
        return config;
    },
    (error) => {
        // 处理请求错误
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 对响应数据做些什么
        const token = response.headers.authorization;
        if (token) {
            sessionStorage.setItem("jwt", token);
        }
        return response;
    },
    async (error) => {
        // 处理响应错误
        if (error.response && error.response.status)
            if (
                error.response.status === 401 &&
                error.response.data.status === 402
            ) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    const user = JSON.parse(sessionStorage.getItem("user"));
                    // 发送登录请求以获取新的 token
                    await api.loginUser(user.username, user.password);
                    isRefreshing = false;
                    processRequestQueue();
                }

                return new Promise((resolve, reject) => {
                    addRequestToQueue(error.config, resolve, reject);
                });
            } else if (
                error.response.status === 400 &&
                error.response.data.status === 422
            ) {
                sessionStorage.removeItem("public-key");
            } else {
                // 如果没有响应错误，则抛出原始异常
                return Promise.reject(error);
            }
    }
);

export default instance;
