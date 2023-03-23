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
                            <div v-if="entry.contentType == 0" class="text">
                                {{ entry.content }}
                            </div>
                            <el-image
                                v-if="entry.contentType == 1"
                                class="image"
                                :src="entry.content"
                                :preview-src-list="[entry.content]"
                            >
                            </el-image>
                            <div
                                class="file"
                                v-if="entry.contentType == 2"
                                @click="downloadFile(entry.url)"
                            >
                                <div class="file-icon">
                                    <i class="el-icon-folder"></i>
                                </div>
                                <div class="file-info ellipsis">
                                    {{ entry.content }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <el-dialog title="基本信息" :visible.sync="dialogVisible" width="300px">
            <div class="priview-info">
                <el-image class="priview-avatar" :src="dialogAvatar"></el-image>
                <div class="priview-username ellipsis">{{ dialogName }}</div>
            </div>
            <el-button type="primary" round class="priview-button"
                >加好友</el-button
            >
        </el-dialog>
    </div>
</template>

<script>
import { post } from "@/service/request";
import date from "@/utils/date";
export default {
    name: "MessageArea",
    data() {
        return {
            dialogVisible: false,
            dialogUserId: 0,
            dialogAvatar: "",
            dialogName: "",
            user: JSON.parse(window.sessionStorage.getItem("user")),
            isGroup: false,
            toId: -1,
        };
    },
    computed: {
        messages() {
            return this.$store.state.messages[this.messageKey];
        },
        messageKey() {
            return (this.isGroup ? "group" : "user") + this.toId;
        },
    },
    methods: {
        scrollPanel() {
            if (this.$refs.display.scrollTop == 0) {
                this.loadFormerData();
            }
        },
        scrollToBottom() {
            const display = this.$refs.display;
            display.scrollTop = display.scrollHeight - display.clientHeight;
        },
        openInfoDialog(message) {
            this.dialogVisible = true;
            this.dialogUserId = message.fromId;
            this.dialogAvatar = message.avatarPath;
            this.dialogName = message.name;
        },
        downloadFile(path) {
            window.open(path);
        },
        loadFormerData() {
            // 一次加载五条历史数据
            const messages = this.$store.state.messages[this.messageKey];
            if (messages && messages[0]) {
                this.loadMessage(
                    5,
                    messages[0].updateTime
                        ? date.wrapSendTime(messages[0].updateTime)
                        : date.getCurrentTime(),
                    false
                );
            }
        },
        loadInitialData(isGroup, toId, count, updateTime) {
            this.isGroup = isGroup;
            this.toId = toId;
            this.$nextTick(() => {
                console.log(this.messageKey);
                if (!this.$store.state.messages[this.messageKey]) {
                    this.loadMessage(count, updateTime, true);
                }
            });
        },
        loadMessage(count, updateTime, isInitial) {
            post("/message/load", {
                type: this.isGroup ? 1 : 0,
                count: count,
                toId: this.toId,
                updateTime: updateTime ? updateTime : date.getCurrentTime(),
            }).then((response) => {
                if (response.data.status == 200) {
                    const messages = response.data.data.messages ?? [];
                    if (isInitial) {
                        this.$set(
                            this.$store.state.messages,
                            this.messageKey,
                            messages
                        );
                    } else {
                        messages.reverse().forEach((item) => {
                            this.$store.state.messages[this.messageKey].unshift(
                                item
                            );
                        });
                    }
                } else {
                    console.log("request error");
                }
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
                    .message {
                        .text {
                            margin: 0px;
                            display: inline-block;
                            padding: 0 10px;
                            background-color: #fafafa;
                            border-radius: 8px;
                            line-height: 30px;
                        }
                        .image {
                            width: 150px;
                            height: 150px;
                            border-radius: 8px;
                        }
                        .file {
                            width: 180px;
                            height: 60px;
                            display: flex;
                            line-height: 60px;
                            border: solid #b4b4b4;
                            border-radius: 5px;
                            cursor: pointer;
                            .file-icon {
                                font-size: 300%;
                                margin: 0px 5px;
                            }
                            .file-info {
                                width: 120px;
                                height: 60px;
                            }
                        }
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
