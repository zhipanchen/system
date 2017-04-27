<template>
  <div class="topBarDiv am-btn-group">
    <a :href="manualCouUrl">
      <button id="manualCouButton" class="am-btn am-btn-success btn-active">{{ manualCouButton }}</button>
    </a>
    <a :href="sendApplyUrl">
      <button id="sendApplyButton" class="am-btn am-btn-success">{{ sendApplyButton }}</button>
    </a>
    <a :href="checkCouUrl">
      <button id="checkCouButton" class="am-btn am-btn-success">{{ checkCouButton }}</button>
    </a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        manualCouButton: '手动排课申请',
        sendApplyButton: '提交排课申请',
        checkCouButton: '查看课表',
        arrInfoNum: '2',
        adjInfoNum: '0',
        manualCouUrl: '',
        sendApplyUrl: 'http://localhost:8080/',
        checkCouUrl: '/teacher/checkStuTimetable'
      }
    },
    methods: {

    }
  }
</script>

<style lang="css">
  #manualCouButton {
    margin-left: 5rem;
  }
</style>
