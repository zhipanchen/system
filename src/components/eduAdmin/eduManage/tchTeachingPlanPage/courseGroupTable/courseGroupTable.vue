<template>
  <div>
    <div id="searchInfo">
      <select id="groupSelect" class="selectWM" v-model="teacherinfoKey.groupId" @change="groupClick()">
        <option value=0>选择教研组</option>
        <option v-for="group in groupList" :value="group.groupId">{{group.groupName}}</option>
      </select>
      <!--教研组选择下拉列表-->
      <select id="teacherSelect" class="selectWM" v-model="teacherinfoKey.teacherId" @change="teacherClick()">
        <option value="">选择教师</option>
        <option v-for="teacher in teacherList" :value="teacher.teacherId">{{teacher.teacherName}}</option>
      </select>
      <!--教师选择下拉列表-->
      <select id="courseSelect" class="selectWM" v-model="teacherinfoKey.courseId">
        <option value="">选择课程</option>
        <option v-for="course in courseList" :value="course.courseId">{{course.courseName}}</option>
      </select>
      <!--课程选择下拉列表-->
      <span><button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="checkTeachingPlanInfoClick()">查找</button></span>
    </div>

    <div style="padding: 0.6rem 5rem;background-color: #f3f3f3">
      <div id="courseGroupTableDiv" style="background-color: white">
        <!--课程培养方案表格-->
        <table id="courseGroupTable" class="operationTable" style="table-layout: fixed;">
          <thead>
          <tr>
            <th>教研组名称</th>
            <th>教师姓名</th>
            <th>课程名称</th>
            <th>组长</th>
            <th>导出</th>
            <th>审核</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(courseGroupInfo,index) in  courseGroupInfos">
            <td v-text="courseGroupInfo.groupName"></td>
            <td v-text="courseGroupInfo.teacherName"></td>
            <td v-text="courseGroupInfo.courseName"></td>
            <td v-text="courseGroupInfo.headman"></td>
            <td>
              <form action="./courseTeachPlan/exportExcel" method="get">
                <input v-model="courseGroupInfo.teacherId" name="teacherId" style="display: none">
                <input v-model="courseGroupInfo.courseId" name="courseId" style="display: none">
                <button class="am-btn am-btn-success am-radius">下载</button>
              </form>
            </td>
            <!--下载培养方案的按钮-->
            <td v-if="courseGroupInfo.auditStatus===0">
              <button class="circleEnd" >×</button>
            </td>
            <td v-else-if="courseGroupInfo.auditStatus===1">
              <button class="circleEnd" >√</button>
            </td>
            <td v-else-if="courseGroupInfo.auditStatus===2">
              <button :id="'buttonOne'+index" @click="examineTeachingPlanInfoClick(courseGroupInfo.teacherId,courseGroupInfo.courseId,'1',index)"  class="circle" >√</button>
              <button :id="'buttonTwo'+index" @click="examineTeachingPlanInfoClick(courseGroupInfo.teacherId,courseGroupInfo.courseId,'0',index)"  class="circle" >×</button>
              <!--<img id="adopt" src="./images/save.png" @click="examineTeachingPlanInfoClick(courseGroupInfo.teacherId,courseGroupInfo.courseId,'1')">-->
              <!--<img id="notAdopt" src="./images/restore.png" @click="examineTeachingPlanInfoClick(courseGroupInfo.teacherId,courseGroupInfo.courseId,'1')">-->
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <modal v-model="modalOperateBool" width="400" id="modalBody">
        <div style="text-align: center;font-size: 1.1rem;">
          <p>是否确定{{operateMsg}}</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="operateOk">确定</button>
          <button id="modalBtn" @click="operateCancel">取消</button>
        </div>
      </modal>
      <modal v-model="modalResultBool" width="400" id="modalBody">
        <div style="text-align: center;font-size: 1.1rem;">
          <p>{{operateMsg}}失败</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="resultOk">确定</button>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              teacherinfoKey:{
                groupId: 0,
                teacherId:'',
                courseId:''
              },
              groupList:[
                {groupName:'护理组',groupId:'111'},
                {groupName:'西医组',groupId:'222'},
                {groupName:'临床组',groupId:'333'}
              ],
              teacherList:[
                {teacherName:'何平',teacherId:'111111'},
                {teacherName:'张继',teacherId:'222222'},
                {teacherName:'李伟',teacherId:'333333'}
              ],
              courseList:[
                {courseName:'护理学基础1',courseId:'JCKC1111'},
                {courseName:'护理学基础2',courseId:'JCKC2222'},
                {courseName:'护理学基础3',courseId:'JCKC3333'}
              ],
              courseGroupInfos:[
                {groupName:'临床医学',teacherName:'李伟',teacherId:'111',courseName:'护理学基础1',courseId:'JCKC1111',headman:'何平',auditStatus:0},
                {groupName:'临床护理',teacherName:'张亮',teacherId:'222',courseName:'护理学基础2',courseId:'JCKC2222',headman:'张扬',auditStatus:1},
                {groupName:'护用药理',teacherName:'邓常',teacherId:'333',courseName:'护理学基础3',courseId:'JCKC3333',headman:'李季',auditStatus:2}
              ],
              msg:"",
              operateMsg:"",
              resultmsg:1,
              modalOperateBool:false,
              modalResultBool:false,
              teacherIdEle:"",
              courseIdEle:'',
              index:''
            }
        },
      beforeMount:function() {
        this.$http.post('./courseTeachPlan/findTeachPlan',{
          "groupId":"",
          "teacherId":"",
          "courseId":""
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.courseGroupInfos = response.body.courseGroupInfos;
          this.groupList = response.body.groupList;
          this.teacherList = response.body.teacherList;
          this.courseList = response.body.courseList;
        },function(error){
          console.log("获取error");
        });
      },
      methods:{
        groupClick: function(){
          this.$http.post('./courseTeachPlan/getTeacherList',{
            "groupId":this.teacherinfoKey.groupId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.teacherList = response.body.teacherList;
          },function(error){
            console.log("获取error");
          });
          this.teacherinfoKey.teacherId = "";
          this.teacherinfoKey.courseId = "";
        },
        teacherClick: function(){
          this.$http.post('./courseTeachPlan/getCourseList',{
            "teacherId":this.teacherinfoKey.teacherId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.courseList = response.body.courseList;
          },function(error){
            console.log("获取error");
          });
          this.teacherinfoKey.courseId = "";
        },
        checkTeachingPlanInfoClick: function(){
          this.$http.post('./courseTeachPlan/findTeachPlan',{
            "groupId":this.teacherinfoKey.groupId,
            "teacherId":this.teacherinfoKey.teacherId,
            "courseId":this.teacherinfoKey.courseId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.courseGroupInfos = response.body.courseGroupInfos;
          },function(error){
            console.log("获取error");
          });
        },
//        downloadClick:function(){
//          location.href="./courseTeachPlan/exportExcel";
//        },
        examineTeachingPlanInfoClick:function(teacherId,courseId,msg,index){
          this.modalOperateBool = true;
          this.teacherIdEle = teacherId;
          this.courseIdEle = courseId;
          this.msg = msg;
          this.index = index;
          if(msg ==="1"){
            this.operateMsg = "审核通过";
          }else{
            this.operateMsg = "审核不通过";
          }
        },
        operateOk: function(){
          var buttonTwo = document.getElementById("buttonTwo"+this.index);
          var buttonOne = document.getElementById("buttonOne"+this.index);
          this.$http.post('./courseTeachPlan/doAdminCheckTeachPlan',{
            "msg":this.msg,
            "teacherId":this.teacherIdEle,
            "courseId":this.courseIdEle
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.resultmsg=response.body.result;
            if(this.resultmsg === 1&&this.msg === "1"){
              this.courseGroupInfos[this.index].auditStatus = 1;
            }else if(this.resultmsg === 1&&this.msg === "0"){
              this.courseGroupInfos[this.index].auditStatus = 0;
            }
          },function(error){
            console.log("获取error");
          });
          this.modalOperateBool = false;
          if(this.resultmsg === 1){
            this.$Message.success(this.operateMsg + "成功！");
          }else{
            this.modalResultBool = true;
          }
        },
        operateCancel: function(){
          this.modalOperateBool = false;
        },
        resultOk: function(){
          this.modalResultBool = false;
        }
      }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #searchInfo{
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
    }
    .buttonWM{
      width: 5.6rem;
      margin: 0 0.7rem;
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
    .circle,.circleEnd{
      border:solid thin grey;
      color: grey;
      background-color: white;
      width: 1.5rem;
      height: 1.5rem;
      -webkit-border-radius: 0.75rem;
      outline:none;
    }
    .circle:hover{
      color:white;
      background-color: red;
      border:solid thin red;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
