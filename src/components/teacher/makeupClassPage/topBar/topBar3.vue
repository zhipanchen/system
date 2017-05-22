<template>
  <div class="topBarDiv am-btn-group">
    <a href="#/teacher/course/makeupClass">
      <button id="checkCouButton" class="topBarButton am-btn am-btn-success btn-active" @click="checkCouClick">补课申请</button>
    </a>
    <a href="#/teacher/course/tchManuadjCl">
      <button  class="topBarButton am-btn am-btn-success " >调课申请</button>
    </a>
    <a href="#/teacher/course/stopClass">
      <button  class="topBarButton am-btn am-btn-success " >停课申请</button>
    </a>
    <a href="#/teacher/course/requirement">
      <button  class="topBarButton am-btn am-btn-success " >禁排申请</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {


        arrInfoNum: '2',
        adjInfoNum: '0',
        manualCouUrl: '/teacher/tchManuAdjCl',
        sendApplyUrl: 'http://localhost:8080/',
        checkCouUrl: ''
      }
    },
    methods: {

    }
  }
</script>

<style lang="css">
@import '../../../../assets/css/external.css';

  html {
    font-size: 16px;
  }
  #checkCouButton {
    margin-left: 5rem;
  }

  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
