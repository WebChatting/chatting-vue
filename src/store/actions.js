import { post } from "@/service/request";
import { MESSAGE_LOAD_URL } from "@/config/api";

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
};
