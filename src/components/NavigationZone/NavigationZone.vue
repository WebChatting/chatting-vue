<template>
    <el-tabs
        :stretch="true"
        type="card"
        v-model="activeName"
        @tab-click="handleClick"
    >
        <el-tab-pane>
            <span slot="label"
                ><i class="el-icon-s-custom"></i> {{ firstLabelName }}</span
            >
            <NavigationContact v-show="isContact" :isGroup="false" />
            <NavigationApplication v-show="!isContact" :isGroup="false" />
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label"
                ><i class="el-icon-s-comment"></i> {{ secondLabelName }}</span
            >
            <NavigationContact v-show="isContact" :isGroup="true" />
            <NavigationApplication v-show="!isContact" :isGroup="true" />
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import NavigationContact from "./NavigationContact";
import NavigationApplication from "./NavigationApplication";
import { mapActions } from "vuex";
export default {
    name: "NavigationZone",
    components: {
        NavigationContact,
        NavigationApplication,
    },
    data() {
        return {
            activeName: "",
            firstLabelName: "好友",
            secondLabelName: "群聊",
            isContact: true,
        };
    },
    methods: {
        ...mapActions(["listRelation"]),
        handleClick() {
            // console.log(tab, event);
        },
        loadContact() {
            this.firstLabelName = "好友";
            this.secondLabelName = "群聊";
            this.isContact = true;
        },
        loadVerification() {
            this.firstLabelName = "好友验证";
            this.secondLabelName = "群组验证";
            this.isContact = false;
        },
        loadRelation(type, status, direction) {
            this.listRelation({type, status, direction});
        },
    },
    mounted() {
        this.$bus.$on("loadContact", this.loadContact);
        this.$bus.$on("loadVerification", this.loadVerification);

        // 加载好友与加入的群组
        this.loadRelation(0, 1, -1);
        this.loadRelation(1, 1, 0);
        // 加载申请
        this.loadRelation(0, -1, 0);
        this.loadRelation(0, -1, 1);
        this.loadRelation(1, -1, 0);
        this.loadRelation(1, -1, 1);

        // 加载创建的群组
        this.$store.dispatch("listGroup");
    },
    beforeDestroy() {
        // 解绑自定义事件
        this.$bus.$off("loadContact");
        this.$bus.$off("loadVerification");
    },
};
</script>
