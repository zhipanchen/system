<template>
  <div class="topBarDiv am-btn-group">
    <a :href="salaryMgmtUrl"><button id="salaryMgmtBtn" class="topBarButton am-btn am-btn-success">{{ salaryMgmtBtn }}</button></a>
    <a :href="salarySettingUrl"><button id="salarySettingBtn" class="topBarButton am-btn am-btn-success">{{ salarySettingBtn }}</button></a>
    <a :href="scheduleListUrl"><button id="scheduleListBtn" class="topBarButton am-btn am-btn-success btn-active">{{ scheduleListBtn }}</button></a>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        salaryMgmtBtn: '薪酬单',
        salarySettingBtn: '薪酬管理',
        scheduleListBtn: '上课列表',
        salaryMgmtUrl: '#/eduAdmin/emolument/salary',
        salarySettingUrl: '#/eduAdmin/emolument/setPrice',
        scheduleListUrl: '#/eduAdmin/emolument/scheduleList'
      }
    }
  }
</script>

<style scoped>
  #salaryMgmtBtn {
    margin-left: 5rem;
  }

</style>
