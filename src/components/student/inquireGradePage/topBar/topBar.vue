<template>
  <div id="stdInquireGradeBar" class="topBarDiv am-btn-group">
    <!--导航栏-->
    <router-link to="/student/query/studentTeacher"><button class="am-btn am-btn-success" style="margin-left: 5rem">学生教师信息</button></router-link>
    <router-link to="/student/query/studentLesson"><button class="am-btn am-btn-success">学生课表查询</button></router-link>
    <router-link to="/student/query/studentTestInfo"><button class="am-btn am-btn-success">学生考场查询</button></router-link>
    <button class="am-btn am-btn-success btn-active">学生成绩查询</button>
  </div>
</template>

<script>
  export default{
    name:'stdInquireGradeBar',
    data(){
      return{
        msg:'',
        authorityList:null
      }
    },
    mounted: function () {
      try{
        var buttons = document.getElementById("stdInquireGradeBar").getElementByTagName("button");
        this.authorityList = JSON.parse(sessionStorage.getItem("authorityList"));
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }
        for (var i = 0; i < this.authorityList.length; i++) {
          if (this.authorityList[i] == "49") {
            buttons[0].style.display = "block";
          }else if(this.authorityList[i] == "60"){
            buttons[1].style.display = "block";
          }else if(this.authorityList[i] == "48"){
            buttons[2].style.display = "block";
          }else if(this.authorityList[i] == "51"){
            buttons[3].style.display = "block";
          }
        }
      }catch(e) {}
    }
  }

</script>

<style scoped>
  html{
    font-size: 100%;
  }
</style>
