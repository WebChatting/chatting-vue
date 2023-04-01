import { post, get } from "@/service/request";
import {
    MESSAGE_LOAD_URL,
    GROUP_LIST_URL,
    RELATION_LIST_URL,
} from "@/config/api";

export default {
    loadMessage({ commit }, { type, count, toId, updateTime, isInitial, mk }) {
        post(MESSAGE_LOAD_URL, {
            type,
            count,
            toId,
            updateTime,
        }).then((res) => {
            if (res.data.status == 200) {
                const ms = res.data.data.messages ?? [];
                if (isInitial) {
                    commit("SET_MESSAGES", { mk, ms });
                } else {
                    ms.reverse().forEach((item) => {
                        commit("UNSHIFT_MESSAGES", { mk, m: item });
                    });
                }
            } else {
                console.log("request error");
            }
        });
    },
    listGroup({ commit }) {
        get(GROUP_LIST_URL).then((res) => {
            if (res.data.status === 200) {
                commit("SET_CREATE_GROUPS", res.data.data.relations);
            }
        });
    },
    listRelation({ commit, getters }, { type, status, direction }) {
        get(RELATION_LIST_URL, {
            type,
            status,
            direction,
        })
            .then((res) => {
                if (res.data.status === 200 && res.data.data !== undefined) {
                    if (status === -1) {
                        // 加载申请
                        if (res.data.data.relations) {
                            getters
                                .getApplications(type, !direction)
                                .push(...res.data.data.relations);
                        }
                    } else {
                        // 加载联系人
                        if (direction === -1) {
                            // 好友关系
                            commit("SET_FRIENDS", res.data.data.relations);
                        } else if (direction === 0) {
                            // 加入群组关系
                            commit("SET_JOIN_GROUPS", res.data.data.relations);
                        }
                    }
                }
            })
            .catch((err) => console.error(err));
    },
};
