import { post } from "@/service/request";
import { MESSAGE_LOAD_URL } from "@/config/api";

export default {
    loadMessage({}, {type, count, toId, updateTime}) {
        return post(MESSAGE_LOAD_URL, {
            type: type,
            count: count,
            toId: toId,
            updateTime: updateTime,
        });
    }
};