<template>
    <el-tabs :stretch="true" type="card"
        v-model="activeName" @tab-click="handleClick">
        <el-tab-pane>
            <span slot="label"><i class="el-icon-s-custom"></i> {{firstLabelName}}</span>
            <List/>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label"><i class="el-icon-s-comment"></i> {{secondLabelName}}</span>
            <List/>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import List from './List'
    export default {
        name: "Contact",
        components: {
            List,
        },
        data() {
            return {
                activeName: '',
                firstLabelName: '好友',
                secondLabelName: '群聊',
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            loadContact() {
                this.firstLabelName = '好友'
                this.secondLabelName = '群聊'
            },
            loadVerification() {
                this.firstLabelName = '好友验证'
                this.secondLabelName = '群组验证'
            },
        },
        mounted() {
            this.$bus.$on('loadContact', this.loadContact);
            this.$bus.$on('loadVerification', this.loadVerification);
        },
        beforeDestroy() {
            // 解绑自定义事件
            this.$bus.$off('loadContact');
            this.$bus.$off('loadVerification');
        },
    };
</script>
