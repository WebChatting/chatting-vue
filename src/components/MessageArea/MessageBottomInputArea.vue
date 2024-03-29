<template>
    <div id="textinput">
        <div class="richtext">
            <el-popover placement="top-start" width="400" trigger="click">
                <div class="emotionList">
                    <a
                        href="javascript:void(0);"
                        class="emotionItem"
                        v-for="(item, index) in emojiList"
                        :key="index"
                        @click="addToMessage(item)"
                    >
                        {{ item }}
                    </a>
                </div>
                <el-button class="extend-button" slot="reference">
                    <i class="el-icon-star-on"></i>
                </el-button>
            </el-popover>
            <el-upload
                :action="file_upload_url"
                :before-upload="beforeImageUpload"
                :on-success="uploadImageSuccess"
                :on-error="uploadError"
                :show-file-list="false"
                accept=".jpg,.jpeg,.png,.JPG,JPEG,.PNG,.gif,.GIF"
            >
                <el-button
                    class="extend-button"
                    icon="el-icon-picture-outline-round"
                ></el-button>
            </el-upload>
            <el-upload
                :action="file_upload_url"
                :on-success="uploadFileSuccess"
                :on-error="uploadError"
                :show-file-list="false"
                :multiple="false"
            >
                <el-button
                    class="extend-button"
                    icon="el-icon-upload"
                ></el-button>
            </el-upload>
            <el-button
                class="extend-button"
                icon="el-icon-time"
                @click="loadFormerData"
            ></el-button>
            <el-button class="extend-button" icon="el-icon-more"></el-button>
        </div>
        <textarea
            id="textarea"
            :placeholder="$t('messageArea.sendPrompt')"
            v-model="content"
            @keyup.ctrl.enter="sendMessage(0)"
        >
        </textarea>
        <el-button
            id="sendBtn"
            type="primary"
            size="mini"
            @click="sendMessage(0)"
            >{{ $t('messageArea.sendButton') }}</el-button
        >
    </div>
</template>

<script>
const emojiData = require("@/assets/emoji.json");
import { mapGetters, mapState } from "vuex";
import { messageType2wsType } from "@/utils/common";
import { API_BASE_URL, FILE_UPLOAD_API_URL } from "@/config/api";
import date from "@/utils/date";
export default {
    name: "MessageBottomInputArea",
    data() {
        return {
            content: "",
            emojiList: [],
            emojiCounter: 40,
            user: JSON.parse(window.sessionStorage.getItem("user")),
            file_upload_url: API_BASE_URL + FILE_UPLOAD_API_URL,
        };
    },
    computed: {
        ...mapState(['socket', 'isGroup', 'toId', 'messages']),
        ...mapGetters(['messageKey']),
    },
    methods: {
        loadFormerData() {
            this.$bus.$emit("loadFormerData");
        },
        addToMessage(item) {
            this.content += item;
        },
        async sendMessage(contentType, url, size) {
            if (contentType == 0 && this.content.trim().length <= 0) {
                this.$message.error("发送信息不能为空");
                return;
            }

            this.buildAndPushMessage(this.user.id, this.toId, this.user.avatarPath,
                this.user.username, contentType, this.content, url, size, this.messageKey, this.messageKey != "ChatGPT");
            if (this.messageKey === "ChatGPT") {
                const replay = await this.$api.generateResponse(this.content);
                this.buildAndPushMessage(0, this.user.id, 'avatar/openai.png', 'ChatGPT', contentType,
                    replay, '', '', this.messageKey, false);
            }
        },
        buildAndPushMessage(fromId, toId, avatarPath, name, contentType, content, url, size, mk, isSendToBackend) {
            let new_message = {
                id:
                    10000 +
                    this.messages[mk].length +
                    1,
                fromId,
                toId,
                avatarPath,
                name,
                ws_type: messageType2wsType(contentType, this.isGroup),
                contentType,
                updateTime: date.getCurrentTime(),
                content,
                url,
                size,
            }
            // 更新消息
            this.messages[mk].push(new_message);

            if (isSendToBackend) {
                // 发送消息至后端
                this.socket.send(new_message);
            }
            this.$nextTick(() => {
                if (fromId === this.user.id) {
                    // 清空输入框
                    this.content = "";
                }
                // 将滚动条滑动至底部
                this.$bus.$emit("scrollToBottom");
            });
        },
        beforeImageUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error("上传图片大小不能超过 2MB!");
            }
        },
        uploadImageSuccess(res, file) {
            this.$message.success("上传图片成功!");
            console.log("success", res, file);
            this.content = res.data.fileUrl;
            this.sendMessage(1);
        },
        uploadFileSuccess(res, file) {
            this.$message.success("上传文件成功!");
            console.log("success", res, file);
            this.content = file.name;
            this.sendMessage(2, res.data.fileUrl, res.data.fileSize);
        },
        uploadError() {
            this.$message.error("上传失败!");
        },
    },
    mounted() {
        // 加载指定数量的emoji
        for (let i in emojiData) {
            if (i == this.emojiCounter) {
                break;
            }
            this.emojiList.push(emojiData[i].char);
        }
    },
};
</script>

<style lang="scss" scoped>
#textinput {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 20%;
    border: solid 1px #ddd;
    background-color: white;
    .richtext {
        display: -webkit-flex; /* Safari */
        display: flex;
        .extend-button {
            padding: 8px 10px 0;
            border: none;
            background-color: white;
        }
    }
    > textarea {
        padding: 10px;
        width: 95%;
        height: 30%;
        border: none;
        outline: none;
        resize: none; // 禁止拉伸
    }
    #sendBtn {
        float: right;
        margin-right: 10px;
    }
}
.emotionList {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
}
.emotionItem {
    width: 10%;
    font-size: 20px;
    text-align: center;
    text-decoration: none;
}
/*正常的未被访问过的链接*/
.emotionItem:link {
    text-decoration: none;
}
/*已经访问过的链接*/
.emotionItem:visited {
    text-decoration: none;
}
/*鼠标划过(停留)的链接*/
.emotionItem:hover {
    text-decoration: none;
}
/* 正在点击的链接*/
.emotionItem:active {
    text-decoration: none;
}
</style>
