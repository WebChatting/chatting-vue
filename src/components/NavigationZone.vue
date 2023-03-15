<template>
    <el-tabs :stretch="true" type="card"
        v-model="activeName" @tab-click="handleClick">
        <el-tab-pane>
            <span slot="label"><i class="el-icon-s-custom"></i> {{firstLabelName}}</span>
            <Contact v-show="isContact" :isGroup="false"/>
            <Application v-show="!isContact" :isGroup="false"/>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label"><i class="el-icon-s-comment"></i> {{secondLabelName}}</span>
            <Contact v-show="isContact" :isGroup="true"/>
            <Application v-show="!isContact" :isGroup="true"/>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import Contact from './Contact'
    import Application from './Application'
    import axios from 'axios'
    export default {
        name: "NavigationZone",
        components: {
            Contact,
            Application,
        },
        data() {
            return {
                activeName: '',
                firstLabelName: '好友',
                secondLabelName: '群聊',
                isContact: true,
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            loadContact() {
                this.firstLabelName = '好友'
                this.secondLabelName = '群聊'
                this.isContact = true
            },
            loadVerification() {
                this.firstLabelName = '好友验证'
                this.secondLabelName = '群组验证'
                this.isContact = false
            },
            loadRelation(type, status, direction) {
                axios({
                    method: 'get',
                    url: '/chatting/relation/list',
                    params: {
                        type: type,
                        status: status,
                        direction: direction,
                    },
                    responseType: 'json',
                }).then((response) => {
                    if (response.data.status == 200) {
                        if (response.data.data !== undefined) {
                            if (status == -1) {
                                // 加载申请
                                if (type == 0) {
                                    if (direction == 0) {
                                        this.$store.state.requestFriendApplications = response.data.data.relations;
                                        console.log(response.data.data.relations)
                                    } else {
                                        this.$store.state.acceptFriendApplications = response.data.data.relations;
                                    }
                                } else {
                                    if (direction == 0) {
                                        this.$store.state.requestGroupApplications = response.data.data.relations;
                                    } else {
                                        this.$store.state.acceptGroupApplications = response.data.data.relations;
                                    }
                                }
                            } else {
                                // 加载联系人
                                if (direction == -1) {
                                    // 好友关系
                                    this.$store.state.friends = response.data.data.relations;
                                } else if (direction == 0) {
                                    // 加入群组关系
                                    this.$store.state.joinGroups = response.data.data.relations;
                                }
                            }
                        }
                    } else {
                        console.log("request error")
                    }
                })
            },
        },
        mounted() {
            this.$bus.$on('loadContact', this.loadContact);
            this.$bus.$on('loadVerification', this.loadVerification);

            // 加载好友与加入的群组
            this.loadRelation(0, 1, -1);
            this.loadRelation(1, 1, 0);
            // 加载申请
            this.loadRelation(0, -1, 0);
            this.loadRelation(0, -1, 1);
            this.loadRelation(1, -1, 0);
            this.loadRelation(1, -1, 1);

            console.log("Contact mount")
            // 加载创建的群组
            axios({
                method: 'get',
                url: '/chatting/group/list',
                responseType: 'json',
            }).then((response) => {
                if (response.data.status == 200) {
                    this.$store.state.createGroups = response.data.data.relations;
                } else {
                    console.log("request error")
                }
            })
        },
        beforeDestroy() {
            // 解绑自定义事件
            this.$bus.$off('loadContact');
            this.$bus.$off('loadVerification');
        },
    };
</script>
