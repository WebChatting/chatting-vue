<template>
  <div id="textinput">
    <div class="richtext">
        <el-popover placement="top-start" width="400" trigger="click">
            <div class="emotionList">
                <a href="javascript:void(0);" class="emotionItem"
                    v-for="(item, index) in emojiList" :key="index"
                    @click="addToMessage(item)">
                    {{item}}
                </a>
            </div>
            <el-button class="extend-button" slot="reference">
                <i class="el-icon-star-on"></i>
            </el-button>
        </el-popover>
        <el-upload
                action="/chatting/upload"
                :before-upload="beforeAvatarUpload"
                :on-success="uploadImageSuccess"
                :on-error="uploadImageError"
                :show-file-list="false"
                accept=".jpg,.jpeg,.png,.JPG,JPEG,.PNG,.gif,.GIF"
                >
            <el-button class="extend-button" icon="el-icon-picture-outline-round"></el-button>
        </el-upload>
        <el-upload
                action="/chatting/upload"
                :before-upload="beforeFileUpload"
                :on-success="uploadFileSuccess"
                :on-error="uploadFileError"
                :show-file-list="false"
                :multiple="false"
                >
            <el-button class="extend-button" icon="el-icon-upload"></el-button>
        </el-upload>
        <el-button class="extend-button" icon="el-icon-time"
            @click="loadFormerData"></el-button>
        <el-button class="extend-button" icon="el-icon-more"></el-button>
    </div>
    <textarea id="textarea" placeholder="按 Ctrl + Enter 发送"
        v-model="content" @keyup.ctrl.enter="sendMessage(0)">
    </textarea>
    <el-button id="sendBtn" type="primary" size="mini"
        @click="sendMessage(0)">发送(S)</el-button>
  </div>
</template>

<script>
    const emojiData = require('../assets/emoji.json')
    export default {
        name: "MessageBottomInputArea",
        data() {
            return {
                content: '',
                emojiList: [],
                emojiCounter: 40,
                user: JSON.parse(window.sessionStorage.getItem("user")),
            }
        },
        props: {
            'isGroup': Boolean,
        },
        computed: {
            messageKey() {
                return (this.isGroup ? "group" : "user") + this.$store.state.toId
            },
        },
        methods: {
            loadFormerData() {
                this.$bus.$emit('loadFormerData')
            },
            addToMessage(item) {
                this.content += item
            },
            sendMessage(contentType, url, size) {
                if (contentType == 0 && this.content.trim().length <= 0) {
                    this.$message.error('发送信息不能为空')
                    return
                }

                // 更新消息
                this.$nextTick(() => {
                    this.$store.state.messages[this.messageKey].push({
                        id: 10000 + this.$store.state.messages[this.messageKey].length + 1,
                        fromId: this.user.id,
                        name: 'rekord',
                        avatarPath: 'https://cdn.sxrekord.com/blog/logo.jpg',
                        contentType: contentType,
                        content: this.content,
                        url: url,
                    })
                })


                // 发送消息至后端
                this.$store.state.socket.send({
                    fromId: this.user.id,
                    toId: this.$store.state.toId,
                    ws_type: contentType + 3 + this.isGroup,
                    content: this.content,
                    size: size,
                })

                this.$nextTick(() => {
                    // 清空输入框
                    if (contentType == 0) {
                        this.content = ''
                    }
                    // 将滚动条滑动至底部
                    this.$bus.$emit('scrollToBottom')
                })
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
            },
            uploadImageSuccess(res, file) {
                this.$message.success('上传图片成功!')
                console.log('success', res, file)
                this.content = res.data.fileUrl
                this.sendMessage(1)
            },
            uploadImageError(res, file) {
                this.$message.error('上传图片失败!')
            },
            beforeFileUpload(file) {

            },
            uploadFileSuccess(res, file) {
                this.$message.success('上传文件成功!')
                console.log('success', res, file)
                this.content = file.name
                this.sendMessage(2, res.data.fileUrl, res.data.fileSize)
            },
            uploadFileError(res, file) {
                this.$message.error('上传文件失败!')
            },
        },
        mounted() {
            // 加载指定数量的emoji
            for (let i in emojiData) {
                if (i == this.emojiCounter) {
                    break;
                }
                this.emojiList.push(emojiData[i].char)
            }
        },
    }
</script>

<style lang="scss" scoped>
    #textinput {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 20%;
        border: solid 1px #DDD;
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