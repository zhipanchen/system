<template>
  <div>
    <div id="courseTchInfo">
      <select id="termSelect" class="selectWM" v-model="evaluateinfoKey.term" @click="termClick1" @change="termClick()">
        <option value="">选择学期</option>
        <option v-for="term in terms" :value="term">{{term}}</option>
      </select>
      <!--学期选择下拉列表-->
      <select id="teacherSelect" class="selectWM" v-model="evaluateinfoKey.teacherId" @click="teacherClick1" @change="teacherClick()">
        <option value="">选择教师</option>
        <option v-if="evaluateinfoKey.term!='0'" v-for="teacher in teacherList" :value="teacher.teacherId">{{teacher.teacherName}}</option>
      </select>
      <!--教师选择下拉列表-->
      <select id="courseSelect" class="selectWM" v-model="evaluateinfoKey.courseId">
        <option value="">选择课程</option>
        <option v-if="evaluateinfoKey.teacherId!='0'" v-for="course in courseList" :value="course.courseId">{{course.courseName}}</option>
      </select>
      <!--课程选择下拉列表-->
      <span><button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="checkEvaInfoClick()">查询</button></span>
      <!--查询按钮-->
    </div>
    <div id="evaResultTable" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
      <table id="stdInfoTableSy" class="normalTable" style="table-layout: fixed;">
        <thead>
        <tr>
          <th>课程代码</th>
          <th>课程名称</th>
          <th>教师编码</th>
          <th>教师姓名</th>
          <th>参评人数</th>
          <th>综合得分</th>
          <th>查看留言</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="result in results">
          <td v-text="result.courseId"></td>
          <td v-text="result.courseName"></td>
          <td v-text="result.teacherId"></td>
          <td v-text="result.teacherName"></td>
          <td v-text="result.evaluateNumber"></td>
          <td v-text="result.multiplyScore"></td>
          <td v-text="result.tips"></td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--评教结果表格-->
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              evaluateinfoKey:{
                term:'',
                teacherId:'',
                courseId:''
              },
              terms:[
                '大一:第一学期',
                '大一:第二学期',
                '大二:第一学期',
                '大二:第二学期',
                '大三:第一学期',
                '大三:第二学期',
                '大四:第一学期',
                '大四:第二学期'
              ],
              teacherList:[
                {teacherName:'何平',teacherId:'111111'},
                {teacherName:'张继',teacherId:'222222'},
                {teacherName:'李伟',teacherId:'333333'}
              ],
              courseList:[
                {courseName:'护理学',courseId:'123456'},
                {courseName:'西医',courseId:'223456'},
                {courseName:'临床',courseId:'323456'}
              ],
                results:[
                  {courseId:'K2210710',courseName:'企业合作课程',teacherId:'1234567',teacherName:'何平',evaluateNumber:'65',multiplyScore:'98',tips:'暂无'},
                  {courseId:'K2210711',courseName:'企业合作课程',teacherId:'1234567',teacherName:'王建',evaluateNumber:'73',multiplyScore:'97',tips:'暂无'},
                  {courseId:'K2210712',courseName:'企业合作课程',teacherId:'1234567',teacherName:'张小山',evaluateNumber:'56',multiplyScore:'96',tips:'暂无'}
                ]
            }
        },
      beforeMount:function() {
        this.$http.post('./studentEvaluation/findEvaluationResult',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.results = response.body.evaluateResult.results;
          this.terms = response.body.evaluateResult.terms;
          this.teacherList = response.body.evaluateResult.teacherList;
          this.courseList = response.body.evaluateResult.courseList;
        },function(error){
          console.log("获取error");
        });
      },
//      初始化页面时，获取学期列表，教师列表，课程列表，课程信息列表
      methods:{
        termClick1:function(){
          this.evaluateinfoKey.teacherId = "0";
          this.evaluateinfoKey.courseId = "0";
        },
//        点击学期select下拉框时，清空教师，课程下拉框
        termClick: function(){
          this.$http.post('./termClickJson',{
            "term":this.evaluateinfoKey.term
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.teacherList = response.body.teacherList;
            this.courseList = response.body.courseList;
          },function(error){
            console.log("获取error");
          });
        },
//        点击学期select下拉框后选择学期时，从后台获取对应学期的教师，课程列表
        teacherClick1:function(){
          this.evaluateinfoKey.courseId = "0";
        },
//        点击教师select下拉框时，清空课程下拉框
        teacherClick: function(){
          this.$http.post('./evaResultTeacherClickJson',{
            "teacherId":this.evaluateinfoKey.teacherId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.courseList = response.body.courseList;
          },function(error){
            console.log("获取error");
          });
        },
//        点击教师select下拉框后选择教师时，从后台获取对应教师的课程列表
        checkEvaInfoClick: function(){
          this.$http.post('./studentEvaluation/findEvaluationResult',{
            "term":this.evaluateinfoKey.term,
            "teacherId":this.evaluateinfoKey.teacherId,
            "courseId":this.evaluateinfoKey.courseId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.results = response.body.results;
          },function(error){
            console.log("获取error");
          });
        }
//        提交学期，教师，课程，从后台获取相应课程信息
      }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #courseTchInfo{
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
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
