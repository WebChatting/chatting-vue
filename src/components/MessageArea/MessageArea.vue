<template>
    <div id="display" ref="display" @scroll="scrollPanel">
        <ul>
            <li v-for="entry of messages" :key="entry.id">
                <p class="time">
                    <span>{{ entry.updateTime | timeFormater }}</span>
                </p>
                <div
                    class="message-structure"
                    :class="{ right: entry.fromId === user.id }"
                >
                    <el-avatar
                        class="avatar"
                        :src="entry.avatarPath"
                        @error="false"
                        shape="circle"
                        :size="30"
                        alt="Avatar"
                    >
                        <img
                            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                        />
                    </el-avatar>
                    <div class="message-body">
                        <div>
                            <div
                                v-if="isGroup && entry.fromId !== user.id"
                                class="name"
                                @click="openInfoDialog(entry)"
                            >
                                {{ entry.name }}
                            </div>
                        </div>
                        <div class="message">
                            <text-message :message="entry" />
                            <image-message :message="entry" />
                            <file-message :message="entry" />
                            <audio-message :message="entry" />
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <el-dialog title="基本信息" :visible.sync="dialogVisible" width="300px">
            <div class="priview-info">
                <el-image class="priview-avatar" :src="dialogAvatar"></el-image>
                <div class="priview-username ellipsis" :title="dialogName">
                    {{ dialogName }}
                </div>
            </div>
            <el-button type="primary" round class="priview-button"
                >加好友</el-button
            >
        </el-dialog>
    </div>
</template>

<script>
import date from "@/utils/date";
import { mapActions, mapGetters, mapState } from "vuex";
import FileMessage from "@/components/common/message/FileMessage";
import ImageMessage from "@/components/common/message/ImageMessage";
import TextMessage from "@/components/common/message/TextMessage";
import AudioMessage from "@/components/common/message/AudioMessage";

export default {
    name: "MessageArea",
    components: {
        FileMessage,
        ImageMessage,
        TextMessage,
        AudioMessage,
    },
    data() {
        return {
            dialogVisible: false,
            dialogUserId: 0,
            dialogAvatar: "",
            dialogName: "",
            user: JSON.parse(window.sessionStorage.getItem("user")),
        };
    },
    computed: {
        ...mapState(["isGroup", "toId"]),
        ...mapGetters(["messageKey"]),
        messages() {
            return this.$store.state.messages[this.messageKey];
        },
    },
    methods: {
        ...mapActions({ loadMessageAction: "loadMessage" }),
        scrollPanel() {
            if (this.$refs.display.scrollTop == 0) {
                this.loadFormerData();
            }
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const display = this.$refs.display;
                display.scrollTop = display.scrollHeight - display.clientHeight;
            });
        },
        openInfoDialog(message) {
            this.dialogVisible = true;
            this.dialogUserId = message.fromId;
            this.dialogAvatar = message.avatarPath;
            this.dialogName = message.name;
        },
        loadFormerData() {
            // 一次加载五条历史数据
            const messages = this.$store.state.messages[this.messageKey];
            if (messages && messages[0]) {
                this.loadMessage(
                    5,
                    date.wrapSendTime(messages[0].updateTime),
                    false
                );
            }
        },
        loadInitialData(count, updateTime) {
            console.log(this.messageKey);
            if (!this.$store.state.messages[this.messageKey]) {
                this.loadMessage(count, updateTime, true);
            }
        },
        loadMessage(count, updateTime, isInitial) {
            this.loadMessageAction({
                type: this.isGroup ? 1 : 0,
                count,
                toId: this.toId,
                updateTime: updateTime ? updateTime : date.getCurrentTime(),
                isInitial,
                mk: this.messageKey,
            });
        },
    },
    filters: {
        timeFormater(time) {
            return date.convertTime(time);
        },
    },
    mounted() {
        this.$bus.$on("scrollToBottom", this.scrollToBottom);
        this.$bus.$on("loadFormerData", this.loadFormerData);
        this.$bus.$on("loadInitialData", this.loadInitialData);
    },
    beforeDestroy() {
        // 解绑自定义事件
        this.$bus.$off("scrollToBottom");
        this.$bus.$off("loadFormerData");
        this.$bus.$off("loadInitialData");
    },
};
</script>

<style lang="scss" scoped>
#display {
    padding: 5px 0px 10px 8px;
    max-height: 453px;
    overflow-y: auto;
    ul {
        list-style-type: none;
        padding-left: 0px;
        li {
            margin-bottom: 10px;
            .time {
                text-align: center;
                margin: 0;
                > span {
                    display: inline-block;
                    padding: 0 18px;
                    font-size: 12px;
                    color: #fff;
                    background-color: #dcdcdc;
                    border-radius: 3px;
                }
            }
            .message-structure {
                display: -webkit-flex; /* Safari */
                display: flex;
                padding-top: 3px;
                .avatar {
                    margin: 0px 10px 3px;
                }
                .message-body {
                    max-width: 80%;
                    .name {
                        padding: 0px;
                        line-height: 15px;
                        height: 15px;
                        font-size: 10px;
                        color: grey;
                        cursor: pointer;
                        display: inline-block;
                    }
                }
            }
        }
    }
    .right {
        flex-direction: row-reverse;
    }
    .priview-info {
        display: flex;
        justify-content: space-around;
        .priview-avatar {
            width: 100px;
            border-radius: 50px;
        }
        .priview-username {
            font-size: 30px;
            height: 100px;
            line-height: 100px;
            width: 140px;
        }
    }
    .priview-button {
        width: 100%;
        margin-top: 12px;
        margin-bottom: -12px;
    }
}
</style>
