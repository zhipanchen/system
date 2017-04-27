<template>
  <div>
    <div id="noSupervisorDiv" style="display: inline">
      <div id="tchDropdown" style="height: 5rem;margin: 0.6rem 5rem;background-color: white;">
        <!--教师选择下拉列表-->
        <span><input type="text" id="teacherName" class="inputWM" placeholder="请输入任课教师姓名" v-model="noSupervisorinfoKey.teacherName"></span>
        <span><input type="text" id="courseName" class="inputWM" placeholder="请输入课程名称" v-model="noSupervisorinfoKey.courseName"></span>
        <span><button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="checkNoSupervisorInfoClick()">查找</button></span>
        <span><button id="leadOut" class="am-btn am-btn-success am-radius buttonWM">导出</button></span>
      </div>
      <div id="noSupervisorTable" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
        <span><p>*下面是筛选后的课程</p></span>
        <!--未设置督导的课程的表格-->
        <table id="noSupervisorTableSy" class="normalTable" style="table-layout: fixed;">
          <thead>
          <tr>
            <th width="15%">请选择</th>
            <th width="25%">班级名称</th>
            <th width="20%">课程编号</th>
            <th width="25%">课程名称</th>
            <th width="15%">任课老师</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for=" notSettedSupervisorCourseInfo in notSettedSupervisorCourseInfoList">
            <td @click="setSupervisorClick(notSettedSupervisorCourseInfo.courseId,notSettedSupervisorCourseInfo.courseName)"  class="setSupervisor"><u>设置督导</u></td>
            <td v-text="notSettedSupervisorCourseInfo.className"></td>
            <td v-text="notSettedSupervisorCourseInfo.courseId"></td>
            <td v-text="notSettedSupervisorCourseInfo.courseName"></td>
            <td v-text="notSettedSupervisorCourseInfo.teacherName"></td>
          </tr>
          </tbody>
        </table>
        <div class="buttonDiv">
          <span><button id="goTo" class="bottomButton am-btn am-btn-success am-radius" @click="goToClick()">查看已设置督导课程</button></span>
        </div>
      </div>
    </div>
    <div id="supervisorDiv" style="display: none">
      <div id="setSupervisorDropdown">
        <div style="height: 5rem;margin: 0.6rem 5rem;background-color: white;">
          <span><p>课程名称:    {{setCourseName}}</p></span>
          <div>
            <span id="setSupSpan">设置督导员:</span>
            <span><input type="text" id="supervisorName" class="inputWM" placeholder="请输入督导员姓名" v-model="supervisorinfoKey.supervisorName"></span>
            <!--督导时间选择下拉列表-->
            <select class="selectWM" v-model="supervisorinfoKey.time">
              <option value="0">选择时间</option>
              <option v-for="time in times" :value="time.week+','+time.weekDay+','+time.lessonNum">第{{time.week}}周第{{time.weekDay}}天第{{time.lessonNum}}节课</option>
            </select>
            <span><button id="save" class="am-btn am-btn-success am-radius buttonWM" @click="saveSupervisorInfoClick()">保存</button></span>
            <span><button id="cancel" class="am-btn am-btn-success am-radius buttonWM" @click="restoreSupervisorInfoClick()">取消</button></span>
          </div>
        </div>
      </div>
      <div style="padding: 0.6rem 5rem;background-color: #f3f3f3">
        <div id="supervisorTable" style="background-color: white">
          <span><p>*下面是已分配督导员的课程</p></span>
          <table id="supervisorTableSy" class="operationTable" style="table-layout: fixed;">
            <!--已分配督导员的课程的表格-->
            <thead>
            <tr>
              <th width="10%">当前状态</th>
              <th width="10%">督导老师</th>
              <th width="20%">班级名称</th>
              <th width="20%">课程编号</th>
              <th width="20%">课程名称</th>
              <th width="10%">任课老师</th>
              <th width="10%">督导状态</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for=" settedSupervisorCourseInfo in settedSupervisorCourseInfoList">
              <td v-if="settedSupervisorCourseInfo.status === '1'">已读</td>
              <td v-if="settedSupervisorCourseInfo.status === '0'"><u>未读</u></td>
              <td v-text="settedSupervisorCourseInfo.supervisorName"></td>
              <td v-text="settedSupervisorCourseInfo.className"></td>
              <td v-text="settedSupervisorCourseInfo.courseId"></td>
              <td v-text="settedSupervisorCourseInfo.courseName"></td>
              <td v-text="settedSupervisorCourseInfo.teacherName"></td>
              <td><button class="am-btn am-btn-success am-radius">查看</button></td>
            </tr>
            </tbody>
          </table>
          <div class="buttonDiv">
            <span><button id="goBack" class="bottomButton am-btn am-btn-success am-radius" @click="goBackClick()">返回</button></span>
          </div>
        </div>
      </div>
    </div>
    <div id="table">
      <div id="show">
        <table class="normalTable">
          <thead>
          <tr>
            <th colspan=4>督导反馈</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>督导日期</td>
            <td colspan=3><input class="big" type="text"></td>
          </tr>
          <tr>
            <td rowspan=8>评分</td>
            <td>学生出勤情况</td> <td><input class="sma" type="text"></td>
          </tr>
          <tr><td>授课内容</td> <td><input class="sma" type="text"></td></tr>
          <tr><td>教师素养得分</td> <td><input class="sma" type="text"></td></tr>
          <tr><td>教学目标得分</td> <td><input class="sma" type="text"></td></tr>
          <tr><td>教学内容得分</td> <td><input class="sma" type="text"></td></tr>
          <tr><td>教学方法得分</td> <td><input class="sma" type="text"></td></tr>
          <tr><td>教学常规得分</td> <td><input class="sma" type="text"></td></tr>
          <tr><td>教学内容得分</td> <td><input class="sma" type="text"></td></tr>
          <tr><td>督导员意见</td>
            <td colspan=3><input class="big" type="text"></td>
          </tr>
          <tr><td>教务人员意见</td>
            <td colspan=3><input class="big" type="text"></td>
          </tr>
          <tr><td>教师反馈</td>
            <td colspan=3><input class="big" type="text"></td>
          </tr>
          </tbody>
        </table>
        <button class="am-btn am-btn-success am-radius">保存</button>
        <button class="am-btn am-btn-success am-radius">取消</button>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: 'noSupervisorTable',
        data () {
            return {
              noSupervisorinfoKey:{
                teacherName:'',
                courseName:''
              },
              supervisorinfoKey:{
                supervisorName:'',
                time:'0'
              },
              weekAndDay:[],
              setMsg:'1',
              setCourseName:'请选择',
              times:[
                {week:'1',weekDay:'2',lessonNum:'3'},
                {week:'4',weekDay:'5',lessonNum:'6'},
                {week:'7',weekDay:'8',lessonNum:'9'}
              ],
              notSettedSupervisorCourseInfoList:[
                  {status:'1',supervisorName:'',className:'对口高职 2015 护理1班',courseName:'护理管理学',courseId:'10300',teacherName:'季军'},
                  {status:'0',supervisorName:'',className:'对口高职 2015 护理2班',courseName:'护理管理学',courseId:'10300',teacherName:'季军'}
                ],
              settedSupervisorCourseInfoList:[
                {status:'1',supervisorName:'李晓',className:'普通高中 2015 护理1班',courseName:'护理管理学',courseId:'10301',teacherName:'何平'},
                {status:'0',supervisorName:'张玲',className:'普通高中 2015 护理2班',courseName:'护理管理学',courseId:'10301',teacherName:'何平'}
              ]
            }
        },
      beforeMount:function() {
        this.$http.post('../supervisorManageJson',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.notSettedSupervisorCourseInfoList = response.body.supervisorManage.notSettedSupervisorCourseInfoList;
          this.settedSupervisorCourseInfoList = response.body.supervisorManage.settedSupervisorCourseInfoList;
        },function(error){
          console.log("获取error");
        });
      },
      methods:{
        checkNoSupervisorInfoClick: function(){
          this.$http.post('./checkNoSupervisorInfoJson',{
            "teacherName":this.noSupervisorinfoKey.teacherName,
            "courseName":this.noSupervisorinfoKey.courseName
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.setMsg = response.body.checkNoSupervisorInfoList.setMsg;
            if(this.setMsg === '0'){
              this.notSettedSupervisorCourseInfoList = response.body.checkNoSupervisorInfoList.notSettedSupervisorCourseInfoList;
            }
            else{
              alert("您查询的课程已设置督导，请点击查看已设置督导课程！");
            }
          },function(error){
            console.log("获取error");
          });
        },
        setSupervisorClick:function(courseId,courseName){
          var noSupervisorDiv = document.getElementById("noSupervisorDiv");
          var supervisorDiv = document.getElementById("supervisorDiv");
          this.setCourseName = courseName;
          this.$http.post('./setSupervisorJson',{
            "courseId":courseId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.times = response.body.setSupervisor.times;
          },function(error){
            console.log("获取error");
          });
          supervisorDiv.style.display = "inline";
          noSupervisorDiv.style.display = "none";
        },
        goToClick:function(){
          var noSupervisorDiv = document.getElementById("noSupervisorDiv");
          var supervisorDiv = document.getElementById("supervisorDiv");
          var setSupervisorDropdown = document.getElementById("setSupervisorDropdown");
          supervisorDiv.style.display = "inline";
          noSupervisorDiv.style.display = "none";
          setSupervisorDropdown.style.display = "none";
        },
        saveSupervisorInfoClick:function(){
          this.weekAndDay = this.supervisorinfoKey.time.split(",");
//          分割字符串this.supervisorinfoKey.time,将week,weekDay,lessonNum分开传递给后端
//          alert(this.weekAndDay[0]+","+this.weekAndDay[1]+","+this.weekAndDay[2]);
          this.$http.post('./saveSupervisorInfoJson',{
            "supervisorName":this.supervisorinfoKey.supervisorName,
            "week":this.weekAndDay[0],
            "weekDay":this.weekAndDay[1],
            "lessonNum":this.weekAndDay[2]
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.settedSupervisorCourseInfoList = response.body.settedSupervisorCourseInfoList;
          },function(error){
            console.log("获取error");
          });
        },
        restoreSupervisorInfoClick:function(){
          this.supervisorinfoKey.supervisorName = '';
          this.supervisorinfoKey.time = '0';
        },
        goBackClick:function(){
          var noSupervisorDiv = document.getElementById("noSupervisorDiv");
          var supervisorDiv = document.getElementById("supervisorDiv");
          var setSupervisorDropdown = document.getElementById("setSupervisorDropdown");
          this.$http.post('./goBackNotSettedSupervisorInfoJson',{},{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.notSettedSupervisorCourseInfoList = response.body.notSettedSupervisorCourseInfoList;
          },function(error){
            console.log("获取error");
          });
          noSupervisorDiv.style.display = "inline";
          supervisorDiv.style.display = "none";
          setSupervisorDropdown.style.display = "inline";
        }
      }
    }
</script>

<style scoped>
    html {
        font-size: 62.5%;
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
    .bottomButton{
      margin-top: 1rem;
      margin-right: 1.4rem;
      min-width: 5.6rem;
    }
    p{
      color: grey;
    }
    .setSupervisor{
      color: #158064;
      cursor: pointer;
    }
    .bottomButton{
      margin-top: 1rem;
      margin-right: 1.4rem;
    }
    .buttonDiv{
      text-align: center;
    }
    .sma{
      width: 80%;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
