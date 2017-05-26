<template>
  <div id="stdInquireGradeBar" class="topBarDiv am-btn-group">
    <a :href="teacherCourseUrl">
      <button id="manualCouButton" class="topBarButton am-btn am-btn-success">{{ teacherCourse }}</button>
    </a>
    <a :href="teacherTestUrl">
      <button class="topBarButton am-btn am-btn-success btn-active">{{ teacherTest }}</button>
    </a>
    <a :href="teacherRewardUrl">
      <button class="topBarButton am-btn am-btn-success">{{ teacherReward }}</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        teacherCourse: '教师课表',
        teacherTest: '查看考场',
        teacherReward: '查看课酬',
        teacherCourseUrl: '#/teacher/classInfo/tchCheckTimetable',
        teacherTestUrl: '#/teacher/classInfo/teacherTestInfo',
        teacherRewardUrl: '#/teacher/classInfo/tchCheckSalary',
        authorityList:null
      }
    },
    mounted: function () {
      try {
        var buttons = document.getElementById("stdInquireGradeBar").getElementByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "39") {
            buttons[0].style.display = "block";
          } else if (this.authorityList[i] == "25") {
            buttons[1].style.display = "block";
          } else if (this.authorityList[i] == "35") {
            buttons[2].style.display = "block";
          }
        }
      } catch (e) {
      }
    }
  }
</script>

<style lang="css" scoped>

  html {
    font-size: 16px;
  }
  #manualCouButton {
    margin-left: 5rem;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
