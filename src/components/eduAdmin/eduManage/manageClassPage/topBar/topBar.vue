<template>
  <div id="manageClassPageTopBar" class="topBarDiv am-btn-group">
    <!--导航栏-->
    <router-link to="/textbookMgmt"><button class="am-btn am-btn-success" style="margin-left: 5rem">教材管理</button></router-link>
    <router-link to="/eduAdminManageGrade"><button class="am-btn am-btn-success">年级管理</button></router-link>
    <button class="am-btn am-btn-success btn-active">班级管理</button>
    <router-link to="/classroomMgmt"><button class="am-btn am-btn-success">教室管理</button></router-link>
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                msg: ''
            }
        }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }

    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
