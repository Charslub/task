<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view >
    </keep-alive>

    <back-top></back-top>
  </div>
</template>

<script>
  import BackTop from "./components/backtop/BackTop";



  export default {
    name: 'App',
    components: {
      BackTop,

    },
    mounted() {

    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .boom {
    z-index: -1;
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>
