<template>
  <div id="table">
    <div id="sel">
      <span>请选择每周不上课的时间：</span>
      <select  v-model="option2value" >
        <option v-for="option2 in options2"  :value="option2.value">
          {{option2.text}}
        </option>
      </select>
      <button @click="chooseDay(option2value)" class="am-btn am-btn-success am-radius">提交</button>
    </div>
    <div id="back">
    <div id="show">
    <p id="wor">*下面是教务人员的批复记录：</p>
    <table class="normalTable" border="1">
      <thead>
       <tr>
         <th width="20%">申请教师</th>
         <th width="20%">申请学期</th>
         <th width="20%">申请内容</th>
         <th width="20%">教务反馈</th>
         <th width="20%">申请时间</th>
       </tr>
      </thead>
      <tbody>
       <tr v-for="data in tableList">
         <td v-text="data.appTeacherName"></td>
         <td v-text="data.appTerm"></td>
         <td v-text="data.appContent"></td>
         <td v-text="data.acdeminreply"></td>
         <td v-text="data.appTime"></td>
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
              option2value:'',
              options2:[
                {text:'选择星期几',value:'0'},
                {text:'星期一',value:'1'},
                {text:'星期二',value:'2'},
                {text:'星期三',value:'3'},
                {text:'星期四',value:'4'},
                {text:'星期五',value:'5'}
              ],
              tableList:[]
            }
        },
      beforeMount:function(){
        this.$http.post('./teacherRestShowApply',{},
          {"Content-Type":"application/json"}).then(function(response){
            console.log(response.body);
            this.tableList = response.body.tableList;
            for(var i = 0;i < response.body.tableList.length;i++){
              if(response.body.tableList[i].acdeminreply == "0"){
                this.tableList[i].acdeminreply="待审核";
              }else if(response.body.tableList[i].acdeminreply == "1"){
                this.tableList[i].acdeminreply="审核通过";
              }else{ this.tableList[i].acdeminreply="审核不通过";}
            }
          },
          function(error){
          console.log("审核通过error:");
          console.log(error);
        });
      },
      methods:{
        chooseDay:function(value){

          this.$http.post('./teacherRestApplyHandle',{
            "appTeacherCommand": value
          },{"Content-Type":"application/json"}).then(function (response) {
              console.log("结果");
              console.log(response.body);
            if(response.body.result=="1")
            {alert("操作成功！")}
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
  html{
    font-size: 16px;
    /*background-color: #f3f3f3;*/
  }
  #sel{
    display: flex;
    padding-left:5rem;
    background-color: white;
    padding-top: 1rem;
    padding-bottom: 1rem;
 }
  #show{
      background-color: white;
      margin-right:5rem;
      margin-left:5rem;
      height:30rem;

    }
  #back{
    background-color: #f3f3f3;
    padding-top:0.1rem;
  }
  select{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.7rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    margin-left:3rem;
    font-size: 0.8rem;
  }
  button{

    /*height: 2.5rem;*/
    min-width: 5rem;
    position: absolute;
    left:70rem;

  }
  table{
    /*border: solid 1px white;*/
    border-collapse: collapse;
    /*margin-left:1rem;*/
    /*margin-right:1rem;*/
    /*width:96%;*/

  }
  thead{
    /*border-bottom:solid 2px lightgrey;*/
  }

  tr{
    height:2.5rem;
  }
  #wor{
    display: flex;
    margin-left:1rem;
    padding-top:1rem;
  }
</style>
