<template>
  <div>
    <div id="mngStdPageTopBar" class="topBarDiv am-btn-group">
      <!--导航栏-->
      <router-link to="/eduAdmin/baseSetting/person/eduResGroupMgmt"><button class="am-btn am-btn-success" style="margin-left: 5rem">教研组管理</button></router-link>
      <button class="am-btn am-btn-success btn-active">学生管理</button>
      <router-link to="/eduAdmin/baseSetting/person/eduAdminManageTch"><button class="am-btn am-btn-success">教师管理</button></router-link>
      <router-link to="/eduAdmin/baseSetting/person/eduAdminManageClass"><button class="am-btn am-btn-success">学生异动情况</button></router-link>
    </div>
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
