<template>
  <div class="topBarDiv am-btn-group">
    <a :href="changepasswordUrl">
      <button id="changepasswordButton" class="topBarButton am-btn am-btn-success">修改密码</button>
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
        changepasswordUrl: 'index.html#'+'studentTestInfoContent/setting/changPassword',
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
  #changepasswordButton {
    margin-left: 5rem;
  }
/*  .topBarButton,.topBarButton:active{
    display: block;
    font-weight: bold;
    color: white;
    background-color: forestgreen;
    text-align: center;
    font-size: 1rem;
    padding: 2rem;
    border: none;
    outline: none;
  }
  .topBarButton:hover {
    background-color: limegreen;
    cursor: pointer;
  }*/
  /*#queryA{
    background-color: limegreen;
  }*/
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
