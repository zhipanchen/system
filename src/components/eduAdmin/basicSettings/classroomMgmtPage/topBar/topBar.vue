<template>
  <div id="classroomManagement_topBar" class="topBarDiv am-btn-group">
    <button id="topBarButton" class="am-btn am-btn-success" @click="hrefClick(1)">教材管理</button>
    <button class="am-btn am-btn-success" @click="hrefClick(2)">年级管理</button>
    <button class="am-btn am-btn-success" @click="hrefClick(3)">班级管理</button>
    <button class="am-btn am-btn-success btn-active" @click="hrefClick(4)">教室管理</button>
  </div>
</template>

<script>
  export default {
    name: 'classroomManagement_topBar',
    data () {
      return {
        msg: ''
      }
    },
    methods: {
      hrefClick: function (num) {
        if (num == 1) {
          location.href = "#/eduAdmin/baseSetting/resource/textbookMgmt"
        } else if (num == 2) {
          location.href = "#/"
        } else if (num == 3) {
          location.href = "#/"
        } else if (num == 4) {
          location.href = "#/eduAdmin/baseSetting/resource/classroomMgmt"
        }
      }
//      路由跳转
    }
  }
</script>

<style scoped>
  html {
  }
  #topBarButton{
    margin-left: 5rem;
  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>

