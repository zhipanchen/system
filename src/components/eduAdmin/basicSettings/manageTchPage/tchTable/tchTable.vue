<template>
  <div>
    <div id="dropdownInfo">
      <span><input type="text" id="tchName" class="inputWM" placeholder="请输入姓名" v-model="teacherinfoKey.teacherName"></span>
      <span><input type="text" id="tchID" class="inputWM" placeholder="请输入编号" v-model="teacherinfoKey.teacherId"></span>
      <span><button id="downloadForm" class="am-btn am-btn-success am-radius buttonWM">下载模板</button></span>
      <span><button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="checkTchInfoClick()">查找</button></span>
      <span><button id="leadIn" class="am-btn am-btn-success am-radius buttonWM">导入</button></span>
      <span><button id="leadOut" class="am-btn am-btn-success am-radius buttonWM">导出</button></span>
    </div>
    <div id="tchTable" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
      <!--教师信息表格-->
      <table id="eduAdminTchTableSy" class="operationTable" style="table-layout: fixed;">
        <!--table-layout: fixed;固定表格格局-->
        <thead>
        <tr>
          <th>教师号</th>
          <th>姓名</th>
          <th>身份证号</th>
          <th>性别</th>
          <th>手机号码</th>
          <th>聘用校区</th>
          <th>工作职称</th>
          <th>工作职务</th>
          <th>教师类型</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(teacherSimpleInfo,index) in teacherSimpleInfoList" :id="'inputTable'+index">
          <td><input id="input1" :value="teacherSimpleInfo.teacherId" readonly="readonly" style="border: none"></td>
          <td><input id="input2" :value="teacherSimpleInfo.teacherName" readonly="readonly" style="border: none"></td>
          <td><input id="input3" :value="teacherSimpleInfo.teacherIdcard" readonly="readonly" style="border: none"></td>
          <td><input id="input4" :value="teacherSimpleInfo.teacherGender" readonly="readonly" style="border: none"></td>
          <td><input id="input5" :value="teacherSimpleInfo.phoneNumber" readonly="readonly" style="border: none"></td>
          <td><input id="input6" :value="teacherSimpleInfo.hireCampus" readonly="readonly" style="border: none"></td>
          <td><input id="input7" :value="teacherSimpleInfo.currentWorkTitle" readonly="readonly" style="border: none"></td>
          <td><input id="input8" :value="teacherSimpleInfo.currentWorkDuty" readonly="readonly" style="border: none"></td>
          <td><input id="input9" :value="teacherSimpleInfo.teacherType" readonly="readonly" style="border: none"></td>
          <td>
            <img :id="'editImg'+index" src="./images/edit.png" @click="editClick(index)">
            <img :id="'saveImg'+index" src="./images/save.png" style="display: none" @click="saveClick(index)">
            <img :id="'deleteImg'+index" src="./images/delete.png" @click="deleteClick(index)">
            <img :id="'restoreImg'+index" src="./images/restore.png" style="display: none" @click="restoreClick(index)">
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              teacherinfoKey: {
                teacherName: '',
                teacherId:''
            },
              teacherSimpleInfoList:[
                  {teacherId:'1234567',teacherName:'何平',teacherIdcard:'321281199503285555',teacherGender:'男',phoneNumber:'15680991111',hireCampus:'西校区',currentWorkTitle:'教授',currentWorkDuty:'教导主任',teacherType:'1'},
                  {teacherId:'1234567',teacherName:'何平',teacherIdcard:'321281199503285555',teacherGender:'男',phoneNumber:'15680991111',hireCampus:'西校区',currentWorkTitle:'教授',currentWorkDuty:'教导主任',teacherType:'2'}
                ]
            }
        },
      beforeMount:function() {
        this.$http.post('./teacherManage/getTeacherInfo',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.teacherSimpleInfoList = response.body.teacherSimpleInfoList;
        },function(error){
          console.log("获取error");
        });
      },
      methods:{
        checkTchInfoClick:function() {
          this.$http.post('./teacherManage/findTeacherInfo',{
            "teacherName":this.teacherinfoKey.teacherName,
            "teacherId":this.teacherinfoKey.teacherId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.teacherSimpleInfoList = response.body.teacherSimpleInfoList;
          },function(error){
            console.log("获取error");
          });
        },
        editClick: function(index){
          var inputTable = document.getElementById("inputTable"+index);
          var input = inputTable.getElementsByTagName("input");
          var editImg = document.getElementById("editImg"+index);
          var saveImg = document.getElementById("saveImg"+index);
          var deleteImg = document.getElementById("deleteImg"+index);
          var restoreImg = document.getElementById("restoreImg"+index);
          for(var i = 5;i<9;i++){
            input[i].readOnly = false;
            input[i].style.border = "0.1rem solid #d4d4d9";
          }
          editImg.style.display = "none";
          saveImg.style.display = "inline";
          deleteImg.style.display = "none";
          restoreImg.style.display = "inline";
        },
        saveClick: function(index){
          var inputTable = document.getElementById("inputTable"+index);
          var input = inputTable.getElementsByTagName("input");
          var editImg = document.getElementById("editImg"+index);
          var saveImg = document.getElementById("saveImg"+index);
          var deleteImg = document.getElementById("deleteImg"+index);
          var restoreImg = document.getElementById("restoreImg"+index);
          this.$http.post('./teacherManage/editTeacherInfo',{
            "teacherId":input[0].value,
            "hireCampus":input[5].value,
            "currentWorkTitle":input[6].value,
            "currentWorkDuty":input[7].value,
            "teacherType":input[8].value
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
          },function(error){
            console.log("获取error");
          });
          for(var i = 5;i<9;i++){
            input[i].readOnly = true;
            input[i].style.border = "none";
          }
          this.teacherSimpleInfoList[index].hireCampus = input[5].value;
          this.teacherSimpleInfoList[index].currentWorkTitle = input[6].value;
          this.teacherSimpleInfoList[index].currentWorkDuty = input[7].value;
          this.teacherSimpleInfoList[index].teacherType = input[8].value;
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
        },
        restoreClick: function(index){
          var inputTable = document.getElementById("inputTable"+index);
          var input = inputTable.getElementsByTagName("input");
          var editImg = document.getElementById("editImg"+index);
          var saveImg = document.getElementById("saveImg"+index);
          var deleteImg = document.getElementById("deleteImg"+index);
          var restoreImg = document.getElementById("restoreImg"+index);
          for(var i = 5;i<9;i++){
            input[i].readOnly = true;
            input[i].style.border = "none";
          }
          input[5].value = this.teacherSimpleInfoList[index].hireCampus;
          input[6].value = this.teacherSimpleInfoList[index].currentWorkTitle;
          input[7].value = this.teacherSimpleInfoList[index].currentWorkDuty;
          input[8].value = this.teacherSimpleInfoList[index].teacherType;
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
        },
        deleteClick: function(index){
          this.$http.post('./teacherManage/deleteTeacherInfo',{
            "teacherId":this.teacherSimpleInfoList[index].teacherId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
          },function(error){
            console.log("获取error");
          });
          this.teacherSimpleInfoList.splice(index,1);
        }
      }
    }
</script>

<style scoped>
    html {
        font-size: 62.5%;
    }
    #dropdownInfo{
      margin: 0.6rem 5rem;
      background-color: white;
    }
    .inputWM{
      width: 8rem;
      margin: 0 0.7rem;
      text-align: left;
    }
    .buttonWM{
      width: 5.6rem;
      margin: 0 0.7rem;
    }
    input{
      width: 80%;
      text-align: center;
    }
    p{
      font-size: 0.8rem;
      text-align: center;
    }
    img{
      width: 2rem;
      height: 2rem;
      border: thin solid white;
    }
    img:hover{
      cursor: pointer;
      border: thin solid grey;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
