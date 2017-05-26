<template>
  <div id="studentHomeDiv">
    <div id="menuDiv"></div>
    <div id="pageDiv">
      信息查询
      <div id="firstDiv" class="pageDiv">
        <span class="pageSpan">
          <ul>
            <a href="#/student/query/studentTeacher"><li>教师信息</li></a>
          </ul>
        </span>
        <span class="pageSpan">
          <ul>
            <a href="#/student/query/studentLesson"><li>课表查询</li></a>
          </ul>
        </span>
        <span class="pageSpan">
          <ul>
            <a href="#/student/query/studentTestInfo"><li>考场查询</li></a>
          </ul>
        </span>
        <span class="pageSpan">
          <ul>
            <a href="#/student/query/stInquireGrade"><li>成绩查询</li></a>
          </ul>
        </span>
      </div>
      信息设置
      <div id="secondDiv" class="pageDiv">
        <span class="pageSpan">
          <ul>
            <a href="#/student/setting/changPassword"><li>修改密码</li></a>
          </ul>
        </span>
        <span class="pageSpan">
          <ul>
            <a href="#/student/setting/studentInformation"><li>个人信息维护</li></a>
          </ul>
        </span>
        <span class="pageSpan">
          <ul>
            <a href="#/student/setting/studentEvaluation"><li>学生评教</li></a>
          </ul>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'studentHomeDiv',
    data () {
      return {
        msg: ''
      }
    },
    beforeMount: function () {
      this.$http.post('./getPermissionByUser',{},{
//      this.$http.post('../testPhp/getPermissionByUser.php',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        sessionStorage.setItem("authorityList", JSON.stringify(response.body.currentPermissionList));
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });
    },
    mounted: function() {
//      dom加载后调整页面高度
      var dom = document.getElementById("studentHomeDiv");
      dom.style.minHeight = window.innerHeight*0.92 + "px";
    }
  }
</script>

<style scoped>
  #studentHomeDiv {
    background-color: white;
    display: flex;
    border: thin solid whitesmoke;
    border-top: thin solid #DCDCDC;
    overflow-x: hidden;
  }
  #menuDiv{
    /*左侧功能栏*/
    width: 15rem;
    background-color: #EEF3FA;
    border: thin solid #EEF3FA;
  }
  #pageDiv{
    /*功能块区域*/
    width: 75%;
    height: 100%;
    padding: 2rem;
    margin-left: 2rem;
    font-weight: bold;
  }
  .pageDiv{
    /*功能块区域*/
    display: flex;
    justify-content: space-around;
    margin: 3rem 0;
  }
  .pageSpan{
    /*功能块*/
    width: 15%;
    font-weight: normal;
    line-height: 6.5rem;
    cursor: pointer;
    border: thick solid #E9ECF2;
    /*width: 10rem;*/
    height: 7.5rem;
    margin: 0.7rem 2.5rem;
    background-color: transparent;
    text-align: center;
    border-image:-webkit-linear-gradient(-45deg, #A7C8D9,#B2E9D5) 30 30;
    border-image:-moz-linear-gradient(-45deg,#A7C8D9,#B2E9D5) 30 30;
    border-image:linear-gradient(-45deg,#A7C8D9,#B2E9D5) 30 30;
    box-shadow: 0.2rem 0.2rem 0.5rem 0.1rem grey;
  }
  ul{
    margin: 0.5rem 0 0 0;
    padding: 0;
  }
  a{
    text-decoration: none;
    color: black;
  }
  a:hover{
    cursor: pointer;
    color: red;
  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>
