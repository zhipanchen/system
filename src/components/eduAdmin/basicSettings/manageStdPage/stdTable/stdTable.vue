<template>
    <div>
      <div id="dropdownInfo">
        <select id="yearTypeSelect" class="selectWM" v-model="studentinfoKey.schoolYearType" @click="yearTypeClick()">
          <option value="0">选择年制</option>
          <option v-for="yearAndClass in yearAndClassList" :value="yearAndClass.yearType">{{yearAndClass.yearType}}年制</option>
        </select>
        <!--年制选择下拉列表-->
        <select id="gradeSelect" class="selectWM" v-model="studentinfoKey.gradeId" @click="indexYearTypeClick()">
          <option value="0">选择年级</option>
          <option v-if="studentinfoKey.schoolYearType!='0'" v-for="yearEle in yearAndClassList[indexYearType].gradeList" :value="yearEle.gradeId">{{yearEle.gradeName}}级</option>
        </select>
        <!--年级选择下拉列表-->
        <select id="classSelect" class="selectWM" v-model="studentinfoKey.classId" @click="indexGradeClick()">
          <option value="0">选择班级</option>
          <option v-if="studentinfoKey.gradeId!='0'" v-for="classEle in yearAndClassList[indexYearType].gradeList[indexGrade].classList " :value="classEle.classId">{{classEle.classId}}</option>
        </select>
        <!--班级选择下拉列表-->
        <span><input type="text" id="stdID" class="inputWM" placeholder="请输入学号" v-model="studentinfoKey.studentId"></span>
        <span><button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="checkStdInfoClick()">查找</button></span>
        <span><button id="downloadForm" class="am-btn am-btn-success am-radius buttonWM" @click="downloadFormClick">下载模板</button></span>
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
            action="./studentManage/uploadStudentSimpleInfo">
          <button type="ghost" id="leadIn" class="am-btn am-btn-success am-radius buttonWM">上传</button>
          </Upload>
        </span>
        <!--上传文件-->
        <span><button id="leadOut" class="am-btn am-btn-success am-radius buttonWM" @click="downloadClick">下载</button></span>
      </div>
      <div>
        <modal v-model="modalDownloadBool" width="400" id="modalBody">
          <div style="text-align: center;font-size: 1.1rem;">
            <p v-if="downloadMsg === '1'">文件格式不正确，请上传xls或xlsx表格。</p>
            <p v-else-if="downloadMsg === '2'">文件太大，不能超过 2M</p>
            <p v-else-if="downloadMsg === '3'">上传成功!</p>
            <p v-else-if="downloadMsg === '4'">上传失败!</p>
            <p v-else>{{downloadMsg}}</p>
          </div>
          <div slot="footer" style="text-align: center">
            <button id="modalBtn" @click="checkOk">确定</button>
          </div>
        </modal>
      </div>
      <!--上传文件出错信息提示弹窗-->
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
              <td><input id="input3" :value="studentSimpleInfo.studentIDcard" readonly="readonly" style="border: none"></td>
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
      <!--学生信息table-->
      <div>
        <modal v-model="modalOperateBool" width="400" id="modalBody">
          <div style="text-align: center;font-size: 1.1rem;">
            <p v-if="operateMsg==='1'">是否确定保存修改</p>
            <p v-else-if="operateMsg==='2'">是否确定取消修改</p>
            <p v-else>是否确定删除</p>
          </div>
          <div slot="footer" style="text-align: center">
            <button v-if="operateMsg==='1'" id="modalBtn" @click="saveOk()">确定</button>
            <button v-else-if="operateMsg==='2'" id="modalBtn" @click="cancelOk()">确定</button>
            <button v-else id="modalBtn" @click="deleteOk()">确定</button>
            <button id="modalBtn" @click="operateCancel">取消</button>
          </div>
        </modal>
        <!--确认保存、删除操作弹窗-->
        <modal v-model="modalResultBool" width="400" id="modalBody">
          <div style="text-align: center;font-size: 1.1rem;">
            <p v-if="operateMsg === '1'&&resultMsg === '1'">保存修改成功</p>
            <p v-else-if="operateMsg === '1'&&resultMsg === '0'">保存修改失败</p>
            <p v-else-if="operateMsg === '3'&&resultMsg === '1'">删除成功</p>
            <p v-else-if="operateMsg === '3'&&resultMsg === '0'">删除失败</p>
            <p v-else>处理出错</p>
          </div>
          <div slot="footer" style="text-align: center">
            <button id="modalBtn" @click="resultOk">确定</button>
          </div>
        </modal>
        <!--操作成功或失败提示弹窗-->
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
                gradeId:'0',
                classId:'0',
                studentId:''
              },
              yearAndClassList:[
                {
                  yearType:'3',
                  gradeList:[
                    {
                      gradeName:'2012',
                      gradeId:'111',
                      classList:[
                        {className:'护理2班',classId:'111'},
                        {className:'临床2班',classId:'222'}
                      ]
                    },
                    {
                      gradeName:'2013',
                      gradeId:'222',
                      classList:[
                        {className:'护理3班',classId:'333'},
                        {className:'临床3班',classId:'444'}
                      ]
                    }
                  ]
                },
                {
                  yearType:'5',
                  gradeList:[
                    {
                      gradeName:'2015',
                      gradeId:'111',
                      classList:[
                        {className:'护理4班',classId:'555'},
                        {className:'临床4班',classId:'666'}
                      ]
                    }
                  ]
                }
              ],
              studentSimpleInfoList:[
                  {studentId:'1530310503',studentName:'高兴月',studentIDcard:'321281199503281111',studentGender:'女',schoolYearType:'五年制',gradeName:'2013级',specialityName:'护理',className:'护理3班',birthdate:'1993.02.03',ethno:'汉',nativePlace:'上海',phoneNumber:'15680992212',houseAddress:'成都市青牛区'},
                  {studentId:'1530310503',studentName:'高兴月',studentIDcard:'321281199503281111',studentGender:'女',schoolYearType:'五年制',gradeName:'2013级',specialityName:'护理',className:'护理3班',birthdate:'1993.02.03',ethno:'汉',nativePlace:'上海',phoneNumber:'15680992212',houseAddress:'成都市青牛区'}
                ],
              index:'',
              modalDownloadBool:false,
              modalOperateBool:false,
              modalResultBool:false,
              downloadMsg:'',
              operateMsg:'',
              resultMsg:'1'
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
//      初始化函数，获取年制、年级、班级信息，用于select下拉框，获取学生信息，用于学生信息table
      methods:{
        yearTypeClick: function(){
          this.studentinfoKey.gradeId = '0';
          this.studentinfoKey.classId = '0';
        },
//        点击年制下拉框时，将年级、班级下拉框清空
        indexYearTypeClick: function(){
          this.studentinfoKey.className = '0';
          for(var i=0;i<this.yearAndClassList.length;i++){
            if(this.studentinfoKey.schoolYearType === this.yearAndClassList[i].yearType){
              this.indexYearType = i;
            }
          }
        },
//        点击选择年制后，将年级下拉框下拉的可选内容改为相应年制的年级
        indexGradeClick: function(){
          for(var j=0;j<this.yearAndClassList[this.indexYearType].gradeList.length;j++){
            if(this.studentinfoKey.gradeName === this.yearAndClassList[this.indexYearType].gradeList[j].gradeName){
              this.indexGrade = j;
            }
          }
        },
//        点击选择年级后，将班级下拉框下拉的可选内容改为相应年级的班级
        checkStdInfoClick: function(){
          this.$http.post('./studentManage/findStudentInfo',{
            "schoolYearType":this.studentinfoKey.schoolYearType,
            "gradeId":this.studentinfoKey.gradeId,
            "classId":this.studentinfoKey.classId,
            "studentId":this.studentinfoKey.studentId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            var result = response.body.result;
            if(result === "0"){
              alert("请输入正确的学生信息！");
            }else{
              this.studentSimpleInfoList = response.body.studentSimpleInfoList;
            }
          },function(error){
            console.log("获取error");
          });
        },
//        查询学生成绩：向后台提交年制、年级、班级，后台返回相应的学生信息
        handleFormatError:function(){
          this.downloadMsg = "1";
          this.modalDownloadBool = true;
        },
        handleSizeError:function(){
          this.downloadMsg = "2";
          this.modalDownloadBool = true;
        },
        handleProgress:function(){
          this.$Message.loading("正在上传中...");
        },
        handleSuccess:function(res){
          if(res.result==='1'){
            this.downloadMsg = "3";
            setTimeout("location.reload(true)", 4000); //4秒后刷新页面
          }else{
            this.downloadMsg = res.result;
          }
          this.modalDownloadBool = true;
        },
        handleError:function(){
          this.downloadMsg = "4";
          this.modalDownloadBool = true;
        },
        downloadFormClick:function(){
          location.href="./studentManage/exportStudentSimpleInfoTemplet";
        },
        downloadClick:function(){
          location.href="./studentManage/exportStudentSimpleInfo";
        },
        checkOk:function(){
          this.modalDownloadBool = false;
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
        saveClick:function(index){
          this.modalOperateBool = true;
          this.operateMsg = "1";
          this.index = index;
        },
        restoreClick:function(index){
          this.modalOperateBool = true;
          this.operateMsg = "2";
          this.index = index;
        },
        deleteClick:function(index){
          this.modalOperateBool = true;
          this.operateMsg = "3";
          this.index = index;
        },
        saveOk: function(){
          var inputTable = document.getElementById("inputTable"+this.index);
          var input = inputTable.getElementsByTagName("input");
          var editImg = document.getElementById("editImg"+this.index);
          var saveImg = document.getElementById("saveImg"+this.index);
          var deleteImg = document.getElementById("deleteImg"+this.index);
          var restoreImg = document.getElementById("restoreImg"+this.index);
          this.$http.post('./studentManage/editStudentSimpleInfo',{
            "studentId":input[0].value,
            "className":input[7].value
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.resultMsg=response.body.result;
            if(this.resultMsg==='1'){
              this.studentSimpleInfoList[this.index].className = input[7].value;
            }
          },function(error){
            console.log("获取error");
          });
          input[7].readOnly = true;
//          true或false不可用引号
          input[7].style.border = "none";
          this.modalOperateBool = false;
          this.modalResultBool = true;
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
        },
        cancelOk: function(){
          var inputTable = document.getElementById("inputTable"+this.index);
          var input = inputTable.getElementsByTagName("input");
          var editImg = document.getElementById("editImg"+this.index);
          var saveImg = document.getElementById("saveImg"+this.index);
          var deleteImg = document.getElementById("deleteImg"+this.index);
          var restoreImg = document.getElementById("restoreImg"+this.index);
          input[7].readOnly = true;
          input[7].style.border = "none";
          input[7].value = this.studentSimpleInfoList[this.index].className;
          this.modalOperateBool = false;
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
        },
        deleteOk: function(index){
          this.$http.post('./studentManage/deleteStudentInfo',{
            "studentId":this.studentSimpleInfoList[this.index].studentId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.resultMsg=response.body.result;
            if(this.resultMsg==='1'){
              this.studentSimpleInfoList.splice(this.index,1);
            }
          },function(error){
            console.log("获取error");
          });
          this.modalOperateBool = false;
          this.modalResultBool = true;
        },
        resultOk: function(){
          this.modalResultBool = false;
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
