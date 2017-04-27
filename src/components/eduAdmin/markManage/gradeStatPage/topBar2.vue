<template>
  <div class="topBarDiv am-btn-group">
    <a :href="gradeCheckUrl"><button id="gradeCheckBtn" class="topBarButton am-btn am-btn-success">{{ gradeCheckBtn }}</button></a>
    <a :href="gradeCountUrl"><button id="gradeCountBtn" class="topBarButton am-btn am-btn-success btn-active">{{ gradeCountBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        gradeCheckBtn: '成绩查询',
        gradeCountBtn: '成绩统计',
        gradeCheckUrl: '/eduAdmin/markManage/gradeQuery',
        gradeCountUrl: '',
      }
    },
    methods: {
      
    }
  }
</script>

<style>

  #gradeCheckBtn {
    margin-left: 5rem;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
