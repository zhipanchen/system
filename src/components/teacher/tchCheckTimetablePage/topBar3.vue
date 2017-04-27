<template>
  <div class="topBarDiv am-btn-group">
    <a :href="manualCouUrl">
      <button id="manualCouButton" class="topBarButton am-btn am-btn-success">{{ manualCouButton }}</button>
    </a>
    <a :href="sendApplyUrl">
      <button id="sendApplyButton" class="topBarButton am-btn am-btn-success">{{ sendApplyButton }}</button>
    </a>
    <a :href="checkCouUrl">
      <button id="checkCouButton" class="topBarButton am-btn am-btn-success btn-active">{{ checkCouButton }}</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        manualCouButton: '手动排课申请',
        sendApplyButton: '提交排课申请',
        checkCouButton: '查看课表',
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
@import '../../../assets/css/external.css';

  html {
    font-size: 16px;
  }
  #manualCouButton {
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
