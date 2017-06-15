<template>
  <div>
    <div  class="positionBar">
      <span>您当前的位置：</span>
      <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
      <span>>教学活动</span>
      <span>>听课反馈</span>
    </div>
    <div id="table">
      <div id="show">
        <!--<button>一键提交</button>-->
        <table class="operationTable">
          <thead>
          <tr>
            <th>课程名称</th>
            <th>班级名称</th>
            <th>听课结果</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(data,index) in tableList">
            <td v-text="data.courseName"></td>
            <td v-text="data.className"></td>
            <td ><span style="text-decoration: underline; cursor: pointer" @click="directorResult(index)" >查看</span></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'table',
    data () {
      return {
//              tableList:[{courseName:"护理",className:"101",teacherName:"李华"}]
        tableList:''
      }
    },
    beforeMount:function(){
      this.$http.post('./teachingSupervision/teacherCheckSup',{},
        {"Content-Type":"application/json"}).then(function (response) {
          console.log(response);
          this.tableList = response.body.result;
        },
        function(error){
          console.log("获取error:");
          console.log(error);
        });
    },
    methods:{
      //跳转传值
      directorResult:function(index){
        var id=this.tableList[index].courseAssociationId;
        location.href='#/teacher/studentMessage?'+id;
      }
    }
  }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  #table{
    background-color: #f3f3f3;
  }
  #sel{
    display: flex;
    padding-left:6rem;
    background-color: white;

    padding-top: 1rem;
    padding-bottom: 1rem;

  }
  select{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.7rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    margin-left:3rem;
    font-size: 0.8rem;
  }
  button{
    color: white;
    background-color: mediumseagreen;
    border: none;
    border-radius: 0.2rem;
    width: 6rem;
    height: 2rem;
    min-width: 5rem;
    position: relative;
    left:64rem;
    outline:none;
  }
  #show{
    background-color: white;
    margin-right:5rem;
    margin-left:5rem;
    height:30rem;
    position: relative;
    top:2rem;
  }
  /*table{*/
  /*border: solid 1px white;*/
  /*border-collapse: collapse;*/
  /*margin-left:1rem;*/
  /*margin-right:1rem;*/
  /*width:96%;*/

  /*}*/
  thead{
    border-bottom:solid 2px lightgrey;
  }

  tr{
    height:2.5rem;
  }

</style>
