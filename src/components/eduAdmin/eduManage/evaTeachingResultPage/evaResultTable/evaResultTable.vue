<template>
  <div>
    <div id="courseTchInfo">
      <select id="termSelect" class="selectWM" v-model="evaluateinfoKey.term" >
        <option value="">选择学期</option>
        <option v-for="term in terms" :value="term">{{term}}</option>
      </select>
      <!--学期选择下拉列表-->
      <select id="teacherSelect" class="selectWM" v-model="evaluateinfoKey.teacherId" >
        <option value="">选择教师</option>
        <option v-if="evaluateinfoKey.term!='0'" v-for="teacher in teacherList" :value="teacher.teacherId">{{teacher.teacherName}}</option>
      </select>
      <!--教师选择下拉列表-->
      <span><button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="checkEvaInfoClick()">查询</button></span>
      <!--查询按钮-->
    </div>
    <div id="evaResultTable" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
      <table id="stdInfoTableSy" class="operationTable" style="table-layout: fixed;">
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
        <tr v-for="(result,index) in results">
          <td v-text="result.courseId"></td>
          <td v-text="result.courseName"></td>
          <td v-text="result.teacherId"></td>
          <td v-text="result.teacherName"></td>
          <td v-text="result.evaStudentCount"></td>
          <td v-text="result.evaRecord"></td>
          <td><a href=""><button class="am-btn am-btn-success am-radius">查看</button></a></td>
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
                teacherId:''
              },
              terms:[
                ''
              ],
              teacherList:[
                {teacherName:'',teacherId:''}
              ],
                results:[
                  {courseId:'K2210710',courseName:'企业合作课程',teacherId:'1234567',teacherName:'何平',evaStudentCount:'65',evaRecord:'98',courseAssociationId:'暂无'}
                ]
            }
        },
      beforeMount:function() {
        this.$http.post('./getYearTermList',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          var termJ = response.body.yearTerm;
          this.terms.splice(0,1);
          for(var i=0;i<termJ.length;i++){
            this.terms.push(termJ[i].startYearSemester);
          }
        },function(error){
          console.log("获取error");
        });

        this.$http.post('./teacherManage/getTeacherInfo',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          var teacherJ = response.body.teacherSimpleInfoList;
          this.teacherList.splice(0,1);
          for(var j=0;j<teacherJ.length;j++){
            this.teacherList.push(
              {teacherName:teacherJ[j].teacherName,teacherId:teacherJ[j].teacherId}
            );
          }
        },function(error){
          console.log("获取error");
        });
      },
//      初始化页面时，获取学期列表，教师列表，课程列表，课程信息列表
      methods:{
        checkEvaInfoClick: function(){
          this.$http.post('./acdCheckEvaResult',{
            "yearTerm":this.evaluateinfoKey.term,
            "teacherId":this.evaluateinfoKey.teacherId
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
