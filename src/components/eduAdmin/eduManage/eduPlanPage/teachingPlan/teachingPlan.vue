<template>
  <div id="tchingPlan" style="padding: 0.6rem 5rem;margin-top: 3.5rem;background-color: #f3f3f3">
    <div>
      <div class="yearsTypeDiv">
        <span class="yearsTypeP">5年制培养方案</span>
        <span><button class="yearButton" @click="downloadFormClick">下载模板</button></span>
      </div>
      <!--年制栏-->
      <div>
        <div v-for="(grade,gradeIndex) in gradeIdArr">
          <div v-if="grade.yearType=='5'" :id="'5GradePlanDiv' + gradeIndex" class="gradePlanDiv">
            <span><img :id="'5Arrow' + gradeIndex" class="gradePlanImg" @click="tableSlideToggle(grade.yearType,gradeIndex,grade.gradeName)" :src="arrowright"></span>
            <span :id="'5P' + gradeIndex" class="gradePlanP" @click="tableSlideToggle(grade.yearType,gradeIndex,grade.gradeName)">{{grade.gradeName}}级</span>
            <span><button class="gradeButton" @click="downloadClick(gradeIdList[gradeIndex])">下载</button></span>
            <span style="display: inline-block;float: right;margin-bottom: 0.3rem">
              <Upload
                ref="upload"
                :data="{'gradeId':gradeIdList[gradeIndex]}"
                :show-upload-list = false
                :format="['xls','xlsx']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleSizeError"
                :on-progress="handleProgress"
                :on-success="handleSuccess"
                :on-error="handleError"
                action="./schoolCoursePlan/importExcel">
                <button type="ghost" id="leadIn" class="gradeButton">上传</button>
              </Upload>
              <!--上传的data数据用对象传输-->
            </span>
          </div>
          <!--年级教学进程下拉菜单-->
          <div :id="'5Table' + gradeIndex" style="display: none">
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
              <tr v-for="course in courseAllList[gradeIndexArr[gradeIndex]].courseList">
                <td v-text="course.courseId"></td>
                <td v-text="course.courseTypeName"></td>
                <td v-text="course.courseName"></td>
                <td v-text="course.totalHours"></td>
                <td v-text="course.theoryHours"></td>
                <td v-text="course.practice"></td>
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
                <td v-text="course.checkSemesters"></td>
                <td v-text="course.examSemesters"></td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--课程信息table-->
        </div>
      </div>
    </div>
    <!--5年制培养方案-->
    <div>
      <div class="yearsTypeDiv">
        <!--年制模块下拉菜单-->
        <span class="yearsTypeP">3年制培养方案</span>
        <span><button class="yearButton" @click="downloadFormClick">下载模板</button></span>
      </div>

      <div>
        <div v-for="(grade,gradeIndex) in gradeIdArr">
          <div v-if="grade.yearType==='3'" :id="'3GradePlanDiv' + gradeIndex" class="gradePlanDiv">
            <span><img :id="'3Arrow' + gradeIndex" class="gradePlanImg" @click="tableSlideToggle(grade.yearType,gradeIndex,grade.gradeName)" :src="arrowright"></span>
            <span :id="'3P' + gradeIndex" class="gradePlanP" @click="tableSlideToggle(grade.yearType,gradeIndex,grade.gradeName)">{{grade.gradeName}}级</span>
            <span><button class="gradeButton" @click="downloadClick(gradeIdList[gradeIndex])">下载</button></span>
            <span style="display: inline-block;float: right;margin-bottom: 0.3rem">
              <Upload
                ref="upload"
                :data="{'gradeId':gradeIdList[gradeIndex]}"
                :show-upload-list = false
                :format="['xls','xlsx']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleSizeError"
                :on-progress="handleProgress"
                :on-success="handleSuccess"
                :on-error="handleError"
                action="./schoolCoursePlan/importExcel">
                <button type="ghost" id="leadIn" class="gradeButton">上传</button>
              </Upload>
            </span>
          </div>
          <!--年级教学进程下拉菜单-->
          <div :id="'3Table' + gradeIndex" style="display: none">
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
              <tr v-for="course in courseAllList[gradeIndexArr[gradeIndex]].courseList">
                <td v-text="course.courseId"></td>
                <td v-text="course.courseTypeName"></td>
                <td v-text="course.courseName"></td>
                <td v-text="course.totalHours"></td>
                <td v-text="course.theoryHours"></td>
                <td v-text="course.practice"></td>
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
                <td v-text="course.checkSemesters"></td>
                <td v-text="course.examSemesters"></td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--课程信息table-->
        </div>
      </div>
    </div>
    <!--3年制培养方案-->
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
//        courseIndex:'0',
        gradeIdList:[
          '20145','20155','20133','20143'
        ],
        gradeIdArr:[
//          {gradeName:'',yearType:''}
        ],
        gradeIndexArr:[
          '0','0','0','0','0','0','0','0'
        ],
        courseAllList:[
          {
            grade:'',
            yearType:'',
            courseList:[
              {courseId:'55345',courseTypeName:'公共基础课',courseName:'职业生涯规划',totalHours:'36',theoryHours:'32',practice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',checkSemesters:'1',examSemesters:''},
              {courseId:'55346',courseTypeName:'公共基础课',courseName:'哲学与人生',totalHours:'36',theoryHours:'32',practice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',checkSemesters:'2',examSemesters:''},
              {courseId:'55347',courseTypeName:'公共基础课',courseName:'经济政治与社会',totalHours:'36',theoryHours:'32',practice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',checkSemesters:'3',examSemesters:''}
            ]
          }
        ]
      }
    },
    beforeMount:function() {
      this.$http.post('./schoolCoursePlan/showGrade',{},{
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
//    初始化页面时，获取年级Id列表
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
          this.$http.post('./schoolCoursePlan/showPlan',{
            "gradeId":this.gradeIdList[gradeIndex]
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.courseAllList.push({grade:response.body.grade,yearType:response.body.yearType,courseList:response.body.schoolCoursePlanVoList});
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
//      点击年级下拉该年级培养方案表格
      handleFormatError:function(file){
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传xls或xlsx表格。'
        });
      },
//      处理上传文件格式错误问题
      handleSizeError:function(file){
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      },
//      处理上传文件大小过大问题
      handleProgress:function(){
        this.$Message.loading("正在上传中...");
      },
//      message提示用户文件正在上传
      handleSuccess:function(res){
        if(res.result===1){
          this.$Message.success("上传成功！");
        }else{
          var result = res.result;
          this.$Message.error(result);
        }
      },
//      文件上传成功后，若文件内容没问题，提示上传成功，若文件内容出错，弹窗提示出错信息
      handleError:function(){
        this.$Message.error("上传失败");
      },
//      弹窗提示文件上传失败
      downloadFormClick:function(){
        location.href="./schoolCoursePlan/downloadTemplet";
      },
//      下载培养方案模板
      downloadClick:function(gradeId){
        location.href="./schoolCoursePlan/exportExcel?gradeId="+gradeId;
      }
//      下载某年级的培养方案
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
