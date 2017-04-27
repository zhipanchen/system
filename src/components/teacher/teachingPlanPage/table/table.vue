<template>
  <div id="table">
    <div id="sel">
      <select  @change="chooseTerm(option2)" v-model="option2">
        <option v-for="option2 in semesterList" :value="option2">
          {{ option2 }}
        </option>
      </select>

    </div>
    <div id="back">
    <div id="show">
      <table class="operationTable">
        <thead>
        <tr>
          <th width="25%">上传教师</th>
          <th width="25%">上传时间</th>
          <th width="25%">导出</th>
          <th width="25%">操作</th>
        </tr>
        </thead>
        <tbody>

        <tr  v-for="(data,index) in tableList" :key="data.teacherName">
          <td v-text="data.teacherName"></td>
          <td v-text="data.teacherId"></td>
          <td v-text="data.uploadTime"></td>
          <td><span :id="'down'+index" @click="download(index)">下载</span></td>
          <td ><button :id="'buttonOne'+index" @click="success(index)"  class="circle" >√</button>
              <button :id="'buttonTwo'+index" @click="fail(index)"  class="circle" >×</button>
              <!--<img  height="30" width="30"  :src="Src1">-->
              <!--<img height="30" width="30"   :src="Src2">-->
          </td>
        </tr>

        </tbody>
      </table>

        <!--<Upload-->
        <!--ref="upload"-->
        <!--:show-upload-list="false"-->
        <!--:format="['xls','xlsx']"-->
        <!--:max-size="2048"-->
        <!--:on-format-error="handleFormatError"-->
        <!--:on-exceeded-size="handleSize"-->
        <!--:on-success="handleSuccess"-->
        <!--:on-progress="handleProgress"-->
        <!--:on-error="handleError"-->
        <!--action="../updateTest/updata.php">-->
          <!--<i-button id="ibutton" type="ghost">上传文件</i-button>-->
        <!--</Upload>-->
    </div>
    </div>
  </div>
</template>

<script>
  import icon1 from'../table/right.png'
  import icon2 from'../table/wrong.png'
    export default {
      name: 'table',
      data () {
            return {
              Src1:icon1,
              Src2:icon2,
              option2:'',
              semesterList: [
              ],
              tableList:[
              ]
            }
      },
      beforeMount:function(){
//        this.$http.post('../jsonphp/teachingPlan.php',{},{"Content-Type":"application/json"}).then(function (response) {
            this.$http.post('./courseTeachPlan/showTeachPlan',{},{"Content-Type":"application/json"}).then(function (response) {
          console.log(response);
            this.tableList = response.body.tableList;
            this.semesterList = response.body.semesterList;
            this.option2 = response.body.currentSemester;
        },
          function(error){
            console.log("获取教学计划error:");
            console.log(error);
          });
      },
      methods:{
      success:function(index){
        if(confirm("确认审核通过？")){
          alert(this.tableList[index].teacherId);
//          this.$http.post('../jsonphp/teachingPlan.php',{
          this.$http.post('./courseTeachPlan/doCheckTeachPlan',{
            "teacherId": this.tableList[index].teacherId,
            "msg": "success"
          },{"Content-Type":"application/json"}).then(function(response){
              console.log("审核通过:");
              console.log(response.body);
              var buttonTwo = document.getElementById("buttonTwo"+index);
              buttonTwo.style.display = "none";
              var buttonOne = document.getElementById("buttonOne"+index);
              buttonOne.disabled = "true";
              buttonOne.style.backgroundColor="white";
              buttonOne.style.border="grey solid thin";
              buttonOne.style.color="grey";
            },
            function(error){
              console.log("审核通过error:");
              console.log(error);
            });

        }
      },
        fail:function(index){
          if(confirm("确认审核不通过？")){
//            this.$http.post('../jsonphp/teachingPlan.php',{
              this.$http.post('./courseTeachPlan/doCheckTeachPlan',{
              "teacherId": this.tableList[index].teacherId,
              "msg": "fail"
            },{"Content-Type":"application/json"}).then(function(response){
              console.log("审核不通过:");
              console.log(response.body);
              var buttonOne = document.getElementById("buttonOne"+index);
              buttonOne.style.display = "none";
              var buttonTwo = document.getElementById("buttonTwo"+index);
              buttonTwo.disabled = "true";
              buttonTwo.style.backgroundColor="white";
              buttonTwo.style.border="grey solid thin";
              buttonTwo.style.color="grey";
            },
              function(error){
                console.log("审核不通过error:");
                console.log(error);
              });
        }
//        handleFormatError:function(){
//          this.$Message.error('文件格式错误！限制格式为'+this.$refs.upload.format,3);
//        },
//        handleSize:function(){
//          this.$Message.error('文件大小超出范围！限制最大（KB）为'+this.$refs.upload.maxSize,3);
//        },
//        handleError: function (res) {
//          var msg=document.getElementsByClassName("ivu-message-notice");
//          if(msg[0].parentNode){
////            结束进度条
//            this.$Loading.finish();
////            移除“正在上传......”的msg
//          msg[0].parentNode.removeChild(msg[0]);
//          }
//          this.$Message.error('文件上传失败！'+res,3);
//        },
//        handleProgress:function(){
//          this.$Loading.start();
//          this.$Message.loading('正在上传中',0);
//        },
//        handleSuccess:function(res){
//          this.$Loading.finish();
//          var msg=document.getElementsByClassName("ivu-message-notice");
//          msg[0].parentNode.removeChild(msg[0]);
//          this.$Message.success('文件上传成功！',3);
//          console.log(res);
//        }
      },
       download:function(index){
         this.$http.post('../jsonphp/teachingPlan.php',{
           "teacherId": this.tableList[index].teacherId
         },{"Content-Type":"application/json"}).then(function (response) {
             console.log("下载:");
             console.log(response.body);
         },
         function(error){
           console.log("下载error:");
           console.log(error);
         });
       },
        chooseTerm:function(value){
          this.$http.post('./courseTeachPlan/showTeachPlan',{
            "semester":value
          },{"Content-Type":"application/json"}).then(function (response) {
              console.log("选择:");
              console.log(response.body);
            },
            function(error){
              console.log("下载error:");
              console.log(error);
            });
        }

    }}
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  html{
    font-size: 16px;
  }
  button{
    height:2rem;
  }
  #back{
    background-color: #f3f3f3;
    /*padding-top:0.1rem;*/
    height:100%;
  }
  #sel{
    display: flex;
    padding-left:5rem;
    background-color: white;

    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  select{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.7rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    /*margin-right:3rem;*/
    font-size: 0.8rem;

  }
  #show{
    background-color: white;
    margin-right:5rem;
    margin-left:5rem;
    height:30rem;
    position: relative;
    top:2rem;

  }
  /*button{*/
    /*color: white;*/
    /*background-color: mediumseagreen;*/
    /*border: none;*/
    /*border-radius: 0.2rem;*/
    /*width: 5rem;*/
    /*height: 2rem;*/
    /*!*min-width: 5rem;*!*/
    /*outline:none;*/
  /*}*/
  #ibutton:hover{
    color: white;
    background-color: mediumseagreen;
    border: none;
    border-radius: 0.2rem;
    width: 5rem;
    height: 2rem;
    /*min-width: 5rem;*/
    outline:none;
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
    height:3rem;
  }
 /* #upload{
    position: relative;
    top:15rem;
  }*/
  .circle{
    border:solid thin grey;
    color: grey;
    background-color: white;
    width: 1.5rem;
    height: 1.5rem;
    -webkit-border-radius: 0.75rem;
    outline:none;
  }
  .circle:hover{
    color:white;
    background-color: red;
    border:solid thin red;
  }
</style>
