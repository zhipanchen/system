<template>
  <div id="topBarDiv" class="am-btn-group">
    <a :href="tchJournalUrl"><button id="tchJournalBtn" class="topBarButton am-btn am-btn-success btn-active" @click="tchJournalClick">{{ tchJournalBtn }}</button></a>
    <a :href="gradesInputUrl"><button id="gradesInputBtn" class="topBarButton am-btn am-btn-success" @click="gradesInputClick">{{ gradesInputBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        tchJournalBtn: '教师日志',
        gradesInputBtn: '成绩输入',
        tchJournalUrl: '',
        gradesInputUrl: '/teacher/tchGradesInput',
      }
    },
    methods: {
      tchJournalClick: function () {
        if (window.location.href === this.banCouUrl) {
          var tchJournalBtn = document.getElementById('tchJournalBtn')
          tchJournalBtn.style.backgroundColor = 'limegreen'
          var gradesInputBtn = document.getElementById('gradesInputBtn')
          gradesInputBtn.style.backgroundColor = 'forestgreen'
        }
      },
      gradesInputClick: function () {
        if (window.location.href === this.adjApplyUrl) {
          var tchJournalBtn = document.getElementById('tchJournalBtn')
          tchJournalBtn.style.backgroundColor = 'forestgreen'
          var gradesInputBtn = document.getElementById('gradesInputBtn')
          gradesInputBtn.style.backgroundColor = 'limegreen'
        }
      }
    }
  }
</script>

<style lang="css">
@import '../../../assets/css/external.css';

  html {
    font-size: 16px;
  }
  #topBarDiv {
    text-align: center;
    background-color: forestgreen;
    position: relative;
    width: 100%;
    height: 3rem;
    overflow: hidden;
    display: inline-block;
    justify-content: space-around;
    /*padding-left: 5rem;
    padding-right: 5rem;*/
  }
  .am-btn-group button {
    list-style: none;
    float: left;
    height: 100%;
    width: 13rem;
  }
  #tchJournalBtn {
    margin-left: 5rem;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
