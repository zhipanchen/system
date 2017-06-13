<template>
  <div id="tchCheckSalary_topBar" class="topBarDiv am-btn-group">
    <a :href="tchResearchUrl">
      <button id="tchResearchBtn" class="topBarButton am-btn am-btn-success btn-active">{{ tchResearchBtn }}</button>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        tchResearchBtn: '查看课酬',
        tchResearchUrl: '#/teacher/classInfo/tchCheckSalary',
        authorityList: ''
      }
    },
    mounted: function () {
      try{
        var buttons = document.getElementById("tchCheckSalary_topBar").getElementsByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "35") {
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
@import '../../../../assets/css/external.css';

  html {
    font-size: 16px;
  }
  #tchResearchBtn {
    margin-left: 5rem;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
