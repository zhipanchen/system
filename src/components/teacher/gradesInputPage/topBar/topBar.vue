<template>
  <div id="tchGradesInput_topBar" class="topBarDiv am-btn-group">
    <a :href="gradesInputUrl"><button id="gradesInputBtn" class="topBarButton am-btn am-btn-success btn-active">{{ gradesInputBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        gradesInputBtn: '成绩录入',
        gradesInputUrl: '#/teacher/class/tchGradesInput',
        authorityList: ''
      }
    },
    mounted: function () {
      try{
        var buttons = document.getElementById("tchGradesInput_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "33") {
            buttons[0].style.display = "block";
          }
        }
      }catch(e) {}
    },
    methods: {
      
    }
  }
</script>

<style lang="css" scoped>
  #gradesInputBtn {
    margin-left: 5rem;
  }

</style>
