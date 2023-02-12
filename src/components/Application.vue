<template>
    <div id="application">
        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
            <li v-for="item in users" :key="item.id">
                <el-card class="box-card" body-style="padding: 10px;">
                    <div class="card">
                        <div>
                            <el-image
                                class="avatar"
                                :preview-src-list="[item.userProfile]"
                                :src="item.userProfile"
                                :alt="item.nickname"
                            >
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                            <p class="name">{{ item.nickname }}</p>
                        </div>
                        <el-button-group>
                            <el-button size="mini" class="button">同意</el-button>
                            <el-button size="mini" class="button">拒绝</el-button>
                        </el-button-group>
                    </div>
                </el-card>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Application",
    data() {
        return {
            users: this.$store.state.friendList,
        };
    },
    methods: {
        load() {

        },
    },
}
</script>

<style lang="scss" scoped>
#application {
    ul {
        padding: 0px;
        margin: 0px;
        li {
            list-style: none;
            .card {
                display: flex;
                justify-content: space-between;
                .avatar {
                    width: 30px;
                    height: 30px;
                    vertical-align: middle;
                    border-radius: 15px;
                }
                .name {
                    display: inline-block;
                    margin: 0px 0px 0px 8px;
                }
                .button {
                    padding: 0px;
                    width: 42px;
                    height: 30px;
                }
            }
        }
    }
}
</style>