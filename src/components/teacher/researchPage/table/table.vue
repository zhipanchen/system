<template>
  <div id="back">
    <div id="table">
     <div id="title"> <p id="groupName">{{title}}</p></div>
     <div id="show">
        <p>编号：{{num}}</p>
       <p id="leaderP">
         <!--keyup监听enter按键，回车触发添加-->
         组长：
         <!--<select id="leaderSelect" value="">-->
           <!--<option selected></option>-->
           <!--<option v-for="option1 in options1">{{ option1.teacherName }}</option>-->
         <!--</select>-->
         <!--<span class="tipSpan" @click="addPerson('leader',leaders)"><img id="tipSpan" :src="imgSrc1"></span>-->
       <!--<div class="personDiv">-->
         <!--&lt;!&ndash;成员显示组件&ndash;&gt;-->
         <!--<eduResGroupPerson v-for="(leader,index) in leaders" :key="leader" @remove="removePerson(index,leaders)" :person="leader"></eduResGroupPerson>-->
       <!--</div>-->
       <!--</p>-->
       <span v-for="leader in leaders">{{leader}}、</span>
       <p id="memberP">
         组员：
         <select id="memberSelect" >
           <option disabled selected="selected">选择教师</option>
           <option v-for="teacher in teacherList" >{{ teacher.teacherName }}</option>
         </select>
         <span class="tipSpan" @click="addPerson('member',members)"><img id="tipSpan" :src="imgSrc1"></span>
       <div class="personDiv">
         <eduResGroupPerson v-for="(member,index) in members" :key="member" @remove="removePerson(index,members)" :person="member"></eduResGroupPerson>
       </div>
       </p>

      </div>
      <button class="am-btn am-btn-success am-radius" @click="save">保存</button>
      <button class="am-btn am-btn-success am-radius" @click="cancel">取消</button>
    </div>
</div>
</template>

<script>
  import icon1 from'./addCircle.png'
  import eduResGroupPerson from'../table/eduResGroupPerson .vue'
  export default {
    name: 'table',
    data () {
      return {
        title:'护理学基础',
        num:'663321',
        imgSrc1:icon1,
        teacherId:'',
        leaders: [ "何平", "李雷" ],
//              当前显示的教研组信息，用于数据库查询
        members: [ "何平", "李雷", "韩梅梅", "王小明", "吴亦凡" ],
//              当前显示的教研组信息，用于数据库查询

        teachers: [ "何平", "李雷", "韩梅梅", "王小明", "吴亦凡" , "鹿晗", "杨幂", "尚清华", "杜北大"],

        teacherList: [{teacherName:"骊山",teacherId:"123"},{teacherName:"款的",teacherId:"1245"}]
      }
    },
    components: {
      eduResGroupPerson
    },
    beforeMount:function(){
      this.$http.post('../jsonphp/research.php',{},
        {"Content-Type":"application/json"}).then(function (response) {
          console.log(response);
          this.teacherList=response.body.teacherList;
          this.title=response.body.TARGroupName;
          this.num=response.body.TARGroupId;
          this.leaders = [];
          this.members = [];
          for(var i = 0;i < response.body.tableList.length;i++){
            if(response.body.tableList[i].IsLeader == "true"){
              this.leaders.push(response.body.tableList[i].teacherName);
            }else{
              this.members.push(response.body.tableList[i].teacherName);
            }
          }
      },
        function(error){
          console.log("获取error:");
          console.log(error);
        });
    },
    methods: {
      addPerson: function(type,persons){
        var select = document.getElementById(type+"Select");
        if(select.value!="选择教师"&&select.value!=""){
        persons.push(select.value);}
        select.value = "";
      },
      removePerson: function(index,persons){
        persons.splice(index,1);
      },
      save:function(){
        for(var i=0;i<this.members.length;i++){
          for(var n=0;n<this.tableList.length;n++)
          if(this.members[i]==this.tableList[n].teacherName)
          {
            this.members[i]=this.tableList[n].teacherId
          }
        }
        this.$http.post('../jsonphp/research.php',{

          "teacherId":this.members
        //传？？？
        },
          {"Content-Type":"application/json"}).then(function (response) {
          if(response.body.result=="1"){
            alert("success!")
          }
        },
          function(error){
            console.log("获取error:");
            console.log(error);
          });
        },
       cancel:function(){
        location.reload();
      }}

  }
</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  html {
    font-size: 16px;
  }
  #back{
    background-color: #f3f3f3;
    padding:0.1rem;
  }
  #table{
    background-color: white;
    margin-right:5rem;
    margin-left:5rem;
    height:30rem;
    position: relative;
    /*top:2rem;*/
    justify-content: center;
  }
  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
  #groupName{
    font-size: 1.3rem;
    position: relative;
    display: flex;
    top:0.5rem;
    left:2rem;
  }
  #title{
    border-bottom: 0.20rem solid #158064;
  }
  .personDiv{
    display: flex;
    overflow: auto;
    font-size: 1rem;
    margin-right: 1rem;
    flex-wrap: wrap;
    width:52rem;
  }

 #show{
   position:relative;
   text-align: left;
   left:2rem;
   font-size:1.3rem;
 }
  button{
   width:5.6rem;
    margin:0.7rem;
  }
  input{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.3rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
  }
  #tipSpan{
  height:1rem;
    width:1rem;
  }
  select{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.7rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    margin: 0.1rem;
    font-size: 0.8rem;
  }
</style>
