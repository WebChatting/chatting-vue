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
                        @click="openEditInfo"
                    ></el-button>
                </div>
                <div>
                    <el-button
                        icon="el-icon-s-opportunity"
                        class="pop-button"
                        @click="openCreateGroup"
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
                            简体中文<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(locale, index) in locales" :key="index" :command="locale.code">
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

        <!-- 个人信息抽屉结构 -->
        <el-drawer
            title="个人信息"
            :before-close="beforeCloseEditInfo"
            :visible.sync="userDrawerSwitch"
            direction="ltr"
            ref="drawer"
        >
            <div class="drawer-content">
                <div class="drawer-body">
                    <el-form :model="userInfo">
                        <!-- 头像 -->
                        <el-form-item label="头像：" label-width="60px">
                            <el-upload
                                class="avatar-uploader"
                                :action="file_upload_url"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img
                                    v-if="userInfo.avatarPath"
                                    :src="userInfo.avatarPath"
                                    class="drawer-avatar"
                                />
                                <i
                                    v-else
                                    class="el-icon-plus avatar-uploader-icon"
                                ></i>
                            </el-upload>
                        </el-form-item>

                        <el-form-item label="账号：" label-width="60px">
                            <el-input
                                v-model="userInfo.name"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="密码："
                            prop="pass"
                            label-width="60px"
                        >
                            <el-input
                                type="password"
                                v-model="userInfo.password"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="drawer-footer">
                    <el-button @click="cancelForm" class="drawer-button"
                        >取 消</el-button
                    >
                    <el-button
                        type="primary"
                        @click="$refs.drawer.closeDrawer()"
                        :loading="loading"
                        class="drawer-button"
                        >{{ loading ? "提交中 ..." : "确 定" }}</el-button
                    >
                </div>
            </div>
        </el-drawer>

        <!-- 创建群组抽屉结构 -->
        <el-drawer
            title="创建群组"
            :before-close="beforeCloseCreateGroup"
            :visible.sync="groupDrawerSwitch"
            direction="ltr"
            ref="groupDrawer"
        >
            <div class="drawer-content">
                <div class="drawer-body">
                    <el-form :model="groupInfo">
                        <!-- 头像 -->
                        <el-form-item label="头像：" label-width="60px">
                            <el-upload
                                class="avatar-uploader"
                                :action="file_upload_url"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img
                                    v-if="groupInfo.avatarPath"
                                    :src="groupInfo.avatarPath"
                                    class="drawer-avatar"
                                />
                                <i
                                    v-else
                                    class="el-icon-plus avatar-uploader-icon"
                                ></i>
                            </el-upload>
                        </el-form-item>

                        <el-form-item label="名称：" label-width="60px">
                            <el-input
                                v-model="groupInfo.name"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="drawer-footer">
                    <el-button @click="cancelForm" class="drawer-button"
                        >取 消</el-button
                    >
                    <el-button
                        type="primary"
                        @click="$refs.groupDrawer.closeDrawer()"
                        :loading="loading"
                        class="drawer-button"
                        >{{ loading ? "创建中 ..." : "创 建" }}</el-button
                    >
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { API_BASE_URL, FILE_UPLOAD_API_URL } from "@/config/api";
import locales from "@/locales";
export default {
    name: "ToolBarBottom",
    data() {
        return {
            file_upload_url: API_BASE_URL + FILE_UPLOAD_API_URL,
            userInfo: {},
            groupInfo: {
                avatarPath: "",
                name: "",
            },
            mode: false,
            userDrawerSwitch: false,
            groupDrawerSwitch: false,
            loading: false,
            timer: null,
            user: JSON.parse(window.sessionStorage.getItem("user")),
            locales,
        };
    },
    computed: {
        currentMode() {
            return this.mode ? "dark" : "light";
        },
    },
    methods: {
        handleCommand(lang) {
            this.$i18n.locale = lang;
            this.$router.go(0);
        },
        exitSystem() {
            window.sessionStorage.removeItem("user");
            window.location.href = "/";
        },
        openEditInfo() {
            // 自动填充数据
            this.userInfo = {
                avatarPath: this.user.avatarPath,
                name: this.user.username,
                password: this.user.password,
            };

            // 关闭右侧面板
            this.$bus.$emit("closeRightPanel");
            // 打开左侧抽屉
            this.userDrawerSwitch = true;
        },
        openCreateGroup() {
            // 关闭右侧面板
            this.$bus.$emit("closeRightPanel");
            // 打开左侧抽屉
            this.groupDrawerSwitch = true;
        },
        beforeCloseEditInfo(done) {
            this.beforeCloseDrawer(
                done,
                0,
                this.userInfo.avatarPath,
                this.userInfo.name,
                this.userInfo.password
            );
        },
        beforeCloseCreateGroup(done) {
            this.beforeCloseDrawer(
                done,
                1,
                this.groupInfo.avatarPath,
                this.groupInfo.name
            );
        },
        beforeCloseDrawer(done, type, avatarPath, name, password) {
            if (this.loading) {
                return;
            }
            this.$confirm("确定要提交表单吗？")
                .then(
                    () => {
                        this.loading = true;
                        console.log("before submit form");

                        this.$api
                            .updateUserOrAddGroup(
                                type,
                                avatarPath,
                                name,
                                password
                            )
                            .then((res) => {
                                if (res.data.status == 200) {
                                    console.log(res.data);
                                    if (password) {
                                        this.user.avatarPath = avatarPath;
                                        this.user.username = name;
                                        this.user.password = password;
                                        window.sessionStorage.setItem(
                                            "user",
                                            JSON.stringify(this.user)
                                        );
                                    }
                                } else {
                                    console.log("request error");
                                }
                            });

                        this.timer = setTimeout(() => {
                            done();
                            // 动画关闭需要一定的时间
                            setTimeout(() => {
                                this.loading = false;
                            }, 400);
                        }, 2000);
                    },
                    () => {
                        this.cancelForm();
                    }
                )
                .catch((_) => {
                    console.log(_);
                });
        },
        cancelForm() {
            this.loading = false;
            this.userDrawerSwitch = false;
            this.groupDrawerSwitch = false;
            clearTimeout(this.timer);
        },

        handleAvatarSuccess(res, file) {
            console.log(res, file);
            if (this.userDrawerSwitch) {
                this.userInfo.avatarPath = res.data.fileUrl;
            } else {
                this.groupInfo.avatarPath = res.data.fileUrl;
            }
        },
        beforeAvatarUpload() {
            console.log("before avatar upload");
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
.drawer-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    .drawer-body {
        .avatar-uploader {
            width: 178px;
            height: 178px;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            .drawer-avatar {
                width: 178px;
                height: 178px;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;
            }
        }
        .avatar-uploader:hover {
            border-color: #409eff;
        }
    }
    .drawer-footer {
        text-align: center;
        width: 90%;
        margin: 0 auto;
        .drawer-button {
            width: 48%;
        }
    }
}
</style>
