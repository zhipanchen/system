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
              <img :id="'fiveEditImg'+index" src="./images/edit.png" @click="editGradeClick('five',index)">
              <img :id="'fiveSaveImg'+index" src="./images/save.png" style="display: none" @click="saveGradeClick(firstYearType,'five',index)">
              <img :id="'fiveDeleteImg'+index" src="./images/delete.png" @click="deleteGradeClick(firstYearType,fiveGrades,index)">
              <img :id="'fiveRestoreImg'+index" src="./images/restore.png" style="display: none" @click="restoreGradeClick('five',index)">
            </td>
          </tr>
          <tr>
            <td><img :id="'fiveAddImg'+index" src="./images/add.png" @click="addGradeClick(fiveGrades)"></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div id="threeYearDiv" v-show="gradeManagement">
        <button class="amButtom" @click="threeYearClick"><img id="threeYearArrow" class="iconImg" :src="icon1"><span class="subtitle">{{secondYearType}}年制</span></button>
        <table id="threeYearTable" v-show="threeYearTable"  class="operationTable" style="table-layout: fixed;">
          <tr v-for="(threeGrade,index) in threeGrades" :id="'threeInputTr'+index">
            <td><input class="gradeInput" type="text" :value="threeGrade.gradeName" readonly="readonly"></td>
            <td><input class="gradeInput" type="text" :value="threeGrade.studentNum" readonly="readonly"></td>
            <td class="checkGradeInfo" @click="checkGradeInfoClick(secondYearType,threeGrade.gradeName)"><u>查看年级信息</u></td>
            <td>
              <img :id="'threeEditImg'+index" src="./images/edit.png" @click="editGradeClick('three',index)">
              <img :id="'threeSaveImg'+index" src="./images/save.png" style="display: none" @click="saveGradeClick(secondYearType,'three',index)">
              <img :id="'threeDeleteImg'+index" src="./images/delete.png" @click="deleteGradeClick(secondYearType,threeGrades,index)">
              <img :id="'threeRestoreImg'+index" src="./images/restore.png" style="display: none" @click="restoreGradeClick('three',index)">
            </td>
          </tr>
          <tr>
            <td><img :id="'threeAddImg'+index" src="./images/add.png" @click="addGradeClick(threeGrades)"></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
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
            <td><input id="input5" :value="classinfoStr.classTeacherName" readonly="readonly" style="border: none"></td>
            <td><input id="input6" :value="classinfoStr.schoolYearType" readonly="readonly" style="border: none"></td>
            <td><input id="input7" :value="classinfoStr.classSize" readonly="readonly" style="border: none"></td>
            <td>
              <img :id="'editImg'+index" class="btnImg" src="./images/edit.png" @click="editClick(index)">
              <img :id="'saveImg'+index" class="btnImg" src="./images/save.png" style="display: none" @click="saveClick(index)">
              <img :id="'deleteImg'+index" class="btnImg" src="./images/delete.png" @click="deleteClick(index)">
              <img :id="'restoreImg'+index" class="btnImg" src="./images/restore.png" style="display: none" @click="restoreClick(index)">
            </td>
          </tr>
          <tr>
            <td colspan="9"><img :id="'addImg'+index" class="imgLeft" src="./images/add.png" @click="addClick()"></td>
          </tr>
          </tbody>
        </table>
        <div id="buttonDiv">
          <span><button id="downloadForm" class="bottomButton am-btn am-btn-success am-radius" @click="">下载模板</button></span>
          <span><button id="leadIn" class="bottomButton am-btn am-btn-success am-radius" @click="">导入</button></span>
          <span><button id="leadOut" class="bottomButton am-btn am-btn-success am-radius" @click="">导出</button></span>
          <span><button id="goBack" class="bottomButton am-btn am-btn-success am-radius" @click="goBackClick()">返回</button></span>
        </div>
      </div>
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
      editGradeClick: function(year,index){
        var inputTr = document.getElementById(year+"InputTr"+index);
        var input = inputTr.getElementsByTagName("input");
        var editImg = document.getElementById(year+"EditImg"+index);
        var saveImg = document.getElementById(year+"SaveImg"+index);
        var restoreImg = document.getElementById(year+"RestoreImg"+index);
        var deleteImg = document.getElementById(year+"DeleteImg"+index);
//          使课程信息的输入标签变为可输入，显示边框
          input[1].readOnly = false;
          input[1].style.border = "0.1rem solid #d4d4d9";
//        隐藏编辑和删除功能图标,显示保存和重置功能图标
        editImg.style.display = "none";
        saveImg.style.display = "inline";
        deleteImg.style.display = "none";
        restoreImg.style.display = "inline";
      },
      saveGradeClick: function(yearType,year,index){
        if(confirm("您确定提交保存该课程吗？")){
          var inputTr = document.getElementById(year+"InputTr"+index);
          var input = inputTr.getElementsByTagName("input");
          var editImg = document.getElementById(year+"EditImg"+index);
          var saveImg = document.getElementById(year+"SaveImg"+index);
          var restoreImg = document.getElementById(year+"RestoreImg"+index);
          var deleteImg = document.getElementById(year+"DeleteImg"+index);
          var i = null;
    //            保存数据到data,虽然input的value和data中的属性绑定,但并不是完成的双向,此时data中的属性数据并没有发生修改
          this.$http.post('../saveGradeInfoJson',{
            "yearType":yearType,
            "gradeName":input[0].value,
            "studentNum":input[1].value
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
          },function(error){
            console.log("获取error");
          });
          if(year == "five"){
            this.fiveGrades[index].studentNum = input[1].value;
            console.log(this.fiveCourses);
          }
          if(year == "three"){
            this.threeGrades[index].studentNum = input[1].value;
          }
            input[1].readOnly = true;
            input[1].style.border = "none";
    //          预留功能,将data提交到后端,实现保存数据,处理回调
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
        }
      },
      restoreGradeClick: function(year,index){
        if(confirm("您确定取消编辑并重置该课程信息吗？")){
          var inputTr = document.getElementById(year+"InputTr"+index);
          var input = inputTr.getElementsByTagName("input");
          var editImg = document.getElementById(year+"EditImg"+index);
          var saveImg = document.getElementById(year+"SaveImg"+index);
          var restoreImg = document.getElementById(year+"RestoreImg"+index);
          var deleteImg = document.getElementById(year+"DeleteImg"+index);
          var i = null;
//            重置数据到value,虽然input的value和data中的属性绑定,但并不是完全的双向,此时data中的属性数据并没有发生修改
          if(year == "five"){
            input[1].value = this.fiveGrades[index].studentNum;
          }
          if(year == "three"){
            input[1].value = this.threeGrades[index].studentNum;
          }
//          使课程信息的输入标签变为不可输入，隐藏边框
            input[1].readOnly = true;
            input[1].style.border = "none";
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
        }
      },
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
      addGradeClick: function (grades){
        grades.push(
            { gradeName:"", studentNum:"" }
        );
      },
      checkGradeInfoClick: function(yearType,gradeName){
        this.$http.post('./gradeManage/getGradeDetail',{
          "yearType":yearType,
          "gradeName":gradeName
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.classinfoStrList = response.body.classinfoStrList;
        },function(error){
          console.log("获取error");
        });
        this.gradeTable = true;
        this.gradeManagement = false;
      },
      goBackClick: function(){
        this.gradeTable = false;
        this.gradeManagement = true;
      },
      editClick: function(index){
        var inputTable = document.getElementById("inputTable"+index);
        var input = inputTable.getElementsByTagName("input");
        var editImg = document.getElementById("editImg"+index);
        var saveImg = document.getElementById("saveImg"+index);
        var deleteImg = document.getElementById("deleteImg"+index);
        var restoreImg = document.getElementById("restoreImg"+index);
        var i = null;
        for(i = 0;i<input.length;i++){
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
        var i = null;
        this.$http.post('./gradeManage/editClassInfo',{
          "gradeName":input[0].value ,
          "specialityName":input[1].value ,
          "classId":input[2].value ,
          "className":input[3].value ,
          "classTeacherName":input[4].value ,
          "schoolYearType":input[5].value ,
          "classSize":input[6].value
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
        },function(error){
          console.log("获取error");
        });
        for(i = 0;i<input.length;i++){
          input[i].readOnly = true;
          input[i].style.border = "none";
        }
        this.classinfoStrList[index].gradeName = input[0].value;
        this.classinfoStrList[index].specialityName = input[1].value;
        this.classinfoStrList[index].classId = input[2].value;
        this.classinfoStrList[index].className = input[3].value;
        this.classinfoStrList[index].classTeacherName = input[4].value;
        this.classinfoStrList[index].schoolYearType = input[5].value;
        this.classinfoStrList[index].classSize = input[6].value;
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
        var i = null;
        for(i = 0;i<input.length;i++){
          input[i].readOnly = true;
          input[i].style.border = "none";
        }
        input[0].value = this.classinfoStrList[index].gradeName;
        input[1].value = this.classinfoStrList[index].specialityName;
        input[2].value = this.classinfoStrList[index].classId;
        input[3].value = this.classinfoStrList[index].className;
        input[4].value = this.classinfoStrList[index].classTeacherName;
        input[5].value  = this.classinfoStrList[index].schoolYearType;
        input[6].value = this.classinfoStrList[index].classSize;
        editImg.style.display = "inline";
        saveImg.style.display = "none";
        deleteImg.style.display = "inline";
        restoreImg.style.display = "none";
      },
      deleteClick: function(index){
        this.$http.post('./gradeManage/deleteClassInfo',{
          "classId":this.classinfoStrList[index].classinfoStrList
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
        },function(error){
          console.log("获取error");
        });
        this.classinfoStrList.splice(index,1);
      },
      addClick: function(){
        this.classinfoStrList.push(
          { gradeName:"", specialityName:"", classId:"", className:"",classTeacherName:"",schoolYearType:"",classSize:"" }
        );
      }
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
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>
