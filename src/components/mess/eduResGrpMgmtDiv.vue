<template>
    <div id="eduResearchGroupManagementDiv">
      <div id="mainDiv">
        <div id="groupDiv">
          <p id="headP">教研组名称</p>
          <div id="grpListDiv">
            <!--循环生成教研组信息，index作为data数组的下标索引，key用于绑定课程信息，保证索引不随着数组元素增删自动发生变化-->
            <p v-for="(group,index) in groups" class="groupP" :key="group">
              <span class="operationSpan" @click="groupClick(index)">
                <input class="groupInput" type="text" :value="group" readonly="true" @click="groupClick(index)">
                <span class="delSpan" @click="delGrpClick(index)">×</span>
              </span>
            </p>
          </div>
          <p id="operationP">
            <!--增加功能-->
            <span class="operationSpan" @click="addClick"><img src="./images/addCircle.png"><p class="operation">增加</p></span>
            <!--删除u功能-->
            <span class="operationSpan" @click="deleteClick"><img src="./images/blackDelete.png"><p id="addP" class="operation">删除</p></span>
            <!--编辑功能-->
            <span class="operationSpan" @click="editClick"><img src="./images/blackEdit.png"><p id="editP" class="operation">编辑</p></span>
          </p>
        </div>
        <div id="grpInfoDiv">
          <p id="grpNameP">{{ groupName }}</p>
          <div id="infoEditDiv">
            <p id="groupNumP">教研组编号：{{ groupNumber }}</p>
            类别：
            <select id="typeSelect" v-model="targroupType">
              <option disabled></option>
              <option>普通课程</option>
              <option>基础专业</option>
              <option>临床</option>
              <option>基础护理</option>
            </select>
            <p id="leaderP">
              <!--keyup监听enter按键，回车触发添加-->
              组长：
              <select id="leaderSelect">
                <option selected disabled></option>
                <option v-for="teacher in teachers">{{ teacher }}</option>
              </select>
              <span class="tipSpan" @click="addPerson('leader',leaders)"><img src="./images/addCircle.png"></span>
              <div class="personDiv">
              <!--成员显示组件-->
                <eduResGroupPerson v-for="(leader,index) in leaders" :key="leader" @remove="removePerson(index,leaders)" :person="leader"></eduResGroupPerson>
              </div>
            </p>
            <p id="memberP">
              组员：
              <select id="memberSelect">
                <option selected disabled></option>
                <option v-for="teacher in teachers">{{ teacher }}</option>
              </select>
              <span class="tipSpan" @click="addPerson('member',members)"><img src="./images/addCircle.png"></span>
              <div class="personDiv">
                <eduResGroupPerson v-for="(member,index) in members" :key="member" @remove="removePerson(index,members)" :person="member"></eduResGroupPerson>
              </div>
            </p>
          </div>
          <div id="operationDiv">
            <button @click="save" class="am-btn am-btn-success am-radius">保存</button>
            <button @click="cancel" class="am-btn am-btn-success am-radius">取消</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import eduResGroupPerson from '../eduResGrpMgmtDiv_person/eduResGrpMgmtDiv_person.vue'
    export default {
        name: 'eduResearchGroupManagementDiv',
        data () {
            return {
              groups: [
//                "护士管理学", "临床护理学",
              ],
//              教研组信息
              TARgroupAndTeacher: [],
              groupId: 0,
//              当前显示的教研组信息
              groupName: "",
              targroupType: "",
              groupNumber: "",
              leaders: [],
              members: [],
              teachers: [1,2]
//              学校老师信息，用于添加教研组成员
            }
        },
        components: {
          eduResGroupPerson
        },
        beforeMount: function() {
          this.$http.post('../testPhp/eduResearchGroupManagement.php',{},{
            "Content-Type":"application/json"
          }).then(function(response){
            console.log("获取教研组:");
            console.log(response.body);
            var data = response.body;
            this.TARgroupAndTeacher = data.TARgroupAndTeacher;
            for(var i = 0;i < data.TARgroupAndTeacher.length;i++){
              this.groups.push(data.TARgroupAndTeacher[i].targroupName);
            }
            console.log(this.groups);
          },function(error){
            console.log("获取教研组error:");
            console.log(error);
          });
        },
        methods: {
//          教研组点击监听，用于展示相应的教研组详细信息
          groupClick: function(index){
            var state = document.getElementById("editP");
            //需要从后端查询并返回信息，更新当前教研组详细信息
            if(state.innerHTML == "编辑"){
              var n = 0;
              for(var i = 0;i < this.TARgroupAndTeacher.length;i++){
                if(this.TARgroupAndTeacher[i].targroupName == this.groups[index]){
                  n = i;
                  break;
                }
              }
              this.groupId = index;
              this.groupName = this.TARgroupAndTeacher[n].targroupName;
              this.groupNumber = this.TARgroupAndTeacher[n].targroupId;
              this.targroupType = this.TARgroupAndTeacher[n].targroupType;
              this.leaders = this.TARgroupAndTeacher[n].targroupLeader;
              this.members = this.TARgroupAndTeacher[n].targroupTeacher;
            }
          },
          delGrpClick: function(index){
//          从data中的课程信息数组中删除
//          预留功能,将data提交到后端,实现删除数据,处理回调
            if(confirm("您确定要删除该教研组吗？")){
//              判断当前详细信息是否为操作删除的教研组
              var n = 0;
              for(var i = 0;i < this.TARgroupAndTeacher.length;i++){
                if(this.TARgroupAndTeacher[i].targroupName == this.groups[index]){
                  n = i;
                  break;
                }
              }
              this.$http.post('../testPhp/classroomMgmtSave.php',{
                "targroupId": this.TARgroupAndTeacher[n].targroupId
              },{
                "Content-Type":"application/json"
              }).then(function(response){
                console.log("删除教研组:");
                console.log(response.body);
                var data = response.body;
                if(data.result == "success"){
                  if(this.groupId == index){
                    this.groupId = 0;
                    this.groupName = "";
                    this.groupNumber = "";
                    this.targroupType = "";
                    this.leaders = [];
                    this.members = [];
                  }
                  this.groups.splice(index,1);
                }else{
                  alert("操作失败！请重试");
                }
              },function(error){
                console.log("删除教研组error:");
                console.log(error);
              });
            }
          },
//          增加功能
          addClick: function(){
            for(var i = 0 ;i < this.groups.length;i++){
              if(this.groups[i] == "请编辑后保存"){
                alert("请不要多次添加未编辑录入的教研组！");
                return;
              }
            }
            this.groups.push("请编辑后保存");
          },
//          删除功能点击监听，改变删除状态，显示或隐藏删除小图标
          deleteClick: function(index){
            var delSpan = document.getElementsByClassName("delSpan");
            var addP = document.getElementById("addP");
            var i = 0 ;
            if(document.getElementById("editP").innerHTML == "编辑") {
              if (addP.innerHTML == "删除") {
                for (i = 0; i < delSpan.length; i++) {
                  delSpan[i].style.display = "inline";
                  addP.innerHTML = "取消"
                }
              } else if (addP.innerHTML == "取消") {
                for (i = 0; i < delSpan.length; i++) {
                  delSpan[i].style.display = "none";
                  addP.innerHTML = "删除";
                }
              }
            }
          },
//          编辑功能
          editClick: function(){
            var groupInput = document.getElementsByClassName("groupInput");
            var state = document.getElementById("editP");
            var i = 0;
            if(state.innerHTML == "编辑"){
              for( i = 0; i < groupInput.length; i++) {
//          使课程信息的输入标签变为可输入，显示边框,显示保存功能
                groupInput[i].style.border = "thin solid";
                groupInput[i].style.cursor = "text";
                groupInput[i].readOnly = false;
                state.innerHTML = "保存";
              }
            }else if(state.innerHTML == "保存"){
              if(!confirm("您确定保存修改吗？")) {
                if(confirm("是否取消修改并退出编辑？")) {
                  for ( i = 0; i < groupInput.length; i++) {
//                    不保存修改，重置数据并退出编辑,使课程信息的输入标签变为不可输入，隐藏边框
                    groupInput[i].value = this.groups[i];
                    groupInput[i].style.border = "none";
                    groupInput[i].style.cursor = "pointer";
                    groupInput[i].readOnly = true;
                    state.innerHTML = "编辑";
                  }
                }
              }else{
                var index = 0;
                var res = false;
                for(var i = 0;i < this.groups.length;i++){
                  if(groupInput[i].value != this.groups[i]){//如果名称发生修改
                    index = i;
                    for(var i = 0;i < this.TARgroupAndTeacher.length;i++){
                      if(this.TARgroupAndTeacher[i].targroupName == this.groups[index]){//找到对应发生修改的data
                        this.$http.post('../testPhp/classroomMgmtSave.php',{//提交名称修改
                          "targroupId": this.TARgroupAndTeacher[i].targroupId,
                          "targroupName": groupInput[i].value,
                          "targroupType": this.TARgroupAndTeacher[i].targroupType,
                          "targroupLeader": this.TARgroupAndTeacher[i].targroupLeader,
                          "targroupTeacher": this.TARgroupAndTeacher[i].targroupTeacher
                        },{
                          "Content-Type":"application/json"
                        }).then(function(response){
                          console.log("保存教研组:");
                          console.log(response.body);
                          var data = response.body;
                          if(data.result == "success"){
                            res = true;
                          }else{
                            res = false;
                            alert("操作失败！请重试");
                          }
                        },function(error){
                          console.log("保存教研组error:");
                          console.log(error);
                        });
                      }
                    }
                    if(res){//全部名称修改成功，退出编辑状态
                      for (i = 0; i < groupInput.length; i++) {
                        groupInput[i].style.border = "none";
                        groupInput[i].style.cursor = "pointer";
                        groupInput[i].readOnly = true;
                        state.innerHTML = "编辑";
                      }
                    }
                  }
                }
                if(this.groups.length > this.TARgroupAndTeacher.length){
                  if(confirm("存在待添加的新教研组，是否清空右侧详细信息进行该新教研组的录入？(录入后才能修改教研组名称)")){
                    this.groupId = this.groups.length - 1;
                    this.groupName = this.groups[this.groupId];
                    this.groupNumber = "";
                    this.targroupType = "";
                    this.leaders = [];
                    this.members = [];
                  }else{
                    this.groups.splice(this.TARgroupAndTeacher.length - 1,this.groups.length - this.TARgroupAndTeacher.length);//删除未编辑保存的待添加新教研组
                  }
                }
              }
            }
          },
//          教研组成员增加功能
          addPerson: function(type,persons){
            var select = document.getElementById(type+"Select");
            if(select.value != "") {
              persons.push(select.value);
              select.value = "请编辑保存";
            }
          },
//          教研组成员删除功能
          removePerson: function(index,persons){
            if(confirm("您确定删除该成员吗？")){
              persons.splice(index,1);
            }
          },
          save: function(){
            if(confirm("您确定保存修改吗？")){
              if(this.leaders.length == 0 || this.members.length == 0){
                alert("组长和成员不能为空！");
              }else {
                this.$http.post('../testPhp/classroomMgmtSave.php',{
                  "targroupId": this.groupId,
                  "targroupName": this.groupName,
                  "targroupType": this.targroupType,
                  "targroupLeader": this.leader,
                  "targroupTeacher": this.member,
                },{
                  "Content-Type":"application/json"
                }).then(function(response){
                  console.log("保存教研组:");
                  console.log(response.body);
                  var data = null;
                  data = response.body;
                  if(data.result == "success"){
                    if(confirm("保存成功！（刷新页面）")){
                      location.reload(location.href);
                    }
                  }else{
                    alert("操作失败！请重试");
                  }
                },function(error){
                  console.log("保存教研组error:");
                  console.log(error);
                });
              }
            }
          },
          cancel: function(){
            if(confirm("您确定取消修改并重置吗？")){
              location.reload(location.href);
            }
          }
        }
    }
</script>

<style scoped>
    html {
    }
    /*最上层Div*/
    #eduResearchGroupManagementDiv {
      margin: 0 auto;
      background-color: #f3f3f3;
      height: 100%;
    }
    #mainDiv{
      min-height: 36rem;
      display: flex;
      align-items: center;
    }
    /*教研组区域*/
    #groupDiv{
      border: thin solid #6D6D6D;
      background-color: white;
      width: 15rem;
      height: 32rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 5rem;
    }
    /*“教研组名称”标题*/
    #headP{
      font-size: 1.5rem;
      border-bottom: solid #158064;
      text-align: center;
      padding: 0.5rem 0;
      height: 6%;
      width: 96%;
      margin: 0;
    }
    /*教研组名称列表*/
    #grpListDiv{
      background-color: white;
      list-style: none;
      height: 83%;
      width: 96%;
      overflow-y: auto;
    }
    /*教研组名称*/
    .groupP{
      border-bottom: thin solid #6D6D6D;
      padding: 0.8rem 0;
      width: 100%;
      margin: 0;
      text-align: center;
    }
    /*删除小图标*/
    .delSpan{
      color: red;
      display: none;
    }
    /*教研组名称输入框*/
    .groupInput{
      border: none;
      text-align: center;
    }
    .groupInput:hover{
      cursor: pointer;
    }
    /*操作区域*/
    #operationP{
      background-color: white;
      border-top: solid #158064;
      display: flex;
      align-items: stretch;
      justify-content: space-around;
      width: 96%;
      font-size: 0.8rem;
      height: 10%;
      margin: 0;
    }
    /*操作名称*/
    .operation{
      margin: 0;
    }
    img{
      width: 1.2rem;
    }
    /*操作图标*/
    .operationSpan{
      margin: 0.5rem;
    }
    span:hover{
      cursor: pointer;
    }
    /*教研组详细信息区域*/
    #grpInfoDiv{
      background-color: white;
      border: thin solid black;
      width: 48rem;
      height: 32rem;
      margin-left: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    /*详细信息中教研组名称标题*/
    #grpNameP{
      width: 96%;
      border-bottom: solid #158064;
      min-height: 1rem;
      padding: 0.5rem;
      text-align: left;
      margin: 0;
    }
    /*详细信息编辑区域*/
    #infoEditDiv{
      padding-top: 1rem;
      text-align: left;
      /*border: solid;*/
      width: 96%;
      height: 70%;
      overflow-y: auto;
    }
    /*成员区域*/
    .personDiv{
      display: flex;
      flex-wrap: wrap;
      padding-left: 2.5rem;
    }
    /*提示语*/
    .tipSpan{
      position: relative;
      top: 0.3rem;
    }
    button{
      width: 5.6rem;
      margin-right: 1.4rem;
    }
    button:hover{
      cursor: pointer;
    }
    button:active{
      background-color: #00a539;
    }
    @media screen and (min-width: 1201px) {
      #grpInfoDiv{
        margin-left: 0rem;
      }
      #groupDiv{
        margin-left: 0rem;
      }
      #mainDiv{
        justify-content: space-around;

      }
    }
</style>
