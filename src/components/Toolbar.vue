<template>
    <div id="toolbar">
        <el-image src="https://cdn.sxrekord.com/blog/logo.jpg" class="imgProfile">
            <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
            </div>
        </el-image>
        <div id="btnBar">
            <div class="topBtnBar">
                <el-tooltip  class="item" effect="dark" content="群聊" placement="right">
                    <el-button class="toolBtn" size="small"><i class="el-icon-s-comment"></i></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="用户列表" placement="right">
                    <el-button class="toolBtn" size="small"><i class="el-icon-user-solid"></i></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="与机器人聊天" placement="right">
                    <el-button class="toolBtn" size="small"><i class="el-icon-s-platform"></i></el-button>
                </el-tooltip>
            </div>
            <div class="bottomBtnBar">
                <el-tooltip class="item" effect="dark" content="设置" placement="right">
                    <el-button class="toolBtn" size="small"><i class="el-icon-s-tools"></i></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="退出" placement="right">
                    <el-button class="toolBtn" size="small"><i class="el-icon-s-fold"></i></el-button>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Toolbar',
    }
</script>

<style lang="scss" scoped>
  #toolbar {
    width: 100%;
    height: 100%;
    #btnBar {
      width: 100%;
      height: 85%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .imgProfile {
      width: 40px;
      height: 40px;
      margin: 25px 10px;
    }
    .toolBtn {
      background-color: #2e3238;
      border: 0;
      margin: 5px 5px;
    }
  }
</style>