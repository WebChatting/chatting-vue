import dayjs from "dayjs";
export default {
    getCurrentTime: () => {
        return dayjs().add(8, "h").format("YYYY-MM-DD HH:mm:ss");
    },
    convertTime: (time) => {
        return dayjs(time).add(-8, "h").format("YYYY-MM-DD HH:mm:ss");
    },
    wrapSendTime: (time) => {
        return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    },
};
