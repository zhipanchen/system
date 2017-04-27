<template>
    <div>
      <div id="dropdownInfo">
        <select id="yearTypeSelect" class="selectWM" v-model="studentinfoKey.schoolYearType" @click="yearTypeClick()">
          <option value="0">选择年制</option>
          <option v-for="yearAndClass in yearAndClassList" :value="yearAndClass.yearType">{{yearAndClass.yearType}}年制</option>
        </select>
        <!--年制选择下拉列表-->
        <select id="gradeSelect" class="selectWM" v-model="studentinfoKey.gradeName" @click="indexYearTypeClick()">
          <option value="0">选择年级</option>
          <option v-for="yearEle in yearAndClassList[indexYearType].gradeList" :value="yearEle.gradeName">{{yearEle.gradeName}}级</option>
        </select>
        <!--年级选择下拉列表-->
        <select id="classSelect" class="selectWM" v-model="studentinfoKey.className" @click="indexGradeClick()">
          <option value="0">选择班级</option>
          <option v-for="classEle in yearAndClassList[indexYearType].gradeList[indexGrade].classList " :value="classEle">{{classEle}}</option>
        </select>
        <!--班级选择下拉列表-->
        <span><input type="text" id="stdID" class="inputWM" placeholder="请输入学号" v-model="studentinfoKey.studentId"></span>
        <span><button id="downloadForm" class="am-btn am-btn-success am-radius buttonWM" @click="moli">下载模板</button></span>
        <span><button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="checkStdInfoClick()">查找</button></span>
        <span><button id="leadIn" class="am-btn am-btn-success am-radius buttonWM">导入</button></span>
        <span><button id="leadOut" class="am-btn am-btn-success am-radius buttonWM">导出</button></span>
      </div>
      <div style="padding: 0.6rem 5rem;background-color: #f3f3f3">
        <div id="stdTable" style="background-color: white">
          <!--学生信息表格-->
          <table id="eduAdminStdTableSy" class="operationTable" style="table-layout: fixed;">
            <!--table-layout: fixed;固定表格格局-->
            <!--margin:0 1%;-->
            <thead>
            <tr>
              <th>学号</th>
              <th>姓名</th>
              <th>身份证号码</th>
              <th>性别</th>
              <th>学制</th>
              <th>年级</th>
              <th>专业</th>
              <th>班级</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(studentSimpleInfo,index) in studentSimpleInfoList" :id="'inputTable'+index">
              <td><input id="input1" :value="studentSimpleInfo.studentId" readonly="readonly" style="border: none"></td>
              <td><input id="input2" :value="studentSimpleInfo.studentName" readonly="readonly" style="border: none"></td>
              <td><input id="input3" :value="studentSimpleInfo.studentIdcard" readonly="readonly" style="border: none"></td>
              <td><input id="input4" :value="studentSimpleInfo.studentGender" readonly="readonly" style="border: none"></td>
              <td><input id="input5" :value="studentSimpleInfo.schoolYearType" readonly="readonly" style="border: none"></td>
              <td><input id="input6" :value="studentSimpleInfo.gradeName" readonly="readonly" style="border: none"></td>
              <td><input id="input7" :value="studentSimpleInfo.specialityName" readonly="readonly" style="border: none"></td>
              <td><input id="input8" :value="studentSimpleInfo.className" readonly="readonly" style="border: none"></td>
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
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              indexYearType:'0',
              indexGrade:'0',
              studentinfoKey:{
                schoolYearType:'0',
                gradeName:'0',
                className:'0',
                studentId:''
              },
              yearAndClassList:[
                {
                  yearType:'3',
                  gradeList:[
                    {
                      gradeName:'2012',
                      classList:[
                        '护理2班','护理3班'
                      ]
                    },
                    {
                      gradeName:'2013',
                      classList:[
                        '护理3班','护理4班'
                      ]
                    }
                  ]
                },
                {
                  yearType:'5',
                  gradeList:[
                    {
                      gradeName:'2015',
                      classList:[
                        '护理5班','护理6班'
                      ]
                    }
                  ]
                }
              ],
              studentSimpleInfoList:[
                  {studentId:'1530310503',studentName:'高兴月',studentIdcard:'321281199503281111',studentGender:'女',schoolYearType:'五年制',gradeName:'2013级',specialityName:'护理',className:'护理3班',birthdate:'1993.02.03',ethno:'汉',nativePlace:'上海',phoneNumber:'15680992212',houseAddress:'成都市青牛区'},
                  {studentId:'1530310503',studentName:'高兴月',studentIdcard:'321281199503281111',studentGender:'女',schoolYearType:'五年制',gradeName:'2013级',specialityName:'护理',className:'护理3班',birthdate:'1993.02.03',ethno:'汉',nativePlace:'上海',phoneNumber:'15680992212',houseAddress:'成都市青牛区'}
                ]
            }
        },
      beforeMount:function() {
        this.$http.post('./studentManage/getGradeAndClassList',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.yearAndClassList = response.body.getGradeAndClassObj.yearAndClassList;
          this.studentSimpleInfoList = response.body.getGradeAndClassObj.studentSimpleInfoList;
        },function(error){
          console.log("获取error");
        });
      },

      methods:{
        yearTypeClick: function(){
          this.studentinfoKey.gradeName = '0';
          this.studentinfoKey.className = '0';
        },
        indexYearTypeClick: function(){
          this.studentinfoKey.className = '0';
          for(var i=0;i<this.yearAndClassList.length;i++){
            if(this.studentinfoKey.schoolYearType === this.yearAndClassList[i].yearType){
              this.indexYearType = i;
            }
          }
        },
        indexGradeClick: function(){
          for(var j=0;j<this.yearAndClassList[this.indexYearType].gradeList.length;j++){
            if(this.studentinfoKey.gradeName === this.yearAndClassList[this.indexYearType].gradeList[j].gradeName){
              this.indexGrade = j;
            }
          }
        },
        checkStdInfoClick: function(){
          this.$http.post('./studentManage/findStudentInfo',{
            "schoolYearType":this.studentinfoKey.schoolYearType,
            "gradeName":this.studentinfoKey.gradeName,
            "className":this.studentinfoKey.className,
            "studentId":this.studentinfoKey.studentId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.studentSimpleInfoList = response.body.studentSimpleInfoList;
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
            input[7].readOnly = false;
            input[7].style.border = "0.1rem solid #d4d4d9";
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
          this.$http.post('./studentManage/editStudentSimpleInfo',{
            "studentId":input[0].value,
            "className":input[7].value
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
          },function(error){
            console.log("获取error");
          });
          input[7].readOnly = true;
//          true或false不可用引号
          input[7].style.border = "none";
          this.studentSimpleInfoList[index].className = input[7].value;
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
          input[7].readOnly = true;
          input[7].style.border = "none";
          input[7].value = this.studentSimpleInfoList[index].className;
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
        },
        deleteClick: function(index){
          this.$http.post('./studentManage/deleteStudentInfo',{
            "studentId":this.studentSimpleInfoList[index].studentId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
          },function(error){
            console.log("获取error");
          });
          this.studentSimpleInfoList.splice(index,1);
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
    .selectWM{
      width: 8rem;
      margin: 0 0.7rem;
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
      width:80%;
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
