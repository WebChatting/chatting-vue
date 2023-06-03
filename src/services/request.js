import instance from "@/services/api";

function get(url, params, data) {
    return request("get", url, params, data);
}

function post(url, params, data) {
    return request("post", url, params, data);
}

function asyncPost(url, params, data, { headers }, timeout = 0) {
    return asyncRequest("post", url, params, data, { headers }, timeout)
}

async function asyncRequest(method, url, params, data, { headers }, timeout) {
    return await instance({
        method,
        url,
        params,
        data,
        headers,
        responseType: "json",
        timeout,
    });
}

function request(method, url, params, data) {
    return instance({
        method,
        url,
        params,
        data,
        responseType: "json",
    });
}

export { get, post, asyncPost };
