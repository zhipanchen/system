<template>
    <div id="tchingProcess" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
      <div v-for="(yearAndCourse,yearTypeIndex) in yearAndCourseList">
        <div :id="yearTypeIndex + 'YearsTypeDiv'" class="yearsTypeDiv">
          <!--年制模块下拉菜单-->
          <!--<span><img :id="yearType.English + 'Arrow'" class="yearsTypeImg" :src="arrowright"></span>-->
          <span :id="yearTypeIndex + 'P'" class="yearsTypeP">{{yearAndCourse.yearType}}年制</span>
          <span><button id="yearTypeIndex + 'Module'" class="yearButton">下载模板</button></span>
        </div>

        <div :id="yearTypeIndex + 'ProcessMenu'">
          <div v-for="(grade,gradeIndex) in yearAndCourse.gradeList">
            <div :id="yearTypeIndex + 'GradeProcessDiv' + gradeIndex" class="gradeProcessDiv">
              <!--年级教学进程下拉菜单-->
              <span><img :id="yearTypeIndex + 'Arrow' + gradeIndex" class="gradeProcessImg" @click="tableSlideToggle(yearTypeIndex,gradeIndex)" :src="arrowright"></span>
              <span :id="yearTypeIndex + 'P' + gradeIndex" class="gradeProcessP" @click="tableSlideToggle(yearTypeIndex,gradeIndex)">{{grade.gradeName}}级</span>
              <span><button class="gradeButton">导入</button></span>
              <span><button class="gradeButton">导出</button></span>
            </div>

            <div :id="yearTypeIndex + 'Table' + gradeIndex" style="display: none">
              <table class="normalTable" style="table-layout: fixed">
                <thead>
                <tr>
                  <th width="12%" rowspan="2">课程类别</th>
                  <th width="12%" rowspan="2">课程名称</th>
                  <th width="18%" colspan="3">学时</th>
                  <th width="48%" colspan="10">执行学期</th>
                  <th width="10%" rowspan="2">课程状态</th>
                </tr>
                <tr>
                  <td>总计</td>
                  <td>理论</td>
                  <td>实践</td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                  <td>8</td>
                  <td>9</td>
                  <td>10</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="course in grade.courseList">
                  <td v-text="course.courseType"></td>
                  <td v-text="course.courseName"></td>
                  <td v-text="course.studentTimeAdd"></td>
                  <td v-text="course.studentTimeTheory"></td>
                  <td v-text="course.studentTimePractice"></td>
                  <td v-text="course.term1"></td>
                  <td v-text="course.term2"></td>
                  <td v-text="course.term3"></td>
                  <td v-text="course.term4"></td>
                  <td v-text="course.term5"></td>
                  <td v-text="course.term6"></td>
                  <td v-text="course.term7"></td>
                  <td v-text="course.term8"></td>
                  <td v-text="course.term9"></td>
                  <td v-text="course.term10"></td>
                  <td v-text="course.courseStatus"></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import arrowright from "./images/arrowright.png"
  import arrowdown from "./images/arrowdown.png"
    export default {
        name: '',
        data () {
            return {
              arrowright:arrowright,
              arrowdown:arrowdown,
              yearAndCourseList:[
                {
                  yearType:'3',
                  gradeList:[
                    {
                      gradeName:'2013',
                      courseList:[
                        {courseType:'公共基础课3',courseName:'职业生涯规划',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1:'36',term2:'',term3:'',term4:'',term5:'',term6:'',term7:'',term8:'',term9:'',term10:'',courseStatus:'未完成'},
                        {courseType:'公共基础课3',courseName:'哲学与人生',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1:'',term2:'36',term3:'',term4:'',term5:'',term6:'',term7:'',term8:'',term9:'',term10:'',courseStatus:'未完成'},
                        {courseType:'公共基础课3',courseName:'经济政治与社会',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1:'',term2:'',term3:'36',term4:'',term5:'',term6:'',term7:'',term8:'',term9:'',term10:'',courseStatus:'未完成'}
                      ]
                    },
                    {
                      gradeName:'2012',
                      courseList:[
                        {courseType:'公共基础课2',courseName:'职业生涯规划',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1:'36',term2:'',term3:'',term4:'',term5:'',term6:'',term7:'',term8:'',term9:'',term10:'',courseStatus:'未完成'},
                        {courseType:'公共基础课2',courseName:'哲学与人生',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1:'',term2:'36',term3:'',term4:'',term5:'',term6:'',term7:'',term8:'',term9:'',term10:'',courseStatus:'未完成'},
                        {courseType:'公共基础课2',courseName:'经济政治与社会',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1:'',term2:'',term3:'36',term4:'',term5:'',term6:'',term7:'',term8:'',term9:'',term10:'',courseStatus:'未完成'}
                      ]
                    }
                  ]
                },
                {
                  yearType:'5',
                  gradeList:[
                    {
                      gradeName:'2015',
                      courseList:[
                        {courseType:'公共基础课5',courseName:'职业生涯规划',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1:'36',term2:'',term3:'',term4:'',term5:'',term6:'',term7:'',term8:'',term9:'',term10:'',courseStatus:'未完成'},
                        {courseType:'公共基础课5',courseName:'哲学与人生',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1:'',term2:'36',term3:'',term4:'',term5:'',term6:'',term7:'',term8:'',term9:'',term10:'',courseStatus:'未完成'},
                        {courseType:'公共基础课5',courseName:'经济政治与社会',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1:'',term2:'',term3:'36',term4:'',term5:'',term6:'',term7:'',term8:'',term9:'',term10:'',courseStatus:'未完成'}
                      ]
                    },
                    {
                      gradeName:'2014',
                      courseList:[
                        {courseType:'公共基础课4',courseName:'职业生涯规划',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1:'36',term2:'',term3:'',term4:'',term5:'',term6:'',term7:'',term8:'',term9:'',term10:'',courseStatus:'未完成'},
                        {courseType:'公共基础课4',courseName:'哲学与人生',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1:'',term2:'36',term3:'',term4:'',term5:'',term6:'',term7:'',term8:'',term9:'',term10:'',courseStatus:'未完成'},
                        {courseType:'公共基础课4',courseName:'经济政治与社会',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1:'',term2:'',term3:'36',term4:'',term5:'',term6:'',term7:'',term8:'',term9:'',term10:'',courseStatus:'未完成'}
                      ]
                    }
                  ]
                }
              ]
            }
        },
      beforeMount:function() {
        this.$http.post('../teachingProcessJson',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.yearAndCourseList = response.body.yearAndCourseList;
        },function(error){
          console.log("获取error");
        });
      },
      methods:{
        tableSlideToggle:function(yearTypeIndex,gradeIndex){
          var table = document.getElementById(yearTypeIndex + 'Table' + gradeIndex);
          var arrow = document.getElementById(yearTypeIndex + 'Arrow' + gradeIndex);
          if (arrow.src === this.arrowright){
            table.style.display = "inline";
            arrow.src = this.arrowdown;
          }
          else {
            table.style.display = "none";
            arrow.src = this.arrowright;
          }
        }
      }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    .yearsTypeDiv{
      position: relative;
      background-color: #158064;
      border-top:3px solid white;
      height: 2.5rem;
      width: 100%;
    }
    .gradeProcessDiv{
      position: relative;
      /*background-color: #158064;*/
      background-color: #1fa573;
      border-top:1px solid #ececec;
      height: 2rem;
      width: 100%;
    }
    .yearsTypeP{
      position: absolute;
      margin-left: 2rem;
      height: 2rem;
      width: 10rem;
      padding-top: 0.5rem;
      text-align: center;
      font-size: 1rem;
      color:#FFF;
      cursor: default;
    }
    .gradeProcessP{
      position: absolute;
      height: 1.7rem;
      width: 10rem;
      padding-top: 0.3rem;
      text-align: center;
      font-size: 0.9rem;
      color:#FFF;
      cursor: default;
    }
    .gradeProcessP:hover,.gradeProcessImg:hover{
      background-color: #00a539;
    }
    /*.yearsTypeImg{*/
      /*width: 2.5rem;*/
      /*height: 2.5rem;*/
    /*}*/
    .gradeProcessImg{
      width: 2rem;
      height: 2rem;
      /*margin-left: 0.7rem;*/
    }
    .yearButton{
      float: right;
      margin-top: 0.5rem;
      margin-right: 5rem;
      background-color: #158064;
      font-size: 0.8rem;
      color:#FFF;
      text-align: center;
      border-radius: 0.5rem;
      padding-bottom: 0.1rem;
      height: 1.4rem;
      min-width: 5rem;
      border-color: white;
      border-style: solid;
      border-width: 0.1rem;
      /*更改button的边框属性*/
    }
    .yearButton:hover{
      background-color: #00a539;
    }
    .gradeButton{
      float: right;
      margin-top: 0.3rem;
      margin-right: 5rem;
      background-color: #1fa573;
      font-size: 0.8rem;
      color:#FFF;
      text-align: center;
      border-radius: 0.5rem;
      padding-bottom: 0.1rem;
      height: 1.4rem;
      min-width: 5rem;
      border-color: white;
      border-style: solid;
      border-width: 0.1rem;
      /*更改button的边框属性*/
    }
    .gradeButton:hover{
      background-color: #00a539;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
