<template>
    <div id="toolbar">
        <div class="avatar">
            <el-avatar src="https://cdn.sxrekord.com/blog/logo.jpg"
                @error="false" :size="45" alt="Avatar">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
        </div>
        <div class="bar">
            <div class="top-bar">
                <el-tooltip effect="dark" content="联系人" placement="left">
                    <el-button class="tool-button"
                        @click="loadContact">
                        <i class="el-icon-user-solid"></i>
                    </el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="验证" placement="left">
                    <el-button class="tool-button"
                        @click="loadVerification">
                        <i class="el-icon-message-solid"></i>
                    </el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="ChatGPT" placement="left">
                    <el-button class="tool-button"><i class="el-icon-s-platform"></i></el-button>
                </el-tooltip>
            </div>
            <div class="bottom-bar">
                <el-popover
                    placement="left"
                    width="100"
                    trigger="hover">
                    <el-switch
                        v-model="mode"
                        active-color="#13ce66"
                        inactive-color="#595b5d"
                        :active-text="currentMode">
                    </el-switch>
                    <el-button class="tool-button" slot="reference"><i class="el-icon-s-tools"></i></el-button>
                </el-popover>
                <el-tooltip effect="dark" content="退出" placement="right">
                    <el-button class="tool-button" @click="exitSystem"><i class="el-icon-s-fold"></i></el-button>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Toolbar',
        data() {
            return {
                mode: false,
            }
        },
        computed: {
            currentMode() {
                return this.mode ? 'dark' : 'light'
            },
        },
        methods: {
            loadContact() {
                this.$bus.$emit('loadContact')
            },
            loadVerification() {
                this.$bus.$emit('loadVerification')
            },
            // 退出系统
            exitSystem() {
                window.location.href = "/"
            },
        },
    }
</script>

<style lang="scss" scoped>
  #toolbar {
    height: 100%;
    background-color: #2e3238;
    .avatar {
        text-align: center;
        height: 45px;
        margin-top: 5px;
    }
    .bar {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 550px;
        margin-top: 50px;
        .tool-button {
            background-color: #2e3238;
            border: none;
            width: 100%;
            margin: 0;
            margin: 5px 0;
        }
    }
  }
</style>