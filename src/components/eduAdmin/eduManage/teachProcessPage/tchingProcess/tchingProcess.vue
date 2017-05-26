<template>
    <div id="tchingProcess" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
      <div>
        <div class="yearsTypeDiv">
          <!--年制模块下拉菜单-->
          <span class="yearsTypeP">5年制教学进度</span>
        </div>

        <div>
          <div v-for="(grade,gradeIndex) in gradeIdArr">
            <div v-if="grade.yearType==='5'" :id="'5GradeProcessDiv' + gradeIndex" class="gradeProcessDiv">
              <!--年级教学进程下拉菜单-->
              <span><img :id="'5Arrow' + gradeIndex" class="gradeProcessImg" @click="tableSlideToggle(grade.yearType,gradeIndex,grade.gradeName)" :src="arrowright"></span>
              <span :id="'5P' + gradeIndex" class="gradeProcessP" @click="tableSlideToggle(grade.yearType,gradeIndex,grade.gradeName)">{{grade.gradeName}}级</span>
              <span><button class="gradeButton" @click="downloadClick(gradeIdList[gradeIndex])">下载</button></span>
            </div>

            <div :id="'5Table' + gradeIndex" style="display: none">
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
                <tr v-for="course in courseAllList[gradeIndexArr[gradeIndex]].courseList">
                  <td v-text="course.courseTypeName"></td>
                  <td v-text="course.courseName"></td>
                  <td v-text="course.totalHours"></td>
                  <td v-text="course.theoryHours"></td>
                  <td v-text="course.practiceHours"></td>
                  <td v-text="course.semesterPeriod1"></td>
                  <td v-text="course.semesterPeriod2"></td>
                  <td v-text="course.semesterPeriod3"></td>
                  <td v-text="course.semesterPeriod4"></td>
                  <td v-text="course.semesterPeriod5"></td>
                  <td v-text="course.semesterPeriod6"></td>
                  <td v-text="course.semesterPeriod7"></td>
                  <td v-text="course.semesterPeriod8"></td>
                  <td v-text="course.semesterPeriod9"></td>
                  <td v-text="course.semesterPeriod10"></td>
                  <td v-if="course.teachStatus === 0">未开始</td>
                  <td v-else-if="course.teachStatus === 1">完成</td>
                  <td v-else>正在执行</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="yearsTypeDiv">
          <!--年制模块下拉菜单-->
          <!--<span><img :id="yearType.English + 'Arrow'" class="yearsTypeImg" :src="arrowright"></span>-->
          <span class="yearsTypeP">3年制教学进度</span>
        </div>

        <div>
          <div v-for="(grade,gradeIndex) in gradeIdArr">
            <div v-if="grade.yearType==='3'" :id="'3GradeProcessDiv' + gradeIndex" class="gradeProcessDiv">
              <!--年级教学进程下拉菜单-->
              <span><img :id="'3Arrow' + gradeIndex" class="gradeProcessImg" @click="tableSlideToggle(grade.yearType,gradeIndex,grade.gradeName)" :src="arrowright"></span>
              <span :id="'3P' + gradeIndex" class="gradeProcessP" @click="tableSlideToggle(grade.yearType,gradeIndex,grade.gradeName)">{{grade.gradeName}}级</span>
              <span><button class="gradeButton" @click="downloadClick(gradeIdList[gradeIndex])">下载</button></span>
            </div>

            <div :id="'3Table' + gradeIndex" style="display: none">
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
                <tr v-for="course in courseAllList[gradeIndexArr[gradeIndex]].courseList">
                  <td v-text="course.courseTypeName"></td>
                  <td v-text="course.courseName"></td>
                  <td v-text="course.totalHours"></td>
                  <td v-text="course.theoryHours"></td>
                  <td v-text="course.practiceHours"></td>
                  <td v-text="course.semesterPeriod1"></td>
                  <td v-text="course.semesterPeriod2"></td>
                  <td v-text="course.semesterPeriod3"></td>
                  <td v-text="course.semesterPeriod4"></td>
                  <td v-text="course.semesterPeriod5"></td>
                  <td v-text="course.semesterPeriod6"></td>
                  <td v-text="course.semesterPeriod7"></td>
                  <td v-text="course.semesterPeriod8"></td>
                  <td v-text="course.semesterPeriod9"></td>
                  <td v-text="course.semesterPeriod10"></td>
                  <td v-if="course.teachStatus === 0">未开始</td>
                  <td v-else-if="course.teachStatus === 1">完成</td>
                  <td v-else>正在执行</td>
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
              indexBool:false,
              courseIndex:'0',
              gradeIdList:[
                '20145','20155','20133','20143'
              ],
              gradeIdArr:[
//                {gradeName:'2015',yearType:'5'}
              ],
              gradeIndexArr:[
                '0','0','0','0','0','0','0','0'
              ],
              courseAllList:[
                {
                  grade:'',
                  yearType:'',
                  courseList:[
                    {courseTypeName:'公共基础课3',courseName:'职业生涯规划',totalHours:'36',theoryHours:'32',practiceHours:'4',semesterPeriod1:'36',semesterPeriod2:'',semesterPeriod3:'',semesterPeriod4:'',semesterPeriod5:'',semesterPeriod6:'',semesterPeriod7:'',semesterPeriod8:'',semesterPeriod9:'',semesterPeriod10:'',teachStatus:'0'},
                    {courseTypeName:'公共基础课3',courseName:'哲学与人生',totalHours:'36',theoryHours:'32',practiceHours:'4',semesterPeriod1:'',semesterPeriod2:'36',semesterPeriod3:'',semesterPeriod4:'',semesterPeriod5:'',semesterPeriod6:'',semesterPeriod7:'',semesterPeriod8:'',semesterPeriod9:'',semesterPeriod10:'',courseStatus:'1'},
                    {courseTypeName:'公共基础课3',courseName:'经济政治与社会',totalHours:'36',theoryHours:'32',practiceHours:'4',semesterPeriod1:'',semesterPeriod2:'',semesterPeriod3:'36',semesterPeriod4:'',semesterPeriod5:'',semesterPeriod6:'',semesterPeriod7:'',semesterPeriod8:'',semesterPeriod9:'',semesterPeriod10:'',courseStatus:'2'}
                  ]
                }
              ]
            }
        },
      beforeMount:function() {
        this.$http.post('./teachingSchedule/showGrade',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.gradeIdList = response.body.gradeIdList;
          for(var i=0;i<this.gradeIdList.length;i++){
            this.gradeIdArr.push({gradeName:this.gradeIdList[i].slice(0,4),yearType:this.gradeIdList[i].slice(4,5)});
          }
        },function(error){
          console.log("获取error");
        });
      },
      methods:{
        tableSlideToggle:function(yearType,gradeIndex,gradeName){
          var table = document.getElementById(yearType + 'Table' + gradeIndex);
          var arrow = document.getElementById(yearType + 'Arrow' + gradeIndex);
          this.indexBool = false;
          for(var i=0;i<this.courseAllList.length;i++){
            if(this.courseAllList[i].grade===gradeName && this.courseAllList[i].yearType===yearType){
              this.gradeIndexArr[gradeIndex] = i;
              this.indexBool = true;
              break;
            }
          }
          if(this.indexBool === false){
            this.$http.post('./showTeachProcess',{
              "gradeId":this.gradeIdList[gradeIndex]
            },{
              "Content-Type":"application/json"
            }).then(function (response) {
              console.log(response);
              var grade = response.body.grade;
              var yearType = response.body.yearType;
              var teachProcessVoList = response.body.teachProcessVoList;
              this.courseAllList.push({grade:grade,yearType:yearType,courseList:teachProcessVoList});
              this.gradeIndexArr[gradeIndex] = this.courseAllList.length - 1;
            },function(error){
              console.log("获取error");
            });
          }
          if (arrow.src === this.arrowright){
            table.style.display = "inline";
            arrow.src = this.arrowdown;
          }
          else {
            table.style.display = "none";
            arrow.src = this.arrowright;
          }
        },
        downloadClick:function(gradeId){
          location.href="./exportTeachProcess?gradeId="+gradeId;
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
