<template>
  <div>
    <div id="courseTchInfo">
      <select class="selectWM" v-model="evaluateinfoKey.term">
        <option value="0">选择学期</option>
        <option v-for="term in terms" :value="term">{{term}}</option>
      </select>
      <span><input type="text" id="courseName" class="inputWM" placeholder="课程名称"  v-model="evaluateinfoKey.courseName"></span>
      <span><input type="text" id="tchName" class="inputWM" placeholder="教师姓名"  v-model="evaluateinfoKey.teacherName"></span>
      <span><button id="searchFor" class="am-btn am-btn-success am-radius buttonWM" @click="checkEvaInfoClick()">查询</button></span>
    </div>
    <div id="evaResultTable" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
      <!--评教结果表格-->
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
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              evaluateinfoKey:{
                term:'0',
                courseName:'',
                teacherName:''
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
                results:[
                  {courseId:'K2210710',courseName:'企业合作课程',teacherId:'1234567',teacherName:'何平',evaluateNumber:'65',multiplyScore:'98',tips:'暂无'},
                  {courseId:'K2210711',courseName:'企业合作课程',teacherId:'1234567',teacherName:'王建',evaluateNumber:'73',multiplyScore:'97',tips:'暂无'},
                  {courseId:'K2210712',courseName:'企业合作课程',teacherId:'1234567',teacherName:'张小山',evaluateNumber:'56',multiplyScore:'96',tips:'暂无'}
                ]
            }
        },
      beforeMount:function() {
        this.$http.post('../evaluateResultJson',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.results = response.body.evaluateResult.results;
          this.terms = response.body.evaluateResult.terms;
        },function(error){
          console.log("获取error");
        });
      },
      methods:{
        checkEvaInfoClick: function(){
          this.$http.post('../checkEvaluateInfoJson',{
            "term":this.evaluateinfoKey.term,
            "courseName":this.evaluateinfoKey.courseName,
            "teacherName":this.evaluateinfoKey.teacherName
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.results = response.body.results;
          },function(error){
            console.log("获取error");
          });
        }
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
