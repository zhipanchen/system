<template>
  <div class="topBarDiv am-btn-group">
    <a :href="salaryMgmtUrl"><button id="salaryMgmtBtn" class="topBarButton am-btn am-btn-success btn-active">{{ salaryMgmtBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        salaryMgmtBtn: '薪酬管理',
        salaryMgmtUrl: ''
      }
    }
  }
</script>

<style lang="css">
  #salaryMgmtBtn {
    margin-left: 5rem;
  }

</style>
