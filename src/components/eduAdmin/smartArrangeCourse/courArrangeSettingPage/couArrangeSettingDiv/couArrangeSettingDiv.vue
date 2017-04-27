<template>
  <div id="courseArrangeSettingDiv">
    <div class="blank"></div>
    <div class="dropDown">
      <div id="fiveYearDiv">
        <button class="amButtom" @click="fiveYearClick"><img id="fiveYearArrow" class="iconImg" :src="icon2"><span class="subtitle">五年制</span></button>
        <!--按钮实现点击显示或隐藏，p标签通过css模拟箭头符号-->
        <table id="fiveYearTable" v-show="fiveYearTable">
          <thead>
            <tr class="headTr">
            <td>课程名称</td>
            <td>课程编号</td>
            <td>任课教师</td>
            <td>教师编号</td>
            <td>班级</td>
            <!--<td class="operationTd"><button class="importButton" @click="ImportClick('five')">导入</button></td>-->
            <td>
              <Upload
                id="upload"
                ref="uploadForTextbook"
                :show-upload-list="false"
                :format="['xls','xlsx']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleSize"
                :on-success="handleSuccess"
                :on-progress="handleProgress"
                :on-error="handleError"
                action="../updateTest/updata.php">
              <i-button type="ghost" id="importButton1">导入</i-button>
              </Upload>
              <!--操作-->
            </td>
          </tr>
          </thead>
          <tbody>
            <!--循环生成课程信息，index作为data数组的下标索引，将index用作id的一部分，便于准确定位操作DOM，key用于绑定课程信息，保证索引不随着数组元素增删自动发生变化-->
            <tr v-for="(fiveCourse,index) in fiveCourses" :id="'fiveInputTr'+index" :key="fiveCourse.id">
              <td><input type="text" v-model="fiveCourse.name" readonly="readonly"></td>
              <td><input type="text" v-model="fiveCourse.number" readonly="readonly"></td>
              <td><input type="text" v-model="fiveCourse.teacher" readonly="readonly"></td>
              <td><input type="text" v-model="fiveCourse.teacherId" readonly="readonly"></td>
              <td class="classTd">
                <select v-model="fiveCourse.classId" disabled>
                  <option v-for="className in classNames" :value="className.id">{{ className.name }}</option>
                </select>
                <!--<select v-model="fiveCourse.class2" disabled>
                  <option v-for="className in classNames" :value="className.id">{{ className.name }}</option>
                </select>-->
              </td>
              <td class="operationTd">
                <!--编辑功能，初始显示，编辑时隐藏-->
                <img :id="'fiveEditImg'+index" src="../../../../../assets/images/edit.png" @click="editClick('five',index)">
                <!--保存功能，初始隐藏，编辑时显示-->
                <img :id="'fiveSaveImg'+index" class="saveImg" src="../../../../../assets/images/save.png" @click="saveClick(fiveCourses,'five',index)">
                <!--取消编辑并重置，初始隐藏，编辑时显示-->
                <img :id="'fiveRestoreImg'+index" class="restoreImg" src="../../../../../assets/images/restore.png" @click="restoreClick('five',index)">
                <!--删除功能，初始显示，编辑时隐藏-->
                <img :id="'fiveDeleteImg'+index" src="../../../../../assets/images/delete.png" @click="deleteClick('five',index)">
              </td>
            </tr>
            <tr>
              <!--增加功能，通过vue增加循环数组元素，但input DOM不会即时创建，所以暂时无法增加的同时处于编辑状态-->
              <td><img src="../../../../../assets/images/add.png" @click="addClick(fiveCourses,'five')"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="threeYearDiv">
        <button class="amButtom" @click="threeYearClick"><img id="threeYearArrow" class="iconImg" :src="icon1"><span class="subtitle">三年制</span></button>
        <table id="threeYearTable" v-show="threeYearTable">
          <thead>
            <tr class="headTr">
            <td>课程名称</td>
            <td>课程编号</td>
            <td>任课教师</td>
            <td>教师编号</td>
            <td>班级</td>
            <td>
              <Upload
                id="upload"
                ref="uploadForTextbook"
                :show-upload-list="false"
                :format="['xls','xlsx']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleSize"
                :on-success="handleSuccess"
                :on-progress="handleProgress"
                :on-error="handleError"
                action="../updateTest/updata.php">
                <i-button type="ghost" id="importButton2">导入</i-button>
              </Upload>
              <!--操作-->
            </td>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(threeCourse,index) in threeCourses" :id="'threeInputTr'+index" :key="threeCourse.id">
              <td><input type="text" v-model="threeCourse.name" readonly="true"></td>
              <td><input type="text" v-model="threeCourse.number" readonly="true"></td>
              <td><input type="text" v-model="threeCourse.teacher" readonly="true"></td>
              <td><input type="text" v-model="threeCourse.teacherId" readonly="true"></td>
              <td class="classTd">
                <select v-model="threeCourse.classId" disabled>
                  <option v-for="className in classNames" :value="className.id">{{ className.name }}</option>
                </select>
                <!--<select v-model="threeCourse.class2" disabled>
                  <option v-for="className in classNames" :value="className.id">{{ className.name }}</option>
                </select>-->
              </td>
              <td class="operationTd">
                <img :id="'threeEditImg'+index" src="../../../../../assets/images/edit.png" @click="editClick('three',index)">
                <img :id="'threeSaveImg'+index" class="saveImg" src="../../../../../assets/images/save.png" @click="saveClick(threeCourses,'three',index)">
                <img :id="'threeRestoreImg'+index" class="restoreImg" src="../../../../../assets/images/restore.png" @click="restoreClick('three',index)">
                <img :id="'threeDeleteImg'+index" src="../../../../../assets/images/delete.png" @click="deleteClick('three',index)">
              </td>
            </tr>
            <tr>
              <td><img src="../../../../../assets/images/add.png" @click="addClick(threeCourses,'three')"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'courseArrangeSettingDiv',
    data () {
      return {
        icon1:require('../../../../../assets/images/icon1.png'),
        icon2:require('../../../../../assets/images/icon2.png'),
        fiveArrow: true,
//        五年制课程下拉箭头，初始为下拉显示
        threeArrow: false,
//        三年制课程下拉箭头，初始为下拉隐藏
        fiveYearTable: true,
//        五年制课程下拉内容，初始为下拉显示
        threeYearTable: false,
//        三年制课程下拉内容，初始为下拉隐藏
        fiveCourses: [
          /*{ id:"1", name:"护理学管理", number:"1", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"2", name:"护理学管理", number:"2", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"3", name:"护理学管理", number:"3", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"4", name:"护理学管理", number:"4", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"5", name:"护理学管理", number:"5", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"6", name:"护理学管理", number:"6", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"7", name:"护理学管理", number:"7", teacher:"1", teacherId:"1", class1:"1", class2:"1" },*/
        ],
//              五年制课程信息
        threeCourses: [
          /*{ id:"1", name:"护理学管理", number:"1", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"2", name:"护理学管理", number:"2", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"3", name:"护理学管理", number:"3", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"4", name:"护理学管理", number:"4", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"5", name:"护理学管理", number:"5", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"6", name:"护理学管理", number:"6", teacher:"", teacherId:"", class1:"", class2:"" },
          { id:"7", name:"护理学管理", number:"7", teacher:"", teacherId:"", class1:"", class2:"" },*/
        ],
        classNames: [
          { id:"101", name:"高职2013级1班" },
          { id:"102", name:"高职2013级2班" },
          { id:"103", name:"高职2014级1班" },
          { id:"104", name:"高职2014级2班" },
          { id:"105", name:"高职2015级1班" },
          { id:"106", name:"高职2015级2班" },
          { id:"107", name:"高职2016级1班" },
          { id:"108", name:"高职2016级2班" },
          { id:"109", name:"中职2015级1班" },
          { id:"110", name:"中职2015级2班" },
          { id:"111", name:"中职2015级3班" },
          { id:"112", name:"中职2015级4班" },
          { id:"113", name:"中职2015级5班" },
          { id:"114", name:"中职2016级1班" },
          { id:"115", name:"中职2016级2班" },
          { id:"116", name:"中职2016级3班" },
          { id:"117", name:"中职2016级4班" }
        ],
//              三年制课程信息
//        loadingMsg: false,
        buffer_fiveCourses: [],
        buffer_threeCourses: []
      }
    },
    mounted: function(){
      var importButton1 = document.getElementById("importButton1");
      var importButton2 = document.getElementById("importButton2");
      importButton1.className = "am-btn am-btn-success am-radius";
      importButton2.className = "am-btn am-btn-success am-radius";
    },
    beforeMount: function() {
//      this.$http.post('./courseAssociationManege.action',{},{
      this.$http.post('../testPhp/courseArrangeSetting.php',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        console.log("获取:");
        console.log(response.body);
        var data = response.body.courseTeacherList;
        this.fiveCourses = [];
        this.threeCourses = [];
        for(var i = 0;i < data.length;i++){
          if(data[i].schoolYearType == 5){
            this.fiveCourses.push({ "id":data[i].courseAssociationId, "name":data[i].courseName, "number":data[i].courseId, "teacher":data[i].teacherName, "teacherId":data[i].teacherId, "classId":data[i].classId });
          }else if(data[i].schoolYearType == 3){
            this.threeCourses.push({ "id":data[i].courseAssociationId, "name":data[i].courseName, "number":data[i].courseId, "teacher":data[i].teacherName, "teacherId":data[i].teacherId, "classId":data[i].classId });
          }
        }
        for(var i = 0;i < this.fiveCourses.length;i++){
          this.buffer_fiveCourses.push({ id:"", name:"", number:"", teacher:"", teacherId:"", classId:"" });
        }
        for(var i = 0;i < this.threeCourses.length;i++){
          this.buffer_threeCourses.push({ id:"", name:"", number:"", teacher:"", teacherId:"", classId:"" });
        }
      },function(error){
        console.log("获取error:");
        console.log(error);
      });
    },
    methods: {
//        点击显示或隐藏五年制下拉课程信息
      fiveYearClick: function(){
        var fiveYearArrow = document.getElementById("fiveYearArrow");
//              显示下拉课程信息
        if(!this.fiveArrow){
          this.fiveArrow = true;
          this.fiveYearTable = true;
          fiveYearArrow.src = this.icon2;
        }else{
          this.fiveArrow = false;
          this.fiveYearTable = false;
          fiveYearArrow.src = this.icon1;
        }
//              隐藏下拉课程信息
      },
//        点击显示或隐藏三年制下拉课程信息
      threeYearClick: function(){
        var threeYearArrow = document.getElementById("threeYearArrow");
        if(!this.threeArrow){
          this.threeArrow = true;
          this.threeYearTable = true;
          threeYearArrow.src = this.icon2;
        }else{
          this.threeArrow = false;
          this.threeYearTable = false;
          threeYearArrow.src = this.icon1;
        }
      },
//        编辑功能
      editClick: function(year,index){
        var inputTr = document.getElementById(year+"InputTr"+index);
        var input = inputTr.getElementsByTagName("input");
        var select = inputTr.getElementsByTagName("select");
        var editImg = document.getElementById(year+"EditImg"+index);
        var saveImg = document.getElementById(year+"SaveImg"+index);
        var restoreImg = document.getElementById(year+"RestoreImg"+index);
        var deleteImg = document.getElementById(year+"DeleteImg"+index);
        var i = null;
//          使课程信息的输入标签变为可输入，显示边框
        for(i = 0;i<input.length;i++){
          input[i].readOnly = false;
          input[i].style.border = "0.1rem solid #d4d4d9";
        }
        for(i = 0;i<select.length;i++){
          select[i].removeAttribute("disabled");
        }
        if(year == "five"){
          this.buffer_fiveCourses.splice(index, 1, JSON.parse(JSON.stringify(this.fiveCourses[index])));
          console.log(this.buffer_fiveCourses[index]);
        }
        if(year == "three"){
          this.buffer_threeCourses.splice(index, 1, JSON.parse(JSON.stringify(this.threeCourses[index])));
        }
//        隐藏编辑和删除功能图标,显示保存和重置功能图标
        editImg.style.display = "none";
        saveImg.style.display = "inline";
        deleteImg.style.display = "none";
        restoreImg.style.display = "inline";
      },
//        取消修改,重置数据,退出编辑
      restoreClick: function(year,index){
        if(confirm("您确定取消编辑并重置该课程信息吗？")){
          var inputTr = document.getElementById(year+"InputTr"+index);
          var input = inputTr.getElementsByTagName("input");
          var select = inputTr.getElementsByTagName("select");
          var editImg = document.getElementById(year+"EditImg"+index);
          var saveImg = document.getElementById(year+"SaveImg"+index);
          var restoreImg = document.getElementById(year+"RestoreImg"+index);
          var deleteImg = document.getElementById(year+"DeleteImg"+index);
          var i = null;
//            重置数据到value
          if(year == "five"){
            this.fiveCourses.splice(index, 1, JSON.parse(JSON.stringify(this.buffer_fiveCourses[index])));
            console.log(this.fiveCourses[index]);
          }
          if(year == "three"){
            this.threeCourses.splice(index, 1, JSON.parse(JSON.stringify(this.buffer_threeCourses[index])));
          }
//          使课程信息的输入标签变为不可输入，隐藏边框
          for(i = 0;i<input.length;i++){
            input[i].readOnly = true;
            input[i].style.border = "none";
          }
          for(i = 0;i<select.length;i++){
            select[i].disabled = true;
          }
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
        }
      },
      deleteClick: function(year,index){
//          从data中的课程信息数组中删除
//          预留功能,将data提交到后端,实现删除数据,处理回调
        var courses = null;
        if (year == "five") {
          courses = this.fiveCourses;
        }
        if (year == "three") {
          courses = this.threeCourses;
        }
        if(confirm("您确定删除该课程吗？")){
          this.$http.post('../testPhp/adjustCouApplySetTrue.php',{
//          this.$http.post('./courseAssociationManege/delete.action',{
            "courseAssociationId": courses[index].id
          },{
            "Content-Type":"application/json"
          }).then(function(response) {
            console.log("删除：");
            console.log(response);
            if(response.body.result == 1) {
              courses.splice(index, 1);
              if (year == "five") {
                this.fiveCourses.splice(index, 1);
                this.buffer_fiveCourses.splice(index, 1);
              }
              if (year == "three") {
                this.threeCourses.splice(index, 1);
                this.buffer_threeCourses.splice(index, 1);
              }
            }
          },function(error){
            console.log(error);
          });
        }
      },
//        保存功能
      saveClick: function(courses,year,index){
        if(confirm("您确定提交保存该课程吗？")) {
          var inputTr = document.getElementById(year + "InputTr" + index);
          var input = inputTr.getElementsByTagName("input");
          var select = inputTr.getElementsByTagName("select");
          var editImg = document.getElementById(year + "EditImg" + index);
          var saveImg = document.getElementById(year + "SaveImg" + index);
          var restoreImg = document.getElementById(year + "RestoreImg" + index);
          var deleteImg = document.getElementById(year + "DeleteImg" + index);
          var i = null;
          var url = null;
          var schoolYearType = null;
          if (year == "five") {
            schoolYearType = 5;
          } else if (year == "three") {
            schoolYearType = 3;
          }
          /*if(courses[index].id == ""){
            url = "./courseAssociationManege/addOne.action"
          }else{
            url = "./courseAssociationManege/update.action"
          }
          this.$http.post(url,{*/
          this.$http.post('../testPhp/adjustCouApplySetTrue.php',{
            "courseAssociationId": courses[index].id,
            "courseName": input[0].value,
            "courseId": input[1].value,
            "teacherName": input[2].value,
            "teacherId": input[3].value,
            "schoolYearType": schoolYearType,
            "classId": courses[index].classId
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            console.log("保存课程:");
            console.log(response.body);
            var data = response.body;
            if (data.result == 1) {
//          预留功能,将data提交到后端,实现保存数据,处理回调
              for (i = 0; i < input.length; i++) {
                input[i].readOnly = true;
                input[i].style.border = "none";
              }
              for (i = 0; i < select.length; i++) {
                select[i].disabled = true;
              }
              editImg.style.display = "inline";
              saveImg.style.display = "none";
              deleteImg.style.display = "inline";
              restoreImg.style.display = "none";
            } else {
              alert("操作失败！请重试");
            }
          }, function (error) {
            console.log("保存课程error:");
            console.log(error);
          });
        }
      },
//        增加功能
      addClick: function (courses,year){
        courses.push(
            { id:"",name:"请编辑后保存", "number":"请编辑后保存", "teacher":"请编辑后保存", "teacherId":"请编辑后保存", "classId":""}
        );
        if (year == "five") {
          this.buffer_fiveCourses.push(
              { id:"",name:"请编辑后保存", "number":"请编辑后保存", "teacher":"请编辑后保存", "teacherId":"请编辑后保存", "classId":""}
          );
        }
        if (year == "three") {
          this.buffer_threeCourses.push(
              { id:"",name:"请编辑后保存", "number":"请编辑后保存", "teacher":"请编辑后保存", "teacherId":"请编辑后保存", "classId":""}
          );
        }
      },
      handleFormatError: function(){
        this.$Message.error('文件格式错误！限制格式为'+this.$refs.uploadForTextbook.format,3);
      },
      handleSize: function(){
        this.$Message.error('文件大小超出范围！限制最大（KB）为'+this.$refs.uploadForTextbook.maxSize,3);
      },
      handleError: function(res){
        var msg = document.getElementsByClassName("ivu-message-notice");
        if(this.loadingMsg){
//            结束进度条
          this.$Loading.error();
//            移除“正在上传……”的msg
          if(!!window.ActiveXObject || "ActiveXObject" in window){
            msg[0].parentNode.innerHTML = "";
//                IE浏览器对removeChild实现有问题
          }else{
            msg[0].parentNode.removeChild(msg[0]);
          }
        }
        this.$Message.error('文件上传失败！'+res,3);
        this.loadingMsg = false;
      },
      handleProgress: function(){
        this.$Loading.start();
        this.$Message.loading('正在上传中……', 0);
        this.loadingMsg = true;
      },
      handleSuccess: function(res){
        this.$Loading.finish();
        var msg = document.getElementsByClassName("ivu-message-notice");
        if(!!window.ActiveXObject || "ActiveXObject" in window){
          msg[0].parentNode.innerHTML = "";
        }else{
          msg[0].parentNode.removeChild(msg[0]);
        }
        this.$Message.success('上传成功！3s后自动刷新页面！',3);
        console.log(res);
        this.loadingMsg = false;
        setTimeout("location.reload(location.href)",4000);
      },
    },
  }
</script>

<style scoped>
  /*最上层Div*/
  #courseArrangeSettingDiv{
    margin: 0 auto;
    background-color: #f3f3f3;
    min-height: 38.5rem;
  }
  .dropDown{
    margin: 0.5rem 5rem;
  }
  /*下拉显示或隐藏的按钮标题栏*/
  table{
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    table-layout: fixed;
    border-right: thin solid #E3E3E3;
    border-left: thin solid #E3E3E3;
  }
  td{
    border-bottom: thin solid #E3E3E3;
    height: 2.5rem;
    text-align: center;
  }
  tbody td{
    height: 3.5rem;
  }
  img{
    position: relative;
    margin: 0.5rem 0.2rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  input{
    outline:none;
    border: none;
    text-align: center;
  }
  /*保存功能图标*/
  .saveImg{
    display: none;
  }
  /*重置功能图标*/
  .restoreImg{
    display: none;
  }
  /*功能图标*/
  .operationTd{
    width: 15rem;
  }
  .classTd {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.3rem;
  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>
