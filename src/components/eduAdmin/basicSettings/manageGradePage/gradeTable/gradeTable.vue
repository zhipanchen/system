<template>
  <div style="padding: 0.6rem 5rem;background-color: #f3f3f3">
    <div id="gradeManagementDiv" style="background-color: white">
      <div id="fiveYearDiv" v-show="gradeManagement">
        <button class="amButtom" @click="fiveYearClick"><img id="fiveYearArrow" class="iconImg" :src="icon2"><span class="subtitle">{{firstYearType}}年制</span></button>
        <table id="fiveYearTable" v-show="fiveYearTable"  class="operationTable" style="table-layout: fixed;">
          <tr v-for="(fiveGrade,index) in fiveGrades" :id="'fiveInputTr'+index">
            <td><input class="gradeInput" type="text" :value="fiveGrade.gradeName" readonly="readonly"></td>
            <td><input class="gradeInput" type="text" :value="fiveGrade.studentNum" readonly="readonly"></td>
            <td class="checkGradeInfo" @click="checkGradeInfoClick(firstYearType,fiveGrade.gradeName)"><u>查看年级信息</u></td>
            <td>
              <img :id="'fiveDeleteImg'+index" src="./images/delete.png" @click="deleteGradeClick(firstYearType,fiveGrades,index)">
            </td>
          </tr>
        </table>
      </div>
      <!--3年制年级基本信息表格-->
      <div id="threeYearDiv" v-show="gradeManagement">
        <button class="amButtom" @click="threeYearClick"><img id="threeYearArrow" class="iconImg" :src="icon1"><span class="subtitle">{{secondYearType}}年制</span></button>
        <table id="threeYearTable" v-show="threeYearTable"  class="operationTable" style="table-layout: fixed;">
          <tr v-for="(threeGrade,index) in threeGrades" :id="'threeInputTr'+index">
            <td><input class="gradeInput" type="text" :value="threeGrade.gradeName" readonly="readonly"></td>
            <td><input class="gradeInput" type="text" :value="threeGrade.studentNum" readonly="readonly"></td>
            <td class="checkGradeInfo" @click="checkGradeInfoClick(secondYearType,threeGrade.gradeName)"><u>查看年级信息</u></td>
            <td>
              <img :id="'threeDeleteImg'+index" src="./images/delete.png" @click="deleteGradeClick(secondYearType,threeGrades,index)">
            </td>
          </tr>
        </table>
      </div>
      <!--5年制年级基本信息表格-->
      <div v-show="gradeTable">
        <table id="gradeClassInfoDiv" class="operationTable" style="table-layout: fixed;">
          <thead>
          <tr>
            <th>年级</th>
            <th>专业名称</th>
            <th>班级ID</th>
            <th>班级名称</th>
            <th>班主任姓名</th>
            <th>学制</th>
            <th>班级人数</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(classinfoStr,index) in classinfoStrList" :id="'inputTable'+index">
            <td><input id="input1" :value="classinfoStr.gradeName" readonly="readonly" style="border: none"></td>
            <td><input id="input2" :value="classinfoStr.specialityName" readonly="readonly" style="border: none"></td>
            <td><input id="input3" :value="classinfoStr.classId" readonly="readonly" style="border: none"></td>
            <td><input id="input4" :value="classinfoStr.className" readonly="readonly" style="border: none"></td>
            <td>
              <input id="input5" :value="classinfoStr.classTeacherName" readonly="readonly" style="border: none">
              <select :id="index + 'select'" class="selectWM" v-model="teacherIdEle" style="display: none">
                <option value="0">请选择教师</option>
                <option v-for="teacher in teacherList" :value="teacher.teacherId">{{teacher.teacherName}}</option>
              </select>
            </td>
            <td><input id="input6" :value="classinfoStr.schoolYearType" readonly="readonly" style="border: none"></td>
            <td><input id="input7" :value="classinfoStr.classSize" readonly="readonly" style="border: none"></td>
            <td>
              <img :id="'editImg'+index" class="btnImg" src="./images/edit.png" @click="editClick(index)">
              <img :id="'saveImg'+index" class="btnImg" src="./images/save.png" style="display: none" @click="saveClick(index)">
              <img :id="'deleteImg'+index" class="btnImg" src="./images/delete.png" @click="deleteClick(index)">
              <img :id="'restoreImg'+index" class="btnImg" src="./images/restore.png" style="display: none" @click="restoreClick(index)">
            </td>
          </tr>
          </tbody>
        </table>
        <div id="buttonDiv">
          <span><button id="downloadForm" class="bottomButton am-btn am-btn-success am-radius" @click="downloadFormClick">下载模板</button></span>
          <span style="display: inline-block">
            <Upload
              ref="upload"
              :show-upload-list = false
              :format="['xls','xlsx']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleSizeError"
              :on-progress="handleProgress"
              :on-success="handleSuccess"
              :on-error="handleError"
              action="./gradeManage/uploadClassInfo">
              <button type="ghost" id="leadIn" class="bottomButton am-btn am-btn-success am-radius">上传</button>
            </Upload>
          </span>
          <span><button id="leadOut" class="bottomButton am-btn am-btn-success am-radius" @click="downloadClick">下载</button></span>
          <span><button id="goBack" class="bottomButton am-btn am-btn-success am-radius" @click="goBackClick()">返回</button></span>
        </div>
      </div>
      <!--班级信息表格-->
    </div>
  </div>
</template>

<script>
  import arrowright from "./images/arrowright.png"
  import arrowdown from "./images/arrowdown.png"
  export default {
    name: 'gradeManagementDiv',
    data () {
      return {
        firstYearType:'3',
        secondYearType:'5',
        icon1:arrowright,
        icon2:arrowdown,
        gradeManagement: true,
        fiveArrow: true,
        threeArrow: false,
        fiveYearTable: true,
        threeYearTable: false,
        gradeTable: false,
        teacherIdEle:'0',
        fiveGrades: [
          { gradeName:"2014", studentNum:"167" },
          { gradeName:"2013", studentNum:"167" },
          { gradeName:"2012", studentNum:"167" }
        ],
        threeGrades: [
          { gradeName:"2016", studentNum:"167" },
          { gradeName:"2015", studentNum:"167" },
          { gradeName:"2014", studentNum:"167" }
        ],
        classinfoStrList:[
          {gradeName:'04',specialityName:'护理',classId:'03',className:'护理3班',classTeacherName:'何平',schoolYearType:'五年制',classSize:'43'},
          {gradeName:'04',specialityName:'临床医学',classId:'05',className:'临床医学5班',classTeacherName:'季军',schoolYearType:'五年制',classSize:'54'},
          {gradeName:'04',specialityName:'护理',classId:'01',className:'护理1班',classTeacherName:'李磊',schoolYearType:'五年制',classSize:'31'}
        ],
        teacherList:[
          {teacherName:'何平',teacherId:'123456'},
          {teacherName:'张伟',teacherId:'223456'},
          {teacherName:'李明',teacherId:'323456'}
        ]
      }
    },
    beforeMount:function() {
      this.$http.post('./gradeManage/getGradeInfo',{},{
        "Content-Type":"application/json"
      }).then(function (response) {
        console.log(response);
        this.firstYearType = response.body.yearList[0].yearType;
        this.secondYearType = response.body.yearList[1].yearType;
        this.fiveGrades = response.body.yearList[0].gradeList;
        this.threeGrades = response.body.yearList[1].gradeList;
      },function(error){
        console.log("获取error");
      });
    },
//    初始化页面时，获取3年制和5年制年级信息
    methods: {
      fiveYearClick: function () {
        var fiveYearArrow = document.getElementById("fiveYearArrow");
        if (!this.fiveArrow) {
//              alert("open");
          this.fiveArrow = true;
          this.fiveYearTable = true;
          fiveYearArrow.src = this.icon2;
        } else {
//              alert("close");
          this.fiveArrow = false;
          this.fiveYearTable = false;
          fiveYearArrow.src = this.icon1;
        }
      },
//      点击5年制下拉按钮时，展示或隐藏5年制年级表格
      threeYearClick: function () {
        var threeYearArrow = document.getElementById("threeYearArrow");
        if (!this.threeArrow) {
//              alert("open");
          this.threeArrow = true;
          this.threeYearTable = true;
          threeYearArrow.src = this.icon2;
        } else {
//              alert("close");
          this.threeArrow = false;
          this.threeYearTable = false;
          threeYearArrow.src = this.icon1;
        }
      },
//      点击3年制下拉按钮时，展示或隐藏3年制年级表格
      deleteGradeClick: function(yearType,grades,index){
//          从data中的课程信息数组中删除
//          预留功能,将data提交到后端,实现删除数据,处理回调
        if(confirm("您确定删除该课程吗？")){
          this.$http.post('./gradeManage/deleteGrade',{
            "yearType":yearType,
            "gradeName":grades[index].gradeName
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
          },function(error){
            console.log("获取error");
          });
          grades.splice(index, 1);
        }
      },
//      删除年级信息
      checkGradeInfoClick: function(yearType,gradeName){
        this.$http.post('./gradeManage/getGradeDetail',{
          "yearType":yearType,
          "gradeName":gradeName
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.classinfoStrList = response.body.classAndTeacherList.classinfoStrList;
          this.teacherList = response.body.classAndTeacherList.teacherList;
        },function(error){
          console.log("获取error");
        });
        this.gradeTable = true;
        this.gradeManagement = false;
      },
//      查看年级具体班级信息，从年级信息页面跳转的班级信息页面
      editClick: function(index){
        var inputTable = document.getElementById("inputTable"+index);
        var input = inputTable.getElementsByTagName("input");
        var select = document.getElementById(index + "select");
        var editImg = document.getElementById("editImg"+index);
        var saveImg = document.getElementById("saveImg"+index);
        var deleteImg = document.getElementById("deleteImg"+index);
        var restoreImg = document.getElementById("restoreImg"+index);
        this.teacherIdEle = '0';
        input[4].style.display = "none";
        select.style.display = "inline";
        editImg.style.display = "none";
        saveImg.style.display = "inline";
        deleteImg.style.display = "none";
        restoreImg.style.display = "inline";
      },
//      修改班级信息，包括教师
      saveClick: function(index){
        var inputTable = document.getElementById("inputTable"+index);
        var input = inputTable.getElementsByTagName("input");
        var select = document.getElementById(index + "select");
        var editImg = document.getElementById("editImg"+index);
        var saveImg = document.getElementById("saveImg"+index);
        var deleteImg = document.getElementById("deleteImg"+index);
        var restoreImg = document.getElementById("restoreImg"+index);
        this.$http.post('./gradeManage/editClassInfo',{
          "classId":this.classinfoStrList[index].classId,
          "classTeacherId":this.teacherIdEle
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
        },function(error){
          console.log("获取error");
        });
        for(var i=0;i<this.teacherList.length;i++){
          if(this.teacherIdEle === this.teacherList[i].teacherId){
            this.classinfoStrList[index].classTeacherName = this.teacherList[i].teacherName;
          }
        }
        input[4].style.display = "inline";
        select.style.display = "none";
        editImg.style.display = "inline";
        saveImg.style.display = "none";
        deleteImg.style.display = "inline";
        restoreImg.style.display = "none";
      },
//      保存对班级信息的修改
      restoreClick: function(index){
        var inputTable = document.getElementById("inputTable"+index);
        var input = inputTable.getElementsByTagName("input");
        var select = document.getElementById(index + "select");
        var editImg = document.getElementById("editImg"+index);
        var saveImg = document.getElementById("saveImg"+index);
        var deleteImg = document.getElementById("deleteImg"+index);
        var restoreImg = document.getElementById("restoreImg"+index);
        var i = null;
        for(i = 0;i<input.length;i++){
          input[i].readOnly = true;
          input[i].style.border = "none";
        }
        input[4].style.display = "inline";
        select.style.display = "none";
        editImg.style.display = "inline";
        saveImg.style.display = "none";
        deleteImg.style.display = "inline";
        restoreImg.style.display = "none";
      },
//      取消班级信息修改
      deleteClick: function(index){
        this.$http.post('./gradeManage/deleteClassInfo',{
          "classId":this.classinfoStrList[index].classId
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
        },function(error){
          console.log("获取error");
        });
        this.classinfoStrList.splice(index,1);
      },
//      删除该班级以及该班级的所有信息
      handleFormatError:function(file){
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传xls或xlsx表格。'
        });
      },
//      提醒用户上传文件格式不正确
      handleSizeError:function(file){
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      },
//      提醒用户上传文件大小超过限制
      handleProgress:function(){
        this.$Message.loading("正在上传中...");
      },
//      提醒用户文件正在上传
      handleSuccess:function(res){
        if(res.result==='1'){
          this.$Message.success("上传成功！");
        }else{
          this.$Message.error(res.result);
        }
      },
//      提醒用户上传成功或者失败的原因（文件已上传到数据库，但文件内容问题）
      handleError:function(){
        this.$Message.error("上传失败");
      },
//      提醒用户上传失败（文件未上传到数据库）
      downloadFormClick:function(){
        location.href="./gradeManage/exportClassInfoTemplet";
      },
//      下载模板
      downloadClick:function(){
        location.href="./gradeManage/exportClassInfo";
      },
//      下载班级信息
      goBackClick: function(){
        this.gradeTable = false;
        this.gradeManagement = true;
      }
//      从班级信息页面返回年级信息页面
    }
  }
</script>

<style scoped>
  html {
  }
  .dropDown{
    margin: 0.5rem 5rem;
  }
  input{
    text-align: center;
    width: 80%;
  }
  .checkGradeInfo{
    color: #158064;
    cursor: pointer;
  }
  .checkGradeInfo:hover{
    color: black;
  }
  .bottomButton{
    margin-top: 1rem;
    margin-right: 1.4rem;
    min-width: 5.6rem;
  }
  #buttonDiv{
    text-align: center;
  }
  .gradeInput{
    font-size: 0.5rem;
    width: 35%;
    border: none;
    outline: none;
  }
  img{
     position: relative;
     margin: 0.5rem 0.2rem;
     width: 1.5rem;
     height: 1.5rem
   }
  img:hover{
    cursor: pointer;
  }
  .btnImg{
    width: 2rem;
    height: 2rem;
    border: thin solid white;
  }
  .btnImg:hover{
    cursor: pointer;
    border: thin solid grey;
  }
  .imgLeft{
    float:left;
    margin-left: 5rem;
  }
  .selectWM{
    width: 80%;
  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>
