<template>
  <div id="courseList_topBar" class="topBarDiv am-btn-group">
    <a :href="teachPlanUrl"><button id="teachPlanBtn" class="topBarButton am-btn am-btn-success btn-active">{{ teachPlanBtn }}</button></a>
    <a :href="superviseUrl"><button id="superviseBtn" class="topBarButton am-btn am-btn-success">{{ superviseBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        teachPlanBtn: '教学计划',
        superviseBtn: '督导反馈',
        teachPlanUrl: '#/teacher/teach/courseList',
        superviseUrl: '#/teacher/teach/director',
        authorityList: ''
      }
    },
    mounted: function () {
      try{
        var buttons = document.getElementById("courseList_topBar").getElementByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "36") {
            buttons[0].style.display = "block";
          }else if (this.authorityList[i] == "52") {
            buttons[1].style.display = "block";
          }
        }
      }catch(e) {}
    },
    methods: {
      
    }
  }
</script>

<style scoped>
  #teachPlanBtn {
    margin-left: 5rem;
  }

</style>
