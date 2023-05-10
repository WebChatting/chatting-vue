import { post, get, asyncPost } from "@/services/request";
import {
    USER_LOGIN_URL,
    USER_REGISTER_URL,
    USER_UPDATE_URL,
    USER_SEARCH_URL,
    RELATION_UPDATE_URL,
    RELATION_ADD_URL,
    GROUP_ADD_URL,
    GROUP_SEARCH_URL,
    COMMON_PUBLIC_KEY_URL,
} from "@/config/api";
import encrypt from "@/utils/crypto";

export default {
    loginUser: async (username, password) => {
        let publicKey = sessionStorage.getItem("public-key");
        if (publicKey === null) {
            await get(COMMON_PUBLIC_KEY_URL)
                .then((res) => {
                    publicKey = res.data.data["public-key"];
                    sessionStorage.setItem("public-key", publicKey);
                })
                .catch((err) => {
                    console.log("Error: " + err);
                });
        }

        return post(USER_LOGIN_URL, null, {
            username: encrypt(publicKey, username),
            password: encrypt(publicKey, password),
        });
    },
    registerUser: (username, password) => {
        return post(USER_REGISTER_URL, null, {
            username,
            password,
        });
    },
    updateRelation: (requestId, acceptId, type, status) => {
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
    addRelation: (rel, type) => {
        return post(RELATION_ADD_URL, null, {
            acceptId: rel.id,
            type,
            status: rel.status,
        }).then((res) => {
            if (res.data.status == 200) {
                rel.status = 0;
            } else {
                console.log("network error");
            }
        });
    },
    updateUserOrAddGroup: (type, avatarPath, name, password) => {
        const url = type == 0 ? USER_UPDATE_URL : GROUP_ADD_URL;
        return post(url, {
            avatarPath,
            name,
            password,
        });
    },
    searchUserOrSearchGroup: (isGroup, name) => {
        return get(isGroup ? GROUP_SEARCH_URL : USER_SEARCH_URL, {
            name,
        });
    },
    generateResponse: async (content) => {
        const OPENAI_API_KEY = window.localStorage.getItem("openai-key");
        const OPENAI_MAKING_REQUEST = window.localStorage.getItem("openai-api");
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
        };

        const data = {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content }],
            temperature: 0.7,
        };

        try {
            console.log("Waiting for chatgpt answer...");
            const response = await asyncPost(OPENAI_MAKING_REQUEST, {}, data, {
                headers,
            });
            console.log("show chatgpt response...");
            return response.data.choices[0].message.content;
        } catch (err) {
            console.error(err);
            return err.message;
        }
    },
};
