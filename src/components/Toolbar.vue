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
                    trigger="hover">
                    <div>
                        <el-switch
                            v-model="mode"
                            active-color="#13ce66"
                            inactive-color="#595b5d"
                            :active-text="currentMode">
                        </el-switch>
                        <div><el-button icon="el-icon-edit" class="pop-button"
                            @click="openDrawer"></el-button></div>
                        <div><el-button icon="el-icon-s-opportunity" class="pop-button"
                            @click="createGroup"></el-button></div>
                    </div>
                    <el-button class="tool-button" slot="reference"><i class="el-icon-s-tools"></i></el-button>
                </el-popover>
                <el-tooltip effect="dark" content="退出" placement="left">
                    <el-button class="tool-button" @click="exitSystem"><i class="el-icon-s-fold"></i></el-button>
                </el-tooltip>
            </div>
        </div>

        <!-- 个人信息抽屉结构 -->
        <el-drawer
            title="个人信息"
            :before-close="beforeCloseDrawer"
            :visible.sync="drawerSwitch"
            direction="ltr"
            ref="drawer">
            <div class="drawer-content">
                <div class="drawer-body">
                    <el-form :model="userInfo">
                        <!-- 头像 -->
                        <el-form-item label="头像：" label-width="60px">
                            <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="drawer-avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>

                        <el-form-item label="账号：" label-width="60px">
                            <el-input v-model="userInfo.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码：" prop="pass" label-width="60px">
                            <el-input type="password" v-model="userInfo.password" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="drawer-footer">
                    <el-button @click="cancelForm" class="drawer-button">取 消</el-button>
                    <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading"
                        class="drawer-button">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                </div>
            </div>
        </el-drawer>

        <!-- 创建群组抽屉结构 -->
        <el-drawer
            title="创建群组"
            :before-close="beforeCloseDrawer"
            :visible.sync="groupDrawerSwitch"
            direction="ltr"
            ref="groupDrawer">
            <div class="drawer-content">
                <div class="drawer-body">
                    <el-form :model="userInfo">
                        <!-- 头像 -->
                        <el-form-item label="头像：" label-width="60px">
                            <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="drawer-avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>

                        <el-form-item label="名称：" label-width="60px">
                            <el-input v-model="userInfo.name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="drawer-footer">
                    <el-button @click="cancelForm" class="drawer-button">取 消</el-button>
                    <el-button type="primary" @click="$refs.groupDrawer.closeDrawer()" :loading="loading"
                        class="drawer-button">{{ loading ? '创建中 ...' : '创 建' }}</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        name: 'Toolbar',
        data() {
            return {
                mode: false,
                drawerSwitch: false,
                groupDrawerSwitch: false,
                userInfo: {
                    name: '',
                    password: '',
                },
                loading: false,
                timer: null,
                imageUrl: '',
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
            openDrawer() {
                // 关闭右侧面板
                this.$bus.$emit('closeRightPanel')
                // 打开左侧抽屉
                this.drawerSwitch = true
            },
            createGroup() {
                // 关闭右侧面板
                this.$bus.$emit('closeRightPanel')
                // 打开左侧抽屉
                this.groupDrawerSwitch = true
            },
            beforeCloseDrawer(done) {
                if (this.loading) {
                    return;
                }
                this.$confirm('确定要提交表单吗？')
                    .then(_ => {
                    this.loading = true;
                    this.timer = setTimeout(() => {
                        done();
                        // 动画关闭需要一定的时间
                        setTimeout(() => {
                        this.loading = false;
                        }, 400);
                    }, 2000);
                    }, _ => {
                        this.cancelForm()
                    })
                    .catch(_ => {});
            },
            cancelForm() {
                this.loading = false;
                this.drawerSwitch = false;
                this.groupDrawerSwitch = false;
                clearTimeout(this.timer);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                console.log('before avatar upload')
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
            border-color: #409EFF;
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