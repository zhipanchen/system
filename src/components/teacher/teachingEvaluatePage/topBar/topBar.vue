<template>
  <div id="courseList_topBar" class="topBarDiv am-btn-group">
    <a :href="signinUrl"><button id="signinBtn" class="topBarButton am-btn am-btn-success">{{ signinBtn }}</button></a>
    <a :href="teachPlanUrl"><button id="teachPlanBtn" class="topBarButton am-btn am-btn-success ">{{ teachPlanBtn }}</button></a>
    <a :href="superviseUrl"><button id="superviseBtn" class="topBarButton am-btn am-btn-success">{{ superviseBtn }}</button></a>
    <a :href="tchEvaluateUrl"><button id="tchEvaluateBtn" class="topBarButton am-btn am-btn-success btn-active">{{ tchEvaluateBtn }}</button></a>
    <a :href="testInfoUrl"><button id="testInfoBtn" class="topBarButton am-btn am-btn-success">{{ testInfoBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        signinBtn: '教师签到',
        teachPlanBtn: '教学计划',
        superviseBtn: '听课反馈',
        tchEvaluateBtn: '评教结果',
        testInfoBtn: '查看考场',
        signinUrl: '#/teacher/teach/normalSchedule',
        teachPlanUrl: '#/teacher/teach/courseList',
        superviseUrl: '#/teacher/teach/teacherDirector',
        tchEvaluateUrl: '#/teacher/teach/teachingEvaluate',
        testInfoUrl: '#/teacher/teach/teacherTestInfo',
        authorityList: ''
      }
    },
    mounted: function () {
      try{
        var buttons = document.getElementById("courseList_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          // buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "37") {
            buttons[0].style.display = "block";
          }else if (this.authorityList[i] == "36") {
            buttons[1].style.display = "block";
          }else if (this.authorityList[i] == "67") {
            buttons[2].style.display = "block";
          }else if (this.authorityList[i] == "63") {
            buttons[3].style.display = "block";
          }else if (this.authorityList[i] == "25") {
            buttons[4].style.display = "block";
          }
        }
      }catch(e) {}
    },
    methods: {

    }
  }
</script>

<style scoped>
  #signinBtn {
    margin-left: 5rem;
  }

</style>
