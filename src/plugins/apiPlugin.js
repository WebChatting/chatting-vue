// apiPlugin.js
import { post, get } from "@/service/request";
import axios from 'axios';
import {
    USER_LOGIN_URL,
    USER_REGISTER_URL,
    USER_UPDATE_URL,
    USER_SEARCH_URL,
    RELATION_UPDATE_URL,
    RELATION_ADD_URL,
    GROUP_ADD_URL,
    GROUP_SEARCH_URL,
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
            searchUserOrSearchGroup(isGroup, name) {
                return get(isGroup ? GROUP_SEARCH_URL : USER_SEARCH_URL, {
                    name,
                })
            },
            async generateResponse(content) {
                let openaiApiKey = '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'
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openaiApiKey}`
                };

                const data = {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content}],
                    temperature: 0.7,
                };

                try {
                    console.log("Waiting for chatgpt answer...")
                    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, { headers });
                    console.log("show chatgpt response...")
                    return response.data.choices[0].message.content;
                } catch (error) {
                    console.error(error);
                }
            },
        };
    },
};
