<template>
    <div class="top-bar">
        <el-tooltip effect="dark" :content="$t('toolBar.contact')" placement="left">
            <el-button class="tool-button" @click="loadContact">
                <i class="el-icon-user-solid"></i>
            </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('toolBar.application')" placement="left">
            <el-button class="tool-button" @click="loadVerification">
                <i class="el-icon-message-solid"></i>
            </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="ChatGPT" placement="left">
            <el-button class="tool-button" @click="openRightPanel"
                ><i class="el-icon-s-platform"></i
            ></el-button>
        </el-tooltip>
    </div>
</template>

<script>
export default {
    name: "ToolBarTop",
    data() {
        return {
            ChatGPT: {
                id: 0,
                name: "ChatGPT",
            },
        };
    },
    methods: {
        loadContact() {
            this.$bus.$emit("loadContact");
        },
        loadVerification() {
            this.$bus.$emit("loadVerification");
        },
        openRightPanel() {
            this.$store.state.toId = "ChatGPT";
            this.$bus.$emit("openRightPanel", true, this.ChatGPT, true);
        },
    },
};
</script>

<style scoped lang="scss">
.top-bar {
    .tool-button {
        background-color: #2e3238;
        border: none;
        width: 100%;
        margin: 0;
        margin: 5px 0;
    }
}
</style>
