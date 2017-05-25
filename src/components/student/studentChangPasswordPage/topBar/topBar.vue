<template>
  <div class="topBarDiv am-btn-group">
    <a :href="changePasswordUrl">
      <button id="changePasswordButton" class="topBarButton am-btn am-btn-success btn-active">修改密码</button>
    </a>
    <a :href="selfInfUrl">
      <button id="selfInfoButton" class="topBarButton am-btn am-btn-success">个人信息</button>
    </a>
    <a :href="studentEvaluationUrl">
      <button id="studentEvaluationButton" class="topBarButton am-btn am-btn-success">学生评教</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        changePasswordUrl: 'index.html#'+'studentTestInfoContent/setting/changPassword',
        selfInfUrl:'index.html#'+'studentTestInfoContent/setting/studentInformation',
        studentEvaluationUrl: 'index.html#'+'studentTestInfoContent/setting/studentEvaluation',
      }
    }
  }
</script>

<style lang="css" scoped>

  html {
    font-size: 16px;
  }
  #changePasswordButton {
    margin-left: 5rem;
  }

  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
