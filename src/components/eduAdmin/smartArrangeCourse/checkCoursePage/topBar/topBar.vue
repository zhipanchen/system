<template>
  <div id="checkCourse_topBar" class="topBarDiv am-btn-group">
    <button id="topBarButton" class="am-btn am-btn-success btn-active">课表查询</button>
  </div>
</template>

<script>
  export default {
    name: 'checkCourse_topBar',
    data () {
      return {
        msg: ''
      }
    }
  }
</script>

<style scoped>
  #topBarButton{
    margin-left: 5rem;
  }
</style>

