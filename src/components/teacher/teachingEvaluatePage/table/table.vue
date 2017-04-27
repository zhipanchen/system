<template>
    <div id="table">
      <div id="sel">
        <select @change="chooseTerm(option1)"  v-model="option1">
          <option v-for="option1 in semesterList" :value="option1">
            {{ option1}}
          </option>
        </select>
        <!--<input type="text" name="classNum" onfocus="if(value=='课程代码') {value=''}" onblur="if(value=='') {value='课程代码'}" value="课程代码"/>-->
        <!--<input type="text" name="className"onfocus="if(value=='课程名称') {value=''}" onblur="if(value=='') {value='课程名称'}" value="课程名称"/>-->
        <button class="am-btn am-btn-success am-radius">查看学生留言</button>
      </div>
      <div id="back">
      <div id="show">
        <table class="normalTable">
          <thead>
            <tr>
              <th width="20%">课程代码</th>
              <th width="20%">课程名称</th>
              <th width="20%">课程类型</th>

              <th width="20%">参评人数</th>
              <th width="20%">综合得分</th>
              <!--<th width="15%">等级</th>-->
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in evaluationResult">
              <td v-text="data.courseId"></td>
              <td v-text="data.courseName"></td>
              <td v-text="data.courseType"></td>
              <td v-text="data.evaNum"></td>
              <td v-text="data.multiplyScore"></td>
              <!--<td v-text="data.grade"></td>-->
            </tr>
          </tbody>
          </table>
      </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'table',
        data () {
            return {
              semesterList:[
                           ],
              option1:'',
              evaluationResult:[

              ]
            }
        },
      beforeMount:function(){
        this.$http.post('./studentEvaluation/showEvaluation',{},
          {"Content-Type":"application/json"}).then(function(response){
            console.log(response.body);
            this.evaluationResult = response.body.evaluationResult;
            this.semesterList = response.body.semesterList;
            this.option1 = response.body.currentSemester;
          },
          function(error){
            console.log("审核通过error:");
            console.log(error);
          });
      },
      methods:{
        chooseTerm:function(value){
          this.$http.post('./studentEvaluation/showEvaluation',{
//            "appTeacherSerial": "0301",
            "semester": value
          },{"Content-Type":"application/json"}).then(function (response) {
              console.log("结果");
              console.log(response.body);
              if(response.body.result=="success")
              { alert("操作成功！");
                this.evaluationResult = response.body.evaluationResult;}
              else
              {alert("操作失败！")}
            },
            function(error){
              console.log("结果error:");
              console.log(error);
            });
        }
      }
    }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  #sel{
    display: flex;
    padding-left:5rem;
    background-color: white;
    padding-top: 1rem;
    padding-bottom: 1rem;

  }
  #back{    background-color: #f3f3f3;}
  select{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.7rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    /*margin-left:3rem;*/
    font-size: 0.8rem;
  }
  input{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.3rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    margin-left:3rem;
    font-size: 0.8rem;
  }
  button{
   position: relative;
    left:52rem;
  }
  table{
    /*border: solid 1px lightgray;*/
    border-collapse: collapse;
    /*width:100%;*/
    /*font-size: 0.8rem;*/
  }
  #show{
    background-color: white;
    margin-right:5rem;
    margin-left:5rem;
    height:30rem;
    position: relative;
    top:2rem;
  }
  tr{
    height:2rem;
  }
  td{
    border:solid 1px lightgrey;
  }
  th{
    border:solid 1px lightgrey;
    height: 2.5rem;
  }
</style>
