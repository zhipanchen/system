<template>
  <div id="eduResearchGroupManagement_topBar" class="topBarDiv am-btn-group">
    <button id="topBarButton" class="am-btn am-btn-success btn-active" @click="hrefClick(1)">教研组管理</button>
    <button class="am-btn am-btn-success" @click="hrefClick(2)">学生管理</button>
    <button class="am-btn am-btn-success" @click="hrefClick(3)">教师管理</button>
    <button class="am-btn am-btn-success" @click="hrefClick(4)">学生异动情况</button>
  </div>
</template>

<script>
  export default {
    name: 'eduResearchGroupManagement_topBar',
    data () {
      return {
        msg: ''
      }
    },
    methods: {
      hrefClick: function (num) {
        if (num == 1) {
          location.href = "#/eduAdmin/baseSetting/person/eduResGroupMgmt"
        } else if (num == 2) {
          location.href = "#/eduAdmin/baseSetting/person/eduAdminManageStd"
        } else if (num == 3) {
          location.href = "#/eduAdmin/baseSetting/person/eduAdminManageTch"
        } else if (num == 4) {
          location.href = "#/eduAdmin/baseSetting/person/eduAdminManageClass"
        }
      }
//      路由跳转
    }
  }
</script>

<style scoped>
  html{

  }
  #topBarButton{
    margin-left: 5rem;
  }

  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>

