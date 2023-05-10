<template>
    <el-dialog title="设置" :visible.sync="swt.val" width="50%" :before-close="saveConfig">
        <el-tabs v-model="activeTab">
            <el-tab-pane label="通用设置" name="general">
                <div class="setting-list">
                    <div class="setting-item">
                        <div class="item-key">openai-api</div>
                        <div class="item-value">
                            <el-input class="input" size="small" v-model="openaiAPI"></el-input>
                        </div>
                    </div>
                    <div class="setting-item">
                        <div class="item-key">openai-key</div>
                        <div class="item-value">
                            <el-input class="input" size="small" v-model="openaiKEY" show-password></el-input>
                        </div>
                    </div>
                    <div class="setting-item">
                        <div class="item-key">聊天记录</div>
                        <div class="item-value">
                            <el-button class="button">导出 </el-button>
                            <el-button class="button">导入</el-button>
                            <el-button class="button">清空</el-button>
                        </div>
                    </div>
                    <div class="setting-item">
                        <div class="item-key">重置设置</div>
                        <div class="item-value">
                            <el-button class="button">重置</el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="项目信息" name="information">
                <div class="setting-list">
                    <div class="setting-item">
                        <div class="item-key">作者</div>
                        <div class="item-value">
                            <a
                                href="https://github.com/Crazyokd"
                                target="_blank"
                                >Rekord</a
                            >
                            &nbsp;&amp;&nbsp;
                            <a
                                href="https://github.com/jaxvanyang"
                                target="_blank"
                                >Jax</a
                            >
                        </div>
                    </div>
                    <div class="setting-item">
                        <div class="item-key">前端</div>
                        <div class="item-value">
                            <a
                                href="https://github.com/WebChatting/chatting-vue"
                                target="_blank"
                                >https://github.com/WebChatting/chatting-vue</a
                            >
                        </div>
                    </div>
                    <div class="setting-item">
                        <div class="item-key">后端</div>
                        <div class="item-value">
                            <a
                                href="https://github.com/WebChatting/chatting"
                                target="_blank"
                                >https://github.com/WebChatting/chatting</a
                            >
                        </div>
                    </div>
                    <div class="setting-item">
                        <div class="item-key">API</div>
                        <div class="item-value">
                            <a @click.stop="showAPI" href="#">API</a>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script>
import {API_BASE_PORT, API_BASE_URL, API_DOC_URL} from "@/config/api";
import { saveConfig } from '@/utils/common';
export default {
    name: "SettingPanel",
    props: {
        settingPanelSwitch: Object,
    },
    data() {
        return {
            swt: this.settingPanelSwitch,
            activeTab: "general",
            openaiAPI: window.localStorage.getItem("openai-api"),
            openaiKEY: window.localStorage.getItem("openai-key"),
        };
    },
    methods: {
        showAPI() {
            window.open(window.location.protocol + "//" + window.location.hostname + ":" + API_BASE_PORT + API_BASE_URL + API_DOC_URL)
        },
        saveConfig(done) {
            saveConfig(this.openaiAPI, this.openaiKEY)
            done();
        },
    },
};
</script>

<style scoped lang="scss">
.setting-list {
    display: flex;
    flex-direction: column;
    .setting-item {
        display: flex;
        height: 30px;
        margin: 5px 0;
        .item-key {
            width: 20%;
            display: flex;
            align-items: center;
            margin-left: 20px;
        }
        .item-value {
            width: 80%;
            display: flex;
            align-items: center;
            .button {
                margin-right: 10px;
                padding: 0 10px;
                height: 30px;
            }
        }
    }
}
</style>
