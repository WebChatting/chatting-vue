<template>
    <div id="application">
        <div class="top">
            <el-collapse class="collapse-item">
                <el-collapse-item>
                    <template slot="title">
                        <div class="title">我发起的</div>
                    </template>
                    <ApplicationList/>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <div class="title">我收到的</div>
                    </template>
                    <ApplicationList/>
                </el-collapse-item>
            </el-collapse>
        </div>

        <div class="bottom-bar">
            <div @click="clearProcessed"><i class="el-icon-delete"></i></div>
        </div>
    </div>
</template>

<script>
import ApplicationList from "./ApplicationList";
export default {
    name: "Application",
    components: {
        ApplicationList,
    },
    methods: {
        clearProcessed() {
            this.$confirm('此操作将清理所有已处理的好友或群组申请记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 移除已处理的申请记录
                this.users = this.users.filter(item => item.status == 0)
                this.$message({
                    type: 'success',
                    message: '清理成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消清理'
                });
            });
        },
    },
}
</script>

<style lang="scss" scoped>
#application {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 540px;
    .top {
        overflow-y: auto;
        max-height: 520px;
    }
    .bottom-bar {
        text-align: right;
        padding-right: 20px;
        border-top: 1px solid #a09f9f;
        div {
            display: inline;
            cursor: pointer;
        }
        div:hover {
            color: #f78989
        }
    }
    .collapse-item {
        overflow-y: hidden;
        .title {
            padding-left: 5px;
        }
        ul {
            margin-bottom: 0px;
        }
    }
}
</style>