<template>
  <div id="combineCourseDiv">
    <div id="termDiv" class="blank">
      <div class="positionBar">
        <span>您的当前位置：</span>
        <span><a href="#/login/main/eduAdminHome" class="returnHome">首页</a></span>
        <span> > 智能排课 > 合课设置</span>
      </div>
    </div>
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
            <td class="operationTd" :id="information.operationLessonsId" @click="operation(information.operationLessonsId,index)">{{ information.operation }}</td>
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
    <p id="tipP" style="display: none;color:red;"></p>
    <!--多课时课程提示-->
    <transition name="editTran">
      <!--transition过渡动画-->
      <div v-show="editValue" id="editDiv">
        <div id="weekDiv">
          <span>上课时间：
            <select id="timeSelect" v-model="time" @change="timeChange()">
              <option disabled>选择时间</option>
              <option v-for="classTime in classTimes" :value="classTime.time">{{ classTime.timeInfo }}</option>
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
        <button id="restoreButton" @click="modal1 = true" class="am-btn am-btn-success am-radius">重置</button>
      </div>
    </transition>
    <p></p>
    <div>
      <table class="applyTable">
        <thead>
        <tr>
          <td>操作</td>
          <td>课程</td>
          <td>课程代码</td>
          <td>周课时数</td>
          <td>任课教师</td>
          <td>教师编号</td>
          <td>班级</td>
          <td>上课详情</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(information,index) in tableList">
          <td class="operationTd" @click="reCombineCourse(information.operationLessonsId)">重新设置</td>
          <td>{{ information.courseName }}</td>
          <td>{{ information.courseSerial }}</td>
          <td>{{ information.weekHour }}</td>
          <td>{{ information.teacherName }}</td>
          <td>{{ information.teacherSerial }}</td>
          <td>{{ information.classSerial }}</td>
          <td>{{ information.timeAndClassroomInfo }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <Modal
        v-model="modal1"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>当前合课编辑未保存提交，是否重置？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="restoreClick()">确定</button>
        <button id="modalBtn" @click="modal1 = false">取消</button>
      </div>
    </Modal>
    <Modal
        v-model="modal2"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>是否放弃当前编辑，切换编辑对象？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="operationClick(operationLessonsId,operationIndex,true)">确定</button>
        <button id="modalBtn" @click="modal2 = false">取消</button>
      </div>
    </Modal>
    <Modal
        v-model="modal3"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>{{ errorMessage }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="modal3 = false">确定</button>
      </div>
    </Modal>
    <Modal
        v-model="modal4"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
      <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
      <div style="font-size: 1.1rem;text-align: center;">
        <p>您确定提交保存该课程信息吗？</p>
      </div>
      <div slot="footer" style="text-align: center">
        <button id="modalBtn" @click="saveClick()">确定</button>
        <button id="modalBtn" @click="modal4 = false">取消</button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'combineCourseDiv',
    data () {
      return {
        informations: [
//          { operation: '合课编辑', operationLessonsId:"", id:"", course: '', courseId: '', period:'', teacher: '', teacherId: '', className: '', time: '', classroom:'' }
         ],//合课表格内容
        tableList:[],
        operationId: '',//当前合课编辑状态的合课序号
        saveId: '',//保存提交的合课序号
        editValue: false,//合课编辑状态
        tip: true,//重置事件默认提示
        classTimes: [],//上课时间选择内容
        classrooms: [],//上课地点选择内容
        time:"选择时间",
        classroom:"选择教室",
//        选择值绑定
        classroomAndTime:[],
//        选择课程后后端返回的下拉选择组合内容
        number: 0,
//        多课时课程合课设置次数记录
        operationLessonsId: null,
        operationIndex: null,
//        对话框参数传递
        modal1: false,
//        对话框显隐
        modal2: false,
        modal3: false,
        modal4: false,
        errorMessage: ""
//        复用对话框内容
      }
    },
    beforeMount: function() {
      this.$http.post('./acdeminArrangeCourseShow',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        this.informations = [];
        this.tableList = response.body.tableList2;
        for(var i = 0;i < response.body.tableList1.length;i++){
          this.informations.push({"operation":"合课编辑", "operationLessonsId": response.body.tableList1[i].operationLessonsId,"id": response.body.tableList1[i].coursePlanId, "course": response.body.tableList1[i].courseName, "courseId": response.body.tableList1[i].courseSerial, "period": response.body.tableList1[i].weekHour, "teacher": response.body.tableList1[i].teacherName, "teacherId": response.body.tableList1[i].teacherSerial, "className": response.body.tableList1[i].classSerial, "time": response.body.tableList1[i].time, "classroom":response.body.tableList1[i].classroom});
        }
//        获取可合课设置的课程，重组数据结构
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });
    }, //页面dom加载前获取后端数据
    methods: {
      operation: function (id,index) {
        this.operationLessonsId = id;
        this.operationIndex = index;
//        保存操作的数据的索引和id
        if(this.editValue == true && this.operationId != id){
          //判断打开其他合课时是否处于合课编辑状态
          this.modal2 = true;
//          打开编辑放弃对话框
        }else{
          this.operationId = id;
//          记录正在合课编辑的课程id
          this.operationClick(this.operationLessonsId,this.operationIndex,false);
//          触发合课编辑
        }
      }, //对话框参数传递，触发对应对话框
      operationClick: function(id,index,isRestore){
        if(isRestore){
//          判断是否需要重置
          this.restoreClick();
          var operationTd = document.getElementById(id);
          this.editValue = false;
          operationTd.innerHTML = "合课编辑";
          this.modal2 = false;
//          关闭对话框
        }
        if(this.informations[index].period > 3){
//          判断课程课时，是否需要多次合课设置编辑
          var tipP = document.getElementById("tipP");
          tipP.innerHTML = "提示：该课程每周课时大于3，需要多次合课编辑。";
          tipP.style.display = "block";
        }else{
          var tipP = document.getElementById("tipP");
          tipP.style.display = "none";
        }

        var state = false;
        for(var i = 0;i < this.informations.length;i++){
          //进入编辑状态
          if(this.informations[i].operationLessonsId != id){
            this.informations[i].operation = "合课编辑";
          }else{
            if(!state) {
              this.informations[i].operation = "编辑中";
              this.editValue = true;
//              显示编辑区域
              this.saveId = id;
//              记录将要保存数据id
              this.operationId = id;
//              记录将操作数据id
              state = true;
//              确定已进入编辑状态
            }
          }
        }
          this.$http.post('./acdeminArrangeCourseReturn', {
          "coursePlanId": this.informations[index].id,
          "teacherSerial": this.informations[index].teacherId,
          "weekHour": this.informations[index].period,
          "classSerial": this.informations[index].className
        }, {
          "Content-Type": "application/json"
        }).then(function (response) {
//            根据课程获取下拉选择组合内容
          this.classroomAndTime = response.body;
          this.classTimes = [];
          for (var i = 0; i < this.classroomAndTime.length; i++) {
            var isExit = false;
            for (var n = 0; n < this.classTimes.length; n++) {
              if ((this.classroomAndTime[i].time == this.classTimes[n].time) && i > 0) {
                isExit = true;
              }
            }
            if (!isExit) {
              this.classTimes.push({time:this.classroomAndTime[i].time,timeInfo:this.classroomAndTime[i].timeInfo});
            }
          }
//            从组合内容分离出可选的上课时间列表
          console.log(this.classTimes);
        }, function (error) {
          this.$Message.error('连接失败，请重试！');
        });
      }, //合课编辑触发
      saveClick: function(){
        var operationTd = document.getElementById(this.saveId);
        console.log(this.time);
        if(this.time != "" && this.time != "选择时间" && this.time != null && this.classroom != "" && this.classroom != "选择教室") {
//          验证选择非空
          var index = null;
          for (var i = 0; i < this.informations.length; i++) {
            if (this.informations[i].operationLessonsId == this.saveId) {
              index = i;
              break;
            }
          }
//          获取保存数据的索引
          this.$http.post('./acdeminArrangeCourseHandle', {
            "operationLessonsId": this.informations[index].operationLessonsId,
//            "courseName": this.informations[index].course,
//            "teacherName": this.informations[index].teacher,
//            "courseSerial": this.informations[index].courseId,
//            "teacherSerial": this.informations[index].teacherId,
//            "weekHour": this.informations[index].period,
//            "classSerial": this.informations[index].className,
            "classroom": this.classroom,
            "time": this.time
          }, {
            "Content-Type": "application/json"
          }).then(function (response) {
            this.modal4 = false;
//            关闭原来的对话框
            console.log(this.informations[index]);
            if (response.body.result == 1) {
              this.informations[index].time = this.time;
              this.informations[index].classroom = this.classroom;
//              更新保存数据
              this.restoreClick(false);//保存提交后重置输入
              if(this.informations[index].period > 3){
//                  判断是否需要多次合课设置编辑
                if(this.number == 1){
//                  判断是否需要继续合课设置编辑,不需要就刷新数据
                  this.number = 0;
                  this.editValue = false;
                  operationTd.innerHTML = "合课编辑";
                  this.$Message.success("保存成功！");
                  location.reload();
                }else{
                  this.$http.post('./acdeminArrangeCourseReturn', {
                    "coursePlanId": this.informations[index].id,
                    "teacherSerial": this.informations[index].teacherId,
                    "weekHour": this.informations[index].period,
                    "classSerial": this.informations[index].className
                  }, {
                    "Content-Type": "application/json"
                  }).then(function (response) {
//                    再次获取最新的下拉组合内容,保证合课设置不冲突不重复
                    this.classroomAndTime = response.body;
                    this.classTimes = [];
                    for (var i = 0; i < this.classroomAndTime.length; i++) {
                      var isExit = false;
                      for (var n = 0; n < this.classTimes.length; n++) {
                        if ((this.classroomAndTime[i].time == this.classTimes[n].time) && i > 0) {
                          isExit = true;
                        }
                      }
                      if (!isExit) {
                        this.classTimes.push({time:this.classroomAndTime[i].time,timeInfo:this.classroomAndTime[i].timeInfo});
                      }
                    }
                    console.log(this.classTimes);
                  }, function (error) {
                  });
                  this.number++;
                  this.errorMessage = "保存成功！请继续进行该课程其它上课时间的编辑。";
                  this.modal3 = true;
                }
              }else {
//                不需要多次合课设置,直接保存后刷新
                this.$Message.success("保存成功！");
                this.number = 0;
                this.editValue = false;
                operationTd.innerHTML = "合课编辑";
                setTimeout("location.reload()", 2000);
              }
            } else {
              this.errorMessage = "操作失败,请重试!";
              this.modal3 = true;
//              打开错误提示
            }
          }, function (error) {
            this.modal4 = false;
//          关闭原对话框
            this.$Message.error('连接失败，请重试！');
          });
        }else{
          this.modal4 = false;
//          关闭原对话框
          this.errorMessage = "选择不能为空！";
          this.modal3 = true;
//              打开错误提示
        }
      },
      restoreClick: function(){
//        var timeSelect = document.getElementById("timeSelect");
//        var classroomSelect = document.getElementById("classroomSelect");
//        if(tip){
//          if(confirm("当前合课编辑未保存提交，是否重置？")){
//            timeSelect.options[0].selected = true;
//            classroomSelect.options[0].selected = true;
//            this.time = "";
//            this.classroom = "";
//          }
//        }else{
          this.time = "选择时间";
          this.classroom = "选择教室";
          this.modal1 = false;
//        }
      },//重置编辑内容
      timeChange: function(){
        this.classrooms = [];
        for(var i = 0;i < this.classroomAndTime.length;i++){
          if(this.classroomAndTime[i].time == this.time){
            this.classrooms.push(this.classroomAndTime[i].classroom);
          }
        }
//        根据上课时间的选择,重新生成可选的上课教室列表
        this.classroom = "选择教室";
//        重置教室选择
      }, //上课时间选择触发教室选择过滤
      reCombineCourse: function (id) {
        this.$http.post('./resetOutsideTeacher', {
          "operationLessonsId": id
        }, {
          "Content-Type": "application/json"
        }).then(function (response) {
          if(response.body.result == "1"){
            location.reload();
          }else{
            this.errorMessage = "操作失败,请重试!";
            this.modal3 = true;
//            打开错误提示对话框
          }
        }, function (error) {
          this.$Message.error('连接失败，请重试！');
        });
      }//重置合课编辑
    }
  }
</script>

<style scoped>
  #combineCourseDiv{
    /*页面*/
    background-color: white;
    text-align: left;
  }
  .positionBar{
    /*首页导航*/
    margin-left: 0;
  }
  table{
    text-align: center;
  }
  button:hover{
     cursor: pointer;
  }
  #termDiv{
    /*空白区域*/
    display: flex;
    align-items: center;
    padding-left: 5rem;
  }
  #tableDiv{
    /*表格区域*/
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
  @media screen and (max-width: 1025px) {
    html {
    }
  }
</style>
