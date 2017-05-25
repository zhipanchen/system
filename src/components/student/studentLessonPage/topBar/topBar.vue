<template>
  <div class="topBarDiv am-btn-group">
    <a :href="studentCourseUrl">
      <button id="manualCouButton" class="topBarButton am-btn am-btn-success  btn-active">学生课表信息</button>
    </a>
    <a :href="studentTeacherUrl">
      <button  class="topBarButton am-btn am-btn-success">学生教师信息</button>
    </a>
    <a :href="studentTestUrl">
      <button  class="topBarButton am-btn am-btn-success">学生考场信息</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        studentCourseUrl: 'index.html#'+'studentTestInfoContent/query/studentLesson',
        studentTeacherUrl: 'index.html#'+'studentTestInfoContent/query/studentTeacher',
        studentTestUrl:'index.html#'+'studentTestInfoContent/query/studentTestInfo',
      }
    },
    methods: {

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
