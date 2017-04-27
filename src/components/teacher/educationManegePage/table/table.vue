<template>
  <div id="selfMessage-teacher-tableDiv">
    <div id="tableLeft">
      <span id="subtitle1">{{subtitle1}}</span>
      <ul>
        <li id="li"><a href="#">基本信息</a></li>
        <li><a href="#">教育管理</a></li>
        <li><a href="#">证书管理</a></li>
        <li><a href="#">一线工作经历</a></li>
        <li><a href="#">密码修改</a></li>
      </ul>
    </div>
    <div id="tableRight">
      <span id="subtitle2">{{subtitle2}}</span>
      <div id="tableDiv">
        <table>
          <tr>
            <td>毕业院校：</td>
            <td><input type="text" v-model="graduateSchool" /></td>
          </tr>
          <tr>
            <td>毕业专业：</td>
            <td><input type="text" v-model="secialty" /></td>
          </tr>
          <tr>
            <td>学制：</td>
            <td><input type="number" name="points" min="1" max="10"  v-model="schoolSystem" /></td>
          </tr>
          <tr>
            <td>最高学历：</td>
            <td><input type="text" v-model="highestEDU" /></td>
          </tr>
          <tr>
            <td>最高学位：</td>
            <td><input type="text" v-model="highestDegree" /></td>
          </tr>




        </table>

      </div>
      <div id="buttonDiv">
        <button class="am-btn am-btn-success am-radius" @click="save(graduateSchool,secialty,schoolSystem,highestEDU,highestDegree)">保存</button>
        <button class="am-btn am-btn-success am-radius" @click="cancel()">取消</button>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'selfMessage-teacher-tableDiv',
    data () {
      return {
        subtitle1:'个人信息',
        subtitle2:'教育管理',
        graduateSchool:'',
        secialty:'',
        schoolSystem:'',
        highestEDU:'',
        highestDegree:''
      }
    },
    beforeMount:function(){
      this.$http.post('./teacherManage/getTeacherEduInfo',{},
        {"Content-Type":"application/json"}).then(function (response) {
          console.log(response);
          this.graduateSchool = response.body.graduateSchool;
          this.secialty = response.body.secialty;
          this.schoolSystem = response.body.schoolSystem;
          this.highestEDU = response.body.highestEDU;
          this.highestDegree = response.body.highestDegree;
        },
        function(error){
          console.log("获取error:");
          console.log(error);
        });
    },
    methods: {
      save:function(graduateSchool,secialty,schoolSystem,highestEDU,highestDegree){
        this.$http.post('./teacherManage/editTeacherEduInfo',{
         "graduateSchool":graduateSchool,
         "secialty":secialty,
         "schoolSystem":schoolSystem,
         "highestEDU":highestEDU,
         "highestDegree":highestDegree
        },{"Content-Type":"application/json"}).then(function (response) {
            console.log("传递:");
            console.log(response.body);
            if(response.body.result=="1")
            {alert("success!")}
          },
          function(error){
            console.log("传递error:");
            console.log(error);
          });
      },
      cancel:function(){
        location.reload();
      }
    }

  }

</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  html{
    font-size: 16px;
  } /*整个页面的样式*/
  #selfMessage-teacher-tableDiv{
    background-color: #f3f3f3;
    position:relative;
    display: flex;
    height:30rem;
  }/*整个桌面的大小*/
  #tableLeft{
    position:relative;
    top:2rem;
    left:4rem;
    height:30rem;
    width:20%;
    background-color: white;
    text-align: center;
    border:0.15rem solid lightgrey;
  }/*左侧的CSS*/
  #tableRight{
    position: relative;
    float:right;
    top:2rem;
    margin-left:7rem;
    height:30rem;
    width:65%;
    background-color: white;
    text-align: left;
    border:0.15rem solid lightgrey;
    padding-left:1rem;
    padding-right:1rem;
  }/*右侧的CSS*/
  #tableDiv{
    display: flex;
    justify-content: space-between;
    padding: 1rem 3rem;
    border-top: 0.15rem solid #158064;
    position: relative;
    top:1rem;
    height:20rem;
  }/*表格的CSS*/
  #subtitle1{
    font-size: 1.3rem;
    position: relative;
    top:0.5rem;

  }/*标题一*/
  #subtitle2{
    font-size: 1.3rem;
    position: relative;
    top:0.5rem;
    left:2rem;
  }/*标题二*/
  ul{ list-style-type:none;}/*去点*/
  li{
    height:3rem;
    border-bottom:0.15rem solid lightgrey ;
    position: relative;
    right: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;

  }/*列表*/
  #li{
    border-top: 0.15rem solid #158064;
  }/*左边绿色的那条线*/
  #buttonDiv{
    position: relative;
    top:2rem;
    display: flex;
  justify-content: center;
  }
  button{

    width: 5.6rem;
    margin:0.7rem;

  }
  input{
    width:10rem;
  }
</style>
