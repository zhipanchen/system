<template>
  <div>
    <div id="stdInquireGradeChangeTerm">
      <select class="selectWM" v-model="termEle">
        <option value="0">选择学期</option>
        <option v-for="term in terms" :value="term">{{term}}</option>
      </select>
      <span><button id="changebut" class="am-btn am-btn-success am-radius buttonWM" @click="changeTerm()">切换学期</button></span>
      <span><button id="allbut" class="am-btn am-btn-success am-radius buttonWM" @click="allTerm()">所有学期成绩</button></span>
    </div>
    <div id="stdTable" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
      <table id="stdInquireGradeTableSy" class="normalTable" style="table-layout: fixed;">
        <thead>
        <tr>
          <th>学年学期</th>
          <th>课程代码</th>
          <th>课程名称</th>
          <th>课程类别</th>
          <th>总评成绩</th>
          <th>补考成绩</th>
          <th>最终</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="studentScore in studentScoreList">
          <td v-text="studentScore.term"></td>
          <td v-text="studentScore.courseId"></td>
          <td v-text="studentScore.courseName"></td>
          <td v-text="studentScore.courseType"></td>
          <td v-text="studentScore.grade"></td>
          <td v-text="studentScore.makeUpGrade"></td>
          <td v-text="studentScore.finalGrade"></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'stdInquireGradeTableSy',
    data () {
      return {
        termEle:'0',
        terms:[
          '2014-2015.1',
          '2014-2015.2',
          '2015-2016.1',
          '2015-2016.1'
        ],
        studentScoreList:[
          {term:'2016-2017.2',courseId:'K2210710',courseName:'企业合作课程',courseType:'实践类核心课程',grade:'80',makeUpGrade:'--',finalGrade:'80'},
          {term:'2016-2017.2',courseId:'K2210710',courseName:'企业合作课程',courseType:'实践类核心课程',grade:'80',makeUpGrade:'--',finalGrade:'80'},
          {term:'2016-2017.2',courseId:'K2210710',courseName:'企业合作课程',courseType:'实践类核心课程',grade:'80',makeUpGrade:'--',finalGrade:'80'}
        ]
      }
    },
    beforeMount:function() {
      this.$http.post('./studentFindScore',{
        "yearTerm":""
      },{
        "Content-Type":"application/json"
      }).then(function (response) {
        console.log(response);
        this.studentScoreList = response.body.studentScoreList;
      },function(error){
        console.log("获取error");
      });
    },
    methods:{
      changeTerm: function(){
        this.$http.post('./studentFindScore',{
          "yearTerm":this.termEle
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.studentScoreList = response.body.studentScoreList;
        },function(error){
          console.log("获取error");
        });
      },
      allTerm: function(){
        this.$http.post('./studentFindScore',{
          "yearTerm":""
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.studentScoreList = response.body.studentScoreList;
        },function(error){
          console.log("获取error");
        });
      }
    }
  }
</script>

<style scoped>
    html{
        font-size: 62.5%;

    }
    #stdInquireGradeChangeTerm{
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
      min-width: 5.6rem;
      margin: 0 0.7rem;
    }
    @media screen and (max-width:1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
