import { wsType2messageType, wsType2type } from "@/utils/common";

export default {
    mounted() {
        this.$store.state.socket.receive = (message) => {
            let m = JSON.parse(message.data);
            if (m.ws_type > 2 && m.ws_type < 9) {
                this.$notify({
                    title: "new message",
                    message: m.content,
                });
                m["contentType"] = wsType2messageType(m.ws_type);
                this.$store.state.messages[wsType2type(m)].push(m);
                this.$bus.$emit("scrollToBottom");
            }
        };
    },
};
