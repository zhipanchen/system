<template>
  <div id="authorityManage2TopBar" class="topBarDiv am-btn-group">
    <!--导航栏-->
    <router-link to="/authorityMgmt1"><button class="am-btn am-btn-success" style="margin-left: 5rem">权限管理1</button></router-link>
    <button class="am-btn am-btn-success btn-active">权限管理2</button>
  </div>
</template>

<script>
    export default {
        name: 'authorityManage2TopBar',
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
