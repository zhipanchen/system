<template>
  <div class="topBarDiv am-btn-group">
    <a :href="makeupExamUrl"><button id="makeupExamBtn" class="topBarButton am-btn am-btn-success btn-active">{{ makeupExamBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        makeupExamBtn: '补考成绩管理',
        makeupExamUrl: '',
      }
    }
  }
</script>

<style lang="css">
  #makeupExamBtn {
    margin-left: 5rem;
  }
</style>
