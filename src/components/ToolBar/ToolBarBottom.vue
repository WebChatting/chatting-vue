<template>
    <div class="bottom-bar">
        <el-popover placement="left" trigger="hover">
            <div>
                <el-switch
                    v-model="mode"
                    active-color="#13ce66"
                    inactive-color="#595b5d"
                    :active-text="currentMode"
                >
                </el-switch>
                <div>
                    <el-button
                        icon="el-icon-edit"
                        class="pop-button"
                        @click="openDrawer(0)"
                    ></el-button>
                </div>
                <div>
                    <el-button
                        icon="el-icon-s-opportunity"
                        class="pop-button"
                        @click="openDrawer(1)"
                    ></el-button>
                </div>
                <div>
                    <el-button
                        icon="el-icon-question"
                        class="pop-button"
                    ></el-button>
                </div>
                <div>
                    <el-dropdown @command="handleCommand" trigger="click">
                        <span class="el-dropdown-link">
                            {{ locales[currentLocale].name
                            }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                                v-for="(locale, index) in locales"
                                :key="index"
                                :command="locale.code"
                            >
                                {{ locale.name }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <el-button class="tool-button" slot="reference"
                ><i class="el-icon-s-tools"></i
            ></el-button>
        </el-popover>
        <el-tooltip effect="dark" content="退出" placement="left">
            <el-button class="tool-button" @click="exitSystem"
                ><i class="el-icon-s-fold"></i
            ></el-button>
        </el-tooltip>

        <!-- 编辑用户信息抽屉 -->
        <edit-drawer :isUser="true" :drawerSwitch="userDrawerSwitch" />

        <!-- 创建群组抽屉 -->
        <edit-drawer :isUser="false" :drawerSwitch="groupDrawerSwitch" />
    </div>
</template>

<script>
import EditDrawer from "@/components/common/EditDrawer";
import locales from "@/locales";
import i18nMixin from "@/mixins/i18nMixin";
import switchTheme from "@/utils/theme";
export default {
    name: "ToolBarBottom",
    mixins: [i18nMixin],
    components: {
        EditDrawer,
    },
    data() {
        return {
            mode: false,
            locales,
            userDrawerSwitch: { val: false },
            groupDrawerSwitch: { val: false },
        };
    },
    watch: {
        mode: function () {
            switchTheme(this.currentMode);
        },
    },
    computed: {
        currentMode() {
            return this.mode ? "dark" : "light";
        },
    },
    methods: {
        handleCommand(lang) {
            this.$i18n.locale = lang;
        },
        exitSystem() {
            window.sessionStorage.removeItem("user");
            window.location.href = "/";
        },
        openDrawer(type) {
            // 关闭右侧面板
            this.$bus.$emit("closeRightPanel");
            if (type === 0) {
                this.userDrawerSwitch.val = true;
            } else {
                this.groupDrawerSwitch.val = true;
            }
        },
    },
};
</script>

<style scoped lang="scss">
.bottom-bar {
    .tool-button {
        background-color: #2e3238;
        border: none;
        width: 100%;
        margin: 0;
        margin: 5px 0;
    }
}
.pop-button {
    border: none;
    padding: 0;
    width: 40px;
    font-size: 140%;
    margin-top: 5px;
}
</style>
