<template>
  <div id="studentStatusChangeExaminationDiv">
    <div id="operationDiv">
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > 人员管理设置 > <a href="#/eduAdmin/baseSetting/person/eduAdminManageClass" class="returnHome">异动管理</a> > 异动审批</span>
      </div>
      <div id="selectDiv">
        <select v-model="applicationType" @change="typeChange()">
          <option disabled>选择申请类型</option>
          <option value="2">休学申请</option>
          <option value="3">退学申请</option>
          <option value="4">复学申请</option>
        </select>
      </div>
    </div>
    <div id="tableDiv">
        <table class="operationTable">
          <thead>
          <tr>
            <th class="headTh">申请学生</th>
            <th class="headTh">学号</th>
            <th class="headTh">学制</th>
            <th class="headTh">专业</th>
            <th class="headTh">班级</th>
            <th class="headTh">异动类型</th>
            <th class="headTh">异动原因</th>
            <th class="headTh">生效时间</th>
            <th class="headTh">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(application,index) in applications" :id="index">
            <td>{{ application.studentName }}</td>
            <td>{{ application.studentId }}</td>
            <td>{{ application.schoolYearType }}</td>
            <td>{{ application.speciality }}</td>
            <td>{{ application.className }}</td>
            <td>{{ application.changeType }}</td>
            <td>{{ application.changeReason }}</td>
            <td>{{ application.changeDate }}</td>
            <td>
              <button class="operationButton" @click="operation(index,'true')" title="通过">√</button>
              <!--<button @click="setTrue(index)">√</button>-->
              <!--申请通过批准-->
              <button class="operationButton" @click="operation(index,'false')" title="不通过">×</button>
              <!--申请拒绝-->
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    <Modal
        v-model="modal1"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :style="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定通过该申请吗?</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="setTrue(applications,operationIndex)">确定</button>
        <button id="modalBtn" @click="modal1 = false">取消</button>
      </div>
    </Modal>
    <Modal
        v-model="modal2"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定拒绝该申请吗?</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="setFalse(applications,operationIndex)">确定</button>
        <button id="modalBtn" @click="modal2 = false">取消</button>
      </div>
    </Modal>
    <Modal
        v-model="modal3"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <div style="font-size: 1.1rem;text-align: center;">
        <p>{{ errorMessage }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="modal3 = false">确定</button>
      </div>
    </Modal>
    </div>
</template>

<script>
  export default {
    name: 'studentStatusChangeExaminationDiv',
    data () {
      return {
        applicationType: "2",
//        申请类型
        applications: [
          {
            "schoolYearType": "3",
            "speciality": "123",
            "className": "123",
            "studentId": "123",
            "studentName": "123",
            "changeType": "123",
            "changeReason": "123",
            "changeDate": "123"
          }
        ],
//                申请信息
        operationIndex: null,
//        对话框参数传递
        modal1: false,
//        对话框显隐
        modal2: false,
        modal3: false,
        errorMessage: ""
      }
    },
    beforeMount: function() {
//    页面dom加载前获取后端数据
      this.$http.post('./stateManage/getApplyQuitStudentList',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        console.log("获取申请:");
        console.log(response.body);
        var data = response.body;
        this.applications = data.quitSchoolList;
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });
    },
    methods: {
      typeChange: function () {
        var url = null;
        if(this.applicationType == "2"){
          url = "./stateManage/getApplyQuitStudentList";
        }else if(this.applicationType == "3"){
          url = "./stateManage/getApplyDropStudentList";
        }else if(this.applicationType == "4"){
          url = "./stateManage/getApplyReinstatingStudentList";
        }
        this.$http.post(url,{},{
          "Content-Type":"application/json"
        }).then(function(response){
          console.log("获取申请:");
          console.log(response.body);
          var data = response.body;
          if(this.applicationType == "2"){
            this.applications = data.quitSchoolList;
          }else if(this.applicationType == "3"){
            this.applications = data.dropSchoolList;
          }else if(this.applicationType == "4"){
            this.applications = data.reinstateSchoolList;
          }
        },function(error){
          this.$Message.error('连接失败，请重试！');
        });
      },
      operation: function(operationIndex,type){
//                对话框参数传递，触发对应对话框
        this.operationIndex = operationIndex;
        if(type == "true"){
          this.modal1 = true;
        }else{
          this.modal2 = true;
        }
      },
      setTrue: function(applications,index){
        var url = null;
        if(this.applicationType == "2"){
          url = "./stateManage/pendReinstating";
        }else {
          if (this.applicationType == "3") {
            url = "./stateManage/pendQuitStudent";
          } else if (this.applicationType == "4") {
            url = "./stateManage/pendDropStudent";
          }
          this.$http.post(url, {
            "studentId": applications[index].studentId,
            "pendResult": "1"
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            this.modal1 = false;
            console.log(response);
            var data = response.body;
            if (data.result == "1") {
              applications.splice(index, 1);
              this.$Message.success('申请审批成功！');
            } else {
              this.errorMessage = "操作失败,请重试!";
              this.modal3 = true;
            }
          }, function (error) {
            this.modal1 = false;
            this.$Message.error('连接失败，请重试！');
          });
        }
      },
      setFalse: function(applications,index){
        if(this.applicationType == "2"){
          url = "./stateManage/pendReinstating";
          this.$http.post(url, {
            "studentId": applications[index].studentId,
            "pendResult": "0",
            "classId":""
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            this.modal1 = false;
            console.log(response);
            var data = response.body;
            if (data.result == "1") {
              applications.splice(index, 1);
              this.$Message.success('申请审批成功！');
            } else {
              this.errorMessage = "操作失败,请重试!";
              this.modal3 = true;
            }
          }, function (error) {
            this.modal1 = false;
            this.$Message.error('连接失败，请重试！');
          });
        }else {
          if (this.applicationType == "3") {
            url = "./stateManage/pendQuitStudent";
          } else if (this.applicationType == "4") {
            url = "./stateManage/pendDropStudent";
          }
          this.$http.post(url, {
            "studentId": applications[index].studentId,
            "pendResult": "1"
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            this.modal1 = false;
            console.log(response);
            var data = response.body;
            if (data.result == "1") {
              applications.splice(index, 1);
            } else {
              this.errorMessage = "操作失败,请重试!";
              this.modal3 = true;
            }
          }, function (error) {
            this.modal1 = false;
            this.$Message.error('连接失败，请重试！');
          });
        }
      }
    }
  }
</script>

<style scoped>
  #studentStatusChangeExaminationDiv{
    /*页面*/
    margin: 0 auto;
    background-color: #f3f3f3;
    height: 100%;
  }
  #operationDiv{
    /*选择框、位置导航区域*/
    background-color: white;
  }
  #selectDiv{
    /*选择框区域*/
    margin: 0 5rem;
    padding-bottom: 0.8rem;
  }
  #tableDiv{
    margin: 0 5rem;
    padding-top: 0.5rem;
  }
  .operationButton{
    /*操作按钮*/
    outline: none;
    border: thin solid #A6A6A6;
    background-color: white;
    color: #A6A6A6;
    border-radius: 1rem;
    font-size: 1rem;
    width: 1.45rem;
  }
  .operationButton:hover{
    background-color: red;
    color: white;
    border: red;
  }
  .top{
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
  }
  @media screen and (max-width:1025px) {
    html {
    }
  }
</style>