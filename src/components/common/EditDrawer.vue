<template>
    <el-drawer
        :title="isUser ? $t('toolBar.userDrawerTitle') : $t('toolBar.groupDrawerTitle')"
        :before-close="beforeClose"
        :visible.sync="swt.val"
        direction="ltr"
        ref="drawer"
    >
        <div class="drawer-content">
            <div class="drawer-body">
                <el-form :model="formData">
                    <!-- 头像 -->
                    <el-form-item label="头像：" label-width="60px">
                        <el-upload
                            class="avatar-uploader"
                            :action="fileUploadUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img
                                v-if="formData.avatarPath"
                                :src="formData.avatarPath"
                                class="drawer-avatar"
                            />
                            <i
                                v-else
                                class="el-icon-plus avatar-uploader-icon"
                            ></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item
                        :label="isUser ? '账号' : '名称' + '：'"
                        label-width="60px"
                    >
                        <el-input
                            v-model="formData.name"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>

                    <!-- 密码 -->
                    <el-form-item
                        label="密码："
                        prop="pass"
                        label-width="60px"
                        v-if="isUser"
                    >
                        <el-input
                            type="password"
                            v-model="formData.password"
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
                    :loading="loading"
                    @click="$refs.drawer.closeDrawer()"
                    class="drawer-button"
                >
                    {{
                        loading
                            ? !isUser
                                ? "创建中..."
                                : "提交中..."
                            : !isUser
                            ? "创建"
                            : "确 定"
                    }}
                </el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import { API_BASE_URL, FILE_UPLOAD_API_URL } from "@/config/api";
export default {
    name: "EditDrawer",
    props: {
        isUser: Boolean,
        drawerSwitch: Object,
    },
    data() {
        return {
            fileUploadUrl: API_BASE_URL + FILE_UPLOAD_API_URL,
            loading: false,
            timer: null,
            user: JSON.parse(window.sessionStorage.getItem("user")),
            formData: {},
            swt: this.drawerSwitch
        };
    },
    watch: {
        "drawerSwitch.val": function (newVal) {
            if (newVal === true) {
                this.formData = this.isUser
                    ? {
                          avatarPath: this.user.avatarPath,
                          name: this.user.username,
                          password: this.user.password,
                      }
                    : {
                          avatarPath: "",
                          name: "",
                      };
            }
        },
    },
    methods: {
        beforeClose(done) {
            this.beforeCloseDrawer(
                done,
                this.isUser ? 0 : 1,
                this.formData.avatarPath,
                this.formData.name,
                this.formData.password
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
            this.swt.val = false;
            clearTimeout(this.timer);
        },
        handleAvatarSuccess(res, file) {
            console.log(res, file);
            this.formData.avatarPath = res.data.fileUrl;
        },
        beforeAvatarUpload() {
            console.log("before avatar upload");
        },
    },
};
</script>

<style scoped lang="scss">
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
