<template>
    <ul>
        <li
            v-for="(item, index) in relations"
            :key="item.id"
            @dblclick="openRightPanel(item)"
        >
            <div style="display: flex; justify-content: space-between">
                <div>
                    <el-badge :is-dot="true" :value="2">
                        <el-image
                            :class="{ grayscale: !item.online }"
                            class="avatar"
                            :preview-src-list="[item.avatar]"
                            :src="item.avatarPath"
                            :alt="item.name"
                        >
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </el-badge>
                    <p class="name ellipsis" :title="item.name">
                        {{ item.name }}
                    </p>
                </div>
                <div class="delete-button" @click="deleteContact(item, index)">
                    <i class="el-icon-delete"></i>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import { post } from "@/service/request";
export default {
    name: "RelationList",
    props: {
        isGroup: {
            type: Boolean,
            required: false,
            default: true,
        },
        isCreated: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        relations: function () {
            return this.$store.getters.getRelations(
                this.isGroup,
                this.isCreated
            );
        },
    },
    methods: {
        openRightPanel(chatObject) {
            this.$store.state.isGroup = this.isGroup;
            this.$store.state.toId = chatObject.id;
            this.$bus.$emit("openRightPanel", true, chatObject);
            this.$bus.$emit("loadInitialData", this.isGroup, chatObject.id, 5);
        },
        deleteContact(item, index) {
            this.$confirm("此操作将永久删除该好友/群组, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.relations.splice(index, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                    // 异步后端同步
                    post("/relation/update", null, {
                        requestId: 0,
                        acceptId: item.id,
                        type: item.type,
                        status: 3,
                    }).then((res) => {
                        if (res.data.status == 200) {
                            console.log("删除成功");
                        } else {
                            console.log("network error");
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
    },
};
</script>

<style scoped lang="scss">
ul {
    padding: 0px;
    margin: 0 2px 16px 4px;
    li {
        padding: 12px 0px;
        list-style: none;
        cursor: pointer;
        &:hover {
            background-color: #d8d6d6;
        }
    }
    li.active {
        background-color: #c8c6c6;
    }
    .avatar {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        border-radius: 15px;
    }
    .name {
        display: inline-block;
        margin: 0px 0px 0px 12px;
        width: 100px;
    }
    .delete-button {
        padding: 0px;
        margin: 2px 5px 0px 0px;
        height: 18px;
        :hover {
            color: #f78989;
        }
    }
}
</style>
