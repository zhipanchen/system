<template>
  <div class="topBarDiv am-btn-group">
    <a :href="tchJournalUrl"><button id="tchJournalBtn" class="topBarButton am-btn am-btn-success btn-active" @click="tchJournalClick">{{ tchJournalBtn }}</button></a>
    <a :href="gradesInputUrl"><button id="gradesInputBtn" class="topBarButton am-btn am-btn-success" @click="gradesInputClick">{{ gradesInputBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tchJournalBtn: '教师日志',
        gradesInputBtn: '成绩输入',
        tchJournalUrl: '',
        gradesInputUrl: '/teacher/tchGradesInput',
      }
    },
    methods: {
      
    }
  }
</script>

<style>
  #tchJournalBtn {
    margin-left: 5rem;
  }

</style>
