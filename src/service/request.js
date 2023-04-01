import instance from "@/service/api";

function get(url, params, data) {
    return request("get", url, params, data);
}

function post(url, params, data) {
    return request("post", url, params, data);
}

function request(method, url, params, data) {
    return instance({
        method,
        url: url,
        params,
        data,
        responseType: "json",
    });
}

export { get, post };
