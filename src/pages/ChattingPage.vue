<template>
    <div id="app" ref="app">
        <div class="toolbar">
            <ToolBar />
        </div>
        <div class="sidebar">
            <NavigationTopSearchBar />
            <NavigationZone />
        </div>
        <div class="main">
            <div v-show="isChatPanel">
                <MessageTopTitle
                    :chatObject="chatObject ? chatObject.name : ''"
                />
                <MessageArea />
                <MessageBottomInputArea />
            </div>
            <div v-show="!isChatPanel">
                <SearchArea />
            </div>
        </div>
    </div>
</template>

<script>
import ToolBar from "@/components/ToolBar/ToolBar";
import NavigationTopSearchBar from "@/components/NavigationZone/NavigationTopSearchBar";
import NavigationZone from "@/components/NavigationZone/NavigationZone";
import MessageTopTitle from "@/components/MessageArea/MessageTopTitle";
import MessageArea from "@/components/MessageArea/MessageArea";
import MessageBottomInputArea from "@/components/MessageArea/MessageBottomInputArea";
import SearchArea from "@/components/SearchArea/SearchArea";

import socketMixin from "@/mixins/socketMixin";
export default {
    name: "ChattingPage",
    mixins: [socketMixin],
    components: {
        ToolBar,
        NavigationTopSearchBar,
        NavigationZone,
        MessageTopTitle,
        MessageArea,
        MessageBottomInputArea,
        SearchArea,
    },
    data() {
        return {
            isChatPanel: true,
            chatObject: {
                id: -1,
            },
        };
    },
    methods: {
        openRightPanel(isChatPanel = true, chatObject, isChatGPT = false) {
            this.isChatPanel = isChatPanel;
            this.chatObject = chatObject;
            this.$store.state.isChatGPT = isChatGPT;
            this.$refs.app.style.width = 900 + "px";
            this.$bus.$emit("scrollToBottom");
        },
        closeRightPanel() {
            this.$refs.app.style.width = 300 + "px";
        },
    },
    mounted() {
        this.$bus.$on("openRightPanel", this.openRightPanel);
        this.$bus.$on("closeRightPanel", this.closeRightPanel);
    },
    beforeDestroy() {
        // 解绑自定义事件
        this.$bus.$off("openRightPanel");
        this.$bus.$off("closeRightPanel");
    },
};
</script>

<style lang="scss" scoped>
#app {
    margin: 20px auto;
    width: 300px;
    height: 650px;
    overflow: hidden;
    border-radius: 10px;

    .sidebar,
    .main,
    .toolbar {
        height: 100%;
    }
    .toolbar {
        float: left;
        color: #f4f4f4;
        background-color: #2e3238;
        width: 60px;
    }
    .sidebar {
        float: left;
        color: #000000;
        background-color: #eceae8;
        width: 240px;
    }
    .main {
        position: relative;
        overflow: hidden;
        background-color: #eee;
    }
}
</style>
