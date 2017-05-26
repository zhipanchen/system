<template>
    <div id="eduResearchGroupManagementDiv">
      <div id="groupDiv">
        <p id="headP">教研组名称</p>
        <div id="grpListDiv">
          <p v-for="(group,index) in groups" class="groupP" :key="group">
            <span class="operationSpan" @click="groupClick(index)">
              <input class="groupInput" type="text" :value="group" readonly="true" @click="groupClick(index)">
              <span class="delSpan" @click="delGrpClick(index)">×</span>
            </span>
          </p>
        </div>
        <p id="operationP">
          <span class="operationSpan" @click="addClick"><img src="./images/addCircle.png"><p class="operation">增加</p></span>
          <span class="operationSpan" @click="deleteClick"><img src="./images/blackDelete.png"><p id="addP" class="operation">删除</p></span>
          <span class="operationSpan" @click="editClick"><img src="./images/blackEdit.png"><p id="editP" class="operation">编辑</p></span>
        </p>
      </div>
      <div id="grpInfoDiv">
        <p id="grpNameP">{{ groupName }}</p>
        <div id="infoEditDiv">
          <p id="groupNumP">教研组编号：<input type="text" :value="groupNumber"></p>
          <p id="leaderP">
            组长：<input id="leaderInput" type="text" value="" @keyup.enter="addPerson('leader',leaders)"><span id="tipSpan">*按下回车添加成员</span>
            <div class="personDiv">
              <eduResGroupPerson v-for="(leader,index) in leaders" :key="leader" @remove="removePerson(index,leaders)" :person="leader"></eduResGroupPerson>
            </div>
          </p>
          <p id="memberP">
            组员：<input id="memberInput" type="text" value="" @keyup.enter="addPerson('member',members)">
            <div class="personDiv"><eduResGroupPerson v-for="(member,index) in members" :key="member" @remove="removePerson(index,members)" :person="member"></eduResGroupPerson></div>
          </p>
        </div>
        <div id="operationDiv">
          <button @click="save">保存</button>
          <button @click="cancel">取消</button>
        </div>
      </div>
    </div>
</template>

<script>
    import eduResGroupPerson from '../eduResGroupPerson/eduResGroupMgmtDiv_person.vue'
    export default {
        name: 'eduResearchGroupManagementDiv',
        data () {
            return {
              edit: true,
              groups: [ "护士管理学", "临床护理学", ],
              groupId: "1",//用于数据库查询
              groupName: "护士管理学",
              groupNumber: "2089678",
              leaders: [ "何平", "李雷" ],
              members: [ "何平", "李雷", "韩梅梅", "王小明", "吴亦凡" ],

            }
        },
        components: {
          eduResGroupPerson
        },
        methods: {
          groupClick: function(index){
            var state = document.getElementById("editP");
            if(state.innerHTML == "编辑"){
              //需要从后端查询并返回信息
              this.groupId = "2";
              this.groupName = "临床护理学";
              this.groupNumber = "666666";
              this.leaders = [ "韩梅梅", "王小明" ];
              this.members = [ "韩梅梅", "王小明", "吴亦凡" ];
            }
          },
          delGrpClick: function(index){
            if(confirm("您确定要删除该教研组吗？")){
              this.groups.splice(index,1);
            }
          },
          addClick: function(){
            this.groups.push("null");
          },
          deleteClick: function(index){
            var delSpan = document.getElementsByClassName("delSpan");
            var addP = document.getElementById("addP");
            var i = 0 ;
            if(addP.innerHTML == "删除"){
              for( i = 0; i < delSpan.length; i++){
                delSpan[i].style.display = "inline";
                addP.innerHTML = "取消"
              }
            }else if(addP.innerHTML == "取消"){
              for( i = 0; i < delSpan.length; i++){
                delSpan[i].style.display = "none";
                addP.innerHTML = "删除";
              }
            }
          },
          editClick: function(){
            var groupInput = document.getElementsByClassName("groupInput");
            var state = document.getElementById("editP");
            var i = 0;
            if(state.innerHTML == "编辑"){
              for( i = 0; i < groupInput.length; i++) {
                groupInput[i].style.border = "thin solid";
                groupInput[i].style.cursor = "text";
                groupInput[i].readOnly = false;
                state.innerHTML = "保存";
              }
            }else if(state.innerHTML == "保存"){
              if(!confirm("您确定保存修改吗？")) {
                if(confirm("是否取消修改并退出编辑？")) {
                  for ( i = 0; i < groupInput.length; i++) {
//                    不保存修改，重置数据并退出编辑
                    groupInput[i].value = this.groups[i];
                    groupInput[i].style.border = "none";
                    groupInput[i].style.cursor = "pointer";
                    groupInput[i].readOnly = true;
                    state.innerHTML = "编辑";
                  }
                }
              }else{
                for ( i = 0; i < groupInput.length; i++) {
//                  提交数据库保存修改
                  groupInput[i].style.border = "none";
                  groupInput[i].style.cursor = "pointer";
                  groupInput[i].readOnly = true;
                  state.innerHTML = "编辑";
                }
              }
            }
          },
          addPerson: function(type,persons){
            var input = document.getElementById(type+"Input");
            persons.push(input.value);
            input.value = "";
          },
          removePerson: function(index,persons){
            persons.splice(index,1);
          },
          save: function(){
            if(confirm("您确定保存修改吗？")){
              history.go(0);
            }
          },
          cancel: function(){
            if(confirm("您确定取消修改并重置吗？")){
//              需要从后端查询并返回原始信息
//              this.groupName = "";
//              this.groupNumber = "";
//              this.leaders = [];
//              this.members = [];
              history.go(0);
            }
          },
        }
    }
</script>

<style scoped>
    html {
    }
    #eduResearchGroupManagementDiv{
      height: 32.5rem;
      display: flex;
    }
    #groupDiv{
      border: thin solid #6D6D6D;
      width: 15rem;
      margin-left: 1rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    #headP{
      font-size: 1.5rem;
      border-bottom: solid #158064;
      text-align: center;
      padding: 0.5rem 0;
      height: 6%;
      width: 96%;
      margin: 0;
    }
    #grpListDiv{
      list-style: none;
      height: 83%;
      width: 96%;
      overflow-y: auto;
    }
    .groupP{
      border-bottom: thin solid #6D6D6D;
      padding: 0.8rem 0;
      width: 100%;
      margin: 0;
    }
    .delSpan{
      color: red;
      display: none;
    }
    .groupInput{
      border: none;
      text-align: center;
    }
    .groupInput:hover{
      cursor: pointer;
    }
    #operationP{
      border-top: solid #158064;
      display: flex;
      align-items: stretch;
      justify-content: space-around;
      width: 96%;
      font-size: 0.8rem;
      height: 10%;
      margin: 0;
    }
    .operation{
      margin: 0;
    }
    img{
      width: 1.2rem;
    }
    .operationSpan{
      margin: 0.5rem;
    }
    span:hover{
      cursor: pointer;
    }
    #grpInfoDiv{
      border: thin solid #6D6D6D;
      width: 58rem;
      height: 90%;
      margin-left: 5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    #grpNameP{
      width: 96%;
      border-bottom: solid #158064;
      min-height: 1rem;
      padding: 0.5rem;
      text-align: left;
      margin: 0;
    }
    #infoEditDiv{
      text-align: left;
      /*border: solid;*/
      width: 96%;
      height: 70%;
    }
    .personDiv{
      display: flex;
      overflow: auto;
    }
    #tipSpan{
      font-size: 0.8rem;
      color: grey;
    }
    input{
      width: 8rem;
    }
    button{
      color: white;
      background-color: #158064;
      border: none;
      border-radius: 0.2rem;
      width: 5rem;
      height: 2.5rem;
      min-width: 7rem;
      outline: none;
      position: relative;
      right: 8rem;
      margin: 1rem;
    }
    button:hover{
      cursor: pointer;
    }
    button:active{
      background-color: #00a539;
    }
    @media screen and (max-width: 1023px) {
        html {
        }
    }
</style>
