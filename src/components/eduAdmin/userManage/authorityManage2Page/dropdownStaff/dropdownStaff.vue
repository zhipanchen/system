<template>
    <div  id="staffAuthorityAll">
      <div id="dropdownStaff">
        <div >
          <p class="topP">职务</p>
          <table class="dropdownStaffTable" id="tchDropdownTable">
            <tr v-for="(role,index) in roleList">
              <td><input :id="'roleNameInput'+index" class="inputWM" :value="role.roleName" readonly="readonly" style="border: none"@click="checkStaffAuthorityClick(index)"></td>
              <!--<td width="50%" v-text="role.roleName" @click="checkStaffAuthorityClick(role.roleId)"></td>-->
              <td>
                <img :id="'editImg'+index" src="./images/edit.png" @click="editClick(index)">
                <img :id="'saveImg'+index" src="./images/save.png" style="display: none" @click="saveClick(index)">
                <img :id="'deleteImg'+index" src="./images/delete.png" @click="deleteClick(index)">
                <img :id="'restoreImg'+index" src="./images/restore.png" style="display: none" @click="restoreClick(index)">
              </td>
            </tr>
            <tr>
              <td width="30%"><img :id="AddImg" src="./images/add.png" @click="addClick()"></td>
              <td width="70%"></td>
            </tr>
          </table>
        </div>
      </div>

      <div id="staffAuthority" class="marginLeft">
        <div>
          <p class="topP" id="topStaff">{{roleNameEle}}</p>
          <input type="checkbox" id="all" @click="allCheck()" style="margin-left: 3rem">
          <label for="all">全选</label>
          <ul>
            <li  v-for="authorityEle in authorityList">
              <input type="checkbox" :id="authorityEle.authorityId" :value="authorityEle.authorityId" v-model="authorityIdList">
              <label :for="authorityEle.authorityId">{{authorityEle.authorityName}}</label>
            </li>
          </ul>
        </div>
        <div id="buttonDiv">
          <span><button id="saveInf" class="bottomButton am-btn am-btn-success am-radius" @click="saveAuthorityClick()">保存</button></span>
          <span><button id="cancel" class="bottomButton am-btn am-btn-success am-radius" @click="restoreAuthorityClick()">取消</button></span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              roleIdEle:'',
              roleNameEle:'请选择职务',
              newRoleId:'',
              roleList:[
                {roleId:'12345',roleName:'教师'},
                {roleId:'12346',roleName:'督导'},
                {roleId:'12347',roleName:'教研组组长'}
              ],
              authorityIdList:['1','4'],
              authorityList:[
                {authorityId:'1',authorityName:'查看个人成绩'},
                {authorityId:'2',authorityName:'查看全班成绩'},
                {authorityId:'3',authorityName:'管理成绩（导入、更新、修改、提交成绩）'},
                {authorityId:'4',authorityName:'管理教师个人信息'},
                {authorityId:'5',authorityName:'班主任信息管理'},
                {authorityId:'6',authorityName:'班主任信息修改'},
                {authorityId:'7',authorityName:'班级信息管理'}
              ]
            }
        },
      beforeMount:function() {
        this.$http.post('./getAllRoleAuthority',{},{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.roleList = response.body.getAllRoleAuthorityList.roleList;
          this.authorityList = response.body.getAllRoleAuthorityList.authorityList;
        },function(error){
          console.log("获取error");
        });
      },

      methods:{
        editClick: function(index){
          var roleNameInput = document.getElementById("roleNameInput"+index);
          var editImg = document.getElementById("editImg"+index);
          var saveImg = document.getElementById("saveImg"+index);
          var deleteImg = document.getElementById("deleteImg"+index);
          var restoreImg = document.getElementById("restoreImg"+index);
          roleNameInput.readOnly = false;
          roleNameInput.style.border = "0.1rem solid #d4d4d9";
          editImg.style.display = "none";
          saveImg.style.display = "inline";
          deleteImg.style.display = "none";
          restoreImg.style.display = "inline";
        },
        saveClick: function(index){
          var roleNameInput = document.getElementById("roleNameInput"+index);
          var editImg = document.getElementById("editImg"+index);
          var saveImg = document.getElementById("saveImg"+index);
          var deleteImg = document.getElementById("deleteImg"+index);
          var restoreImg = document.getElementById("restoreImg"+index);
          this.$http.post('./saveNewRole',{
            "roleId":this.roleList[index].roleId,
            "roleName":roleNameInput.value
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
          },function(error){
            console.log("获取error");
          });
          roleNameInput.readOnly = true;
//          true或false不可用引号
          roleNameInput.style.border = "none";
          this.roleList[index].roleName = roleNameInput.value;
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
        },
        restoreClick: function(index){
          var roleNameInput = document.getElementById("roleNameInput"+index);
          var editImg = document.getElementById("editImg"+index);
          var saveImg = document.getElementById("saveImg"+index);
          var deleteImg = document.getElementById("deleteImg"+index);
          var restoreImg = document.getElementById("restoreImg"+index);
          roleNameInput.readOnly = true;
          roleNameInput.style.border = "none";
          roleNameInput.value = this.roleList[index].roleName;
          editImg.style.display = "inline";
          saveImg.style.display = "none";
          deleteImg.style.display = "inline";
          restoreImg.style.display = "none";
        },
        deleteClick: function(index){
          this.$http.post('./deleteRole',{
            "roleId":this.roleList[index].roleId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
          },function(error){
            console.log("获取error");
          });
          this.roleList.splice(index,1);
        },
        addClick: function(){
          this.$http.post('./addNewRole',{},{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.newRoleId = response.body.addNewRoleList.roleId;
            this.roleList.push(
              {roleId:this.newRoleId,roleName:this.roleNameEle}
            );
          },function(error){
            console.log("获取error");
          });
        },
        allCheck: function(){
          if(this.authorityIdList.length===this.authorityList.length){
            this.authorityIdList=[];
          }
          else {
            this.authorityIdList=[];
            for(var i=0;i<this.authorityList.length;i++){
              this.authorityIdList.push(this.authorityList[i].authorityId);
            }
          }
        },
//        用于多选框的全选或全不选，方法是对数组tchAuthorityNames进行操作，此数组用v-model绑定到了多选框上
        checkStaffAuthorityClick: function(index){
          this.$http.post('./getRoleAuthority',{
            "roleId":this.roleList[index].roleId
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.authorityIdList = response.body.getRoleAuthorityList.authorityIdList;
          },function(error){
            console.log("获取error");
          });
          this.roleIdEle = this.roleList[index].roleId;
          this.roleNameEle = this.roleList[index].roleName;
        },
        saveAuthorityClick: function(){
          this.$http.post('./setRoleAuthority',{
            "roleId":this.roleIdEle,
            "authorityIdList":this.authorityIdList
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
          },function(error){
            console.log("获取error");
          });
        },
        restoreAuthorityClick: function(){
          this.$http.post('./getRoleAuthority',{
            "roleId":this.roleIdEle
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            console.log(response);
            this.authorityIdList = response.body.getRoleAuthorityList.authorityIdList;
          },function(error){
            console.log("获取error");
          });
        }
      }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    #staffAuthorityAll{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin: 2rem auto 2rem 5rem;
      min-height: 50rem;
    }
    .marginLeft{
      margin-left: 3rem;
    }
    .blank{
      height: 2.9rem;
    }
    #dropdownStaff{
      width: 25rem;
      min-height: 30rem;
      border: 2px solid #d4d4d9;
    }
    img{
      width: 2rem;
      height: 2rem;
      margin-left: 1rem;
      border: thin solid white;
    }
    img:hover{
      cursor: pointer;
      border: thin solid grey;
    }
    .dropdownStaffTable{
      width: 100%;
      height:2rem;
      border-bottom: 1px solid #d4d4d9;
      border-collapse: collapse;
      table-layout: fixed;
      text-align: center;
    }
    #staffAuthority{
      width: 45rem;
      min-height: 30rem;
      border: 2px solid #d4d4d9;
    }
    .topP{
      font-size: 1.5rem;
      margin-top: 0;
      padding: 1rem 3rem 1rem;
      border-bottom: 2px solid #158064;
    }
    .inputWM{
      width:80%;
      text-align: center;
      cursor: pointer;
      color: #158064;
    }
    .inputWM:hover{
      color: black;
    }
    ul li{
      float: left;
      min-height: 2rem;
      font-size: 0.6rem;
      width: 33%;
    }
    .bottomButton{
      margin-right: 1.4rem;
    }
    #buttonDiv{
      margin-top: 1rem;
      text-align: center;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
