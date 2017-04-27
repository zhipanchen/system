<template>
  <div id="combineCourseDiv">
    <div id="termDiv" class="blank">当前学年学期：</div>
    <div id="tableDiv">
      <table id="t1" class="applyTable">
        <thead>
          <tr>
            <td>操作</td>
            <td>课程</td>
            <td>课程代码</td>
            <td>周课时数</td>
            <td>任课教师</td>
            <td>教师编号</td>
            <td>班级</td>
            <td>上课时间</td>
            <td>上课地点</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(information,index) in informations">
            <td class="operationTd" :id="information.id" @click="operationClick(information.id,index)">{{ information.operation }}</td>
            <td>{{ information.course }}</td>
            <td>{{ information.courseId }}</td>
            <td>{{ information.period }}</td>
            <td>{{ information.teacher }}</td>
            <td>{{ information.teacherId }}</td>
            <td>{{ information.className }}</td>
            <td>{{ information.time }}</td>
            <td>{{ information.classroom }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition name="editTran">
      <!--transition过渡动画-->
      <div v-show="editValue" id="editDiv">
        <p id="tipP" style="display: none"></p>
        <div id="weekDiv">
          <span>上课时间：
            <select id="timeSelect" v-model="time" @change="timeChange()">
              <option disabled>选择时间</option>
              <option v-for="classTime in classTimes" :value="classTime">{{ classTime }}</option>
            </select>
          </span>
        </div>
        <div id="classroomDiv">
          <span>地点：</span>
          <select id="classroomSelect" v-model="classroom">
            <option disabled>选择教室</option>
            <option v-for="classroom in classrooms" :value="classroom">{{ classroom }}</option>
          </select>
        </div>
      </div>
    </transition>
    <transition name="editTran">
      <div v-show="editValue" id="buttonDiv">
        <button id="saveButton" @click="saveClick" class="am-btn am-btn-success am-radius">保存</button>
        <button id="restoreButton" @click="restoreClick(tip)" class="am-btn am-btn-success am-radius">重置</button>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'combineCourseDiv',
    data () {
      return {
        informations: [
          { operation: '合课编辑', id:"", course: '', courseId: '', period:'', teacher: '', teacherId: '', className: '', time: '', classroom:'' }
         /*{ operation: '合课编辑', id:"1", course: '护理学基础', courseId: '111', period:'2', teacher: '何平', teacherId: '123', className: '2014级1班', time: '周一上午1、2节', classroom:'A101' },
          { operation: '合课编辑', id:"2", course: '内科护理', courseId: '666', period:'3', teacher: '李雷', teacherId: '123', className: '2014级2班', time: '周二上午5、6节', classroom:'A102' },
          { operation: '合课编辑', id:"3", course: '护理管理学', courseId: '222', period:'4', teacher: '李雷', teacherId: '456', className: '2014级1班', time: '周一上午3、4节', classroom:'A102' },
          { operation: '合课编辑', id:"4", course: '外科护理', courseId: '333', period:'5', teacher: '何平', teacherId: '123', className: '2014级3班', time: '周三上午1、2节', classroom:'A103' },*/
        ],//合课表格内容
        operationId: '',//当前合课编辑状态的合课序号
        saveId: '',//保存提交的合课序号
        editValue: false,//合课编辑状态
        tip: true,//重置事件默认提示
        teachers: [
          '何平', '李雷', '张三', '李四', '王五'
        ],
        classTimes: [],//上课时间选择内容
        classrooms: [],//上课地点选择内容
        time:"选择时间",
        classroom:"选择教室",
        classroomAndTime:[],
        number: 0
      }
    },
    beforeMount: function() {
      this.$http.post('./acdeminArrangeCourseShow',{},{
//      this.$http.post('../testPhp/combineCourse.php',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        console.log("获取:");
        console.log(response.body);
        this.informations = [];
        for(var i = 0;i < response.body.length;i++){
          this.informations.push({"operation":"合课编辑", "id": response.body[i].coursePlanId, "course": response.body[i].courseName, "courseId": response.body[i].courseSerial, "period": response.body[i].weekHour, "teacher": response.body[i].teacherName, "teacherId": response.body[i].teacherSerial, "className": response.body[i].classSerial, "time": response.body[i].time, "classroom":response.body[i].classroom});
        }
      },function(error){
        console.log("获取error");
      });
    },
    methods: {
      operationClick: function(id,index){
        if(this.editValue == true && this.operationId != id){//判断打开其他合课时是否处于合课编辑状态
          if(confirm("是否保存当前合课编辑？")){
            this.saveClick();
          }else{
            this.restoreClick(false);
            var operationTd = document.getElementById(id);
            this.editValue = false;
            operationTd.innerHTML = "合课编辑";
          }
        }else{
          this.operationId = id;
        }
        var state = false;
        if(this.informations[index].period > 3){
          var tipP = document.getElementById("tipP");
          tipP.innerHTML = "提示：该课程每周课时大于3，下面正在编辑保存每周第一次上课时间和地点。";
          tipP.style.display = "none";
        }
        try{
          for(var i = 0;i <= this.informations.length;i++){//进入编辑状态
            if(this.informations[i].id != id){
              this.informations[i].operation = "合课编辑";
            }else{
              if(!state) {
                this.informations[i].operation = "编辑中";
                this.editValue = true;
                this.saveId = id;
                this.operationId = id;
                state = true;
              }
            }
          }
        }finally {
          console.log(this.informations[index]);
          this.$http.post('./acdeminArrangeCourseReturn', {
//          this.$http.post('../testPhp/combineCourseSelect.php', {
            "coursePlanId": this.informations[index].id,
            "teacherSerial": this.informations[index].teacherId,
            "weekHour": this.informations[index].period,
            "classSerial": this.informations[index].className
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            console.log(response.body);
            this.classroomAndTime = response.body;
            console.log(this.classroomAndTime);
            this.classTimes = [];
            for (var i = 0; i < this.classroomAndTime.length; i++) {
              var isExit = false;
              for (var n = 0; n < this.classTimes.length; n++) {
                if (this.classroomAndTime[i].time == this.classTimes[n]) {
                  isExit = true;
                }
              }
              if (!isExit) {
                this.classTimes.push(this.classroomAndTime[i].time);
              }
            }
            console.log(this.classTimes);
          }, function (error) {
            console.log(error);
          });
        }
      },
      saveClick: function(){
//        var editDiv = document.getElementById("editDiv");
        var operationTd = document.getElementById(this.saveId);
//        var saveButton = document.getElementById("saveButton");
        if(this.time != "" && this.time != "选择时间" && this.time != null && this.classroom != "") {
          var index = null;
          for (var i = 0; i < this.informations.length; i++) {
            if (this.informations[i].id == this.saveId) {
              index = i;
              break;
            }
          }
          this.$http.post('./acdeminArrangeCourseHandle', {
//          this.$http.post('../testPhp/adjustCouApplySetTrue.php', {
            "coursePlanId": this.informations[index].id,
            "courseName": this.informations[index].course,
            "teacherName": this.informations[index].teacher,
            "courseSerial": this.informations[index].courseId,
            "teacherSerial": this.informations[index].teacherId,
            "weekHour": this.informations[index].period,
            "classSerial": this.informations[index].className,
            "classroom": this.classroom,
            "time": this.time
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            console.log(response.body);
            console.log(this.informations[index]);
            if (response.body.result == 1) {
              this.informations[index].time = this.time;
              this.informations[index].classroom = this.classroom;
              this.restoreClick(false);//保存提交后重置输入
              if(this.informations[index].period > 3){
                if(this.number == 1){
                  this.number = 0;
                  this.editValue = false;
                  operationTd.innerHTML = "合课编辑";
                  alert("保存成功！");
                  location.reload(location.href);
                }else{
                  this.number++;
                  alert("保存成功！请继续进行该课程其它上课时间的编辑。");
                }
              }else {
                alert("保存成功！");
                this.number = 0;
                this.editValue = false;
                operationTd.innerHTML = "合课编辑";
              }
            } else {
              alert("操作失败请重试")
            }
          }, function (error) {
            console.log(error);
          });
        }else{
          alert("选择不能为空！");
        }
      },
      restoreClick: function(tip){
        //重置编辑内容
//        var timeSelect = document.getElementById("timeSelect");
//        var classroomSelect = document.getElementById("classroomSelect");
        if(tip){
          if(confirm("当前合课编辑未保存提交，是否重置？")){
//            timeSelect.options[0].selected = true;
//            classroomSelect.options[0].selected = true;
            this.time = "";
            this.classroom = "";
          }
        }else{
          this.time = "";
          this.classroom = "";
        }
      },
      timeChange: function(){
        this.classrooms = [];
        this.classroom = "";
        for(var i = 0;i < this.classroomAndTime.length;i++){
          if(this.classroomAndTime[i].time == this.time){
            this.classrooms.push(this.classroomAndTime[i].classroom);
          }
        }
      }
    }
  }
</script>

<style scoped>
  html {
  }
  #combineCourseDiv{
    /*页面*/
    background-color: white;
    text-align: left;
  }
  table{
    text-align: center;
  }
  button:hover{
     cursor: pointer;
  }
  #termDiv{
    display: flex;
    align-items: center;
    padding-left: 5rem;
  }
  #tableDiv{
    background-color: #F0F3F8;
  }
  .operationTd{
    /*选择操作单元格*/
    text-decoration: underline;
  }
  .operationTd:hover{
    cursor: pointer;
    color: red;
  }
  #editDiv{
    /*编辑区域*/
    display: flex;
    justify-content: space-around;
    min-height: 6rem;
    position: relative;
    margin-top: 1rem;
  }
  #classDiv{
    /*班级选择*/
    display: flex;
    margin-bottom: 1rem;
  }
  .operationSpan{
    text-decoration: underline;
    margin-left: 0.5rem;
  }
  .operationSpan:hover{
    /*班级选择添加*/
    cursor: pointer;
    color: red;
  }
  .selectSpan{
    display: block;
    margin-left: 3.3rem;
    margin-top: 0.5rem;
  }
  #buttonDiv{
     /*功能按钮区域*/
     display: flex;
     height: 5rem;
     align-items: flex-start;
     justify-content: center;
   }
  #saveButton{
    /*保存按钮*/
    width: 5.6rem;
    margin-right: 1.4rem;
    position: relative;
    top: 2rem;
  }
  #restoreButton{
    /*重置按钮*/
    width: 5.6rem;
    position: relative;
    top: 2rem;
  }
  #restoreButton:active,#saveButton:active{
    background-color: #00a539;
  }
  .editTran-enter-active, .editTran-leave-active {
    /*课时单双周选择过渡效果*/
    transition: opacity .9s
  }
  .editTran-enter, .editTran-leave-active {
    /*课时单双周选择过渡效果*/
    opacity: 0
  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>
