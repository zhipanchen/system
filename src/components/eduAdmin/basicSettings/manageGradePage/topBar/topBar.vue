<template>
  <div id="mngGradePageTopBar" class="topBarDiv am-btn-group">
    <!--导航栏-->
    <router-link to="/textbookMgmt"><button class="am-btn am-btn-success" style="margin-left: 5rem">教材管理</button></router-link>
    <button class="am-btn am-btn-success btn-active">年级管理</button>
    <router-link to="/eduAdminManageClass"><button class="am-btn am-btn-success">班级管理</button></router-link>
    <router-link to="/classroomMgmt"><button class="am-btn am-btn-success">教室管理</button></router-link>
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
