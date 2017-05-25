<template>
  <div id="mngGradePageTopBar" class="topBarDiv am-btn-group">
    <!--导航栏-->
    <button class="am-btn am-btn-success btn-active" style="margin-left: 5rem">信息通知</button>
  </div>
</template>

<script>
  export default {
    name: 'mngStdPageTopBar',
    data () {
      return {
        msg: ''
      }
    }
  }
</script>

<style scoped>
  html{
    font-size: 62.5%;
  }


  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
</style>
