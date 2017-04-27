<template>
  <div class="topBarDiv am-btn-group">
    <a :href="gradeCheckUrl"><button id="gradeCheckBtn" class="topBarButton am-btn am-btn-success btn-active">{{ gradeCheckBtn }}</button></a>
    <a :href="gradeCountUrl"><button id="gradeCountBtn" class="topBarButton am-btn am-btn-success">{{ gradeCountBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        gradeCheckBtn: '成绩查询',
        gradeCountBtn: '成绩统计',
        gradeCheckUrl: '',
        gradeCountUrl: '',
      }
    },
    methods: {
      
    }
  }
</script>

<style lang="css">

  #gradeCheckBtn {
    margin-left: 5rem;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
