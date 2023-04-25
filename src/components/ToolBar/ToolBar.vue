<template>
    <div id="toolbar">
        <div class="avatar">
            <el-avatar
                :src="user.avatarPath"
                @error="false"
                :size="45"
                alt="Avatar"
            >
                <img src="https://cdn.sxrekord.com/blog/logo.jpg" />
            </el-avatar>
        </div>
        <div class="bar">
            <ToolBarTop />
            <ToolBarBottom />
        </div>
    </div>
</template>

<script>
import ToolBarTop from "@/components/ToolBar/ToolBarTop";
import ToolBarBottom from "@/components/ToolBar/ToolBarBottom";

export default {
    name: "ToolBar",
    components: {
        ToolBarTop,
        ToolBarBottom,
    },
    data() {
        return {
            user: JSON.parse(window.sessionStorage.getItem("user")),
        };
    },
};
</script>

<style lang="scss" scoped>
#toolbar {
    height: 100%;
    background-color: var(--toolbar-bg-color);
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
    }
}
</style>
