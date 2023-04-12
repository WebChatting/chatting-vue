import instance from "@/services/api";

function get(url, params, data) {
    return request("get", url, params, data);
}

function post(url, params, data) {
    return request("post", url, params, data);
}

function asyncPost(url, params, data, { headers }) {
    return asyncRequest("post", url, params, data, { headers })
}

async function asyncRequest(method, url, params, data, { headers }) {
    return await instance({
        method,
        url,
        params,
        data,
        headers,
        responseType: "json",
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
