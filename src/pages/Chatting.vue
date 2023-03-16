<template>
  <div id="app" ref="app">
    <div class="toolbar">
      <Toolbar/>
    </div>
    <div class="sidebar">
      <NavigationTopSearchBar/>
      <NavigationZone/>
    </div>
    <div class="main">
      <div v-show="isChatPanel">
        <MessageTopTitle :chatObject="this.chatObject.name"/>
        <MessageArea :isGroup="this.isGroup" :toId="this.chatObject.id"/>
        <MessageBottomInputArea/>
      </div>
      <div v-show="!isChatPanel">
        <SearchArea/>
      </div>
    </div>
  </div>
</template>

<script>
  import Toolbar from "../components/Toolbar"
  import NavigationTopSearchBar from '../components/NavigationTopSearchBar'
  import NavigationZone from '../components/NavigationZone'
  import MessageTopTitle from "../components/MessageTopTitle"
  import MessageArea from '../components/MessageArea'
  import MessageBottomInputArea from '../components/MessageBottomInputArea'
  import SearchArea from '../components/SearchArea'
  
  export default {
    name: 'Chatting',
    components: {
      Toolbar,
      NavigationTopSearchBar,
      NavigationZone,
      MessageTopTitle,
      MessageArea,
      MessageBottomInputArea,
      SearchArea,
    },
    data() {
      return {
        isChatPanel: true,
        isGroup: false,
        chatObject: {
          id: 0,
        },
      }
    },
    methods: {
      openRightPanel(isChatPanel = true, isGroup, chatObject) {
        this.isChatPanel = isChatPanel
        this.isGroup = isGroup
        this.chatObject = chatObject
        this.$refs.app.style.width = 900 + 'px'
        this.$bus.$emit('scrollToBottom')
      },
      closeRightPanel() {
        this.$refs.app.style.width = 300 + 'px'
      },
    },
    mounted() {
      this.$bus.$on('openRightPanel', this.openRightPanel)
      this.$bus.$on('closeRightPanel', this.closeRightPanel)
    },
    beforeDestroy() {
      // 解绑自定义事件
      this.$bus.$off('openRightPanel')
      this.$bus.$off('closeRightPanel')
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #app {
    margin: 20px auto;
    width: 300px;
    height: 650px;
    overflow: hidden;
    border-radius: 10px;
  
    .sidebar, .main, .toolbar{
      height: 100%;
    }
    .toolbar{
      float: left;
      color: #f4f4f4;
      background-color: #2e3238;
      width: 60px;
    }
    .sidebar {
      float: left;
      color: #000000;
      background-color: #ECEAE8;
      width: 240px;
    }
    .main {
      position: relative;
      overflow: hidden;
      background-color: #eee;
    }
  }
</style>

<style>
.ellipsis {
    vertical-align: middle;
    height: 26px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.grayscale {
    -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
    filter: grayscale(100%);
}
</style>
