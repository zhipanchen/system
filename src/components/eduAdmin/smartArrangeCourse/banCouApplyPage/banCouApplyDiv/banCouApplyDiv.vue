<template>
  <div id="banCouApplyDiv">
    <div class="blank"></div>
    <div id="tableDiv">
      <table class="operationTable">
        <thead>
          <tr>
            <th class="headTd">申请教师</th>
            <th class="headTd">禁排时间（星期）</th>
            <th class="headTd">申请时间</th>
            <th class="headTd">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="application in applications" :id="application.forbiddentimeId">
            <td>{{ application.teacherName }}</td>
            <td>{{ application.appContent }}</td>
            <td>{{ application.appTime }}</td>
            <td>
              <button @click="setTrue(applications,index,application.forbiddentimeId)">√</button>
              <!--申请通过批准-->
              <button @click="setFalse(applications,index,application.forbiddentimeId)">×</button>
              <!--申请拒绝-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'banCouApplyDiv',
    data () {
      return {
        applications: [
          /*{ applicationId:'1', teacherName: '张三', appContent: '每周三上午不上课', appTime: '2016.08.01' },
          { applicationId:'2', teacherName: '李四', appContent: '每周四下午不上课', appTime: '2016.08.03' },
          { applicationId:'3', teacherName: '王五', appContent: '每周一下午不上课', appTime: '2016.08.02' },
          { applicationId:'4', teacherName: '李小红', appContent: '每周五上午不上课', appTime: '2016.08.05' }*/
        ],
      }
    },
    beforeMount: function() {
      this.$http.post('./forbiddenTimeApplyShow',{},{
//      this.$http.post('../testPhp/banCouApply.php',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        console.log("获取申请:");
        console.log(response.body);
        var data = response.body;
        this.applications = data;
      },function(error){
        console.log("获取申请error:");
        console.log(error);
      });
    },
    methods: {
      setTrue: function(applications,index,id){
        //预留功能，需要后端返回处理确认
        if(confirm("您确定通过该申请吗？")){
          this.$http.post('./forbiddenTimeApplyHandle',{
//          this.$http.post('../testPhp/adjustCouApplySetTrue.php',{
            "forbiddentimeId": id,
            "operation": 1
          },{
            "Content-Type":"application/json"
          }).then(function(response){
            console.log("通过申请:");
            console.log(response.body);
            var data = response.body;
            if(data.result == "1") {
              applications.splice(index, 1);
            }else{
              alert("操作失败！请重试");
            }
          },function(error){
            console.log("通过申请error:");
            console.log(error);
          });
        }
      },
      setFalse: function(applications,index,id){
        //预留功能，需要后端返回处理确认
        if(confirm("您确定拒绝该申请吗？")){
          this.$http.post('./forbiddenTimeApplyHandle',{
//          this.$http.post('../testPhp/adjustCouApplySetFalse.php',{
            "forbiddentimeId": id,
            "operation": 0
          },{
            "Content-Type":"application/json"
          }).then(function(response){
            console.log("拒绝申请:");
            console.log(response.body);
            var data = response.body;
            if(data.result == "1") {
              applications.splice(index, 1);
            }else{
              alert("操作失败！请重试");
            }
          },function(error){
            console.log("拒绝申请error:");
            console.log(error);
          });
        }
      }
    }
  }
</script>

<style scoped>
  html{
  }
  #banCouApplyDiv{
    /*页面*/
    margin: 0 auto;
    background-color: #f3f3f3;
    height: 100%;
  }
  .blank {
    height: 2.9rem;
  }
  #tableDiv{
    margin: 0 5rem;
  }
  button{
    outline: none;
    border: thin solid #A6A6A6;
    background-color: white;
    color: #A6A6A6;
    border-radius: 1rem;
    font-size: 1rem;
    width: 1.45rem;
  }
  button:hover{
    background-color: red;
    color: white;
    border: red;
  }
  @media screen and (max-width:1023px) {
    html {
    }
  }
</style>
