// apiPlugin.js
import { post } from "@/service/request";
import {
    USER_LOGIN_URL,
    USER_REGISTER_URL,
    USER_UPDATE_URL,
    RELATION_UPDATE_URL,
    RELATION_ADD_URL,
    GROUP_ADD_URL,
} from "@/config/api";

export default {
    install(Vue) {
        Vue.prototype.$api = {
            loginUser(username, password) {
                return post(USER_LOGIN_URL, {
                    username,
                    password,
                });
            },
            registerUser(username, password) {
                return post(USER_REGISTER_URL, {
                    username,
                    password,
                });
            },
            updateRelation(requestId, acceptId, type, status) {
                return post(RELATION_UPDATE_URL, null, {
                    requestId,
                    acceptId,
                    type,
                    status,
                }).then((res) => {
                    if (!res.data.status == 200) {
                        console.log("network error");
                    }
                });
            },
            addRelation(rel, type) {
                return post(RELATION_ADD_URL, null, {
                    acceptId: rel.id,
                    type,
                    status: rel.status,
                }).then(res => {
                    if (res.data.status == 200) {
                        rel.status = 0;
                    } else {
                        console.log("network error");
                    }
                });
            },
            updateUserOrAddGroup(type, avatarPath, name, password) {
                const url = type == 0 ? USER_UPDATE_URL : GROUP_ADD_URL;
                return post(url, {
                    avatarPath,
                    name,
                    password,
                })
            },
        };
    },
};
