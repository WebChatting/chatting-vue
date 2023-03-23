import axios from 'axios'
import { baseUrl } from '@/config/env'

function get(url, params, data) {
    return request('get', url, params, data)
}

function post(url, params, data) {
    return request('post', url, params, data)
}

function request(method, url, params, data) {
    return axios({
        method,
        url: baseUrl + url,
        params,
        data,
        responseType: 'json',
    })
}

export {
    get,
    post,
}