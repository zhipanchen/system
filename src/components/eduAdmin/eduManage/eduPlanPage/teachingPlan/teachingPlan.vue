<template>
  <div id="tchingPlan" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
    <div v-for="(yearAndCourse,yearTypeIndex) in yearAndCourseList">
      <div :id="yearTypeIndex + 'YearsTypeDiv'" class="yearsTypeDiv">
        <!--年制模块下拉菜单-->
        <!--<span><img :id="yearType.English + 'Arrow'" class="yearsTypeImg" :src="arrowright"></span>-->
        <span :id="yearTypeIndex + 'P'" class="yearsTypeP">{{yearAndCourse.yearType}}年制</span>
        <span><button id="yearTypeIndex + 'Module'" class="yearButton">下载模板</button></span>
      </div>

      <div :id="yearTypeIndex + 'PlanMenu'">
        <div v-for="(grade,gradeIndex) in yearAndCourse.gradeList">
          <div :id="yearTypeIndex + 'GradePlanDiv' + gradeIndex" class="gradePlanDiv">
            <!--年级教学进程下拉菜单-->
            <span><img :id="yearTypeIndex + 'Arrow' + gradeIndex" class="gradePlanImg" @click="tableSlideToggle(yearTypeIndex,gradeIndex)" :src="arrowright"></span>
            <span :id="yearTypeIndex + 'P' + gradeIndex" class="gradePlanP" @click="tableSlideToggle(yearTypeIndex,gradeIndex)">{{grade.gradeName}}级</span>
            <span><button class="gradeButton">导入</button></span>
            <span><button class="gradeButton">导出</button></span>
          </div>

          <div :id="yearTypeIndex + 'Table' + gradeIndex" style="display: none">
            <table class="normalTable" style="table-layout: fixed">
              <thead>
              <tr>
                <th width="6%" rowspan="3">课程编号</th>
                <th width="6%" rowspan="3">课程类别</th>
                <th width="6%" rowspan="3">课程名称</th>
                <th width="12%" rowspan="2" colspan="3">学时</th>
                <th width="64%" colspan="20">执行学期</th>
                <th width="6%" rowspan="2" colspan="2">考核学期</th>
              </tr>
              <tr>
                <td colspan="2">1</td>
                <td colspan="2">2</td>
                <td colspan="2">3</td>
                <td colspan="2">4</td>
                <td colspan="2">5</td>
                <td colspan="2">6</td>
                <td colspan="2">7</td>
                <td colspan="2">8</td>
                <td colspan="2">9</td>
                <td colspan="2">10</td>
              </tr>
              <tr>
                <td>总计</td>
                <td>理论</td>
                <td>实践</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>考察</td>
                <td>考试</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="course in grade.courseList">
                <td v-text="course.courseId"></td>
                <td v-text="course.courseType"></td>
                <td v-text="course.courseName"></td>
                <td v-text="course.studentTimeAdd"></td>
                <td v-text="course.studentTimeTheory"></td>
                <td v-text="course.studentTimePractice"></td>
                <td v-text="course.term1st"></td>
                <td v-text="course.term1nd"></td>
                <td v-text="course.term2st"></td>
                <td v-text="course.term2nd"></td>
                <td v-text="course.term3st"></td>
                <td v-text="course.term3nd"></td>
                <td v-text="course.term4st"></td>
                <td v-text="course.term4nd"></td>
                <td v-text="course.term5st"></td>
                <td v-text="course.term5nd"></td>
                <td v-text="course.term6st"></td>
                <td v-text="course.term6nd"></td>
                <td v-text="course.term7st"></td>
                <td v-text="course.term7nd"></td>
                <td v-text="course.term8st"></td>
                <td v-text="course.term8nd"></td>
                <td v-text="course.term9st"></td>
                <td v-text="course.term9nd"></td>
                <td v-text="course.term10st"></td>
                <td v-text="course.term10nd"></td>
                <td v-text="course.inspect"></td>
                <td v-text="course.exam"></td>
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
                  {courseId:'33345',courseType:'公共基础课',courseName:'职业生涯规划',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',inspect:'1',exam:''},
                  {courseId:'33346',courseType:'公共基础课',courseName:'哲学与人生',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',inspect:'2',exam:''},
                  {courseId:'33347',courseType:'公共基础课',courseName:'经济政治与社会',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',inspect:'3',exam:''}
                ]
              },
              {
                gradeName:'2012',
                courseList:[
                  {courseId:'32345',courseType:'公共基础课',courseName:'职业生涯规划',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',inspect:'1',exam:''},
                  {courseId:'32346',courseType:'公共基础课',courseName:'哲学与人生',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',inspect:'2',exam:''},
                  {courseId:'32347',courseType:'公共基础课',courseName:'经济政治与社会',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',inspect:'3',exam:''}
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
                  {courseId:'55345',courseType:'公共基础课',courseName:'职业生涯规划',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',inspect:'1',exam:''},
                  {courseId:'55346',courseType:'公共基础课',courseName:'哲学与人生',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',inspect:'2',exam:''},
                  {courseId:'55347',courseType:'公共基础课',courseName:'经济政治与社会',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',inspect:'3',exam:''}
                ]
              },
              {
                gradeName:'2014',
                courseList:[
                  {courseId:'54345',courseType:'公共基础课',courseName:'职业生涯规划',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',inspect:'1',exam:''},
                  {courseId:'54346',courseType:'公共基础课',courseName:'哲学与人生',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',inspect:'2',exam:''},
                  {courseId:'54347',courseType:'公共基础课',courseName:'经济政治与社会',studentTimeAdd:'36',studentTimeTheory:'32',studentTimePractice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',inspect:'3',exam:''}
                ]
              }
            ]
          }
        ]
      }
    },
    beforeMount:function() {
      this.$http.post('../teachingPlanJson',{},{
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
  .gradePlanDiv{
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
  .gradePlanP{
    position: absolute;
    height: 1.7rem;
    width: 10rem;
    padding-top: 0.3rem;
    text-align: center;
    font-size: 0.9rem;
    color:#FFF;
    cursor: default;
  }
  .gradePlanP:hover,.gradePlanImg:hover{
    background-color: #00a539;
  }
  /*.yearsTypeImg{*/
  /*width: 2.5rem;*/
  /*height: 2.5rem;*/
  /*}*/
  .gradePlanImg{
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
