<template>
    <div></div>
</template>

<script>
import { wsType2messageType } from "@/utils/common";
export default {
    name: "InitFunction",
    mounted() {
        this.$store.state.socket.receive = (message) => {
            let m = JSON.parse(message.data);
            if (m.ws_type > 2 && m.ws_type < 9) {
                this.$notify({
                    title: "new message",
                    message: m.content,
                });
                m["contentType"] = wsType2messageType(m.ws_type);
                this.$store.state.messages["user" + m.fromId].push(m);
                this.$bus.$emit("scrollToBottom");
            }
        };
    },
};
</script>
