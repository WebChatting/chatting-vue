<template>
  <div id="app">
    <div class="toolbar">
      <Toolbar/>
    </div>
    <div class="sidebar">
      <SearchBar/>
      <List/>
    </div>
    <div class="main">
      <Title/>
      <Display/>
      <TextInput/>
    </div>
  </div>
</template>

<script>
  import Toolbar from "../components/Toolbar";
  import SearchBar from '../components/SearchBar'
  import List from '../components/List'
  import Title from "../components/Title"
  import Display from '../components/Display'
  import TextInput from '../components/TextInput'
  
  export default {
    name: 'Chatting',
    components:{
      Toolbar,
      SearchBar,
      List,
      Title,
      Display,
      TextInput,
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #app {
    margin: 20px auto;
    width: 900px;
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
