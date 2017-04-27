<template>
  <div id="banCouApply_topBar" class="topBarDiv am-btn-group">
      <button id="topBarButton" class="am-btn am-btn-success btn-active">查看禁排申请</button>
  </div>
</template>

<script>
  export default {
    name: 'banCouApply_topBar',
    data () {
      return {
        msg: ''
      }
    }
  }
</script>

<style scoped>
  html {
  }
  #banCouApply_topBar{

  }
  #topBarButton{
    margin-left: 5rem;
  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>

