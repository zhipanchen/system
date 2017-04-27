<template>
  <div id="makeupCouApplyDiv">
    <div class="blank"></div>
    <div id="tableDiv">
      <table class="operationTable">
        <thead>
          <tr>
            <td class="headTd">申请教师</td>
            <td class="headTd">课程名称</td>
            <td class="headTd">上课班级</td>
            <td class="headTd">补课时间</td>
            <td class="headTd">申请时间</td>
            <td class="headTd">申请理由</td>
            <td class="headTd">操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(application,index) in applications" :id="index">
            <td>{{ application.teacherName }}</td>
            <td>{{ application.courseName }}</td>
            <td>{{ application.className }}</td>
            <td>{{ application.lessonsChangeInfo }}</td>
            <td>{{ application.applicationTime }}</td>
            <td>{{ application.mediationReason }}</td>
            <td>
              <button @click="setTrue(applications,index,application.index)">√</button>
              <!--<button @click="setTrue(index)">√</button>-->
              <!--申请通过批准-->
              <button @click="setFalse(applications,index,applications.index)">×</button>
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
    name: 'makeupCouApplyDiv',
    data () {
      return {
        applications: [
          /*{ applicationId:'',teacher: '张三', course: '护理学基础', className: '普高2016护理1班', courseTime: '周一上午1、2节', Type:'？？', reasonType:'？？', appTime: '2016.08.01',reason:'??' },
          { applicationId:'',teacher: '李四', course: '内科护理', className: '普高2017护理2班', courseTime: '周一上午3、4节', Type:'？？', reasonType:'？？', appTime: '2016.08.02',reason:'??' },
          { applicationId:'',teacher: '王五', course: '护理管理学', className: '普高2015护理1班', courseTime: '周二上午1、2节', Type:'？？', reasonType:'？？', appTime: '2016.08.02',reason:'??' },
          { applicationId:'',teacher: '李小红', course: '内科护理', className: '普高2016护理3班', courseTime: '周五上午7节', Type:'？？', reasonType:'？？', appTime: '2016.08.02',reason:'??' }*/
        ],
      }
    },
    beforeMount: function() {
      this.$http.post('./makeUpLessionHandle.action',{},{
//      this.$http.post('../testPhp/makeupCouApply.php',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        console.log("获取申请:");
        console.log(response.body);
        var data = response.body;
        this.applications = data.applicationsList;
      },function(error){
        console.log("获取申请error:");
        console.log(error);
      });
    },
    methods: {
      setTrue: function(applications,index,id){
        //预留功能，需要后端返回处理确认
        if(confirm("您确定通过该申请吗？")){
          this.$http.post('./makeUpLessionHandle/result-button.action',{
//          this.$http.post('../testPhp/adjustCouApplySetTrue.php',{
            "teacherId": this.applications[index].teacherId,
            "teacherName": this.applications[index].teacherName,
            "courseName": this.applications[index].courseName,
            "lessonsChangeInfo": this.applications[index].lessonsChangeInfo,
            "useClassroom": this.applications[index].useClassroom,
            "classId": this.applications[index].classId,
            "className": this.applications[index].className,
            "applicationTime": this.applications[index].applicationTime,
            "mediationReason": this.applications[index].mediationReason,
            "giveLessonsDetailsId": this.applications[index].giveLessonsDetailsId,
            "operation": "1"
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
          this.$http.post('./makeUpLessionHandle/result-button.action',{
//          this.$http.post('../testPhp/adjustCouApplySetFalse.php',{
            "teacherId": this.applications[index].teacherId,
            "teacherName": this.applications[index].teacherName,
            "courseName": this.applications[index].courseName,
            "lessonsChangeInfo": this.applications[index].lessonsChangeInfo,
            "useClassroom": this.applications[index].useClassroom,
            "classId": this.applications[index].classId,
            "className": this.applications[index].className,
            "applicationTime": this.applications[index].applicationTime,
            "mediationReason": this.applications[index].mediationReason,
            "giveLessonsDetailsId": this.applications[index].giveLessonsDetailsId,
            "operation": "0"
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
  #makeupCouApplyDiv{
    /*页面*/
    margin: 0 auto;
    background-color: #f3f3f3;
    height: 100%;
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
