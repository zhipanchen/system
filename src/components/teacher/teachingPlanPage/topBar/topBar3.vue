<template>
  <div class="topBarDiv am-btn-group">
    <a :href="checkCouUrl">
      <button id="checkCouButton" class="topBarButton am-btn am-btn-success btn-active" @click="checkCouClick">{{ checkCouButton }}</button>
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
        checkCouButton: '教学计划审核',
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
