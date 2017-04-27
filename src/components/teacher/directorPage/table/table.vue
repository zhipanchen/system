<template>
    <div id="table">
      <div id="show">
        <button>一键提交</button>
        <table class="operationTable">
          <thead>
          <tr>
            <th>课程代码</th>
            <th>课程名称</th>
            <th>上课时间</th>
            <th>确认已读</th>
            <th>督导结果</th>
            <th>督导结果</th>

          </tr>
          </thead>
          <tbody>
          <tr v-for="(data,index) in tableList">
            <td v-text="data.courseId"></td>
            <td v-text="data.courseName"></td>
            <td v-text="data.courseTime"></td>
            <td v-text="data.status" :id="'confirm'+index" @click="confirm(index)"></td>
            <td ><a href="#/teacher/directorResult">在线填写</a></td>
            <td v-text="data.status" ><span @click="up(index)">提交</span></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'table',
        data () {
            return {
              tableList:[]
            }
        },
      beforeMount:function(){
        this.$http.post('../jsonphp/director.php',{},
          {"Content-Type":"application/json"}).then(function (response) {
            console.log(response);
            this.tableList = response.body.teacherSupervision;
            for(var i = 0;i < response.body.teacherSupervision.length;i++){
              if(response.body.teacherSupervision[i].status == "0"){
                this.tableList[i].status="确认已读";
              }else{
                this.tableList[i].status="已读";
              }
            }
          },
          function(error){
            console.log("获取error:");
            console.log(error);
          });
      },
      methods:{
          confirm:function(index){
            console.log(index);
            console.log(this.tableList[index].status);
          if(this.tableList[index].status=="确认已读")
          this.$http.post('../jsonphp/director.php',{
            "superviseId":"this.tableList[index].superviseId"
          },{"Content-Type":"application/json"}).then(function (response) {
              if(response.body.result=="1")
              {
              this.tableList[index].status="已读"}
              console.log( this.tableList[index].status);
              console.log("保存:");
              console.log(response.body);
            },
            function(error){
              console.log("保存error:");
              console.log(error);
            });
        },
        up:function(index){
          console.log(index);
          console.log(this.tableList[index].status);
          if(this.tableList[index].status=="确认已读")
            this.$http.post('../jsonphp/director.php',{
              "superviseId":"this.tableList[index].superviseId"
            },{"Content-Type":"application/json"}).then(function (response) {
                if(response.body.result=="1")
                {
                  this.tableList[index].status="已读"}
                console.log( this.tableList[index].status);
                console.log("保存:");
                console.log(response.body);
              },
              function(error){
                console.log("保存error:");
                console.log(error);
              });
        }
      }
    }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  #table{
    background-color: #f3f3f3;
  }
  #sel{
    display: flex;
    padding-left:6rem;
    background-color: white;

    padding-top: 1rem;
    padding-bottom: 1rem;

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
    color: white;
    background-color: mediumseagreen;
    border: none;
    border-radius: 0.2rem;
    width: 6rem;
    height: 2rem;
    min-width: 5rem;
    position: relative;
    left:64rem;
    outline:none;
  }
  #show{
    background-color: white;
    margin-right:5rem;
    margin-left:5rem;
    height:30rem;
    position: relative;
    top:2rem;
  }
  /*table{*/
    /*border: solid 1px white;*/
    /*border-collapse: collapse;*/
    /*margin-left:1rem;*/
    /*margin-right:1rem;*/
    /*width:96%;*/

  /*}*/
  thead{
    border-bottom:solid 2px lightgrey;
  }

  tr{
    height:2.5rem;
  }

</style>
